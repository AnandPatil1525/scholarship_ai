import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserProfile, 
  Category, 
  EducationLevel 
} from '../types';
import { INDIAN_STATES } from '../data/indianStates';
import { formatIndianCurrency } from '../utils/formatters';
import { AnimatedGenderAge } from './AnimatedGenderAge';
import { 
  MapPin, 
  IndianRupee, 
  Check, 
  RotateCcw, 
  Sliders, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';

import { SupportedLang } from '../i18n/translations';

interface EligibilityWizardProps {
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  onCalculate: () => void;
  lang: SupportedLang;
  matchedCount: number;
}

export const EligibilityWizard: React.FC<EligibilityWizardProps> = ({
  userProfile,
  setUserProfile,
  onCalculate,
  lang,
  matchedCount
}) => {
  const [step, setStep] = useState<number>(1);
  const [isQuickMode, setIsQuickMode] = useState<boolean>(false);

  const educationOptions: EducationLevel[] = [
    'Class 9-10',
    'Class 11-12',
    'UG',
    'PG',
    'Diploma',
    'Professional'
  ];

  const categoryOptions: Category[] = [
    'General',
    'OBC',
    'SC',
    'ST',
    'EWS',
    'Minority'
  ];

  const incomePresets = [
    { label: '< ₹1.5L (BPL/EWS)', value: 150000 },
    { label: '₹2.5L (NSP Limit)', value: 250000 },
    { label: '₹5.0L', value: 500000 },
    { label: '₹8.0L (OBC NCL)', value: 800000 },
    { label: 'Above ₹8.0L', value: 1200000 },
    { label: 'No Limit', value: null }
  ];

  const applyPreset = (preset: Partial<UserProfile>) => {
    setUserProfile(prev => ({
      ...prev,
      ...preset
    }));
    try {
      confetti({ particleCount: 35, spread: 60, origin: { y: 0.75 } });
    } catch {}
  };

  const handleClear = () => {
    setUserProfile({
      age: 18,
      gender: 'Any',
      educationLevel: '',
      courseType: '',
      category: '',
      annualFamilyIncome: null,
      state: '',
      isDisability: false,
      marksPercent: 70
    });
    setStep(1);
  };

  return (
    <div className="bg-[#0b101d] rounded-3xl border border-slate-800 shadow-2xl p-5 sm:p-8 transition-all relative overflow-hidden backdrop-blur-xl">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top Header & Mode Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-800/80 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse shadow-[0_0_8px_#f97316]" />
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Interactive Eligibility Checker
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-orange-500/15 text-orange-400 border border-orange-500/30">
              पात्रता जांच
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Dynamic rule evaluation across age cohorts, income brackets, categories & state quotas.
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={() => setIsQuickMode(!isQuickMode)}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl border border-slate-700 bg-slate-800/90 hover:bg-slate-700 text-slate-200 transition-colors shadow-xs"
          >
            <Sliders className="w-3.5 h-3.5 text-orange-400" />
            <span>{isQuickMode ? 'Switch to Step Wizard' : 'Quick Single Screen'}</span>
          </button>

          <button
            onClick={handleClear}
            className="flex items-center space-x-1 px-3 py-1.5 text-xs font-bold rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-950/30 transition-colors"
            title="Reset all inputs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Quick Persona Pills */}
      <div className="py-3.5 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto text-xs scrollbar-none">
        <span className="font-extrabold text-slate-400 shrink-0 flex items-center uppercase tracking-wider text-[11px]">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 mr-1" />
          Test Personas:
        </span>
        <button
          onClick={() => applyPreset({
            educationLevel: 'UG',
            gender: 'Female',
            category: 'OBC',
            state: 'Maharashtra',
            annualFamilyIncome: 250000,
            marksPercent: 78,
            age: 19
          })}
          className="px-3 py-1 bg-amber-950/40 hover:bg-amber-900/50 text-amber-300 border border-amber-500/30 rounded-lg font-bold shrink-0 transition-colors"
        >
          👩‍🎓 College Girl (Maharashtra, OBC)
        </button>

        <button
          onClick={() => applyPreset({
            educationLevel: 'Class 9-10',
            gender: 'Male',
            category: 'SC',
            state: 'Uttar Pradesh',
            annualFamilyIncome: 150000,
            marksPercent: 65,
            age: 15
          })}
          className="px-3 py-1 bg-blue-950/40 hover:bg-blue-900/50 text-blue-300 border border-blue-500/30 rounded-lg font-bold shrink-0 transition-colors"
        >
          🏫 Class 10 (UP, SC Category)
        </button>

        <button
          onClick={() => applyPreset({
            educationLevel: 'Professional',
            gender: 'Any',
            category: 'EWS',
            state: 'Karnataka',
            annualFamilyIncome: 200000,
            marksPercent: 82,
            age: 21
          })}
          className="px-3 py-1 bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-300 border border-emerald-500/30 rounded-lg font-bold shrink-0 transition-colors"
        >
          💼 Engineering (Karnataka, EWS)
        </button>

        <button
          onClick={() => applyPreset({
            educationLevel: 'UG',
            gender: 'Any',
            category: 'General',
            state: 'West Bengal',
            annualFamilyIncome: 250000,
            marksPercent: 85,
            age: 18
          })}
          className="px-3 py-1 bg-purple-950/40 hover:bg-purple-900/50 text-purple-300 border border-purple-500/30 rounded-lg font-bold shrink-0 transition-colors"
        >
          🔬 B.Sc Pure Science (WB 85%)
        </button>
      </div>

      {/* Step Indicator (If in Wizard Mode) */}
      {!isQuickMode && (
        <div className="py-4">
          <div className="flex items-center justify-between text-xs font-extrabold text-slate-400 mb-2">
            <span className={step >= 1 ? 'text-orange-400' : ''}>1. Education & Course</span>
            <span className={step >= 2 ? 'text-orange-400' : ''}>2. Animated Age & Gender</span>
            <span className={step >= 3 ? 'text-orange-400' : ''}>3. Domicile & Income</span>
          </div>
          <div className="w-full bg-slate-800/80 h-2.5 rounded-full overflow-hidden flex shadow-inner">
            <motion.div 
              className="bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500 h-full"
              initial={false}
              animate={{ width: `${(step / 3) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      )}

      {/* FORM FIELDS */}
      <div className="mt-4 space-y-6">
        <AnimatePresence mode="wait">
          {/* STEP 1: Education Level & Course */}
          {(isQuickMode || step === 1) && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-extrabold text-white mb-2.5">
                  Current Level of Education (शिक्षा का स्तर) <span className="text-orange-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {educationOptions.map((level) => (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      key={level}
                      type="button"
                      onClick={() => setUserProfile(p => ({ ...p, educationLevel: level }))}
                      className={`p-3.5 text-left rounded-2xl border text-sm font-bold transition-all flex items-center justify-between ${
                        userProfile.educationLevel === level
                          ? 'border-orange-500 bg-orange-500/15 text-orange-300 ring-2 ring-orange-500/30 shadow-md'
                          : 'border-slate-800 hover:border-slate-700 bg-slate-900/60 text-slate-300'
                      }`}
                    >
                      <span>{level}</span>
                      {userProfile.educationLevel === level && (
                        <Check className="w-4 h-4 text-orange-400" />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Course / Major (पाठ्यक्रम का नाम)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. B.Tech Computer Science, MBBS, B.Sc, Class 10"
                    value={userProfile.courseType || ''}
                    onChange={(e) => setUserProfile(p => ({ ...p, courseType: e.target.value }))}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-900/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-medium"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Previous Exam Marks (%)
                    </label>
                    <span className="text-xs font-extrabold text-orange-400 bg-orange-500/15 px-2.5 py-0.5 rounded-full border border-orange-500/30">
                      {userProfile.marksPercent || 0}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="100"
                    step="1"
                    value={userProfile.marksPercent || 60}
                    onChange={(e) => setUserProfile(p => ({ ...p, marksPercent: Number(e.target.value) }))}
                    className="w-full accent-orange-500 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer mt-2"
                  />
                  <div className="flex justify-between text-[11px] font-semibold text-slate-500 mt-1">
                    <span>Pass (40%)</span>
                    <span>First Class (60%)</span>
                    <span>Distinction (75%+)</span>
                    <span>Topper (90%+)</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: ANIMATED GENDER & AGE COMPONENT */}
          {(isQuickMode || step === 2) && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-4"
            >
              <AnimatedGenderAge
                gender={userProfile.gender}
                setGender={(g) => setUserProfile(p => ({ ...p, gender: g }))}
                age={userProfile.age}
                setAge={(a) => setUserProfile(p => ({ ...p, age: a }))}
                lang={lang}
              />
            </motion.div>
          )}

          {/* STEP 3: Domicile State, Social Category & Family Income */}
          {(isQuickMode || step === 3) && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-extrabold text-white mb-1.5">
                    State of Domicile (स्थायी निवास राज्य) <span className="text-orange-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                    <select
                      value={userProfile.state}
                      onChange={(e) => setUserProfile(p => ({ ...p, state: e.target.value }))}
                      className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-900/90 border border-slate-700 rounded-xl text-white font-semibold focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 shadow-xs"
                    >
                      <option value="" className="bg-slate-900 text-slate-400">Select your State / Union Territory</option>
                      {INDIAN_STATES.map((st) => (
                        <option key={st} value={st} className="bg-slate-900 text-white">{st}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-extrabold text-white mb-1.5">
                    Specially Abled / PwD (दिव्यांग श्रेणी)
                  </label>
                  <div className="flex items-center space-x-4 pt-1">
                    <label className="flex items-center space-x-2 text-sm font-bold text-slate-300 cursor-pointer">
                      <input
                        type="radio"
                        name="pwd_check_dark"
                        checked={userProfile.isDisability}
                        onChange={() => setUserProfile(p => ({ ...p, isDisability: true }))}
                        className="accent-orange-500 w-4 h-4"
                      />
                      <span>Yes (≥ 40% Disability)</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm font-bold text-slate-300 cursor-pointer">
                      <input
                        type="radio"
                        name="pwd_check_dark"
                        checked={!userProfile.isDisability}
                        onChange={() => setUserProfile(p => ({ ...p, isDisability: false }))}
                        className="accent-orange-500 w-4 h-4"
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-extrabold text-white mb-2">
                  Social Category / Quota (आरक्षण श्रेणी) <span className="text-orange-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {categoryOptions.map((cat) => (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      key={cat}
                      type="button"
                      onClick={() => setUserProfile(p => ({ ...p, category: cat }))}
                      className={`py-2.5 px-3.5 text-sm font-bold rounded-xl border text-left flex items-center justify-between transition-all ${
                        userProfile.category === cat
                          ? 'border-orange-500 bg-orange-500/15 text-orange-300 ring-2 ring-orange-500/30 shadow-xs'
                          : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span>{cat}</span>
                      {userProfile.category === cat && (
                        <Check className="w-4 h-4 text-orange-400" />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <label className="block text-sm font-extrabold text-white mb-1">
                  Annual Family Income (वार्षिक पारिवारिक आय)
                </label>
                <p className="text-xs text-slate-400 mb-2.5">
                  Based on Tahsildar / Revenue officer issued income certificate.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
                  {incomePresets.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setUserProfile(p => ({ ...p, annualFamilyIncome: preset.value }))}
                      className={`p-2.5 text-xs font-bold rounded-xl border text-center transition-all ${
                        userProfile.annualFamilyIncome === preset.value
                          ? 'border-orange-500 bg-orange-500/15 text-orange-300 ring-2 ring-orange-500/30'
                          : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-slate-400">Or Exact:</span>
                  <div className="relative flex-1">
                    <IndianRupee className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="number"
                      step="10000"
                      placeholder="e.g. 250000"
                      value={userProfile.annualFamilyIncome ?? ''}
                      onChange={(e) => setUserProfile(p => ({
                        ...p,
                        annualFamilyIncome: e.target.value ? Number(e.target.value) : null
                      }))}
                      className="w-full pl-8 pr-3 py-2 text-sm bg-slate-900/80 border border-slate-700 rounded-xl text-white font-semibold focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                    />
                  </div>
                  {userProfile.annualFamilyIncome !== null && (
                    <span className="text-xs font-extrabold text-emerald-400 bg-emerald-950/50 px-3 py-2 rounded-xl border border-emerald-500/30 shadow-xs">
                      {formatIndianCurrency(userProfile.annualFamilyIncome)}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Navigation & Submit */}
      <div className="mt-8 pt-5 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
        {!isQuickMode ? (
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="inline-flex items-center space-x-1 px-4 py-2.5 text-xs font-extrabold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="inline-flex items-center space-x-1.5 px-5 py-2.5 text-xs font-extrabold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl shadow-xs transition-colors ml-auto sm:ml-0"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : null}
          </div>
        ) : <div />}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={() => {
            onCalculate();
            try {
              confetti({ particleCount: 50, spread: 75, origin: { y: 0.65 } });
            } catch {}
          }}
          className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 hover:from-orange-500 hover:to-amber-500 text-white font-black text-sm sm:text-base shadow-xl shadow-orange-600/30 transition-all"
        >
          <span>Find My Eligible Schemes</span>
          {matchedCount > 0 && (
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-xs font-black">
              {matchedCount} Matched
            </span>
          )}
        </motion.button>
      </div>
    </div>
  );
};
