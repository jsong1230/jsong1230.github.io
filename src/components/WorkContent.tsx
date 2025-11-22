'use client';

import { useState, useEffect } from 'react';

const workContent = {
  ko: {
    title: 'Work',
    cplabs: {
      title: 'CPLABS',
      description: 'Web3 플랫폼 아키텍처 설계, DID/SSI 기술 개발, 블록체인 특허 기반 서비스 기획을 총괄하고 있습니다. 주요 프로젝트로는 <strong>Metadium</strong> (블록체인 기반 자기주권 신원 인프라), <strong>Wemix</strong> (게임 중심 Web3 플랫폼) 등의 기술 아키텍처를 리딩했습니다. 또한 MLFF(말레이시아 자유통행) 기술 리뷰 및 PoC, AI 기반 개인화 비서 서비스 \'대파\' 개발을 진행하고 있습니다.',
    },
    metadium: {
      title: 'Metadium',
      description: '블록체인 기반 자기주권 신원(Self-Sovereign Identity, SSI) 인프라 구축, DID 프로토콜 구조 확립, 아이덴티티 생태계 확장',
    },
    coinplug: {
      title: 'Coinplug',
      description: '블록체인 인증·지불·문서 검증 서비스 개발, 블록체인 특허 320+ 기술 기반 플랫폼 구축, 국내 최초 DID/블록체인 상용화 사례 다수',
      patents: '320+ 블록체인 특허 보유',
    },
  },
  en: {
    title: 'Work',
    cplabs: {
      title: 'CPLABS',
      description: 'I lead Web3 platform architecture design, DID/SSI technology development, and blockchain patent-based service planning. I have led the technical architecture for major projects including <strong>Metadium</strong> (blockchain-based self-sovereign identity infrastructure) and <strong>Wemix</strong> (game-centric Web3 platform). I am also working on MLFF (Malaysia Free Flow) technology review and PoC, and developing the AI-powered personal assistant service "Daepa."',
    },
    metadium: {
      title: 'Metadium',
      description: 'Built blockchain-based Self-Sovereign Identity (SSI) infrastructure, established DID protocol structure, expanded identity ecosystem',
    },
    coinplug: {
      title: 'Coinplug',
      description: 'Developed blockchain authentication, payment, and document verification services, built platform based on 320+ blockchain patents, multiple first-in-Korea DID/blockchain commercialization cases',
      patents: '320+ blockchain patents',
    },
  },
};

function formatText(text: string) {
  return text.replace(/<strong>(.*?)<\/strong>/g, '<strong class="font-semibold">$1</strong>');
}

export default function WorkContent() {
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

  const t = workContent[lang];

  return (
    <div className="container-narrow py-12">
      <h1 className="text-4xl font-bold mb-12">{t.title}</h1>
      
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-semibold mb-4">{t.cplabs.title}</h2>
          <p 
            className="text-gray-700 dark:text-gray-300 mb-4"
            dangerouslySetInnerHTML={{ __html: formatText(t.cplabs.description) }}
          />
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">{t.metadium.title}</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {t.metadium.description}
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">{t.coinplug.title}</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {t.coinplug.description}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {t.coinplug.patents}
          </p>
          <a 
            href="https://patents.google.com/?q=COINPLUG&assignee=Coinplug"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            {lang === 'ko' ? '→ 특허 검색 (Google Patents)' : '→ Search Patents (Google Patents)'}
          </a>
        </section>
      </div>
    </div>
  );
}

