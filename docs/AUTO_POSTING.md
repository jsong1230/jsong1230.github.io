# 자동 포스팅 시스템

매일 자동으로 블로그 포스트를 생성하는 GitHub Actions 기반 시스템입니다.

## 작동 방식

1. **매일 자동 실행**: GitHub Actions가 매일 한국시간 오전 9시(UTC 00:00)에 자동으로 실행됩니다.
2. **주제 추출**: About, Work, Publications 페이지의 내용에서 랜덤으로 주제를 선택합니다.
3. **AI 포스팅 생성**: OpenAI GPT-4o-mini를 사용하여 한글/영문 포스팅을 각각 생성합니다.
4. **자동 커밋**: 생성된 포스팅이 자동으로 커밋되고 푸시됩니다.

## 설정 방법

### 1. GitHub Secrets 설정

GitHub 저장소의 Settings > Secrets and variables > Actions에서 다음 Secret을 추가하세요:

- `OPENAI_API_KEY`: OpenAI API 키

### 2. 수동 실행

GitHub Actions 페이지에서 "Generate Daily Post" 워크플로우를 선택하고 "Run workflow" 버튼을 클릭하여 수동으로 실행할 수 있습니다.

### 3. 로컬 테스트

로컬에서 테스트하려면:

```bash
# .env 파일에 OPENAI_API_KEY 설정
echo "OPENAI_API_KEY=your-api-key" >> .env

# 포스팅 생성 스크립트 실행
npm run generate-post
```

## 포스팅 구조

포스팅은 `src/content/posts/` 디렉토리에 MDX 파일로 저장됩니다.

파일명 형식: `YYYY-MM-DD-제목.mdx`

각 포스팅은 다음 frontmatter를 포함합니다:

```yaml
---
title: 포스팅 제목
date: YYYY-MM-DD
lang: ko | en
slug: YYYY-MM-DD-제목
excerpt: 포스팅 요약...
---
```

## 주제 카테고리

포스팅 주제는 다음 카테고리에서 랜덤으로 선택됩니다:

### About
- 블록체인, Web3, DID, AI 분야의 20년 경력
- UBC Ph.D. (무선 네트워킹, 네트워크 보안)
- 과기정통부장관 표창장 (2023)
- JB금융 핀테크 경연대회 최우수상 (2015)
- AI를 이용한 shorts와 long forms 제작

### Work
- CPLABS - Web3 플랫폼 아키텍처, DID/SSI 기술 개발
- CPLABS - 대파(Daepa) AI 기반 개인화 비서 서비스
- CPLABS - MLFF(말레이시아 자유통행) 기술 리뷰 및 PoC
- CPLABS - 320+ 블록체인 특허 기반 플랫폼
- CPLABS - 국내 최초 DID/블록체인 상용화 사례
- Metadium - 블록체인 기반 자기주권 신원(SSI) 인프라
- Samsung - 통신/무선 네트워크 연구개발
- Reading Town - 메트로 밴쿠버 12개 지점 네트워크 인프라

### Publications
- 320+ 블록체인 특허 보유
- UBC 논문 다수 (무선 네트워킹, 네트워크 보안)
- 비트코인 및 블록체인 관련 번역서 및 공저 3권

## 회사명 사용 규칙

**중요**: 2023년에 회사명이 변경되었으므로, 모든 포스트에서 다음 규칙을 반드시 따라야 합니다:

- **한글 포스트**: "코인플러그" 또는 "Coinplug" → **"씨피랩스"**로 작성
- **영어 포스트**: "Coinplug" → **"CPLABS"**로 작성
- 과거 시점을 언급할 때도 현재 회사명(씨피랩스/CPLABS)을 사용합니다.

이 규칙은 자동 포스팅 생성 스크립트의 AI 프롬프트에 포함되어 있으며, 수동으로 작성하는 포스트에도 동일하게 적용됩니다.

## 중복 방지

같은 날짜에 이미 포스팅이 존재하는 경우, 새로운 포스팅을 생성하지 않습니다.

## Writing 페이지

생성된 포스팅은 `/writing` 페이지에서 확인할 수 있습니다.

- 한글 포스팅: `/writing?lang=ko`
- 영문 포스팅: `/writing?lang=en`

각 포스팅을 클릭하면 상세 페이지로 이동합니다.

