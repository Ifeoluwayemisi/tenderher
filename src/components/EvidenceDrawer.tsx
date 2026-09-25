import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { RequirementItem } from '../types';
import {
  X,
  FileText,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Lightbulb,
} from 'lucide-react';

interface EvidenceDrawerProps {
  item: RequirementItem | null;
  onClose: () => void;
  onProceedBidReadiness: () => void;
}

export const EvidenceDrawer: React.FC<EvidenceDrawerProps> = ({
  item,
  onClose,
  onProceedBidReadiness,
}) => {
  if (!item) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
        />

        {/* Sliding Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 250 }}
          className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between z-10 border-l border-slate-200 overflow-y-auto"
        >
          {/* Drawer Top Header */}
          <div className="p-6 border-b border-slate-200 bg-slate-50/80 sticky top-0 bg-white/95 backdrop-blur-md z-10 flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
                  {item.category}
                </span>

                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded uppercase ${
                    item.status === 'MATCH'
                      ? 'bg-emerald-100 text-emerald-800'
                      : item.status === 'POTENTIAL GAP'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <h2 className="text-lg font-extrabold text-slate-900 leading-snug">
                {item.title}
              </h2>
              <span className="text-xs text-slate-500 font-medium">
                Why are we saying this? (Evidence Clause Analysis)
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body Content */}
          <div className="p-6 flex flex-col gap-6 flex-1">
            {/* Verbatim Published Specification Clause */}
            <div className="flex flex-col gap-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <FileText className="w-4 h-4 text-emerald-600" />
                <span>Verbatim Specification Clause ({item.clauseReference})</span>
              </div>
              <blockquote className="text-xs text-slate-700 italic bg-white p-3 rounded-lg border border-slate-200 leading-relaxed font-serif">
                "{item.verbatimClause}"
              </blockquote>
            </div>

            {/* Profile vs Tender Requirement Comparison */}
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Profile vs Requirement Comparison
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col gap-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">
                    Your Profile
                  </span>
                  <span className="text-sm font-extrabold text-slate-900">
                    {item.userValue || '4 Years'}
                  </span>
                </div>

                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex flex-col gap-1">
                  <span className="text-[10px] text-emerald-700 font-bold uppercase">
                    Tender Requirement
                  </span>
                  <span className="text-sm font-extrabold text-emerald-900">
                    {item.requiredValue || '5 Years'}
                  </span>
                </div>
              </div>

              {/* Gap Explanation text box if potential gap */}
              {item.status === 'POTENTIAL GAP' && (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Identified Deficiency</span>
                  </div>
                  <p className="text-xs text-amber-800 leading-relaxed">
                    {item.gapAnalysisText ||
                      'Your business profile recorded experience falls below the required threshold for this specific tender dossier.'}
                  </p>
                </div>
              )}

              {item.status === 'MATCH' && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-xs font-semibold text-emerald-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Your profile fully meets or exceeds this published clause!</span>
                </div>
              )}
            </div>

            {/* Recommended Action Pathways / Mitigation Options */}
            {item.recommendations && item.recommendations.length > 0 && (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  <span>Recommended Action Pathways</span>
                </div>

                <ul className="flex flex-col gap-2">
                  {item.recommendations.map((rec, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-start gap-2.5"
                    >
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Drawer Bottom CTA Button */}
          <div className="p-6 border-t border-slate-200 bg-white sticky bottom-0 z-10">
            <button
              onClick={() => {
                onClose();
                onProceedBidReadiness();
              }}
              className="w-full h-12 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-[0.99]"
            >
              <span>Proceed to complete Bid Readiness scoring</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
