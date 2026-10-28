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
