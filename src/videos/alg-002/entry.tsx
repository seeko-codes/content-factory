// Standalone entry, so this video can be previewed and rendered on its own:
//   npx remotion still src/videos/alg-002/entry.tsx alg-002 out/alg-002/f.png --frame=600
import { registerRoot } from "remotion";
import { VideoComposition } from "../../compose";
import { SocksAndShoes } from "./SocksAndShoes";
import timing from "../../../public/voice/alg-002/timing.json";

registerRoot(() => <VideoComposition component={SocksAndShoes} timing={timing} />);
