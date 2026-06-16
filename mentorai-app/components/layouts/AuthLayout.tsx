"use client";

import { Brain } from "lucide-react";
import Link from "next/link";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/20 p-4">
      <Link href="/" className="mb-8 flex items-center gap-2">
        <Brain className="h-8 w-8 text-primary" />
        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
          MentorAI
        </span>
      </Link>
      <div className="w-full max-w-md bg-card border rounded-xl shadow-lg p-6">
        {children}
      </div>
    </div>
  );
}
