import type { ComponentType } from "react";
import { Composition } from "remotion";
import { END_CARD, TAIL, Video } from "./components/Video";
import type { Timing } from "./narration";
import { layout } from "./theme";

export type Entry = { component: ComponentType; timing: Timing };

/** One narrated video as a Remotion composition, sized from its timing. */
export const VideoComposition = ({ component: Body, timing }: Entry) => (
  <Composition
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
);
