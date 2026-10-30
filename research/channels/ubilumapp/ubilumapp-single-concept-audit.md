# Ubilum single-concept references: five capture audit

Audit date: 2026-10-29. Reference-capture date: 2026-10-27, as recorded in [STYLE.md](../../../STYLE.md). This is a close study of five local screen recordings, not a current public-channel performance audit. The original local media remain in `samples/`; extracted frames and ASR remain temporary and are not copied here.

The most useful common construction is a familiar object that changes while its meaning stays inspectable: a point on a hill, a rotating radius, speed rectangles, a polynomial against a fixed curve, or a square gaining two strips. Their payoffs differ. The gradient earns an intuition; the sine clip connects two representations; the integral illustrates a limiting sum; Taylor exposes the limits of finite approximation; the square supplies an exact finite decomposition followed by a limit. Those are different levels of mathematical support, even when all finish with a compact identity or thesis.

## Review scope and timestamp convention

I read all four phone captures' fresh `base.en` ASR `.txt` and `.srt` files and inspected every prepared contact sheet for these five captures: `contact-1.jpg` and `contact-2.jpg` in each directory, ten sheets total. There was no third sheet for any of these five. This covers 79 sampled images, at nominal odd-second recording offsets. I also enlarged the sine construction around 11 seconds and its graph/counters around 19 seconds, the integral's 32-strip readout around 15 seconds, and revisited the sine and square sheets. This was sampled visual review plus ASR reading, not continuous playback or direct listening. It cannot establish exact transition durations, vocal delivery, music, mixing, or frame-perfect caption synchronization.

All times below are **recording offsets**, not original-reel timestamps. A label such as `00:11` denotes the supplied nominal sample; the extraction was reported to be about one frame before its label, approximately 0.033 seconds for phone and 0.017 seconds for the Mac recording. This difference does not justify subsecond timing claims. Rows spanning several labels summarize those visible samples, not unseen intermediate motion. ASR gives additional language and rough sequencing, not proof that every word was displayed at a particular sample.

| Recording | File duration | Prepared samples reviewed | Coverage boundary |
|---|---:|---|---|
| `204947-phone` | 30.632 s | 00:01 through 00:29, every 2 s; 15 images | Gradient opening already in progress; last sample is phone Control Center. |
| `205033-phone` | 31.287 s | 00:01 through 00:31; 16 images | Same sine post is repositioned near the start; logo at 00:29, Control Center at 00:31. |
| `205115-phone` | 29.322 s | 00:01 through 00:29; 15 images | Integral opening through logo; Control Center obscures 00:29. |
| `205155-phone` | 32.612 s | 00:01 through 00:31; 16 images | Taylor opening through thesis; a different exponential reel appears by 00:29. |
| `205216-mac` | 34.572 s | 00:01 through 00:33; 17 images | Earlier vector-field content and a profile grid precede the square reel. No audio track. |

The phone ASR sometimes substitutes “sign” for sine and misrecognizes sum/whole and the integral hook. Visible formulas and captions disambiguate these. Such ASR errors are not evidence that the narrator made those errors. Trailing `[BLANK_AUDIO]` segments, including timestamps beyond a file's actual duration, supply no usable spoken evidence. No claims about a source reel's complete duration, replay count, seamless loop, or omitted CTA follow from these recordings.

Historical engagement UI is visible in some phone samples, but this audit makes no performance comparison. In particular, a profile tile whose topic cannot be confidently mapped is not a metric for the current reel. In the sine capture, 4,629 is visibly beside the paper-plane icon, while the bookmark has no displayed count; it must not be relabeled a directly observed save count. These are older capture observations, not current public counts.

## 204947-phone: the gradient as the direction uphill

### Boundary, hook, and promise

The first ASR phrase begins mid-thought, describing which way is uphill. The first sampled caption contains the scary-symbol framing, and a large `∇f` floats above a wireframe landscape. Thus the visible promise is to give the symbol a concrete directional meaning. It is not an opening that derives partial derivatives or guarantees an optimization algorithm. No different preceding reel is visible in these samples, but the partial opening prevents a claim that the recording includes every opening word. The final unobscured samples are the landscape and a point, followed by Control Center at 00:29.

