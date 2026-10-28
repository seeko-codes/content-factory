import { interpolateColors } from "remotion";
import { drawOn, easeIn, easeMove, lerp, ramp, useTime, visible } from "../../anim";
import { fnPath, Layer, MonoLabel, scale, type Box } from "../../components/Chart";
import { gridSlot } from "../../components/Cards";
import { Label, Mono, Op } from "../../components/Readout";
import { Swap } from "../../components/Swap";
import { Tex } from "../../components/Tex";
import { NavTrack, Rise, TitleCard } from "../../components/Title";
import { useNarration } from "../../narration";
import { color, font, layout } from "../../theme";

// The four pictures, all from one start value of 3:
//   line        y = 3 + 2x          3, 5, 7, 9, 11   (the step is always +2)
//   parabola    y = x^2 - 3x + 3    3, 1, 1, 3, 7    (steps -2, 0, +2, +4: the step grows)
//   exponential y = 3 * 2^x         3, 6, 12         (doubles)
//   data        1 2 3 3 4 4 4 5 6 8: sum 40, mean 4; 5, 6, 8 sit above it, 3 of 10 = 30%
//   triangle    legs 3 and 4, hypotenuse 5 = the diameter of the circle around it
const line = (x: number) => 3 + 2 * x;
const parab = (x: number) => x * x - 3 * x + 3;
const expo = (x: number) => 3 * 2 ** x;
const bent = (p: number) => (x: number) => lerp(line(x), parab(x), p);
const DATA = [1, 2, 3, 3, 4, 4, 4, 5, 6, 8];
const MEAN = 4;
const stackIndex = DATA.map((v, i) => DATA.slice(0, i).filter((w) => w === v).length);

const CHAPTERS = ["algebra", "advanced", "data", "geometry"];
const COUNTS = ["13-15", "13-15", "5-7", "5-7"];

// Big diagram: one chart whose x-axis later becomes the number line.
const box = { x: 210, y: 770, w: 690, h: 560 };
const S = scale(box, { x0: 0, x1: 4.5, y0: 0, y1: 12 });
const base = S.Y(0); // 1330
const N = (v: number) => box.x + (v / 9) * box.w; // number line 0..9 on the same axis
const DOT_R = 27;
const slot = (k: number) => [N(DATA[k]), base - DOT_R - 4 - stackIndex[k] * 60] as const;
const bar = { x: box.x, y: 900, w: box.w, h: 56 };

// Right triangle inscribed in a circle: hypotenuse 5 is the horizontal diameter.
const tri = { cx: 540, cy: 1062, u: 120 };
const T = (x: number, y: number) => [tri.cx + x * tri.u, tri.cy - y * tri.u] as const;
const A = T(-2.5, 0), B = T(2.5, 0), C = T(-0.7, 2.4); // |AC| = 3, |CB| = 4, |AB| = 5
const VERTEX = [A, C, B]; // where the three accent dots (5, 6, 8) snap to

const rowTop = [528, 622];

const Count = ({ n }: { n: string }) => (
  <>
    <Label>questions</Label>
    <Op tex="=" />
    <Mono>{n}</Mono>
  </>
);

const signed = (v: number) => (v > 0 ? `+${v}` : v < 0 ? `−${-v}` : "0");
const rotate = ([x, y]: readonly [number, number], deg: number, [px, py]: readonly [number, number]) => {
  const a = (deg * Math.PI) / 180;
  return [px + (x - px) * Math.cos(a) - (y - py) * Math.sin(a), py + (x - px) * Math.sin(a) + (y - py) * Math.cos(a)] as const;
};

