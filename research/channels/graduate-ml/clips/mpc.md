# MPC: robot, predicted futures, cost and repeated control

Local visual evidence: [full contact sheet](../../../../out/channel-references/graduate-ml/mpc/contact-sheet.jpg), with individual timestamped frames and detail checks in the same ignored folder. [Evidence index](../evidence-index.csv) records all 127 observed samples/checks.
Primary source: [native Instagram reel DeUpZj4JWzF](https://www.instagram.com/reel/DeUpZj4JWzF/), published 2026-10-10. Observed 2026-10-29: 93,447 likes, 193 comments; views unavailable. Native media 1080 by 1920, probed duration 37.522 seconds. [YouTube counterpart](https://www.youtube.com/shorts/u1ArkneQJu8) is catalogued separately and does not inherit native Instagram engagement. Review: twenty native frames at 0/2/.../36/37.22 seconds; additional detail checks at 4/12/16/18/22/26/32 seconds. Complete local ASR was read. This is a state-by-state record, not continuous playback or a measured rig/keyframe specification.

## Asset inventory and composition

The central asset is a dark blue-gray articulated walking robot with a broad rectangular body/head, narrow amber head strip, blocky upper members, round joints and small feet. The rendered camera sees its side in the early state and its back from above during planning. The scene contains dark low-poly rocks on a navy grid floor, strong cast shadows, a cool blue horizon glow and scattered tiny white points. The robot is a modeled object with visible volume and occlusion, not a flat icon.

A cyan floor circle and a leftward orientation arrow initially locate the current state. Later, candidate futures duplicate the robot in translucent cyan at the end of many rays. Each candidate has a line and repeated small point/stem markers. A goal is a green floor ring with a tall vertical beacon. Candidate trajectories become a red/yellow/green set once evaluated. A yellow plan and yellow ghost robot become the selected future; the actual robot stays opaque blue-gray. These roles must remain distinguishable. Making the actual robot translucent would confuse prediction with execution.

The portrait frame allocates roughly its upper fifth to a single formula on a nearly black field. The rendered world begins beneath that band and extends to the lower edge. The robot starts as a large cropped close-up, becomes a full-body medium shot, then shrinks toward the lower center when the entire fan and goal need space. The floor and objects establish camera movement through perspective changes, but the precise camera path and focal length are unknown. During the fan sequence the goal stays above the current robot, creating an easily read forward planning direction. The marker and equations use matching colors: state/predicted position blue, action orange, goal green, penalty red and selected control yellow.

## Every inspected state

| Time | Visible state and mathematical job |
| --- | --- |
| 00:00 | Tight oblique view of head/body and front leg with amber strip. Upper notation names state from position and orientation. The robot is the concrete object whose state will be formalized. |
| 00:02 | Full-body side view; cyan ground ring encloses the feet and a long arrow points left. This is the current pose/orientation state rather than a predicted trajectory fan. |
| 00:04 | One-step dynamics expression replaces the state-definition label. The opaque robot remains inside the ring. Orange action notation separates the applied control from blue state notation. |
| 00:06 | Multiple translucent cyan pose copies extend away from the current robot, accompanied by bright short horizontal traces. This shows a predicted result/movement relation, with exact per-frame interpolation unknown. |
| 00:08 | Camera is farther back and angled over the terrain. A cyan predicted robot is separated spatially from the current opaque robot; rocks now matter as visible environmental constraints. |
| 00:10 | A multi-step/candidate-index prediction label appears. Only an initial subset of candidate future poses is visible, introducing more than one possible future from the same current condition. |
| 00:12 | Many cyan ghost robots form a broad arc. Bright rays with regularly repeated marks connect them to the one current robot at the fan's origin. The horizon/candidate set is the main new asset. |
| 00:14 | The full candidate fan persists as the cost expression begins to occupy the upper band. The state set is retained while a new way to compare it is introduced. |
| 00:16 | Green beacon/ring enters near the fan. White connector lines join several candidate end regions toward the goal. The position-to-goal term and rock penalty are now explicit in the formula. |
| 00:18 | Candidate robots and rays turn into a red-through-yellow-through-green spectrum. The goal remains green. Color now represents comparative cost/preference rather than merely candidate identity. |
| 00:20 | The colored fan and goal are preserved while the upper label transitions toward selection. The branch geometry still shares one root, preventing the alternatives from looking like independent real robots. |
| 00:22 | An argmin label is clear. Most of the fan has disappeared; a few promising branches and a diverging yellow branch remain. The camera is higher, and the actual robot sits near the lower-left/center. |
| 00:24 | One selected yellow ghost robot and yellow dotted route remain toward the goal. The reduction from many colored candidates to one plan is inspectable in successive states. |
| 00:26 | Upper instruction singles out the first selected control with subscript zero. A short bright yellow route segment lies immediately ahead of the current robot; the distant yellow predicted robot remains separate. |
| 00:28 | A new cyan fan grows from the robot's updated location, while the previous yellow direction remains as context. The top label explicitly links the next state to planning again. |
| 00:30 | The robot and selected continuation have progressed toward the fixed goal. The change of planning origin is the feedback point, not proof that the entire earlier open-loop trajectory was executed. |
| 00:32 | A compact colored fan and an MPC policy expression occupy the scene. The robot is smaller and the route behind it curves through the terrain. |
| 00:34 | Colored rays and a short route remain while a double-left rewind symbol appears near the bottom. The ending begins to refer backward through the construction. |
| 00:36 | The earlier side-view state with cyan circle returns; the rewind symbol is still visible. The scene has returned to the current-state representation. |
| 00:37.22 | Tight head/leg close-up resembles the opening crop and carries the state-definition label. This establishes a visual loop in the sampled ending, without a frame-accurate seamless-loop guarantee. |

## Formula and inference inventory

The opening state is schematically `x_t = (p_t, theta_t)`. The one-step model is `x_(t+1) = f(x_t, u_t)`. Candidate prediction then uses a candidate superscript and a time interval extending to a horizon. The same f notation is being used compactly for the predicted sequence; the reel does not give an implementation of numerical integration or a complete state dimension.

At 16 seconds the displayed cost has the structure `J = sum_i ||p_i - g||^2 + c_rock`. Position and goal terms are colored consistently with their scene objects, and the obstacle penalty is red. The visible goal-distance connector lines are the bridge from scene to formula. The exact definition of the obstacle penalty, horizon length, constraints and sampling method are absent. The cost includes an obstacle term, so copying only straight-line goal distance would change the illustrated mechanism.

Selection is schematically `u* = argmin J`; the reel omits the full minimization domain. The key later distinction is executing `u*_0`, the first action, then re-estimating state and replanning. That is the meaningful MPC inference. The final policy label relates the control to a policy named MPC acting on current state. This illustration does not establish that the shown walker is physically simulated, that each candidate satisfies dynamics or that the selected trajectory is globally optimal. It explains the control loop through geometrically consistent metaphors.

## Timed narration map

Local ASR approximately associates 0-4.3 seconds with measuring current state; 4.3-9.1 with a predictive dynamics model; 9.1-14.3 with simulating candidate actions/futures; 14.3-20.3 with scoring their goal-reaching behavior; 20.3-25.6 with choosing the lowest-cost action sequence; and 25.6-33 with executing one action and optimizing again. The last portion verbally rewinds toward the starting state. These are paraphrases of the complete read transcript, not a verbatim script. ASR extends slightly beyond the probed media duration, so its final boundary must not be treated as frame-accurate.

## Dependencies for a faithful reconstruction

Build the state/action/goal representations before the effects. A rigged walker, terrain/rocks, current-state circle/heading arrow, candidate ghost copies, horizon paths, cost-color ordering, fixed goal beacon, selected plan and local executed segment are all distinct assets. Equations must change when the scene's object changes. Candidate duplication should preserve body orientation and leg scale; a fan of random robot poses would obscure the dynamics idea. The same environmental rocks must stay spatially coherent as the camera changes, especially where candidate cost changes could otherwise appear arbitrary.

The most consequential edit is between selected plan and first executed action. Moving the opaque robot directly to the distant ghost would erase the feedback distinction. The second fan must originate from the new current state. The closing return should pass through prior states rather than substitute a generic logo card. Unknowns remain substantial: exact mesh source, material parameters, rig, lighting, frame timing, camera spline, path generation, collision-cost computation and audio mix. They require original project assets or a more exact motion audit; the observed inventory must not be mistaken for those unavailable files.
