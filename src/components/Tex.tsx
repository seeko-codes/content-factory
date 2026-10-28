import katex from "katex";
import { useMemo, type CSSProperties } from "react";
import { color, layout } from "../theme";

// KaTeX gives the Computer Modern math the reference videos use.
// Use \textcolor{accent}{...} via the `accent` macro: \acc{20}.
const macros = {
  "\\acc": `\\textcolor{${color.accent}}{#1}`,
  "\\soft": `\\textcolor{${color.label}}{#1}`,
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
