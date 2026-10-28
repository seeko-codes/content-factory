# video-gen

This project makes vertical 60-second math explainers in one fixed house style. That style is a printed page that moves, with kinetic captions synced to a calm narrated voice. Everything runs locally.

Read [STYLE.md](STYLE.md) before writing a video. It covers the visual tokens, the motion rules and, most importantly, how the narration is written.

## Stack

| Layer | Tool | Why |
|---|---|---|
| Video | [Remotion](https://www.remotion.dev) 4 (React, rendered frame by frame to H.264) | The reference videos are web-rendered (KaTeX glyphs, web fonts, HTML text). Remotion reproduces that exactly and deterministically, with audio. |
| Math | KaTeX | The same Computer Modern glyphs the references use |
| Fonts | Inter Tight, IBM Plex Mono via `@remotion/google-fonts` | Measured matches for the caption sans and readout mono |
| Diagrams | SVG components in `src/components` | Crisp hairlines at any size. 3D surfaces use an orthographic SVG projection rather than WebGL, which keeps the print look. |
| Voice | [Kokoro-82M](https://huggingface.co/hexgrad/Kokoro-82M), local, voice `am_michael` | A calm male narrator, with word timestamps built in, so captions sync with no alignment step |
| Checking | whisper.cpp large-v3 (`whisper-cli`) | Transcribes the references and cross-checks sync |

I also considered Manim and Motion Canvas. Manim has the right math but makes this caption typography and layout hard. Motion Canvas's maintenance status is uncertain. Remotion's license is free for individuals and companies of up to three people.

## Setup on a new machine

You need [Node.js](https://nodejs.org) 20 or newer and [uv](https://docs.astral.sh/uv/getting-started/installation/). Nothing else is needed: uv fetches Python 3.12 and the voice model, and Remotion downloads its own headless Chrome and ffmpeg on the first render. It works on macOS, Windows and Linux.

```bash
npm install
npm run studio
```

`npm run studio` opens the editor in the browser with the worked example (`integral`), already voiced. To check that everything works, render it:

```bash
npm run render -- integral out/integral.mp4
```

The first `npm run voice` downloads the Kokoro model and PyTorch, about 1 GB, once.

## Make a video

1. **Write the script** at `src/videos/<id>/script.json`. One line is one caption screen. Use the markup:
   - `*word*`: an emphasized word that stays dark after it is read
   - `$tex$`: math inline in the caption. Add `"say"` with how the line is read aloud.
   - `{cue}`: a named moment, equal to when the next word is spoken. Diagrams animate on cues.
   - `"pause"`: silence after a line, 0.45s by default
2. **Voice it:** `npm run voice -- <id>`. This writes `public/voice/<id>/narration.wav` and `timing.json`, and prints the wpm, which should be about 120.
3. **Draw it** in `src/videos/<id>/<Name>.tsx`. Read times with `useNarration().cue("name")` and animate with `ramp`/`visible` from `src/anim.ts`. Captions, audio and the end card are automatic.
4. **Register it.** Add a standalone `src/videos/<id>/entry.tsx` (copy the integral one) so the video can be previewed on its own with `npx remotion still src/videos/<id>/entry.tsx <id> out/x.png --frame=N`. Add one line to `src/videos/index.ts` so it appears in the studio. Every video automatically ends with the channel CTA (`Comment "seeko"`) and the end card.
5. **Preview** with `npm run studio` and scrub the timeline. **Render** with `npm run render -- <id> out/<id>.mp4`.

When you rewrite a line, run `voice` again. Cue times move with the new audio, so the animation follows without edits.

`src/videos/integral` is the full worked example. The `gallery-a` and `gallery-b` stills in the studio show every building block.

## Layout

```
src/theme.ts          colors, fonts, sizes (measured, see STYLE.md)
src/anim.ts           time, easing, ramp/visible helpers
src/narration.ts      timing types and useNarration()
src/components/       Video (page, audio, end card), Caption, Tex, Chart, Swap, Title, Space (3D, arrows, fields)
src/videos/<id>/      script.json, the video's diagram component and its standalone entry.tsx
src/videos/index.ts   the studio's list of videos
src/compose.tsx       turns a component plus timing into a composition
tools/voice.py        Kokoro narration + word timings
public/voice/<id>/    generated narration and timing (committed, so renders are reproducible)
research/             the SAT video list (568 ranked ideas split between Andres and Sharan), posting calendar, viral and question-pattern research. Start at research/README.md
samples/              reference recordings, local only
out/                  renders, ignored
```

Set your name or logo on the end card in `brand` in `src/theme.ts` and `Mark` in `src/components/Video.tsx`.
