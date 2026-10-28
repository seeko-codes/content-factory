import type { CSSProperties, ReactNode } from "react";
import { easeIn, ramp, useTime } from "../anim";

// One slot whose content changes at given times: the old state fades up and
// out while the new one rises in. Use it for readouts that evolve with the
// narration ("distance = ?" -> "distance ≈ 17.4 m" -> "distance = 20 m").
export const Swap = ({
  states,
  style,
  dur = 0.35,
}: {
  states: [start: number, content: ReactNode][];
  style?: CSSProperties;
  dur?: number;
}) => {
  const t = useTime();
  return (
    <>
      {states.map(([start, content], i) => {
        const end = states[i + 1]?.[0] ?? Infinity;
        const pin = ramp(t, start, dur, easeIn);
        const pout = end === Infinity ? 0 : ramp(t, end, dur * 0.8);
        if (pin <= 0 || pout >= 1 || content === null) return null;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              display: "flex",
              alignItems: "baseline",
              gap: 16,
              whiteSpace: "nowrap",
              ...style,
              opacity: pin * (1 - pout),
              transform: `translateY(${(1 - pin) * 14 - pout * 10}px)`,
            }}
          >
            {content}
          </div>
        );
      })}
    </>
  );
};
