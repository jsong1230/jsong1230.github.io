import { useState, useEffect } from 'react';

export default function LanguageToggle() {
  const [lang, setLang] = useState<'ko' | 'en'>('ko');

  useEffect(() => {
    // URL 쿼리 파라미터에서 언어 확인
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    if (urlLang === 'en' || urlLang === 'ko') {
      setLang(urlLang);
    } else {
      // 저장된 언어 또는 브라우저 언어 확인
      const saved = localStorage.getItem('lang') as 'ko' | 'en' | null;
      const browserLang = navigator.language.startsWith('ko') ? 'ko' : 'en';
      const currentLang = saved || browserLang;
      setLang(currentLang);
      
      // URL에 언어 파라미터가 없으면 현재 언어로 추가
      if (!urlLang && currentLang !== 'ko') {
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set('lang', currentLang);
        window.history.replaceState({}, '', newUrl.toString());
      }
    }
  }, []);

  const toggleLang = () => {
    const newLang = lang === 'ko' ? 'en' : 'ko';
    setLang(newLang);
    localStorage.setItem('lang', newLang);
    
    // URL 쿼리 파라미터 업데이트
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('lang', newLang);
    window.location.href = newUrl.toString();
  };

  return (
    <button
      onClick={toggleLang}
      className="text-sm px-3 py-1 rounded border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle language"
    >
      {lang === 'ko' ? 'EN' : 'KO'}
    </button>
  );
}

