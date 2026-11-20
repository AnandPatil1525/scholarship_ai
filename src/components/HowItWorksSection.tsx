import React from 'react';
import { motion } from 'framer-motion';
import { 
  SlidersHorizontal, 
  Cpu, 
  Send, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';
import { SupportedLang } from '../i18n/translations';

interface HowItWorksSectionProps {
  onStartClick: () => void;
  lang: SupportedLang;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  onStartClick
}) => {
  const steps = [
    {
      number: '01',
      title: 'Fill Your 1-Minute Profile',
      hindiTitle: '1 मिनट में प्रोफाइल भरें',
      desc: 'Enter your education level, family income range, social category (SC/ST/OBC/EWS), and state of domicile.',
      icon: SlidersHorizontal,
      color: 'bg-orange-500/15 text-orange-400 border-orange-500/30'
    },
    {
      number: '02',
      title: 'Automated Rule Matching',
      hindiTitle: 'स्वचालित नियम मिलान',
      desc: 'Our client-side engine evaluates 26+ central, state, and corporate schemes against strict guidelines in real time.',
      icon: Cpu,
      color: 'bg-blue-500/15 text-blue-400 border-blue-500/30'
    },
    {
      number: '03',
      title: 'Verify Documents & Apply',
      hindiTitle: 'दस्तावेज़ चेक करें और आवेदन करें',
      desc: 'Tick off required certificates in your Document Locker, generate a CSC Cyber Cafe pack, and apply on official portals.',
      icon: Send,
      color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
    }
  ];

  return (
    <div className="py-12 bg-[#0b101d] rounded-3xl border border-slate-800 p-6 sm:p-10 shadow-2xl no-print">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-extrabold uppercase tracking-wider text-orange-400 bg-orange-500/15 px-3.5 py-1 rounded-full border border-orange-500/30">
          How ScholarSpot Works • कार्यप्रणाली
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">
          From Discovery to Grant in 3 Easy Steps
        </h2>
        <p className="text-sm text-slate-400 mt-2">
          No complicated government portal searches. Just enter your details once and let the engine find where you qualify.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={idx}
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black text-slate-600">
                    {step.number}
                  </span>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-sm ${step.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                <h3 className="font-extrabold text-white text-base">
                  {step.title}
                </h3>
                <p className="text-xs font-semibold text-slate-400 mt-0.5">
                  {step.hindiTitle}
                </p>
                <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800 flex items-center text-xs font-bold text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-1.5" />
                <span>Zero registration fee</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={onStartClick}
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-sm shadow-lg shadow-orange-600/30 transition-all"
        >
          <span>Try Eligibility Checker Now</span>
          <ArrowRight className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
};
