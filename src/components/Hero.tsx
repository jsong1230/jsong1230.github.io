'use client';

import { useState, useEffect } from 'react';

const content = {
  ko: {
    greeting: '안녕하세요.',
    name: '저는 송주한(Jeffrey Joo-Han Song)입니다.',
    intro: '저는 20년 넘게 **블록체인, Web3, DID, AI** 분야에서 연구와 개발, 그리고 R&D 리더십을 맡아온 엔지니어이자 CTO입니다.',
    current: {
      title: '현재는 **CPLABS CTO**로서',
      description: 'Web3 플랫폼 아키텍처, DID·인증 기술, 블록체인 특허 기반 서비스 기획을 총괄하고 있습니다. **Metadium**, **Wemix** 등 주요 프로젝트의 기술 아키텍처를 리딩하며, AI 기반 개인화 비서 서비스 \'대파\' 개발을 진행하고 있습니다. 또한 Coinplug와 Metadium의 CTO로 활동하며 국내 블록체인 산업의 기술적 기반을 만드는 데 기여해왔습니다.',
    },
    background: {
      title: '캐나다 UBC에서',
      description: '**컴퓨터공학 박사(무선네트워크/보안)** 학위를 취득했고, 삼성전자 통신연구소에서 Senior Engineer로 경력을 시작했습니다. 이후 캐나다에서 Reading Town Learning Centre의 IT Lead로 활동하며 네트워크 인프라 구축 경험을 넓혔습니다.',
    },
    interests: {
      title: '저의 관심사는 다음과 같습니다:',
      items: [
        'Web3·블록체인 인프라 설계',
        'DID/SSI 및 디지털 아이덴티티',
        'AI 에이전트, 멀티모달 모델 활용',
        '공공·교통 시스템(MLFF) 기술 설계',
        '장기적인 기술·사회 변화에 대한 글쓰기',
      ],
    },
  },
  en: {
    greeting: 'Hi,',
    name: "I'm Jeffrey Joo-Han Song",
    intro: '— a technologist, engineer, and CTO with over 20 years of experience across **Blockchain, Web3, DID, and AI**.',
    current: {
      title: 'I currently serve as the **CTO of CPLABS**,',
      description: 'where I lead Web3 platform architecture, decentralized identity (DID/SSI) technologies, and blockchain patent-based service planning. I lead the technical architecture for major projects including **Metadium** and **Wemix**, and am developing the AI-powered personal assistant service "Daepa." I previously worked as the CTO of **Coinplug** and **Metadium**, contributing to the early growth of Korea\'s blockchain ecosystem and the development of decentralized identity infrastructure.',
    },
    background: {
      title: 'I received my',
      description: '**Ph.D. in Electrical and Computer Engineering** from the University of British Columbia, specializing in wireless networking and network security. Before that, I worked as a Senior Engineer at Samsung Electronics, and later as the IT Lead for twelve branches of Reading Town Learning Centre in Metro Vancouver.',
    },
    interests: {
      title: 'My areas of interest include:',
      items: [
        'Web3 and Blockchain Infrastructure',
        'Decentralized Identity (DID/SSI)',
        'AI Agents & multimodal model integration',
        'Public and mobility systems (MLFF)',
        'Long-form writing about technology and society',
      ],
    },
  },
};

function formatText(text: string) {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900 dark:text-gray-100">$1</strong>');
}

