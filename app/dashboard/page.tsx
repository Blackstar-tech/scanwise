import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/DashboardShell";
import { MedicalDisclaimer } from "@/components/MedicalDisclaimer";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { isSupabaseServerConfigured } from "@/lib/env";
import { buildTrendCards } from "@/lib/report-comparison";
import { getCurrentUser } from "@/lib/supabase/server";
import { listReportsForUser, listTimelineFindings } from "@/services/reports";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth");
  }

  const [reports, findings] = isSupabaseServerConfigured()
    ? await Promise.all([listReportsForUser(user.id), listTimelineFindings(user.id)])
    : [[], []];
  const trends = buildTrendCards(findings);

  return (
    <main className="page-shell">
      <SiteHeader />
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <DashboardShell reports={reports} trends={trends} />
        <div className="mt-8">
          <MedicalDisclaimer compact />
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
