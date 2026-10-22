# AI context

This folder stores project memory as Markdown so future sessions can resume
work after a context window ends. These files are intended to be tracked in Git;
they become shared repository content when committed.

Read these files at the start of a session:

1. `PROJECT_CONTEXT.md`: stable project facts and confirmed requirements.
2. `DECISIONS.md`: agreed choices and their reasons.
3. `HANDOFF.md`: latest progress, checks, and next steps.

Update the relevant files after meaningful work. Replace outdated handoff notes
instead of accumulating transcripts. Verify notes against the code and current
user instructions. This is file-based context, not automatic persistent memory.

Never store secrets, credentials, personal data, customer information, or private
security findings here. `local/` is ignored for disposable scratch files, but Git
ignore rules do not make sensitive information safe to store.
