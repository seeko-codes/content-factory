import { interpolateColors } from "remotion";
import { glides, ramp, spans, useTime, visible } from "../../anim";
import { Layer } from "../../components/Chart";
import { Layers, Readout, Roll } from "../../components/Readout";
import { lit, Tex } from "../../components/Tex";
import { useNarration } from "../../narration";
import { color, font, layout } from "../../theme";

// 3x + 5 = 20: x goes in, times 3, plus 5, comes out 20.
// Backwards: 20 - 5 = 15, 15 / 3 = 5, and 3 * 5 + 5 = 20 checks.

const rowTop = [478, 588, 698];
const trackY = 1170;
const S = 180; // where x starts, and where the answer lands
const B = [415, 705]; // box centers: first operation, second operation
const E = 900; // where the recipe's output lands
const BOX = { w: 220, top: 1040, bottom: 1280 };
const R0 = 15; // the dot
const RING = [27, 40]; // the layers the recipe wraps around it

export const SocksAndShoes = () => {
  const t = useTime();
  const { cue } = useNarration();

  // ---- Hook: the equation, and the rule everyone is taught -------------------
  const glide = ramp(t, cue("socks0"), 0.8);
  const heroSize = 150 + (layout.texSize - 150) * glide;
  const steps = 1 - ramp(t, cue("socks0") - 0.35, 0.35);

  // ---- The machine ------------------------------------------------------------
  const machine = visible(t, cue("socks0") - 0.15, Infinity, 0.4);
  const [socks, shoes, shoesoff, first] = [cue("socks"), cue("shoes"), cue("shoesoff"), cue("first")];
  const [times, plus, lands] = [cue("times"), cue("plus"), cue("lands")];
  const [minus, fifteen, div, five] = [cue("minus"), cue("fifteen"), cue("div"), cue("five")];
  const offline = cue("offline");

  // The dot: on with socks and shoes, off again in reverse; then x through x3, +5, and back.
  const dotX = glides(t, S, [
    [socks - 0.45, 0.5, B[0]],
    [socks + 0.12, 0.55, B[1]],
    [shoes + 0.3, 0.5, E],
    [offline + 0.35, 0.55, B[1]],
    [shoesoff + 0.25, 0.5, B[0]],
    [first + 0.3, 0.55, S],
    [times, 0.5, B[0]],
    [plus - 0.1, 0.5, B[1]],
    [lands - 0.45, 0.5, E],
    [minus, 0.55, B[1]],
    [div, 0.55, B[0]],
    [five + 0.1, 0.55, S],
  ]);
  const inner = spans(t, [[socks, shoesoff + 0.25 + 0.5], [times + 0.5, div + 0.55]]);
  const outer = spans(t, [[shoes, shoesoff], [plus + 0.4, minus + 0.55]]);

  // What the dot is called as it travels.
  const label: [number, React.ReactNode][] = [
    [cue("x"), <Tex tex="x" size={56} />],
    [times + 0.5, <Tex tex="3x" size={56} />],
    [plus + 0.4, <Tex tex="3x + 5" size={56} />],
    [lands + 0.05, <Tex tex="20" size={56} />],
    [fifteen, <Tex tex="15" size={56} />],
    [five, <Tex tex="5" size={56} />],
    [five + 0.65, <Tex tex={lit("x = [5]", true)} size={56} />],
  ];
  const labelOpacity = visible(t, cue("x"), Infinity, 0.35);

  // Box signs: socks and shoes, then the recipe, then its undo.
  const undo = cue("undo");
  const last = cue("last");
  const thesis = cue("thesis");
  const hot = Math.min(ramp(t, last, 0.4), 1 - ramp(t, thesis, 0.5));
  const boxStroke = interpolateColors(hot, [0, 1], [color.ink, color.accent]);
  const boxFill = interpolateColors(hot, [0, 1], [color.chip, color.accentWash]);
  const word = (s: string) => <span style={{ fontFamily: font.sans, fontSize: 46, color: color.inkSoft, fontWeight: 500 }}>{s}</span>;
  const op = (tex: string, c?: string) => <Tex tex={tex} size={layout.texSize} style={c ? { color: c } : undefined} />;
  const signs: [number, React.ReactNode][][] = [
    [
      [0, word("socks")],
      [cue("recipe0"), op("\\times 3")],
      [undo, op("\\div 3")],
    ],
    [
      [0, word("shoes")],
      [cue("recipe0"), op("+5")],
      [undo, op("-5")],
      [last, op("+5", color.accent)],
      [cue("first2"), op("-5", color.accent)],
      [thesis, op("-5")],
    ],
  ];

  // Direction chevrons flip on "reverse".
  const flip = ramp(t, cue("reverse"), 0.7);
  const chevrons = [(S + B[0] - BOX.w / 2) / 2, (B[0] + B[1]) / 2, (B[1] + BOX.w / 2 + E) / 2];

  return (
    <>
      {/* The equation: the hook's hero, then the anchor row for the rest */}
      <div style={{ position: "absolute", left: 90 + 10 * glide, top: 600 + (rowTop[0] - 600) * glide }}>
        <Layers
          base={<Tex tex={lit("[3]x [+ 5] = 20", false)} size={heroSize} />}
          layers={[
            [cue("recipe"), times, <Tex tex={lit("[3]x [+ 5] = 20", true)} size={heroSize} />],
            [last, thesis, <Tex tex={lit("[3]x [+ 5] = 20", [1])} size={heroSize} />],
          ]}
        />
      </div>
      {steps > 0 && (
        <div style={{ position: "absolute", left: layout.margin, top: 830, display: "flex", alignItems: "baseline", gap: 22, opacity: steps }}>
          <span style={{ opacity: visible(t, cue("subtract"), Infinity, 0.35) }}>
            <Tex tex="-5" size={72} style={{ color: color.inkSoft }} />
          </span>
          <span style={{ opacity: visible(t, cue("divide"), Infinity, 0.35), display: "flex", alignItems: "baseline", gap: 22 }}>
            <span style={{ fontFamily: font.sans, fontSize: 46, color: color.label }}>then</span>
            <Tex tex="\div 3" size={72} style={{ color: color.inkSoft }} />
          </span>
        </div>
      )}

      {/* Solving, written out as the dot walks back */}
      <Readout top={rowTop[1]} from={fifteen}>
        <Tex tex="3x = 15" size={layout.texSize} />
      </Readout>
      <Readout top={rowTop[2]} from={five}>
        <Tex tex={lit("x = 15 / 3 = [5]", true)} size={layout.texSize} />
      </Readout>

      <Layer opacity={machine}>
        {/* track, with end ticks and direction marks */}
        <line x1={S} y1={trackY} x2={E} y2={trackY} stroke={color.rule} strokeWidth={3} />
        {[S, E].map((x) => (
          <line key={x} x1={x} y1={trackY - 16} x2={x} y2={trackY + 16} stroke={color.rule} strokeWidth={3} />
        ))}
        {chevrons.map((cx) => (
          <path
            key={cx}
            d="M-7,-11 L5,0 L-7,11"
            transform={`translate(${cx} ${trackY}) rotate(${180 * flip})`}
            fill="none"
            stroke={color.label}
            strokeWidth={3.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
        {/* the two boxes */}
        {B.map((cx, i) => (
          <rect
            key={cx}
            x={cx - BOX.w / 2}
            y={BOX.top}
            width={BOX.w}
            height={BOX.bottom - BOX.top}
            rx={18}
            fill={i === 1 ? boxFill : color.chip}
            stroke={i === 1 ? boxStroke : color.ink}
            strokeWidth={3.5}
          />
        ))}
        {/* the dot and its layers */}
        {outer > 0.01 && <circle cx={dotX} cy={trackY} r={R0 + (RING[1] - R0) * outer} fill="none" stroke={color.inkSoft} strokeWidth={3.5} opacity={Math.min(1, outer * 1.5)} />}
        {inner > 0.01 && <circle cx={dotX} cy={trackY} r={R0 + (RING[0] - R0) * inner} fill="none" stroke={color.inkSoft} strokeWidth={3.5} opacity={Math.min(1, inner * 1.5)} />}
        <circle cx={dotX} cy={trackY} r={R0} fill={color.ink} />
      </Layer>

      {/* Box signs, above each box */}
      {B.map((cx, i) => (
        <div key={cx} style={{ position: "absolute", left: cx - 150, width: 300, top: BOX.top - 96, textAlign: "center", opacity: machine }}>
          <Roll align="center" states={signs[i]} />
        </div>
      ))}

      {/* The dot's name rides above it */}
      {labelOpacity > 0 && (
        <div style={{ position: "absolute", left: dotX - 150, width: 300, top: trackY - 112, textAlign: "center", opacity: labelOpacity * machine }}>
          <Roll align="center" states={label} dur={0.3} />
        </div>
      )}
    </>
  );
};
