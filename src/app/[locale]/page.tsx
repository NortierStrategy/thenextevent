import dynamic from "next/dynamic";
import { getDictionary, type Locale } from "@/lib/i18n";
import Hero from "@/components/sections/Hero";
import EventTicker from "@/components/sections/EventTicker";
import Stats from "@/components/sections/Stats";
import Expertises from "@/components/sections/Expertises";
import Clients from "@/components/sections/Clients";
import Realisations from "@/components/sections/Realisations";

const SectionSkeleton = () => <div className="py-20"><div className="max-w-[1200px] mx-auto px-8"><div className="h-8 w-48 bg-dark rounded mb-8 mx-auto animate-pulse" /><div className="grid grid-cols-1 sm:grid-cols-3 gap-4">{[1,2,3].map(i => <div key={i} className="h-48 bg-dark rounded animate-pulse" />)}</div></div></div>;
const Metiers = dynamic(() => import("@/components/sections/Metiers"), { loading: SectionSkeleton });
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"), { loading: () => <div className="py-16 bg-dark"><div className="h-32 max-w-[600px] mx-auto bg-dark/50 rounded animate-pulse" /></div> });
const Contact = dynamic(() => import("@/components/sections/Contact"), { loading: SectionSkeleton });

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
      <Realisations dict={dict} locale={locale} />
      <Metiers dict={dict} locale={locale} />
      <Testimonials dict={dict} />
      <Contact dict={dict} locale={locale} />
    </>
  );
}
