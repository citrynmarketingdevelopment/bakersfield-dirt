import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { QuotePanel } from "@/components/QuotePanel";
import { SectionHeading } from "@/components/SectionHeading";
import { jobSteps, pad } from "@/lib/company";

export const metadata: Metadata = {
  title: "About the Company",
  description: "Learn how Bakersfield Dirt’s local construction background connects material sources, receiving sites and haulers in Kern County.",
  alternates: { canonical: "/about" },
};

const strengths = [
  { title: "Material sources", body: "A network of material sites around Kern County for fill and bulk aggregates." },
  { title: "Local haulers", body: "Subhaulers running transfers, Super-10s, bottom dumps and end dumps." },
  { title: "Construction roots", body: "The Bowman family’s background in local construction, working with developers, contractors and builders." },
];

export default function About() {
  return (
    <>
      <PageHero crumb="About" image="/images/earthworks.webp" imagePosition="center 70%"
        title={<>Our roots<br /><span className="outline-text">in Kern County.</span></>}
        intro="Our work starts with the ground here in Bakersfield and the people who know how to move it." />

      <section className="section" aria-labelledby="story-title"><div className="container story">
        <div><p className="kicker">The company</p><h2 id="story-title">A local connection from cut to fill.</h2></div>
        <div className="story__copy">
          <p className="lead">Sometimes a cut on one job is the fill another job needs.</p>
          <p>Bakersfield Dirt grew out of the Bowman family’s experience in local construction. We work with contractors, developers and builders who need fill, bulk materials or a place for excess dirt to go.</p>
          <p>We look at the material, distance and timing before coordinating a source, a receiving site and a hauler.</p>
          <Link className="text-link" href="/services">Explore our services <span aria-hidden="true">↗</span></Link>
        </div>
      </div></section>

      <section className="section steps-section" aria-labelledby="steps-title"><div className="container">
        <SectionHeading id="steps-title" label="A clear path from call to haul" title={<>How a job<br />comes together.</>}>
          <p className="label">01—04 / Cut to fill</p>
        </SectionHeading>
        <ol className="steps">
          {jobSteps.map((step, index) => <li key={step.title} className="reveal">
            <span className="steps__no">Step {pad(index)}</span><h3>{step.title}</h3><p>{step.body}</p>
          </li>)}
        </ol>
      </div></section>

      <section className="feature" aria-labelledby="network-title">
        <div className="feature__photo"><Image src="/images/aggregate-yard.webp" alt="Wheel loader gathering material from an aggregate stockpile" fill sizes="(max-width: 47.99rem) 100vw, 56vw" /></div>
        <div className="container feature__inner"><div className="feature__copy reveal">
          <p className="kicker">What we bring to a job</p><h2 id="network-title">Sources.<br />Sites. Trucks.</h2>
          <ol className="value-list">
            {strengths.map((item, index) => <li key={item.title}><span className="label">{pad(index)}</span>
              <div><h3>{item.title}</h3><p>{item.body}</p></div></li>)}
          </ol>
        </div></div>
      </section>
      <QuotePanel />
    </>
  );
}
