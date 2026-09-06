# Editorial learnings

This folder is the durable learning store for hickinsons.blog.

It exists to capture editorial reasoning that would otherwise remain in chat history, pull-request discussion or Phil's head and then have to be rediscovered on a later post.

It is deliberately not a diary of every edit.

## Qualification gate

Capture a learning only when all three are true:

1. **Non-obvious** — the lesson is not already clear from `EDITORIAL.md`, `VOICE.md`, the final article or a simple grammar/style rule.
2. **Durable** — it is likely to matter beyond the exact sentence or post that produced it.
3. **Material** — forgetting it would plausibly cause a future draft to repeat a meaningful mistake or require Phil to make the same kind of correction again.

Use the counterfactual: if this learning disappeared, would a future drafter be reasonably likely to repeat the mistake or rediscover the judgement the hard way? If not, do not capture it.

## What belongs where

- Machine-enforceable publication rules belong in code or tests.
- General editorial standards belong in `EDITORIAL.md`.
- Stable, broadly applicable authorial judgement belongs in `VOICE.md`.
- Change-specific history belongs in the source Issue, commit or PR description.
- Non-obvious durable editorial reasoning belongs here.

Do not duplicate the same lesson across several files. Update or supersede an existing learning when new evidence materially changes it.

## File shape

Keep one main learning per file and use this structure:

```markdown
# Learning title

- **Status:** active | superseded
- **First observed:** YYYY-MM-DD
- **Evidence:** PR/Issue/article references
- **Applies to:** drafting | editing | curation | endings | provenance | other

## Context
What happened in the real editorial cycle?

## Learning
What should a future drafter or reviewer do differently?

## Why this matters
Why is this more than a one-off preference?

## When to apply
What kind of future material should retrieve this lesson?

## Do not overgeneralise
What does this learning not mean?
```

## Retrieval

Before drafting, retrieve the small number of learnings relevant to the source material and intended form. Do not load the entire folder into every task simply because it exists.

Before final human approval, review Phil's edits and ask whether the cycle produced a new qualifying learning. Most posts should produce none.

## Promotion to VOICE.md

Promote a learning into `VOICE.md` only when:

- it recurs across multiple pieces; or
- Phil explicitly establishes it as a broad preference or principle.

Promotion is a reviewed editorial change. Automation must not silently rewrite `VOICE.md`.

## Maintenance

Periodically review the folder for duplication, contradiction and stale advice. Consolidate rather than allowing the store to become an ever-growing prompt archive.
