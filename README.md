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
- **A Gemini API Key**: Obtain from [Google AI Studio](https://aistudio.google.com/) or equivalent Gemini API provider.
- **Font Awesome**: Included via CDN in the project—no separate install needed.

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

4. **Configure Environment Variables**  
   Create a `.env` file in the root directory:
   ```bash
   echo "GEMINI_API_KEY=your-gemini-api-key" > .env
   ```
   Replace `your-gemini-api-key` with your actual Gemini API key.

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
- `.env`: Environment variables (API key).
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

- **API Key**: Update `.env` with your Gemini API key if it changes.
- **Port**: Modify `app.run(port=5000)` in `app.py` to use a different port if needed.

---

## Troubleshooting

- **404 Not Found**: Ensure Flask routes match URLs (e.g., `/` for `index.html`, `/chat` for `ai.html`).
- **API Errors**: Check `.env` for a valid `GEMINI_API_KEY` and internet connectivity.
- **Overlap Issues**: Verify `styles.css` has sufficient `padding-bottom` on `.container` if footer overlaps content.

---

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit changes (`git commit -m "Add feature"`).
4. Push to your fork (`git push origin feature-name`).
5. Open a Pull Request.

---

```
```

---

### How to Use
1. **Copy the Entire Block**: Select all text between the triple backticks (excluding the outer ```markdown and ```).
2. **Create `README.md`**:
   - Save it as `C:\Users\jatin\OneDrive\Documents\Projects\Hackathon\LegalEase\README.md`.
3. **Commit to GitHub**:
   ```bash
   git add README.md
   git commit -m "Add formatted README"
   git push
   ```

