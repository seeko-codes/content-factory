# 3Blue1Brown: collision-count short, reconstruction dossier

Source: [official 60-second Short](https://www.youtube.com/shorts/P11ykXwx4-k), observed October 29, 2026. Public snapshot: 63,428,586 views; 8,730,000 current subscribers; 7.27 views per current subscriber. This is a cumulative-view/current-audience comparison, not a causal estimate or upload-time normalization. This clip is an animated mathematical simulation, including a physical idealization, rather than live physics footage.

## Approximate registration for a new portrait composition

Coordinates below are normalized to the sampled 270x480 frame, not recovered native vectors. The source stream is 360x640; the review frame was proportionally downscaled. In the early apparatus the wall is around x=0.074 and extends from y=0.342 to 0.579. The floor stays at y=0.579 and runs from the wall to the right edge. The small counter begins near x=0.67,y=0.37. Lower captions center at x=0.50, around y=0.75-0.80. The apparatus therefore has roughly one-third of the frame as empty black space above its wall, while captions occupy a separate lower band. In the 10,000 kg preview sample, the small white block spans about x=0.282-0.356 and y=0.540-0.579; the teal block spans x=0.356-0.496 and y=0.500-0.579. These are one sampled state's locations, not invariant initial coordinates for every run. Keep the floor and wall anchored while blocks move. The exact caption line breaks vary by sentence. Rendered block proportions and label placement should be fitted by eye against the linked plates; mass ratio is not a literal width ratio.

## Evidence and fidelity boundary

The entire 60-second video-only stream was sampled at approximately one-second intervals, supplementing the initial twelve-frame review. Timings below locate visible states to about one second; they are not recovered edit points. Audio, music, delivery, exact fonts, native scene code, collision solver and easing were not reviewed or recovered. The mathematical reconstruction below is an independently specified implementation compatible with the observed apparatus. It is not a claim about the creator's source code. Short on-screen labels are identified; caption sentences are paraphrased so this file supplies the scene behavior rather than a copied narration script.

## Frame architecture and asset inventory

The portrait frame is black. There is extensive black space above the simulation. A thin gray floor runs horizontally through roughly the middle-to-lower part of the central apparatus region. A vertical wall at the left has small diagonal hatch marks behind it, making its fixed status readable. The blocks always sit on this same floor. There is no photographic texture, room, perspective camera, ground shadow or decorative environment.

The smaller block is near-white with restrained shaded fill and a small white mass label above it. The larger block is cyan/teal in the early unequal-mass cases and becomes gray in the final million-kilogram case. Larger mass is communicated both by the printed value and by a larger rendered block. Rendered size should be treated as a symbolic visual encoding; the clip does not establish a physical volume-to-mass law. The larger block enters from the right, and the smaller block sits between it and the wall.

A small light-colored serif collision counter sits above and to the right of the apparatus. Its count persists through each run and resets at the next mass setup. It is part of the explanation: the small moving blocks become difficult to track at high collision rates, while the counter stays legible. Late in the film the counter itself is enlarged and reframed until it becomes the central subject.

The lower portion has compact, centered, bold uppercase sans-serif captions, usually two lines. Most words are white, with selected words or phrases highlighted yellow. The highlight changes with the sentence; it is not a fixed color legend for a mathematical variable. Captions are separate from the small serif apparatus labels. No logo animation precedes the apparatus. The end card introduces a different graphic: a solution thumbnail, three downward arrows, a short invitation above, and the same blocks as a reminder of the question.

A rebuild requires: wall/floor group; two block objects; two mass labels; a counter label and integer; a lower caption group with independently colored spans; a camera or apparatus transform for late enlargement; and a separately composed solution card. The background never needs a stock image or B-roll.

## Complete visible progression

| Approximate seconds | Observed state | Reconstruction instruction |
|---|---|---|
| 0-2 | A large mass contrast is already visible, with the 10,000 kg case previewed and a zero/early collision counter. A fast blurred horizontal transition follows. | Open on the unusual apparatus immediately. Preserve this preview before resetting to the simple case. |
| 3-6 | Equal 1 kg blocks; counter reset to zero; lower captions establish an idealized frictionless setup. | Restore both initial positions and velocities, not merely the printed numbers. Hold the apparatus long enough to identify wall and masses. |
| 7-8 | Right block approaches; first block-to-block impact increments the counter to 1. | Make count change at contact. An impact is not counted every frame that edges touch. |
| 9-11 | Left block moves to the wall and rebounds; counter becomes 2. | Keep the wall fixed. Reverse only the small block's velocity at wall contact. |
| 12-14 | Small block returns and meets the other block; counter reaches 3. | At equal masses, velocity exchange creates the simple three-event result. |
| 15-20 | Blocks move apart; counter holds 3 while captions close the simple example. | Preserve the resolved state instead of resetting as soon as the last collision happens. |
| 21-25 | Reset to 1 kg and 100 kg; zero counter; the large block approaches. | Retain the floor, wall, label positions and count convention. Only the intended mass setup changes. |
| 26-29 | First impact followed by a rapid cluster of wall/block impacts; sampled counts include 1, 3 and 21. | Compute actual event order; do not invent uniformly spaced counter increments. |
| 30-36 | Count approaches 30, then reaches 31; after the last block impact the pair separates to the right. | Let the repeated apparatus show why the same question now produces a longer count. |
| 37-41 | A new 10,000 kg run replaces the prior case; sampled counts include 11, 54, 294, 312 and 313. | Reset count and state again. Much of the action is too fast to enumerate visually, so counter continuity matters. |
| 42-46 | Small block travels back to the wall, producing the final count 314. Captions mention ideal assumptions and the numerical result. | Do not end at 313: the final wall collision is part of the total. The larger block can leave the crop while the last event remains visible. |
| 47-51 | Another reset introduces a gray 1,000,000 kg block. Counter accelerates from zero through the early impacts and into the thousands. | Preserve mass escalation by powers of 100. Do not imply that merely scaling visual block size produces the new number. |
| 52-55 | The collision count is enlarged through values around 3,139, 3,140 and finally 3,141. | Shift visual emphasis from hard-to-follow impacts to the readable number, without changing its event-based meaning. |
| 56-57 | Large 3,141 tally holds while the caption connects the pattern to the starting digits of pi. | The clip reveals the pattern; it does not present the mathematical proof of it. |
| 58-59 | Hard change to a solution destination card with arrows and a familiar block diagram. | This is an outward invitation, not a seamless return to the opening. Record it as a separate ending variant. |

The observable escalation is 3, 31, 314, 3,141. The local review does not independently prove an unrestricted theorem about all mass ratios or all digits. A new teaching video must distinguish the exhibited numerical pattern from its explanation.

## Mathematical model for a faithful new construction

Use one spatial dimension with a fixed wall at coordinate 0, a small block of mass m=1 and a large block of mass M. Initially both blocks are separated, the small block is at rest, and the large block moves left. Use perfectly elastic impacts and no friction. Keep the simulated masses separate from their rendered widths.

For a block collision, given velocities u and v for small and large blocks, update simultaneously:

`u_new = ((m-M)*u + 2*M*v)/(m+M)`

`v_new = (2*m*u + (M-m)*v)/(m+M)`

For a wall collision set `u_new = -u`. Increment the counter once for either kind of event. Between events positions evolve linearly. A direct event-based solver considers a wall event only when u<0 and a block event only when u>v, meaning the gap is closing. It then finds the earliest nonnegative valid contact time, advances both positions to it, applies the update and repeats. At a touching, separating contact there is no new zero-time impact. Render samples can interpolate within event intervals. This avoids frame-rate-dependent pass-through and artificial double counting at large mass ratios.

The run ends when neither a future wall collision nor a future block collision is possible: 0<=u<=v, allowing the small block to be stationary in the equal-mass case, after considering contact positions. Keep a numerical tolerance for near contacts and calculate impact state from the pre-impact pair. The four demonstrated mass settings are M=1,100,10,000,1,000,000. The expected displayed totals for these cases are 3,31,314,3,141. These totals are useful mathematical acceptance checks for a new solver, independently of the source's exact pacing.

The clip's apparent speed changes and camera crop cannot be recovered from one-second frames with frame accuracy. Retiming event playback to fit the observed sections is an authored choice. Never change collision counts to make a timing target easier. Captions may supply the idealizations, but a caption cannot repair a simulation that visibly loses energy or moves the wall.

## Details to preserve and traps to avoid

Keep the two masses identifiable through every reset. A motion flourish that swaps which block is small would break the comparison. Keep count, mass labels and positions synchronized; changing 100 to 10,000 while retaining the previous velocities would silently change the experiment. Preserve every wall impact, including the last wall bounce in the 10,000 kg run. Preserve the late count enlargement, because the number is the payoff once the impacts exceed human tracking speed.

An SAT adaptation could use the escalating-comparison architecture without using this advanced theorem, but that is a new video rather than a recreation of this one. The source's black field, tiny apparatus labels, huge empty top region and outbound solution card are documented source decisions. Their presence does not automatically make them the house-series defaults. Exact color codes, font families, audio cues and source easing remain unknown.


[Local source-frame plates](visual-evidence.md) retain the reviewed visual evidence.
