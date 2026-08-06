@echo off
cd /d "%~dp0"
set PATH=C:\nodejs;%PATH%
echo Starting Iryax React Frontend on https://chatbot.iryax.com
npm run dev
pause
