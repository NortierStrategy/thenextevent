import { getDictionary, type Locale } from "@/lib/i18n";
import { getAllServices } from "@/data/services";
import ServicesListing from "@/components/services/ServicesListing";

export const revalidate = 86400;

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const items = getAllServices();

  return <ServicesListing items={items} dict={dict} locale={locale} />;
}
