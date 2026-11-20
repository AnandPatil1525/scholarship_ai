import React, { useEffect } from 'react';
import { COMMON_DOCUMENTS } from '../data/indianStates';
import { 
  X, 
  FolderCheck, 
  CheckSquare, 
  Square, 
  ShieldCheck, 
  RotateCcw
} from 'lucide-react';

interface DocumentLockerModalProps {
  isOpen: boolean;
  onClose: () => void;
  checkedDocs: string[];
  onToggleDoc: (docName: string) => void;
  onClearDocs: () => void;
  totalSchemesCount: number;
}

export const DocumentLockerModal: React.FC<DocumentLockerModalProps> = ({
  isOpen,
  onClose,
  checkedDocs,
  onToggleDoc,
  onClearDocs
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const readinessPercent = Math.round((checkedDocs.length / COMMON_DOCUMENTS.length) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto no-print">
      <div 
        className="relative w-full max-w-2xl bg-[#0c1220] text-slate-100 rounded-3xl shadow-2xl border border-slate-700/80 overflow-hidden my-auto max-h-[90vh] flex flex-col animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-emerald-950 via-[#0a1a1f] to-slate-950 text-white flex items-start justify-between border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2">
              <FolderCheck className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                My Document Locker (दस्तावेज़ लॉकर)
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Mark certificates you already have ready (physically or on DigiLocker).
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Readiness Meter */}
        <div className="p-6 pb-3 border-b border-slate-800 bg-emerald-950/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400">
              Document Readiness Score
            </span>
            <span className="text-sm font-black text-emerald-300">
              {checkedDocs.length} of {COMMON_DOCUMENTS.length} ready ({readinessPercent}%)
            </span>
          </div>
          <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div 
              className="bg-emerald-500 h-full transition-all duration-300"
              style={{ width: `${readinessPercent}%` }}
            />
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Having these ready saves you multiple visits to the Tahsildar / Cyber Cafe during the busy application season.
          </p>
        </div>

        {/* Scrollable Document Checklist */}
        <div className="p-6 space-y-3 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {COMMON_DOCUMENTS.map((doc) => {
              const isChecked = checkedDocs.includes(doc.name);
              return (
                <div
                  key={doc.id}
                  onClick={() => onToggleDoc(doc.name)}
                  className={`p-3.5 rounded-2xl border cursor-pointer select-none transition-all flex items-start space-x-3 ${
                    isChecked
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 ring-1 ring-emerald-500/30'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  {isChecked ? (
                    <CheckSquare className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">
                      {doc.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                      {doc.hindiName}
                    </p>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      {doc.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* DigiLocker tip */}
          <div className="mt-4 p-4 rounded-2xl bg-blue-950/40 border border-blue-500/30 text-xs text-blue-300 flex items-start space-x-3">
            <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white">Government DigiLocker Integration Tip:</span>
              <p className="mt-0.5 text-blue-300">
                Aadhaar, Class 10/12 Marksheets, and Domicile certificates downloaded from DigiLocker are legally valid under IT Act 2000 for National Scholarship Portal (NSP) applications.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={onClearDocs}
            className="flex items-center space-x-1.5 text-xs font-bold text-slate-400 hover:text-red-400 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Locker</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors border border-slate-700"
          >
            Done & Return
          </button>
        </div>
      </div>
    </div>
  );
};
