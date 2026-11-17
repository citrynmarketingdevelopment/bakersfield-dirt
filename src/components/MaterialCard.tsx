import Image from "next/image";
import Link from "next/link";
import { materials, pad, quoteHref } from "@/lib/company";

type Props = { material: (typeof materials)[number]; index: number; preview?: boolean };

export function MaterialCard({ material, index, preview = false }: Props) {
  const { id, name, detail, uses } = material;
  const face = (
    <>
      <Image className="specimen__img" src={`/images/${id}.webp`} alt="" fill
        sizes={preview ? "(max-width: 38rem) 46vw, (max-width: 64rem) 31vw, 22vw" : "(max-width: 38rem) 92vw, (max-width: 64rem) 46vw, 31vw"} />
      <span className="specimen__grade" />
      <span className="specimen__no" aria-hidden="true">{pad(index)}</span>
      <span className="specimen__copy">
        <span className="specimen__accent" />
        <h3>{name}</h3>
        <ul className="specimen__uses" aria-label={`Typical uses for ${name.toLowerCase()}`}>
          {uses.map((use) => <li key={use}>{use}</li>)}
        </ul>
      </span>
    </>
  );

  if (preview) {
    return (
      <Link className="specimen specimen--preview" href={`/services#${id}`}>
        {face}<span className="specimen__arrow" aria-hidden="true">↗</span>
      </Link>
    );
  }
  return (
    <article className="specimen reveal" id={id}>
      <div className="specimen__face">{face}</div>
      <div className="specimen__body">
        <p>{detail}</p>
        <Link className="text-link" href={quoteHref("materials", id)} aria-label={`Get delivered pricing for ${name.toLowerCase()}`}>
          Get delivered pricing <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}
