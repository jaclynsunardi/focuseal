# Focuseal

**Focuseal** is an AI-powered productivity app designed to help you stay focused and in control. It combines a Pomodoro timer, intelligent to-do list, and dynamic distraction-blocking system powered by machine learning — all beautifully integrated across devices.

Whether you're coding, studying, or just trying to reclaim your time, Focuseal helps you stay sealed in your flow.

## Why Focuseal?

- **AI-Based Focus Guard** — auto-detects and blocks distracting websites or apps in real time.
- **Pomodoro-Powered Workflow** — customizable work/break intervals to keep your energy balanced.
- **Smart To-Do List** — adaptive and priority-aware tasks that evolve with your habits.
- **Cross-Device Sync** — your timer and task progress syncs between desktop and mobile.
- **Visual Focus Dashboard** — track your focus streaks, trends, and productivity stats.

## Features

- Customizable Pomodoro timer (work, break, long break)
- Intelligent task manager with deadlines, tags, and focus weight
- AI/ML-based website blocking (with real-time classification and feedback loop)
- Local app and browser control engine
- Mobile sync via secure socket communication
- Insightful focus reports, daily/weekly breakdown
- Minimalist interface with dark/light modes

## Tech Stack

- **Frontend**: Electron (for desktop UI), React, TailwindCSS  
- **Backend**: Node.js, Express, Socket.IO  
- **Machine Learning**: Python (Scikit-learn / ONNX Runtime / TensorFlow Lite)  
- **App Blocking**: Native bindings (Windows/macOS), local DNS interception or host file, Python (TensorFlow/ONNX Runtime or similar) 
- **Sync**: WebSocket-based real-time sync engine  
- **Dev Tools**: ESLint, Prettier, Husky, GitHub Actions

## Installation (Local Development)

```bash
# Clone the repo
git clone https://github.com/jaclynsunardi/focuseal.git
cd focuseal

# Install desktop app dependencies
cd desktop
npm install

# Install backend server
cd ../server
npm install

# (Optional) Set up Python ML environment
cd ../ml-model
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt

# Run everything
# Terminal 1 - Backend Server
cd server
npm run dev

# Terminal 2 - Desktop App
cd desktop
npm run electron
```