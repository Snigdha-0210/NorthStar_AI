"use client";

import { motion } from "framer-motion";
import { Activity, ShieldAlert, LineChart, TrendingUp } from "lucide-react";

export function CareerTwinWidget({ twinData }: { twinData: any }) {
  if (!twinData) return null;

  return (
    <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 backdrop-blur-xl border border-indigo-500/20 rounded-3xl p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full" />
      
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
          <Activity size={20} />
        </div>
        <h3 className="font-bold text-white text-lg">Career Twin Forecast</h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-black/30 rounded-2xl p-4 border border-white/5">
          <div className="text-white/50 text-sm mb-1">Placement Readiness</div>
          <div className="text-2xl font-bold text-white flex items-end gap-2">
            {(twinData.placement_readiness * 100).toFixed(0)}%
            <TrendingUp size={16} className="text-green-400 mb-1" />
          </div>
        </div>

        <div className="bg-black/30 rounded-2xl p-4 border border-white/5">
          <div className="text-white/50 text-sm mb-1">Future Salary Est.</div>
          <div className="text-xl font-bold text-green-400">
            {twinData.future_salary_estimate}
          </div>
        </div>
      </div>

      {twinData.career_risk_level === 'High' && (
        <div className="mt-4 bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex gap-3">
          <ShieldAlert className="text-red-400 shrink-0" size={20} />
          <div>
            <div className="text-red-200 text-sm font-semibold">High Risk Detected</div>
            <div className="text-red-400/80 text-xs mt-1">
              Your skills {twinData.skill_obsolescence_warning?.join(", ")} may become obsolete soon.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
