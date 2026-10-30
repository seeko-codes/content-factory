# Ubilum: how the explanations are built

Detailed channel study, reviewed October 29, 2026. The reference is [@ubilumapp on Instagram](https://www.instagram.com/ubilumapp/). The most reusable decision is **continuity of meaning**: a point, region, quantity or rule remains recognizable while its representation changes. Typography, restrained color and motion make that continuity easier to follow. They do not independently explain the channel's reach.

Ubilum is one channel concept; this style study and its full clip audits are the details. [QUALITY.md](../../../QUALITY.md) remains the output authority, and [the logic](../../../LOGIC.md) explains the general principles. Use this study to choose the actual objects, comparisons and reveals in a video, rather than to reproduce another creator's branding.

## Read the evidence at the right resolution

| Study | What it contains |
|---|---|
| [Performance and engagement](ubilumapp-performance.md) / [CSV](ubilumapp-performance.csv) | Twelve accessible contemporary reel tiles, channel size, audience-relative ratios, historical engagement, verified icon meanings and comparison limits. |
| [Course-overview audit](ubilumapp-overview-audit.md) | Six recordings: Calc III, two captures of Calc II, all-calculus, linear algebra and differential equations. Timestamped constructions, equations, recaps and SAT translations. |
| [Single-concept audit](ubilumapp-single-concept-audit.md) | Five recordings: gradient, sine/cosine, integral, Taylor series and the derivative of a square. The explanatory bridge and its mathematical limitations. |
| [Advanced-topic audit](ubilumapp-advanced-capture-audit.md) | Four recordings: Birch and Swinnerton-Dyer, Yang-Mills, Mandelbrot and the fundamental theorem. Object inventories, beat tables and difficult bridges. |
| [Capture index](ubilumapp-capture-index.csv) | All fifteen originals, durations, audio availability, sample counts and the corresponding audit. |

The fifteen saved recordings cover fourteen named constructions because Calc II appears twice. An additional `e^x` reel appears incidentally at a capture boundary; it is not a fifteenth full construction review. The originals were captured October 27. The fresh inspection uses **356 sampled frames on 37 contact sheets**, approximately every two seconds, plus fresh Whisper transcripts for the eight recordings with audio. Seven Mac recordings have no audio stream. This is dense sampled visual analysis, not continuous playback, exact motion measurement, an independent voice assessment, or an examination of every upload.

The twelve contemporary public tiles and the fifteen saved recordings are different samples. We do not silently attach a tile's view count to a similarly titled saved reel. Recording timestamps include player overlays, preceding posts and replay. A return to an opening is observed replay, not evidence of an encoded frame-perfect loop. The source typefaces, native dimensions and easing curves cannot be identified exactly from these scaled recordings. Our code's exact tokens are house decisions informed by prior measurement.

## The useful 80/20

These five choices recur in the inspected material. Their recurrence is directly observable; their individual effects on views or learning are hypotheses.

| Choice | Concrete evidence | What our finished video should contain | What defeats it |
|---|---|---|---|
| Start with an object the viewer can track. | Calc III begins with curve, point and tangent; linear algebra uses basis arrows; the integral uses speed and strips. | A line, square, population or graph with an immediately readable question. | A title over an unrelated mathematical spectacle, or symbols requiring an explanation before the question can be understood. |
| Turn the object into the explanation. | Calc II retains an area readout as the curve changes; the growing square exposes the added pieces; FTC adds a narrow region. | A visible operation that changes the viewer's answer or explains why the tempting answer fails. | Motion that merely accompanies a narrated assertion. |
| Keep a correspondence through the change. | Unit-circle projection and graph; original and transformed area; matrix columns and basis-arrow landings. | Persistent labels, point identity, measured quantities or explicit before/after matching. | Untracked morphs, silently rescaled axes, stretching supposedly conserved pieces. |
| Introduce the name after a perceptible relationship. | Slices precede partial-derivative notation; directional comparison gives the gradient a referent; strips give the integral a job. | A formula whose parts already refer to visible objects. | Revealing several unfamiliar operators at once and describing the picture afterward. |
| Finish by compressing what has already happened. | Calc III revisits curve/surface/field; linear algebra revisits columns/area/eigendirections; all-calculus returns to its zoom thesis. | One answer plus the cue that tells the viewer when to use it again. | A new mathematical idea in the closing line, or a summary that sounds broader than the demonstrated result. |

These choices matter more to a SAT adaptation than recreating a surface, a particular voice or the appearance of a university course. A polished overview can establish orientation; a SAT skill lesson additionally owes a correct, inspectable answer and a usable recognition cue.

## Three different promises, three different kinds of finish

**An overview promises organization.** Calc III connects change, accumulation and fields through related objects; linear algebra gives three jobs to a matrix. The viewer may leave with a meaningful map without being able to calculate a double integral or eigenvalue. This is an appropriate finish for a bounded overview, not proof that the course has been learned.

**A single-concept explanation promises a bridge.** The integral turns speed-times-duration into many narrow contributions. The sine explanation links a rotating point to changing height. The square derivative isolates a growing border. These are stronger SAT models because one relationship can be inspected and applied nearby. The precise bridge matters: finite increments still have remainder terms; a numerical readout approaching a value is not an exact proof of its limit.

**A difficult-topic introduction promises access to a question.** BSD makes rational points concrete; Yang-Mills makes a gap visible; Mandelbrot connects iteration to membership and then reveals structure. Those are entry points. A picture of a gap does not establish the mass-gap problem, and matching example panels do not establish a conjecture. Borrow the accessible entry, then honor the smaller claim our video can actually justify.

## Asset decisions, down to the job each element does

### The page and hierarchy

The inspected source repeatedly uses a light page, dark construction and quiet supporting geometry. The Mandelbrot recording also uses a light page: a black set, gray boundary detail and a pale lavender membership backdrop. It is not a verified dark-background exception. Linear algebra uses blue and a muted second hue to distinguish basis directions, so an exact one-color rule would misdescribe the source.

For our series, [STYLE.md](../../../STYLE.md) and [src/theme.ts](../../../src/theme.ts) specify warm paper, ink, quiet rules and one principal blue. The purpose is hierarchy. The active relationship should be easier to see than the grid, previous state or platform chrome. Additional hue is justified only when persistent identities need distinguishing; color must be reinforced by position, labels or shape.

The source's recurring reading order is caption/title, then mathematical statement or readout, then the construction. A large title is useful when the drawing is already meaningful. It fails when the title occupies the space needed to read the actual reasoning. Screen-recording dimensions and zoom differ, so do not reverse-engineer native pixel measurements from a contact sheet. Our 1080-by-1920 layout and safe region are house implementation choices.

### Choose mathematical assets by role

| Asset | Observed role | SAT use | Reject when |
|---|---|---|---|
| Marked point | Carries identity through a curve, projection or field. | Link one table entry to one graph point, then one equation substitution. | The point jumps to an unrelated value without a stated operation. |
| Quiet grid / axes | Supplies a stable reference for an active object. | Make unequal axis units explicit in the slope hook. | Autoscaling changes the apparent relationship without disclosure. |
| Guide / dashed remnant | Shows correspondence or a previous state. | Keep the original graph faint during an input translation. | It resembles an extra solution or creates an unreadable trail. |
| Filled region | Makes accumulation, conservation or missing quantity visible. | Expose both `4x` strips in `(x+4)²`. | The fill is decorative or silently changes area. |
| Readout | Anchors a claim to a checkable quantity, such as `0.800` or area factor 3. | Keep base 10, height 6 and area 30 visible while a triangle's apex moves. | Rounding is presented as exactness, or the counter changes too quickly to connect to the drawing. |
| Comparison panel | Lets one difference carry the explanation. | Original population versus eligible subset; linear scale versus area scale. | The panels change several independent features at once. |
| Formula | Names a relationship the objects have already supplied. | Put `2·4x` beside the two strips before simplifying to `8x`. | Symbols float above unrelated motion. |
| Navigation / series marker | Makes a multi-part promise and current position legible. | Four honest domains in a SAT overview, with a visible current destination. | It suggests completeness the video cannot deliver or decorates a single-skill lesson. |
| Recap | Reuses already interpreted objects. | Return to the same square, now with every term accounted for. | It introduces another example before the original answer has landed. |

### Motion is a mathematical verb

The productive verbs in this set are **select, slice, grow, accumulate, project, compare, transform, trace and return**. Before animating, state what the operation preserves and what it changes. Calc II's preserved area differs from the integral's deliberately changing strip count. The distinction must survive in the final film.

A scene transition may simplify the screen; it does not establish equality. A transform that looks continuous is not automatically area-preserving. A moving point can illustrate a relation without proving it for all possible points. A camera zoom can reveal a region without changing the mathematical object. These distinctions are the difference between attractive motion and trustworthy reasoning.

Dense samples establish sequences of states. They do not justify new claims about exact easing, caption delays, frame-accurate synchronization or hold durations. Existing house timing values remain production defaults derived earlier, not newly confirmed universal source properties. Judge the resulting film at normal phone playback: can the viewer see the changing quantity and read the reason before the next operation?

### Captions and sound

The visible source captions break narration into small semantic units, keep the current text prominent and align mathematical language with the apparatus. Their strongest contribution is proximity: a word such as area, direction or slope has an identifiable object at that moment. Reproduce that alignment, not every source line break.

Eight audio tracks were transcribed; seven recordings are silent files. ASR helps recover wording but confuses mathematical words and symbols. It cannot establish vocal quality, musical absence or exact synchronization without additional listening. Prior voice and timing measurements in STYLE are attributed prior observations, not findings from this fresh still-frame audit. A human narrator should use a comfortable voice.

The source's Ubilum branding is distinct from our `ultralearn` end card and comment-keyword CTA. The latter are house choices. Do not use our CTA as evidence that the reference creator employs it, or let it consume the beat required to understand the answer.

## The opening: where the wow comes from

In Calc III, the subject is impressive because a familiar curve becomes a surface and the same point acquires new directions. The expansion is legible. The title alone does not do that work. In the inspected all-calculus recording, the first sampled surface/title may be a poster or an opening state; the recording does not settle that distinction. Avoid turning uncertain capture order into a rigid hook rule.

For SAT math, the most promising first frames are specific contradictions or compressed systems: a visually 45-degree line whose labeled units imply slope five; a square whose two missing strips visibly explain the wrong expansion; a moving triangle with a stable area. These promise a payoff the actual apparatus can deliver.

The user's map-first SAT opening is an authored experiment, not something verified as Ubilum's winning format. A useful version shows four recognizable miniatures, then enlarges the slope construction while retaining a small position cue. The four miniatures must remain readable on a phone. The map promises orientation across four domains; a slope-only film must not claim to have covered all SAT math. Once the local question starts, clear the unused map if it competes with the proof.

## Three concrete adaptations for the revised slate

These are proposed executions, not observed Ubilum videos or performance predictions. Brief IDs link to the [active twenty](../../today-2026-10-29-v2.md).

### V2-01: a line that looks like slope one but has slope five

**First frame:** a large diagonal, two marked points `(0,10)` and `(4,30)`, and unequal labeled axis units. Ask why one square up and one square across is not enough. **Operation:** freeze the line; expose horizontal change 4 and vertical change 20 in the actual units. **Readout:** `20/4=5`, adjacent to the same rise/run triangle. **Payoff:** slope measures changes in coordinate values, not the apparent angle on an arbitrarily scaled display. **Transfer cue:** check the axis units before reading rise over run.

This borrows Ubilum's persistent object and nearby measurement. It must not hide scale labels merely to manufacture a trick. The counterexample tests a familiar shortcut; it does not make diagrams inherently untrustworthy.

### V2-02: the two missing strips

**First frame:** a square of side `x+4`, already partitioned into an `x²` region, a 16-square corner and two unlabeled strips. Show the tempting `x²+16` as a candidate, not a conclusion. **Operation:** separate each strip just enough to expose lengths `x` and 4 while retaining correspondence to the square. **Readout:** each strip contributes `4x`; both contribute `8x`. **Payoff:** `(x+4)²=x²+8x+16`. With `x=3`, the omitted 24 reconciles 25 and 49. **Transfer cue:** a binomial square has two cross-product regions.

This borrows the integral/FTC pattern of selecting one contribution before showing the total. The nonnegative-length picture supports the geometric case; algebra extends the identity to real inputs. Reject stretching pieces or narrating the missing term before the viewer can identify its source.

### V2-06: move the apex, preserve the area

**First frame:** a triangle with base 10, height 6 and area 30. **Operation:** slide the apex along a line parallel to the base. Keep the base, perpendicular height and area readout fixed while the sloping sides change. **Payoff:** every displayed triangle has area `½·10·6=30`. **Transfer cue:** a changing slanted side does not change area when base and perpendicular height stay fixed.

This borrows Calc II's measured invariant and linear algebra's attention to area. The animation illustrates a general argument supplied by the fixed-base/fixed-height formula. It does not prove all shapes with similar silhouettes have equal area. Keep the height perpendicular and indicate its foot even if it lies outside the base segment.

## How this maps to our principles

| Principle | Ubilum manifestation | Confidence / limit |
|---|---|---|
| P1 - Recognizable question | A familiar symbol or named subject becomes a concrete point, speed, region or direction problem. | Observed repeatedly; whether the same question matters to SAT viewers needs domain judgment. |
| P2 - Credible opening contract | A bounded overview, a why-question or an accessible introduction has a corresponding finish. | Inspectable promise alignment; not evidence that broad titles always outperform narrow ones. |
| P3 - Inspectable progress | One quantity or construction persists across successive operations. | Strong direct visual evidence; exact pacing and learning outcomes were not measured here. |
| P4 - Visual reasoning | Strips, projections, borders and matrix columns supply interpretable relationships. | Especially strong in local constructions. Some advanced-topic bridges remain illustrative rather than proved. |
| P5 - Low search burden | Quiet scaffolding, local labels, a dominant construction and a limited active comparison. | Observable composition; no eye-tracking or cognitive-load measurement. |
| P6 - Earned result | A recap compresses known objects into a thesis; a local lesson supplies a relationship. | Depends on promise type. A useful overview is not interchangeable with a worked SAT solution. |

The principles organize useful observations, but this is not a clean predictive validation. We selected an admired channel, then inspected a limited saved sample. Public views and current followers confound age, distribution, audience history and packaging. The broader [outcome-blinded exercise](../../math-animation-principle-test.md) also separates editorial quality from reach and remains exploratory.

## What must not survive into a finished video

These are output defects, not guarantees of algorithmic failure:

- A representation changes the mathematical claim silently: units, domain, conserved area, eligible population or input correspondence.
- The decisive inference exists only in narration while the drawing performs an unrelated action.
- An approximation, sampled trajectory or finite example is presented as an exact universal result.
- A source's advanced topic is borrowed for prestige without a legible relationship or bounded payoff.
- Several objects move independently and the viewer cannot identify the one change that matters.
- A recap claims mastery, complete coverage or a theorem the preceding construction did not establish.
- A clever hook relies on withholding necessary labels, rather than exposing a fair misconception.
- Captions, notation and platform overlays compete for the same space at normal phone size.
- The branding or CTA displaces the answer, or another creator's identity is copied as our own.

The reference offers a particularly useful standard: after the visual operation, the viewer should be able to point to the object that explains the sentence. For our SAT lessons, add one more requirement: that relationship must justify the answer and support a nearby problem. That is the transferable output bar.
