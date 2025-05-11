import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import ProfileFormClient from "@/components/dashboard/profile-form-client";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/api/auth/signin");

  // Try to get userProfile from localStorage (on server, fallback to mock)
  // But localStorage is not available on the server, so pass mock or empty/default profile
  const userProfile = {
    name: session.user.name || "",
    email: session.user.email || "",
    department: "",
    totalBudget: 1000,
    allocatedBudget: 0,
    remainingBudget: 1000,
  };

  return (
    <DashboardShell>
      <DashboardHeader heading="Profile" text="Manage your account settings." />
      <ProfileFormClient userProfile={userProfile} />
    </DashboardShell>
  );
}
