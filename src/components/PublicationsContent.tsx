'use client';

import { useState, useEffect } from 'react';

const publicationsContent = {
  ko: {
    title: 'Publications & Research',
    patents: {
      title: '특허',
      description: 'CPLABS, Coinplug, 그리고 개인명으로 등록된 블록체인 및 Web3 관련 특허들',
      searchLinks: {
        cplabs: 'https://patents.google.com/?q=CPLABS&assignee=CPLABS',
        coinplug: 'https://patents.google.com/?q=COINPLUG&assignee=Coinplug',
        personal: 'https://patents.google.com/?q="Joo-Han+Song"',
        samsung: 'https://patents.google.com/?q="Joo-Han+Song"+assignee:Samsung',
        kipris: 'https://www.kipris.or.kr/khome/main.jsp',
      },
    },
    papers: {
      title: '논문',
      description: 'UBC, 삼성전자 시절 발표한 논문 및 연구 자료',
      searchLinks: {
        ubc: 'https://scholar.google.com/scholar?q=joohans@ece.ubc.ca',
        ubcPage: 'https://people.ece.ubc.ca/~vincentw/Homepage/Publication.html',
        samsung: 'https://scholar.google.com/scholar?q=joohan.song@samsung.com',
        general: 'https://scholar.google.com/scholar?q=joohans@gmail.com',
        dblp: 'https://dblp.org/search?q=Joo-Han+Song',
      },
    },
    books: {
      title: '저서',
      description: '비트코인 및 블록체인 관련 번역서 및 공저',
      items: [
        {
          title: '비트코인, 디지털 화폐의 미래를 열다',
          role: '역자/공저',
          year: '',
          searchLink: 'https://www.google.com/search?q=비트코인+디지털+화폐의+미래를+열다',
        },
        {
          title: '비트코인, 블록체인과 금융의 혁신',
          role: '역자/공저',
          year: '',
          searchLink: 'https://www.google.com/search?q=비트코인+블록체인과+금융의+혁신',
        },
        {
          title: '비트코인, 공개 블록체인 프로그래밍',
          role: '역자/공저',
          year: '',
          searchLink: 'https://www.google.com/search?q=비트코인+공개+블록체인+프로그래밍',
        },
      ],
    },
  },
  en: {
    title: 'Publications & Research',
    patents: {
      title: 'Patents',
      description: 'Blockchain and Web3 related patents registered under CPLABS, Coinplug, and personal name',
      searchLinks: {
        cplabs: 'https://patents.google.com/?q=CPLABS&assignee=CPLABS',
        coinplug: 'https://patents.google.com/?q=COINPLUG&assignee=Coinplug',
        personal: 'https://patents.google.com/?q="Joo-Han+Song"',
        samsung: 'https://patents.google.com/?q="Joo-Han+Song"+assignee:Samsung',
        kipris: 'https://www.kipris.or.kr/khome/main.jsp',
      },
    },
    papers: {
      title: 'Research Papers',
      description: 'Papers and research materials published during UBC and Samsung Electronics periods',
      searchLinks: {
        ubc: 'https://scholar.google.com/scholar?q=joohans@ece.ubc.ca',
        ubcPage: 'https://people.ece.ubc.ca/~vincentw/Homepage/Publication.html',
        samsung: 'https://scholar.google.com/scholar?q=joohan.song@samsung.com',
        general: 'https://scholar.google.com/scholar?q=joohans@gmail.com',
        dblp: 'https://dblp.org/search?q=Joo-Han+Song',
      },
    },
    books: {
      title: 'Books',
      description: 'Translations and co-authored books on Bitcoin and blockchain',
      items: [
        {
          title: 'Bitcoin: Opening the Future of Digital Currency',
          role: 'Translator/Co-author',
          year: '',
          searchLink: 'https://www.google.com/search?q=Bitcoin+Opening+the+Future+of+Digital+Currency',
        },
        {
          title: 'Bitcoin: Blockchain and Financial Innovation',
          role: 'Translator/Co-author',
          year: '',
          searchLink: 'https://www.google.com/search?q=Bitcoin+Blockchain+and+Financial+Innovation',
        },
        {
          title: 'Bitcoin: Open Blockchain Programming',
          role: 'Translator/Co-author',
          year: '',
          searchLink: 'https://www.google.com/search?q=Bitcoin+Open+Blockchain+Programming',
        },
      ],
    },
  },
};

