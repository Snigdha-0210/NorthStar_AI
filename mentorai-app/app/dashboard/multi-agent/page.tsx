"use client";
import { useAppStore } from "@/store/useAppStore";
import { AgentCard } from "@/components/features/AgentCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Agent } from "@/types";

export default function MultiAgentPage() {
  const { agents } = useAppStore();

  const handleInteract = (agent: Agent) => {
    toast.success(`Started session with ${agent.name}`);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Multi-Agent Workspace</h1>
          <p className="text-muted-foreground">Collaborate with specialized AI agents to accelerate your career.</p>
        </div>
        <Button className="gap-2"><Plus className="h-4 w-4" /> Create Custom Agent</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} onInteract={handleInteract} />
        ))}
      </div>
    </div>
  );
}
