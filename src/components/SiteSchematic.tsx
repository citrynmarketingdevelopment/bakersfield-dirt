type Direction = "in" | "out";

const ground = 92;
const shapes = {
  /* A low spot on your site, filled to grade from a material source. */
  in: {
    profile: "C350 92 370 122 410 122 C450 122 470 92 520 92",
    start: 300,
    end: 520,
    haul: "M48 46 Q250 -24 402 104",
    origin: { x: 48, y: 46 },
    labels: [
      { x: 20, y: 74, text: "MATERIAL SOURCE", anchor: "start" },
      { x: 588, y: 116, text: "YOUR SITE · FILL", anchor: "end" },
    ],
  },
  /* A stockpile on your site, cut to grade and hauled to a receiving site. */
  out: {
    profile: "C130 92 150 38 190 38 C230 38 250 92 300 92",
    start: 80,
    end: 300,
    haul: "M190 30 Q420 -26 556 46",
    origin: { x: 190, y: 30 },
    labels: [
      { x: 190, y: 116, text: "YOUR SITE · SURPLUS", anchor: "middle" },
      { x: 588, y: 74, text: "RECEIVING SITE", anchor: "end" },
    ],
  },
} as const;

/** Grading cross-section showing which way the dirt moves for a service. */
export function SiteSchematic({ direction }: { direction: Direction }) {
  const shape = shapes[direction];
  const id = `site-${direction}`;
  return (
    <svg className="schematic" data-direction={direction} viewBox="0 0 600 130" aria-hidden="true" focusable="false">
      <defs>
        <pattern id={`${id}-grid`} width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M30 0H0V30" fill="none" stroke="rgb(199 173 123 / 7%)" />
        </pattern>
        <pattern id={`${id}-hatch`} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform={`rotate(${direction === "in" ? -45 : 45})`}>
          <line x1="0" y1="0" x2="0" y2="8" className="schematic__hatch" strokeWidth="1.5" />
        </pattern>
        <marker id={`${id}-arrow`} viewBox="0 0 10 10" refX="7" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" fill="#c81d2b" />
        </marker>
      </defs>
      <rect width="600" height="130" fill={`url(#${id}-grid)`} />
      <rect y={ground} width="600" height={130 - ground} fill="rgb(199 173 123 / 4%)" />
      <path d={`M${shape.start} ${ground} ${shape.profile}Z`} fill={`url(#${id}-hatch)`} />
      <path d={`M0 ${ground}H${shape.start} ${shape.profile} H600`} fill="none" stroke="rgb(199 173 123 / 70%)" strokeWidth="1.5" strokeDasharray="5 6" />
      <path d={`M0 ${ground}H600`} stroke="#f2eee6" strokeWidth="2" />
      <path className="schematic__haul" d={shape.haul} fill="none" stroke="#c81d2b" strokeWidth="2.5" markerEnd={`url(#${id}-arrow)`} />
      <circle cx={shape.origin.x} cy={shape.origin.y} r="5" fill="#09090a" stroke="#c81d2b" strokeWidth="2.5" />
      <g className="schematic__text">
        {shape.labels.map((label) => <text key={label.text} x={label.x} y={label.y} textAnchor={label.anchor}>{label.text}</text>)}
      </g>
    </svg>
  );
}
