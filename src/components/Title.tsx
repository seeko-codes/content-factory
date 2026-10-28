import type { CSSProperties, ReactNode } from "react";
import { ramp, useTime } from "../anim";
import { color, font, layout } from "../theme";

// "Calculus III / in 60 seconds": large sans title, mono subtitle beneath.
export const TitleCard = ({
  title,
  sub = "in 60 seconds",
  kicker,
  top = layout.captionTop - 20,
  opacity = 1,
}: {
  title: ReactNode;
  sub?: ReactNode;
  kicker?: ReactNode;
  top?: number;
  opacity?: number;
}) => (
  <div style={{ position: "absolute", left: layout.margin, right: layout.margin, top, opacity }}>
    {kicker}
    <div style={{ fontFamily: font.sans, fontWeight: 500, fontSize: layout.titleSize, lineHeight: 1.02, letterSpacing: "-0.035em" }}>
      {title}
    </div>
    {sub && (
      <div style={{ fontFamily: font.mono, fontSize: 40, color: color.inkSoft, marginTop: 10 }}>{sub}</div>
    )}
  </div>
);

// "MILLENNIUM 05 / 07": tracked small caps label with mono numbers.
export const Kicker = ({ label, index, total }: { label: string; index?: number; total?: number }) => (
  <div style={{ fontFamily: font.sans, fontSize: 26, letterSpacing: "0.08em", color: color.inkSoft, marginBottom: 14 }}>
    {label.toUpperCase()}
    {index !== undefined && (
      <span style={{ fontFamily: font.mono, letterSpacing: 0, marginLeft: 14, color: color.ink }}>
        {String(index).padStart(2, "0")}
        <span style={{ color: color.label }}> / </span>
        {String(total).padStart(2, "0")}
      </span>
    )}
  </div>
);

// "1 matrix · 2 det · 3 eigen": chapter nav, the active one underlined.
// `numbered={false}` uses the labels as given ("Alg 1 · Alg 2 · Geo · Trig").
// Pass `style` to place it, e.g. { position: "absolute", left, top }.
export const ChapterNav = ({
  chapters,
  active,
  numbered = true,
  style,
}: {
  chapters: string[];
  active: number;
  numbered?: boolean;
  style?: CSSProperties;
}) => (
  <div style={{ fontFamily: font.mono, fontSize: 34, color: color.label, marginBottom: 22, display: "flex", gap: 18, ...style }}>
    {chapters.map((c, i) => (
      <span key={c} style={{ display: "flex", gap: 18 }}>
        {i > 0 && <span>·</span>}
        <span
          style={{
            color: i === active ? color.ink : color.label,
            borderBottom: `3px solid ${i === active ? color.ink : "transparent"}`,
            paddingBottom: 4,
          }}
        >
          {numbered && <>{i + 1} </>}
          {c}
        </span>
      </span>
    ))}
  </div>
);

/**
 * A chapter nav that stays on screen while the underline moves between
 * chapters. `states` are [time, active] pairs; -1 underlines nothing. The
 * plain nav is always drawn and each underlined variant fades over it, so the
 * shared words never dip in opacity during a change.
 */
export const NavTrack = ({
  chapters,
  states,
  top,
  left,
  numbered = true,
  dur = 0.3,
}: {
  chapters: string[];
  states: [at: number, active: number][];
  top: number;
  left: number;
  numbered?: boolean;
  dur?: number;
}) => {
  const t = useTime();
  const layer = (active: number, opacity: number, key: string) => (
    <div key={key} style={{ position: "absolute", top, left, whiteSpace: "nowrap", opacity }}>
      <ChapterNav chapters={chapters} active={active} numbered={numbered} />
    </div>
  );
  return (
    <>
      {layer(-1, 1, "base")}
      {states.map(([at, active], i) => {
        if (active < 0) return null;
        const next = states[i + 1]?.[0] ?? Infinity;
        const o = ramp(t, at, dur) * (next === Infinity ? 1 : 1 - ramp(t, next, dur));
        return o > 0 ? layer(active, o, `s${i}`) : null;
      })}
    </>
  );
};

/** Title text that slides up out of its own clipped box, the way caption words leave. `out` runs 0 to 1. */
export const Rise = ({ out, children }: { out: number; children: ReactNode }) => (
  <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}>
    <span style={{ display: "inline-block", transform: `translateY(${-out * 105}%)` }}>{children}</span>
  </span>
);

// "area ×3": mono readout on a soft rounded chip.
export const Chip = ({ label, value }: { label: string; value: ReactNode }) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "baseline",
      gap: 22,
      background: color.chip,
      borderRadius: 18,
      padding: "18px 30px",
      fontFamily: font.mono,
      fontSize: 52,
    }}
  >
    <span style={{ color: color.inkSoft }}>{label}</span>
    <span style={{ color: color.ink, fontWeight: 600 }}>{value}</span>
  </span>
);
