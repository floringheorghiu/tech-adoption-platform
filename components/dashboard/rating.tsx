"use client"

import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface RatingProps {
  value: number
  onChange: (value: number) => void
}

export function Rating({ value, onChange }: RatingProps) {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button key={star} type="button" onClick={() => onChange(star)} className="focus:outline-none">
          <Star
            className={cn("h-6 w-6", star <= value ? "fill-primary text-primary" : "fill-muted text-muted-foreground")}
          />
        </button>
      ))}
    </div>
  )
}
