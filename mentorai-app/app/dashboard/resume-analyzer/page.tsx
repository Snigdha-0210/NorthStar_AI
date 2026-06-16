"use client";
import { useAppStore } from "@/store/useAppStore";
import { ResumeScoreCard } from "@/components/features/ResumeScoreCard";
import { mockResumeScore } from "@/services/mockData";
import { Button } from "@/components/ui/button";
import { Upload, FileSearch } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { LoadingState } from "@/components/ui/LoadingState";

export default function ResumeAnalyzerPage() {
  const [analyzing, setAnalyzing] = useState(false);

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      toast.success("Resume analysis complete!");
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Resume Analyzer</h1>
          <p className="text-muted-foreground">Upload your resume to get instant AI feedback against your target roles.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="border-2 border-dashed border-primary/20 rounded-xl p-12 flex flex-col items-center justify-center text-center bg-card hover:bg-muted/50 hover:border-primary/50 transition-all cursor-pointer group" onClick={handleAnalyze}>
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Click to upload or drag and drop</h3>
            <p className="text-sm text-muted-foreground mt-2">PDF or Word document up to 5MB</p>
            <Button className="mt-6 gap-2" onClick={(e) => { e.stopPropagation(); handleAnalyze(); }}>
              <FileSearch className="h-4 w-4" /> Analyze Now
            </Button>
          </div>
        </div>
        
        <div>
          {analyzing ? (
            <div className="h-full flex items-center justify-center border rounded-xl bg-card">
              <LoadingState message="Analyzing your resume with AI..." />
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Latest Analysis</h2>
              <ResumeScoreCard score={mockResumeScore} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
