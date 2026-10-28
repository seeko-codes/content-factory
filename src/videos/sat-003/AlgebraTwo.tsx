import { interpolate, interpolateColors } from "remotion";
import { easeIn, easeMove, ramp, useTime, visible } from "../../anim";
import { fnPath, Layer, MonoLabel, scale } from "../../components/Chart";
import { Arrow } from "../../components/Space";
import { Tex } from "../../components/Tex";
import { Chip, TitleCard } from "../../components/Title";
import { useNarration } from "../../narration";
import { color, font, layout } from "../../theme";
import { ClassNav, Layers, lit, Roll, Row } from "./parts";

// The numbers on screen, recomputed:
// (x - 1)(x - 5) = (x - 3)^2 - 4 = x^2 - 6x + 5: zeros 1 and 5, vertex (3, -4), y-intercept 5.
// x^2 - 6x + c has b^2 - 4ac = 36 - 4c: c = 5 -> 16 (2 solutions), c = 9 -> 0 (1), c = 11 -> -8 (0).
// 100 + 10t at t = 20 is 300; 100(1.1)^20 = 672.75, about 673.
// (x - 1)^2 (x - 4) touches zero at 1 (squared) and crosses at 4.
// sqrt(x + 2) = x squares to x^2 - x - 2 = 0, x = 2 or x = -1; sqrt(-1 + 2) = 1, not -1.

const rowTop = [478, 588, 698];
const NAV_TOP = 192;

const box = { x: 100, y: 850, w: 880, h: 560 };
const P = scale(box, { x0: -2.5, x1: 6.5, y0: -5, y1: 7 }); // parabolas and the cubic
const R = scale(box, { x0: -3, x1: 6, y0: -3, y1: 3.5 }); // the radical, near-equal units
const eBox = { x: 190, y: 870, w: 700, h: 520 };
const E = scale(eBox, { x0: 0, x1: 20, y0: 0, y1: 720 }); // growth over 20 years
const clipTop = box.y - 15;
const clipBottom = box.y + box.h + 30;
const yTop = 7 + 15 / (box.h / 12); // data y at the clip edges of P
const yBottom = -5 - 30 / (box.h / 12);

const quad = (h: number, k: number) => (x: number) => (x - h) ** 2 + k;
const cubic = (x: number) => (x - 1) ** 2 * (x - 4);
const root = (x: number) => Math.sqrt(Math.max(0, x + 2));

const T = ({ tex, size = layout.texSize, c }: { tex: string; size?: number; c?: string }) => (
  <Tex tex={tex} size={size} style={c ? { color: c } : undefined} />
);
const Op = ({ tex }: { tex: string }) => <Tex tex={tex} size={layout.texSize} style={{ color: color.operator }} />;
const Mono = ({ children, c = color.ink }: { children: React.ReactNode; c?: string }) => (
  <span style={{ fontFamily: font.mono, fontSize: layout.monoSize, color: c, fontWeight: 600 }}>{children}</span>
);

const Curve = ({ d, stroke = color.ink, width = 5.5, dash, opacity = 1 }: { d: string; stroke?: string; width?: number; dash?: string; opacity?: number }) => (
  <path d={d} fill="none" stroke={stroke} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={dash} opacity={opacity} />
);
const Dot = ({ x, y, fill = color.accent, r = 10, opacity = 1 }: { x: number; y: number; fill?: string; r?: number; opacity?: number }) =>
  opacity > 0 ? <circle cx={x} cy={y} r={r} fill={fill} opacity={opacity} /> : null;

/** Axis rules through the origin of a chart; no arrowheads, no ticks. */
const Cross = ({ S, opacity }: { S: ReturnType<typeof scale>; opacity: number }) =>
  opacity > 0 ? (
    <g opacity={opacity} stroke={color.rule}>
      <line x1={box.x} y1={S.Y(0)} x2={box.x + box.w} y2={S.Y(0)} strokeWidth={2.5} />
      <line x1={S.X(0)} y1={box.y - 10} x2={S.X(0)} y2={box.y + box.h} strokeWidth={2.5} />
    </g>
  ) : null;

