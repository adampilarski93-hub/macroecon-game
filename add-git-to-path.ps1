# Add Git to your user PATH permanently (no admin required).
$gitPath = "C:\Program Files\Git\bin"
if (-not (Test-Path "$gitPath\git.exe")) {
    Write-Host "Git not found at $gitPath. Install from https://git-scm.com/download/win first."
    exit 1
}

$userPath = [Environment]::GetEnvironmentVariable("Path", "User")
if ($userPath -like "*$gitPath*") {
    Write-Host "Git is already in your PATH."
    exit 0
}

[Environment]::SetEnvironmentVariable("Path", "$userPath;$gitPath", "User")
Write-Host "Done. Git has been added to your PATH."
Write-Host "Close this terminal and open a new one (or restart Cursor), then run: git --version"
