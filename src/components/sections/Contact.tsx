"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { trackEvent } from "@/components/layout/Analytics";
import type { Dictionary } from "@/lib/i18n";

interface ContactProps {
  dict: Dictionary;
  locale?: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  event_type: string;
  event_date: string;
  location: string;
  budget: string;
  message: string;
}

const EVENT_TYPE_CARDS: { label: string; icon: string }[] = [
  { label: "Défilé de mode", icon: "💃" },
  { label: "Shooting photo/vidéo", icon: "\uD83D\uDCF8" },
  { label: "Lancement produit", icon: "\uD83D\uDE80" },
  { label: "Gala & soirée prestige", icon: "\uD83E\uDD42" },
  { label: "Sommet & conférence", icon: "\uD83C\uDF99\uFE0F" },
  { label: "Salon & exposition", icon: "\uD83C\uDFDB\uFE0F" },
  { label: "Autre", icon: "\u2726" },
];

const LOCATION_OPTIONS = ["Paris", "Province", "International"] as const;
const BUDGET_OPTIONS = ["< 5k\u20AC", "5-15k\u20AC", "15-50k\u20AC", "50k\u20AC+", "Non défini"] as const;

const slideVariants = {
  enterRight: { x: 60, opacity: 0 },
  enterLeft: { x: -60, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exitLeft: { x: -60, opacity: 0 },
  exitRight: { x: 60, opacity: 0 },
};

export default function Contact({ dict, locale = "fr" }: ContactProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    event_type: "",
    event_date: "",
    location: "",
    budget: "",
    message: "",
  });

  const c = dict.contact;
  const calendlyLabel = locale === "en" ? "Or book a call" : "Ou réserver un appel";
  const calendlyUrl =
    process.env.NEXT_PUBLIC_CALENDLY_URL ||
    "https://calendly.com/nicola-nortier";

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const goToStep2 = () => {
    trackEvent("form_step1_complete", { event_type: formData.event_type });
    setDirection(1);
    setStep(2);
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", phone: "", company: "", event_type: "", event_date: "", location: "", budget: "", message: "" });
    setStatus("idle");
    setErrorMsg("");
    setDirection(-1);
    setStep(1);
  };

  const goToStep1 = () => {
    setDirection(-1);
    setStep(1);
  };

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;
    if (!EMAIL_RE.test(formData.email)) {
      setErrorMsg(locale === "en" ? "Invalid email address" : "Adresse email invalide");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = (await res.json()) as { success: boolean; error?: string };

      if (!res.ok || !json.success) {
        throw new Error(json.error || "Erreur serveur");
      }

      trackEvent("Lead", { event_type: formData.event_type, budget: formData.budget });
      setStatus("sent");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Une erreur est survenue";
      trackEvent("form_submission_error", { form: "contact", error: message });
      setErrorMsg(message);
      setStatus("error");
    }
  };

  return (
    <Section id="contact" variant="dark" compact>
      <SectionTitle label={c.label} title={c.title} italicWord={c.italicWord} />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12"
      >
        {/* ── Info column ── */}
        <motion.div variants={fadeInUp}>
          <p className="font-outfit text-[14px] text-text-muted font-light leading-[1.8] mb-10">
            {c.subtitle}
          </p>

          <div className="space-y-6 mb-10">
            {[
              {
                label: c.phone.label,
                value: c.phone.value,
                href: `tel:${c.phone.value.replace(/\s/g, "")}`,
                track: true,
              },
              {
                label: c.email.label,
                value: c.email.value,
                href: `mailto:${c.email.value}`,
                track: false,
              },
              {
                label: c.address.label,
                value: c.address.value,
                href: undefined,
                track: false,
              },
            ].map((item) => (
              <div key={item.label}>
                <span className="font-outfit text-[11px] font-semibold uppercase tracking-[3px] text-text-muted block mb-1">
                  {item.label}
                </span>
                {item.href ? (
                  <a
                    href={item.href}
                    onClick={
                      item.track
                        ? () => trackEvent("phone_click")
                        : undefined
                    }
                    className="font-outfit text-[14px] text-text font-light hover:text-red transition-colors duration-300"
                  >
                    {item.value}
                  </a>
                ) : (
                  <span className="font-outfit text-[14px] text-text font-light">
                    {item.value}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* CTA Calendly */}
          <a
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("calendly_click")}
            className="inline-flex items-center gap-3 px-6 py-3 border border-red/20 rounded-[2px] hover:border-red/40 hover:bg-red/5 transition-all duration-300 group"
          >
            <svg
              className="w-5 h-5 text-red"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
              />
            </svg>
            <div>
              <span className="font-outfit text-[11px] font-semibold uppercase tracking-[2px] text-text block">
                {calendlyLabel}
              </span>
              <span className="font-outfit text-[11px] text-text-muted font-light">
                {locale === "en"
                  ? "30 min \u00B7 Free consultation"
                  : "30 min \u00B7 Consultation gratuite"}
              </span>
            </div>
            <svg
              className="w-4 h-4 text-text-muted group-hover:text-red group-hover:translate-x-1 transition-all duration-300 ml-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </motion.div>

        {/* ── Form column ── */}
        <motion.div variants={fadeInUp}>
          <AnimatePresence mode="wait">
            {status === "sent" ? (
              /* ── Success state ── */
              <motion.div
                key="success"
                role="status"
                aria-live="polite"
                tabIndex={-1}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-center py-16 border border-red/[0.08] rounded-[4px] bg-dark"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.2,
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                  }}
                  className="w-16 h-16 mx-auto mb-5 rounded-full bg-red/10 flex items-center justify-center"
                >
                  <svg
                    className="w-8 h-8 text-red"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <motion.path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.4, duration: 0.4 }}
                    />
                  </svg>
                </motion.div>
                <h3 className="font-playfair text-2xl text-text mb-2">
                  {c.form.successTitle}
                </h3>
                <p className="font-outfit text-sm text-text-muted font-light max-w-[300px] mx-auto mb-6">
                  {c.form.successText}
                </p>
                <a
                  href="tel:+33660388027"
                  onClick={() => trackEvent("phone_click")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-red/20 rounded-[2px] hover:border-red/40 hover:bg-red/5 transition-all duration-300 font-outfit text-[12px] font-semibold uppercase tracking-[2px] text-text"
                >
                  <svg
                    className="w-4 h-4 text-red"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  </svg>
                  Nous appeler : 06 60 38 80 27
                </a>
                <button
                  type="button"
                  onClick={resetForm}
                  className="block mt-4 font-outfit text-[11px] text-text-muted hover:text-text underline underline-offset-2 transition-colors duration-200 mx-auto"
                >
                  {locale === "en" ? "Submit another request" : "Nouvelle demande"}
                </button>
              </motion.div>
            ) : (
              /* ── Wizard form ── */
              <motion.div
                key="form"
                className="border border-red/[0.08] rounded-[4px] bg-dark overflow-hidden"
              >
                {/* Progress bar */}
                <div className="flex items-center gap-0 px-8 pt-6 pb-2">
                  <div className="flex-1 flex items-center gap-3">
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-outfit font-bold transition-colors duration-300 ${
                        step >= 1
                          ? "bg-red/20 text-red"
                          : "bg-medium text-text-muted"
                      }`}
                    >
                      1
                    </span>
                    <span className="font-outfit text-[11px] font-semibold uppercase tracking-[2px] text-text-muted hidden sm:inline">
                      {locale === "en" ? "Your event" : "Votre événement"}
                    </span>
                  </div>
                  <div className="w-12 h-px bg-red/[0.15]" />
                  <div className="flex-1 flex items-center gap-3 justify-end">
                    <span className="font-outfit text-[11px] font-semibold uppercase tracking-[2px] text-text-muted hidden sm:inline">
                      {locale === "en" ? "Your details" : "Vos coordonnées"}
                    </span>
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-outfit font-bold transition-colors duration-300 ${
                        step >= 2
                          ? "bg-red/20 text-red"
                          : "bg-medium text-text-muted"
                      }`}
                    >
                      2
                    </span>
                  </div>
                </div>

                {/* Progress track */}
                <div className="mx-8 mb-6 h-[2px] bg-medium rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-red to-red-dark rounded-full"
                    initial={{ width: "50%" }}
                    animate={{ width: step === 1 ? "50%" : "100%" }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                </div>

                {/* Step content */}
                <div className="px-8 pb-8">
                  <AnimatePresence mode="wait" initial={false}>
                    {step === 1 ? (
                      <motion.div
                        key="step1"
                        variants={slideVariants}
                        initial={direction === 1 ? "enterRight" : "enterLeft"}
                        animate="center"
                        exit="exitLeft"
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="space-y-6"
                      >
                        {/* Event type cards */}
                        <fieldset className="space-y-3 border-0 p-0 m-0">
                          <legend className="block font-outfit text-[11px] font-semibold uppercase tracking-[3px] text-text-muted">
                            {c.form.eventType}
                          </legend>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                            {EVENT_TYPE_CARDS.map((card) => {
                              const isSelected = formData.event_type === card.label;
                              return (
                                <button
                                  key={card.label}
                                  type="button"
                                  aria-label={`${locale === "en" ? "Select" : "Sélectionner"} ${card.label}`}
                                  aria-pressed={isSelected}
                                  onClick={() =>
                                    updateField("event_type", card.label)
                                  }
                                  className={`relative flex items-center gap-2.5 px-3.5 py-3 rounded-[2px] border transition-all duration-200 text-left ${
                                    isSelected
                                      ? "border-red/40 bg-red/[0.06] text-text"
                                      : "border-red/[0.07] bg-medium text-text-muted hover:border-red/20 hover:text-text"
                                  }`}
                                >
                                  <span className="text-base leading-none">
                                    {card.icon}
                                  </span>
                                  <span className="font-outfit text-[12px] font-light leading-tight">
                                    {card.label}
                                  </span>
                                  {isSelected && (
                                    <svg className="absolute top-1.5 right-1.5 w-3.5 h-3.5 text-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </fieldset>

                        {/* Date */}
                        <div className="space-y-2">
                          <label className="block font-outfit text-[11px] font-semibold uppercase tracking-[3px] text-text-muted">
                            {c.form.date}
                          </label>
                          <input
                            type="date"
                            value={formData.event_date}
                            onChange={(e) =>
                              updateField("event_date", e.target.value)
                            }
                            className="w-full bg-medium border border-red/[0.07] rounded-[2px] px-3.5 py-3 font-outfit text-base text-text focus:outline-none focus:border-red/30 focus:ring-2 focus:ring-red/20 transition-colors duration-300"
                          />
                        </div>

                        {/* Location */}
                        <fieldset className="space-y-3 border-0 p-0 m-0">
                          <legend className="block font-outfit text-[11px] font-semibold uppercase tracking-[3px] text-text-muted">
                            {locale === "en" ? "Location" : "Lieu"}
                          </legend>
                          <div className="flex flex-wrap gap-2.5">
                            {LOCATION_OPTIONS.map((loc) => {
                              const isSelected = formData.location === loc;
                              return (
                                <button
                                  key={loc}
                                  type="button"
                                  aria-label={`${locale === "en" ? "Select location" : "Sélectionner lieu"} ${loc}`}
                                  aria-pressed={isSelected}
                                  onClick={() => updateField("location", loc)}
                                  className={`relative px-4 py-2.5 rounded-[2px] border font-outfit text-[12px] font-light transition-all duration-200 ${
                                    isSelected
                                      ? "border-red/40 bg-red/[0.06] text-text"
                                      : "border-red/[0.07] bg-medium text-text-muted hover:border-red/20 hover:text-text"
                                  }`}
                                >
                                  {isSelected && (
                                    <svg className="absolute -top-1 -right-1 w-3.5 h-3.5 text-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                  {loc}
                                </button>
                              );
                            })}
                          </div>
                        </fieldset>

                        {/* Next button */}
                        <button
                          type="button"
                          onClick={goToStep2}
                          aria-label={locale === "en" ? "Continue to next step" : "Continuer vers l'étape suivante"}
                          className="w-full py-3.5 font-outfit text-[11px] font-bold uppercase tracking-[3px] text-white bg-gradient-to-br from-red to-red-dark rounded-[2px] hover:from-red-light hover:to-red hover:shadow-[0_0_25px_rgba(155,27,36,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          {locale === "en" ? "Continue" : "Continuer"}
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </button>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="step2"
                        variants={slideVariants}
                        initial={direction === 1 ? "enterRight" : "enterLeft"}
                        animate="center"
                        exit="exitRight"
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="space-y-5"
                        onSubmit={handleSubmit}
                      >
                        {/* Row 1: Name + Email */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <FormField
                            name="name"
                            label={c.form.name}
                            placeholder={c.form.namePlaceholder}
                            value={formData.name}
                            onChange={(v) => updateField("name", v)}
                            required
                          />
                          <FormField
                            name="email"
                            label={c.form.email}
                            type="email"
                            placeholder={c.form.emailPlaceholder}
                            value={formData.email}
                            onChange={(v) => updateField("email", v)}
                            required
                          />
                        </div>

                        {/* Row 2: Phone + Company */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <FormField
                            name="phone"
                            label={c.form.phone}
                            type="tel"
                            placeholder={c.form.phonePlaceholder}
                            value={formData.phone}
                            onChange={(v) => updateField("phone", v)}
                          />
                          <FormField
                            name="company"
                            label={c.form.company}
                            placeholder={c.form.companyPlaceholder}
                            value={formData.company}
                            onChange={(v) => updateField("company", v)}
                          />
                        </div>

                        {/* Budget */}
                        <fieldset className="space-y-3 border-0 p-0 m-0">
                          <legend className="block font-outfit text-[11px] font-semibold uppercase tracking-[3px] text-text-muted">
                            {c.form.budget}
                          </legend>
                          <div className="flex flex-wrap gap-2.5">
                            {BUDGET_OPTIONS.map((opt) => {
                              const isSelected = formData.budget === opt;
                              return (
                                <button
                                  key={opt}
                                  type="button"
                                  aria-label={`${locale === "en" ? "Select budget" : "Sélectionner budget"} ${opt}`}
                                  aria-pressed={isSelected}
                                  onClick={() => updateField("budget", opt)}
                                  className={`relative px-4 py-2.5 rounded-[2px] border font-outfit text-[12px] font-light transition-all duration-200 ${
                                    isSelected
                                      ? "border-red/40 bg-red/[0.06] text-text"
                                      : "border-red/[0.07] bg-medium text-text-muted hover:border-red/20 hover:text-text"
                                  }`}
                                >
                                  {isSelected && (
                                    <svg className="absolute -top-1 -right-1 w-3.5 h-3.5 text-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                  {opt}
                                </button>
                              );
                            })}
                          </div>
                        </fieldset>

                        {/* Message */}
                        <div className="space-y-2">
                          <label className="block font-outfit text-[11px] font-semibold uppercase tracking-[3px] text-text-muted">
                            {c.form.message}
                          </label>
                          <textarea
                            name="message"
                            rows={3}
                            placeholder={c.form.messagePlaceholder}
                            value={formData.message}
                            onChange={(e) =>
                              updateField("message", e.target.value)
                            }
                            className="w-full bg-medium border border-red/[0.07] rounded-[2px] px-3.5 py-3 font-outfit text-base text-text placeholder:text-text-muted/40 focus:outline-none focus:border-red/30 focus:ring-2 focus:ring-red/20 transition-colors duration-300 resize-none"
                          />
                        </div>

                        {/* Error message */}
                        {status === "error" && (
                          <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-start gap-3 p-3 rounded-[2px] bg-red/[0.06] border border-red/20"
                          >
                            <svg
                              className="w-4 h-4 text-red mt-0.5 flex-shrink-0"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                              />
                            </svg>
                            <div>
                              <p className="font-outfit text-[12px] text-red font-medium">
                                {errorMsg ||
                                  (locale === "en"
                                    ? "An error occurred"
                                    : "Une erreur est survenue")}
                              </p>
                              <a
                                href="tel:+33660388027"
                                onClick={() => trackEvent("phone_click")}
                                className="font-outfit text-[11px] text-text-muted hover:text-red transition-colors duration-200 mt-1 inline-block"
                              >
                                {locale === "en"
                                  ? "Call us: 06 60 38 80 27"
                                  : "Nous appeler : 06 60 38 80 27"}
                              </a>
                            </div>
                          </motion.div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-3">
                          <button
                            type="button"
                            onClick={goToStep1}
                            aria-label={locale === "en" ? "Back to previous step" : "Retour à l'étape précédente"}
                            className="px-5 py-3.5 font-outfit text-[11px] font-bold uppercase tracking-[3px] text-text-muted border border-red/[0.07] rounded-[2px] hover:border-red/20 hover:text-text transition-all duration-300 flex items-center gap-2"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M7 16l-4-4m0 0l4-4m-4 4h18"
                              />
                            </svg>
                            {locale === "en" ? "Back" : "Retour"}
                          </button>
                          <button
                            type="submit"
                            disabled={status === "sending"}
                            aria-label={locale === "en" ? "Send my quote request" : "Envoyer ma demande de devis"}
                            className="flex-1 py-3.5 font-outfit text-[11px] font-bold uppercase tracking-[3px] text-white bg-gradient-to-br from-red to-red-dark rounded-[2px] hover:from-red-light hover:to-red hover:shadow-[0_0_25px_rgba(155,27,36,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                          >
                            {status === "sending" ? (
                              <>
                                <svg
                                  className="animate-spin w-4 h-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  />
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                  />
                                </svg>
                                {locale === "en"
                                  ? "Sending..."
                                  : "Envoi en cours..."}
                              </>
                            ) : (
                              c.form.submit
                            )}
                          </button>
                        </div>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </Section>
  );
}

/* ── Reusable form field ── */
function FormField({
  name,
  label,
  type = "text",
  placeholder,
  required = false,
  value,
  onChange,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
}) {
  const fieldId = `field-${name}`;
  return (
    <div className="space-y-2">
      <label htmlFor={fieldId} className="block font-outfit text-[11px] font-semibold uppercase tracking-[3px] text-text-muted">
        {label}
      </label>
      <input
        id={fieldId}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        aria-required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-medium border border-red/[0.07] rounded-[2px] px-3.5 py-3 font-outfit text-base text-text placeholder:text-text-muted/40 focus:outline-none focus:border-red/30 focus:ring-2 focus:ring-red/20 transition-colors duration-300"
      />
    </div>
  );
}
