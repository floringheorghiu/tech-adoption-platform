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
            <AvatarImage src={experience.user.image || ""} />
            <AvatarFallback>{experience.user.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <div>
              <Link href={`/dashboard/experiences/${experience.id}`} className="font-semibold hover:underline">
                {experience.title}
              </Link>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>{experience.user.name}</span>
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
              {experience.tags.map((tag) => (
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
            <span>{experience.upvotes}</span>
          </Button>
          <Button variant="ghost" size="sm" className="h-8 gap-1">
            <MessageSquare className="h-4 w-4" />
            <span>{experience.comments}</span>
          </Button>
          <Button variant="ghost" size="sm" className="h-8">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
