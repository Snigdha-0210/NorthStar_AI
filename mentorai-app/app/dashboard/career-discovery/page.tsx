"use client";

import { Button } from "@/components/ui/button";
import { Compass, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Recommendation {
  title: string;
  match_score: number;
  description: string;
  required_skills: string[];
}

export default function CareerDiscoveryPage() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["career-discovery"],
    queryFn: async () => {
      const response = await axios.post("http://localhost:8000/api/v1/careers/discover");
      return response.data;
    },
    refetchOnWindowFocus: false
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Career Discovery</h1>
          <p className="text-muted-foreground">Explore potential career paths based on your skills and interests.</p>
        </div>
        <Button className="gap-2" onClick={() => refetch()} disabled={isLoading}>
          <Sparkles className="h-4 w-4" /> Discover New Paths
        </Button>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <p className="text-muted-foreground animate-pulse">Generating your personalized career paths...</p>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500">
          <p>Failed to load career paths. Ensure the backend is running.</p>
        </div>
      )}

      {data && data.recommendations && (
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
                <p className="text-sm text-muted-foreground flex-1">{rec.description}</p>
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">Key Skills Required</h4>
                  <div className="flex flex-wrap gap-2">
                    {rec.required_skills.map((skill: string, j: number) => (
                      <Badge key={j} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">Explore Path</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
