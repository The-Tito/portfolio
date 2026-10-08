"use server";

import { headers } from "next/headers";

import { isLocale } from "@/i18n/config";
import {
  MIN_FILL_TIME_MS,
  contactSchema,
  type ContactField,
  type ContactState,
} from "@/lib/contact-schema";

import { getMailEnv } from "../env";
import { rateLimit } from "../rate-limit";
import { sendContactEmail } from "../send-email";

const RATE_LIMIT = { max: 3, windowMs: 10 * 60 * 1000 };
const FIELDS: ContactField[] = ["name", "email", "message"];

export async function submitContact(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const parsed = contactSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    const fields = FIELDS.filter((field) =>
      parsed.error.issues.some((issue) => issue.path[0] === field),
    );
    // Honeypot / timestamp failures have no visible field: answer like a success to bots.
    return fields.length > 0 ? { status: "invalid", fields } : { status: "success" };
  }

  const { website, startedAt, ...message } = parsed.data;
  if (website || Date.now() - startedAt < MIN_FILL_TIME_MS) return { status: "success" };

  const requestHeaders = await headers();
  const ip = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!rateLimit(`contact:${ip}`, RATE_LIMIT.max, RATE_LIMIT.windowMs)) {
    return { status: "error" };
  }

  const env = getMailEnv();
  if (!env) return { status: "error" };

  const rawLocale = formData.get("locale");
  const locale = isLocale(rawLocale) ? rawLocale : "en";

  const sent = await sendContactEmail(env, message, locale);
  return sent ? { status: "success" } : { status: "error" };
}
