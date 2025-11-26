import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  const allPosts = await getCollection('posts');
  
  // Sort by date, newest first
  const sortedPosts = allPosts.sort((a, b) => {
    const dateA = new Date(a.data.date).getTime();
    const dateB = new Date(b.data.date).getTime();
    return dateB - dateA;
  });

  const siteUrl = site?.toString() || 'https://jsong1230.github.io';
  
  const rssItems = sortedPosts.map((post) => {
    const postUrl = `${siteUrl}/writing/${post.id}`;
    const pubDate = new Date(post.data.date).toUTCString();
    
    return `    <item>
      <title><![CDATA[${post.data.title}]]></title>
      <link>${postUrl}</link>
      <guid>${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${post.data.excerpt || ''}]]></description>
      <language>${post.data.lang === 'ko' ? 'ko-KR' : 'en-US'}</language>
    </item>`;
  }).join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Jeffrey Song - Writing</title>
    <link>${siteUrl}</link>
    <description>Blog posts by Jeffrey Joo-Han Song on Blockchain, Web3, DID, and AI</description>
    <language>ko-KR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
${rssItems}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
