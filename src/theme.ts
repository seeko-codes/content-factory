import { loadFont as loadSans } from "@remotion/google-fonts/InterTight";
import { loadFont as loadMono } from "@remotion/google-fonts/IBMPlexMono";
import "katex/dist/katex.min.css";

// House tokens informed by reference samples; see STYLE.md and the Ubilum audit.
export const color = {
  paper: "#f9f9f4", // warm off-white page
  ink: "#12130b", // newest caption words, curves, emphasis
  inkSoft: "#484843", // caption words once they have been read
  label: "#8b8b85", // axis numbers, units, quiet labels
  operator: "#77776f", // = and ≈ between a label and its value
  rule: "#d8d9d1", // axes and grid
  ruleFaint: "#e7e7e1",
  accent: "#2b5a9e", // the single highlight color
  accentFill: "#bac8de", // solid area under a curve
  accentWash: "#e3e8f2", // translucent strips and regions
  chip: "#efefeb", // readout chip background
};

const sans = loadSans("normal", { weights: ["400", "500"], subsets: ["latin"] });
const mono = loadMono("normal", { weights: ["400", "500", "600"], subsets: ["latin"] });
export const font = {
  sans: sans.fontFamily,
  mono: mono.fontFamily,
};

// 1080x1920 layout. Everything important stays above y=1480: the bottom of a
// reel is covered by the platform's caption and buttons.
export const layout = {
  width: 1080,
  height: 1920,
  fps: 60,
  margin: 100,
  captionTop: 300,
  captionSize: 58,
  titleSize: 104,
  monoSize: 56,
  texSize: 64,
  safeBottom: 1480,
};

export const brand = {
  // The end card is just the name, in plain type (components/Video.tsx). The brand kit lives in the ultralearn repo, brand/.
  name: "ultralearn",
};