export const AlgebraTwo = () => {
  const t = useTime();
  const { cue, lines } = useNarration();
  const b = [cue("b1"), cue("b2"), cue("b3"), cue("b4"), cue("b5"), cue("b6")];
  const recap = cue("recap");
  const out = (at: number) => at - 0.35; // stale pieces leave just before the next beat's first word

  // ---- Hook: title card over the first line, then the six pictures --------
  // The title leaves once the first line is spoken; its paper backdrop stays a
  // moment longer, until that line's caption has finished sliding away.
  const titleText = 1 - ramp(t, lines[0].end + 0.1, 0.35);
  const backdrop = 1 - ramp(t, lines[1].start + 0.07, 0.15);
  const hookGrid = (i: number) => Math.min(ramp(t, cue("six") + i * 0.11, 0.5, easeIn), 1 - ramp(t, out(b[0]) - 0.1, 0.35));
  const recapGrid = (i: number) => ramp(t, recap + i * 0.11, 0.5, easeIn);

  // Beat counter "3 / 6" beside the nav.
  const beat = b.filter((at) => t >= at).length;
  const counter = Math.min(visible(t, b[0] - 0.2), 1 - ramp(t, out(recap), 0.35));

  // ---- Beats 1-2: one parabola, three forms, then it slides up --------------
  const axesP = Math.max(visible(t, b[0] - 0.1, out(b[2]), 0.35), visible(t, b[3] - 0.1, out(b[5]), 0.35));
  const q1 = 1 - ramp(t, out(b[2]), 0.35);
  const qDraw = ramp(t, b[0] + 0.1, 1.1);
  const k = -4 + 4 * ramp(t, cue("sol"), 0.8) + 2 * ramp(t, cue("none"), 0.7);
  const qHalf = Math.sqrt(yTop - k);
  const solutions = k < -0.02 ? 2 : k <= 0.02 ? 1 : 0;
  const forms = cue("forms");
  const [zeros, vertex, yint] = [cue("zeros"), cue("vertex"), cue("yint")];
  const beat1Dots = 1 - ramp(t, out(b[1]) + 0.05, 0.3);
  const lift = ramp(t, b[1], 0.6); // the standard form glides up to the first row
  const two = cue("two");
  const beat2Dots = Math.min(visible(t, two, Infinity, 0.3), q1);

  // ---- Beat 3: add vs multiply ------------------------------------------------
  const axesE = visible(t, b[2], out(b[3]), 0.35);
  const lineDraw = ramp(t, b[2] + 0.15, 1.2);
  const expDraw = ramp(t, cue("pct"), 1.5);
  const wash = visible(t, cue("peel"), Infinity, 0.6);

  // ---- Beat 4: shifts -----------------------------------------------------------
  const s4 = 1 - ramp(t, out(b[4]), 0.35);
  const sDraw = ramp(t, b[3] - 0.1, 0.7);
  const h = 3 * ramp(t, cue("right"), 0.8);
  const kk = 2 * ramp(t, cue("up"), 0.7);
  const sHalf = Math.sqrt(yTop - kk);
  const hArrowColor = interpolateColors(ramp(t, cue("plus"), 0.3), [0, 1], [color.accent, color.label]);

  // ---- Beat 5: zeros as factors -------------------------------------------------
  const s5 = 1 - ramp(t, out(b[5]), 0.35);
  const [bounce, cross] = [cue("bounce"), cue("cross")];
  const pen = interpolate(t, [cue("draw"), bounce, cross, cross + 0.35], [-0.16, 1, 4, 4.59], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const drawing = t >= cue("draw") && t < cross + 0.35;

  // ---- Beat 6: the radical and its fake root -------------------------------------
  const axesR = visible(t, b[5] - 0.1, out(recap), 0.35);
  const s6 = 1 - ramp(t, out(recap), 0.35);
  const rDraw = ramp(t, b[5] + 0.1, 1.0);
  const mirror = Math.min(visible(t, cue("sides"), Infinity, 0.3), 1 - ramp(t, cue("fake"), 0.6));
  const mirrorDraw = ramp(t, cue("sides"), 0.8);
  const two2 = cue("two2");
  const fakeDot = Math.min(visible(t, two2, Infinity, 0.3), 1 - ramp(t, cue("fake"), 0.6));
  const realDot = visible(t, two2, Infinity, 0.3);

  return (
    <>
      <ClassNav items={["Alg 1", "Alg 2", "Geo", "Trig"]} active={1} top={NAV_TOP} />
      {counter > 0 && beat > 0 && (
        <div style={{ position: "absolute", right: layout.margin, top: NAV_TOP, fontFamily: font.mono, fontSize: 34, opacity: counter }}>
          <span style={{ color: color.ink }}>{beat}</span>
          <span style={{ color: color.label }}> / 6</span>
        </div>
      )}

      {/* Title card. It sits above the captions while the first line is spoken,
          like the reference title cards, which carry the voice without a caption. */}
      {backdrop > 0 && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 262, height: 210, background: color.paper, zIndex: 2, opacity: backdrop }}>
          <TitleCard title="Algebra 2" top={18 - (1 - titleText) * 24} opacity={titleText} />
        </div>
      )}

      {/* ---- Readouts ---- */}
      {/* Beat 1: three forms, each lighting up the numbers that show its feature */}
      <Row top={rowTop[0]} from={forms} to={out(b[1])}>
        <Layers
          base={<T tex={lit("y = (x - [1])(x - [5])", false)} />}
          layers={[[zeros, vertex, <T tex={lit("y = (x - [1])(x - [5])", true)} />]]}
        />
      </Row>
      <Row top={rowTop[1]} from={forms + 0.15} to={out(b[1])}>
        <Layers
          base={<T tex={lit("y = (x - [3])^2 [- 4]", false)} />}
          layers={[[vertex, yint, <T tex={lit("y = (x - [3])^2 [- 4]", true)} />]]}
        />
      </Row>
      <Row top={interpolate(lift, [0, 1], [rowTop[2], rowTop[0]])} from={forms + 0.3} to={out(b[2])}>
        <Roll
          states={[
            [0, <Layers base={<T tex={lit("y = x^2 - 6x + [5]", false)} />} layers={[[yint, b[1], <T tex={lit("y = x^2 - 6x + [5]", true)} />]]} />],
            [cue("one") - 0.05, <T tex="y = x^2 - 6x + 9" />],
            [cue("none") + 0.35, <T tex="y = x^2 - 6x + 11" />],
          ]}
        />
      </Row>

      {/* Beat 2: the 2-1-0 counter and the number that predicts it */}
      <Row top={rowTop[1] + 14} from={two} to={out(b[2])} right>
        <Chip label="solutions" value={<span style={{ color: color.accent }}>{solutions}</span>} />
      </Row>
      <Row top={rowTop[1] + 18} from={two + 0.15} to={out(b[2])}>
        <Layers base={<T tex="b^2 - 4ac" />} layers={[[cue("disc"), Infinity, <T tex="b^2 - 4ac" c={color.accent} />]]} />
        <Op tex="=" />
        <Roll
          states={[
            [0, <Mono>16</Mono>],
            [cue("one") - 0.05, <Mono>0</Mono>],
            [cue("none") + 0.35, <Mono>−8</Mono>],
          ]}
        />
      </Row>

      {/* Beat 3 */}
      <Row top={rowTop[0]} from={b[2]} to={out(b[3])}>
        <Roll states={[[0, <T tex="100 + 10t" />], [cue("pct"), <T tex="100(1 + 0.1)^t" />]]} />
      </Row>
      <Row top={rowTop[1]} from={cue("away")} to={out(b[3])}>
        <T tex="a(1 + r)^t" c={color.label} />
      </Row>

      {/* Beat 4 */}
      <Row top={rowTop[0]} from={b[3]} to={out(b[4])}>
        <Roll
          states={[
            [0, <T tex="y = x^2" />],
            [
              cue("three"),
              <Layers
                base={<T tex={lit("y = (x [- 3])^2 [+ 2]", [0], [1])} />}
                layers={[[cue("plus"), Infinity, <T tex={lit("y = (x [- 3])^2 [+ 2]", [1])} />]]}
              />,
            ],
          ]}
        />
      </Row>
      <Row top={rowTop[1]} from={lines[8].end} to={out(b[4])}>
        <T tex="f(x - h) + k" c={color.label} />
      </Row>

      {/* Beat 5 */}
      <Row top={rowTop[0]} from={b[4]} to={out(b[5])}>
        <Layers
          base={<T tex={lit("y = [(x - 1)^2][(x - 4)]", false)} />}
          layers={[
            [cue("factor"), bounce, <T tex={lit("y = [(x - 1)^2][(x - 4)]", true)} />],
            [bounce, cross, <T tex={lit("y = [(x - 1)^2][(x - 4)]", [0])} />],
            [cross, Infinity, <T tex={lit("y = [(x - 1)^2][(x - 4)]", [1])} />],
          ]}
        />
      </Row>

      {/* Beat 6 */}
      <Row top={rowTop[0]} from={b[5]} to={out(recap)}>
        <Roll states={[[0, <T tex="\sqrt{x + 2} = x" />], [cue("sides"), <T tex="x + 2 = x^2" />]]} />
      </Row>
      <Row top={rowTop[1]} from={two2} to={out(recap)}>
        <Roll states={[[0, <T tex="x = 2 \quad\text{or}\quad x = -1" />], [cue("fake"), <T tex={lit("x = [2]", true)} />]]} />
      </Row>
      <Row top={rowTop[2]} from={cue("check")} to={out(recap)}>
        <T tex="\sqrt{-1 + 2} = 1 \neq -1" />
      </Row>

      <Layer>
        <defs>
          <clipPath id="sat003-clip">
            <rect x={box.x} y={clipTop} width={box.w} height={clipBottom - clipTop} />
          </clipPath>
        </defs>

        {/* ---- Beats 1-2 ---- */}
        <Cross S={P} opacity={axesP} />
        <g clipPath="url(#sat003-clip)">
          {q1 > 0 && qDraw > 0 && (
            <Curve d={fnPath(quad(3, k), 3 - qHalf, 3 - qHalf + 2 * qHalf * qDraw, P)} opacity={q1} />
          )}
          {qDraw > 0 && qDraw < 1 && (
            <Dot x={P.X(3 - qHalf + 2 * qHalf * qDraw)} y={P.Y(quad(3, k)(3 - qHalf + 2 * qHalf * qDraw))} r={9} fill={color.ink} />
          )}
        </g>
        <g opacity={beat1Dots}>
          {[1, 5].map((z) => (
            <Dot key={z} x={P.X(z)} y={P.Y(0)} fill={t < vertex ? color.accent : color.ink} opacity={visible(t, zeros, Infinity, 0.3)} />
          ))}
          <MonoLabel x={P.X(1) - 16} y={P.Y(0) + 50} anchor="end" size={38} fill={color.ink} weight={500} opacity={visible(t, zeros, Infinity, 0.3)}>1</MonoLabel>
          <MonoLabel x={P.X(5) + 16} y={P.Y(0) + 50} anchor="start" size={38} fill={color.ink} weight={500} opacity={visible(t, zeros, Infinity, 0.3)}>5</MonoLabel>
          <Dot x={P.X(3)} y={P.Y(-4)} fill={t < yint ? color.accent : color.ink} opacity={visible(t, vertex, Infinity, 0.3)} />
          <MonoLabel x={P.X(3)} y={P.Y(-4) + 56} size={38} fill={color.ink} weight={500} opacity={visible(t, vertex, Infinity, 0.3)}>(3, −4)</MonoLabel>
          <Dot x={P.X(0)} y={P.Y(5)} opacity={visible(t, yint, Infinity, 0.3)} />
          <MonoLabel x={P.X(0) - 22} y={P.Y(5) + 13} anchor="end" size={38} fill={color.ink} weight={500} opacity={visible(t, yint, Infinity, 0.3)}>5</MonoLabel>
        </g>
        {beat2Dots > 0 && t >= two && (
          <g opacity={beat2Dots}>
            {k < -0.02 ? (
              <>
                <Dot x={P.X(3 - Math.sqrt(-k))} y={P.Y(0)} />
                <Dot x={P.X(3 + Math.sqrt(-k))} y={P.Y(0)} />
              </>
            ) : (
              <Dot x={P.X(3)} y={P.Y(0)} opacity={1 - ramp(k, 0.02, 0.4, easeMove)} />
            )}
          </g>
        )}

        {/* ---- Beat 3 ---- */}
        {axesE > 0 && (
          <g opacity={axesE}>
            <text x={eBox.x} y={eBox.y - 30} fontFamily={font.sans} fontSize={36} fill={color.label}>amount</text>
            <line x1={eBox.x} y1={eBox.y - 6} x2={eBox.x} y2={E.Y(0)} stroke={color.rule} strokeWidth={2.5} />
            <line x1={eBox.x} y1={E.Y(0)} x2={E.X(20)} y2={E.Y(0)} stroke={color.rule} strokeWidth={2} />
            {[0, 10, 20].map((y) => (
              <MonoLabel key={y} x={E.X(y)} y={E.Y(0) + 52} size={38}>{y}</MonoLabel>
            ))}
            <MonoLabel x={E.X(20) + 34} y={E.Y(0) + 52} anchor="start" size={38}>yr</MonoLabel>
            <MonoLabel x={eBox.x - 18} y={E.Y(100) + 13} anchor="end" size={38}>100</MonoLabel>
            {wash > 0 && expDraw > 0.05 && (
              <path
                d={`${fnPath((x) => 100 * 1.1 ** x, 1, Math.max(1, 20 * expDraw), E, 120)}L${E.X(Math.max(1, 20 * expDraw))},${E.Y(100 + 10 * Math.max(1, 20 * expDraw))}L${E.X(1)},${E.Y(110)}Z`}
                fill={color.accentWash}
                opacity={wash}
              />
            )}
            {lineDraw > 0 && <Curve d={fnPath((x) => 100 + 10 * x, 0, 20 * lineDraw, E, 2)} stroke={color.label} width={4} />}
            <MonoLabel x={E.X(20)} y={E.Y(300) + 52} anchor="end" size={38} fill={color.inkSoft} weight={500} opacity={visible(t, cue("line"), Infinity, 0.3)}>300</MonoLabel>
            {expDraw > 0 && <Curve d={fnPath((x) => 100 * 1.1 ** x, 0, 20 * expDraw, E)} />}
            {expDraw > 0 && expDraw < 1 && <Dot x={E.X(20 * expDraw)} y={E.Y(100 * 1.1 ** (20 * expDraw))} r={9} fill={color.ink} />}
            <MonoLabel x={E.X(20) - 20} y={E.Y(672.75) + 13} anchor="end" size={40} fill={color.accent} weight={600} opacity={visible(t, cue("away"), Infinity, 0.3)}>673</MonoLabel>
          </g>
        )}

        {/* ---- Beat 4 ---- */}
        {t >= b[3] - 0.2 && s4 > 0 && (
          <g opacity={s4} clipPath="url(#sat003-clip)">
            {h > 0.02 && <Curve d={fnPath(quad(0, 0), -Math.sqrt(yTop), Math.sqrt(yTop), P)} stroke={color.label} width={3.5} dash="12 12" />}
            {sDraw > 0 && <Curve d={fnPath(quad(h, kk), h - sHalf, h - sHalf + 2 * sHalf * sDraw, P)} />}
            {h > 0.15 && <Arrow from={[P.X(0), P.Y(0)]} to={[P.X(h), P.Y(0)]} stroke={hArrowColor} width={5} head={20} />}
            {kk > 0.15 && <Arrow from={[P.X(3), P.Y(0)]} to={[P.X(3), P.Y(kk)]} stroke={color.accent} width={5} head={20} />}
            <Dot x={P.X(h)} y={P.Y(kk)} r={9} fill={color.ink} opacity={visible(t, b[3] + 0.5, Infinity, 0.3)} />
          </g>
        )}

        {/* ---- Beat 5 ---- */}
        {t >= b[4] - 0.2 && s5 > 0 && (
          <g opacity={s5}>
            <g clipPath="url(#sat003-clip)">
              {t >= cue("draw") && <Curve d={fnPath(cubic, -0.16, Math.max(-0.15, pen), P)} />}
              {drawing && <Dot x={P.X(pen)} y={P.Y(cubic(pen))} r={9} fill={color.ink} />}
            </g>
            <Dot x={P.X(1)} y={P.Y(0)} fill={t >= bounce && t < cross ? color.accent : color.ink} opacity={visible(t, cue("zero"), Infinity, 0.3)} />
            <Dot x={P.X(4)} y={P.Y(0)} fill={t >= cross ? color.accent : color.ink} opacity={visible(t, cue("zero"), Infinity, 0.3)} />
            <MonoLabel x={P.X(1)} y={P.Y(0) + 54} size={38} fill={color.ink} weight={500} opacity={visible(t, cue("zero"), Infinity, 0.3)}>1</MonoLabel>
            <MonoLabel x={P.X(4) + 20} y={P.Y(0) + 54} anchor="start" size={38} fill={color.ink} weight={500} opacity={visible(t, cue("zero"), Infinity, 0.3)}>4</MonoLabel>
            <MonoLabel x={P.X(1)} y={P.Y(0) - 32} size={36} fill={color.inkSoft} opacity={visible(t, bounce, Infinity, 0.3)}>bounce</MonoLabel>
            <MonoLabel x={P.X(4) - 24} y={P.Y(0) - 32} anchor="end" size={36} fill={color.inkSoft} opacity={visible(t, cross, Infinity, 0.3)}>cross</MonoLabel>
          </g>
        )}

        {/* ---- Beat 6 ---- */}
        <Cross S={R} opacity={axesR} />
        {t >= b[5] - 0.2 && s6 > 0 && (
          <g opacity={s6}>
            <g clipPath="url(#sat003-clip)">
              {rDraw > 0 && <Curve d={fnPath((x) => x, -3.4, -3.4 + 7.3 * rDraw, R, 2)} stroke={color.inkSoft} width={4} />}
              {mirror > 0 && <Curve d={fnPath((x) => -root(x), -2, -2 + 8 * mirrorDraw, R)} stroke={color.label} width={4} dash="12 12" opacity={mirror} />}
              {rDraw > 0 && <Curve d={fnPath(root, -2, -2 + 8 * rDraw, R, 300)} />}
            </g>
            <MonoLabel x={R.X(3.2) + 30} y={R.Y(3.2) + 12} anchor="start" size={36} fill={color.inkSoft} opacity={visible(t, b[5] + 0.9, Infinity, 0.3)}>y = x</MonoLabel>
            <Dot x={R.X(2)} y={R.Y(2)} opacity={realDot} />
            <MonoLabel x={R.X(2) + 24} y={R.Y(2) + 44} anchor="start" size={38} fill={color.ink} weight={500} opacity={realDot}>2</MonoLabel>
            <Dot x={R.X(-1)} y={R.Y(-1)} opacity={fakeDot} />
            <MonoLabel x={R.X(-1)} y={R.Y(-1) + 56} size={38} fill={color.ink} weight={500} opacity={fakeDot}>−1</MonoLabel>
          </g>
        )}

        {/* ---- The six pictures: in the hook and again in the recap ---- */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const o = Math.max(hookGrid(i), recapGrid(i));
          return o > 0 ? <Card key={i} i={i} opacity={o} /> : null;
        })}
      </Layer>

      {/* Card labels: each picture's formula */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const o = Math.max(hookGrid(i), recapGrid(i));
        if (o <= 0) return null;
        const { x, y } = cardAt(i);
        return (
          <div key={i} style={{ position: "absolute", left: x, top: y + CARD.h - 64, width: CARD.w, textAlign: "center", opacity: o, transform: `translateY(${(1 - o) * 14}px)` }}>
            <T tex={cards[i]} size={32} />
          </div>
        );
      })}
    </>
  );
};

