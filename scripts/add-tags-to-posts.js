#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const postsDir = path.join(__dirname, '../src/content/posts');

// 태그 매핑 (키워드 -> 태그)
const tagMapping = {
  blockchain: ['blockchain', '블록체인'],
  AI: ['AI', 'artificial intelligence', '인공지능', 'GPT', 'machine learning', 'ML'],
  networking: ['networking', '네트워크', 'network', 'infrastructure', '네트워킹'],
  security: ['security', '보안', '네트워크 보안', 'network security'],
  fintech: ['fintech', '핀테크', 'financial', '금융'],
  DID: ['DID', 'decentralized identity', '분산신원증명', 'identity'],
  Web3: ['Web3', '웹3'],
  patents: ['patent', '특허', 'patents'],
  research: ['research', '연구', 'PhD', '박사', 'UBC'],
  innovation: ['innovation', '혁신', 'award', '수상'],
};

// 포스트 내용에서 태그 추출
function extractTags(content, title) {
  const tags = new Set();
  const textToAnalyze = `${title} ${content}`.toLowerCase();

  for (const [tag, keywords] of Object.entries(tagMapping)) {
    for (const keyword of keywords) {
      if (textToAnalyze.includes(keyword.toLowerCase())) {
        tags.add(tag);
        break;
      }
    }
  }

  return Array.from(tags).sort();
}

// 카테고리 결정
function determineCategory(tags, title) {
  const titleLower = title.toLowerCase();

  if (tags.includes('blockchain') || tags.includes('DID') || tags.includes('Web3')) {
    return 'Blockchain & Web3';
  }
  if (tags.includes('AI')) {
    return 'Artificial Intelligence';
  }
  if (tags.includes('networking') || tags.includes('security')) {
    return 'Networking & Security';
  }
  if (tags.includes('fintech')) {
    return 'Fintech';
  }
  if (tags.includes('research') || titleLower.includes('phd') || titleLower.includes('박사')) {
    return 'Research';
  }
  if (tags.includes('innovation') || tags.includes('award')) {
    return 'Innovation';
  }

  return 'Technology';
}

// MDX 파일 처리
function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');

  // Frontmatter 추출
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) return;

  const frontmatter = frontmatterMatch[1];
  const body = content.slice(frontmatterMatch[0].length);

  // 제목 추출
  const titleMatch = frontmatter.match(/title:\s*"(.+)"/);
  if (!titleMatch) return;
  const title = titleMatch[1];

  // 이미 태그가 있는지 확인
  if (frontmatter.includes('tags:')) {
    console.log(`⏭️  ${path.basename(filePath)} already has tags`);
    return;
  }

  // 태그와 카테고리 추출
  const tags = extractTags(body, title);
  const category = determineCategory(tags, title);

  // 새로운 frontmatter 생성
  const lines = frontmatter.split('\n');
  const newLines = [];

  for (const line of lines) {
    newLines.push(line);
    // excerpt 다음에 tags와 category 추가
    if (line.startsWith('excerpt:') || line.startsWith('lang:')) {
      if (!newLines.some(l => l.startsWith('tags:'))) {
        newLines.push(`tags: [${tags.map(t => `"${t}"`).join(', ')}]`);
        newLines.push(`category: "${category}"`);
      }
    }
  }

  // lang 다음에 tags가 없으면 추가
  if (!newLines.some(l => l.startsWith('tags:'))) {
    const langIndex = newLines.findIndex(l => l.startsWith('lang:'));
    if (langIndex !== -1) {
      newLines.splice(langIndex + 1, 0,
        `tags: [${tags.map(t => `"${t}"`).join(', ')}]`,
        `category: "${category}"`
      );
    }
  }

  const newFrontmatter = newLines.join('\n');
  const newContent = `---\n${newFrontmatter}\n---${body}`;

  fs.writeFileSync(filePath, newContent, 'utf-8');
  console.log(`✅ ${path.basename(filePath)}: [${tags.join(', ')}] - ${category}`);
}

// 모든 포스트 처리
const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.mdx'));

console.log(`\n📝 Processing ${files.length} posts...\n`);

for (const file of files) {
  const filePath = path.join(postsDir, file);
  try {
    processFile(filePath);
  } catch (error) {
    console.error(`❌ Error processing ${file}:`, error.message);
  }
}

console.log(`\n✨ Done!\n`);
