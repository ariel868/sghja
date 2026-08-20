import React from 'react';
import { 
  Sparkles, 
  FileText, 
  UserCheck, 
  Share2, 
  CreditCard, 
  Image as ImageIcon, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Bot, 
  ShieldCheck, 
  Layers, 
  DollarSign, 
  HelpCircle,
  Clock,
  TrendingUp,
  Star
} from 'lucide-react';
import { TabType, CustomTemplate, SponsorAd } from '../types';

interface HomeViewProps {
  setActiveTab: (tab: TabType) => void;
  templates: CustomTemplate[];
  activeAd?: SponsorAd | null;
  onOpenOneClickAd?: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  setActiveTab,
  templates,
  activeAd,
  onOpenOneClickAd,
}) => {
  const updates = [
    {
      id: 'up-1',
      tag: 'NEW 2026 FEATURE',
      title: 'AI Checking for Commas, Full Stops & Typos',
      description: 'Automated linguistic and proofreading engine that catches punctuation gaps and reminds you of missing contact fields.',
      color: 'from-fuchsia-500 to-rose-500',
    },
    {
      id: 'up-2',
      tag: 'INSTAGRAM INTEGRATION',
      title: 'Direct Instagram Bio Synchronizer',
      description: 'Create your colorful portfolio and automatically copy or update your link directly into your Instagram profile settings.',
      color: 'from-purple-500 to-cyan-500',
    },
    {
      id: 'up-3',
      tag: 'BATCH PROCESSING',
      title: 'Company & School Batch ID Card Generator',
      description: 'Issue hundreds of staff or student identification cards in bulk with custom institution badges and barcodes in one click.',
      color: 'from-cyan-500 to-emerald-500',
    },
    {
      id: 'up-4',
      tag: 'RWANDA SPONSORSHIP',
      title: 'Direct MoMo Sponsorship (MTN & Airtel Rwanda)',
      description: 'Local businesses can now place direct banner & login form ads via mobile money payment to 0795211686.',
      color: 'from-amber-500 to-orange-500',
    },
  ];

  const mainFeatures = [
    {
      id: 'pdf' as TabType,
      title: 'PDF Document Studio',
      subtitle: 'Create & Edit Professional PDFs',
      desc: 'Upload or drag-and-drop existing PDFs or begin from a clean canvas. Edit text, add high-res photos, signatures, callout blocks, and use 3-second AI summaries.',
      icon: FileText,
      gradient: 'from-purple-600 via-fuchsia-600 to-pink-500',
      badge: 'AI & Manual',
      features: ['Drag & Drop PDF Import', 'AI Punctuation & Grammar Check', 'Instant 3-Sec Summarizer', 'Legal & Business Blocks'],
    },
    {
      id: 'cv' as TabType,
      title: 'CV & Resume Builder',
      subtitle: 'High-Impact Career Blueprints',
      desc: 'Craft ATS-optimized, modern, and colorful resumes. Upload or crop photos, customize color themes, and leverage AI bullet enhancers with missing-item reminders.',
      icon: UserCheck,
      gradient: 'from-fuchsia-600 via-purple-600 to-cyan-500',
      badge: 'Most Popular',
      features: ['Smart Color Schemes', 'AI Experience Rewriter', 'Photo Upload & AI Crop', 'PDF & Print Export'],
    },
    {
      id: 'portfolio' as TabType,
      title: 'Portfolio & Instagram Sync',
      subtitle: 'Personal Showcase & Bio Linker',
      desc: 'Showcase your bio, favorite songs, food, artists, skills, and image gallery with permanent storage. Instantly link to your Instagram profile bio.',
      icon: Share2,
      gradient: 'from-cyan-500 via-blue-600 to-purple-600',
      badge: 'Custom URL',
      features: ['Instagram Bio Integration', 'Favorites & Preference Cards', 'Permanent Gallery Storage', 'username.smarttemplate.com'],
    },
    {
      id: 'idcard' as TabType,
      title: 'Student & Staff ID Cards',
      subtitle: 'Personal & Company Batch Press',
      desc: 'Design single badges or batch generate hundreds of identification cards for schools, universities, and companies with drag-and-drop badges and barcodes.',
      icon: CreditCard,
      gradient: 'from-emerald-500 via-teal-600 to-cyan-600',
      badge: 'Single & Batch',
      features: ['Personal & Enterprise Modes', 'School & Company Badge Upload', 'Interactive 3D Flip Card', 'Auto-Generated Barcodes & QR'],
    },
    {
      id: 'picture' as TabType,
      title: 'Picture Studio & Templates',
      subtitle: 'AI Smoothing & Colorful Filters',
      desc: 'Upload or drag-and-drop pictures to apply real-time vibrant filters, gentle AI smoothing that keeps original facial details, crop presets, and colorful frames.',
      icon: ImageIcon,
      gradient: 'from-amber-500 via-rose-500 to-fuchsia-600',
      badge: 'Filter Engine',
      features: ['Blemish & Detail AI Smoothing', '9+ Colorful Filter Presets', 'Aspect Ratio Cropping (IG, Passport)', 'Creative Rainbow Frames'],
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* Hero Section */}
      <section className="relative pt-6 sm:pt-12 text-center px-4 overflow-hidden">
        {/* Glow backdrop circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-fuchsia-600/20 via-purple-600/20 to-cyan-500/20 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          
          {/* Release Chip */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-fuchsia-500/40 text-xs font-semibold text-fuchsia-300 shadow-lg shadow-fuchsia-950/40 animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Smart Templates 2026 Studio is Live</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Create, Edit & Publish with{' '}
            <span className="gradient-text-rainbow">
              Smart AI & Manual Precision
            </span>
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            The ultra-colorful, all-in-one platform for drafting <span className="text-fuchsia-400 font-semibold">PDF Documents</span>, building winning <span className="text-purple-400 font-semibold">CVs & Resumes</span>, launching <span className="text-cyan-400 font-semibold">Portfolios with Instagram Sync</span>, printing <span className="text-emerald-400 font-semibold">Batch ID Cards</span>, and editing <span className="text-amber-400 font-semibold">Pictures with vibrant filters</span>.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-4">
            <button
              id="btn-hero-cv"
              onClick={() => setActiveTab('cv')}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-fuchsia-600 via-purple-600 to-cyan-500 hover:from-fuchsia-500 hover:to-cyan-400 text-white font-extrabold text-sm shadow-xl shadow-purple-600/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <UserCheck className="w-4 h-4" />
              <span>Create My CV Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="btn-hero-pdf"
              onClick={() => setActiveTab('pdf')}
              className="px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-purple-500/40 text-slate-200 hover:text-white font-bold text-sm hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-fuchsia-400" />
              <span>Edit / Create PDF</span>
            </button>

            <button
              id="btn-hero-portfolio"
              onClick={() => setActiveTab('portfolio')}
              className="px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 text-slate-200 hover:text-cyan-300 font-bold text-sm hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <Share2 className="w-4 h-4 text-cyan-400" />
              <span>Portfolio & Instagram</span>
            </button>
          </div>

          {/* Highlight metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-8">
            <div className="p-3 sm:p-4 rounded-2xl bg-slate-900/60 border border-purple-500/20 backdrop-blur-sm">
              <div className="text-xl sm:text-2xl font-black text-fuchsia-400">99.8%</div>
              <div className="text-[11px] font-semibold text-slate-400">AI Checking Accuracy</div>
            </div>
            <div className="p-3 sm:p-4 rounded-2xl bg-slate-900/60 border border-purple-500/20 backdrop-blur-sm">
              <div className="text-xl sm:text-2xl font-black text-cyan-400">3 Seconds</div>
              <div className="text-[11px] font-semibold text-slate-400">Instant AI Summary</div>
            </div>
            <div className="p-3 sm:p-4 rounded-2xl bg-slate-900/60 border border-purple-500/20 backdrop-blur-sm">
              <div className="text-xl sm:text-2xl font-black text-emerald-400">Batch Ready</div>
              <div className="text-[11px] font-semibold text-slate-400">Company & School IDs</div>
            </div>
            <div className="p-3 sm:p-4 rounded-2xl bg-slate-900/60 border border-purple-500/20 backdrop-blur-sm">
              <div className="text-xl sm:text-2xl font-black text-amber-400">0795211686</div>
              <div className="text-[11px] font-semibold text-slate-400">MTN & Airtel MoMo</div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Updates & Announcements Section (Requested Feature) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-fuchsia-400 animate-spin" />
            <h2 className="text-lg sm:text-xl font-extrabold text-white">
              Website Updates & New Features
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-semibold">
            Updated Today
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {updates.map((up) => (
            <div
              key={up.id}
              className="p-5 rounded-2xl bg-slate-900/70 border border-purple-500/20 hover:border-fuchsia-500/50 transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-purple-950/20 group"
            >
              <div className="flex items-center gap-2 mb-2.5">
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r ${up.color} text-white uppercase`}>
                  {up.tag}
                </span>
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-fuchsia-300 transition-colors">
                {up.title}
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {up.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5 Core Feature Cards (Clicking directs user automatically as requested!) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Everything You Can Create & Edit on <span className="gradient-text-electric">Smart Templates</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Click on any feature below to start creating or editing instantly with AI assistance or manual tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mainFeatures.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                id={`feature-card-${feat.id}`}
                onClick={() => setActiveTab(feat.id)}
                className="relative rounded-3xl p-6 sm:p-7 bg-slate-900/80 border border-purple-500/20 hover:border-fuchsia-400 transition-all duration-300 hover:scale-[1.02] cursor-pointer group shadow-xl shadow-purple-950/30 flex flex-col justify-between overflow-hidden"
              >
                {/* Accent top border glow */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${feat.gradient}`} />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${feat.gradient} p-[2px] shadow-lg`}>
                      <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 uppercase">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold text-white group-hover:text-fuchsia-300 transition-colors">
                    {feat.title}
                  </h3>
                  <div className="text-xs font-semibold text-cyan-400 mb-2.5">
                    {feat.subtitle}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-5">
                    {feat.desc}
                  </p>

                  {/* Feature check pills */}
                  <div className="space-y-1.5 mb-6">
                    {feat.features.map((f, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="w-full py-2.5 rounded-xl bg-slate-950 border border-purple-500/30 group-hover:bg-gradient-to-r group-hover:from-fuchsia-600 group-hover:to-purple-600 group-hover:border-transparent text-xs font-bold text-white transition-all flex items-center justify-center gap-2">
                  <span>Open {feat.title}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}

          {/* Sponsorship card in grid */}
          <div
            id="feature-card-sponsorship"
            onClick={() => setActiveTab('sponsorship')}
            className="relative rounded-3xl p-6 sm:p-7 bg-gradient-to-br from-purple-950/80 via-slate-900 to-slate-950 border border-amber-500/30 hover:border-amber-400 transition-all duration-300 hover:scale-[1.02] cursor-pointer group shadow-xl shadow-amber-950/30 flex flex-col justify-between"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 p-[2px] shadow-lg">
                  <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-amber-400 group-hover:scale-110 transition-transform" />
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">
                  Partnerships
                </span>
              </div>

              <h3 className="text-lg font-extrabold text-white group-hover:text-amber-300 transition-colors">
                Sponsor & Direct Ad Placement
              </h3>
              <div className="text-xs font-semibold text-amber-400 mb-2.5">
                Support Creators or Advertise Your Brand
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-5">
                Partner with Ariel Methran. Place high-visibility ads on login forms or one-click screens. Direct payments supported via MTN & Airtel Rwanda MoMo to 0795211686.
              </p>

              <div className="space-y-1.5 mb-6">
                <div className="flex items-center gap-2 text-[11px] text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Login Form Sponsor Ads</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>One-Click Interactive Interstitials</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>MTN & Airtel Rwanda MoMo Instant Verification</span>
                </div>
              </div>
            </div>

            <button className="w-full py-2.5 rounded-xl bg-slate-950 border border-amber-500/30 group-hover:bg-gradient-to-r group-hover:from-amber-500 group-hover:to-rose-500 group-hover:border-transparent text-xs font-bold text-white transition-all flex items-center justify-center gap-2">
              <span>View Sponsorship Options</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Featured Templates Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Trending Ready-to-Use Templates
            </h2>
            <p className="text-xs text-slate-300">
              Curated by admin and generated with smart AI models
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('cv')}
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-purple-500/30 text-xs font-semibold text-purple-300 hover:text-white"
            >
              CVs
            </button>
            <button
              onClick={() => setActiveTab('pdf')}
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-purple-500/30 text-xs font-semibold text-fuchsia-300 hover:text-white"
            >
              PDFs
            </button>
            <button
              onClick={() => setActiveTab('idcard')}
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-purple-500/30 text-xs font-semibold text-cyan-300 hover:text-white"
            >
              ID Cards
            </button>
            <button
              onClick={() => setActiveTab('portfolio')}
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-purple-500/30 text-xs font-semibold text-emerald-300 hover:text-white"
            >
              Portfolios
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.slice(0, 6).map((tmpl) => (
            <div
              key={tmpl.id}
              onClick={() => setActiveTab(tmpl.category as TabType)}
              className="group rounded-2xl bg-slate-900/80 border border-purple-500/20 hover:border-fuchsia-400 overflow-hidden cursor-pointer shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative h-44 bg-slate-950 overflow-hidden">
                <img
                  src={tmpl.previewImageUrl}
                  alt={tmpl.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-slate-950/90 text-fuchsia-300 border border-fuchsia-500/40 uppercase">
                    {tmpl.category.toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="p-4 space-y-2">
                <h3 className="text-sm font-bold text-white group-hover:text-fuchsia-300 transition-colors">
                  {tmpl.title}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {tmpl.description}
                </p>
                <div className="pt-2 flex items-center justify-between text-xs font-semibold text-cyan-400">
                  <span>Use This Template</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rwanda MoMo Sponsor Banner (Active Direct Ad) */}
      {activeAd && activeAd.active && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-purple-950 via-slate-900 to-fuchsia-950 border border-purple-500/40 overflow-hidden shadow-2xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
              <div className="flex items-center gap-4">
                <img
                  src={activeAd.bannerImageUrl}
                  alt={activeAd.sponsorName}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-fuchsia-400 shrink-0"
                />
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase border border-amber-500/40 mb-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>Official Partner Spotlight</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-white">
                    {activeAd.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 max-w-xl">
                    {activeAd.description}
                  </p>
                </div>
              </div>

              <a
                href={activeAd.targetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 px-6 py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 to-cyan-500 hover:from-fuchsia-500 hover:to-cyan-400 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-purple-600/30 hover:scale-105 transition-transform"
              >
                Visit Partner Site
              </a>
            </div>
          </div>
        </section>
      )}

    </div>
  );
};
