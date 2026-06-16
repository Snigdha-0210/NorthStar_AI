"use client";
import { useAppStore } from "@/store/useAppStore";
import { Button } from "@/components/ui/button";
import { RefreshCcw, UserCircle } from "lucide-react";
import { StatCard } from "@/components/features/StatCard";

export default function CareerTwinPage() {
  const { user } = useAppStore();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Digital Career Twin</h1>
          <p className="text-muted-foreground">Your AI replica mirroring your professional identity and capabilities.</p>
        </div>
        <Button className="gap-2"><RefreshCcw className="h-4 w-4" /> Sync Data</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded-xl p-8 bg-card flex flex-col items-center text-center space-y-4">
          <div className="h-32 w-32 rounded-full border-4 border-primary/20 flex items-center justify-center bg-primary/5">
            <UserCircle className="h-16 w-16 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{user?.name}&apos;s Twin</h2>
            <p className="text-muted-foreground">Status: Fully Synced</p>
          </div>
          <p className="text-sm max-w-sm">This AI model represents your current skills, experience, and working style. It can simulate interviews and test job fits on your behalf.</p>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Twin Parameters</h3>
          <div className="grid grid-cols-2 gap-4">
            <StatCard title="Knowledge Base" value="4,250" icon={<UserCircle className="h-4 w-4"/>} description="Data points" />
            <StatCard title="Accuracy" value="98%" icon={<UserCircle className="h-4 w-4"/>} />
            <StatCard title="Simulations Run" value="14" icon={<UserCircle className="h-4 w-4"/>} />
            <StatCard title="Last Sync" value="2h ago" icon={<UserCircle className="h-4 w-4"/>} />
          </div>
        </div>
      </div>
    </div>
  );
}
