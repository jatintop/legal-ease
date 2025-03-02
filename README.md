# LegalEase - Supreme Legal AI

LegalEase is an AI-powered legal assistant built with Flask and the Gemini API, designed to streamline legal tasks under Indian law as of March 2025. It offers five powerful features: Swift Draft, AI Legal Assist, Contract Insight, Judgment Predict, and Legal IQ, accessible via an elegant web interface.

---

## Features

- **Swift Draft**: Generate legally compliant documents (e.g., NDAs, rental agreements) tailored to Indian law.
- **AI Legal Assist**: Get precise answers to Indian legal queries with actionable insights.
- **Contract Insight**: Analyze contracts for risks, vulnerabilities, and improvements, with a risk score.
- **Judgment Predict**: Predict case outcomes based on Indian precedents and legal principles.
- **Legal IQ**: Gain deep insights into legal concepts or analyze articles with a global perspective.

---

## Prerequisites

Before running LegalEase, ensure you have:

- **Python 3.8+**: [Download Python](https://www.python.org/downloads/)
- **Git**: [Install Git](https://git-scm.com/downloads)
- **Font Awesome**: Included via CDN in the project—no separate install needed.

**Note**: The Gemini API key is pre-configured in the `.env` file for hackathon purposes—no need to obtain your own.

---

## Installation

1. **Clone the Repository**  
   Open a terminal and run:
   ```bash
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo
   ```

2. **Set Up a Virtual Environment**  
   Create and activate a virtual environment:
   ```bash
   python -m venv myenv
   # Windows
   myenv\Scripts\activate
   # macOS/Linux
   source myenv/bin/activate
   ```

3. **Install Dependencies**  
   Install required Python packages:
   ```bash
   pip install flask requests python-dotenv
   ```

---

## Project Structure

```
your-repo/
├── static/
│   ├── script.js
│   ├── styles.css
│   ├── styles2.css
│   └── welcomeMessages.js
├── templates/
│   ├── ai.html
│   └── index.html
├── .env
├── app.py
├── prompts.py
└── README.md
```

- `static/`: Frontend assets (JS, CSS).
- `templates/`: HTML templates (`index.html` for home, `ai.html` for chat).
- `.env`: Environment variables (includes pre-configured Gemini API key).
- `app.py`: Flask backend.
- `prompts.py`: Prompt templates for Gemini API.

---

## Running the Application

1. **Start the Flask Server**  
   From the root directory, with the virtual environment activated:
   ```bash
   python app.py
   ```
   The app runs on `http://localhost:5000` in debug mode.

2. **Access the Web Interface**  
   - Open your browser to `http://localhost:5000/` to see the home page (`index.html`).
   - Click a card (e.g., "Swift Draft") or "Start Consulting" to access the chat interface (`ai.html`).

---

## Usage

### Home Page
- **Cards**: Click any card to jump to its chat mode (e.g., `/chat?mode=swift-draft`).
- **Start Consulting**: Goes to the chat interface with "Swift Draft" as default.
- **Footer**: Links to GitHub and credits "Jatin Topakar © 2025".

### Chat Interface
- **Toggles**: Switch between modes (Home returns to `index.html`).
- **Input Area**: Fixed at the bottom—enter prompts or upload files:
  - **Swift Draft**: Select a document type and enter details.
  - **AI Legal Assist**: Ask legal questions.
  - **Contract Insight**: Upload a contract file (TXT, DOCX, PDF, <5MB).
  - **Judgment Predict**: Describe a case or upload details.
  - **Legal IQ**: Ask about concepts or provide article URLs.
- **Output**: Chat area displays formatted responses, with risk scores and metrics for Contract Insight.

---

## Configuration

- **API Key**: The `.env` file includes a pre-configured Gemini API key for hackathon use—no changes needed.
- **Port**: Modify `app.run(port=5000)` in `app.py` to use a different port if needed.

---

## Troubleshooting

- **404 Not Found**: Ensure Flask routes match URLs (e.g., `/` for `index.html`, `/chat` for `ai.html`).
- **API Errors**: Verify internet connectivity—API key is pre-set in `.env`.
- **Overlap Issues**: Check `styles.css` for sufficient `padding-bottom` on `.container` if footer overlaps content.

---
