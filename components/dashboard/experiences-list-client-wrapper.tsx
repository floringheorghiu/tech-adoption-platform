"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { ExperiencesList } from "@/components/dashboard/experiences-list"

export default function ExperiencesListClientWrapper() {
  const { data: session } = useSession();
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    if (!session?.user?.id) return;
    try {
      const allExperiences = JSON.parse(localStorage.getItem("mockExperiences") || "[]");
      const filtered = allExperiences.filter((exp: any) => exp.userId === session.user.id);
      setExperiences(filtered);
    } catch (e) {
      setExperiences([]);
    }
  }, [session?.user?.id]);

  return <ExperiencesList experiences={experiences} />;
}
