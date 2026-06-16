"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: "dashboard" },
  { name: "Memory Hub", href: "/dashboard/memory-hub", icon: "memory" },
  { name: "Career Discovery", href: "/dashboard/career-discovery", icon: "explore" },
  { name: "Roadmaps", href: "/dashboard/roadmap", icon: "map" },
  { name: "Resources", href: "/dashboard/resources", icon: "library_books" },
  { name: "Projects", href: "/dashboard/execution", icon: "work" },
  { name: "Resume Builder", href: "/dashboard/resume-builder", icon: "description" },
  { name: "Interview Prep", href: "/dashboard/interview", icon: "record_voice_over" },
  { name: "Agents", href: "/dashboard/multi-agent", icon: "smart_toy" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 hidden md:flex flex-col bg-surface-container-low border-r border-white/5 z-50">
      <div className="flex flex-col h-full py-6">
        <div className="px-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-container rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary-container font-bold">psychology</span>
            </div>
            <div>
              <Link href="/">
                <h1 className="font-headline-md text-headline-md font-bold text-primary-container leading-none">MentorAI</h1>
              </Link>
              <p className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-widest mt-1">Career OS</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={
                    isActive
                      ? "bg-primary-container/10 text-primary-container border-r-2 border-primary-container px-4 py-3 flex items-center gap-3 transition-all duration-200 translate-x-1"
                      : "text-on-surface-variant hover:bg-surface-variant/50 px-4 py-3 flex items-center gap-3 transition-all duration-200"
                  }
                >
                  <span className="material-symbols-outlined" style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>{item.icon}</span>
                  <span className="font-label-md text-label-md">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>
        <div className="px-4 mt-auto">
          <div className="flex flex-col gap-1">
            <Link href="/dashboard/settings" className="text-on-surface-variant hover:text-primary transition-colors py-2 flex items-center gap-3">
              <span className="material-symbols-outlined">settings</span>
              <span className="font-label-md text-label-md">Settings</span>
            </Link>
            <Link href="#" className="text-on-surface-variant hover:text-primary transition-colors py-2 flex items-center gap-3">
              <span className="material-symbols-outlined">help</span>
              <span className="font-label-md text-label-md">Help</span>
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
