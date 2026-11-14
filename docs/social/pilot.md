# Six-week social publishing pilot

Prepared 14 November 2026. Operational window: 16 November–27 December 2026. Final review: weekend of 26–27 December. Holiday weeks may be skipped deliberately. Status: preparation complete enough for first-copy review; Phil's approval, Buffer entry and account baseline remain outstanding.

## Audit basis and verified scope

Inspected repository through GitHub integration, then checked out the same main revision locally: `e0e71dbfdca508ae7e84c9630c376277e9e0534d`. Read `AGENTS.md`, `WORKFLOW.md`, `EDITORIAL.md`, `VOICE.md`, `AUTOMATION.md`, publication/routing code and all 36 article bodies in `src/mdx/`. About and index are excluded because their category is `non_blog_post`.

Relevant learnings consulted: the learning-store README; not converting a moment into a framework (21 Aug); concrete detail before theory (28 Aug); author language outranking polish (4 Sep). Existing editorial rules and learning files are not modified. No new durable learning is asserted before Phil edits these drafts.

| Category | Articles |
| --- | ---: |
| Life | 15 |
| Ideas | 8 |
| Work | 8 |
| Technology | 5 |
| Total | 36 |

Journal dates run from 13 March to 13 November 2026. Fifteen articles have `retrospective: true` and `first_published` metadata, recorded separately in the inventory. The journal date must not be described as verified original-publication history when that metadata exists. Where no `first_published` exists, the inventory leaves it blank rather than inventing a date.

The public homepage retrieved through web search listed articles through 30 October (34 articles); it was a cached view. Direct retrieval of the live site from the execution environment returned 403, and the search service could not retrieve the two November article URLs. This is a verification limitation, not evidence that those posts are unpublished or that the site is down. The count above describes the current production-branch corpus. Live deployment of the latest two articles remains unconfirmed here. Neither is needed for the proposed first four weeks.

Canonical paths follow the filenames, as established by `gatsby-node.js` and the SEO component. They are recorded as canonical route targets; this audit does not claim a successful live HTTP check for every URL. Check any public link immediately before scheduling.

## What the archive offers

The strongest recurring distinction is between producing an output and becoming capable of using or supporting it. It appears in AI-generated code, strategy ownership, rehabilitation, experimentation, team learning and the publishing system itself. It is coherent, but posting all those versions together would make the archive feel narrower than it is.

Other useful threads are authority and evidence; preservation of future options; the meaning behind recorded data; learning after experience; and the family or social life that visible achievements leave out. The best material is frequently an ordinary detail: the unused HDMI cable, jellyfish and cold water, GitHub before Git, a crowded home plan, the word an editor would never use.

The first bank therefore varies the unit of thought rather than announcing four category pillars. X moves through reading, travel, a publishing interruption and home planning. LinkedIn moves through personal leadership behaviour, engineering maintenance, editorial AI judgement and supported-service responsibility. SOC-LI-005 is a credible cross-category substitution if Phil wants less technology in the run.

Potential repetition clusters:

- Strategy, incentives, data culture and recurring workarounds: do not run these as four successive versions of organisational frustration.
- AI access, judgement and support: separate the learning, maintenance and adoption arguments; do not use the same “tools improve, humans still matter” conclusion repeatedly.
- Sport, graduation, self-build and family foundations: avoid turning each into the same persistence lesson.
- Starting the blog, missed Fridays and personalised editorial machinery: useful examples, but the social feed should not become mostly commentary about publishing.

Gaps are opportunities to notice future material, not commissions to invent it. There is little published evidence quantifying completed professional outcomes or showing an external service user's response. Technical posts lean heavily towards AI; there are fewer concrete data/platform trade-offs or examples unrelated to AI. Life contains much richer subject variety than the technology category count suggests. No category quota is proposed.

## Priorities and holds

The inventory uses editorial priority, not a numerical engagement score:

- P1: strong independent idea, suitable for the initial bank or near reserve with bounded treatment.
- P2: usable after context, repetition and sensitivity checks.
- P3: lower immediate value, narrow timing or extra review cost.
- HOLD: a specific unresolved sensitivity or factual check; not a rejection of the article.

Whole-article amplification held initially: `the_comfort_of_being_busy` (direct workplace criticism); `the_space_between_incentives` (colleague/staffing comparison and rhetorical 100x); `the_bit_of_government_the_public_actually_meets` (active complaint); `what_do_we_mean_by_far_right` (context collapse and previous thread); `what_england_briefly_brings_together` (specific match results/routes need primary verification). A separate bounded extract can be proposed later, with a fresh review; publication on the blog is not blanket approval to amplify it.

