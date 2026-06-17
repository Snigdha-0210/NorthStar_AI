"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle, Clock, BookOpen, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DynamicRoadmapCanvas({ roadmap }: { roadmap: any }) {
  if (!roadmap) return null;

  return (
    <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">{roadmap.title}</h2>
        <p className="text-white/60">{roadmap.description}</p>
      </div>

      <div className="space-y-12 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-blue-500 before:via-purple-500 before:to-transparent">
        {roadmap.stages?.map((stage: any, stageIdx: number) => (
          <div key={stage.name} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-black bg-blue-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 text-white font-bold z-10">
              {stageIdx + 1}
            </div>
            
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-2xl bg-white/5 border border-white/10 shadow-xl transition-all hover:bg-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-xl text-white">{stage.name} Stage</h3>
                <span className="text-xs font-semibold px-3 py-1 bg-white/10 text-white rounded-full">
                  ~{stage.expected_duration_days} days
                </span>
              </div>
              
              <div className="space-y-4">
                {stage.milestones?.map((milestone: any, mIdx: number) => (
                  <div key={mIdx} className="bg-black/40 p-4 rounded-xl border border-white/5">
                    <div className="flex items-start gap-3">
                      {milestone.status === 'completed' ? (
                        <CheckCircle2 className="text-green-500 shrink-0 mt-1" size={18} />
                      ) : (
                        <Circle className="text-white/30 shrink-0 mt-1" size={18} />
                      )}
                      <div>
                        <h4 className="text-white font-medium">{milestone.title}</h4>
                        <p className="text-white/50 text-sm mt-1">{milestone.description}</p>
                        <div className="flex items-center gap-4 mt-3">
                          <span className="flex items-center text-xs text-white/40">
                            <Clock size={12} className="mr-1" /> {milestone.estimated_hours}h
                          </span>
                          {milestone.recommended_resources && (
                            <Button variant="link" className="h-auto p-0 text-xs text-blue-400">
                              <BookOpen size={12} className="mr-1" /> View Resources
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
