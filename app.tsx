import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AIChatDrawer } from './components/AIChatDrawer';
import { LoginModal } from './components/LoginModal';
import { OneClickAdModal } from './components/OneClickAdModal';
import { HomeView } from './components/HomeView';
import { PdfStudioView } from './components/PdfStudioView';
import { CvStudioView } from './components/CvStudioView';
import { PortfolioStudioView } from './components/PortfolioStudioView';
import { IdCardStudioView } from './components/IdCardStudioView';
import { PictureStudioView } from './components/PictureStudioView';
import { SponsorshipView } from './components/SponsorshipView';
import { SupportCenterView } from './components/SupportCenterView';
import { PersonalCenterView } from './components/PersonalCenterView';
import { AdminStudioView } from './components/AdminStudioView';

import { 
  TabType, 
  UserProfile, 
  CustomTemplate, 
  SponsorAd, 
  PdfDocument, 
  CvData, 
  PortfolioData, 
  IdCardData, 
  PictureProject,
  NotificationItem
} from './types';

import { 
  initialTemplates, 
  initialAds, 
  initialPdfDoc, 
  initialCvData, 
  initialPortfolioData, 
  initialIdCardData, 
  initialPictureProject,
  initialNotifications
} from './data/initialData';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<TabType>('home');

  // User Authentication State (Persisted in localStorage)
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('smart_templates_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  // Custom Templates State
  const [templates, setTemplates] = useState<CustomTemplate[]>(() => {
    const saved = localStorage.getItem('smart_templates_custom_templates');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        return initialTemplates;
      }
    }
    return initialTemplates;
  });

  // Sponsor Ads State
  const [ads, setAds] = useState<SponsorAd[]>(() => {
    const saved = localStorage.getItem('smart_templates_ads');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        return initialAds;
      }
    }
    return initialAds;
  });

  // Notifications State
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('smart_templates_notifications');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        return initialNotifications;
      }
    }
    return initialNotifications;
  });

  // Active Drafts Persistence State
  const [pdfDoc, setPdfDoc] = useState<PdfDocument>(() => {
    const saved = localStorage.getItem('smart_templates_draft_pdf');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...initialPdfDoc, ...parsed, blocks: Array.isArray(parsed?.blocks) ? parsed.blocks : initialPdfDoc.blocks };
      } catch (e) {}
    }
    return initialPdfDoc;
  });

  const [cvData, setCvData] = useState<CvData>(() => {
    const saved = localStorage.getItem('smart_templates_draft_cv');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { 
          ...initialCvData, 
          ...parsed, 
          experiences: Array.isArray(parsed?.experiences) ? parsed.experiences : initialCvData.experiences,
          education: Array.isArray(parsed?.education) ? parsed.education : initialCvData.education,
          skills: Array.isArray(parsed?.skills) ? parsed.skills : initialCvData.skills,
        };
      } catch (e) {}
    }
    return initialCvData;
  });

  const [portfolioData, setPortfolioData] = useState<PortfolioData>(() => {
    const saved = localStorage.getItem('smart_templates_draft_portfolio');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { 
          ...initialPortfolioData, 
          ...parsed,
          preferences: { ...initialPortfolioData.preferences, ...(parsed?.preferences || {}) },
          skills: Array.isArray(parsed?.skills) ? parsed.skills : initialPortfolioData.skills,
          galleryImages: Array.isArray(parsed?.galleryImages) ? parsed.galleryImages : initialPortfolioData.galleryImages,
          socialLinks: Array.isArray(parsed?.socialLinks) ? parsed.socialLinks : initialPortfolioData.socialLinks,
        };
      } catch (e) {}
    }
    return initialPortfolioData;
  });

  const [idCardData, setIdCardData] = useState<IdCardData>(() => {
    const saved = localStorage.getItem('smart_templates_draft_idcard');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { 
          ...initialIdCardData, 
          ...parsed,
          batchList: Array.isArray(parsed?.batchList) ? parsed.batchList : initialIdCardData.batchList,
        };
      } catch (e) {}
    }
    return initialIdCardData;
  });

  const [pictureProject, setPictureProject] = useState<PictureProject>(() => {
    const saved = localStorage.getItem('smart_templates_draft_picture');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { 
          ...initialPictureProject, 
          ...parsed,
          filters: { ...initialPictureProject.filters, ...(parsed?.filters || {}) },
        };
      } catch (e) {}
    }
    return initialPictureProject;
  });

  // Modals & UI Triggers
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [isOneClickAdOpen, setIsOneClickAdOpen] = useState(false);
  const [downloadIntentMsg, setDownloadIntentMsg] = useState('');
  const [pendingLoginCallback, setPendingLoginCallback] = useState<(() => void) | null>(null);

  // Sync state to LocalStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('smart_templates_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('smart_templates_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('smart_templates_custom_templates', JSON.stringify(templates));
  }, [templates]);

  useEffect(() => {
    localStorage.setItem('smart_templates_ads', JSON.stringify(ads));
  }, [ads]);

  // Draft auto-savers
  const handleSavePdf = (doc: PdfDocument) => {
    setPdfDoc(doc);
    localStorage.setItem('smart_templates_draft_pdf', JSON.stringify(doc));
  };

  const handleSaveCv = (cv: CvData) => {
    setCvData(cv);
    localStorage.setItem('smart_templates_draft_cv', JSON.stringify(cv));
  };

  const handleSavePortfolio = (port: PortfolioData) => {
    setPortfolioData(port);
    localStorage.setItem('smart_templates_draft_portfolio', JSON.stringify(port));
  };

  const handleSaveIdCard = (card: IdCardData) => {
    setIdCardData(card);
    localStorage.setItem('smart_templates_draft_idcard', JSON.stringify(card));
  };

  const handleSavePicture = (pic: PictureProject) => {
    setPictureProject(pic);
    localStorage.setItem('smart_templates_draft_picture', JSON.stringify(pic));
  };

  // Login handler & post-login callback executor
  const handleLoginSuccess = (loggedInUser: UserProfile) => {
    setUser(loggedInUser);
    if (pendingLoginCallback) {
      pendingLoginCallback();
      setPendingLoginCallback(null);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('home');
  };

  const handleRequireLogin = (intentMessage: string, onComplete: () => void) => {
    setDownloadIntentMsg(intentMessage);
    setPendingLoginCallback(() => onComplete);
    setIsLoginModalOpen(true);
  };

  // Templates & Ads manager actions
  const handleAddTemplate = (newTmpl: CustomTemplate) => {
    setTemplates((prev) => [newTmpl, ...prev]);
  };

  const handleDeleteTemplate = (id: string) => {
    setTemplates((prev) => prev.filter((t) => t.id !== id));
  };

  const handleAddAd = (newAd: SponsorAd) => {
    setAds((prev) => [newAd, ...prev]);
  };

  const handleUpdateAd = (updatedAd: SponsorAd) => {
    setAds((prev) => prev.map((a) => (a.id === updatedAd.id ? updatedAd : a)));
  };

  const handleDeleteAd = (id: string) => {
    setAds((prev) => prev.filter((a) => a.id !== id));
  };

  // Find active ads for specific placements
  const loginFormAd = ads.find((a) => a.active && a.placement === 'login_form') || null;
  const oneClickAd = ads.find((a) => a.active && a.placement === 'one_click') || null;
  const bannerAd = ads.find((a) => a.active && a.placement === 'banner') || null;

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-fuchsia-500 selection:text-white relative">
      
      {/* Dynamic Background Light Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-fuchsia-600/15 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-cyan-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-1/3 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl" />
      </div>

      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        notifications={notifications}
        onOpenLogin={() => {
          setDownloadIntentMsg('');
          setIsLoginModalOpen(true);
        }}
        onLogout={handleLogout}
      />

      {/* Main Page View Router */}
      <main className="flex-1 relative z-10 pt-4 sm:pt-6">
        {activeTab === 'home' && (
          <HomeView
            setActiveTab={setActiveTab}
            templates={templates}
            activeAd={bannerAd}
            onOpenOneClickAd={() => {
              if (oneClickAd) setIsOneClickAdOpen(true);
            }}
          />
        )}

        {activeTab === 'pdf' && (
          <PdfStudioView
            initialDoc={pdfDoc}
            onSaveDoc={handleSavePdf}
            user={user}
            onRequireLogin={handleRequireLogin}
          />
        )}

        {activeTab === 'cv' && (
          <CvStudioView
            initialCv={cvData}
            onSaveCv={handleSaveCv}
            user={user}
            onRequireLogin={handleRequireLogin}
          />
        )}

        {activeTab === 'portfolio' && (
          <PortfolioStudioView
            initialPortfolio={portfolioData}
            onSavePortfolio={handleSavePortfolio}
            user={user}
            onRequireLogin={handleRequireLogin}
          />
        )}

        {activeTab === 'idcard' && (
          <IdCardStudioView
            initialCard={idCardData}
            onSaveCard={handleSaveIdCard}
            user={user}
            onRequireLogin={handleRequireLogin}
          />
        )}

        {activeTab === 'picture' && (
          <PictureStudioView
            initialProject={pictureProject}
            onSaveProject={handleSavePicture}
            user={user}
            onRequireLogin={handleRequireLogin}
          />
        )}

        {activeTab === 'sponsorship' && (
          <SponsorshipView />
        )}

        {activeTab === 'support' && (
          <SupportCenterView />
        )}

        {activeTab === 'personal' && (
          user ? (
            <PersonalCenterView
              user={user}
              onLogout={handleLogout}
              setActiveTab={setActiveTab}
              pdfDoc={pdfDoc}
              cvData={cvData}
              portfolioData={portfolioData}
              idCardData={idCardData}
              pictureProject={pictureProject}
            />
          ) : (
            <div className="max-w-md mx-auto my-12 p-8 rounded-3xl bg-slate-900 border border-purple-500/30 text-center space-y-4">
              <h2 className="text-xl font-bold text-white">Sign In to View Personal Center</h2>
              <p className="text-xs text-slate-400">
                Manage your saved drafts, ongoing studio projects, and account profile.
              </p>
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 via-purple-600 to-cyan-500 text-white font-bold text-xs shadow-lg"
              >
                Sign In or Sign Up
              </button>
            </div>
          )
        )}

        {activeTab === 'admin' && (
          <AdminStudioView
            user={user}
            templates={templates}
            onAddTemplate={handleAddTemplate}
            onDeleteTemplate={handleDeleteTemplate}
            ads={ads}
            onAddAd={handleAddAd}
            onUpdateAd={handleUpdateAd}
            onDeleteAd={handleDeleteAd}
          />
        )}
      </main>

      {/* Omnipresent AI Assistant Chat Drawer (Available on Every Page) */}
      <AIChatDrawer
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={isAiChatOpen}
        onClose={() => setIsAiChatOpen(false)}
        onToggle={() => setIsAiChatOpen(!isAiChatOpen)}
      />

      {/* Login & Sign Up Modal with Sponsor Ad banner */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        loginAd={loginFormAd}
        downloadIntentMessage={downloadIntentMsg}
      />

      {/* One-Click Interstitial Ad Modal */}
      {oneClickAd && (
        <OneClickAdModal
          ad={oneClickAd}
          isOpen={isOneClickAdOpen}
          onClose={() => setIsOneClickAdOpen(false)}
          onProceed={() => setIsOneClickAdOpen(false)}
        />
      )}

      {/* Global Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
