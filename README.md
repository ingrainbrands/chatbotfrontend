# Iryax AI Assistant - Frontend Widget

An interactive, responsive AI Chatbot widget built with React and Vite. Features a floating chat button, dark/light theme toggle, real-time message streaming support, source attribution cards, and conversation management.

## 🚀 Features

- **Floating Chat Widget**: Expandable/collapsible floating widget for seamless website integration.
- **Real-Time AI Chat**: Connected to the Iryax AI FastAPI backend service.
- **Clear Chat**: Easily reset chat history and start a new conversation.
- **Theme Toggle**: Light and Dark mode options.
- **Responsive & Modern Design**: Smooth animations, responsive layout, markdown formatting support.

## 🛠️ Prerequisites

- **Node.js**: v18 or higher recommended.

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ingrainbrands/chatbotfrontend.git
   cd chatbotfrontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## 🚀 Running the Development Server

### Option 1: Via npm
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Option 2: Via Batch Script (Windows)
Double-click `run_frontend.bat` or execute in terminal:
```powershell
.\run_frontend.bat
```

## 🏗️ Production Build

To build the project for production deployment:
```bash
npm run build
```
The production bundle will be generated in the `dist/` directory.

## 🔧 Environment Configuration

Edit the `.env` file to customize settings:

```env
VITE_APP_NAME=Iryax AI
VITE_API_BASE_URL=
VITE_API_VERSION=v1
VITE_REQUEST_TIMEOUT=90000
VITE_ENABLE_STREAMING=false
```
*(Note: `VITE_API_BASE_URL` is left empty by default to leverage Vite's dev server proxy to the backend server)*

## 📄 License

Private - Ingrain Brands / Iryax AI
