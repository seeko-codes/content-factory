// Standalone entry, so this video can be previewed and rendered on its own:
//   npx remotion still src/videos/integral/entry.tsx integral out/integral/f.png --frame=600
import { registerRoot } from "remotion";
import { VideoComposition } from "../../compose";
import { Integral } from "./Integral";
import timing from "../../../public/voice/integral/timing.json";

registerRoot(() => <VideoComposition component={Integral} timing={timing} />);
