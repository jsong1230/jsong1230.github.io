import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import OpenAI from 'openai';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Extract topics from About, Work, Publications data
function extractTopics(lang = 'ko') {
  const isKorean = lang === 'ko';
  const topics = [];
  
  if (isKorean) {
    // About topics (Korean)
    topics.push({
      category: 'About',
      topics: [
        '블록체인, Web3, DID, AI 분야의 20년 경력',
        'UBC Ph.D. (무선 네트워킹, 네트워크 보안)',
        '과기정통부장관 표창장 (2023)',
        'JB금융 핀테크 경연대회 최우수상 (2015)',
        'AI를 이용한 shorts와 long forms 제작',
      ],
    });
    
    // Work topics (Korean)
    topics.push({
      category: 'Work',
      topics: [
        'CPLABS - Web3 플랫폼 아키텍처, DID/SSI 기술 개발',
        'CPLABS - 대파(Daepa) AI 기반 개인화 비서 서비스',
        'CPLABS - MLFF(말레이시아 자유통행) 기술 리뷰 및 PoC',
        'Coinplug - 320+ 블록체인 특허 기반 플랫폼',
        'Coinplug - 국내 최초 DID/블록체인 상용화 사례',
        'Metadium - 블록체인 기반 자기주권 신원(SSI) 인프라',
        'Samsung - 통신/무선 네트워크 연구개발',
        'Reading Town - 메트로 밴쿠버 12개 지점 네트워크 인프라',
      ],
    });
    
    // Publications topics (Korean)
    topics.push({
      category: 'Publications',
      topics: [
        '320+ 블록체인 특허 보유',
        'UBC 논문 다수 (무선 네트워킹, 네트워크 보안)',
        '비트코인 및 블록체인 관련 번역서 및 공저 3권',
      ],
    });
  } else {
    // About topics (English)
    topics.push({
      category: 'About',
      topics: [
        '20 years of experience in Blockchain, Web3, DID, AI',
        'UBC Ph.D. (Wireless Networking, Network Security)',
        'Minister of Science and ICT Commendation (2023)',
        'JB Financial Fintech Competition Excellence Award (2015)',
        'Creating shorts and long forms using AI',
      ],
    });
    
    // Work topics (English)
    topics.push({
      category: 'Work',
      topics: [
        'CPLABS - Web3 platform architecture, DID/SSI technology development',
        'CPLABS - Daepa AI-powered personal assistant service',
        'CPLABS - MLFF (Malaysia Free Flow) technology review and PoC',
        'Coinplug - Platform based on 320+ blockchain patents',
        'Coinplug - First-in-Korea DID/blockchain commercialization cases',
        'Metadium - Blockchain-based Self-Sovereign Identity (SSI) infrastructure',
        'Samsung - Telecommunications/wireless network R&D',
        'Reading Town - Metro Vancouver 12-branch network infrastructure',
      ],
    });
    
    // Publications topics (English)
    topics.push({
      category: 'Publications',
      topics: [
        '320+ blockchain patents',
        'Multiple UBC papers (Wireless Networking, Network Security)',
        '3 translated and co-authored books on Bitcoin and blockchain',
      ],
    });
  }
  
  return topics;
}

// Select a random topic
function selectRandomTopic(topics) {
  const allTopics = topics.flatMap(cat => cat.topics.map(topic => ({
    category: cat.category,
    topic: topic,
  })));
  
  const randomIndex = Math.floor(Math.random() * allTopics.length);
  return allTopics[randomIndex];
}

// Generate blog post using OpenAI
async function generatePost(topic, lang) {
  const isKorean = lang === 'ko';
  
  const systemPrompt = isKorean
    ? `당신은 블록체인, Web3, DID, AI 분야의 전문가인 송주한(Jeffrey Joo-Han Song)입니다. 
20년 이상의 경력을 가진 CTO이자 엔지니어로서, 기술적 깊이와 실무 경험을 바탕으로 글을 작성합니다.
주제에 대해 전문적이면서도 읽기 쉽고, 개인적인 경험과 인사이트를 포함한 블로그 포스트를 작성해주세요.
포스트는 800-1200자 정도의 분량으로 작성해주세요.`
    : `You are Jeffrey Joo-Han Song, an expert in blockchain, Web3, DID, and AI fields.
As a CTO and engineer with over 20 years of experience, write blog posts based on technical depth and practical experience.
Write professional yet readable blog posts that include personal experiences and insights on the topic.
The post should be approximately 500-800 words.`;

  const userPrompt = isKorean
    ? `다음 주제에 대해 블로그 포스트를 작성해주세요:\n\n${topic.topic}\n\n카테고리: ${topic.category}\n\n개인적인 경험, 기술적 인사이트, 그리고 실무에서의 적용 사례를 포함해서 작성해주세요.`
    : `Please write a blog post on the following topic:\n\n${topic.topic}\n\nCategory: ${topic.category}\n\nPlease include personal experiences, technical insights, and practical application cases.`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: isKorean ? 2000 : 1500,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error generating post:', error);
    throw error;
  }
}

