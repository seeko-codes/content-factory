import type { CSSProperties, ReactNode } from "react";
import { easeIn, ramp, useTime } from "../anim";
import { color, font, layout } from "../theme";
import { Tex } from "./Tex";

// The readout typography: "distance ≈ 17.4 m" is a Label, an Op and a Mono.

/** A computed or measured value, in mono. */
export const Mono = ({ children, c = color.ink, w = 600 }: { children: ReactNode; c?: string; w?: number }) => (
  <span style={{ fontFamily: font.mono, fontSize: layout.monoSize, color: c, fontWeight: w }}>{children}</span>
);

/** The operator between a label and its value (=, ≈, ×), lighter than the value. */
export const Op = ({ tex }: { tex: string }) => <Tex tex={tex} size={layout.texSize} color={color.operator} />;

/** What a value is ("distance", "questions"), in soft sans. */
export const Label = ({ children }: { children: ReactNode }) => (
  <span style={{ fontSize: layout.monoSize, fontWeight: 400, color: color.inkSoft }}>{children}</span>
);

/** A readout row at a fixed height that fades in with a small rise at `from` and out at `to`. */
export const Readout = ({
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

/**
 * An inline value that crossfades with a small rise when it changes (5 -> 9 -> 11).
 * The inline cousin of Swap: it takes the space of its widest state.
 */
export const Roll = ({
  states,
  dur = 0.35,
  align = "start",
}: {
  states: [at: number, node: ReactNode][];
  dur?: number;
  align?: "start" | "center" | "end";
}) => {
  const t = useTime();
  return (
    <span style={{ display: "inline-grid", justifyItems: align }}>
      {states.map(([at, node], i) => {
        const next = states[i + 1]?.[0] ?? Infinity;
        const pin = i === 0 ? 1 : ramp(t, at, dur, easeIn);
        const pout = next === Infinity ? 0 : ramp(t, next, dur * 0.8);
        if (pin <= 0 || pout >= 1)
          return (
            <span key={i} style={{ gridArea: "1 / 1", visibility: "hidden" }}>
              {node}
            </span>
          );
        return (
          <span key={i} style={{ gridArea: "1 / 1", opacity: pin * (1 - pout), transform: `translateY(${(1 - pin) * 14 - pout * 10}px)` }}>
            {node}
          </span>
        );
      })}
    </span>
  );
};

/**
 * Layers of the same layout stacked in one slot. The base is always shown;
 * each later layer fades in at `from` and out at `to`, on top of it. With
 * `lit()` this lights up part of a formula without anything moving.
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
