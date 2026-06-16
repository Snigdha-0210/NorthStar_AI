"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Upload, Target, Users } from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();

  return (
    <div className="max-w-2xl mx-auto space-y-6 mt-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card className="border-primary/20 shadow-lg">
        <CardHeader className="text-center pb-8 pt-10">
          <CardTitle className="text-3xl mb-2">Welcome to MentorAI</CardTitle>
          <CardDescription className="text-base">Let&apos;s set up your digital career twin in 3 easy steps.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 px-10">
          <div className="p-4 border rounded-xl bg-primary/5 flex items-start gap-4">
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
              <Upload className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Step 1: Upload your resume</h3>
              <p className="text-sm text-muted-foreground">We&apos;ll parse your skills and experience automatically to build your baseline career twin.</p>
            </div>
          </div>
          
          <div className="p-4 border rounded-xl flex items-start gap-4 opacity-60">
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center shrink-0">
              <Target className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Step 2: Set your career goals</h3>
              <p className="text-sm text-muted-foreground">Tell us where you want to go so we can identify the skill gaps.</p>
            </div>
          </div>
          
          <div className="p-4 border rounded-xl flex items-start gap-4 opacity-60">
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center shrink-0">
              <Users className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Step 3: Meet your AI mentors</h3>
              <p className="text-sm text-muted-foreground">Get matched with specialized agents to help you achieve your goals.</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between px-10 pb-10 pt-6">
          <Button variant="ghost" onClick={() => router.push("/dashboard")}>Skip for now</Button>
          <Button size="lg" className="px-8" onClick={() => router.push("/dashboard/resume-analyzer")}>Start Step 1</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
