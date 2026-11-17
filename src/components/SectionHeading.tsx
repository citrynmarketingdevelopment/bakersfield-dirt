import type { ReactNode } from "react";

type Props = { id: string; label: string; title: ReactNode; children?: ReactNode };

export function SectionHeading({ id, label, title, children }: Props) {
  return (
    <div className="section-heading">
      <div><p className="kicker">{label}</p><h2 id={id}>{title}</h2></div>
      {children && <div className="section-heading__aside">{children}</div>}
    </div>
  );
}
