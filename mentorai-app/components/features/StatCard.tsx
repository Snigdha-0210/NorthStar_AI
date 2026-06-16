import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: { value: number; isPositive: boolean };
  description?: string;
}

export function StatCard({ title, value, icon, trend, description }: StatCardProps) {
  return (
    <div className="glass-card p-6 rounded-xl flex flex-col group relative overflow-hidden">
      <div className="flex justify-between items-start mb-4">
        <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">{title}</p>
        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-on-surface">
          {icon}
        </div>
      </div>
      <div className="flex items-end gap-2 mt-auto">
        <h3 className="font-display-lg text-4xl text-on-surface leading-none">{value}</h3>
        {trend && (
          <span className={`font-label-sm mb-1 ${trend.isPositive ? "text-tertiary" : "text-error"}`}>
            {trend.isPositive ? "+" : "-"}{trend.value}%
          </span>
        )}
      </div>
      {description && <p className="font-body-md text-xs text-on-surface-variant mt-2">{description}</p>}
    </div>
  );
}
