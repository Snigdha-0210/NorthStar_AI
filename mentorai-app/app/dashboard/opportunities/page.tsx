"use client";
import { useAppStore } from "@/store/useAppStore";
import { OpportunityCard } from "@/components/features/OpportunityCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function OpportunitiesPage() {
  const { opportunities } = useAppStore();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Opportunity Center</h1>
          <p className="text-muted-foreground">Discover jobs and gigs tailored to your career twin profile.</p>
        </div>
        <Button className="gap-2"><Search className="h-4 w-4" /> Find New Roles</Button>
      </div>

      {opportunities.length === 0 ? (
        <EmptyState 
          title="No opportunities found" 
          description="We couldn't find matches right now. Try updating your skills or resume."
          action={<Button variant="outline">Update Profile</Button>}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {opportunities.map(opportunity => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
          ))}
        </div>
      )}
    </div>
  );
}
