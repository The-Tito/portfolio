"use client";

import { startTransition, useActionState, useEffect, useRef, type FormEvent } from "react";

import { ArrowUpRightIcon } from "@/components/ui/icons";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/cn";
import type { ContactField, ContactState } from "@/lib/contact-schema";
import { submitContact } from "@/server/actions/contact";

type Copy = Dictionary["contact"]["form"];
type Props = { locale: Locale; copy: Copy };

const initialState: ContactState = { status: "idle" };

const inputClass =
  "min-h-[50px] rounded-[14px] border border-line bg-bg px-4 py-3.5 text-base text-fg outline-none transition-[border-color,box-shadow] placeholder:text-subtle focus:border-accent focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--accent)_22%,transparent)] aria-invalid:border-accent";

export function ContactForm({ locale, copy }: Props) {
  const [state, formAction, pending] = useActionState(submitContact, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  // Mount time for the anti-bot timing check (set in an effect to keep SSR deterministic).
  const mountedAt = useRef(0);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state]);

  // Submitting manually (instead of `<form action>`) avoids React's automatic form
  // reset, so visitors keep what they typed when validation or delivery fails.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.set("locale", locale);
    data.set("startedAt", String(mountedAt.current));
    startTransition(() => formAction(data));
  }

  const invalid = (field: ContactField) =>
    state.status === "invalid" && state.fields.includes(field);

  const fields: { name: ContactField; label: string; placeholder: string; type?: string }[] = [
    { name: "name", label: copy.name, placeholder: copy.namePlaceholder },
    { name: "email", label: copy.email, placeholder: copy.emailPlaceholder, type: "email" },
  ];

  const feedback =
    state.status === "success"
      ? copy.success
      : state.status === "error"
        ? copy.error
        : state.status === "invalid"
          ? copy.invalid
          : "";

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="reveal grid gap-[18px] rounded-[26px] border border-line bg-bg-2 p-[clamp(22px,3vw,36px)]"
    >
      {/* Honeypot: invisible to people and assistive tech. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {fields.map((field) => (
        <div key={field.name} className="grid gap-2">
          <label htmlFor={`contact-${field.name}`} className="label-mono">
            {field.label}
          </label>
          <input
            id={`contact-${field.name}`}
            name={field.name}
            type={field.type ?? "text"}
            required
            placeholder={field.placeholder}
            autoComplete={field.name === "email" ? "email" : "name"}
            aria-invalid={invalid(field.name) || undefined}
            className={inputClass}
          />
        </div>
      ))}

      <div className="grid gap-2">
        <label htmlFor="contact-message" className="label-mono">
          {copy.message}
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder={copy.messagePlaceholder}
          aria-invalid={invalid("message") || undefined}
          className={cn(inputClass, "min-h-[130px] resize-y")}
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="group inline-flex min-h-12 items-center gap-2.5 justify-self-start rounded-full border border-accent bg-accent px-[22px] text-[15px] font-medium text-on-accent transition-[translate,background-color,border-color,color] duration-500 ease-out-expo hover:-translate-y-0.5 hover:border-fg hover:bg-fg hover:text-bg disabled:pointer-events-none disabled:opacity-60"
      >
        {pending ? copy.sending : copy.submit}
        <ArrowUpRightIcon className="transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </button>

      <p
        role="status"
        aria-live="polite"
        className={cn(
          "min-h-6 text-[15px]",
          state.status === "success" ? "text-ok" : "text-accent-ink",
        )}
      >
        {feedback}
      </p>
    </form>
  );
}
