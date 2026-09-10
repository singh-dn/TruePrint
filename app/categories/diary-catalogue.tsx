"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { categoryCatalogues, type Catalogue } from "./catalogue-config";
import { downloadCataloguePdf } from "./download-catalogue";
import TurnstileWidget from "../turnstile-widget";
import { ArrowFillButton } from "../arrow-fill-button";
import { TURNSTILE_ACTIONS } from "@/lib/turnstile-actions";
import "./catalogue-cards.css";

const whatsappUrl = `https://wa.me/918588829931?text=${encodeURIComponent("Hello TruePrint, I would like to know more about your custom diary and catalogue options.")}`;

type DownloadStatus = "idle" | "preparing" | "downloading" | "completed";
type IconName = "check" | "share" | "download" | "file" | "sparkles" | "user" | "mail" | "phone" | "close" | "shield";

function toCatalogueId(title: string) {
  return `catalogue-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
}

function CatalogueIcon({ name }: { name: IconName }) {
  const paths = {
    check: <path d="m5 12 4 4L19 6" />,
    share: <><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M12 2v13M7 7l5-5 5 5" /></>,
    download: <><path d="M12 3v12m0 0 4-4m-4 4-4-4" /><path d="M5 20h14" /></>,
    file: <><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v5h5M9 14l2 2 4-4" /></>,
    sparkles: <><path d="m12 2 1.3 4.2L17.5 8l-4.2 1.8L12 14l-1.3-4.2L6.5 8l4.2-1.8z" /><path d="m18.5 14 .7 2.3 2.3.7-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.7z" /></>,
    user: <><circle cx="12" cy="8" r="3.5" /><path d="M5 21c.7-4.2 3-6.3 7-6.3s6.3 2.1 7 6.3" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
    phone: <path d="M7 3 4 5c.4 7.8 6.2 13.6 14 14l2-3-4.2-2-1.5 2c-3.2-1.1-5.8-3.7-6.9-6.9l2-1.5z" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    shield: <><path d="M12 3 5 6v5c0 4.7 2.7 8.2 7 10 4.3-1.8 7-5.3 7-10V6z" /><path d="m9 12 2 2 4-4" /></>,
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

function CataloguePresentationCard({ catalogue, categoryKey }: { catalogue: Catalogue; categoryKey: string }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState<DownloadStatus>("idle");
  const [downloadError, setDownloadError] = useState("");
  const [detailsSaved, setDetailsSaved] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileReset, setTurnstileReset] = useState(0);
  const toastTimeoutRef = useRef<number | null>(null);
  const requestInFlight = useRef(false);
  const downloadAbort = useRef<AbortController | null>(null);
  const isBusy = downloadStatus === "preparing" || downloadStatus === "downloading";
  const hasPdf = /^https:\/\//.test(catalogue.url);
  const catalogueTags = catalogue.tags ?? [catalogue.badge, "Corporate Gifting", "Custom Branding"];
  const pdfMeta = catalogue.sizeLabel ? `PDF · ${catalogue.sizeLabel}` : "PDF";
  const statusMessage = downloadStatus === "completed"
    ? "Your PDF download has started. Check your device’s downloads."
    : downloadError || (!hasPdf ? "PDF link coming soon" : pdfMeta);

  const triggerToast = (message: string) => {
    if (toastTimeoutRef.current) window.clearTimeout(toastTimeoutRef.current);
    setToastMessage(message);
    toastTimeoutRef.current = window.setTimeout(() => setToastMessage(null), 2400);
  };

  useEffect(() => () => {
    if (toastTimeoutRef.current) window.clearTimeout(toastTimeoutRef.current);
    downloadAbort.current?.abort();
  }, []);

  const startDownload = async () => {
    setDownloadError("");
    setDownloadStatus("downloading");
    const controller = new AbortController();
    downloadAbort.current = controller;
    try {
      await downloadCataloguePdf(catalogue.url, catalogue.fileName, controller.signal);
      setDownloadStatus("completed");
      setIsFormOpen(false);
      setFormData({ name: "", email: "", phone: "" });
    } catch (error) {
      if (controller.signal.aborted) return;
      setDownloadStatus("idle");
      setDownloadError(error instanceof Error ? error.message : "Download failed. Please try again.");
    } finally {
      requestInFlight.current = false;
    }
  };

  const retryDownload = () => {
    if (requestInFlight.current || !hasPdf) return;
    requestInFlight.current = true;
    void startDownload();
  };

  const handleShare = async () => {
    const cardUrl = `${window.location.origin}${window.location.pathname}${window.location.search}#${toCatalogueId(catalogue.title)}`;
    try {
      await navigator.clipboard.writeText(cardUrl);
      setIsCopied(true);
      triggerToast(`${catalogue.title} link copied`);
      window.setTimeout(() => setIsCopied(false), 2000);
    } catch {
      const shareInput = document.createElement("input");
      shareInput.value = cardUrl;
      document.body.appendChild(shareInput);
      shareInput.select();
      const copied = document.execCommand("copy");
      document.body.removeChild(shareInput);
      if (copied) {
        setIsCopied(true);
        triggerToast(`${catalogue.title} link copied`);
        window.setTimeout(() => setIsCopied(false), 2000);
      } else {
        triggerToast("Link ready to share");
      }
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    if (formErrors[name]) setFormErrors((current) => ({ ...current, [name]: "" }));
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (requestInFlight.current || !hasPdf) return;
    if (detailsSaved) return retryDownload();
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = "Please enter your name";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Valid email is required";
    if (!formData.phone.trim() || formData.phone.length < 8) errors.phone = "Valid mobile number is required";
    if (Object.keys(errors).length) {
      setFormErrors(errors);
      return;
    }
    requestInFlight.current = true;
    setDownloadError("");
    setDownloadStatus("preparing");

    try {
      const response = await fetch("/api/forms/catalogue-download", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          category_key: categoryKey,
          catalogue_slot: catalogue.slot,
          catalogue_title: catalogue.title,
          catalogue_url: catalogue.url,
          source_page: window.location.pathname,
          website: "",
          turnstile_token: turnstileToken,
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null) as { message?: string } | null;
        throw new Error(body?.message || "We could not save your details. Please try again.");
      }
    } catch (error) {
      requestInFlight.current = false;
      setDownloadStatus("idle");
      setTurnstileToken("");
      setTurnstileReset((current) => current + 1);
      setDownloadError(error instanceof Error ? error.message : "We could not save your details. Please try again.");
      return;
    }

    setTurnstileToken("");

    setDetailsSaved(true);
    await startDownload();
  };

  const closeForm = () => {
    if (requestInFlight.current) return;
    setIsFormOpen(false);
    setFormErrors({});
    setTurnstileToken("");
    setTurnstileReset((current) => current + 1);
  };

  const catalogueId = toCatalogueId(catalogue.title);

  return (
    <article
      className="diaryDownloadCard trueprintCatalogueCard liquidCatalogue"
      onPointerMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        const mouseX = ((event.clientX - bounds.left) / bounds.width) * 100;
        const mouseY = ((event.clientY - bounds.top) / bounds.height) * 100;
        event.currentTarget.style.setProperty("--mouse-x", `${mouseX}%`);
        event.currentTarget.style.setProperty("--mouse-y", `${mouseY}%`);
      }}
      id={catalogueId}
      aria-labelledby={`${catalogueId}-title`}
      aria-describedby={`${catalogueId}-description`}
      itemScope
      itemType="https://schema.org/DigitalDocument"
    >
      <meta itemProp="name" content={catalogue.title} />
      <meta itemProp="description" content={catalogue.description} />
      <link itemProp="image" href={catalogue.image} />
      <div className="catalogueGlows" aria-hidden="true"><i /><i /><i /></div>
      <div className="catalogueGloss" aria-hidden="true" />
      <div className="catalogueSheen" aria-hidden="true" />
      <div className="catalogueAura" aria-hidden="true" />
      <div className="catalogueCornerGlow" aria-hidden="true" />
      <div className="trueprintCatalogueTopbar">
        <span className="trueprintCatalogueBadge"><b>PDF</b>Digital Catalogue</span>
        <button type="button" onClick={handleShare} aria-label={`Copy link to ${catalogue.title}`} title={`Copy link to ${catalogue.title}`}><CatalogueIcon name={isCopied ? "check" : "share"} /></button>
      </div>

      <div className="trueprintCatalogueSheet">
        <h3 id={`${catalogueId}-title`}>{catalogue.title}</h3>
        <p id={`${catalogueId}-description`}>{catalogue.description}</p>
        <div className="catalogueChips">{catalogueTags.map((tag) => <span key={tag}><i />{tag}</span>)}</div>
        <div className="catalogueActionArea">
          <div className="catalogueDocumentMeta"><span><CatalogueIcon name="file" />Catalogue</span><span><CatalogueIcon name="file" />PDF document{catalogue.sizeLabel ? ` • ${catalogue.sizeLabel}` : ""}</span></div>
          <button className="catalogueDownloadBar" type="button" disabled={isBusy || !hasPdf} onClick={() => detailsSaved ? retryDownload() : setIsFormOpen(true)}>
            <span className={`catalogueProgressFill${isBusy ? " is-active" : downloadStatus === "completed" ? " is-complete" : ""}`} aria-hidden="true" />
            <b className="cataloguePdfTile">PDF</b>
            <span className="catalogueButtonCopy"><strong>{isBusy ? "Downloading…" : detailsSaved ? "Download Again" : "Download Catalogue"}</strong><small>Open / save the PDF catalogue</small></span>
            <span className="catalogueDownloadCircle">{isBusy ? <i className="catalogueBusy" /> : downloadStatus === "completed" ? <CatalogueIcon name="check" /> : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><g className="catalogueArrow"><path d="M12 4v12M7 11l5 5 5-5" /></g><path className="catalogueTray" d="M5 20h14" /></svg>}</span>
          </button>
          <small className="categoryCatalogueMeta" role="status">{downloadStatus === "completed" || downloadError || !hasPdf ? statusMessage : ""}</small>
        </div>
      </div>

      <div className={`trueprintCatalogueDrawer${isFormOpen ? " is-open" : ""}`} aria-hidden={!isFormOpen} inert={!isFormOpen ? true : undefined}>
        <button className="trueprintCatalogueDrawerBackdrop" type="button" onClick={closeForm} disabled={isBusy} aria-label="Close catalogue form" />
        <div className="trueprintCatalogueFormSheet catalogueClassicForm">
          <button className="trueprintCatalogueFormClose" type="button" onClick={closeForm} disabled={isBusy} aria-label="Close catalogue form"><CatalogueIcon name="close" /></button>
          <i className="catalogueClassicHandle" aria-hidden="true" />
          <header><h4>Download the TruePrint Catalogue</h4><p>Fill in your details to access the PDF. Like a product? Share its screenshot with us on WhatsApp for customization, availability and the best pricing.</p></header>
          <form onSubmit={handleFormSubmit} noValidate>
            {([ ["name", "text", "Full Name", "user"], ["email", "email", "Work or Personal Email", "mail"], ["phone", "tel", "Mobile Number", "phone"] ] as const).map(([name, type, placeholder, icon]) => (
              <label className={formErrors[name] ? "has-error" : ""} key={name}>
                <span><CatalogueIcon name={icon} /></span>
                <input type={type} name={name} value={formData[name]} onChange={handleInputChange} placeholder={placeholder} disabled={isBusy || detailsSaved} autoComplete={name === "email" ? "email" : name === "phone" ? "tel" : "name"} />
                {formErrors[name] && <em>{formErrors[name]}</em>}
              </label>
            ))}
            {isFormOpen && !detailsSaved && (
              <TurnstileWidget
                action={TURNSTILE_ACTIONS.catalogueDownload}
                onToken={setTurnstileToken}
                resetSignal={turnstileReset}
                theme="light"
                compact
              />
            )}
            <div className="catalogueSubmitArea">
              <ArrowFillButton type="submit" disabled={isBusy || !hasPdf || (!detailsSaved && !turnstileToken)} label={downloadStatus === "preparing" ? "Preparing PDF…" : downloadStatus === "downloading" ? "Downloading…" : detailsSaved ? "Retry Download" : "Submit & Download"} />
            </div>
            <small className="categoryCatalogueMeta" role="status">{statusMessage}</small>
          </form>
          <p className="catalogueClassicPrivacy"><CatalogueIcon name="shield" />Confidential &amp; secure direct PDF delivery</p>
        </div>
      </div>
      <div className={`trueprintCatalogueToast${toastMessage ? " is-visible" : ""}`} role="status">{toastMessage}</div>
    </article>
  );
}

