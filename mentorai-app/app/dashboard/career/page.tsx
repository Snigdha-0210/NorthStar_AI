"use client";

import { useEffect, useState } from "react";
import { DeepAssessmentWizard } from "@/components/features/DeepAssessmentWizard";
import { CareerMatchDashboard } from "@/components/features/CareerMatchDashboard";
import { DynamicRoadmapCanvas } from "@/components/features/DynamicRoadmapCanvas";
import { CareerTwinWidget } from "@/components/features/CareerTwinWidget";
import { careerService } from "@/services/careerService";
import { useCareerStore } from "@/store/careerStore";
import { motion } from "framer-motion";

export default function CareerOSPage() {
  const { careerDNA, matches, activeRoadmap, careerTwin, setCareerDNA, setMatches, setActiveRoadmap, setCareerTwin } = useCareerStore();
  
  const [loading, setLoading] = useState(false);
  const userId = 1; // Mock user ID for MVP

  // Step 1: Handle Assessment Submission
  const handleAssessmentSubmit = async (data: any) => {
    setLoading(true);
    try {
      const dna = await careerService.submitAssessment(data);
      setCareerDNA(dna);
      
      // Immediately generate matches after DNA is ready
      const matchesData = await careerService.generateMatches(userId);
      setMatches(matchesData.matches);
    } catch (error) {
      console.error("Failed to submit assessment", error);
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Handle Match Selection -> Generate Roadmap
  const handleMatchSelect = async (match: any) => {
    setLoading(true);
    try {
      // Mock current skills fetching
      const currentSkills = ["Python", "React"]; 
      const roadmap = await careerService.generateRoadmap(match.career_domain, currentSkills, userId);
      setActiveRoadmap(roadmap);
      
      // Also fetch career twin data
      const twin = await careerService.getCareerTwin(userId);
      setCareerTwin(twin);
    } catch (error) {
      console.error("Failed to generate roadmap", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 space-y-8">
      <header className="mb-12">
        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400">
          Career OS
        </h1>
        <p className="text-white/60 text-lg mt-2">Your personalized path to success, powered by AI.</p>
      </header>

      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white animate-pulse">MentorAI is thinking...</h3>
          </div>
        </div>
      )}

      {/* State 1: Discovery */}
      {!careerDNA && !loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <DeepAssessmentWizard onSubmit={handleAssessmentSubmit} />
        </motion.div>
      )}

      {/* State 2: Matching */}
      {careerDNA && !activeRoadmap && !loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <CareerMatchDashboard matches={matches} onSelect={handleMatchSelect} />
        </motion.div>
      )}

      {/* State 3: Execution */}
      {activeRoadmap && !loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <DynamicRoadmapCanvas roadmap={activeRoadmap} />
          </div>
          <div className="space-y-8">
            <CareerTwinWidget twinData={careerTwin} />
            {/* Action Center or other widgets can go here */}
          </div>
        </motion.div>
      )}
    </div>
  );
}
