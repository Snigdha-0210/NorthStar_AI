"use client";

import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background text-on-background font-body-md min-h-screen selection:bg-primary-container/30">
      <Sidebar />
      <Header />
      <main className="md:ml-64 pt-16 min-h-screen">
        <div className="max-w-[1440px] mx-auto p-gutter lg:p-margin-desktop">
          {children}
        </div>
      </main>
      
      {/* Floating Action Button (FAB) */}
      <button className="fixed bottom-8 right-8 w-16 h-16 bg-primary-container text-on-primary-container rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 orange-glow">
        <span className="material-symbols-outlined text-3xl">chat_bubble</span>
      </button>
    </div>
  );
}
