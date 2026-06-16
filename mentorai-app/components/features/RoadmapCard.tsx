import { RoadmapItem } from "@/types";

interface RoadmapCardProps {
  item: RoadmapItem;
  onStatusChange: (id: string, status: RoadmapItem["status"]) => void;
}

export function RoadmapCard({ item, onStatusChange }: RoadmapCardProps) {
  return (
    <div className={`glass-card p-6 rounded-xl border-l-4 ${
      item.status === 'completed' ? 'border-l-tertiary opacity-70' :
      item.status === 'in_progress' ? 'border-l-primary-container orange-glow' :
      'border-l-surface-container-highest'
    }`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-headline-md text-base font-bold text-on-surface mb-1">{item.title}</h3>
          <p className="font-body-md text-sm text-on-surface-variant line-clamp-2">{item.description}</p>
        </div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
          item.status === 'completed' ? 'bg-tertiary text-on-tertiary' :
          item.status === 'in_progress' ? 'bg-primary-container/20 text-primary-container' :
          'bg-surface-container-highest text-on-surface-variant'
        }`}>
          <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            {item.status === 'completed' ? 'check' : item.status === 'in_progress' ? 'play_arrow' : 'schedule'}
          </span>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-6">
        <span className="font-label-md text-xs uppercase tracking-widest text-on-surface-variant">
          Est. {item.estimatedHours}h
        </span>
        <select 
          value={item.status}
          onChange={(e) => onStatusChange(item.id, e.target.value as RoadmapItem["status"])}
          className="bg-surface-container-highest border border-white/5 text-on-surface text-xs rounded px-2 py-1 outline-none font-label-sm"
        >
          <option value="not_started">Not Started</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>
  );
}
