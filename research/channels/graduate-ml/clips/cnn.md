# CNN: one pixel-art sword through patch, filter, channel, layer and class

Local visual evidence: [full contact sheet](../../../../out/channel-references/graduate-ml/cnn/contact-sheet.jpg), with individual timestamped frames and detail checks in the same ignored folder. [Evidence index](../evidence-index.csv) records all 127 observed samples/checks.
Primary source: [YouTube Short SmLtNyvnWKo](https://www.youtube.com/shorts/SmLtNyvnWKo), published 2026-10-12. Observed 2026-10-29: 2,399 views and 47 likes; public channel audience 13,100 subscribers. This is not a demonstrated viral YouTube upload. Review: twenty states at 0/2/.../36/37.85 seconds, plus detail checks at 6/8/20/24/30 seconds. Complete local ASR was read. The reviewed mathematical mechanism is fully animated and portrait. No presenter, classroom or physical writing is visible in the sampled frames.

## Concrete assets and layout

The input is a diagonal pixel-art sword with bright white/aqua blade, darker teal edge/shadow and a small brown-orange handle. It initially fills/crops beyond the frame, then becomes an inspectable small sprite against nearly black. The formula identifies a 16 by 16 image domain. Cells are square with visible gutters or dark boundaries, and a local neighborhood is outlined to distinguish it from the whole object. An enlarged numeric 3 by 3 patch uses the same teal intensity family.

A separate 3 by 3 filter sits above the image. Its observed coefficients are rows `[-1,-1,0]`, `[-1,0,+1]`, `[0,+1,+1]`. Positive entries are cyan, negatives subdued gray, with a thin double-looking turquoise outer border. Candidate neighborhood boxes occupy different parts of the sword as the filter is introduced. Later, a top output grid represents the feature map while the source sword stays lower in the frame. The boxes and output region provide a visual relation between local inspection and detected pattern.

Four feature maps are arranged in a two-by-two block above the sword, with orange/purple above and teal/blue below in the sampled view. Each has a small corresponding filter tile near its outside edge. These maps become separated, oblique stacked planes and then multiple stacked layers linked upward. Small outline icons beside layer groups indicate simpler edges, texture/checkerboard, geometric forms and eventually a sword outline. A final small row of round nodes leads to class bars. Sword receives a long green bar; pickaxe and axe have much shorter neutral bars. The source sprite is never replaced with an unrelated input image.

The portrait composition reserves the upper band for mathematics, with the active apparatus below. As hierarchy expands, the source sword shrinks toward the bottom and the stacked network moves upward. No persistent full-speech captions are visible. Labels and formulas are the authored text. The light italic serif math has a TeX-like appearance but its exact font and rendering package are unverified. The background and formulas are quiet enough that very thin outlines remain visible; a bright texture behind them would compromise the actual mechanism.

## Every inspected state

| Time | Observed state and role |
| --- | --- |
| 00:00 | The image-domain formula sits over a close crop of white/teal sword pixels. Individual cells dominate the frame; object recognition has not yet replaced pixel inspection. |
| 00:02 | The whole small diagonal sword is visible with the same formula. The scale change ties the close-up to one concrete input. |
| 00:04 | A numeric 3 by 3 neighborhood occupies the center and nearby image cells remain visible. The top expression now denotes a local slice rather than the full image domain. |
| 00:06 | The numeric patch has lifted into a separate inset above the sword, while a small outlined matching patch remains on the blade. This establishes local-to-global correspondence. |
| 00:08 | The convolution-like summation and explicit filter coefficients appear. Several outlined image neighborhoods accompany the sword. The kernel is an operator distinct from image data. |
| 00:10 | A gridded feature map sits above the input; a thin connector/box arrangement links a local source region to the output area. The operation has acquired a destination. |
| 00:12 | The same two-level input/output structure persists with a changed scan window/response arrangement. The stills establish changed states, not exact scan speed or an exhaustive traversal order. |
| 00:14 | The feature-channel equation replaces the summation. Outlined map panels begin to organize above the sword; one channel is populated while other panel boundaries remain faint. |
| 00:16 | Four differently colored feature maps are visible in two rows, each with a small filter asset. The explanation changes from one filter to multiple learned detectors. |
| 00:18 | The four-map block persists while an outlined source region changes position. Colored channels retain their identity across samples rather than becoming anonymous copies. |
| 00:20 | A four-channel list is written above an oblique stack of colored planes. An upward arrow connects a small map tile to the stack. The source sword is still beneath. |
| 00:22 | The oblique stack remains with shifted highlighting/plane state. The visual represents a channel collection, not four separate input photographs. |
| 00:24 | A layer-update expression with ReLU appears. Several plane groups occupy a vertical chain connected by arrows, with the source sprite at the bottom edge. |
| 00:26 | Edge, checkerboard/texture and simple shape outline assets appear beside different layer levels. These are conceptual annotations about increasing feature complexity. |
| 00:28 | A sword outline joins the upper semantic-feature level; lower texture and edge icons remain. The source-to-feature hierarchy is retained across the vertical composition. |
| 00:30 | A conditional sword-probability label appears above the stacked diagram and a row of small circular nodes. The mechanism has reached classification. |
| 00:32 | Three class rows appear; the sword row has a long green bar and the other tool classes are tiny. This is the output comparison, not an observed trained-model accuracy benchmark. |
| 00:34 | The classification and stacked-layer overview persist, retaining the same input and labels. No separate subscription card is introduced. |
| 00:36 | The earlier four-channel feature-map block returns above the source sword. The ending is retracing explanatory states. |
| 00:37.85 | Large cropped blade pixels and the full-image-domain label return, close to the opening view. The sampled states support a zoom-return loop, without proving frame-perfect seamless repetition. |

## What the mathematics does and does not establish

The domain label is `I in [0,1]^(16x16)`. The enlarged patch visibly contains integers including 1, 2, 9 and 7. Those values are outside the stated normalized range. This is an observed notation/illustration mismatch, not something to silently fix in a faithful record. A new technically consistent implementation would need to decide whether to normalize the displayed numbers or define integer-valued intensities, documenting that adaptation.

The displayed sum has the structure `(I*K)_ij = sum_(u,v) I_(i+u,j+v) K_uv`. There is no visible kernel reversal in that expression, so it corresponds to the cross-correlation convention commonly called convolution in CNN implementations. The reel does not independently demonstrate every output value, padding, stride or border handling. The sample establishes a filter/neighborhood/feature-map relationship rather than a fully auditable numerical convolution exercise.

A channel formula identifies `F_c = I*K_c`, followed by a four-channel collection. The layer expression has the structure `F^(l+1) = ReLU(F^l*K^l)`. Biases, exact feature shapes, pooling, flattening and classifier details are omitted. A conditional class label and bar chart do not establish calibration or model accuracy. The edge-to-shape icons are a conceptual hierarchy, not evidence that these exact intermediate maps were extracted from a trained network. A faithful remake must preserve these explanatory boundaries rather than imply an actual instrumented model run.

## Approximate narrated progression

The complete local ASR maps 0-5.5 seconds to an image grid and neighboring local patterns; 5.5-11.2 to sliding a filter; 11.2-16.9 to convolution and multiple filters; 16.9-22 to feature maps and channel stacks; 22-27.4 to increasingly complex features across layers; 27.4-32.5 to recognizing the input; and the last part to the network name and a zoom back to the image. These are paraphrases. Exact word/object synchronization, voice character and music were not auditioned. The accumulating conditional sentence form supports the visual scale ladder, but its measured cadence remains unknown.

## Reconstruction dependencies and failure cases

Required assets are the original-looking sword sprite and cell grid, a linked source/inset patch, the explicit kernel matrix, scan windows, output feature maps, four color identities, oblique channel planes, multiple vertically linked layer stacks, feature-category icons, small node row, class labels/bars and the return-to-pixels state. Camera/scale changes must keep the input object's identity, otherwise the final return loses its referent. A generic neon neural-net background would not substitute for any of these assets.

The crucial motion dependencies are local patch separation, kernel-to-output correspondence, four maps becoming a channel stack, stacks becoming a hierarchy, and the hierarchy resolving into class scores. Two-second sampling leaves exact trajectories and transition overlaps unknown. Do not claim exact animation software, easing, font file or exported scene coordinates. The observed composition can guide reconstruction, while a pixel-perfect reproduction would still require native assets and a continuous motion audit.
