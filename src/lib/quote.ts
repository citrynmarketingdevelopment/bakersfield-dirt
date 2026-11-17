import { materials, services } from "./company";

export function readQuote(form: FormData) {
  const read = (key: string, limit: number) => {
    const value = form.get(key);
    return typeof value === "string" ? value.trim().slice(0, limit) : "";
  };
  const serviceKey = read("service", 32);
  const service = Object.hasOwn(services, serviceKey) ? services[serviceKey as keyof typeof services] : "";
  const material = materials.find(item => item.id === read("material", 40))?.name || "";
  const name = read("name", 100);
  const reply = read("reply", 160);
  const location = read("location", 200);
  const errors: Record<string, string> = {};
  if (!service) errors.service = "Choose the service you need.";
  if (!name) errors.name = "Enter your name.";
  if (!reply || !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(reply) || (/^[+()\d.\s-]+$/.test(reply) && reply.replace(/\D/g, "").length >= 7))) {
    errors.reply = "Enter a phone number or email address we can reply to.";
  }
  if (!location) errors.location = "Enter the job location.";
  const lines = [
    ["Service", service], ["Material", material], ["Job location", location],
    ["Quantity", read("quantity", 80)], ["Timing", read("timing", 100)],
    ["Job details", read("details", 800)], ["Name", name], ["Reply to", reply],
  ];
  return {
    errors,
    subject: `Bakersfield Dirt quote request — ${service}`,
    body: lines.filter(([, value]) => value).map(([label, value]) => `${label}: ${value}`).join("\n"),
  };
}
