#!/bin/bash
set -e

REPO_DIR="/home/jsong/dev/jsong1230-github/jsong1230.github.io"
NODE="/home/jsong/.nvm/versions/node/v24.14.1/bin/node"
LOG_FILE="$REPO_DIR/scripts/dashboard.log"

cd "$REPO_DIR"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Updating dashboard data..." >> "$LOG_FILE"

$NODE scripts/generate-dashboard.js >> "$LOG_FILE" 2>&1

git add src/data/dashboard.json
if ! git diff --staged --quiet; then
  git commit -m "chore: Update dashboard data"
  git push
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] Dashboard data pushed." >> "$LOG_FILE"
else
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] No changes in dashboard data." >> "$LOG_FILE"
fi
