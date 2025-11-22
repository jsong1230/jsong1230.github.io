import { useState, useEffect } from 'react';

export default function LanguageToggle() {
  const [lang, setLang] = useState<'ko' | 'en'>('ko');

  useEffect(() => {
    // 브라우저 언어 또는 저장된 언어 설정 확인
    const saved = localStorage.getItem('lang') as 'ko' | 'en' | null;
    const browserLang = navigator.language.startsWith('ko') ? 'ko' : 'en';
    setLang(saved || browserLang);
  }, []);

  const toggleLang = () => {
    const newLang = lang === 'ko' ? 'en' : 'ko';
    setLang(newLang);
    localStorage.setItem('lang', newLang);
    // 실제로는 라우팅이나 i18n 라이브러리와 연동 필요
    window.location.reload(); // 임시: 실제로는 더 나은 방법 사용
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

