"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 flex">
      <Link href="/dashboard" className="mr-6 flex items-center space-x-2">
        <span className="hidden font-bold sm:inline-block">Hack The Future</span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link
          href="/dashboard"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/dashboard" ? "text-foreground" : "text-foreground/60",
          )}
        >
          Dashboard
        </Link>
        <Link
          href="/dashboard/requests"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/dashboard/requests") ? "text-foreground" : "text-foreground/60",
          )}
        >
          Requests
        </Link>
        <Link
          href="/dashboard/experiences"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/dashboard/experiences") ? "text-foreground" : "text-foreground/60",
          )}
        >
          Experiences
        </Link>
      </nav>
    </div>
  )
}
