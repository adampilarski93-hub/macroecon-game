# Create a Desktop shortcut that runs the game via a local server (so the page loads correctly).
$ErrorActionPreference = "Stop"
$ProjectRoot = $PSScriptRoot
$PlayableDir = Join-Path $ProjectRoot "Macro-Planner-Playable"
$IndexPath = Join-Path $PlayableDir "index.html"
$Desktop = [Environment]::GetFolderPath("Desktop")
$ShortcutPath = Join-Path $Desktop "Macro Planner.lnk"
$LauncherScript = Join-Path $ProjectRoot "start-playable-server.ps1"

if (-not (Test-Path $IndexPath)) {
    Write-Host "Playable folder not found. Running export-playable.ps1 first..."
    & (Join-Path $ProjectRoot "export-playable.ps1")
}

if (-not (Test-Path $IndexPath)) {
    Write-Host "Error: index.html still missing. Build the frontend and run export-playable.ps1 first."
    exit 1
}

$WshShell = New-Object -ComObject WScript.Shell
$Shortcut = $WshShell.CreateShortcut($ShortcutPath)
$Shortcut.TargetPath = "powershell.exe"
$Shortcut.Arguments = "-ExecutionPolicy Bypass -NoProfile -File `"$LauncherScript`""
$Shortcut.WorkingDirectory = $ProjectRoot
$Shortcut.Description = "Macro Planner - open in browser"
$Shortcut.Save()
[System.Runtime.Interopservices.Marshal]::ReleaseComObject($WshShell) | Out-Null

Write-Host "Desktop shortcut created: $ShortcutPath"
Write-Host "Double-click ""Macro Planner"" on your Desktop to play."
Write-Host "A small server window will open - close it when you are done playing."
