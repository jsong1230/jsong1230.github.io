import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import OpenAI from 'openai';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// ── Date helpers ──────────────────────────────────────────────────────────────

function getWeekRange(sundayDate) {
  // Given a Sunday date string (YYYY-MM-DD), return the Mon–Sun range
  const sunday = new Date(sundayDate + 'T00:00:00');
  const monday = new Date(sunday);
  monday.setDate(sunday.getDate() - 6);

  const fmt = (d) => d.toISOString().split('T')[0];
  return { monday: fmt(monday), sunday: fmt(sunday) };
}

function dateInRange(date, monday, sunday) {
  return date >= monday && date <= sunday;
}

// ── Collect posts for the week ────────────────────────────────────────────────

function collectWeekPosts(monday, sunday, lang) {
  const postsDir = path.join(__dirname, '../src/content/posts');
  if (!fs.existsSync(postsDir)) return [];

  return fs.readdirSync(postsDir)
    .filter(file => file.endsWith('.mdx'))
    .map(file => {
      const content = fs.readFileSync(path.join(postsDir, file), 'utf-8');
      const titleMatch  = content.match(/title:\s*"([^"]+)"/);
      const dateMatch   = content.match(/date:\s*"([^"]+)"/);
      const langMatch   = content.match(/lang:\s*(\w+)/);
      const excerptMatch = content.match(/excerpt:\s*"([^"]+)"/);

      if (!titleMatch || !dateMatch || !langMatch) return null;

      const postDate = dateMatch[1];
      const postLang = langMatch[1];

      if (postLang !== lang) return null;
      if (!dateInRange(postDate, monday, sunday)) return null;
      // Skip recap posts themselves
      if (titleMatch[1].includes('주간') || titleMatch[1].toLowerCase().includes('weekly')) return null;

      // Extract body (after frontmatter)
      const bodyStart = content.indexOf('---', 3) + 3;
      const body = content.slice(bodyStart).trim().substring(0, 800);

      return {
        date: postDate,
        title: titleMatch[1],
        excerpt: excerptMatch ? excerptMatch[1] : '',
        body,
        slug: file.replace('.mdx', ''),
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.date.localeCompare(b.date));
}

// ── Generate recap with Gemma ─────────────────────────────────────────────────

async function generateRecap(posts, lang, monday, sunday) {
  const isKorean = lang === 'ko';

  const systemPrompt = isKorean
    ? `당신은 블록체인, Web3, DID, AI 분야의 전문가인 송주한(Jeffrey Joo-Han Song)입니다.
한 주간의 개발 일지들을 모아 주간 회고 포스트를 작성합니다.
그 주에 어떤 작업을 했는지, 어떤 기술적 인사이트를 얻었는지, 다음 주를 향한 생각을 담아주세요.
800-1200자 분량으로 작성하세요.`
    : `You are Jeffrey Joo-Han Song, expert in blockchain, Web3, DID, and AI.
Write a weekly retrospective post summarizing the week's development logs.
Cover what was worked on, key technical insights gained, and thoughts looking ahead.
Write approximately 500-800 words.`;

  const postSummaries = posts.map(p =>
    `[${p.date}] ${p.title}\n${p.body}`
  ).join('\n\n---\n\n');

  const userPrompt = isKorean
    ? `${monday} ~ ${sunday} 한 주간의 개발 일지를 바탕으로 주간 회고를 작성해주세요.\n\n이번 주 포스트 목록:\n\n${postSummaries}`
    : `Write a weekly retrospective for the week of ${monday} to ${sunday} based on these daily posts:\n\n${postSummaries}`;

  const completion = await openai.chat.completions.create({
    model: 'gemma-4-31b-it',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user',   content: userPrompt },
    ],
    temperature: 0.7,
    max_tokens: isKorean ? 2000 : 1500,
  });

  return completion.choices[0]?.message?.content?.trim() || null;
}

async function generateTitle(content, lang, monday, sunday) {
  const isKorean = lang === 'ko';
  const prompt = isKorean
    ? `다음 주간 회고 내용의 제목을 만들어주세요. "${monday} ~ ${sunday} 주간 회고:"를 앞에 붙이고 짧은 부제를 추가해주세요. 제목만 출력하세요:\n\n${content.substring(0, 400)}`
    : `Generate a title for this weekly retrospective. Start with "Week of ${monday}:" followed by a short subtitle. Output only the title:\n\n${content.substring(0, 400)}`;

  const completion = await openai.chat.completions.create({
    model: 'gemma-4-31b-it',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
    max_tokens: 60,
  });

  return completion.choices[0]?.message?.content?.trim().replace(/^["']|["']$/g, '') || '';
}

// ── Write MDX ─────────────────────────────────────────────────────────────────

function createRecapMDX(title, content, date, lang, linkedPosts) {
  const slugBase = title
    .toLowerCase()
    .replace(/[^a-z0-9가-힣\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  const filename = `${date}-weekly-recap-${slugBase}.mdx`.substring(0, 120) + '.mdx';
  const filepath = path.join(__dirname, '../src/content/posts', filename);

  let excerpt = content.replace(/^#{1,6}\s+/gm, '').replace(/\n/g, ' ').trim().substring(0, 150);
  if (excerpt.length >= 150) excerpt += '...';

  // Append links to daily posts
  const linkSection = linkedPosts.length > 0
    ? `\n\n---\n\n### ${lang === 'ko' ? '이번 주 포스트' : 'This week\'s posts'}\n\n` +
      linkedPosts.map(p => `- [${p.title}](/writing/${p.slug})`).join('\n')
    : '';

  const mdxContent = `---
title: ${JSON.stringify(title)}
date: "${date}"
lang: ${lang}
excerpt: ${JSON.stringify(excerpt)}
tags: ["weekly-recap"]
---

${content}${linkSection}
`;

  fs.writeFileSync(filepath, mdxContent, 'utf-8');
  return filename;
}

function recapExistsForWeek(sunday, lang) {
  const postsDir = path.join(__dirname, '../src/content/posts');
  if (!fs.existsSync(postsDir)) return false;
  return fs.readdirSync(postsDir).some(f =>
    f.startsWith(sunday) && f.includes('weekly-recap') && fs.readFileSync(
      path.join(postsDir, f), 'utf-8'
    ).match(/lang:\s*(\w+)/)?.[1] === lang
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  // Accept date arg as the Sunday of the target week (default: today)
  const dateArg = process.argv[2];
  const sunday = dateArg && /^\d{4}-\d{2}-\d{2}$/.test(dateArg)
    ? dateArg
    : new Date().toISOString().split('T')[0];

  const { monday } = getWeekRange(sunday);
  console.log(`Generating weekly recap for ${monday} ~ ${sunday}`);

  for (const lang of ['ko', 'en']) {
    if (recapExistsForWeek(sunday, lang)) {
      console.log(`Recap already exists for ${lang}. Skipping.`);
      continue;
    }

    const posts = collectWeekPosts(monday, sunday, lang);
    console.log(`Found ${posts.length} ${lang} posts for the week`);

    if (posts.length === 0) {
      console.log(`No posts found for ${lang}. Skipping.`);
      continue;
    }

    console.log(`Generating ${lang} recap...`);
    const content = await generateRecap(posts, lang, monday, sunday);
    if (!content) {
      console.error(`Failed to generate ${lang} recap`);
      continue;
    }

    const title = await generateTitle(content, lang, monday, sunday);
    const filename = createRecapMDX(title, content, sunday, lang, posts);
    console.log(`Created: ${filename}`);
  }

  console.log('✅ Weekly recap done!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
