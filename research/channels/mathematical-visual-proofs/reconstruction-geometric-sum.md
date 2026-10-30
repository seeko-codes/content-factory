# Mathematical Visual Proofs: finite geometric sum as a rectangle

Source: [official 59-second Short](https://www.youtube.com/shorts/Evbsk8yuoSQ), observed October 29, 2026. Public snapshot 44,391 views; current audience 260,000 subscribers; 0.171 cumulative views/current subscriber. This is a lower-performing within-channel construction contrast, not a viral winner. The same channel has independently reviewed multimillion-view animated Shorts. Retain this example for its particular geometry and explicit mathematical sequence.

## Approximate registration for a new portrait composition

The public source stream is 360x640; review frames were proportionally scaled to 270x480. At the settled stack, the scale's x is approximately 0.33W, with the right rectangle edge near 0.667W. The lower coordinate 1 is around y=0.80H and the upper x^k endpoint around y=0.20H. The top conditions sit near y=0.083H and the sum near y=0.146H. The common-width fraction is below the stack around y=0.825H. Thus the actual geometric object is a tall narrow rectangle, approximately three times as tall as it is wide in the pictured example, centered slightly left of the frame's middle. The title earlier occupies the lower-middle; it clears before that region becomes the stack. These proportions are sampled-raster estimates. Exact power-label offsets and entrance paths are not measured, and the small labels need a native-phone-size readability check in a new production.

## Evidence and source character

The entire video-only stream was sampled at approximately one-second intervals, supplementing twelve earlier frames. Audio was not assessed. Time ranges below are approximate visible-state locations. The small source equations are legible through enlarged frames, but precise typeface, stroke widths, color codes, object entrance easing and native coordinates are unmeasured. This file separates the observed arrangement from an independently derived mathematical recipe.

The portrait background is black. At the top are two compact white serif mathematical lines: conditions, then the finite sum. The conditions read x>1, a>0, k>0; the geometric diagram requires k to be a positive integer, although the short's printed line does not fully state that domain. The sum is `a + ax + ax^2 + ... + ax^(k-1)`.

At first a large pale sans-serif two-line subject title sits in the lower-middle. It fades before the diagram develops. A thin vertical scale then occupies the left side of a tall narrow construction in the central region. Its labels are 1,x,x^2,x^3,...,x^(k-1),x^k. These are endpoint coordinates on the scale. The first coordinate is 1, not 0. That distinction determines the total height later: the rectangle spans from 1 to x^k, so its height is x^k-1.

A fixed width is introduced horizontally from the level 1. The width label is `a/(x-1)`. Green filled rectangular strips with thin light outlines grow to this width and stack upward against the same left boundary. Their area labels are a,ax,ax^2,...,ax^(k-1). An intermediate gray rectangle with a vertical ellipsis compresses the unspecified middle strips. Near the end a purple rectangle expands to overlay the full stack, then the height bracket and area formula are shown. The final top equation receives a box. No hand, physical blocks, textured paper or live person appears.

## Full scene sequence

| Approximate seconds | Observed state | Why the exact state matters |
|---|---|---|
| 0-3 | Domain line and sum build at the top. Large title remains below. | The source leads with the symbolic object before the geometric demonstration. |
| 4-6 | Both top lines and title hold. | This is a real source pause, not missing footage to be replaced with an invented event. |
| 7-9 | Subject title disappears; a thin vertical scale grows upward. | The top formula remains while its representation changes. |
| 10-18 | Scale labels 1,x,x^2,x^3,ellipsis,x^(k-1),x^k appear progressively. | These are endpoint coordinates, not the strip heights themselves. |
| 19-20 | Horizontal baseline/width grows from the level 1; `a/(x-1)` is introduced beneath it. | A common width is established before the areas are assembled. |
| 21-26 | First green strip grows and settles between levels 1 and x, with area a and height x-1. | Its height is the difference of adjacent scale marks. |
| 27-29 | A second green strip appears, expands to common width and fills levels x to x^2; label ax. | It is not a copy with unchanged height. The heights grow by factor x. |
| 30-33 | Third strip fills x^2 to x^3 with label ax^2. | The repeated width and increasing heights encode the geometric progression. |
| 34-35 | Gray middle block with vertical ellipsis is inserted above the displayed low-order strips; final green strip enters above it. | The gray block represents omitted terms, not a separate numerical summand with an unspecified value. |
| 36-41 | Last green strip reaches the x^k endpoint; label ax^(k-1). The full stack holds. | Upper and lower endpoints define the total span. |
| 42-44 | Purple overlay expands over the full green/gray rectangle. | This changes the reading from a sum of piece areas to one total area. It is not a dissection that moves pieces elsewhere. |
| 45-46 | Total height `x^k-1` is identified beside the purple rectangle. | Subtracting the baseline coordinate 1 is essential. |
| 47-50 | Product/area expression develops in the purple interior and simplifies to `(ax^k-a)/(x-1)`. | Width times height supplies the closed form. |
| 51-53 | The upper sum becomes an equality with the closed form. | The original expression is resolved in its original screen location. |
| 54-58 | The final equality is boxed; purple rectangle and dimensions remain visible. | The ending is a held result, with no question, promotion, return loop or new example in the inspected frames. |

## Exact geometry for an independently authored rebuild

Choose a positive integer k and parameters a>0,x>1. Define width W=a/(x-1). Use scale coordinate y_j=x^j for j=0,...,k. Strip j, indexed from 0, occupies vertical interval [x^j,x^(j+1)] with width W. Its height is

`h_j = x^(j+1)-x^j = x^j*(x-1)`.

Its area is `W*h_j = a*x^j`. All k strips share the same left and right boundaries. Their combined height is `x^k-1`, so their combined area is

`W*(x^k-1) = a*(x^k-1)/(x-1) = (a*x^k-a)/(x-1)`.

This equals the original finite sum. The area argument relies on preserving common width, adjacency and positive heights. A vertical coordinate of 1 at the bottom is entirely compatible with an area of a in the first strip: the diagram is using coordinate differences, not measuring every strip from zero.

For implementation, choose a scale s converting mathematical units to screen pixels. Place the baseline at a chosen screen y0 and map coordinate q to `y_screen=y0-s*(q-1)`. The bottom stays fixed and higher coordinates move upward. Width in pixels is s*W if the same metric is used on both axes. If a new design distorts axes for readability, label it as schematic rather than implying physical geometric proportions were preserved.

The source uses a schematic ellipsis for the middle. A concrete implementation can choose, for example, k=6 with a modest x so that all strips remain visible. Draw the first three strips and the last strip explicitly; replace the intervening span with one gray block whose height equals the sum of the omitted intervals. The gray region must start and end at the correct power levels. It cannot be an arbitrary spacer that breaks the total height. Symbolic labels describe the general k pattern; the exact visual example uses a particular k. State that distinction if it could confuse the audience.

To reproduce the source sequence, each new strip can first appear as a small green rectangle within or near its destination, then expand to the common width and correct height. That observed entrance need not mean material area is conserved during the entrance animation. The proof applies to the settled rectangles. Preserve the settled interval boundaries and show area labels after or during the settling state without pretending a growing graphic is itself a rigid dissection.

For the purple total-area change, overlay the exact union bounding rectangle. Keep the width and endpoint marks anchored. Replace the internal term labels with a single area expression only when their sum has visibly become the total. The top sum stays fixed until the equality is completed, making the final result refer back to the same object.

## Bounds and fidelity traps

This particular positive-area picture is not a demonstration for x=1, negative x or noninteger k. The algebraic expression can be extended or handled by limits in other contexts, but that is not what this footage demonstrates. For x=1 the printed denominator is zero and the sum is ak; a new lesson must treat it separately rather than use the expression with a zero denominator.

Do not label the full height x^k; it begins at coordinate 1. Do not make the first strip height 1 while preserving the source width a/(x-1); that would give the wrong area. Do not label scale coordinates as strip heights. Do not turn the gray ellipsis block into an additional term. Do not silently change green piece identities before the purple total appears.

The source spends several opening seconds on a small symbolic setup and has very small final labels at phone scale. Those facts are retained as part of this exact format, not silently improved in the source record. Our new execution can enlarge labels or accelerate the introduction, but those are authored adaptations and should be specified as such. This example should remain its own complete geometric-sum variant rather than being compressed into the channel's more popular Venn-diagram style.


[Local source-frame plates](visual-evidence.md) retain the reviewed visual evidence.
