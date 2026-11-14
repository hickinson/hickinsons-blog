# Personal social publishing

Status: proposed operating implementation, prepared 14 November 2026. Phil's brief authorises preparation; individual posts remain unapproved until he approves their exact copy. Nothing here authorises autonomous publication.

## Purpose and authority

Distribute individual ideas from hickinsons.blog to develop reputation and relationships. The blog is the canonical source of original thinking. A social post must offer something independently; it need not summarise or advertise an article.

Apply [EDITORIAL.md](EDITORIAL.md), [VOICE.md](VOICE.md), [AUTOMATION.md](AUTOMATION.md), relevant editorial learnings and [WORKFLOW.md](WORKFLOW.md). Current author instructions and edits outrank inferred preferences. Choose the smallest appropriate form before drafting. Read the full source article and check recent social output before selecting an angle.

## Channels and fixed slots

| Channel | Default source | Identity | Existing slot, Europe/London |
| --- | --- | --- | --- |
| X | Life / Ideas | Personal, curious, reflective, occasionally provocative | Thursday 09:40 |
| LinkedIn | Work / Technology | Experienced practitioner and leader, ordinary language, evidence and judgement | Friday 15:02 |

Routing is a preference. Creativity, learning and thinking can belong on LinkedIn; technology can belong on X. X defaults to a standalone post of at most 280 weighted characters. Threads need a clear editorial reason. LinkedIn defaults to self-contained prose. Use links only when the article adds something material. Use an existing photograph only when it contributes and wider reuse is appropriate; add alt text. No default hashtags, emoji, carousel or closing question.

Retain the slots until Phil explicitly approves a schedule change. Weeks 1–2: one post per channel. Review frequency after two weeks; two per channel in weeks 3–4 and three X/two LinkedIn in weeks 5–6 are options, not commitments. The initial bank deliberately retains one per channel throughout four weeks.

## Small source of truth

- [Article inventory](docs/social/inventory.csv): one row per published article; source metadata, argument, reusable angles, suitability, sensitivity and relative priority.
- [Post bank and publication register](docs/social/posts.md): one record per proposed social post, including exact copy, approval and publication evidence. This is the only canonical social-copy store. Do not maintain a parallel calendar spreadsheet.
- [Pilot record](docs/social/pilot.md): evidence, baseline, weekly results, decisions and implementation progress.

IDs are permanent: `SOC-X-001`, `SOC-LI-001`, etc. Never recycle an ID. Minor edits increment the copy version. A materially different angle gets a new ID. Article routes and dates remain unchanged. `post_date` is the journal date; `first_published` is recorded separately where present. Never present a retrospective entry as a contemporary social report.

## Engagement and presentation

Phil agreed this approach on 14 November 2026. Treat discovery, attention, response and continuing relationships as separate stages. Publishing is one part of participation; no post is required to generate comments. Some pieces establish a recognisable perspective or offer a moment worth reading quietly.

For every candidate, record the intended reader, a conversation hypothesis and a presentation review. Explain who may recognise the experience, what they could contribute and why the chosen form suits the idea. These are editorial hypotheses, not forecasts. Do not invent an unresolved opinion, personal reaction or question to create an invitation.

The presentation review checks whether the first line conveys the real incident or argument, whether paragraphs read naturally on a phone, and whether the post contains one appropriately sized idea. A photograph should contribute evidence, atmosphere or human detail; check reuse/privacy and add alt text. Use a diagram or document only where it clarifies something prose would make harder to understand. Avoid decorative stock images, automatic carousels, dramatic line breaks and compulsory closing questions. Exact mobile truncation varies: inspect the Buffer/native preview rather than promising that a fixed character count stays above the fold.

Participation remains personal and unautomated. Follow conversations that genuinely interest Phil, contribute a relevant experience or distinction when available, and respond to substantive comments when practical. No daily comment quotas, reciprocal engagement arrangements, unsolicited promotion or supposed pre-publication algorithm warm-up. Keep publishing administration within the agreed budget; natural reading and conversation require separate, optional personal time. If that becomes burdensome, simplify rather than silently expanding the workload.

