import "server-only";

import type { ContactInput } from "@/lib/contact-schema";

import type { MailEnv } from "./env";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

/** Sends the contact message through Resend's REST API. Returns `false` on any failure. */
export async function sendContactEmail(
  env: MailEnv,
  input: Pick<ContactInput, "name" | "email" | "message">,
  locale: string,
): Promise<boolean> {
  const name = escapeHtml(input.name);
  const email = escapeHtml(input.email);
  const message = escapeHtml(input.message).replaceAll("\n", "<br>");

  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM_EMAIL,
      to: [env.CONTACT_TO_EMAIL],
      reply_to: input.email,
      subject: `Portafolio — mensaje de ${input.name}`,
      text: `Nombre: ${input.name}\nCorreo: ${input.email}\nIdioma: ${locale}\n\n${input.message}`,
      html: `<p><strong>Nombre:</strong> ${name}<br><strong>Correo:</strong> ${email}<br><strong>Idioma:</strong> ${locale}</p><p>${message}</p>`,
    }),
    signal: AbortSignal.timeout(10_000),
  }).catch(() => null);

  if (!response?.ok) {
    console.error(
      `[contact] Resend request failed with status ${response?.status ?? "network error"}`,
    );
    return false;
  }
  return true;
}
