#!/bin/sh
# Starts the React app on http://localhost:5173
#
# Run it with:   ./run-frontend.sh

set -e

PROJECT_DIR=$(cd "$(dirname "$0")" && pwd)
cd "$PROJECT_DIR/frontend"

# Install dependencies the first time only.
[ -d node_modules ] || npm install

exec npm run dev
