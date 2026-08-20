export type TabType = 
  | 'home' 
  | 'pdf' 
  | 'cv' 
  | 'portfolio' 
  | 'idcard' 
  | 'picture' 
  | 'sponsorship' 
  | 'support' 
  | 'personal' 
  | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  mobileNumber: string;
  avatarUrl?: string;
  role: 'user' | 'admin';
  bio?: string;
  createdAt: string;
  instagramHandle?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'info' | 'success' | 'alert' | 'sponsor';
  linkTab?: TabType;
}

/* ==================== PDF DOC MODELS ==================== */
export interface PdfBlock {
  id: string;
  type: 'heading' | 'paragraph' | 'bullet-list' | 'image' | 'callout' | 'table' | 'signature';
  content: string;
  fontSize?: number;
  textColor?: string;
  bgColor?: string;
  align?: 'left' | 'center' | 'right' | 'justify';
  bold?: boolean;
  italic?: boolean;
  imageUrl?: string;
  imageCaption?: string;
}

export interface PdfDocument {
  id: string;
  title: string;
  category: 'business' | 'contract' | 'report' | 'academic' | 'letter' | 'custom';
  author: string;
  date: string;
  themeColor: string;
  blocks: PdfBlock[];
  summary?: string;
  aiChecked?: boolean;
  aiCheckNotes?: string[];
  updatedAt: string;
}

/* ==================== CV / RESUME MODELS ==================== */
export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  grade?: string;
}

export interface CvProject {
  id: string;
  name: string;
  description: string;
  link?: string;
  tools?: string;
}

export interface CvData {
  id: string;
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  address: string;
  website?: string;
  linkedin?: string;
  github?: string;
  photoUrl?: string;
  summary: string;
  experiences: WorkExperience[];
  education: EducationItem[];
  skills: string[];
  projects: CvProject[];
  languages: string[];
  certifications: string[];
  templateId: 'modern-vibrant' | 'executive-clean' | 'creative-glow' | 'minimalist-dark' | 'tech-neon';
  primaryColor: string;
  accentColor: string;
  aiChecked?: boolean;
  aiFeedback?: {
    score: number;
    suggestions: string[];
    missingItems: string[];
    grammarFixes: string[];
  };
  updatedAt: string;
}

/* ==================== PORTFOLIO MODELS ==================== */
export interface PortfolioData {
  id: string;
  username: string; // e.g. 'ariel' -> ariel.smarttemplate.com
  fullName: string;
  nickname: string;
  title: string;
  bio: string;
  address: string;
  email: string;
  phone: string;
  photoUrl: string;
  instagramHandle: string;
  // What they like / preferences
  preferences: {
    favoriteFood: string;
    favoriteSong: string;
    favoriteArtist: string;
    favoriteMovie: string;
    hobbies: string;
    quote: string;
  };
  skills: string[];
  galleryImages: {
    id: string;
    url: string;
    title: string;
    category?: string;
  }[];
  socialLinks: {
    platform: 'instagram' | 'twitter' | 'github' | 'linkedin' | 'tiktok' | 'youtube' | 'whatsapp';
    url: string;
    handle: string;
  }[];
  theme: 'vibrant-aurora' | 'cyber-sunset' | 'emerald-minimal' | 'candy-pop';
  customSubdomain: string;
  instagramSynced: boolean;
  updatedAt: string;
}

/* ==================== ID CARD MODELS ==================== */
export interface IdCardItem {
  id: string;
  fullName: string;
  idNumber: string;
  cardType: 'student' | 'staff' | 'member';
  roleOrClass: string; // e.g. "Senior Software Eng" or "Grade 12 - Physics"
  departmentOrSchool: string; // e.g. "Computer Science Dept" or "Kigali Tech Academy"
  validUntil: string;
  issueDate: string;
  photoUrl: string;
  bloodGroup?: string;
  emergencyPhone?: string;
  barcode: string;
}

