'use client';

import { useState, useEffect } from 'react';

const content = {
  ko: {
    title: 'Contact',
    description: '문의사항이나 협업 제안이 있으시면 아래 양식을 작성해주세요.',
    name: '이름',
    email: '이메일',
    subject: '제목',
    message: '메시지',
    send: '전송',
    sending: '전송 중...',
    success: '메시지가 성공적으로 전송되었습니다!',
    error: '전송 중 오류가 발생했습니다. 다시 시도해주세요.',
    back: '← 홈으로 돌아가기',
  },
  en: {
    title: 'Contact',
    description: 'Please fill out the form below if you have any inquiries or collaboration proposals.',
    name: 'Name',
    email: 'Email',
    subject: 'Subject',
    message: 'Message',
    send: 'Send',
    sending: 'Sending...',
    success: 'Message sent successfully!',
    error: 'An error occurred. Please try again.',
    back: '← Back to Home',
  },
};

export default function ContactContent() {
  const [lang, setLang] = useState<'ko' | 'en'>('ko');

  useEffect(() => {
    // URL 쿼리 파라미터에서 언어 확인
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    
    if (urlLang === 'en' || urlLang === 'ko') {
      setLang(urlLang);
      localStorage.setItem('lang', urlLang);
    } else {
      const saved = localStorage.getItem('lang') as 'ko' | 'en' | null;
      setLang(saved || 'ko');
    }

    // 언어 변경 이벤트 리스너
    const handleLangChange = (e: CustomEvent<'ko' | 'en'>) => {
      setLang(e.detail);
    };
    window.addEventListener('langchange', handleLangChange as EventListener);

    // Success message handling
    if (urlParams.get('success') === 'true') {
      const successLang = urlParams.get('lang') || lang;
      const message = successLang === 'ko' ? content.ko.success : content.en.success;
      alert(message);
      // Clean URL
      const newUrl = window.location.pathname + (successLang !== 'ko' ? '?lang=en' : '');
      window.history.replaceState({}, '', newUrl);
    }

    return () => {
      window.removeEventListener('langchange', handleLangChange as EventListener);
    };
  }, []);

  const t = content[lang];

  return (
    <div className="container-narrow py-12">
      <h1 className="text-4xl font-bold mb-6">{t.title}</h1>
      
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        {t.description}
      </p>

      <form 
        action="https://formsubmit.co/van.jeffing@gmail.com" 
        method="POST"
        className="space-y-6 max-w-2xl"
        id="contact-form"
      >
        <input type="hidden" name="_subject" value="Contact from jsong1230.github.io" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_next" value={`https://jsong1230.github.io/contact?success=true&lang=${lang}`} />
        <input type="hidden" name="_template" value="box" />
        
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t.name}
          </label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t.email}
          </label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t.subject}
          </label>
          <input 
            type="text" 
            id="subject" 
            name="subject" 
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t.message}
          </label>
          <textarea 
            id="message" 
            name="message" 
            rows={6}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
          ></textarea>
        </div>

        <button 
          type="submit"
          className="px-6 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors font-medium"
        >
          {t.send}
        </button>
      </form>

      <div className="mt-8">
        <a 
          href={lang === 'ko' ? '/?lang=ko' : '/?lang=en'}
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          {t.back}
        </a>
      </div>
    </div>
  );
}

