import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { isAdmin } from "@/lib/data/user"

export default async function AdminPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/api/auth/signin")
  }

  const admin = await isAdmin(session.user.id)

  if (!admin) {
    redirect("/dashboard")
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Admin Dashboard" text="Manage budget requests and platform settings." />
      <AdminDashboard />
    </DashboardShell>
  )
}
