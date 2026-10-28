import { interpolateColors } from "remotion";
import { easeIn, easeMove, lerp, ramp, useTime, visible } from "../../anim";
import { Layer } from "../../components/Chart";
import { useNarration } from "../../narration";
import { color } from "../../theme";
import { acc, Glyph, REL_X, Step, STEP_EM, useKatexFonts } from "./parts";

// (x + 2)/3 = (x - 4)/5.
//   Trap: 5x + 2 = 3x - 4, 2x = -6, x = -3. Check: -1/3 vs -7/5, no match.
//   Right: 5(x + 2) = 3(x - 4), 5x + 10 = 3x - 12, 2x = -22, x = -11. Check: -9/3 = -15/5 = -3.
//
// The hero equation is laid out by hand from KaTeX's metrics (in em) so each
// symbol can move: the denominators swing across while the fraction bars curl
// into parentheses around the numerators.
const F = 92; // hero size, px per em
const em = (v: number) => v * F;
const YB = 690; // baseline of the finished one-line equation
const NUM_Y = YB - em(0.677); // numerator baseline in a display fraction
const DEN_Y = YB + em(0.686); // denominator baseline
const BAR_Y = YB - em(0.25); // fraction bar on the math axis
const NUM_W = em(2.294); // "x + 2": x .572, +- .778 with .222 each side, digit .5
const REL = em(0.667); // half of "=" with its thick spaces
// Before: two display fractions either side of "=".
const C0 = { L: 540 - REL - em(1.267), R: 540 + REL + em(1.267) };
// After: 5(x + 2) = 3(x - 4), 8.478em wide.
const left = 540 - em(4.239);
const C1 = {
  five: left + em(0.25),
  parenL: [left + em(0.6945), left + em(3.3775)],
  numL: left + em(0.889) + NUM_W / 2,
  three: 540 + REL + em(0.25),
  parenR: [540 + REL + em(0.6945), 540 + REL + em(3.3775)],
  numR: 540 + REL + em(0.889) + NUM_W / 2,
};

const ROWS = [830, 930, 1030, 1160];
type Pt = [number, number];
const mix = (a: Pt, b: Pt, p: number): Pt => [lerp(a[0], b[0], p), lerp(a[1], b[1], p)];
const quadAt = (a: Pt, c: Pt, b: Pt, p: number): Pt => mix(mix(a, c, p), mix(c, b, p), p);

// A numerator "x + 2" centered at cx on baseline y.
const Numerator = ({ cx, y, op, digit }: { cx: number; y: number; op: string; digit: string }) => {
  const l = cx - NUM_W / 2;
  return (
    <>
      <Glyph x={l + em(0.286)} y={y} ch="x" size={F} italic />
      <Glyph x={l + em(1.183)} y={y} ch={op} size={F} />
      <Glyph x={l + em(2.044)} y={y} ch={digit} size={F} />
    </>
  );
};

// One half of a fraction bar curling up into a parenthesis around a numerator
// on baseline `base`: the outer end lifts to the top of the paren while the
// inner end slides out to its foot. side -1 = "(", +1 = ")".
const Curl = ({ cx, pc, side, p, stroke, base }: { cx: number; pc: number; side: -1 | 1; p: number; stroke: string; base: number }) => {
  const outer: Pt = [cx + (side * NUM_W) / 2, BAR_Y];
  const inner: Pt = [cx, BAR_Y];
  const top = mix(outer, [pc - side * em(0.1), base - em(0.72)], p);
  const bottom = mix(inner, [pc - side * em(0.1), base + em(0.22)], p);
  const ctrl = mix(mix(outer, inner, 0.5), [pc + side * em(0.2), base - em(0.25)], p);
  return (
    <path
      d={`M${top[0]},${top[1]}Q${ctrl[0]},${ctrl[1]} ${bottom[0]},${bottom[1]}`}
      fill="none"
      stroke={stroke}
      strokeWidth={lerp(4, 5.5, p)}
      strokeLinecap={p > 0 ? "round" : "butt"}
    />
  );
};

