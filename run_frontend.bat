@echo off
cd /d "%~dp0"
set PATH=C:\nodejs;%PATH%
echo Starting Iryax React Frontend on http://localhost:5173
npm run dev
pause
