# Style guide

This is what makes these videos look and sound the way they do. It is taken from 15 reference screen recordings of the `ubilumapp` math reels, recorded 2026-10-27. The local copies are in `samples/`, which is not committed. The code holds the measured values in `src/theme.ts`. This file explains them and covers the parts code cannot hold: how the narration is written.

## The look

**A printed page that moves.** Everything sits on one warm off-white page. Thin dark lines carry the drawings, and one blue marks the thing that matters. There are no gradients, shadows, textures, background music, stock footage or decorative motion.

| Token | Value | Use |
|---|---|---|
| paper | `#f9f9f4` | the whole background, every frame |
| ink | `#12130b` | curves, newest caption words, emphasized words, values |
| inkSoft | `#484843` | caption words once read, labels like "distance" |
| label | `#8b8b85` | axis numbers, units, counters ("32 strips") |
| rule | `#d8d9d1` | axes, grids |
| accent | `#2b5a9e` | the single highlight: the answer, the moving point, the key vector |
| accentFill | `#bac8de` | solid area under a curve |
| accentWash | `#e3e8f2` | strips, regions, translucent planes |
| chip | `#efefeb` | readout chips ("area ×3") |

**Three typefaces, each with one job.**
- Sans (Inter Tight, weight 500, tracking about -1%): narration captions and titles. Titles are about 104px and tightly tracked. Captions are about 58px.
- Mono (IBM Plex Mono): every number that is computed or measured (`5.4 m`, `19.99 m`, `area ×3`, `0.800`), plus axis ticks, counters, chapter nav and the "in 60 seconds" subtitle. If a number changes as the video plays, it is mono.
- Math (KaTeX, Computer Modern): every formula and every symbol. Operators between a label and a value (`=`, `≈`, `×`) are a lighter gray than the value.

**Layout, 1080x1920.**
- 100px side margins, with everything left-aligned except centered hero formulas.
- The caption block starts around y=300. A series kicker or chapter nav sits just above it.
- Formulas and readouts go around y=470-700. The diagram goes around y=830-1400.
- Nothing important goes below y=1480, because the platform's caption and buttons cover it.

**Recurring furniture.**
- *Title card:* title, then "in 60 seconds" in mono. Alternatively, a sans subtitle that states the thesis ("is really one picture.").
- *Series kicker:* `MILLENNIUM 05 / 07`, tracked caps with mono numbers. A teaser for the next episode closes a series ("TOMORROW 05 / 07").
- *Chapter nav:* `1 matrix · 2 det · 3 eigen`, mono, with the current chapter underlined.
- *Readout rows:* a computation row, then a "what we know" row (`distance = ?`, then `≈ 17.4 m`, then `= 20 m` in accent).
- *CTA:* the diagram fades and a comment box types the keyword `ultralearn` in accent mono while the narrator asks for the comment.
- *End card:* the name, lowercase **ultralearn** in the title face, appears centered. There is no logo (brand kit: ultralearn repo, `brand/`). Many videos then cut back to the opening frame, so the reel loops seamlessly.

**Drawings.**
- Curves are 5-6px ink with round caps, and they are drawn on from left to right.
- Axes are thin rule-gray with mono tick labels. There are no arrowheads on axes unless the axis is a variable (`E`, `t`).
- 3D surfaces are orthographic wireframes: gray hairlines, no shading, sometimes a translucent accentWash plane slicing through.
- Strips and regions use an accentWash fill with a 4-5px accent outline. Outlines dissolve as the pieces get thin.
- One moving point is a filled ink dot. A guide is a dashed gray line from a point to its axis value.

## The motion

**Captions are the signature.** Each word rises into its own clipped box at the moment it is spoken, taking about 0.28s with a long ease-out. The newest words are dark ink. About half a second after a word is spoken it settles to soft gray, unless it is an emphasized key word, which stays dark. When the next line starts, the words slide up out of their boxes, staggered left to right by about 25ms per word. A line of narration and a caption screen are the same unit. The caption text is exactly the spoken text, with math rendered inline when it is spoken ("Divide by the thickness, $dx$:").

**Diagrams move only when the voice names something.** Every change is cued to a word: the strips grow on "strip", the area resolves on "exactly". Things glide (symmetric ease-in-out, 0.5-1.1s) and never bounce or overshoot. Readouts crossfade with a small rise. A counter that changes quickly ("8, 16, 32 strips") updates in place instead of crossfading. Formulas morph by crossfading in place: Σ becomes ∫ at "a long S, for sum".

**Build up, then clear.** A frame accumulates until the idea is complete. Then stale pieces leave, and the next idea starts on a cleaner page.

## The narration

