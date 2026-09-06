"use client";

import { useState, type FormEvent } from "react";
import BrandMark from "../brand-mark";
import { ArrowFillButton } from "../arrow-fill-button";
import TurnstileWidget from "../turnstile-widget";
import { TURNSTILE_ACTIONS } from "@/lib/turnstile-actions";

export default function ContactEnquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileReset, setTurnstileReset] = useState(0);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const data = new FormData(form);
      const response = await fetch("/api/forms/contact-enquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          organization: data.get("organization"),
          requirement: data.get("requirement"),
          source_page: window.location.pathname,
          website: "",
          turnstile_token: turnstileToken,
        }),
      });
      const body = await response.json().catch(() => null) as { message?: string } | null;
      if (!response.ok) throw new Error(body?.message || "We could not save your enquiry. Please try again.");

      form.reset();
      setTurnstileToken("");
      setSubmitted(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "We could not save your enquiry. Please try again.");
      setTurnstileToken("");
      setTurnstileReset((current) => current + 1);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="contactFormSuccess" role="status">
        <span aria-hidden="true">✓</span>
        <p>Requirement submitted</p>
        <h2>Thank you.<br />We&apos;ll take it from here.</h2>
        <p>Our TruePrint expert will contact you soon to understand the details and suggest the right production route.</p>
        <ArrowFillButton label="Submit another requirement" type="button" onClick={() => setSubmitted(false)} />
      </div>
    );
  }

  return (
    <form className="contactEnquiryForm" onSubmit={handleSubmit}>
      <div className="contactFormHeading">
        <p><span /> Project enquiry</p>
        <div className="contactFormBadge"><span aria-hidden="true"><BrandMark /></span> Direct to our team</div>
        <h2>Want us to<br />contact you?</h2>
        <p>Tell us a little about what you need and our team will get in touch shortly to understand your requirement and help with the next steps.</p>
      </div>

      <div className="contactFormGrid">
        <label>
          <span>Your name*</span>
          <input name="name" type="text" placeholder="Full name" autoComplete="name" required />
        </label>
        <label>
          <span>Work email*</span>
          <input name="email" type="email" placeholder="name@company.com" autoComplete="email" required />
        </label>
        <label>
          <span>Phone number*</span>
          <input name="phone" type="tel" placeholder="+91" autoComplete="tel" required />
        </label>
        <label>
          <span>Organization (Optional)</span>
          <input name="organization" type="text" placeholder="Company / Organization name" autoComplete="organization" />
        </label>
        <label className="contactFieldWide">
          <span>What are you looking for?*</span>
          <textarea name="requirement" rows={5} placeholder="Tell us briefly what you need — product, quantity, customization, gifting, printing, sourcing or anything else." required />
        </label>
      </div>

      {submitError && <p className="contactFormError" role="alert">{submitError}</p>}

      <TurnstileWidget
        action={TURNSTILE_ACTIONS.contactEnquiry}
        onToken={setTurnstileToken}
        resetSignal={turnstileReset}
        theme="light"
      />

      <div className="contactFormActions">
        <p>By submitting, you agree to be contacted by the TruePrint team regarding your enquiry.</p>
        <ArrowFillButton label={isSubmitting ? "Submitting…" : "Request a Callback"} type="submit" disabled={isSubmitting || !turnstileToken} />
      </div>
    </form>
  );
}
