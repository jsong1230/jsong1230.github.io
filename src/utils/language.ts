/**
 * 언어 관련 유틸리티 함수
 */

export type Language = 'ko' | 'en';

/**
 * URL 쿼리 파라미터와 localStorage에서 언어를 가져옵니다.
 */
export function getLanguage(): Language {
  if (typeof window === 'undefined') return 'ko';
  
  const urlParams = new URLSearchParams(window.location.search);
  const urlLang = urlParams.get('lang');
  
  if (urlLang === 'en' || urlLang === 'ko') {
    localStorage.setItem('lang', urlLang);
    return urlLang;
  }
  
  const saved = localStorage.getItem('lang') as Language | null;
  return saved || 'ko';
}

/**
 * 언어를 저장하고 URL을 업데이트합니다.
 */
export function setLanguage(lang: Language): void {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem('lang', lang);
  
  const url = new URL(window.location.href);
  if (lang === 'ko') {
    url.searchParams.delete('lang');
  } else {
    url.searchParams.set('lang', lang);
  }
  window.history.pushState({}, '', url.toString());
  
  // 커스텀 이벤트 발생
  window.dispatchEvent(new CustomEvent('langchange', { detail: lang }));
}



