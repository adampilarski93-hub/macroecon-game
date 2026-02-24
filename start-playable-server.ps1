# Serve the playable folder over HTTP and open in browser (fixes blank page from file://).
$ErrorActionPreference = "Stop"
$ProjectRoot = $PSScriptRoot
$PlayableDir = Join-Path $ProjectRoot "Macro-Planner-Playable"
$IndexPath = Join-Path $PlayableDir "index.html"
$Port = 8765

if (-not (Test-Path $IndexPath)) {
    Write-Host "Playable folder not found. Run export-playable.ps1 first."
    pause
    exit 1
}

# Start a static server in a new window so the game loads properly (no file://)
$InnerCmd = "Set-Location '$ProjectRoot'; Write-Host 'Macro Planner - server'; Write-Host 'Close this window when you are done playing.'; Write-Host ''; npx --yes serve './Macro-Planner-Playable' -l $Port"
Start-Process powershell -ArgumentList "-NoExit", "-Command", $InnerCmd

Start-Sleep -Seconds 3
Start-Process "http://localhost:$Port"
Write-Host "Opening Macro Planner in your browser. Close the server window when done."
