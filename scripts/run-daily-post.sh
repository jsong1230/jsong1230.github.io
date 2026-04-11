#!/bin/bash
set -e

REPO_DIR="/home/jsong/dev/jsong1230-github/jsong1230.github.io"
NODE="/home/jsong/.nvm/versions/node/v24.14.1/bin/node"
LOG_FILE="$REPO_DIR/scripts/daily-post.log"

cd "$REPO_DIR"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Starting daily post generation..." >> "$LOG_FILE"

# Generate posts
$NODE scripts/generate-daily-post.js >> "$LOG_FILE" 2>&1

# Commit and push if there are changes
git add src/content/posts/
if ! git diff --staged --quiet; then
  git commit -m "Auto-generate daily posts"
  git push
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] Posts committed and pushed." >> "$LOG_FILE"
else
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] No new posts to commit." >> "$LOG_FILE"
fi
