import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import ExperiencesListClientWrapper from "@/components/dashboard/experiences-list-client-wrapper"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function ExperiencesPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/api/auth/signin")
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Your Experiences" text="Share and manage your tech adoption experiences.">
        <Link href="/dashboard/experiences/new">
          <Button>Log New Experience</Button>
        </Link>
      </DashboardHeader>
      <ExperiencesListClientWrapper />
    </DashboardShell>
  )
}
