import katex from "katex";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { continueRender, delayRender } from "remotion";
import { color as palette, layout } from "../theme";

// KaTeX gives the Computer Modern math the reference videos use.
// \acc{20} colors in the accent, \soft{...} in the quiet label gray. In a
// macro body "#2" would mean "argument 2", so the hex colors' # is doubled.
const hex = (c: string) => c.replace("#", "##");
const macros = {
  "\\acc": `\\textcolor{${hex(palette.accent)}}{#1}`,
  "\\soft": `\\textcolor{${hex(palette.label)}}{#1}`,
};

export const Tex = ({
  tex,
  size = layout.texSize,
  display = false,
  color,
  style,
}: {
  tex: string;
  size?: number;
  display?: boolean;
  color?: string;
  style?: CSSProperties;
}) => {
  const html = useMemo(
    () => katex.renderToString(tex, { throwOnError: false, displayMode: display, macros: { ...macros } }),
    [tex, display],
  );
  return (
    <span
      style={{ fontSize: size, color: palette.ink, lineHeight: 1, whiteSpace: "nowrap", ...(color ? { color } : null), ...style }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

/**
 * A formula whose [bracketed] parts can light up in the accent without the
 * layout moving: every bracket is wrapped in \textcolor in both versions, so
 * the plain and the lit formula are glyph-for-glyph identical. Stack them with
 * <Layers> to light a part up in place.
 *   lit("(x - [1])(x - [5])", true)    -> 1 and 5 in accent
 *   lit("(x [- 3])^2 [+ 2]", [0], [1]) -> "- 3" in accent, "+ 2" reserved but invisible
 */
export const lit = (tex: string, on: boolean | number[], hide: number[] = []) => {
  let k = -1;
  return tex.replace(/\[([^\]]+)\]/g, (_, body: string) => {
    k++;
    const hot = on === true || (Array.isArray(on) && on.includes(k));
    // hidden parts still take their space, so a later version can reveal them in place
    const ink = hide.includes(k) ? "transparent" : hot ? palette.accent : palette.ink;
    const c = (s: string) => `\\textcolor{${ink}}{${s}}`;
    // "[- 4]" keeps the spacing of a binary minus: color the operator inside \mathbin.
    const op = body.match(/^([+-])\s*(.*)$/);
    return op ? `\\mathbin{${c(op[1])}}${c(op[2])}` : c(body);
  });
};

/**
 * The KaTeX fonts load only once something uses them. A video that draws
 * single glyphs with <MathGlyph> holds its first frame until they are in.
 */
export const useKatexFonts = (size: number) => {
  const [handle] = useState(() => delayRender("katex fonts"));
  useEffect(() => {
    Promise.all([document.fonts.load(`italic ${size}px KaTeX_Math`), document.fonts.load(`${size}px KaTeX_Main`)]).then(() =>
      continueRender(handle),
    );
  }, [handle, size]);
};

/** One KaTeX glyph as SVG text, so a single symbol can move on its own (a denominator swinging across). */
export const MathGlyph = ({
  x,
  y,
  ch,
  size,
  italic = false,
  fill = palette.ink,
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
