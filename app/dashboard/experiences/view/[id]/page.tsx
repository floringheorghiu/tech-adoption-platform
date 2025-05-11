"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ExperienceViewPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params as { id: string };
  const [experience, setExperience] = useState<any>(null);
  const [creatorName, setCreatorName] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      // Try to find in mockFeed first, fallback to mockExperiences
      const feed = JSON.parse(localStorage.getItem("mockFeed") || "[]");
      let found = feed.find((exp: any) => exp.id === id);
      if (!found) {
        const all = JSON.parse(localStorage.getItem("mockExperiences") || "[]");
        found = all.find((exp: any) => exp.id === id);
      }
      setExperience(found);
      // Try to get creator profile from localStorage
      if (found) {
        let profileKey = null;
        if (found.userId) profileKey = `mockUserProfile:${found.userId}`;
        else if (found.userEmail) profileKey = `mockUserProfile:${found.userEmail}`;
        if (profileKey) {
          try {
            const prof = JSON.parse(localStorage.getItem(profileKey) || "null");
            if (prof && prof.name) setCreatorName(prof.name);
            else setCreatorName(found.userName || found.userEmail || found.userId || "User");
          } catch {
            setCreatorName(found.userName || found.userEmail || found.userId || "User");
          }
        } else {
          setCreatorName(found.userName || found.userEmail || found.userId || "User");
        }
      }
    } catch {
      setExperience(null);
      setCreatorName("");
    }
    setLoading(false);
  }, [id]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (!experience) return <div className="p-8">Experience not found.</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <button
        className="mb-4 px-4 py-2 rounded bg-muted hover:bg-muted-foreground text-sm"
        onClick={() => router.back()}
      >
        ← Back
      </button>
      <Card>
        <CardHeader>
          <CardTitle>{experience.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-2 text-muted-foreground">By: {creatorName}</div>
          <div className="mb-2">{experience.description}</div>
          <div className="flex flex-wrap gap-2 pt-2">
            {(Array.isArray(experience.tags)
              ? experience.tags
              : typeof experience.tags === "string" && (experience.tags as string).trim().length > 0
                ? (experience.tags as string).split(",").map((t: string) => t.trim())
                : []
            ).map((tag: string, i: number) => (
              <span key={tag + i} className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-4 text-sm text-muted-foreground">Rating: {experience.rating ?? "N/A"}</div>
        </CardContent>
      </Card>
    </div>
  );
}
