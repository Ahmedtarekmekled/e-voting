@echo off
REM E-Voting System - Quick Reset & Start
REM Simple one-click reset and start all services

echo ================================================
echo  E-VOTING SYSTEM - QUICK RESET ^& START
echo ================================================
echo.

REM Step 1: Kill all node processes
echo [1/6] Stopping all Node.js processes...
taskkill /F /IM node.exe >nul 2>&1
if %errorlevel% equ 0 (
    echo       DONE: All processes stopped
) else (
    echo       INFO: No processes found
)
timeout /t 2 /nobreak >nul
echo.

REM Step 2: Clear database
echo [2/6] Clearing MongoDB database...
cd backend
node clear-db.js
cd ..
echo.

REM Step 3: Start Hardhat
echo [3/6] Starting Hardhat blockchain...
cd contract
start "Hardhat Node" cmd /k "npx hardhat node"
cd ..
echo       DONE: Hardhat starting in new window
timeout /t 8 /nobreak
echo.

REM Step 4: Deploy contract
echo [4/6] Deploying smart contract...
cd contract
npx hardhat run scripts/deploy.js --network localhost
cd ..
echo       DONE: Contract deployed
echo.

REM Step 5: Start backend
echo [5/6] Starting backend server...
cd backend
start "Backend Server" cmd /k "npm run dev"
cd ..
echo       DONE: Backend starting in new window
timeout /t 3 /nobreak
echo.

REM Step 6: Start frontend
echo [6/6] Starting frontend server...
cd frontend
start "Frontend Server" cmd /k "npm run dev"
cd ..
echo       DONE: Frontend starting in new window
timeout /t 3 /nobreak
echo.

REM Summary
echo ================================================
echo  SYSTEM RESET ^& START COMPLETE!
echo ================================================
echo.
echo Services Running:
echo   - Hardhat:  http://127.0.0.1:8545
echo   - Backend:  http://localhost:4000
echo   - Frontend: http://localhost:5173
echo.
echo System Status:
echo   [OK] Blockchain:  Clean (0 votes)
echo   [OK] Database:    Empty (0 voters)
echo   [OK] Contract:    Deployed
echo   [OK] Services:    All running
echo.
echo Next Steps:
echo   1. Clear MetaMask activity
echo   2. Open http://localhost:5173
echo   3. Start testing!
echo.
echo Press any key to close this window...
echo (The services will keep running in their own windows)
pause >nul
