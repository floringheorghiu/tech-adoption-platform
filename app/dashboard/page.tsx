import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { getUserProfile } from "@/lib/data/user"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/api/auth/signin")
  }

  const userProfile = await getUserProfile(session.user.id)

  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="View the latest tech adoption experiences from your colleagues." />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-2">
          <ActivityFeed />
        </div>
        <div className="space-y-4">
          <div className="rounded-lg border p-4">
            <h3 className="text-lg font-medium">Your Training Budget</h3>
            <div className="mt-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Available</span>
                <span className="font-medium">${userProfile?.remainingBudget || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Allocated</span>
                <span className="font-medium">${userProfile?.allocatedBudget || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total</span>
                <span className="font-medium">${userProfile?.totalBudget || 0}</span>
              </div>
            </div>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="text-lg font-medium">Popular Tags</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">AI</span>
              <span className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">Productivity</span>
              <span className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">Design</span>
              <span className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">Development</span>
              <span className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">Marketing</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