export interface IdCardBatchItem {
  id: string;
  name?: string;
  holderName?: string;
  role?: string;
  roleTitle?: string;
  idNumber?: string;
  photoUrl?: string;
  department?: string;
}

export interface IdCardProject {
  id: string;
  mode: 'personal' | 'company' | 'single' | 'company_batch';
  organizationName: string;
  organizationLogoUrl: string; // badge or emblem
  templateStyle?: 'modern-vertical' | 'corporate-horizontal' | 'cyber-badge' | 'academic-classic';
  primaryColor: string;
  secondaryColor?: string;
  accentColor?: string;
  cards?: IdCardItem[];
  activeCardIndex?: number;
  updatedAt: string;
  // Single card field fallbacks
  holderName?: string;
  idNumber?: string;
  roleOrGrade?: string;
  department?: string;
  issueDate?: string;
  expiryDate?: string;
  photoUrl?: string;
  barcode?: string;
  batchItems?: IdCardBatchItem[];
  batchList?: IdCardBatchItem[];
}

export type IdCardData = IdCardProject;

/* ==================== PICTURE EDITOR MODELS ==================== */
export interface PictureProject {
  id: string;
  title: string;
  currentImageUrl: string;
  originalImageUrl: string;
  filters: {
    name: string;
    brightness: number;
    contrast: number;
    saturation: number;
    smoothLevel: number;
    warmth?: number;
  };
  updatedAt: string;
}

export interface PictureEditorState {
  imageUrl: string;
  originalImageUrl: string;
  brightness: number; // 0 - 200 (100 is normal)
  contrast: number; // 0 - 200 (100 is normal)
  saturation: number; // 0 - 200 (100 is normal)
  blur: number; // 0 - 20
  sepia: number; // 0 - 100
  grayscale: number; // 0 - 100
  hueRotate: number; // 0 - 360
  invert: number; // 0 - 100
  smoothing: number; // 0 - 100 (AI smoothing level)
  rotation: number; // 0, 90, 180, 270
  flipHorizontal: boolean;
  flipVertical: boolean;
  activeFilter: 'none' | 'vibrant' | 'vintage' | 'noir' | 'warm-sun' | 'cool-mint' | 'cyber-neon' | 'pastel' | 'golden-hour';
  activeFrame: 'none' | 'rainbow-border' | 'neon-glow' | 'polaroid' | 'cyber-box' | 'badge-ring';
  cropAspect?: 'free' | '1:1' | '4:5' | '16:9' | 'passport';
}

/* ==================== SPONSORSHIP & ADS MODELS ==================== */
export interface SponsorAd {
  id: string;
  sponsorName: string;
  title: string;
  description: string;
  bannerImageUrl: string;
  targetUrl: string;
  placement: 'login_form' | 'one_click' | 'banner' | 'sidebar';
  active: boolean;
  momoPayerPhone?: string;
  momoReference?: string;
  momoStatus?: 'paid' | 'pending';
  amountRwF?: number;
  paidAmount?: string;
  paymentConfirmed?: boolean;
  startDate?: string;
  endDate?: string;
  clicks?: number;
  clicksCount?: number;
  createdAt?: string;
}

export interface SocialLinkSetting {
  id: string;
  platform: 'instagram' | 'twitter' | 'whatsapp' | 'youtube' | 'tiktok' | 'linkedin' | 'facebook' | 'telegram';
  handle: string;
  url: string;
  active: boolean;
  followersCount?: string;
}

export interface CustomTemplate {
  id: string;
  category: 'pdf' | 'cv' | 'portfolio' | 'idcard' | 'picture';
  title: string;
  description: string;
  previewImageUrl: string;
  isAiGenerated?: boolean;
  isFeatured?: boolean;
  tags?: string[];
  data?: any;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  actions?: {
    label: string;
    tab?: TabType;
    actionPayload?: any;
  }[];
}
