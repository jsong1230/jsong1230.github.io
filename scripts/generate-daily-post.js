import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';
import OpenAI from 'openai';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
const envLocalPath = path.join(__dirname, '../.env.local');
const envPath = path.join(__dirname, '../.env');
if (fs.existsSync(envLocalPath)) {
  dotenv.config({ path: envLocalPath });
} else if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'local',
  baseURL: 'http://192.168.0.151:8001/v1',
});

// ── Git activity collection ───────────────────────────────────────────────────

const GIT_SCAN_SCRIPT = (date) => `
find ~/dev -maxdepth 4 -name ".git" -type d 2>/dev/null | while IFS= read -r gitdir; do
  repo=$(dirname "$gitdir")
  reponame=$(basename "$repo")

  # Commit messages + file stats
  log=$(git -C "$repo" log --since="${date} 00:00:00" --until="${date} 23:59:59" --stat --format="commit: %s" 2>/dev/null)
  if [ -z "$log" ]; then continue; fi

  echo "[$reponame]"
  echo "$log" | head -60

  # Actual diff — skip binary, cap at 120 lines
  diff=$(git -C "$repo" log --since="${date} 00:00:00" --until="${date} 23:59:59" -p --no-color 2>/dev/null \
    | grep -v "^Binary" | head -120)
  if [ -n "$diff" ]; then
    echo "--- diff ---"
    echo "$diff"
  fi

  echo ""
done
`;

function runLocal(script) {
  const result = spawnSync('bash', ['-c', script], {
    encoding: 'utf-8',
    timeout: 15000,
  });
  return result.stdout || '';
}

function runRemote(host, script) {
  const result = spawnSync('ssh', [
    '-o', 'ConnectTimeout=5',
    '-o', 'StrictHostKeyChecking=no',
    '-o', 'BatchMode=yes',
    host,
    'bash -s',
  ], {
    input: script,
    encoding: 'utf-8',
    timeout: 20000,
  });
  return result.stdout || '';
}

function collectGitActivity(date) {
  const script = GIT_SCAN_SCRIPT(date);
  const machines = [
    { name: 'gram-jsong', runner: () => runLocal(script) },
    { name: 'mini-jsong', runner: () => runRemote('mini-jsong', script) },
  ];

  const results = [];
  for (const { name, runner } of machines) {
    try {
      const output = runner().trim();
      if (output) {
        results.push({ machine: name, activity: output });
        console.log(`Collected activity from ${name}`);
      } else {
        console.log(`No activity on ${name} for ${date}`);
      }
    } catch (e) {
      console.warn(`Could not collect activity from ${name}: ${e.message}`);
    }
  }
  return results;
}

function formatActivityForPrompt(activityList) {
  return activityList.map(({ machine, activity }) =>
    `## ${machine}\n${activity}`
  ).join('\n\n');
}

// ── Post generation ───────────────────────────────────────────────────────────

const SYSTEM_PROMPT = {
  ko: `당신은 블록체인, Web3, DID, AI 분야의 전문가인 송주한(Jeffrey Joo-Han Song)입니다.
20년 이상의 경력을 가진 CTO이자 엔지니어로서, 기술적 깊이와 실무 경험을 바탕으로 글을 작성합니다.
전문적이면서도 읽기 쉽고, 개인적인 경험과 인사이트를 포함한 블로그 포스트를 작성해주세요.
포스트는 800-1200자 정도의 분량으로 작성해주세요.

**중요: 회사명 사용 규칙**
- "코인플러그" 또는 "Coinplug" → "씨피랩스"로 작성
- 과거 시점을 언급할 때도 현재 회사명(씨피랩스)을 사용하세요.`,

  en: `You are Jeffrey Joo-Han Song, an expert in blockchain, Web3, DID, and AI fields.
As a CTO and engineer with over 20 years of experience, write blog posts based on technical depth and practical experience.
Write professional yet readable blog posts that include personal experiences and insights.
The post should be approximately 500-800 words.

**IMPORTANT: Company Name Usage Rule**
- Always use "CPLABS" instead of "Coinplug", even when referring to past events.`,
};

