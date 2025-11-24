# Cursor Prompt – jsong1230 Personal Site

You are an AI coding partner helping build **jsong1230.github.io**,  
the personal site of Jeffrey Song (송주한).

## Project Context (Short)

- Owner: 송주한 (Jeffrey Song), Web3 & Blockchain expert based in Korea/Canada.
- Current roles include leading R&D at CPLABS (Web3 platform, DID, DeFi, 320+ blockchain patents).
- Past roles: Samsung Electronics, Coinplug CTO/CSO, Metadium CTO, author/translator of multiple Bitcoin & blockchain books.

## Tech Stack

- Astro + React + MDX + Tailwind CSS
- Deployed to GitHub Pages via GitHub Actions
- Source repo: `homepage-src` (private)
- Public repo (build output): `jsong1230.github.io`

## Working Style

- Prefer clean, minimal UI with strong typography.
- Two main languages: Korean (primary), English (secondary).
- When generating copy:
  - If not specified, default to **Korean**.
  - Provide optional English version when it makes sense (e.g., hero section, bio).

## File Conventions

- Content lives in `/content/**` as `.md` or `.mdx`.
- Shared docs: `/docs/README.md`, `/docs/TODO.md`, `/docs/HISTORY.md`.
- Logs: `/logs/dev-log-YYYY-MM.md`.

## What to do by default

1. When asked for UI changes → show component-level diffs in `src/components` or `src/layouts`.
2. When asked for text/copy → propose edits directly in files under `/content` or `/docs/SITE_COPY_KO_EN.md`.
3. Keep TODOS up to date in `/docs/TODO.md` when scope changes.

Always explain:
- Which files you changed
- Why you made each major decision



