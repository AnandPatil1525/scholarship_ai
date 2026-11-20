import React from 'react';
import { 
  CheckCircle2, 
  Calendar, 
  Building2, 
  FileCheck
} from 'lucide-react';
import { translations, SupportedLang } from '../i18n/translations';

interface DashboardStatsProps {
  totalSchemes: number;
  eligibleCount: number;
  likelyCount: number;
  urgentCount: number;
  docReadinessPercent: number;
  lang: SupportedLang;
  onFilterEligibleOnly: () => void;
  onFilterUrgentOnly: () => void;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({
  totalSchemes,
  eligibleCount,
  likelyCount,
  urgentCount,
  docReadinessPercent,
  lang,
  onFilterEligibleOnly,
  onFilterUrgentOnly
}) => {
  const t = translations[lang];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 no-print">
      {/* 1. Matched Schemes */}
      <div 
        onClick={onFilterEligibleOnly}
        className="p-5 rounded-2xl bg-[#0c1220]/90 border border-emerald-500/30 shadow-lg hover:border-emerald-500/60 transition-all cursor-pointer group backdrop-blur-md"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
            {t.matchedCountText}
          </span>
          <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2.5 flex items-baseline space-x-2">
          <span className="text-2xl sm:text-4xl font-black text-emerald-400">
            {eligibleCount}
          </span>
          <span className="text-xs text-slate-400 font-semibold">
            / {totalSchemes} total
          </span>
        </div>
        <p className="text-[11px] text-emerald-400/90 font-semibold mt-1">
          {likelyCount > 0 ? `+ ${likelyCount} likely eligible` : '100% verified match'}
        </p>
      </div>

      {/* 2. Deadlines within 30 days */}
      <div 
        onClick={onFilterUrgentOnly}
        className="p-5 rounded-2xl bg-[#0c1220]/90 border border-amber-500/30 shadow-lg hover:border-amber-500/60 transition-all cursor-pointer group backdrop-blur-md"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
            {t.urgentDeadlines}
          </span>
          <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Calendar className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2.5 flex items-baseline space-x-2">
          <span className="text-2xl sm:text-4xl font-black text-amber-400">
            {urgentCount}
          </span>
          <span className="text-xs text-slate-400 font-semibold">
            schemes
          </span>
        </div>
        <p className="text-[11px] text-amber-400/90 font-semibold mt-1">
          Apply soon to avoid portal rush
        </p>
      </div>

      {/* 3. Central & State Portals */}
      <div className="p-5 rounded-2xl bg-[#0c1220]/90 border border-blue-500/30 shadow-lg backdrop-blur-md">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
            Official Portals
          </span>
          <div className="w-8 h-8 rounded-xl bg-blue-500/15 text-blue-400 border border-blue-500/30 flex items-center justify-center">
            <Building2 className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2.5 flex items-baseline space-x-2">
          <span className="text-2xl sm:text-3xl font-black text-blue-400">
            NSP + DBT
          </span>
        </div>
        <p className="text-[11px] text-blue-400/90 font-semibold mt-1">
          Direct scholarship links
        </p>
      </div>

      {/* 4. Document Readiness */}
      <div className="p-5 rounded-2xl bg-[#0c1220]/90 border border-slate-800 shadow-lg backdrop-blur-md">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
            Doc Readiness
          </span>
          <div className="w-8 h-8 rounded-xl bg-slate-800 text-slate-300 border border-slate-700 flex items-center justify-center">
            <FileCheck className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2.5 flex items-baseline space-x-2">
          <span className="text-2xl sm:text-4xl font-black text-white">
            {docReadinessPercent}%
          </span>
          <span className="text-xs text-slate-400 font-semibold">
            ready
          </span>
        </div>
        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2.5">
          <div 
            className="bg-emerald-500 h-full transition-all"
            style={{ width: `${docReadinessPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
};
