import { useState } from 'react';
import type { ViewMode, BusinessProfileData, Opportunity, RequirementItem } from './types';
import { initialProfileData, opportunitiesData } from './data/mockData';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { BusinessProfile } from './components/BusinessProfile';
import { Opportunities } from './components/Opportunities';
import { TenderIntelligence } from './components/TenderIntelligence';
import { EvidenceDrawer } from './components/EvidenceDrawer';
import { BidReadiness } from './components/BidReadiness';
import type { ToastMessage } from './components/Toast';
import { ToastContainer } from './components/Toast';

export function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('profile');
  const [profile, setProfile] = useState<BusinessProfileData>(initialProfileData);
  const [opportunities, setOpportunities] = useState<Opportunity[]>(opportunitiesData);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(
    opportunitiesData[0]
  );
  const [selectedEvidenceItem, setSelectedEvidenceItem] = useState<RequirementItem | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Add toast helper
  const addToast = (title: string, description?: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Recalculate dynamic requirements matching profile state (e.g. if user updates years of experience or turnover)
  const handleUpdateProfile = (updated: Partial<BusinessProfileData>) => {
    const newProfile = { ...profile, ...updated };
    setProfile(newProfile);

    // Update requirements dynamically across opportunities
    const updatedOpps = opportunities.map((opp) => {
      const updatedReqs = opp.requirements.map((req) => {
        if (req.id === 'req-1-2') {
          const yrs = typeof newProfile.yearsOfExperience === 'number'
            ? newProfile.yearsOfExperience
            : parseInt(String(newProfile.yearsOfExperience)) || 4;

          if (yrs >= 5) {
            return {
              ...req,
              status: 'MATCH' as const,
              userProfileText: `Your profile: ${yrs} years of experience (Meets or exceeds 5-year threshold)`,
              userValue: `${yrs} Years`,
            };
          } else {
            return {
              ...req,
              status: 'POTENTIAL GAP' as const,
              userProfileText: `Your profile: ${yrs} years of experience (falls ${5 - yrs} year${5 - yrs > 1 ? 's' : ''} below stated threshold)`,
              userValue: `${yrs} Years`,
            };
          }
        }
        return req;
      });

      // Recalculate badge counts
      const matchesCount = updatedReqs.filter((r) => r.status === 'MATCH').length;
      const potentialGapsCount = updatedReqs.filter((r) => r.status === 'POTENTIAL GAP').length;

      return {
        ...opp,
        requirements: updatedReqs,
        matchesCount,
        potentialGapsCount,
      };
    });

    setOpportunities(updatedOpps);
    if (selectedOpportunity) {
      const match = updatedOpps.find((o) => o.id === selectedOpportunity.id);
      if (match) setSelectedOpportunity(match);
    }
  };

  const handleNavigate = (view: ViewMode) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectOpportunity = (opp: Opportunity) => {
    setSelectedOpportunity(opp);
    setCurrentView('intelligence');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenEvidence = (item: RequirementItem) => {
    setSelectedEvidenceItem(item);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-row font-sans text-slate-900 selection:bg-emerald-600 selection:text-white">
      {/* Left Sidebar (260px) */}
      <Sidebar
        currentView={currentView}
        onNavigate={handleNavigate}
        opportunitiesCount={opportunities.length}
        profile={profile}
        activeEvidenceStep={Boolean(selectedEvidenceItem)}
      />

      {/* Main Container Right */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Header */}
        <Header
          currentView={currentView}
          opportunityTitle={selectedOpportunity?.title}
          onNavigate={handleNavigate}
        />

        {/* Dynamic Main View Content */}
        <main className="flex-1 pb-16 overflow-y-auto">
          {currentView === 'profile' && (
            <BusinessProfile
              profile={profile}
              onUpdateProfile={handleUpdateProfile}
              onAnalyze={() => {
                addToast('Business Profile Analyzed', 'Comparing business profile against 4 active Nigerian procurement opportunities.');
                handleNavigate('opportunities');
              }}
              onSaveToast={() => {
                addToast('Profile saved successfully', 'Your changes have been saved to your workspace settings.');
              }}
            />
          )}

          {currentView === 'opportunities' && (
            <Opportunities
              opportunities={opportunities}
              onSelectOpportunity={handleSelectOpportunity}
            />
          )}

          {currentView === 'intelligence' && selectedOpportunity && (
            <TenderIntelligence
              opportunity={selectedOpportunity}
              onBack={() => handleNavigate('opportunities')}
              onSelectEvidence={handleOpenEvidence}
            />
          )}

          {currentView === 'readiness' && (
            <BidReadiness
              profile={profile}
              selectedOpportunity={selectedOpportunity}
              onNavigateOpportunities={() => handleNavigate('opportunities')}
              onToast={(title, desc) => addToast(title, desc)}
            />
          )}
        </main>
      </div>

      {/* Side Slide-Over Drawer Panel ("Why are we saying this?") */}
      <EvidenceDrawer
        item={selectedEvidenceItem}
        onClose={() => setSelectedEvidenceItem(null)}
        onProceedBidReadiness={() => {
          setSelectedEvidenceItem(null);
          handleNavigate('readiness');
          addToast('Bid Readiness Active', 'Reviewing compliance score and statutory requirement dossier.');
        }}
      />

      {/* Toast Notifications Container */}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  );
}

export default App;
