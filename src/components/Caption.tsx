import { interpolateColors } from "remotion";
import { easeIn, easeMove, ramp, useTime } from "../anim";
import { useNarration, type Line } from "../narration";
import { color, font, layout } from "../theme";
import { Tex } from "./Tex";

// Kinetic narration captions, the signature of the style:
// - each word rises into its own clipped box at the moment it is spoken
// - the newest words are dark ink, then settle to soft gray once read;
//   words marked *like this* in the script stay dark
// - when the next line starts, the words slide up out of their boxes,
//   staggered left to right
const ENTER = 0.28;
const SETTLE_AFTER = 0.45;
const SETTLE = 0.35;
const EXIT = 0.32;
const EXIT_STAGGER = 0.025;

const Word = ({ token, exitAt, index }: { token: Line["tokens"][number]; exitAt: number; index: number }) => {
  const t = useTime();
  const enter = ramp(t, token.start - 0.04, ENTER, easeIn);
  const exit = exitAt === Infinity ? 0 : ramp(t, exitAt + index * EXIT_STAGGER, EXIT, easeMove);
  if (enter <= 0 || exit >= 1) return <span style={{ display: "inline-block", visibility: "hidden" }}>{label(token)}</span>;
  const settle = token.emph ? 0 : ramp(t, token.start + SETTLE_AFTER, SETTLE);
  const ink = interpolateColors(settle, [0, 1], [color.ink, color.inkSoft]);
  const y = (1 - enter) * 105 - exit * 105;
  return (
    <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}>
      <span style={{ display: "inline-block", transform: `translateY(${y}%)`, color: ink }}>{label(token, ink)}</span>
    </span>
  );
};

const label = (token: Line["tokens"][number], ink: string = color.ink) => {
  if (!token.tex) return token.text;
  // $x$ plus any punctuation glued to it, e.g. "$dx$:"
  const m = token.text.match(/^(.*)\$(.+)\$(.*)$/);
  if (!m) return token.text;
  return (
    <>
      {m[1]}
      <Tex tex={m[2]} size={layout.captionSize * 0.98} style={{ color: ink }} />
      {m[3]}
    </>
  );
};

export const Captions = ({ top = layout.captionTop, size = layout.captionSize }: { top?: number; size?: number }) => {
  const { lines } = useNarration();
  const t = useTime();
  return (
    <>
      {lines.map((line, i) => {
        const next = lines[i + 1];
        // Clear just before the next line is spoken; the last line stays.
        const exitAt = next ? Math.max(line.end, next.start - EXIT - 0.05) : Infinity;
        if (line.caption === false) return null;
        if (t < line.start - 0.1 || t > exitAt + EXIT + line.tokens.length * EXIT_STAGGER) return null;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: layout.margin,
              right: layout.margin,
              top,
              fontFamily: font.sans,
              fontWeight: 500,
              fontSize: size,
              lineHeight: 1.2,
              letterSpacing: "-0.012em",
            }}
          >
            {line.tokens.map((token, j) => (
              <span key={j}>
                <Word token={token} exitAt={exitAt} index={j} />{" "}
              </span>
            ))}
          </div>
        );
      })}
    </>
  );
};
