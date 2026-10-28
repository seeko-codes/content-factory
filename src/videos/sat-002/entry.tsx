// Standalone entry, so this video can be previewed and rendered on its own:
//   npx remotion still src/videos/sat-002/entry.tsx sat-002 out/sat-002/f.png --frame=600
import { registerRoot } from "remotion";
import { VideoComposition } from "../../compose";
import { Algebra1 } from "./Algebra1";
import timing from "../../../public/voice/sat-002/timing.json";

registerRoot(() => <VideoComposition component={Algebra1} timing={timing} />);
