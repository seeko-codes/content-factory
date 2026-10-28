import type { Entry } from "../compose";
import { Integral } from "./integral/Integral";
import integralTiming from "../../public/voice/integral/timing.json";
import { SatMath } from "./sat-001/SatMath";
import sat001 from "../../public/voice/sat-001/timing.json";
import { Algebra1 } from "./sat-002/Algebra1";
import sat002 from "../../public/voice/sat-002/timing.json";
import { AlgebraTwo } from "./sat-003/AlgebraTwo";
import sat003 from "../../public/voice/sat-003/timing.json";
import { GraphList } from "./sat-004/GraphList";
import sat004 from "../../public/voice/sat-004/timing.json";
import { CrossMultiply } from "./alg-001/CrossMultiply";
import alg001 from "../../public/voice/alg-001/timing.json";
import { SocksAndShoes } from "./alg-002/SocksAndShoes";
import alg002 from "../../public/voice/alg-002/timing.json";

// Every video in the studio. Add one line per video after `npm run voice -- <id>`.
export const videos: Entry[] = [
  { component: SatMath, timing: sat001 },
  { component: Algebra1, timing: sat002 },
  { component: AlgebraTwo, timing: sat003 },
  { component: GraphList, timing: sat004 },
  { component: CrossMultiply, timing: alg001 },
  { component: SocksAndShoes, timing: alg002 },
  { component: Integral, timing: integralTiming },
];
