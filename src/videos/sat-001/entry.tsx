// Standalone entry, so this video can be previewed and rendered on its own:
//   npx remotion still src/videos/sat-001/entry.tsx sat-001 out/sat-001/f.png --frame=600
import { registerRoot } from "remotion";
import { VideoComposition } from "../../compose";
import { SatMath } from "./SatMath";
import timing from "../../../public/voice/sat-001/timing.json";

registerRoot(() => <VideoComposition component={SatMath} timing={timing} />);