### Visible sequence

| Offset | Observed state and explanatory advance |
|---|---|
| 00:01, 00:03 | A large gradient symbol is paired with the uphill caption and a gray wireframe hill. By 00:03 a black location point is visible and the symbol is less prominent. The notation is attached to a place rather than introduced as a calculation. |
| 00:05 | The surface is larger in the composition. The point supplies the local reference for what follows; this is not yet a path across the whole surface. |
| 00:07 | A fan of arrows radiates from the point under the claim that one could step in any direction. Alternatives are made simultaneous rather than merely listed. |
| 00:09, 00:11 | A translucent tilted disk or plane and spokes accompany the contrast between climbing and dropping, then the search for the fastest climb. The construction suggests directional comparison; no numerical slope readouts are supplied. |
| 00:13 | Most alternatives clear. One blue arrow extends from the point, with a dotted vertical guide toward the landscape near its end. The selection is now inspectable. |
| 00:15 | The retained arrow receives the `∇f` label and the caption names the selected direction. Naming follows the visual selection. |
| 00:17 | The arrow and label remain while the language shifts to its length and steepness. The camera/view has changed, so screen length is not an independently calibrated measurement. |
| 00:19, 00:21 | The direction is reversed, and `-∇f` appears with the downhill-fastest claim. The point and arrow now occupy a different part of the surface composition. |
| 00:23, 00:25 | Successive-step language leads toward gradient descent. The visible point is later lower in the landscape. The sampled sequence does not expose each step size or a full optimization trace. |
| 00:27, 00:29 | A comparatively clear landscape/point ending is followed by phone Control Center. No source logo or CTA is established by these samples. |

### Spatial objects and decisive inference

The persistent landscape gives height a familiar meaning. The point establishes a common starting location; the fan establishes competing directions; the blue arrow selects one. This is stronger than drawing a decorative hill behind a definition because the alternatives are represented before the answer is named. The decisive inference is local: among equal-length possible moves in the input plane, one direction has the largest first-order increase in height. Reversing that vector selects the largest first-order decrease.

There are two spaces to keep distinct. Inputs live in the horizontal domain, and the graph of `f` supplies height. A gradient vector belongs to the input space; it is not automatically a literal arrow tangent to the drawn 3D surface. The dotted guide helps associate a move with a height, but the camera projection alone cannot establish quantitative steepness. A tilted disk with spokes supplies intuition for local changes, not a measured table proving which spoke is largest.

### What is earned, and what needs conditions

For a differentiable scalar function in Euclidean coordinates, the directional derivative in a unit direction `u` is `∇f · u`. Its maximum is `||∇f||`, attained in the gradient direction when the gradient is nonzero. This explains both the selected direction and the length claim. Those mathematical facts are the conditions behind the image, not formulas independently derived in the visible samples.

“Fastest” must compare directions using the same input-step length and coordinate metric. A longer step, rescaled axes, or a different metric changes the comparison. At `∇f = 0`, a unique preferred direction need not exist, and the point need not be a minimum. A single downhill arrow is a local statement; a finite discrete update can overshoot, increase the function with an excessive step size, encounter a saddle, or reach a nonglobal local minimum. The descent ending does not earn a universal convergence or global-optimum promise.

The captions carry the sequence of questions and names; the landscape and competing arrows supply the relationships. This division works for demystification. It would be inadequate for a promise to teach computation of a gradient, establish a convergence theorem, or let a learner solve a new multivariable derivative problem.

### Closing, CTA, and SAT adaptation

The descent thesis compresses the hill metaphor into a recognizable application. No CTA is visible in the inspected gradient ending. Control Center is a recording action, not a designed ending or loop. No loop is established.

A useful SAT adaptation should preserve **comparison of changes from the same starting point**, while replacing multivariable calculus with an actual SAT-level relationship. For example, place `y = 2x + 1` and `y = -x + 1` through the same point `(0,1)` on one fixed coordinate system. Ask which change is larger when the input increases by 2. Keep a common horizontal run of 2 visible: the first line rises 4 and the second falls 2. Move the two vertical changes into labeled `4/2 = 2` and `-2/2 = -1` slope ratios. The earned payoff is that slope compares change per equal input, with sign and magnitude separate. A nearby transfer using `(1,3)` and `(4,9)` gives slope `(9-3)/(4-1) = 2`.

