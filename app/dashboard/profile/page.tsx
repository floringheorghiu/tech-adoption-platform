import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { getUserProfile } from "@/lib/data/user"

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/api/auth/signin")
  }

  const userProfile = await getUserProfile(session.user.id)

  return (
    <DashboardShell>
      <DashboardHeader heading="Profile" text="Manage your account settings." />
      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue={userProfile?.name || ""} readOnly />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={userProfile?.email || ""} readOnly />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="department">Department</Label>
              <Input id="department" defaultValue={userProfile?.department || ""} readOnly />
            </div>
            <Button disabled>Update Profile</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Budget Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="totalBudget">Total Budget</Label>
              <Input id="totalBudget" defaultValue={`$${userProfile?.totalBudget.toFixed(2)}`} readOnly />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="allocatedBudget">Allocated Budget</Label>
              <Input id="allocatedBudget" defaultValue={`$${userProfile?.allocatedBudget.toFixed(2)}`} readOnly />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="remainingBudget">Remaining Budget</Label>
              <Input id="remainingBudget" defaultValue={`$${userProfile?.remainingBudget.toFixed(2)}`} readOnly />
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
