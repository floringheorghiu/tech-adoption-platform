import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getDepartmentBudgets } from "@/lib/data/budget"

export async function BudgetOverview() {
  const departmentBudgets = await getDepartmentBudgets()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Department</TableHead>
              <TableHead>Total Budget</TableHead>
              <TableHead>Allocated</TableHead>
              <TableHead>Remaining</TableHead>
              <TableHead>Usage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {departmentBudgets.map((dept) => (
              <TableRow key={dept.id}>
                <TableCell className="font-medium">{dept.name}</TableCell>
                <TableCell>${dept.totalBudget.toFixed(2)}</TableCell>
                <TableCell>${dept.allocatedBudget.toFixed(2)}</TableCell>
                <TableCell>${dept.remainingBudget.toFixed(2)}</TableCell>
                <TableCell>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div
                      className="bg-primary h-2.5 rounded-full"
                      style={{
                        width: `${(dept.allocatedBudget / dept.totalBudget) * 100}%`,
                      }}
                    ></div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
