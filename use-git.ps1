# Add Git to PATH for this session so "git" works in the terminal.
# Run this once at the start of a terminal session:  . .\use-git.ps1
$gitPath = "C:\Program Files\Git\bin"
if (Test-Path $gitPath) {
    $env:Path = "$gitPath;$env:Path"
    Write-Host "Git is now available. Try: git --version"
} else {
    Write-Host "Git not found at $gitPath. Install from https://git-scm.com/download/win"
}
