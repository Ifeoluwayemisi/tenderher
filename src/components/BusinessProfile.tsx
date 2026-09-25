import React, { useState } from 'react';
import { motion } from 'motion/react';
import type { BusinessProfileData } from '../types';
import { profileBannerImage } from '../data/mockData';
import { ArrowRight, Lock, Save, Building, MapPin, Briefcase, Calendar, DollarSign, Award } from 'lucide-react';

interface BusinessProfileProps {
  profile: BusinessProfileData;
  onUpdateProfile: (updated: Partial<BusinessProfileData>) => void;
  onAnalyze: () => void;
  onSaveToast: () => void;
}

export const BusinessProfile: React.FC<BusinessProfileProps> = ({
  profile,
  onUpdateProfile,
  onAnalyze,
  onSaveToast,
}) => {
  const [formData, setFormData] = useState<BusinessProfileData>(profile);

  const handleChange = (field: keyof BusinessProfileData, value: string | number) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    onUpdateProfile(updated);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(formData);
    onSaveToast();
  };

  const handleAnalyzeClick = () => {
    onUpdateProfile(formData);
    onAnalyze();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="p-8 max-w-6xl mx-auto w-full flex flex-col gap-8"
    >
      {/* Title & Subtitle */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Tell us about your business
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl">
          We'll use your business profile to identify and assess relevant procurement opportunities.
        </p>
      </div>

      {/* Main Grid: Form Left (60%), Side Card Right (40%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column Form */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col gap-6">
          <form onSubmit={handleSave} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Industry */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  Industry
                </label>
                <select
                  value={formData.industry}
                  onChange={(e) => handleChange('industry', e.target.value)}
                  className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all"
                >
                  <option value="Technology">Technology</option>
                  <option value="Consulting">Consulting</option>
                  <option value="Construction & Engineering">Construction & Engineering</option>
                  <option value="Healthcare & Medical">Healthcare & Medical</option>
                  <option value="Finance & Accounting">Finance & Accounting</option>
                </select>
              </div>

              {/* Location */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  Location
                </label>
                <select
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all"
                >
                  <option value="Lagos">Lagos</option>
                  <option value="Abuja (FCT)">Abuja (FCT)</option>
                  <option value="Rivers">Rivers</option>
                  <option value="Kano">Kano</option>
                  <option value="Oyo">Oyo</option>
                  <option value="Enugu">Enugu</option>
                </select>
              </div>

              {/* Services */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                  Services
                </label>
                <input
                  type="text"
                  value={formData.services}
                  onChange={(e) => handleChange('services', e.target.value)}
                  placeholder="e.g. Software Development"
                  className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all"
                />
              </div>

              {/* Years of Experience */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  Years of experience
                </label>
                <input
                  type="text"
                  value={
                    typeof formData.yearsOfExperience === 'number'
                      ? `${formData.yearsOfExperience} years`
                      : formData.yearsOfExperience
                  }
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, '');
                    handleChange('yearsOfExperience', raw ? parseInt(raw) : e.target.value);
                  }}
                  placeholder="e.g. 4 years"
                  className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all"
                />
              </div>

              {/* Annual Turnover */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                  Annual turnover
                </label>
                <input
                  type="text"
                  value={formData.annualTurnover}
                  onChange={(e) => handleChange('annualTurnover', e.target.value)}
                  placeholder="e.g. ₦20m"
                  className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all"
                />
              </div>

              {/* Certifications */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-slate-400" />
                  Certifications
                </label>
                <select
                  value={formData.certifications}
                  onChange={(e) => handleChange('certifications', e.target.value)}
                  className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all"
                >
                  <option value="None">None</option>
                  <option value="ISO 27001">ISO 27001 (Information Security)</option>
                  <option value="ISO 9001">ISO 9001 (Quality Management)</option>
                  <option value="NITDA Certified">NITDA Certified Provider</option>
                  <option value="CADD / COREN">COREN / CADD Registered</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={handleAnalyzeClick}
                className="flex-1 h-12 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-xl text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-[0.99]"
              >
                <span>Analyze opportunities</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="submit"
                className="px-5 h-12 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm flex items-center gap-2 transition-all"
              >
                <Save className="w-4 h-4 text-slate-500" />
                <span>Save profile</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Column Promotion Card */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
            {/* Feature Photo */}
            <div className="relative h-64 overflow-hidden bg-slate-100">
              <img
                src={profileBannerImage}
                alt="African business professional at work"
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-600/90 text-white px-2 py-0.5 rounded backdrop-blur-xs">
                  SME Procurement Intelligence
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col gap-3">
              <h3 className="text-base font-bold text-slate-900 leading-snug">
                Built to help growing businesses find opportunities they can confidently pursue.
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your profile helps TenderHer compare tender requirements with your business information in real-time.
              </p>
            </div>
          </div>

          {/* Security Micro-copy Banner */}
          <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200/80 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800 shrink-0">
              <Lock className="w-4 h-4" />
            </div>
            <p className="text-xs text-emerald-900 leading-relaxed">
              Profile details are kept confidential and used solely to filter qualified tenders according to verified SME eligibility standards.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
