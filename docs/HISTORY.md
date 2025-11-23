# HISTORY.md – jsong1230.github.io

변경 이력 및 주요 결정사항을 기록합니다.

---

## 2025-11-22

### 초기 프로젝트 생성

- Astro + React + MDX + Tailwind CSS 프로젝트 초기화
- 기본 디렉토리 구조 생성 (`/src`, `/content`, `/docs`, `/prompts`, `/logs`)
- BaseLayout, Header, Footer 컴포넌트 생성
- Hero 섹션 및 About 페이지 생성
- 타임라인 컴포넌트 생성
- 콘텐츠 파일 생성 (`about-ko.md`, `about-en.md`, timeline 파일들)
- 프로젝트 문서 생성 (PROJECT_SPEC.md, TODO.md, HISTORY.md, README.md)

### 기술 스택 결정

- **Astro**: 정적 사이트 생성에 최적화, GitHub Pages와 궁합 좋음
- **React**: 인터랙티브 컴포넌트 (LanguageToggle, Timeline)
- **MDX**: 블로그 포스트 및 콘텐츠 관리
- **Tailwind CSS**: 미니멀 디자인, 다크모드 지원

### 디자인 방향

- 미니멀 블랙&화이트 테마
- 텍스트 기반 Hero 섹션
- 좁은 폭 레이아웃 (max-width: 720px)
- 다크모드 기본 제공 (class 기반)

---

## 2025-11-22 (후반)

### 한영 전환 기능 구현

- **LanguageToggle 컴포넌트**: React 기반 클라이언트 사이드 언어 전환
- **URL 쿼리 파라미터 기반**: `?lang=ko` 또는 `?lang=en`으로 언어 유지
- **Custom Event 시스템**: `langchange` 이벤트로 모든 컴포넌트 동기화
- **localStorage 저장**: 사용자 언어 선호도 저장
- **적용 페이지**: Hero, About, Work, Publications, Writing, Contact

### 페이지 구현 완료

- **Work 페이지**: CPLABS, Coinplug, Metadium, Samsung, Reading Town 상세 정보 및 링크
- **Publications 페이지**: 특허, 논문, 저서 검색 링크 제공
- **Contact 페이지**: FormSubmit을 통한 이메일 전송 기능
- **UBC Papers 페이지**: Vincent Wong 교수님 웹사이트 기반 논문 목록

### Hero 섹션 개선

- **배경 이미지**: DALL-E로 생성한 AI/Blockchain 테마 이미지 추가
- **CSS 효과**: 그라디언트, 노이즈, 네트워크 패턴 오버레이
- **흐린 배경**: blur(20px), opacity 0.8로 미묘한 기술적 느낌

### Work 페이지 링크 추가

- **CPLABS**: cplabs.io, web2x.io, daepa.ai 링크
- **Metadium**: metadium.com, medium.com/metadium 링크
- **Reading Town**: readingtown.com 링크
- **Coinplug**: 별도 항목으로 분리 (2014-2023)

### 기간 정보 수정

- **CPLABS**: `2020s–현재` → `2023s–현재`
- **Coinplug**: `2014–현재` → `2014–2023` (별도 항목으로 분리)
- **Reading Town**: `2009–2014` → `2010–2014`
- **UBC Postdoc**: `2007–2008` → `2007–2009`
- **업데이트된 파일**: WorkContent.tsx, AboutContent.tsx, bio/*.md, timeline/*.md

### Contact 페이지 개선

- **이메일 주소**: `joohans@gmail.com` → `van.jeffing@gmail.com`
- **한영 전환**: ContactContent.tsx로 React 컴포넌트화
- **FormSubmit 통합**: 무료 폼 제출 서비스 활용

### 기술적 결정사항

- **클라이언트 사이드 언어 전환**: 페이지 리로드 없이 즉시 전환
- **React 컴포넌트화**: 동적 콘텐츠를 React로 변환 (Hero, About, Work, Publications, Writing, Contact)
- **배경 이미지 생성**: DALL-E API를 통한 커스텀 배경 이미지 생성 스크립트
- **GitHub Actions**: 자동 빌드 및 배포 설정 완료

### 파일 구조

```
src/
  components/
    Hero.tsx              # Hero 섹션 (배경 이미지 포함)
    AboutContent.tsx      # About 페이지 콘텐츠
    WorkContent.tsx       # Work 페이지 콘텐츠
    PublicationsContent.tsx  # Publications 페이지 콘텐츠
    WritingContent.tsx    # Writing 페이지 콘텐츠
    ContactContent.tsx    # Contact 페이지 콘텐츠
    LanguageToggle.tsx    # 언어 전환 토글
    DarkModeToggle.tsx    # 다크모드 토글
    Timeline.tsx          # 타임라인 컴포넌트
  pages/
    index.astro          # 메인 페이지
    about.astro          # About 페이지
    work.astro           # Work 페이지
    publications.astro   # Publications 페이지
    writing.astro        # Writing 페이지
    contact.astro        # Contact 페이지
    ubc-papers.astro     # UBC 논문 목록
```

### 주요 변경사항 요약

1. **언어 전환**: 모든 페이지에서 한영 전환 지원
2. **배경 이미지**: Hero 섹션에 기술적 느낌의 배경 추가
3. **링크 추가**: Work 페이지에 각 회사/프로젝트 링크 추가
4. **기간 수정**: 정확한 기간 정보로 업데이트
5. **문서화**: HISTORY.md, TODO.md 업데이트

---

## 2025-01-XX

### 수상 및 성과 섹션 추가

- **About 페이지에 "Awards & Achievements" 섹션 추가**
  - Experience 섹션 다음에 배치
  - 카드 형태로 수상 정보 표시
  - 뉴스 링크 포함

- **추가된 수상 내역**:
  1. **과기정통부장관 표창장 (2023)**
     - 2023 대한민국 디지털 이노베이션 어워드
     - CPLABS 송주한 연구소장
     - 뉴스 링크: https://m.etnews.com/20231120000170
     - 정보통신기술의 개발 및 융복합 활용을 통해 디지털 경제·사회 구현에 기여
  
  2. **JB금융 핀테크 경연대회 (2015)**
     - 기술사업화 부문 최우수상
     - 코인플러그 - 새로운 공인인증서 기술
     - 뉴스 링크: https://www.fnnews.com/news/201506161431392846

- **UI 개선**:
  - 수상 등급 배지 표시 (경연대회만)
  - 뉴스 링크 버튼 (새 창에서 열림)
  - 한글/영문 자동 전환 지원
  - 그라디언트 배경 카드 디자인

- **기술적 세부사항**:
  - `AboutContent.tsx`에 `awardsList` 배열 추가
  - 각 수상 항목에 `year`, `title`, `organization`, `description`, `award`, `newsLink` 필드 포함
  - 표창장은 등급 태그 없이 표시 (award 필드 빈 문자열)

---

## 다음 작업 예정

- SEO 설정 (meta tags, Open Graph)
- 반응형 레이아웃 최적화
- Writing 페이지 콘텐츠 추가
- 방문 통계 연동 (Plausible 등)

