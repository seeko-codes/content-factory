# content-factory

A home for agents to create exceptional videos at volume. The current series is short, vertical SAT math explanations: a printed page that moves, with meaningful diagrams, kinetic captions and calm narration. The output standards are broader than this first subject.

**Start with [AGENTS.md](AGENTS.md).** It instructs agents to load [LOGIC.md](LOGIC.md) first, before agreeing on the video intent with the owner and selecting a channel. The principles live only in LOGIC.md. The hierarchy is:

- **Logic:** root-level [LOGIC.md](LOGIC.md), grounded in the DMScales/dmstrategyy studies. Read the principles first, agree on the viewer's intended experience and payoff with the owner, then follow the relevant channel route.
- **Concepts:** [the seven researched channels](research/channels/README.md): 3Blue1Brown, CodeMatrix, GraduateML, Mathematical Visual Proofs, Mathematisa, MindYourDecisions and Ubilum. Each is a concrete manifestation of the logic, kept in its own high-detail folder.
- **Details:** each channel's clip dossiers, timestamped audits, reconstruction math, layouts, transitions and evidence limits. Enter through that channel's README and retain the specific source's behavior.

[QUALITY.md](QUALITY.md) defines the finished-output bar and rejection criteria. [STYLE.md](STYLE.md) gives the current series its identity. [research/README.md](research/README.md) routes to the revised 20-video slate and supporting evidence. The wider catalogue is retained as discovery.

For the main visual reference, open the [Ubilum folder](research/channels/ubilumapp/README.md): its full capture audits retain timestamped constructions, performance provenance, asset decisions and SAT adaptations. Choose other creator styles from the [channel gallery](research/channels/README.md); their details remain independent. Older browser reports are generated snapshots; the modular Markdown is the current authority.

The standards judge the viewer's experience. Use the implementation guidance below as needed; the goal is finished videos that clear the bar, not additional production bureaucracy. Scripts, previews and final exports must be labeled accurately.

## Stack