export default function Hero() {
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

    return () => {
      window.removeEventListener('langchange', handleLangChange as EventListener);
    };
  }, []);

  const t = content[lang];

  return (
    <section className="relative overflow-hidden -mx-6 px-6 py-24 md:py-32">
      {/* DALL-E Background Image - More Visible */}
      <div 
        className="absolute inset-0 -z-20"
        style={{
          backgroundImage: `url('/hero-background.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(20px) brightness(0.85) saturate(1.0)',
          transform: 'scale(1.05)',
          opacity: 0.8,
        }}
      />
      
      {/* Gradient Background Overlay - Much More Transparent */}
      <div 
        className="absolute inset-0 -z-10"
        style={{
          background: 'linear-gradient(135deg, rgba(248, 250, 252, 0.4) 0%, rgba(241, 245, 249, 0.4) 100%)',
        }}
      />
      <div 
        className="absolute inset-0 -z-10 dark:block hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.3) 0%, rgba(30, 41, 59, 0.3) 100%)',
        }}
      />
      
      {/* Noise Texture Overlay */}
      <div 
        className="absolute inset-0 -z-10 opacity-[0.04] dark:opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />
      
      {/* Network Pattern - More Visible */}
      <svg 
        className="absolute inset-0 -z-10 w-full h-full opacity-20 dark:opacity-25"
      >
        <defs>
          <pattern id="network-hero" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
            <circle cx="25" cy="25" r="2" fill="#3b82f6" opacity="0.4" />
            <circle cx="95" cy="35" r="2" fill="#8b5cf6" opacity="0.4" />
            <circle cx="60" cy="85" r="2" fill="#14b8a6" opacity="0.4" />
            <circle cx="15" cy="70" r="1.5" fill="#3b82f6" opacity="0.3" />
            <circle cx="85" cy="90" r="1.5" fill="#8b5cf6" opacity="0.3" />
            <line x1="25" y1="25" x2="95" y2="35" stroke="#3b82f6" strokeWidth="0.8" opacity="0.2" />
            <line x1="25" y1="25" x2="60" y2="85" stroke="#8b5cf6" strokeWidth="0.8" opacity="0.2" />
            <line x1="95" y1="35" x2="60" y2="85" stroke="#14b8a6" strokeWidth="0.8" opacity="0.2" />
            <line x1="15" y1="70" x2="60" y2="85" stroke="#3b82f6" strokeWidth="0.6" opacity="0.15" />
            <line x1="85" y1="90" x2="60" y2="85" stroke="#8b5cf6" strokeWidth="0.6" opacity="0.15" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#network-hero)" />
      </svg>
      
      {/* Color Gradient Overlay */}
      <div 
        className="absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 60%),
            radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.15) 0%, transparent 60%),
            radial-gradient(circle at 50% 50%, rgba(20, 184, 166, 0.08) 0%, transparent 60%)
          `,
        }}
      />
      
      <div className="container-narrow space-y-12 relative z-10">
        <div className="space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight">
            <span className="block">{t.greeting}</span>
            <span className="block mt-2">{t.name}</span>
          </h1>
          <p 
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-light leading-relaxed max-w-2xl" 
            dangerouslySetInnerHTML={{ __html: formatText(t.intro) }}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6 pt-12">
          <div className="p-6 rounded-lg border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-xl bg-white/60 dark:bg-gray-900/40 hover:bg-white/80 dark:hover:bg-gray-900/60 transition-all shadow-sm">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
              {lang === 'ko' ? '현재' : 'Current'}
            </h3>
            <p 
              className="text-gray-900 dark:text-gray-100 font-medium mb-2" 
              dangerouslySetInnerHTML={{ __html: formatText(t.current.title) }}
            />
            <p 
              className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed" 
              dangerouslySetInnerHTML={{ __html: formatText(t.current.description) }}
            />
          </div>

          <div className="p-6 rounded-lg border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-xl bg-white/60 dark:bg-gray-900/40 hover:bg-white/80 dark:hover:bg-gray-900/60 transition-all shadow-sm">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
              {lang === 'ko' ? '배경' : 'Background'}
            </h3>
            <p className="text-gray-900 dark:text-gray-100 font-medium mb-2">
              {t.background.title}
            </p>
            <p 
              className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed" 
              dangerouslySetInnerHTML={{ __html: formatText(t.background.description) }}
            />
          </div>
        </div>

        <div className="pt-8">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">
            {t.interests.title}
          </h3>
          <div className="flex flex-wrap gap-2">
            {t.interests.items.map((item, idx) => (
              <span key={idx} className="px-3 py-1.5 text-sm rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

