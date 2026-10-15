"use client";

import { useRef, useState, type FormEvent } from "react";
import { quote, site } from "@/lib/site";
import { ArrowIcon, PhoneIcon } from "./icons";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Free-quote form. Works with Netlify Forms out of the box (data-netlify + honeypot; Netlify finds the
 * form in the static HTML at deploy). Set site.form.provider to "formspree" to post there instead.
 * With JavaScript it submits in place; without it, it posts normally and lands on /thanks.
 */
export default function QuoteForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [firstName, setFirstName] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const done = useRef<HTMLHeadingElement>(null);

  const formspree = site.form.provider === "formspree" && site.form.formspreeEndpoint;
  const honeypot = formspree ? "_gotcha" : "bot-field";

  function validate(form: HTMLFormElement) {
    const d = new FormData(form);
    const e: Record<string, string> = {};
    if (!String(d.get("name") ?? "").trim()) e.name = "Please add your name.";
    const phone = String(d.get("phone") ?? "").replace(/\D/g, "");
    const email = String(d.get("email") ?? "").trim();
    if (phone.length < 10) e.phone = "Please add a 10-digit phone number.";
    if (email && !/^\S+@\S+\.\S+$/.test(email)) e.email = "That email doesn't look quite right.";
    if (d.get("contact") === "Email" && !email) e.email = "Add an email so we can reply that way.";
    if (!d.get("project")) e.project = "Pick the closest match.";
    return e;
  }

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const e = validate(form);
    setErrors(e);
    if (Object.keys(e).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(e)[0]}"]`)?.focus();
      return;
    }
    const data = new FormData(form);
    setFirstName(String(data.get("name")).trim().split(/\s+/)[0]);
    setStatus("sending");
    try {
      const res = formspree
        ? await fetch(site.form.formspreeEndpoint, { method: "POST", body: data, headers: { Accept: "application/json" } })
        : await fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
          });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      requestAnimationFrame(() => done.current?.focus());
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="py-6 text-center sm:py-10" role="status">
        <p className="kicker kicker-rule justify-center text-brass-deep">Request received</p>
        <h3 ref={done} tabIndex={-1} className="display mt-5 text-[2.4rem] text-ink outline-none sm:text-5xl">
          {firstName ? `Thank you, ${firstName}.` : "Thank you."}
        </h3>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-stone-600">
          {`We've got your details and will be in touch during business hours (${site.hours.short}). Need us sooner?`}
        </p>
        <a href={site.phone.href} className="btn btn-onyx mt-7 tabular-nums">
          <PhoneIcon className="h-[1.1rem] w-[1.1rem]" />
          {`Call ${site.phone.display}`}
        </a>
      </div>
    );
  }

  const err = (k: string) =>
    errors[k] ? (
      <p id={`${k}-error`} className="mt-2 text-sm font-semibold text-[#9a3b22]">
        {errors[k]}
      </p>
    ) : null;
  const a11y = (k: string) => ({ "aria-invalid": errors[k] ? true : undefined, "aria-describedby": errors[k] ? `${k}-error` : undefined });
  const label = "mb-2 block text-[0.95rem] font-bold text-ink";

  return (
    <form
      name={site.form.name}
      method="POST"
      action={formspree ? site.form.formspreeEndpoint : "/thanks"}
      data-netlify={formspree ? undefined : "true"}
      netlify-honeypot={formspree ? undefined : "bot-field"}
      onSubmit={onSubmit}
      noValidate
      className="space-y-5 sm:space-y-6"
    >
      <input type="hidden" name="form-name" value={site.form.name} />
      <p className="hidden" aria-hidden="true">
        <label>
          Leave this empty: <input name={honeypot} tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div>
        <label htmlFor="q-name" className={label}>
          Your name
        </label>
        <input id="q-name" name="name" type="text" autoComplete="name" required className="field" {...a11y("name")} />
        {err("name")}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
        <div>
          <label htmlFor="q-phone" className={label}>
            Phone
          </label>
          <input id="q-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required className="field tabular-nums" {...a11y("phone")} />
          {err("phone")}
        </div>
        <div>
          <label htmlFor="q-email" className={label}>
            Email <span className="font-normal text-stone-500">(optional)</span>
          </label>
          <input id="q-email" name="email" type="email" inputMode="email" autoComplete="email" autoCapitalize="none" spellCheck={false} className="field" {...a11y("email")} />
          {err("email")}
        </div>
      </div>

      <fieldset {...a11y("project")}>
        <legend className={label}>What&apos;s the project?</legend>
        <div className="flex flex-wrap gap-2">
          {quote.projectTypes.map((t) => (
            <label key={t} className="chip relative">
              <input type="radio" name="project" value={t} required />
              <span>{t}</span>
            </label>
          ))}
        </div>
        {err("project")}
      </fieldset>

      <div>
        <label htmlFor="q-details" className={label}>
          Tell us about it <span className="font-normal text-stone-500">(optional)</span>
        </label>
        <textarea
          id="q-details"
          name="details"
          rows={4}
          className="field min-h-32 resize-y leading-relaxed"
          placeholder="Rough measurements, the stone you're considering, your timeline…"
        />
      </div>

      <fieldset>
        <legend className={label}>Best way to reach you</legend>
        <div className="flex flex-wrap gap-2">
          {quote.contactMethods.filter((m) => m !== "Text" || site.phone.sms).map((m, i) => (
            <label key={m} className="chip relative">
              <input type="radio" name="contact" value={m} defaultChecked={i === 0} />
              <span>{m}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className={label}>
          When could you come see slabs? <span className="font-normal text-stone-500">(optional)</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {quote.viewTimes.map((t) => (
            <label key={t} className="chip relative">
              <input type="radio" name="slab_viewing" value={t} />
              <span>{t}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="pt-2">
        <button type="submit" disabled={status === "sending"} className="btn btn-brass w-full !min-h-14 text-base disabled:opacity-70 sm:w-auto sm:!px-8">
          {status === "sending" ? "Sending…" : "Send my quote request"}
          {status !== "sending" && <ArrowIcon />}
        </button>
        {status === "error" && (
          <p role="alert" className="mt-4 text-[0.95rem] font-semibold text-[#9a3b22]">
            {`Sorry, that didn't send. Please call us at ${site.phone.display} and we'll take it from there.`}
          </p>
        )}
        <p className="mt-4 text-sm text-stone-500">Free and no obligation. We only use your details to reply about your project.</p>
      </div>
    </form>
  );
}
