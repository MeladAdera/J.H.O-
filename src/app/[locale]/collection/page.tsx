import { setRequestLocale } from "next-intl/server";
import { CollectionJourney } from "@/components/collection/CollectionJourney";

export default async function CollectionPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return <CollectionJourney />;
}
