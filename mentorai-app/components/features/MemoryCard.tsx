import { Memory } from "@/types";

export function MemoryCard({ memory }: { memory: Memory }) {
  return (
    <div className="glass-card p-6 rounded-xl">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-headline-md text-base font-bold text-on-surface">{memory.title}</h3>
        <span className="font-label-sm text-xs text-on-surface-variant uppercase bg-white/5 px-2 py-1 rounded">
          {memory.type}
        </span>
      </div>
      <p className="font-label-md text-xs text-on-surface-variant mb-4">{new Date(memory.date).toLocaleDateString()}</p>
      <p className="font-body-md text-sm text-on-surface-variant mb-4">{memory.content}</p>
      
      {memory.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {memory.tags.map(tag => (
            <span key={tag} className="font-label-sm text-[10px] px-2 py-1 bg-white/5 text-on-surface-variant rounded-md border border-white/5">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