export const SatMath = () => {
  const t = useTime();
  const { cue, lines } = useNarration();
  const hook = lines[0].start;
  const start = cue("start");
  const step = cue("step");
  const lineCue = cue("line");
  const alg = cue("alg");
  const bend = cue("bend");
  const para = cue("para");
  const expoCue = cue("expo");
  const adv = cue("adv");
  const scatter = cue("scatter");
  const bal = cue("bal");
  const four = cue("four");
  const above = cue("above");
  const pct = cue("pct");
  const data = cue("data");
  const snap = cue("snap");
  const triWord = lines[11].tokens[5].start; // "triangle."
  const circle = cue("circle");
  const diam = cue("diam");
  const geo = cue("geo");
  const recap = [cue("r1"), cue("r2"), cue("r3"), cue("r4")];
  const settle = lines[15].start; // "Every question is one in disguise."
  const clear = recap[0] - 0.6;

  // Opening: title card over the four pictures; the title leaves like a caption.
  const titleOut = ramp(t, hook - 0.42, 0.32, easeMove);
  const subOut = ramp(t, hook - 0.38, 0.32, easeMove);
  const opening = 1 - ramp(t, start - 0.5, 0.4);

  // Beat 1-2: line, then bend into a parabola.
  const p = ramp(t, bend, 1.5);
  const f = bent(p);
  const chartAxes = visible(t, start - 0.15) * (1 - ramp(t, scatter, 0.4));
  const numberLine = visible(t, start - 0.15) * (1 - ramp(t, snap, 0.4));
  const stairs = 1 - ramp(t, scatter - 0.1, 0.35);
  const stepP = (i: number) => ramp(t, step + i * 0.3, 0.42, easeMove);
  const curveP = ramp(t, lineCue, 1.1);
  const curveO = 1 - ramp(t, scatter + 0.1, 0.4);
  const expoP = ramp(t, expoCue, 0.8);
  const stepDot = (i: number) => (i === 0 ? ramp(t, start, 0.35, easeIn) : ramp(t, step + (i - 1) * 0.3 + 0.36, 0.2, easeIn));

  // Beat 3: scatter into a dot plot, balance on a fulcrum, a percent bar.
  const dotOn = (k: number) => ramp(t, scatter + k * 0.03, 0.2, easeIn);
  const glide = (k: number) => ramp(t, scatter + 0.35 + k * 0.05, 0.9, easeMove);
  const dataTicks = ramp(t, scatter + 0.3, 0.5, easeIn) * (1 - ramp(t, snap, 0.4));
  const fulcrumO = ramp(t, bal, 0.35, easeIn) * (1 - ramp(t, snap, 0.4));
  const fv = lerp(6.5, MEAN, ramp(t, bal + 0.3, four - bal - 0.2, easeMove));
  const tilt = -2.4 * (fv - MEAN) * ramp(t, bal, 0.5);
  const pivot = [N(fv), base] as const;
  const meanMark = visible(t, four, above);
  const hi = ramp(t, above, 0.4); // the three dots above the mean
  const barO = visible(t, above) * (1 - ramp(t, snap, 0.4));
  const barFill = ramp(t, pct, 0.6);

  // Beat 4: three dots snap into a right triangle; circle it.
  const snapP = (j: number) => ramp(t, snap + j * 0.08, 0.9, easeMove);
  const triP = ramp(t, snap + 0.9, 0.8);
  const circP = ramp(t, circle, 1.0);
  const diamP = ramp(t, diam, 0.6);
  const geoO = 1 - ramp(t, clear, 0.45);

  const dots = DATA.map((v, k) => {
    const x0 = (4.4 * k) / 9;
    const onCurve = [S.X(x0), S.Y(parab(x0))] as const;
    const g = glide(k);
    let [x, y] = [lerp(onCurve[0], slot(k)[0], g), lerp(onCurve[1], slot(k)[1], g)];
    [x, y] = rotate([x, y], tilt, pivot);
    let r = lerp(9, DOT_R, g);
    let c = color.ink;
    let o = dotOn(k);
    if (k >= 7) {
      const j = k - 7;
      const s = snapP(j);
      x = lerp(x, VERTEX[j][0], s);
      y = lerp(y, VERTEX[j][1], s);
      r = lerp(r, 10, s);
      c = interpolateColors(hi * (1 - s), [0, 1], [color.ink, color.accent]);
      o *= geoO;
    } else {
      o *= 1 - ramp(t, snap, 0.4);
    }
    return { x, y, r, c, o };
  });

  const nav = (
    <NavTrack
      chapters={CHAPTERS}
      top={222}
      left={layout.margin}
      states={[
        [0, -1],
        [start, 0],
        [bend, 1],
        [scatter, 2],
        [snap, 3],
        [recap[0], 0],
        [recap[1], 1],
        [recap[2], 2],
        [recap[3], 3],
        [settle, -1],
      ]}
    />
  );

  return (
    <>
      {nav}
      <TitleCard
        title={<Rise out={titleOut}>SAT Math</Rise>}
        sub={<Rise out={subOut}>in 60 seconds</Rise>}
        opacity={titleOut < 1 ? 1 : 0}
      />

      {/* Row 1: the formula or computation for the current picture */}
      <Swap
        style={{ left: layout.margin, top: rowTop[0] }}
        states={[
          [start, <Tex tex="y = 3" />],
          [step, <Tex tex={`y = 3 + \\textcolor{${color.accent}}{2}x`} />],
          [bend, null],
          [para, <Tex tex="y = x^2 - 3x + 3" />],
                    [scatter, null],
          [four, <><Label>mean</Label><Op tex="=" /><Mono c={color.accent}>4</Mono></>],
          [pct, <><Mono>3 / 10</Mono><Op tex="=" /><Mono c={color.accent}>30%</Mono></>],
          [snap, null],
          [triWord, <Tex tex="3^2 + 4^2 = 5^2" />],
          [diam, <><Label>diameter</Label><Op tex="=" /><Mono c={color.accent}>5</Mono></>],
          [clear, null],
        ]}
      />
      {/* Row 2: how many of the 44 questions this picture covers */}
      <Swap
        style={{ left: layout.margin, top: rowTop[1] }}
        states={[
          [alg, <Count n={COUNTS[0]} />],
          [bend, null],
          [adv, <Count n={COUNTS[1]} />],
          [scatter, null],
          [data, <Count n={COUNTS[2]} />],
          [snap, null],
          [geo, <Count n={COUNTS[3]} />],
          [clear, null],
        ]}
      />

      {/* The exponential is labeled where it leaves the chart */}
      <div style={{ position: "absolute", left: S.X(2) + 28, top: S.Y(12) - 24, opacity: visible(t, expoCue + 0.45) * stairs }}>
        <Tex tex="y = 3 \cdot 2^x" size={52} style={{ color: color.label }} />
      </div>

      <Layer>
        {opening > 0 &&<Panels show={[opening, opening, opening, opening]} rise={0} />}
        {t > clear && <Panels show={recap.map((r) => ramp(t, r - 0.05, 0.45, easeIn))} rise={14} />}

        {/* Chart axes; the x-axis stays on as the number line */}
        <g opacity={chartAxes}>
          <line x1={box.x} y1={box.y - 10} x2={box.x} y2={base} stroke={color.rule} strokeWidth={2.5} />
          {[0, 1, 2, 3, 4].map((k) => (
            <MonoLabel key={k} x={S.X(k)} y={base + 56} size={38}>{k}</MonoLabel>
          ))}
          <MonoLabel x={box.x - 20} y={S.Y(3) + 13} anchor="end" size={38} fill={color.ink} weight={500} opacity={stepDot(0)}>3</MonoLabel>
        </g>

        {/* Percent bar: 10 cells, one per dot */}
        {barO > 0 && (
          <g opacity={barO}>
            <rect x={bar.x} y={bar.y} width={bar.w} height={bar.h} fill="none" stroke={color.rule} strokeWidth={2.5} />
            {Array.from({ length: 9 }, (_, i) => (
              <line key={i} x1={bar.x + ((i + 1) * bar.w) / 10} y1={bar.y} x2={bar.x + ((i + 1) * bar.w) / 10} y2={bar.y + bar.h} stroke={color.rule} strokeWidth={2} />
            ))}
            {barFill > 0 && (
              <rect x={bar.x} y={bar.y} width={0.3 * bar.w * barFill} height={bar.h} fill={color.accentWash} stroke={color.accent} strokeWidth={4.5} />
            )}
            <MonoLabel x={bar.x} y={bar.y - 22} anchor="start" size={34}>0%</MonoLabel>
            <MonoLabel x={bar.x + bar.w} y={bar.y - 22} anchor="end" size={34}>100%</MonoLabel>
          </g>
        )}

        {/* Fulcrum, not part of the tilting beam */}
        {fulcrumO > 0 && (
          <path d={`M${N(fv)},${base + 3}L${N(fv) - 30},${base + 60}L${N(fv) + 30},${base + 60}Z`} fill={color.ink} opacity={fulcrumO} strokeLinejoin="round" />
        )}

        {/* The beam: axis, data ticks, dots. Tilts about the fulcrum tip. */}
        <g transform={`rotate(${tilt} ${pivot[0]} ${pivot[1]})`}>
          <line x1={box.x} y1={base} x2={S.X(4.5)} y2={base} stroke={color.rule} strokeWidth={2.5} opacity={numberLine} />
          <g opacity={dataTicks}>
            {Array.from({ length: 10 }, (_, v) => (
              <g key={v}>
                <line x1={N(v)} y1={base} x2={N(v)} y2={base + 10} stroke={color.rule} strokeWidth={2.5} />
                <MonoLabel x={N(v)} y={base + 108} size={36} fill={v === MEAN ? interpolateColors(meanMark, [0, 1], [color.label, color.accent]) : color.label} weight={v === MEAN ? lerp(400, 600, meanMark) : 400}>
                  {v}
                </MonoLabel>
              </g>
            ))}
          </g>
        </g>

        {/* Staircase: a run, then a rise; the rise is the rate */}
        {stairs > 0 &&
          [0, 1, 2, 3].map((i) => {
            const q = stepP(i);
            if (q <= 0) return null;
            const y0 = f(i), y1 = f(i + 1);
            const run = Math.min(1, q * 2), rise = Math.max(0, q * 2 - 1);
            const riserPx = Math.abs(S.Y(y1) - S.Y(y0));
            const lift = (1 - Math.min(1, riserPx / 70)) * 30;
            return (
              <g key={i} opacity={stairs}>
                <line x1={S.X(i)} y1={S.Y(y0)} x2={lerp(S.X(i), S.X(i + 1), run)} y2={S.Y(y0)} stroke={color.label} strokeWidth={3} strokeDasharray="10 9" />
                {rise > 0 && <line x1={S.X(i + 1)} y1={S.Y(y0)} x2={S.X(i + 1)} y2={S.Y(lerp(y0, y1, rise))} stroke={color.accent} strokeWidth={4.5} strokeLinecap="round" />}
                <MonoLabel x={S.X(i + 1) + 16} y={(S.Y(y0) + S.Y(y1)) / 2 + 13 - lift} anchor="start" size={38} fill={color.accent} weight={600} opacity={rise}>
                  {signed(Math.round(y1 - y0))}
                </MonoLabel>
              </g>
            );
          })}

        {/* Exponential: same start, doubles */}
        {expoP > 0 && <path d={fnPath(expo, 0, 2 * expoP, S)} fill="none" stroke={color.label} strokeWidth={4} strokeLinecap="round" opacity={stairs} />}

        {/* The line, which bends into the parabola */}
        {curveP > 0 && curveO > 0 && (
          <path d={fnPath(f, 0, 4.4 * curveP, S)} fill="none" stroke={color.ink} strokeWidth={5.5} strokeLinecap="round" opacity={curveO} />
        )}
        {curveP > 0 && curveP < 1 && <circle cx={S.X(4.4 * curveP)} cy={S.Y(f(4.4 * curveP))} r={9} fill={color.ink} />}
        {[0, 1, 2, 3, 4].map((i) => {
          const o = stepDot(i) * (1 - ramp(t, scatter + 0.1, 0.3));
          return o > 0 ? <circle key={i} cx={S.X(i)} cy={S.Y(f(i))} r={9 + (i === 0 ? 2 : 0)} fill={color.ink} opacity={o} /> : null;
        })}

        {/* Triangle and circle */}
        {geoO > 0 && t > snap && (
          <g opacity={geoO}>
            {circP > 0 && (
              <path
                d={`M${A[0]},${A[1]}A${2.5 * tri.u},${2.5 * tri.u} 0 0 1 ${B[0]},${B[1]}A${2.5 * tri.u},${2.5 * tri.u} 0 0 1 ${A[0]},${A[1]}`}
                fill="none"
                stroke={color.inkSoft}
                strokeWidth={4}
                strokeLinecap="round"
                {...drawOn(circP)}
              />
            )}
            {triP > 0 && (
              <path d={`M${A[0]},${A[1]}L${C[0]},${C[1]}L${B[0]},${B[1]}Z`} fill="none" stroke={color.ink} strokeWidth={5.5} strokeLinejoin="round" strokeLinecap="round" {...drawOn(triP)} />
            )}
            <RightAngle at={C} a={A} b={B} size={30} opacity={visible(t, snap + 1.6)} />
            {diamP > 0 && <line x1={A[0]} y1={A[1]} x2={lerp(A[0], B[0], diamP)} y2={B[1]} stroke={color.accent} strokeWidth={6} strokeLinecap="round" />}
            <circle cx={tri.cx} cy={tri.cy} r={7} fill={color.ink} opacity={visible(t, diam + 0.3)} />
            <MonoLabel x={(A[0] + C[0]) / 2 - 34} y={(A[1] + C[1]) / 2 + 2} anchor="end" size={44} fill={color.ink} weight={600} opacity={visible(t, triWord + 0.2)}>3</MonoLabel>
            <MonoLabel x={(C[0] + B[0]) / 2 + 30} y={(C[1] + B[1]) / 2 - 8} anchor="start" size={44} fill={color.ink} weight={600} opacity={visible(t, triWord + 0.2)}>4</MonoLabel>
            <MonoLabel x={tri.cx} y={tri.cy + 66} size={44} fill={color.accent} weight={600} opacity={visible(t, diam + 0.4)}>5</MonoLabel>
          </g>
        )}

        {/* The ten moving dots: curve -> dot plot -> three triangle corners */}
        {t > scatter &&
          dots.map((d, k) => (d.o > 0 ? <circle key={k} cx={d.x} cy={d.y} r={d.r} fill={d.c} opacity={d.o} /> : null))}
      </Layer>
    </>
  );
};

