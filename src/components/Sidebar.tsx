import React from 'react';
import type { ViewMode, BusinessProfileData } from '../types';
import {
  Building2,
  Briefcase,
  ShieldCheck,
  CheckCircle,
  Settings,
  ChevronRight,
} from 'lucide-react';

interface SidebarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  opportunitiesCount: number;
  profile: BusinessProfileData;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  opportunitiesCount,
  profile,
}) => {
  // Determine active workflow step index (1-5)
  let workflowStep = 1;
  if (currentView === 'opportunities') workflowStep = 2;
  if (currentView === 'intelligence') workflowStep = 3;
  if (currentView === 'evidence') workflowStep = 4;
  if (currentView === 'readiness') workflowStep = 5;

  const navItems = [
    {
      id: 'profile' as ViewMode,
      num: '1.',
      label: 'Business Profile',
      icon: Building2,
      badge: null,
    },
    {
      id: 'opportunities' as ViewMode,
      num: '2.',
      label: 'Opportunities',
      icon: Briefcase,
      badge: opportunitiesCount.toString(),
    },
    {
      id: 'readiness' as ViewMode,
      num: '3.',
      label: 'Bid Readiness',
      icon: ShieldCheck,
      badge: null,
    },
  ];

  const workflowSteps = [
    { num: 1, label: '1. Business Profile', view: 'profile' as ViewMode },
    { num: 2, label: '2. Opportunities', view: 'opportunities' as ViewMode },
    { num: 3, label: '3. Tender Intelligence', view: 'intelligence' as ViewMode },
    { num: 4, label: '4. Evidence', view: 'evidence' as ViewMode },
    { num: 5, label: '5. Bid Readiness', view: 'readiness' as ViewMode },
  ];

  return (
    <aside className="fixed left-0 top-0 bottom-0 h-screen w-64 z-30 bg-white border-r border-slate-200 flex flex-col justify-between overflow-y-auto text-slate-700">
      <div className="p-5 flex flex-col gap-6">
        {/* Brand Logo Header */}
        <div
          onClick={() => onNavigate('profile')}
          className="flex flex-col gap-1 cursor-pointer group"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-lg shadow-xs group-hover:bg-emerald-700 transition-colors">
              T
            </div>
            <span className="font-extrabold text-xl tracking-tight text-emerald-800">
              TenderHer
            </span>
          </div>
          <span className="text-[10px] font-bold tracking-widest text-emerald-600 uppercase ml-1">
            PROCUREMENT INTELLIGENCE
          </span>
        </div>

        <hr className="border-slate-100" />

        {/* NAVIGATION Section */}
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2">
            NAVIGATION
          </span>
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive =
                currentView === item.id ||
                (item.id === 'opportunities' &&
                  (currentView === 'intelligence' || currentView === 'evidence'));
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200/60 shadow-xs'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon
                      className={`w-4 h-4 ${
                        isActive ? 'text-emerald-600' : 'text-slate-400'
                      }`}
                    />
                    <span>
                      <span className="opacity-70 mr-1">{item.num}</span>
                      {item.label}
                    </span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-emerald-600 text-white'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* WORKFLOW TRACK Section */}
        <div className="flex flex-col gap-2 pt-1">
          <div className="flex items-center justify-between px-2">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              WORKFLOW TRACK
            </span>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-md font-bold">
              Step {workflowStep} of 5
            </span>
          </div>

          <div className="relative pl-3 flex flex-col gap-3 py-1">
            {/* Vertical connector line */}
            <div className="absolute left-[19px] top-3 bottom-3 w-0.5 bg-slate-200" />

            {workflowSteps.map((step) => {
              const isCurrent = workflowStep === step.num;
              const isPassed = workflowStep > step.num;

              return (
                <div
                  key={step.num}
                  onClick={() => onNavigate(step.view)}
                  className={`relative flex items-center gap-3 cursor-pointer group text-xs font-medium transition-colors ${
                    isCurrent
                      ? 'text-emerald-700 font-bold'
                      : isPassed
                      ? 'text-slate-700'
                      : 'text-slate-400'
                  }`}
                >
                  {/* Step Circle Indicator */}
                  <div
                    className={`w-3.5 h-3.5 rounded-full z-10 flex items-center justify-center transition-all ${
                      isCurrent
                        ? 'bg-emerald-600 ring-4 ring-emerald-100 text-white'
                        : isPassed
                        ? 'bg-emerald-500 text-white'
                        : 'bg-white border-2 border-slate-300'
                    }`}
                  >
                    {isPassed && <CheckCircle className="w-3 h-3 text-white" />}
                  </div>

                  <span className="group-hover:text-emerald-700 transition-colors">
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* User Profile Card at Bottom Left */}
      <div className="p-4 border-t border-slate-200 bg-slate-50/70">
        <div
          onClick={() => onNavigate('settings')}
          className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity"
        >
          <div className="w-9 h-9 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
            {profile.userName
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-xs font-bold text-slate-900 truncate">
              {profile.userName}
            </span>
            <span className="text-[11px] text-slate-500 truncate">
              {profile.companyName}
            </span>
          </div>
        </div>

        <button
          onClick={() => onNavigate('settings')}
          className={`mt-3 w-full flex items-center justify-between text-xs font-semibold py-1.5 px-2.5 rounded-xl transition-colors ${
            currentView === 'settings'
              ? 'bg-emerald-100 text-emerald-800 font-bold'
              : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-100'
          }`}
        >
          <div className="flex items-center gap-1.5">
            <Settings className="w-3.5 h-3.5 text-slate-400" />
            <span>Workspace Settings</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        </button>
      </div>
    </aside>
  );
};
