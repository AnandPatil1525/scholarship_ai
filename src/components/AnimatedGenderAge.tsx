import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gender } from '../types';
import {
  Plus,
  Minus,
  CheckCircle2,
  GraduationCap,
  Heart,
  Baby,
  School,
  Briefcase
} from 'lucide-react';
import confetti from 'canvas-confetti';

import { SupportedLang } from '../i18n/translations';

interface AnimatedGenderAgeProps {
  gender: Gender;
  setGender: (g: Gender) => void;
  age: number | null;
  setAge: (a: number | null) => void;
  lang: SupportedLang;
}

export const AnimatedGenderAge: React.FC<AnimatedGenderAgeProps> = ({
  gender,
  setGender,
  age,
  setAge
}) => {
  const currentAge = age ?? 18;

  const handleGenderSelect = (g: Gender) => {
    setGender(g);
    try {
      confetti({
        particleCount: 25,
        spread: 50,
        origin: { y: 0.6 }
      });
    } catch { }
  };

  const handleAgeChange = (newAge: number) => {
    const clamped = Math.max(10, Math.min(45, newAge));
    setAge(clamped);
  };

  // Age group description helper
  const getAgeCohort = (val: number) => {
    if (val <= 15) {
      return {
        label: 'Secondary School (Class 9-10)',
        hindi: 'माध्यमिक विद्यालय (कक्षा 9-10)',
        icon: School,
        color: 'text-blue-400 bg-blue-950/40 border-blue-500/30',
        hint: 'Eligible for NMMS, PM-YASASVI School grant, Pre-Matric SC/ST'
      };
    }
    if (val <= 18) {
      return {
        label: 'Higher Secondary (Class 11-12)',
        hindi: 'उच्चतर माध्यमिक (कक्षा 11-12)',
        icon: GraduationCap,
        color: 'text-amber-400 bg-amber-950/40 border-amber-500/30',
        hint: 'Eligible for Begum Hazrat Mahal, UP Pre/Post-Matric, CSSS Topper grant'
      };
    }
    if (val <= 24) {
      return {
        label: 'College & University (UG / PG)',
        hindi: 'कॉलेज एवं विश्वविद्यालय (स्नातक / परास्नातक)',
        icon: Briefcase,
        color: 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30',
        hint: 'Eligible for MahaDBT EBC, Reliance UG, AICTE Pragati, SBI Asha'
      };
    }
    return {
      label: 'Postgraduate & Research (PG / PhD)',
      hindi: 'शोध एवं उच्च शिक्षा (रिसर्च / फेलोशिप)',
      icon: Baby,
      color: 'text-purple-400 bg-purple-950/40 border-purple-500/30',
      hint: 'Eligible for Tata Trusts, Ishan Uday, DST INSPIRE, NEC Merit'
    };
  };

  const cohort = getAgeCohort(currentAge);
  const CohortIcon = cohort.icon;
  const estimatedBirthYear = 2026 - currentAge;

  return (
    <div className="space-y-6">
      {/* SECTION 1: ANIMATED GENDER SELECTION */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-extrabold text-white">
            Select Gender (लिंग चुनें) <span className="text-orange-500">*</span>
          </label>
          <span className="text-xs font-semibold text-slate-400">
            Affects female-exclusive & quota schemes
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {/* Female Option */}
          <motion.div
            whileHover={{ scale: 1.025, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleGenderSelect('Female')}
            className={`relative p-4 rounded-2xl border-2 cursor-pointer transition-all overflow-hidden ${gender === 'Female'
                ? 'bg-gradient-to-br from-rose-950/60 via-pink-950/40 to-slate-900 border-rose-500 shadow-lg shadow-rose-500/10 ring-2 ring-rose-500/30'
                : 'bg-[#0e1628]/80 border-slate-800 hover:border-slate-700'
              }`}
          >
            {gender === 'Female' && (
              <motion.div
                layoutId="genderHighlightDark"
                className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-xs"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <CheckCircle2 className="w-4 h-4" />
              </motion.div>
            )}

            <div className="flex items-start space-x-3.5">
              <motion.div
                animate={gender === 'Female' ? { rotate: [0, -10, 10, 0], scale: [1, 1.15, 1] } : {}}
                transition={{ duration: 0.5 }}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-inner shrink-0 ${gender === 'Female' ? 'bg-rose-500 text-white' : 'bg-rose-950/50 text-rose-300 border border-rose-500/30'
                  }`}
              >
                👩‍🎓
              </motion.div>

              <div>
                <div className="flex items-center space-x-1.5">
                  <h4 className="font-extrabold text-white text-sm sm:text-base">
                    Female (छात्रा)
                  </h4>
                </div>
                <p className="text-[11px] font-bold text-rose-400 mt-0.5 flex items-center space-x-1">
                  <Heart className="w-3 h-3 fill-rose-500 text-rose-500 inline mr-0.5" />
                  <span>+6 Exclusive Schemes</span>
                </p>
                <p className="text-[10px] text-slate-400 mt-1 leading-tight">
                  Unlocks Pragati, Begum Hazrat Mahal, Kotak Kanya & Santoor.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Male Option */}
          <motion.div
            whileHover={{ scale: 1.025, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleGenderSelect('Male')}
            className={`relative p-4 rounded-2xl border-2 cursor-pointer transition-all overflow-hidden ${gender === 'Male'
                ? 'bg-gradient-to-br from-blue-950/60 via-indigo-950/40 to-slate-900 border-blue-500 shadow-lg shadow-blue-500/10 ring-2 ring-blue-500/30'
                : 'bg-[#0e1628]/80 border-slate-800 hover:border-slate-700'
              }`}
          >
            {gender === 'Male' && (
              <motion.div
                layoutId="genderHighlightDark"
                className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <CheckCircle2 className="w-4 h-4" />
              </motion.div>
            )}

            <div className="flex items-start space-x-3.5">
              <motion.div
                animate={gender === 'Male' ? { rotate: [0, 10, -10, 0], scale: [1, 1.15, 1] } : {}}
                transition={{ duration: 0.5 }}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-inner shrink-0 ${gender === 'Male' ? 'bg-blue-600 text-white' : 'bg-blue-950/50 text-blue-300 border border-blue-500/30'
                  }`}
              >
                👨‍🎓
              </motion.div>

              <div>
                <h4 className="font-extrabold text-white text-sm sm:text-base">
                  Male (छात्र)
                </h4>
                <p className="text-[11px] font-bold text-blue-400 mt-0.5">
                  General & Quota Schemes
                </p>
                <p className="text-[10px] text-slate-400 mt-1 leading-tight">
                  Open to all central, state, and corporate CSR opportunities.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Any / Transgender / Other Option */}
          <motion.div
            whileHover={{ scale: 1.025, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleGenderSelect('Any')}
            className={`relative p-4 rounded-2xl border-2 cursor-pointer transition-all overflow-hidden ${gender === 'Any'
                ? 'bg-gradient-to-br from-purple-950/60 via-slate-900 to-amber-950/40 border-purple-500 shadow-lg shadow-purple-500/10 ring-2 ring-purple-500/30'
                : 'bg-[#0e1628]/80 border-slate-800 hover:border-slate-700'
              }`}
          >
            {gender === 'Any' && (
              <motion.div
                layoutId="genderHighlightDark"
                className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-xs"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <CheckCircle2 className="w-4 h-4" />
              </motion.div>
            )}

            <div className="flex items-start space-x-3.5">
              <motion.div
                animate={gender === 'Any' ? { scale: [1, 1.2, 1] } : {}}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-inner shrink-0 ${gender === 'Any' ? 'bg-purple-600 text-white' : 'bg-purple-950/50 text-purple-300 border border-purple-500/30'
                  }`}
              >
                🌟
              </motion.div>

              <div>
                <h4 className="font-extrabold text-white text-sm sm:text-base">
                  All / Other (सभी)
                </h4>
                <p className="text-[11px] font-bold text-purple-400 mt-0.5">
                  Universal Grants
                </p>
                <p className="text-[10px] text-slate-400 mt-1 leading-tight">
                  Shows all gender-neutral schemes across India.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* SECTION 2: ANIMATED AGE SELECTOR */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-2.5">
          <label className="block text-sm font-extrabold text-white">
            Student Age (छात्र की आयु)
          </label>
          <span className="text-xs text-slate-400 font-semibold">
            Born approximately in <strong className="text-orange-400">{estimatedBirthYear}</strong>
          </span>
        </div>

        {/* Animated Age Dial & Stepper Card */}
        <div className="p-5 rounded-2xl bg-[#090d18] border border-slate-800 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Left: Big Animated Number Counter */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleAgeChange(currentAge - 1)}
                  className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-orange-500 text-white flex items-center justify-center shadow-xs transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </motion.button>

                <div className="w-20 text-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentAge}
                      initial={{ y: -15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 15, opacity: 0 }}
                      transition={{ duration: 0.15, type: 'spring', stiffness: 300 }}
                      className="text-4xl font-black text-white tracking-tight"
                    >
                      {currentAge}
                    </motion.div>
                  </AnimatePresence>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Years Old
                  </span>
                </div>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleAgeChange(currentAge + 1)}
                  className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-orange-500 text-white flex items-center justify-center shadow-xs transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Dynamic Cohort Badge */}
              <motion.div
                key={cohort.label}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`p-3 rounded-xl border text-xs font-semibold flex items-start space-x-2.5 max-w-sm ${cohort.color}`}
              >
                <CohortIcon className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold block">{cohort.label}</span>
                  <span className="text-[11px] opacity-80 block">{cohort.hint}</span>
                </div>
              </motion.div>
            </div>

            {/* Quick Age Presets */}
            <div className="flex flex-wrap gap-1.5 self-start sm:self-center">
              {[14, 16, 18, 20, 22, 25].map((presetAge) => (
                <button
                  key={presetAge}
                  type="button"
                  onClick={() => handleAgeChange(presetAge)}
                  className={`px-3 py-1 text-xs font-bold rounded-lg border transition-all ${currentAge === presetAge
                      ? 'bg-orange-600 text-white border-orange-500 shadow-md shadow-orange-600/30'
                      : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:border-slate-600 hover:text-white'
                    }`}
                >
                  {presetAge}y
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Range Slider */}
          <div className="mt-4 pt-3 border-t border-slate-800">
            <input
              type="range"
              min="12"
              max="35"
              step="1"
              value={currentAge}
              onChange={(e) => handleAgeChange(Number(e.target.value))}
              className="w-full accent-orange-500 cursor-pointer h-2 bg-slate-800 rounded-lg appearance-none"
            />
            <div className="flex justify-between text-[11px] font-semibold text-slate-500 mt-1">
              <span>12 yrs (School)</span>
              <span>18 yrs (UG Admission)</span>
              <span>24 yrs (PG)</span>
              <span>35 yrs (Max Fellowship)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
