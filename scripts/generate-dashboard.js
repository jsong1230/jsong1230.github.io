import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ── Shell helpers ─────────────────────────────────────────────────────────────

function runLocal(script) {
  const result = spawnSync('bash', ['-c', script], {
    encoding: 'utf-8', timeout: 15000,
  });
  return (result.stdout || '').trim();
}

function runRemote(host, script) {
  const result = spawnSync('ssh', [
    '-o', 'ConnectTimeout=5',
    '-o', 'StrictHostKeyChecking=no',
    '-o', 'BatchMode=yes',
    host, 'bash -s',
  ], { input: script, encoding: 'utf-8', timeout: 20000 });
  return (result.stdout || '').trim();
}

// ── Repo stats collector ──────────────────────────────────────────────────────

const REPO_SCRIPT = `
find ~/dev -maxdepth 4 -name ".git" -type d 2>/dev/null | while IFS= read -r gitdir; do
  repo=$(dirname "$gitdir")
  name=$(basename "$repo")

  # last commit info
  last_hash=$(git -C "$repo" log -1 --format="%H" 2>/dev/null)
  [ -z "$last_hash" ] && continue

  last_date=$(git -C "$repo" log -1 --format="%ci" 2>/dev/null | cut -d' ' -f1)
  last_msg=$(git -C "$repo" log -1 --format="%s" 2>/dev/null | head -c 80)
  branch=$(git -C "$repo" rev-parse --abbrev-ref HEAD 2>/dev/null)

  # commits per day for last 7 days
  today=$(date +%Y-%m-%d)
  activity=""
  for i in 6 5 4 3 2 1 0; do
    day=$(date -d "$today -$i days" +%Y-%m-%d 2>/dev/null || date -v-\${i}d +%Y-%m-%d 2>/dev/null)
    count=$(git -C "$repo" log --since="$day 00:00:00" --until="$day 23:59:59" --oneline 2>/dev/null | wc -l | tr -d ' ')
    activity="$activity$count,"
  done
  activity=$(echo "$activity" | sed 's/,$//')

  # commits last 7d and 30d
  c7=$(git -C "$repo" log --since="7 days ago" --oneline 2>/dev/null | wc -l | tr -d ' ')
  c30=$(git -C "$repo" log --since="30 days ago" --oneline 2>/dev/null | wc -l | tr -d ' ')

  echo "$name|$last_date|$last_msg|$branch|$activity|$c7|$c30"
done
`;

function parseRepos(output) {
  if (!output) return [];
  return output.split('\n')
    .filter(Boolean)
    .map(line => {
      const parts = line.split('|');
      if (parts.length < 7) return null;
      const [name, last_date, last_msg, branch, activityStr, c7, c30] = parts;
      const activity = activityStr.split(',').map(Number);
      return {
        name,
        last_date,
        last_msg,
        branch,
        activity,
        commits_7d: parseInt(c7) || 0,
        commits_30d: parseInt(c30) || 0,
      };
    })
    .filter(Boolean)
    .sort((a, b) => b.last_date.localeCompare(a.last_date));
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  const machines = [
    { name: 'gram-jsong', runner: () => runLocal(REPO_SCRIPT) },
    { name: 'mini-jsong', runner: () => runRemote('mini-jsong', REPO_SCRIPT) },
  ];

  const result = {
    generated_at: new Date().toISOString(),
    machines: [],
  };

  for (const { name, runner } of machines) {
    try {
      const output = runner();
      const repos = parseRepos(output);
      result.machines.push({ name, repos });
      console.log(`${name}: ${repos.length} repos`);
    } catch (e) {
      console.warn(`Could not collect from ${name}: ${e.message}`);
      result.machines.push({ name, repos: [] });
    }
  }

  const outPath = path.join(__dirname, '../src/data/dashboard.json');
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2));
  console.log(`✅ Dashboard data written to ${outPath}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