The current article says 66.7 miles in `not_conditioned_for_the_distance`, while earlier conversation notes used another distance. No proposed copy repeats the number. This is a source discrepancy to resolve before any future numerical use, not permission to silently correct the article.

## Metricool evidence and its limits

Read the attached **LinkedIn Study 2026**, including methodology (PDF pp. 5, 41), profiles versus pages (pp. 8–10), formats (pp. 25–28), links (p. 31), hashtags (p. 32), questions (p. 34), lifespan (p. 37) and timing (p. 38). Source: project file `Linkedin-Study-2026-EN.pdf`. Do not commit a copy of the third-party report to this repository.

It analyses 673,658 posts from 63,108 Metricool-connected accounts in January–February 2025 and 2026. It reports means, retains outliers, excludes accounts without posts and posts with zero impressions or interactions. These are observational, selected-platform data, not randomised tests or Phil's account baseline.

The most relevant correction to common advice is on page 31: personal-profile posts with links had 27% lower impressions and 20% lower interactions in this sample; the positive link associations for company pages cannot simply be applied to Phil's profile. That is not proof that a link causes a penalty. The bank makes one justified link choice and otherwise offers independent value. No causal test is possible from four differently themed weekly posts.

Questions were associated with 77% more comments (p. 34), but a forced question would conflict with the authorial standard. Hashtag associations likewise do not justify inserting them where they sound unnatural. Carousel interactions on company-page tables include clicks/swipes; this inflates comparisons with text and differs from personal-profile metrics. Do not conclude that Phil must create a carousel or chase the headline engagement rate.

About half of lifetime impressions arrived within 48 hours in the study (pp. 36–37). Capture seven-day outcomes consistently for comparison, with an optional 48-hour snapshot if effortless. The timing section is based on activity patterns, not a personal-account experiment. Existing Thursday/Friday slots remain unchanged.

Initial hypotheses: concrete self-contained posts can support meaningful conversations without needing a click; humour and ordinary detail can provide variety without reducing substance; a useful source link can earn its place despite possible reach trade-offs. Review qualitative evidence first. Six weeks at low cadence will not identify an algorithmic optimum.

## Buffer: verified public capabilities, not account verification

Official documentation checked 14 November 2026:

| Capability | Verified public position | Pilot decision |
| --- | --- | --- |
| Free plan | Up to 3 connected channels, 10 scheduled posts per channel, 1 user, unlimited drafts, 100 ideas, 30-day Insights history | The four-week bank needs only 4 queue positions per channel, assuming existing posts leave room. Stay free. |
| Formal approvals | Team-plan feature | Use Phil's explicit copy approval in the register; no paid upgrade needed. |
| API | GraphQL endpoint `https://api.buffer.com`; personal API key in Bearer header; post/channel/account reads and post creation supported | No API call or credential created in this session. |
| Draft creation | `createPost` with `saveToDraft: true` saves an unpublished draft; documented status is draft until explicitly scheduled | Feasible later automation target. Never omit the flag. |
| Queue and status | Read draft/scheduled/sent/error posts, with cursor pagination | Check both existing drafts and queue before creating anything. |
| Performance | `Post.metrics` and `metricsUpdatedAt`; API metrics require a personal API key rather than an OAuth App Client | Read-only future automation is feasible; distinguish missing from zero and retain freshness. |
| OAuth / MCP | Buffer documents a remote MCP service, OAuth connections, queue/draft tools and metrics tools | Prefer a supported connection if it becomes available; none was returned by plugin discovery here. |
| API limits | Current pricing lists one free key; 150 requests/15 minutes, 600/day, 1,000/channel per 30 days up to 3,000 | Far above pilot need; actual account limits must be checked. Help-page summaries differ, so use returned account quotas when connected. |

Sources:

