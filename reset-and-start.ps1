#!/usr/bin/env pwsh
# E-Voting System - Complete Reset & Start Script
# Usage: .\reset-and-start.ps1

Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "🔄 E-VOTING SYSTEM - COMPLETE RESET & START" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""

# Step 1: Kill all Node.js processes
Write-Host "🛑 Step 1: Stopping all Node.js processes..." -ForegroundColor Yellow
try {
    taskkill /F /IM node.exe 2>$null
    Write-Host "   ✅ All Node.js processes stopped" -ForegroundColor Green
} catch {
    Write-Host "   ℹ️  No Node.js processes found" -ForegroundColor Gray
}
Start-Sleep -Seconds 2
Write-Host ""

# Step 2: Clear MongoDB database
Write-Host "🗑️  Step 2: Clearing MongoDB database..." -ForegroundColor Yellow
Set-Location backend
try {
    node clear-db.js
    Write-Host "   ✅ Database cleared" -ForegroundColor Green
} catch {
    Write-Host "   ⚠️  Database clear failed (may not exist yet)" -ForegroundColor Yellow
}
Set-Location ..
Write-Host ""

# Step 3: Start Hardhat node in background
Write-Host "⛓️  Step 3: Starting Hardhat blockchain..." -ForegroundColor Yellow
Set-Location contract
$hardhatJob = Start-Job -ScriptBlock {
    Set-Location $using:PWD
    npx hardhat node
}
Write-Host "   ✅ Hardhat node starting (Job ID: $($hardhatJob.Id))" -ForegroundColor Green
Set-Location ..

# Wait for Hardhat to start
Write-Host "   ⏳ Waiting for Hardhat to initialize..." -ForegroundColor Gray
Start-Sleep -Seconds 8
Write-Host ""

# Step 4: Deploy smart contract
Write-Host "📜 Step 4: Deploying smart contract..." -ForegroundColor Yellow
Set-Location contract
try {
    npx hardhat run scripts/deploy.js --network localhost
    Write-Host "   ✅ Contract deployed successfully" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Contract deployment failed!" -ForegroundColor Red
    exit 1
}
Set-Location ..
Write-Host ""

# Step 5: Start backend in background
Write-Host "🔧 Step 5: Starting backend server..." -ForegroundColor Yellow
Set-Location backend
$backendJob = Start-Job -ScriptBlock {
    Set-Location $using:PWD
    npm run dev
}
Write-Host "   ✅ Backend server starting (Job ID: $($backendJob.Id))" -ForegroundColor Green
Set-Location ..
Start-Sleep -Seconds 3
Write-Host ""

# Step 6: Start frontend in background
Write-Host "🎨 Step 6: Starting frontend development server..." -ForegroundColor Yellow
Set-Location frontend
$frontendJob = Start-Job -ScriptBlock {
    Set-Location $using:PWD
    npm run dev
}
Write-Host "   ✅ Frontend server starting (Job ID: $($frontendJob.Id))" -ForegroundColor Green
Set-Location ..
Start-Sleep -Seconds 3
Write-Host ""

# Summary
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host "✅ SYSTEM RESET & START COMPLETE!" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Services Running:" -ForegroundColor Cyan
Write-Host "   • Hardhat:  http://127.0.0.1:8545 (Job ID: $($hardhatJob.Id))"
Write-Host "   • Backend:  http://localhost:4000 (Job ID: $($backendJob.Id))"
Write-Host "   • Frontend: http://localhost:5173 (Job ID: $($frontendJob.Id))"
Write-Host ""
Write-Host "📊 System Status:" -ForegroundColor Cyan
Write-Host "   ✅ Blockchain:  Fresh (Block #0)"
Write-Host "   ✅ Database:    Empty (0 voters)"
Write-Host "   ✅ Contract:    Deployed with 3 candidates"
Write-Host "   ✅ Votes:       All at 0"
Write-Host ""
Write-Host "🎯 Next Steps:" -ForegroundColor Yellow
Write-Host "   1. Clear MetaMask activity (Settings → Advanced → Clear activity tab data)"
Write-Host "   2. Open http://localhost:5173"
Write-Host "   3. Start testing!"
Write-Host ""
Write-Host "🛠️  Commands:" -ForegroundColor Cyan
Write-Host "   • Check status:  Get-Job"
Write-Host "   • View logs:     Receive-Job <JobID>"
Write-Host "   • Stop all:      Get-Job | Stop-Job; Get-Job | Remove-Job"
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green

# Keep jobs running
Write-Host "💡 Press Ctrl+C to stop all services" -ForegroundColor Yellow
Write-Host ""

# Monitor jobs (optional - keeps script running)
try {
    while ($true) {
        Start-Sleep -Seconds 10
        # Check if any job failed
        $jobs = Get-Job
        foreach ($job in $jobs) {
            if ($job.State -eq "Failed") {
                Write-Host "❌ Job $($job.Id) failed!" -ForegroundColor Red
            }
        }
    }
} finally {
    # Cleanup on exit
    Write-Host ""
    Write-Host "🛑 Stopping all services..." -ForegroundColor Yellow
    Get-Job | Stop-Job
    Get-Job | Remove-Job
    Write-Host "✅ All services stopped" -ForegroundColor Green
}
