import type { ReactNode } from "react";
import { color, font } from "../theme";

export type Box = { x: number; y: number; w: number; h: number };
export type Domain = { x0: number; x1: number; y0: number; y1: number };

/** Maps data coordinates into a pixel box (y grows upward in data space). */
export const scale = (box: Box, d: Domain) => ({
  X: (v: number) => box.x + ((v - d.x0) / (d.x1 - d.x0)) * box.w,
  Y: (v: number) => box.y + box.h - ((v - d.y0) / (d.y1 - d.y0)) * box.h,
});

/** SVG path of y=f(x) from a to b. */
export const fnPath = (f: (x: number) => number, a: number, b: number, s: ReturnType<typeof scale>, n = 200) => {
  let d = "";
  for (let i = 0; i <= n; i++) {
    const x = a + ((b - a) * i) / n;
    d += `${i ? "L" : "M"}${s.X(x).toFixed(2)},${s.Y(f(x)).toFixed(2)}`;
  }
  return d;
};

/** Full-frame SVG layer for diagrams. */
export const Layer = ({ children, opacity = 1 }: { children: ReactNode; opacity?: number }) => (
  <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, opacity, overflow: "visible" }}>
    {children}
  </svg>
);

/** Quiet mono label used for axis numbers and units. */
export const MonoLabel = ({
  x,
  y,
  children,
  size = 28,
  fill = color.label,
  anchor = "middle",
  weight = 400,
  opacity = 1,
}: {
  x: number;
  y: number;
  children: ReactNode;
  size?: number;
  fill?: string;
  anchor?: "start" | "middle" | "end";
  weight?: number;
  opacity?: number;
}) => (
  <text
    x={x}
    y={y}
    fontFamily={font.mono}
    fontSize={size}
    fill={fill}
    textAnchor={anchor}
    fontWeight={weight}
    opacity={opacity}
  >
    {children}
  </text>
);
