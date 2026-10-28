import { Still } from "remotion";
import { VideoComposition } from "./compose";
import { GalleryA, GalleryB } from "./Gallery";
import { layout } from "./theme";
import { videos } from "./videos";

export const Root = () => (
  <>
    {videos.map((v) => (
      <VideoComposition key={v.timing.id} {...v} />
    ))}
    <Still id="gallery-a" component={GalleryA} width={layout.width} height={layout.height} />
    <Still id="gallery-b" component={GalleryB} width={layout.width} height={layout.height} />
  </>
);
