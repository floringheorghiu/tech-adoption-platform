import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getPendingRequests } from "@/lib/data/requests"
import { AdminRequestsList } from "@/components/admin/admin-requests-list"
import { BudgetOverview } from "@/components/admin/budget-overview"

export async function AdminDashboard() {
  const pendingRequests = await getPendingRequests()

  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="requests">Pending Requests</TabsTrigger>
        <TabsTrigger value="budget">Budget</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingRequests.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Budget Allocated</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12,500.00</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Experiences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">New request submitted</p>
                    <p className="text-sm text-muted-foreground">John Doe requested $99 for Figma</p>
                  </div>
                  <div className="ml-auto font-medium">Just now</div>
                </div>
                <div className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Experience shared</p>
                    <p className="text-sm text-muted-foreground">Jane Smith shared her experience with Notion</p>
                  </div>
                  <div className="ml-auto font-medium">2 hours ago</div>
                </div>
                <div className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Request approved</p>
                    <p className="text-sm text-muted-foreground">You approved Mike Johnson's request for AWS</p>
                  </div>
                  <div className="ml-auto font-medium">Yesterday</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Popular Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Figma</p>
                    <p className="text-sm text-muted-foreground">8 experiences shared</p>
                  </div>
                  <div className="ml-auto font-medium">⭐⭐⭐⭐⭐</div>
                </div>
                <div className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Notion</p>
                    <p className="text-sm text-muted-foreground">6 experiences shared</p>
                  </div>
                  <div className="ml-auto font-medium">⭐⭐⭐⭐</div>
                </div>
                <div className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">AWS</p>
                    <p className="text-sm text-muted-foreground">4 experiences shared</p>
                  </div>
                  <div className="ml-auto font-medium">⭐⭐⭐⭐</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="requests" className="space-y-4">
        <AdminRequestsList requests={pendingRequests} />
      </TabsContent>
      <TabsContent value="budget" className="space-y-4">
        <BudgetOverview />
      </TabsContent>
    </Tabs>
  )
}
