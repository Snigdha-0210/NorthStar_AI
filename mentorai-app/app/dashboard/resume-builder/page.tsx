"use client";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";

export default function ResumeBuilderPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Resume Builder</h1>
          <p className="text-muted-foreground">Craft ATS-friendly resumes tailored to your target roles.</p>
        </div>
        <Button className="gap-2"><Download className="h-4 w-4" /> Export PDF</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        <div className="lg:col-span-1 border-r pr-6 space-y-4">
          <h2 className="text-xl font-semibold">Sections</h2>
          <Button variant="outline" className="w-full justify-start border-l-4 border-l-primary">Personal Info</Button>
          <Button variant="ghost" className="w-full justify-start">Experience</Button>
          <Button variant="ghost" className="w-full justify-start">Education</Button>
          <Button variant="ghost" className="w-full justify-start">Skills</Button>
        </div>
        <div className="lg:col-span-2 h-full">
          <EmptyState 
            title="Resume Editor" 
            description="Select a section on the left to start building your resume."
            icon={<FileText className="h-6 w-6" />}
          />
        </div>
      </div>
    </div>
  );
}
