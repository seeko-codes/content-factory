import { interpolateColors } from "remotion";
import { easeIn, easeMove, lerp, ramp, useTime, visible } from "../../anim";
import { fnPath, Layer, MonoLabel, scale } from "../../components/Chart";
import { PICTURE_ROW, PictureRow } from "../../components/Cards";
import { Mono, Op } from "../../components/Readout";
import { Swap } from "../../components/Swap";
import { Tex } from "../../components/Tex";
import { ChapterNav, Chip, TitleCard } from "../../components/Title";
import { useNarration } from "../../narration";
import { color, font, layout } from "../../theme";
import { Thumb, type Kind } from "./Thumbs";

// Algebra 1 in five pictures, all on one grid:
//   y = 2x + 1 (start 1, rate 2) and y = 7 - x meet at x = 2 (2x + 1 = 7 - x, 3x = 6);
//   the second line pivots to y = 2x + 5 (no crossing), then slides onto y = 2x + 1 (infinitely many);
//   y > 2x + 1 keeps the half plane above a dashed line;
//   y = x^2 + 5x + 6 = (x + 2)(x + 3) touches down at -2 and -3 (vertex (-2.5, -0.25)).
const G = { x: 100, y: 640, w: 880, h: 800 }; // 80 px per unit both ways
const domA = { x0: -3.5, x1: 7.5, y0: -1, y1: 9 };
const domB = { x0: -5.5, x1: 0.5, y0: -0.6, y1: 4.85 }; // the parabola's page: the grid zooms in on the zeros
const quad = (x: number) => x * x + 5 * x + 6;
const rowTop = 500;
const listTop = 520;

const ROWS: { kind: Kind; term: string; meaning: string }[] = [
  { kind: "line", term: "Slope-intercept form", meaning: "a start plus a rate" },
  { kind: "meet", term: "Solving equations", meaning: "where two graphs meet" },
  { kind: "system", term: "Systems", meaning: "1, 0 or ∞ crossings" },
  { kind: "half", term: "Inequalities", meaning: "half the plane" },
  { kind: "zeros", term: "Factoring", meaning: "the zeros, read off" },
];


