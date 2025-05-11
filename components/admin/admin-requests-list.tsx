"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"
import type { RequestWithUser } from "@/lib/types"
import { updateRequestStatus } from "@/lib/actions/requests"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

interface AdminRequestsListProps {
  requests: RequestWithUser[]
}

export function AdminRequestsList({ requests }: AdminRequestsListProps) {
  const router = useRouter()

  const handleApprove = async (requestId: string) => {
    try {
      await updateRequestStatus({
        requestId,
        status: "APPROVED",
      })
      toast({
        title: "Request approved",
        description: "The request has been approved successfully.",
      })
      router.refresh()
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "The request could not be approved. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleReject = async (requestId: string) => {
    try {
      await updateRequestStatus({
        requestId,
        status: "REJECTED",
      })
      toast({
        title: "Request rejected",
        description: "The request has been rejected successfully.",
      })
      router.refresh()
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "The request could not be rejected. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending Requests</CardTitle>
      </CardHeader>
      <CardContent>
        {requests.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Tool/Service</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Requested</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{request.user.name}</TableCell>
                  <TableCell>{request.toolName}</TableCell>
                  <TableCell>${request.amount.toFixed(2)}</TableCell>
                  <TableCell>{formatDate(request.createdAt)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleApprove(request.id)}>
                        Approve
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleReject(request.id)}>
                        Reject
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-sm text-muted-foreground">There are no pending requests.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
