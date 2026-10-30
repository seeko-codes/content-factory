# Mathematical Visual Proofs: four-set Venn diagram

Source: [official 57-second Short](https://www.youtube.com/shorts/X-uesNEHv7U), observed October 29, 2026. Public watch snapshot: **4,385,193 views**, current channel display **260,000 subscribers**, about **16.87 cumulative views/current subscriber**. This is a verified high-reach animated mathematical Short, not a live demonstration. Current audience is not audience at upload, and the ratio does not identify why it spread.

## Review scope

The complete video-only stream was sampled at approximately one-second intervals, supplementing the earlier twelve-frame review. All 57 sampled states were inspected. Source runtime and one-second timestamps are approximate at the level used below; the review does not establish frame-exact fade durations. Audio, music, narration, exact source fonts, native path coordinates and renderer are unknown. [Local source-frame plates](visual-evidence.md) preserve the reviewed arrangement. The Boolean construction instructions below are an independently specified way to recreate the visible behavior, not recovered project code.

## Two distinct diagrams, not one evolving shape

The first scene has four overlapping circles arranged around a common center: A above, B left, C below, D right. Thin light outlines draw progressively. Each circle then gains a translucent-looking fill, red/brown for A, cyan/blue for B, green for C and yellow for D. Overlap blending gives the middle region a lighter composite appearance. A white serif title explicitly rejects this as a four-set Venn diagram. A short question appears below asking what is missing. The source does not explicitly label the absent regions before changing scenes.

The replacement scene has a white rectangular universal-set boundary and four diagonal ellipses, with thin muted blue, pink, green and yellow outlines. It has its own affirmative title. The rectangle, all four boundaries and letter labels persist throughout a sequence of colored atomic-region highlights. The boundaries do not morph to accommodate a desired selection. The only changing mathematical furniture is the expression above the rectangle and the fill inside the selected region.

The source's explanation is exhaustive enumeration: after showing the invalid familiar-looking construction, it demonstrates that the new arrangement contains all sixteen inside/outside membership combinations. A recreation that merely draws four ellipses and a final center highlight would omit most of the film's actual mathematical argument.

## Asset inventory and approximate registration

Use a black portrait canvas. Titles and set names are white serif text; set letters are italic. There is no axis, grid, numerical region count, hand, cursor, photographic plate, decorative mascot or visible channel logo in this inspected source.

In the downscaled 270x480 review frame, the second-scene title centers around (135,111). The universal rectangle spans about x=26-243, y=166-314, equivalent to x=0.096-0.900W and y=0.346-0.654H. That leaves large quiet black fields above and below. Set labels sit near their own outer arcs: A on the left, B on the right, C upper-left of the inner diagonal family, D upper-right. The changing expression sits in the gap immediately above the universal rectangle, beneath the persistent title.

A and C are roughly parallel ellipses slanting down and right in screen coordinates. B and D slant up and right. Their centers are staggered, so crossing points do not coincide. Approximate raster bounding regions: A x=50-150,y=206-304; B x=119-218,y=206-304; C x=91-190,y=185-284; D x=79-179,y=185-284. These bounds are registration aids, not recovered mathematical ellipse parameters. Exact reproduction requires fitting the visible boundaries and checking region topology, not substituting those bounding boxes as axis-aligned ellipses.

Each highlight is opaque-looking and much brighter than the quiet outline. The highlighted set expression uses the same current accent color. The palette cycles cyan, magenta, yellow and bright green. Color denotes the active selected region during that state, rather than assigning one unchanging fill color to each set. In the final complement state the universal rectangle's exterior-to-all-sets region becomes bright green while the union stays black. The rectangle is therefore an active mathematical object, not merely a decorative frame.

Assets required: two title strings; first-scene four circle paths and labels; four initial fills; lower question; second-scene universal rectangle; four ellipse paths and labels; a dynamically typeset set-expression slot; sixteen Boolean region masks; and timed highlight opacity/color. Keep one geometric authority for both each outline and its membership mask.

## Full observed sequence

| Approximate seconds | Visible state | Reconstruction requirement |
|---|---|---|
| 0-1 | Rejecting title above the first circle A, which draws then fills. | Start with the inadequate familiar construction, not the final ellipses. |
| 2-3 | B draws at the left and gains a cyan-toned fill. | Preserve the first circle while admitting the second. |
| 4-5 | C draws below and fills green. | The circular arrangement remains fixed. |
| 6-7 | D draws at the right and fills yellow. | Four overlapping circles are not enough by themselves. |
| 8 | The question about the missing part appears below. | Allow the viewer to inspect the apparent plausibility. |
| 9-10 | First scene fades; affirmative title and rectangle enter. | This is a replacement scene, not proof that circles deform continuously into the ellipses. |
| 11-15 | A, B, C and D ellipses draw progressively inside the rectangle, each with its own letter. | Preserve the staggered four-ellipse arrangement and fixed universal set. |
| 16-18 | Completed outlines hold without an active region. | Establish stable boundaries before cycling selections. |
| 19-20 | A only, cyan. | Select A excluding B,C,D. The fill then clears. |
| 21-22 | B only, magenta. | Select B excluding A,C,D, then clear. |
| 23-24 | C only, yellow. | Select C excluding A,B,D, then clear. |
| 25-26 | D only, bright green. | Select D excluding A,B,C. |
| 27-28 | A and B only, cyan. | Fill their overlap excluding C and D. |
| 29-30 | A and C only, magenta; a much smaller region. | Do not enlarge a tiny valid region by distorting the set outlines. |
| 31-33 | A and D only, yellow. | Keep every other membership region unfilled. |
| 34-35 | B and C only, bright green. | This is a different lens from the preceding pair. |
| 36-37 | B and D only, cyan; again small. | A visible nonempty patch matters more than equal visual area. |
| 38-39 | C and D only, magenta. | Same outline apparatus, new Boolean selection. |
| 40-41 | A,B,C excluding D, yellow. | Introduce three-way membership without including the fourth. |
| 42-43 | A,B,D excluding C, bright green. | Distinguish this from the full four-way center. |
| 44-45 | A,C,D excluding B, cyan. | Formula and patch must change together. |
| 46-47 | B,C,D excluding A, magenta. | This finishes the four triple-only cases. |
| 48-50 | A intersection B intersection C intersection D, yellow. | Center four-way membership holds longer than some preceding cases. |
| 51-53 | Complement of the union of A,B,C,D, bright green. | Fill inside the universal rectangle but outside every ellipse. |
| 54-56 | Fill and active expression clear; complete outlines and affirmative title remain. | Ending holds the valid whole diagram. No CTA or return to circles is visible. |

Fades can make a region dimmer in the last sampled state of its interval. These table ranges describe the visible selection order, not exact on/off keyframes. The palette sequence and the last exterior region are part of this particular source format.

## Boolean reconstruction and mathematical validity

A four-set Venn diagram requires all 2^4=16 membership combinations to have a nonempty region, including membership in none of the four sets. An Euler diagram can omit combinations if the particular sets do not realize them; that is a different purpose. The initial four-circle picture does not realize all sixteen combinations. Four circles in general position can create at most fourteen regions: after the first circle gives two regions, subsequent circles add at most 2,4,6, giving 14. This independently explains why the familiar construction cannot serve as a general four-set Venn diagram. The source's opening question does not itself provide that derivation.

Represent each set by an ellipse predicate in a common coordinate system. For ellipse i with center c_i, semiaxes a_i,b_i and rotation theta_i, transform the test point into local coordinates (u,v). Membership is `(u/a_i)^2+(v/b_i)^2 <= 1`. Use those same parameters to draw the ellipse outline. For any target membership bit pattern, include a point if it lies inside each selected ellipse and outside every unselected ellipse, while remaining inside the universal rectangle.

The source enumeration order, in A/B/C/D bit notation, is:

`1000,0100,0010,0001,1100,1010,1001,0110,0101,0011,1110,1101,1011,0111,1111,0000`.

This register is sufficient to generate every highlight with a shared membership function. For example, A-and-C-only is `(A intersect C) minus (B union D)`; it is not the entire A/C intersection. For the last case, select the rectangle minus the union of all four sets. Keep the mathematical expression's membership pattern coupled to its actual mask so a label cannot silently describe a different region.

A faithful new implementation can use SVG clipping/masking, vector Boolean operations or an antialiased pixel mask. It must preserve topology. Before animating, verify that each of the sixteen masks contains a genuine interior patch at the target display resolution. A single boundary pixel from numerical noise does not establish a usable region. Several of the source patches are small, so arbitrary resizing, a changed ellipse rotation or thicker outlines can erase them. Exact area equality is unnecessary; nonempty membership and readable selection are what this construction demonstrates.

The initial circle fills are blended overlap colors, while the later atomic highlights are explicit Boolean regions. Reusing an ordinary semi-transparent whole-ellipse fill for the later sequence would be incorrect: it would highlight multiple membership combinations at once. Similarly, drawing only the central overlap would fail to establish all sixteen cases. A set diagram's boundary shapes alone do not prove it is a valid Venn diagram until its regions have been checked.

## Source-specific ending and uncertainty

The film resolves its opening objection by enumerating the missing general capability, then holding the complete four-ellipse apparatus. It does not animate a final numerical score of sixteen, explain the circle-region bound, give a worked probability problem or ask a viewer to comment. Those are possible new editorial choices, not observed source states. Its generous empty areas and very small formula text are retained as source observations. Exact optical colors, blend modes, typography and fade curves require source project access or further measurements. An unheard soundtrack remains unverified even though the visual proof can be reconstructed independently.
