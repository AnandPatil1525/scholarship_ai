import React, { useState } from 'react';
import { 
  GraduationCap, 
  Bookmark, 
  FolderCheck, 
  Printer, 
  Globe, 
  Menu, 
  X, 
  Sparkles, 
  SlidersHorizontal, 
  Compass, 
  User, 
  ShieldCheck, 
  Layers
} from 'lucide-react';
import { translations, SupportedLang, LANGUAGES } from '../i18n/translations';
import { UserAccount } from './AuthModal';

interface NavbarProps {
  lang: SupportedLang;
  setLang: (lang: SupportedLang) => void;
  savedCount: number;
  openSavedModal: () => void;
  openLockerModal: () => void;
  openPrintModal: () => void;
  openAuthModal: () => void;
  currentUser: UserAccount | null;
  activeTab: 'wizard' | 'browse' | 'saved';
  setActiveTab: (tab: 'wizard' | 'browse' | 'saved') => void;
  lockerDocCount: number;
  onScrollToSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  setLang,
  savedCount,
  openSavedModal,
  openLockerModal,
  openPrintModal,
  openAuthModal,
  currentUser,
  activeTab,
  setActiveTab,
  lockerDocCount,
  onScrollToSection
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const t = translations[lang] || translations.en;

  const currentLangObj = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];

  return (
    <header className="sticky top-0 z-40 bg-[#0b0f19]/90 backdrop-blur-xl border-b border-slate-800 shadow-lg no-print">
      {/* Top micro-bar for Government / National portal awareness */}
      <div className="bg-[#05070c] text-slate-400 text-xs py-1.5 px-4 hidden md:flex items-center justify-between border-b border-slate-800/80">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]"></span>
          <span className="text-slate-300 font-medium">ScholarSpot National & State Scholarship Matrix (2026-27 Session)</span>
        </div>
        <div className="flex items-center space-x-4 text-slate-400 text-[11px]">
          <span className="flex items-center space-x-1">
            <span className="text-orange-400 font-semibold">100% Free & Open Access</span>
          </span>
          <span>•</span>
          <span>Direct National Scholarship Portal (NSP) & State DBT Links</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand: ScholarSpot */}
          <div 
            onClick={() => { setActiveTab('wizard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-600 via-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform border border-orange-400/30">
              <GraduationCap className="w-6 h-6 text-white" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center border-2 border-[#0b0f19] shadow-xs">
                <Sparkles className="w-2.5 h-2.5 text-white" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-black text-xl tracking-tight text-white group-hover:text-orange-400 transition-colors">
                  Scholar<span className="text-orange-500">Spot</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 font-black border border-orange-500/30">
                  स्कॉलरस्पॉट
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium leading-none hidden sm:block mt-0.5">
                India's Premier Scholarship & Scheme Finder
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-1.5">
            <button
              onClick={() => setActiveTab('wizard')}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-extrabold transition-all ${
                activeTab === 'wizard'
                  ? 'bg-orange-500/15 text-orange-400 border border-orange-500/30 shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-orange-400" />
              <span>{t.checkEligibility}</span>
            </button>

            <button
              onClick={() => setActiveTab('browse')}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-extrabold transition-all ${
                activeTab === 'browse'
                  ? 'bg-orange-500/15 text-orange-400 border border-orange-500/30 shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-blue-400" />
              <span>{t.browseAll}</span>
            </button>

            <button
              onClick={() => onScrollToSection('category-hubs')}
              className="flex items-center space-x-1 px-3 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
            >
              <Layers className="w-3.5 h-3.5 text-purple-400" />
              <span>Categories</span>
            </button>

            <button
              onClick={() => onScrollToSection('languages-section')}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>Languages ({LANGUAGES.length})</span>
            </button>

            <button
              onClick={openLockerModal}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-extrabold text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all relative"
            >
              <FolderCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.myDocuments}</span>
              {lockerDocCount > 0 && (
                <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-black text-emerald-300 bg-emerald-500/20 rounded-full border border-emerald-500/30">
                  {lockerDocCount}
                </span>
              )}
            </button>

            <button
              onClick={openSavedModal}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-extrabold text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all relative"
            >
              <Bookmark className={`w-3.5 h-3.5 ${savedCount > 0 ? 'text-amber-400 fill-amber-400' : 'text-slate-400'}`} />
              <span>{t.savedSchemes}</span>
              {savedCount > 0 && (
                <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-black text-white bg-orange-600 rounded-full">
                  {savedCount}
                </span>
              )}
            </button>

            <button
              onClick={openPrintModal}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-300 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 transition-all"
              title="Print Application Pack for Cyber Cafe / CSC Kendra"
            >
              <Printer className="w-3.5 h-3.5 text-slate-300" />
              <span>Print Pack</span>
            </button>
          </nav>

          {/* Student Profile / Login & Language Dropdown */}
          <div className="flex items-center space-x-2.5">
            {currentUser ? (
              <button
                onClick={openAuthModal}
                className="flex items-center space-x-2 p-1.5 pr-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-bold text-slate-200 leading-none flex items-center space-x-1">
                    <span>{currentUser.name.split(' ')[0]}</span>
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  </div>
                  <span className="text-[10px] text-emerald-400 font-semibold">e-KYC Ready</span>
                </div>
              </button>
            ) : (
              <button
                onClick={openAuthModal}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-800/90 hover:bg-slate-700 text-slate-100 text-xs font-extrabold shadow-xs transition-all hover:border-orange-500/40"
              >
                <User className="w-3.5 h-3.5 text-orange-400" />
                <span>Student Sign In</span>
              </button>
            )}

            {/* Language Quick Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-slate-700 text-xs font-bold text-slate-200 bg-slate-800/80 hover:bg-slate-700 transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-orange-400" />
                <span>{currentLangObj.nativeName}</span>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 rounded-2xl bg-[#0c1220] border border-slate-700 shadow-2xl py-2 z-50">
                  <div className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-500 border-b border-slate-800 mb-1">
                    Select Language
                  </div>
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLang(l.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-1.5 text-left text-xs font-bold flex items-center justify-between transition-colors ${
                        lang === l.code ? 'text-orange-400 bg-orange-500/10' : 'text-slate-300 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <span>{l.nativeName}</span>
                      <span className="text-[10px] text-slate-500">{l.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#0b0f19] px-4 pt-3 pb-5 space-y-2 shadow-2xl animate-fadeIn">
          {currentUser ? (
            <div 
              onClick={() => { openAuthModal(); setMobileMenuOpen(false); }}
              className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-500/30 flex items-center justify-between cursor-pointer mb-2"
            >
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-bold text-sm flex items-center justify-center">
                  {currentUser.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{currentUser.name}</h4>
                  <span className="text-[10px] text-emerald-400 font-semibold">Aadhaar e-KYC Verified</span>
                </div>
              </div>
              <span className="text-xs text-emerald-400 font-bold underline">Dashboard</span>
            </div>
          ) : (
            <button
              onClick={() => { openAuthModal(); setMobileMenuOpen(false); }}
              className="w-full flex items-center justify-center space-x-2 p-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-extrabold mb-2 transition-colors shadow-md shadow-orange-600/30"
            >
              <User className="w-4 h-4" />
              <span>Student Sign In / e-KYC</span>
            </button>
          )}

          <button
            onClick={() => { setActiveTab('wizard'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold ${
              activeTab === 'wizard' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 'text-slate-300'
            }`}
          >
            <span className="flex items-center space-x-2">
              <SlidersHorizontal className="w-4 h-4 text-orange-400" />
              <span>{t.checkEligibility}</span>
            </span>
          </button>

          <button
            onClick={() => { setActiveTab('browse'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold ${
              activeTab === 'browse' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 'text-slate-300'
            }`}
          >
            <span className="flex items-center space-x-2">
              <Compass className="w-4 h-4 text-blue-400" />
              <span>{t.browseAll}</span>
            </span>
          </button>

          <button
            onClick={() => { onScrollToSection('languages-section'); setMobileMenuOpen(false); }}
            className="w-full flex items-center space-x-2 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:bg-slate-800"
          >
            <Globe className="w-4 h-4 text-emerald-400" />
            <span>Select Regional Language</span>
          </button>

          <button
            onClick={() => { onScrollToSection('category-hubs'); setMobileMenuOpen(false); }}
            className="w-full flex items-center space-x-2 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:bg-slate-800"
          >
            <Layers className="w-4 h-4 text-purple-400" />
            <span>Category Hubs</span>
          </button>

          <button
            onClick={() => { openLockerModal(); setMobileMenuOpen(false); }}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:bg-slate-800"
          >
            <span className="flex items-center space-x-2">
              <FolderCheck className="w-4 h-4 text-emerald-400" />
              <span>{t.myDocuments}</span>
            </span>
            {lockerDocCount > 0 && (
              <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30">
                {lockerDocCount} ready
              </span>
            )}
          </button>

          <button
            onClick={() => { openSavedModal(); setMobileMenuOpen(false); }}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:bg-slate-800"
          >
            <span className="flex items-center space-x-2">
              <Bookmark className="w-4 h-4 text-amber-400" />
              <span>{t.savedSchemes}</span>
            </span>
            {savedCount > 0 && (
              <span className="px-2 py-0.5 text-[10px] font-bold bg-orange-600 text-white rounded-full">
                {savedCount}
              </span>
            )}
          </button>

          <button
            onClick={() => { openPrintModal(); setMobileMenuOpen(false); }}
            className="w-full flex items-center space-x-2 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-200 bg-slate-800 border border-slate-700"
          >
            <Printer className="w-4 h-4 text-slate-300" />
            <span>Print Application Pack</span>
          </button>
        </div>
      )}
    </header>
  );
};
