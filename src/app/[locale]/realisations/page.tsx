import { getDictionary, type Locale } from "@/lib/i18n";
import { getAllRealisations } from "@/data/realisations";
import RealisationsListing from "@/components/realisations/RealisationsListing";

export const revalidate = 86400;

export default async function RealisationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const items = getAllRealisations();

  return <RealisationsListing items={items} dict={dict} locale={locale} />;
}
