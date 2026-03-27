/* eslint-disable react/no-unescaped-entities */
"use client";

import { useParams } from "next/navigation";
import Section from "@/components/ui/Section";

export default function CGVPage() {
  const params = useParams();
  const isEn = params.locale === "en";

  return (
    <>
      <section className="relative pt-40 pb-10 px-8 bg-black">
        <div className="max-w-[800px] mx-auto text-center">
          <h1 className="font-playfair text-[clamp(32px,5vw,56px)] font-light text-text leading-tight">
            {isEn ? "Terms & Conditions" : "Conditions Générales de Vente"}
          </h1>
        </div>
      </section>

      <Section>
        <div className="max-w-[800px] mx-auto prose-custom">
          {isEn ? <ContentEN /> : <ContentFR />}
        </div>
      </Section>
    </>
  );
}

function ContentFR() {
  return (
    <div className="space-y-10 font-outfit text-[14px] text-text/70 font-light leading-[1.9]">
      <div>
        <h2 className="font-playfair text-[22px] text-text font-normal mb-4">
          Article 1 : Objet
        </h2>
        <p>
          Les présentes conditions générales de vente (CGV) régissent les relations contractuelles entre The Next Event, société dont le siège social est situé au 66 rue du Cherche-Midi, 75006 Paris (ci-après "le Prestataire"), et tout client professionnel ou particulier (ci-après "le Client") faisant appel à ses services de staffing événementiel, de mise à disposition de régisseurs événementiels et de logistique haut de gamme.
        </p>
      </div>

      <div>
        <h2 className="font-playfair text-[22px] text-text font-normal mb-4">
          Article 2 : Services
        </h2>
        <p>
          Le Prestataire propose des services de mise à disposition de personnel événementiel qualifié : régisseurs événementiels, directeurs techniques, chefs de projet, hôtes et hôtesses, coordinateurs, vidéastes et photographes. Les services incluent également la logistique haut de gamme, la coordination gants blancs et la direction de production pour événements de luxe.
        </p>
      </div>

      <div>
        <h2 className="font-playfair text-[22px] text-text font-normal mb-4">
          Article 3 : Devis et commande
        </h2>
        <p>
          Tout engagement du Prestataire est subordonné à l&apos;acceptation d&apos;un devis détaillé par le Client. Le devis est valable 30 jours à compter de sa date d&apos;émission. La commande est considérée comme ferme et définitive après signature du devis et versement de l&apos;acompte prévu.
        </p>
      </div>

      <div>
        <h2 className="font-playfair text-[22px] text-text font-normal mb-4">
          Article 4 : Tarifs et paiement
        </h2>
        <p>
          Les tarifs sont indiqués en euros hors taxes (HT). Le règlement s'effectue selon les modalités suivantes : un acompte de 50% à la signature du devis, le solde étant exigible à réception de la facture, dans un délai de 30 jours. Tout retard de paiement entraîne de plein droit l&apos;application de pénalités de retard au taux légal en vigueur.
        </p>
      </div>

      <div>
        <h2 className="font-playfair text-[22px] text-text font-normal mb-4">
          Article 5 : Annulation
        </h2>
        <p>
          Toute annulation doit être notifiée par écrit. En cas d'annulation par le Client : plus de 30 jours avant l'événement, l&apos;acompte est remboursé intégralement ; entre 15 et 30 jours, 50% de l&apos;acompte est retenu ; moins de 15 jours, l&apos;intégralité de l&apos;acompte est retenue. En cas d'annulation par le Prestataire, celui-ci s&apos;engage à proposer des profils de remplacement ou à procéder au remboursement intégral.
        </p>
      </div>

      <div>
        <h2 className="font-playfair text-[22px] text-text font-normal mb-4">
          Article 6 : Responsabilité
        </h2>
        <p>
          Le Prestataire s&apos;engage à fournir un service conforme aux standards de qualité haut de gamme. Sa responsabilité est limitée au montant des sommes perçues au titre de la prestation concernée. Le Prestataire ne saurait être tenu responsable en cas de force majeure, de faute du Client ou d&apos;un tiers.
        </p>
      </div>

      <div>
        <h2 className="font-playfair text-[22px] text-text font-normal mb-4">
          Article 7 : Confidentialité
        </h2>
        <p>
          Les parties s&apos;engagent à traiter de manière confidentielle l&apos;ensemble des informations échangées dans le cadre de leur collaboration. Cette obligation de confidentialité s&apos;étend au-delà de la fin de la relation contractuelle.
        </p>
      </div>

      <div>
        <h2 className="font-playfair text-[22px] text-text font-normal mb-4">
          Article 8 : Propriété intellectuelle
        </h2>
        <p>
          L'ensemble des éléments visuels, textuels et photographiques du site thenextevent.fr sont la propriété exclusive de The Next Event. Toute reproduction, même partielle, est interdite sans autorisation préalable écrite.
        </p>
      </div>

      <div>
        <h2 className="font-playfair text-[22px] text-text font-normal mb-4">
          Article 9 : Protection des données
        </h2>
        <p>
          Conformément au Règlement Général sur la Protection des Données (RGPD), le Client dispose d&apos;un droit d&apos;accès, de rectification et de suppression de ses données personnelles. Pour exercer ce droit, contacter : contact@thenextevent.fr.
        </p>
      </div>

      <div>
        <h2 className="font-playfair text-[22px] text-text font-normal mb-4">
          Article 10 : Litiges
        </h2>
        <p>
          Les présentes CGV sont soumises au droit français. En cas de litige, les parties s&apos;efforceront de trouver une solution amiable. À défaut, les tribunaux compétents de Paris seront seuls compétents.
        </p>
      </div>

      <div className="pt-6 border-t border-red/[0.08]">
        <p className="text-text-muted text-[12px]">
          Dernière mise à jour : Mars 2026
          <br />
          The Next Event, 66 rue du Cherche-Midi, 75006 Paris
          <br />
          contact@thenextevent.fr | +33 6 60 38 80 27
        </p>
      </div>
    </div>
  );
}

