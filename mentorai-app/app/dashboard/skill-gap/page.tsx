"use client";
import { useAppStore } from "@/store/useAppStore";
import { SkillCard } from "@/components/features/SkillCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function SkillGapPage() {
  const { skills } = useAppStore();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Skill Gap Analyzer</h1>
          <p className="text-muted-foreground">Identify and bridge the gap between your current skills and target roles.</p>
        </div>
        <Button className="gap-2"><Plus className="h-4 w-4" /> Add Skill</Button>
      </div>

      {skills.length === 0 ? (
        <EmptyState 
          title="No skills added" 
          description="Start adding your skills to analyze gaps against your target roles."
          action={<Button variant="outline">Add Your First Skill</Button>}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map(skill => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      )}
    </div>
  );
}
