import React, { useState } from 'react';
import { motion } from 'motion/react';
import type { BusinessProfileData } from '../types';
import {
  Building2,
  Users,
  Save,
  RefreshCw,
  Lock,
} from 'lucide-react';

interface SettingsViewProps {
  profile: BusinessProfileData;
  onUpdateProfile: (updated: Partial<BusinessProfileData>) => void;
  onToast: (title: string, desc: string) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  profile,
  onUpdateProfile,
  onToast,
}) => {
  const [activeTab, setActiveTab] = useState<'general' | 'portals' | 'team' | 'security'>('general');
  const [formData, setFormData] = useState({
    companyName: profile.companyName,
    userName: profile.userName,
    email: profile.email,
    cacNumber: profile.cacNumber || 'RC-1492019',
    tinNumber: profile.tinNumber || 'TIN-92841029',
    phoneNumber: profile.phoneNumber || '+234 803 123 4567',
  });

  const [portals, setPortals] = useState([
    { name: 'NOCOPO / BPP Federal Portal', status: 'Connected', lastSync: 'Today, 08:30 AM WAT', ref: 'BPP-NG-9910' },
    { name: 'Lagos State Public Procurement Agency (PPA)', status: 'Connected', lastSync: 'Yesterday, 14:15 PM WAT', ref: 'LSSPPA-LGS-882' },
    { name: 'NITDA IT Service Providers Database', status: 'Connected', lastSync: '2 days ago', ref: 'NITDA-PROV-2026' },
    { name: 'Rivers State Bureau of Public Procurement', status: 'Disconnected', lastSync: 'Never', ref: 'Unlinked' },
  ]);

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(formData);
    onToast('Workspace Settings Saved', 'Your enterprise parameters and contact details have been updated.');
  };

  const togglePortal = (name: string) => {
    setPortals((prev) =>
      prev.map((p) =>
        p.name === name
          ? {
              ...p,
              status: p.status === 'Connected' ? 'Disconnected' : 'Connected',
              lastSync: 'Just Now',
            }
          : p
      )
    );
    onToast('Portal Integration Updated', `Sync connection status modified for ${name}.`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="p-8 max-w-5xl mx-auto w-full flex flex-col gap-8"
    >
      {/* Page Header */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
            WORKSPACE SETTINGS
          </span>
          <span className="text-xs text-slate-500">• Nigerian Enterprise Procurement Account</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Settings & Account Management
        </h1>
        <p className="text-xs text-slate-600">
          Manage corporate credentials, government portal sync APIs, and workspace preferences for {profile.companyName}.
        </p>
      </div>

      {/* Tabs Row */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('general')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'general'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>General & Company</span>
        </button>

        <button
          onClick={() => setActiveTab('portals')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'portals'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <RefreshCw className="w-4 h-4" />
          <span>Portal Integrations</span>
        </button>

        <button
          onClick={() => setActiveTab('team')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'team'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Team Members</span>
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'security'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>Security & API</span>
        </button>
      </div>

      {/* Tab 1: General & Company */}
      {activeTab === 'general' && (
        <form onSubmit={handleSaveGeneral} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col gap-6">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            Company & Contact Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700">Company Legal Name</label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:border-emerald-500 outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700">Account Owner Name</label>
              <input
                type="text"
                value={formData.userName}
                onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                className="h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:border-emerald-500 outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700">Official Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:border-emerald-500 outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700">Phone Number</label>
              <input
                type="text"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                className="h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:border-emerald-500 outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700">CAC Incorporation Number</label>
              <input
                type="text"
                value={formData.cacNumber}
                onChange={(e) => setFormData({ ...formData, cacNumber: e.target.value })}
                className="h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:border-emerald-500 outline-none font-mono"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700">Tax Identification Number (TIN)</label>
              <input
                type="text"
                value={formData.tinNumber}
                onChange={(e) => setFormData({ ...formData, tinNumber: e.target.value })}
                className="h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:border-emerald-500 outline-none font-mono"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              type="submit"
              className="px-6 h-11 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-xs transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save Workspace Details</span>
            </button>
          </div>
        </form>
      )}

      {/* Tab 2: Portal Integrations */}
      {activeTab === 'portals' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h2 className="text-base font-bold text-slate-900">
                Connected e-Procurement Portals
              </h2>
              <span className="text-xs text-slate-500">
                Manage automated sync streams from Nigerian state and federal procurement databases.
              </span>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {portals.map((p) => (
              <div key={p.name} className="py-4 flex items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      p.status === 'Connected'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    <RefreshCw className="w-4 h-4" />
                  </div>

                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-900">{p.name}</span>
                    <span className="text-[11px] text-slate-500">
                      Last sync: {p.lastSync} • Ref ID: {p.ref}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-[11px] font-bold px-3 py-1 rounded-full ${
                      p.status === 'Connected'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {p.status}
                  </span>

                  <button
                    onClick={() => togglePortal(p.name)}
                    className="text-xs font-bold text-emerald-700 hover:underline"
                  >
                    {p.status === 'Connected' ? 'Disconnect' : 'Connect Portal'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Team Members */}
      {activeTab === 'team' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h2 className="text-base font-bold text-slate-900">Workspace Team Members</h2>
              <span className="text-xs text-slate-500">
                Team members with access to tender intelligence and bid readiness reports.
              </span>
            </div>

            <button
              onClick={() => onToast('Invite Team Member', 'Invitation link generated and copied to clipboard.')}
              className="px-4 h-10 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs"
            >
              + Add Member
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            <div className="py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-700 text-white font-bold text-xs flex items-center justify-center">
                  AB
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900">Amina Bello (You)</span>
                  <span className="text-[11px] text-slate-500">amina.bello@techsolutions.ng</span>
                </div>
              </div>
              <span className="text-xs font-extrabold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                Workspace Admin
              </span>
            </div>

            <div className="py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-sky-700 text-white font-bold text-xs flex items-center justify-center">
                  CO
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900">Chidi Okoro</span>
                  <span className="text-[11px] text-slate-500">chidi.okoro@techsolutions.ng</span>
                </div>
              </div>
              <span className="text-xs font-extrabold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
                Technical Lead
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Security */}
      {activeTab === 'security' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col gap-6">
          <h2 className="text-base font-bold text-slate-900">Security & API Keys</h2>
          <p className="text-xs text-slate-600">
            All profile details are encrypted using AES-256 and used solely for BPP SME eligibility verification.
          </p>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-slate-900">TenderHer Live Production API Key</span>
              <span className="text-[11px] font-mono text-slate-500">th_live_99214a********************840a</span>
            </div>
            <button
              onClick={() => onToast('API Key Copied', 'Production key copied to clipboard.')}
              className="text-xs font-bold text-emerald-700 hover:underline"
            >
              Copy Key
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};
