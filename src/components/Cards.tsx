import type { ReactNode } from "react";
import { color, font, layout } from "../theme";
import { MonoLabel, type Box } from "./Chart";

// The "N pictures" furniture of the in-60-seconds surveys: a grid of small
// pictures that opens the video and comes back as the recap.

export type Grid = { cols: number; w: number; h: number; gapX: number; gapY: number; top: number; left?: number };

/** Top-left corner of slot i in a grid, filled row by row. */
export const gridSlot = (i: number, g: Grid) => ({
  x: (g.left ?? layout.margin) + (i % g.cols) * (g.w + g.gapX),
  y: g.top + Math.floor(i / g.cols) * (g.h + g.gapY),
});

/**
 * A numbered picture card (SVG): soft chip background, its number top left,
 * and the picture clipped to an inner art area, which `children` draws into.
 * Leaves room at the bottom for a caption the video places itself.
 */
export const PictureCard = ({
  x,
  y,
  w,
  h,
  n,
  id,
  opacity = 1,
  children,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  n: number;
  id: string; // unique per card, for its clip path
  opacity?: number;
  children: (area: Box) => ReactNode;
}) => {
  const area = { x: x + 22, y: y + 62, w: w - 44, h: h - 160 };
  return (
    <g opacity={opacity} transform={`translate(0 ${(1 - opacity) * 14})`}>
      <defs>
        <clipPath id={id}>
          <rect x={area.x - 6} y={area.y - 6} width={area.w + 12} height={area.h + 12} />
        </clipPath>
      </defs>
      <rect x={x} y={y} width={w} height={h} rx={18} fill={color.chip} />
      <MonoLabel x={x + 22} y={y + 44} anchor="start" size={28}>
        {n}
      </MonoLabel>
      <g clipPath={`url(#${id})`}>{children(area)}</g>
    </g>
  );
};

/** Size of a PictureRow and of the thumbnail it holds. */
export const PICTURE_ROW = { h: 184, thumb: { w: 230, h: 140 } };

/**
 * One row of a "year in five pictures" list: a thumbnail (children), its
 * name and, in the recap, what the picture means. `indent` 0 puts the text at
 * the margin (before the thumbnails appear), 1 beside the thumbnail.
 */
export const PictureRow = ({
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
  indent?: number;
  children?: ReactNode;
}) => (
  <div style={{ position: "absolute", left: layout.margin, right: layout.margin, top, height: PICTURE_ROW.h, transform: `translateY(${rise}px)` }}>
    <div style={{ position: "absolute", left: 0, top: 0, opacity: picture }}>{children}</div>
    <div
      style={{
        position: "absolute",
        left: (PICTURE_ROW.thumb.w + 50) * indent,
        top: 0,
        height: PICTURE_ROW.thumb.h,
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