- [Pricing and free plan](https://buffer.com/pricing)
- [Quick start and API key authentication](https://developers.buffer.com/guides/getting-started.html)
- [Draft creation](https://developers.buffer.com/examples/create-draft-post.html)
- [Post retrieval and scheduling](https://developers.buffer.com/guides/posts-and-scheduling.html)
- [Metrics and authentication limits](https://developers.buffer.com/guides/post-metrics.html)
- [MCP tools](https://developers.buffer.com/guides/integrations/mcp.html)
- [Native scheduling and media](https://support.buffer.com/en-us/articles/scheduling-posts-4Qdld7giAZ)

Buffer was not connected through a discoverable plugin. A browser access check reached Buffer's login page, so no authenticated queue, draft, schedule or analytics state was available. No login, account setting or channel change was made. The two connected channels and their slots are user-supplied facts, not independently verified account observations.

## Automation choice

| Option | Fit and limitation | Recommendation |
| --- | --- | --- |
| Native Buffer, manual copy/approval | Available immediately to Phil, free, very little engineering. Approval remains an editorial action. | Launch this way. |
| Buffer MCP connection | Lowest custom-code route if supported in this environment; draft flag and returned status must still be enforced. No usable connected tool exists here yet. | Revisit after launch rather than blocking it. |
| GitHub Actions | Deterministic source snapshot, checks and draft PR preparation; plain workflow alone does not make editorial decisions. Secret-bearing workflows need trusted code and restricted triggers. | Later: manual dispatch first. Store a personal Buffer key in Actions secrets; never expose it to untrusted PR code. |
| Lightweight script | Can create draft-only posts and read status/metrics using the documented API. Adds token, error and duplicate handling work. | Only if manual entry is a material recurring cost. Dry run and explicit dispatch before a schedule. |
| ChatGPT scheduled review | Useful for prompting/preparing the weekend pack when sources/connections remain accessible. It does not by itself provide a Buffer connection or guarantee successful repository writes. | Suggested weekend preparation, not publication. No recurring task created yet. |

Eventual script contract: use stable content ID plus version and a text hash; look up the recorded Buffer ID before creating; retain returned ID/status; stop for text mismatches or ambiguous network failures. Do not blindly retry a create after a timeout. Use `saveToDraft: true`, request the resulting ID and status and stop if the status is not draft. Test with one approved-for-draft record in each channel. No schedule mutation, auto-merge or engagement tools in the script. Tokens are broad enough to publish even if the script only drafts; code-level restrictions are necessary and are not a substitute for scoped credentials where offered. The implementation of this script is deferred, not claimed complete.

## Baseline and measurement

Baseline window: 19 October–15 November 2026, or the closest available 28-day native window ending before launch. Record actual dates/source when captured. Also capture current followers before the first slot. No missing value is zero.

| Measure | LinkedIn baseline | X baseline | Source / action |
| --- | --- | --- | --- |
| Followers at start | Unavailable | Unavailable | Native profiles; capture before 19 Nov |
| Recent post count and typical impressions | Unavailable | Unavailable | Last 28 days; median per post with sample count where available |
| Meaningful comments/replies | Unavailable | Unavailable | Manual inspection, exclude own replies; judge substance rather than count alone |
| Profile activity | Unavailable | Unavailable | Native analytics if exposed; retain platform metric name/window |
| Blog referrals | Unavailable | Unavailable | Existing GA4 configuration found in repository; authenticated report not accessed |
| Professional conversations / introductions | Not recorded | Not recorded | Phil supplies a short non-sensitive note when there is a real outcome |
| Commercial enquiries | Not recorded | Not recorded | Count only actual enquiries; no TIFT promotion or attribution assumed |
| Weekly operation time | Not measured | Not measured | Record total review/entry minutes, separate setup from recurring cost |
| Copy revision effort | Awaiting Phil pass | Awaiting Phil pass | Count substantive revisions per post; why only if material |

GA4 is already configured in `gatsby-config.mjs`. Do not install another analytics product. Use native source/medium reporting for initial referral signals; untagged app traffic can be incomplete or appear direct, so do not overattribute. If a later link is deliberately tagged, use `utm_source=linkedin` or `x`, `utm_medium=social`, `utm_campaign=personal_social_pilot_2026`, `utm_content=<stable-ID>`; approve the final URL and verify the underlying destination. No tracking changes were made.

For each published ID, record sent URL/time, snapshot time, seven-day impressions/reach if available, reactions, meaningful replies/comments, profile activity if attributable, blog visits if attributable and a short outcome note. Keep platform metric definitions and sources. Do not combine engagement rates across platforms or use absent metrics as zero. Buffer metrics refresh daily and may lag native views. Its free history is shorter than the pilot, so record each week's small snapshot before it expires.

### Weekly pilot log

| Review weekend | Publication week | What to record | Decision |
| --- | --- | --- | --- |
| 14–15 Nov | Baseline / launch preparation | Approvals, prior-post and queue check, baseline, first two entries | Launch after approval |
| 21–22 Nov | Week 1 | Verify first two publications; early results provisional; time/revisions | Keep one per channel |
| 28–29 Nov | Week 2 | Mature week-1 snapshots; conversations; workload | Explicit retain/increase/hold decision, no automatic change |
| 5–6 Dec | Week 3 | Week-2 seven-day results; topic repetition; review latest bank | Keep or replace week 4 |
| 12–13 Dec | Week 4 | Results; reserve selection; holiday availability | Approve week 5 or skip |
| 19–20 Dec | Week 5 | Capacity and holiday judgement | Approve week 6 or skip |
| 26–27 Dec | Week 6 | Six-week assessment; week-6 metrics still immature | Continue, simplify, pause or adjust; complete mature snapshot later |

If week 6 publishes on 24/25 December, its seven-day snapshot falls on 31 December/1 January and should be appended after the operational review. Do not compare its 1–2 day results with older seven-day results.

Success means a sustainable approved rhythm, low correction/admin burden and worthwhile relationships or conversations. A single useful introduction may outweigh a reach increase. Increased frequency needs Phil's explicit decision and evidence that the current rhythm is comfortable; low impressions alone are not a mandate to produce more.

## Decisions, reviews and implementation

Approved inputs from Phil's brief: personal reputation first; category routing preferences; British English and existing editorial authority; existing slots retained; human final approval; commercial publication gated; manual operation before automation. Proposals in this PR: four-file structure, exact post selections/copy, one-per-channel four-week bank, weekend review and measurement approach. These remain reviewable, not silently approved decisions.

Review findings: no proposed post adds an unsupported personal event or numerical result. All X drafts are below 280 characters, including line breaks, and contain no URL or emoji requiring weighting exceptions. The new linked LinkedIn draft omits dated news claims. All posts have separate editorial/operational status. The audit intentionally holds risky article amplification rather than automatically selecting the newest article. Voice and provenance checks were performed as separate self-review passes; no independent reviewer or Phil pass is claimed. Clarity review was previously discussed but no full current protocol was retrieved; no external Clarity pass or submission is claimed.

Immediate assistant work: archive inventory; eight full draft posts and four reserves; proposed rules and six-week register; editorial checks; build and branch/draft PR. User-dependent: approve/edit first two exact posts, inspect existing queue and recent output, capture missing baseline or connect a supported account route, then enter approved copies at the two specified slots. Do not request API credentials in chat. If Phil enters them manually, record confirmation and IDs only after he reports success.

Repository change risk: low for documentation and inventory; medium editorial judgement for future public copy; higher for account automation or commercial content. Only the four documentation/data files are included. No MDX, code, lockfile, CI configuration, channel schedule or voice-model changes are part of this patch.

Validation: `npm run editorial:check` passed across 38 MDX files. The inventory has 36 unique source routes and IDs; all 12 post IDs and pending approval states were checked; all six X drafts are below 280 weighted characters (208, 134, 189, 189, 210, 159). Planned day/date pairs were checked. `npm run build` passed using the repository-pinned Node 22.23.4 after rebuilding the existing Sharp installation and clearing generated Gatsby cache. An initial attempt under the environment default Node 24 failed in the existing msgpackr/LMDB stack; no dependency or lockfile change was made. The successful build generated all 41 site pages. Existing environment/proxy, CPU detection and Browserslist-age warnings remain. Preview and remote CI remain distinct from local validation; neither implies editorial approval.


## Engagement implementation update — 14 November 2026

Phil agreed to proceed with the engagement approach: retain the two launch candidates and cadence; add intended-reader and conversation hypotheses; review the opening and mobile presentation; diagnose discovery, attention, response and relationship outcomes separately. This approves implementation of the approach, not scheduling of exact copy. All twelve records now include those editorial notes. SOC-LI-001 is version 2, with only its opening sentence changed to start directly with the hackathon incident. SOC-X-001 remains version 1. No artificial question or visual was added.

Record qualitative engagement beside each seven-day snapshot: relevant readers where observable, substantive contribution, return interaction and any outcome. Preserve unknown audience composition as unknown. Quiet recognition is a possible editorial outcome, not a metric we can claim without evidence. No previous low-engagement diagnosis has been asserted without account data.

Official sources checked for the engagement discussion: [LinkedIn relevance](https://www.linkedin.com/help/linkedin/answer/a1339724), [LinkedIn feed update](https://news.linkedin.com/2026/ImprovingTheFeed) and [X community management](https://business.x.com/en/basics/community-management). LinkedIn describes identity, content and activity signals and action against automated engagement. X identifies replies as an opportunity for conversation. Neither establishes a guaranteed formatting or participation formula. The X page also contains legacy feature references; this workflow does not rely on them.

Prior PR revision 0652781 passed both GitHub build and Cloudflare Pages checks. Its preview was generated at https://72a8f88f.hickinsons-blog.pages.dev; visual inspection was not claimed. Validation of this documentation update is recorded in the PR. No schedule, account automation, reply or publication action is enabled.
