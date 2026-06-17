"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Compass, Sparkles, Building2, TrendingUp, DollarSign, Clock, PlayCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Recommendation {
  title: string;
  match_score: number;
  description: string;
  required_skills: string[];
  average_salary: string;
  day_in_the_life: string;
  growth_outlook: string;
  top_companies: string[];
  recommended_tutorials?: { title: string; url: string }[];
}

export default function CareerDiscoveryPage() {
  const router = useRouter();
  const [selectedPath, setSelectedPath] = useState<Recommendation | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const { data, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: ["career-discovery"],
    queryFn: async () => {
      const response = await axios.post("http://localhost:8000/api/careers/discover");
      return response.data;
    },
    refetchOnWindowFocus: false
  });

  const handleGenerateRoadmap = async () => {
    if (!selectedPath) return;
    try {
      setIsGenerating(true);
      await axios.post("http://localhost:8000/api/roadmaps/generate", {
        career_path: selectedPath.title,
        current_skills: selectedPath.required_skills,
        user_id: 1 // mock user
      });
      router.push("/dashboard/resources");
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Career Discovery</h1>
          <p className="text-muted-foreground">Explore potential career paths based on your skills and interests.</p>
        </div>
        <Button className="gap-2" onClick={() => refetch()} disabled={isLoading || isFetching}>
          <Sparkles className="h-4 w-4" /> {(isLoading || isFetching) ? "Discovering..." : "Discover New Paths"}
        </Button>
      </div>

      {(isLoading || isFetching) && (
        <div className="flex justify-center items-center h-64">
          <p className="text-muted-foreground animate-pulse">Generating your personalized career paths (this may take up to 15s)...</p>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500">
          <p>Failed to load career paths. Ensure the backend is running.</p>
        </div>
      )}

      {data && data.recommendations && !isFetching && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.recommendations.map((rec: Recommendation, i: number) => (
            <Card key={i} className="hover:shadow-lg transition-all border-primary/10 hover:border-primary/30 group flex flex-col">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Compass className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{rec.title}</CardTitle>
                <CardDescription>Estimated Match: {rec.match_score}%</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 flex-1 flex flex-col">
                <p className="text-sm text-muted-foreground flex-1 line-clamp-3">{rec.description}</p>
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">Key Skills Required</h4>
                  <div className="flex flex-wrap gap-2">
                    {rec.required_skills.slice(0, 3).map((skill: string, j: number) => (
                      <Badge key={j} variant="secondary">{skill}</Badge>
                    ))}
                    {rec.required_skills.length > 3 && (
                       <Badge variant="secondary">+{rec.required_skills.length - 3} more</Badge>
                    )}
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4" onClick={() => setSelectedPath(rec)}>
                  Explore Path
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={!!selectedPath} onOpenChange={(open) => !open && setSelectedPath(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          {selectedPath && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4 mb-2">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Compass className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <DialogTitle className="text-2xl">{selectedPath.title}</DialogTitle>
                    <DialogDescription className="text-lg text-primary">
                      {selectedPath.match_score}% Match
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              
              <div className="space-y-6 py-4">
                <p className="text-on-surface-variant text-sm">
                  {selectedPath.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-3 rounded-lg border border-white/5 bg-white/5">
                    <DollarSign className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-on-surface">Average Salary</h4>
                      <p className="text-xs text-muted-foreground mt-1">{selectedPath.average_salary}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg border border-white/5 bg-white/5">
                    <TrendingUp className="w-5 h-5 text-blue-400 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-on-surface">Growth Outlook</h4>
                      <p className="text-xs text-muted-foreground mt-1">{selectedPath.growth_outlook}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <h4 className="text-sm font-semibold">Day in the Life</h4>
                  </div>
                  <p className="text-sm text-muted-foreground pl-6">
                    {selectedPath.day_in_the_life}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-primary" />
                    <h4 className="text-sm font-semibold">Top Companies Hiring</h4>
                  </div>
                  <div className="flex flex-wrap gap-2 pl-6">
                    {selectedPath.top_companies?.map((company: string, idx: number) => (
                      <Badge key={idx} variant="outline" className="bg-transparent">{company}</Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold border-b border-white/10 pb-2">All Required Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedPath.required_skills.map((skill: string, idx: number) => (
                      <Badge key={idx} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>
                
                {selectedPath.recommended_tutorials && selectedPath.recommended_tutorials.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold border-b border-white/10 pb-2 flex items-center gap-2">
                      <PlayCircle className="w-4 h-4 text-red-400" />
                      Recommended Tutorials
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      {selectedPath.recommended_tutorials.map((tutorial, idx) => (
                        typeof tutorial === 'string' ? (
                          <a 
                            key={idx} 
                            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(tutorial)}`} 
                            target="_blank" 
                            rel="noreferrer"
                            className="text-sm text-blue-400 hover:text-blue-300 hover:underline flex items-center gap-2"
                          >
                            {tutorial}
                          </a>
                        ) : (
                          <a 
                            key={idx} 
                            href={tutorial.url} 
                            target="_blank" 
                            rel="noreferrer"
                            className="text-sm text-blue-400 hover:text-blue-300 hover:underline flex items-center gap-2"
                          >
                            {tutorial.title}
                          </a>
                        )
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <DialogFooter className="mt-4 border-t border-white/10 pt-4">
                <Button 
                  onClick={handleGenerateRoadmap} 
                  disabled={isGenerating}
                  className="w-full sm:w-auto"
                >
                  {isGenerating ? "Generating Roadmap & Resources... (approx. 20s)" : "Generate Roadmap & Resources"}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

    </div>
  );
}
