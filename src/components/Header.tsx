import React from 'react';
import type { ViewMode } from '../types';
import { ChevronRight, Bell, Settings } from 'lucide-react';

interface HeaderProps {
  currentView: ViewMode;
  opportunityTitle?: string;
  onNavigate: (view: ViewMode) => void;
  onNotificationToast: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  opportunityTitle,
  onNavigate,
  onNotificationToast,
}) => {
  const getBreadcrumbs = () => {
    switch (currentView) {
      case 'profile':
        return [
          { label: 'TenderHer', view: 'profile' as ViewMode },
          { label: 'Business Profile', view: 'profile' as ViewMode },
        ];
      case 'opportunities':
        return [
          { label: 'TenderHer', view: 'profile' as ViewMode },
          { label: 'Procurement Opportunities', view: 'opportunities' as ViewMode },
        ];
      case 'intelligence':
        return [
          { label: 'TenderHer', view: 'profile' as ViewMode },
          { label: 'Opportunities', view: 'opportunities' as ViewMode },
          { label: opportunityTitle || 'Tender Intelligence', view: 'intelligence' as ViewMode },
        ];
      case 'evidence':
        return [
          { label: 'TenderHer', view: 'profile' as ViewMode },
          { label: 'Opportunities', view: 'opportunities' as ViewMode },
          { label: 'Tender Intelligence', view: 'intelligence' as ViewMode },
          { label: 'Clause Evidence Verification', view: 'evidence' as ViewMode },
        ];
      case 'readiness':
        return [
          { label: 'TenderHer', view: 'profile' as ViewMode },
          { label: 'Bid Readiness', view: 'readiness' as ViewMode },
        ];
      case 'settings':
        return [
          { label: 'TenderHer', view: 'profile' as ViewMode },
          { label: 'Workspace Settings', view: 'settings' as ViewMode },
        ];
    }
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between shrink-0 sticky top-0 z-20 shadow-xs">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
        {breadcrumbs.map((crumb, idx) => {
          const isLast = idx === breadcrumbs.length - 1;
          return (
            <React.Fragment key={idx}>
              {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-300" />}
              <button
                onClick={() => onNavigate(crumb.view)}
                className={`hover:text-emerald-700 transition-colors ${
                  isLast ? 'text-slate-900 font-extrabold max-w-[260px] truncate' : ''
                }`}
              >
                {crumb.label}
              </button>
            </React.Fragment>
          );
        })}
      </nav>

      {/* Right Header Actions & Live Sync Indicator */}
      <div className="flex items-center gap-4">
        {/* Sync Indicator */}
        <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          <span>Direct Registry Match Verified</span>
        </div>

        {/* Notifications Icon Button */}
        <button
          onClick={onNotificationToast}
          className="relative p-2 rounded-xl text-slate-500 hover:text-emerald-700 hover:bg-slate-100 transition-colors"
          title="Procurement Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-600 border border-white" />
        </button>

        {/* Workspace Settings Icon Button */}
        <button
          onClick={() => onNavigate('settings')}
          className="p-2 rounded-xl text-slate-500 hover:text-emerald-700 hover:bg-slate-100 transition-colors"
          title="Workspace Settings"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
