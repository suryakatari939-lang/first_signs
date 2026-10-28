@echo off
REM Double-click to start First Signs on Windows, then open http://localhost:8000
cd /d "%~dp0"
start "" http://localhost:8000
where py >nul 2>nul && (py -m http.server 8000 & goto :eof)
where python >nul 2>nul && (python -m http.server 8000 & goto :eof)
npx --yes serve -l 8000 .
