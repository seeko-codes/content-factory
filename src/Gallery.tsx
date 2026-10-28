import { AbsoluteFill } from "remotion";
import { Layer } from "./components/Chart";
import { Arrow, project, Surface, VectorField } from "./components/Space";
import { Tex } from "./components/Tex";
import { ChapterNav, Chip, Kicker, TitleCard } from "./components/Title";
import { color, font, layout } from "./theme";

// Still frames of every building block, for checking the look against the
// reference recordings: npx remotion still gallery-a out/gallery-a.png
const bump = (x: number, y: number) => 1.15 * Math.exp(-((x - 0.3) ** 2 + (y + 0.2) ** 2) / 1.3);
const cam = { cx: 540, cy: 1080, scale: 165, yaw: -0.65, pitch: 0.55 };

export const GalleryA = () => {
  const P = project(cam);
  const p0 = P(-0.6, -0.4, bump(-0.6, -0.4));
  return (
    <AbsoluteFill style={{ background: color.paper, fontFamily: font.sans, color: color.ink }}>
      <TitleCard title="Calculus III" />
      <div style={{ position: "absolute", left: 0, right: 0, top: 560, textAlign: "center" }}>
        <Tex tex="z = f(x, y)" size={layout.texSize} />
      </div>
      <Layer>
        <Surface f={bump} cam={cam} />
        <Arrow from={p0} to={P(0.1, 0.0, bump(0.1, 0.0))} stroke={color.accent} width={4} head={18} />
        <circle cx={p0[0]} cy={p0[1]} r={8} fill={color.ink} />
      </Layer>
    </AbsoluteFill>
  );
};

export const GalleryB = () => (
  <AbsoluteFill style={{ background: color.paper, fontFamily: font.sans, color: color.ink }}>
    <TitleCard
      kicker={<ChapterNav chapters={["matrix", "det", "eigen"]} active={1} />}
      title="Linear Algebra"
      sub={<span style={{ fontFamily: font.sans, fontSize: 40, color: color.ink }}>is really one picture.</span>}
    />
    <div style={{ position: "absolute", left: layout.margin, top: 600 }}>
      <Chip label="area" value="×3" />
    </div>
    <Layer>
      <VectorField F={(x, y) => [-y, x - 0.3 * y]} box={{ x: 140, y: 780, size: 800, r: 2 }} />
    </Layer>
    <div style={{ position: "absolute", left: layout.margin, top: 1640 }}>
      <Kicker label="Millennium" index={5} total={7} />
    </div>
  </AbsoluteFill>
);
