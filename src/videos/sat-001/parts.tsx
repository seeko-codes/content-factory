import type { ReactNode } from "react";
import { ramp, useTime } from "../../anim";
import { ChapterNav } from "../../components/Title";

// Candidates for src/components once another video needs them.

/** Text that slides up out of its own clipped box, the way caption words leave. */
export const Rise = ({ out, children }: { out: number; children: ReactNode }) => (
  <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}>
    <span style={{ display: "inline-block", transform: `translateY(${-out * 105}%)` }}>{children}</span>
  </span>
);

/**
 * A chapter nav that stays on screen while the underline moves between
 * chapters. `states` are [time, active] pairs; -1 underlines nothing. The
 * plain nav is always drawn, and each underlined variant fades over it, so the
 * shared words never dip in opacity during a change.
 */
export const NavTrack = ({
  chapters,
  states,
  top,
  left,
  dur = 0.3,
}: {
  chapters: string[];
  states: [at: number, active: number][];
  top: number;
  left: number;
  dur?: number;
}) => {
  const t = useTime();
  const layer = (active: number, opacity: number, key: string) => (
    <div key={key} style={{ position: "absolute", top, left, whiteSpace: "nowrap", opacity }}>
      <ChapterNav chapters={chapters} active={active} />
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

/** Props that draw an SVG path on from its start: pass to <path> with pathLength. */
export const drawOn = (p: number) => ({ pathLength: 1, strokeDasharray: `${Math.max(0, p)} 2` });
