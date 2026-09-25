import React from 'react';
import { motion } from 'motion/react';
import type { Opportunity, BusinessProfileData } from '../types';
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  FileText,
  AlertTriangle,
  ExternalLink,
  MapPin,
  Calendar,
  Info,
} from 'lucide-react';

interface EvidenceViewProps {
  opportunity: Opportunity;
  profile: BusinessProfileData;
  onBackToIntelligence: () => void;
  onProceedBidReadiness: () => void;
  onOpenGazetteModal: () => void;
}

export const EvidenceView: React.FC<EvidenceViewProps> = ({
  opportunity,
  profile,
  onBackToIntelligence,
  onProceedBidReadiness,
  onOpenGazetteModal,
}) => {
  const yearsExp =
    typeof profile.yearsOfExperience === 'number'
      ? profile.yearsOfExperience
      : parseInt(String(profile.yearsOfExperience)) || 4;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="p-8 max-w-5xl mx-auto w-full flex flex-col gap-8"
    >
      {/* Top Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={onBackToIntelligence}
          className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors self-start"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Tender Intelligence</span>
        </button>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200 text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Direct Registry Match Verified
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-50 text-sky-800 rounded-full border border-sky-200 text-xs font-bold">
            Evidence Audit Trail Active
          </span>
        </div>
      </div>

      {/* Header Card: Why are we saying this? */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-md self-start">
              STEP 4 • CROSS-VERIFICATION ENGINE
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Why are we saying this?
            </h1>
            <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
              Transparent cross-referencing between official procurement publication terms and your validated enterprise records.
            </p>
          </div>

          {/* Badges */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex flex-col text-right">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">
                Match Confidence
              </span>
              <span className="text-xs font-extrabold text-emerald-700">
                High (100% Parsed)
              </span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex flex-col text-right">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">
                Source Type
              </span>
              <span className="text-xs font-extrabold text-slate-900">
                Official Gazette
              </span>
            </div>
          </div>
        </div>

        {/* Selected Tender Summary Pill */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900">
                  {opportunity.title}
                </span>
                <span className="text-[10px] font-mono bg-slate-200 px-2 py-0.5 rounded text-slate-700">
                  Ref: {opportunity.refCode}
                </span>
              </div>
              <span className="text-xs text-slate-600 font-medium">
                {opportunity.ministry} • {opportunity.source}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-slate-600 shrink-0">
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{opportunity.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Deadline: {opportunity.deadline}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Banner: Gap Alert */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md">
              TECHNICAL & OPERATIONAL
            </span>
            <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200">
              • Mandatory Qualification (Disqualification Risk)
            </span>
          </div>

          <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-900 font-extrabold text-xs rounded-full border border-amber-300">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            POTENTIAL GAP ({yearsExp < 5 ? `-${5 - yearsExp} YEAR` : 'MATCH'})
          </span>
        </div>

        <h2 className="text-lg font-extrabold text-slate-900">
          Minimum 5 years of experience providing similar services
        </h2>

        {/* Highlight Yellow Box */}
        <div className="p-4 rounded-xl bg-amber-50/90 border border-amber-200 flex items-start gap-3 text-xs text-amber-900 leading-relaxed">
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold text-amber-950">Requirement Variance Identified:</strong>{' '}
            Your business profile verifies <strong>{yearsExp} years</strong> of operating track record, while the published requirement stipulates at least <strong>5 years</strong> of continuous commercial operations.
          </div>
        </div>
      </div>

      {/* Side-by-Side Verification Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card A (Left): Business Profile */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <h3 className="text-sm font-bold text-slate-900">Your Business Profile</h3>
                <span className="text-[11px] text-slate-500">Cross-referenced against verified records</span>
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                {profile.companyName}
              </span>
            </div>

            <hr className="border-slate-100" />

            <div className="flex flex-col gap-3">
              {/* Item 1 */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3">
                <div className="flex flex-col">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase">
                    Operating Experience
                  </span>
                  <span className="text-xs font-extrabold text-slate-900">
                    {yearsExp} Years Continuous Trading
                  </span>
                  <span className="text-[10px] text-slate-500">Incorporated April 2022 | CAC/RC-1492019</span>
                </div>
                <span className="text-[11px] font-extrabold bg-amber-100 text-amber-900 px-2.5 py-1 rounded-full border border-amber-300 shrink-0">
                  {yearsExp < 5 ? `-${5 - yearsExp} Year Gap` : '✓ Match'}
                </span>
              </div>

              {/* Item 2 */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3">
                <div className="flex flex-col">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase">
                    Verified Core Services
                  </span>
                  <span className="text-xs font-extrabold text-slate-900">
                    {profile.services || 'Custom Software Engineering & Cloud ICT'}
                  </span>
                  <span className="text-[10px] text-slate-500">Direct match in category: Information Technology</span>
                </div>
                <span className="text-[11px] font-extrabold bg-emerald-100 text-emerald-900 px-2.5 py-1 rounded-full border border-emerald-300 shrink-0">
                  ✓ Match
                </span>
              </div>

              {/* Item 3 */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3">
                <div className="flex flex-col">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase">
                    Attested Past Deliveries
                  </span>
                  <span className="text-xs font-extrabold text-slate-900">
                    3 Corporate Enterprise Projects
                  </span>
                  <span className="text-[10px] text-slate-500">Client completion & acceptance certificates on file</span>
                </div>
                <span className="text-[11px] font-extrabold bg-emerald-100 text-emerald-900 px-2.5 py-1 rounded-full border border-emerald-300 shrink-0">
                  ✓ Match
                </span>
              </div>
            </div>
          </div>

          <span className="text-[11px] text-slate-400 text-center">
            Only information verified in your {profile.companyName} profile is cross-referenced.
          </span>
        </div>

        {/* Card B (Right): Source Document */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <h3 className="text-sm font-bold text-slate-900">Source Document</h3>
                <span className="text-[11px] text-slate-500">Authenticated procuring authority record</span>
              </div>
              <span className="text-xs font-bold text-sky-800 bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-200">
                Official Gazette
              </span>
            </div>

            <hr className="border-slate-100" />

            <div className="flex flex-col gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col gap-1">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase">
                  Procuring Agency
                </span>
                <span className="font-extrabold text-slate-900">
                  {opportunity.ministry}
                </span>
                <span className="text-[11px] text-slate-500">Federal Secretariat Complex, Shehu Shagari Way, Abuja</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col gap-1">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase">
                  Source Registry
                </span>
                <span className="font-extrabold text-slate-900">
                  NOCOPO / Federal BPP National e-Procurement Portal
                </span>
                <span className="text-[11px] text-slate-500">Official Federal Tenders Journal publication batch 2026-Q3</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col gap-1">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase">
                  Gazette Reference & Date
                </span>
                <span className="font-extrabold text-slate-900">
                  FMCIDE/2026/G/042 | BPP-NG-2026-9931
                </span>
                <span className="text-[11px] text-slate-500">Published 12 August 2026 • Language: English</span>
              </div>
            </div>
          </div>

          <button
            onClick={onOpenGazetteModal}
            className="w-full h-11 bg-slate-50 hover:bg-slate-100 text-emerald-800 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 border border-slate-200 transition-colors"
          >
            <span>Open official tender gazette source</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Clause Extract Box */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md flex flex-col gap-4 relative overflow-hidden">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono font-semibold text-emerald-300">
              TENDER DOSSIER EXTRACT: FMCIDE/2026/G/042 • Section 5.2 (Technical & Operational) • Page 17
            </span>
          </div>

          <span className="text-[10px] font-extrabold uppercase bg-emerald-800 text-emerald-100 px-2.5 py-0.5 rounded">
            ✓ OCR Authenticated
          </span>
        </div>

        <blockquote className="text-sm font-serif italic text-slate-200 bg-slate-800/80 p-5 rounded-xl border border-slate-700 leading-relaxed">
          "...bidders must demonstrate a <mark className="bg-amber-400/90 text-slate-950 px-1 rounded font-sans not-italic font-bold">minimum of five (5) years of continuous commercial operating experience</mark> in providing enterprise ICT and custom software development services to public or corporate institutions, evidenced by incorporation filings and verifiable client completion certificates."
        </blockquote>

        <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 pt-1">
          <span>Tender Dossier — Section 5.2, Clause 1, Page 17</span>
          <span>Extracted via Federal NOCOPO Automated Ingestion</span>
          <span className="text-emerald-400 font-semibold">Confidence: 100%</span>
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h4 className="text-sm font-extrabold text-emerald-950">
            Ready to see what needs attention?
          </h4>
          <p className="text-xs text-emerald-800">
            Proceed to complete Bid Readiness scoring and generate resolution pathways for this potential experience gap.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onBackToIntelligence}
            className="px-4 h-11 bg-white hover:bg-slate-100 text-slate-700 font-bold rounded-xl text-xs border border-slate-200 transition-colors"
          >
            ← Back to Tender Intelligence
          </button>

          <button
            onClick={onProceedBidReadiness}
            className="px-5 h-11 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-xs transition-all"
          >
            <span>Review bid readiness</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
