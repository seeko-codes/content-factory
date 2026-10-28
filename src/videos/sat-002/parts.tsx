import type { ReactNode } from "react";
import { fnPath, scale, type Box } from "../../components/Chart";
import { color, font, layout } from "../../theme";

// "Alg 1 · Alg 2 · Geo · Trig": a chapter nav whose labels are used as given
// (the shared ChapterNav numbers its chapters, "1 matrix · 2 det").
// Candidate for src/components/Title.tsx.
export const Nav = ({ items, active, top = 222, opacity = 1 }: { items: string[]; active: number; top?: number; opacity?: number }) => (
  <div
    style={{
      position: "absolute",
      left: layout.margin,
      top,
      opacity,
      display: "flex",
      gap: 18,
      fontFamily: font.mono,
      fontSize: 34,
      color: color.label,
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

// One row of the "year in five pictures" list: a thumbnail, its class name
// and (in the recap) what the picture means.
export type Kind = "line" | "meet" | "system" | "half" | "zeros";

export const Row = ({
  top,
  term,
  meaning,
  picture = 1,
  text = 1,
  rise = 0,
  indent = 1,
  children,
}: {
  top: number;
  term: string;
  meaning?: ReactNode;
  picture?: number;
  text?: number;
  rise?: number;
  indent?: number; // 0 = text at the margin, 1 = text beside the thumbnail
  children?: ReactNode;
}) => (
  <div style={{ position: "absolute", left: layout.margin, right: layout.margin, top, height: ROW_H, transform: `translateY(${rise}px)` }}>
    <div style={{ position: "absolute", left: 0, top: 0, opacity: picture }}>{children}</div>
    <div
      style={{
        position: "absolute",
        left: (THUMB.w + 50) * indent,
        top: 0,
        height: THUMB.h,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 12,
        opacity: text,
      }}
    >
      <div style={{ fontFamily: font.sans, fontWeight: 500, fontSize: 46, letterSpacing: "-0.02em", color: color.ink, lineHeight: 1.05 }}>{term}</div>
      {meaning && <div style={{ fontFamily: font.mono, fontSize: 32, color: color.inkSoft, lineHeight: 1.1 }}>{meaning}</div>}
    </div>
  </div>
);

export const ROW_H = 184;
export const THUMB = { w: 230, h: 140 };

// A small, quiet version of each of the five pictures.
export const Thumb = ({ kind, id }: { kind: Kind; id: string }) => {
  const box: Box = { x: 4, y: 4, w: THUMB.w - 8, h: THUMB.h - 8 };
  const lin = kind !== "zeros";
  const S = lin ? scale(box, { x0: -1.5, x1: 5, y0: -1, y1: 9 }) : scale(box, { x0: -5.6, x1: 0.6, y0: -1, y1: 7 });
  const L = (m: number, b: number) => `M${S.X(-3)},${S.Y(m * -3 + b)}L${S.X(6)},${S.Y(m * 6 + b)}`;
  const ink = { fill: "none", stroke: color.ink, strokeWidth: 3.5, strokeLinecap: "round" as const };
  return (
    <svg width={THUMB.w} height={THUMB.h} style={{ display: "block", overflow: "visible" }}>
      <defs>
        <clipPath id={id}>
          <rect x={box.x} y={box.y} width={box.w} height={box.h} />
        </clipPath>
      </defs>
      <rect x={0.75} y={0.75} width={THUMB.w - 1.5} height={THUMB.h - 1.5} rx={14} fill="none" stroke={color.rule} strokeWidth={1.5} />
      <g clipPath={`url(#${id})`}>
        <line x1={box.x} y1={S.Y(0)} x2={box.x + box.w} y2={S.Y(0)} stroke={color.rule} strokeWidth={2} />
        <line x1={S.X(0)} y1={box.y} x2={S.X(0)} y2={box.y + box.h} stroke={color.rule} strokeWidth={2} />
        {kind === "line" && (
          <>
            <path
              d={`M${S.X(0)},${S.Y(1)}H${S.X(1)}V${S.Y(3)}H${S.X(2)}V${S.Y(5)}H${S.X(3)}V${S.Y(7)}`}
              fill="none"
              stroke={color.accent}
              strokeWidth={3}
              strokeLinejoin="round"
            />
            <path d={L(2, 1)} {...ink} />
            <circle cx={S.X(0)} cy={S.Y(1)} r={6} fill={color.ink} />
          </>
        )}
        {kind === "meet" && (
          <>
            <path d={L(2, 1)} {...ink} />
            <path d={L(-1, 7)} {...ink} />
            <circle cx={S.X(2)} cy={S.Y(5)} r={7} fill={color.accent} />
          </>
        )}
        {kind === "system" && (
          <>
            <path d={L(2, 1)} {...ink} />
            <path d={L(2, 5)} {...ink} />
          </>
        )}
        {kind === "half" && (
          <>
            <path d={`${L(2, 1)}L${S.X(-3)},${S.Y(20)}Z`} fill={color.accentWash} />
            <path d={L(2, 1)} {...ink} strokeDasharray="9 7" strokeLinecap="butt" />
          </>
        )}
        {kind === "zeros" && (
          <>
            <path d={fnPath((x) => x * x + 5 * x + 6, -5.4, 0.4, S, 80)} {...ink} />
            <circle cx={S.X(-3)} cy={S.Y(0)} r={6.5} fill={color.accent} />
            <circle cx={S.X(-2)} cy={S.Y(0)} r={6.5} fill={color.accent} />
          </>
        )}
      </g>
    </svg>
  );
};
