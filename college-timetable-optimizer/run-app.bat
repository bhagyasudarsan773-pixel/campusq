@echo off
title SnapSchedule AI - College Timetable Optimizer
cd /d "%~dp0"
echo Starting SnapSchedule AI Server on http://localhost:4000 ...
start "" "http://localhost:4000"
node backend/src/server.js
pause
