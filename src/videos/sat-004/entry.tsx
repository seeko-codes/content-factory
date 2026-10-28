// Standalone entry, so this video can be previewed and rendered on its own:
//   npx remotion still src/videos/sat-004/entry.tsx sat-004 out/sat-004/f.png --frame=600
import { registerRoot } from "remotion";
import { VideoComposition } from "../../compose";
import { GraphList } from "./GraphList";
import timing from "../../../public/voice/sat-004/timing.json";

registerRoot(() => <VideoComposition component={GraphList} timing={timing} />);