| Layer | Tool | Why |
|---|---|---|
| Video | [Remotion](https://www.remotion.dev) 4 (React, rendered frame by frame to H.264) | Deterministic frame rendering of our diagrams, captions and audio; the reference's original rendering stack is not verified. |
| Math | KaTeX | Typeset mathematical notation consistent with the house style |
| Fonts | Inter Tight, IBM Plex Mono via `@remotion/google-fonts` | House caption and readout choices informed by the reference |
| Diagrams | SVG components in `src/components` | Crisp hairlines at any size. 3D surfaces use an orthographic SVG projection rather than WebGL, which keeps the print look. |
| Voice | [Kokoro-82M](https://huggingface.co/hexgrad/Kokoro-82M), local, voice `am_michael` | A calm male narrator, with word timestamps built in, so captions sync with no alignment step |
| Checking | whisper.cpp large-v3 (`whisper-cli`) | Transcribes the references and cross-checks sync |

I also considered Manim and Motion Canvas. Manim has the right math but makes this caption typography and layout hard. Motion Canvas's maintenance status is uncertain. Remotion's license is free for individuals and companies of up to three people.

## Setup on a new machine

Source, standards, research and aligned example narration are versioned. Dependencies, renders, raw recordings, private analytics, downloaded references and Backpass session state stay local under the exclusions in [.gitignore](.gitignore). Publishing requires your own Zernio connection; the account setup below describes the maintainer's environment.

You need [Node.js](https://nodejs.org) 20 or newer and [uv](https://docs.astral.sh/uv/getting-started/installation/). Nothing else is needed: uv fetches Python 3.12 and the voice model, and Remotion downloads its own headless Chrome and ffmpeg on the first render. It works on macOS, Windows and Linux.

```bash
npm install
npm run studio -- --no-open
```

`npm run studio -- --no-open` starts the editor without opening the default browser. Open its printed local URL in the dedicated visible Chrome agent profile, keeping the user's current app and tab focused. The worked example (`integral`) is already voiced. To check that everything works, render it:

```bash
npm run render -- integral out/integral.mp4
```

The first `npm run voice` downloads the Kokoro model and PyTorch, about 1 GB, once.

## Human decision checkpoints

The owner makes two decisions. Agents prepare concrete recommendations and carry out the approved work.

1. **Video intent, before production.** After reading LOGIC.md, propose the audience, problem, intended understanding, promise/payoff and recommended channel reference. For a batch, include its scope, count, baseline formats and planned variations. Briefly explain why the recommendation fits the logic. Present this for the owner's yes, no or suggestions before dispatching producers or generating videos. Exploratory research can inform the proposal. Record approved intent and scope in the brief or batch plan; reuse that approval within its scope. Return material changes in audience, promise, format or experiment scope for review.
2. **Learning conclusions, before guidance changes.** Fetch metrics, inspect compliant exports, analyze outcomes and run actual backpass to prepare proposals. Present a concise review: the conclusion; supporting post IDs, comparable results and uncertainty; exact before/after wording and target file for each proposed change; and the next test. The owner accepts, rejects or suggests revisions per proposal. Apply only the approved wording and scope. A material revision needs a fresh decision; a direct instruction from the owner already authorizes that specific edit. Retain the decision with the existing review session or report and preserve the prior guidance version.

Silence leaves either decision pending. An agent's recommendation or backpass's proposal is not owner approval. Agents can continue independent research and analysis while waiting. Existing production holds remain in effect until the owner explicitly resumes production.

Route approved changes to their actual home: AGENTS.md for general agent routing, LOGIC.md for underlying principles, QUALITY.md or STYLE.md for output standards, and the campaign guide for campaign lessons. Keep detailed evidence with the research or review. Backpass currently targets `research/instagram-strategy.md`; changing another file requires an explicitly approved edit to that file. See [the actual backpass workflow](research/instagram-strategy.md#the-learning-loop-uses-the-actual-backpass-tool) for proposal and apply commands.

## Agent roles and model allocation

Use separate production and evaluation assignments. The owner chose this allocation to combine parallel creative execution with careful review; it is an operating policy, not a benchmark claim about model quality.

| Role | Preferred models | Assignment and handoff |
|---|---|---|
| Production workers | Sol or Opus | Produce videos in parallel within owner-approved intent and batch scope, from complete briefs and locked source recipes. Each worker owns a separate video folder, checks the mathematics, builds the script and animation, renders, and returns the exact export plus provenance and unresolved checks. |
| Output and learning reviewer | Fable or Astra | Independently inspect finished exports against current standards. Later, examine eligible audience outcomes alongside those exports to explain what may have made videos good or bad, compare alternatives, and propose testable changes. |
| Integration owner | One coordinating agent | Own shared components, theme changes and `src/videos/index.ts`; integrate workers' outputs, route review findings back to producers, preserve the export-to-review-to-post links, and bring intent and proposed guidance changes to the owner for decisions. |

The reviewer has two distinct passes. **Before release**, judge source fidelity, mathematical correctness, viewer comprehension and audiovisual execution against the applicable standards, with timestamped evidence. Producers revise failures; the reviewer inspects a fresh export. **After observation**, compare compliant videos at similar ages and within recorded recipe/rule versions, using attention, distribution and SAT audience-fit evidence. Noncompliant results diagnose execution and stay outside creative-rule comparisons. A model name never substitutes for actual inspection; unavailable sound or visual checks remain unverified.

The Fable/Astra learning agent loads that evidence into a real review session, then uses the actual `backpass` workflow to prepare proposed campaign-guidance changes for the owner. Follow [the human decision checkpoints](#human-decision-checkpoints) before applying edits; the reviewer recommends and the owner decides. Keep explanations and causal claims proportional to the evidence. The reviewer assignment does not itself configure backpass's internal models. [Campaign observation and learning workflow](research/instagram-strategy.md#the-learning-loop-uses-the-actual-backpass-tool).

At dispatch, resolve these model families to IDs actually exposed by the current harness, record each worker's actual model and reasoning effort, and use supported controls with the approved effort policy. This session exposes Sol (`gpt-6.1-sol`) and Astra (`gpt-6-astra`); Opus and Fable are preferences for environments that expose them. If a preferred family is unavailable, use the other available family for that role or surface the gap. Batch size follows available concurrency and review/render capacity; preserve the quality bar for every video.

**Current production status: held at the owner's request.** Updating this allocation does not launch a batch. Wait for an explicit instruction to resume production.

## Make a video

First complete [the video-intent checkpoint](#human-decision-checkpoints), or use an existing approval that covers this video.

1. **Write the script** at `src/videos/<id>/script.json`. One line is one caption screen. Use the markup:
   - `*word*`: an emphasized word that stays dark after it is read
   - `$tex$`: math inline in the caption. Add `"say"` with how the line is read aloud.
   - `{cue}`: a named moment, equal to when the next word is spoken. Diagrams animate on cues.
   - `"pause"`: silence after a line, 0.45s by default
   - `"caption": false`: speak a line without a caption, e.g. under a title card
2. **Voice it:** `npm run voice -- <id>`. This writes `public/voice/<id>/narration.wav` and `timing.json`, and prints the wpm, which should be about 120.
3. **Draw it** in `src/videos/<id>/<Name>.tsx`. Read times with `useNarration().cue("name")` and animate with `ramp`/`visible` from `src/anim.ts`. Captions, audio and the end card are automatic.
4. **Register it.** Add a standalone `src/videos/<id>/entry.tsx` (copy the integral one) so the video can be previewed on its own with `npx remotion still src/videos/<id>/entry.tsx <id> out/x.png --frame=N`. Add one line to `src/videos/index.ts` so it appears in the studio. Set `"cta": false` for the current SAT campaign. The legacy default appends the channel CTA and end card.
5. **Preview** with `npm run studio -- --no-open` and scrub the timeline, or check many frames at once with `npm run stills -- <id> every 2`. **Render** with `npm run render -- <id> out/<id>.mp4`.

When you rewrite a line, run `voice` again. Cue times move with the new audio, so the animation follows without edits.

## Verify standards before publishing

Use `npm run review` for compliance, publishing and performance evidence. It verifies review completeness and provenance. The reviewer supplies the actual visual, audio and mathematical judgment; filling a JSON field does not establish that a rule was followed. The verifier reports failures and leaves fixes to production and the existing learning loop.

1. Put feedback in its authoritative standard: shared output rules in QUALITY.md, series identity in STYLE.md, or a narrower requirement in the video's brief or source recipe. A new heading, bold rule or named bullet becomes a separate review check. All source text is retained. Include any additional applicable standards with `--standard PATH`.
2. Freeze the actual render, current standards, brief, source recipe and script:

   ```bash
   npm run review -- prepare VIDEO_ID out/VIDEO_ID/final.mp4 --brief src/videos/VIDEO_ID/BRIEF.md --reference src/videos/VIDEO_ID/RECIPE.md --standard research/channels/SELECTED_CHANNEL/SELECTED_DOSSIER.md
   ```

   Use real existing brief, recipe and channel-dossier paths. The video's recipe records the selected channel/clip and its faithful SAT adaptation; include all applicable source dossiers with `--standard PATH`. QUALITY.md, STYLE.md and the campaign strategy are always included, so backpass guidance changes also require fresh checks. The command prints a packet directory under `out/reviews/VIDEO_ID/`. It contains a copy of the exact export, source snapshots, `manifest.json` with the complete requirements, and an entirely unverified `review.json`.
3. Inspect that packet's export, read every requirement in its manifest, and complete `review.json`. Review the whole visual sequence, listen to all intended audio, and check at actual phone size. For revisions, revisit the offending moment and every comparable handoff. Record the intervals actually inspected, reviewer identity and ISO timestamp. Each applicable check needs `pass`, `fail` or `unverified` and observations of the output with start/end seconds. Example observation: `{"start":12.4,"end":14.2,"note":"The completed-step labels leave before the next construction; the needed denominator stays visible."}`. Optional `file` points to a frame/clip inside the packet; sealing hashes those files too. Use `excluded` with an `exclusion_reason` only for genuinely inapplicable material such as reference provenance, and explain any style departure against the selected recipe. The nine output dimensions cannot be excluded. If a capability is unavailable, leave the relevant inspection unverified.
4. Seal the review, then check it before delivery:

   ```bash
   npm run review -- seal PACKET_DIRECTORY
   npm run review -- check PACKET_DIRECTORY
   ```

   A failing or incomplete review is still retained, but returns a nonzero exit status and blocks publishing. Changed standards, script, original render, frozen export or evidence invalidate release. Sealed reviews are preserved; prepare a new packet after a fix or re-review. No prior passes carry forward automatically.

`playback.visual` and `playback.audio` are arrays of `[start,end]` seconds. Full duration coverage is required; sound is required when an audio stream exists. Set `playback.phone_size` to true only after that inspection. These are reviewer attestations, not automated playback detection. Evidence notes must describe what was observed, not merely repeat the rule.

All repo publishing goes through the gated command below. Direct provider commands or browser posting can bypass this local gate, so agents must use this workflow. It does not cancel a previously scheduled post when a later rule changes. Before changing a rule affecting queued work, reconcile the affected provider drafts/schedules and prepare new reviews.

## Record your own narration

Start the local recording page:

```bash
npm run record
```

Open **http://127.0.0.1:8765** in Chrome. Choose a script, press **Record**, allow microphone access, read at your own pace, then stop and listen. **Save take** preserves the raw audio locally and queues caption/animation alignment. **Next script** lets you keep recording while alignment runs. Optional autoscroll follows the selected reading pace. Space records/stops, R retakes and S saves when focus is outside a control. The page never opens a browser or records automatically.

Saved takes appear below the script as queued, aligning, ready or needing review. A mismatch does not replace the existing narration; expand its report or ask the agent to inspect it. Download the audio before reloading if a take has not been saved. The recorder binds only to `127.0.0.1`, uses no external service, and stores raw audio and manifests under ignored `out/recordings/<id>/`. The server must remain running while recording and aligning; Ctrl-C stops it. Render and review the video after a successful import.

For SAT-001, [the recording guide](src/videos/sat-001/RECORDING.md) is also available. Its script now disables the legacy CTA for this campaign; the existing narration has been preserved and needs a matching new take before a new final render. Other existing scripts may retain legacy CTA wording. Set `"cta": false` when preparing them for this campaign, then record or intentionally regenerate matching audio.

Voice Memos and QuickTime imports remain available. Record one clean take and export M4A, WAV or MP3. The animation will follow your voice; you do not need to match an existing timeline.

```bash
npm run recording -- sat-001
npm run import-voice -- sat-001 /absolute/path/to/your-take.m4a
npm run render -- sat-001 out/sat-001/final.mp4
```

`recording` regenerates the guide from the current script. `import-voice` converts the take locally and rebuilds caption words and diagram cues using whisper.cpp DTW audio anchors. It requires `ffmpeg`, `ffprobe`, `whisper-cli`, and a local Whisper model. On this Mac, the default model is `~/.local/share/whisper-cpp/ggml-base.en.bin`. Set `WHISPER_MODEL` or pass `--model /path/to/ggml-model.bin` to use another compatible model; renamed or quantized models may also need `--dtw base.en` (the matching Whisper DTW preset). Nothing is uploaded and no model is downloaded automatically.

Transcript differences stop the import before replacing existing narration. The error names the affected passages. Edit a stumble or missing line out of the take, or verify a recognition error by ear before rerunning with `--allow-mismatch`. Timing is approximate even when the transcript matches: always watch the result and listen to the caption and diagram cues. For a rehearsal without replacing the current track, add `--output-dir out/sat-001/rehearsal-voice`.

Keep raw recordings under ignored `out/`. Import reports, recognized transcripts and backups of the previous track are stored under `out/voice-import/<id>/`. An accepted import writes the usual `public/voice/<id>/narration.wav` and `timing.json`; review these before committing them. Human audio is never automatically sped up, and imports report the approximate finished duration including the end card. Do not run `voice` after importing a take unless you intend to replace it with synthetic narration.

`src/videos/integral` is an implementation example, not automatic evidence that the output clears the current quality bar. The `gallery-a` and `gallery-b` stills in the studio show every building block.

## Instagram publishing and analytics

@ultralearns is connected through Zernio using Instagram Login. This Mac has the official `@zernio/cli` installed as `zernio`. Its profile-scoped credential lives outside Git at `~/.zernio/config.json` with mode `600`; account identifiers are in `~/.config/video-gen/zernio.json`. The key permits Publishing, Analytics and Accounts. Do not print credentials or full account responses into agent transcripts. Separate team logins can be added in Zernio when needed.

On October 29, 2026, account health confirmed `canPost` and `canFetchAnalytics`; creating, reading and deleting a provider draft succeeded. No live video was published. All 13 existing posts were fetched. The live quota was 0 used of 100 within 86,400 seconds. Recheck `GET /v1/accounts/{accountId}/instagram/publishing-limit` before each publishing batch and use the returned quota, not this historical value. [Quota endpoint](https://docs.zernio.com/instagram/get-instagram-publishing-limit).

Fetch a timestamped analytics snapshot, replacing `ACCOUNT_ID` with your connected account's ID:

```bash
mkdir -p out/instagram
zernio analytics:posts --accountId ACCOUNT_ID --platform instagram --source all --limit 100 --page 1 > "out/instagram/$(date -u +%Y%m%dT%H%M%SZ)-page1.json"
```

Follow `pagination.pages` to fetch subsequent pages once there are more than 100 posts. `--from` and `--to` accept dates; the API defaults to the last 90 days and permits a maximum 366-day range. The first verified responses are in `out/instagram/20261029T204426Z/`. They include views, reach, likes, comments, shares, saves, watch-time fields and skip rate. Follows were null and retention curves empty in that snapshot. Retain raw provider values, including unavailable fields; a zero completion rate is not proof nobody finished. These are cumulative provider snapshots, not automatically refreshed local files. See [the campaign observation and backpass workflow](research/instagram-strategy.md).

After the standards review passes, create a provider draft through the compliance gate:

```bash
npm run review -- publish PACKET_DIRECTORY --caption 'The finished lesson caption' --draft
```

The gate rechecks the sealed review before upload and again before creation, uploads its exact frozen export through the official Zernio CLI, and attaches the export, review and standards hashes to provider metadata. It requires one explicit mode: `--draft`, `--schedule 'FUTURE_ISO_TIMESTAMP'`, or `--now`. Scheduling and live publishing query the current Instagram quota. Scheduling must be in the future with an explicit timezone. Drafts remain in Zernio; the CLI requires a fresh packet for a separate publishing attempt. It preserves provider responses and a send journal locally. A duplicate or uncertain attempt is blocked: inspect `zernio posts:get PROVIDER_ID` and resolve the existing job before retrying. Do not delete the journal and resend blindly. [Official CLI](https://docs.zernio.com/cli), [post creation](https://docs.zernio.com/posts/create-post).

Once the provider confirms publication, bind the Instagram media ID to the review. This reads provider status and verifies account, Instagram ID and creative metadata:

```bash
npm run review -- link PACKET_DIRECTORY --provider-id PROVIDER_ID --instagram-id INSTAGRAM_MEDIA_ID --published-at ACTUAL_ISO_TIMESTAMP --recipe RECIPE_VERSION --variant baseline
```

Set `--mode trial` for a Trial Reel and use `--hypothesis` for a variation. To document an externally published historical export, replace `--provider-id` with `--historical-note 'Evidence that this published creative is this exact export'`. This is an explicit manual identity attestation; never link an approximate reconstruction. Failed or unverified historical videos can also be linked for execution diagnosis. Posts without a matching local export/review remain excluded.

Ingest each raw analytics page with its actual fetch timestamp, then generate the evidence for the learning session:

```bash
npm run review -- observe out/instagram/SNAPSHOT.json --at ACTUAL_FETCH_ISO_TIMESTAMP
npm run review -- learning > out/instagram/learning-evidence.json
```

The output separates `eligible` creative evidence from `excluded` execution/unverified results and preserves raw metrics, including zero and null. Only `eligible` informs creative-rule comparisons. Match `standards_version`, recipe/reference version, normal/trial mode and observation age; snapshots are cumulative, not independent experiments. `--standards-version HASH` selects one standards cohort. Published reviews retain their historical standards snapshots, so a later rule change does not retroactively invalidate an earlier execution. A modified or missing historical review/export/evidence removes eligibility. Read this evidence and the corresponding creatives in the review session before running the actual backpass commands in the strategy. This is an agent-operated workflow, with no new optimizer or background publishing job.

## Layout

```
src/theme.ts          house colors, fonts, sizes (see STYLE.md)
src/anim.ts           time, easing, ramp/visible, glides, spans, drawOn, seeded random
src/narration.ts      timing types and useNarration()
src/components/       the shared building blocks, listed below
src/videos/<id>/      script.json, the video's diagram component and its standalone entry.tsx
src/videos/index.ts   the studio's list of videos
src/compose.tsx       turns a component plus timing into a composition
tools/voice.py        Kokoro narration + word timings
tools/stills.mjs      many stills in one bundle: npm run stills -- <id> every 2
tools/compliance.py   export-bound standards reviews, gated publishing, filtered learning evidence
public/voice/<id>/    generated narration and timing (committed, so renders are reproducible)
QUALITY.md            the output bar, rejection criteria, concrete examples and current SAT profile
research/             active slate, creative theory, evidence and legacy idea banks. Start at research/README.md
samples/              reference recordings, local only
out/                  renders, ignored
```

## Building blocks

Reach for these before writing anything new in a video folder. If a video needs a new piece that a second video could use, add it here instead.

| Module | What it gives you |
|---|---|
| `Video` | The page, narration audio, captions, the Ultralearn CTA and the end card. Every video is wrapped in it automatically. |
| `Caption` | Kinetic word captions. A script line with `"caption": false` is spoken without one, e.g. under a title card. |
| `Readout` | `Mono` (values), `Op` (=, ≈, ×), `Label` ("distance"), `Readout` (a fading row at a fixed height), `Roll` (an inline value that changes in place), `Layers` (highlight variants stacked in one slot) |
| `Tex` | KaTeX formulas, with an optional `color`. `\acc{}` and `\soft{}` macros, `lit()` to light up `[bracketed]` parts without moving anything, `MathGlyph` and `useKatexFonts` for single symbols that move |
| `Working` | `Step`: rows of algebra aligned on their `=` |
| `Swap` | A slot whose content changes at given times |
| `Title` | `TitleCard` (title, "in 60 seconds"), `Kicker` ("MILLENNIUM 05 / 07"), `ChapterNav` (numbered or as given, e.g. "Alg 1 · Alg 2"), `NavTrack` (the underline moves between chapters), `Rise` (title text that slides out like captions), `Chip` ("area ×3") |
| `Cards` | `gridSlot` for picture grids, `PictureCard` (numbered card with a clipped art area), `PictureRow` (thumbnail, name and meaning, for the recap list) |
| `Chart` | `scale`, `fnPath`, `Layer`, `MonoLabel` |
| `Space` | 3D wireframe `Surface`, `Arrow`, `VectorField`, orthographic `project` |

Set the end-card name in `brand` in `src/theme.ts`; its presentation is `EndCard` in `src/components/Video.tsx`.

Set `"cta": false` in current SAT campaign scripts and any future series until a suitable CTA is deliberately configured. Spoken CTA text lives in `tools/video_script.py`; its comment keyword lives in `src/components/Video.tsx`. Update those together if the channel CTA changes. Choose a future series' audience, payoff and style against QUALITY.md before inheriting SAT copy.
