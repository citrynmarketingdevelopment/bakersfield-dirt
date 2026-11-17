import { materials } from "@/lib/company";

/** Decorative material ticker. Every name also appears as real text elsewhere on the page. */
export function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {[0, 1].map((copy) => (
          <div className="marquee__group" key={copy}>
            {materials.map(({ id, name }) => <span className="marquee__item" key={id}>{name}</span>)}
          </div>
        ))}
      </div>
    </div>
  );
}
