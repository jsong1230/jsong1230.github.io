import { useState, useEffect } from 'react';

export default function LanguageToggle() {
  const [currentLang, setCurrentLang] = useState<'ko' | 'en'>('ko');

  useEffect(() => {
    // URL 쿼리 파라미터에서 언어 확인
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    
    if (urlLang === 'en' || urlLang === 'ko') {
      setCurrentLang(urlLang);
      localStorage.setItem('lang', urlLang);
    } else {
      // 저장된 언어 확인
      const saved = localStorage.getItem('lang') as 'ko' | 'en' | null;
      const lang = saved || 'ko';
      setCurrentLang(lang);
    }
  }, []);

  const toggleLang = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // 현재 URL에서 언어 파라미터 확인
    const urlParams = new URLSearchParams(window.location.search);
    const currentUrlLang = urlParams.get('lang');
    const currentLangFromUrl = (currentUrlLang === 'en' || currentUrlLang === 'ko') ? currentUrlLang : 'ko';
    
    // 토글: ko -> en, en -> ko
    const newLang = currentLangFromUrl === 'ko' ? 'en' : 'ko';
    
    // localStorage 저장
    localStorage.setItem('lang', newLang);
    
    // URL 업데이트하고 페이지 리로드
    const newUrl = new URL(window.location.href);
    if (newLang === 'ko') {
      newUrl.searchParams.delete('lang');
    } else {
      newUrl.searchParams.set('lang', newLang);
    }
    
    // 페이지 리로드
    window.location.href = newUrl.toString();
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

