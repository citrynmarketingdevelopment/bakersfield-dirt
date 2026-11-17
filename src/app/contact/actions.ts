"use server";

import { company } from "@/lib/company";
import { readQuote } from "@/lib/quote";

export async function sendQuote(form: FormData, requestId: string) {
  const quote = readQuote(form);
  if (Object.keys(quote.errors).length || form.get("website") ||
      !/^[\da-f-]{36}$/i.test(requestId)) return false;
  const key = process.env.RESEND_API_KEY;
  const from = process.env.QUOTE_FROM_EMAIL;
  if (!key || !from) return false;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json", "Idempotency-Key": requestId },
      body: JSON.stringify({ from, to: [company.email], subject: quote.subject, text: quote.body }),
      signal: AbortSignal.timeout(10000),
    });
    return response.ok;
  } catch {
    return false;
  }
}
