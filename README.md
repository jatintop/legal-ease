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

Before running LegalEase, ensure you have the following installed on your system:

- **Python 3.8+**: Required to run the Flask app.
- **Git**: Needed to clone the repository.
- **Font Awesome**: Included via CDN—no separate install required.

**Note**: The Gemini API key is pre-configured in the `.env` file for hackathon purposes—no need to obtain your own.

---

## Installation

Follow these steps exactly to set up and run LegalEase:

1. **Install Python**  
   - **Windows**: Download and install Python 3.8+ from [python.org](https://www.python.org/downloads/). During installation, check "Add Python to PATH".
   - **macOS**: Open Terminal and run:
     ```bash
     brew install python
     ```
     (Requires Homebrew—install it with `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"` if not present.)
   - **Linux**: Open a terminal and run:
     ```bash
     sudo apt update
     sudo apt install python3 python3-pip
     ```
   - Verify installation:
     ```bash
     python3 --version  # Should output Python 3.8+ (or python --version on Windows)
     ```

2. **Install Git**  
   - **Windows**: Download and install Git from [git-scm.com](https://git-scm.com/downloads). Accept defaults during setup.
   - **macOS**: Open Terminal and run:
     ```bash
     brew install git
     ```
   - **Linux**: Open a terminal and run:
     ```bash
     sudo apt install git
     ```
   - Verify installation:
     ```bash
     git --version  # Should output git version 2.x.x
     ```

3. **Clone the Repository**  
   Open a terminal and navigate to your desired directory:
   ```bash
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo
   ```

4. **Set Up a Virtual Environment**  
   Create and activate a virtual environment:
   ```bash
   python3 -m venv myenv  # Windows: python -m venv myenv
   # Windows
   myenv\Scripts\activate
   # macOS/Linux
   source myenv/bin/activate
   ```
   - Verify activation: Your terminal prompt should change (e.g., `(myenv)`).

5. **Install Dependencies**  
   The repo includes a `requirements.txt` file with all Python packages. Install them:
   ```bash
   pip install -r requirements.txt
   ```
   - If missing, create it with:
     ```bash
     echo "flask==2.3.3" > requirements.txt
     echo "requests==2.31.0" >> requirements.txt
     echo "python-dotenv==1.0.0" >> requirements.txt
     pip install -r requirements.txt
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
├── requirements.txt
└── README.md
```

- `static/`: Frontend assets (JS, CSS).
- `templates/`: HTML templates (`index.html` for home, `ai.html` for chat).
- `.env`: Pre-configured with Gemini API key.
- `app.py`: Flask backend.
- `prompts.py`: Prompt templates for Gemini API.
- `requirements.txt`: Lists Python dependencies.

---

## Running the Application

1. **Start the Flask Server**  
   From the root directory, with the virtual environment activated:
   ```bash
   python app.py
   ```
   - The app runs on `http://localhost:5000` in debug mode.

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
- **Port**: Modify `app.run(port=5000)` in `app.py` to use a different port if needed:
  ```python
  # In app.py, change to desired port, e.g., 8080
  if __name__ == '__main__':
      app.run(port=8080, debug=True)
  ```

---

## Troubleshooting

- **Command Not Found**: Ensure Python and Git are in your PATH:
  ```bash
  # Windows: Check "Add Python to PATH" during install, or manually add C:\Python39\ and C:\Program Files\Git\bin\
  # macOS/Linux: Verify with `which python3` and `which git`
  ```
- **404 Not Found**: Confirm Flask routes match URLs (`/` for `index.html`, `/chat` for `ai.html`).
- **API Errors**: Verify internet connectivity—API key is pre-set in `.env`.

---
