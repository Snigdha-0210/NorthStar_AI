"use client";
import { Button } from "@/components/ui/button";
import { BookOpen, Search } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";

export default function ResourcesPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Resource Hub</h1>
          <p className="text-muted-foreground">Curated articles, courses, and guides for your career growth.</p>
        </div>
        <Button className="gap-2"><Search className="h-4 w-4" /> Browse Catalog</Button>
      </div>

      <EmptyState 
        title="Explore Resources" 
        description="Your personalized learning materials will appear here once you generate a learning roadmap."
        icon={<BookOpen className="h-6 w-6" />}
        action={<Button variant="outline">Go to Roadmap</Button>}
      />
    </div>
  );
}
