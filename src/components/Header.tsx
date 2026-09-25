import React from 'react';
import type { ViewMode } from '../types';
import { ChevronRight } from 'lucide-react';

interface HeaderProps {
  currentView: ViewMode;
  opportunityTitle?: string;
  onNavigate: (view: ViewMode) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  opportunityTitle,
  onNavigate,
}) => {
  const getBreadcrumbs = () => {
    switch (currentView) {
      case 'profile':
        return [
          { label: 'Platform', view: 'profile' as ViewMode },
          { label: 'Business Profile', view: 'profile' as ViewMode },
        ];
      case 'opportunities':
        return [
          { label: 'Platform', view: 'profile' as ViewMode },
          { label: 'Procurement Opportunities', view: 'opportunities' as ViewMode },
        ];
      case 'intelligence':
        return [
          { label: 'Platform', view: 'profile' as ViewMode },
          { label: 'Opportunities', view: 'opportunities' as ViewMode },
          { label: opportunityTitle || 'Tender Intelligence', view: 'intelligence' as ViewMode },
        ];
      case 'readiness':
        return [
          { label: 'Platform', view: 'profile' as ViewMode },
          { label: 'Bid Readiness', view: 'readiness' as ViewMode },
        ];
    }
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="h-14 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
        {breadcrumbs.map((crumb, idx) => {
          const isLast = idx === breadcrumbs.length - 1;
          return (
            <React.Fragment key={idx}>
              {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-300" />}
              <button
                onClick={() => onNavigate(crumb.view)}
                className={`hover:text-emerald-700 transition-colors ${
                  isLast ? 'text-slate-900 font-bold max-w-[240px] truncate' : ''
                }`}
              >
                {crumb.label}
              </button>
            </React.Fragment>
          );
        })}
      </nav>

      {/* Live Sync Status Indicator */}
      <div className="flex items-center gap-3">
        {currentView === 'profile' ? (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-medium border border-emerald-200/60">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Autosaved</span>
          </div>
        ) : (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-medium border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>Synced with Nigeria e-Procurement Portals</span>
          </div>
        )}
      </div>
    </header>
  );
};
