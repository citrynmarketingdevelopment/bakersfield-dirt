import type { Metadata } from "next";
import Link from "next/link";
import { company, materials, pad, services } from "@/lib/company";
import { stagger } from "@/lib/style";
import { QuoteForm } from "./quote-form";

export const metadata: Metadata = {
  title: "Contact & Request a Quote",
  description: "Request a dirt delivery, haul-away, bulk material or trucking quote for your Bakersfield or Kern County job.",
  alternates: { canonical: "/contact" },
};

type Query = Promise<Record<string, string | string[] | undefined>>;

const nextSteps = [
  "You send the job details.",
  "We check sources, receiving sites and trucks.",
  "We follow up with availability and pricing.",
];

export default async function Contact({ searchParams }: { searchParams: Query }) {
  const params = await searchParams;
  const service = typeof params.service === "string" && Object.hasOwn(services, params.service) ? params.service : "";
  const material = materials.find(item => item.id === params.material)?.id || "";

  return (
    <section className="contact" aria-labelledby="contact-title"><div className="container contact__layout">
      <div className="contact__intro">
        <nav className="breadcrumbs rise" aria-label="Breadcrumb">
          <Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Contact</span>
        </nav>
        <p className="kicker rise" style={stagger(1)}>Contact Bakersfield Dirt</p>
        <h1 id="contact-title" className="rise" style={stagger(2)}>Let’s talk <span className="outline-text">dirt.</span></h1>
        <p className="contact__lead rise" style={stagger(3)}>Have a load to move or material to order? Tell us what you need and where the job is.</p>
        <dl className="contact-details rise" style={stagger(4)}>
          <div><dt className="label">Call</dt><dd><a className="contact-phone" href={company.phoneHref}>{company.phone}</a></dd></div>
          <div><dt className="label">Email</dt><dd><a href={`mailto:${company.email}`}>{company.email}</a></dd></div>
          <div><dt className="label">Service area</dt><dd>Bakersfield &amp; Kern County, California</dd></div>
        </dl>
        <div className="contact-next rise" style={stagger(5)}><p className="label">What happens next</p>
          <ol>{nextSteps.map((step, index) => <li key={step}><span>{pad(index)}</span>{step}</li>)}</ol>
        </div>
      </div>
      <div id="quote" className="quote-box rise" style={stagger(2)}>
        <div className="quote-box__head"><p className="label">Quote request</p><h2>Request a quote</h2></div>
        <QuoteForm key={`${service}-${material}`} initialService={service} initialMaterial={material}
          direct={Boolean(process.env.RESEND_API_KEY && process.env.QUOTE_FROM_EMAIL)} />
      </div>
    </div></section>
  );
}
