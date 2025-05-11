import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { AdminRequestsList } from "@/components/admin/admin-requests-list"
import { isAdmin } from "@/lib/data/user"
import { getPendingRequests } from "@/lib/data/requests"

export default async function AdminRequestsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/api/auth/signin")
  }

  const admin = await isAdmin(session.user.id)

  if (!admin) {
    redirect("/dashboard")
  }

  const pendingRequests = await getPendingRequests()

  return (
    <DashboardShell>
      <DashboardHeader heading="Pending Requests" text="Review and approve budget allocation requests." />
      <AdminRequestsList requests={pendingRequests} />
    </DashboardShell>
  )
}
