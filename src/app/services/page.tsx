import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/Button";
import { MaterialCard } from "@/components/MaterialCard";
import { PageHero } from "@/components/PageHero";
import { QuotePanel } from "@/components/QuotePanel";
import { SectionHeading } from "@/components/SectionHeading";
import { SiteSchematic } from "@/components/SiteSchematic";
import { TruckSchematic } from "@/components/TruckSchematic";
import { materials, pad, quoteHref, trucks } from "@/lib/company";

export const metadata: Metadata = {
  title: "Dirt, Aggregates & Trucking Services",
  description: "Explore fill dirt, base rock, gravel, sand, asphalt and landscaping materials, plus dirt delivery, export and trucking in Kern County.",
  alternates: { canonical: "/services" },
};

const dirtServices = [
  {
    id: "dirt-delivery", direction: "in", label: "Import", title: "Dirt delivery", image: "/images/loader-truck.webp",
    alt: "Excavator loading fill into a haul truck",
    body: "Bring clean, compactable fill onto your jobsite. Send the delivery location, your estimated yardage and any material specification. We’ll check sources and arrange a truck that fits the site.",
    checklist: ["Delivery location", "Estimated yardage", "Material specification, if any"],
    action: "Price a delivery",
  },
  {
    id: "dirt-haul-away", direction: "out", label: "Export", title: "Dirt haul-away", image: "/images/earthworks.webp",
    alt: "Dozers and loaders working a stockpile while trucks haul dirt off site",
    body: "Have a stockpile or a cut that needs to go? Tell us what’s in the pile, where it is and how trucks can reach it. We’ll check for a suitable receiving site or a nearby project that needs fill.",
    checklist: ["Where the pile is", "What’s in it", "How trucks can reach it"],
    action: "Arrange haul-away",
  },
] as const;

function Arrow({ direction }: { direction: "in" | "out" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={direction === "in" ? "M12 3v16M5 12l7 7 7-7" : "M12 21V5M5 12l7-7 7 7"} fill="none" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  );
}

export default function Services() {
  return (
    <>
      <PageHero crumb="Services" image="/images/aggregate-yard.webp" imagePosition="center 60%"
        title={<>Materials<br /><span className="outline-text">&amp; hauling.</span></>}
        intro="Bring material in, move excess dirt out, or book the trucks for a load you’ve already sourced." />

        <section className="section dirt-pair" aria-labelledby="dirt-title"><div className="container">
          <SectionHeading id="dirt-title" label="Import / Export" title={<>Dirt, both<br />directions.</>}>
            <p>Bringing fill in or hauling surplus out, it starts with the same details: where the job is, how much dirt and what kind.</p>
          </SectionHeading>
          <div className="dirt-pair__grid">
            {dirtServices.map((service, index) => (
              <article key={service.id} id={service.id} className="dirt-card reveal" data-direction={service.direction}>
                <div className="dirt-card__media">
                  <Image src={service.image} alt={service.alt} fill sizes="(max-width: 47.99rem) 92vw, 46vw" />
                  <span className="dirt-card__tag">{pad(index)} / {service.label}</span>
                  <span className="dirt-card__direction" aria-hidden="true">{service.direction}<Arrow direction={service.direction} /></span>
                </div>
                <SiteSchematic direction={service.direction} />
                <div className="dirt-card__body">
                  <h3>{service.title}.</h3>
                  <p>{service.body}</p>
                  <div className="checklist"><p className="label">Send us</p>
                    <ol>{service.checklist.map((item, step) => <li key={item}><span aria-hidden="true">{pad(step)}</span>{item}</li>)}</ol></div>
                  <Button href={quoteHref(service.id)}>{service.action} <span aria-hidden="true">↗</span></Button>
                </div>
              </article>
            ))}
          </div>
        </div></section>

        <section id="materials" className="section catalog" aria-labelledby="materials-title"><div className="container catalog__layout">
          <div className="catalog__intro">
            <p className="kicker">Material supply / {String(materials.length).padStart(2, "0")} families</p>
            <h2 id="materials-title">Materials<br />for sale.</h2>
            <p>Ask for delivered pricing by material, quantity and job location. We’ll confirm availability and specifications for your order.</p>
            <nav aria-label="Materials"><ol className="catalog__index">
              {materials.map((material, index) => <li key={material.id}>
                <a href={`#${material.id}`}><span aria-hidden="true">{pad(index)}</span>{material.name}<i aria-hidden="true">↓</i></a>
              </li>)}
            </ol></nav>
            <Button href={quoteHref("materials")}>Get delivered pricing <span aria-hidden="true">↗</span></Button>
          </div>
          <div className="catalog__grid">{materials.map((material, index) => <MaterialCard key={material.id} material={material} index={index} />)}</div>
        </div></section>

        <section id="trucking" className="trucking" aria-labelledby="trucking-title">
          <div className="feature">
            <div className="feature__photo"><Image src="/images/haul-road.webp" alt="Graded haul roads crossing an earthwork site" fill sizes="(max-width: 47.99rem) 100vw, 58vw" /></div>
            <div className="container feature__inner"><div className="feature__copy reveal">
              <p className="kicker">Haul-only service</p><h2 id="trucking-title">Trucking<br />&amp; hauling.</h2>
              <p>Already have a source? We coordinate bulk loads for material you’ve bought elsewhere. Pickup and drop-off locations, loading conditions and site access help us match the truck to the job.</p>
              <Button href={quoteHref("trucking")}>Request trucking <span aria-hidden="true">↗</span></Button>
            </div></div>
          </div>
          <div className="container trucking__fleet">
            <div className="trucking__heading">
              <h3>Match the truck<br />to the job.</h3>
              <p>How a truck unloads decides where it can work. Red marks show the unloading action.</p>
            </div>
            <ul className="truck-grid">
              {trucks.map((truck, index) => <li key={truck.id} className="truck-card reveal">
                <TruckSchematic type={truck.id} />
                <p className="label">{pad(index)} / Truck type</p>
                <h4>{truck.name}</h4>
                <p>{truck.unloads}</p>
              </li>)}
            </ul>
          </div>
        </section>
        <QuotePanel />
    </>
  );
}
