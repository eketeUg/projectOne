# Create temp folder
$TempDir = "$env:TEMP\ollama"
New-Item -ItemType Directory -Force -Path $TempDir | Out-Null

# Download Ollama MSI
$InstallerUrl = "https://ollama.com/download/OllamaSetup.exe"
$InstallerPath = "$TempDir\\OllamaSetup.exe"

Write-Host "⏬ Downloading Ollama installer..."
Invoke-WebRequest -Uri $InstallerUrl -OutFile $InstallerPath

# Run installer silently
Write-Host "📦 Installing Ollama..."
Start-Process -FilePath $InstallerPath -ArgumentList "/S" -Wait

# Wait for a few seconds to let the daemon boot
Start-Sleep -Seconds 5

# Launch Ollama model (optional)
Write-Host "🚀 Running llama3 model..."
Start-Process -NoNewWindow -FilePath "ollama" -ArgumentList "run llama3"

Write-Host "✅ Ollama installation and launch complete!"