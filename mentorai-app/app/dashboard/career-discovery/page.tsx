"use client";
import { useAppStore } from "@/store/useAppStore";
import { Button } from "@/components/ui/button";
import { Compass, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CareerDiscoveryPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Career Discovery</h1>
          <p className="text-muted-foreground">Explore potential career paths based on your skills and interests.</p>
        </div>
        <Button className="gap-2"><Sparkles className="h-4 w-4" /> Discover New Paths</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="hover:shadow-lg transition-all border-primary/10 hover:border-primary/30 group">
            <CardHeader>
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Compass className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Frontend Architect</CardTitle>
              <CardDescription>Estimated Match: 92%</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">Lead the technical direction of large-scale web applications, focusing on performance, scalability, and developer experience.</p>
              <div className="space-y-2">
                <h4 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">Key Skills Required</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">System Design</Badge>
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">Explore Path</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
