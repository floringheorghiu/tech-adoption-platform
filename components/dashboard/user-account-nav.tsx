"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from "next-auth/react"
import Link from "next/link"

interface UserAccountNavProps {
  user: {
    name?: string
    image?: string
    email?: string
  }
}

export function UserAccountNav({ user }: UserAccountNavProps) {
  // theme state is not needed, just read from localStorage and DOM
  function getTheme() {
    if (typeof window === "undefined") return "dark";
    return localStorage.getItem("theme") || (document.documentElement.classList.contains("dark") ? "dark" : "light");
  }
  function setTheme(theme: "light" | "dark") {
    try {
      localStorage.setItem("theme", theme);
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(theme);
    } catch (e) { console.log("Theme switch error", e); }
  }
  const theme = typeof window !== "undefined" ? getTheme() : "dark";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.image || ""} alt={user.name || ""} />
            <AvatarFallback>{user.name?.charAt(0) || user.email?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <div className="flex flex-col space-y-1 p-2">
          <p className="text-sm font-medium leading-none">{user.name}</p>
          <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard">Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer flex items-center justify-between"
          onClick={() => {
            const newTheme = getTheme() === "dark" ? "light" : "dark";
            setTheme(newTheme as "light" | "dark");
          }}
        >
          <span>Theme</span>
          <span className="ml-2 text-xs px-2 py-1 rounded bg-muted">
            {typeof window !== "undefined" ? (getTheme() === "dark" ? "☀️ Light" : "🌙 Dark") : "🌙 Dark"}
          </span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(event) => {
            event.preventDefault()
            signOut({
              callbackUrl: `${window.location.origin}/`,
            })
          }}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

