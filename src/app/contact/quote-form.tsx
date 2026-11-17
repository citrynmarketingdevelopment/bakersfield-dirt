"use client";

import { useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/Button";
import { company, services, materials } from "@/lib/company";
import { readQuote } from "@/lib/quote";
import { sendQuote } from "./actions";

type Props = { initialService: string; initialMaterial: string; direct: boolean };

export function QuoteForm({ initialService, initialMaterial, direct }: Props) {
  const [service, setService] = useState(initialService);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "busy" | "sent" | "draft" | "failed">("idle");
  const [draft, setDraft] = useState("");
  const requestId = useRef("");
  const busy = useRef(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const quote = readQuote(data);
    setErrors(quote.errors);
    const first = Object.keys(quote.errors)[0];
    if (first) {
      const field = form.elements.namedItem(first);
      if (field instanceof HTMLElement) field.focus();
      return;
    }
    const url = `mailto:${company.email}?subject=${encodeURIComponent(quote.subject)}&body=${encodeURIComponent(quote.body)}`;
    setDraft(url);
    if (!direct) {
      setStatus("draft");
      window.location.href = url;
      return;
    }
    busy.current = true;
    setStatus("busy");
    try {
      requestId.current ||= crypto.randomUUID();
      setStatus(await sendQuote(data, requestId.current) ? "sent" : "failed");
    } catch {
      setStatus("failed");
    } finally {
      busy.current = false;
    }
  }

  function validity(name: string) {
    return { "aria-invalid": Boolean(errors[name]), "aria-describedby": errors[name] ? `error-${name}` : undefined };
  }
  function error(name: string) {
    return errors[name] && <span id={`error-${name}`} className="quote-form__error">{errors[name]}</span>;
  }
  if (status === "sent") return <p role="status" className="quote-form__message">Your request was sent. We’ll follow up using the contact details you provided.</p>;

  return (
    <form className="quote-form" onSubmit={submit} noValidate onChange={() => { requestId.current = ""; setStatus("idle"); }}>
      <p className="quote-form__note">Fields marked * are required.{!direct && " This form prepares an email for you to send."}</p>
      <fieldset className="quote-form__fields" disabled={status === "busy"}>
        <fieldset className="quote-form__group"><legend><span aria-hidden="true">01</span> The job</legend>
        <label>What do you need? *<select name="service" required value={service} {...validity("service")}
          onChange={event => setService(event.target.value)}><option value="">Select a service</option>
          {Object.entries(services).map(([key, value]) => <option key={key} value={key}>{value}</option>)}
        </select>{error("service")}</label>
        {service === "materials" && <label>Material<select name="material" defaultValue={initialMaterial}>
          <option value="">Unsure / other</option>{materials.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
        </select></label>}
        <label>Job location *<input name="location" required maxLength={200} {...validity("location")} placeholder="City or jobsite address" />{error("location")}</label>
        <div className="quote-form__pair">
          <label>Estimated quantity<input name="quantity" maxLength={80} placeholder="Yards, tons or unsure" /></label>
          <label>Desired timing<input name="timing" maxLength={100} placeholder="Date or timeframe" /></label>
        </div>
        <label>Job details<textarea name="details" rows={4} maxLength={800} placeholder={service === "dirt-haul-away" ? "Describe the pile and truck access" : service === "trucking" ? "Pickup, destination and loading access" : "Material specifications or access details"} /></label>
        </fieldset>
        <fieldset className="quote-form__group"><legend><span aria-hidden="true">02</span> How to reach you</legend>
        <div className="quote-form__pair">
          <label>Your name *<input name="name" required autoComplete="name" maxLength={100} {...validity("name")} />{error("name")}</label>
          <label>Phone or email *<input name="reply" required maxLength={160} {...validity("reply")} />{error("reply")}</label>
        </div>
        </fieldset>
        <label className="quote-form__trap" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
        <div className="quote-form__submit">
          <Button type="submit">{status === "busy" ? "Sending…" : direct ? "Send quote request" : "Continue in email"} <span aria-hidden="true">↗</span></Button>
          <p>We’ll follow up to confirm availability, suitability and pricing.</p>
        </div>
      </fieldset>
      <div aria-live="polite">
        {status === "draft" && <p>Your quote draft is ready. Send it from your email app. <a href={draft}>Open draft again</a></p>}
        {status === "failed" && <p>We couldn’t send your request. Try again or <a href={draft}>send the details by email</a>.</p>}
      </div>
    </form>
  );
}
