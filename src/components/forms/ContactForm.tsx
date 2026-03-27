"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";

const contactSchema = z.object({
  societe: z.string().min(1, "Société requise"),
  nom: z.string().min(1, "Nom requis"),
  email: z.string().email("Email invalide"),
  telephone: z.string().min(10, "Téléphone invalide"),
  typeEvent: z.string().min(1, "Type d'événement requis"),
  date: z.string().optional(),
  lieu: z.string().optional(),
  nbPersonnel: z.string().optional(),
  message: z.string().min(10, "Message trop court (min. 10 caractères)"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    // Simulate API call
    console.log("Contact form data:", data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-16">
        <div className="text-gold text-5xl mb-6">&#10003;</div>
        <h3 className="font-cormorant text-3xl text-off-white mb-4">
          Demande envoyée
        </h3>
        <p className="font-poppins text-off-white/60 text-sm font-light">
          Nous revenons vers vous sous 24h avec une proposition personnalisée.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Société *"
          placeholder="Nom de votre entreprise"
          {...register("societe")}
          error={errors.societe?.message}
        />
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
          label="Type d'événement *"
          placeholder="Ex: Lancement produit, Gala, Conférence..."
          {...register("typeEvent")}
          error={errors.typeEvent?.message}
        />
        <Input
          label="Date souhaitée"
          type="date"
          {...register("date")}
          error={errors.date?.message}
        />
        <Input
          label="Lieu"
          placeholder="Ville ou adresse"
          {...register("lieu")}
          error={errors.lieu?.message}
        />
        <Input
          label="Nombre de personnel souhaité"
          placeholder="Ex: 5-10 personnes"
          {...register("nbPersonnel")}
          error={errors.nbPersonnel?.message}
        />
      </div>
      <Textarea
        label="Votre message *"
        placeholder="Décrivez votre projet, vos besoins, vos attentes..."
        {...register("message")}
        error={errors.message?.message}
      />
      <Button type="submit" variant="primary" disabled={isSubmitting}>
        {isSubmitting ? "Envoi en cours..." : "Envoyer la demande"}
      </Button>
    </form>
  );
}
