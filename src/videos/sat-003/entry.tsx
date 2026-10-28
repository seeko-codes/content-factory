// Standalone entry, so this video can be previewed and rendered on its own:
//   npx remotion still src/videos/sat-003/entry.tsx sat-003 out/sat-003/f.png --frame=600
import { registerRoot } from "remotion";
import { VideoComposition } from "../../compose";
import { AlgebraTwo } from "./AlgebraTwo";
import timing from "../../../public/voice/sat-003/timing.json";

registerRoot(() => <VideoComposition component={AlgebraTwo} timing={timing} />);
