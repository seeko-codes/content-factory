import type { ReactNode } from "react";
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
export const ChapterNav = ({ chapters, active }: { chapters: string[]; active: number }) => (
  <div style={{ fontFamily: font.mono, fontSize: 34, color: color.label, marginBottom: 22, display: "flex", gap: 18 }}>
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
          {i + 1} {c}
        </span>
      </span>
    ))}
  </div>
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