Failure conditions: do not compare apparent screen angles after independent auto-scaling; do not use arrows of unequal horizontal run as direct slope comparisons; do not confuse a negative slope with a small absolute rate; and do not position gradients or optimization as SAT content. The recognition cue is “compare output change for the same input change,” not “pick the arrow that looks steepest.” This is an original adaptation of the visual logic, not an observed problem in the reference.

## 205033-phone: why differentiating sine produces cosine

### Boundary, hook, and promise

At 00:01 a large `sin x` is visible while the post is being repositioned. By 00:03 the hook asks why sine turns into cosine, with `sin x` above a downward arrow and blue `cos x` below. The surrounding post interface is retained. This supports the identity of the same target reel; it does not establish a previous replay. A logo appears at 00:29, and Control Center at 00:31 ends usable review.

The promise is specifically explanatory: the derivative identity should feel related to an understandable changing quantity. Showing sine and cosine as two unrelated finished curves would not satisfy it. The clip supplies an intermediate circle and changing height, then transfers that rate to a second graph.

### Visible sequence

| Offset | Observed state and explanatory advance |
|---|---|
| 00:01, 00:03 | The familiar function name becomes a question and a target identity. The blue answer is initially presented without its reason. |
| 00:05 | A circle on the left contains a radius and moving point; a dashed horizontal guide links the point's height to a developing curve on the right. The height caption is partly obscured by the phone volume overlay. |
| 00:07 | A black sine graph is complete on the right, while the circle point is at the rightmost position and a lower, faint cosine baseline is prepared. This gives the circle motion and graph a shared height meaning. |
| 00:09 | The circle is enlarged. A blue upward arrow at the rightmost point makes vertical change salient alongside the fastest-climb claim in the nearby ASR. |
| 00:11 | A point near the top of the circle, a slanted tangent-like arrow, a blue vertical component arrow, and a dashed construction are visible. The point is not exactly at the mathematical top in this sample. The ASR's top/stopping statement must not be judged from this one intermediate phase alone. |
| 00:13, 00:15 | The point progresses to the left side and then lower-left; the blue component points downward. The change of sign is visible rather than conveyed only by the word “falls.” |
| 00:17, 00:19 | The circle clears. A point and tangent on the upper sine graph are linked by a vertical dashed guide to a signed blue value on the lower graph. The caption explicitly calls this the slope of sine. |
| 00:21, 00:23 | The upper point is on a rising part of sine, and the matched lower blue value is positive. The lower trace resolves into a complete cosine curve. Two cases help distinguish the lower curve from a copied height graph. |
| 00:25, 00:27 | `d/dx sin x = cos x` appears above the two graphs, with linked markers retained. The closing idea is the rate of sine's change. |
| 00:29, 00:31 | Ubilum logo, then Control Center. There is no sampled post-logo return to the opening. |

### Spatial objects and the actual chain of reasoning

The circle point, its vertical projection, the upper sine curve, the upper curve's tangent, and the lower cosine curve have different roles. The height of a unit-circle point is sine. Its **signed vertical rate** is a derivative with respect to angle, provided angle is measured in radians and advances at the assumed rate. That rate becomes the tangent slope of the sine graph when the graph's horizontal coordinate is that angle. The blue lower graph encodes those signed slopes.

The visual transition from a circle to stacked graphs is therefore the core payoff. It lets a learner see a negative lower value when the upper graph falls, zero near a peak or trough, and a positive lower value when it rises. The dashed guide preserves the shared input. The final formula names that correspondence after it has been made visible.

### Projection is not slope: essential failure modes

The safe mathematical account is `P(θ) = (cos θ, sin θ)` and, for unit angular speed, `P'(θ) = (-sin θ, cos θ)`. The vertical component of that tangent velocity is `cos θ`. Thus `d(sin θ)/dθ = cos θ`. The equality is not proved by saying “the horizontal coordinate is cosine, so it must be the derivative.” The construction needs the relation between rotation and tangent velocity, including its scale.

