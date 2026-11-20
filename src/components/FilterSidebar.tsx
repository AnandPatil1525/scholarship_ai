import React from 'react';
import { FilterState, ProviderType, Category, EducationLevel, Gender } from '../types';
import { INDIAN_STATES } from '../data/indianStates';
import { 
  Search, 
  RotateCcw, 
  Filter, 
  SlidersHorizontal 
} from 'lucide-react';
import { translations, SupportedLang } from '../i18n/translations';

interface FilterSidebarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onReset: () => void;
  lang: SupportedLang;
  counts: {
    total: number;
    eligible: number;
  };
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  setFilters,
  onReset,
  lang,
  counts
}) => {
  const t = translations[lang];

  const providers: (ProviderType | 'All')[] = ['All', 'Central', 'State', 'Private', 'NGO'];
  const categories: (Category | 'All')[] = ['All', 'General', 'OBC', 'SC', 'ST', 'EWS', 'Minority'];
  const educationLevels: (EducationLevel | 'All')[] = [
    'All',
    'Class 9-10',
    'Class 11-12',
    'UG',
    'PG',
    'Diploma',
    'Professional'
  ];

  return (
    <div className="bg-[#0b101d] rounded-3xl border border-slate-800 shadow-xl p-5 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-slate-800/80">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-orange-400" />
          <h3 className="font-extrabold text-white text-sm sm:text-base">
            {t.filterTitle}
          </h3>
        </div>

        <button
          onClick={onReset}
          className="flex items-center space-x-1 text-xs font-bold text-slate-400 hover:text-orange-400 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Search Input */}
      <div>
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
          Search Schemes
        </label>
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => setFilters(f => ({ ...f, searchQuery: e.target.value }))}
            placeholder="Scheme name, portal, ministry..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-900/90 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
          />
        </div>
      </div>

      {/* Only Show Eligible Toggle */}
      <div className="p-3.5 rounded-2xl bg-orange-500/10 border border-orange-500/30">
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-xs font-extrabold text-orange-300">
            Show Only Eligible ({counts.eligible})
          </span>
          <input
            type="checkbox"
            checked={filters.onlyEligible}
            onChange={(e) => setFilters(f => ({ ...f, onlyEligible: e.target.checked }))}
            className="w-4 h-4 accent-orange-500 rounded"
          />
        </label>
      </div>

      {/* Provider Type */}
      <div>
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
          {t.providerLabel}
        </label>
        <div className="flex flex-wrap gap-1.5">
          {providers.map((p) => (
            <button
              key={p}
              onClick={() => setFilters(f => ({ ...f, provider: p }))}
              className={`px-3 py-1 text-xs font-bold rounded-lg border transition-all ${
                filters.provider === p
                  ? 'bg-orange-600 text-white border-orange-500 shadow-md shadow-orange-600/20'
                  : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* State / Domicile */}
      <div>
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
          {t.stateLabel}
        </label>
        <select
          value={filters.state}
          onChange={(e) => setFilters(f => ({ ...f, state: e.target.value }))}
          className="w-full px-3 py-2 text-xs bg-slate-900/90 border border-slate-700/80 rounded-xl text-white font-medium focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
        >
          <option value="" className="bg-slate-900 text-slate-400">All India / Any State</option>
          {INDIAN_STATES.map((st) => (
            <option key={st} value={st} className="bg-slate-900 text-white">{st}</option>
          ))}
        </select>
      </div>

      {/* Social Category */}
      <div>
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
          {t.categoryLabel}
        </label>
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilters(f => ({ ...f, category: cat }))}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg border transition-all ${
                filters.category === cat
                  ? 'bg-orange-600 text-white border-orange-500 shadow-xs'
                  : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Education Level */}
      <div>
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
          {t.educationLabel}
        </label>
        <div className="flex flex-wrap gap-1.5">
          {educationLevels.map((lvl) => (
            <button
              key={lvl}
              onClick={() => setFilters(f => ({ ...f, educationLevel: lvl }))}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg border transition-all ${
                filters.educationLevel === lvl
                  ? 'bg-blue-600 text-white border-blue-500'
                  : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Gender */}
      <div>
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
          {t.genderLabel}
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {(['All', 'Female', 'Male'] as (Gender | 'All')[]).map((g) => (
            <button
              key={g}
              onClick={() => setFilters(f => ({ ...f, gender: g }))}
              className={`py-1 text-xs font-bold rounded-lg border text-center transition-all ${
                filters.gender === g
                  ? 'bg-orange-600 text-white border-orange-500'
                  : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Specially Abled / PwD */}
      <div className="pt-2 border-t border-slate-800/80">
        <label className="flex items-center space-x-2 text-xs font-bold text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.onlyDisability}
            onChange={(e) => setFilters(f => ({ ...f, onlyDisability: e.target.checked }))}
            className="w-4 h-4 accent-orange-500 rounded"
          />
          <span>PwD / Specially Abled Only</span>
        </label>
      </div>

      {/* Sort By */}
      <div className="pt-2 border-t border-slate-800/80">
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center space-x-1">
          <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
          <span>{t.sortBy}</span>
        </label>
        <select
          value={filters.sortBy}
          onChange={(e) => setFilters(f => ({ ...f, sortBy: e.target.value as any }))}
          className="w-full px-3 py-2 text-xs bg-slate-900/90 border border-slate-700/80 rounded-xl text-white font-semibold focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
        >
          <option value="matchScore" className="bg-slate-900 text-white">{t.highestMatch}</option>
          <option value="deadline" className="bg-slate-900 text-white">{t.deadlineSoonest}</option>
          <option value="benefits" className="bg-slate-900 text-white">{t.highestBenefit}</option>
          <option value="name" className="bg-slate-900 text-white">{t.alphabetic}</option>
        </select>
      </div>
    </div>
  );
};
