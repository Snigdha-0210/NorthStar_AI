"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Sparkles, BrainCircuit } from "lucide-react";
import { Button } from "@/components/ui/button";

const STEPS = [
  { id: "academic", question: "What is your academic background?", field: "academic_background" },
  { id: "technical", question: "List your top technical skills (comma separated)", field: "technical_skills" },
  { id: "soft", question: "List your top soft skills (comma separated)", field: "soft_skills" },
  { id: "learning", question: "How do you prefer to learn? (e.g., visual, hands-on)", field: "learning_style" }
];

export function DeepAssessmentWizard({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<any>({});

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onSubmit(formData);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = STEPS[currentStep].field;
    let value: any = e.target.value;
    if (field.includes("skills")) {
      value = value.split(",").map((s: string) => s.trim());
    }
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-8 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-white/10">
        <motion.div 
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
          initial={{ width: 0 }}
          animate={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400">
          <BrainCircuit size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Career DNA Assessment</h2>
          <p className="text-white/50 text-sm">Let MentorAI discover your true potential</p>
        </div>
      </div>

      <div className="min-h-[160px] relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <h3 className="text-xl font-medium text-white mb-6">
              {STEPS[currentStep].question}
            </h3>
            <input
              type="text"
              autoFocus
              className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-lg"
              placeholder="Type your answer here..."
              onChange={handleChange}
              defaultValue={Array.isArray(formData[STEPS[currentStep].field]) ? formData[STEPS[currentStep].field].join(", ") : formData[STEPS[currentStep].field] || ""}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleNext();
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-between items-center mt-8">
        <Button 
          variant="ghost" 
          onClick={handlePrev}
          disabled={currentStep === 0}
          className="text-white/70 hover:text-white hover:bg-white/10"
        >
          <ChevronLeft className="mr-2" size={16} /> Back
        </Button>
        <Button 
          onClick={handleNext}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0 shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all px-8 rounded-xl"
        >
          {currentStep === STEPS.length - 1 ? (
            <><Sparkles className="mr-2" size={16} /> Discover My DNA</>
          ) : (
            <>Next <ChevronRight className="ml-2" size={16} /></>
          )}
        </Button>
      </div>
    </div>
  );
}