Nor is cosine the tangent slope of the **circle**. Where the circle can locally be expressed as `y(x)`, its slope is `dy/dx = -cos θ/sin θ`, when `sin θ ≠ 0`. The tangent slope of the **sine graph** against angle is a different derivative. Using the same word “slope” for the circle arrow and sine graph without this distinction would teach a false rule.

“Speed” is convenient spoken language but mathematically incomplete here: speed is nonnegative, while vertical velocity and cosine can be negative. A reproduction should say signed rate or show the direction/sign unmistakably. With angle `θ = ωt`, the time derivative is `ω cos(ωt)`; a radius `R` contributes another factor. With degrees rather than radians the derivative includes `π/180`. A circle with an unmarked radius, an arbitrary animation speed, or a graph whose horizontal coordinate is not identified can silently hide these conditions.

At nominal 00:11 the blue component is nonzero because the point is merely near the top. This is not evidence of an incorrect zero-at-top claim. Conversely, a sampled animation cannot verify exact zero alignment between the spoken clause and the true top. The rigorous limit behind the sine derivative, such as the small-angle limit, is not derived in these samples. The clip earns a geometric mechanism and sign pattern; it is not a complete proof from elementary limit definitions.

### Captions, closing, and SAT adaptation

Captions progress from height to climbing rate to graph slope to the cosine name. The formula arrives after the graph relationship. This sequencing earns the demystification promise more convincingly than the initial identity alone, but a learner still needs the input variable and unit-angle conditions for formal transfer. No CTA is visible before the logo, and no seamless loop is established.

An SAT adaptation should use the circle-to-coordinate relationship and stop before calculus. Draw a unit circle with a first-quadrant point `(3/5,4/5)`, then drop perpendiculars to make the right triangle explicit. Ask which number is sine and which is cosine. Keep the radius labeled 1 and the horizontal and vertical legs attached to their coordinates. Reveal `cos θ = (3/5)/1` and `sin θ = (4/5)/1`; then reflect the point into quadrant II to show `cos θ = -3/5` while `sin θ = 4/5`. The visual invariant is radius and height, while the horizontal sign changes. Transfer: for `(-5/13,12/13)` on the unit circle, sine is `12/13` and cosine is `-5/13`.

Failure conditions: no derivative promise in an SAT lesson; do not call a coordinate a tangent slope; do not swap opposite and adjacent when the marked angle moves; keep the center, angle, axes, signs, and radius readable. If the radius is not 1, coordinates are divided by the radius. The recognition cue is “unit-circle height is sine, horizontal coordinate is cosine,” which is useful without making any rate claim.

## 205115-phone: what the integral symbol does

### Boundary, hook, and promise

The first sample already contains `∫₀⁴ v(t) dt` and a question about the symbol. The post interface includes text from surrounding content near the top; that is not evidence of an earlier different video playing inside this recording. The target proceeds through a speed graph, finite sums, an integral, and a logo at 00:27. Control Center at 00:29 obscures the last sample.

The promise is to give the symbol an operation the viewer can understand. Starting with speed times time is well chosen: it gives one rectangle a known meaning before the unknown notation is explained. The final exact numerical distance, however, needs separate scrutiny from the conceptual explanation of integration.

### Visible sequence

| Offset | Observed state and explanatory advance |
|---|---|
| 00:01 | A large definite integral is the object to decode. Its limits 0 and 4 and integrand `v(t)` establish a bounded accumulation question. |
| 00:03, 00:05 | A positive, increasing, concave-down speed curve appears on an interval from 0 to 4 seconds, with speed units in m/s and `distance = ?`. The unknown is attached to a physical quantity. |
| 00:07 | One outlined blue rectangle spans one second, from approximately 2 to 3 on the time axis, at a displayed height of 5.4 m/s. A single tractable piece replaces the whole curve. |
| 00:09 | The multiplication `5.4 m/s × 1 s = 5.4 m` is displayed, and the rectangle carries the corresponding distance. The caption states speed times time. |
| 00:11 | Four left-endpoint rectangles with heights 1.8, 3.9, 5.4, and 6.3 are shown together. Their sum is displayed before the final readout. |
| 00:13 | The four-strip total resolves to approximately 17.4 m. This is checkable: `1.8 + 3.9 + 5.4 + 6.3 = 17.4`, with one-second widths. |
| 00:15 | The counter reads 32 strips, the expression is `Σ v · Δt`, and the total is approximately 19.56 m. Smaller gaps are visible below the curve. |
| 00:17 | The counter reads 1024 strips and the displayed total is approximately 19.99 m. The outlines are now close to a continuous filled region. |
| 00:19, 00:21 | The filled region is retained; the readout becomes 20 m, and the sum notation yields to `∫₀⁴ v(t) dt`. Finite refinement is being promoted to the limiting operation. |
| 00:23, 00:25 | The integral equals 20 m above the filled graph. The closing caption describes adding tiny pieces into a whole. |
| 00:27, 00:29 | Logo, then Control Center. Neither is mathematical evidence for the exact value. |