| Observed pattern | What to investigate |
| --- | --- |
| Little relevant exposure | Topic clarity, audience fit, recent activity and relationships; do not infer weak writing from impressions alone |
| Exposure with few public responses | Whether the thought invites experience or disagreement; quiet reading may still have value |
| Substantive replies | What prompted them, who participated and whether a useful exchange followed |
| Repeat interaction or introductions | Relationship development, recorded without exposing private conversations |

Use per-platform evidence and comparable measurement ages. Do not infer causation from a handful of differently themed posts. Presentation choices should improve clarity and relevance before they serve a metric.

## Weekly editorial review: 20–30 minutes of Phil's time

Friday: publish the blog through its existing human-controlled workflow. A new blog article does not automatically generate a social post.

Weekend: the assistant checks the last four social posts per channel, next two queued posts, the new article and relevant archive candidates. Read changed sources again. Review available performance with its collection timestamp. Prepare one proposed post per channel plus a reserve only if useful. Produce a short approval pack with exact copy, source, rationale, slot, sensitivities and explicit changes since the last version.

Phil's review allocation: about 5 minutes on results and priorities, 10–15 minutes editing/approving copy, 5 minutes checking the actual Buffer slots, and up to 5 minutes for a material learning or spontaneous idea. Natural conversation on the platforms is separate and optional; do not turn it into a timed engagement quota.

The assistant performs separate provenance and voice passes. A fresh independent review is desirable where available; record whether it actually happened. A self-review must never be represented as an independent review. Phil remains final author. Assess durable learning only after his substantive edits; most cycles should produce none. Reuse `docs/editorial-learnings/`, do not create a second voice model.

After approval, copy the exact approved version into Buffer, compare the saved text and slot, then record the Buffer ID/status when verified. Phil's manual entry is the initial path. Creating an unpublished draft is different from scheduling. Check existing queued content before using Add to Queue: the next available slot may not be the intended date. Set the exact approved date/time if necessary without changing the channel's recurring schedule.

## Status and approval

Editorial states: candidate → review → approved; hold/rejected are valid. Operational states are separate: not entered → Buffer draft → scheduled → published/error. A proposed date is never evidence of scheduling.

Approval records name Phil, the content ID, copy version and exact timestamp. Any substantive edit to approved copy returns it to review. Changes to a link, image, source interpretation or slot also require renewed approval. Never infer approval from silence, a preview or PR merge. Approving repository documentation does not approve publication copy.

Record a successful publication only after a published URL or confirmed sent status exists. Preserve errors as errors. If a post misses its slot, hold it or deliberately select another date; no automatic catch-up posts. A spontaneous post can replace a planned slot, with the displaced item returned to reserve. No backlog debt. If no suitable material is ready, publish nothing.

## Professional boundaries

Company promotion belongs in a separately approved company workstream. Before personal commercial promotion, Phil must explicitly confirm applicable employment declarations, permissions and safeguards. Personal reputation content is distinct from company marketing. No council endorsement, confidential material, identifiable disputes or private conversations. A published blog source is not blanket permission to re-amplify every passage. Workplace criticism, active complaints, colleagues' performance, family photographs and private financial details need particular judgement. Flag the actual issue in each record rather than adding boilerplate to every public post.

## Automation boundary

Manual preparation and entry first. The verified options and staged recommendation are in the pilot record. Eventual automation may read sources and metrics, prepare a reviewable change and create unpublished Buffer drafts. It must explicitly use draft mode, verify returned status, avoid duplicate creation and stop on ambiguity. Do not implement scheduling, publication, schedule changes, comments, replies or outreach as part of that automation. Keep secrets in appropriate secret storage, never chat or repository files. No merge or deployment automation is authorised here.