const RightAngle = ({
  at,
  a,
  b,
  size,
  opacity,
}: {
  at: readonly [number, number];
  a: readonly [number, number];
  b: readonly [number, number];
  size: number;
  opacity: number;
}) => {
  const u = (p: readonly [number, number]) => {
    const dx = p[0] - at[0], dy = p[1] - at[1], m = Math.hypot(dx, dy);
    return [(dx / m) * size, (dy / m) * size] as const;
  };
  const [ux, uy] = u(a), [vx, vy] = u(b);
  return (
    <path
      d={`M${at[0] + ux},${at[1] + uy}L${at[0] + ux + vx},${at[1] + uy + vy}L${at[0] + vx},${at[1] + vy}`}
      fill="none"
      stroke={color.inkSoft}
      strokeWidth={3}
      opacity={opacity}
    />
  );
};

// ---------------------------------------------------------------------------
// The four-panel map, used for the opening frame and the recap.
const PANEL = { cols: 2, w: 400, h: 360, gapX: 80, gapY: 100, top: 540 };

const Panels = ({ show, rise }: { show: number[]; rise: number }) => (
  <>
    {CHAPTERS.map((_, i) => {
      const { x, y } = gridSlot(i, PANEL);
      const o = show[i];
      if (o <= 0) return null;
      const inner: Box = { x: x + 24, y: y + 14, w: PANEL.w - 48, h: PANEL.h - 40 };
      return (
        <g key={i} opacity={o} transform={`translate(0 ${(1 - o) * rise})`}>
          {i === 0 && <MiniLine b={inner} />}
          {i === 1 && <MiniCurve b={inner} />}
          {i === 2 && <MiniBalance b={inner} />}
          {i === 3 && <MiniCircle b={inner} />}
          <text x={x + 24} y={y + PANEL.h + 34} fontFamily={font.mono} fontSize={32}>
            <tspan fill={color.inkSoft}>{CHAPTERS[i]}</tspan>
            <tspan fill={color.ink} fontWeight={600} dx={16}>{COUNTS[i]}</tspan>
          </text>
        </g>
      );
    })}
  </>
);

