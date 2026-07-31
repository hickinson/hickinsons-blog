# AGENTS.md

## Working style
- This repo should stay lean, calm, readable, and low-maintenance.
- Prefer deletion over abstraction.
- Prefer native capabilities over extra dependencies.
- Do not make broad changes without first producing an audit and decision list.
- Do not remove anything significant without explicit approval.
- Keep public URLs, content, and site feel stable unless approved.

## Change control
- Work in review-first mode.
- Group recommendations by risk: low, medium, high.
- Wait for approval before implementing each group.
- Keep patches small and easy to review.
- After each approved patch, run relevant validation and summarise impact.

## Branch and deployment safety
- Treat `main` as production. Never make or commit changes directly on `main`.
- Create or use one short-lived branch for one coherent change.
- Before editing, list the files intended to change and confirm the scope.
- Do not merge, deploy, delete branches or change repository settings without explicit approval.
- Do not force-push or rewrite shared branch history.
- Stop when unexpected files or an unexpected `package-lock.json` change appear.
- Do not run `npm audit fix`, delete the lockfile or regenerate dependencies as a shortcut.
- Run `npm run build` after an approved patch.
- Present the changed files, diff summary and validation result for review.
- Use a pull request and the Cloudflare branch preview before production.
- Follow [WORKFLOW.md](WORKFLOW.md) and [RECOVERY.md](RECOVERY.md).

## Repo philosophy
- This is a personal blog, not a complex application.
- Optimise for clarity, simplicity, and maintainability.
- Avoid cleverness that increases cognitive load.