async function generatePost(lang, gitActivity) {
  const isKorean = lang === 'ko';
  const systemPrompt = SYSTEM_PROMPT[lang];

  let userPrompt;
  if (gitActivity && gitActivity.length > 0) {
    const activityText = formatActivityForPrompt(gitActivity);
    userPrompt = isKorean
      ? `오늘 진행한 개발 작업을 정리해서 블로그 포스트로 작성해주세요.\n어떤 문제를 풀었는지, 어떤 기술적 결정을 했는지, 코드 변경에서 배운 점이나 인사이트를 포함해주세요.\ndiff에 나타난 실제 코드 변경 중 흥미로운 부분이 있으면 인용하거나 설명에 활용해주세요.\n\n**오늘의 git 커밋 및 코드 변경:**\n\n${activityText}`
      : `Please write a blog post summarizing today's development work.\nCover what problems were solved, what technical decisions were made, and insights from the code changes.\nIf there are interesting parts in the diff, feel free to quote or reference them.\n\n**Today's git commits and code changes:**\n\n${activityText}`;
  } else {
    // Fallback: random topic from background
    const fallbackTopics = isKorean
      ? ['블록체인과 DID 기술의 현재', 'AI 개발 도구의 진화', 'Web3 플랫폼 아키텍처 설계']
      : ['The current state of blockchain and DID', 'Evolution of AI development tools', 'Web3 platform architecture design'];
    const topic = fallbackTopics[Math.floor(Math.random() * fallbackTopics.length)];
    userPrompt = isKorean
      ? `다음 주제에 대해 개인적인 경험과 인사이트를 담은 블로그 포스트를 작성해주세요:\n\n${topic}`
      : `Write a blog post with personal experience and insights on:\n\n${topic}`;
    console.log(`No git activity found. Using fallback topic: ${topic}`);
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gemma-4-31b-it',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: isKorean ? 2000 : 1500,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content || content.trim().length === 0) {
      throw new Error('Empty response from model');
    }
    return content;
  } catch (error) {
    console.error('Error generating post:', error);
    return null;
  }
}

async function generateTitle(content, lang) {
  const isKorean = lang === 'ko';
  const prompt = isKorean
    ? `다음 블로그 포스트 내용을 바탕으로 적절한 제목을 생성해주세요. 제목만 출력해주세요:\n\n${content.substring(0, 500)}`
    : `Generate an appropriate title based on the following blog post content. Output only the title:\n\n${content.substring(0, 500)}`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gemma-4-31b-it',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 50,
    });
    return completion.choices[0].message.content.trim().replace(/^["']|["']$/g, '');
  } catch {
    return isKorean ? '오늘의 개발 일지' : "Today's Dev Log";
  }
}

// ── Code review generation ────────────────────────────────────────────────────

async function generateCodeReview(gitActivity) {
  if (!gitActivity || gitActivity.length === 0) return null;

  const activityText = formatActivityForPrompt(gitActivity);

  const systemPrompt = `당신은 시니어 소프트웨어 엔지니어이자 코드 리뷰어입니다.
오늘의 git 커밋과 diff를 분석하여 솔직하고 건설적인 코드 리뷰를 작성해주세요.
칭찬과 개선점 모두 구체적인 코드/커밋을 근거로 작성해주세요.`;

  const userPrompt = `다음 오늘의 커밋과 코드 변경을 리뷰해주세요.
아래 형식으로 작성해주세요:

## ✅ 잘한 점
(구체적인 코드나 결정을 근거로 2~4가지)

## 🔧 개선할 점
(구체적인 코드나 패턴을 근거로 2~4가지)

## 💡 오늘의 기술 포인트
(오늘 작업에서 주목할 만한 기술적 선택이나 패턴 1~2가지)

---

**오늘의 커밋 및 diff:**

${activityText}`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gemma-4-31b-it',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user',   content: userPrompt },
      ],
      temperature: 0.6,
      max_tokens: 1500,
    });
    return completion.choices[0]?.message?.content?.trim() || null;
  } catch (error) {
    console.error('Error generating code review:', error);
    return null;
  }
}