const MiniAxes = ({ b }: { b: Box }) => (
  <>
    <line x1={b.x} y1={b.y} x2={b.x} y2={b.y + b.h} stroke={color.rule} strokeWidth={2} />
    <line x1={b.x} y1={b.y + b.h} x2={b.x + b.w} y2={b.y + b.h} stroke={color.rule} strokeWidth={2} />
  </>
);

const MiniLine = ({ b }: { b: Box }) => {
  const s = scale(b, { x0: 0, x1: 4.5, y0: 0, y1: 12 });
  return (
    <>
      <MiniAxes b={b} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <line x1={s.X(i)} y1={s.Y(line(i))} x2={s.X(i + 1)} y2={s.Y(line(i))} stroke={color.label} strokeWidth={2} strokeDasharray="6 6" />
          <line x1={s.X(i + 1)} y1={s.Y(line(i))} x2={s.X(i + 1)} y2={s.Y(line(i + 1))} stroke={color.accent} strokeWidth={3.5} strokeLinecap="round" />
        </g>
      ))}
      <path d={fnPath(line, 0, 4.4, s)} fill="none" stroke={color.ink} strokeWidth={4.5} strokeLinecap="round" />
      {[0, 1, 2, 3, 4].map((i) => (
        <circle key={i} cx={s.X(i)} cy={s.Y(line(i))} r={6} fill={color.ink} />
      ))}
    </>
  );
};