export const Algebra1 = () => {
  const t = useTime();
  const { cue, lines } = useNarration();
  const hook = lines[0].start;
  const five = cue("five");
  const line = cue("line");
  const climb = cue("climb");
  const named = lines[3].start;
  const start = cue("start");
  const rate = cue("rate");
  const second = cue("second");
  const solve = cue("solve");
  const meet = cue("meet");
  const parallel = cue("parallel");
  const zero = cue("zero");
  const merge = cue("merge");
  const inf = cue("inf");
  const ineq = cue("ineq");
  const gt = cue("gt");
  const flood = cue("flood");
  const half = cue("half");
  const parab = cue("parab");
  const factor = cue("factor");
  const zeros = cue("zeros");
  const z3 = cue("z3");
  const reads = cue("reads");
  const recap = cue("recap");

  // Opening: the title holds until the hook is spoken; the syllabus waits for its pictures.
  const title = 1 - ramp(t, hook - 0.45, 0.4);
  const listOut = ramp(t, line - 0.55, 0.45);
  const grid = ramp(t, line - 0.2, 0.5, easeIn) * (1 - ramp(t, recap - 0.65, 0.45));

  // The page glides and zooms so the parabola's zeros sit mid-frame.
  const shift = ramp(t, parab - 0.15, 0.9);
  const S = scale(G, {
    x0: lerp(domA.x0, domB.x0, shift),
    x1: lerp(domA.x1, domB.x1, shift),
    y0: lerp(domA.y0, domB.y0, shift),
    y1: lerp(domA.y1, domB.y1, shift),
  });
  const P = (x: number, y: number) => `${S.X(x).toFixed(2)},${S.Y(y).toFixed(2)}`;
  const linePath = (m: number, b: number) => `M${P(-9, m * -9 + b)}L${P(9, m * 9 + b)}`;

  // Beat 1: start plus rate.
  const stairsGone = 1 - ramp(t, second - 0.15, 0.4);
  const stairs = ramp(t, climb, 1.5, easeMove);
  const clearLines = ramp(t, lines[12].start - 0.55, 0.45);
  const l1 = ramp(t, named - 0.05, 0.9);

  // Beats 2-3: the second line crosses, pivots parallel (about (2/3, 19/3)), then slides onto the first.
  const l2 = ramp(t, second, 1.0);
  const pivot = ramp(t, parallel, 1.0);
  const slide = ramp(t, merge, 0.9);
  const m2 = -1 + 3 * pivot;
  const b2 = 7 - 2 * pivot - 4 * slide;
  const l2Gone = 1 - ramp(t, ineq - 0.25, 0.4);
  const l2Color = interpolateColors(ramp(t, inf, 0.4), [0, 1], [color.ink, color.accent]);
  const crossX = m2 < 2 ? (b2 - 1) / (2 - m2) : Infinity;
  const crossDot = ramp(t, meet, 0.4, easeIn) * (1 - ramp(t, zero - 0.1, 0.3));
  const guide = visible(t, meet + 0.25, parallel);
  const crossings = t < zero ? "1" : t < inf ? "0" : "∞";

  // Beat 4: the boundary turns dashed and the half plane above fills.
  const dashed = ramp(t, gt, 0.5);
  const fill = ramp(t, flood, 1.2, easeMove) * (1 - clearLines);
  const dim = 0.92 * ramp(t, half, 0.7) * (1 - clearLines);

  // Beat 5: the parabola and its zeros.
  const curve = ramp(t, parab + 0.45, 1.1);
  const curveOut = 1 - ramp(t, recap - 0.65, 0.45);
  const zeroA = ramp(t, zeros, 0.4, easeIn);
  const zeroB = ramp(t, z3, 0.4, easeIn);
  const readP = ramp(t, reads, 0.45, easeIn);

  return (
    <>
      <ChapterNav
        numbered={false}
        chapters={["Alg 1", "Alg 2", "Geo", "Trig"]}
        active={0}
        style={{ position: "absolute", left: layout.margin, top: 222 }}
      />
      {title > 0 && (
        <div style={{ position: "absolute", inset: 0, opacity: title, transform: `translateY(${-(1 - title) * 24}px)` }}>
          <TitleCard title="Algebra 1" />
        </div>
      )}

      {/* The year as a syllabus; the pictures arrive on "five pictures" */}
      {listOut < 1 &&
        ROWS.map((r, i) => (
          <PictureRow
            key={r.kind}
            top={listTop + i * PICTURE_ROW.h}
            term={r.term}
            picture={ramp(t, five + 0.45 + i * 0.1, 0.45, easeIn) * (1 - listOut)}
            text={1 - listOut}
            rise={-listOut * 16}
            indent={ramp(t, five, 0.6)}
          >
            <Thumb kind={r.kind} id={`sat002-hook-${i}`} />
          </PictureRow>
        ))}

      {/* Recap: the same five, with what each picture means */}
      {ROWS.map((r, i) => {
        const p = ramp(t, recap + i * 0.12, 0.5, easeIn);
        if (p <= 0) return null;
        return (
          <PictureRow key={`recap-${r.kind}`} top={listTop + i * PICTURE_ROW.h} term={r.term} meaning={r.meaning} picture={p} text={p} rise={(1 - p) * 16}>
            <Thumb kind={r.kind} id={`sat002-recap-${i}`} />
          </PictureRow>
        );
      })}

      {/* Readout row: each picture's equation, named after it is drawn */}
      <Swap
        style={{ left: layout.margin, top: rowTop }}
        states={[
          [named, <Tex tex="y = 2x + 1" />],
          [solve, <Tex tex="2x + 1 = 7 - x" />],
          [parallel, <Chip label="crossings" value={crossings} />],
          [ineq, <Tex tex="y = 2x + 1" />],
          [gt, <Tex tex="y > 2x + 1" />],
          [parab, <Tex tex="y = x^2 + 5x + 6" />],
          [
            factor,
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              <Tex tex="y =" style={{ marginRight: 18 }} />
              {(["x + 2", "x + 3"] as const).map((f, i) => (
                <div key={f} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <Tex tex={`(${f})`} />
                  <span style={{ fontFamily: font.mono, fontSize: 40, fontWeight: 600, color: color.accent, marginTop: 6, opacity: readP, transform: `translateY(${(1 - readP) * 10}px)` }}>
                    {i === 0 ? "−2" : "−3"}
                  </span>
                </div>
              ))}
            </div>,
          ],
          [recap - 0.65, null],
        ]}
      />
      <Swap
        style={{ right: layout.margin, top: rowTop + 6 }}
        states={[
          [meet, <><Tex tex="x" /><Op tex="=" /><Mono c={color.accent}>2</Mono></>],
          [parallel, null],
        ]}
      />

      <Layer opacity={grid}>
        <defs>
          <clipPath id="sat002-grid">
            <rect x={G.x} y={G.y} width={G.w} height={G.h} />
          </clipPath>
        </defs>
        <g clipPath="url(#sat002-grid)">
          {/* Grid: faint unit lines, axes a shade darker */}
          {Array.from({ length: 17 }, (_, i) => i - 8).map((k) => (
            <line key={`v${k}`} x1={S.X(k)} y1={G.y} x2={S.X(k)} y2={G.y + G.h} stroke={k === 0 ? color.rule : color.ruleFaint} strokeWidth={k === 0 ? 2.5 : 1.5} />
          ))}
          {Array.from({ length: 11 }, (_, i) => i - 1).map((k) => (
            <line key={`h${k}`} x1={G.x} y1={S.Y(k)} x2={G.x + G.w} y2={S.Y(k)} stroke={k === 0 ? color.rule : color.ruleFaint} strokeWidth={k === 0 ? 2.5 : 1.5} />
          ))}

          {/* Inequality: the kept half fills from the line up; the other half fades */}
          {fill > 0 && (
            <path
              d={`M${P(-9, -17)}L${P(9, 19)}L${P(9, 19 + 40 * fill)}L${P(-9, -17 + 40 * fill)}Z`}
              fill={color.accentWash}
              opacity={1 - clearLines}
            />
          )}
          {dim > 0 && <path d={`M${P(-9, -17)}L${P(9, 19)}L${P(9, -20)}L${P(-9, -20)}Z`} fill={color.paper} opacity={dim} />}

          {/* Beat 1: the staircase from the start, 2 up for every 1 across */}
          {stairs > 0 && stairsGone > 0 && (
            <path
              d={`M${P(0, 1)}H${S.X(1)}V${S.Y(3)}H${S.X(2)}V${S.Y(5)}H${S.X(3)}V${S.Y(7)}H${S.X(4)}V${S.Y(9)}`}
              pathLength={1}
              strokeDasharray={`${stairs} 1`}
              fill="none"
              stroke={color.accent}
              strokeWidth={4.5}
              strokeLinejoin="round"
              strokeLinecap="round"
              opacity={stairsGone}
            />
          )}

          {/* The first line: solid, then the dashed boundary of y > 2x + 1 */}
          {l1 > 0 && (
            <>
              <path
                d={`M${P(-1.2, -1.4)}L${P(4.2, 9.4)}`}
                pathLength={1}
                strokeDasharray={`${l1} 1`}
                fill="none"
                stroke={color.ink}
                strokeWidth={5.5}
                strokeLinecap="round"
                opacity={(1 - dashed) * (1 - clearLines)}
              />
              <path d={linePath(2, 1)} fill="none" stroke={color.ink} strokeWidth={5.5} strokeDasharray="22 16" opacity={dashed * (1 - clearLines)} />
            </>
          )}

          {/* The second line */}
          {l2 > 0 && l2Gone > 0 && (
            <path
              d={`M${P(-4, m2 * -4 + b2)}L${P(8, m2 * 8 + b2)}`}
              pathLength={1}
              strokeDasharray={`${l2} 1`}
              fill="none"
              stroke={l2Color}
              strokeWidth={5.5}
              strokeLinecap="round"
              opacity={l2Gone}
            />
          )}

          {/* Where they meet: x = 2 */}
          {guide > 0 && (
            <line x1={S.X(2)} y1={S.Y(5)} x2={S.X(2)} y2={S.Y(0)} stroke={color.label} strokeWidth={3} strokeDasharray="12 10" opacity={guide} />
          )}
          {crossDot > 0 && Number.isFinite(crossX) && <circle cx={S.X(crossX)} cy={S.Y(2 * crossX + 1)} r={13} fill={color.accent} opacity={crossDot} />}

          {/* The parabola touches down at -3 and -2 */}
          {curve > 0 && (
            <path
              d={fnPath(quad, -4.85, -4.85 + 4.7 * curve, S)}
              fill="none"
              stroke={color.ink}
              strokeWidth={5.5}
              strokeLinecap="round"
              opacity={curveOut}
            />
          )}
          {zeroB > 0 && <circle cx={S.X(-3)} cy={S.Y(0)} r={12 * zeroB} fill={color.accent} opacity={curveOut} />}
          {zeroA > 0 && <circle cx={S.X(-2)} cy={S.Y(0)} r={12 * zeroA} fill={color.accent} opacity={curveOut} />}
        </g>

        {/* Labels outside the clip */}
        <g opacity={1 - ramp(t, second - 0.15, 0.4)}>
          <text x={S.X(0) - 22} y={S.Y(1) + 13} textAnchor="end" fontFamily={font.mono} fontSize={38}>
            <tspan fill={color.label} opacity={visible(t, start)}>start </tspan>
            <tspan fill={color.ink} fontWeight={600} opacity={visible(t, line)}>1</tspan>
          </text>
          <text x={S.X(1) + 20} y={S.Y(2) + 13} fontFamily={font.mono} fontSize={38}>
            <tspan fill={color.accent} fontWeight={600} opacity={visible(t, climb + 0.3)}>+2</tspan>
            <tspan fill={color.label} opacity={visible(t, rate)}> rate</tspan>
          </text>
          {visible(t, line) > 0 && <circle cx={S.X(0)} cy={S.Y(1)} r={11} fill={color.ink} opacity={visible(t, line)} />}
        </g>
        <MonoLabel x={S.X(2)} y={S.Y(0) + 52} size={38} fill={color.accent} weight={600} opacity={guide}>2</MonoLabel>
        <MonoLabel x={S.X(-3)} y={S.Y(0) + 56} size={38} fill={color.accent} weight={600} opacity={zeroB * curveOut}>−3</MonoLabel>
        <MonoLabel x={S.X(-2)} y={S.Y(0) + 56} size={38} fill={color.accent} weight={600} opacity={zeroA * curveOut}>−2</MonoLabel>
      </Layer>
    </>
  );
};
