import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, ShieldCheck, Printer } from 'lucide-react';

interface GazetteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onToast: (title: string, desc: string) => void;
}

export const GazetteModal: React.FC<GazetteModalProps> = ({
  isOpen,
  onClose,
  onToast,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl z-10 border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <div className="flex flex-col">
                <span className="text-xs font-bold font-mono text-emerald-300">
                  OFFICIAL BPP GAZETTE PUBLICATION • GAZETTE REF: FMCIDE/2026/G/042
                </span>
                <span className="text-[10px] text-slate-400">
                  Federal Republic of Nigeria Public Procurement Registry
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Document Content View */}
          <div className="p-6 overflow-y-auto flex flex-col gap-6 bg-slate-50 font-serif text-slate-800 text-xs leading-relaxed">
            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-xs flex flex-col gap-4 font-serif border-t-4 border-t-emerald-700">
              <div className="text-center border-b border-slate-200 pb-4 flex flex-col gap-1">
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900">
                  FEDERAL TENDERS JOURNAL & PROCUREMENT GAZETTE
                </h3>
                <span className="text-[10px] font-sans text-slate-500">
                  PUBLISHED BY AUTHORITY OF THE BUREAU OF PUBLIC PROCUREMENT (BPP) NIGERIA
                </span>
                <span className="text-[10px] font-mono text-emerald-800 font-bold">
                  BATCH REF: BPP-NG-2026-9931 • DATE: 12 AUGUST 2026
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <h4 className="font-sans font-bold text-xs text-slate-900 uppercase">
                  SECTION 5: SPECIFIC INVITATION FOR TENDERS (IFT)
                </h4>
                <p className="font-sans font-semibold text-slate-800">
                  PROCUREMENT TITLE: PROVISION OF ENTERPRISE ICT & SOFTWARE SERVICES (REF: FMCIDE/2026/G/042)
                </p>
              </div>

              <div className="bg-amber-50/90 p-4 rounded-lg border border-amber-300 text-slate-900 font-serif italic my-2">
                "Clause 5.2.1 (Technical & Operational Eligibility Criteria): Bidders must demonstrate a minimum of five (5) years of continuous commercial operating experience in providing enterprise ICT and custom software development services to public or corporate institutions in Nigeria..."
              </div>

              <div className="text-[11px] font-sans text-slate-500 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span>Page 17 of 48 • Official Gazette Record</span>
                <span className="text-emerald-700 font-bold">✓ Certified Authenticated Extract</span>
              </div>
            </div>
          </div>

          {/* Modal Footer Controls */}
          <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between gap-4">
            <span className="text-xs text-slate-500">
              Cross-referenced with NOCOPO Live Ingestion Engine
            </span>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onToast('Printing Gazette', 'Sending official gazette document to printer...')}
                className="px-3 h-9 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>

              <button
                onClick={() => onToast('Downloading Gazette PDF', 'Official Gazette Ref FMCIDE/2026/G/042 downloaded.')}
                className="px-4 h-9 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Gazette (PDF)</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
