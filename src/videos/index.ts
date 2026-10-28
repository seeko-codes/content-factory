import type { Entry } from "../compose";
import { Integral } from "./integral/Integral";
import integralTiming from "../../public/voice/integral/timing.json";

// Every video in the studio. Add one line per video after `npm run voice -- <id>`.
export const videos: Entry[] = [{ component: Integral, timing: integralTiming }];
