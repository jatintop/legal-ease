from flask import Flask, request, jsonify, render_template
import requests
import os
from dotenv import load_dotenv
from functools import lru_cache
import re
from prompts import (SWIFT_DRAFT_PROMPT, AI_LEGAL_ASSIST_PROMPT, CONTRACT_INSIGHT_PROMPT,
                    JUDGMENT_PREDICT_PROMPT, LEGAL_IQ_PROMPT)

app = Flask(__name__, static_folder='static', template_folder='templates')
load_dotenv()

GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'
TIMEOUT = 15

@lru_cache(maxsize=100)
def call_gemini(prompt):
    try:
        payload = {
            "contents": [{"parts": [{"text": prompt[:2000]}]}]
        }
        response = requests.post(
            f"{GEMINI_API_URL}?key={GEMINI_API_KEY}",
            json=payload,
            headers={'Content-Type': 'application/json'},
            timeout=TIMEOUT
        )
        response.raise_for_status()
        data = response.json()
        return data['candidates'][0]['content']['parts'][0]['text']
    except Exception as e:
        app.logger.error(f"Gemini API error: {str(e)}")
        raise Exception(f"Failed to connect to Gemini API: {str(e)}")

def format_response(text):
    """Format response for clean, professional readability."""
    text = re.sub(r'^\s*#+\s+', '', text, flags=re.MULTILINE)
    text = re.sub(r'(?<!\*)\*(?!\*)', '', text)
    text = re.sub(r'\*{3,}', '**', text)
    text = re.sub(r'(\b[A-Z][a-zA-Z\s]+\b):', r'**\1:**', text)
    text = re.sub(r'\n\s*[-*]\s+', '\n• ', text)
    text = re.sub(r'\*{4}(.*?)\*{4}', r'\n• \1', text)
    text = re.sub(r'\n{3,}', '\n\n', text)
    text = re.sub(r'\n\s*\n', '\n\n', text)
    return text.strip()

def extract_risk_score(text):
    """Extract risk score from Gemini's response with robust matching."""
    patterns = [
        r'Risk Score:\s*(\d+)/10',
        r'Rating:\s*(\d+)/10',
        r'Score:\s*(\d+)\s*(?:out of|/)\s*10',
        r'Risk Rating:\s*(\d+)\s*(?:out of|/)\s*10',
        r'(\d+)/10',
    ]
    
    for pattern in patterns:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            score = int(match.group(1))
            if 1 <= score <= 10:
                return score
    
    text_lower = text.lower()
    if 'high risk' in text_lower or 'significant risk' in text_lower:
        return 8
    elif 'moderate risk' in text_lower or 'some risk' in text_lower:
        return 5
    elif 'low risk' in text_lower or 'minimal risk' in text_lower:
        return 3
    elif 'vulnerable' in text_lower or 'problematic' in text_lower:
        return 7
    elif 'missing' in text_lower or 'absent' in text_lower:
        return 6
    
    app.logger.warning(f"No risk score found in response: {text}")
    return 5

def handle_request(endpoint, prompt_gen):
    data = request.json
    prompt = data.get('prompt') or f"{data.get('type')}: {data.get('details')}"
    if not prompt:
        return jsonify({'success': False, 'message': 'Input required'}), 400
    
    full_prompt = prompt_gen(prompt)
    result = call_gemini(full_prompt)
    formatted = format_response(result)
    
    if endpoint == 'contract-insight':
        score = extract_risk_score(formatted)
        return jsonify({'success': True, 'data': formatted, 'metrics': {'risk_score': score}})
    return jsonify({'success': True, 'data': formatted})

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat')
def chat():
    return render_template('ai.html')

@app.route('/api/swift-draft', methods=['POST'])
def swift_draft():
    return handle_request('swift-draft', lambda p: SWIFT_DRAFT_PROMPT.format(p=p))

@app.route('/api/ai-legal-assist', methods=['POST'])
def ai_legal_assist():
    return handle_request('ai-legal-assist', lambda p: AI_LEGAL_ASSIST_PROMPT.format(p=p))

@app.route('/api/contract-insight', methods=['POST'])
def contract_insight():
    return handle_request('contract-insight', lambda p: CONTRACT_INSIGHT_PROMPT.format(p=p))

@app.route('/api/judgment-predict', methods=['POST'])
def judgment_predict():
    return handle_request('judgment-predict', lambda p: JUDGMENT_PREDICT_PROMPT.format(p=p))

@app.route('/api/legal-iq', methods=['POST'])
def legal_iq():
    return handle_request('legal-iq', lambda p: LEGAL_IQ_PROMPT.format(p=p))

if __name__ == '__main__':
    app.run(port=5000, debug=True)