import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawnSync, execSync } from 'child_process';
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

const CHANNEL_URL  = 'https://www.youtube.com/@BeyondPage_Bi';
const USED_FILE    = path.join(__dirname, 'used-book-videos.json');
const YTDLP        = '/home/jsong/.local/bin/yt-dlp';

// ── Used video tracking ───────────────────────────────────────────────────────

function loadUsed() {
  if (!fs.existsSync(USED_FILE)) return [];
  return JSON.parse(fs.readFileSync(USED_FILE, 'utf-8'));
}

function saveUsed(ids) {
  fs.writeFileSync(USED_FILE, JSON.stringify(ids, null, 2));
}

// ── Fetch channel video list ──────────────────────────────────────────────────

function fetchVideoList() {
  console.log('Fetching channel video list...');
  const result = spawnSync(YTDLP, [
    '--flat-playlist', '--dump-json', CHANNEL_URL,
  ], { encoding: 'utf-8', timeout: 60000 });

  if (result.error) throw new Error(`yt-dlp error: ${result.error.message}`);

  return result.stdout
    .split('\n')
    .filter(Boolean)
    .map(line => JSON.parse(line));
}

// ── Pick a Korean/English video pair ─────────────────────────────────────────

function pickVideoPair(videos, usedIds) {
  // Korean summary videos: [핵심 요약]
  const koVideos = videos.filter(v =>
    v.title.includes('[핵심 요약]') && !usedIds.includes(v.id)
  );

  if (koVideos.length === 0) {
    console.log('All summary videos used — resetting history');
    saveUsed([]);
    return pickVideoPair(videos, []);
  }

  const ko = koVideos[Math.floor(Math.random() * koVideos.length)];

  // Extract book title to find the matching English video
  // e.g. "[핵심 요약] 호모 데우스 (Homo Deus · ...)" → "Homo Deus"
  const enTitleMatch = ko.title.match(/\(([^·]+)/);
  const enKeyword = enTitleMatch ? enTitleMatch[1].trim() : null;

  let en = null;
  if (enKeyword) {
    en = videos.find(v =>
      v.title.includes('[Summary]') &&
      v.title.toLowerCase().includes(enKeyword.toLowerCase())
    );
  }

  return { ko, en };
}

// ── Download subtitles ────────────────────────────────────────────────────────

function downloadSubtitle(videoId, lang) {
  const outPath = `/tmp/book-sub-${videoId}`;
  const url = `https://www.youtube.com/watch?v=${videoId}`;

  spawnSync(YTDLP, [
    '--write-sub', '--write-auto-sub',
    '--sub-lang', lang,
    '--sub-format', 'vtt',
    '--skip-download',
    '-o', outPath,
    url,
  ], { encoding: 'utf-8', timeout: 30000 });

  // Find the downloaded file
  const files = fs.readdirSync('/tmp').filter(f =>
    f.startsWith(`book-sub-${videoId}`) && f.endsWith('.vtt')
  );
  if (files.length === 0) return null;

  const vttContent = fs.readFileSync(`/tmp/${files[0]}`, 'utf-8');

  // Clean up temp files
  files.forEach(f => fs.unlinkSync(`/tmp/${f}`));

  return parseVTT(vttContent);
}

function parseVTT(vtt) {
  // Strip VTT headers, timestamps, and deduplicate lines
  const lines = vtt.split('\n');
  const seen = new Set();
  const text = [];

  for (const line of lines) {
    const l = line.trim();
    if (!l) continue;
    if (l === 'WEBVTT') continue;
    if (l.startsWith('NOTE')) continue;
    if (/^\d+$/.test(l)) continue;                        // cue number
    if (/\d{2}:\d{2}/.test(l)) continue;                  // timestamp
    if (l.startsWith('<') || l.includes('align:')) continue; // tags

    const clean = l.replace(/<[^>]+>/g, '').trim();
    if (!clean || seen.has(clean)) continue;
    seen.add(clean);
    text.push(clean);
  }

  return text.join(' ');
}

// ── MDX sanitization ─────────────────────────────────────────────────────────

// Replace <Korean/non-latin text> with 『text』 to prevent MDX parse errors
function sanitizeMDX(content) {
  return content.replace(/<([^>a-zA-Z\/!][^>]*)>/g, (match, inner) => {
    // If it looks like a real HTML/JSX tag (starts with letter), keep it
    if (/^[a-zA-Z]/.test(inner)) return match;
    return `『${inner}』`;
  });
}

// ── Generate post ─────────────────────────────────────────────────────────────

async function generateBookPost(transcript, videoTitle, lang) {
  const isKorean = lang === 'ko';

  const systemPrompt = isKorean
    ? `당신은 블록체인, Web3, DID, AI 분야의 전문가인 송주한(Jeffrey Joo-Han Song)입니다.
책 요약 영상의 자막을 바탕으로, 그 책에 대한 개인적인 독서 감상과 기술·사회적 인사이트를 담은 블로그 포스트를 작성해주세요.
단순 요약이 아니라, 이 책이 왜 중요한지, 자신의 경력과 어떻게 연결되는지를 담아주세요.
800-1200자 분량으로 작성하세요.`
    : `You are Jeffrey Joo-Han Song, expert in blockchain, Web3, DID, and AI.
Based on a book summary video transcript, write a personal reading reflection blog post.
Don't just summarize — explain why this book matters and how it connects to your career and thinking.
Write approximately 500-800 words.`;

  const userPrompt = isKorean
    ? `다음은 "${videoTitle}" 영상의 자막입니다. 이 책에 대한 독서 포스트를 작성해주세요.\n\n${transcript.substring(0, 3000)}`
    : `Here is the transcript from "${videoTitle}". Write a book post based on this.\n\n${transcript.substring(0, 3000)}`;

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

async function generateTitle(content, lang) {
  const isKorean = lang === 'ko';
  const prompt = isKorean
    ? `다음 독서 포스트의 제목을 만들어주세요. 책 이름을 포함하고 흥미로운 부제를 달아주세요. 제목만 출력:\n\n${content.substring(0, 400)}`
    : `Generate a title for this book post. Include the book name and an interesting subtitle. Output only the title:\n\n${content.substring(0, 400)}`;

  const completion = await openai.chat.completions.create({
    model: 'gemma-4-31b-it',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
    max_tokens: 60,
  });

  return completion.choices[0]?.message?.content?.trim().replace(/^["']|["']$/g, '') || '';
}

// ── Write MDX ─────────────────────────────────────────────────────────────────

function createBookMDX(title, content, date, lang, videoId, videoTitle) {
  const slugBase = title
    .toLowerCase()
    .replace(/[^a-z0-9가-힣\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 80);

  const filename = `${date}-book-${slugBase}.mdx`;
  const filepath = path.join(__dirname, '../src/content/posts', filename);

  let excerpt = content.replace(/^#{1,6}\s+/gm, '').replace(/\n/g, ' ').trim().substring(0, 150);
  if (excerpt.length >= 150) excerpt += '...';

  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const videoRef = lang === 'ko'
    ? `\n\n---\n\n> 이 포스트는 유튜브 채널 [BeyondPage](${videoUrl})의 "${videoTitle}" 영상을 참고하여 작성되었습니다.`
    : `\n\n---\n\n> This post is based on the video ["${videoTitle}"](${videoUrl}) from the BeyondPage YouTube channel.`;

  const safeContent = sanitizeMDX(content);
  const safeTitle   = title.replace(/<([^>a-zA-Z\/!][^>]*)>/g, '『$1』');
  const safeExcerpt = excerpt.replace(/<([^>a-zA-Z\/!][^>]*)>/g, '『$1』');

  fs.writeFileSync(filepath, `---
title: ${JSON.stringify(safeTitle)}
date: "${date}"
lang: ${lang}
excerpt: ${JSON.stringify(safeExcerpt)}
tags: ["book"]
---

${safeContent}${videoRef}
`);
  return filename;
}

function bookPostExistsForDate(date, lang) {
  const postsDir = path.join(__dirname, '../src/content/posts');
  if (!fs.existsSync(postsDir)) return false;
  return fs.readdirSync(postsDir).some(f => {
    if (!f.startsWith(date) || !f.includes('-book-')) return false;
    const content = fs.readFileSync(path.join(postsDir, f), 'utf-8');
    return content.match(/lang:\s*(\w+)/)?.[1] === lang;
  });
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  const dateArg = process.argv[2];
  const date = dateArg && /^\d{4}-\d{2}-\d{2}$/.test(dateArg)
    ? dateArg
    : new Date().toISOString().split('T')[0];

  if (bookPostExistsForDate(date, 'ko') && bookPostExistsForDate(date, 'en')) {
    console.log('Book posts for today already exist. Skipping.');
    return;
  }

  const usedIds = loadUsed();
  const videos  = fetchVideoList();

  const { ko: koVideo, en: enVideo } = pickVideoPair(videos, usedIds);
  console.log(`Selected: ${koVideo.title}`);
  if (enVideo) console.log(`English pair: ${enVideo.title}`);

  // Korean post
  if (!bookPostExistsForDate(date, 'ko')) {
    console.log('Downloading Korean subtitles...');
    const koTranscript = downloadSubtitle(koVideo.id, 'ko');
    if (koTranscript) {
      console.log(`Transcript: ${koTranscript.length} chars`);
      const koContent = await generateBookPost(koTranscript, koVideo.title, 'ko');
      if (koContent) {
        const koTitle = await generateTitle(koContent, 'ko');
        const koFile  = createBookMDX(koTitle, koContent, date, 'ko', koVideo.id, koVideo.title);
        console.log(`Korean book post created: ${koFile}`);
      }
    } else {
      console.warn('No Korean subtitle found. Skipping KO post.');
    }
  }

  // English post — disabled until further notice (Korean only for now)
  // const enTarget = enVideo || koVideo;
  // ...

  // Mark video as used
  saveUsed([...usedIds, koVideo.id]);
  console.log('✅ Book post done!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
