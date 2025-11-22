'use client';

import { useState, useEffect } from 'react';

const workContent = {
  ko: {
    title: 'Work',
    cplabs: {
      title: 'CPLABS (이전 Coinplug)',
      period: '2014 – 현재',
      role: 'CTO / R&D Director',
      website: 'https://cplabs.io',
      daepa: 'https://daepa.ai',
      patents: '320+ 블록체인 특허 보유',
      description: '2014년 Coinplug로 시작하여 현재 CPLABS로 운영 중입니다. Web3 플랫폼 아키텍처 설계, DID/SSI 기술 개발, 블록체인 특허 기반 서비스 기획을 총괄하고 있습니다. 주요 프로젝트로는 <strong>Metadium</strong> (블록체인 기반 자기주권 신원 인프라), <strong>Wemix</strong> (게임 중심 Web3 플랫폼) 등의 기술 아키텍처를 리딩했습니다. 현재는 <strong>대파(Daepa)</strong> AI 기반 개인화 비서 서비스를 주력으로 개발하고 있으며, MLFF(말레이시아 자유통행) 기술 리뷰 및 PoC도 진행하고 있습니다.',
      highlights: [
        '블록체인 인증·지불·문서 검증 서비스 개발 (2014~)',
        '320+ 블록체인 특허 기술 기반 플랫폼 구축',
        '국내 최초 DID/블록체인 상용화 사례 다수',
        'MYKEEPiN (DID 솔루션), METAPASS (모바일 사원증) 개발',
        'Web3 플랫폼 아키텍처 설계 및 리딩',
        'DID/SSI 기술 개발',
        'Metadium, Wemix 등 주요 프로젝트 기술 아키텍처',
        '<strong>대파(Daepa)</strong> AI 기반 개인화 비서 서비스 개발 (주력)',
        'MLFF(말레이시아 자유통행) 기술 리뷰 및 PoC',
      ],
    },
    metadium: {
      title: 'Metadium',
      period: '2017 – 현재',
      role: 'CTO',
      website: 'https://metadium.com',
      description: '블록체인 기반 자기주권 신원(Self-Sovereign Identity, SSI) 인프라 구축, DID 프로토콜 구조 확립, 아이덴티티 생태계 확장',
      highlights: [
        '블록체인 기반 SSI 인프라 구축',
        'DID 프로토콜 구조 설계 및 확립',
        '아이덴티티 생태계 확장',
        '탈중앙화 신원 관리 플랫폼 개발',
      ],
    },
    samsung: {
      title: 'Samsung Electronics',
      period: '2005 – 2007',
      role: 'Senior Engineer, Telecommunication R&D Centre',
      website: 'https://www.samsung.com',
      description: '삼성전자 통신연구소에서 통신/무선 네트워크 연구개발을 담당했습니다. 프로토콜, 보안, 네트워크 스택 연구를 통해 차세대 통신 기술의 기반을 마련했습니다.',
      highlights: [
        '통신/무선 네트워크 연구개발',
        '프로토콜 설계 및 최적화',
        '네트워크 보안 연구',
        '네트워크 스택 개발',
      ],
    },
    readingTown: {
      title: 'Reading Town Learning Centre',
      period: '2009 – 2014',
      role: 'Regional Manager / IT Lead',
      website: '',
      description: '메트로 밴쿠버 지역 12개 지점의 네트워크 인프라를 구축하고 운영했습니다. 중소형 조직의 컴퓨터, 서버, 네트워크 지원을 총괄하며 실무 IT 관리 경험을 쌓았습니다.',
      highlights: [
        '메트로 밴쿠버 12개 지점 네트워크 인프라 구축',
        'IT 인프라 운영 및 관리',
        '컴퓨터·서버·네트워크 지원',
        '중소형 조직 IT 리더십',
      ],
    },
  },
  en: {
    title: 'Work',
    cplabs: {
      title: 'CPLABS (formerly Coinplug)',
      period: '2014 – Present',
      role: 'CTO / R&D Director',
      website: 'https://cplabs.io',
      daepa: 'https://daepa.ai',
      patents: '320+ blockchain patents',
      description: 'Started as Coinplug in 2014 and currently operating as CPLABS. I lead Web3 platform architecture design, DID/SSI technology development, and blockchain patent-based service planning. I have led the technical architecture for major projects including <strong>Metadium</strong> (blockchain-based self-sovereign identity infrastructure) and <strong>Wemix</strong> (game-centric Web3 platform). Currently, I am focusing on developing <strong>Daepa</strong>, an AI-powered personal assistant service, and also working on MLFF (Malaysia Free Flow) technology review and PoC.',
      highlights: [
        'Blockchain authentication, payment, and document verification services (2014~)',
        'Platform built on 320+ blockchain patents',
        'Multiple first-in-Korea DID/blockchain commercialization cases',
        'MYKEEPiN (DID solution), METAPASS (mobile employee ID) development',
        'Web3 platform architecture design and leadership',
        'DID/SSI technology development',
        'Technical architecture for major projects (Metadium, Wemix)',
        '<strong>Daepa</strong> AI-powered personal assistant service development (Main focus)',
        'MLFF (Malaysia Free Flow) technology review and PoC',
      ],
    },
    metadium: {
      title: 'Metadium',
      period: '2017 – Present',
      role: 'CTO',
      website: 'https://metadium.com',
      description: 'Built blockchain-based Self-Sovereign Identity (SSI) infrastructure, established DID protocol structure, expanded identity ecosystem',
      highlights: [
        'Blockchain-based SSI infrastructure development',
        'DID protocol structure design and establishment',
        'Identity ecosystem expansion',
        'Decentralized identity management platform development',
      ],
    },
    samsung: {
      title: 'Samsung Electronics',
      period: '2005 – 2007',
      role: 'Senior Engineer, Telecommunication R&D Centre',
      website: 'https://www.samsung.com',
      description: 'Led telecommunications and wireless network R&D at Samsung Electronics Telecommunication R&D Centre. Conducted research on protocols, security, and network stacks, laying the foundation for next-generation communication technologies.',
      highlights: [
        'Telecommunications/wireless network R&D',
        'Protocol design and optimization',
        'Network security research',
        'Network stack development',
      ],
    },
    readingTown: {
      title: 'Reading Town Learning Centre',
      period: '2009 – 2014',
      role: 'Regional Manager / IT Lead',
      website: '',
      description: 'Built and operated network infrastructure for 12 Metro Vancouver branches. Managed IT support for computers, servers, and networks for small-to-medium organizations, gaining hands-on IT management experience.',
      highlights: [
        'Network infrastructure for 12 Metro Vancouver branches',
        'IT infrastructure operations and management',
        'Computer, server, and network support',
        'IT leadership for small-to-medium organizations',
      ],
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

  const renderWorkSection = (work: any, key: string) => {
    return (
      <section key={key} className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold mb-2">{work.title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{work.period}</p>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{work.role}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            {work.website && (
              <a 
                href={work.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                Website →
              </a>
            )}
            {work.daepa && (
              <a 
                href={work.daepa}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-semibold"
              >
                Daepa →
              </a>
            )}
          </div>
        </div>
        
        <p 
          className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: formatText(work.description) }}
        />
        
          {work.patents && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {work.patents}
            </p>
            {key === 'cplabs' && (
              <a 
                href="https://patents.google.com/?q=COINPLUG&assignee=Coinplug"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                {lang === 'ko' ? '→ 특허 검색 (Google Patents)' : '→ Search Patents (Google Patents)'}
              </a>
            )}
          </div>
        )}
        
        {work.highlights && (
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
              {lang === 'ko' ? '주요 성과' : 'Key Achievements'}
            </h3>
            <ul className="space-y-2">
              {work.highlights.map((highlight: string, idx: number) => (
                <li key={idx} className="text-sm text-gray-700 dark:text-gray-300 flex items-start">
                  <span className="mr-2 text-gray-400">•</span>
                  <span dangerouslySetInnerHTML={{ __html: formatText(highlight) }} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    );
  };

  return (
    <div className="container-narrow py-12">
      <h1 className="text-4xl font-bold mb-12">{t.title}</h1>
      
      <div className="space-y-8">
        {renderWorkSection(t.cplabs, 'cplabs')}
        {renderWorkSection(t.metadium, 'metadium')}
        {renderWorkSection(t.samsung, 'samsung')}
        {renderWorkSection(t.readingTown, 'readingTown')}
      </div>
    </div>
  );
}

