import React, { useState, useEffect, useMemo } from 'react';
import schemesData from './data/schemes.json';
import { Scheme, UserProfile, FilterState, MatchResult } from './types';
import { evaluateEligibility } from './utils/eligibilityEngine';
import { getDaysRemaining } from './utils/formatters';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { EligibilityWizard } from './components/EligibilityWizard';
import { DashboardStats } from './components/DashboardStats';
import { SchemeCard } from './components/SchemeCard';
import { FilterSidebar } from './components/FilterSidebar';
import { SchemeDetailModal } from './components/SchemeDetailModal';
import { DocumentLockerModal } from './components/DocumentLockerModal';
import { SavedSchemesModal } from './components/SavedSchemesModal';
import { PrintablePackModal } from './components/PrintablePackModal';
import { AuthModal, UserAccount } from './components/AuthModal';
import { HowItWorksSection } from './components/HowItWorksSection';
import { CategoryHubSection } from './components/CategoryHubSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FAQSection } from './components/FAQSection';
import { LanguageSection } from './components/LanguageSection';
import { ScholarChatbot } from './components/ScholarChatbot';
import { SupportedLang } from './i18n/translations';
import { 
  ExternalLink, 
  LayoutGrid, 
  List, 
  Shield,
  SlidersHorizontal
} from 'lucide-react';

const rawSchemes = schemesData as Scheme[];

const DEFAULT_PROFILE: UserProfile = {
  age: 18,
  gender: 'Any',
  educationLevel: 'UG',
  courseType: 'Undergraduate Degree',
  category: 'OBC',
  annualFamilyIncome: 250000,
  state: 'Maharashtra',
  isDisability: false,
  marksPercent: 75
};

const DEFAULT_FILTERS: FilterState = {
  searchQuery: '',
  provider: 'All',
  category: 'All',
  educationLevel: 'All',
  gender: 'All',
  state: '',
  maxIncomeFilter: null,
  onlyDisability: false,
  onlyEligible: false,
  sortBy: 'matchScore'
};

