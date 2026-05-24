import { redirect } from "next/navigation";
import { MedicalDisclaimer } from "@/components/MedicalDisclaimer";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { UploadDropzone } from "@/components/UploadDropzone";
import { getCurrentUser } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function UploadPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth?next=/upload");
  }

  return (
    <main className="page-shell">
      <SiteHeader />
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <UploadDropzone />
        <div className="mt-8">
          <MedicalDisclaimer compact />
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
