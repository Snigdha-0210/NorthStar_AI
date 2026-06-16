import { Skill } from "@/types";

export function SkillCard({ skill }: { skill: Skill }) {
  return (
    <div className="glass-card p-6 rounded-xl">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-headline-md text-base font-bold text-on-surface">{skill.name}</h3>
          <p className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider">{skill.category}</p>
        </div>
        <div className="w-8 h-8 rounded bg-primary-container/10 flex items-center justify-center text-primary-container font-bold text-sm">
          {skill.level}
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-label-md">
          <span className="text-on-surface-variant">Readiness</span>
          <span className="text-primary-container">{skill.readinessScore}%</span>
        </div>
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary-container transition-all" 
            style={{ width: `${skill.readinessScore}%` }}
          />
        </div>
      </div>
      {skill.gaps.length > 0 && (
        <div className="mt-4 pt-4 border-t border-white/5">
          <p className="font-label-md text-xs text-on-surface-variant mb-2 uppercase">Key Gaps</p>
          <div className="flex flex-wrap gap-2">
            {skill.gaps.map(gap => (
              <span key={gap} className="font-label-sm text-[10px] px-2 py-1 bg-error/10 text-error rounded-md">
                {gap}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