### Spatial objects and decisive inference

One coordinate system, one speed curve, and one distance readout persist as the rectangles multiply. This lets the learner compare approximations against a common target. The changing strip count is meaningful because widths shrink across the same total time interval. The crucial known-to-new bridge is dimensional: `(m/s) × s = m`. Summing many such pieces approximates total distance, and the integral names the limit.

The 5.4 rectangle and the graph above it are deliberately different objects. The rectangle is the distance traveled **if** that sampled speed is held throughout the whole second. With a genuinely changing speed, it is an approximation to that second's actual distance. The formula's product is exact for the rectangle; it is not thereby exact for the curved region. Keeping this distinction is central to an honest adaptation.

### Finite strips, the limit, and the exact 20

Because the shown speed is positive, its integral can represent total distance. If `v` means signed velocity, the same integral gives displacement; total distance requires `∫ |v(t)| dt`. A reproduction must choose its physical meaning consistently rather than label a signed graph “speed.”

The displayed four-strip arithmetic is independently checkable. The 32- and 1024-strip readouts visibly support convergence toward about 20. They do not by themselves prove an exact limit of 20. No explicit function for the drawn speed curve is supplied in these samples, so the asserted exact integral cannot be recomputed analytically from the visible premises. A smooth-looking curve and three numerical approximations leave many possible underlying curves. The appropriate evidence claim is “the clip asserts a 20 m limiting target and illustrates convergence toward it,” not “the contact sheets independently prove exactly 20 m.”

For an integrable function, mesh size must tend to zero over the same interval; finite `N = 1024` still produces an approximation. An approximation sign cannot become equality merely because screen gaps disappear. The conceptual shift from sum to integral is earned by the refinement construction; the exact numerical value is supported less completely. The long-S explanation helps remember the notation but is not a proof of the limit or a calculation of the area.

### Captions, closing, and SAT adaptation

Caption clauses name the active object as the display changes: freeze one speed, multiply, add, refine, then name the integral. The formula/readout layer carries numbers and units while captions carry the question and operation. This is a useful model for avoiding captions that merely duplicate every symbol. The closing thesis returns to accumulation rather than replacing the answer with a CTA. No CTA or opening replay is established in the reviewed samples.

A direct SAT adaptation can make the rectangles **exact** by using piecewise-constant speeds. Show a 3-hour trip: 30 mph for 2 hours, then 60 mph for 1 hour. Draw the two labeled rectangles and move their areas into `30 × 2 + 60 × 1 = 120 miles`. Then divide the total distance by the full 3 hours to earn average speed 40 mph. The asymmetry is the insight: the speeds cannot be averaged without weighting their durations. Transfer: 20 mph for 1.5 hours and 50 mph for 0.5 hour gives `30 + 25 = 55 miles` in 2 hours, hence 27.5 mph.

Failure conditions: a sloping speed curve cannot be treated as constant-speed rectangles without an approximation label; equal-width-looking rectangles cannot stand for unequal durations unless axes and labels preserve the actual widths; average speed uses total time, not a casual average of speed labels; units must agree. No integral notation is needed for this SAT promise. If a linear speed graph is chosen instead, a trapezoid can give exact area, but linearity and the relevant geometry must be stated. A rendered curve alone is insufficient.

## 205155-phone: a finite polynomial approaches sine, then breaks away

### Boundary, hook, and promise

