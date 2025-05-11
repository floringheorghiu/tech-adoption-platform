import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ExperienceWithUser } from "@/lib/types"
import { ExperienceCard } from "@/components/dashboard/experience-card"

interface ExperiencesListProps {
  experiences: ExperienceWithUser[]
}

export function ExperiencesList({ experiences }: ExperiencesListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Experiences</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {experiences.length > 0 ? (
            experiences.map((experience) => <ExperienceCard key={experience.id} experience={experience} />)
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-sm text-muted-foreground">You haven't shared any experiences yet.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
