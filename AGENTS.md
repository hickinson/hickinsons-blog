# AGENTS.md

## Working style
- This repo should stay lean, calm, readable, and low-maintenance.
- Prefer deletion over abstraction.
- Prefer native capabilities over extra dependencies.
- Do not make broad changes without first producing an audit and decision list.
- Do not remove anything significant without explicit approval.
- Keep public URLs, content, and site feel stable unless approved.

## Editorial work
- For editorial or content work, read [EDITORIAL.md](EDITORIAL.md), [VOICE.md](VOICE.md) and [AUTOMATION.md](AUTOMATION.md) before drafting.
- Retrieve only the relevant files from `docs/editorial-learnings/`; do not load the whole learning store by default.
- Treat Phil's explicit source material and current edits as stronger evidence than inferred style patterns.
- After a verified human editorial pass, assess whether any learning is non-obvious, durable and material enough to capture. Most cycles should produce none.
- Do not silently rewrite `VOICE.md`. Broad voice changes require normal human review.

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
