"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExperienceCard } from "@/components/dashboard/experience-card";
import { useEffect, useState } from "react";

export function ActivityFeed() {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    try {
      const feed = JSON.parse(localStorage.getItem("mockFeed") || "[]");
      setExperiences(feed);
    } catch (e) {
      setExperiences([]);
    }
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Feed</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {experiences.length > 0 ? (
            experiences.map((experience: any) => <ExperienceCard key={experience.id} experience={experience} />)
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-sm text-muted-foreground">No experiences have been shared yet.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
