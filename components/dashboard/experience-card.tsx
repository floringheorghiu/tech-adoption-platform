"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { formatDistanceToNow } from "date-fns"
import { ThumbsUp, MessageSquare, Share2 } from "lucide-react"
import Link from "next/link"
import type { ExperienceWithUser } from "@/lib/types"

interface ExperienceCardProps {
  experience: ExperienceWithUser
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <Avatar>
            <AvatarImage src={experience.user?.image || "/default-avatar.png"} />
            <AvatarFallback>{experience.user?.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <div>
              <Link href={`/dashboard/experiences/${experience.id}`} className="font-semibold hover:underline">
                {experience.title}
              </Link>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>{experience.user?.name || "User"}</span>
                <span>•</span>
                <span>
                  {formatDistanceToNow(new Date(experience.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-3">{experience.description}</p>
            <div className="flex flex-wrap gap-2 pt-2">
              {(Array.isArray(experience.tags)
                ? experience.tags
                : typeof experience.tags === "string" && experience.tags.length > 0
                  ? experience.tags.split(",").map((t: string) => t.trim())
                  : []
              ).map((tag: string) => (
                <span key={tag} className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
                  {tag}
                </span>
              ))}
            </div>
            {experience.mediaUrl && (
              <div className="mt-2 rounded-md border">
                <img src={experience.mediaUrl || "/placeholder.svg"} alt="Experience media" className="rounded-md" />
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t p-4">
        <div className="flex space-x-4">
          <Button variant="ghost" size="sm" className="h-8 gap-1">
            <ThumbsUp className="h-4 w-4" />
            <span>{experience.upvotes ?? 0}</span>
          </Button>
          <Button variant="ghost" size="sm" className="h-8 gap-1">
            <MessageSquare className="h-4 w-4" />
            <span>{experience.comments ?? 0}</span>
          </Button>
          {/* Share Button */}
          <Button variant="outline" size="sm" className="h-8" onClick={() => {
            try {
              const feed = JSON.parse(localStorage.getItem("mockFeed") || "[]");
              if (!feed.find((item: any) => item.id === experience.id)) {
                localStorage.setItem("mockFeed", JSON.stringify([...feed, experience]));
                window.alert("Shared to feed!");
              } else {
                window.alert("Already in feed.");
              }
            } catch (e) { window.alert("Error sharing experience."); }
          }}>
            Share
          </Button>
          {/* Edit Button */}
          <Button variant="outline" size="sm" className="h-8" onClick={() => {
            window.location.href = `/dashboard/experiences/edit/${experience.id}`;
          }}>
            Edit
          </Button>
          {/* Delete Button */}
          <Button variant="destructive" size="sm" className="h-8" onClick={() => {
            if (window.confirm("Are you sure you want to delete this experience?")) {
              try {
                const all = JSON.parse(localStorage.getItem("mockExperiences") || "[]");
                const filtered = all.filter((exp: any) => exp.id !== experience.id);
                localStorage.setItem("mockExperiences", JSON.stringify(filtered));
                window.location.reload();
              } catch (e) { window.alert("Error deleting experience."); }
            }
          }}>
            Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
