# PROJECT_SPEC.md – jsong1230.github.io

(Last updated: 2025-11-22)

# 1. Overview

이 프로젝트는 블록체인·Web3·DID·AI 기술 리더 **송주한(Jeffrey Joo-Han Song)**의  
개인 홈페이지를 구축하기 위한 스펙 문서이다.

목표는 다음과 같다:

- KO/EN 지원하는 현대적 개인 웹사이트
- Web3, DID, AI, MLFF 등 핵심 프로젝트 아카이브
- 2000년대~현재까지의 완전한 커리어 타임라인 제공
- Cursor / Antigravity / GitHub Pages 어디서든 동일한 흐름으로 개발 가능

---

# 2. Content Structure

```
homepage-src/
  /src
    /components
    /layouts
    /pages (Astro)
  /content
    /bio
      about-ko.md
      about-en.md
    /timeline
      2000s.md
      2010s.md
      2020s.md
    /posts
  /docs
    README.md
    PROJECT_SPEC.md  ← 이 파일
    TODO.md
    HISTORY.md
    SITE_COPY_KO_EN.md
  /prompts
    cursor-homepage.md
    antigravity-homepage.md
  /logs
    dev-log-YYYY-MM.md
```

---

# 3. Biography (최신 + 2007·2014 자료 + wiki1.kr 통합)

## 3.1 Profile Summary

- 블록체인·Web3·DID·AI 기술 리더
- CPLABS R&D 총괄 / CTO
- 전 Coinplug CTO, 전 Metadium CTO
- 20년 이상 기술 및 R&D 조직 운영
- Fluent in Korean & English
- Ph.D. in Electrical and Computer Engineering (University of British Columbia)

## 3.2 Education

- **Ph.D., Electrical & Computer Engineering – UBC (2001–2005)**
  Wireless Networking, Network Security 연구

## 3.3 Experience Timeline

### 📍2020s – 현재
**CPLABS – CTO / R&D Director**
- Web3 플랫폼 아키텍처 설계
- DID/SSI 기술 개발
- 블록체인 특허 기반 서비스 기획
- MLFF(말레이시아 자유통행) 기술 리뷰 및 PoC
- AI 기반 개인화 비서 플랫폼 '대파/자비스' 아키텍처 리딩

### 📍2017 – 현재
**Metadium – CTO**
- 블록체인 기반 자기주권 신원(Self-Sovereign Identity, SSI) 인프라 구축
- DID 프로토콜 구조 확립
- 아이덴티티 생태계 확장

### 📍2014 – 현재
**Coinplug – CTO**
- 블록체인 인증·지불·문서 검증 서비스 개발
- 블록체인 특허 320+ 기술 기반 플랫폼 구축
- 국내 최초 DID/블록체인 상용화 사례 다수

### 📍2009 – 2014
**Reading Town Learning Centre – Regional Manager / IT Lead**
- 메트로 밴쿠버 12개 지점 네트워크 인프라 구축 및 운영
- 중소형 조직의 컴퓨터·서버·네트워크 지원

### 📍2007 – 2008
**University of British Columbia – Postdoc & Teaching**
- Postdoctoral research and teaching

### 📍2005 – 2007
**Samsung Electronics – Senior Engineer, Telecommunication R&D Centre**
- 통신/무선 네트워크 연구개발
- 프로토콜, 보안, 네트워크 스택 연구

### 📍2001 – 2005
**Graduate Researcher – University of British Columbia**
- Ph.D 연구, RA(Research Assistant), TA(Teaching Assistant)
- Wireless Networking
- Network Security
- Academic research & teaching

---

# 4. Skills Summary

## Technical
- Blockchain, DID, SSI, Web3 Infra
- AI Agents, GPT/Claude Integration
- Wireless Networking / Network Security
- Linux / Unix / Windows / MacOS
- iOS/Android device ecosystem
- Small-business IT network design & deployment (12 branches)

## Management
- R&D 조직 리딩
- PM/PMO/Stakeholder Coordination
- AI · Web3 · Infra 아키텍처 설계

## Personal
- 빠른 학습, 다중작업 가능
- Positive, supportive, highly adaptable
- Fluent in English/Korean

---

# 5. Tech Stack for the Website

- **Astro + React + MDX + Tailwind CSS**
- GitHub Pages 배포
- Source repo(private): `homepage-src`
- Public repo(build output): `jsong1230.github.io`

---

# 6. Repo Structure

```
homepage-src/
  /src
    /components
    /layouts
    /pages (Astro)
  /content
    /bio
      about-ko.md
      about-en.md
    /timeline
      2000s.md
      2010s.md
      2020s.md
    /posts
  /docs
    README.md
    PROJECT_SPEC.md
    TODO.md
    HISTORY.md
    SITE_COPY_KO_EN.md
  /prompts
    cursor-homepage.md
    antigravity-homepage.md
  /logs
    dev-log-YYYY-MM.md
```

---

# 7. Cursor Prompt Behavior (요약)

- 항상 `/prompts/cursor-homepage.md`를 먼저 읽어 컨텍스트 초기화
- UI 변경 → `src/components` or `src/layouts` 수정
- Copy 변경 → `/content/bio` 또는 `/docs/SITE_COPY_KO_EN.md` 수정
- 모든 변경 후 TODO/HISTORY 갱신 제안

---

# 8. 초기 TODO

### 🔥 이번 주
- [x] `homepage-src` 생성
- [x] Astro + Tailwind 초기세팅
- [ ] About KO/EN 적용
- [ ] GitHub Actions → Pages 자동배포 설정

### 🎯 다음 1개월
- [ ] KO/EN 자동 토글
- [ ] DID/MLFF/AI 글 각 1편
- [ ] 글로벌 SEO 설정

