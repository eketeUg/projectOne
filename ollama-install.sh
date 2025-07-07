#!/bin/bash

# Define variables
OLLAMA_URL="https://ollama.com/download/Ollama.zip"
TMP_DIR="/tmp/ollama"
ZIP_PATH="$TMP_DIR/Ollama.zip"
APP_PATH="/Applications/Ollama.app"

# Create temp directory
mkdir -p "$TMP_DIR"

# Download Ollama ZIP
echo "Downloading Ollama..."
curl -L "$OLLAMA_URL" -o "$ZIP_PATH"

# Unzip the app
echo "Unzipping Ollama..."
unzip -q "$ZIP_PATH" -d "$TMP_DIR"

# Move to /Applications
echo "Installing Ollama to /Applications..."
mv -f "$TMP_DIR/Ollama.app" "$APP_PATH"

# Open the app to launch the daemon
echo "Launching Ollama..."
open -a "$APP_PATH"

# Clean up
rm -rf "$TMP_DIR"

echo "✅ Ollama installed and launched."