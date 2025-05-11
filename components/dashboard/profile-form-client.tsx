"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ProfileFormClient({ userProfile }: { userProfile: any }) {
  const [profile, setProfile] = useState(userProfile || { name: "", email: "", department: "", totalBudget: 0, allocatedBudget: 0, remainingBudget: 0 });
  const [success, setSuccess] = useState(false);

  // On mount, load from localStorage if available
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("mockUserProfile") || "null");
      if (stored) setProfile(stored);
    } catch {}
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.id]: e.target.value });
  };

  const handleUpdate = () => {
    localStorage.setItem("mockUserProfile", JSON.stringify(profile));
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <div className="grid gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={profile.name} onChange={handleChange} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={profile.email} onChange={handleChange} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="department">Department</Label>
            <Input id="department" value={profile.department} onChange={handleChange} />
          </div>
          <Button onClick={handleUpdate}>Update Profile</Button>
          {success && <div className="text-green-600 text-sm pt-2">Profile updated!</div>}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Budget Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="totalBudget">Total Budget</Label>
            <Input id="totalBudget" value={`$${Number(profile.totalBudget).toFixed(2)}`} readOnly />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="allocatedBudget">Allocated Budget</Label>
            <Input id="allocatedBudget" value={`$${Number(profile.allocatedBudget).toFixed(2)}`} readOnly />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="remainingBudget">Remaining Budget</Label>
            <Input id="remainingBudget" value={`$${Number(profile.remainingBudget).toFixed(2)}`} readOnly />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
