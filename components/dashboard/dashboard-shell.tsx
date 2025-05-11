import type React from "react"
import { MainNav } from "@/components/dashboard/main-nav"
import { UserAccountNav } from "@/components/dashboard/user-account-nav"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

interface DashboardShellProps {
  children: React.ReactNode
}

export async function DashboardShell({ children }: DashboardShellProps) {
  const session = await getServerSession(authOptions)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4 px-4 md:px-8">
          <MainNav />
          <UserAccountNav
            user={{
              name: session?.user?.name || "",
              image: session?.user?.image || "",
              email: session?.user?.email || "",
            }}
          />
        </div>
      </header>
      <main className="flex-1 space-y-4 p-8 pt-6">
        <div className="container px-4 md:px-8">{children}</div>
      </main>
    </div>
  )
}
