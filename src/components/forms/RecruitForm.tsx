"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import { trackEvent } from "@/components/layout/Analytics";

const recruitSchema = z.object({
  nom: z.string().min(1, "Nom requis"),
  email: z.string().email("Email invalide"),
  telephone: z.string().min(10, "Téléphone invalide"),
  ville: z.string().min(1, "Ville requise"),
  experience: z.string().optional(),
  message: z.string().optional(),
});

type RecruitFormData = z.infer<typeof recruitSchema>;

export default function RecruitForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RecruitFormData>({
    resolver: zodResolver(recruitSchema),
  });

  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (data: RecruitFormData) => {
    setErrorMsg("");
    try {
      const res = await fetch("/api/recruit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || "Erreur serveur");
      }
      trackEvent("Lead", { form: "recruit" });
      setIsSubmitted(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Une erreur est survenue.";
      trackEvent("form_submission_error", { form: "recruit", error: message });
      setErrorMsg(message);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-16">
        <div className="text-gold text-5xl mb-6">&#10003;</div>
        <h3 className="font-cormorant text-3xl text-off-white mb-4">
          Candidature envoyée
        </h3>
        <p className="font-poppins text-off-white/60 text-sm font-light">
          Notre équipe examinera votre profil et vous contactera rapidement.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Nom complet *"
          placeholder="Prénom et nom"
          {...register("nom")}
          error={errors.nom?.message}
        />
        <Input
          label="Email *"
          type="email"
          placeholder="votre@email.com"
          {...register("email")}
          error={errors.email?.message}
        />
        <Input
          label="Téléphone *"
          type="tel"
          placeholder="+33 6 00 00 00 00"
          {...register("telephone")}
          error={errors.telephone?.message}
        />
        <Input
          label="Ville *"
          placeholder="Votre ville de résidence"
          {...register("ville")}
          error={errors.ville?.message}
        />
      </div>
      <Input
        label="Expérience"
        placeholder="Ex: 3 ans en régissage événementiel, hôtesse luxe..."
        {...register("experience")}
        error={errors.experience?.message}
      />
      <Textarea
        label="Message / Motivation"
        placeholder="Parlez-nous de vous, de votre parcours et de vos motivations..."
        {...register("message")}
        error={errors.message?.message}
      />
      <p className="font-poppins text-off-white/40 text-xs font-light">
        CV : Envoyez votre CV par email à{" "}
        <a href="mailto:recrutement@thenextevent.fr" className="text-gold hover:underline">
          recrutement@thenextevent.fr
        </a>
      </p>
      {errorMsg && (
        <p className="text-red text-sm font-light">{errorMsg}</p>
      )}
      <Button type="submit" variant="primary" disabled={isSubmitting}>
        {isSubmitting ? "Envoi en cours..." : "Envoyer ma candidature"}
      </Button>
    </form>
  );
}
