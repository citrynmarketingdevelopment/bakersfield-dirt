import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { CutFillDiagram } from "@/components/CutFillDiagram";
import { Marquee } from "@/components/Marquee";
import { MaterialCard } from "@/components/MaterialCard";
import { QuotePanel } from "@/components/QuotePanel";
import { SectionHeading } from "@/components/SectionHeading";
import { materials, pad, quoteHref } from "@/lib/company";
import { stagger } from "@/lib/style";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const paths = [
  { href: "/services#dirt-delivery", label: "Import", title: "I need dirt delivered" },
  { href: "/services#dirt-haul-away", label: "Export", title: "I have dirt to haul away" },
  { href: "/services#materials", label: "Bulk materials", title: "I’m looking for aggregates" },
];

export default function Home() {
  return (
    <>
      <section className="home-hero" aria-labelledby="home-title">
        <Image className="home-hero__image" src="/images/loader-truck.webp" alt="Excavator loading a haul truck on a dirt jobsite" fill preload sizes="100vw" />
        <div className="home-hero__shade" />
        <div className="container home-hero__inner">
          <p className="kicker rise">Bakersfield &amp; Kern County, California</p>
          <h1 id="home-title" className="rise" style={stagger(1)}>
            <span>Dirt delivery.</span> <span className="outline-text">Dirt haul-away.</span>
          </h1>
          <div className="home-hero__bottom rise" style={stagger(2)}>
            <p className="home-hero__intro">Clean fill, bulk aggregates and the trucks to move them. Get material delivered or excess dirt off your jobsite.</p>
            <div className="actions"><Button href={quoteHref()}>Request a quote</Button>
              <Button className="button--outline" href="/services">Explore services <span aria-hidden="true">→</span></Button></div>
          </div>
        </div>
        <nav className="job-paths rise" style={stagger(3)} aria-label="Find help for your job"><div className="container job-paths__grid">
          {paths.map((item, index) => <Link key={item.href} href={item.href}>
            <span className="job-paths__no" aria-hidden="true">{pad(index)}</span>
            <span className="job-paths__label">{item.label}</span><span className="job-paths__title">{item.title}</span>
            <span className="job-paths__arrow" aria-hidden="true">↗</span>
          </Link>)}
        </div></nav>
      </section>

      <section className="section" aria-labelledby="home-materials"><div className="container">
        <SectionHeading id="home-materials" label={`Material supply / ${String(materials.length).padStart(2, "0")} families`} title={<>Materials<br />for the job.</>}>
          <p>Fill, base, rock, sand, asphalt and landscaping material, delivered to your site across Kern County.</p>
          <Link href="/services#materials" className="text-link">View the full catalog <span aria-hidden="true">↗</span></Link>
        </SectionHeading>
        <ul className="specimen-reel">
          {materials.map((material, index) => <li key={material.id} className="reveal"><MaterialCard material={material} index={index} preview /></li>)}
        </ul>
      </div></section>

      <Marquee />

      <section className="section cut-fill" aria-labelledby="cut-fill-title"><div className="container">
        <SectionHeading id="cut-fill-title" label="About Bakersfield Dirt" title={<>From cut<br />to fill.</>}>
          <p>One site is cutting down. Another needs to build up. Our roots in the Bowman family’s local construction work help us connect material sources, receiving sites and haulers across Kern County.</p>
          <Link href="/about" className="text-link">About the company <span aria-hidden="true">↗</span></Link>
        </SectionHeading>
        <CutFillDiagram />
      </div></section>

      <QuotePanel />
    </>
  );
}
