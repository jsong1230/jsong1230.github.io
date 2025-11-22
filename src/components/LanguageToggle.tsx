'use client';

import { useState, useEffect } from 'react';

export default function LanguageToggle() {
  const [currentLang, setCurrentLang] = useState<'ko' | 'en'>('ko');

  const updatePageLanguage = (lang: 'ko' | 'en') => {
    // 모든 data-lang-ko, data-lang-en 요소 업데이트
    document.querySelectorAll('[data-lang-ko][data-lang-en]').forEach((el) => {
      const koText = el.getAttribute('data-lang-ko') || '';
      const enText = el.getAttribute('data-lang-en') || '';
      el.textContent = lang === 'ko' ? koText : enText;
    });
    
    // HTML lang 속성 업데이트
    document.documentElement.lang = lang;
    
    // 모든 data-lang-html-ko, data-lang-html-en 요소 업데이트 (HTML 포함)
    document.querySelectorAll('[data-lang-html-ko][data-lang-html-en]').forEach((el) => {
      const koHtml = el.getAttribute('data-lang-html-ko') || '';
      const enHtml = el.getAttribute('data-lang-html-en') || '';
      el.innerHTML = lang === 'ko' ? koHtml : enHtml;
    });
  };

  useEffect(() => {
    // URL 쿼리 파라미터에서 언어 확인
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    
    let lang: 'ko' | 'en' = 'ko';
    if (urlLang === 'en' || urlLang === 'ko') {
      lang = urlLang;
      localStorage.setItem('lang', lang);
    } else {
      // 저장된 언어 확인
      const saved = localStorage.getItem('lang') as 'ko' | 'en' | null;
      lang = saved || 'ko';
    }
    
    setCurrentLang(lang);
    updatePageLanguage(lang);
  }, []);

  const toggleLang = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // 현재 언어 확인
    const urlParams = new URLSearchParams(window.location.search);
    const currentUrlLang = urlParams.get('lang');
    const currentLangFromUrl = (currentUrlLang === 'en' || currentUrlLang === 'ko') ? currentUrlLang : 'ko';
    
    // 토글: ko -> en, en -> ko
    const newLang = currentLangFromUrl === 'ko' ? 'en' : 'ko';
    
    // localStorage 저장
    localStorage.setItem('lang', newLang);
    setCurrentLang(newLang);
    
    // 페이지 언어 즉시 업데이트
    updatePageLanguage(newLang);
    
    // 커스텀 이벤트 발생 (Hero 컴포넌트가 리스닝)
    window.dispatchEvent(new CustomEvent('langchange', { detail: newLang }));
    
    // URL 업데이트 (페이지 리로드 없이)
    const newUrl = new URL(window.location.href);
    if (newLang === 'ko') {
      newUrl.searchParams.delete('lang');
    } else {
      newUrl.searchParams.set('lang', newLang);
    }
    window.history.pushState({}, '', newUrl.toString());
  };

  return (
    <button
      onClick={toggleLang}
      className="text-sm px-3 py-1 rounded border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle language"
    >
      {currentLang === 'ko' ? 'EN' : 'KO'}
    </button>
  );
}
