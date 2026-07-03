"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { FORM_ENDPOINT, WEB3FORMS_KEY, SITE } from "@/lib/site";

// One reusable form island (Contact, Join, and later POTW / registration).
// POSTs to the Formspree/Web3Forms endpoint in NEXT_PUBLIC_FORM_ENDPOINT.
// Until that's set, it validates and then tells the user to email instead -
// honest behavior for a static build with no backend.

export interface FormField {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea" | "select";
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  options?: { value: string; label: string }[];
}

type Status = "idle" | "submitting" | "success" | "error";

const inputBase =
  "w-full rounded-btn border-[1.5px] border-line2 bg-surface px-3.5 py-2.5 text-[15px] text-ink outline-none transition-colors placeholder:text-ink3 focus:border-accent";

export function FormspreeForm({
  fields,
  submitLabel = "Send →",
  subject,
  successTitle = "Thanks - we got it.",
  successMessage = "We'll be in touch soon.",
  endpoint = FORM_ENDPOINT,
  className,
}: {
  fields: FormField[];
  submitLabel?: string;
  subject?: string;
  successTitle?: string;
  successMessage?: string;
  endpoint?: string;
  className?: string;
}) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [notConnected, setNotConnected] = useState(false);
  const [gotcha, setGotcha] = useState("");
  const submitting = status === "submitting";
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const set = (name: string, v: string) => {
    setValues((prev) => ({ ...prev, [name]: v }));
    setErrors((prev) => (prev[name] ? { ...prev, [name]: "" } : prev));
  };

  function validate(): Record<string, string> {
    const e: Record<string, string> = {};
    for (const f of fields) {
      const val = (values[f.name] ?? "").trim();
      if (f.required && !val) {
        e[f.name] = "This field is required.";
      } else if (
        f.type === "email" &&
        val &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
      ) {
        e[f.name] = "Enter a valid email address.";
      }
    }
    return e;
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (gotcha) {
      setStatus("success"); // silently swallow bots
      return;
    }
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    if (!endpoint) {
      setNotConnected(true);
      setStatus("error");
      return;
    }

    setStatus("submitting");
    try {
      const payload: Record<string, string> = { ...values };
      if (subject) {
        payload._subject = subject; // Formspree
        payload.subject = subject; // Web3Forms
      }
      if (WEB3FORMS_KEY) payload.access_key = WEB3FORMS_KEY;
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      // Formspree signals success with res.ok; Web3Forms returns a JSON
      // `success` boolean. Honor the latter when present.
      let ok = res.ok;
      try {
        const json = await res.json();
        if (json && typeof json.success === "boolean") ok = json.success;
      } catch {
        // non-JSON response - fall back to res.ok
      }
      setStatus(ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className={cn(
          "rounded-card border-[1.5px] border-line2 bg-surface p-6 outline-none",
          className
        )}
      >
        <p className="font-mono text-[13px] text-accent">✓ Sent</p>
        <h3 className="mt-2 text-lg font-bold text-ink">{successTitle}</h3>
        <p className="mt-1 text-[15px] text-ink2">{successMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className={cn("space-y-4", className)}>
      {/* honeypot */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="sr-only"
        value={gotcha}
        onChange={(e) => setGotcha(e.target.value)}
      />

      {fields.map((f) => {
        const id = `field-${f.name}`;
        const err = errors[f.name];
        const describedBy = err ? `${id}-error` : undefined;
        return (
          <div key={f.name}>
            <label
              htmlFor={id}
              className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.14em] text-ink2"
            >
              {f.label}
              {f.required && <span className="text-magenta"> *</span>}
            </label>

            {f.type === "textarea" ? (
              <textarea
                id={id}
                name={f.name}
                rows={4}
                required={f.required}
                disabled={submitting}
                placeholder={f.placeholder}
                aria-invalid={!!err}
                aria-describedby={describedBy}
                value={values[f.name] ?? ""}
                onChange={(e) => set(f.name, e.target.value)}
                className={cn(inputBase, "resize-y")}
              />
            ) : f.type === "select" ? (
              <select
                id={id}
                name={f.name}
                required={f.required}
                disabled={submitting}
                aria-invalid={!!err}
                aria-describedby={describedBy}
                value={values[f.name] ?? ""}
                onChange={(e) => set(f.name, e.target.value)}
                className={inputBase}
              >
                <option value="">Select…</option>
                {f.options?.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={id}
                name={f.name}
                type={f.type ?? "text"}
                required={f.required}
                disabled={submitting}
                placeholder={f.placeholder}
                autoComplete={f.autoComplete}
                aria-invalid={!!err}
                aria-describedby={describedBy}
                value={values[f.name] ?? ""}
                onChange={(e) => set(f.name, e.target.value)}
                className={inputBase}
              />
            )}

            {err && (
              <p id={`${id}-error`} role="alert" className="mt-1 text-[13px] text-magenta">
                {err}
              </p>
            )}
          </div>
        );
      })}

      {status === "error" && (
        <p role="alert" className="text-[14px] text-magenta">
          {notConnected ? (
            <>
              This form isn&apos;t connected yet - please email us at{" "}
              <a className="underline" href={`mailto:${SITE.email}`}>
                {SITE.email}
              </a>
              .
            </>
          ) : (
            "Something went wrong. Please try again in a moment."
          )}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center gap-2 rounded-btn bg-accent-fill px-6 py-[13px] font-bold text-white shadow-[0_8px_22px_color-mix(in_srgb,var(--accent)_32%,transparent)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "submitting" ? "Submitting…" : submitLabel}
      </button>
    </form>
  );
}
