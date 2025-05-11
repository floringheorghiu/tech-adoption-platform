import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import type { RequestWithUser } from "@/lib/types"

interface RequestsListProps {
  requests: any[]
  isAdmin?: boolean
}

export function RequestsList({ requests, isAdmin }: RequestsListProps) {
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
              {requests.map((request, idx) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{request.toolName}</TableCell>
                  <TableCell>${request.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        request.status === "APPROVED"
                          ? "default"
                          : request.status === "REJECTED"
                            ? "destructive"
                            : "outline"
                      }
                    >
                      {request.status}
                    </Badge>
                    {isAdmin && request.status !== "APPROVED" && (
                      <button
                        style={{ marginLeft: 8 }}
                        className="ml-2 px-2 py-1 text-xs rounded bg-green-600 text-white hover:bg-green-700"
                        onClick={() => {
                          // Approve in localStorage
                          const mockRequests = JSON.parse(localStorage.getItem("mockRequests") || "[]");
                          mockRequests[idx].status = "APPROVED";
                          localStorage.setItem("mockRequests", JSON.stringify(mockRequests));
                          window.location.reload();
                        }}
                      >
                        Approve
                      </button>
                    )}
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