// A curved arrow from a multiplier to one term, drawn on.
const Reach = ({ from, to, lift, p }: { from: Pt; to: Pt; lift: number; p: number }) => {
  if (p <= 0) return null;
  const c: Pt = [(from[0] + to[0]) / 2, Math.min(from[1], to[1]) - lift];
  const end = quadAt(from, c, to, p);
  const dir = mix(c, to, p);
  const ang = Math.atan2(end[1] - dir[1], end[0] - dir[0]);
  const h = 16;
  const wing = (s: number): Pt => [end[0] - h * Math.cos(ang + s * 0.5), end[1] - h * Math.sin(ang + s * 0.5)];
  return (
    <>
      <path
        d={`M${from[0]},${from[1]}Q${c[0]},${c[1]} ${to[0]},${to[1]}`}
        pathLength={1}
        strokeDasharray={`${p} 1`}
        fill="none"
        stroke={color.accent}
        strokeWidth={4}
        strokeLinecap="round"
      />
      <path d={`M${wing(1)[0]},${wing(1)[1]}L${end[0]},${end[1]}L${wing(-1)[0]},${wing(-1)[1]}`} fill="none" stroke={color.accent} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
    </>
  );
};

export const CrossMultiply = () => {
  useKatexFonts(F);
  const t = useTime();
  const { cue, lines } = useNarration();
  const wrong = cue("wrong");
  const then = cue("then");
  const neg3 = cue("neg3");
  const sides = cue("sides");
  const trap = cue("trap");
  const bar = cue("bar");
  const groups = cue("groups");
  const swing = cue("swing");
  const curl = cue("curl");
  const mult = cue("mult");
  const terms = cue("terms");
  const right = cue("right");
  const neg11 = cue("neg11");
  const check2 = cue("check2");
  const clearWrong = lines[6].start - 0.45;

  // The move: denominators swing across and the numerators slide over; on "keep"
  // the bars curl up around the raised numerators, then each group settles onto the baseline.
  const sw = ramp(t, swing, 1.1, easeMove);
  const cu = ramp(t, curl - 0.1, 0.7, easeMove);
  const glyphParen = ramp(t, curl + 0.45, 0.2);
  const drop = ramp(t, curl + 0.55, 0.55, easeMove);
  const barInk = interpolateColors(ramp(t, bar, 0.45), [0, 1], [color.ink, color.accent]);
  const wash = visible(t, groups, curl - 0.1, 0.4);

  const numL = lerp(C0.L, C1.numL, sw);
  const numR = lerp(C0.R, C1.numR, sw);
  const numY = lerp(NUM_Y, YB, drop);
  // They swing at once: the 5 dips deep and the 3 passes under the "=" before rising, so nothing touches.
  const five = quadAt([C0.R, DEN_Y], [(C0.R + C1.five) / 2, DEN_Y + em(2.0)], [C1.five, YB], sw);
  const three = quadAt([C0.L, DEN_Y], [C1.three, DEN_Y + em(0.6)], [C1.three, YB], sw);

  // Strikes through the trap's working.
  const strike = (i: number) => ramp(t, trap + 0.1 + i * 0.16, 0.4, easeMove);
  const wrongOut = 1 - ramp(t, clearWrong, 0.4);
  // Extents from KaTeX widths: "5x + 2" 2.794em, "2x" 1.072em, "x" .572em, "-6" 1.278em; "=" sits at 540.
  const relL = REL_X - STEP_EM * (0.389 + 0.278);
  const relR = REL_X + STEP_EM * (0.389 + 0.278);
  const strikeRows: [number, number][] = [
    [relL - STEP_EM * 2.794 - 14, relR + STEP_EM * 2.794 + 14],
    [relL - STEP_EM * 1.072 - 14, relR + STEP_EM * 1.278 + 14],
    [relL - STEP_EM * 0.572 - 14, relR + STEP_EM * 1.278 + 14],
  ];

  // Arrows: each multiplier reaches both terms.
  const reach = (i: number) => ramp(t, mult + i * 0.22, 0.5, easeMove);
  const startY = YB - em(0.8); // just above the multiplier
  const xTop = YB - em(0.74); // just above x
  const digitTop = YB - em(0.86); // just above the second term

  return (
    <>
      <Layer>
        {/* "The fraction bar groups x + 2": a soft wash behind each numerator */}
        {wash > 0 &&
          [numL, numR].map((cx, i) => (
            <rect
              key={i}
              x={cx - NUM_W / 2 - 16}
              y={numY - em(0.78)}
              width={NUM_W + 32}
              height={em(1.02)}
              rx={14}
              fill={color.accentWash}
              opacity={wash}
            />
          ))}

        {/* Hero equation */}
        <Numerator cx={numL} y={numY} op="+" digit="2" />
        <Numerator cx={numR} y={numY} op="−" digit="4" />
        <Glyph x={540} y={YB} ch="=" size={F} />
        <Glyph x={three[0]} y={three[1]} ch="3" size={F} />
        <Glyph x={five[0]} y={five[1]} ch="5" size={F} />

        {/* Fraction bars: two halves each, curling into parentheses */}
        {(
          [
            [numL, C1.parenL[0], -1],
            [numL, C1.parenL[1], 1],
            [numR, C1.parenR[0], -1],
            [numR, C1.parenR[1], 1],
          ] as const
        ).map(([cx, pc, side], i) => (
          <g key={i} opacity={1 - glyphParen}>
            <Curl cx={cx} pc={pc} side={side} p={cu} stroke={barInk} base={numY} />
          </g>
        ))}
        {glyphParen > 0 &&
          [
            [C1.parenL[0], "("],
            [C1.parenL[1], ")"],
            [C1.parenR[0], "("],
            [C1.parenR[1], ")"],
          ].map(([x, ch]) => <Glyph key={`${x}`} x={x as number} y={numY} ch={ch as string} size={F} fill={color.accent} opacity={glyphParen} />)}

        {/* Now 5 multiplies both terms (and 3 does too) */}
        <Reach from={[C1.five + 8, startY]} to={[C1.numL - NUM_W / 2 + em(0.34), xTop]} lift={38} p={reach(0)} />
        <Reach from={[C1.five - 4, startY - 4]} to={[C1.numL - NUM_W / 2 + em(2.044), digitTop]} lift={84} p={reach(1)} />
        <Reach from={[C1.three + 8, startY]} to={[C1.numR - NUM_W / 2 + em(0.34), xTop]} lift={38} p={reach(2)} />
        <Reach from={[C1.three - 4, startY - 4]} to={[C1.numR - NUM_W / 2 + em(2.044), digitTop]} lift={84} p={reach(3)} />

        {/* The accent strike through the trap */}
        {strikeRows.map(([x1, x2], i) =>
          strike(i) > 0 ? (
            <line
              key={i}
              x1={x1}
              y1={ROWS[i] + 47}
              x2={lerp(x1, x2, strike(i))}
              y2={ROWS[i] + 47}
              stroke={color.accent}
              strokeWidth={6}
              strokeLinecap="round"
              opacity={wrongOut}
            />
          ) : null,
        )}
      </Layer>

      {/* The trap, in ink */}
      <Step top={ROWS[0]} left="5x + 2" right="3x - 4" at={wrong} out={clearWrong} />
      <Step top={ROWS[1]} left="2x" right="-6" at={then} out={clearWrong} />
      <Step top={ROWS[2]} left="x" right="-3" at={neg3} out={clearWrong} />
      <Step top={ROWS[3]} label="check" left="\dfrac{-1}{3}" rel="\neq" right="\dfrac{-7}{5}" at={sides} out={clearWrong} />

      {/* The right path */}
      <Step top={ROWS[0]} left={`5x ${acc("+ 10")}`} right={`3x ${acc("- 12")}`} at={terms + 0.1} />
      <Step top={ROWS[1]} left="2x" right="-22" at={right} />
      <Step top={ROWS[2]} left="x" right={acc("-11")} at={neg11} />
      <Step top={ROWS[3]} label="check" left="\dfrac{-9}{3}" right="\dfrac{-15}{5}" at={check2 + 0.2} />
    </>
  );
};
