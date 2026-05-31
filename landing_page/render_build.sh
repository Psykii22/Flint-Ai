#!/usr/bin/env bash
# exit on error
set -o errexit

# 1. Install Node.js dependencies
npm install

# 2. Build the Vite and Express production bundle
npm run build

# 3. Create backend coral directory if not exists
mkdir -p ../backend/coral

# 4. Download and install Coral binary for Linux
echo "Installing Coral SQL runtime..."
curl -fsSL https://withcoral.com/install.sh | sh

# 5. Link the Coral binary to the expected path
cp ~/.coral/bin/coral ../backend/coral/coral
chmod +x ../backend/coral/coral

# 6. Dynamically update the absolute paths in supabase-source.yaml to match Render's path
REPO_PATH=$(cd .. && pwd)
echo "Setting database paths relative to repository root: ${REPO_PATH}"
sed -i "s|file:///d:/Hackathon/Finguard-v1|file://${REPO_PATH}|g" ../backend/coral/supabase-source.yaml

# 7. Register the data source with the Coral runner
~/.coral/bin/coral source add --file ../backend/coral/supabase-source.yaml

echo "Flint AI Render Build completed successfully!"
