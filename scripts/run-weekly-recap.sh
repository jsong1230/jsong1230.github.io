#!/bin/bash
set -e

REPO_DIR="/home/jsong/dev/jsong1230-github/jsong1230.github.io"
NODE="/home/jsong/.nvm/versions/node/v24.14.1/bin/node"
LOG_FILE="$REPO_DIR/scripts/weekly-recap.log"

cd "$REPO_DIR"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Starting weekly recap generation..." >> "$LOG_FILE"

$NODE scripts/generate-weekly-recap.js >> "$LOG_FILE" 2>&1

git add src/content/posts/
if ! git diff --staged --quiet; then
  git commit -m "Auto-generate weekly recap"
  git push
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] Weekly recap committed and pushed." >> "$LOG_FILE"
else
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] No new recap to commit." >> "$LOG_FILE"
fi
