"use client";
import { InterviewScoreCard } from "@/components/features/InterviewScoreCard";
import { Button } from "@/components/ui/button";
import { Mic, PhoneOff, Settings2, Loader2, MessageSquare, User, Bot, Play } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { InterviewScore } from "@/types";

export default function InterviewPage() {
  const [isStarted, setIsStarted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [hasScore, setHasScore] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<InterviewScore | null>(null);
  const [conversation, setConversation] = useState<{role: 'user' | 'ai', text: string}[]>([]);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const beginInterview = async () => {
    setIsStarted(true);
    await processAudio(null);
  };

  const endInterviewAndEvaluate = async () => {
    if (conversation.length === 0) {
        toast.error("You need to complete an interview before generating a score.");
        return;
    }
    setIsEvaluating(true);
    setHasScore(false);
    toast("Generating your personalized interview report...", { icon: <Loader2 className="h-4 w-4 animate-spin text-primary" /> });

    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const response = await fetch(`${apiUrl}/api/interview/evaluate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(conversation),
        });

        if (!response.ok) {
            throw new Error(`Evaluation Error: ${response.status}`);
        }

        const data: InterviewScore = await response.json();
        setEvaluationResult(data);
        setHasScore(true);
        toast.success("Evaluation complete!");
    } catch (error) {
        console.error("Evaluation failed:", error);
        toast.error("Failed to evaluate interview.");
    } finally {
        setIsEvaluating(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        await processAudio(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setHasScore(false);
      toast("Voice recording started. Speak your answer.", { icon: <Mic className="h-4 w-4 text-red-500 animate-pulse" /> });
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast.error("Microphone access denied or not available. Please check permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const processAudio = async (audioBlob: Blob | null) => {
    setIsProcessing(true);
    toast(audioBlob ? "Processing your response..." : "Starting Interview...", { icon: <Loader2 className="h-4 w-4 animate-spin text-primary" /> });

    try {
      const formData = new FormData();
      if (audioBlob) {
        formData.append("file", audioBlob, "recording.webm");
      }
      
      if (conversation.length > 0) {
        formData.append("history", JSON.stringify(conversation));
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const response = await fetch(`${apiUrl}/api/interview/voice`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const userTranscript = response.headers.get("X-User-Transcript");
      const aiTranscript = response.headers.get("X-AI-Transcript");

      let updatedConversation = [...conversation];
      if (userTranscript && userTranscript.trim() !== "") {
        const decodedUser = decodeURIComponent(escape(userTranscript));
        updatedConversation.push({ role: 'user', text: decodedUser });
      }
      if (aiTranscript && aiTranscript.trim() !== "") {
        const decodedAI = decodeURIComponent(escape(aiTranscript));
        updatedConversation.push({ role: 'ai', text: decodedAI });
      }
      
      setConversation(updatedConversation);

      const audioBuffer = await response.arrayBuffer();
      const audioBlobResponse = new Blob([audioBuffer], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(audioBlobResponse);
      
      const audio = new Audio(audioUrl);
      audio.play();
      
      toast.success(audioBlob ? "AI is responding." : "Interview has started.");
    } catch (error) {
      console.error("Audio processing failed:", error);
      toast.error("Failed to process interview response. Ensure API keys are active.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Voice Mock Interview</h1>
          <p className="text-muted-foreground">Practice your interview skills with an AI recruiter.</p>
        </div>
        <Button 
            variant="outline" 
            className="gap-2" 
            onClick={endInterviewAndEvaluate}
            disabled={isEvaluating || conversation.length === 0}
        >
          {isEvaluating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Settings2 className="h-4 w-4" />}
          {isEvaluating ? "Evaluating..." : "End & Show Score"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col items-center justify-center p-12 border rounded-xl bg-card min-h-[500px]">
          <div className={`relative h-32 w-32 rounded-full flex items-center justify-center transition-all ${isRecording ? 'bg-red-500/20' : isProcessing || isEvaluating ? 'bg-orange-500/20' : 'bg-primary/10'}`}>
            {isRecording && <div className="absolute inset-0 rounded-full border-4 border-red-500 animate-ping opacity-20" />}
            {(isProcessing || isEvaluating) && <div className="absolute inset-0 rounded-full border-4 border-orange-500 animate-pulse opacity-40" />}
            
            {isProcessing || isEvaluating ? (
               <Loader2 className="h-12 w-12 text-orange-500 animate-spin" />
            ) : (
               <Mic className={`h-12 w-12 ${isRecording ? 'text-red-500 animate-pulse' : 'text-primary'}`} />
            )}
          </div>
          
          <h3 className="text-2xl font-bold mt-8 mb-2">
            {!isStarted ? "Ready to Begin" : isRecording ? "Listening..." : isProcessing ? "Thinking..." : isEvaluating ? "Evaluating..." : "Your Turn"}
          </h3>
          <p className="text-muted-foreground mb-8 text-center max-w-sm">
            {!isStarted
              ? "Click 'Begin Interview' to let the AI introduce itself and ask the first question."
              : isRecording 
                ? "The microphone is active. Speak clearly to answer the question." 
                : isProcessing 
                  ? "The AI is generating the next question." 
                  : isEvaluating
                    ? "The AI is grading your performance."
                    : "Click 'Record Answer' to reply to the AI."}
          </p>

          {!isStarted ? (
            <Button 
              size="lg" 
              onClick={beginInterview}
              disabled={isProcessing}
              className="w-56 gap-2 rounded-full h-14 text-base shadow-lg hover:shadow-xl transition-all"
            >
              {isProcessing ? <><Loader2 className="h-5 w-5 animate-spin" /> Starting...</> : <><Play className="h-5 w-5" /> Begin Interview</>}
            </Button>
          ) : (
            <Button 
              size="lg" 
              variant={isRecording ? "destructive" : "default"}
              onClick={isRecording ? stopRecording : startRecording}
              disabled={isProcessing || isEvaluating}
              className="w-56 gap-2 rounded-full h-14 text-base shadow-lg hover:shadow-xl transition-all"
            >
              {isRecording ? (
                <><PhoneOff className="h-5 w-5" /> Finish Answer</>
              ) : isProcessing ? (
                <><Loader2 className="h-5 w-5 animate-spin" /> Processing</>
              ) : isEvaluating ? (
                <><Loader2 className="h-5 w-5 animate-spin" /> Evaluating</>
              ) : (
                <><Mic className="h-5 w-5" /> Record Answer</>
              )}
            </Button>
          )}
        </div>

        <div className="h-[500px]">
          {hasScore && evaluationResult ? (
            <InterviewScoreCard score={evaluationResult} />
          ) : conversation.length > 0 ? (
            <div className="h-full border rounded-xl flex flex-col bg-card overflow-hidden">
              <div className="p-4 border-b bg-muted/30">
                <h3 className="font-semibold flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" /> Live Transcript
                </h3>
              </div>
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-6 pb-4">
                  {conversation.map((msg, i) => (
                    <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {msg.role === 'ai' && (
                        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                          <Bot className="h-4 w-4 text-primary" />
                        </div>
                      )}
                      
                      <div className={`p-3 rounded-2xl max-w-[80%] text-sm ${msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-tr-sm' : 'bg-muted rounded-tl-sm'}`}>
                        {msg.text}
                      </div>

                      {msg.role === 'user' && (
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                          <User className="h-4 w-4 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  ))}
                  {isProcessing && (
                     <div className="flex gap-3 justify-start opacity-50">
                        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                          <Bot className="h-4 w-4 text-primary" />
                        </div>
                        <div className="p-3 rounded-2xl bg-muted rounded-tl-sm flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" /> AI is typing...
                        </div>
                     </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          ) : (
            <div className="h-full border border-dashed border-primary/20 rounded-xl flex flex-col items-center justify-center p-8 text-muted-foreground text-center bg-card/50">
              <MessageSquare className="h-8 w-8 mb-4 text-primary/40" />
              <p>Your conversation transcript will appear here once the interview starts.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