// Generate title from content
async function generateTitle(content, lang) {
  const isKorean = lang === 'ko';
  
  const prompt = isKorean
    ? `다음 블로그 포스트 내용을 바탕으로 적절한 제목을 생성해주세요. 제목만 출력해주세요:\n\n${content.substring(0, 500)}`
    : `Generate an appropriate title based on the following blog post content. Output only the title:\n\n${content.substring(0, 500)}`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 50,
    });

    return completion.choices[0].message.content.trim().replace(/^["']|["']$/g, '');
  } catch (error) {
    console.error('Error generating title:', error);
    return isKorean ? '블로그 포스트' : 'Blog Post';
  }
}

// Create MDX file
function createMDXFile(title, content, date, lang) {
  // Generate slug from title
  const slugBase = title
    .toLowerCase()
    .replace(/[^a-z0-9가-힣\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  
  const slug = `${date}-${slugBase}`;
  const filename = `${slug}.mdx`;
  const filepath = path.join(__dirname, '../src/content/posts', filename);

  // Extract excerpt (first 150 characters, remove markdown headers)
  let excerpt = content
    .replace(/^#{1,6}\s+/gm, '') // Remove markdown headers (#, ##, ###, etc.)
    .replace(/\n/g, ' ') // Replace newlines with spaces
    .trim()
    .substring(0, 150);
  
  if (excerpt.length >= 150) {
    excerpt += '...';
  }

  const frontmatter = `---
title: ${JSON.stringify(title)}
date: "${date}"
lang: ${lang}
excerpt: ${JSON.stringify(excerpt)}
---`;

  const mdxContent = `${frontmatter}\n\n${content}`;

  fs.writeFileSync(filepath, mdxContent, 'utf-8');
  return { filename, slug };
}

// Check if post already exists for today
function postExistsForDate(date, lang) {
  const postsDir = path.join(__dirname, '../src/content/posts');
  if (!fs.existsSync(postsDir)) {
    return false;
  }
  
  const files = fs.readdirSync(postsDir);
  const datePrefix = date;
  return files.some(file => {
    if (!file.startsWith(datePrefix)) return false;
    try {
      const content = fs.readFileSync(path.join(postsDir, file), 'utf-8');
      const langMatch = content.match(/lang:\s*(\w+)/);
      return langMatch && langMatch[1] === lang;
    } catch {
      return false;
    }
  });
}

// Main function
async function main() {
  try {
    // Ensure posts directory exists
    const postsDir = path.join(__dirname, '../src/content/posts');
    if (!fs.existsSync(postsDir)) {
      fs.mkdirSync(postsDir, { recursive: true });
    }

    // Generate posts for both languages
    const date = new Date().toISOString().split('T')[0];
    
    // Check if posts already exist for today
    if (postExistsForDate(date, 'ko') && postExistsForDate(date, 'en')) {
      console.log('Posts for today already exist. Skipping generation.');
      return;
    }

    // Select a single topic (use Korean topics for selection)
    const koTopics = extractTopics('ko');
    const selectedTopic = selectRandomTopic(koTopics);
    console.log(`Selected topic: ${selectedTopic.topic} (${selectedTopic.category})`);

    // Find matching English topic
    const enTopics = extractTopics('en');
    const koCategory = koTopics.find(cat => cat.category === selectedTopic.category);
    const enCategory = enTopics.find(cat => cat.category === selectedTopic.category);
    
    if (!koCategory || !enCategory) {
      throw new Error('Category not found in both languages');
    }
    
    const topicIndex = koCategory.topics.indexOf(selectedTopic.topic);
    if (topicIndex === -1 || !enCategory.topics[topicIndex]) {
      throw new Error('Topic not found in English topics');
    }
    
    const enSelectedTopic = {
      category: selectedTopic.category,
      topic: enCategory.topics[topicIndex]
    };
    
    console.log(`English topic: ${enSelectedTopic.topic} (${enSelectedTopic.category})`);

    // Generate Korean post
    console.log('Generating Korean post...');
    const koContent = await generatePost(selectedTopic, 'ko');
    const koTitle = await generateTitle(koContent, 'ko');
    const koFile = createMDXFile(koTitle, koContent, date, 'ko');
    console.log(`Korean post created: ${koFile.filename}`);

    // Generate English post (same topic, different language)
    console.log('Generating English post...');
    const enContent = await generatePost(enSelectedTopic, 'en');
    const enTitle = await generateTitle(enContent, 'en');
    const enFile = createMDXFile(enTitle, enContent, date, 'en');
    console.log(`English post created: ${enFile.filename}`);

    console.log('✅ Daily posts generated successfully!');
  } catch (error) {
    console.error('Error in main:', error);
    process.exit(1);
  }
}

main();

