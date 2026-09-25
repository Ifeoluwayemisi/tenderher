import React from 'react';
import { motion } from 'motion/react';
import type { Opportunity, RequirementItem } from '../types';
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  MapPin,
  Calendar,
  Building2,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  FileText,
} from 'lucide-react';

interface TenderIntelligenceProps {
  opportunity: Opportunity;
  onBack: () => void;
  onSelectEvidence: (item: RequirementItem) => void;
}

export const TenderIntelligence: React.FC<TenderIntelligenceProps> = ({
  opportunity,
  onBack,
  onSelectEvidence,
}) => {
  // Group requirements by category
  const categories = [
    'FINANCIAL CAPACITY',
    'TECHNICAL & OPERATIONAL',
    'STATUTORY & LEGAL',
    'ADMINISTRATIVE',
  ] as const;

  const getRequirementsByCategory = (cat: (typeof categories)[number]) => {
    return opportunity.requirements.filter((r) => r.category === cat);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="p-8 max-w-5xl mx-auto w-full flex flex-col gap-8"
    >
      {/* Top Header Navigation & Record Pill */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800 transition-colors self-start"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Procurement Opportunities</span>
        </button>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200 text-xs font-semibold self-start sm:self-auto">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Verified Tender Record #{opportunity.refCode}</span>
        </div>
      </div>

      {/* Hero Card Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-8 flex flex-col gap-3">
          <span className="text-[11px] font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-3 py-1 rounded-md self-start">
            {opportunity.category}
          </span>

          <h1 className="text-2xl font-extrabold text-slate-900 leading-tight">
            {opportunity.title}
          </h1>

          <div className="flex items-start gap-2 text-sm font-semibold text-slate-700">
            <Building2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <span>{opportunity.ministry}</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{opportunity.location}</span>
            </div>

            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Deadline: <strong>{opportunity.deadline}</strong></span>
            </div>

            <div className="flex items-center gap-1 text-emerald-700 font-semibold cursor-pointer hover:underline">
              <span>Source: NOCOPO / Federal BPP</span>
              <ExternalLink className="w-3 h-3" />
            </div>
          </div>
        </div>

        {/* Hero Photo */}
        <div className="md:col-span-4 h-44 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
          <img
            src={opportunity.image}
            alt={opportunity.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Assessment Summary Box */}
      <div className="bg-emerald-50/70 rounded-2xl border border-emerald-200/80 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-bold text-slate-900">Your assessment</h3>
          <p className="text-xs text-slate-600">
            We compared the tender requirements with the information in your business profile.
          </p>
        </div>

        {/* Status Count Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-xs">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {opportunity.matchesCount} MATCHES
          </span>

          {opportunity.potentialGapsCount > 0 && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500 text-white text-xs font-bold shadow-xs">
              <AlertTriangle className="w-3.5 h-3.5" />
              {opportunity.potentialGapsCount} POTENTIAL GAP
            </span>
          )}

          {opportunity.toVerifyCount > 0 && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-200 text-slate-700 text-xs font-bold">
              <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
              {opportunity.toVerifyCount} UNKNOWN
            </span>
          )}
        </div>
      </div>

      {/* Requirements Accordion / Categorized Checklist */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-slate-900">Tender requirements</h2>
          <span className="text-xs text-slate-500 font-medium">
            {opportunity.requirements.length} requirements evaluated
          </span>
        </div>

        {categories.map((cat) => {
          const reqs = getRequirementsByCategory(cat);
          if (reqs.length === 0) return null;

          return (
            <div
              key={cat}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col"
            >
              {/* Category Header */}
              <div className="px-5 py-3 bg-slate-50 border-b border-slate-200 text-xs font-extrabold text-slate-700 tracking-wider uppercase flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-400" />
                <span>{cat}</span>
              </div>

              {/* Requirement Items List */}
              <div className="divide-y divide-slate-100">
                {reqs.map((req) => (
                  <div
                    key={req.id}
                    className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
                  >
                    <div className="flex items-start gap-3.5 flex-1">
                      {/* Status Icon */}
                      <div className="mt-0.5 shrink-0">
                        {req.status === 'MATCH' && (
                          <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                        )}
                        {req.status === 'POTENTIAL GAP' && (
                          <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                            <AlertTriangle className="w-4 h-4" />
                          </div>
                        )}
                        {req.status === 'UNKNOWN' && (
                          <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center">
                            <HelpCircle className="w-4 h-4" />
                          </div>
                        )}
                      </div>

                      {/* Text details */}
                      <div className="flex flex-col gap-1">
                        <h4 className="text-sm font-bold text-slate-900">
                          {req.title}
                        </h4>
                        <p className="text-xs text-slate-600 font-medium">
                          {req.userProfileText}
                        </p>
                      </div>
                    </div>

                    {/* Status Badge & Action Link */}
                    <div className="flex items-center gap-4 shrink-0 self-end md:self-auto">
                      {/* Status Tag */}
                      <span
                        className={`text-xs font-extrabold px-3 py-1 rounded-full ${
                          req.status === 'MATCH'
                            ? 'bg-emerald-100 text-emerald-800'
                            : req.status === 'POTENTIAL GAP'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {req.status === 'MATCH' && '✓ MATCH'}
                        {req.status === 'POTENTIAL GAP' && '⚠ POTENTIAL GAP'}
                        {req.status === 'UNKNOWN' && '? UNKNOWN'}
                      </span>

                      {/* View Evidence CTA */}
                      <button
                        onClick={() => onSelectEvidence(req)}
                        className="text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline flex items-center gap-1 transition-colors"
                      >
                        <span>View evidence</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Helper Footer text */}
      <div className="text-center text-xs text-slate-500 py-2">
        Select any requirement above to review the evidence behind the assessment.
      </div>
    </motion.div>
  );
};
