import { useEffect, useState, type ReactNode } from "react";
import { AbsoluteFill, Audio, continueRender, delayRender, staticFile } from "remotion";
import { ramp, easeIn, useTime } from "../anim";
import { NarrationContext, type Timing } from "../narration";
import { brand, color, font } from "../theme";
import { Captions } from "./Caption";

export const END_CARD = 1.6; // seconds of brand card after the last word
export const TAIL = 1.0; // seconds the final frame holds before the end card

// Page, narration audio, captions and end card. A video only draws its
// diagrams as children and reads cue times with useNarration().
export const Video = ({ timing, children }: { timing: Timing; children: ReactNode }) => {
  const [handle] = useState(() => delayRender("fonts"));
  useEffect(() => {
    document.fonts.ready.then(() => continueRender(handle));
  }, [handle]);
  const t = useTime();
  const endAt = timing.duration + TAIL;
  const content = 1 - ramp(t, endAt, 0.5);
  return (
    <NarrationContext.Provider value={timing}>
      <AbsoluteFill style={{ background: color.paper, fontFamily: font.sans, color: color.ink }}>
        <Audio src={staticFile(`voice/${timing.id}/narration.wav`)} />
        <AbsoluteFill style={{ opacity: content }}>
          {children}
          <Captions />
        </AbsoluteFill>
        <EndCard start={endAt + 0.25} />
      </AbsoluteFill>
    </NarrationContext.Provider>
  );
};

const EndCard = ({ start }: { start: number }) => {
  const t = useTime();
  const p = ramp(t, start, 0.6, easeIn);
  if (p <= 0) return null;
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: p }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
          transform: `translateY(${(1 - p) * 16}px)`,
          fontFamily: font.sans,
          fontWeight: 500,
          fontSize: 50,
          letterSpacing: "-0.02em",
        }}
      >
        <Mark />
        {brand.name}
      </div>
    </AbsoluteFill>
  );
};

// A neutral mark: replace with your own logo SVG.
const Mark = () => (
  <svg width={40} height={40} viewBox="0 0 40 40">
    <rect x={2} y={2} width={36} height={36} rx={4} fill="none" stroke={color.ink} strokeWidth={6} />
    <rect x={14} y={14} width={12} height={12} fill={color.accent} />
  </svg>
);
