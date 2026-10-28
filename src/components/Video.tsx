import { useEffect, useState, type ReactNode } from "react";
import { AbsoluteFill, Audio, continueRender, delayRender, staticFile } from "remotion";
import { ramp, easeIn, useTime } from "../anim";
import { NarrationContext, type Timing } from "../narration";
import { brand, color, font } from "../theme";
import { Captions } from "./Caption";

export const END_CARD = 1.6; // seconds of brand card after the last word
export const TAIL = 1.0; // seconds the final frame holds before the end card

// Page, narration audio, captions, the CTA and the end card. A video only
// draws its diagrams as children and reads cue times with useNarration().
export const Video = ({ timing, children }: { timing: Timing; children: ReactNode }) => {
  const [handle] = useState(() => delayRender("fonts"));
  useEffect(() => {
    document.fonts.ready.then(() => continueRender(handle));
  }, [handle]);
  const t = useTime();
  const endAt = timing.duration + TAIL;
  const cta = timing.cues.cta;
  // The diagram clears for the CTA; captions stay until the end card.
  const diagram = cta === undefined ? 1 : 1 - ramp(t, timing.lines.at(-1)!.start - 0.35, 0.5);
  const content = 1 - ramp(t, endAt, 0.5);
  return (
    <NarrationContext.Provider value={timing}>
      <AbsoluteFill style={{ background: color.paper, fontFamily: font.sans, color: color.ink }}>
        <Audio src={staticFile(`voice/${timing.id}/narration.wav`)} />
        <AbsoluteFill style={{ opacity: content }}>
          {diagram > 0 && <AbsoluteFill style={{ opacity: diagram }}>{children}</AbsoluteFill>}
          {cta !== undefined && <CommentBubble start={cta} typeAt={timing.lines.at(-1)!.tokens.at(-1)!.start} />}
          <Captions />
        </AbsoluteFill>
        <EndCard start={endAt + 0.25} />
      </AbsoluteFill>
    </NarrationContext.Provider>
  );
};

// The CTA: a comment box that types the keyword as it is spoken.
const KEYWORD = "seeko";
const CommentBubble = ({ start, typeAt }: { start: number; typeAt: number }) => {
  const t = useTime();
  const p = ramp(t, start - 0.1, 0.5, easeIn);
  if (p <= 0) return null;
  const typed = KEYWORD.slice(0, Math.floor(Math.max(0, t - typeAt) / 0.07));
  const caret = Math.floor(t * 2.2) % 2 === 0 || typed.length < KEYWORD.length;
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: p }}>
      <div style={{ transform: `translateY(${(1 - p) * 20}px)`, position: "relative" }}>
        <svg width={440} height={200} viewBox="0 0 440 200" style={{ display: "block" }}>
          <path
            d="M40,4 H400 A36,36 0 0 1 436,40 V124 A36,36 0 0 1 400,160 H150 L104,196 L110,160 H40 A36,36 0 0 1 4,124 V40 A36,36 0 0 1 40,4 Z"
            fill="none"
            stroke={color.ink}
            strokeWidth={4}
            strokeLinejoin="round"
          />
        </svg>
        <div
          style={{
            position: "absolute",
            left: 56,
            top: 46,
            fontFamily: font.mono,
            fontSize: 64,
            fontWeight: 500,
            color: color.accent,
            whiteSpace: "pre",
          }}
        >
          {typed}
          <span style={{ color: color.ink, opacity: caret ? 1 : 0, fontWeight: 400 }}>|</span>
        </div>
      </div>
    </AbsoluteFill>
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
