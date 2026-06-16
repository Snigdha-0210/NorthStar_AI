"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const glow = document.querySelector('.hero-gradient');
      if (glow) {
        const rect = glow.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePos({ x, y });
      }
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen overflow-x-hidden">
      {/* Navigation Shell */}
      <header className="fixed full-width top-0 w-full z-50 border-b border-white/5 bg-surface/80 backdrop-blur-xl shadow-sm">
        <nav className="flex justify-between items-center w-full px-gutter h-16 max-w-container-max mx-auto">
          <div className="flex items-center gap-8">
            <span className="font-headline-md text-headline-md font-bold text-primary-container">MentorAI</span>
            <div className="hidden md:flex items-center gap-6">
              <Link className="text-primary-container font-bold font-label-md text-label-md hover:text-primary transition-colors duration-200" href="/dashboard">Dashboard</Link>
              <a className="text-on-surface-variant font-label-md text-label-md hover:text-primary transition-colors duration-200" href="#features">Features</a>
              <a className="text-on-surface-variant font-label-md text-label-md hover:text-primary transition-colors duration-200" href="#pricing">Pricing</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-surface-container rounded-full border border-white/5">
              <span className="material-symbols-outlined text-primary-container text-sm">database</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">2,450 TOKENS</span>
            </div>
            <Link href="/register">
              <button className="bg-primary-container text-on-primary-container px-6 py-2 rounded-full font-bold text-label-md hover:scale-95 transition-transform">Get Started</button>
            </Link>
          </div>
        </nav>
      </header>

      <main className="relative pt-16">
        {/* Hero Section */}
        <section 
          className="relative pt-24 pb-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto hero-gradient"
          style={{ background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255, 107, 53, 0.12) 0%, transparent 70%)` }}
        >
          <div className="flex flex-col items-center text-center space-y-8 mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-container/10 border border-primary-container/20">
              <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
              <span className="font-label-sm text-label-sm text-primary-container uppercase tracking-widest">v2.0 Career OS Now Live</span>
            </div>
            <h1 className="font-display-lg text-display-lg max-w-4xl">
              Your Lifelong AI <br/><span className="text-primary-container">Career Mentor.</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              Experience the first Career Operating System. Navigate your professional growth with personalized roadmaps, real-time interview prep, and AI-driven resume optimization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/dashboard">
                <button className="bg-primary-container text-on-primary-container px-10 py-4 rounded-xl font-bold text-headline-md flex items-center gap-2 burnt-orange-glow hover:scale-105 transition-all w-full sm:w-auto">
                  Build Your Future <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </Link>
              <Link href="/login">
                <button className="border border-secondary-container text-secondary-container px-10 py-4 rounded-xl font-bold text-headline-md hover:bg-secondary-container/5 transition-colors w-full sm:w-auto">
                  View Demo
                </button>
              </Link>
            </div>
          </div>

          {/* Glassmorphic UI Mockup */}
          <div className="relative max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200 fill-mode-both">
            <div className="absolute inset-0 bg-primary-container/20 blur-[120px] rounded-full -z-10 opacity-30"></div>
            <div className="glass-card rounded-2xl overflow-hidden shadow-2xl p-4 md:p-8">
              <div className="grid grid-cols-12 gap-6">
                <div className="hidden md:block col-span-3 space-y-6">
                  <div className="h-8 w-32 bg-white/5 rounded-md"></div>
                  <div className="space-y-4">
                    <div className="h-10 bg-primary-container/10 border-r-2 border-primary-container w-full rounded-sm"></div>
                    <div className="h-10 bg-white/5 w-4/5 rounded-sm"></div>
                    <div className="h-10 bg-white/5 w-3/4 rounded-sm"></div>
                    <div className="h-10 bg-white/5 w-5/6 rounded-sm"></div>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-9 space-y-8">
                  <div className="flex justify-between items-center">
                    <div className="h-10 w-48 bg-white/10 rounded-lg"></div>
                    <div className="flex gap-2">
                      <div className="w-10 h-10 rounded-full bg-white/5"></div>
                      <div className="w-10 h-10 rounded-full bg-white/5"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="aspect-video bg-white/5 rounded-xl border border-white/5 flex items-center justify-center p-4">
                      <div className="w-full h-full rounded bg-gradient-to-br from-primary-container/20 to-transparent"></div>
                    </div>
                    <div className="aspect-video bg-white/5 rounded-xl border border-white/5 flex items-center justify-center p-4">
                      <div className="w-full h-full rounded bg-gradient-to-tr from-secondary-container/10 to-transparent"></div>
                    </div>
                  </div>
                  <div className="h-32 bg-white/5 rounded-xl border border-white/5"></div>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-6 -right-6 md:top-20 md:-right-12 glass-card px-6 py-4 rounded-xl border-primary-container/30 border hidden sm:block">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-tertiary-fixed-dim" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">MATCH SCORE</p>
                  <p className="font-headline-md text-headline-md text-tertiary-fixed-dim">98.4%</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Bento Grid */}
        <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h2 className="font-headline-lg text-headline-lg">Everything you need to <span className="text-primary-container">Ascend.</span></h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">The tools that transform professionals into industry leaders.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[320px]">
            {/* AI Memory */}
            <div className="md:col-span-8 glass-card rounded-2xl p-10 flex flex-col justify-between group overflow-hidden relative">
              <div className="relative z-10 space-y-4 max-w-md">
                <span className="material-symbols-outlined text-primary-container text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>memory</span>
                <h3 className="font-headline-md text-headline-md">AI Memory Hub</h3>
                <p className="text-on-surface-variant font-body-md">Store every project, meeting note, and breakthrough. Your mentor grows smarter the more you share, becoming a digital extension of your brain.</p>
              </div>
              <div className="absolute right-0 bottom-0 w-1/2 h-full opacity-20 group-hover:scale-110 transition-transform">
                <img alt="Memory Hub" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpyKiT3JT-BZgZb3SLJez53uUQyw4KfjTLMU7-ErJDQ4LuMZHS4rrXmH6zeH7s3ThGvn-ZvJ4dhX3EEQZZ9h7QSRrA3d203OINCNx2tRcmKDTTsWuMkHSseVtYOrs5yMPLsmjjkZcTSwRGSgu2s-wpmuKkiF9nZzE-VdSM5yNDlt3EZkmAUvM7qVVP-unVIKS17agRyqHy2p1V8axlNwa-lU9gDesQz_61I17bej5-ul_h2Cly-Dw1eeglrQRyMMw53ZrIN9qD-Fp5" />
              </div>
            </div>
            {/* Resume Optimization */}
            <div className="md:col-span-4 glass-card rounded-2xl p-10 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="material-symbols-outlined text-secondary-container text-4xl">description</span>
                <h3 className="font-headline-md text-headline-md">Resume Analyzer</h3>
              </div>
              <p className="text-on-surface-variant font-body-md">Real-time scoring against 500+ top-tier tech job descriptions. Automatic PDF tailoring in seconds.</p>
            </div>
            {/* Career Roadmaps */}
            <div className="md:col-span-4 glass-card rounded-2xl p-10 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="material-symbols-outlined text-tertiary-fixed text-4xl">map</span>
                <h3 className="font-headline-md text-headline-md">Roadmaps</h3>
              </div>
              <p className="text-on-surface-variant font-body-md">Dynamic paths that adjust as you learn. Forget linear courses; this is agile career development.</p>
            </div>
            {/* Interview Prep */}
            <div className="md:col-span-8 glass-card rounded-2xl p-10 flex flex-col md:flex-row gap-8 overflow-hidden">
              <div className="md:w-1/2 flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <span className="material-symbols-outlined text-primary-container text-4xl">mic</span>
                  <h3 className="font-headline-md text-headline-md">Voice Interview Prep</h3>
                </div>
                <p className="text-on-surface-variant font-body-md">Conduct mock interviews via voice. Get instant feedback on tone, clarity, and technical accuracy from the AI Mentor.</p>
              </div>
              <div className="md:w-1/2 h-full rounded-xl bg-surface-container-highest border border-white/5 p-4 flex flex-col gap-2">
                <div className="h-2 w-1/3 bg-primary-container/40 rounded"></div>
                <div className="h-4 w-full bg-white/5 rounded"></div>
                <div className="h-4 w-5/6 bg-white/5 rounded"></div>
                <div className="flex-grow flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border-2 border-primary-container flex items-center justify-center animate-pulse">
                    <span className="material-symbols-outlined text-primary-container">mic</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
