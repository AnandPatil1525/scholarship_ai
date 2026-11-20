import React from 'react';
import { MatchResult, UserProfile } from '../types';
import { formatDate, formatIndianCurrency } from '../utils/formatters';
import { 
  X, 
  Printer, 
  FileCheck, 
  GraduationCap 
} from 'lucide-react';

interface PrintablePackModalProps {
  isOpen: boolean;
  onClose: () => void;
  matchedResults: MatchResult[];
  userProfile: UserProfile;
  checkedDocs: string[];
}

export const PrintablePackModal: React.FC<PrintablePackModalProps> = ({
  isOpen,
  onClose,
  matchedResults,
  userProfile,
  checkedDocs
}) => {
  if (!isOpen) return null;

  const eligibleSchemes = matchedResults.filter(
    r => r.status === 'Eligible' || r.status === 'Possibly Eligible'
  );

  const allRequiredDocs = Array.from(
    new Set(eligibleSchemes.flatMap(s => s.scheme.documentsRequired))
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-[#0c1220] rounded-3xl shadow-2xl border border-slate-700 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Hidden on Print */}
        <div className="no-print px-6 py-4 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <Printer className="w-5 h-5 text-orange-400" />
            <h3 className="font-extrabold text-base sm:text-lg">
              ScholarSpot Cyber Cafe & CSC Application Pack (प्रिंट चेकलिस्ट)
            </h3>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center space-x-1.5 px-4 py-2 text-xs font-extrabold text-white bg-orange-600 hover:bg-orange-500 rounded-xl shadow-md shadow-orange-600/30 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Paper View: High Contrast on Screen & Clean on Printer */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto text-slate-900 bg-white card-print">
          {/* Printable Document Title */}
          <div className="border-b-2 border-slate-900 pb-4 flex items-start justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <GraduationCap className="w-7 h-7 text-orange-600" />
                <h1 className="text-2xl font-black tracking-tight text-slate-900">
                  ScholarSpot • Scholarship Application Guide
                </h1>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Generated Document Readiness & Scheme Dossier for Indian Students • Print or bring to Cyber Cafe / CSC Centre
              </p>
            </div>
            <div className="text-right text-xs text-slate-500">
              <p>Generated: <strong>{new Date().toLocaleDateString('en-IN')}</strong></p>
              <p className="font-semibold text-emerald-700">Matched Schemes: {eligibleSchemes.length}</p>
            </div>
          </div>

          {/* Student Profile Snapshot */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Applicant Profile Summary
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <span className="text-slate-400 block">Education Level:</span>
                <span className="font-bold text-slate-800">{userProfile.educationLevel || 'Not Specified'}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Social Category:</span>
                <span className="font-bold text-slate-800">{userProfile.category || 'Not Specified'}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Annual Income:</span>
                <span className="font-bold text-slate-800">
                  {userProfile.annualFamilyIncome ? formatIndianCurrency(userProfile.annualFamilyIncome) : 'Not specified'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Domicile State:</span>
                <span className="font-bold text-slate-800">{userProfile.state || 'All India'}</span>
              </div>
            </div>
          </div>

          {/* Master Document Checklist to Bring */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <FileCheck className="w-5 h-5 text-emerald-600" />
              <h2 className="text-base font-bold text-slate-900">
                Master Document Checklist (ले जाने वाले आवश्यक दस्तावेज़)
              </h2>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              Carry original documents + 2 sets of self-attested photocopies + digital scans on USB pendrive or phone.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {allRequiredDocs.map((doc, idx) => {
                const isReady = checkedDocs.includes(doc);
                return (
                  <div key={idx} className="p-2.5 rounded-lg border border-slate-200 flex items-center justify-between">
                    <span className="font-medium text-slate-800">{doc}</span>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                      isReady ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {isReady ? '✓ Ready in Locker' : 'To Procure'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Matched Schemes Detailed List */}
          <div>
            <h2 className="text-base font-bold text-slate-900 mb-3">
              Eligible Scholarships & Portals ({eligibleSchemes.length})
            </h2>

            <div className="space-y-3">
              {eligibleSchemes.map(({ scheme, status }) => (
                <div key={scheme.id} className="p-4 rounded-xl border border-slate-200 bg-white">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border">
                          {scheme.provider}
                        </span>
                        <span className="text-xs font-bold text-emerald-700">
                          {status}
                        </span>
                      </div>
                      <h3 className="font-bold text-sm text-slate-900 mt-1">
                        {scheme.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {scheme.providerName}
                      </p>
                    </div>

                    <div className="text-right text-xs">
                      <span className="text-slate-400 block">Deadline</span>
                      <span className="font-bold text-slate-800">{formatDate(scheme.deadline)}</span>
                    </div>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs gap-2">
                    <div>
                      <strong className="text-slate-700">Grant: </strong>
                      <span className="text-slate-900">{scheme.benefits}</span>
                    </div>
                    <div>
                      <strong className="text-slate-700">Official Portal: </strong>
                      <span className="text-orange-600 underline font-mono text-[11px]">{scheme.officialLink}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CSC / Cyber Cafe Operator Notes */}
          <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs space-y-1">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider">
              CSC / Cyber Cafe Operator Instructions:
            </h4>
            <p>1. Check that the applicant's Bank Account is Aadhaar Seeded with NPCI mapping enabled for DBT.</p>
            <p>2. Upload all documents in PDF format strictly between 50KB and 200KB as specified on the portal.</p>
            <p>3. Provide printed acknowledgement slip to the student with Application Reference Number.</p>
          </div>
        </div>

        {/* Bottom CTA on screen */}
        <div className="no-print px-6 py-4 bg-slate-950 border-t border-slate-800 flex items-center justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-300 bg-slate-800 border border-slate-700 rounded-xl"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center space-x-1.5 px-5 py-2.5 text-xs font-bold text-white bg-orange-600 hover:bg-orange-500 rounded-xl shadow-md transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print Application Guide</span>
          </button>
        </div>
      </div>
    </div>
  );
};
