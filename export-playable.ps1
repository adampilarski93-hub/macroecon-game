# Build the frontend and copy the result to a playable folder (no server needed).
$ErrorActionPreference = "Stop"
$ProjectRoot = $PSScriptRoot
$FrontendDir = Join-Path $ProjectRoot "frontend"
$DistDir = Join-Path $FrontendDir "dist"
$PlayableDir = Join-Path $ProjectRoot "Macro-Planner-Playable"

Set-Location $FrontendDir
npm run build
if (-not (Test-Path $DistDir)) { throw "Build failed: dist not found" }

if (Test-Path $PlayableDir) { Remove-Item $PlayableDir -Recurse -Force }
Copy-Item -Path $DistDir -Destination $PlayableDir -Recurse

$Readme = @"
# Macro Planner — Playable version

Open **index.html** in any modern browser (Chrome, Firefox, Edge). No server or install needed.

- Double-click **index.html**, or
- Drag index.html into your browser, or
- Right-click index.html → Open with → your browser

To share: zip this folder and send it. Anyone can unzip and open index.html to play.
"@
Set-Content -Path (Join-Path $PlayableDir "README.txt") -Value $Readme

Set-Location $ProjectRoot
Write-Host "Done. Playable folder: $PlayableDir"
Write-Host "Open the index.html inside it in your browser to play."
