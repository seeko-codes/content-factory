import { easeIn, easeMove, ramp, useTime, visible } from "../../anim";
import { fnPath, Layer, MonoLabel, scale } from "../../components/Chart";
import { Swap } from "../../components/Swap";
import { Tex } from "../../components/Tex";
import { useNarration } from "../../narration";
import { color, font, layout } from "../../theme";

// v(0)=1.8, v(1)=3.9, v(2)=5.4, v(3)=6.3 and the area from 0 to 4 is exactly 20.
const v = (t: number) => 1.8 + 2.4 * t - 0.3 * t * t;
const riemann = (n: number) => {
  let s = 0;
  for (let i = 0; i < n; i++) s += v((4 * i) / n) * (4 / n);
  return s;
};

const box = { x: 190, y: 900, w: 690, h: 440 };
const S = scale(box, { x0: 0, x1: 4, y0: 0, y1: 7 });
const rowTop = [552, 682];

const Mono = ({ children, c = color.ink, w = 600 }: { children: React.ReactNode; c?: string; w?: number }) => (
  <span style={{ fontFamily: font.mono, fontSize: layout.monoSize, color: c, fontWeight: w }}>{children}</span>
);
const Op = ({ tex }: { tex: string }) => <Tex tex={tex} size={layout.texSize} style={{ color: color.operator }} />;
const Word = ({ children }: { children: React.ReactNode }) => (
  <span style={{ fontSize: layout.monoSize, fontWeight: 400, color: color.inkSoft }}>{children}</span>
);