function ContentEN() {
  return (
    <div className="space-y-10 font-outfit text-[14px] text-text/70 font-light leading-[1.9]">
      <div>
        <h2 className="font-playfair text-[22px] text-text font-normal mb-4">
          Article 1: Purpose
        </h2>
        <p>
          These general terms and conditions govern the contractual relationships between The Next Event, with its registered office at 66 rue du Cherche-Midi, 75006 Paris, France (hereinafter "the Provider"), and any professional or private client (hereinafter "the Client") engaging its event staffing, event production management and premium logistics services.
        </p>
      </div>

      <div>
        <h2 className="font-playfair text-[22px] text-text font-normal mb-4">
          Article 2: Services
        </h2>
        <p>
          The Provider offers qualified event personnel placement services: event production managers, technical directors, project managers, hosts and hostesses, coordinators, videographers and photographers. Services also include premium event logistics, white-glove coordination and luxury event production management.
        </p>
      </div>

      <div>
        <h2 className="font-playfair text-[22px] text-text font-normal mb-4">
          Article 3: Quotes and orders
        </h2>
        <p>
          Any commitment by the Provider is subject to the Client's acceptance of a detailed quote. Quotes are valid for 30 days from the date of issue. An order is considered firm and final upon signature of the quote and payment of the required deposit.
        </p>
      </div>

      <div>
        <h2 className="font-playfair text-[22px] text-text font-normal mb-4">
          Article 4: Pricing and payment
        </h2>
        <p>
          Prices are quoted in euros excluding taxes (HT). Payment is made as follows: a 50% deposit upon quote signature, with the balance due upon receipt of invoice within 30 days. Any late payment automatically incurs late payment penalties at the prevailing legal rate.
        </p>
      </div>

      <div>
        <h2 className="font-playfair text-[22px] text-text font-normal mb-4">
          Article 5: Cancellation
        </h2>
        <p>
          Any cancellation must be notified in writing. In case of cancellation by the Client: more than 30 days before the event, the deposit is fully refunded; between 15 and 30 days, 50% of the deposit is retained; less than 15 days, the full deposit is retained. In case of cancellation by the Provider, replacement profiles will be offered or a full refund will be processed.
        </p>
      </div>

      <div>
        <h2 className="font-playfair text-[22px] text-text font-normal mb-4">
          Article 6: Liability
        </h2>
        <p>
          The Provider commits to delivering a service that meets premium quality standards. Its liability is limited to the amounts received for the relevant service. The Provider cannot be held liable in cases of force majeure, fault of the Client or a third party.
        </p>
      </div>

      <div>
        <h2 className="font-playfair text-[22px] text-text font-normal mb-4">
          Article 7: Confidentiality
        </h2>
        <p>
          Both parties commit to treating all information exchanged during their collaboration as confidential. This confidentiality obligation extends beyond the end of the contractual relationship.
        </p>
      </div>

      <div>
        <h2 className="font-playfair text-[22px] text-text font-normal mb-4">
          Article 8: Intellectual property
        </h2>
        <p>
          All visual, textual and photographic elements on the thenextevent.fr website are the exclusive property of The Next Event. Any reproduction, even partial, is prohibited without prior written authorisation.
        </p>
      </div>

      <div>
        <h2 className="font-playfair text-[22px] text-text font-normal mb-4">
          Article 9: Data protection
        </h2>
        <p>
          In accordance with the General Data Protection Regulation (GDPR), the Client has the right to access, rectify and delete their personal data. To exercise this right, contact: contact@thenextevent.fr.
        </p>
      </div>

      <div>
        <h2 className="font-playfair text-[22px] text-text font-normal mb-4">
          Article 10: Disputes
        </h2>
        <p>
          These terms and conditions are governed by French law. In the event of a dispute, the parties shall endeavour to reach an amicable solution. Failing that, the competent courts of Paris shall have exclusive jurisdiction.
        </p>
      </div>

      <div className="pt-6 border-t border-red/[0.08]">
        <p className="text-text-muted text-[12px]">
          Last updated: March 2026
          <br />
          The Next Event, 66 rue du Cherche-Midi, 75006 Paris, France
          <br />
          contact@thenextevent.fr | +33 6 60 38 80 27
        </p>
      </div>
    </div>
  );
}
