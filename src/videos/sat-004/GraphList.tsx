import { interpolateColors } from "remotion";
import { easeIn, lerp, ramp, seeded, useTime, visible } from "../../anim";
import { Layer, MonoLabel, scale } from "../../components/Chart";
import { Swap } from "../../components/Swap";
import { Tex } from "../../components/Tex";
import { useNarration } from "../../narration";
import { color, font, layout } from "../../theme";

// Line 1: 2x - 3y = 5, so y = (2x - 5) / 3. Solutions include (1, -1), (2.5, 0), (4, 1), (5.5, 2), (7, 3).
// Line 2: x + y = 5, so y = 5 - x. Both are true only at (4, 1): 2(4) - 3(1) = 5 and 4 + 1 = 5.
const L1 = (x: number) => (2 * x - 5) / 3;
const L2 = (x: number) => 5 - x;

const box = { x: 126, y: 780, w: 828, h: 644 };
const D = { x0: -1, x1: 8, y0: -2, y1: 5 };
const S = scale(box, D);
const xFrac = (x: number) => (x - D.x0) / (D.x1 - D.x0);
const P = [4, 1] as const; // the point in question
const FAIL = [1, 3] as const; // 2(1) - 3(3) = -7
const PASS = [5.5, 2] as const; // 2(5.5) - 3(2) = 5

// Data-space boxes [x0, x1, y0, y1] of the two line labels and the "(4, 1)" label.
const LABELS = [
  [4.6, 8, 3.7, 5],
  [0.8, 3.6, 3.9, 5],
  [4.2, 6.2, 0.4, 1.4],
];
type Drop = { x: number; y: number; on: 0 | 1 | 2; wave: number; r: number; land: number }; // land: 0..1 within its wave
const makeWave = (wave: number, off: number, on: number, line: 0 | 1 | 2, seed: number, r: number): Drop[] => {
  const rand = seeded(seed); // deterministic rain
  const out: Drop[] = [];
  const f = line === 2 ? L2 : L1;
  while (out.length < off) {
    const x = lerp(D.x0 + 0.2, D.x1 - 0.2, rand());
    const y = lerp(D.y0 + 0.2, D.y1 - 0.2, rand());
    // keep the misses visibly off both lines
    if (Math.abs(y - L1(x)) < 0.35 || Math.abs(y - L2(x)) < 0.35) continue;
    // and off the labels that appear later
    if (LABELS.some(([x0, x1, y0, y1]) => x > x0 && x < x1 && y > y0 && y < y1)) continue;
    out.push({ x, y, on: 0, wave, r, land: rand() });
  }
  const lo = line === 2 ? 0 : 0.5, hi = line === 2 ? 7 : D.x1 - 0.05;
  for (let i = 0; i < on; i++) {
    const x = lerp(lo, hi, (i + rand() * 0.8) / on);
    out.push({ x, y: f(x), on: line, wave, r, land: rand() });
  }
  return out;
};
const W1 = [
  ...makeWave(1, 54, 8, 1, 7, 8),
  { x: FAIL[0], y: FAIL[1], on: 0 as const, wave: 1, r: 8, land: 0.3 },
  { x: PASS[0], y: PASS[1], on: 1 as const, wave: 1, r: 8, land: 0.55 },
];
const W2 = makeWave(2, 110, 34, 1, 21, 6.5);
const W3 = makeWave(3, 200, 96, 1, 33, 5.5);
const W4 = makeWave(4, 170, 80, 2, 47, 5.5);
const DROPS = [...W1, ...W2, ...W3, ...W4];

const rowTop = [528, 622];
const T = ({ tex, c }: { tex: string; c?: string }) => <Tex tex={tex} style={c ? { color: c } : undefined} />;
const acc = (s: string) => `\\acc{${s}}`;

