"use client";
import { useAppStore } from "@/store/useAppStore";
import { MemoryCard } from "@/components/features/MemoryCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";

export default function MemoryHubPage() {
  const { memories } = useAppStore();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Memory Hub</h1>
          <p className="text-muted-foreground">Your career timeline, achievements, and feedback curated by AI.</p>
        </div>
        <Button className="gap-2"><Brain className="h-4 w-4" /> Log New Memory</Button>
      </div>

      {memories.length === 0 ? (
        <EmptyState 
          title="No memories yet" 
          description="Start logging your achievements, course completions, and feedback."
          action={<Button variant="outline">Add Memory</Button>}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {memories.map(memory => (
            <MemoryCard key={memory.id} memory={memory} />
          ))}
        </div>
      )}
    </div>
  );
}
