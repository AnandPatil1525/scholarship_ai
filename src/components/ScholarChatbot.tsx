import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Send, 
  Bot, 
  User, 
  RotateCcw, 
  ExternalLink, 
  ArrowRight,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { Scheme, MatchResult, UserProfile } from '../types';
import { formatIndianCurrency } from '../utils/formatters';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  suggestedSchemes?: Scheme[];
  actionLink?: {
    label: string;
    url: string;
  };
}

interface ScholarChatbotProps {
  schemes: Scheme[];
  matchedResults: MatchResult[];
  userProfile: UserProfile;
  onSelectScheme: (scheme: Scheme) => void;
  lang: string;
}

export const ScholarChatbot: React.FC<ScholarChatbotProps> = ({
  schemes,
  matchedResults,
  userProfile,
  onSelectScheme
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialBotMessage: Message = {
    id: 'welcome',
    sender: 'bot',
    text: `Namaste! I am your ScholarSpot AI Assistant. I can help you verify your eligibility, prepare documents for NSP & State DBT portals, and answer any scholarship doubts. How can I help you today?`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  const [messages, setMessages] = useState<Message[]>([initialBotMessage]);

  const quickPrompts = [
    "🎓 What scholarships match my profile?",
    "📄 Which documents do I need for NSP?",
    "🏦 What is Aadhaar NPCI bank seeding?",
    "👩‍🎓 Are there grants for girls in STEM?",
    "🏛️ How does MahaDBT EBC fee waiver work?",
    "💰 Any scholarships with NO income limit?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  // Intelligent query matching engine
  const generateBotReply = (query: string): Message => {
    const q = query.toLowerCase();
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 1. Matched to profile
    if (q.includes('match') || q.includes('my profile') || q.includes('eligible for me') || q.includes('qualify')) {
      const eligible = matchedResults.filter(r => r.status === 'Eligible');
      if (eligible.length > 0) {
        const top3 = eligible.slice(0, 3).map(r => r.scheme);
        return {
          id: Date.now().toString(),
          sender: 'bot',
          text: `Based on your profile (${userProfile.category || 'General'}, ${userProfile.educationLevel || 'College'}, ${userProfile.state || 'All India'}, Income: ${userProfile.annualFamilyIncome ? formatIndianCurrency(userProfile.annualFamilyIncome) : 'Unspecified'}), you are 100% eligible for ${eligible.length} schemes! Here are the top opportunities:`,
          timestamp,
          suggestedSchemes: top3
        };
      } else {
        return {
          id: Date.now().toString(),
          sender: 'bot',
          text: `I evaluated all 26 schemes. Some criteria in your profile (such as category or state) need adjustment or review. You can check the "Likely Eligible" tab or tweak your state and income in the checker wizard!`,
          timestamp
        };
      }
    }

    // 2. Documents required
    if (q.includes('document') || q.includes('papers') || q.includes('certificate') || q.includes('nsp doc')) {
      return {
        id: Date.now().toString(),
        sender: 'bot',
        text: `Here are the 6 essential documents required for nearly all Indian government scholarships (NSP, MahaDBT, UP Portal):\n\n1. Aadhaar Card (Must be mobile-linked)\n2. Annual Family Income Certificate (Issued by Tahsildar / Revenue Dept for FY 2026-27)\n3. Caste / Category Certificate (SC/ST/OBC/EWS)\n4. Previous Qualifying Exam Marksheet (10th/12th/Semester)\n5. Bonafide Student Certificate from Principal/Dean\n6. Bank Passbook (Aadhaar & NPCI DBT Seeded)\n\nTip: You can tick these off in your Document Locker to track readiness!`,
        timestamp
      };
    }

    // 3. Bank NPCI seeding / DBT
    if (q.includes('npci') || q.includes('bank') || q.includes('dbt') || q.includes('seeding') || q.includes('account')) {
      return {
        id: Date.now().toString(),
        sender: 'bot',
        text: `Aadhaar-Bank NPCI Seeding is mandatory for Direct Benefit Transfer (DBT):\n\n• Simply linking Aadhaar is NOT enough. Your bank account must be mapped on the NPCI (National Payments Corporation of India) mapper.\n• To verify: Visit the UIDAI official portal or your bank branch and submit the "Aadhaar Seeding / DBT Consent Form".\n• Without NPCI seeding, the scholarship amount cannot be disbursed by the Ministry.`,
        timestamp,
        actionLink: {
          label: 'Verify on UIDAI Resident Portal',
          url: 'https://myaadhaar.uidai.gov.in/'
        }
      };
    }

    // 4. Girls scholarships
    if (q.includes('girl') || q.includes('female') || q.includes('women') || q.includes('stem') || q.includes('pragati') || q.includes('kanya')) {
      const girlSchemes = schemes.filter(s => s.gender === 'Female' || s.categories.includes('Girls'));
      return {
        id: Date.now().toString(),
        sender: 'bot',
        text: `Great news! There are several prestigious scholarships dedicated exclusively to female students:\n\n• AICTE Pragati Scholarship: ₹50,000/yr for girls in technical degree/diploma.\n• Kotak Kanya Scholarship: ₹1,50,000/yr for girls pursuing MBBS, Engineering, or Law.\n• Begum Hazrat Mahal: For minority girl school students (Class 9-12).\n• Santoor Women's Scholarship: ₹24,000/yr for young women after Class 12.\n• Kanyashree Prakalpa (K2): ₹25,000 one-time grant in West Bengal.`,
        timestamp,
        suggestedSchemes: girlSchemes.slice(0, 3)
      };
    }

    // 5. MahaDBT / Maharashtra
    if (q.includes('mahadbt') || q.includes('maharashtra') || q.includes('ebc') || q.includes('panjabrao')) {
      const mahaSchemes = schemes.filter(s => s.state === 'Maharashtra');
      return {
        id: Date.now().toString(),
        sender: 'bot',
        text: `Maharashtra MahaDBT Portal offers two major flagship schemes:\n\n1. Rajarshi Chhatrapati Shahu Maharaj EBC Scheme: 50% Tuition Fee & Exam Fee reimbursement for students admitted via CAP rounds with annual family income up to ₹8 Lakhs.\n2. Dr. Panjabrao Deshmukh Vasatigruh Nirvah Bhatta: Up to ₹30,000/year hostel maintenance allowance for children of marginal farmers and EBC students living away from home.`,
        timestamp,
        suggestedSchemes: mahaSchemes,
        actionLink: {
          label: 'Visit MahaDBT Portal',
          url: 'https://mahadbt.maharashtra.gov.in/'
        }
      };
    }

    // 6. No income limit
    if (q.includes('no income') || q.includes('without income') || q.includes('merit') || q.includes('inspire')) {
      const meritSchemes = schemes.filter(s => s.maxFamilyIncome === null);
      return {
        id: Date.now().toString(),
        sender: 'bot',
        text: `Here are prominent scholarships that have NO family income ceiling and depend purely on academic merit or special quotas:\n\n• DST INSPIRE Scholarship for Higher Education (SHE): ₹80,000/year for top 1% Class 12 board scorers pursuing Natural & Basic Sciences.\n• West Bengal Kanyashree K2: ₹25,000 grant for 18-19 year old girl students without any income barrier.\n• Santoor Women's Scholarship: Focused on alumni of government schools without a strict income ceiling.`,
        timestamp,
        suggestedSchemes: meritSchemes
      };
    }

    // 7. Generic helpful fallback
    return {
      id: Date.now().toString(),
      sender: 'bot',
      text: `Thank you for asking about "${query}". In ScholarSpot, you can verify your exact eligibility using the Checker Wizard above. We track 26+ authentic Central, State (MahaDBT, UP, Karnataka SSP, WB SVMCM), and Corporate (Reliance, SBI, HDFC) scholarships. Try clicking one of the suggested topics below or let me know your course and category!`,
      timestamp
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const botReply = generateBotReply(text);
      setIsTyping(false);
      setMessages(prev => [...prev, botReply]);
    }, 600);
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40 no-print">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 rounded-2xl bg-gradient-to-tr from-orange-600 via-amber-600 to-orange-500 hover:from-orange-500 hover:to-amber-500 text-white flex items-center justify-center shadow-2xl shadow-orange-500/40 border-2 border-orange-400/40"
          title="ScholarSpot AI Assistant"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <>
              <Bot className="w-7 h-7" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#07090e] flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              </span>
            </>
          )}
        </motion.button>
      </div>

      {/* Floating Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className={`fixed z-50 rounded-3xl bg-[#0c1220] border border-slate-700/80 shadow-2xl overflow-hidden flex flex-col no-print ${
              isExpanded
                ? 'bottom-4 right-4 left-4 sm:left-auto sm:right-6 sm:bottom-6 sm:w-[600px] h-[80vh]'
                : 'bottom-22 right-4 left-4 sm:left-auto sm:right-6 sm:w-[420px] h-[550px]'
            }`}
          >
            {/* Header */}
            <div className="px-5 py-4 bg-gradient-to-r from-slate-950 via-[#0e1628] to-slate-950 border-b border-slate-800 flex items-center justify-between text-white">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-600 flex items-center justify-center border border-orange-400/30 shadow-xs">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <h3 className="font-black text-sm text-white">
                      ScholarBot AI
                    </h3>
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold border border-emerald-500/30">
                      Online
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    ScholarSpot Scholarship & Eligibility Guide
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-1 text-slate-400">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-1.5 hover:text-white hover:bg-slate-800 rounded-lg transition-colors hidden sm:block"
                  title={isExpanded ? 'Collapse' : 'Expand'}
                >
                  {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => setMessages([initialBotMessage])}
                  className="p-1.5 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                  title="Clear chat"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#07090e]/60">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[88%] ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs shrink-0 mt-0.5 ${
                      msg.sender === 'user'
                        ? 'bg-orange-600 text-white'
                        : 'bg-slate-800 text-orange-400 border border-slate-700'
                    }`}>
                      {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>

                    <div className={`p-3.5 rounded-2xl text-xs sm:text-[13px] leading-relaxed shadow-xs ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white font-medium rounded-tr-xs'
                        : 'bg-[#0f172a] text-slate-200 border border-slate-800 rounded-tl-xs whitespace-pre-line'
                    }`}>
                      {msg.text}

                      {/* Attached Scheme Cards inside bot response */}
                      {msg.suggestedSchemes && msg.suggestedSchemes.length > 0 && (
                        <div className="mt-3 pt-2.5 border-t border-slate-700/80 space-y-2">
                          {msg.suggestedSchemes.map((scheme) => (
                            <div
                              key={scheme.id}
                              onClick={() => {
                                onSelectScheme(scheme);
                                setIsOpen(false);
                              }}
                              className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-700 hover:border-orange-500/50 cursor-pointer transition-all flex items-center justify-between group"
                            >
                              <div className="pr-2">
                                <span className="text-[10px] font-bold text-orange-400 block">
                                  {scheme.provider} • {scheme.state}
                                </span>
                                <h5 className="font-extrabold text-white text-xs group-hover:text-orange-400 transition-colors line-clamp-1">
                                  {scheme.name}
                                </h5>
                                <span className="text-[10px] text-slate-400 font-medium">
                                  {scheme.benefits}
                                </span>
                              </div>
                              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-orange-400 shrink-0" />
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Action Link if any */}
                      {msg.actionLink && (
                        <a
                          href={msg.actionLink.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2.5 inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-blue-600/20 text-blue-300 hover:bg-blue-600/30 border border-blue-500/30 text-[11px] font-bold transition-colors"
                        >
                          <span>{msg.actionLink.label}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>

                  <span className="text-[9px] text-slate-500 mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-center space-x-2 text-slate-400">
                  <div className="w-7 h-7 rounded-xl bg-slate-800 text-orange-400 flex items-center justify-center text-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="p-3 bg-[#0f172a] rounded-2xl border border-slate-800 flex items-center space-x-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-bounce" />
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Chips */}
            <div className="p-2.5 bg-[#090e1a] border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto scrollbar-none text-[11px]">
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt)}
                  className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/80 shrink-0 font-medium transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Chat Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-[#0b101d] border-t border-slate-800 flex items-center space-x-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about scholarships, documents, income limit..."
                className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="p-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 disabled:opacity-40 text-white shadow-md shadow-orange-600/30 transition-all shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
