'use client';

import { useState, useEffect } from 'react';
import Timeline from './Timeline';

const timelineDataKo = [
  {
    year: '2020s',
    title: 'CPLABS',
    role: 'CTO / R&D Director',
    description: 'Web3 플랫폼 아키텍처 설계, DID/SSI 기술 개발, 블록체인 특허 기반 서비스 기획, MLFF 기술 리뷰 및 PoC, AI 기반 개인화 비서 플랫폼 아키텍처 리딩',
    current: true,
  },
  {
    year: '2017',
    title: 'Metadium',
    role: 'CTO',
    description: '블록체인 기반 자기주권 신원(Self-Sovereign Identity, SSI) 인프라 구축, DID 프로토콜 구조 확립, 아이덴티티 생태계 확장',
  },
  {
    year: '2014',
    title: 'Coinplug',
    role: 'CTO',
    description: '블록체인 인증·지불·문서 검증 서비스 개발, 블록체인 특허 320+ 기술 기반 플랫폼 구축, 국내 최초 DID/블록체인 상용화 사례 다수',
  },
  {
    year: '2010-2014',
    title: 'Reading Town Learning Centre',
    role: 'Regional Manager / IT Lead',
    description: '메트로 밴쿠버 12개 지점 네트워크 인프라 구축 및 운영, 중소형 조직의 컴퓨터·서버·네트워크 지원',
  },
  {
    year: '2007-2009',
    title: 'University of British Columbia',
    role: 'Postdoc & Teaching',
    description: 'Electrical & Computer Engineering에서 포닥(Postdoc) 및 강의',
  },
  {
    year: '2005-2007',
    title: 'Samsung Electronics',
    role: 'Senior Engineer, Telecommunication R&D Centre',
    description: '통신/무선 네트워크 연구개발, 프로토콜, 보안, 네트워크 스택 연구',
  },
  {
    year: '2001-2005',
    title: 'University of British Columbia',
    role: 'Graduate Researcher',
    description: 'Ph.D 연구, RA(Research Assistant), TA(Teaching Assistant). 무선 네트워킹, 네트워크 보안 연구, 학술 연구 및 강의',
  },
];

const timelineDataEn = [
  {
    year: '2020s',
    title: 'CPLABS',
    role: 'CTO / R&D Director',
    description: 'Web3 platform architecture design, DID/SSI technology development, blockchain patent-based service planning, MLFF technology review and PoC, AI-powered personal assistant platform architecture leadership',
    current: true,
  },
  {
    year: '2017',
    title: 'Metadium',
    role: 'CTO',
    description: 'Built blockchain-based Self-Sovereign Identity (SSI) infrastructure, established DID protocol structure, expanded identity ecosystem',
  },
  {
    year: '2014',
    title: 'Coinplug',
    role: 'CTO',
    description: 'Developed blockchain authentication, payment, and document verification services, built platform based on 320+ blockchain patents, multiple first-in-Korea DID/blockchain commercialization cases',
  },
  {
    year: '2010-2014',
    title: 'Reading Town Learning Centre',
    role: 'Regional Manager / IT Lead',
    description: 'Built and operated network infrastructure for 12 Metro Vancouver branches, IT support for computers, servers, and networks for small-to-medium organizations',
  },
  {
    year: '2007-2009',
    title: 'University of British Columbia',
    role: 'Postdoc & Teaching',
    description: 'Postdoctoral research and teaching in the Department of Electrical and Computer Engineering',
  },
  {
    year: '2005-2007',
    title: 'Samsung Electronics',
    role: 'Senior Engineer, Telecommunication R&D Centre',
    description: 'Telecommunications/wireless network R&D, protocol, security, network stack research',
  },
  {
    year: '2001-2005',
    title: 'University of British Columbia',
    role: 'Graduate Researcher',
    description: 'Ph.D research, RA (Research Assistant), TA (Teaching Assistant). Wireless Networking, Network Security research, Academic research & teaching',
  },
];

const aboutContent = {
  ko: {
    title: 'About',
    intro: '안녕하세요. 저는 송주한(Jeffrey Joo-Han Song)입니다. 20년 이상 <strong>블록체인, Web3, DID, AI</strong> 분야에서 기술과 R&D 리더십을 맡아온 엔지니어이자 CTO입니다.',
    education: 'Education',
    educationDegree: 'Ph.D., Electrical & Computer Engineering',
    educationSchool: 'University of British Columbia (2001–2005)',
    educationDetail: '무선 네트워킹, 네트워크 보안 연구',
    experience: 'Experience',
    skills: 'Skills',
    technical: 'Technical',
    management: 'Management',
    interests: 'Personal Interests',
    interestsDescription: '개인적으로는 등산과 걷기를 즐기고, 골프도 좋아합니다. 요즘은 AI를 활용한 다양한 코딩 프로젝트에 빠져있으며, GPU를 활용한 실험과 개발에도 관심이 많습니다. 최근에는 AI를 이용한 shorts와 long forms 제작에도 취미를 붙였습니다.',
    awards: 'Awards & Achievements',
    awardsList: [
      {
        year: '2023',
        title: '과기정통부장관 표창장',
        organization: '과학기술정보통신부',
        description: '2023 대한민국 디지털 이노베이션 어워드 - 정보통신기술의 개발 및 융복합 활용을 통해 디지털 경제·사회 구현에 기여',
        award: '',
        newsLink: 'https://m.etnews.com/20231120000170',
      },
      {
        year: '2015',
        title: 'JB금융 핀테크 경연대회',
        organization: 'JB금융그룹',
        description: '새로운 공인인증서 기술로 기술사업화 부문 최우수상 수상 (코인플러그)',
        award: '기술사업화 부문 최우수상',
        newsLink: 'https://www.fnnews.com/news/201506161431392846',
      },
    ],
  },
  en: {
    title: 'About',
    intro: 'Hi, I\'m Jeffrey Joo-Han Song — a technologist, engineer, and CTO with over 20 years of experience across <strong>Blockchain, Web3, DID, and AI</strong>.',
    education: 'Education',
    educationDegree: 'Ph.D., Electrical & Computer Engineering',
    educationSchool: 'University of British Columbia (2001–2005)',
    educationDetail: 'Wireless Networking, Network Security research',
    experience: 'Experience',
    skills: 'Skills',
    technical: 'Technical',
    management: 'Management',
    interests: 'Personal Interests',
    interestsDescription: 'Personally, I enjoy hiking and walking, and I also love golf. Recently, I\'ve been deeply engaged in various coding projects using AI, and I\'m very interested in experiments and development using GPUs. I\'ve also developed a hobby in creating shorts and long-form content using AI.',
    awards: 'Awards & Achievements',
    awardsList: [
      {
        year: '2023',
        title: 'Minister\'s Commendation',
        organization: 'Ministry of Science and ICT',
        description: '2023 Korea Digital Innovation Awards - Contribution to digital economy and society through ICT development and convergence',
        award: '',
        newsLink: 'https://m.etnews.com/20231120000170',
      },
      {
        year: '2015',
        title: 'JB Financial Fintech Competition',
        organization: 'JB Financial Group',
        description: 'Excellence Award in Technology Commercialization - New Public Certificate Technology (Coinplug)',
        award: 'Excellence Award in Technology Commercialization',
        newsLink: 'https://www.fnnews.com/news/201506161431392846',
      },
    ],
  },
};

