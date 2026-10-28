import katex from "katex";
import { useMemo, type CSSProperties } from "react";
import { color, layout } from "../theme";

// KaTeX gives the Computer Modern math the reference videos use.
// \acc{20} colors in the accent, \soft{...} in the quiet label gray. In a
// macro body "#2" would mean "argument 2", so the hex colors' # is doubled.
const hex = (c: string) => c.replace("#", "##");
const macros = {
  "\\acc": `\\textcolor{${hex(color.accent)}}{#1}`,
  "\\soft": `\\textcolor{${hex(color.label)}}{#1}`,
};

export const Tex = ({
  tex,
  size = layout.texSize,
  display = false,
  style,
}: {
  tex: string;
  size?: number;
  display?: boolean;
  style?: CSSProperties;
}) => {
  const html = useMemo(
    () => katex.renderToString(tex, { throwOnError: false, displayMode: display, macros: { ...macros } }),
    [tex, display],
  );
  return (
    <span
      style={{ fontSize: size, color: color.ink, lineHeight: 1, whiteSpace: "nowrap", ...style }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
