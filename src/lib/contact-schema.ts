import { z } from "zod";

/** Minimum time a human needs to fill the form; faster submits are treated as bots. */
export const MIN_FILL_TIME_MS = 3000;

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.email().trim().max(160),
  message: z.string().trim().min(10).max(2000),
  /** Honeypot: hidden from people, filled by naive bots. Must stay empty. */
  website: z.string().max(0).optional().default(""),
  /** Epoch ms when the form was rendered on the client. */
  startedAt: z.coerce.number().int().positive(),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = "name" | "email" | "message";

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "invalid"; fields: ContactField[] }
  | { status: "error" };
