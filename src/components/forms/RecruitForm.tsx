"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useRef } from "react";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import { trackEvent } from "@/components/layout/Analytics";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const t = {
  fr: {
    nomRequired: "Nom requis",
    emailInvalid: "Email invalide",
    phoneInvalid: "Téléphone invalide",
    cityRequired: "Ville requise",
    nameLabel: "Nom complet *",
    namePlaceholder: "Prénom et nom",
    emailLabel: "Email *",
    emailPlaceholder: "votre@email.com",
    phoneLabel: "Téléphone *",
    phonePlaceholder: "+33 6 00 00 00 00",
    cityLabel: "Ville *",
    cityPlaceholder: "Votre ville de résidence",
    experienceLabel: "Expérience",
    experiencePlaceholder: "Ex: 3 ans en régissage événementiel, hôtesse luxe...",
    messageLabel: "Message / Motivation",
    messagePlaceholder: "Parlez-nous de vous, de votre parcours et de vos motivations...",
    cvLabel: "CV (PDF, max 5 Mo)",
    cvPdfOnly: "Seuls les fichiers PDF sont acceptés.",
    cvTooLarge: "Le fichier ne doit pas dépasser 5 Mo.",
    serverError: "Erreur serveur",
    genericError: "Une erreur est survenue.",
    submitting: "Envoi en cours...",
    submit: "Envoyer ma candidature",
    successTitle: "Candidature envoyée",
    successText: "Notre équipe examinera votre profil et vous contactera rapidement.",
  },
  en: {
    nomRequired: "Name required",
    emailInvalid: "Invalid email",
    phoneInvalid: "Invalid phone number",
    cityRequired: "City required",
    nameLabel: "Full name *",
    namePlaceholder: "First and last name",
    emailLabel: "Email *",
    emailPlaceholder: "your@email.com",
    phoneLabel: "Phone *",
    phonePlaceholder: "+33 6 00 00 00 00",
    cityLabel: "City *",
    cityPlaceholder: "Your city of residence",
    experienceLabel: "Experience",
    experiencePlaceholder: "E.g.: 3 years in event management, luxury hostess...",
    messageLabel: "Message / Motivation",
    messagePlaceholder: "Tell us about yourself, your background and motivations...",
    cvLabel: "CV (PDF, max 5 MB)",
    cvPdfOnly: "Only PDF files are accepted.",
    cvTooLarge: "File must not exceed 5 MB.",
    serverError: "Server error",
    genericError: "An error occurred.",
    submitting: "Sending...",
    submit: "Submit my application",
    successTitle: "Application sent",
    successText: "Our team will review your profile and get back to you shortly.",
  },
};

interface RecruitFormProps {
  locale?: string;
}

export default function RecruitForm({ locale = "fr" }: RecruitFormProps) {
  const i = locale === "en" ? t.en : t.fr;

  const recruitSchema = z.object({
    nom: z.string().min(1, i.nomRequired),
    email: z.string().email(i.emailInvalid),
    telephone: z.string().min(10, i.phoneInvalid),
    ville: z.string().min(1, i.cityRequired),
    experience: z.string().optional(),
    message: z.string().optional(),
  });

  type RecruitFormData = z.infer<typeof recruitSchema>;

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvError, setCvError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RecruitFormData>({
    resolver: zodResolver(recruitSchema),
  });

  const [errorMsg, setErrorMsg] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCvError("");
    const file = e.target.files?.[0];
    if (!file) {
      setCvFile(null);
      return;
    }
    if (file.type !== "application/pdf") {
      setCvError(i.cvPdfOnly);
      setCvFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setCvError(i.cvTooLarge);
      setCvFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    setCvFile(file);
  };

  const onSubmit = async (data: RecruitFormData) => {
    setErrorMsg("");
    try {
      const formData = new FormData();
      formData.append("nom", data.nom);
      formData.append("email", data.email);
      formData.append("telephone", data.telephone);
      formData.append("ville", data.ville);
      if (data.experience) formData.append("experience", data.experience);
      if (data.message) formData.append("message", data.message);
      if (cvFile) formData.append("cv", cvFile);

      const res = await fetch("/api/recruit", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || i.serverError);
      }
      trackEvent("Lead", { form: "recruit" });
      setIsSubmitted(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : i.genericError;
      trackEvent("form_submission_error", { form: "recruit", error: message });
      setErrorMsg(message);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-16">
        <div className="text-gold text-5xl mb-6">&#10003;</div>
        <h3 className="font-playfair text-3xl text-text mb-4">
          {i.successTitle}
        </h3>
        <p className="font-outfit text-text-muted text-sm font-light">
          {i.successText}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label={i.nameLabel}
          placeholder={i.namePlaceholder}
          autoComplete="name"
          {...register("nom")}
          error={errors.nom?.message}
        />
        <Input
          label={i.emailLabel}
          type="email"
          placeholder={i.emailPlaceholder}
          autoComplete="email"
          {...register("email")}
          error={errors.email?.message}
        />
        <Input
          label={i.phoneLabel}
          type="tel"
          placeholder={i.phonePlaceholder}
          autoComplete="tel"
          {...register("telephone")}
          error={errors.telephone?.message}
        />
        <Input
          label={i.cityLabel}
          placeholder={i.cityPlaceholder}
          autoComplete="address-level2"
          {...register("ville")}
          error={errors.ville?.message}
        />
      </div>
      <Input
        label={i.experienceLabel}
        placeholder={i.experiencePlaceholder}
        {...register("experience")}
        error={errors.experience?.message}
      />
      <Textarea
        label={i.messageLabel}
        placeholder={i.messagePlaceholder}
        {...register("message")}
        error={errors.message?.message}
      />

      {/* CV Upload */}
      <div className="space-y-2">
        <label
          htmlFor="cv-upload"
          className="block font-outfit text-sm font-semibold uppercase tracking-[3px] text-text-muted"
        >
          {i.cvLabel}
        </label>
        <div className="relative">
          <input
            ref={fileInputRef}
            id="cv-upload"
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileChange}
            className="block w-full font-outfit text-sm text-text file:mr-4 file:py-2.5 file:px-5 file:rounded-[2px] file:border file:border-red/20 file:text-sm file:font-medium file:bg-medium file:text-text hover:file:bg-red/10 file:cursor-pointer file:transition-colors file:duration-300 cursor-pointer"
          />
          {cvFile && (
            <p className="mt-1.5 font-outfit text-xs text-gold/80">
              {cvFile.name} ({(cvFile.size / 1024 / 1024).toFixed(1)} {locale === "en" ? "MB" : "Mo"})
            </p>
          )}
          {cvError && (
            <p role="alert" className="mt-1.5 text-red text-xs font-outfit">{cvError}</p>
          )}
        </div>
      </div>

      {errorMsg && (
        <p role="alert" aria-live="assertive" className="text-red text-sm font-light">{errorMsg}</p>
      )}
      <Button type="submit" variant="primary" disabled={isSubmitting}>
        {isSubmitting ? i.submitting : i.submit}
      </Button>
    </form>
  );
}
