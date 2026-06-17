"use client";

import { motion } from "framer-motion";
import { TrendingUp, Target, Briefcase, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Match {
  career_domain: string;
  match_score: number;
  growth_potential: number;
  suitability_analysis: string;
}

export function CareerMatchDashboard({ matches, onSelect }: { matches: Match[], onSelect: (m: Match) => void }) {
  if (!matches || matches.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <Target className="text-blue-400" /> Career Matches
          </h2>
          <p className="text-white/60 mt-2">Based on your unique Career DNA Profile</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {matches.map((match, index) => (
          <motion.div
            key={match.career_domain}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group relative p-1 rounded-3xl bg-gradient-to-b from-white/10 to-transparent overflow-hidden"
          >
            {/* Animated border effect */}
            {index === 0 && (
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 opacity-20 blur-xl animate-pulse" />
            )}
            
            <div className="relative h-full bg-black/60 backdrop-blur-xl p-6 rounded-[22px] border border-white/5 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl">
                    <Briefcase size={24} />
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                      {(match.match_score * 100).toFixed(0)}%
                    </div>
                    <div className="text-xs text-white/50 uppercase tracking-wider font-semibold">Match</div>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">{match.career_domain}</h3>
                <p className="text-sm text-white/70 line-clamp-3 mb-6">
                  {match.suitability_analysis}
                </p>
                
                <div className="flex items-center gap-2 text-sm text-green-400 font-medium mb-8">
                  <TrendingUp size={16} /> 
                  High Growth Potential
                </div>
              </div>
              
              <Button 
                onClick={() => onSelect(match)}
                className={`w-full py-6 rounded-xl border-0 transition-all ${
                  index === 0 
                    ? 'bg-white text-black hover:bg-gray-200 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <Zap className="mr-2" size={16} /> Generate Roadmap
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
