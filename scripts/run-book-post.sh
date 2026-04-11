#!/bin/bash
set -e

REPO_DIR="/home/jsong/dev/jsong1230-github/jsong1230.github.io"
NODE="/home/jsong/.nvm/versions/node/v24.14.1/bin/node"
LOG_FILE="$REPO_DIR/scripts/book-post.log"

cd "$REPO_DIR"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Starting book post generation..." >> "$LOG_FILE"

$NODE scripts/generate-book-post.js >> "$LOG_FILE" 2>&1

git add src/content/posts/ scripts/used-book-videos.json
if ! git diff --staged --quiet; then
  git commit -m "Auto-generate weekly book post"
  git push
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] Book post committed and pushed." >> "$LOG_FILE"
else
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] No new book post to commit." >> "$LOG_FILE"
fi