const MiniCurve = ({ b }: { b: Box }) => {
  const s = scale(b, { x0: 0, x1: 4.5, y0: 0, y1: 12 });
  return (
    <>
      <MiniAxes b={b} />
      <path d={fnPath(expo, 0, 2, s)} fill="none" stroke={color.label} strokeWidth={3.5} strokeLinecap="round" />
      <path d={fnPath(parab, 0, 4.4, s)} fill="none" stroke={color.ink} strokeWidth={4.5} strokeLinecap="round" />
      <circle cx={s.X(0)} cy={s.Y(3)} r={6} fill={color.ink} />
    </>
  );
};

const MiniBalance = ({ b }: { b: Box }) => {
  const y0 = b.y + b.h - 64;
  const n = (v: number) => b.x + (v / 9) * b.w;
  const bh = 28, by = y0 - 156;
  return (
    <>
      <rect x={b.x} y={by} width={b.w} height={bh} fill="none" stroke={color.rule} strokeWidth={2} />
      {Array.from({ length: 9 }, (_, i) => (
        <line key={i} x1={b.x + ((i + 1) * b.w) / 10} y1={by} x2={b.x + ((i + 1) * b.w) / 10} y2={by + bh} stroke={color.rule} strokeWidth={1.5} />
      ))}
      <rect x={b.x} y={by} width={0.3 * b.w} height={bh} fill={color.accentWash} stroke={color.accent} strokeWidth={3} />
      <line x1={b.x} y1={y0} x2={b.x + b.w} y2={y0} stroke={color.rule} strokeWidth={2} />
      <path d={`M${n(MEAN)},${y0 + 2}L${n(MEAN) - 17},${y0 + 32}L${n(MEAN) + 17},${y0 + 32}Z`} fill={color.ink} />
      {DATA.map((v, k) => (
        <circle key={k} cx={n(v)} cy={y0 - 14 - stackIndex[k] * 26} r={11} fill={v > MEAN ? color.accent : color.ink} />
      ))}
    </>
  );
};

const MiniCircle = ({ b }: { b: Box }) => {
  const u = 58;
  const cx = b.x + b.w / 2, cy = b.y + b.h / 2 + 10;
  const P = (x: number, y: number) => [cx + x * u, cy - y * u] as const;
  const a = P(-2.5, 0), bb = P(2.5, 0), c = P(-0.7, 2.4);
  return (
    <>
      <circle cx={cx} cy={cy} r={2.5 * u} fill="none" stroke={color.inkSoft} strokeWidth={3} />
      <path d={`M${a[0]},${a[1]}L${c[0]},${c[1]}L${bb[0]},${bb[1]}Z`} fill="none" stroke={color.ink} strokeWidth={4.5} strokeLinejoin="round" />
      <line x1={a[0]} y1={a[1]} x2={bb[0]} y2={bb[1]} stroke={color.accent} strokeWidth={5} strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={5} fill={color.ink} />
    </>
  );
};