function createCodeReviewMDX(content, date) {
  const filename = `${date}-codereview.mdx`;
  const filepath = path.join(__dirname, '../src/content/posts', filename);

  if (fs.existsSync(filepath)) return null;

  let excerpt = content.replace(/^#{1,6}\s+/gm, '').replace(/\n/g, ' ').trim().substring(0, 150);
  if (excerpt.length >= 150) excerpt += '...';

  fs.writeFileSync(filepath, `---
title: "[코드리뷰] ${date} 오늘의 코드 점검"
date: "${date}"
lang: ko
excerpt: ${JSON.stringify(excerpt)}
tags: ["code-review"]
---

${content}
`);
  return filename;
}

// ── MDX file creation ─────────────────────────────────────────────────────────

function createMDXFile(title, content, date, lang) {
  const slugBase = title
    .toLowerCase()
    .replace(/[^a-z0-9가-힣\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  const slug = `${date}-${slugBase}`;
  const filename = `${slug}.mdx`;
  const filepath = path.join(__dirname, '../src/content/posts', filename);

  let excerpt = content
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\n/g, ' ')
    .trim()
    .substring(0, 150);

  if (excerpt.length >= 150) excerpt += '...';

  const mdxContent = `---
title: ${JSON.stringify(title)}
date: "${date}"
lang: ${lang}
excerpt: ${JSON.stringify(excerpt)}
---

${content}`;

  fs.writeFileSync(filepath, mdxContent, 'utf-8');
  return { filename, slug };
}

function postExistsForDate(date, lang) {
  const postsDir = path.join(__dirname, '../src/content/posts');
  if (!fs.existsSync(postsDir)) return false;

  return fs.readdirSync(postsDir).some(file => {
    if (!file.startsWith(date)) return false;
    try {
      const content = fs.readFileSync(path.join(postsDir, file), 'utf-8');
      const langMatch = content.match(/lang:\s*(\w+)/);
      return langMatch && langMatch[1] === lang;
    } catch {
      return false;
    }
  });
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  try {
    const postsDir = path.join(__dirname, '../src/content/posts');
    if (!fs.existsSync(postsDir)) {
      fs.mkdirSync(postsDir, { recursive: true });
    }

    const dateArg = process.argv[2];
    const date = dateArg && /^\d{4}-\d{2}-\d{2}$/.test(dateArg)
      ? dateArg
      : new Date().toISOString().split('T')[0];

    if (postExistsForDate(date, 'ko') && postExistsForDate(date, 'en')) {
      console.log('Posts for today already exist. Skipping generation.');
      return;
    }

    // Collect today's git activity from gram-jsong + mini-jsong
    console.log(`Collecting git activity for ${date}...`);
    const gitActivity = collectGitActivity(date);
    console.log(`Found activity from ${gitActivity.length} machine(s)`);

    // Generate Korean post
    console.log('Generating Korean post...');
    const koContent = await generatePost('ko', gitActivity);
    if (!koContent) throw new Error('Failed to generate Korean post');
    const koTitle = await generateTitle(koContent, 'ko');
    const koFile = createMDXFile(koTitle, koContent, date, 'ko');
    console.log(`Korean post created: ${koFile.filename}`);

    // Generate English post
    console.log('Generating English post...');
    const enContent = await generatePost('en', gitActivity);
    if (!enContent) throw new Error('Failed to generate English post');
    const enTitle = await generateTitle(enContent, 'en');
    const enFile = createMDXFile(enTitle, enContent, date, 'en');
    console.log(`English post created: ${enFile.filename}`);

    // Generate Korean-only code review post
    if (gitActivity.length > 0) {
      console.log('Generating code review post...');
      const reviewContent = await generateCodeReview(gitActivity);
      if (reviewContent) {
        const reviewFile = createCodeReviewMDX(reviewContent, date);
        if (reviewFile) console.log(`Code review post created: ${reviewFile}`);
      }
    }

    console.log('✅ Daily posts generated successfully!');
  } catch (error) {
    console.error('Error in main:', error);
    process.exit(1);
  }
}

main();
