import type { CSSProperties, ReactNode } from "react";
import { easeIn, ramp, useTime } from "../../anim";
import { color, font, layout } from "../../theme";

// Pieces this video needed that the shared components do not cover yet.
// Candidates for src/components once another video wants them.

/** "Alg 1 · Alg 2 · Geo · Trig": a class nav without chapter numbers, the active one underlined. */
export const ClassNav = ({ items, active, top }: { items: string[]; active: number; top: number }) => (
  <div
    style={{
      position: "absolute",
      left: layout.margin,
      top,
      fontFamily: font.mono,
      fontSize: 34,
      color: color.label,
      display: "flex",
      gap: 18,
      whiteSpace: "nowrap",
    }}
  >
    {items.map((c, i) => (
      <span key={c} style={{ display: "flex", gap: 18 }}>
        {i > 0 && <span>·</span>}
        <span
          style={{
            color: i === active ? color.ink : color.label,
            borderBottom: `3px solid ${i === active ? color.ink : "transparent"}`,
            paddingBottom: 4,
          }}
        >
          {c}
        </span>
      </span>
    ))}
  </div>
);

/**
 * Builds a formula whose [bracketed] parts can light up in accent without the
 * layout moving: every bracket is wrapped in \textcolor in both versions, so
 * the plain and the lit formula are glyph-for-glyph identical.
 *   lit("(x - [1])(x - [5])", true)  -> 1 and 5 in accent
 *   lit("(x [- 3])^2 [+ 2]", [0], [1]) -> "- 3" in accent, "+ 2" reserved but invisible
 */
export const lit = (tex: string, on: boolean | number[], hide: number[] = []) => {
  let k = -1;
  return tex.replace(/\[([^\]]+)\]/g, (_, body: string) => {
    k++;
    const hot = on === true || (Array.isArray(on) && on.includes(k));
    // hidden parts still take their space, so a later version can reveal them in place
    const ink = hide.includes(k) ? "transparent" : hot ? color.accent : color.ink;
    const c = (s: string) => `\\textcolor{${ink}}{${s}}`;
    // "[- 4]" keeps the spacing of a binary minus: color the operator inside \mathbin.
    const op = body.match(/^([+-])\s*(.*)$/);
    return op ? `\\mathbin{${c(op[1])}}${c(op[2])}` : c(body);
  });
};

/**
 * Layers of the same layout stacked in one slot. The first layer is always
 * shown; each later layer fades in at `from` and out at `to`, on top of it.
 * Use it to light up part of a formula in place.
 */
export const Layers = ({ base, layers, dur = 0.3 }: { base: ReactNode; layers: [from: number, to: number, node: ReactNode][]; dur?: number }) => {
  const t = useTime();
  return (
    <span style={{ display: "inline-grid" }}>
      <span style={{ gridArea: "1 / 1" }}>{base}</span>
      {layers.map(([from, to, node], i) => {
        const o = Math.min(ramp(t, from, dur), to === Infinity ? 1 : 1 - ramp(t, to, dur));
        return o > 0 ? (
          <span key={i} style={{ gridArea: "1 / 1", opacity: o }}>
            {node}
          </span>
        ) : null;
      })}
    </span>
  );
};

/** An inline value that crossfades with a small rise when it changes (5 -> 9 -> 11). */
export const Roll = ({ states, dur = 0.35, align = "start" }: { states: [at: number, node: ReactNode][]; dur?: number; align?: "start" | "center" | "end" }) => {
  const t = useTime();
  return (
    <span style={{ display: "inline-grid", justifyItems: align }}>
      {states.map(([at, node], i) => {
        const next = states[i + 1]?.[0] ?? Infinity;
        const pin = i === 0 ? 1 : ramp(t, at, dur, easeIn);
        const pout = next === Infinity ? 0 : ramp(t, next, dur * 0.8);
        if (pin <= 0 || pout >= 1) return <span key={i} style={{ gridArea: "1 / 1", visibility: "hidden" }}>{node}</span>;
        return (
          <span key={i} style={{ gridArea: "1 / 1", opacity: pin * (1 - pout), transform: `translateY(${(1 - pin) * 14 - pout * 10}px)` }}>
            {node}
          </span>
        );
      })}
    </span>
  );
};

/** A readout row that fades in with a small rise at `from` and out at `to`. */
export const Row = ({
  top,
  from,
  to = Infinity,
  right,
  children,
  style,
}: {
  top: number;
  from: number;
  to?: number;
  right?: boolean;
  children: ReactNode;
  style?: CSSProperties;
}) => {
  const t = useTime();
  const pin = ramp(t, from, 0.4, easeIn);
  const pout = to === Infinity ? 0 : ramp(t, to, 0.3);
  if (pin <= 0 || pout >= 1) return null;
  return (
    <div
      style={{
        position: "absolute",
        top,
        ...(right ? { right: layout.margin } : { left: layout.margin }),
        display: "flex",
        alignItems: "baseline",
        gap: 16,
        whiteSpace: "nowrap",
        opacity: pin * (1 - pout),
        transform: `translateY(${(1 - pin) * 14 - pout * 10}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
