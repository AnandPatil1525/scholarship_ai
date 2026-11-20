import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { FilterState } from '../types';
import { SupportedLang } from '../i18n/translations';

interface CategoryHubSectionProps {
  onSelectCategory: (updater: (prev: FilterState) => FilterState) => void;
  lang: SupportedLang;
}

export const CategoryHubSection: React.FC<CategoryHubSectionProps> = ({
  onSelectCategory
}) => {
  const hubs = [
    {
      id: 'girls',
      title: 'Girls in Higher Education & STEM',
      hindi: 'बालिका छात्रवृत्ति एवं तकनीकी शिक्षा',
      count: '6 Schemes',
      icon: '👩‍🎓',
      accent: 'border-rose-500/30 hover:border-rose-500/60 bg-gradient-to-br from-rose-950/20 to-slate-900',
      tagColor: 'bg-rose-500/20 text-rose-300 border border-rose-500/30',
      action: (prev: FilterState) => ({ ...prev, gender: 'Female' as const, onlyEligible: false })
    },
    {
      id: 'sc-st-obc',
      title: 'SC / ST & OBC Welfare Schemes',
      hindi: 'अनुसूचित जाति/जनजाति व पिछड़ा वर्ग',
      count: '9 Schemes',
      icon: '🏛️',
      accent: 'border-blue-500/30 hover:border-blue-500/60 bg-gradient-to-br from-blue-950/20 to-slate-900',
      tagColor: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
      action: (prev: FilterState) => ({ ...prev, category: 'OBC' as const, onlyEligible: false })
    },
    {
      id: 'merit',
      title: 'Merit & Pure Science Research',
      hindi: 'मेरिट व शुद्ध विज्ञान अनुसंधान (डीएसटी)',
      count: '4 Schemes',
      icon: '🔬',
      accent: 'border-emerald-500/30 hover:border-emerald-500/60 bg-gradient-to-br from-emerald-950/20 to-slate-900',
      tagColor: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
      action: (prev: FilterState) => ({ ...prev, searchQuery: 'Inspire', onlyEligible: false })
    },
    {
      id: 'corporate-csr',
      title: 'Corporate CSR Scholarships',
      hindi: 'कॉर्पोरेट सीएसआर अनुदान (रिलायंस, एसबीआई)',
      count: '7 Schemes',
      icon: '💼',
      accent: 'border-amber-500/30 hover:border-amber-500/60 bg-gradient-to-br from-amber-950/20 to-slate-900',
      tagColor: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
      action: (prev: FilterState) => ({ ...prev, provider: 'Private' as const, onlyEligible: false })
    },
    {
      id: 'pwd',
      title: 'Specially Abled (PwD / Saksham)',
      hindi: 'दिव्यांग सशक्तिकरण (एआईसीटीई सक्षम)',
      count: '3 Schemes',
      icon: '♿',
      accent: 'border-purple-500/30 hover:border-purple-500/60 bg-gradient-to-br from-purple-950/20 to-slate-900',
      tagColor: 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
      action: (prev: FilterState) => ({ ...prev, onlyDisability: true, onlyEligible: false })
    },
    {
      id: 'hostel-fee',
      title: 'State Fee Waivers & Hostel Aid',
      hindi: 'राज्य शुल्क प्रतिपूर्ति व वसतिगृह भत्ता',
      count: '8 Schemes',
      icon: '🏢',
      accent: 'border-sky-500/30 hover:border-sky-500/60 bg-gradient-to-br from-sky-950/20 to-slate-900',
      tagColor: 'bg-sky-500/20 text-sky-300 border border-sky-500/30',
      action: (prev: FilterState) => ({ ...prev, provider: 'State' as const, onlyEligible: false })
    }
  ];

  return (
    <div className="py-6 no-print">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center space-x-2">
            <span>Explore by Scholarship Category</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-orange-500/15 text-orange-400 font-extrabold border border-orange-500/30">
              श्रेणी अनुसार खोज
            </span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Targeted grants organized by student background, study level, and support type.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {hubs.map((hub) => (
          <motion.div
            key={hub.id}
            whileHover={{ y: -3, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              onSelectCategory(hub.action);
              const el = document.getElementById('schemes-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`p-5 rounded-3xl border ${hub.accent} cursor-pointer transition-all shadow-xl flex items-start justify-between group backdrop-blur-md`}
          >
            <div className="flex items-start space-x-3.5">
              <span className="text-3xl shrink-0 group-hover:scale-110 transition-transform">
                {hub.icon}
              </span>
              <div>
                <div className="flex items-center space-x-2">
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${hub.tagColor}`}>
                    {hub.count}
                  </span>
                </div>
                <h4 className="font-black text-white text-sm sm:text-base mt-1 group-hover:text-orange-400 transition-colors">
                  {hub.title}
                </h4>
                <p className="text-xs text-slate-400 font-medium mt-0.5">
                  {hub.hindi}
                </p>
              </div>
            </div>

            <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 group-hover:text-orange-400 group-hover:border-orange-500/40 flex items-center justify-center shrink-0 transition-colors">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
