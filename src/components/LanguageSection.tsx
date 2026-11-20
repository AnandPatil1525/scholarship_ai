import React from 'react';
import { motion } from 'framer-motion';
import { Globe, CheckCircle2 } from 'lucide-react';
import { LANGUAGES, SupportedLang } from '../i18n/translations';

interface LanguageSectionProps {
  currentLang: SupportedLang;
  onSelectLang: (lang: SupportedLang) => void;
}

export const LanguageSection: React.FC<LanguageSectionProps> = ({
  currentLang,
  onSelectLang
}) => {
  return (
    <div className="py-8 bg-[#0b101d] rounded-3xl border border-slate-800 p-6 sm:p-10 shadow-2xl no-print">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-orange-500/15 text-orange-400 border border-orange-500/30 text-xs font-extrabold mb-2">
          <Globe className="w-3.5 h-3.5" />
          <span>Multilingual Bharat • बहुभाषी भारत</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          Choose Your Regional Language
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          ScholarSpot bridges the digital divide for students in non-metro areas across India.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
        {LANGUAGES.map((item) => {
          const isActive = currentLang === item.code;
          return (
            <motion.div
              key={item.code}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectLang(item.code)}
              className={`p-4 rounded-2xl border cursor-pointer select-none transition-all flex flex-col justify-between text-center relative overflow-hidden ${
                isActive
                  ? 'bg-gradient-to-b from-orange-500/20 to-slate-900 border-orange-500 shadow-lg shadow-orange-500/15 ring-2 ring-orange-500/30'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
              }`}
            >
              {isActive && (
                <div className="absolute top-2 right-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-orange-400" />
                </div>
              )}

              <div>
                <span className="text-xs font-semibold text-slate-400 block mb-0.5">
                  {item.name}
                </span>
                <span className={`text-base sm:text-lg font-black block ${
                  isActive ? 'text-orange-400' : 'text-white'
                }`}>
                  {item.nativeName}
                </span>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/80">
                <span className="text-[10px] text-slate-400 block line-clamp-1 italic">
                  {item.greeting}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