export default function PublicationsContent() {
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

  const t = publicationsContent[lang];

  return (
    <div className="container-narrow py-12">
      <h1 className="text-4xl font-bold mb-12">{t.title}</h1>
      
      <div className="space-y-16">
        {/* 특허 섹션 */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">{t.patents.title}</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {t.patents.description}
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <a 
              href={t.patents.searchLinks.cplabs}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors bg-gray-50/50 dark:bg-gray-900/50"
            >
              <h3 className="font-semibold mb-2">{lang === 'ko' ? 'CPLABS 특허' : 'CPLABS Patents'}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{lang === 'ko' ? 'Google Patents에서 검색' : 'Search on Google Patents'}</p>
            </a>
            <a 
              href={t.patents.searchLinks.coinplug}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors bg-gray-50/50 dark:bg-gray-900/50"
            >
              <h3 className="font-semibold mb-2">{lang === 'ko' ? 'Coinplug 특허' : 'Coinplug Patents'}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{lang === 'ko' ? 'Google Patents에서 검색' : 'Search on Google Patents'}</p>
            </a>
            <a 
              href={t.patents.searchLinks.personal}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors bg-gray-50/50 dark:bg-gray-900/50"
            >
              <h3 className="font-semibold mb-2">{lang === 'ko' ? '개인명 특허' : 'Personal Patents'}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Google Patents: "Joo-Han Song"</p>
            </a>
            <a 
              href={t.patents.searchLinks.samsung}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors bg-gray-50/50 dark:bg-gray-900/50"
            >
              <h3 className="font-semibold mb-2">{lang === 'ko' ? 'Samsung 특허' : 'Samsung Patents'}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Google Patents: "Joo-Han Song" at Samsung</p>
            </a>
            <a 
              href={t.patents.searchLinks.kipris}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors bg-gray-50/50 dark:bg-gray-900/50"
            >
              <h3 className="font-semibold mb-2">{lang === 'ko' ? '한국 특허' : 'Korean Patents'}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{lang === 'ko' ? 'KIPRIS에서 검색' : 'Search on KIPRIS'}</p>
            </a>
          </div>
        </section>

        {/* 논문 섹션 */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">{t.papers.title}</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {t.papers.description}
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <a 
              href={t.papers.searchLinks.ubc}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors bg-gray-50/50 dark:bg-gray-900/50"
            >
              <h3 className="font-semibold mb-2">{lang === 'ko' ? 'UBC 논문 (Google Scholar)' : 'UBC Papers (Google Scholar)'}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">joohans@ece.ubc.ca</p>
            </a>
            <a 
              href={t.papers.searchLinks.ubcPage}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors bg-gray-50/50 dark:bg-gray-900/50"
            >
              <h3 className="font-semibold mb-2">{lang === 'ko' ? 'UBC 논문 목록' : 'UBC Papers List'}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{lang === 'ko' ? 'UBC ECE Publications (joo-han song 검색)' : 'UBC ECE Publications (search: joo-han song)'}</p>
            </a>
            <a 
              href={t.papers.searchLinks.samsung}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors bg-gray-50/50 dark:bg-gray-900/50"
            >
              <h3 className="font-semibold mb-2">{lang === 'ko' ? 'Samsung 논문' : 'Samsung Papers'}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Google Scholar: joohan.song@samsung.com</p>
            </a>
            <a 
              href={t.papers.searchLinks.general}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors bg-gray-50/50 dark:bg-gray-900/50"
            >
              <h3 className="font-semibold mb-2">{lang === 'ko' ? '일반 논문' : 'General Papers'}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Google Scholar: joohans@gmail.com</p>
            </a>
            <a 
              href={t.papers.searchLinks.dblp}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors bg-gray-50/50 dark:bg-gray-900/50"
            >
              <h3 className="font-semibold mb-2">DBLP</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{lang === 'ko' ? 'Joo-Han Song 검색' : 'Search: Joo-Han Song'}</p>
            </a>
          </div>
        </section>

        {/* 저서 섹션 */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">{t.books.title}</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {t.books.description}
          </p>
          <div className="space-y-4">
            {t.books.items.map((book, idx) => (
              <a
                key={idx}
                href={book.searchLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
              >
                <h3 className="font-semibold mb-1">{book.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{book.role}</p>
                <p className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                  {lang === 'ko' ? '→ 검색하기' : '→ Search'}
                </p>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

