import { Opportunity } from "@/types";

export function OpportunityCard({ opportunity }: { opportunity: Opportunity }) {
  return (
    <div className="glass-card p-6 rounded-xl group relative overflow-hidden transition-all hover:orange-glow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-headline-md text-base font-bold text-on-surface">{opportunity.title}</h3>
          <p className="font-body-md text-sm text-primary-container">{opportunity.company}</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-primary-container/10 flex items-center justify-center border border-primary-container/20 shrink-0">
          <span className="font-label-sm text-xs font-bold text-primary-container">{opportunity.matchScore}%</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4 text-xs text-on-surface-variant mb-4 font-label-md uppercase">
        <span className="flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">location_on</span>
          {opportunity.location}
        </span>
        <span className="flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">work</span>
          {opportunity.type}
        </span>
      </div>

      <p className="font-body-md text-sm text-on-surface-variant mb-6 line-clamp-2">{opportunity.description}</p>

      <div className="flex flex-wrap gap-2">
        {opportunity.requirements.slice(0, 3).map(req => (
          <span key={req} className="font-label-sm text-[10px] px-2 py-1 bg-white/5 rounded-md text-on-surface-variant border border-white/5">
            {req}
          </span>
        ))}
      </div>
    </div>
  );
}
