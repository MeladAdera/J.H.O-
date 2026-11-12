import { setRequestLocale } from "next-intl/server";
import { HeroExperience } from "@/components/hero/HeroExperience";
import { FirstLook } from "@/components/first-look/FirstLook";

export default async function HeroPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <HeroExperience>
      <FirstLook />
    </HeroExperience>
  );
}
