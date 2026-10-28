import { useEffect, useState, type ReactNode } from "react";
import { continueRender, delayRender } from "remotion";
import { easeIn, ramp, useTime } from "../../anim";
import { Tex } from "../../components/Tex";
import { color, font, layout } from "../../theme";

// KaTeX glyphs drawn as SVG text, so single symbols can move on their own
// (a denominator swinging across, a numerator settling onto the baseline).
// The KaTeX fonts only load once something uses them, so hold the frame until
// they are in. Candidate for a shared "MathGlyph" component.
export const useKatexFonts = (size: number) => {
  const [handle] = useState(() => delayRender("katex fonts"));
  useEffect(() => {
    Promise.all([document.fonts.load(`italic ${size}px KaTeX_Math`), document.fonts.load(`${size}px KaTeX_Main`)]).then(() =>
      continueRender(handle),
    );
  }, [handle, size]);
};

export const Glyph = ({
  x,
  y,
  ch,
  size,
  italic = false,
  fill = color.ink,
  opacity = 1,
}: {
  x: number;
  y: number;
  ch: string;
  size: number;
  italic?: boolean;
  fill?: string;
  opacity?: number;
}) => (
  <text
    x={x}
    y={y}
    fontFamily={italic ? "KaTeX_Math" : "KaTeX_Main"}
    fontStyle={italic ? "italic" : "normal"}
    fontSize={size}
    textAnchor="middle"
    fill={fill}
    opacity={opacity}
  >
    {ch}
  </text>
);

// The shared Tex \acc macro expands to \textcolor{#2b5a9e}{#1}, and KaTeX
// reads the "#2" inside the hex color as a second macro argument, so \acc
// fails to parse. Color inline instead.
export const acc = (tex: string) => `\\textcolor{${color.accent}}{${tex}}`;

// One line of working, aligned on its relation sign at x = 540 so every
// step lines up under the one before. It rises in at `at`.
export const REL_X = 540;
// KaTeX draws at 1.21x the font size it is given (.katex { font-size: 1.21em }).
export const STEP_EM = layout.texSize * 1.21;
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
