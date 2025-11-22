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

