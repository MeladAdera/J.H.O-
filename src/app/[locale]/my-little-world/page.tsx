import { setRequestLocale } from "next-intl/server";
import { WorldHeader } from "@/components/world/WorldHeader";
import { OriginRoom } from "@/components/world/OriginRoom";
import { ArchivePlates } from "@/components/world/ArchivePlates";
import { SiteFooter } from "@/components/shared/SiteFooter";

export default async function MyLittleWorldPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <div data-skin="world" className="flex min-h-screen flex-1 flex-col bg-ground text-ink">
      <WorldHeader />
      <main className="flex-1">
        <OriginRoom />
        <ArchivePlates />
      </main>
      <SiteFooter />
    </div>
  );
}
