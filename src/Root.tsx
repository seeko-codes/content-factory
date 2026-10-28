import type { ComponentType } from "react";
import { Composition, Still } from "remotion";
import { END_CARD, TAIL, Video } from "./components/Video";
import { GalleryA, GalleryB } from "./Gallery";
import type { Timing } from "./narration";
import { layout } from "./theme";
import { Integral } from "./videos/integral/Integral";
import integralTiming from "../public/voice/integral/timing.json";

// One entry per video: its diagrams component and the timing written by
// `npm run voice -- <id>`.
const videos: { component: ComponentType; timing: Timing }[] = [{ component: Integral, timing: integralTiming }];

export const Root = () => (
  <>
    {videos.map(({ component: Body, timing }) => (
      <Composition
        key={timing.id}
        id={timing.id}
        width={layout.width}
        height={layout.height}
        fps={layout.fps}
        durationInFrames={Math.ceil((timing.duration + TAIL + 0.25 + END_CARD) * layout.fps)}
        component={() => (
          <Video timing={timing}>
            <Body />
          </Video>
        )}
      />
    ))}
    <Still id="gallery-a" component={GalleryA} width={layout.width} height={layout.height} />
    <Still id="gallery-b" component={GalleryB} width={layout.width} height={layout.height} />
  </>
);
