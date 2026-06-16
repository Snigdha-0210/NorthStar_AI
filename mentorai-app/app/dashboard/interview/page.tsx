"use client";
import { InterviewScoreCard } from "@/components/features/InterviewScoreCard";
import { mockInterviewScore } from "@/services/mockData";
import { Button } from "@/components/ui/button";
import { Mic, PhoneOff, Settings2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function InterviewPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [hasScore, setHasScore] = useState(false);

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      setHasScore(true);
      toast.success("Interview session ended. Generating score...");
    } else {
      setIsRecording(true);
      setHasScore(false);
      toast("Voice interview started. Speak now.", { icon: <Mic className="h-4 w-4 text-red-500 animate-pulse" /> });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Voice Mock Interview</h1>
          <p className="text-muted-foreground">Practice your interview skills with an AI recruiter.</p>
        </div>
        <Button variant="outline" className="gap-2"><Settings2 className="h-4 w-4" /> Configure Agent</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col items-center justify-center p-12 border rounded-xl bg-card min-h-[400px]">
          <div className={`relative h-32 w-32 rounded-full flex items-center justify-center transition-all ${isRecording ? 'bg-red-500/20' : 'bg-primary/10'}`}>
            {isRecording && <div className="absolute inset-0 rounded-full border-4 border-red-500 animate-ping opacity-20" />}
            <Mic className={`h-12 w-12 ${isRecording ? 'text-red-500 animate-pulse' : 'text-primary'}`} />
          </div>
          
          <h3 className="text-2xl font-bold mt-8 mb-2">
            {isRecording ? "Listening..." : "Ready to Start"}
          </h3>
          <p className="text-muted-foreground mb-8 text-center max-w-sm">
            {isRecording ? "The AI is analyzing your response. Speak clearly." : "Click the button below to start a realistic mock interview session."}
          </p>

          <Button 
            size="lg" 
            variant={isRecording ? "destructive" : "default"}
            onClick={toggleRecording}
            className="w-48 gap-2 rounded-full h-14 text-base shadow-lg hover:shadow-xl transition-all"
          >
            {isRecording ? <><PhoneOff className="h-5 w-5" /> End Session</> : <><Mic className="h-5 w-5" /> Start Interview</>}
          </Button>
        </div>

        <div className="h-full">
          {hasScore ? (
            <InterviewScoreCard score={mockInterviewScore} />
          ) : (
            <div className="h-full border border-dashed border-primary/20 rounded-xl flex flex-col items-center justify-center p-8 text-muted-foreground text-center bg-card/50">
              <Mic className="h-8 w-8 mb-4 text-primary/40" />
              <p>Complete an interview session to see your performance scorecard and AI feedback here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
