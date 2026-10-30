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

// The curve family shares its start value of 3. The later chapters are new examples:
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
    <Label>domain questions</Label>
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
  const triWord = cue("triangle");
  const circle = cue("circle");
  const diam = cue("diam");
  const geo = cue("geo");
  const recap = [cue("r1"), cue("r2"), cue("r3"), cue("r4")];
  const settle = cue("settle");
  const clear = recap[0] - 0.6;

  // Begin with the whole lesson map, then travel into its actual slope chart.
  // Derive the camera from narration so a new human take keeps the same handoff.
  const titleOut = ramp(t, hook - 0.42, 0.32, easeMove);
  const subOut = ramp(t, hook - 0.38, 0.32, easeMove);
  const zoomStart = start - Math.min(1.4, (start - hook) * 0.5);
  const zoom = ramp(t, zoomStart, Math.max(0.2, start - zoomStart - 0.12), easeMove);
  const opening = 1 - ramp(t, start, 0.32);
  const stageOn = ramp(t, start - 0.12, 0.12);

  // Beat 1-2: line, then bend into a parabola.
  const bendDelay = Math.min(0.28, Math.max(0.1, (para - bend) * 0.12));
  const bendDuration = Math.min(0.95, Math.max(0.25, para - bend - bendDelay - 0.3));
  const p = ramp(t, bend + bendDelay, bendDuration);
  const f = bent(p);
  const chartAxes = stageOn * (1 - ramp(t, scatter, 0.4));
  const numberLine = stageOn * (1 - ramp(t, snap, 0.4));
  const stairs = 1 - ramp(t, scatter - 0.1, 0.35);
  const stepP = (i: number) => ramp(t, step + i * 0.3, 0.42, easeMove);
  const oldSteps = 1 - ramp(t, bend, bendDelay * 0.9);
  const newStepStart = bend + bendDelay + bendDuration;
  const newStepGap = Math.min(0.18, Math.max(0.06, (expoCue - newStepStart - 0.25) / 4));
  const newStepP = (i: number) => ramp(t, newStepStart + i * newStepGap, 0.3, easeMove);
  const curveP = ramp(t, lineCue, 1.1);
  const curveO = 1 - ramp(t, scatter + 0.1, 0.4);
  const expoP = ramp(t, expoCue, 0.8);
  const stepDot = (i: number) => (i === 0 ? ramp(t, start, 0.35, easeIn) : ramp(t, step + (i - 1) * 0.3 + 0.36, 0.2, easeIn));

  // Beat 3: scatter into a dot plot, balance on a fulcrum, a percent bar.
  const dotOn = (k: number) => ramp(t, scatter + k * 0.03, 0.2, easeIn);
  const glide = (k: number) => ramp(t, scatter + 0.35 + k * 0.05, 0.9, easeMove);
  const dataTicks = ramp(t, scatter + 0.3, 0.5, easeIn) * (1 - ramp(t, snap, 0.4));
  const fulcrumO = ramp(t, bal, 0.35, easeIn) * (1 - ramp(t, snap, 0.4));
  const balanceDuration = Math.max(0.2, four - bal - 0.2);
  const fv = lerp(6.5, MEAN, ramp(t, bal + 0.15, balanceDuration, easeMove));
  const tilt = -2.4 * (fv - MEAN) * ramp(t, bal, 0.5);
  const pivot = [N(fv), base] as const;
  const meanMark = visible(t, four) * (1 - ramp(t, snap, 0.35));
  const meanAccent = meanMark * (1 - ramp(t, above, 0.3));
  const hi = ramp(t, above, 0.4); // the three dots above the mean
  const barO = visible(t, pct) * (1 - ramp(t, snap, 0.4));
  const countMove = (j: number) => ramp(t, pct + 0.12 + j * 0.12, 0.65);

  // Beat 4: three dots snap into a right triangle; circle it.
  const snapP = (j: number) => ramp(t, snap + j * 0.08, 0.9, easeMove);
  const triangleStart = Math.min(triWord, snap + 1.05);
  const triangleDuration = Math.max(0.25, Math.min(0.7, circle - triangleStart - 0.1));
  const triangleReady = triangleStart + triangleDuration;
  const triP = ramp(t, triangleStart, triangleDuration);
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
          [triangleReady, <Tex tex="3^2 + 4^2 = 5^2" />],
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
        <Tex tex={"y = 3 \\cdot 2^x"} size={52} style={{ color: color.label }} />
      </div>

      <Layer>
        {opening > 0 && <OpeningMap t={t} zoom={zoom} zoomStart={zoomStart} start={start} opacity={opening} />}
        {t > clear && <Panels show={recap.map((r) => ramp(t, r - 0.05, 0.45, easeIn))} rise={14} />}

        {/* Chart axes; the x-axis stays on as the number line */}
        <g opacity={chartAxes}>
          <line x1={box.x} y1={box.y - 10} x2={box.x} y2={base} stroke={color.rule} strokeWidth={2.5} />
          {[0, 1, 2, 3, 4].map((k) => (
            <MonoLabel key={k} x={S.X(k)} y={base + 56} size={38}>{k}</MonoLabel>
          ))}
          <MonoLabel x={box.x - 20} y={S.Y(3) + 13} anchor="end" size={38} fill={color.ink} weight={500} opacity={stepDot(0)}>3</MonoLabel>
        </g>

        {/* Each data dot owns a cell. The selected three visibly travel to theirs. */}
        {barO > 0 && (
          <g opacity={barO}>
            {DATA.map((v, k) => {
              const selected = v > MEAN;
              const arrival = selected ? ramp(t, pct + 0.7 + (k - 7) * 0.12, 0.25) : 0;
              return <rect key={k} x={bar.x + k * bar.w / 10} y={bar.y} width={bar.w / 10} height={bar.h} fill={selected ? interpolateColors(arrival, [0, 1], [color.paper, color.accentWash]) : color.paper} stroke={selected ? interpolateColors(arrival, [0, 1], [color.rule, color.accent]) : color.rule} strokeWidth={selected ? lerp(2, 4, arrival) : 2} />;
            })}
            <MonoLabel x={bar.x} y={bar.y - 25} anchor="start" size={32}>10 points</MonoLabel>
            <MonoLabel x={bar.x + bar.w} y={bar.y - 25} anchor="end" size={32} fill={color.accent} opacity={ramp(t, pct + 0.95, 0.3)}>3 selected</MonoLabel>
            {[7, 8, 9].map((k, j) => {
              const q = countMove(j);
              const target = [bar.x + (k + 0.5) * bar.w / 10, bar.y + bar.h / 2];
              const o = visible(t, pct + 0.12 + j * 0.12, pct + 1.05 + j * 0.12, 0.18);
              return <g key={k} opacity={o}>
                <line x1={slot(k)[0]} y1={slot(k)[1]} x2={target[0]} y2={target[1]} stroke={color.accentFill} strokeWidth={2} strokeDasharray="7 9" />
                <circle cx={lerp(slot(k)[0], target[0], q)} cy={lerp(slot(k)[1], target[1], q)} r={9} fill={color.accent} />
              </g>;
            })}
          </g>
        )}

        {/* A numerical threshold, so "above" is greater than four, not vertical height. */}
        <g opacity={meanMark}>
          <rect x={N(MEAN) + 2} y={base - 230} width={N(9) - N(MEAN) - 2} height={230} fill={color.accentWash} opacity={hi * 0.45} />
          <line x1={N(MEAN)} y1={base - 245} x2={N(MEAN)} y2={base} stroke={color.label} strokeWidth={2.5} strokeDasharray="8 9" />
        </g>

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
                <MonoLabel x={N(v)} y={base + 108} size={36} fill={v === MEAN ? interpolateColors(meanAccent, [0, 1], [color.label, color.accent]) : color.label} weight={v === MEAN ? lerp(400, 600, meanAccent) : 400}>
                  {v}
                </MonoLabel>
              </g>
            ))}
          </g>
        </g>

        {/* Clear the old labels before the bend. Rebuild signed steps on the settled curve. */}
        {stairs > 0 && [false, true].map((quadratic) =>
          [0, 1, 2, 3].map((i) => {
            const q = quadratic ? newStepP(i) : stepP(i);
            const o = stairs * (quadratic ? 1 : oldSteps);
            if (q <= 0 || o <= 0) return null;
            const shape = quadratic ? parab : line;
            const y0 = shape(i), y1 = shape(i + 1);
            const run = Math.min(1, q * 2), rise = Math.max(0, q * 2 - 1);
            const flat = y0 === y1;
            return (
              <g key={`${quadratic}-${i}`} opacity={o}>
                <line x1={S.X(i)} y1={S.Y(y0)} x2={lerp(S.X(i), S.X(i + 1), run)} y2={S.Y(y0)} stroke={flat ? color.accent : color.label} strokeWidth={flat ? 4.5 : 3} strokeDasharray={flat ? undefined : "10 9"} />
                {!flat && rise > 0 && <line x1={S.X(i + 1)} y1={S.Y(y0)} x2={S.X(i + 1)} y2={S.Y(lerp(y0, y1, rise))} stroke={color.accent} strokeWidth={4.5} strokeLinecap="round" />}
                <MonoLabel x={flat ? (S.X(i) + S.X(i + 1)) / 2 : S.X(i + 1) + (y1 < y0 ? -20 : 16)} y={flat ? S.Y(y0) - 20 : (S.Y(y0) + S.Y(y1)) / 2 + 13} anchor={flat ? "middle" : y1 < y0 ? "end" : "start"} size={38} fill={color.accent} weight={600} opacity={rise}>
                  {signed(y1 - y0)}
                </MonoLabel>
              </g>
            );
          })
        )}

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
            <RightAngle at={C} a={A} b={B} size={30} opacity={visible(t, triangleReady)} />
            {diamP > 0 && <line x1={A[0]} y1={A[1]} x2={lerp(A[0], B[0], diamP)} y2={B[1]} stroke={color.accent} strokeWidth={6} strokeLinecap="round" />}
            <circle cx={tri.cx} cy={tri.cy} r={7} fill={color.ink} opacity={visible(t, diam + 0.3)} />
            <MonoLabel x={(A[0] + C[0]) / 2 - 34} y={(A[1] + C[1]) / 2 + 2} anchor="end" size={44} fill={color.ink} weight={600} opacity={visible(t, triangleReady)}>3</MonoLabel>
            <MonoLabel x={(C[0] + B[0]) / 2 + 30} y={(C[1] + B[1]) / 2 - 8} anchor="start" size={44} fill={color.ink} weight={600} opacity={visible(t, triangleReady)}>4</MonoLabel>
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
// A camera move through one connected map, rather than a cut to another chart.
// The first miniature has the hero's exact aspect ratio and data coordinates.
const MAP_SCALE = 0.45;
const MAP_BOXES: Box[] = [
  { x: 160, y: 680, w: box.w * MAP_SCALE, h: box.h * MAP_SCALE },
  { x: 620, y: 680, w: box.w * MAP_SCALE, h: box.h * MAP_SCALE },
  { x: 160, y: 1160, w: box.w * MAP_SCALE, h: box.h * MAP_SCALE },
  { x: 620, y: 1160, w: box.w * MAP_SCALE, h: box.h * MAP_SCALE },
];

