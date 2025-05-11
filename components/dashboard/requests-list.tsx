import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import type { RequestWithUser } from "@/lib/types"

interface RequestsListProps {
  requests: RequestWithUser[]
}

export function RequestsList({ requests }: RequestsListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Trial Requests</CardTitle>
      </CardHeader>
      <CardContent>
        {requests.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tool/Service</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Requested</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{request.toolName}</TableCell>
                  <TableCell>${request.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        request.status === "APPROVED"
                          ? "success"
                          : request.status === "REJECTED"
                            ? "destructive"
                            : "outline"
                      }
                    >
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(request.createdAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-sm text-muted-foreground">You haven't made any requests yet.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
