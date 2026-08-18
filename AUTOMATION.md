# Editorial automation

This document defines the minimum assisted publishing workflow for hickinsons.blog.

The purpose is to reduce friction between captured thought and a reviewable draft. It is not a system for manufacturing weekly output, and it must not publish autonomously.

Read [EDITORIAL.md](EDITORIAL.md) before drafting. Repository and release safety remain governed by [AGENTS.md](AGENTS.md) and [WORKFLOW.md](WORKFLOW.md).

## 1. Editorial inbox

GitHub Issues is the active editorial inbox.

Use the **Editorial idea** issue form for new captures. The issue should preserve what is known before a polished argument exists: the observation, source material, provenance, unresolved questions and any obvious constraints.

The v1 workflow state is the issue form's **Editorial status** field:

- **Capture only** — worth keeping, but not yet developed;
- **Developing** — enough material exists to explore the idea further;
- **Ready for drafting** — there is sufficient grounded material to choose a form and attempt a draft;
- **Needs research** — outside verification or source work is required before drafting;
- **Hold** — deliberately retained without active development.

Labels may be added later if they materially improve operation. The workflow must not depend on them.

`ideas.md` is not an editorial backlog. It remains only as a pointer to this system.

## 2. Selection is an editorial decision

Do not select an idea merely because it is oldest or because a Friday is approaching.

Before drafting, test:

1. Is there a concrete observation, experience, source or question here?
2. Is there enough provenance to write without inventing the author's reaction or circumstances?
3. Is the idea distinct from recently published work?
4. Does it deserve a post now, or should it be held, combined with another capture, reduced to a Commonplace entry or left unfinished?
5. What form best fits the material?

"No full post yet" is a valid outcome.

When there are several credible candidates, prefer the one that adds useful thematic or formal variety without writing to a category quota.

## 3. Choose form before prose

The form must be stated before drafting. Use the forms in `EDITORIAL.md`, including field note, reflective essay, photo-led piece, reading note, notebook/list, signal response, letter, dialogue, unfinished question and creative work.

Look at the previous four or five published posts. Do not reproduce their surface structure simply because it has worked before.

Record the chosen form and category in the draft PR description.

## 4. Drafting contract

A drafter may use:

- the selected GitHub issue and its comments;
- explicitly linked source material;
- relevant Commonplace entries;
- established project context that can be retrieved and verified;
- web research when the idea requires current or external verification.

A drafter must not invent:

- personal experiences or conversations;
- opinions, emotions, motivations or conclusions;
- details about identifiable people;
- factual claims that the available evidence does not support.

Keep quotation and paraphrase distinguishable from the author's interpretation. Follow the privacy, reputation and copyright gates in `EDITORIAL.md`.

If important information is absent, omit it, mark it as uncertain or leave the idea undeveloped. Do not fill the gap with plausible prose.

## 5. Draft artefact

A proposed blog post should normally be one new file in `src/mdx/`, based on the neutral shell in `src/templates/_post-template.mdx`.

For a normal post, frontmatter must include:

- `title`;
- `post_date` in `YYYY-MM-DD` format;
- `post_category` as `work`, `technology`, `ideas` or `life`;
- `description`.

Use retrospective publication metadata only when genuinely required by the existing publication model.

The filename should be stable, readable and snake_case. Do not rename existing routes casually.

## 6. Editorial checks

Run:

```bash
npm run editorial:check
npm run build
```

`editorial:check` enforces mechanical hard gates across the MDX corpus. It can also report soft warnings for a changed draft without failing the build.

Soft warnings are prompts for human review, not style laws. A warning about single-sentence paragraphs, headings or rhetorical questions is not an instruction to remove them automatically.

The editor should also perform the non-mechanical checks from `EDITORIAL.md`, especially:

- provenance;
- factual support;
- privacy and reputation;
- copyright;
- article-worthiness;
- repeated form and rhetorical habits;
- whether the ending has outlived the article.

## 7. Branch and draft PR

Automation must work on a short-lived branch, normally `post-<slug>` for an article.

The draft PR should include:

- source issue number(s);
- proposed publication date;
- chosen form;
- primary category;
- a short provenance note explaining what personal material was relied upon;
- research/source notes where relevant;
- editorial warnings that need human judgement;
- when the source issue was last checked;
- `npm run editorial:check` result;
- `npm run build` result.

A preview is for review, not approval by default.

## 8. Human release gate

The automated path ends at a reviewable **draft pull request**.

A human must read the piece, revise or reject it, review the diff and preview, decide whether it is ready, and explicitly approve merge/publication.

Immediately before publication, re-read the source issue and its comments. If the issue has changed since the draft was prepared, review the new material before approving publication; do not assume the existing draft remains valid. Record when the source was last checked in the PR.

A future `post_date` means the PR may be prepared and reviewed early but must remain unmerged until that date unless the human editor explicitly decides to publish early.

No automation defined here may:

- merge to `main`;
- enable auto-merge;
- deploy directly to production;
- rewrite a published post without a separate reviewed decision;
- force a post to exist merely to satisfy cadence.

## 9. After publication

After successful publication, add a short publication outcome to the source issue identifying the published article and PR, then close the issue as completed.

If genuinely distinct follow-up material remains, capture it in a new issue rather than leaving the published source issue at **Ready for drafting**.

## 10. Commonplace relationship

Commonplace is part of the same thinking system but is not a staging queue that every item must graduate from.

A saved source may remain a Commonplace entry permanently. An article may emerge from several Commonplace notes, several GitHub issues or neither.

The useful relationship is:

`capture -> develop -> choose form -> draft -> check -> draft PR -> source re-check -> human release -> record publication -> close source issue`

not:

`capture -> automatically become an essay`.
