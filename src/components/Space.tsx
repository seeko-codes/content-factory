import { color } from "../theme";

// 3D wireframes are drawn as flat SVG hairlines through an orthographic
// camera, which is what gives the reference surfaces their print-like look.
export type Camera = { cx: number; cy: number; scale: number; yaw: number; pitch: number };

export const project = (cam: Camera) => (x: number, y: number, z: number) => {
  const cy = Math.cos(cam.yaw), sy = Math.sin(cam.yaw);
  const cp = Math.cos(cam.pitch), sp = Math.sin(cam.pitch);
  const rx = x * cy - y * sy;
  const ry = x * sy + y * cy;
  // pitch tilts the floor toward the viewer; screen y grows downward
  return [cam.cx + rx * cam.scale, cam.cy + (ry * sp - z * cp) * cam.scale] as const;
};

/** Wireframe of z = f(x, y) over [-r, r]^2. */
export const Surface = ({
  f,
  cam,
  r = 2,
  n = 22,
  stroke = color.label,
  width = 1.6,
  opacity = 1,
  fill,
}: {
  f: (x: number, y: number) => number;
  cam: Camera;
  r?: number;
  n?: number;
  stroke?: string;
  width?: number;
  opacity?: number;
  fill?: string;
}) => {
  const P = project(cam);
  const at = (i: number) => -r + (2 * r * i) / n;
  const line = (pts: (readonly [number, number])[]) => pts.map(([x, y], k) => `${k ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join("");
  const fine = n * 4;
  const rows = Array.from({ length: n + 1 }, (_, i) => line(Array.from({ length: fine + 1 }, (_, k) => P(at(i), -r + (2 * r * k) / fine, f(at(i), -r + (2 * r * k) / fine)))));
  const cols = Array.from({ length: n + 1 }, (_, j) => line(Array.from({ length: fine + 1 }, (_, k) => P(-r + (2 * r * k) / fine, at(j), f(-r + (2 * r * k) / fine, at(j))))));
  return (
    <g opacity={opacity} fill="none" stroke={stroke} strokeWidth={width} strokeLinejoin="round">
      {fill && <path d={rows[0] + line([...Array.from({ length: fine + 1 }, (_, k) => P(r, r - (2 * r * k) / fine, f(r, r - (2 * r * k) / fine)))]).replace(/^M/, "L")} fill={fill} stroke="none" />}
      {rows.map((d, i) => <path key={`r${i}`} d={d} />)}
      {cols.map((d, j) => <path key={`c${j}`} d={d} />)}
    </g>
  );
};

/** A straight arrow with a small filled head. */
export const Arrow = ({
  from,
  to,
  stroke = color.ink,
  width = 3,
  head = 14,
  opacity = 1,
}: {
  from: readonly [number, number];
  to: readonly [number, number];
  stroke?: string;
  width?: number;
  head?: number;
  opacity?: number;
}) => {
  const [x0, y0] = from, [x1, y1] = to;
  const len = Math.hypot(x1 - x0, y1 - y0);
  if (len < 1e-6) return null;
  const ux = (x1 - x0) / len, uy = (y1 - y0) / len;
  const h = Math.min(head, len * 0.45);
  const bx = x1 - ux * h, by = y1 - uy * h;
  return (
    <g opacity={opacity}>
      <line x1={x0} y1={y0} x2={bx} y2={by} stroke={stroke} strokeWidth={width} strokeLinecap="round" />
      <path d={`M${x1},${y1}L${bx - uy * h * 0.42},${by + ux * h * 0.42}L${bx + uy * h * 0.42},${by - ux * h * 0.42}Z`} fill={stroke} />
    </g>
  );
};

/** Grid of arrows for a 2D vector field, scaled to fit the cell. */
export const VectorField = ({
  F,
  box,
  n = 12,
  stroke = color.inkSoft,
  opacity = 1,
}: {
  F: (x: number, y: number) => readonly [number, number];
  box: { x: number; y: number; size: number; r: number };
  n?: number;
  stroke?: string;
  opacity?: number;
}) => {
  const cell = box.size / n;
  const items = [];
  for (let i = 0; i < n; i++)
    for (let j = 0; j < n; j++) {
      const x = -box.r + ((i + 0.5) * 2 * box.r) / n;
      const y = -box.r + ((j + 0.5) * 2 * box.r) / n;
      const [u, v] = F(x, y);
      const m = Math.hypot(u, v) || 1;
      const L = cell * 0.36 * Math.min(1, m);
      const cx = box.x + (i + 0.5) * cell, cy = box.y + box.size - (j + 0.5) * cell;
      items.push(
        <Arrow key={`${i}-${j}`} from={[cx - (u / m) * L, cy + (v / m) * L]} to={[cx + (u / m) * L, cy - (v / m) * L]} stroke={stroke} width={2} head={9} />,
      );
    }
  return <g opacity={opacity}>{items}</g>;
};
