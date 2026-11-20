import React from 'react';
import { motion } from 'framer-motion';
import { 
  Quote, 
  CheckCircle2 
} from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: "Sneha Jadhav",
      location: "Pune, Maharashtra",
      course: "B.Tech Computer Engineering",
      scheme: "Rajarshi Shahu Maharaj (MahaDBT EBC)",
      amount: "₹65,000 / year Fee Reimbursed",
      quote: "ScholarSpot made me realize that as an OBC student admitted via CAP with income under ₹8L, I was eligible for a 50% tuition waiver. Saved my family from educational loans!"
    },
    {
      name: "Mohammad Arif",
      location: "Lucknow, Uttar Pradesh",
      course: "B.Sc Mathematics",
      scheme: "UP Dashmottar Scholarship",
      amount: "₹45,000 Direct Benefit Transfer",
      quote: "The document checklist was a lifesaver. I was able to get my income certificate and bank NPCI seeding done a month before the portal closed."
    },
    {
      name: "Ananya Sharma",
      location: "Bengaluru, Karnataka",
      course: "MBBS 1st Year",
      scheme: "Kotak Kanya Scholarship",
      amount: "₹1,50,000 / year till graduation",
      quote: "As a girl student from a middle-class family pursuing medicine, Kotak Kanya gave me full financial independence to focus purely on my clinical studies."
    }
  ];

  return (
    <div className="py-8 no-print">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-500/15 px-3 py-1 rounded-full border border-emerald-500/30">
          Student Success Stories • सफलता की कहानियां
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">
          Empowering Thousands of Indian Scholars
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Hear from students who discovered schemes through transparent eligibility matching.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -4 }}
            className="p-6 rounded-3xl bg-[#0c1220]/90 border border-slate-800 shadow-xl hover:border-slate-700 transition-all flex flex-col justify-between backdrop-blur-md"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <Quote className="w-8 h-8 text-orange-500/30" />
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {item.amount}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                "{item.quote}"
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-800">
              <h4 className="font-extrabold text-white text-sm">
                {item.name}
              </h4>
              <p className="text-[11px] text-slate-400">
                {item.course} • {item.location}
              </p>
              <div className="flex items-center space-x-1 text-[11px] font-semibold text-orange-400 mt-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{item.scheme}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
