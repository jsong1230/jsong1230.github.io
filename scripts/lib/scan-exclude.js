import fs from 'fs';
import os from 'os';
import path from 'path';

// Repo-name patterns to skip when scanning ~/dev for git activity.
// The list lives outside this public repo so private repo names are never published.
// One shell glob per line, matched against the repo directory basename; '#' starts a comment.
const EXCLUDE_FILE = process.env.BLOG_SCAN_EXCLUDE_FILE
  || path.join(os.homedir(), '.config', 'blog-scan-exclude');

const SAFE_GLOB = /^[A-Za-z0-9._*?\[\]-]+$/;

// Returns a bash `case` clause that skips excluded repos (tests the shell variable named by varName),
// or null when the exclude file is missing/empty — callers must then skip scanning (fail closed).
export function excludeClause(varName) {
  if (!fs.existsSync(EXCLUDE_FILE)) {
    console.warn(`Scan exclude file not found: ${EXCLUDE_FILE} — skipping repo scan`);
    return null;
  }
  const patterns = fs.readFileSync(EXCLUDE_FILE, 'utf-8')
    .split('\n')
    .map(l => l.replace(/#.*/, '').trim())
    .filter(Boolean);
  const bad = patterns.filter(p => !SAFE_GLOB.test(p));
  if (bad.length || patterns.length === 0) {
    console.warn(`Scan exclude file invalid or empty (${bad.length} bad lines) — skipping repo scan`);
    return null;
  }
  return `case "$${varName}" in ${patterns.join('|')}) continue ;; esac`;
}
