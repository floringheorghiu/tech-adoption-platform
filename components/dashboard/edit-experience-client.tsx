"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { NewExperienceForm } from "@/components/dashboard/new-experience-form";

export default function EditExperienceClient({ experienceId }: { experienceId: string }) {
  const [experience, setExperience] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const all = JSON.parse(localStorage.getItem("mockExperiences") || "[]");
      const found = all.find((exp: any) => exp.id === experienceId);
      setExperience(found);
    } catch (e) {
      setExperience(null);
    }
    setLoading(false);
  }, [experienceId]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (!experience) return <div className="p-8">Experience not found.</div>;

  // Prepopulate fields for the form
  const approvedRequests = [{
    id: experience.requestId,
    toolName: experience.toolName
  }];

  // Handler for updating experience in localStorage
  const handleSubmit = (data: any) => {
    try {
      const all = JSON.parse(localStorage.getItem("mockExperiences") || "[]");
      const idx = all.findIndex((exp: any) => exp.id === experienceId);
      if (idx !== -1) {
        all[idx] = { ...all[idx], ...data };
        localStorage.setItem("mockExperiences", JSON.stringify(all));
        alert("Experience updated!");
        router.push("/dashboard/experiences");
      }
    } catch (e) {
      alert("Error updating experience.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Experience</h2>
      <NewExperienceForm
        userId={experience.userId}
        approvedRequests={approvedRequests}
        initialValues={experience}
        onSubmitOverride={handleSubmit}
      />
    </div>
  );
}