The target opens on a never-ending expression and a sine curve. The ASR begins with a claim that the expression is secretly a sine wave; the visible formula identifies alternating odd powers and factorial denominators. By 00:29 a different reel asking about `eˣ` and its derivative has appeared, and the ASR also contains that next hook. That exponential question belongs to the next post, not the Taylor explanation's recap or CTA. At 00:31 Control Center covers the new post.

This reference has a particularly useful promise/payoff structure: it first makes agreement impressive, then challenges its own apparent success by changing the viewing window. The zoom-out is a mathematical limitation, not merely a camera flourish.

### Visible sequence

| Offset | Observed state and explanatory advance |
|---|---|
| 00:01, 00:03 | The series `x - x³/3! + x⁵/5! - x⁷/7! + …` sits above a black sine graph. The opening asks the viewer to reconcile algebraic terms with a wave. |
| 00:05 | Only the first term is emphasized; the counter reads one term and a blue line is compared with the gray/black sine reference. A single simple approximation is made visible. |
| 00:07, 00:09 | The subtract-next language leads to a two-term cubic. The blue graph bends, and the emphasized formula terms identify why it is a different object. |
| 00:11 | Three terms are active. The added positive fifth-power term bends the approximation back toward the fixed sine curve. |
| 00:13 | Four terms are active. The central fit improves, and the displayed interval of agreement is broader. The target curve remains the comparison reference. |
| 00:15, 00:17 | The counter reaches nine and then ten terms. Within the current window the curves are visually hard to distinguish; the caption names that apparent agreement. |
| 00:19, 00:21 | The view expands while the counter remains at ten terms. The blue polynomial peels away toward the edge of the larger window. The previous visual success is explicitly bounded. |
| 00:23 | Eighteen terms are displayed, and the approximation again follows sine across more of the wider view. More terms and more range are connected. |
| 00:25, 00:27 | The infinite expression is written equal to `sin x`; the closing caption names the Taylor series. The final identity contrasts with every finite truncation. |
| 00:29, 00:31 | A separate exponential-derivative reel appears, then Control Center. This is a captured feed transition, not evidence of an intentional Taylor-to-exponential ending. |

### Spatial objects and decisive inference

The finite blue approximation and fixed sine curve carry the argument. Formula emphasis and a term count bind each shape to a specific truncation. The zoom-out supplies a counterexample to the tempting conclusion that pixel-level agreement proves equality. Because the term count stays at ten during the wider view, the divergence is interpretable as a limitation of the same approximation rather than a new function being substituted.

That two-stage payoff is more precise than “more terms make a better graph.” A viewer sees why a useful finite approximation need not be an identity. Increasing to eighteen terms after the breakaway gives progress without hiding the first failure. The infinite-series identity is the final claim, not a license to call the ten-term graph exactly sine.

### What the demonstration does and does not prove

The displayed expansion is the Maclaurin series for sine, a Taylor series centered at zero. Strictly, an infinite power series is not a polynomial: a polynomial has finitely many terms. The opening's informal “never-ending polynomial” phrase should be understood as an accessible description of the expression, not copied as a formal definition.

No nonconstant finite polynomial equals sine on the whole real line: a polynomial is unbounded in at least one direction while sine is bounded. A finite window can conceal that global difference. With `N` nonzero displayed terms, the usual sine truncation has degree `2N - 1`; the exact coefficient/raster accuracy of every rendered high-order curve was not independently reconstructed here.

The samples illustrate increasing agreement, but do not prove convergence or derive the factorial coefficients. For sine, a Taylor remainder bound can justify convergence at each fixed real input because powers of a fixed input are eventually dominated by the factorial. This mathematical support is outside the displayed proof. It should not be generalized to “every function equals its Taylor series,” nor to uniform approximation on the entire real line by a fixed truncation. More terms need not reduce absolute error monotonically at every input and every intermediate truncation. The intended claim should remain about the illustrated sine expansion and a specified range/accuracy. Radian input is implicit in the usual coefficients.

### Captions, closing, and SAT adaptation

