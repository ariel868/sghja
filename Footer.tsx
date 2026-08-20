import React from 'react';
import { 
  Sparkles, 
  Instagram, 
  Phone, 
  Mail, 
  Globe, 
  ShieldCheck, 
  Heart, 
  ArrowUpRight 
} from 'lucide-react';
import { TabType } from '../types';
import { ADMIN_EMAIL, ADMIN_INSTAGRAM, ADMIN_PHONE } from '../data/initialData';

interface FooterProps {
  setActiveTab: (tab: TabType) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="relative bg-slate-950 border-t border-purple-500/20 text-slate-400 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-tr from-fuchsia-600/10 via-purple-600/10 to-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-fuchsia-500 via-purple-500 to-cyan-400 p-[2px] shadow-md shadow-purple-500/30">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-fuchsia-400" />
                </div>
              </div>
              <span className="text-xl font-black tracking-tight gradient-text-rainbow">
                SMART TEMPLATES
              </span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              The premier AI-assisted and manual creation suite for PDF documents, professional CVs, personal portfolios with Instagram sync, Student & Staff ID cards, and colorful picture templates.
            </p>

            {/* Direct Admin Contacts */}
            <div className="pt-2 space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-fuchsia-400">
                Direct Admin & Partnerships
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`mailto:${ADMIN_EMAIL}`}
                  className="flex items-center gap-1.5 text-xs text-slate-200 hover:text-cyan-400 transition-colors bg-slate-900/80 px-2.5 py-1.5 rounded-lg border border-slate-800"
                >
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{ADMIN_EMAIL}</span>
                </a>
                <a
                  href={`tel:${ADMIN_PHONE}`}
                  className="flex items-center gap-1.5 text-xs text-slate-200 hover:text-emerald-400 transition-colors bg-slate-900/80 px-2.5 py-1.5 rounded-lg border border-slate-800"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{ADMIN_PHONE}</span>
                </a>
                <a
                  href={`https://instagram.com/${ADMIN_INSTAGRAM}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-slate-200 hover:text-fuchsia-400 transition-colors bg-slate-900/80 px-2.5 py-1.5 rounded-lg border border-slate-800"
                >
                  <Instagram className="w-3.5 h-3.5 text-fuchsia-400" />
                  <span>@{ADMIN_INSTAGRAM}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Creation Studios */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Creation Studios
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => setActiveTab('pdf')} className="hover:text-fuchsia-400 transition-colors">
                  PDF Document Studio
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('cv')} className="hover:text-purple-400 transition-colors">
                  CV & Resume Builder
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('portfolio')} className="hover:text-cyan-400 transition-colors">
                  Personal Portfolio & IG Sync
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('idcard')} className="hover:text-amber-400 transition-colors">
                  Student & Staff ID Cards
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('picture')} className="hover:text-rose-400 transition-colors">
                  Picture Editor & Filters
                </button>
              </li>
            </ul>
          </div>

          {/* Rwanda MoMo & Sponsorship */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Sponsorship & MoMo
            </h4>
            <div className="space-y-3 text-xs">
              <p className="text-slate-300">
                Support our creators or place direct corporate ads via Rwandan Mobile Money:
              </p>
              <div className="bg-slate-900/90 p-2.5 rounded-xl border border-purple-500/20 space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-amber-400">MTN & AIRTEL RWANDA:</span>
                </div>
                <div className="font-mono text-xs font-bold text-emerald-400 select-all">
                  0795211686
                </div>
                <div className="text-[10px] text-slate-400">
                  Recipient: Ariel Methran
                </div>
              </div>
              <button
                onClick={() => setActiveTab('sponsorship')}
                className="inline-flex items-center gap-1 text-xs font-bold text-fuchsia-400 hover:text-fuchsia-300"
              >
                <span>Explore Sponsorship Tiers</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Links & Search Engine indexing */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Platform & SEO
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => setActiveTab('support')} className="hover:text-cyan-400 transition-colors">
                  Support Center & FAQs
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('personal')} className="hover:text-purple-400 transition-colors">
                  Personal Center & Drafts
                </button>
              </li>
              <li>
                <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Google Search Indexed</span>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-1 text-slate-400">
                  <Globe className="w-3.5 h-3.5 text-slate-500" />
                  <span>subdomain.smarttemplate.com</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-slate-400">
            <span>© 2026 SMART TEMPLATES. Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>by Ariel Methran. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="hover:text-slate-200 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-200 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-slate-200 cursor-pointer">Ad Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