// ---- The six cards ------------------------------------------------------------
const CARD = { w: 280, h: 330, gapX: 20, gapY: 20, top: 570 };
const cardAt = (i: number) => ({
  x: layout.margin + (i % 3) * (CARD.w + CARD.gapX),
  y: CARD.top + Math.floor(i / 3) * (CARD.h + CARD.gapY),
});
const cards = ["(x-1)(x-5)", "b^2-4ac", "a(1+r)^t", "f(x-h)+k", "(x-1)^2(x-4)", "\\sqrt{x+2}=x"];

const Card = ({ i, opacity }: { i: number; opacity: number }) => {
  const { x, y } = cardAt(i);
  const area = { x: x + 22, y: y + 62, w: CARD.w - 44, h: 170 };
  const id = `sat003-card${i}`;
  const rise = (1 - opacity) * 14;
  const mini = (d: { x0: number; x1: number; y0: number; y1: number }) => scale(area, d);
  const axes = (S: ReturnType<typeof scale>, yAxis = true) => (
    <g stroke={color.rule} strokeWidth={2}>
      <line x1={area.x} y1={S.Y(0)} x2={area.x + area.w} y2={S.Y(0)} />
      {yAxis && <line x1={S.X(0)} y1={area.y} x2={S.X(0)} y2={area.y + area.h} />}
    </g>
  );
  let body: React.ReactNode = null;
  if (i === 0) {
    const S = mini({ x0: -1, x1: 6.5, y0: -5, y1: 7 });
    body = (
      <>
        {axes(S)}
        <Curve d={fnPath(quad(3, -4), -0.6, 6.6, S)} width={4} />
        {[[1, 0], [5, 0], [3, -4], [0, 5]].map(([a, c]) => <Dot key={`${a}${c}`} x={S.X(a)} y={S.Y(c)} r={7} />)}
      </>
    );
  } else if (i === 1) {
    const S = mini({ x0: 0, x1: 6, y0: -2.6, y1: 5 });
    body = (
      <>
        {axes(S, false)}
        <Curve d={fnPath(quad(3, -1.8), 0, 6, S)} width={3} stroke={color.label} />
        <Curve d={fnPath(quad(3, 1.8), 0, 6, S)} width={3} stroke={color.label} />
        <Curve d={fnPath(quad(3, 0), 0, 6, S)} width={4} />
        <Dot x={S.X(3)} y={S.Y(0)} r={7} />
      </>
    );
  } else if (i === 2) {
    const S = mini({ x0: 0, x1: 20, y0: 0, y1: 720 });
    body = (
      <>
        <path d={`${fnPath((v) => 100 * 1.1 ** v, 1, 20, S, 80)}L${S.X(20)},${S.Y(300)}L${S.X(1)},${S.Y(110)}Z`} fill={color.accentWash} />
        <line x1={area.x} y1={S.Y(0)} x2={area.x + area.w} y2={S.Y(0)} stroke={color.rule} strokeWidth={2} />
        <line x1={area.x} y1={area.y} x2={area.x} y2={S.Y(0)} stroke={color.rule} strokeWidth={2} />
        <Curve d={fnPath((v) => 100 + 10 * v, 0, 20, S, 2)} width={3} stroke={color.label} />
        <Curve d={fnPath((v) => 100 * 1.1 ** v, 0, 20, S)} width={4} />
      </>
    );
  } else if (i === 3) {
    const S = mini({ x0: -2.2, x1: 5.4, y0: -1, y1: 7 });
    body = (
      <>
        {axes(S)}
        <Curve d={fnPath(quad(0, 0), -2.2, 2.2, S)} width={3} stroke={color.label} dash="8 8" />
        <Curve d={fnPath(quad(3, 2), 0.6, 5.4, S)} width={4} />
        <Arrow from={[S.X(0), S.Y(0)]} to={[S.X(3), S.Y(0)]} stroke={color.accent} width={3.5} head={12} />
        <Arrow from={[S.X(3), S.Y(0)]} to={[S.X(3), S.Y(2)]} stroke={color.accent} width={3.5} head={12} />
      </>
    );
  } else if (i === 4) {
    const S = mini({ x0: -0.4, x1: 4.9, y0: -5.5, y1: 5 });
    body = (
      <>
        {axes(S)}
        <Curve d={fnPath(cubic, -0.25, 4.75, S)} width={4} />
        <Dot x={S.X(1)} y={S.Y(0)} r={7} />
        <Dot x={S.X(4)} y={S.Y(0)} r={7} />
      </>
    );
  } else {
    const S = mini({ x0: -2.6, x1: 4, y0: -2.2, y1: 3 });
    body = (
      <>
        {axes(S)}
        <Curve d={fnPath((v) => v, -2.2, 3, S, 2)} width={3} stroke={color.inkSoft} />
        <Curve d={fnPath(root, -2, 4, S, 200)} width={4} />
        <Dot x={S.X(2)} y={S.Y(2)} r={7} />
        <circle cx={S.X(-1)} cy={S.Y(-1)} r={8} fill={color.chip} stroke={color.label} strokeWidth={2.5} />
      </>
    );
  }
  return (
    <g opacity={opacity} transform={`translate(0 ${rise})`}>
      <defs>
        <clipPath id={id}>
          <rect x={area.x - 6} y={area.y - 6} width={area.w + 12} height={area.h + 12} />
        </clipPath>
      </defs>
      <rect x={x} y={y} width={CARD.w} height={CARD.h} rx={18} fill={color.chip} />
      <MonoLabel x={x + 22} y={y + 44} anchor="start" size={28}>{i + 1}</MonoLabel>
      <g clipPath={`url(#${id})`}>{body}</g>
    </g>
  );
};