Captions announce the algebraic operation, formula emphasis identifies the active term, and the curve shows the consequence. The zoom-out clause is especially effective because it changes the question from “can these look alike?” to “over what range do they agree?” The final Taylor name follows the demonstrated behavior. The capture does not establish a logo, CTA, or replay of this target after the thesis; the next observed content is another reel.

An SAT adaptation can preserve **finite agreement versus an identity** without teaching Taylor series. Compare `f(x) = x²` with `g(x) = x` on one set of axes. At `x = 0` and `x = 1`, the outputs match; a cropped view or two-row table tempts the conclusion that the rules agree. Expand the table to `x = 2, 3` and the graph window: squares give `0,1,4,9`, while the line gives `0,1,2,3`. Then solve `x² = x` by `x(x-1) = 0`, earning exactly two intersections, 0 and 1. This turns a visual counterexample into a checked algebraic statement. Transfer: `x² = 2x` has intersections at 0 and 2.

Failure conditions: two agreeing inputs cannot prove function equality; a visual separation alone cannot prove there are exactly two intersections; the factorization must supply completeness; do not call a line a best approximation without defining a criterion; do not use a new camera scale to imply the functions themselves changed. The recognition cue is “matching examples do not establish an identity.” This is an original SAT adaptation of the reference's finite-window reversal, not a claim that power series are SAT material.

## 205216-mac: why the derivative of a square is twice its side

### Boundary, hook, and promise

This 34.572-second recording contains no audio track. At 00:01 it shows different vector-field material, and at 00:03 a profile grid. The square reel's hook is visible by 00:05. Therefore the file duration is not the target reel's clean duration, and the earlier profile tiles are not evidence about this target's performance. No spoken wording, delivery, or audio-caption agreement can be assessed.

The hook asks why `x²` turns into `2x`. The target makes the derivative a geometric growth question. Its especially valuable feature is that both added strips and the small corner are preserved before division and a displayed limit. The qualification is that derivative notation appears while a finite difference quotient is still being decomposed.

### Visible sequence

| Offset | Observed state and explanatory advance |
|---|---|
| 00:01, 00:03 | Different vector-field content, then a profile grid. These are navigation/boundary evidence, not part of the square argument. |
| 00:05, 00:07 | The target asks why `x²` becomes `2x`; a square resolves with side `x` and interior `x²`. The algebraic object gains an area interpretation. |
| 00:09 | The square remains under the beginning of an explanatory caption. Its identity and original side length stay available before the change. |
| 00:11, 00:13 | Growth is added along two adjacent sides. Blue strips and a lighter corner extend the square; `dx` labels identify the added thickness. |
| 00:15, 00:17 | The two long pieces are identified as `x` by `dx`; the small corner remains a separate object. The new area is not just two strips. |
| 00:19 | Added pieces detach from the gray original square. Their separation makes clear which area is the increment rather than the original total. |
| 00:21 | The strips rearrange into one horizontal row with the corner retained. Labels associate the pieces with `x dx`, `x dx`, and `dx²`. |
| 00:23, 00:25 | A caption says to divide by thickness `dx`; the row is read as lengths `x`, `x`, and `dx`, joined by plus signs. Derivative notation is already visible above. |
| 00:27 | `dx → 0` appears while `x + x + dx` is still displayed. This is the explicit justification for removing the residual term. |
| 00:29, 00:31 | The row becomes `2x`, and the final derivative identity is displayed with a small square-growth recap. The 00:31 caption is incomplete in the sample, so its full final sentence is not reconstructed. |
| 00:33 | Ubilum logo. The last unsampled fraction of the file does not establish a loop or CTA. |

### Exact finite geometry before the limit

For a positive original side `x` and a positive finite increment `h`, the new area is `(x+h)²`. The added region consists of two `x × h` strips and one `h × h` corner:

`ΔA = (x+h)² - x² = 2xh + h²`.

This finite decomposition is exact. Dividing by the common nonzero thickness gives

`ΔA/h = 2x + h`.

Only after the limit `h → 0` does the derivative become `2x`. That is the mathematical reason the corner disappears from the final answer. The corner's area is `h²`, but **after division** its contribution is `h`, which still needs the limit. Calling the corner “tiny” does not make it zero for a finite increment.

