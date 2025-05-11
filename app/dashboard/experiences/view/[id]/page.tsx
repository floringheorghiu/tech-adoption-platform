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

          {/* Show all other details */}
          <div className="mt-6">
            <h3 className="font-semibold mb-2">All Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
              {Object.entries(experience)
                .filter(([key]) => !["id","userId","userEmail","userName","tags","title","description","rating"].includes(key))
                .map(([key, value]) => (
                  <div key={key} className="flex flex-col">
                    <span className="text-xs text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                    <span className="text-sm break-all">{typeof value === "object" ? JSON.stringify(value) : String(value)}</span>
                  </div>
                ))}
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Comment Section */}
      <div className="mt-8 max-w-2xl mx-auto p-4 bg-muted rounded">
        <h3 className="font-semibold mb-2">Comments</h3>
        <CommentSection experienceId={id} />
      </div>
    </div>
  );
}

function CommentSection({ experienceId }: { experienceId: string }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(`comments:${experienceId}`) || "[]");
      setComments(Array.isArray(saved) ? saved : []);
    } catch { setComments([]); }
  }, [experienceId]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = comment.trim();
    if (!trimmed) return;
    const updated = [...comments, trimmed];
    setComments(updated);
    localStorage.setItem(`comments:${experienceId}`, JSON.stringify(updated));
    setComment("");
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-4">
        <textarea
          className="border rounded p-2 min-h-[60px] bg-background"
          value={comment}
          onChange={e => setComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <button
          type="submit"
          className="self-end px-4 py-1 rounded bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Submit
        </button>
      </form>
      <div className="space-y-2">
        {comments.length === 0 && <div className="text-xs text-muted-foreground">No comments yet.</div>}
        {comments.map((c, i) => (
          <div key={i} className="p-2 rounded bg-background border text-sm">{c}</div>
        ))}
      </div>
    </div>
  );
}
