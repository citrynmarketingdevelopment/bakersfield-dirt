const ground = 230;
const cutCurve = "C220 230 250 95 350 95 C450 95 480 230 560 230";
const fillCurve = "C700 230 740 300 850 300 C960 300 1000 230 1060 230";
const stations = Array.from({ length: 31 }, (_, index) => index * 40);

const legend = [
  { label: "01 / Site A", title: "Cutting down", body: "A grade coming down leaves surplus dirt that needs somewhere to go." },
  { label: "02 / Bakersfield Dirt", title: "Match & haul", body: "We check the material, distance and timing, then line up the trucks." },
  { label: "03 / Site B", title: "Building up", body: "A low site or a new pad needs suitable fill brought in." },
];

/** A grading cross-section: cut from one job becomes fill for another. */
export function CutFillDiagram() {
  return (
    <figure className="cut-fill__diagram reveal">
      <svg className="cut-fill__svg" viewBox="0 0 1200 350" role="img"
        aria-label="Cross-section: surplus dirt cut from a mound at site A is trucked to fill a low area at site B, leaving both at finished grade.">
        <defs>
          <pattern id="cf-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0V40" fill="none" stroke="rgb(199 173 123 / 7%)" />
          </pattern>
          <pattern id="cf-cut" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="9" stroke="rgb(199 173 123 / 55%)" strokeWidth="1.5" />
          </pattern>
          <pattern id="cf-fill" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
            <line x1="0" y1="0" x2="0" y2="9" stroke="rgb(222 52 66 / 85%)" strokeWidth="1.5" />
          </pattern>
          <marker id="cf-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="9" markerHeight="9" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" fill="#c81d2b" />
          </marker>
        </defs>
        <rect width="1200" height="350" fill="url(#cf-grid)" />
        <rect y={ground} width="1200" height={350 - ground} fill="rgb(199 173 123 / 4%)" />

        <path d={`M140 ${ground} ${cutCurve}Z`} fill="url(#cf-cut)" />
        <path d={`M640 ${ground} ${fillCurve}Z`} fill="url(#cf-fill)" />
        <path d={`M0 ${ground}H140 ${cutCurve} H640 ${fillCurve} H1200`} fill="none"
          stroke="rgb(199 173 123 / 70%)" strokeWidth="1.5" strokeDasharray="5 6" />
        <path d={`M0 ${ground}H1200`} stroke="#f2eee6" strokeWidth="2" />

        <path className="cut-fill__haul" d="M350 82 Q600 -50 846 210" fill="none" stroke="#c81d2b"
          strokeWidth="2.5" markerEnd="url(#cf-arrow)" />
        <circle cx="350" cy="82" r="5" fill="#09090a" stroke="#c81d2b" strokeWidth="2.5" />

        <g className="cut-fill__text">
          <text x="600" y="24" textAnchor="middle">TRUCKED BETWEEN JOBS</text>
          <text x="350" y="275" textAnchor="middle" className="cut-fill__site">SITE A · CUT</text>
          <text x="850" y="330" textAnchor="middle" className="cut-fill__site">SITE B · FILL</text>
          <text x="476" y="150">EXISTING GRADE</text>
          <text x="1190" y="218" textAnchor="end">FINISHED GRADE</text>
        </g>
        <g stroke="rgb(199 173 123 / 35%)">
          {stations.map((x) => <line key={x} x1={x} x2={x} y1={x % 200 ? 344 : 338} y2="350" />)}
        </g>
      </svg>
      <figcaption className="cut-fill__legend">
        {legend.map(({ label, title, body }) => (
          <div key={label}><p className="label">{label}</p><h3>{title}</h3><p>{body}</p></div>
        ))}
      </figcaption>
    </figure>
  );
}
