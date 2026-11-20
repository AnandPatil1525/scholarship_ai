import React, { useEffect } from 'react';
import { Scheme } from '../types';
import { formatDate, getDaysRemaining } from '../utils/formatters';
import { 
  X, 
  Bookmark, 
  Trash2, 
  ExternalLink, 
  Calendar, 
  ArrowRight
} from 'lucide-react';

interface SavedSchemesModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedSchemes: Scheme[];
  onRemoveSave: (id: string) => void;
  onSelectScheme: (scheme: Scheme) => void;
  onClearAll: () => void;
  onBrowse: () => void;
}

export const SavedSchemesModal: React.FC<SavedSchemesModalProps> = ({
  isOpen,
  onClose,
  savedSchemes,
  onRemoveSave,
  onSelectScheme,
  onClearAll,
  onBrowse
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto no-print">
      <div 
        className="relative w-full max-w-2xl bg-[#0c1220] text-slate-100 rounded-3xl shadow-2xl border border-slate-700/80 overflow-hidden my-auto max-h-[90vh] flex flex-col animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-amber-950 via-[#18140c] to-slate-950 text-white flex items-start justify-between border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <Bookmark className="w-5 h-5 text-amber-400 fill-current" />
            <div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                Saved Scholarships ({savedSchemes.length})
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Schemes you bookmarked for later review or submission.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 overflow-y-auto">
          {savedSchemes.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-3xl bg-slate-900 border border-slate-800 text-amber-400 mx-auto flex items-center justify-center mb-3">
                <Bookmark className="w-8 h-8" />
              </div>
              <h3 className="font-extrabold text-white text-base">No Saved Schemes Yet</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                Click the bookmark icon on any scholarship card to save it here for fast access.
              </p>
              <button
                onClick={() => { onClose(); onBrowse(); }}
                className="mt-4 px-5 py-2.5 text-xs font-bold text-white bg-orange-600 hover:bg-orange-500 rounded-xl transition-colors shadow-md shadow-orange-600/30"
              >
                Explore All Schemes
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {savedSchemes.map((scheme) => {
                const daysLeft = getDaysRemaining(scheme.deadline);
                return (
                  <div
                    key={scheme.id}
                    className="p-4 rounded-2xl border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/60"
                  >
                    <div className="flex-1 pr-2">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                          {scheme.provider}
                        </span>
                        {daysLeft !== null && daysLeft <= 30 && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-950/50 text-red-400 border border-red-500/30">
                            {daysLeft} days left
                          </span>
                        )}
                      </div>
                      <h4 
                        onClick={() => { onSelectScheme(scheme); }}
                        className="font-bold text-sm text-white hover:text-orange-400 cursor-pointer transition-colors"
                      >
                        {scheme.name}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                        {scheme.benefits}
                      </p>
                      <div className="flex items-center space-x-2 text-[11px] text-slate-500 mt-1">
                        <Calendar className="w-3 h-3" />
                        <span>Deadline: {formatDate(scheme.deadline)}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      <button
                        onClick={() => onSelectScheme(scheme)}
                        className="px-3 py-1.5 text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center space-x-1 border border-slate-700"
                      >
                        <span>Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>

                      <a
                        href={scheme.officialLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-orange-400 hover:bg-orange-500/20 rounded-lg border border-orange-500/30"
                        title="Open Portal"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>

                      <button
                        onClick={() => onRemoveSave(scheme.id)}
                        className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-950/30 rounded-lg transition-colors"
                        title="Remove from saved"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {savedSchemes.length > 0 && (
          <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={onClearAll}
              className="text-xs font-bold text-slate-400 hover:text-red-400 transition-colors"
            >
              Clear All Saved
            </button>

            <button
              onClick={onClose}
              className="px-5 py-2 text-xs font-bold text-white bg-slate-800 border border-slate-700 rounded-xl hover:bg-slate-700"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
