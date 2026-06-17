"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Map } from "lucide-react";

interface GenerateRoadmapDialogProps {
  onGenerate: (careerPath: string, skills: string[]) => void;
  generating: boolean;
}

export function GenerateRoadmapDialog({ onGenerate, generating }: GenerateRoadmapDialogProps) {
  const [open, setOpen] = useState(false);
  const [careerPath, setCareerPath] = useState("");
  const [skills, setSkills] = useState("");

  const handleSubmit = () => {
    if (!careerPath.trim() || !skills.trim()) return;
    
    const skillsList = skills.split(",").map(s => s.trim()).filter(s => s);
    onGenerate(careerPath, skillsList);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button className="gap-2 bg-orange-600 hover:bg-orange-700 text-white" disabled={generating} />}>
        {generating ? <Loader2 className="h-4 w-4 animate-spin"/> : <Map className="h-4 w-4" />} 
        Generate New Path
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Personalize Your Roadmap</DialogTitle>
          <DialogDescription>
            Tell us about your target role and current skills so we can generate a personalized learning path for you.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="career" className="text-right">
              Target Role
            </Label>
            <Input
              id="career"
              placeholder="e.g. AI Engineer"
              className="col-span-3"
              value={careerPath}
              onChange={(e) => setCareerPath(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="skills" className="text-right">
              Current Skills
            </Label>
            <Input
              id="skills"
              placeholder="e.g. Python, React, Git"
              className="col-span-3"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={generating || !careerPath.trim() || !skills.trim()}>
            Generate
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
