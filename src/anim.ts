import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

// The house motion: things glide, never bounce. Moves use a symmetric
// ease-in-out, arrivals use a long ease-out.
export const easeMove = Easing.bezier(0.65, 0, 0.35, 1);
export const easeIn = Easing.bezier(0.16, 1, 0.3, 1);

/** Current time in seconds. */
export const useTime = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return frame / fps;
};

/** 0 before `start`, 1 after `start + dur`, eased in between. */
export const ramp = (t: number, start: number, dur = 0.6, easing = easeMove) =>
  interpolate(t, [start, start + dur], [0, 1], {
    easing,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

/** Fade in at `start`, fade out at `end` (seconds). */
export const visible = (t: number, start: number, end = Infinity, dur = 0.4) =>
  Math.min(ramp(t, start, dur, easeIn), end === Infinity ? 1 : 1 - ramp(t, end, dur));

export const lerp = (a: number, b: number, p: number) => a + (b - a) * p;

/** Value that glides through a series of moves: starts at `from`, and each [start, dur, to] eases it onward. */
export const glides = (t: number, from: number, moves: [start: number, dur: number, to: number][]) => {
  let at = from;
  let v = from;
  for (const [start, dur, to] of moves) {
    v += (to - at) * ramp(t, start, dur);
    at = to;
  }
  return v;
};

/** 0..1 while something is on: it fades on at each `on` time and off at the matching `off`. */
export const spans = (t: number, list: [on: number, off: number][]) =>
  list.reduce((p, [on, off]) => p + ramp(t, on, 0.35, easeIn) - (off === Infinity ? 0 : ramp(t, off, 0.35)), 0);

/** Props that draw an SVG path on from its start (p from 0 to 1): spread onto a <path>. */
export const drawOn = (p: number) => ({ pathLength: 1, strokeDasharray: `${Math.max(0, p)} 2` });

/** Deterministic random numbers in [0, 1), so scattered points land the same on every render. */
export const seeded = (seed: number) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let r = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
  return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
};
