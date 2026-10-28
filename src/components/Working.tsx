import type { ReactNode } from "react";
import { easeIn, ramp, useTime } from "../anim";
import { color, font, layout } from "../theme";
import { Tex } from "./Tex";

// Rows of algebra working, each aligned on its relation sign at x = 540 so
// every step lines up under the one before:
//   5x + 10 = 3x - 12
//        2x = -22
//         x = -11

export const REL_X = 540;
// KaTeX draws at 1.21x the font size it is given (.katex { font-size: 1.21em }).
export const STEP_EM = layout.texSize * 1.21;

/** One line of working that rises in at `at` and leaves at `out`. `label` sits at the margin ("check"). */
export const Step = ({
  top,
  left,
  rel = "=",
  right,
  at,
  out = Infinity,
  label,
}: {
  top: number;
  left: string;
  rel?: string;
  right: string;
  at: number;
  out?: number;
  label?: ReactNode;
}) => {
  const t = useTime();
  const p = ramp(t, at, 0.45, easeIn) * (out === Infinity ? 1 : 1 - ramp(t, out, 0.4));
  if (p <= 0) return null;
  const relW = 0.778 * STEP_EM;
  const gap = 0.278 * STEP_EM;
  return (
    <div
      style={{
        position: "absolute",
        left: layout.margin,
        width: layout.width - 2 * layout.margin,
        top,
        display: "flex",
        alignItems: "baseline",
        opacity: p,
        transform: `translateY(${(1 - p) * 14}px)`,
      }}
    >
      <div style={{ width: REL_X - relW / 2 - gap - layout.margin, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span style={{ fontFamily: font.mono, fontSize: 36, color: color.label }}>{label}</span>
        <Tex tex={left} />
      </div>
      <Tex tex={rel} style={{ margin: `0 ${gap}px` }} />
      <Tex tex={right} />
    </div>
  );
};
