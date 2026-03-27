/* eslint-disable react/no-unescaped-entities */
"use client";

import { useParams } from "next/navigation";
import Section from "@/components/ui/Section";

export default function MentionsLegalesPage() {
  const params = useParams();
  const isEn = params.locale === "en";

  return (
    <>
      <section className="relative pt-40 pb-10 px-8 bg-black">
        <div className="max-w-[800px] mx-auto text-center">
          <h1 className="font-playfair text-[clamp(32px,5vw,56px)] font-light text-text leading-tight">
            {isEn ? "Legal Notice" : "Mentions Légales"}
          </h1>
        </div>
      </section>

      <Section>
        <div className="max-w-[800px] mx-auto space-y-10 font-outfit text-[14px] text-text/70 font-light leading-[1.9]">
          <div>
            <h2 className="font-playfair text-[22px] text-text font-normal mb-4">
              {isEn ? "Publisher" : "Éditeur du site"}
            </h2>
            <p>
              The Next Event<br />
              66 rue du Cherche-Midi, 75006 Paris, France<br />
              {isEn ? "Phone" : "Téléphone"} : +33 6 60 38 80 27<br />
              Email : contact@thenextevent.fr<br />
              {isEn ? "Director of publication" : "Directeur de la publication"} : Nicola Nortier
            </p>
          </div>

          <div>
            <h2 className="font-playfair text-[22px] text-text font-normal mb-4">
              {isEn ? "Hosting" : "Hébergement"}
            </h2>
            <p>
              Vercel Inc.<br />
              440 N Barranca Ave #4133, Covina, CA 91723, USA<br />
              https://vercel.com
            </p>
          </div>

          <div>
            <h2 className="font-playfair text-[22px] text-text font-normal mb-4">
              {isEn ? "Intellectual property" : "Propriété intellectuelle"}
            </h2>
            <p>
              {isEn
                ? "All content on this website (texts, images, logo, graphic elements) is the exclusive property of The Next Event. Any reproduction, even partial, is prohibited without prior written authorization."
                : "L'ensemble du contenu de ce site (textes, images, logo, éléments graphiques) est la propriété exclusive de The Next Event. Toute reproduction, même partielle, est interdite sans autorisation préalable écrite."}
            </p>
          </div>

          <div>
            <h2 className="font-playfair text-[22px] text-text font-normal mb-4">
              {isEn ? "Personal data" : "Données personnelles"}
            </h2>
            <p>
              {isEn
                ? "In accordance with the GDPR, you have the right to access, rectify and delete your personal data. Contact: contact@thenextevent.fr. Data collected via the contact form is used solely for processing your request and is not shared with third parties."
                : "Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles. Contact : contact@thenextevent.fr. Les données collectées via le formulaire de contact sont utilisées uniquement pour le traitement de votre demande et ne sont pas transmises à des tiers."}
            </p>
          </div>

          <div>
            <h2 className="font-playfair text-[22px] text-text font-normal mb-4">
              Cookies
            </h2>
            <p>
              {isEn
                ? "This website uses only essential technical cookies required for proper functioning. No advertising or tracking cookies are used."
                : "Ce site utilise uniquement des cookies techniques essentiels au bon fonctionnement. Aucun cookie publicitaire ou de traçage n'est utilisé."}
            </p>
          </div>

          <div className="pt-6 border-t border-red/[0.08]">
            <p className="text-text-muted text-[12px]">
              {isEn ? "Last updated: March 2026" : "Dernière mise à jour : Mars 2026"}
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
