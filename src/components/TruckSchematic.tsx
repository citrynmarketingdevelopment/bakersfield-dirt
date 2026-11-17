import type { ReactNode } from "react";
import type { TruckType } from "@/lib/company";

/* Side-profile line drawings, cab facing left. The red marks show how each truck unloads. */
const cab = (
  <>
    <path d="M8 77V58Q8 54 12 54H24L30 38H46V77" />
    <path d="M28.5 42H42V51H25" />
  </>
);
const wheel = (x: number, accent = false) => (
  <g key={x} className={accent ? "truck__accent" : undefined}>
    <circle cx={x} cy="77" r="9" className="truck__tire" />
    <circle cx={x} cy="77" r="3" />
  </g>
);

const drawings: Record<TruckType, (arrow: string) => ReactNode> = {
  transfer: (arrow) => (
    <>
      {cab}
      <path d="M8 71H132" />
      <path d="M50 34H128V66H50Z" />
      <path d="M132 70H148" />
      <path d="M148 34H228V66H148Z" />
      <path d="M148 70H230" />
      <path className="truck__ghost" d="M56 39H122V62H56Z" />
      <path className="truck__move" d="M204 22H82" markerEnd={arrow} />
      {[20, 96, 114, 196, 214].map((x) => wheel(x))}
    </>
  ),
  "super-10": () => (
    <>
      {cab}
      <path d="M8 71H178" />
      <path d="M50 32H176V66H50Z" />
      <path d="M46 27H62V32" />
      <path d="M66 32V66M96 32V66M126 32V66M156 32V66" className="truck__rib" />
      <path className="truck__accent-line" d="M178 70L206 74" />
      <circle className="truck__accent-line" cx="178" cy="70" r="2.5" />
      {[20, 132, 150].map((x) => wheel(x))}
      {wheel(212, true)}
    </>
  ),
  "bottom-dump": () => (
    <>
      {cab}
      <path d="M8 71H62" />
      <path d="M52 30H226V46L156 66H128L52 46Z" />
      <path d="M52 37H226" className="truck__rib" />
      <path className="truck__accent-line" d="M128 66L121 76M156 66L163 76" />
      <g className="truck__material">
        <circle cx="137" cy="74" r="1.8" /><circle cx="146" cy="79" r="1.8" /><circle cx="142" cy="71" r="1.8" /><circle cx="150" cy="73" r="1.8" />
      </g>
      <path className="truck__move" d="M108 86Q142 74 176 86" />
      {[20, 58, 74, 200, 216].map((x) => wheel(x))}
    </>
  ),
  "end-dump": (arrow) => (
    <>
      {cab}
      <path d="M8 71H62" />
      <path d="M52 30H226V66H66Q52 66 52 52Z" />
      <path d="M90 30V66M128 30V66M166 30V66" className="truck__rib" />
      <path d="M226 28V68" strokeWidth="2.5" />
      <path className="truck__ghost" transform="rotate(12 226 66)" d="M52 30H226V66H66Q52 66 52 52Z" />
      <path className="truck__move" d="M44 30Q38 12 52 -2" markerEnd={arrow} />
      {[20, 58, 74, 196, 214].map((x) => wheel(x))}
    </>
  ),
};

export function TruckSchematic({ type }: { type: TruckType }) {
  return (
    <svg className="truck" viewBox="0 -14 240 104" aria-hidden="true" focusable="false">
      <defs>
        <marker id={`truck-arrow-${type}`} viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" fill="#c81d2b" />
        </marker>
      </defs>
      <path d="M0 86H240" className="truck__ground" />
      <g className="truck__body">{drawings[type](`url(#truck-arrow-${type})`)}</g>
    </svg>
  );
}