export default function DiaryCatalogue({ categoryKey = "diaries" }: { categoryKey?: string }) {
  const catalogues = categoryCatalogues[categoryKey] ?? [];
  const [activeSlide, setActiveSlide] = useState(0);
  const [showExpertHint, setShowExpertHint] = useState(true);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hintTimer = window.setTimeout(() => setShowExpertHint(false), 6500);
    return () => window.clearTimeout(hintTimer);
  }, []);

  const scrollToCard = (index: number) => {
    if (!catalogues.length) return;
    const normalizedIndex = (index + catalogues.length) % catalogues.length;
    const rail = railRef.current;
    const card = rail?.children[normalizedIndex] as HTMLElement | undefined;
    if (rail && card) {
      const railInset = Number.parseFloat(window.getComputedStyle(rail).scrollPaddingLeft) || 0;
      rail.scrollTo({ left: card.offsetLeft - railInset, behavior: "smooth" });
      setActiveSlide(normalizedIndex);
    }
  };

  const updateActiveSlide = () => {
    const rail = railRef.current;
    if (!rail) return;
    const cards = Array.from(rail.children) as HTMLElement[];
    const railInset = Number.parseFloat(window.getComputedStyle(rail).scrollPaddingLeft) || 0;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;
    cards.forEach((card, index) => {
      const distance = Math.abs(card.offsetLeft - railInset - rail.scrollLeft);
      if (distance < closestDistance) { closestDistance = distance; closestIndex = index; }
    });
    setActiveSlide(closestIndex);
  };

  const moveSlider = (direction: -1 | 1) => {
    const rail = railRef.current;
    const firstCard = rail?.firstElementChild as HTMLElement | null;
    if (!rail || !firstCard) return;
    const maximumScroll = rail.scrollWidth - rail.clientWidth;
    if (direction === 1 && maximumScroll - rail.scrollLeft <= 4) return scrollToCard(0);
    if (direction === -1 && rail.scrollLeft <= 4) { rail.scrollTo({ left: maximumScroll, behavior: "smooth" }); return; }
    const gap = Number.parseFloat(window.getComputedStyle(rail).columnGap) || 0;
    rail.scrollBy({ left: direction * (firstCard.offsetWidth + gap), behavior: "smooth" });
  };

  return (
    <>
      <section className="diaryDownloadSection" id="diary-catalogue" aria-labelledby="diary-catalogue-title">
        <span className="diaryDownloadGhost" aria-hidden="true">CATALOGUES</span>
        <header className="diaryDownloadHeader">
          <div><p><span /> PDF library</p><h2 id="diary-catalogue-title">Choose a catalogue.<br /><em>Keep it close.</em></h2></div>
          <p>Pick the collection you want to explore. We&apos;ll ask for a few details first, then unlock the PDF catalogue for you.</p>
        </header>
        <div className="diaryDownloadSlider">
          <div className="diaryDownloadSliderControls" aria-label="Catalogue slider controls"><span><b>{String(catalogues.length ? Math.min(activeSlide + 1, catalogues.length) : 0).padStart(2, "0")}</b> / {String(catalogues.length).padStart(2, "0")}</span><small>Swipe or use the edge controls</small></div>
          <div className="diaryDownloadRailFrame">
            <button className="diaryDownloadEdgeButton diaryDownloadEdgeButtonPrev" type="button" disabled={catalogues.length < 2} onClick={() => moveSlider(-1)} aria-label="Previous catalogue">←</button>
            <div className="diaryDownloadRail" ref={railRef} onScroll={updateActiveSlide}>{catalogues.map((catalogue) => <CataloguePresentationCard catalogue={catalogue} categoryKey={categoryKey} key={`${categoryKey}-${catalogue.slot}`} />)}</div>
            <button className="diaryDownloadEdgeButton diaryDownloadEdgeButtonNext" type="button" disabled={catalogues.length < 2} onClick={() => moveSlider(1)} aria-label="Next catalogue">→</button>
          </div>
        </div>
      </section>
      <nav className="diaryBottomDock" aria-label="Diary quick actions">
        {showExpertHint && <p className="diaryBottomDockHint" role="status">Looking for something different? Connect directly with our print expert.</p>}
        <a href="#diary-catalogue">Download catalogue</a>
        <a href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Contact TruePrint on WhatsApp"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 11.8a8.3 8.3 0 0 1-12.2 7.3L4 20.2l1.2-4.1a8.3 8.3 0 1 1 15.3-4.3Zm-8.3-6.6a6.6 6.6 0 0 0-5.6 10.2l.2.3-.7 2.3 2.4-.6.3.2a6.6 6.6 0 1 0 3.4-12.4Zm-2.8 3.2c.2 0 .3 0 .4.3l.6 1.5c.1.2.1.3 0 .5l-.5.7c-.1.1-.2.3 0 .5.4.8 1.1 1.5 2 2 .2.1.4.1.5-.1l.8-1c.1-.2.3-.2.5-.1l1.6.7c.2.1.4.2.4.4 0 .2-.1 1.1-.7 1.6-.5.5-1.2.7-1.9.5-1.1-.3-2.5-.9-3.7-2-1-1-1.8-2.2-2-3.1-.3-1 0-1.8.4-2.3.4-.4.8-.5 1.1-.5Z" /></svg><span>WhatsApp</span></a>
      </nav>
    </>
  );
}
