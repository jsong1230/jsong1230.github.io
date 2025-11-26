# jsong1230.github.io

Personal homepage of Jeffrey Song (송주한) - CTO, Web3 & Blockchain Expert

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/jsong1230/jsong1230.github.io.git
cd jsong1230.github.io

# Install dependencies
npm install

# Start development server
npm run dev
```

개발 서버는 `http://localhost:4321`에서 실행됩니다.

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
jsong1230.github.io/
├── src/
│   ├── components/        # React 컴포넌트
│   │   ├── Hero.tsx       # Hero 섹션 (배경 이미지 포함)
│   │   ├── AboutContent.tsx
│   │   ├── WorkContent.tsx
│   │   ├── PublicationsContent.tsx
│   │   ├── WritingContent.tsx
│   │   ├── ContactContent.tsx
│   │   ├── LanguageToggle.tsx  # 한영 전환
│   │   └── DarkModeToggle.tsx # 다크모드 토글
│   ├── pages/            # Astro 페이지
│   │   ├── index.astro   # 메인 페이지
│   │   ├── about.astro
│   │   ├── work.astro
│   │   ├── publications.astro
│   │   ├── writing.astro
│   │   ├── contact.astro
│   │   └── ubc-papers.astro
│   ├── layouts/          # 레이아웃
│   │   └── BaseLayout.astro
│   └── styles/           # 글로벌 스타일
│       └── global.css
├── content/              # 콘텐츠 파일
│   ├── bio/             # 바이오 정보
│   │   ├── about-ko.md
│   │   └── about-en.md
│   ├── timeline/        # 타임라인
│   │   ├── 2000s.md
│   │   ├── 2010s.md
│   │   └── 2020s.md
│   └── posts/           # 블로그 포스트 (자동 생성)
├── public/              # 정적 파일
│   ├── favicon.svg
│   └── hero-background.jpg
├── docs/                # 문서
│   ├── PROJECT_SPEC.md  # 프로젝트 스펙
│   ├── HISTORY.md       # 변경 이력
│   ├── TODO.md          # 할 일 목록
│   └── README.md        # 상세 문서
└── scripts/             # 유틸리티 스크립트
    ├── generate-hero-background.js
    └── generate-daily-post.js  # 자동 포스팅 생성
```

## 🛠 Tech Stack

- **Astro**: 정적 사이트 생성
- **React**: 인터랙티브 컴포넌트 (언어 전환, 다크모드)
- **Tailwind CSS**: 스타일링
- **MDX**: 콘텐츠 관리 (향후 블로그용)
- **GitHub Pages**: 호스팅
- **GitHub Actions**: CI/CD

## 🌐 주요 기능

- ✅ 한영 전환 (URL 쿼리 파라미터 기반)
- ✅ 다크모드 토글
- ✅ 반응형 디자인
- ✅ SEO 최적화 준비
- ✅ GitHub Actions 자동 배포
- ✅ 매일 자동 포스팅 생성 (GitHub Actions + OpenAI)

## 📝 주요 페이지

- **Home** (`/`): Hero 섹션 및 소개
- **About** (`/about`): 상세 경력 및 타임라인
- **Work** (`/work`): 회사/프로젝트 상세 정보
- **Publications** (`/publications`): 특허, 논문, 저서
- **Writing** (`/writing`): 블로그 포스트 (자동 생성)
- **Contact** (`/contact`): 연락처 폼

## 🔄 언어 전환

모든 페이지에서 `?lang=ko` 또는 `?lang=en` 쿼리 파라미터로 언어를 전환할 수 있습니다.
언어 설정은 localStorage에 저장되어 다음 방문 시에도 유지됩니다.

## 📚 문서

- **프로젝트 스펙**: `/docs/PROJECT_SPEC.md`
- **변경 이력**: `/docs/HISTORY.md`
- **할 일 목록**: `/docs/TODO.md`
- **자동 포스팅 가이드**: `/docs/AUTO_POSTING.md`

## 🚢 배포

GitHub Actions가 자동으로 빌드하고 배포합니다.
`main` 브랜치에 푸시하면 자동으로 https://jsong1230.github.io 에 배포됩니다.

> **Note:** 자동 배포가 활성화되었습니다. 이제 `[skip ci]` 없이 커밋하면 포스트가 바로 배포됩니다.

## 📧 Contact

- Email: van.jeffing@gmail.com
- GitHub: https://github.com/jsong1230
- LinkedIn: https://www.linkedin.com/in/jeffreyjoohansong/

---

**Last Updated**: 2025-01-XX

