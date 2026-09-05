"use client";

import { useState, type FormEvent } from "react";
import { ArrowFillButton } from "./arrow-fill-button";
import TurnstileWidget from "./turnstile-widget";
import { TURNSTILE_ACTIONS } from "@/lib/turnstile-actions";

export default function SourceRequestForm() {
  const [fileName, setFileName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileReset, setTurnstileReset] = useState(0);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = new FormData(form);
    payload.set("source_page", window.location.pathname);
    payload.set("website", "");
    payload.set("turnstile_token", turnstileToken);

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/forms/source-request", {
        method: "POST",
        body: payload,
      });
      const body = await response.json().catch(() => null) as { message?: string } | null;
      if (!response.ok) {
        throw new Error(body?.message || "We could not submit your request. Please try again.");
      }

      form.reset();
      setFileName("");
      setTurnstileToken("");
      setSubmitted(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "We could not submit your request. Please try again.");
      setTurnstileToken("");
      setTurnstileReset((current) => current + 1);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="sourceFormSuccess" role="status">
        <span aria-hidden="true">✓</span>
        <p>Request received</p>
        <h3>We&apos;ll start<br />with your clue.</h3>
        <p>Our sourcing team will review the details and contact you with the closest route to making it real.</p>
        <ArrowFillButton label="Send another request" type="button" onClick={() => setSubmitted(false)} />
      </div>
    );
  }

  return (
    <form className="sourceRequestForm" onSubmit={handleSubmit}>
      <div className="sourceFormMeta">
        <span>Special sourcing form</span>
        <small>Photo reference welcome</small>
      </div>

      <div className="sourceFormHeading">
        <p>Show us the idea</p>
        <h3>What are you<br />searching for?</h3>
      </div>

      <div className="sourceFormGrid">
        <label>
          <span>Name*</span>
          <input name="name" type="text" placeholder="Full name" autoComplete="name" required />
        </label>
        <label>
          <span>Phone number*</span>
          <input name="phone" type="tel" placeholder="+91" autoComplete="tel" required />
        </label>
        <label>
          <span>Email*</span>
          <input name="email" type="email" placeholder="name@company.com" autoComplete="email" required />
        </label>
        <label>
          <span>Organization*</span>
          <input name="organization" type="text" placeholder="Company / organization" autoComplete="organization" required />
        </label>
        <label className="sourceFormWide">
          <span>What are you searching for?*</span>
          <textarea
            name="requirement"
            rows={4}
            maxLength={2400}
            placeholder="Describe the product, material, shape, finish, quantity or any detail you already know."
            required
          />
        </label>
        <div className="sourceFormWide">
          <span className="sourceFormLabel">Upload a photo or reference</span>
          <label className="sourceFileControl">
            <input
              name="reference"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif,image/heic,image/heif"
              onChange={(event) => setFileName(event.currentTarget.files?.[0]?.name ?? "")}
            />
            <span aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M12 16V4m0 0L7.5 8.5M12 4l4.5 4.5M5 13.5V19h14v-5.5" /></svg>
            </span>
            <strong>{fileName || "Choose a reference photo"}</strong>
            <small>{fileName ? "Selected" : "JPG, PNG or WebP · up to 8 MB"}</small>
          </label>
        </div>
      </div>

      {submitError && <p className="sourceFormError" role="alert">{submitError}</p>}

      <TurnstileWidget
        action={TURNSTILE_ACTIONS.sourceRequest}
        onToken={setTurnstileToken}
        resetSignal={turnstileReset}
        theme="light"
      />

      <div className="sourceFormActions">
        <p>By submitting, you agree to be contacted by the TruePrint team about this request.</p>
        <ArrowFillButton label={isSubmitting ? "Sending…" : "Send Request"} type="submit" disabled={isSubmitting || !turnstileToken} />
      </div>
    </form>
  );
}
