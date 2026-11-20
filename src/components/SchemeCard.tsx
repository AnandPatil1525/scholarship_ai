import React from 'react';
import { MatchResult, Scheme } from '../types';
import { formatDate, getDaysRemaining, formatIndianCurrency } from '../utils/formatters';
import { 
  Bookmark, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  Calendar, 
  FileCheck, 
  Building, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface SchemeCardProps {
  matchResult: MatchResult;
  isSaved: boolean;
  onToggleSave: (schemeId: string) => void;
  onSelect: (scheme: Scheme) => void;
  checkedDocs: string[];
}

export const SchemeCard: React.FC<SchemeCardProps> = ({
  matchResult,
  isSaved,
  onToggleSave,
  onSelect,
  checkedDocs
}) => {
  const { scheme, status, score, matchedReasons, failedReasons } = matchResult;
  const daysLeft = getDaysRemaining(scheme.deadline);

  // Calculate doc readiness for this specific scheme
  const readyDocsCount = scheme.documentsRequired.filter(d => checkedDocs.includes(d)).length;
  const totalDocs = scheme.documentsRequired.length;
  const docPercent = Math.round((readyDocsCount / totalDocs) * 100);

  // Provider badge styling in dark theme
  const getProviderBadge = () => {
    switch (scheme.provider) {
      case 'Central':
        return 'bg-blue-500/15 text-blue-400 border-blue-500/30';
      case 'State':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'Private':
        return 'bg-purple-500/15 text-purple-400 border-purple-500/30';
      case 'NGO':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className={`bg-[#0c1220]/90 rounded-3xl border transition-all duration-200 hover:shadow-2xl flex flex-col justify-between overflow-hidden relative backdrop-blur-md ${
      status === 'Eligible'
        ? 'border-emerald-500/40 hover:border-emerald-400 shadow-lg shadow-emerald-500/5'
        : status === 'Possibly Eligible'
        ? 'border-amber-500/40 hover:border-amber-400 shadow-lg shadow-amber-500/5'
        : 'border-slate-800/80 opacity-75 hover:opacity-100 hover:border-slate-700'
    }`}>
      {/* Top Bar / Category & Bookmark */}
      <div className="p-5 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border ${getProviderBadge()}`}>
              {scheme.provider === 'State' ? `State • ${scheme.state}` : `${scheme.provider} Govt / Entity`}
            </span>
            {scheme.featured && (
              <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-400 border border-orange-500/30 flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-orange-400" />
                <span>Featured</span>
              </span>
            )}
          </div>

          <button
            onClick={() => onToggleSave(scheme.id)}
            className={`p-1.5 rounded-xl border transition-colors ${
              isSaved
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                : 'border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            title={isSaved ? 'Remove from saved' : 'Save scheme'}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-400' : ''}`} />
          </button>
        </div>

        {/* Scheme Name & Ministry */}
        <h3 
          onClick={() => onSelect(scheme)}
          className="font-black text-base sm:text-lg text-white mt-2.5 hover:text-orange-400 cursor-pointer transition-colors line-clamp-2 leading-snug"
        >
          {scheme.name}
        </h3>
        {scheme.hindiName && (
          <p className="text-xs text-slate-400 font-semibold mt-0.5">
            {scheme.hindiName}
          </p>
        )}
        <div className="flex items-center space-x-1.5 text-xs text-slate-400 mt-1">
          <Building className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <span className="truncate">{scheme.providerName}</span>
        </div>

        {/* Eligibility Status Banner */}
        <div className="mt-3.5 pt-3 border-t border-slate-800/80">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center space-x-1.5">
              {status === 'Eligible' ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs font-black text-emerald-400">
                    100% Eligible
                  </span>
                </>
              ) : status === 'Possibly Eligible' ? (
                <>
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-xs font-black text-amber-400">
                    Likely Eligible ({score}%)
                  </span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-slate-500 shrink-0" />
                  <span className="text-xs font-black text-slate-500">
                    Not Eligible
                  </span>
                </>
              )}
            </div>

            <span className="text-[11px] font-bold text-slate-500">
              {matchedReasons.length} criteria passed
            </span>
          </div>

          {/* Reason Pills */}
          <div className="flex flex-wrap gap-1 mt-1.5">
            {matchedReasons.slice(0, 3).map((reason, i) => (
              <span key={i} className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/25">
                {reason}
              </span>
            ))}
            {failedReasons.slice(0, 2).map((reason, i) => (
              <span key={i} className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-red-500/10 text-red-300 border border-red-500/25">
                ✗ {reason}
              </span>
            ))}
          </div>
        </div>

        {/* Financial Aid & Benefits Box */}
        <div className="mt-3.5 p-3 rounded-2xl bg-slate-900/90 border border-slate-800">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-0.5">
            Grant & Financial Support
          </span>
          <p className="text-xs sm:text-sm font-black text-orange-400 line-clamp-2">
            {scheme.benefits}
          </p>
        </div>

        {/* Quick Criteria Tags */}
        <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-slate-400 font-medium">
          <div className="flex items-center space-x-1 truncate">
            <span className="text-slate-500">Income:</span>
            <span className="font-bold text-slate-200">
              {scheme.maxFamilyIncome ? `≤ ${formatIndianCurrency(scheme.maxFamilyIncome, true)}` : 'No Cap'}
            </span>
          </div>
          <div className="flex items-center space-x-1 truncate">
            <span className="text-slate-500">Education:</span>
            <span className="font-bold text-slate-200 truncate">
              {scheme.educationLevels.slice(0, 2).join(', ')}
            </span>
          </div>
        </div>
      </div>

      {/* Footer Area: Doc Readiness & Deadline */}
      <div className="p-4 bg-slate-950/70 border-t border-slate-800/80 space-y-3">
        {/* Document Readiness Progress */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold">
            <span className="flex items-center space-x-1">
              <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Doc Readiness:</span>
            </span>
            <span className={readyDocsCount === totalDocs ? 'text-emerald-400 font-bold' : 'text-slate-300'}>
              {readyDocsCount}/{totalDocs} ready ({docPercent}%)
            </span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all ${
                docPercent === 100 ? 'bg-emerald-500' : 'bg-orange-500'
              }`}
              style={{ width: `${docPercent}%` }}
            />
          </div>
        </div>

        {/* Deadline & Actions */}
        <div className="flex items-center justify-between pt-1">
          {/* Deadline */}
          <div className="flex items-center space-x-1 text-xs text-slate-300">
            <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="truncate">
              {formatDate(scheme.deadline)}
              {daysLeft !== null && daysLeft >= 0 && daysLeft <= 30 && (
                <span className={`ml-1 font-extrabold ${daysLeft <= 7 ? 'text-red-400' : 'text-amber-400'}`}>
                  ({daysLeft}d left)
                </span>
              )}
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onSelect(scheme)}
              className="inline-flex items-center space-x-1 px-3 py-1.5 text-xs font-extrabold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors"
            >
              <span>Details</span>
              <ArrowRight className="w-3 h-3" />
            </button>

            <a
              href={scheme.officialLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-orange-400 hover:text-white hover:bg-orange-600 border border-orange-500/30 rounded-xl transition-colors"
              title="Open Official Government Portal"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
