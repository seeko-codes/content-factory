# MindYourDecisions: circular motion from diameter sliders

Source: [official 23-second Short](https://www.youtube.com/shorts/T4q5Sl8SYsc), observed October 29, 2026. Public snapshot: 55,239,708 views; current channel audience 3,280,000 subscribers; cumulative views/current audience about 16.84x. The comparison is descriptive and does not establish that any isolated asset caused the reach.

## Approximate registration for a new portrait composition

In the proportionally downscaled 270x480 review frame, the outer-circle center is near (122,215) and radius about 88 pixels. Normalized, that is center (0.452W,0.448H), radius 0.326W or 0.183H. The circle is slightly left of the full frame's center, a source composition detail that should not be silently treated as exact center alignment. The title centers around x=0.452W,y=0.187H. The blue circle spans roughly x=0.126-0.778W and y=0.265-0.631H. Early orange markers are about five pixels in radius at this sampled scale. Those values are raster estimates, not original design tokens. The early lower half is mostly black; the late attribution/manuscript group uses that reserved space without moving the main circle. A new 1080x1920 version can multiply the sampled positions by four while refitting text to comparable bounds. Do not use the review contact-sheet cell dimensions as the source coordinate system.

## Evidence and frame layout

The full video-only stream was sampled at roughly one-second intervals. This supplements the earlier twelve-frame pass. No soundtrack or spoken narration was assessed. The timeline below is approximate; exact frame transitions, native font, line widths, RGB values and easing are not recovered.

The portrait background is pure-looking black. A small white uppercase title, “CIRCLE ILLUSION”, is centered above a blue outer circle. The circle occupies the upper-middle of the screen rather than filling the portrait height. Its center remains stationary. The plot has generous black margins and initially no axes, numbers, tick labels, equations or explanatory paragraph.

Thin saturated blue strokes encode the fixed outer boundary and the guide tracks through its center. Small orange disks encode moving points. Blue geometry remains stationary after each line finishes appearing. Orange points move along those lines. Late in the clip, orange segments join the moving points so that the emergent small circle becomes an explicit outline. This is a second use of orange, consistent with its role as the moving structure. Blue and orange never exchange roles.

Near the end, a small two-line white attribution appears beneath the circle with a rectangular yellowish manuscript image below it. The source attributes the construction to Al-Tusi and displays 1247. This dossier records the on-screen attribution; the historical priority/date have not been independently established in this review. The manuscript asset's exact source, crop and reuse rights are unknown. A new production should obtain an appropriate source image or omit it rather than claiming the same crop was recovered.

## Asset list and persistent identities

1. Black portrait background and static title group.
2. One fixed blue outer circle with radius R.
3. A sequence of blue diameter guides through the same center. Guides progressively extend into full lines; partial rays during their entrances are visible source states.
4. One orange point per admitted guide, each with a persistent guide identity and its own phase relationship.
5. An orange polyline joining the current points late in the sequence. It must update from the same point positions, not from a separate decorative orbit.
6. The small attribution text and manuscript-card group, introduced late while the motion continues.

There is no photographic person, cursor, hand, chalkboard, 3D camera or moving outer boundary. A source-faithful sequence should not start by revealing the complete orange circle: the early sparse states are what make the eventual interpretation change visible.

## Observed progression

| Approximate seconds | Visible state | Action to preserve |
|---|---|---|
| 0-1 | A single orange point slides horizontally inside the blue boundary. The horizontal track grows into a full diameter. | The first action reads as ordinary back-and-forth travel. Keep title and outer circle still. |
| 2-3 | A second orange point appears on a vertical guide that expands through the common center. Both points keep moving on their own straight tracks. | Introduce a second direction without changing the first point's identity or motion law. |
| 4-5 | An oblique guide and additional point enter. Blue guides are still sparse enough to track individually. | Add a direction, rather than rotating the entire diagram. |
| 6-8 | More diagonals accumulate. A small family of points occupies different distances from the center, including near-boundary and near-center positions. | Preserve the phase relationships; independent random oscillators would not produce the same locus. |
| 9-11 | The guide fan becomes denser. The point positions increasingly suggest a smaller circle whose center moves around the original center. | Let the structure emerge from more simultaneous constraints, not from a camera trick. |
| 12-15 | The fan fills out to a dense set of diameters. Orange points occupy a circular-looking arrangement, with one or more passing near the center. | The fixed guides stay legible behind the points. Keep the outer circle fixed in screen coordinates. |
| 16-17 | Orange connecting segments become visible between neighboring points, making the small circle contour explicit. | Join points in guide-angle order. Do not connect in screen x-order, which changes as they move. |
| 18-22 | The orange loop keeps revolving inside the blue circle. The historical credit and manuscript card occupy the lower area. | The ending sustains the already established motion while adding attribution. It does not solve the illusion with an equation or reset to one point. |

The final fully populated animation is not the opening state, so the complete short is not a seamless loop. The motion within the established apparatus is periodic, which is a different claim. A one-second sample cannot determine the exact count of all partially overlapping point/guide objects during every entrance. The observed progression is reliable; exact object count and entrance keyframes require denser source inspection if identical timing is requested.

## A mathematically exact construction compatible with the footage

The following is an authored reconstruction model, not recovered source code. It generates points that each move along a fixed diameter while collectively lying on a rotating circle. Let each guide have orientation alpha in [0,pi), and let t be a shared time angle. Put

`p_alpha(t) = R*cos(t-alpha)*(cos(alpha), sin(alpha))`.

Each point stays on its own fixed line because its vector is always a scalar multiple of `(cos(alpha), sin(alpha))`. Its signed displacement runs from -R to R and back. It touches the outer circle when the cosine is plus or minus one. Points on different guides use the same t and the guide angle inside the phase term; equal frequencies alone are insufficient.

Using the double-angle identities,

`p_alpha(t) = (R/2)*(cos(t),sin(t)) + (R/2)*(cos(2*alpha-t),sin(2*alpha-t))`.

Thus all points lie on a circle with radius R/2 centered at `(R/2*cos(t), R/2*sin(t))`. That smaller circle always passes through the outer circle's center and is internally tangent to the outer circle. The apparent orbit is compatible with every point sliding on a straight diameter. Increasing the number of evenly spaced alpha values makes the polygon through the sample points approximate the full smaller circle. A finite collection is still a finite collection of points and connecting segments, not an actually continuous circumference.

For a rebuild, define screen center C, outer radius R, a global angular speed omega and phase t0. Use `t=omega*time+t0`, compute every point from this expression and translate by C. If the screen y-axis points down, apply the appropriate sign to y consistently. The sign only reverses visual rotation; it should not alter the constraint. Determine phase and speed by matching source samples if needed; neither was measured exactly in this review.

Create guides incrementally using an admission schedule. Once a guide is admitted, it remains fixed and its orange point follows the shared clock. Do not restart the global clock with every new point. If entrance lines grow from the center or from a point, that affects only the drawn segment length, not the mathematical track. For the late orange contour, connect points in increasing alpha and close the polygon. Update its vertices every frame from the same evaluated points.

## What would break this particular result

Random phases or speeds destroy the common moving-circle locus. Rotating each guide with its point changes the problem. Moving the blue outer circle conceals the fixed constraint. Drawing a precomputed orbit over unrelated point motion produces a visual claim that the apparatus does not support. Connecting points by nearest neighbor independently each frame can flicker or change topology; guide order is stable.

The inspected visuals do not derive the trigonometry, introduce a coordinate system or show an SAT transfer question. Those would be new visible editorial layers. Spoken content remains unreviewed. Its specific format is a sparse constraint display that grows into a surprising coordinated locus, followed by a historical credit. Preserve that format in this folder without folding it into a generic puzzle or theorem-proof template.


[Local source-frame plates](visual-evidence.md) retain the reviewed visual evidence.
