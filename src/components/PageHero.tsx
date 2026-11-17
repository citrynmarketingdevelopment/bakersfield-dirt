import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { company, quoteHref } from "@/lib/company";
import { stagger } from "@/lib/style";
import { Button } from "./Button";

type Props = {
  crumb: string;
  title: ReactNode;
  intro: string;
  image: string;
  imageAlt?: string;
  imagePosition?: string;
  label?: string;
};

export function PageHero({ crumb, title, intro, image, imageAlt = "", imagePosition, label = "Bakersfield / Kern County" }: Props) {
  return (
    <section className="page-hero" aria-labelledby="page-title">
      <Image className="page-hero__image" src={image} alt={imageAlt} fill preload sizes="100vw"
        style={imagePosition ? { objectPosition: imagePosition } : undefined} />
      <div className="page-hero__shade" />
      <div className="container page-hero__inner">
        <nav className="breadcrumbs rise" aria-label="Breadcrumb">
          <Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">{crumb}</span>
        </nav>
        <div className="page-hero__bottom">
          <div>
            <p className="label rise" style={stagger(1)}>{label}</p>
            <h1 id="page-title" className="rise" style={stagger(2)}>{title}</h1>
            <p className="page-hero__intro rise" style={stagger(3)}>{intro}</p>
          </div>
          <div className="actions rise" style={stagger(4)}>
            <Button href={quoteHref()}>Request a quote</Button>
            <a className="button button--outline" href={company.phoneHref}>{company.phone}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
