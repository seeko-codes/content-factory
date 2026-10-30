# Instagram SAT campaign strategy

Draft operating strategy for [@ultralearns](https://www.instagram.com/ultralearns/), October 29, 2026. The app will serve a much broader purpose; this campaign concentrates on SAT prep. The goal is high-volume video production that learns from results and attracts future app users. **Start by closely modeling successful reference videos documented in the seven channel folders. Establish those adaptations as the baseline, then vary them.** No app, waitlist, comment-keyword or sales CTAs for now. Cadence and allocations remain hypotheses.

Owner access verified October 29: 13 posts, 6 followers and display name `seekolearns`. The account is now a public Creator account in Education, with its category hidden. Campaign performance is not yet established.

## Audience and promise

Reach students actively preparing for the SAT who recognize the material but struggle to apply it reliably. SAT math is the initial production focus because the current factory and slate support it. Initial positioning: **SAT math that finally makes sense, one visible explanation at a time.**

Every reel should give this student a small, complete win: recognize a trap, understand a relationship, or choose a better method. The campaign should make the future learning experience credible through repeated useful experiences. Avoid unsubstantiated score gains, invented error rates and test-date urgency.

The student is the viewer and likely user. A parent may be the payer; student reach does not establish parent willingness to pay. Geography, language, current score range and target score remain open targeting refinements. Start in English, consistent with existing scripts, without pretending that existing production choices resolve those questions.

## What to optimize

Eventually optimize **activated app learners attributable to the campaign**, then retained learners and paying customers. Define activation around completing a useful learning session when the product exists. Neither views nor installs alone establishes that result.

Before launch, optimize total reach and follower growth from clearly SAT-relevant content, while examining audience-fit evidence separately. Qualified viewers cannot be counted directly from ordinary view totals. Do not invent a qualification multiplier or label all followers as prospective customers.

Use a small scorecard rather than an arbitrary weighted score:

| Question | Observable evidence | Interpretation |
|---|---|---|
| Did it spread? | Views, accounts reached, non-follower distribution where available; shares per 1,000 accounts reached | Distribution and sharing, with explicit denominators |
| Did it hold attention? | Average watch time, video length, retention curve where available | Inspect the actual losing beat; average watch time divided by length is not completion rate |
| Did it grow the audience? | Reel-attributed follows where available; follows per 1,000 accounts reached; account-level weekly net follows | Compare absolute growth and efficiency; account totals cannot be assigned precisely to one post |
| Did it attract the intended need? | Voluntary comments about SAT preparation, specific skill questions and requests for related explanations; aggregate audience geography where available | Directional audience evidence, not a representative survey or proof of buying intent |
| Was it useful? | Saves per 1,000 accounts reached, substantive questions, observed attempts on a fresh example when naturally offered | Saves are an interest signal, not proof of learning |

Meta documents watch-time metrics and follower information associated with reels. Confirm the fields actually available in this account before designing collection around them. Keep unavailable values missing, never zero. [Meta Reels insights announcement](https://about.fb.com/news/2023/04/instagram-reels-trending-audio-and-gifts-updates/).

Judge scale with weekly absolute totals and judge creative efficiency with rates and per-post distributions. A big, clearly relevant hit can be useful with a lower follow rate. A generic puzzle with many views and no evidence of SAT interest does not become a campaign template automatically.

## Model successful references first

The unit of production is a **source-derived format with its own baseline**, not a newly invented angle. The [logic](../LOGIC.md) explains the principles; the [seven channels](channels/README.md) are the concepts, with their exact clip dossiers as details. Preserve the creator's particular opening construction, beat order, relationship between words and objects, diagram behavior, pacing, density and payoff. A generic summary such as "use curiosity" is too weak to serve as the production recipe.

Choose two or three source formats with both an inspected construction and observed strong distribution, and a close SAT fit. Keep each source's recipe separate. The current gallery supplies candidates:

| Candidate source | What to model | SAT adaptation boundary |
|---|---|---|
| Ubilum's inspected Calculus III reel | One familiar object expands into related constructions, followed by a recap of those same objects | Preserve the actual construction-led opening and connected sequence; a map-first opening would be a later variation, not a faithful baseline |
| CodeMatrix's shape-to-trace reel | Persistent moving point, synchronized representations and a tracked correspondence | Use a valid SAT relationship that supports the same visible correspondence; do not import unsupported Fourier claims |
| Mathematical Visual Proofs' Venn reel | Specific sequence of set regions and an inspectable correction | Confirm the exact SAT scope and source sequence before selecting; do not replace it with an unrelated visual "trap" |

These are source-selection candidates, not production-ready briefs. Read full dossiers before locking recipes. Public success belongs to the source upload; transfer to our account remains unmeasured. Channel folders retain modest-view contrasts and untested adaptations; metadata-only rows remain leads. For example, a map-first opening is our untested adaptation, not the observed opening of Ubilum's successful Calculus III reel.

For each selected source, make a compact baseline recipe: exact source link and dated result; source channel and exact clip dossier; opening frame and line structure; shot/beat sequence; meaningful visual operations; caption and narration behavior; payoff; what must remain fixed; and which subject substitutions are necessary for SAT. Preserve source assets as references and produce our own assets, wording and branding.

Make the smallest subject changes needed to deliver an accurate SAT-relevant explanation. Maintain the recognizable format across multiple useful SAT examples. Original angles and new hooks belong to the later variation phase. Distinct subject examples should still offer value, but novelty is not the first optimization objective. The [20-video slate](today-2026-10-29-v2.md) is a bank of possible SAT material, not the starting format authority: many entries are authored adaptations rather than close models of observed winners.

During the baseline phase, keep each recipe's execution stable. Do not blend all creators into one averaged style or force every format into the printed-page layout if that removes the source's central behavior. Use house assets and branding while preserving the selected source's meaningful visual grammar; record necessary departures explicitly.

Profile proposal: display name **Ultralearn | SAT Math** and bio **Visual SAT math explanations. Understand the step. Recognize when to use it.** Keep the account handle compatible with the broader future app. Pin three useful examples when available: a representative explanation, a common mistake repaired, and a method-choice example. Profile copy remains proposed; no posts were published during setup.

## Production and publishing

Design for **50 finished posts per day, with 100 per day as the operating target on the first account**. That is 350-700 posts per week. Volume is the competitive advantage: many source-modeled executions, many observed outcomes, and rapid testing across several formats. Do not impose an unsupported 5-10/day ceiling or wait several weeks to start learning. Actual production throughput has not yet been benchmarked.

Meta's general publishing documentation states a limit of **100 API-published posts per account within a rolling 24 hours**. Query `GET /<IG_ID>/content_publishing_limit` before scheduling or publishing; use the returned quota rather than a hard-coded assumption. Spread publishing across the day and carry overflow forward. More accounts are an acceptable future option, but the current scope is one account. Give future accounts a clear audience or series and track their results separately. [Meta publishing documentation](https://developers.facebook.com/documentation/instagram-platform/content-publishing).

Production sequence: successful source clip -> exact modeled recipe -> closest useful SAT example -> checked mathematics and payoff -> source-aligned script and storyboard -> narration and render -> full playback with sound and phone-size review -> publish -> collect results. Check both source fidelity and [QUALITY.md](../QUALITY.md) for every item. Increase throughput by making each modeled recipe reproducible, then improving its reusable components and review efficiency.

Set `"cta": false` in new campaign scripts. The current shared script loader otherwise appends a spoken comment-keyword CTA. After changing an existing synthetic script, regenerate its voice and timings; imported human narration needs an intentional recording/edit decision. This strategy does not silently change existing recordings. See [the script loader](../tools/video_script.py) and [recording guidance](../README.md#record-your-own-narration).

Consider Trial Reels for selected experiments if the feature is available. Meta describes them as distribution to non-followers first, with engagement information after roughly 24 hours and an option for automatic wider sharing. Keep trial and ordinary posts in separate comparisons; record if and when a trial is shared more widely. Trial Reels are not randomized A/B tests. [Meta Trial Reels explanation](https://about.fb.com/news/2024/12/trial-reels-try-content-non-followers-first-see-what-perfoms-best/).

Production requires [owner-approved intent and scope](../README.md#human-decision-checkpoints), including slate and volume.

## The learning loop uses the actual backpass tool

[Kun Chen's article](https://blog.kunchenguid.com/p/your-agentsmd-is-a-neural-net) links his actual tool, [backpass](https://github.com/kunchenguid/backpass). Use that CLI: it reads real sessions and proposes evidence-backed memory edits under a token budget. Only `backpass apply` writes. Use its native workflow, without a replacement optimizer or invented viral score.

This repo's `.backpassrc.json` targets this campaign guide. Production and performance-review agents must read it. A review session must actually load observed post metrics, compare concrete post IDs, examine the corresponding creatives and discuss the evidence. That puts real audience outcomes into the transcripts backpass reads. Backpass does not fetch Instagram metrics or natively optimize a numerical view-count objective. Its native evidence checks govern proposed instruction changes; organic distribution remains noisy and observational.

```bash
backpass scan --since 7d --strict
backpass --since 7d --strict
```

These commands only propose. Follow [the human decision checkpoints](../README.md#human-decision-checkpoints): present conclusions, evidence/uncertainty and exact edits for the owner's yes, no or revisions. After approval, use `backpass apply --no-ui` or `--decisions` for the approved proposal IDs only. Leave pending edits unapplied; verify the written diff. Terminal review preserves the browser preference; native evidence stays in ignored `.backpass/`.

Use [the compliance workflow](../README.md#verify-standards-before-publishing) to verify exports, gate publishing and generate `learning` evidence. Only `eligible` results test creative rules; retain excluded results for execution diagnosis. Match standards/recipe versions, mode and observation age. The learning loop owns fixes; guidance changes require owner approval.

For every published reel, link its local ID and export hash, compliance verdict/review evidence, Instagram ID/link, publication time, campaign, source channel/clip, recipe and script/creative versions, adaptation departures, SAT topic, duration, baseline/variant and parent, changed variable/hypothesis, and normal/trial mode. Attach timestamped metric snapshots at **24 hours, 72 hours and 7 days**; occasionally recheck older posts for late breakouts. Retain noncompliant and unverified results for execution diagnosis, but exclude them from comparisons testing creative rules. A local log plus Insights observations is sufficient initially.

Review mature cohorts every day, and more often when a meaningful new cohort becomes available. Keep recipe versions fixed within each cohort so a change can be traced to its actual guidance:

1. First establish repeated baseline results for each modeled format. Compare like-aged posts within the same recipe, similar distribution modes and duration ranges. Look at medians, total results and breakout frequency so a single hit cannot hide a failing format.
2. Inspect both winners and losers. Use retention to locate a moment worth investigating, then watch that moment. Comments and watch time suggest explanations; they do not identify a cause by themselves.
3. Write a narrow candidate lesson: what changed, the relevant post IDs, alternative explanations and a prediction for fresh videos. Preserve the losing cases.
4. Once a recipe has baseline results, change one element while retaining baseline posts in the same batch. For example, keep the source-derived construction, narration and payoff while varying the first-line framing across three matched topic pairs. Repeat a promising variation on a new set. Rotate posting slots rather than giving one approach all the favorable slots. Organic comparisons remain observational.
5. Run actual backpass over those sessions, inspect proposals and evidence, then follow the owner review checkpoint above. Test approved changes within approved intent. Keep uncertain lessons labeled as hypotheses; impose no invented weekly edit cap.
6. Preserve the prior guidance version and revisit the lesson if fresh examples stop supporting it. Keep quality and truthful promises fixed; optimize the creative choices within that bar.

Use the first 50-100 posts to establish source-modeled baselines. Once first outcomes mature, a starting allocation is **40% baseline execution, 40% controlled variations and 20% additional researched source formats**: 20/20/10 at 50 posts, or 40/40/20 at 100. These are adjustable allocations, not proven optimal proportions. Run several bounded comparisons concurrently; vary one factor within each comparison, not just one factor across the entire channel. Balance topic difficulty and rotate posting slots. A hundred posts yield a hundred outcomes, not a hundred independent causal experiments. A successful variation becomes the next baseline while the old recipe stays recoverable.

Keep AGENTS.md short and useful across sessions. Store detailed post evidence and narrow creative lessons alongside the research, rather than appending a new global rule after each upload.

## Publishing access, data and narration

The dedicated Chrome for Testing profile is signed into @ultralearns. Owner controls and the new-post composer were verified on October 29; the composer accepts MP4 and QuickTime video. Browser posting is available from this workspace. No video was published during setup. The profile has 13 existing posts and 6 followers. Existing posts are historical observations, not results from the new reference-modeled campaign.

**Zernio (formerly Late)** now connects @ultralearns through Instagram Login, avoiding the stalled Meta developer SMS signup. Health confirms posting and analytics access. A draft create/read/delete passed; live publishing is untested. The official CLI is configured with a profile-scoped key for Publishing, Analytics and Accounts, stored outside Git. See [working commands](../README.md#instagram-publishing-and-analytics). Zernio supports separate team logins; generate an invite when requested, without messaging the friend unless authorized. [Instagram connection](https://docs.zernio.com/platforms/instagram), [team access](https://docs.zernio.com/security).

Zernio currently lists two connected accounts free, publishing and analytics included; confirm live pricing and account quota before expansion. Its unlimited posting allowance remains subject to Instagram's rolling quota. [Pricing](https://zernio.com/pricing).

Retain both provider and Instagram media IDs, raw responses and timestamped snapshots linked to the source recipe and creative version. The first fetch returned all 13 posts with views, reach, likes, comments, shares, saves, watch-time fields and skip rate. Follows were null; retention curves empty. Treat provider zero defaults cautiously. Follower history starts from collected daily snapshots. Poll cumulative counters at the campaign's observation ages; preserve unavailable fields as missing. Historical metrics unavailable before Creator conversion cannot be reconstructed. Full retention curves and future app conversion remain unverified. [Analytics coverage](https://docs.zernio.com/platforms/instagram/analytics).

The local recording page runs with `npm run record` at `http://127.0.0.1:8765`. The owner chose the Mac microphone. Pick a script, record, listen and save; saving retains the raw take locally and queues the existing importer. Record the next script while timing rebuilds. Transcript mismatches preserve the raw take and require review. Human narration is never sped up or silently replaced with generated voice. Fifty to one hundred distinct 30-60 second narrations require roughly 25-100 minutes of speaking alone, before retakes. Production planning must include that actual input, or use an explicitly chosen alternate narration format. See [recording commands](../README.md#record-your-own-narration).

## First month at volume

| Period | Work and decision |
|---|---|
| First production batch | Lock exact source-derived recipes and execute 50-100 useful SAT adaptations. Establish publishing access and the post-to-recipe log. No invented-format phase precedes this baseline. |
| As 24-hour results arrive | Start daily cohort reviews. Retain baseline executions and test variations alongside them. Use the 40/40/20 starting allocation when enough baseline observations exist. |
| As 72-hour and 7-day results arrive | Reassess early decisions, compare mature cohorts and run actual backpass on evidence-bearing review sessions. Publish 50-100/day as production capacity and live quota allow. |
| Rest of month | Repeat the produce-publish-observe-backpass cycle. Reallocate production toward formats with repeated relevant reach and audience growth. Track total results, per-post efficiency, narration time, rendering throughput and actual posting failures. |

At day 30, assess production throughput, replicated creative lessons and audience fit. Virality and conversion remain unproven. SAT needs expire: record voluntary test-window signals and keep refreshing the audience.

When the app is ready, add campaign attribution and test the transition from a reel's promised win into a corresponding first learning session. Use activated and retained learners to check whether the earlier audience proxies were useful. Until then, finish the explanation and earn the next viewing occasion.
