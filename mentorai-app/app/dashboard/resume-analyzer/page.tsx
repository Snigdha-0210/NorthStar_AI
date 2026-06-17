"use client";

import { ResumeScoreCard } from "@/components/features/ResumeScoreCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileSearch, Loader2, FileText, X } from "lucide-react";
import { toast } from "sonner";
import { useState, useRef } from "react";
import { LoadingState } from "@/components/ui/LoadingState";
import { ResumeScore } from "@/types";

export default function ResumeAnalyzerPage() {
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<ResumeScore | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [targetRole, setTargetRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== "application/pdf") {
        toast.error("Please upload a PDF file.");
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleAnalyze = async () => {
    if (!file) {
      toast.error("Please upload your resume PDF first.");
      return;
    }
    if (!targetRole) {
      toast.error("Please enter a target role.");
      return;
    }

    setAnalyzing(true);
    setAnalysisResult(null);
    toast("Analyzing resume...", { icon: <Loader2 className="h-4 w-4 animate-spin text-primary" /> });

    try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("target_role", targetRole);
        formData.append("job_description", jobDescription);

        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const response = await fetch(`${apiUrl}/api/resume/analyze`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.detail || `API Error: ${response.status}`);
        }

        const data: ResumeScore = await response.json();
        setAnalysisResult(data);
        toast.success("Resume analysis complete!");
    } catch (error) {
        console.error("Analysis failed:", error);
        toast.error("Failed to analyze resume.");
    } finally {
        setAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Resume Analyzer</h1>
          <p className="text-muted-foreground">Upload your resume to get instant AI feedback against your target roles.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6 flex flex-col h-full">
          <div className="space-y-4 flex-1">
              <div className="space-y-2">
                  <h3 className="text-sm font-medium">Target Role (Required)</h3>
                  <Input 
                      placeholder="e.g. Senior Frontend Engineer" 
                      value={targetRole}
                      onChange={(e) => setTargetRole(e.target.value)}
                  />
              </div>
              <div className="space-y-2">
                  <h3 className="text-sm font-medium">Job Description (Optional)</h3>
                  <Textarea 
                      placeholder="Paste the job description here..." 
                      className="resize-none h-32"
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                  />
              </div>
          </div>

          <div 
            className="border-2 border-dashed border-primary/30 rounded-xl p-10 flex flex-col items-center justify-center text-center bg-card hover:bg-muted/50 hover:border-primary/60 transition-all cursor-pointer group mt-auto" 
            onClick={handleBoxClick}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept=".pdf" 
              onChange={handleFileChange}
            />
            
            {file ? (
                <div className="flex flex-col items-center">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <FileText className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">{file.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        className="mt-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={(e) => { e.stopPropagation(); setFile(null); }}
                    >
                        <X className="h-4 w-4 mr-2" /> Remove File
                    </Button>
                </div>
            ) : (
                <>
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Upload className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">Click to upload your resume</h3>
                    <p className="text-sm text-muted-foreground mt-2">Only PDF documents are supported</p>
                </>
            )}
          </div>
          <Button 
            className="w-full gap-2 h-12 text-base" 
            onClick={(e) => { e.stopPropagation(); handleAnalyze(); }}
            disabled={analyzing || !file || !targetRole}
          >
            {analyzing ? <Loader2 className="h-5 w-5 animate-spin" /> : <FileSearch className="h-5 w-5" />}
            {analyzing ? "Analyzing Document..." : "Analyze Now"}
          </Button>
        </div>
        
        <div className="h-full">
          {analyzing ? (
            <div className="h-full flex items-center justify-center border rounded-xl bg-card min-h-[400px]">
              <LoadingState message="Extracting text and analyzing your resume..." />
            </div>
          ) : analysisResult ? (
            <div className="space-y-4 animate-in fade-in zoom-in-95 duration-500">
              <h2 className="text-xl font-semibold">Analysis Results</h2>
              <ResumeScoreCard score={analysisResult} />
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center border rounded-xl bg-muted/10 text-muted-foreground p-8 text-center min-h-[400px]">
                <FileSearch className="h-12 w-12 mb-4 opacity-20" />
                <p>Upload a PDF and enter a target role to see your ATS score and feedback.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
