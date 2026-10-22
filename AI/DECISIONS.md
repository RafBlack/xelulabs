# Decisions

## 2026-10-22 - Store shared AI context in Markdown

- User requested an `AI` folder for saved memory and context across sessions.
- Keep project facts, decisions, and the latest handoff in separate Markdown files.
- `AI/AGENTS.md` (git-ignored, local only) directs future agents to read and maintain these notes.
- Ignore `AI/local/` for disposable scratch work; retain shared context in Git.

## 2026-10-22 - Extend the existing starter ignore rules

- Preserve the React + Vite starter rules.
- Add local environment files, credential file formats, caches, test reports,
  deployment state, and temporary files.
- Allow sanitized `.env.example` and `.env.*.example` templates to be tracked.
- Keep `package-lock.json` tracked for reproducible dependency installation.
