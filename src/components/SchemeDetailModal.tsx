import React, { useEffect } from 'react';
import { Scheme, MatchResult } from '../types';
import { formatDate, getDaysRemaining, formatIndianCurrency } from '../utils/formatters';
import { 
  X, 
  ExternalLink, 
  Bookmark, 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  Calendar, 
  FileCheck, 
  Building2, 
  Info, 
  CheckSquare, 
  Square,
  Award
} from 'lucide-react';

interface SchemeDetailModalProps {
  scheme: Scheme | null;
  matchResult?: MatchResult;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onClose: () => void;
  checkedDocs: string[];
  onToggleDoc: (docName: string) => void;
}

export const SchemeDetailModal: React.FC<SchemeDetailModalProps> = ({
  scheme,
  matchResult,
  isSaved,
  onToggleSave,
  onClose,
  checkedDocs,
  onToggleDoc
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!scheme) return null;

  const daysLeft = getDaysRemaining(scheme.deadline);
  const readyDocs = scheme.documentsRequired.filter(d => checkedDocs.includes(d));
  const docPercent = Math.round((readyDocs.length / scheme.documentsRequired.length) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto no-print">
      <div 
        className="relative w-full max-w-3xl bg-[#0c1220] text-slate-100 rounded-3xl shadow-2xl border border-slate-700/80 overflow-hidden my-auto max-h-[90vh] flex flex-col animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-950 via-[#0e1628] to-slate-950 text-white flex items-start justify-between border-b border-slate-800">
          <div className="pr-4">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-200 border border-slate-700">
                {scheme.provider === 'State' ? `State Govt • ${scheme.state}` : `${scheme.provider} Scheme`}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/30">
                Mode: {scheme.applicationMode}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              {scheme.name}
            </h2>
            {scheme.hindiName && (
              <p className="text-sm text-slate-400 font-medium mt-0.5">
                {scheme.hindiName}
              </p>
            )}
            <p className="text-xs text-slate-400 mt-1 flex items-center space-x-1">
              <Building2 className="w-3.5 h-3.5 text-slate-500" />
              <span>{scheme.providerName}</span>
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => onToggleSave(scheme.id)}
              className={`p-2 rounded-xl border transition-colors ${
                isSaved 
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' 
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
              }`}
              title={isSaved ? 'Bookmarked' : 'Bookmark this scheme'}
            >
              <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Eligibility Alert (if evaluated) */}
          {matchResult && (
            <div className={`p-4 rounded-2xl border ${
              matchResult.status === 'Eligible'
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                : matchResult.status === 'Possibly Eligible'
                ? 'bg-amber-950/40 border-amber-500/40 text-amber-300'
                : 'bg-slate-900 border-slate-700 text-slate-400'
            }`}>
              <div className="flex items-center space-x-2 font-bold text-sm sm:text-base">
                {matchResult.status === 'Eligible' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : matchResult.status === 'Possibly Eligible' ? (
                  <AlertCircle className="w-5 h-5 text-amber-400" />
                ) : (
                  <XCircle className="w-5 h-5 text-slate-500" />
                )}
                <span>Your Match Status: {matchResult.status} ({matchResult.score}%)</span>
              </div>
              <div className="mt-2 text-xs space-y-1">
                {matchResult.criteriaBreakdown.map((c, i) => (
                  <div key={i} className="flex items-start space-x-1.5">
                    <span className="font-semibold text-slate-300">{c.label}:</span>
                    <span className={c.passed ? 'text-emerald-400 font-medium' : c.neutral ? 'text-amber-400' : 'text-red-400'}>
                      {c.reason}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Benefits Callout */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-950/40 via-amber-950/30 to-slate-900 border border-orange-500/30">
            <div className="flex items-center space-x-2 text-orange-400 font-bold text-sm mb-1">
              <Award className="w-4 h-4 text-orange-400" />
              <span>Financial Assistance & Scholarship Benefits</span>
            </div>
            <p className="text-base sm:text-lg font-black text-white">
              {scheme.benefits}
            </p>
          </div>

          {/* Key Eligibility Rules Matrix */}
          <div>
            <h4 className="font-extrabold text-slate-300 text-sm uppercase tracking-wider mb-2.5">
              Eligibility Criteria
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
                <span className="text-slate-400 font-semibold block">Max Family Income</span>
                <span className="font-bold text-white text-sm mt-0.5 block">
                  {scheme.maxFamilyIncome ? `≤ ${formatIndianCurrency(scheme.maxFamilyIncome)}` : 'No Income Cap'}
                </span>
              </div>

              <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
                <span className="text-slate-400 font-semibold block">Min Qualifying Marks</span>
                <span className="font-bold text-white text-sm mt-0.5 block">
                  {scheme.minMarksPercent ? `${scheme.minMarksPercent}% or above` : 'Pass Grade'}
                </span>
              </div>

              <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
                <span className="text-slate-400 font-semibold block">Eligible Gender</span>
                <span className="font-bold text-white text-sm mt-0.5 block">
                  {scheme.gender === 'Any' ? 'All (Boys & Girls)' : `${scheme.gender} Only`}
                </span>
              </div>

              <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
                <span className="text-slate-400 font-semibold block">Target Categories</span>
                <span className="font-bold text-white text-sm mt-0.5 block">
                  {scheme.categories.join(', ')}
                </span>
              </div>

              <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
                <span className="text-slate-400 font-semibold block">Education Level</span>
                <span className="font-bold text-white text-sm mt-0.5 block truncate">
                  {scheme.educationLevels.join(', ')}
                </span>
              </div>

              <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
                <span className="text-slate-400 font-semibold block">State / Domicile</span>
                <span className="font-bold text-white text-sm mt-0.5 block">
                  {scheme.state}
                </span>
              </div>
            </div>
            <p className="mt-2.5 text-xs text-slate-300 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <span className="font-bold text-orange-400">Criteria Note: </span>
              {scheme.eligibilityText}
            </p>
          </div>

          {/* Scheme Description */}
          <div>
            <h4 className="font-extrabold text-slate-300 text-sm uppercase tracking-wider mb-1.5">
              About This Scheme
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              {scheme.description}
            </p>
          </div>

          {/* Interactive Document Checklist */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="font-extrabold text-white text-sm flex items-center space-x-1.5">
                  <FileCheck className="w-4 h-4 text-emerald-400" />
                  <span>Required Documents Checklist</span>
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Check off the documents you have ready to track your readiness.
                </p>
              </div>

              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 self-start sm:self-auto">
                {readyDocs.length} of {scheme.documentsRequired.length} ready ({docPercent}%)
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 ${
                  docPercent === 100 ? 'bg-emerald-500' : 'bg-orange-500'
                }`}
                style={{ width: `${docPercent}%` }}
              />
            </div>

            {/* Documents List with Checkboxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {scheme.documentsRequired.map((doc, idx) => {
                const isChecked = checkedDocs.includes(doc);
                return (
                  <div
                    key={idx}
                    onClick={() => onToggleDoc(doc)}
                    className={`p-3 rounded-xl border cursor-pointer select-none transition-all flex items-start space-x-2.5 ${
                      isChecked
                        ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 font-medium'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                    )}
                    <span className="text-xs leading-snug">{doc}</span>
                  </div>
                );
              })}
            </div>

            <div className="p-3 bg-blue-950/40 rounded-xl border border-blue-500/30 text-xs text-blue-300 flex items-start space-x-2">
              <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span>
                <strong>Cyber Cafe / CSC Kendra Tip:</strong> Ensure scanned PDF sizes are under 200KB and student bank passbook is active with Aadhaar/NPCI seeding.
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer / Direct Apply */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-400 flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-slate-500" />
            <span>
              Application Deadline: <strong className="text-white">{formatDate(scheme.deadline)}</strong>
              {daysLeft !== null && daysLeft >= 0 && (
                <span className="ml-1 text-orange-400 font-bold">({daysLeft} days remaining)</span>
              )}
            </span>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors"
            >
              Close
            </button>

            <a
              href={scheme.officialLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center space-x-2 px-6 py-2.5 text-xs font-bold text-white bg-orange-600 hover:bg-orange-500 rounded-xl shadow-lg shadow-orange-600/30 transition-all"
            >
              <span>Apply on Official Portal</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
