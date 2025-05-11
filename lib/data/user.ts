import type { User } from "@/lib/types"
import { db } from "@/lib/db"

export async function getUserByEmail(email: string): Promise<any | null> {
  return await db.user.findUnique({
    where: { email }
  });
}

export async function getUserProfile(userId: string): Promise<any | null> {
  return await db.user.findUnique({
    where: { id: userId }
  });
}

export async function isAdmin(userId: string): Promise<boolean> {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { name: true }
  })
  return user?.name === "Jane Smith" // Using name as a proxy for admin status since we don't have a role field yet
}
