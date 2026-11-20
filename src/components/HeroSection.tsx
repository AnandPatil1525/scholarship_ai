import React from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  Search, 
  CheckCircle2, 
  Building2, 
  Coins 
} from 'lucide-react';
import { translations, SupportedLang } from '../i18n/translations';

interface HeroSectionProps {
  lang: SupportedLang;
  onStartWizard: () => void;
  onBrowseAll: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  totalSchemesCount: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  onStartWizard,
  onBrowseAll,
  searchQuery,
  setSearchQuery,
  totalSchemesCount
}) => {
  const t = translations[lang] || translations.en;

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#0e1424] via-[#07090e] to-[#07090e] pt-10 pb-14 sm:pb-20 border-b border-slate-800/80 no-print">
      {/* Background ambient glowing mesh */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-10 w-[450px] h-[450px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-orange-500/30 text-orange-400 text-xs sm:text-sm font-semibold mb-6 shadow-lg shadow-orange-500/5">
            <Sparkles className="w-4 h-4 text-orange-400 animate-spin-slow" />
            <span>ScholarSpot • Unified National & State Scholarship Matrix (2026-27)</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-6xl font-black text-white tracking-tight leading-[1.15]">
            {lang === 'en' ? (
              <>
                Unlock Every Scholarship You <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-emerald-400">
                  Deserve & Qualify For
                </span>
              </>
            ) : (
              <>
                {t.tagline} <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-emerald-400">
                  {t.subtagline.slice(0, 40)}...
                </span>
              </>
            )}
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto">
            {t.subtagline}
          </p>

          {/* Search bar inside Hero for fast access */}
          <div className="mt-8 max-w-xl mx-auto">
            <div className="relative flex items-center shadow-2xl rounded-2xl bg-[#0e1628]/90 border border-slate-700/80 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/20 transition-all p-1.5 backdrop-blur-md">
              <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full px-3 py-2.5 text-sm sm:text-base bg-transparent text-white placeholder-slate-500 focus:outline-none font-medium"
              />
              <button
                onClick={onBrowseAll}
                className="px-5 py-2.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white rounded-xl text-sm font-extrabold shrink-0 transition-all shadow-md shadow-orange-600/30"
              >
                Search
              </button>
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 text-xs text-slate-400">
              <span className="font-bold text-slate-400">Trending Portals:</span>
              <button onClick={() => setSearchQuery('NSP')} className="hover:text-orange-400 underline transition-colors">PM-YASASVI</button>
              <span>•</span>
              <button onClick={() => setSearchQuery('MahaDBT')} className="hover:text-orange-400 underline transition-colors">MahaDBT EBC</button>
              <span>•</span>
              <button onClick={() => setSearchQuery('Girls')} className="hover:text-orange-400 underline transition-colors">AICTE Pragati</button>
              <span>•</span>
              <button onClick={() => setSearchQuery('Reliance')} className="hover:text-orange-400 underline transition-colors">Reliance UG</button>
              <span>•</span>
              <button onClick={() => setSearchQuery('SBI')} className="hover:text-orange-400 underline transition-colors">SBI Asha</button>
            </div>
          </div>

          {/* Dual Action CTAs */}
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              onClick={onStartWizard}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-7 py-4 rounded-2xl bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 hover:from-orange-500 hover:to-amber-500 text-white font-black text-base shadow-xl shadow-orange-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>{t.checkEligibility}</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={onBrowseAll}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-7 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 text-slate-200 font-bold text-base shadow-lg transition-all"
            >
              <Building2 className="w-4 h-4 text-slate-400" />
              <span>{t.browseAll} ({totalSchemesCount})</span>
            </button>
          </div>

          {/* Value Props Cards in Dark Theme */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            <div className="p-4 rounded-2xl bg-[#0d1424]/80 border border-slate-800 shadow-md backdrop-blur-md flex items-start space-x-3.5 hover:border-slate-700 transition-colors">
              <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20 shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-white text-sm">Eligibility Rule Engine</h4>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">Computes family income, domicile state, academic marks, and quota limits.</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0d1424]/80 border border-slate-800 shadow-md backdrop-blur-md flex items-start space-x-3.5 hover:border-slate-700 transition-colors">
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-white text-sm">DigiLocker Document Locker</h4>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">Know exact certificates needed (Aadhaar, Income, Caste, Bonafide) before applying.</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0d1424]/80 border border-slate-800 shadow-md backdrop-blur-md flex items-start space-x-3.5 hover:border-slate-700 transition-colors">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                <Coins className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-white text-sm">Direct Official Links</h4>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">Apply directly on authorized government & foundation portals with zero fees.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
