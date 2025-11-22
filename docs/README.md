# jsong1230 Personal Homepage

이 repo는 블록체인·Web3·DID·AI 분야에서 활동해온  
송주한(Jeffrey Song, 제프리 송)의 개인 홈페이지 소스입니다.

## Goals

- 한국/북미를 아우르는 개인 포트폴리오 & 블로그
- CPLABS / Coinplug / Metadium에서의 경험과 성과 정리
- Web3, MLFF, DID, AI에 대한 글과 자료 아카이브
- 장기적인 커리어/삶/투자에 대한 생각 정리

## Tech Stack

- Astro + React + MDX
- Tailwind CSS
- GitHub Actions → `jsong1230.github.io` 로 정적 사이트 배포

## Structure

- `/src`       : UI 레이아웃 & 컴포넌트
- `/content`   : 페이지 & 블로그 글 (md/mdx)
- `/docs`      : 프로젝트 문서 (README, TODO, HISTORY, ROADMAP 등)
- `/logs`      : 월별 개발 일지
- `/prompts`   : Cursor / Antigravity 프롬프트

## How to Work (for future me)

1. 새 아이디어가 떠오르면 → `/docs/TODO.md`에 먼저 적기
2. 실제 작업을 시작하면 → 해당 날짜의 `/logs/dev-log-YYYY-MM.md`에 메모
3. 중요한 구조 변경은 → `/docs/HISTORY.md`에 한 줄 요약
4. 카피 작업은 → `/docs/SITE_COPY_KO_EN.md`에서 초안 → `/content/**`로 반영
5. IDE는 Cursor든 Antigravity든 상관없이,
   - 항상 `/prompts/cursor-homepage.md` 또는 `/prompts/antigravity-homepage.md`를 먼저 읽히게 할 것

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

빌드 결과는 `/dist` 디렉토리에 생성됩니다.

