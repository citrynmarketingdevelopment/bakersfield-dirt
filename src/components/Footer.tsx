import Link from "next/link";
import { company, navigation, quoteHref, serviceIndex } from "@/lib/company";
import { Button } from "./Button";
import { Wordmark } from "./Wordmark";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div className="site-footer__intro"><Wordmark />
            <p>Fill dirt, bulk materials and trucking.<br />Bringing it in and hauling it out across Kern County.</p>
            <Button href={quoteHref()}>Request a quote</Button>
          </div>
          <nav aria-label="Footer navigation"><p className="label">Explore</p>
            {navigation.map(({ href, label }) => <Link key={href} href={href}>{label}</Link>)}
          </nav>
          <nav aria-label="Services"><p className="label">Services</p>
            {serviceIndex.map(({ id, title }) => <Link key={id} href={`/services#${id}`}>{title}</Link>)}
          </nav>
          <div><p className="label">Get in touch</p>
            <a href={company.phoneHref}>{company.phone}</a>
            <a href={`mailto:${company.email}`}>{company.email}</a>
            <address>Serving Bakersfield<br />and Kern County, California</address>
          </div>
        </div>
        <div className="site-footer__bottom">
          <span>© {new Date().getFullYear()} {company.name}</span>
          <span>Bakersfield / Kern County</span>
          <a href="#main-content">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
