import dynamic from "next/dynamic";
import { getDictionary, type Locale } from "@/lib/i18n";
import Hero from "@/components/sections/Hero";
import EventTicker from "@/components/sections/EventTicker";
import Stats from "@/components/sections/Stats";
import Expertises from "@/components/sections/Expertises";
import Clients from "@/components/sections/Clients";
import Realisations from "@/components/sections/Realisations";

const Metiers = dynamic(() => import("@/components/sections/Metiers"));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"));
const Contact = dynamic(() => import("@/components/sections/Contact"));

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <Hero dict={dict} locale={locale} />
      <EventTicker />
      <Stats dict={dict} />
      <Expertises dict={dict} locale={locale} />
      <Clients dict={dict} />
      <Realisations dict={dict} />
      <Metiers dict={dict} locale={locale} />
      <Testimonials dict={dict} />
      <Contact dict={dict} locale={locale} />
    </>
  );
}
