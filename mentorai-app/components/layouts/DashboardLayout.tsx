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
      
    </div>
  );
}
