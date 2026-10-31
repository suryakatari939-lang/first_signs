#!/bin/bash
# Gets the newest First Signs code from GitHub, then starts the app at http://localhost:8000
# Run it from Terminal with:  bash update-and-start.command
cd "$(dirname "$0")"

if [ -d .git ]; then
  echo "Getting the newest version from GitHub..."
  git checkout -q main 2>/dev/null
  git pull --ff-only || echo "Couldn't update (no internet, or you changed files here). Starting the version you have."
else
  echo "This folder was downloaded as a ZIP, so it can't update itself."
  echo "Follow the one-time setup in README.md (Run the latest version) to get a folder that updates."
fi

PORT=8000
while lsof -i :$PORT >/dev/null 2>&1; do PORT=$((PORT + 1)); done
echo "Starting First Signs at http://localhost:$PORT (press Ctrl+C to stop)"
(sleep 1 && open "http://localhost:$PORT") &
python3 -m http.server $PORT
