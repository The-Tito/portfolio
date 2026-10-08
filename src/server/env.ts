import "server-only";

import { z } from "zod";

const schema = z.object({
  RESEND_API_KEY: z.string().min(1),
  CONTACT_TO_EMAIL: z.email(),
  CONTACT_FROM_EMAIL: z.string().min(3),
});

export type MailEnv = z.infer<typeof schema>;

/**
 * Reads the mail configuration lazily, so a missing variable only breaks the
 * contact form (with a logged error), never the build or the rest of the site.
 * Values are never logged or returned to the client.
 */
export function getMailEnv(): MailEnv | null {
  const parsed = schema.safeParse(process.env);
  if (!parsed.success) {
    const missing = parsed.error.issues.map((issue) => issue.path.join("."));
    console.error(`[contact] Missing or invalid env vars: ${missing.join(", ")}`);
    return null;
  }
  return parsed.data;
}
