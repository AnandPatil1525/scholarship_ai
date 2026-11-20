import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  ShieldCheck, 
  Smartphone, 
  Mail, 
  ArrowRight, 
  UserCheck, 
  FileBadge
} from 'lucide-react';
import confetti from 'canvas-confetti';

import { SupportedLang } from '../i18n/translations';

export interface UserAccount {
  name: string;
  emailOrPhone: string;
  isDigiLockerVerified: boolean;
  aadhaarLastFour?: string;
  category: string;
  state: string;
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserAccount | null;
  onLogin: (user: UserAccount) => void;
  onLogout: () => void;
  lang: SupportedLang;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onLogout
}) => {
  const [authMode, setAuthMode] = useState<'digilocker' | 'otp' | 'password'>('digilocker');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode] = useState(['5', '8', '2', '9', '1', '0']);
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState('');
  const [studentName, setStudentName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleDigiLockerConnect = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const mockUser: UserAccount = {
        name: studentName || 'Aarav Sharma',
        emailOrPhone: phoneNumber || 'aarav.sharma@edu.in',
        isDigiLockerVerified: true,
        aadhaarLastFour: '4821',
        category: 'OBC',
        state: 'Maharashtra'
      };
      onLogin(mockUser);
      try {
        confetti({ particleCount: 50, spread: 80, origin: { y: 0.6 } });
      } catch {}
      onClose();
    }, 1000);
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 10) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOtpSent(true);
    }, 800);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const mockUser: UserAccount = {
        name: studentName || 'Priya Patel',
        emailOrPhone: phoneNumber,
        isDigiLockerVerified: true,
        aadhaarLastFour: '9102',
        category: 'General',
        state: 'Uttar Pradesh'
      };
      onLogin(mockUser);
      try {
        confetti({ particleCount: 40, spread: 70, origin: { y: 0.6 } });
      } catch {}
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto no-print">
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        className="relative w-full max-w-lg bg-[#0c1220] text-slate-100 rounded-3xl shadow-2xl border border-slate-700/80 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Gradient Banner */}
        <div className="px-6 py-6 bg-gradient-to-r from-slate-950 via-[#0e1628] to-slate-950 text-white flex items-start justify-between relative overflow-hidden border-b border-slate-800">
          <div className="relative z-10">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-slate-800 text-orange-400 text-xs font-semibold border border-orange-500/20 mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>National Academic Portal Identity</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              {currentUser ? 'Student Profile Dashboard' : 'Student Sign In / e-KYC'}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {currentUser 
                ? 'Your verified scholarship profile & synchronized documents'
                : 'Connect via DigiLocker, Mobile OTP, or Aadhaar for instant profile auto-fill'
              }
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors relative z-10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {currentUser ? (
            /* Logged In View */
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-center space-x-3.5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                  {currentUser.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-extrabold text-white text-base">
                      {currentUser.name}
                    </h3>
                    {currentUser.isDigiLockerVerified && (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center space-x-1 border border-emerald-500/30">
                        <ShieldCheck className="w-3 h-3 text-emerald-400" />
                        <span>Aadhaar e-KYC Verified</span>
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {currentUser.emailOrPhone} • {currentUser.state} • {currentUser.category}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                  <span className="text-slate-500 font-semibold block">Aadhaar Linked</span>
                  <span className="font-bold text-white text-sm mt-0.5 block">
                    •••• •••• {currentUser.aadhaarLastFour || '4821'}
                  </span>
                </div>
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                  <span className="text-slate-500 font-semibold block">DBT Bank Status</span>
                  <span className="font-bold text-emerald-400 text-sm mt-0.5 block flex items-center space-x-1">
                    <UserCheck className="w-4 h-4" />
                    <span>NPCI Active</span>
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => {
                    onLogout();
                    onClose();
                  }}
                  className="px-4 py-2 text-xs font-bold text-red-400 hover:bg-red-950/30 rounded-xl transition-colors"
                >
                  Sign Out
                </button>

                <button
                  onClick={onClose}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors border border-slate-700"
                >
                  Return to Finder
                </button>
              </div>
            </div>
          ) : (
            /* Sign In / Sign Up View */
            <div className="space-y-5">
              {/* Auth Mode Tabs */}
              <div className="flex p-1 bg-slate-900 rounded-2xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => { setAuthMode('digilocker'); setOtpSent(false); }}
                  className={`flex-1 py-2 text-xs font-extrabold rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
                    authMode === 'digilocker'
                      ? 'bg-slate-800 text-white shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <FileBadge className="w-3.5 h-3.5 text-blue-400" />
                  <span>DigiLocker</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setAuthMode('otp'); setOtpSent(false); }}
                  className={`flex-1 py-2 text-xs font-extrabold rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
                    authMode === 'otp'
                      ? 'bg-slate-800 text-white shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5 text-orange-400" />
                  <span>Mobile OTP</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setAuthMode('password'); setOtpSent(false); }}
                  className={`flex-1 py-2 text-xs font-extrabold rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
                    authMode === 'password'
                      ? 'bg-slate-800 text-white shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5 text-purple-400" />
                  <span>Email</span>
                </button>
              </div>

              {/* DIGILOCKER CONNECT TAB */}
              {authMode === 'digilocker' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-950/40 to-indigo-950/30 border border-blue-500/30">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                        <FileBadge className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-black text-white text-sm">
                          Direct DigiLocker & Aadhaar Sync
                        </h4>
                        <p className="text-xs text-blue-300 mt-0.5">
                          Instantly pulls your category, state domicile, and verified educational credentials.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Student Full Name (As on Aadhaar)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Aarav Sharma"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>

                  <button
                    onClick={handleDigiLockerConnect}
                    disabled={isLoading}
                    className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center space-x-2"
                  >
                    {isLoading ? (
                      <span className="flex items-center space-x-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Verifying with DigiLocker...</span>
                      </span>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>Connect with DigiLocker</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* MOBILE OTP TAB */}
              {authMode === 'otp' && (
                <div className="space-y-4 animate-fadeIn">
                  {!otpSent ? (
                    <form onSubmit={handleSendOtp} className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                          Aadhaar-Linked Mobile Number
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-500">
                            +91
                          </span>
                          <input
                            type="tel"
                            maxLength={10}
                            placeholder="98765 43210"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                            className="w-full pl-12 pr-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-medium"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading || phoneNumber.length < 10}
                        className="w-full py-3 px-4 rounded-xl bg-orange-600 hover:bg-orange-500 disabled:opacity-50 text-white font-bold text-sm shadow-md shadow-orange-600/30 transition-all flex items-center justify-center space-x-2"
                      >
                        {isLoading ? 'Sending OTP...' : 'Send 6-Digit OTP'}
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={handleVerifyOtp} className="space-y-4">
                      <div className="text-center">
                        <span className="text-xs text-slate-400">
                          Enter OTP sent to +91 {phoneNumber}
                        </span>
                        <div className="flex justify-center gap-2 mt-2">
                          {otpCode.map((digit, i) => (
                            <input
                              key={i}
                              type="text"
                              maxLength={1}
                              value={digit}
                              readOnly
                              className="w-10 h-11 text-center font-black text-lg bg-slate-900 border border-orange-500/50 rounded-xl text-orange-400 shadow-inner"
                            />
                          ))}
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md shadow-emerald-600/30 transition-all flex items-center justify-center space-x-2"
                      >
                        {isLoading ? 'Verifying...' : 'Verify OTP & Sign In'}
                      </button>
                    </form>
                  )}
                </div>
              )}

              {/* EMAIL / PASSWORD TAB */}
              {authMode === 'password' && (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleDigiLockerConnect();
                  }} 
                  className="space-y-3 animate-fadeIn"
                >
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Email or Student Roll No
                    </label>
                    <input
                      type="text"
                      placeholder="student@college.edu.in"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full mt-2 py-3 px-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm shadow-md shadow-orange-600/30 transition-all flex items-center justify-center space-x-2"
                  >
                    <span>Sign In With Email</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
