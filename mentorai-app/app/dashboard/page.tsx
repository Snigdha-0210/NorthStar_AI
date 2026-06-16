"use client";

import { useAppStore } from "@/store/useAppStore";
import Link from "next/link";

export default function DashboardPage() {
  const { user } = useAppStore();

  return (
    <>
      {/* Key Stats Header Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-8">
        <div className="glass-card p-6 rounded-xl flex items-center justify-between group">
          <div>
            <p className="font-label-md text-label-md text-on-surface-variant mb-1">Resume Score</p>
            <div className="flex items-end gap-2">
              <h3 className="font-display-lg text-4xl text-primary-container">85</h3>
              <span className="text-tertiary font-label-sm mb-2">+4 pts</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-primary-container/10 rounded-lg flex items-center justify-center text-primary-container">
            <span className="material-symbols-outlined text-3xl">description</span>
          </div>
        </div>
        <div className="glass-card p-6 rounded-xl flex items-center justify-between group">
          <div>
            <p className="font-label-md text-label-md text-on-surface-variant mb-1">Interview Readiness</p>
            <div className="flex items-end gap-2">
              <h3 className="font-display-lg text-4xl text-secondary-container">72%</h3>
              <span className="text-on-surface-variant font-label-sm mb-2">Steady</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-secondary-container/10 rounded-lg flex items-center justify-center text-secondary-container">
            <span className="material-symbols-outlined text-3xl">record_voice_over</span>
          </div>
        </div>
        <div className="glass-card p-6 rounded-xl flex items-center justify-between group">
          <div>
            <p className="font-label-md text-label-md text-on-surface-variant mb-1">Career Readiness</p>
            <div className="flex items-end gap-2">
              <h3 className="font-display-lg text-4xl text-tertiary">68%</h3>
              <span className="text-tertiary font-label-sm mb-2">+12%</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-tertiary/10 rounded-lg flex items-center justify-center text-tertiary">
            <span className="material-symbols-outlined text-3xl">trending_up</span>
          </div>
        </div>
      </div>

      {/* Bento Layout Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Main AI Match Column */}
        <div className="lg:col-span-8 flex flex-col gap-gutter">
          {/* Recommendation Card */}
          <section className="glass-card relative overflow-hidden rounded-xl p-8 orange-glow border-primary-container/20">
            <div className="absolute -right-10 -top-10 w-48 h-48 bg-primary-container/20 blur-3xl rounded-full"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-primary-container">bolt</span>
                <span className="font-label-md text-label-md text-primary-container uppercase tracking-widest">AI Opportunity Match</span>
              </div>
              <h3 className="font-headline-lg text-headline-lg mb-4 max-w-2xl">You&apos;re a 92% match for <span className="text-secondary-container">Junior Product Manager</span> roles at Startup X.</h3>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 max-w-xl">Based on your recent React certification and project portfolio, you&apos;re ahead of 88% of applicants for this role. We&apos;ve identified 3 skill gaps you can close in 5 days.</p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-primary-container text-on-primary px-8 py-3 rounded-lg font-bold hover:scale-105 transition-transform flex items-center gap-2">
                  Start Roadmap <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
                <button className="border border-white/10 hover:bg-white/5 px-8 py-3 rounded-lg font-bold transition-colors">
                  View Role Details
                </button>
              </div>
            </div>
          </section>

          {/* Growth Trends */}
          <section className="glass-card rounded-xl p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="font-headline-md text-headline-md">Skill Growth Trends</h3>
                <p className="font-body-md text-on-surface-variant">Your progress over the last 30 days</p>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-surface-container-highest rounded-md font-label-sm text-xs">WEEK</button>
                <button className="px-3 py-1 bg-primary-container/10 text-primary-container rounded-md font-label-sm text-xs">MONTH</button>
              </div>
            </div>
            <div className="h-64 w-full flex items-end justify-between gap-4">
              <div className="flex-1 flex flex-col items-center gap-3">
                <div className="w-full bg-white/5 rounded-t-lg relative h-32 overflow-hidden">
                  <div className="absolute bottom-0 w-full bg-primary-container/40 h-full transform origin-bottom transition-all duration-1000" style={{ height: "40%" }}></div>
                </div>
                <span className="font-label-sm text-[10px]">W1</span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-3">
                <div className="w-full bg-white/5 rounded-t-lg relative h-32 overflow-hidden">
                  <div className="absolute bottom-0 w-full bg-primary-container/60 h-full" style={{ height: "55%" }}></div>
                </div>
                <span className="font-label-sm text-[10px]">W2</span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-3">
                <div className="w-full bg-white/5 rounded-t-lg relative h-32 overflow-hidden">
                  <div className="absolute bottom-0 w-full bg-primary-container/80 h-full" style={{ height: "75%" }}></div>
                </div>
                <span className="font-label-sm text-[10px]">W3</span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-3">
                <div className="w-full bg-white/5 rounded-t-lg relative h-32 overflow-hidden">
                  <div className="absolute bottom-0 w-full bg-primary-container h-full" style={{ height: "90%" }}></div>
                </div>
                <span className="font-label-sm text-[10px]">W4</span>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar Content Column */}
        <div className="lg:col-span-4 flex flex-col gap-gutter">
          {/* Weekly Goals */}
          <section className="glass-card rounded-xl p-6 h-fit">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-headline-md text-headline-md">Weekly Goals</h3>
              <button className="text-primary-container">
                <span className="material-symbols-outlined">add_circle</span>
              </button>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-surface-container-low rounded-lg border border-white/5 flex items-start gap-4">
                <div className="w-6 h-6 border-2 border-primary-container rounded flex items-center justify-center shrink-0 mt-1">
                  <span className="material-symbols-outlined text-primary-container text-sm">check</span>
                </div>
                <div>
                  <p className="font-body-md font-semibold mb-1">Complete React Certification</p>
                  <p className="text-xs text-on-surface-variant">Coursera • 85% Progress</p>
                </div>
              </div>
              <div className="p-4 bg-surface-container-low rounded-lg border border-white/5 flex items-start gap-4">
                <div className="w-6 h-6 border-2 border-white/10 rounded flex items-center justify-center shrink-0 mt-1"></div>
                <div>
                  <p className="font-body-md font-semibold mb-1">Mock Interview with Recruiter</p>
                  <p className="text-xs text-on-surface-variant">Scheduled for Friday, 3 PM</p>
                </div>
              </div>
            </div>
          </section>

          {/* Upcoming Tasks */}
          <section className="glass-card rounded-xl p-6 h-fit">
            <h3 className="font-headline-md text-headline-md mb-6">Upcoming Tasks</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-lg flex flex-col items-center justify-center shrink-0">
                  <span className="font-label-sm text-[10px] text-on-surface-variant">OCT</span>
                  <span className="font-bold">24</span>
                </div>
                <div className="flex-1">
                  <p className="font-body-md font-semibold">System Design Workshop</p>
                  <p className="text-xs text-on-surface-variant">Live with Senior Eng at Google</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-lg flex flex-col items-center justify-center shrink-0">
                  <span className="font-label-sm text-[10px] text-on-surface-variant">OCT</span>
                  <span className="font-bold">26</span>
                </div>
                <div className="flex-1">
                  <p className="font-body-md font-semibold">Resume Submission Deadline</p>
                  <p className="text-xs text-on-surface-variant">Summer Intern Program &apos;25</p>
                </div>
              </div>
            </div>
          </section>

          {/* Opportunity Alerts */}
          <section className="glass-card rounded-xl p-6 bg-tertiary/5 border-tertiary/10">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-tertiary">stars</span>
              <h3 className="font-headline-md text-headline-md">Opportunity Alerts</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-white/5">
                <div>
                  <p className="font-body-md font-semibold">Stripe Fellowships</p>
                  <p className="text-xs text-on-surface-variant">Applications Open</p>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant hover:text-white cursor-pointer">arrow_forward</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-white/5">
                <div>
                  <p className="font-body-md font-semibold">OpenAI Hackathon</p>
                  <p className="text-xs text-on-surface-variant">San Francisco • Nov 10</p>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant hover:text-white cursor-pointer">arrow_forward</span>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Detailed Roadmap Section */}
      <section className="mt-16 mb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-headline-lg text-headline-lg mb-2">AI Career Path</h2>
            <p className="font-body-lg text-on-surface-variant">The path from Student to Senior Product Manager</p>
          </div>
          <button className="flex items-center gap-2 text-primary-container font-bold group">
            Full View <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">east</span>
          </button>
        </div>
        <div className="glass-card rounded-xl p-8 overflow-hidden relative">
          <div className="flex items-center justify-between relative z-10 overflow-x-auto custom-scrollbar">
            {/* Path Milestone 1 */}
            <div className="flex flex-col items-center gap-4 text-center shrink-0">
              <div className="w-16 h-16 rounded-full bg-tertiary flex items-center justify-center text-on-tertiary shadow-[0_0_20px_rgba(46,204,113,0.3)]">
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              </div>
              <div>
                <p className="font-label-md text-xs uppercase tracking-tighter text-tertiary">Completed</p>
                <p className="font-headline-md text-base">CS Fundamentals</p>
              </div>
            </div>
            <div className="h-1 w-24 mx-4 bg-tertiary rounded-full shrink-0"></div>
            
            {/* Path Milestone 2 (Active) */}
            <div className="flex flex-col items-center gap-4 text-center shrink-0">
              <div className="w-16 h-16 rounded-full bg-primary-container flex items-center justify-center text-on-primary shadow-[0_0_30px_rgba(255,107,53,0.4)] animate-pulse">
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
              </div>
              <div>
                <p className="font-label-md text-xs uppercase tracking-tighter text-primary-container">Current Phase</p>
                <p className="font-headline-md text-base">Portfolio Building</p>
              </div>
            </div>
            <div className="h-1 w-24 mx-4 bg-white/10 rounded-full border-dashed border-t shrink-0"></div>
            
            {/* Path Milestone 3 */}
            <div className="flex flex-col items-center gap-4 text-center opacity-50 shrink-0">
              <div className="w-16 h-16 rounded-full bg-surface-container-highest border border-white/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl">work</span>
              </div>
              <div>
                <p className="font-label-md text-xs uppercase tracking-tighter text-on-surface-variant">Phase 3</p>
                <p className="font-headline-md text-base">PM Internship</p>
              </div>
            </div>
            <div className="h-1 w-24 mx-4 bg-white/10 rounded-full border-dashed border-t shrink-0"></div>
            
            {/* Path Milestone 4 */}
            <div className="flex flex-col items-center gap-4 text-center opacity-30 shrink-0">
              <div className="w-16 h-16 rounded-full bg-surface-container-highest border border-white/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl">star</span>
              </div>
              <div>
                <p className="font-label-md text-xs uppercase tracking-tighter text-on-surface-variant">Future</p>
                <p className="font-headline-md text-base">Senior PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
