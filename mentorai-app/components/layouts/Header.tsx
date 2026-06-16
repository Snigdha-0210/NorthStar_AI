"use client";

import { useAppStore } from "@/store/useAppStore";

export function Header() {
  const { user } = useAppStore();

  return (
    <header className="fixed top-0 right-0 left-0 md:left-64 h-16 bg-surface/80 backdrop-blur-xl border-b border-white/5 z-40 flex items-center justify-between px-gutter">
      <div className="flex items-center gap-4 pl-4 md:pl-0">
        <h2 className="font-headline-md text-headline-md text-on-surface">Hello, {user?.name?.split(' ')[0] || 'Guest'} 👋</h2>
      </div>
      <div className="flex items-center gap-6 pr-4 md:pr-0">
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-surface-container-highest rounded-full border border-white/5">
          <span className="material-symbols-outlined text-secondary-container text-sm">database</span>
          <span className="font-label-sm text-label-sm">2,450 Tokens</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <div className="w-10 h-10 rounded-full border-2 border-primary-container p-0.5">
            {user?.avatarUrl ? (
              <img alt="User profile" className="w-full h-full rounded-full object-cover" src={user.avatarUrl} />
            ) : (
              <div className="w-full h-full rounded-full bg-primary-container/20 flex items-center justify-center text-primary-container font-bold">
                {user?.name?.charAt(0) || "U"}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
