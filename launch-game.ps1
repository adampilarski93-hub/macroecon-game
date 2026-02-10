# Macro Planner — one-click launcher (build if needed, then start server and open game)
$ErrorActionPreference = "Stop"
$ProjectRoot = $PSScriptRoot
Set-Location $ProjectRoot

$backendPublic = Join-Path $ProjectRoot "backend\public"
$frontendDist = Join-Path $ProjectRoot "frontend\dist"
$indexPath = Join-Path $backendPublic "index.html"

# Build frontend and copy to backend/public if not already built
if (-not (Test-Path $indexPath)) {
    Write-Host "Building frontend and preparing game..."
    Set-Location (Join-Path $ProjectRoot "frontend")
    if (-not (Test-Path "node_modules")) { npm install }
    npm run build
    if (-not (Test-Path $backendPublic)) { New-Item -ItemType Directory -Path $backendPublic -Force }
    Copy-Item -Path "$frontendDist\*" -Destination $backendPublic -Recurse -Force
    Set-Location $ProjectRoot
}

# Build backend
Write-Host "Building backend..."
Set-Location (Join-Path $ProjectRoot "backend")
if (-not (Test-Path "node_modules")) { npm install }
npm run build
Set-Location $ProjectRoot

# Start server in a new window (user can close that window to stop the game)
$backendDir = Join-Path $ProjectRoot "backend"
Start-Process -FilePath "node" -ArgumentList "dist/index.js" -WorkingDirectory $backendDir

Start-Sleep -Seconds 2
Start-Process "http://localhost:3001"
Write-Host "Macro Planner is open in your browser. Close the server window when you are done."
