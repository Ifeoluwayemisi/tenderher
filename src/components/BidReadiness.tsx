import React, { useState } from 'react';
import { motion } from 'motion/react';
import type { Opportunity, BusinessProfileData } from '../types';
import {
  ShieldCheck,
  FileCheck,
  ArrowRight,
  Sparkles,
  Download,
} from 'lucide-react';

interface BidReadinessProps {
  profile: BusinessProfileData;
  selectedOpportunity?: Opportunity | null;
  onNavigateOpportunities: () => void;
  onToast: (title: string, desc: string) => void;
}

export const BidReadiness: React.FC<BidReadinessProps> = ({
  profile,
  selectedOpportunity,
  onNavigateOpportunities,
  onToast,
}) => {
  const [documents, setDocuments] = useState([
    { id: 'cac', title: 'CAC Certificate of Incorporation', status: 'Verified', date: 'CAC/RC-1492019' },
    { id: 'tcc', title: 'Tax Clearance Certificate (2023 - 2025)', status: 'Verified', date: 'TIN-92841029' },
    { id: 'pencom', title: 'PENCOM Compliance Certificate', status: 'Pending Upload', date: 'Expires Dec 2026' },
    { id: 'itf', title: 'ITF Compliance Certificate', status: 'Verified', date: 'Ref #ITF-8820' },
    { id: 'iso', title: 'ISO 27001 Information Security Certificate', status: 'Missing', date: 'Required' },
  ]);

  const toggleDocUpload = (id: string) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === id
          ? {
              ...doc,
              status: doc.status === 'Verified' ? 'Pending Upload' : 'Verified',
              date: 'Updated Just Now',
            }
          : doc
      )
    );
    onToast('Document Status Updated', 'Your compliance record has been synchronized with the TenderHer database.');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="p-8 max-w-5xl mx-auto w-full flex flex-col gap-8"
    >
      {/* Top Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
            Final Step
          </span>
          <span className="text-xs text-slate-500">• BPP Nigeria Compliance Scoring Engine</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Bid Readiness Scoring
        </h1>
        <p className="text-sm text-slate-600">
          Comprehensive compliance analysis for {profile.companyName} on active procurement tenders.
        </p>
      </div>

      {/* Main Grid Score Banner & Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Score Card Left (40%) */}
        <div className="md:col-span-5 bg-gradient-to-br from-emerald-900 to-emerald-950 text-white rounded-2xl p-6 shadow-md flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                Overall Tender Eligibility
              </span>
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>

            <div className="flex items-baseline gap-2 my-2">
              <span className="text-5xl font-black text-white tracking-tight">78%</span>
              <span className="text-xs text-emerald-300 font-semibold">High Pursuit Score</span>
            </div>

            <div className="w-full h-2.5 bg-emerald-950/60 rounded-full overflow-hidden border border-emerald-800">
              <div className="w-[78%] h-full bg-emerald-400 rounded-full" />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-emerald-800/40 border border-emerald-700/50 flex flex-col gap-2 text-xs text-emerald-100">
            <p className="font-semibold text-white">Target Opportunity:</p>
            <p className="line-clamp-2">
              {selectedOpportunity?.title || 'Provision of ICT Services (FMCIDE)'}
            </p>
            <p className="text-[11px] text-emerald-300">
              Agency: {selectedOpportunity?.ministry || 'Federal Ministry of Communications'}
            </p>
          </div>

          <button
            onClick={() => onToast('Exporting Bid Readiness Report', 'Your PDF readiness dossier is generating...')}
            className="w-full h-11 bg-white hover:bg-emerald-50 text-emerald-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span>Download Bid Dossier (PDF)</span>
          </button>
        </div>

        {/* Section Breakdown Right (60%) */}
        <div className="md:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col gap-4">
          <h3 className="text-base font-bold text-slate-900">Category Readiness Breakdown</h3>

          <div className="flex flex-col gap-4">
            {/* Financial */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-700">Financial Capacity (₦20m vs ₦10m min)</span>
                <span className="text-emerald-700 font-bold">100% Passed</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full">
                <div className="w-full h-full bg-emerald-600 rounded-full" />
              </div>
            </div>

            {/* Technical */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-700">Technical & Operational (4 yrs vs 5 yrs required)</span>
                <span className="text-amber-600 font-bold">75% Deficit Gap</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full">
                <div className="w-[75%] h-full bg-amber-500 rounded-full" />
              </div>
            </div>

            {/* Statutory */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-700">Statutory & Legal Verification</span>
                <span className="text-slate-600 font-bold">60% Complete</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full">
                <div className="w-[60%] h-full bg-sky-500 rounded-full" />
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 mt-2 text-xs text-slate-600 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              Recommendation: Resolving the 1-year experience gap through a JV agreement raises your score to <strong>94%</strong>.
            </span>
          </div>
        </div>
      </div>

      {/* Statutory Documentation Repository */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">Required Statutory Documents</h3>
          <span className="text-xs text-slate-500 font-medium">Click items to update status</span>
        </div>

        <div className="divide-y divide-slate-100">
          {documents.map((doc) => (
            <div
              key={doc.id}
              onClick={() => toggleDocUpload(doc.id)}
              className="py-3.5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 px-2 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-3">
                <FileCheck
                  className={`w-4 h-4 ${
                    doc.status === 'Verified'
                      ? 'text-emerald-600'
                      : doc.status === 'Pending Upload'
                      ? 'text-amber-500'
                      : 'text-slate-400'
                  }`}
                />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900">{doc.title}</span>
                  <span className="text-[11px] text-slate-500">{doc.date}</span>
                </div>
              </div>

              <span
                className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                  doc.status === 'Verified'
                    ? 'bg-emerald-100 text-emerald-800'
                    : doc.status === 'Pending Upload'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {doc.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Footer Button */}
      <div className="flex items-center justify-between bg-emerald-50 p-6 rounded-2xl border border-emerald-200">
        <div className="flex flex-col gap-1">
          <h4 className="text-sm font-bold text-emerald-950">Ready to explore more opportunities?</h4>
          <p className="text-xs text-emerald-800">
            Compare additional Nigerian state and federal tenders against your profile.
          </p>
        </div>

        <button
          onClick={onNavigateOpportunities}
          className="px-5 h-11 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-xs transition-all shrink-0"
        >
          <span>Return to Directory</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};
