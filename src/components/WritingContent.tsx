'use client';

import { useState, useEffect } from 'react';

const writingContent = {
  ko: {
    title: 'Writing',
    placeholder: '블로그 포스트가 여기에 표시됩니다. (준비 중)',
  },
  en: {
    title: 'Writing',
    placeholder: 'Blog posts will be displayed here. (Coming soon)',
  },
};

export default function WritingContent() {
  const [lang, setLang] = useState<'ko' | 'en'>('ko');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    
    if (urlLang === 'en' || urlLang === 'ko') {
      setLang(urlLang);
      localStorage.setItem('lang', urlLang);
    } else {
      const saved = localStorage.getItem('lang') as 'ko' | 'en' | null;
      setLang(saved || 'ko');
    }

    const handleLangChange = (e: CustomEvent<'ko' | 'en'>) => {
      setLang(e.detail);
    };
    window.addEventListener('langchange', handleLangChange as EventListener);

    return () => {
      window.removeEventListener('langchange', handleLangChange as EventListener);
    };
  }, []);

  const t = writingContent[lang];

  return (
    <div className="container-narrow py-12">
      <h1 className="text-4xl font-bold mb-12">{t.title}</h1>
      
      <div className="space-y-8">
        <p className="text-gray-600 dark:text-gray-400">
          {t.placeholder}
        </p>
      </div>
    </div>
  );
}

