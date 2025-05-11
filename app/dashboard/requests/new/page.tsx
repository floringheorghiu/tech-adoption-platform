import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { NewRequestForm } from "@/components/dashboard/new-request-form"
import { getUserProfile } from "@/lib/data/user"

export default async function NewRequestPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/api/auth/signin")
  }

  const userProfile = await getUserProfile(session.user.id)

  return (
    <DashboardShell>
      <DashboardHeader heading="New Trial Request" text="Request budget allocation for a new tech tool or service." />
      <div className="grid gap-8">
        <NewRequestForm userId={session.user.id} remainingBudget={userProfile?.remainingBudget || 0} />
      </div>
    </DashboardShell>
  )
}
