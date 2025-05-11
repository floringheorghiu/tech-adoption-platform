"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/lib/db"

interface CreateRequestParams {
  userId: string
  toolName: string
  amount: number
  justification: string
  goals: string
}

export async function createRequest({ userId, toolName, amount, justification, goals }: CreateRequestParams) {
  try {
    // Check if user exists and has enough budget
    const user = await db.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      throw new Error("User not found")
    }

    if (user.remainingBudget < amount) {
      throw new Error("Insufficient budget")
    }

    // Create the request
    const request = await db.request.create({
      data: {
        title: toolName,
        description: justification,
        type: "TRIAL",
        priority: "MEDIUM",
        budget: amount,
        userId: userId,
      }
    })

    // Update user's remaining budget
    await db.user.update({
      where: { id: userId },
      data: {
        remainingBudget: user.remainingBudget - amount,
        allocatedBudget: user.allocatedBudget + amount
      }
    })

    revalidatePath("/dashboard/requests")
    return { success: true, request }
  } catch (error) {
    console.error("Error creating request:", error)
    return { success: false, error }
  }
}

interface UpdateRequestStatusParams {
  requestId: string
  status: "APPROVED" | "REJECTED"
}

export async function updateRequestStatus({ requestId, status }: UpdateRequestStatusParams) {
  try {
    // In a real app, this would update a record in the database
    // For demo purposes, we'll just simulate a successful update

    // Simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    revalidatePath("/admin/requests")
    revalidatePath("/dashboard/requests")
    return { success: true }
  } catch (error) {
    return { success: false, error }
  }
}