const OpeningMap = ({ t, zoom, zoomStart, start, opacity }: { t: number; zoom: number; zoomStart: number; start: number; opacity: number }) => {
  const first = MAP_BOXES[0];
  const z = lerp(1, 1 / MAP_SCALE, zoom);
  const dx = lerp(first.x, box.x, zoom) - first.x * z;
  const dy = lerp(first.y, box.y, zoom) - first.y * z;
  const surroundings = 1 - ramp(t, zoomStart - 0.08, 0.52);
  const focus = ramp(t, zoomStart - 0.38, 0.3);
  const future = 1 - ramp(t, start - 0.55, 0.43);
  const s = scale(first, { x0: 0, x1: 4.5, y0: 0, y1: 12 });
  const routes = [
    "M500 1020 C420 1020 315 1020 315 960",
    "M580 1020 C660 1020 775 1020 775 960",
    "M500 1050 C420 1050 315 1050 315 1090",
    "M580 1050 C660 1050 775 1050 775 1090",
  ];
  return (
    <g opacity={opacity}>
      <defs><clipPath id="sat-opening-map"><rect x={90} y={545} width={900} height={980} /></clipPath></defs>
      <g clipPath="url(#sat-opening-map)">
        <g transform={`translate(${dx} ${dy}) scale(${z})`}>
          <g opacity={surroundings}>
            {routes.map((d, i) => <path key={d} d={d} fill="none" stroke={color.rule} strokeWidth={3} {...drawOn(ramp(t, 0.1 + i * 0.06, 0.65))} />)}
            <path d={routes[0]} fill="none" stroke={color.accent} strokeWidth={4} {...drawOn(focus)} />
            <MonoLabel x={540} y={1047} size={84} fill={color.ink} weight={500}>44</MonoLabel>
            <MonoLabel x={540} y={1084} size={26}>questions</MonoLabel>
            <MiniCurve b={MAP_BOXES[1]} />
            <MiniBalance b={MAP_BOXES[2]} />
            <MiniCircle b={MAP_BOXES[3]} />
            {MAP_BOXES.map((b, i) => (
              <g key={i}>
                <text x={b.x} y={b.y - 40} fontFamily={font.sans} fontSize={40} fontWeight={500} fill={i === 0 && focus > 0 ? color.accent : color.ink}>
                  {CHAPTERS[i]}
                </text>
                <MonoLabel x={b.x} y={b.y + b.h + 50} anchor="start" size={27} fill={color.inkSoft}>
                  {["slope + intercept", "parabola / exponential", "mean / percent", "triangles / circles"][i]}
                </MonoLabel>
              </g>
            ))}
          </g>
          <MiniLine b={first} cameraZoom={zoom} futureOpacity={future} />
          {/* The blue rises stay attached to their graph throughout the zoom. */}
          {[1, 2, 3, 4].map((i) => (
            <MonoLabel key={i} x={s.X(i) + 8} y={(s.Y(line(i - 1)) + s.Y(line(i))) / 2 + 6} anchor="start" size={17} fill={color.accent} opacity={focus * future}>+2</MonoLabel>
          ))}
          <g opacity={focus * surroundings} stroke={color.accent} strokeWidth={2.5} fill="none">
            <path d={`M${first.x - 24} ${first.y + 38}v-62h62 M${first.x + first.w - 38} ${first.y - 24}h62v62 M${first.x - 24} ${first.y + first.h - 38}v62h62 M${first.x + first.w - 38} ${first.y + first.h + 24}h62v-62`} />
          </g>
        </g>
      </g>
    </g>
  );
};

