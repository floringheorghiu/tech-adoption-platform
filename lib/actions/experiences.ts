"use server"

import { revalidatePath } from "next/cache"

interface CreateExperienceParams {
  userId: string
  title: string
  description: string
  requestId: string
  toolName: string
  rating: number
  feedback: string
  tags: string[]
  mediaUrl: string | null
}

export async function createExperience({
  userId,
  title,
  description,
  requestId,
  toolName,
  rating,
  feedback,
  tags,
  mediaUrl,
}: CreateExperienceParams) {
  try {
    // In a real app, this would create a record in the database
    // For demo purposes, we'll just simulate a successful creation

    // Simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    revalidatePath("/dashboard/experiences")
    revalidatePath("/dashboard")
    return { success: true }
  } catch (error) {
    return { success: false, error }
  }
}
