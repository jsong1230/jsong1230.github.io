// Language switcher script that runs on client side
export function initLanguageSwitcher() {
  const urlParams = new URLSearchParams(window.location.search);
  const urlLang = urlParams.get('lang');
  const savedLang = localStorage.getItem('lang') as 'ko' | 'en' | null;
  const currentLang = (urlLang === 'en' || urlLang === 'ko') ? urlLang : (savedLang || 'ko');

  // Update all elements with data-lang-ko and data-lang-en
  document.querySelectorAll('[data-lang-ko][data-lang-en]').forEach((el) => {
    const koText = el.getAttribute('data-lang-ko') || '';
    const enText = el.getAttribute('data-lang-en') || '';
    el.textContent = currentLang === 'ko' ? koText : enText;
  });

  // Update HTML lang attribute
  document.documentElement.lang = currentLang;

  // Update button text
  const toggleButton = document.querySelector('[data-language-toggle]') as HTMLElement;
  if (toggleButton) {
    toggleButton.textContent = currentLang === 'ko' ? 'EN' : 'KO';
  }
}

// Run on page load
if (typeof window !== 'undefined') {
  initLanguageSwitcher();
}



