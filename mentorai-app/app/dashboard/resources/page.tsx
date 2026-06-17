"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, Search, ExternalLink, PlayCircle, Book } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function ResourcesPage() {
  const [isGenerating, setIsGenerating] = React.useState(false);
  const { data: roadmap, isLoading, error, refetch } = useQuery({
    queryKey: ["active-roadmap-resources"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:8000/api/roadmaps/active/1");
      return response.data;
    },
    retry: false
  });

  const handleGenerate = async (careerPath: string) => {
    try {
      setIsGenerating(true);
      await axios.post("http://localhost:8000/api/roadmaps/generate", {
        career_path: careerPath,
        current_skills: ["Python", "JavaScript", "React"], // generic base skills
        user_id: 1 // mock user
      });
      await refetch();
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Extract all resources from the roadmap's milestones
  const allResources = roadmap?.stages?.flatMap((stage: any) => 
    stage.milestones.flatMap((milestone: any) => {
      try {
        const resourcesObj = JSON.parse(milestone.recommended_resources);
        return resourcesObj.resources.map((res: any) => ({
          ...res,
          milestoneTitle: milestone.title,
          stageName: stage.name
        }));
      } catch (e) {
        return [];
      }
    })
  ) || [];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Resource Hub</h1>
          <p className="text-muted-foreground">Curated articles, courses, and guides for your career growth.</p>
        </div>
        <Button className="gap-2"><Search className="h-4 w-4" /> Browse Catalog</Button>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <p className="text-muted-foreground animate-pulse">Loading your personalized resources...</p>
        </div>
      )}

      {error && (
        <EmptyState 
          title="Explore Resources" 
          description="Your personalized learning materials will appear here once you generate a learning roadmap."
          icon={<BookOpen className="h-6 w-6" />}
          action={
            <Link href="/dashboard/career-discovery">
              <Button variant="outline">Discover Careers</Button>
            </Link>
          }
        />
      )}

      {!isLoading && !error && allResources.length === 0 && (
         <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
           <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6">
             <BookOpen className="w-8 h-8 text-primary" />
           </div>
           <h2 className="text-2xl font-bold mb-2">Generate Your Resource Hub</h2>
           <p className="text-muted-foreground max-w-md mb-8">
             Type the name of any career path (e.g. "Cloud Computing") below, and the AI will generate a complete learning curriculum and source the best resources for you.
           </p>
           
           <div className="flex w-full max-w-sm items-center space-x-2">
             <input 
               type="text" 
               placeholder="e.g. Cloud Computing" 
               className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
               id="careerInput"
               disabled={isGenerating}
               onKeyDown={(e) => {
                 if (e.key === 'Enter') {
                   const val = (document.getElementById('careerInput') as HTMLInputElement).value;
                   if (val) handleGenerate(val);
                 }
               }}
             />
             <Button 
               disabled={isGenerating} 
               onClick={() => {
                 const val = (document.getElementById('careerInput') as HTMLInputElement).value;
                 if (val) handleGenerate(val);
               }}
             >
               {isGenerating ? "Generating..." : "Generate"}
             </Button>
           </div>
         </div>
      )}

      {!isLoading && !error && allResources.length > 0 && (
        <div className="space-y-8">
          <div className="mb-4">
             <Badge variant="outline" className="mb-2 bg-primary/10 text-primary border-primary/20">
               Active Path: {roadmap.target_career}
             </Badge>
             <h2 className="text-xl font-semibold">Your Complete Learning Materials</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allResources.map((resource: any, i: number) => (
              <Card key={i} className="hover:shadow-lg transition-all border-white/5 flex flex-col h-full bg-white/5">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {resource.type === "course" || resource.type === "video" ? (
                        <span className="flex items-center gap-1"><PlayCircle className="w-3 h-3" /> {resource.type}</span>
                      ) : (
                        <span className="flex items-center gap-1"><Book className="w-3 h-3" /> {resource.type}</span>
                      )}
                    </Badge>
                    {resource.is_free ? (
                      <Badge variant="outline" className="text-green-400 border-green-400/30">Free</Badge>
                    ) : (
                      <Badge variant="outline" className="text-yellow-400 border-yellow-400/30">Paid</Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg line-clamp-2 leading-tight">{resource.title}</CardTitle>
                  <CardDescription className="text-xs mt-1">For: {resource.milestoneTitle} ({resource.stageName})</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between">
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {resource.description}
                  </p>
                  <div className="pt-4 border-t border-white/10 mt-auto flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{resource.estimated_time}</span>
                    <a 
                      href={resource.url} 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-1"
                    >
                      View <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
