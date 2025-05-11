import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import NewExperienceFormClientWrapper from "@/components/dashboard/new-experience-form-client-wrapper"

export default async function NewExperiencePage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/api/auth/signin")
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Log New Experience" text="Share your experience with a tech tool or service." />
      <div className="grid gap-8">
        <NewExperienceFormClientWrapper />
      </div>
    </DashboardShell>
  )
}
