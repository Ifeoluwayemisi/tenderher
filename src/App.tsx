import { useState } from 'react';
import type { ViewMode, BusinessProfileData, Opportunity, RequirementItem } from './types';
import { initialProfileData, opportunitiesData } from './data/mockData';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { BusinessProfile } from './components/BusinessProfile';
import { Opportunities } from './components/Opportunities';
import { TenderIntelligence } from './components/TenderIntelligence';
import { EvidenceView } from './components/EvidenceView';
import { BidReadinessView } from './components/BidReadinessView';
import { SettingsView } from './components/SettingsView';
import { EvidenceDrawer } from './components/EvidenceDrawer';
import { GazetteModal } from './components/GazetteModal';
import { UploadModal } from './components/UploadModal';
import type { ToastMessage } from './components/Toast';
import { ToastContainer } from './components/Toast';

export function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('profile');
  const [profile, setProfile] = useState<BusinessProfileData>(initialProfileData);
  const [opportunities, setOpportunities] = useState<Opportunity[]>(opportunitiesData);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity>(
    opportunitiesData[0]
  );
  const [selectedEvidenceItem, setSelectedEvidenceItem] = useState<RequirementItem | null>(null);

  // Modals state
  const [isGazetteOpen, setIsGazetteOpen] = useState(false);
  const [uploadDocName, setUploadDocName] = useState<string | null>(null);

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Add toast helper
  const addToast = (
    title: string,
    description?: string,
    type: 'success' | 'error' | 'info' = 'success'
  ) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Recalculate dynamic requirements matching profile state
  const handleUpdateProfile = (updated: Partial<BusinessProfileData>) => {
    const newProfile = { ...profile, ...updated };
    setProfile(newProfile);

    const updatedOpps = opportunities.map((opp) => {
      const updatedReqs = opp.requirements.map((req) => {
        if (req.id === 'req-1-2') {
          const yrs =
            typeof newProfile.yearsOfExperience === 'number'
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
              userProfileText: `Your profile: ${yrs} years of experience (falls ${
                5 - yrs
              } year${5 - yrs > 1 ? 's' : ''} below stated threshold)`,
              userValue: `${yrs} Years`,
            };
          }
        }
        return req;
      });

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
    const match = updatedOpps.find((o) => o.id === selectedOpportunity.id);
    if (match) setSelectedOpportunity(match);
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

  const handleOpenEvidenceDrawer = (item: RequirementItem) => {
    setSelectedEvidenceItem(item);
  };

  const handleDocumentUploadSuccess = (docName: string) => {
    addToast(
      'Document Verified',
      `${docName} has been processed and saved to ${profile.companyName}'s compliance vault.`
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-row font-sans text-slate-900 selection:bg-emerald-600 selection:text-white">
      {/* Fixed Left Sidebar (w-64) */}
      <Sidebar
        currentView={currentView}
        onNavigate={handleNavigate}
        opportunitiesCount={opportunities.length}
        profile={profile}
      />

      {/* Main Container Right (pl-64 offset for fixed sidebar) */}
      <div className="pl-64 flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Header */}
        <Header
          currentView={currentView}
          opportunityTitle={selectedOpportunity.title}
          onNavigate={handleNavigate}
          onNotificationToast={() =>
            addToast(
              'Procurement Intelligence Alert',
              '1 new NITDA ICT tender closing in 5 days matches TechSolutions Ltd profile.'
            )
          }
        />

        {/* Dynamic Main View Content */}
        <main className="flex-1 pb-16 overflow-y-auto">
          {/* STEP 1: Business Profile */}
          {currentView === 'profile' && (
            <BusinessProfile
              profile={profile}
              onUpdateProfile={handleUpdateProfile}
              onAnalyze={() => {
                addToast(
                  'Business Profile Analyzed',
                  'Comparing profile parameters against 4 active Nigerian procurement opportunities.'
                );
                handleNavigate('opportunities');
              }}
              onSaveToast={() => {
                addToast(
                  'Profile Saved Successfully',
                  'Your enterprise details are stored securely for eligibility checks.'
                );
              }}
            />
          )}

          {/* STEP 2: Opportunities Directory */}
          {currentView === 'opportunities' && (
            <Opportunities
              opportunities={opportunities}
              onSelectOpportunity={handleSelectOpportunity}
            />
          )}

          {/* STEP 3: Tender Intelligence */}
          {currentView === 'intelligence' && (
            <TenderIntelligence
              opportunity={selectedOpportunity}
              onBack={() => handleNavigate('opportunities')}
              onSelectEvidence={(item) => {
                if (item.status === 'POTENTIAL GAP') {
                  handleNavigate('evidence');
                } else {
                  handleOpenEvidenceDrawer(item);
                }
              }}
            />
          )}

          {/* STEP 4: Evidence Analysis & Deep-Dive */}
          {currentView === 'evidence' && (
            <EvidenceView
              opportunity={selectedOpportunity}
              profile={profile}
              onBackToIntelligence={() => handleNavigate('intelligence')}
              onProceedBidReadiness={() => {
                handleNavigate('readiness');
                addToast(
                  'Bid Readiness Engine Activated',
                  'Generating compliance scoring and deficit resolution pathways.'
                );
              }}
              onOpenGazetteModal={() => setIsGazetteOpen(true)}
            />
          )}

          {/* STEP 5: Bid Readiness Dashboard */}
          {currentView === 'readiness' && (
            <BidReadinessView
              profile={profile}
              opportunity={selectedOpportunity}
              onNavigate={handleNavigate}
              onViewEvidence={() => handleNavigate('evidence')}
              onOpenUploadModal={(docName) => setUploadDocName(docName)}
            />
          )}

          {/* SETTINGS VIEW */}
          {currentView === 'settings' && (
            <SettingsView
              profile={profile}
              onUpdateProfile={handleUpdateProfile}
              onToast={(title, desc) => addToast(title, desc)}
            />
          )}
        </main>
      </div>

      {/* Side Slide-Over Drawer Panel */}
      <EvidenceDrawer
        item={selectedEvidenceItem}
        onClose={() => setSelectedEvidenceItem(null)}
        onProceedBidReadiness={() => {
          setSelectedEvidenceItem(null);
          handleNavigate('readiness');
        }}
      />

      {/* Gazette View Modal */}
      <GazetteModal
        isOpen={isGazetteOpen}
        onClose={() => setIsGazetteOpen(false)}
        onToast={(title, desc) => addToast(title, desc)}
      />

      {/* Document Upload Modal */}
      <UploadModal
        docName={uploadDocName}
        onClose={() => setUploadDocName(null)}
        onSuccess={handleDocumentUploadSuccess}
      />

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  );
}

export default App;