**The voice.** A calm, low male voice, with median pitch about 105 Hz and a narrow pitch range. It speaks deliberately, never selling, like someone explaining at a whiteboard to one person. There is no music and no room tone: the silences are digital silence. Pace is about 120 words per minute including pauses. Pauses are about 0.3s between phrases and 0.5-0.7s between ideas, and the longest beat is 1.5-3s before the closing line or a recap. Total length is 30-60 seconds and 50-130 words.

**How the script is written.** The script carries the whole teaching method, so it matters more than the visuals.

1. **Open on a question or the scary symbol.** Use "Why does sine turn into cosine?", "What does this symbol actually do?" or "This scary symbol just tells you which way is uphill." The hook names something the viewer has seen and never understood.
2. **Start from something the viewer already owns.** Speed and time before the integral. Standing on a hill before the gradient. A point going round a circle before sine. The formal object arrives only as a new name for something already understood.
3. **Use short declaratives of 3-9 words, mostly imperatives to the viewer.** "Freeze it for one second." "Pick a start, follow the arrows." "Turn the slice." "Flip it." "Watch just two arrows." The viewer is doing the math, not watching it be described.
4. **Show first, name last.** The term lands at the end of the sentence, after the picture has already made it obvious. "That direction is the gradient." "An improper integral." "Those are eigenvectors." The name is often a sentence of its own.
5. **Use concrete numbers you can check.** "About 17 meters." "Closes in on exactly 20." "A half plus a quarter plus an eighth, forever, adds up to exactly one." Approximate first, then exact.
6. **Turn with small words:** "Now", "But", "Then", "Thinner and thinner", "Same ... easier ...". "But" introduces the surprise or the failure case: "But if the curve falls a little slower, the area grows forever."
7. **Demystify the notation explicitly.** "That's why this symbol is a long S, for sum." The symbol is the last thing explained, never the first.
8. **Close with one compressed thesis line,** often a parallel pair. "Local rules. Global motion." "Cosine isn't a random rule. It's how fast sine changes." "Zoom in until it's simple. That's all of calculus." "Calculus 2 is calculus learning to handle the infinite."
9. **Use one idea per line.** A line that needs two caption screens is two lines.
10. **No filler.** There is no "in this video", no "let's" and no "basically". The last written line is the thesis.
11. **One call to action, always the same.** After the thesis and a 0.8s beat, every video ends with: Want to take SAT math prep *seriously?* Comment *"ultralearn"*. The diagram clears, and a comment box types `ultralearn` as the word is spoken (the voice says "ultra learn"). Then comes the logo. `tools/voice.py` appends this line automatically, so scripts never include it. Set `"cta": false` to leave it out.

This is the hub's teaching principle in miniature. Begin from the viewer's example (speed × time), climb to the first principle (add tiny pieces), and extend it into the target domain (the integral).

### Annotated example: the integral (`src/videos/integral/script.json`)

| Line | Move |
|---|---|
| What does this symbol *actually* do? | hook on the scary symbol |
| If this is your speed, how far did you go? | the viewer's own example |
| Freeze it for one second. / Speed times time is distance. | the case they can already solve |
| Add every strip: about 17 meters. | approximate, concrete |
| Thinner strips, smaller gaps. / The total closes in on exactly 20. | the limit, without the word "limit" |
| That's why this symbol is a long S, for sum. | the notation, named last |
| An integral adds tiny pieces into a whole. | thesis |

## Reference set

| Recording | Topic | Notes |
|---|---|---|
| 203857-phone | Calculus III in 60 seconds | surfaces, slices, gradient, double integral, vector fields, curl, recap montage |
| 204122-phone | Calculus II in 60 seconds | substitution, improper integral, series, Taylor |
| 204251-phone | Three semesters of calculus | "zoom in until it's simple" |
| 204503-mac | Linear Algebra in 60 seconds | chapter nav, area chip, eigenvectors |
| 204708-mac | Differential equations | slope fields, phase space, limit cycle |
| 204947-phone | Gradient | 3D surface, gradient descent |
| 205005-mac | Birch and Swinnerton-Dyer | Millennium series 05/07 |
| 205033-phone | Why sine turns into cosine | unit circle to graph |
| 205115-phone | What the integral symbol does | reproduced in `src/videos/integral` |
| 205125-mac | Yang-Mills and the mass gap | Millennium series 04/07, teaser card |
| 205155-phone | Taylor series of sine | |
| 205216-mac | Why x² turns into 2x | growing square |
| 205301-phone | Calculus II (second capture) | |
| 205307-mac | Mandelbrot set | dark fractal zoom, the one exception to the light palette |
| 205503-mac | Fundamental theorem of calculus | caption motion measured here |

The `-mac` recordings have no audio. The `-phone` ones do, and their narration was transcribed with whisper large-v3.
