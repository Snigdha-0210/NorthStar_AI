"use client";
import { useState, useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";
import { GenerateRoadmapDialog } from "@/components/features/GenerateRoadmapDialog";
import { Button } from "@/components/ui/button";
import { Map, Zap, Target, TrendingUp, BrainCircuit, CheckCircle2, Circle, Clock, ArrowRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

// Types mapping backend response
type Milestone = { title: string; description: string; estimated_hours: number; is_completed?: boolean };
type Stage = { name: string; expected_duration_days: number; milestones: Milestone[] };
type RoadmapData = { title: string; description: string; stages: Stage[] };

export default function RoadmapPage() {
  const { updateRoadmapStatus, user } = useAppStore();
  const [roadmap, setRoadmap] = useState<RoadmapData | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    fetchActiveRoadmap();
  }, []);

  const fetchActiveRoadmap = async () => {
    try {
      const parsedUserId = parseInt((user?.id || '').replace(/\D/g, ''), 10) || 1;
      const res = await axios.get(`http://localhost:8000/api/roadmaps/active/${parsedUserId}`);
      setRoadmap(res.data);
    } catch (error) {
      console.error("Failed to fetch roadmap:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateNew = async (careerPath: string, skills: string[]) => {
    setGenerating(true);
    try {
      const parsedUserId = parseInt((user?.id || '').replace(/\D/g, ''), 10) || 1;
      const payload = {
        career_path: careerPath,
        current_skills: skills,
        user_id: parsedUserId
      };
      const res = await axios.post("http://localhost:8000/api/roadmaps/generate", payload);
      setRoadmap(res.data);
    } catch (error) {
      console.error("Failed to generate roadmap:", error);
    } finally {
      setGenerating(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  if (loading) {
    return <div className="flex h-[60vh] items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-orange-500" /></div>;
  }

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-orange-400 to-amber-200 bg-clip-text text-transparent">
            AI Career Navigation
          </h1>
          <p className="text-muted-foreground mt-1">Your dynamic, evolving intelligence system and execution plan.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2 bg-neutral-900 border-neutral-800"><BrainCircuit className="h-4 w-4" /> Recalibrate AI</Button>
          <GenerateRoadmapDialog onGenerate={handleGenerateNew} generating={generating} />
        </div>
      </div>

      {/* Intelligence Top Row */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4"
      >
        <motion.div variants={itemVariants} className="p-6 rounded-2xl border border-neutral-800/50 bg-neutral-900/40 backdrop-blur-md relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-neutral-400">Career Clarity Score</h3>
            <Target className="h-4 w-4 text-orange-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-white">84</span>
            <span className="text-sm text-green-400">+12% this week</span>
          </div>
          <div className="mt-4 h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-orange-500 to-amber-300 w-[84%] rounded-full shadow-[0_0_10px_rgba(249,115,22,0.5)]"></div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="p-6 rounded-2xl border border-neutral-800/50 bg-neutral-900/40 backdrop-blur-md relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-neutral-400">Placement Readiness</h3>
            <Zap className="h-4 w-4 text-blue-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-white">62</span>
            <span className="text-sm text-neutral-500">/ 100</span>
          </div>
          <div className="mt-4 h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-300 w-[62%] rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="p-6 rounded-2xl border border-neutral-800/50 bg-neutral-900/40 backdrop-blur-md relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-neutral-400">Learning Velocity</h3>
            <TrendingUp className="h-4 w-4 text-green-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-white">1.8x</span>
            <span className="text-sm text-green-400">Faster than avg</span>
          </div>
          <div className="mt-4 flex gap-1 h-8 items-end">
            {[30, 40, 25, 60, 80, 50, 90].map((h, i) => (
              <div key={i} className="flex-1 bg-green-500/20 hover:bg-green-500/50 rounded-t-sm transition-colors" style={{ height: `${h}%` }}></div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="p-6 rounded-2xl border border-orange-500/20 bg-orange-500/5 backdrop-blur-md flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-medium text-orange-400 flex items-center gap-2">
              <BrainCircuit className="h-4 w-4" /> AI Mentor Intervention
            </h3>
            <p className="text-sm text-neutral-300 mt-2">
              "You've been consistent! However, I noticed you skipped the System Design module. Let's adjust your weekend plan to cover it."
            </p>
          </div>
          <Button size="sm" variant="outline" className="w-full mt-4 bg-transparent border-orange-500/50 hover:bg-orange-500/10 text-orange-300">
            Accept Adaptation
          </Button>
        </motion.div>
      </motion.div>

      {/* Main Roadmap Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Dynamic Nodes Timeline */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold tracking-tight text-white">Current Stage: Intermediate</h2>
            <div className="text-sm text-neutral-400 font-medium bg-neutral-900 px-3 py-1 rounded-full border border-neutral-800">
              Est. 45 Days Remaining
            </div>
          </div>
          
          <div className="relative pl-6 space-y-8 before:absolute before:inset-0 before:ml-8 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-orange-500 before:via-neutral-800 before:to-neutral-900">
            
            {roadmap?.stages.map((stage, stageIndex) => (
              stage.milestones.map((milestone, mIndex) => {
                const isFirst = stageIndex === 0 && mIndex === 0;
                
                return (
                <motion.div key={`${stageIndex}-${mIndex}`} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 + (mIndex * 0.1) }} className={`relative flex items-start gap-6 ${!isFirst ? 'opacity-60' : 'group'}`}>
                  
                  {isFirst ? (
                    <div className="absolute -left-9 mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-orange-600 ring-4 ring-orange-600/20 shadow-[0_0_15px_rgba(234,88,12,0.6)]">
                      <div className="h-2 w-2 rounded-full bg-white"></div>
                    </div>
                  ) : (
                    <div className="absolute -left-9 mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-neutral-900 border border-neutral-700">
                      <Clock className="h-3 w-3 text-neutral-500" />
                    </div>
                  )}

                  <div className={`flex-1 p-6 rounded-2xl border ${isFirst ? 'border-orange-500/30 bg-neutral-900/80 shadow-xl hover:border-orange-500/50' : 'border-neutral-800 bg-neutral-900/30'} backdrop-blur-sm transition-all`}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className={`text-xs font-semibold ${isFirst ? 'text-orange-400' : 'text-neutral-500'} uppercase tracking-wider mb-1 block`}>
                          {isFirst ? 'In Progress' : 'Up Next'} • {stage.name} Stage
                        </span>
                        <h3 className={`text-xl font-bold ${isFirst ? 'text-white' : 'text-neutral-300'}`}>{milestone.title}</h3>
                      </div>
                      <div className="h-8 w-8 rounded-full bg-neutral-800 flex items-center justify-center border border-neutral-700">
                        <span className="text-xs font-medium">{isFirst ? '0%' : 'Wait'}</span>
                      </div>
                    </div>
                    <p className="text-sm text-neutral-400 mb-6">{milestone.description}</p>
                    
                    {isFirst && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-semibold text-neutral-500 uppercase">Recommended Resources</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 hover:border-neutral-700 cursor-pointer transition-colors flex items-center gap-3">
                          <div className="h-8 w-8 rounded bg-red-500/10 flex items-center justify-center text-red-500"><Map className="h-4 w-4"/></div>
                          <div className="text-sm">
                            <div className="text-white font-medium truncate">AI Engineering Tutorial</div>
                            <div className="text-neutral-500 text-xs">Video • 45m</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    )}
                  </div>
                </motion.div>
                );
              })
            ))}

          </div>
        </div>

        {/* Execution Tracker Sidebar */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl border border-neutral-800 bg-neutral-900/40 backdrop-blur-md">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Target className="h-5 w-5 text-orange-400" />
              Execution Tracker
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <button className="h-5 w-5 rounded border border-orange-500 flex items-center justify-center hover:bg-orange-500/20 transition-colors">
                  <CheckCircle2 className="h-3 w-3 text-orange-500 opacity-0 hover:opacity-100" />
                </button>
                <span className="text-sm text-neutral-300">Read "CAP Theorem" article</span>
              </div>
              <div className="flex items-center gap-3">
                <button className="h-5 w-5 rounded border border-orange-500 flex items-center justify-center bg-orange-500">
                  <CheckCircle2 className="h-3 w-3 text-white" />
                </button>
                <span className="text-sm text-neutral-500 line-through">Complete mock interview</span>
              </div>
              <div className="flex items-center gap-3">
                <button className="h-5 w-5 rounded border border-neutral-600 flex items-center justify-center hover:bg-neutral-800 transition-colors">
                </button>
                <span className="text-sm text-neutral-300">Finish System Design Diagram</span>
              </div>
            </div>
            <Button variant="ghost" className="w-full mt-4 text-xs text-neutral-400 hover:text-white">View Full Task List <ArrowRight className="h-3 w-3 ml-1" /></Button>
          </div>

          <div className="p-6 rounded-2xl border border-neutral-800 bg-gradient-to-b from-neutral-900 to-black backdrop-blur-md">
            <h2 className="text-lg font-semibold text-white mb-2">Career Predictions</h2>
            <p className="text-sm text-neutral-400 mb-4">Based on your current learning velocity.</p>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-neutral-300">Frontend Engineer (Senior)</span>
                  <span className="text-green-400">85% Match</span>
                </div>
                <div className="h-1.5 w-full bg-neutral-800 rounded-full">
                  <div className="h-full bg-green-500 w-[85%] rounded-full"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-neutral-300">Full Stack Engineer</span>
                  <span className="text-orange-400">60% Match</span>
                </div>
                <div className="h-1.5 w-full bg-neutral-800 rounded-full">
                  <div className="h-full bg-orange-500 w-[60%] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