The detached row is a useful geometric division: pieces with common height `h` can be compared through their combined width. It should not be read as physically flattening area into length while claiming area preservation. The quantities have changed units from area to area per unit side length. With dimensional side units, `ΔA` has square units and `ΔA/h` has length units.

### Where the notation can overstate the result

At 00:23-00:27, `d/dx x²` appears while the displayed row still includes the finite residual `dx`. The samples therefore risk identifying the derivative with `2x + dx` before the limit has been taken. A more precise reproduction would label this intermediate object `( (x+h)² - x² ) / h`, then replace it by the derivative only after `h → 0`. The final identity is correct, and the visible limit is a real explanatory step; the intermediate notation deserves correction if copied.

A differential `dA = 2x dx` is not the same as the exact finite change `ΔA = 2x h + h²`. Choosing differential notation for the thickness can conceal this distinction. Using `h` or `Δx` for the finite construction and `lim` for the transition is clearer for a proof-oriented lesson.

The picture assumes nonnegative side lengths and shows outward growth. It does not on its own prove the derivative at negative inputs or a two-sided limit. Algebra supplies that broader result for all real `x`: the same difference quotient simplifies to `2x+h` for `h ≠ 0`, with no positive-length interpretation required. At zero the positive-side picture suggests the result but is not a full two-sided proof. The promised scope should fit the demonstrated argument, or include the algebraic extension explicitly.

### Captions, closing, and SAT adaptation

Without audio, only the visible caption structure is assessable. Captions name growth, strips, division, and the disappearing residual while labels preserve the pieces' identities. The original square turns gray rather than vanishing, maintaining the distinction between total area and added area. The final small diagram recalls the source of `2x`; the logo does not replace the result. There is no sampled CTA and no established replay.

The strongest SAT adaptation is the **exact finite increment**, with no derivative promise. Start with a 20-by-20 square and increase each side to 21. Ask why the area rises by 41 rather than 40. Keep the original 400 square units gray, reveal two `20 × 1` strips, then preserve the `1 × 1` corner. Rearrange only the added pieces and write `20 + 20 + 1 = 41`, checked against `21² - 20² = 441 - 400`. Generalize to `(n+1)² - n² = 2n + 1`, with positive integer side lengths if using unit tiles. Transfer: `31² - 30² = 61`.

Failure conditions: the corner must never vanish for an increment of 1; replacing the exact answer by `2n` would import a derivative approximation into a finite SAT calculation. Do not overlap-count the corner by extending both strips across the full new side; use two old-side-length strips plus one corner. Maintain the distinction between area added and total new area, and between side units and square units. If generalizing to a variable finite increment, retain `h²` in `2nh+h²`; if a negative or noninteger algebraic domain is promised, a tile picture alone cannot establish it. The recognition cue is “growing both sides creates two strips and a corner,” which earns a reusable expansion and an exact answer without calculus.

## What to carry into our briefs

These references support several concrete craft choices, with limits:

- Keep one object stable while changing one mathematically meaningful feature: direction at a point, angle on a circle, strip width, number of terms, or side increment. This makes the comparison inspectable.
- Give alternatives or a failed approximation screen time. The gradient's fan, the finite rectangles, Taylor's breakaway, and the square's corner are substantive steps, not interruptions to the answer.
- Let a label name a relationship already represented. A final symbol is earned when the picture has supplied its operation or correspondence; naming alone does not supply a proof.
- Separate the promise from proof completeness. A bounded “what this means” intuition can succeed without a formal theorem. A promise of an exact number, a universal identity, or a transferable solving method needs the premises and decisive reasoning for that stronger claim.
- Preserve finite-versus-limiting distinctions in the actual video. The integral's finite strip counts and the square's remaining `dx` are approximations or finite quotients until the relevant limit. A small invisible error is not automatically zero.
- Borrow visual logic for SAT, not advanced-topic labels. Each proposed adaptation above has a checked main answer, checked transfer answer, recognition cue, and explicit failure conditions. None is a reconstruction of an official released question or a claim about SAT frequency.

This audit does not establish that any construction caused public performance, that every caption was synchronized to speech, or that the source videos meet every requirement of [QUALITY.md](../../../QUALITY.md). It identifies what these specific sampled captures make visible and where an adaptation needs tighter mathematics.
