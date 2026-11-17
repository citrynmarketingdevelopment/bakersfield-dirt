"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { company, materials, navigation, pad, quoteHref, serviceIndex } from "@/lib/company";

export function SiteNav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const servicesToggle = useRef<HTMLButtonElement>(null);
  const nav = useRef<HTMLDivElement>(null);
  const hoverTimer = useRef<number | undefined>(undefined);

  function closeAll() {
    setOpen(false);
    setServicesOpen(false);
  }

  useEffect(() => {
    if (!open && !servicesOpen) return;
    const close = () => {
      setOpen(false);
      setServicesOpen(false);
    };
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      if (open) {
        close();
        trigger.current?.focus();
      } else {
        setServicesOpen(false);
        servicesToggle.current?.focus();
      }
    }
    function closeOutside(event: PointerEvent) {
      if (event.target instanceof Node && !nav.current?.contains(event.target)) close();
    }
    const desktop = window.matchMedia("(min-width: 48rem)");
    desktop.addEventListener("change", close);
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);
    return () => {
      desktop.removeEventListener("change", close);
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOutside);
    };
  }, [open, servicesOpen]);

  useEffect(() => () => window.clearTimeout(hoverTimer.current), []);

  /** Desktop only: open on hover, close after a short grace period so the pointer can reach the panel. */
  function hover(next: boolean, event: ReactPointerEvent) {
    if (event.pointerType !== "mouse" || !window.matchMedia("(min-width: 48rem)").matches) return;
    window.clearTimeout(hoverTimer.current);
    if (next) setServicesOpen(true);
    else hoverTimer.current = window.setTimeout(() => setServicesOpen(false), 180);
  }

  const servicesIndex = navigation.findIndex(({ href }) => href === "/services");

  return (
    <div className="site-nav" ref={nav} onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) closeAll();
    }}>
      <button className="site-nav__toggle" type="button" ref={trigger} aria-expanded={open}
        aria-controls="primary-nav" onClick={() => { setServicesOpen(false); setOpen(!open); }}>
        <span className="site-nav__bars" aria-hidden="true"><i /><i /></span>{open ? "Close" : "Menu"}
      </button>
      <nav id="primary-nav" aria-label="Main navigation" className="site-nav__links" data-open={open}>
        {navigation.map(({ href, label }, index) => index === servicesIndex ? (
          <div key={href} className="nav-services" data-open={servicesOpen}
            onPointerEnter={(event) => hover(true, event)} onPointerLeave={(event) => hover(false, event)}>
            <div className="nav-services__row">
              <Link className="site-nav__link" href={href} aria-current={path === href ? "page" : undefined}
                onClick={closeAll}>{label}<span className="site-nav__number" aria-hidden="true">{pad(index)}</span></Link>
              <button className="nav-services__toggle" type="button" ref={servicesToggle}
                aria-expanded={servicesOpen} aria-controls="services-menu"
                aria-label={servicesOpen ? "Hide services" : "Show services"}
                onClick={() => { window.clearTimeout(hoverTimer.current); setServicesOpen(!servicesOpen); }}>
                <span aria-hidden="true" />
              </button>
            </div>
            <div id="services-menu" className="mega" hidden={!servicesOpen}>
              <div className="container mega__inner">
                <ul className="mega__services">
                  {serviceIndex.map((service, serviceNumber) => <li key={service.id}>
                    <Link className="mega__card" href={`/services#${service.id}`} onClick={closeAll}>
                      <span className="mega__thumb"><Image src={service.image} alt="" fill sizes="18rem" /></span>
                      <span className="mega__meta">{pad(serviceNumber)} / {service.label}</span>
                      <span className="mega__title">{service.title}</span>
                      <span className="mega__summary">{service.summary}</span>
                    </Link>
                  </li>)}
                </ul>
                <div className="mega__aside">
                  <p className="label">Materials</p>
                  <ul>{materials.map((material) => <li key={material.id}>
                    <Link href={`/services#${material.id}`} onClick={closeAll}>{material.name}<span aria-hidden="true">↗</span></Link>
                  </li>)}</ul>
                  <Link className="text-link" href="/services" onClick={closeAll}>All services <span aria-hidden="true">↗</span></Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Link key={href} className="site-nav__link" href={href} aria-current={path === href ? "page" : undefined}
            onClick={closeAll}>{label}<span className="site-nav__number" aria-hidden="true">{pad(index)}</span></Link>
        ))}
        <Link className="button site-nav__quote" href={quoteHref()} onClick={closeAll}>
          Request a quote
        </Link>
        <a className="site-nav__phone" href={company.phoneHref}>Call {company.phone}</a>
      </nav>
    </div>
  );
}
