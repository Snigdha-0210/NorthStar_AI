import { Agent } from "@/types";

interface AgentCardProps {
  agent: Agent;
  onInteract: (agent: Agent) => void;
}

export function AgentCard({ agent, onInteract }: AgentCardProps) {
  return (
    <div className="glass-card p-6 rounded-xl flex flex-col group relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4">
        <div className={`w-2 h-2 rounded-full ${agent.status === 'active' ? 'bg-tertiary animate-pulse' : 'bg-on-surface-variant'}`} />
      </div>
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-primary-container/10 flex items-center justify-center text-primary-container shrink-0">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
        </div>
        <div>
          <h3 className="font-headline-md text-base font-bold">{agent.name}</h3>
          <p className="font-label-sm text-xs text-primary-container uppercase tracking-wider">{agent.role}</p>
        </div>
      </div>
      <p className="font-body-md text-sm text-on-surface-variant mb-6 flex-1">{agent.description}</p>
      
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {agent.capabilities.slice(0, 2).map((cap) => (
            <span key={cap} className="font-label-sm text-[10px] px-2 py-1 bg-white/5 rounded-md text-on-surface-variant">
              {cap}
            </span>
          ))}
          {agent.capabilities.length > 2 && (
            <span className="font-label-sm text-[10px] px-2 py-1 bg-white/5 rounded-md text-on-surface-variant">
              +{agent.capabilities.length - 2}
            </span>
          )}
        </div>
        <button 
          onClick={() => onInteract(agent)}
          className="w-full bg-white/5 hover:bg-primary-container hover:text-on-primary-container text-on-surface font-bold py-2 rounded-lg text-sm transition-colors border border-white/10"
        >
          Interact
        </button>
      </div>
    </div>
  );
}