export const GraphList = () => {
  const t = useTime();
  const { cue, lines } = useNarration();
  const rain = cue("rain");
  const test = cue("test");
  const tru = cue("true");
  const more = cue("more");
  const lineCue = cue("line");
  const list = cue("list");
  const plug = cue("plug");
  const five = cue("five");
  const yes = cue("yes");
  const second = cue("second");
  const xy = lines[8].tokens[4].start; // "x + y = 5" is spoken
  const both = cue("both");

  // Wave timing: [first landing, spread]
  const waveAt: Record<number, [number, number]> = {
    1: [rain, 1.3],
    2: [more, 0.55],
    3: [more + 0.55, 0.6],
    4: [xy, 0.9],
  };
  const sweep = (x: number) => test + 0.2 + xFrac(x) * (tru - test - 0.2); // wave 1 is tested by a sweep
  const line1Draw = (x: number) => lineCue + 0.1 + xFrac(x) * 1.0;
  const line2At = xy + 1.35;
  const line2Draw = (x: number) => line2At + xFrac(x) * 0.8;

  const heroScale = lerp(1.7, 1, ramp(t, rain - 0.2, 0.7));
  const sweepP = ramp(t, test + 0.2, tru - test - 0.2, (v) => v);
  const sweepO = visible(t, test + 0.1, tru + 0.05, 0.25);
  const line1P = ramp(t, lineCue + 0.1, 1.0);
  const line2P = ramp(t, line2At, 0.8);
  const pointIn = 1 - ramp(t, rain - 0.3, 0.4) + ramp(t, plug, 0.4, easeIn);
  const pointAcc = ramp(t, yes, 0.4);
  const guides = visible(t, plug + 0.3, second);
  const ring = (start: number, end: number) => visible(t, start, end, 0.3);

  return (
    <>
      {/* Row 1: the equation under test, later the two checks */}
      <Swap
        style={{ left: layout.margin, top: rowTop[0] }}
        states={[
          [-1, <span style={{ display: "inline-block", transform: `scale(${heroScale})`, transformOrigin: "0 0" }}><T tex="2x - 3y = 5" /></span>],
          [second, <T tex="x + y = 5" />],
          [both, <T tex={`2(4) - 3(1) = ${acc("5")}`} />],
        ]}
      />
      {/* Row 2: one point checked at a time, then the list */}
      <Swap
        style={{ left: layout.margin, top: rowTop[1] }}
        states={[
          [test, <><T tex="2(1) - 3(3) = -7" /><T tex="\neq 5" c={color.operator} /></>],
          [tru, <T tex="2(5.5) - 3(2) = 5" />],
          [more, null],
          [list, <span style={{ fontFamily: font.mono, fontSize: 48, fontWeight: 500, color: color.ink, wordSpacing: "0.2em" }}>(1, −1)&nbsp; (2.5, 0)&nbsp; (7, 3)&nbsp; <span style={{ color: color.label }}>…</span></span>],
          [plug, <T tex="2(4) - 3(1)" />],
          [five, <T tex={`2(4) - 3(1) = ${acc("5")}`} />],
          [second, null],
          [both, <T tex={`4 + 1 = ${acc("5")}`} />],
        ]}
      />

      <Layer>
        {/* The plane */}
        <g>
          {Array.from({ length: D.x1 - D.x0 + 1 }, (_, i) => D.x0 + i).map((x) => (
            <line key={`gx${x}`} x1={S.X(x)} y1={box.y} x2={S.X(x)} y2={box.y + box.h} stroke={x === 0 ? color.rule : color.ruleFaint} strokeWidth={x === 0 ? 2.5 : 1.5} />
          ))}
          {Array.from({ length: D.y1 - D.y0 + 1 }, (_, i) => D.y0 + i).map((y) => (
            <line key={`gy${y}`} x1={box.x} y1={S.Y(y)} x2={box.x + box.w} y2={S.Y(y)} stroke={y === 0 ? color.rule : color.ruleFaint} strokeWidth={y === 0 ? 2.5 : 1.5} />
          ))}
          {[4, 6, 8].map((x) => ( // no "2": the first line crosses it
            <MonoLabel key={`lx${x}`} x={S.X(x)} y={S.Y(0) + 40} size={30}>{x}</MonoLabel>
          ))}
          {[-2, 2, 4].map((y) => (
            <MonoLabel key={`ly${y}`} x={S.X(0) - 14} y={S.Y(y) + 10} anchor="end" size={30}>{y < 0 ? `−${-y}` : y}</MonoLabel>
          ))}
        </g>

        {/* The sweep that tests the first rain */}
        {sweepO > 0 && (
          <line x1={lerp(box.x, box.x + box.w, sweepP)} y1={box.y} x2={lerp(box.x, box.x + box.w, sweepP)} y2={box.y + box.h} stroke={color.label} strokeWidth={2.5} opacity={sweepO} />
        )}

        {/* Rain: every drop lands, gets tested, and either stays or fades */}
        {DROPS.map((d, i) => {
          const [w0, spread] = waveAt[d.wave];
          const land = w0 + d.land * spread;
          const fall = ramp(t, land, 0.5, easeIn);
          if (fall <= 0) return null;
          const testedAt = d.wave === 1 ? sweep(d.x) : land + 0.32;
          const failed = d.on === 0 ? ramp(t, testedAt, 0.3) : 0;
          let o = fall * lerp(1, 0.14, failed);
          // misses clear once their line is drawn; hits merge into it as it passes
          if (d.on === 0) o *= 1 - ramp(t, d.wave < 4 ? lineCue : line2At, 0.6);
          if (d.on === 1) o *= 1 - ramp(t, line1Draw(d.x), 0.25);
          if (d.on === 2) o *= 1 - ramp(t, line2Draw(d.x), 0.25);
          if (o <= 0.003) return null;
          const fill = d.on === 2 ? color.inkSoft : interpolateColors(failed, [0, 1], [color.ink, color.label]);
          return <circle key={i} cx={S.X(d.x)} cy={S.Y(d.y) - (1 - fall) * 130} r={d.r * lerp(1, 0.7, failed)} fill={fill} opacity={o} />;
        })}

        {/* Example rings while the sweep tests */}
        <circle cx={S.X(FAIL[0])} cy={S.Y(FAIL[1])} r={22} fill="none" stroke={color.ink} strokeWidth={3} opacity={ring(test, tru)} />
        <circle cx={S.X(PASS[0])} cy={S.Y(PASS[1])} r={22} fill="none" stroke={color.ink} strokeWidth={3} opacity={ring(tru, more)} />

        {/* The lines the survivors become */}
        {line1P > 0 && <path d={`M${S.X(0.5)},${S.Y(L1(0.5))}L${S.X(lerp(0.5, D.x1, line1P))},${S.Y(L1(lerp(0.5, D.x1, line1P)))}`} stroke={color.ink} strokeWidth={5.5} strokeLinecap="round" fill="none" />}
        {line2P > 0 && <path d={`M${S.X(0)},${S.Y(5)}L${S.X(lerp(0, 7, line2P))},${S.Y(L2(lerp(0, 7, line2P)))}`} stroke={color.inkSoft} strokeWidth={5} strokeLinecap="round" fill="none" />}

        {/* "A list": three of its entries marked on the line */}
        {[[1, -1], [2.5, 0], [7, 3]].map(([x, y], k) => (
          <circle key={k} cx={S.X(x)} cy={S.Y(y)} r={10} fill={color.ink} opacity={visible(t, list + k * 0.15, plug)} />
        ))}

        {/* (4, 1): asked about, plugged in, on the list, then on both lists */}
        <g opacity={guides}>
          <line x1={S.X(P[0])} y1={S.Y(P[1])} x2={S.X(P[0])} y2={S.Y(0)} stroke={color.label} strokeWidth={3} strokeDasharray="10 9" />
          <line x1={S.X(P[0])} y1={S.Y(P[1])} x2={S.X(0)} y2={S.Y(P[1])} stroke={color.label} strokeWidth={3} strokeDasharray="10 9" />
        </g>
        <circle cx={S.X(P[0])} cy={S.Y(P[1])} r={24} fill="none" stroke={color.accent} strokeWidth={4} opacity={visible(t, both)} />
        <circle cx={S.X(P[0])} cy={S.Y(P[1])} r={11} fill={interpolateColors(pointAcc, [0, 1], [color.ink, color.accent])} opacity={Math.min(1, pointIn)} />
        <MonoLabel x={S.X(P[0]) + 44} y={S.Y(P[1]) + 22} anchor="start" size={40} weight={600} fill={interpolateColors(pointAcc, [0, 1], [color.ink, color.accent])} opacity={Math.min(1, pointIn)}>
          (4, 1)
        </MonoLabel>
      </Layer>

      {/* Line labels */}
      <div style={{ position: "absolute", right: 1080 - S.X(7.9), top: S.Y(4.75), opacity: visible(t, second + 0.2) }}>
        <Tex tex="2x - 3y = 5" size={46} style={{ color: color.ink }} />
      </div>
      <div style={{ position: "absolute", left: S.X(1.05), top: S.Y(4.85), opacity: visible(t, line2At + 0.5) }}>
        <Tex tex="x + y = 5" size={46} style={{ color: color.inkSoft }} />
      </div>
    </>
  );
};
