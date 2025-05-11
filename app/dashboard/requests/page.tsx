import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { RequestsList } from "@/components/dashboard/requests-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getUserRequests } from "@/lib/data/requests"

export default async function RequestsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/api/auth/signin")
  }

  const requests = await getUserRequests(session.user.id)

  return (
    <DashboardShell>
      <DashboardHeader heading="Trial Requests" text="Manage your tech trial requests and track their status.">
        <Link href="/dashboard/requests/new">
          <Button>New Request</Button>
        </Link>
      </DashboardHeader>
      <RequestsList requests={requests} />
    </DashboardShell>
  )
}
