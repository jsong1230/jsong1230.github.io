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
    year: '2009-2014',
    title: 'Reading Town Learning Centre',
    role: 'Regional Manager / IT Lead',
    description: '메트로 밴쿠버 12개 지점 네트워크 인프라 구축 및 운영, 중소형 조직의 컴퓨터·서버·네트워크 지원',
  },
  {
    year: '2007-2008',
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
    year: '2009-2014',
    title: 'Reading Town Learning Centre',
    role: 'Regional Manager / IT Lead',
    description: 'Built and operated network infrastructure for 12 Metro Vancouver branches, IT support for computers, servers, and networks for small-to-medium organizations',
  },
  {
    year: '2007-2008',
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
    interestsDescription: '개인적으로는 등산과 걷기를 즐기고, 골프도 좋아합니다. 요즘은 AI를 활용한 다양한 코딩 프로젝트에 빠져있으며, GPU를 활용한 실험과 개발에도 관심이 많습니다.',
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
    interestsDescription: 'Personally, I enjoy hiking and walking, and I also love golf. Recently, I\'ve been deeply engaged in various coding projects using AI, and I\'m very interested in experiments and development using GPUs.',
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
    <div className="container-narrow py-12">
      <div className="space-y-16">
        <section>
          <h1 className="text-4xl font-bold mb-6">{t.title}</h1>
          <p 
            className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl" 
            dangerouslySetInnerHTML={{ __html: formatText(t.intro) }}
          />
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-6">{t.education}</h2>
          <div className="space-y-2">
            <p className="text-lg font-medium">{t.educationDegree}</p>
            <p className="text-gray-600 dark:text-gray-400">{t.educationSchool}</p>
            <p className="text-gray-700 dark:text-gray-300">{t.educationDetail}</p>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-8">{t.experience}</h2>
          <Timeline items={timelineData} lang={lang} />
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-6">{t.skills}</h2>
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
          <h2 className="text-2xl font-semibold mb-6">{t.interests}</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl">
            {t.interestsDescription}
          </p>
        </section>
      </div>
    </div>
  );
}

