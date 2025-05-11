import type { RequestWithUser } from "@/lib/types"

// Mock data for demo purposes
const mockRequests: RequestWithUser[] = [
  {
    id: "1",
    userId: "1",
    toolName: "Figma",
    amount: 99,
    justification: "Need for UI/UX design work",
    goals: "Create better prototypes for our products",
    status: "PENDING",
    createdAt: new Date(),
    updatedAt: new Date(),
    user: {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      image: null,
    },
  },
  {
    id: "2",
    userId: "1",
    toolName: "AWS",
    amount: 150,
    justification: "Cloud infrastructure exploration",
    goals: "Learn about serverless architecture",
    status: "APPROVED",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    user: {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      image: null,
    },
  },
  {
    id: "3",
    userId: "2",
    toolName: "Notion",
    amount: 120,
    justification: "Need for better documentation",
    goals: "Improve team collaboration",
    status: "APPROVED",
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
    user: {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      image: null,
    },
  },
]

export async function getUserRequests(userId: string): Promise<RequestWithUser[]> {
  // In a real app, this would query the database
  return mockRequests.filter((request) => request.userId === userId)
}

export async function getPendingRequests(): Promise<RequestWithUser[]> {
  // In a real app, this would query the database
  return mockRequests.filter((request) => request.status === "PENDING")
}

export async function getApprovedRequests(userId: string): Promise<{ id: string; toolName: string }[]> {
  // In a real app, this would query the database
  return mockRequests
    .filter((request) => request.userId === userId && request.status === "APPROVED")
    .map((request) => ({
      id: request.id,
      toolName: request.toolName,
    }))
}
