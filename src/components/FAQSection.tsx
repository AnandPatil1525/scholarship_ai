import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How do I get an Income Certificate from the Tahsildar / Revenue Department?",
      a: "An Annual Family Income Certificate can be applied for online via your state e-District portal (e.g., Aaple Sarkar in Maharashtra, e-District UP, Seva Sindhu in Karnataka) or offline at your local Taluk / Tahsildar office or CSC Common Service Centre. It is typically valid for 1 financial year."
    },
    {
      q: "What is Aadhaar Seeding / NPCI mapping with bank accounts?",
      a: "All government scholarships use Direct Benefit Transfer (DBT). Your bank account must not only have your Aadhaar number submitted, but it must also be mapped on the NPCI mapper. You can verify your Aadhaar-Bank seeding status on the official UIDAI portal or via your bank's net banking."
    },
    {
      q: "Can I apply for both Central and State Government scholarships simultaneously?",
      a: "Under Government of India regulations, a student can typically avail tuition fee reimbursement from only one government source. However, you can often combine a government tuition fee waiver with certain private/corporate CSR grants (such as SBI Asha or Santoor) unless explicitly barred by the specific scheme guideline."
    },
    {
      q: "Are marksheet and domicile certificates downloaded from DigiLocker valid?",
      a: "Yes! As per the Information Technology Act 2000, documents downloaded and shared via DigiLocker are treated at par with original physical documents for National Scholarship Portal (NSP) and state scholarship verifications."
    },
    {
      q: "What if my family income is slightly above the scheme limit (e.g., ₹2.6L vs ₹2.5L)?",
      a: "Government income ceilings are hard limits verified strictly against the numeric figure on your authorized Tahsildar income certificate. If your income exceeds the ceiling, look for corporate grants like Reliance Foundation (limit up to ₹15 Lakhs) or AICTE Pragati (limit up to ₹8 Lakhs)."
    }
  ];

  return (
    <div className="py-8 bg-[#0b101d] rounded-3xl border border-slate-800 p-6 sm:p-10 shadow-2xl no-print">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="text-xs font-extrabold uppercase tracking-wider text-blue-400 bg-blue-500/15 px-3 py-1 rounded-full border border-blue-500/30">
          Student Helpdesk & Guidance • सहायता
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">
          Frequently Asked Questions
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Everything you need to know about certificates, bank DBT seeding, and application rules.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isOpen ? 'bg-orange-950/20 border-orange-500/40 shadow-lg' : 'bg-slate-900/60 border-slate-800'
              }`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 focus:outline-none"
              >
                <span className="font-extrabold text-white text-sm sm:text-base leading-snug">
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 flex items-center justify-center shrink-0"
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};
