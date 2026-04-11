import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

export async function getStaticPaths() {
  const posts = await getCollection('posts');
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }));
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load font from local file (bundled in public/fonts)
const fontData: ArrayBuffer = readFileSync(
  path.join(__dirname, '../../../public/fonts/Pretendard-Bold.woff')
).buffer as ArrayBuffer;

export const GET: APIRoute = async ({ props }) => {
  const { post } = props;
  const title = post.data.title;
  const date = new Date(post.data.date).toLocaleDateString(
    post.data.lang === 'ko' ? 'ko-KR' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '1200px',
          height: '630px',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px 80px',
          fontFamily: 'Pretendard',
        },
        children: [
          // Top: accent line
          {
            type: 'div',
            props: {
              style: {
                width: '80px',
                height: '6px',
                background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                borderRadius: '3px',
              },
            },
          },
          // Middle: title
          {
            type: 'div',
            props: {
              style: {
                flex: 1,
                display: 'flex',
                alignItems: 'center',
              },
              children: [
                {
                  type: 'p',
                  props: {
                    style: {
                      fontSize: title.length > 30 ? '52px' : '64px',
                      fontWeight: 700,
                      color: '#f1f5f9',
                      lineHeight: 1.3,
                      margin: '0',
                      letterSpacing: '-0.02em',
                    },
                    children: title,
                  },
                },
              ],
            },
          },
          // Bottom: author + date + domain
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: { display: 'flex', flexDirection: 'column', gap: '4px' },
                    children: [
                      {
                        type: 'p',
                        props: {
                          style: { fontSize: '28px', fontWeight: 700, color: '#94a3b8', margin: '0' },
                          children: 'Jeffrey Song',
                        },
                      },
                      {
                        type: 'p',
                        props: {
                          style: { fontSize: '22px', color: '#475569', margin: '0' },
                          children: 'jsong1230.github.io',
                        },
                      },
                    ],
                  },
                },
                {
                  type: 'p',
                  props: {
                    style: { fontSize: '24px', color: '#64748b', margin: '0' },
                    children: date,
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Pretendard',
          data: fontData,
          weight: 700,
          style: 'normal',
        },
      ],
    }
  );

  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } });
  const png = resvg.render().asPng();

  return new Response(png, {
    headers: { 'Content-Type': 'image/png' },
  });
};
