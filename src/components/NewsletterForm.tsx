"use client";

import { useState, type FormEvent } from "react";
import { track } from "@/lib/analytics";

export function NewsletterForm() {
  const enabled = process.env.NEXT_PUBLIC_NEWSLETTER_ENABLED !== "false";
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  if (!enabled) return null;

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setMessage("");
    if (!email.includes("@")) {
      setStatus("error");
      setMessage("Enter a valid email address.");
      return;
    }
    if (!consent) {
      setStatus("error");
      setMessage("Please agree to receive email updates.");
      return;
    }

    track("email_signup_started");
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, consent: true }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? "Signup failed");
      }
      setStatus("success");
      setMessage("You’re on the list. Check your inbox for a confirmation.");
      track("email_signup_completed");
      setEmail("");
      setConsent(false);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Signup failed");
    }
  }

  return (
    <section className="surface p-6" aria-labelledby="newsletter-heading">
      <h2 id="newsletter-heading" className="text-xl font-semibold">
        Get new setup guides
      </h2>
      <p className="mt-2 text-sm text-ink-muted">
        Occasional iPhone camera updates — no spam. Read the{" "}
        <a href="/privacy" className="text-accent">
          privacy policy
        </a>
        .
      </p>
      <form className="mt-4 space-y-3" onSubmit={onSubmit} noValidate>
        <div>
          <label htmlFor="newsletter-email" className="mb-1 block text-sm font-medium">
            Email
          </label>
          <input
            id="newsletter-email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="min-h-11 w-full rounded-[var(--radius-sm)] border border-line bg-bg-elevated px-3"
            aria-invalid={status === "error"}
            aria-describedby={message ? "newsletter-message" : undefined}
          />
        </div>
        <label className="flex min-h-11 items-start gap-3 text-sm text-ink-muted">
          <input
            type="checkbox"
            className="mt-1 h-5 w-5"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
          />
          <span>I agree to receive email updates about camera settings and guides.</span>
        </label>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Subscribing…" : "Subscribe"}
        </button>
        {message ? (
          <p
            id="newsletter-message"
            role="status"
            className={
              status === "error" ? "text-sm text-danger" : "text-sm text-success"
            }
          >
            {message}
          </p>
        ) : null}
      </form>
    </section>
  );
}
