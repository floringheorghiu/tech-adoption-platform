"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { NewExperienceForm } from "@/components/dashboard/new-experience-form"

export default function NewExperienceFormClientWrapper() {
  const { data: session } = useSession();
  const [approvedRequests, setApprovedRequests] = useState([]);

  useEffect(() => {
    if (!session?.user?.email) return;
    try {
      const allRequests = JSON.parse(localStorage.getItem("mockRequests") || "[]");
      console.log("All mockRequests:", allRequests);
      const filtered = allRequests.filter(
        (req: any) => req.status === "APPROVED" && req.userId === session.user.id
      );
      console.log("Filtered approvedRequests:", filtered);
      setApprovedRequests(filtered);
    } catch (e) {
      setApprovedRequests([]);
    }
  }, [session?.user?.email]);

  if (!session?.user?.id) return null;

  return <NewExperienceForm userId={session.user.id} approvedRequests={approvedRequests} />;
}