export const App: React.FC = () => {
  const [lang, setLang] = useState<SupportedLang>('en');
  const [activeTab, setActiveTab] = useState<'wizard' | 'browse' | 'saved'>('wizard');

  // Authenticated Student State
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    try {
      const saved = localStorage.getItem('scholarspot_user_account');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const handleLogin = (user: UserAccount) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('scholarspot_user_account', JSON.stringify(user));
      // Auto-populate profile state from verified credentials
      setUserProfile(prev => ({
        ...prev,
        category: (user.category as any) || prev.category,
        state: user.state || prev.state
      }));
    } catch {}
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('scholarspot_user_account');
    } catch {}
  };

  // Load user profile from localStorage
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('scholarspot_user_profile');
      return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  // Save profile changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('scholarspot_user_profile', JSON.stringify(userProfile));
    } catch {}
  }, [userProfile]);

  // Saved / Bookmarked Scheme IDs
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('scholarspot_saved_ids');
      return saved ? JSON.parse(saved) : ['nsp-pm-yasasvi', 'mahadbt-ebc-freeship'];
    } catch {
      return ['nsp-pm-yasasvi', 'mahadbt-ebc-freeship'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('scholarspot_saved_ids', JSON.stringify(savedIds));
    } catch {}
  }, [savedIds]);

  // Checked Documents (Locker state)
  const [checkedDocs, setCheckedDocs] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('scholarspot_checked_docs');
      return saved ? JSON.parse(saved) : [
        'Aadhaar Card',
        'Class 10th and 12th Marksheets',
        'Student Bank Passbook',
        'Previous Year Marksheet'
      ];
    } catch {
      return ['Aadhaar Card', 'Class 10th and 12th Marksheets'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('scholarspot_checked_docs', JSON.stringify(checkedDocs));
    } catch {}
  }, [checkedDocs]);

  // Filters State
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [viewLayout, setViewLayout] = useState<'grid' | 'compact'>('grid');

  // Modals state
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);
  const [isLockerOpen, setIsLockerOpen] = useState(false);
  const [isSavedOpen, setIsSavedOpen] = useState(false);
  const [isPrintOpen, setIsPrintOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Toggle saving
  const handleToggleSave = (schemeId: string) => {
    setSavedIds(prev => 
      prev.includes(schemeId) ? prev.filter(id => id !== schemeId) : [...prev, schemeId]
    );
  };

  // Toggle document in locker / checklist
  const handleToggleDoc = (docName: string) => {
    setCheckedDocs(prev =>
      prev.includes(docName) ? prev.filter(d => d !== docName) : [...prev, docName]
    );
  };

  // Calculate Match Results for all schemes
  const allMatchResults: MatchResult[] = useMemo(() => {
    return rawSchemes.map(scheme => evaluateEligibility(userProfile, scheme));
  }, [userProfile]);

  // Summary counts
  const eligibleSchemesCount = useMemo(() => {
    return allMatchResults.filter(r => r.status === 'Eligible').length;
  }, [allMatchResults]);

  const likelySchemesCount = useMemo(() => {
    return allMatchResults.filter(r => r.status === 'Possibly Eligible').length;
  }, [allMatchResults]);

  const urgentDeadlinesCount = useMemo(() => {
    return rawSchemes.filter(s => {
      const days = getDaysRemaining(s.deadline);
      return days !== null && days >= 0 && days <= 30;
    }).length;
  }, []);

  const docReadinessPercent = useMemo(() => {
    return Math.min(100, Math.round((checkedDocs.length / 10) * 100));
  }, [checkedDocs]);

  // Filtered and Sorted Match Results
  const filteredResults = useMemo(() => {
    let result = allMatchResults.filter(({ scheme, status }) => {
      // Search query
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchesName = scheme.name.toLowerCase().includes(query);
        const matchesHindi = scheme.hindiName?.toLowerCase().includes(query);
        const matchesProvider = scheme.providerName.toLowerCase().includes(query);
        const matchesTags = scheme.tags?.some(t => t.toLowerCase().includes(query));
        if (!matchesName && !matchesHindi && !matchesProvider && !matchesTags) {
          return false;
        }
      }

      // Provider filter
      if (filters.provider !== 'All' && scheme.provider !== filters.provider) {
        return false;
      }

      // State filter
      if (filters.state) {
        if (scheme.state !== 'All India' && scheme.state.toLowerCase() !== filters.state.toLowerCase()) {
          return false;
        }
      }

      // Category filter
      if (filters.category !== 'All') {
        if (!scheme.categories.includes(filters.category)) {
          return false;
        }
      }

      // Education Level filter
      if (filters.educationLevel !== 'All') {
        if (!scheme.educationLevels.includes(filters.educationLevel)) {
          return false;
        }
      }

      // Gender filter
      if (filters.gender !== 'All') {
        if (scheme.gender !== 'Any' && scheme.gender !== filters.gender) {
          return false;
        }
      }

      // Specially Abled / PwD filter
      if (filters.onlyDisability && !scheme.disabilityRequired && !scheme.categories.includes('PwD')) {
        return false;
      }

      // Only Eligible filter
      if (filters.onlyEligible && status !== 'Eligible') {
        return false;
      }

      return true;
    });

    // Sorting
    result.sort((a, b) => {
      if (filters.sortBy === 'matchScore') {
        if (b.score !== a.score) return b.score - a.score;
        return (b.scheme.featured ? 1 : 0) - (a.scheme.featured ? 1 : 0);
      }
      if (filters.sortBy === 'deadline') {
        const daysA = getDaysRemaining(a.scheme.deadline) ?? 9999;
        const daysB = getDaysRemaining(b.scheme.deadline) ?? 9999;
        return daysA - daysB;
      }
      if (filters.sortBy === 'benefits') {
        const amtA = a.scheme.benefitAmountApprox || 0;
        const amtB = b.scheme.benefitAmountApprox || 0;
        return amtB - amtA;
      }
      if (filters.sortBy === 'name') {
        return a.scheme.name.localeCompare(b.scheme.name);
      }
      return 0;
    });

    return result;
  }, [allMatchResults, filters]);

  // Saved Schemes objects
  const savedSchemesList = useMemo(() => {
    return rawSchemes.filter(s => savedIds.includes(s.id));
  }, [savedIds]);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans selection:bg-orange-500/30 selection:text-orange-200">
      {/* Navbar */}
      <Navbar
        lang={lang}
        setLang={setLang}
        savedCount={savedIds.length}
        openSavedModal={() => setIsSavedOpen(true)}
        openLockerModal={() => setIsLockerOpen(true)}
        openPrintModal={() => setIsPrintOpen(true)}
        openAuthModal={() => setIsAuthOpen(true)}
        currentUser={currentUser}
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'browse') {
            setFilters(prev => ({ ...prev, onlyEligible: false }));
          }
        }}
        lockerDocCount={checkedDocs.length}
        onScrollToSection={scrollToSection}
      />

      {/* Hero Section */}
      <HeroSection
        lang={lang}
        onStartWizard={() => {
          setActiveTab('wizard');
          scrollToSection('wizard-section');
        }}
        onBrowseAll={() => {
          setActiveTab('browse');
          scrollToSection('schemes-section');
        }}
        searchQuery={filters.searchQuery}
        setSearchQuery={(q) => {
          setFilters(f => ({ ...f, searchQuery: q }));
          scrollToSection('schemes-section');
        }}
        totalSchemesCount={rawSchemes.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 w-full">
        {/* Eligibility Checker Wizard Section with Animated Age & Gender */}
        {activeTab === 'wizard' && (
          <section id="wizard-section" className="animate-fadeIn scroll-mt-20">
            <EligibilityWizard
              userProfile={userProfile}
              setUserProfile={setUserProfile}
              onCalculate={() => scrollToSection('schemes-section')}
              lang={lang}
              matchedCount={eligibleSchemesCount}
            />
          </section>
        )}

        {/* Dynamic Dashboard Metrics Summary */}
        <section>
          <DashboardStats
            totalSchemes={rawSchemes.length}
            eligibleCount={eligibleSchemesCount}
            likelyCount={likelySchemesCount}
            urgentCount={urgentDeadlinesCount}
            docReadinessPercent={docReadinessPercent}
            lang={lang}
            onFilterEligibleOnly={() => {
              setFilters(f => ({ ...f, onlyEligible: true }));
              scrollToSection('schemes-section');
            }}
            onFilterUrgentOnly={() => {
              setFilters(f => ({ ...f, sortBy: 'deadline' }));
              scrollToSection('schemes-section');
            }}
          />
        </section>

        {/* Category Exploration Hub */}
        <section id="category-hubs">
          <CategoryHubSection
            onSelectCategory={(updater) => setFilters(updater)}
            lang={lang}
          />
        </section>

        {/* Multilingual Regional Languages Section */}
        <section id="languages-section" className="scroll-mt-24">
          <LanguageSection
            currentLang={lang}
            onSelectLang={setLang}
          />
        </section>

        {/* Schemes Catalog & Filter Grid Section */}
        <section id="schemes-section" className="scroll-mt-24">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Filter Sidebar */}
            <div className="w-full md:w-64 lg:w-72 shrink-0">
              <FilterSidebar
                filters={filters}
                setFilters={setFilters}
                onReset={() => setFilters(DEFAULT_FILTERS)}
                lang={lang}
                counts={{
                  total: rawSchemes.length,
                  eligible: eligibleSchemesCount
                }}
              />
            </div>

            {/* Right Scheme Cards Content */}
            <div className="flex-1 space-y-4">
              {/* Header with results count and layout controls */}
              <div className="bg-[#0b101d] rounded-3xl border border-slate-800 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xl">
                <div>
                  <h3 className="font-black text-white text-base sm:text-lg flex items-center space-x-2">
                    <span>Available Schemes & Scholarships</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-orange-400 font-extrabold border border-slate-700">
                      {filteredResults.length} Found
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {filters.onlyEligible
                      ? 'Displaying only schemes matching 100% of your eligibility rules'
                      : 'Ranked by profile match score & application closing date'}
                  </p>
                </div>

                <div className="flex items-center space-x-2 self-end sm:self-auto">
                  <div className="bg-slate-900 p-1 rounded-xl flex items-center space-x-1 border border-slate-800">
                    <button
                      onClick={() => setViewLayout('grid')}
                      className={`p-1.5 rounded-lg text-xs font-semibold transition-all ${
                        viewLayout === 'grid'
                          ? 'bg-slate-800 text-white shadow-xs'
                          : 'text-slate-400 hover:text-white'
                      }`}
                      title="Grid layout"
                    >
                      <LayoutGrid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewLayout('compact')}
                      className={`p-1.5 rounded-lg text-xs font-semibold transition-all ${
                        viewLayout === 'compact'
                          ? 'bg-slate-800 text-white shadow-xs'
                          : 'text-slate-400 hover:text-white'
                      }`}
                      title="Compact layout"
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Empty state */}
              {filteredResults.length === 0 ? (
                <div className="bg-[#0b101d] rounded-3xl border border-slate-800 p-12 text-center shadow-xl">
                  <div className="w-16 h-16 rounded-3xl bg-slate-900 border border-slate-800 text-orange-400 mx-auto flex items-center justify-center mb-3">
                    <SlidersHorizontal className="w-8 h-8" />
                  </div>
                  <h4 className="font-extrabold text-white text-base">No Schemes Match Current Filters</h4>
                  <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                    Try adjusting the state, income limit, or category filters on the left to see more opportunities.
                  </p>
                  <button
                    onClick={() => setFilters(DEFAULT_FILTERS)}
                    className="mt-4 px-5 py-2.5 text-xs font-bold text-white bg-orange-600 hover:bg-orange-500 rounded-xl transition-colors shadow-md shadow-orange-600/30"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className={`grid gap-4 ${
                  viewLayout === 'grid' 
                    ? 'grid-cols-1 md:grid-cols-1 lg:grid-cols-2' 
                    : 'grid-cols-1'
                }`}>
                  {filteredResults.map((matchResult) => (
                    <SchemeCard
                      key={matchResult.scheme.id}
                      matchResult={matchResult}
                      isSaved={savedIds.includes(matchResult.scheme.id)}
                      onToggleSave={handleToggleSave}
                      onSelect={(scheme) => setSelectedScheme(scheme)}
                      checkedDocs={checkedDocs}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* How It Works 3-Step Journey */}
        <section id="how-it-works">
          <HowItWorksSection
            onStartClick={() => {
              setActiveTab('wizard');
              scrollToSection('wizard-section');
            }}
            lang={lang}
          />
        </section>

        {/* Real Student Success Stories */}
        <section id="testimonials">
          <TestimonialsSection />
        </section>

        {/* Student FAQ & Guidance Accordion */}
        <section id="faq-section">
          <FAQSection />
        </section>
      </main>

      {/* Floating ScholarBot AI Chatbot */}
      <ScholarChatbot
        schemes={rawSchemes}
        matchedResults={allMatchResults}
        userProfile={userProfile}
        onSelectScheme={(scheme) => setSelectedScheme(scheme)}
        lang={lang}
      />

      {/* Auth Modal (DigiLocker / Mobile OTP / Profile) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentUser={currentUser}
        onLogin={handleLogin}
        onLogout={handleLogout}
        lang={lang}
      />

      {/* Scheme Detail Modal */}
      <SchemeDetailModal
        scheme={selectedScheme}
        matchResult={selectedScheme ? allMatchResults.find(r => r.scheme.id === selectedScheme.id) : undefined}
        isSaved={selectedScheme ? savedIds.includes(selectedScheme.id) : false}
        onToggleSave={handleToggleSave}
        onClose={() => setSelectedScheme(null)}
        checkedDocs={checkedDocs}
        onToggleDoc={handleToggleDoc}
      />

      {/* Document Locker Modal */}
      <DocumentLockerModal
        isOpen={isLockerOpen}
        onClose={() => setIsLockerOpen(false)}
        checkedDocs={checkedDocs}
        onToggleDoc={handleToggleDoc}
        onClearDocs={() => setCheckedDocs([])}
        totalSchemesCount={rawSchemes.length}
      />

      {/* Saved Schemes Modal */}
      <SavedSchemesModal
        isOpen={isSavedOpen}
        onClose={() => setIsSavedOpen(false)}
        savedSchemes={savedSchemesList}
        onRemoveSave={handleToggleSave}
        onSelectScheme={(scheme) => {
          setIsSavedOpen(false);
          setSelectedScheme(scheme);
        }}
        onClearAll={() => setSavedIds([])}
        onBrowse={() => {
          setActiveTab('browse');
          scrollToSection('schemes-section');
        }}
      />

      {/* Printable Application Pack Modal */}
      <PrintablePackModal
        isOpen={isPrintOpen}
        onClose={() => setIsPrintOpen(false)}
        matchedResults={allMatchResults}
        userProfile={userProfile}
        checkedDocs={checkedDocs}
      />

      {/* Indian Civic Dark Footer */}
      <footer className="bg-[#05070c] text-slate-400 text-xs py-14 border-t border-slate-800/80 no-print mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center space-x-2 text-white font-black text-xl">
                <span>Scholar<span className="text-orange-500">Spot</span></span>
                <span className="text-slate-500">•</span>
                <span className="text-orange-400 font-extrabold text-sm">स्कॉलरस्पॉट</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed max-w-md">
                India's premier open civic-tech platform designed for Indian students across all 28 states and 8 Union Territories to discover, verify eligibility for, and access central, state, and corporate CSR scholarships with complete transparency.
              </p>
              <div className="text-[11px] text-slate-400 flex items-center space-x-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero middlemen • Direct links to authorized government portals</span>
              </div>
            </div>

            <div>
              <h4 className="text-white font-extrabold text-xs uppercase tracking-wider mb-3">
                Official National Portals
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <a href="https://scholarships.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center space-x-1">
                    <span>National Scholarship Portal (NSP)</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                </li>
                <li>
                  <a href="https://www.aicte-pragati-saksham-gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center space-x-1">
                    <span>AICTE Pragati & Saksham</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                </li>
                <li>
                  <a href="https://online-inspire.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center space-x-1">
                    <span>DST INSPIRE Portal</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                </li>
                <li>
                  <a href="https://www.digilocker.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center space-x-1">
                    <span>DigiLocker Document Access</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-extrabold text-xs uppercase tracking-wider mb-3">
                Major State DBT Portals
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <a href="https://mahadbt.maharashtra.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center space-x-1">
                    <span>Maharashtra MahaDBT</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                </li>
                <li>
                  <a href="https://scholarship.up.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center space-x-1">
                    <span>UP Scholarship Portal</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                </li>
                <li>
                  <a href="https://ssp.postmatric.karnataka.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center space-x-1">
                    <span>Karnataka SSP Portal</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                </li>
                <li>
                  <a href="https://svmcm.wbhed.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center space-x-1">
                    <span>West Bengal SVMCM Portal</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 text-[11px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p>© 2026 ScholarSpot. Dedicated to democratizing educational opportunities for all Indian students.</p>
            <p className="text-slate-400">
              Disclaimer: ScholarSpot does not charge any money or process applications directly. Always apply on official .gov.in or foundation portals.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default App;