// The recap reuses the same functions, data and triangle proportions as the lesson.
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

const MiniAxes = ({ b, strokeWidth = 2 }: { b: Box; strokeWidth?: number }) => (
  <>
    <line x1={b.x} y1={b.y} x2={b.x} y2={b.y + b.h} stroke={color.rule} strokeWidth={strokeWidth} />
    <line x1={b.x} y1={b.y + b.h} x2={b.x + b.w} y2={b.y + b.h} stroke={color.rule} strokeWidth={strokeWidth} />
  </>
);

const MiniLine = ({ b, cameraZoom = 0, futureOpacity = 1 }: { b: Box; cameraZoom?: number; futureOpacity?: number }) => {
  const s = scale(b, { x0: 0, x1: 4.5, y0: 0, y1: 12 });
  return (
    <>
      <MiniAxes b={b} strokeWidth={lerp(2, 2.5 * MAP_SCALE, cameraZoom)} />
      <g opacity={futureOpacity}>
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <line x1={s.X(i)} y1={s.Y(line(i))} x2={s.X(i + 1)} y2={s.Y(line(i))} stroke={color.label} strokeWidth={lerp(2, 3 * MAP_SCALE, cameraZoom)} strokeDasharray={`${lerp(6, 10 * MAP_SCALE, cameraZoom)} ${lerp(6, 9 * MAP_SCALE, cameraZoom)}`} />
          <line x1={s.X(i + 1)} y1={s.Y(line(i))} x2={s.X(i + 1)} y2={s.Y(line(i + 1))} stroke={color.accent} strokeWidth={lerp(3.5, 4.5 * MAP_SCALE, cameraZoom)} strokeLinecap="round" />
        </g>
      ))}
      <path d={fnPath(line, 0, 4.4, s)} fill="none" stroke={color.ink} strokeWidth={lerp(4.5, 5.5 * MAP_SCALE, cameraZoom)} strokeLinecap="round" />
      {[1, 2, 3, 4].map((i) => (
        <circle key={i} cx={s.X(i)} cy={s.Y(line(i))} r={lerp(6, 9 * MAP_SCALE, cameraZoom)} fill={color.ink} />
      ))}
      </g>
      <circle cx={s.X(0)} cy={s.Y(3)} r={lerp(6, 11 * MAP_SCALE, cameraZoom)} fill={color.ink} />
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
      <rect x={b.x + 0.7 * b.w} y={by} width={0.3 * b.w} height={bh} fill={color.accentWash} stroke={color.accent} strokeWidth={3} />
      <line x1={b.x} y1={y0} x2={b.x + b.w} y2={y0} stroke={color.rule} strokeWidth={2} />
      <path d={`M${n(MEAN)},${y0 + 2}L${n(MEAN) - 17},${y0 + 32}L${n(MEAN) + 17},${y0 + 32}Z`} fill={color.ink} />
      {DATA.map((v, k) => (
        <circle key={k} cx={n(v)} cy={y0 - 14 - stackIndex[k] * 26} r={11} fill={v > MEAN ? color.accent : color.ink} />
      ))}
    </>
  );
};

const MiniCircle = ({ b }: { b: Box }) => {
  const u = (Math.min(b.w, b.h) - 30) / 5;
  const cx = b.x + b.w / 2, cy = b.y + b.h / 2 + 10;
  const P = (x: number, y: number) => [cx + x * u, cy - y * u] as const;
  const a = P(-2.5, 0), bb = P(2.5, 0), c = P(-0.7, 2.4);
  return (
    <>
      <circle cx={cx} cy={cy} r={2.5 * u} fill="none" stroke={color.inkSoft} strokeWidth={3} />
      <path d={`M${a[0]},${a[1]}L${c[0]},${c[1]}L${bb[0]},${bb[1]}Z`} fill="none" stroke={color.ink} strokeWidth={4.5} strokeLinejoin="round" />
      <line x1={a[0]} y1={a[1]} x2={bb[0]} y2={bb[1]} stroke={color.accent} strokeWidth={5} strokeLinecap="round" />
      <RightAngle at={c} a={a} b={bb} size={16} opacity={1} />
      <circle cx={cx} cy={cy} r={5} fill={color.ink} />
    </>
  );
};
