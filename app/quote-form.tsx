"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { ArrowFillButton } from "./arrow-fill-button";
import TurnstileWidget from "./turnstile-widget";
import { TURNSTILE_ACTIONS } from "@/lib/turnstile-actions";

type QuoteStep = 1 | 2;

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  requirement: "",
  quantity: "",
  organization: "",
};

export default function QuoteForm() {
  const [previewComplete, setPreviewComplete] = useState(false);
  const [step, setStep] = useState<QuoteStep>(1);
  const [formData, setFormData] = useState(initialFormData);
  const [fileName, setFileName] = useState("");
  const [intakeId, setIntakeId] = useState("");
  const [continuationToken, setContinuationToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileReset, setTurnstileReset] = useState(0);

  function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.currentTarget;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  async function handleContinue(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/forms/project-intake", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          phase: "start",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          requirement: formData.requirement,
          source_page: window.location.pathname,
          website: "",
          turnstile_token: turnstileToken,
        }),
      });
      const body = await response.json().catch(() => null) as {
        id?: string;
        continuation_token?: string;
        message?: string;
      } | null;
      if (!response.ok || !body?.id || !body.continuation_token) {
        throw new Error(body?.message || "We could not save your details. Please try again.");
      }

      setIntakeId(body.id);
      setContinuationToken(body.continuation_token);
      setTurnstileToken("");
      setStep(2);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "We could not save your details. Please try again.");
      setTurnstileToken("");
      setTurnstileReset((current) => current + 1);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!intakeId || !continuationToken) {
      setSubmitError("This form session has expired. Please start again.");
      setStep(1);
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");
    try {
      const payload = new FormData(form);
      payload.set("phase", "complete");
      payload.set("intake_id", intakeId);
      payload.set("continuation_token", continuationToken);
      payload.set("source_page", window.location.pathname);
      payload.set("website", "");

      const response = await fetch("/api/forms/project-intake", { method: "POST", body: payload });
      const body = await response.json().catch(() => null) as { message?: string } | null;
      if (!response.ok) throw new Error(body?.message || "We could not submit your requirement. Please try again.");

      form.reset();
      setFormData(initialFormData);
      setFileName("");
      setIntakeId("");
      setContinuationToken("");
      setTurnstileToken("");
      setStep(1);
      setPreviewComplete(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "We could not submit your requirement. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (previewComplete) {
    return (
      <div className="formSuccess" role="status">
        <span className="successMark" aria-hidden="true">✓</span>
        <p className="formKicker">Requirement submitted</p>
        <h2>Thank you.<br />We&apos;ll take it from here.</h2>
        <p>Our TruePrint team will contact you shortly to understand the details and help with the right options.</p>
        <ArrowFillButton label="Submit another requirement" type="button" onClick={() => setPreviewComplete(false)} />
      </div>
    );
  }

  return (
    <form className="quoteForm" onSubmit={step === 1 ? handleContinue : handleSubmit}>
      <div className="formHeading">
        <div className="formBadge"><span aria-hidden="true">TP</span> Project intake</div>
        <p className="formKicker">Begin a project</p>
        {step === 1 ? (
          <>
            <h2>Tell us what<br />you&apos;re printing.</h2>
            <p className="formDescription">Share the essentials and we&apos;ll help shape the right stock, finish and production route.</p>
          </>
        ) : (
          <>
            <h2>A few more<br />details.</h2>
            <p className="formDescription">Help us understand your requirement so our sourcing team can come back with the right options.</p>
          </>
        )}
      </div>

      {step === 1 ? (
        <>
          <div className="formGrid" key="quote-step-one">
            <label className="formField">
              <span>Your name*</span>
              <input name="name" type="text" value={formData.name} onChange={handleInputChange} placeholder="Full name" autoComplete="name" required />
            </label>
            <label className="formField">
              <span>Work email*</span>
              <input name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="name@company.com" autoComplete="email" required />
            </label>
            <label className="formField fieldWide">
              <span>Phone number*</span>
              <input name="phone" type="tel" value={formData.phone} onChange={handleInputChange} placeholder="+91" autoComplete="tel" required />
            </label>
            <label className="formField fieldWide briefField">
              <span>What do you need?*</span>
              <textarea name="requirement" rows={3} value={formData.requirement} onChange={handleInputChange} placeholder="Tell us what you're looking for — e.g. 500 joining kits, custom bottles, premium client gifts, event merchandise..." required />
            </label>
          </div>

          <TurnstileWidget
            action={TURNSTILE_ACTIONS.projectIntake}
            onToken={setTurnstileToken}
            resetSignal={turnstileReset}
            theme="light"
          />

          <div className="formActions formContinueActions">
            <div className="formContinueGroup">
              <ArrowFillButton className="formSubmit" label={isSubmitting ? "Saving…" : "Continue"} type="submit" disabled={isSubmitting || !turnstileToken} />
              <small>Takes less than a minute.</small>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="formGrid" key="quote-step-two">
            <label className="formField">
              <span>Estimated quantity*</span>
              <input name="quantity" type="number" min="1" value={formData.quantity} onChange={handleInputChange} placeholder="e.g. 500" inputMode="numeric" required />
            </label>
            <label className="formField">
              <span>Organization (Optional)</span>
              <input name="organization" type="text" value={formData.organization} onChange={handleInputChange} placeholder="Company / Organization name" autoComplete="organization" />
            </label>
            <div className="formField fieldWide">
              <span>Reference image or file (Optional)</span>
              <label className="formFileControl">
                <input type="file" name="reference" accept="image/jpeg,image/png,image/webp,image/gif,image/heic,image/heif,application/pdf" onChange={(event) => setFileName(event.currentTarget.files?.[0]?.name ?? "")} />
                <span>{fileName || "Upload a photo, design, PDF or product reference"}</span>
                <b>{fileName ? "Selected" : "Browse"}</b>
              </label>
            </div>
          </div>

          <div className="formActions">
            <label className="consentCheck">
              <input type="checkbox" name="consent" value="true" required />
              <span>I agree to be contacted by TruePrint regarding this requirement.</span>
            </label>
            <ArrowFillButton className="formSubmit" label={isSubmitting ? "Submitting…" : "Submit Requirement"} type="submit" disabled={isSubmitting} />
          </div>
        </>
      )}
      {submitError && <p className="formSubmissionError" role="alert">{submitError}</p>}
    </form>
  );
}
