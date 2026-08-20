import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Sparkles, 
  Layers, 
  DollarSign, 
  Megaphone, 
  ExternalLink, 
  CheckCircle2, 
  Eye, 
  Mail, 
  Phone, 
  Clock, 
  Upload, 
  Edit3,
  TrendingUp,
  Tag
} from 'lucide-react';
import { CustomTemplate, SponsorAd, UserProfile } from '../types';

interface AdminStudioViewProps {
  user: UserProfile | null;
  templates: CustomTemplate[];
  onAddTemplate: (tmpl: CustomTemplate) => void;
  onDeleteTemplate: (id: string) => void;
  ads: SponsorAd[];
  onAddAd: (ad: SponsorAd) => void;
  onUpdateAd: (ad: SponsorAd) => void;
  onDeleteAd: (id: string) => void;
}

export const AdminStudioView: React.FC<AdminStudioViewProps> = ({
  user,
  templates,
  onAddTemplate,
  onDeleteTemplate,
  ads,
  onAddAd,
  onUpdateAd,
  onDeleteAd,
}) => {
  const [activeAdminTab, setActiveAdminTab] = useState<'templates' | 'ads' | 'inquiries' | 'stats'>('templates');

  // Form states for adding template
  const [tmplTitle, setTmplTitle] = useState('');
  const [tmplCategory, setTmplCategory] = useState<'pdf' | 'cv' | 'portfolio' | 'idcard' | 'picture'>('cv');
  const [tmplDesc, setTmplDesc] = useState('');
  const [tmplImageUrl, setTmplImageUrl] = useState('');
  const [tmplTags, setTmplTags] = useState('modern, professional, vibrant');

  // Form states for adding ad
  const [adSponsor, setAdSponsor] = useState('');
  const [adTitle, setAdTitle] = useState('');
  const [adDesc, setAdDesc] = useState('');
  const [adTargetUrl, setAdTargetUrl] = useState('https://');
  const [adBannerUrl, setAdBannerUrl] = useState('');
  const [adPlacement, setAdPlacement] = useState<'login_form' | 'one_click' | 'banner'>('login_form');
  const [adAmount, setAdAmount] = useState('50,000 RWF');

  // Stored inquiries in localStorage
  const inquiries = JSON.parse(localStorage.getItem('smart_templates_inquiries') || '[]');

  const handleCreateTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tmplTitle || !tmplDesc) return;

    const newTemplate: CustomTemplate = {
      id: `tmpl-${Date.now()}`,
      title: tmplTitle,
      category: tmplCategory,
      description: tmplDesc,
      previewImageUrl:
        tmplImageUrl ||
        'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&q=80',
      tags: tmplTags.split(',').map((t) => t.trim()),
      isFeatured: true,
      createdAt: new Date().toISOString().split('T')[0],
    };

    onAddTemplate(newTemplate);
    setTmplTitle('');
    setTmplDesc('');
    setTmplImageUrl('');
  };

  const handleCreateAd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adSponsor || !adTitle) return;

    const newAd: SponsorAd = {
      id: `ad-${Date.now()}`,
      sponsorName: adSponsor,
      title: adTitle,
      description: adDesc,
      targetUrl: adTargetUrl,
      bannerImageUrl:
        adBannerUrl ||
        'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80',
      placement: adPlacement,
      active: true,
      paymentConfirmed: true,
      paidAmount: adAmount,
      clicksCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };

    onAddAd(newAd);
    setAdSponsor('');
    setAdTitle('');
    setAdDesc('');
    setAdBannerUrl('');
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="max-w-md mx-auto p-8 rounded-3xl bg-slate-900 border border-rose-500/40 text-center space-y-3">
        <ShieldCheck className="w-12 h-12 text-rose-400 mx-auto" />
        <h2 className="text-lg font-bold text-white">Admin Access Restricted</h2>
        <p className="text-xs text-slate-300">
          Please log in using verified credentials (arielmethran@gmail.com) to access the management portal.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-950/80 via-purple-950/80 to-slate-950 border border-amber-500/40 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
            <ShieldCheck className="w-7 h-7 text-amber-400" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white flex items-center gap-2">
              <span>Admin Management Hub</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">
                Ariel Methran
              </span>
            </h1>
            <p className="text-xs text-slate-300">
              Manage platform templates, paid sponsor advertisements & MoMo inquiries without touching internal code.
            </p>
          </div>
        </div>

        {/* Navigation Pills */}
        <div className="flex items-center gap-2 p-1 bg-slate-900 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveAdminTab('templates')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeAdminTab === 'templates' ? 'bg-amber-500 text-slate-950' : 'text-slate-300 hover:text-white'
            }`}
          >
            Templates ({templates.length})
          </button>
          <button
            onClick={() => setActiveAdminTab('ads')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeAdminTab === 'ads' ? 'bg-amber-500 text-slate-950' : 'text-slate-300 hover:text-white'
            }`}
          >
            Sponsor Ads ({ads.length})
          </button>
          <button
            onClick={() => setActiveAdminTab('inquiries')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeAdminTab === 'inquiries' ? 'bg-amber-500 text-slate-950' : 'text-slate-300 hover:text-white'
            }`}
          >
            Inquiries ({inquiries.length})
          </button>
        </div>
      </div>

      {/* Tab 1: Template Management (Add, view, delete templates without touching code!) */}
      {activeAdminTab === 'templates' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left: Add Template Form (5 cols) */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-900/80 border border-purple-500/20 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <Plus className="w-5 h-5 text-fuchsia-400" />
              <h2 className="text-sm font-extrabold text-white uppercase tracking-wider">
                Add New Template (No Code Required)
              </h2>
            </div>

            <form onSubmit={handleCreateTemplate} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Template Title
                </label>
                <input
                  type="text"
                  required
                  value={tmplTitle}
                  onChange={(e) => setTmplTitle(e.target.value)}
                  placeholder="e.g. Modern Executive CV 2026"
                  className="w-full bg-slate-950 border border-purple-500/30 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-fuchsia-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Target Studio Category
                </label>
                <select
                  value={tmplCategory}
                  onChange={(e) => setTmplCategory(e.target.value as any)}
                  className="w-full bg-slate-950 border border-purple-500/30 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-fuchsia-400"
                >
                  <option value="cv">CV & Resume</option>
                  <option value="pdf">PDF Document</option>
                  <option value="portfolio">Portfolio</option>
                  <option value="idcard">Student / Staff ID Card</option>
                  <option value="picture">Picture & Photo Filter</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Preview Image URL
                </label>
                <input
                  type="url"
                  value={tmplImageUrl}
                  onChange={(e) => setTmplImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-slate-950 border border-purple-500/30 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-fuchsia-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  required
                  value={tmplDesc}
                  onChange={(e) => setTmplDesc(e.target.value)}
                  placeholder="What makes this template stand out?"
                  className="w-full bg-slate-950 border border-purple-500/30 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-fuchsia-400 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Search Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={tmplTags}
                  onChange={(e) => setTmplTags(e.target.value)}
                  placeholder="colorful, ats, modern, tech"
                  className="w-full bg-slate-950 border border-purple-500/30 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-fuchsia-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 via-purple-600 to-cyan-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Publish Template Live</span>
              </button>
            </form>
          </div>

          {/* Right: Existing Templates List & Delete (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Live Active Templates ({templates.length})
              </h3>
              <span className="text-xs text-slate-400">Instantly rendered on homepage</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {templates.map((tmpl) => (
                <div
                  key={tmpl.id}
                  className="p-4 rounded-2xl bg-slate-900/80 border border-purple-500/20 flex flex-col justify-between space-y-3 relative group"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={tmpl.previewImageUrl}
                      alt={tmpl.title}
                      className="w-16 h-16 rounded-xl object-cover border border-slate-700 shrink-0"
                    />
                    <div className="min-w-0">
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 uppercase">
                        {tmpl.category}
                      </span>
                      <h4 className="text-xs font-bold text-white truncate mt-1">
                        {tmpl.title}
                      </h4>
                      <p className="text-[11px] text-slate-300 line-clamp-2 mt-0.5">
                        {tmpl.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[10px]">
                    <span className="text-slate-400">{tmpl.createdAt}</span>
                    <button
                      onClick={() => onDeleteTemplate(tmpl.id)}
                      className="text-rose-400 hover:text-rose-300 flex items-center gap-1 font-semibold"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Sponsor Ads Management (Login Form & One-Click Interstitial Ads) */}
      {activeAdminTab === 'ads' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left: Create Ad (5 cols) */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-900/80 border border-amber-500/30 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <Megaphone className="w-5 h-5 text-amber-400" />
              <h2 className="text-sm font-extrabold text-white uppercase tracking-wider">
                Create Paid Sponsor Ad
              </h2>
            </div>

            <form onSubmit={handleCreateAd} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Sponsor / Company Name
                </label>
                <input
                  type="text"
                  required
                  value={adSponsor}
                  onChange={(e) => setAdSponsor(e.target.value)}
                  placeholder="e.g. Bank of Kigali, Airtel Rwanda"
                  className="w-full bg-slate-950 border border-purple-500/30 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Ad Headline
                </label>
                <input
                  type="text"
                  required
                  value={adTitle}
                  onChange={(e) => setAdTitle(e.target.value)}
                  placeholder="e.g. Fast High-Speed Internet in Kigali"
                  className="w-full bg-slate-950 border border-purple-500/30 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Ad Placement Type
                  </label>
                  <select
                    value={adPlacement}
                    onChange={(e) => setAdPlacement(e.target.value as any)}
                    className="w-full bg-slate-950 border border-purple-500/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="login_form">Login/Sign Up Form Ad</option>
                    <option value="one_click">One-Click Interstitial</option>
                    <option value="banner">Homepage Highlight Banner</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    MoMo Paid Amount
                  </label>
                  <input
                    type="text"
                    value={adAmount}
                    onChange={(e) => setAdAmount(e.target.value)}
                    placeholder="50,000 RWF"
                    className="w-full bg-slate-950 border border-purple-500/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Target Website URL
                </label>
                <input
                  type="url"
                  required
                  value={adTargetUrl}
                  onChange={(e) => setAdTargetUrl(e.target.value)}
                  placeholder="https://sponsor.rw"
                  className="w-full bg-slate-950 border border-purple-500/30 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Banner Image URL
                </label>
                <input
                  type="url"
                  value={adBannerUrl}
                  onChange={(e) => setAdBannerUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-slate-950 border border-purple-500/30 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Ad Description / Promotional Pitch
                </label>
                <textarea
                  rows={2}
                  value={adDesc}
                  onChange={(e) => setAdDesc(e.target.value)}
                  placeholder="Details for the user..."
                  className="w-full bg-slate-950 border border-purple-500/30 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2"
              >
                <Megaphone className="w-4 h-4" />
                <span>Activate Sponsor Ad</span>
              </button>
            </form>
          </div>

          {/* Right: Active Ads List & Toggles (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Configured Sponsor Ads ({ads.length})
            </h3>

            <div className="space-y-3">
              {ads.map((ad) => (
                <div
                  key={ad.id}
                  className="p-4 rounded-2xl bg-slate-900/80 border border-purple-500/20 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={ad.bannerImageUrl}
                        alt={ad.sponsorName}
                        className="w-12 h-12 rounded-xl object-cover border border-amber-400"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-white">{ad.sponsorName}</h4>
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">
                            {ad.placement.replace('_', ' ')}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 font-medium">{ad.title}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateAd({ ...ad, active: !ad.active })}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                          ad.active ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {ad.active ? 'Active' : 'Paused'}
                      </button>

                      <button
                        onClick={() => onDeleteAd(ad.id)}
                        className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-950/40"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                    <span>Paid: <strong className="text-amber-400">{ad.paidAmount}</strong></span>
                    <a
                      href={ad.targetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:underline flex items-center gap-1"
                    >
                      <span>{ad.targetUrl}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Mobile Money & Support Inquiries Received */}
      {activeAdminTab === 'inquiries' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Sponsorship & Contact Inquiries Received ({inquiries.length})
            </h3>
            <span className="text-xs text-slate-400">Direct notifications sent to arielmethran@gmail.com</span>
          </div>

          {inquiries.length === 0 ? (
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 text-center text-slate-400 text-xs">
              No inquiries yet. New submissions from the Sponsorship page appear here automatically.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {inquiries.map((inq: any) => (
                <div
                  key={inq.id}
                  className="p-5 rounded-2xl bg-slate-900 border border-purple-500/20 space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                    <div>
                      <h4 className="text-xs font-bold text-white">{inq.name}</h4>
                      <span className="text-[11px] text-fuchsia-300 font-semibold">{inq.amount}</span>
                    </div>
                    <span className="text-[10px] text-slate-400">{new Date(inq.createdAt).toLocaleDateString()}</span>
                  </div>

                  <div className="text-xs text-slate-300 space-y-1">
                    <div><strong className="text-slate-400">Email:</strong> {inq.email}</div>
                    <div><strong className="text-slate-400">Phone:</strong> {inq.phone}</div>
                    <div><strong className="text-slate-400">Details:</strong> {inq.message}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
