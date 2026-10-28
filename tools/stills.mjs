// Render many stills of one video in a single bundle (about 10x faster than
// one `remotion still` per frame):
//   npm run stills -- <id> 3 12.5 30        stills at 3 s, 12.5 s and 30 s
//   npm run stills -- <id> every 2          one still every 2 s
// Writes out/<id>/t<seconds>.png, or to --out <dir>.
import path from "node:path";
import { fileURLToPath } from "node:url";
import { bundle } from "@remotion/bundler";
import { openBrowser, renderStill, selectComposition } from "@remotion/renderer";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const outFlag = args.indexOf("--out");
const outDir = outFlag >= 0 ? path.resolve(args.splice(outFlag, 2)[1]) : null;
const [id, ...spec] = args;
if (!id || spec.length === 0) {
  console.error("usage: npm run stills -- <id> <seconds...> | every <step> [--out dir]");
  process.exit(1);
}

const serveUrl = await bundle({
  entryPoint: path.join(ROOT, "src/videos", id, "entry.tsx"),
  rootDir: ROOT,
  publicDir: path.join(ROOT, "public"),
});
const browser = await openBrowser("chrome");
const composition = await selectComposition({ serveUrl, id, puppeteerInstance: browser });
const length = composition.durationInFrames / composition.fps;
const times =
  spec[0] === "every"
    ? Array.from({ length: Math.floor(length / Number(spec[1])) + 1 }, (_, i) => +(i * Number(spec[1])).toFixed(2))
    : spec.map(Number);
const dir = outDir ?? path.join(ROOT, "out", id);
for (const s of times) {
  const frame = Math.min(composition.durationInFrames - 1, Math.round(s * composition.fps));
  const output = path.join(dir, `t${s}.png`);
  await renderStill({ serveUrl, composition, frame, output, puppeteerInstance: browser, overwrite: true });
  console.log(output);
}
await browser.close({ silent: true });
