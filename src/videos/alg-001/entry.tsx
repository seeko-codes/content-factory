// Standalone entry, so this video can be previewed and rendered on its own:
//   npx remotion still src/videos/alg-001/entry.tsx alg-001 out/alg-001/f.png --frame=600
import { registerRoot } from "remotion";
import { VideoComposition } from "../../compose";
import { CrossMultiply } from "./CrossMultiply";
import timing from "../../../public/voice/alg-001/timing.json";

registerRoot(() => <VideoComposition component={CrossMultiply} timing={timing} />);
