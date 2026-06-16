"use client";
import { Button } from "@/components/ui/button";
import { Zap, Play } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";

export default function CareerExecutionPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Career Execution Center</h1>
          <p className="text-muted-foreground">Automate applications, networking, and skill building.</p>
        </div>
        <Button className="gap-2"><Zap className="h-4 w-4" /> Create Workflow</Button>
      </div>

      <EmptyState 
        title="No active workflows" 
        description="Set up automated routines like applying to 5 matching jobs weekly or reaching out to 2 mentors."
        icon={<Play className="h-6 w-6" />}
        action={<Button variant="outline">Browse Templates</Button>}
      />
    </div>
  );
}
