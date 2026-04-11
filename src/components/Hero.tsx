'use client';

import { useLanguage } from '../utils/language';
import { formatText } from '../utils/format';

const content = {
  ko: {
    greeting: '안녕하세요.',
    name: '저는 송주한(Jeffrey Joo-Han Song)입니다.',
    intro: '저는 20년 넘게 **블록체인, Web3, DID, AI** 분야에서 연구와 개발, 그리고 R&D 리더십을 맡아온 엔지니어이자 CTO입니다.',
    current: {
      title: '현재는 **CPLABS CTO**로서',
      description: 'Web3 플랫폼 아키텍처, DID·인증 기술, 블록체인 특허 기반 서비스 기획을 총괄하고 있습니다. **Metadium**, **Wemix** 등 주요 프로젝트의 기술 아키텍처를 리딩하며, AI 연애 트레이닝 서비스 \'대파\' 개발을 진행하고 있습니다.',
    },
    background: {
      title: '캐나다 UBC에서',
      description: '**컴퓨터공학 박사(무선네트워크/보안)** 학위를 취득했고, 삼성전자 통신연구소에서 Senior Engineer로 경력을 시작했습니다.',
    },
    interests: {
      title: '관심 분야',
      items: [
        'Web3·블록체인 인프라 설계',
        'DID/SSI 및 디지털 아이덴티티',
        'AI 에이전트, 멀티모달 모델',
        '공공·교통 시스템(MLFF)',
        '기술·사회 변화에 대한 글쓰기',
      ],
    },
  },
  en: {
    greeting: 'Hi,',
    name: "I'm Jeffrey Joo-Han Song",
    intro: '— a technologist, engineer, and CTO with over 20 years of experience across **Blockchain, Web3, DID, and AI**.',
    current: {
      title: 'I currently serve as the **CTO of CPLABS**,',
      description: 'leading Web3 platform architecture, decentralized identity (DID/SSI) technologies, and blockchain patent-based services. I lead the technical architecture for **Metadium** and **Wemix**, and am developing the AI dating training service "Daepa."',
    },
    background: {
      title: 'I received my',
      description: '**Ph.D. in Electrical and Computer Engineering** from UBC, specializing in wireless networking and network security. Previously a Senior Engineer at Samsung Electronics.',
    },
    interests: {
      title: 'Areas of interest',
      items: [
        'Web3 & Blockchain Infrastructure',
        'Decentralized Identity (DID/SSI)',
        'AI Agents & multimodal models',
        'Public & mobility systems (MLFF)',
        'Long-form writing on tech & society',
      ],
    },
  },
};

export default function Hero() {
  const [lang] = useLanguage();
  const t = content[lang];

  return (
    <section style={{ paddingTop: '80px', paddingBottom: '96px' }}>
      <div className="container-narrow space-y-10">

        {/* Headline */}
        <div className="space-y-4">
          <h1
            style={{
              fontFamily: 'Georgia, serif',
              fontWeight: 500,
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              lineHeight: 1.10,
              letterSpacing: '-0.02em',
              color: '#141413',
            }}
            className="dark:text-ivory"
          >
            <span style={{ color: '#87867f', fontSize: '0.7em', fontWeight: 400 }} className="block mb-2">
              {t.greeting}
            </span>
            {t.name}
          </h1>
          <p
            style={{ fontSize: '1.125rem', color: '#5e5d59', lineHeight: 1.60, maxWidth: '600px' }}
            className="dark:text-warm-silver"
            dangerouslySetInnerHTML={{ __html: formatText(t.intro) }}
          />
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Current */}
          <div
            style={{
              padding: '24px',
              borderRadius: '12px',
              border: '1px solid #f0eee6',
              background: '#faf9f5',
              boxShadow: 'rgba(0,0,0,0.05) 0px 4px 24px',
            }}
            className="dark:bg-dark-surface dark:border-border-warm/20"
          >
            <p
              style={{ fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.08em', color: '#87867f', textTransform: 'uppercase', marginBottom: '10px' }}
            >
              {lang === 'ko' ? '현재' : 'Current'}
            </p>
            <p
              style={{ fontSize: '0.975rem', fontWeight: 500, color: '#141413', marginBottom: '8px', lineHeight: 1.4 }}
              className="dark:text-ivory"
              dangerouslySetInnerHTML={{ __html: formatText(t.current.title) }}
            />
            <p
              style={{ fontSize: '0.875rem', color: '#5e5d59', lineHeight: 1.60 }}
              className="dark:text-warm-silver"
              dangerouslySetInnerHTML={{ __html: formatText(t.current.description) }}
            />
          </div>

          {/* Background */}
          <div
            style={{
              padding: '24px',
              borderRadius: '12px',
              border: '1px solid #f0eee6',
              background: '#faf9f5',
              boxShadow: 'rgba(0,0,0,0.05) 0px 4px 24px',
            }}
            className="dark:bg-dark-surface dark:border-border-warm/20"
          >
            <p
              style={{ fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.08em', color: '#87867f', textTransform: 'uppercase', marginBottom: '10px' }}
            >
              {lang === 'ko' ? '배경' : 'Background'}
            </p>
            <p
              style={{ fontSize: '0.975rem', fontWeight: 500, color: '#141413', marginBottom: '8px', lineHeight: 1.4 }}
              className="dark:text-ivory"
            >
              {t.background.title}
            </p>
            <p
              style={{ fontSize: '0.875rem', color: '#5e5d59', lineHeight: 1.60 }}
              className="dark:text-warm-silver"
              dangerouslySetInnerHTML={{ __html: formatText(t.background.description) }}
            />
          </div>
        </div>

        {/* Interest tags */}
        <div>
          <p
            style={{ fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.08em', color: '#87867f', textTransform: 'uppercase', marginBottom: '12px' }}
          >
            {t.interests.title}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {t.interests.items.map((item, idx) => (
              <span
                key={idx}
                style={{
                  padding: '6px 14px',
                  borderRadius: '24px',
                  fontSize: '0.8125rem',
                  color: '#4d4c48',
                  background: '#e8e6dc',
                  boxShadow: '0px 0px 0px 1px #d1cfc5',
                }}
                className="dark:bg-dark-surface dark:text-warm-silver"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
