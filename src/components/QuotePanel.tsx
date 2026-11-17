import { company, quoteHref } from "@/lib/company";
import { Button } from "./Button";

export function QuotePanel() {
  return (
    <section className="cta" aria-labelledby="cta-title"><div className="container cta__inner">
      <div><p className="kicker">Your load. Our next haul.</p>
        <h2 id="cta-title">What are you<br />moving?</h2></div>
      <div className="cta__aside">
        <p>Tell us the material, location and timing.<br />We’ll work through the haul with you.</p>
        <div className="actions"><Button href={quoteHref()}>Request a quote</Button>
          <a className="button button--outline" href={company.phoneHref}>{company.phone}</a></div>
      </div>
    </div></section>
  );
}
