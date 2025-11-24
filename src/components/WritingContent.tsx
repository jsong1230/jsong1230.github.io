'use client';

import { useState, useEffect } from 'react';

interface WritingContentProps {
  postsData: Array<{
    id: string;
    title: string;
    date: string;
    lang: string;
    excerpt?: string;
  }>;
}

export default function WritingContent({ postsData }: WritingContentProps) {
  const [lang, setLang] = useState<'ko' | 'en'>('ko');
  const [posts, setPosts] = useState<Array<{
    id: string;
    title: string;
    date: string;
    lang: string;
    excerpt?: string;
  }>>([]);

  useEffect(() => {
    // Use postsData prop directly
    const allPosts = postsData || [];
    
    // Get language from URL
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    
    let currentLang: 'ko' | 'en' = 'ko';
    if (urlLang === 'en' || urlLang === 'ko') {
      currentLang = urlLang;
      localStorage.setItem('lang', currentLang);
    } else {
      const saved = localStorage.getItem('lang') as 'ko' | 'en' | null;
      currentLang = saved || 'ko';
    }
    
    setLang(currentLang);
    
    // Filter posts by language
    const filteredPosts = allPosts
      .filter(post => post.lang === currentLang)
      .sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
      });
    
    setPosts(filteredPosts);

    // Listen for language changes
    const handleLangChange = (e: CustomEvent<'ko' | 'en'>) => {
      setLang(e.detail);
      const filtered = allPosts
        .filter(post => post.lang === e.detail)
        .sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB.getTime() - dateA.getTime();
        });
      setPosts(filtered);
    };
    
    window.addEventListener('langchange', handleLangChange as EventListener);

    return () => {
      window.removeEventListener('langchange', handleLangChange as EventListener);
    };
  }, []);

  return (
    <div className="container-narrow py-12">
      <h1 className="text-4xl font-bold mb-12">
        {lang === 'ko' ? 'Writing' : 'Writing'}
      </h1>
      
      {posts.length === 0 ? (
        <div className="text-gray-600 dark:text-gray-400">
          {lang === 'ko' 
            ? '블로그 포스트가 여기에 표시됩니다. (준비 중)'
            : 'Blog posts will be displayed here. (Coming soon)'}
        </div>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.id} className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-2xl font-semibold">
                  <a 
                    href={`/writing/${post.id}?lang=${lang}`}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {post.title}
                  </a>
                </h2>
              </div>
              <time className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(post.date).toLocaleDateString(lang === 'ko' ? 'ko-KR' : 'en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <p className="mt-4 text-gray-700 dark:text-gray-300 line-clamp-3">
                {post.excerpt ? post.excerpt.replace(/^#{1,6}\s+/gm, '').trim() : ''}
              </p>
              <a 
                href={`/writing/${post.id}?lang=${lang}`}
                className="mt-4 inline-block text-blue-600 dark:text-blue-400 hover:underline"
              >
                {lang === 'ko' ? '→ 더 읽기' : '→ Read more'}
              </a>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