function formatText(text: string) {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/<strong>(.*?)<\/strong>/g, '<strong class="font-semibold">$1</strong>');
}

export default function AboutContent() {
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

  const t = aboutContent[lang];
  const timelineData = lang === 'en' ? timelineDataEn : timelineDataKo;

  return (
    <div className="container-narrow py-8 sm:py-12">
      <div className="space-y-12 sm:space-y-16">
        <section>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">{t.title}</h1>
          <p 
            className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl" 
            dangerouslySetInnerHTML={{ __html: formatText(t.intro) }}
          />
        </section>
        
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">{t.education}</h2>
          <div className="space-y-2">
            <p className="text-lg font-medium">{t.educationDegree}</p>
            <p className="text-gray-600 dark:text-gray-400">{t.educationSchool}</p>
            <p className="text-gray-700 dark:text-gray-300">{t.educationDetail}</p>
          </div>
        </section>
        
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8">{t.experience}</h2>
          <Timeline items={timelineData} lang={lang} />
        </section>
        
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">{t.awards}</h2>
          <div className="space-y-4">
            {t.awardsList.map((award, idx) => (
              <div key={idx} className="p-5 rounded-lg border border-gray-200 dark:border-gray-800 bg-gradient-to-r from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-800/30 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {award.title}
                      </h3>
                      {award.award && (
                        <span className="px-2 py-0.5 text-xs font-medium rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                          {award.award}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {award.organization}
                      {award.year && <span className="ml-2 text-gray-500">({award.year})</span>}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                      {award.description}
                    </p>
                    {award.newsLink && (
                      <a 
                        href={award.newsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
                      >
                        {lang === 'ko' ? '→ 뉴스 보기' : '→ View News'}
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">{t.skills}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-3">{t.technical}</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Blockchain, DID, SSI, Web3 Infra</li>
                <li>• AI Agents, GPT/Claude Integration</li>
                <li>• Wireless Networking / Network Security</li>
                <li>• Linux / Unix / Windows / MacOS</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">{t.management}</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                {lang === 'ko' ? (
                  <>
                    <li>• R&D 조직 리딩</li>
                    <li>• PM/PMO/Stakeholder Coordination</li>
                    <li>• AI · Web3 · Infra 아키텍처 설계</li>
                  </>
                ) : (
                  <>
                    <li>• R&D organization leadership</li>
                    <li>• PM/PMO/Stakeholder Coordination</li>
                    <li>• AI · Web3 · Infrastructure architecture design</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </section>
        
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">{t.interests}</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl">
            {t.interestsDescription}
          </p>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
            {lang === 'ko' ? '저서' : 'Books'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {lang === 'ko' 
              ? '비트코인 및 블록체인 관련 번역서 및 공저'
              : 'Translations and co-authored books on Bitcoin and blockchain'}
          </p>
          <div className="space-y-3">
            {lang === 'ko' ? (
              <>
                <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
                  <h3 className="font-semibold mb-1">비트코인, 디지털 화폐의 미래를 열다</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">역자/공저</p>
                </div>
                <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
                  <h3 className="font-semibold mb-1">비트코인, 블록체인과 금융의 혁신</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">역자/공저</p>
                </div>
                <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
                  <h3 className="font-semibold mb-1">비트코인, 공개 블록체인 프로그래밍</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">역자/공저</p>
                </div>
              </>
            ) : (
              <>
                <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
                  <h3 className="font-semibold mb-1">Bitcoin: Opening the Future of Digital Currency</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Translator/Co-author</p>
                </div>
                <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
                  <h3 className="font-semibold mb-1">Bitcoin: Blockchain and Financial Innovation</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Translator/Co-author</p>
                </div>
                <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
                  <h3 className="font-semibold mb-1">Bitcoin: Open Blockchain Programming</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Translator/Co-author</p>
                </div>
              </>
            )}
          </div>
          <div className="mt-4">
            <a 
              href={lang === 'ko' ? '/publications?lang=ko' : '/publications?lang=en'}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              {lang === 'ko' ? '→ 더 많은 정보 보기' : '→ View more details'}
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

