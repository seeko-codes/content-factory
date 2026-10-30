# Ubilum: course-overview construction audit

Fresh inspection, 2026-10-29. This is the course-overview branch of the [channel deep dive](STYLE.md). Six local recordings were reviewed on seventeen contact sheets: 172 samples in total, at nominal recording offsets 1, 3, 5 seconds and onward. The frames selected by the sampling filter are approximately one source frame before those labels. Offsets are navigation aids, not exact cut times. Four recordings have fresh Whisper base.en transcription; two are silent. ASR is checked against visible captions for words such as sine, gradient and partial derivatives. No continuous playback, voice-quality or sound-mix assessment is claimed.

Sources are the original recordings in `samples/`, captured 2026-10-27, and the [prior exact-frame audit](../../reference-asset-audit.md). They include phone overlays, temporary enlargement, preceding content and replay. Never reproduce those as creative decisions. Public URLs are supplied only where the topic-to-post match was previously established. Current counts are dated separately in [the performance study](ubilumapp-performance.md).

## Calculus III: dimensional expansion of one familiar object

Source: `203857-phone.mov`, 62.343 seconds, audio present; 31 samples on three sheets. [Matched public reel](https://www.instagram.com/ubilumapp/reel/DekN4tHOZPX/). A brief preceding audio fragment occurs before the main sentence. Phone chrome is visible near the beginning and end. The ending repeats opening content; this establishes observed replay, not the source edit's frame-perfect loop.

| Recording offset | Visible construction and accompanying meaning | Why this beat matters |
|---|---|---|
| 00:01 | Course title over a single curve, a marked point and a tangent. | A large, already meaningful object introduces scope; no decorative collage is needed. |
| 00:03-00:07 | The curve and point remain recognizable while a second input and a wireframe surface appear. The equation changes from one-input to two-input notation. | Complexity grows from the viewer's existing object rather than arriving as unrelated imagery. |
| 00:09-00:15 | A translucent slicing plane isolates a curve; tangent and partial-derivative notation follow. The plane is then shown in another direction. | The new symbol inherits a geometric referent. The second direction advances the explanation, rather than merely changing the camera. |
| 00:17-00:25 | A direction at the same point changes; a circular directional construction compares possibilities. A blue arrow and gradient notation identify the selected direction. | The diagram turns a vague superlative into a visible comparison. A sampled rotating comparison illustrates the idea; it does not prove the maximal directional derivative theorem. |
| 00:27-00:31 | A grid overlays the surface; a small planar base cell `dA=dx dy` is linked to a column of height `f(x,y)`. | The problem changes from directional change to accumulation, but retains the surface and its coordinate organization. |
| 00:33-00:37 | Many columns approximate a volume, then recede as double-integral language arrives. | For a nonnegative graph, one contribution is `f(x,y) dx dy`, not curved-surface area `dS`. Contributions become a total; the picture is a limiting illustration, not an independent convergence argument. |
| 00:39-00:45 | A flat arrow field replaces the surface; a tracked point follows the field. | The governing local relation becomes visible at many locations. Object continuity supports the analogy, but flattening alone does not prove a field's properties. |
| 00:47-00:51 | Arrow orientations change to a swirling field; curl notation follows. | The visual contrast supplies a reason for a second operator. It is a qualitative introduction, not a calculation of curl. |
| 00:53-00:57 | Title returns above a composite of the previously used curve, surface and field; several learned symbols sit together. | The recap compresses familiar objects into a thesis about more directions. It does not introduce a new demonstration at the finish. |
| 00:59-01:01 | Title/curve and opening sentence appear again with Instagram chrome. | Consistent with replay. Do not infer seamless-loop timing from this recording. |

**Asset grammar:** one persistent point; dark active curve; quiet wireframe; translucent selected plane/patch; blue selected direction; one symbol region above the drawing. The wireframe earns its complexity by showing an extra input. SAT content rarely needs that third dimension.

**What is established:** a coherent orientation to slices, directional change, accumulation and fields. **What is not established:** competency in partial differentiation, a proof that the gradient gives the direction of steepest increase, double-integral convergence or curl calculations. A course overview can supply organization without delivering a complete course.

**SAT translation:** begin with one marked point on a line, keep it as equal steps become unequal steps on a quadratic, then explain the changed relation. If a four-domain map is used, each miniature must remain a recognizable destination. The user's map-first hook is an authored adaptation; this reel's inspected opening uses a dominant construction.

**Do not copy:** advanced symbols to manufacture prestige, three-dimensional depth without mathematical need, or the claim that every SAT problem reduces to these four pictures. The source's dimensional chain is meaningful because its concepts are genuinely connected.

## Calculus II: exact quantity through representation changes

Primary source: `204122-phone.mov`, 60.557 seconds, audio present; 30 samples on three sheets. It starts on an `e^x` reel before switching to Calculus II, so its first second is not the course reel's opening. The nine-topic historical engagement table maps this topic to 6,760 likes, not a current view count or a verified live post ID.

| Recording offset | Visible construction | Explanatory work |
|---|---|---|
| 00:01 | Prior `e^x` content. | Capture boundary, not an introduction to copy. |
| 00:03-00:07 | Course title, one decaying curve, shaded area and tangent/slope annotation. Infinity appears on the horizontal direction. | The opening connects familiar Calc I objects with the new infinity question. |
| 00:09-00:15 | A substitution is introduced; the curve changes and a faint previous curve remains. A blue `0.800` readout persists. | The invariant is quantitative, not merely an attractive morph. The completed transformed integral has limits 1 and 5. Intermediate sampled formula transitions must not be copied as separate final equalities. |
| 00:17-00:25 | The upper bound becomes variable, the shaded region extends, and approximations approach one; the final improper-integral expression equals one. | The viewer sees a changing quantity stabilize before the name arrives. Exactness comes from a mathematical limit, not a rounded counter. |
| 00:27-00:29 | A second, slower-decaying curve appears with a diverging area comparison. | A near-neighbor countercase prevents the false generalization that every infinite region has finite area. |
| 00:31-00:41 | Cuts at 2, 4 and 8 divide the area; pieces move into a stack. Successive fractions appear above it and the stack approaches a unit total. | The old object becomes the new argument's material. Do not replace the shaped area pieces with arbitrary rectangles and call that an exact dissection. |
| 00:43-00:53 | The summed terms become dependent on `x`; a polynomial and a reference sine curve are compared as more terms appear. | The familiar act of adding pieces becomes a functional approximation. Finite partial sums are approximations, not the sine function everywhere. |
| 00:55-00:59 | The title returns with three compact equations: improper integral, geometric series, sine series. | A common infinity theme is compressed into three recognizable outcomes. |

The main substitution can be checked independently:

`∫[0,2] 2x/(1+x²)² dx = ∫[1,5] u⁻² du = 4/5`, with `u=1+x²`.

The sequence of tail pieces is also grounded in this particular integral: for positive integer `k`, `∫[2^(k-1),2^k] u⁻² du = 2^-k`. The growing stack therefore has a real quantity correspondence; its animation should not imply that every piece was already a same-width rectangle before any area-preserving reorganization. The source does not establish the general convergence theory through these images alone.

**SAT translation:** an equivalent-expression transformation should preserve one clearly labeled quantity while the representation changes. For example, `(x+4)²` becomes four regions whose total remains `(x+4)²`; the two overlooked strips become `8x`. Show the invariant and every term, then give the algebraic extension beyond positive side lengths.

**Do not copy:** symbols that arrive before their operands have meaning; intermediate formula states as valid equations; a counter approaching `1.000` presented as proof of exact equality; or a survey that silently assumes multiple years of prerequisites from an SAT audience.

## Second Calculus II capture: corroboration, not another independent winner

`205301-phone.mov`, 58.560 seconds, audio present; 29 samples on three sheets. It repeats the same core narration, substitution `u=1+x²`, preserved `0.800`, infinite-area comparison, stacking and sine-series sequence. This is a second capture of the same course construction, not evidence from a second independent concept or upload. Its leading title begins around 00:01; its approximate content offsets are 3-4 seconds earlier than the first capture. Use its own clock, not a global correction applied to every beat.

Detailed anchors: title/area at 00:01-00:05; substitution at 00:07-00:11; variable bound at 00:13-00:19; named improper integral at 00:21; slower-decay comparison at 00:23-00:27; cuts and stacking at 00:29-00:37; terms depending on `x` at 00:39-00:43; sine comparison at 00:45-00:49; recap at 00:51-00:55. Phone control center appears at 00:57 and is entirely capture UI.

This view makes the Instagram icon ambiguity especially clear: the bottom row contains heart, comments, circular-arrow and paper-plane icons, while the bookmark has no visible number. Preserve the old reported save/share columns as historical attribution until their icon semantics are independently verified; do not advertise them as newly measured saves.

## All of calculus: one operation organizes three chapters

`204251-phone.mov`, 48.253 seconds, audio present; 24 samples on two sheets. [Matched public reel](https://www.instagram.com/ubilumapp/reel/De2HJ6JoAML/). Its first sample shows a surface/title composition, then the working sequence begins with a curve. The recording cannot by itself distinguish an initial poster/preview from a moving opening shot.

| Offset | Construction | Meaning |
|---|---|---|
| 00:01-00:03 | Surface/title preview followed by a curve; a `Calc I II III` row appears. | Promise and scope are already concrete. Navigation is subordinate to the main picture. |
| 00:05-00:09 | A marked curve is enlarged; a tangent comparison is retained. Mono readouts show increasing zoom and decreasing pixel deviation from straightness. | The camera move demonstrates a relationship through a measure. A zoom by itself would be decorative. |
| 00:11-00:13 | The curve is compared with a tangent and changing slope; a derivative trace appears beneath. | A selected local measurement is linked with a second representation. Pixel deviation is display-dependent, not a mathematical error bound. |
| 00:15-00:21 | Area over a half sine wave is split into strips; the counter progresses toward `2.000`. | The same curve supplies accumulation. A finite rounded readout illustrates convergence, not exact equality by itself. |
| 00:23-00:29 | The active chapter changes to Calc II. A blue polynomial is compared with a gray reference curve; term counts and the matching interval grow. | The viewer sees what more terms buy. The source supplies an example, not a claim that every smooth function equals its Taylor series. |
| 00:31-00:35 | A second input produces a surface. A selected patch is enlarged until it resembles a plane. | The original local-simplification operation is reused in a new dimension. |
| 00:37-00:41 | A point and direction on that surface lead to the gradient; another large zoom shows the plane. | Repetition deepens one governing idea rather than starting an unrelated topic. |
| 00:43-00:47 | A compressed three-row recap connects slope/area, infinite sums and surfaces/gradients; the Ubilum mark follows. | The final organization is the payoff. The source brand is not our CTA. |

**SAT translation:** organize a narrow survey by a real mathematical relationship, such as constant differences, growing differences and constant ratios, rather than a list of curriculum names. Show the same input step and compare the resulting outputs. If there is no honest common operation, use an explicitly bounded map instead of forcing an equivalence.

**What not to copy:** pixel counters as if they were mathematical invariants; “all” as a promise of complete mastery; a Taylor-series illustration generalized to arbitrary smooth functions; or visual handoffs that imply numerical equality between unrelated topics.

## Linear algebra: two basis arrows generate the overview

`204503-mac.mov`, 62.472 seconds, silent; 31 samples on three sheets. [Matched live-grid topic](https://www.instagram.com/ubilumapp/reel/De-Dbg1O8vP/). No narration or sound can be inferred from this file. Visible captions alone support the content account.

| Offset | Visible beat | Consequence |
|---|---|---|
| 00:01-00:07 | Three-part navigation, title, two basis arrows; a gray grid shears around a fixed origin. | One manipulable system carries the whole lesson. A second muted hue distinguishes the basis directions; “exactly one blue only” is not an absolute source rule. |
| 00:09-00:11 | Captions emphasize straight lines and the fixed origin. | Properties of the transformation are made inspectable before its notation. These two properties alone do not characterize every linear map. |
| 00:13-00:17 | Two unit arrows land at `(2,1)` and `(1,2)`; the displayed matrix uses those columns. | The matrix has an observable geometric meaning. Formula and object correspond directly. |
| 00:19-00:23 | Determinant chapter: a square becomes a parallelogram and the readout settles at `area ×3`. | One number explains a change in the existing stage; no separate dashboard is required. |
| 00:25-00:31 | A transformation collapses the plane to a line, and `area ×0` accompanies many-to-one examples. | The exceptional case makes non-invertibility visible. It is a change of example, not the earlier determinant-three matrix suddenly losing invertibility. |
| 00:33-00:43 | Many directions appear; two are highlighted as they retain their lines. The positive-diagonal direction is blue and labeled with multiplier 3; the negative-diagonal direction is muted violet with multiplier 1. Other arrows and grid stay gray. | For the displayed matrix with columns (2,1) and (1,2), these directions correspond to (1,1) and (1,-1). The selected colors distinguish two different invariant lines, rather than decorating one active object. Not every real matrix has this pictured structure. |
| 00:45 | A brief PageRank/eigenvector caption appears. | An application cue rather than a demonstrated PageRank derivation. |
| 00:47-00:51 | The basis/determinant/eigendirection ideas are combined with three short interpretive lines. | The recap uses already earned relationships. |
| 00:53-01:01 | Ubilum branding, a reset grid and title content appear again. | Observable reset/replay; exact source boundary remains uncertain. |

**SAT translation:** make function transformations act on three tracked points; retain point labels and outputs while the graph shifts. For slope, use one fixed coordinate frame and show exactly which coefficient changes the rise. **Do not copy:** a matrix or 3D scene for prestige, source branding, or an unexplained transformation between two unrelated examples.

Verification detail: the [retained 40-second frame](../../../out/reference-audit/204503-verify-t40.png) shows the blue x3 / violet x1 eigendirection assignment. This is a delivered-frame observation, not an inferred universal channel color code.

## Differential equations: local rule becomes global motion

`204708-mac.mov`, 53.705 seconds, silent; 27 samples on three sheets. [Matched live-grid topic](https://www.instagram.com/ubilumapp/reel/Dem2T8aOG0B/). The recording starts inside the explanation; its opening hook is unobserved. A title/reset appears near the end.

| Offset | Visible beat | What it contributes |
|---|---|---|
| 00:01-00:05 | `dy/dx=x-y`, one local slope indicator, then a whole field of arrows. | One numerical rule is applied repeatedly across space. |
| 00:07-00:11 | An initial condition selects a blue trajectory; a different start supplies a comparison. | The starting value has a visible role. The picture is not a derivation of existence and uniqueness conditions. |
| 00:13-00:17 | Input is reinterpreted as time, labels and formula change accordingly. | The relabeling has a semantic purpose. It must not hide a change in the underlying equation. |
| 00:19-00:23 | A second-order rule `d²x/dt²=-x` accompanies oscillation. | A familiar motion makes the new derivative order concrete. |
| 00:25-00:29 | Position and velocity are combined into a circular phase-space trajectory; arrows populate the surrounding plane. | A new representation removes time from the display, preserving the state. The circular picture applies to this normalized oscillator, not all phase portraits. |
| 00:31-00:37 | One arrow is split into components; `dx/dt=v`, `dv/dt=-x` appear; many initial states produce trajectories. | A vector and a system of equations acquire direct correspondence. |
| 00:39-00:45 | The rule gains a nonlinear term; paths spiral and approach one cycle. | A controlled rule change visibly changes global behavior. The samples illustrate a limit cycle; they do not prove its existence or stability. |
| 00:47-00:51 | Prior trajectories form an angled composite beneath the thesis about local rules and global motion. | The recap compresses the actual lesson, using familiar silhouettes. |
| 00:53 | Title and generic slope rule reappear. | Start/replay content; the original opening timing is not recoverable here. |

**SAT translation:** move from one table increment to a complete line, keeping the same rate visible. Contrast a changed initial value with a changed rate. The global picture should grow from a rule the viewer can check in one case. **Do not copy:** simultaneous parameter changes, a silent transition from one mathematical model to another, or a sophisticated state-space view whose axes have not been given meaning.

## Cross-overview conclusions

The recurring strength is **continuity of mathematical objects**, not a universal requirement for 3D, a title card, a map or a fixed duration. Six recordings supply five topic constructions because Calc II is duplicated. Every chapter change has a mathematical job: add an input, change a representation, refine a sum, select an initial condition or test an exceptional case. The recap recombines objects whose meanings already exist.

For our output bar, a broad orientation can be excellent if its scope is honest. A single-skill SAT lesson owes more: one decisive argument, accurate conditions and a usable recognition cue. Borrowing the overview's compression without its audience prerequisites would weaken the lesson. The exact shot rhythm and easings require continuous or denser targeted review; these tables document content milestones, not a universal editing recipe.
