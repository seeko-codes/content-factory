# CodeMatrix Fourier short - complete visual reconstruction dossier

[First-party short](https://www.youtube.com/shorts/RQv49An4x1g): **Fourier Series Explained with Beautiful Shapes & Mathematical Waves | Circle, Star & Hexagon Fourier**. Published 2026-08-23. Watch-page metadata observed 2026-10-29: **4,251,247 views**, current channel display **37,100 subscribers**. The arithmetic ratio is about 114.6 current views per current subscriber; it is not an at-upload audience, a causal explanation of reach, or a channel-wide baseline.

This file deepens this one short. It does not merge this treatment with the channel's angle puzzles. The source is a fully produced portrait mathematical animation: three boundary motions generate three linked traces in parallel. There is no host, handwriting, classroom or visible authoring application.

## Evidence and exact limits

The public video-only file supplied for review was inspected at **0, 0.5, 1.0, ... 14.5 seconds**, plus its last decoded frame. All **16 frames from n=430 through n=445** were separately extracted to resolve the ending. Full native frames and enlarged crops were inspected for formulas, axes, colors and line relationships. Orange-marker centroids were measured from the sampled source pixels to register the motion. These are compressed-raster observations, not recovered vector coordinates.

The retrieved file is H.264, **360 x 640, 30 fps, 14.866667 seconds**, with 446 decoded frames. The watch metadata rounds the runtime to 15 seconds. Its only stream is video. **Audio is unreviewed**: no statement here establishes that the published short is silent, has music, uses a beat, or contains narration. The source project, exact typefaces, native color tokens, original frame rate and rendering stack remain unknown. All reconstruction values below are explicitly authored estimates when they go beyond observable pixels.

Temporary evidence was kept under `/tmp/gallery-shortform/codematrix/`; the parent retrieval was `/tmp/gallery-legacy/codematrix/RQv49An4x1g/video.mp4` with `video.info.json`. Those paths are temporary working evidence, not durable dependencies of a future implementation. No source media is embedded in this dossier.

## The entire visible proposition

The full page is already assembled on the first frame. A mint serif title, **Fourier Series**, sits above three equally spaced shape/graph rows. The left shapes are a five-point star, circle and flat-top regular-looking hexagon. Each has a thin gray spoke from its fixed center anchor to an orange boundary point. Each point is joined by a pale dashed line to the growing orange graph at right. The graphs all advance to the right at the same rate. Old trace segments remain fixed; they do not scroll.

The star starts at its upper tip and goes around its perimeter toward the upper-left indentation. The circle and hexagon start at their rightmost points and initially move upward and left. The circle's point travels smoothly counterclockwise. The polygon points travel along straight edges; the hexagon's upper and lower horizontal edges produce flat graph sections. The star's inward and outward turns produce several changes in graph slope and two low troughs. All three motions complete approximately one circuit together.

There are **no new text cards, numeric readouts, labels on the graph ticks, captions, cuts, zooms, camera moves, cursor, legend, logo or CTA** in the reviewed source. The formal equations below the rows are static throughout. The payoff is the completed comparison of three wave profiles rather than a verbal conclusion or solved exercise.

A critical observed detail: the dashed connectors **are not horizontal projection lines**. The graph's vertical amplitude is about 60 percent of the corresponding left-shape displacement. For example, at 5 seconds the circle point is around (66,279), but the trace tip is around (246,295), measured in native pixels. The connecting segment slopes downward to the right. At a negative excursion it slopes upward. A reconstruction with horizontal guides and full-height graph amplitudes would be a mathematically reasonable redesign, but it would not reproduce this source.

## Spatial registration and asset inventory

Coordinates below use the native 360 x 640 frame, with x rightward and y downward. Multiply by three for a 1080 x 1920 render. Most positions are reliable to about 1-2 native pixels; thin compressed edges do not justify subpixel certainty.

| Asset or region | Registered source appearance | Authored reconstruction target |
|---|---|---|
| Background | Uniform black, edge to edge | `#000000` |
| Title | Centered around x=180; visible ink approximately x=74-287, y=35-61; thin serif letters in pale mint/white | Center x=180, baseline about 60, approximately 32 px nominal serif size; fit the measured width rather than assuming the original font |
| Row centers | y=140, 320, 500 | Reuse one row component translated by 180 px |
| Shape/spoke anchor | x about 92 in all rows | `(92, y0)` |
| Star silhouette | Approximately x=42-143, y=93-187 | Ten-vertex polygon specified below; empty fill |
| Circle | Approximately x=43-141, y=272-369 | Center `(92,320)`, radius 48 |
| Hexagon | Approximately x=40-144, y=455-545 | Center `(92,500)`, circumradius 52, rightmost vertex first |
| Shape outline | Thin pale cyan/mint, no face fill | `#B7F5E5`, width 1.2 px |
| Spoke | Thin muted gray, visible inside each shape | `#626262`, width 1 px; fixed anchor to moving point |
| Boundary marker | Orange disk, about 8-9 px diameter; pale edge | Radius 4.1 px, fill `#FFAC61`, stroke `#FFD6A0`, width 0.7 px |
| Graph origin | x about 195, y=`y0` | `(195,y0)` |
| Horizontal axis | Thin gray to a filled triangular arrow around x=347; three ticks | Stem to x=335, arrow tip x=348; ticks x=233,271,309, each 7 px tall |
| Vertical axis | From approximately y0+35 to y0-36; filled upward arrow | Stem x=195; arrow tip `(195,y0-36)`, base y0-22 with half-width 7; short tick at y0+24 |
| Axes | Gray, lighter filled arrowheads | Stems `#777777`, 0.9 px; arrowheads `#BEBEBE` |
| Trace | Orange, about 2 px; no separately enlarged leading graph marker | `#FFAC61`, width 2 px, round joins/caps |
| Connector | Pale dashed segment from boundary marker to trace tip; slopes when heights differ | `#D0D0D0`, width 1 px, dash about 4 px / gap about 5 px |
| First equation | Approximately x=68-293, y=220-260, including sum limits | Center x=180, expression box centered near y=242 |
| Circle equation | Approximately x=120-240, y=413-427 | Center x=180, expression center near y=420 |
| Hexagon equation | Approximately x=77-285, y=582-622, including sum limits | Center x=180, expression box centered near y=602 |
| Formula treatment | Small pale green-gray mathematical italics; enlarged sum glyphs | KaTeX, nominal 14 px native size; target observed bounds; color `#BCD8CE` |

These hex values, font size, dash lengths and path widths are practical reconstruction choices sampled or estimated from the raster. They are not claims that the creator used those exact native tokens. Title lettering appears extremely thin at this resolution; use a serif with a comparable width and stroke texture, and inspect a native-size render before adding any artificial outline or glow. The source does not show heavy typography, shadows, textured paper or ambient decoration.

The page has deliberate spare margins: roughly 35 px above the title, 12 px to the right of the arrowheads and 18 px below the final equation. Preserve these measured relationships. Adding a platform-safe caption band would materially change the layout and requires a new design decision.

## Exact visible formulas and what they do not establish

The first formula reads, preserving the source's displayed grouping:

\[
f_{star}(t)=\sum_{n=1}^{\infty}a_n\sin(nt)+b_n\cos(nt).
\]

The second reads:

\[
f_{circle}(t)=\sin(2\pi t).
\]

The third reads:

\[
f_{hexagon}(t)=\sum_{n=1}^{\infty}c_n\sin((2n-1)t).
\]

The star expression visually lacks brackets that would explicitly put both terms inside the sum. The expected mathematical reading is a sum of sine/cosine pairs, but the dossier does not silently redraw the source as already bracketed. The naming of the sine coefficients `a_n` rather than `b_n` is a convention, not an error by itself.

These formulas do not determine the animation. They supply no numerical coefficient values, shape-traversal rule, scale or phase relationship to the footage. Moreover, the circle's displayed argument gives period 1 in `t`, while the other two use angular arguments naturally having period 2 pi. The visible motions share one screen-time period. A common normalized time or phase convention has to be supplied by an implementation; it is not explained on screen.

The centered, constant-perimeter hexagon height signal actually can be represented by odd sine harmonics. Its printed structural form is therefore **compatible**, not intrinsically false. Coefficients and the phase/time convention are still necessary. The star requires more care: its visible spoke is anchored to the silhouette's bounding-box center, while a regular five-point star's rotational center is slightly lower in the image. A full-cycle average of the nearly complete sampled star trace is about y=143 rather than its y=140 axis. If the displayed function is read as that raw height signal, it contains a nonzero constant term absent from the generic displayed series. Subtracting the mean would resolve that issue but would move the plotted signal relative to the observed axis.

Nothing visible shows harmonic decomposition, a number of terms increasing, epicycles, coefficient computation, a convergence limit, Gibbs oscillations or a spectrum. The graph can be generated directly from the point's vertical coordinate. It is useful mathematical motion-to-signal illustration under a Fourier title; the sampled footage alone does not establish that an actual Fourier sum drove the source renderer.

## Complete half-second observation register

Orange-marker positions were measured from the native sampled pixels and rounded to the nearest pixel. Pixel centroids can differ from intended vector coordinates by roughly half a pixel, with additional compression error. The `tip x` column is the fitted shared horizontal progress, not a separately recovered native parameter. A graph tip's y is approximately `y0 + 0.6 * (markerY - y0)`.

| Time s | Star marker x,y | Circle marker x,y | Hexagon marker x,y | Shared trace-tip x, approx. | Visible state |
|---:|---|---|---|---:|---|
| 0.0 | 91,93 | 139,320 | 143,500 | empty | Page fully present; empty graphs; all points at their start positions. |
| 0.5 | 87,104 | 139,310 | 138,491 | 200 | All points begin their circuits; very short traces. |
| 1.0 | 83,116 | 135,300 | 133,481 | 205 | Star descends toward its first inward turn. |
| 1.5 | 78,127 | 130,291 | 128,472 | 210 | Star reaches the first upper-left indentation. |
| 2.0 | 66,127 | 123,284 | 122,463 | 215 | Star travels left across its shallow upper-left edge. |
| 2.5 | 53,128 | 115,278 | 117,454 | 220 | Hexagon reaches its upper flat edge. |
| 3.0 | 43,129 | 106,274 | 106,454 | 225 | Star reaches the left outer point; hexagon top plateau grows. |
| 3.5 | 52,137 | 95,272 | 96,454 | 230 | Circle approaches its top; polygon corners remain sharp. |
| 4.0 | 62,145 | 85,271 | 85,454 | 236 | Circle crosses its top; star heads toward lower-left indentation. |
| 4.5 | 70,153 | 75,274 | 74,455 | 241 | Star enters the long descent to its lower-left outer tip. |
| 5.0 | 67,165 | 66,279 | 65,456 | 246 | All three profiles clearly differ; connectors have distinct slopes. |
| 5.5 | 63,177 | 58,285 | 59,465 | 251 | Hexagon leaves its top plateau on a diagonal side. |
| 6.0 | 62,186 | 51,293 | 54,474 | 256 | Star reaches its first deep lower trough. |
| 6.5 | 73,179 | 47,301 | 49,483 | 261 | Star rises toward its bottom central indentation. |
| 7.0 | 83,172 | 44,311 | 44,492 | 266 | Circle approaches the leftmost point. |
| 7.5 | 93,168 | 43,322 | 40,502 | 271 | Circle and hexagon are just past halfway; star near its central lower indentation. |
| 8.0 | 104,175 | 45,331 | 46,511 | 276 | Star descends into its second lower trough. |
| 8.5 | 114,182 | 48,341 | 51,520 | 281 | Circle and hexagon points move down/right. |
| 9.0 | 121,184 | 54,350 | 56,529 | 286 | Star turns at its lower-right outer point. |
| 9.5 | 118,172 | 61,357 | 62,538 | 291 | Hexagon approaches its lower flat edge. |
| 10.0 | 115,160 | 70,363 | 68,545 | 296 | Circle nears its lower arc; hexagon bottom plateau begins. |
| 10.5 | 115,149 | 79,366 | 79,545 | 301 | Star turns upward toward upper-right outer point. |
| 11.0 | 125,142 | 89,368 | 89,545 | 306 | Circle approaches its lowest point. |
| 11.5 | 134,133 | 99,367 | 100,545 | 312 | Circle leaves its lowest point; hexagon remains on lower edge. |
| 12.0 | 137,128 | 110,364 | 110,545 | 317 | Star turns at the upper-right outer point. |
| 12.5 | 125,128 | 118,360 | 119,542 | 322 | Hexagon begins its final upward/right side. |
| 13.0 | 112,127 | 126,353 | 124,532 | 327 | Star crosses its upper-right shallow edge. |
| 13.5 | 103,123 | 132,345 | 130,523 | 332 | Star begins the last ascent to its top tip. |
| 14.0 | 99,111 | 137,336 | 135,514 | 337 | Traces approach one full period. |
| 14.5 | 94,100 | 139,326 | 140,505 | 342 | Nearly closed circuits; complete-looking traces remain. |
| 14.8333 | 91,92 | 139,319 | 143,500 | empty | Reset state: traces cleared and markers back at the starts. |

## The ending, resolved at frame precision

Frames n=430-443 (14.3333-14.7667 seconds) retain the growing traces as the points approach their start positions. **Frame n=443 at 14.7667 seconds still has all three nearly complete graphs. Frame n=444 at 14.8000 seconds clears all three graphs and resets all boundary points. Frame n=445 at 14.8333 seconds retains that empty-graph starting state.** The static shapes, axes, title and formulas remain intact. There is no supported progressive outline redraw, fade, final answer card or outro.

This is an abrupt graph-history reset, followed by about two decoded frames of the reset state in this file. Motion can restart on replay, but the graphs themselves do not make a visually seamless closed loop: almost a full wave disappears at the seam. A future version could deliberately preserve the source reset, fade graph history, or scroll continuously, but the latter two are new treatments and must not be described as observed source behavior.

Local ignored evidence is retained for inspection:

- [All half-second samples and last frame](../../../out/channel-references/codematrix/fourier-half-second-contact.png).
- [Every ending frame, n=430-445](../../../out/channel-references/codematrix/fourier-ending-frames-430-445.png).
- Native-size [opening frame](../../../out/channel-references/codematrix/fourier-frame-000.png), [5-second frame](../../../out/channel-references/codematrix/fourier-frame-150.png), and [10-second frame](../../../out/channel-references/codematrix/fourier-frame-300.png).
- Native-size [n=443, graphs still present](../../../out/channel-references/codematrix/fourier-frame-443.png), [n=444, reset](../../../out/channel-references/codematrix/fourier-frame-444.png), and [n=445, reset held](../../../out/channel-references/codematrix/fourier-frame-445.png).
- [Enlarged source star formula](../../../out/channel-references/codematrix/fourier-star-formula-enlarged.png), useful for checking the unbracketed displayed expression.

These are review artifacts in ignored `out/`, not reusable illustrated assets or source-project files. The durable specification is the text, mathematics and measurements in this dossier.

## Authored native reconstruction model

This section is a proposed implementation, mathematically defined so that another agent can build the complete short without inventing its motion. It fits the observed source; it is **not recovered source code**. Use deterministic Remotion frame rendering with an SVG diagram and local KaTeX formulas, which matches this repository's current stack. There is no need for external footage, stock photography, a 3D renderer, a voice generator or a live screen recording.

### One clock, three paths

Use the native coordinate system above inside `viewBox="0 0 360 640"`; render at 1080 x 1920. For a match to the retrieved file, use 30 fps and 446 frames. Let `frame` be zero based and set:

```ts
const reset = frame >= 444;
const u = reset ? 0 : frame / 444;
```

The fitted active circuit is therefore about 14.8 seconds. Reset graph history at frame 444 and keep it empty at 445. This is a frame-registration fit, not a claim about the original author's source timeline. If a product requires exactly 15 seconds, use 450 frames and deliberately hold the reset state for the last six frames; label that four-frame extension as authored.

For the circle, with center `(cx,cy)=(92,320)` and radius 48:

\[
P_{circle}(u)=(92+48\cos(2\pi u),\;320-48\sin(2\pi u)).
\]

For the hexagon, use vertices in this order, closing back to the first:

```text
(144,500)
(118,454.9667)
(66,454.9667)
(40,500)
(66,545.0333)
(118,545.0333)
```

For the star, the following regular angular construction fits the measured silhouette closely while retaining the observed offset between the bounding-box anchor and rotational center:

```ts
const cx = 92;
const rowY = 140;
const outer = 52;
const inner = 22;
const cy = rowY + outer * (1 - Math.cos(Math.PI / 5)) / 2;
const vertices = Array.from({length: 10}, (_,j) => {
  const theta = Math.PI / 2 + j * Math.PI / 5;
  const radius = j % 2 === 0 ? outer : inner;
  return [cx + radius * Math.cos(theta),
          cy - radius * Math.sin(theta)];
});
```

Its approximate vertices are:

```text
(92.00,92.97) (79.07,127.17) (42.55,128.90)
(71.08,151.76) (61.44,187.03) (92.00,166.97)
(122.56,187.03) (112.92,151.76) (141.45,128.90)
(104.93,127.17)
```

The exact source star radii are unknown; 52 and 22 are authored fitted values. All ten edges of this constructed star have equal length, as do the six hexagon edges. For either polygon, let `k=floor(N*u)` and `a=N*u-k`, then linearly interpolate vertex `k` to vertex `(k+1) mod N`. This produces constant perimeter speed and the observed straight graph pieces. Do **not** use a global ease-in/ease-out on `u`, rotate a fixed point around the polygon's circumcircle, or sample equal polar-angle rays against its boundary. Those produce different timing or a different height signal despite a similar static silhouette.

The source's spoke anchor is the registered row anchor `(92,rowY)`. Retain that point for the star rather than automatically replacing it with the star's rotational center `cy`. That small difference is visible in the signal's offset and is one reason the implementation must define its coordinate convention.

### Graph, history and correspondence

For any row with boundary point `P(u)` and row center `y0`, define the graph point:

\[
Q(u)=(195+150u,\;y_0+0.6(P_y(u)-y_0)).
\]

The graph is the prefix `{Q(v): 0 <= v <= u}`. At frame zero or after reset, draw no orange graph segment. On other frames, sample past phases at least once per output frame, append the exact current phase, and construct a continuous polyline. A 444-step circuit is already much denser than the source's pixel resolution. Circle samples yield a visually smooth sinusoid; polygon corner phases must be explicitly inserted if a coarser sampler is used. Old graph points retain their original x/y values.

Draw the connector from `P(u)` to `Q(u)`. Its endpoint is the **current graph tip**, not the vertical axis, except at the beginning. Draw the muted spoke from `(92,y0)` to `P(u)`. Place the orange disk at `P(u)` after the line layers so its circular silhouette remains clear. Do not put a second enlarged orange disk at `Q(u)`; the source's graph tip is just the end of the stroke.

A stable layer order is: black page; static shape outlines and axes; gray spokes; orange graph histories; pale dashed connectors; orange boundary markers; static formulas and title. The exact SVG stacking of a crossing may need a one-frame visual adjustment to match the source, but no layer should obscure a formula or turn a complete polygon edge into a missing segment.

### Explicit signals and independent mathematics

Define positive mathematical height as `g(u)=y0-Py(u)`. Then graph y is `y0-0.6*g(u)`. This resolves the screen-coordinate sign rather than relying on a guessed sign in a sine function.

For the circle, `g_circle(u)=48 sin(2 pi u)`. Its graph amplitude is 28.8 native pixels. Its first positive crest occurs at u=1/4, and its negative trough at u=3/4.

For the hexagon, let `A=26 sqrt(3)` and `g_hexagon(u)=A*h(u)`, where:

\[
h(u)=\begin{cases}
6u&0\le u<1/6,\\
1&1/6\le u<1/3,\\
3-6u&1/3\le u<2/3,\\
-1&2/3\le u<5/6,\\
6u-6&5/6\le u\le1.
\end{cases}
\]

This gives the observed rising ramp, positive plateau, descending ramp, negative plateau and final rising ramp. It is odd and has half-wave antisymmetry, so its Fourier series contains only odd sine harmonics under this phase convention. An explicit coefficient formula is:

\[
h(u)=\sum_{m=1}^{\infty} B_m\sin(2\pi m u),\qquad
B_m=\frac{6}{\pi^2m^2}\left[\sin\left(\frac{m\pi}{3}\right)+\sin\left(\frac{2m\pi}{3}\right)\right].
\]

Even terms vanish, as do terms with m divisible by 3. For example, B1 is approximately 1.0529606277, B5 approximately -0.0421184251 and B7 approximately 0.0214889924. Independent midpoint integration over 20,000 samples agreed with these analytic coefficients to about 1.5e-9 for those terms; this checks the **authored mathematical model**, not the inaccessible source renderer. The source's `c_n` can correspond to `A*B_(2n-1)` if its `t` is reinterpreted as the angular phase `2 pi u`.

For the star, direct polygon interpolation is sufficient to reproduce the visual signal. With the fitted symmetric star above, its rotational center is about 4.9667 px below the row anchor, so the signal's mean is about **-4.9667 px**. Its graph's mean y is therefore about **142.98**. A mathematically complete Fourier label for that raw signal would include this mean:

\[
g_{star}(u)=\mu+\sum_{m=1}^{\infty}\left[A_m\cos(2\pi m u)+B_m\sin(2\pi m u)\right],\quad \mu\approx-4.9667.
\]

The coefficients can be defined by integrating the explicitly supplied piecewise-linear `g_star` over u in [0,1]. They need not be guessed from the generic source label. Reproducing the source faithfully means preserving its visible expressions with their limitations documented. Producing a new mathematically explicit lesson means choosing corrected labels and defining `u`; those are separate decisions. Neither choice warrants pretending that the source displayed the coefficients or demonstrated convergence.

## Whole-video reconstruction checks

A reviewable implementation should pass these concrete frame checks before its appearance is called a match:

| Frame / phase | Required visual state in the authored model |
|---|---|
| 0 / u=0 | All static layout visible; star at top; circle and hexagon at right; graphs empty; connectors already present. |
| 111 / u=1/4 | Circle at (92,272), graph tip at (232.5,291.2); hexagon at the middle of its upper edge, graph tip near y=472.98. The star is about (56.81,140.33), not at a quarter of a circular orbit. |
| 222 / u=1/2 | Circle at (44,320); hexagon at (40,500); graph tips at x=270 on their axes. Star at its central bottom indentation, about (92,166.97), with graph tip near y=156.18. |
| 333 / u=3/4 | Circle at (92,368), graph tip (307.5,348.8); hexagon at the middle of its bottom edge, graph tip near y=527.02. |
| 443 / u=443/444 | Almost full traces remain. Each point is close to its initial boundary position. |
| 444-445 / reset | All traces empty; markers returned to starts; static page intact. |

For every active frame, the graph tip and connector endpoint must agree exactly; the left marker and other connector endpoint must also agree. Polygon markers must stay on edges, not cut across corners. All rows must use the same phase and graph x. Circle amplitude must remain smooth; hexagon plateaus must stay horizontal; star corners must retain their repeated slope changes and small mean offset. Tick marks and formulas must remain static, not jiggle with the animated path.

Inspect the finished render at 360 x 640 as well as 1080 x 1920. Thin strokes and small formulas are central source characteristics but can disappear with different antialiasing. Fit formula bounds without changing relative row spacing; do not solve a font-width mismatch by moving the entire geometry. Use the source frame-443/frame-444 pair to verify the reset, and the 5-second frame to verify the sloping connectors.

The proposed implementation adds **no audio, narration, caption track, CTA or automatic house end card** unless a separate creative decision explicitly supplies them. That is a reconstruction boundary, not evidence about the published video's audio. The central source effect is three synchronized, immediately comparable coordinate signals in one persistent portrait page. Its mathematical fidelity depends on an explicit traversal and coordinate mapping, not on merely copying the words Fourier Series.


[Local source-frame plates](visual-evidence.md) retain the reviewed visual evidence.
