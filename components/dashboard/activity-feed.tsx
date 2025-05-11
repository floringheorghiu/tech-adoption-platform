import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getRecentExperiences } from "@/lib/data/experiences"
import { ExperienceCard } from "@/components/dashboard/experience-card"

export async function ActivityFeed() {
  const experiences = await getRecentExperiences()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Feed</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {experiences.length > 0 ? (
            experiences.map((experience) => <ExperienceCard key={experience.id} experience={experience} />)
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-sm text-muted-foreground">No experiences have been shared yet.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