export const Integral = () => {
  const t = useTime();
  const { cue, lines } = useNarration();
  const chart = cue("chart");
  const freeze = cue("freeze");
  const mult = cue("mult");
  const strips = cue("strips");
  const thin = cue("thin");
  const converge = cue("converge");
  const exact = lines[7].start;
  const morph = cue("morph");

  // Strip count steps 4 -> 8 -> ... -> 1024 as the narration tightens.
  const steps: [number, number][] = [
    [strips, 4],
    [thin, 8],
    [thin + 0.55, 16],
    [thin + 1.1, 32],
    [converge, 64],
    [converge + 0.25, 128],
    [converge + 0.5, 256],
    [converge + 0.75, 512],
    [converge + 1.0, 1024],
  ];
  const n = steps.filter(([at]) => t >= at).at(-1)?.[1] ?? 0;

  const hook = 1 - ramp(t, chart - 0.35, 0.45);
  const axes = visible(t, chart - 0.1);
  const curve = ramp(t, chart + 0.1, 1.1);
  const freezeRect = ramp(t, freeze, 0.6, easeIn) * (1 - ramp(t, strips - 0.2, 0.3));
  const freezeGuide = visible(t, freeze + 0.45, strips - 0.2);
  const unit = visible(t, freeze + 0.3, strips - 0.2);
  const stripsIn = (i: number) => ramp(t, strips + i * 0.12, 0.5, easeIn);
  const outline = 1 - ramp(t, converge + 0.4, 0.8); // strip edges dissolve into one area

  return (
    <>
      {/* Hook: the scary symbol alone */}
      <div style={{ position: "absolute", left: layout.margin - 10, top: 600, opacity: hook, transform: `translateY(${-(1 - hook) * 30}px)` }}>
        <Tex tex="\displaystyle\int_0^4 v(t)\,dt" size={150} />
      </div>

      {/* Row 1: the computation */}
      <Swap
        style={{ left: layout.margin, top: rowTop[0] }}
        states={[
          [freeze + 0.5, <Mono>5.4 m/s</Mono>],
          [mult, <><Mono>5.4 m/s</Mono><Op tex="\times" /><Mono>1 s</Mono><Op tex="=" /><Mono>5.4 m</Mono></>],
          [strips + 0.2, <Mono>1.8 + 3.9 + 5.4 + 6.3</Mono>],
          [thin, <Tex tex="\displaystyle\sum v \cdot \Delta t" size={66} />],
          [morph, <><Tex tex="\displaystyle\int_0^4 v(t)\,dt" size={66} /><Op tex="=" /><Mono c={color.accent}>20 m</Mono></>],
        ]}
      />
      {/* Strip counter, right-aligned on row 1; counts in place */}
      <Swap
        style={{ right: layout.margin, top: rowTop[0] + 22 }}
        states={[
          [thin + 1.1, <Mono c={color.label} w={400}><span style={{ fontSize: 36 }}>{n} strips</span></Mono>],
          [morph, null],
        ]}
      />

      {/* Row 2: what we know about the distance so far */}
      <Swap
        style={{ left: layout.margin, top: rowTop[1] }}
        states={[
          [cue("distq"), <><Word>distance</Word><Op tex="=" /><Mono>?</Mono></>],
          [cue("sum"), <><Word>distance</Word><Op tex="\approx" /><Mono>{riemann(4).toFixed(1)} m</Mono></>],
          [thin, <><Word>distance</Word><Op tex="\approx" /><Mono>{riemann(n).toFixed(2)} m</Mono></>],
          [exact, <><Word>distance</Word><Op tex="=" /><Mono c={color.accent}>20 m</Mono></>],
          [morph, null],
        ]}
      />

      <Layer>
        {/* Axes */}
        <g opacity={axes}>
          <text x={box.x} y={box.y - 34} fontFamily={font.sans} fontSize={36} fill={color.label}>speed, m/s</text>
          <line x1={box.x} y1={box.y - 10} x2={box.x} y2={S.Y(0)} stroke={color.rule} strokeWidth={2.5} />
          <line x1={box.x} y1={S.Y(0)} x2={S.X(4)} y2={S.Y(0)} stroke={color.rule} strokeWidth={2} />
          {[0, 1, 2, 3, 4].map((k) => (
            <MonoLabel key={k} x={S.X(k)} y={S.Y(0) + 56} size={38}>{k}</MonoLabel>
          ))}
          <MonoLabel x={S.X(4) + 42} y={S.Y(0) + 56} size={38}>s</MonoLabel>
        </g>

        {/* Riemann strips; once they are thinner than a pixel, one solid area */}
        {n >= 512 && (
          <path d={`${fnPath(v, 0, 4, S)}L${S.X(4)},${S.Y(0)}L${S.X(0)},${S.Y(0)}Z`} fill={color.accentWash} />
        )}
        {n > 0 &&
          n < 512 &&
          Array.from({ length: n }, (_, i) => {
            const w = 4 / n;
            const grow = n === 4 ? stripsIn(i) : 1;
            const top = S.Y(v(i * w) * grow);
            return (
              <rect
                key={`${n}-${i}`}
                x={S.X(i * w)}
                y={top}
                width={S.X(w) - S.X(0)}
                height={S.Y(0) - top}
                fill={color.accentWash}
                stroke={color.accent}
                strokeOpacity={outline * Math.min(1, 24 / n)}
                strokeWidth={n >= 32 ? 1.2 : 4.5}
              />
            );
          })}
        {n === 4 &&
          [0, 1, 2, 3].map((i) => (
            <MonoLabel key={i} x={S.X(i) + 8} y={S.Y(0) - 20} anchor="start" size={38} fill={color.ink} weight={600} opacity={stripsIn(i)}>
              {v(i).toFixed(1)} m
            </MonoLabel>
          ))}

        {/* "Freeze it for one second" */}
        {freezeRect > 0 && (
          <>
            <rect
              x={S.X(2)}
              y={S.Y(5.4 * freezeRect)}
              width={S.X(1) - S.X(0)}
              height={S.Y(0) - S.Y(5.4 * freezeRect)}
              fill={color.accentWash}
              stroke={color.accent}
              strokeWidth={4.5}
            />
            <line x1={box.x} y1={S.Y(5.4)} x2={S.X(2)} y2={S.Y(5.4)} stroke={color.label} strokeWidth={3} strokeDasharray="12 10" opacity={freezeGuide} />
            <MonoLabel x={box.x - 18} y={S.Y(5.4) + 13} anchor="end" size={38} fill={color.ink} weight={500} opacity={freezeGuide}>5.4</MonoLabel>
            <MonoLabel x={S.X(2.5)} y={S.Y(2.4)} size={40} fill={color.ink} weight={600} opacity={visible(t, mult + 0.6)}>5.4 m</MonoLabel>
          </>
        )}
        <g opacity={unit}>
          <rect x={S.X(2.5) - 52} y={S.Y(0) + 18} width={104} height={54} fill={color.paper} />
          <MonoLabel x={S.X(2.5)} y={S.Y(0) + 56} size={38} fill={color.accent} weight={600}>1 s</MonoLabel>
        </g>

        {/* The speed curve, drawn on */}
        {curve > 0 && <path d={fnPath(v, 0, 4 * curve, S)} fill="none" stroke={color.ink} strokeWidth={5.5} strokeLinecap="round" />}
        {curve > 0 && curve < 1 && <circle cx={S.X(4 * curve)} cy={S.Y(v(4 * curve))} r={9} fill={color.ink} opacity={1 - ramp(t, chart + 1.1, 0.3, easeMove)} />}
      </Layer>
    </>
  );
};
