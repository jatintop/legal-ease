import { welcomeMessages } from './welcomeMessages.js';

document.addEventListener('DOMContentLoaded', function() {
  const chatArea = document.getElementById('chat-area');

  const thinkingMessages = [
    'Consulting the legal oracle...',
    'Decoding Indian law mysteries...',
    'Summoning judicial wisdom...',
    'Drafting with divine precision...',
    'Analyzing clauses at lightspeed...'
  ];

  // ========== UI Functions ==========

  window.showTab = function(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.toggle').forEach(toggle => toggle.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    document.querySelector(`[onclick="showTab('${tabId}')"]`).classList.add('active');

    chatArea.innerHTML = '';

    setTimeout(() => {
      addMessage(welcomeMessages[tabId] || '<p>Select a service to begin.</p>', false, false);
    }, 200);

    document.querySelectorAll('textarea').forEach(textarea => textarea.style.height = 'auto');
  };

  window.validateFile = function(input) {
    const file = input.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds 5MB. Please upload a smaller file.');
      input.value = '';
    }
  };

  // ========== Message Handling ==========

  function formatMessageContent(content) {
    let formatted = '';
    const lines = content.trim().split('\n');
    let inList = false;

    lines.forEach(line => {
      line = line.trim();
      if (!line) {
        if (inList) {
          formatted += '</ul>\n';
          inList = false;
        }
        formatted += '<p class="spacer"> </p>\n';
      } else if (line.startsWith('**') && line.endsWith('**') && line.length > 4) {
        if (inList) {
          formatted += '</ul>\n';
          inList = false;
        }
        const heading = line.slice(2, -2);
        formatted += `<h3>${heading}</h3>\n`;
      } else if (line.startsWith('•')) {
        if (!inList) {
          formatted += '<ul>\n';
          inList = true;
        }
        formatted += `<li>${line.slice(1).trim()}</li>\n`;
      } else {
        if (inList) {
          formatted += '</ul>\n';
          inList = false;
        }
        formatted += `<p>${line}</p>\n`;
      }
    });

    if (inList) formatted += '</ul>\n';
    return formatted.trim();
  }

  function addMessage(content, isUser = false, hasCopy = true, metrics = null) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
    
    if (isUser) {
      msgDiv.innerText = content;
    } else {
      msgDiv.innerHTML = formatMessageContent(content);
      if (metrics && metrics.risk_score) {
        createScoreBadge(metrics.risk_score); 
        createMetricsVisualization(metrics);
      }
    }
    
    if (hasCopy && !isUser) {
      const copyBtn = document.createElement('button');
      copyBtn.className = 'copy-btn';
      copyBtn.innerText = 'Copy';
      copyBtn.onclick = () => {
        const textToCopy = msgDiv.innerText.replace('Copy', '').trim();
        navigator.clipboard.writeText(textToCopy)
          .then(() => {
            copyBtn.innerText = 'Copied!';
            setTimeout(() => copyBtn.innerText = 'Copy', 2000);
          })
          .catch(err => console.error('Copy failed:', err));
      };
      msgDiv.appendChild(copyBtn);
    }
    
    chatArea.appendChild(msgDiv);
    chatArea.scrollTop = chatArea.scrollHeight;
    return msgDiv;
  }

  // ========== API Handling ==========

  async function apiCall(endpoint, payload) {
    const userContent = payload.prompt || `${payload.type}: ${payload.details || ''}`;
    const userMsg = addMessage(userContent, true);
    const thinkingMsg = addMessage(thinkingMessages[Math.floor(Math.random() * thinkingMessages.length)], false, false);

    try {
      const response = await fetch(`/api${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);

      const data = await response.json();
      chatArea.removeChild(thinkingMsg);

      if (data.success) {
        addMessage(data.data, false, true, data.metrics);
      } else {
        addMessage(`Error: ${data.data || 'Unknown error occurred'}`, false, false);
      }
    } catch (error) {
      chatArea.removeChild(thinkingMsg);
      addMessage(`Failed: ${error.message}. Please try again or check your connection.`, false, false);
    }
  }

  // ========== Feature Functions ==========

  window.callSwiftDraft = async function() {
    const type = document.getElementById('draft-type').value;
    const details = document.getElementById('draft-details').value;

    if (!type) {
      alert('Please select a document type');
      return;
    }

    document.getElementById('draft-details').value = '';
    await apiCall('/swift-draft', { type, details });
  };

  window.callAILegalAssist = async function() {
    const prompt = document.getElementById('legal-prompt').value.trim();

    if (!prompt) {
      alert('Please enter a legal question');
      return;
    }

    document.getElementById('legal-prompt').value = '';
    await apiCall('/ai-legal-assist', { prompt });
  };

  window.callContractInsight = async function() {
    const file = document.getElementById('contract-file').files[0];

    if (!file) {
      alert('Please upload a contract file');
      return;
    }

    const userContent = `Analyzing contract: ${file.name}`;
    const userMsg = addMessage(userContent, true);
    const thinkingMsg = addMessage('Analyzing contract for risks and recommendations...', false, false);

    try {
      const fileText = await file.text();
      const payload = { prompt: fileText.slice(0, 2000) };

      const response = await fetch('/api/contract-insight', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);

      const data = await response.json();
      chatArea.removeChild(thinkingMsg);

      if (data.success) {
        createScoreBadge(data.metrics.risk_score);
        createMetricsVisualization(data.metrics);
        addMessage(data.data, false, true);
      } else {
        addMessage(`Error: ${data.message || 'Unknown error occurred'}`, false, false);
      }
    } catch (error) {
      chatArea.removeChild(thinkingMsg);
      addMessage(`Failed: ${error.message}. Please try again or check your connection.`, false, false);
    }

    document.getElementById('contract-file').value = '';
  };

  window.callJudgmentPredict = async function() {
    const details = document.getElementById('case-details').value.trim();
    const file = document.getElementById('case-file').files[0];

    if (!details && !file) {
      alert('Please provide case details or upload a file');
      return;
    }

    let prompt = details;
    if (file) {
      prompt = await file.text();
      if (details) prompt = `${details}\n\n${prompt}`;
    }

    document.getElementById('case-details').value = '';
    document.getElementById('case-file').value = '';
    await apiCall('/judgment-predict', { prompt: prompt.slice(0, 2000) });
  };

  window.callLegalIQ = async function() {
    const prompt = document.getElementById('iq-prompt').value.trim();

    if (!prompt) {
      alert('Please enter a question or article link');
      return;
    }

    document.getElementById('iq-prompt').value = '';
    await apiCall('/legal-iq', { prompt });
  };

  // ========== Contract Insight Functions ==========

  function createScoreBadge(score) {
    const badgeDiv = document.createElement('div');
    badgeDiv.className = 'score-badge-container';

    let color = '#e74c3c';
    let message = 'High Risk';

    if (score >= 8) {
      color = '#2ecc71'; 
      message = 'Excellent';
    } else if (score >= 5) {
      color = '#f39c12';
      message = 'Moderate';
    }

    badgeDiv.innerHTML = `
      <div class="score-badge" style="background-color: ${color};">
        <div class="score-value">${score}/10</div>
        <div class="score-message">${message}</div>
      </div>
    `;

    chatArea.appendChild(badgeDiv);
    chatArea.scrollTop = chatArea.scrollHeight;
  }

  function createMetricsVisualization(metrics) {
    if (!metrics || (!metrics.strengths && !metrics.weaknesses && !metrics.suggestions)) {
      return; 
    }

    const metricsDiv = document.createElement('div');
    metricsDiv.className = 'contract-metrics';

    metricsDiv.innerHTML = `
      <div class="metrics-container">
        <div class="metric" style="--metric-color: #2ecc71;">
          <div class="metric-value">${metrics.strengths || 0}</div>
          <div class="metric-label">Strengths</div>
        </div>
        <div class="metric" style="--metric-color: #e74c3c;">
          <div class="metric-value">${metrics.weaknesses || 0}</div>
          <div class="metric-label">Weaknesses</div>
        </div>
        <div class="metric" style="--metric-color: #3498db;">
          <div class="metric-value">${metrics.suggestions || 0}</div>
          <div class="metric-label">Suggestions</div>
        </div>
      </div>
    `;

    chatArea.appendChild(metricsDiv);
    chatArea.scrollTop = chatArea.scrollHeight;
  }

  // ========== Event Handlers ==========

  document.querySelectorAll('textarea').forEach(textarea => {
    textarea.addEventListener('input', function() {
      this.style.height = 'auto';
      this.style.height = `${Math.min(this.scrollHeight, 120)}px`;
    });
  });

  document.querySelectorAll('textarea').forEach(textarea => {
    textarea.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        const tabId = this.closest('.tab-content').id;
        switch(tabId) {
          case 'swift-draft': callSwiftDraft(); break;
          case 'ai-legal-assist': callAILegalAssist(); break;
          case 'contract-insight': callContractInsight(); break;
          case 'judgment-predict': callJudgmentPredict(); break;
          case 'legal-iq': callLegalIQ(); break;
        }
      }
    });
  });

  const urlParams = new URLSearchParams(window.location.search);
  const mode = urlParams.get('mode') || 'swift-draft';
  showTab(mode);
});