"use client";
import { useAppStore } from "@/store/useAppStore";
import { RoadmapCard } from "@/components/features/RoadmapCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/button";
import { Map } from "lucide-react";

export default function RoadmapPage() {
  const { roadmap, updateRoadmapStatus } = useAppStore();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Learning Roadmap</h1>
          <p className="text-muted-foreground">Your personalized path to mastering the required skills.</p>
        </div>
        <Button className="gap-2"><Map className="h-4 w-4" /> Generate New Path</Button>
      </div>

      {roadmap.length === 0 ? (
        <EmptyState 
          title="No roadmap found" 
          description="You don't have any learning goals set. Start by generating a new path."
          action={<Button variant="outline">Generate Path</Button>}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {roadmap.map(item => (
            <RoadmapCard 
              key={item.id} 
              item={item} 
              onStatusChange={updateRoadmapStatus} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
