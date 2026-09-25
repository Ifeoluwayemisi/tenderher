import React, { useState } from 'react';
import { motion } from 'motion/react';
import type { Opportunity, BusinessProfileData } from '../types';
import {
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Upload,
  Edit,
} from 'lucide-react';

interface BidReadinessViewProps {
  profile: BusinessProfileData;
  opportunity: Opportunity;
  onNavigate: (view: any) => void;
  onViewEvidence: () => void;
  onOpenUploadModal: (docName: string) => void;
}

export const BidReadinessView: React.FC<BidReadinessViewProps> = ({
  profile,
  opportunity,
  onNavigate,
  onViewEvidence,
  onOpenUploadModal,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'ready' | 'attention' | 'verify'>('all');

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
      className="p-8 max-w-6xl mx-auto w-full flex flex-col gap-8"
    >
      {/* Top Header Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
              STEP 5 • FINAL AUDIT
            </span>
            <span className="text-xs text-slate-500">• BPP Nigeria Compliance Matrix</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Bid Readiness
          </h1>
          <p className="text-xs text-slate-600 max-w-xl">
            Review what's ready, what needs attention, and what you should verify before preparing your bid.
          </p>
        </div>

        {/* Opportunity Summary Pill (Top Right) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex items-center gap-4 max-w-md w-full shrink-0">
          <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
            <img
              src={opportunity.image}
              alt={opportunity.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-xs font-extrabold text-slate-900 truncate">
              {opportunity.title}
            </span>
            <span className="text-[11px] text-slate-500 truncate">
              {opportunity.ministry}
            </span>
            <div className="flex items-center gap-3 text-[10px] text-slate-400 font-semibold mt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {opportunity.location}
              </span>
              <span className="flex items-center gap-1 text-amber-600">
                <Calendar className="w-3 h-3" /> Deadline: {opportunity.deadline}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Grid (3 Top Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: READY */}
        <div className="bg-white rounded-2xl border border-emerald-200 p-5 shadow-xs flex flex-col justify-between gap-4 border-l-4 border-l-emerald-600">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              READY
            </span>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
              VERIFIED
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-slate-900">3</span>
            <span className="text-xs font-semibold text-slate-600">Requirements currently supported by verified records</span>
          </div>
        </div>

        {/* Card 2: NEEDS ATTENTION */}
        <div className="bg-white rounded-2xl border border-amber-200 p-5 shadow-xs flex flex-col justify-between gap-4 border-l-4 border-l-amber-500">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              NEEDS ATTENTION
            </span>
            <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded">
              ACTION REQUIRED
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-slate-900">1</span>
            <span className="text-xs font-semibold text-slate-600">Potential requirement gap identified</span>
          </div>
        </div>

        {/* Card 3: TO VERIFY */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between gap-4 border-l-4 border-l-slate-400">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-slate-500" />
              TO VERIFY
            </span>
            <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
              1 MISSING DOC
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-slate-900">2</span>
            <span className="text-xs font-semibold text-slate-600">Information still required from business</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Checklist Left (65%), Right Sidebar Column (35%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column Checklist */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-col">
                <h2 className="text-lg font-extrabold text-slate-900">
                  Bid readiness checklist
                </h2>
                <span className="text-xs text-slate-500">
                  Requirements identified from the tender and compared with your business profile.
                </span>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'all'
                      ? 'bg-white text-emerald-800 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All (6)
                </button>
                <button
                  onClick={() => setActiveTab('ready')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'ready'
                      ? 'bg-white text-emerald-800 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Ready (3)
                </button>
                <button
                  onClick={() => setActiveTab('attention')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'attention'
                      ? 'bg-white text-amber-800 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Attention (1)
                </button>
                <button
                  onClick={() => setActiveTab('verify')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'verify'
                      ? 'bg-white text-slate-800 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Verify (2)
                </button>
              </div>
            </div>

            {/* Group 1: Ready */}
            {(activeTab === 'all' || activeTab === 'ready') && (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-xs font-extrabold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Ready (3 requirements)</span>
                </div>

                <div className="flex flex-col gap-2.5">
                  <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200 flex items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-900">
                          Business experience
                        </span>
                        <span className="text-xs text-slate-600">
                          Your profile includes {yearsExp} years of business experience.
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] font-extrabold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full shrink-0">
                      ✓ READY
                    </span>
                  </div>

                  <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200 flex items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-900">
                          Software development services
                        </span>
                        <span className="text-xs text-slate-600">
                          {profile.services || 'Software Development'} is listed among your verified core services.
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] font-extrabold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full shrink-0">
                      ✓ READY
                    </span>
                  </div>

                  <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200 flex items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-900">
                          Annual turnover
                        </span>
                        <span className="text-xs text-slate-600">
                          Your profile shows {profile.annualTurnover} annual turnover. (Tender requirement: ₦10m minimum)
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] font-extrabold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full shrink-0">
                      ✓ READY
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Group 2: Needs Attention */}
            {(activeTab === 'all' || activeTab === 'attention') && (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-xs font-extrabold text-amber-900 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Needs attention (1 requirement)</span>
                </div>

                <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                      <AlertTriangle className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-900">
                        Years of relevant experience
                      </span>
                      <span className="text-xs text-slate-600">
                        The tender requires at least 5 years of similar experience. Your profile currently shows {yearsExp} years.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-[11px] font-extrabold text-amber-900 bg-amber-100 px-3 py-1 rounded-full">
                      ⚠️ NEEDS ATTENTION
                    </span>
                    <button
                      onClick={onViewEvidence}
                      className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
                    >
                      <span>View evidence</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Group 3: To Verify */}
            {(activeTab === 'all' || activeTab === 'verify') && (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-xs font-extrabold text-slate-800 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
                  <HelpCircle className="w-4 h-4 text-slate-500" />
                  <span>To verify (2 requirements)</span>
                </div>

                <div className="flex flex-col gap-2.5">
                  <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200 flex items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center shrink-0 mt-0.5">
                        <HelpCircle className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-900">
                          Industry certification
                        </span>
                        <span className="text-xs text-slate-600">
                          A valid industry certification (ISO 27001) is required, but no certification was provided in your profile.
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-[11px] font-extrabold text-slate-700 bg-slate-200 px-3 py-1 rounded-full">
                        ❓ TO VERIFY
                      </span>
                      <button
                        onClick={() => onOpenUploadModal('ISO 27001 Certification')}
                        className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
                      >
                        <Upload className="w-3 h-3" />
                        <span>Upload</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200 flex items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center shrink-0 mt-0.5">
                        <HelpCircle className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-900">
                          Company registration documentation
                        </span>
                        <span className="text-xs text-slate-600">
                          Registration/compliance information was not provided in your profile.
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-[11px] font-extrabold text-slate-700 bg-slate-200 px-3 py-1 rounded-full">
                        ❓ TO VERIFY
                      </span>
                      <button
                        onClick={() => onOpenUploadModal('CAC Company Registration')}
                        className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
                      >
                        <Upload className="w-3 h-3" />
                        <span>Upload</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar Column */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Card 1: Action Guide Card */}
          <div className="bg-emerald-50/80 rounded-2xl border border-emerald-200 p-5 shadow-xs flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-emerald-950 uppercase tracking-wider">
                Before you prepare your bid
              </span>
              <span className="text-[10px] font-bold bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded">
                Guide
              </span>
            </div>
            <p className="text-xs text-emerald-800">
              A few items should be reviewed before you begin your submission.
            </p>

            <div className="flex flex-col gap-3 pt-2">
              <div className="flex items-start gap-2.5 text-xs text-emerald-950">
                <span className="w-5 h-5 rounded-full bg-emerald-700 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  01
                </span>
                <div>
                  <strong className="font-bold">Review potential gaps:</strong> Check the experience requirement and confirm whether you can satisfy it through joint-venture or consortium.
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-xs text-emerald-950">
                <span className="w-5 h-5 rounded-full bg-emerald-700 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  02
                </span>
                <div>
                  <strong className="font-bold">Verify missing information:</strong> Confirm certification and corporate registration documents in your profile.
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-xs text-emerald-950">
                <span className="w-5 h-5 rounded-full bg-emerald-700 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  03
                </span>
                <div>
                  <strong className="font-bold">Prepare supporting documents:</strong> Have verified audited accounts and client attestations ready before submission.
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Business Profile Quick Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                Business Profile Used
              </span>
              <button
                onClick={() => onNavigate('profile')}
                className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
              >
                <Edit className="w-3 h-3" />
                <span>Edit</span>
              </button>
            </div>

            <div className="flex flex-col gap-2 text-xs divide-y divide-slate-100">
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500 font-medium">Industry</span>
                <span className="font-bold text-slate-900">{profile.industry}</span>
              </div>

              <div className="flex justify-between py-1.5">
                <span className="text-slate-500 font-medium">Location</span>
                <span className="font-bold text-slate-900">{profile.location}</span>
              </div>

              <div className="flex justify-between py-1.5">
                <span className="text-slate-500 font-medium">Experience</span>
                <span className="font-bold text-slate-900">{yearsExp} years</span>
              </div>

              <div className="flex justify-between py-1.5">
                <span className="text-slate-500 font-medium">Annual turnover</span>
                <span className="font-bold text-slate-900">{profile.annualTurnover}</span>
              </div>

              <div className="flex justify-between py-1.5">
                <span className="text-slate-500 font-medium">Core Services</span>
                <span className="font-bold text-slate-900">{profile.services}</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('profile')}
              className="mt-1 w-full text-xs font-bold text-emerald-700 hover:underline text-left"
            >
              View business profile →
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="flex items-center justify-between border-t border-slate-200 pt-6">
        <button
          onClick={() => onNavigate('intelligence')}
          className="px-4 h-11 bg-white hover:bg-slate-100 text-slate-700 font-bold rounded-xl text-xs border border-slate-200 flex items-center gap-2 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Tender Intelligence</span>
        </button>

        <button
          onClick={() => onNavigate('opportunities')}
          className="px-5 h-11 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-xs transition-all"
        >
          <span>Start another opportunity</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};
