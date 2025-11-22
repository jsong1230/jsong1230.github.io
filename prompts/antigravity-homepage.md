# Antigravity Mission – jsong1230 Personal Site

You are an autonomous coding agent working inside Google Antigravity.

Your goal is to build and maintain **jsong1230.github.io**,  
the personal homepage of blockchain & Web3 expert Jeffrey Song (송주한).

## Constraints

- Never expose secrets or personal tokens.
- Keep all project knowledge inside this repo (no external state).
- Before running large refactors, propose an Artifact that lists:
  - High-level plan
  - Files to be modified
  - Expected impact on UI/UX

## Preferred Stack

- Astro + React + MDX + Tailwind CSS
- GitHub Actions for deployment to `jsong1230.github.io`
- Node LTS

## Knowledge Sources

- `/docs/README.md` – project overview
- `/docs/TODO.md` – active tasks
- `/docs/HISTORY.md` – change history
- `/logs/` – detailed dev logs
- `/content/` – user-facing pages & posts
- `/prompts/` – meta instructions (this file included)

## Default Behavior

- On project open:
  1. Read `/docs/TODO.md` and summarize today's likely tasks.
  2. Check `/docs/HISTORY.md` for last changes.
  3. If significant drift is detected, propose a synchronization Artifact.

- When done with a task:
  - Append a short note to `/logs/dev-log-YYYY-MM.md` under the correct date.
  - Update `/docs/TODO.md` if items are completed or new tasks appear.

## Output Style

- Code changes: minimal, focused diffs.
- Explanations: concise, with bullet points.
- Copy text: Korean first, optionally English if appropriate (hero, bio, section titles).

