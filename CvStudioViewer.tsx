import React, { useState, useRef } from 'react';
import { 
  UserCheck, 
  Sparkles, 
  Upload, 
  Download, 
  Plus, 
  Trash2, 
  FileCheck, 
  Image as ImageIcon, 
  Palette, 
  Briefcase, 
  GraduationCap, 
  Code, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw,
  Eye,
  Camera
} from 'lucide-react';
import { CvData, UserProfile, WorkExperience, EducationItem, CvProject } from '../types';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface CvStudioViewProps {
  initialCv: CvData;
  onSaveCv: (cv: CvData) => void;
  user: UserProfile | null;
  onRequireLogin: (intentMessage: string, onComplete: () => void) => void;
}

export const CvStudioView: React.FC<CvStudioViewProps> = ({
  initialCv,
  onSaveCv,
  user,
  onRequireLogin,
}) => {
  const [cv, setCv] = useState<CvData>(initialCv);
  const [activeTabSection, setActiveTabSection] = useState<'info' | 'experience' | 'education' | 'skills' | 'design'>('info');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiAudit, setAiAudit] = useState<any>(null);
  const [exporting, setExporting] = useState(false);
  const cvPreviewRef = useRef<HTMLDivElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const cvUploadRef = useRef<HTMLInputElement>(null);

  const updateCv = (updated: CvData) => {
    setCv(updated);
    onSaveCv(updated);
  };

  // Upload/Change Picture
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const photoUrl = event.target?.result as string;
      updateCv({ ...cv, photoUrl, updatedAt: new Date().toISOString() });
    };
    reader.readAsDataURL(file);
  };

  // Upload/Import Existing CV file
  const handleCvImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      updateCv({
        ...cv,
        fullName: file.name.replace(/\.[^/.]+$/, ''),
        summary: content.slice(0, 300) || cv.summary,
        updatedAt: new Date().toISOString(),
      });
    };
    reader.readAsText(file);
  };

  // Add work experience
  const handleAddExperience = () => {
    const newExp: WorkExperience = {
      id: `exp-${Date.now()}`,
      company: 'Innovative Company Inc',
      position: 'Senior Role Title',
      location: 'Kigali, Rwanda',
      startDate: '2024',
      endDate: 'Present',
      current: true,
      description: 'Delivered measurable milestones, optimized processes by 35%, and led high-performing engineering teams.',
    };
    updateCv({ ...cv, experiences: [newExp, ...cv.experiences], updatedAt: new Date().toISOString() });
  };

  // Add education
  const handleAddEducation = () => {
    const newEdu: EducationItem = {
      id: `edu-${Date.now()}`,
      institution: 'University / Institute Name',
      degree: 'Bachelor of Science / Diploma',
      fieldOfStudy: 'Computer Science / Business Administration',
      startDate: '2020',
      endDate: '2024',
    };
    updateCv({ ...cv, education: [...cv.education, newEdu], updatedAt: new Date().toISOString() });
  };

  // Add Skill
  const [newSkillInput, setNewSkillInput] = useState('');
  const handleAddSkill = () => {
    if (!newSkillInput.trim()) return;
    if (!cv.skills.includes(newSkillInput.trim())) {
      updateCv({ ...cv, skills: [...cv.skills, newSkillInput.trim()], updatedAt: new Date().toISOString() });
    }
    setNewSkillInput('');
  };

  const handleRemoveSkill = (skill: string) => {
    updateCv({ ...cv, skills: cv.skills.filter((s) => s !== skill), updatedAt: new Date().toISOString() });
  };

  // 1. AI Summary & Bullet Point Enhancer
  const handleAiEnhanceSummary = async () => {
    setAiLoading(true);
    try {
      const res = await fetch('/api/ai/write', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Enhance and polish this CV profile summary for ${cv.fullName}, role: ${cv.jobTitle}. Skills: ${cv.skills.join(', ')}. Keep it high-impact in 3-4 sentences.`,
          type: 'CV Summary',
        }),
      });
      const data = await res.json();
      if (data.text) {
        updateCv({ ...cv, summary: data.text, updatedAt: new Date().toISOString() });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setAiLoading(false);
    }
  };

  // 2. AI Checking (Mistakes, Commas, Full Stops & Missing Picture/Contact reminder)
  const handleAiCheck = async () => {
    setAiLoading(true);
    try {
      const res = await fetch('/api/ai/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          docType: 'CV / Resume',
          content: {
            fullName: cv.fullName,
            jobTitle: cv.jobTitle,
            email: cv.email,
            phone: cv.phone,
            summary: cv.summary,
            experiences: cv.experiences,
            skills: cv.skills,
          },
          metadata: {
            hasPhoto: !!cv.photoUrl,
            hasPhone: !!cv.phone,
            hasEmail: !!cv.email,
            experienceCount: cv.experiences.length,
          },
        }),
      });
      const data = await res.json();
      if (data.result) {
        setAiAudit(data.result);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setAiLoading(false);
    }
  };

  // 3. Download PDF (with login gate check!)
  const executeDownloadPdf = async () => {
    if (!cvPreviewRef.current) return;
    setExporting(true);
    try {
      const canvas = await html2canvas(cvPreviewRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#090d16',
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${cv.fullName.toLowerCase().replace(/\s+/g, '_')}_cv.pdf`);
    } catch (err) {
      console.error('Export error:', err);
    } finally {
      setExporting(false);
    }
  };

  const handleDownloadClick = () => {
    if (!user) {
      onRequireLogin('Please sign in or create an account to download high-resolution CV documents.', () => {
        executeDownloadPdf();
      });
    } else {
      executeDownloadPdf();
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pb-16">
      
      {/* Top Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-3xl bg-slate-900/80 border border-purple-500/30 shadow-xl shadow-purple-950/20 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-fuchsia-600 via-purple-600 to-cyan-400 p-[2px]">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-fuchsia-400" />
            </div>
          </div>
          <div>
            <h1 className="text-lg font-black text-white flex items-center gap-2">
              <span>CV & Resume Builder</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase">
                ATS & Visual
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              Editing: <span className="text-white font-semibold">{cv.fullName}</span> • {cv.jobTitle}
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Upload CV file */}
          <input
            type="file"
            ref={cvUploadRef}
            onChange={handleCvImport}
            accept=".txt,.pdf,.doc,.docx"
            className="hidden"
          />
          <button
            onClick={() => cvUploadRef.current?.click()}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 hover:text-white flex items-center gap-1.5 border border-slate-700"
          >
            <Upload className="w-3.5 h-3.5 text-cyan-400" />
            <span>Upload Existing CV</span>
          </button>

          <button
            onClick={handleAiCheck}
            disabled={aiLoading}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-xs font-bold text-white flex items-center gap-1.5 shadow-md shadow-purple-600/30"
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>AI Checking</span>
          </button>

          <button
            id="btn-download-cv"
            onClick={handleDownloadClick}
            disabled={exporting}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-fuchsia-600 via-purple-600 to-cyan-500 hover:from-fuchsia-500 hover:to-cyan-400 text-xs font-extrabold text-white flex items-center gap-1.5 shadow-lg shadow-purple-600/30 hover:scale-105 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{exporting ? 'Exporting PDF...' : 'Download CV'}</span>
          </button>
        </div>
      </div>

      {/* Main Layout: Editor on left (5 cols), Live Printable CV on right (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Interactive Editor (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Section Navigation Pills */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-900/90 border border-purple-500/20 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTabSection('info')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTabSection === 'info' ? 'bg-fuchsia-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTabSection('experience')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTabSection === 'experience' ? 'bg-fuchsia-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Experience
            </button>
            <button
              onClick={() => setActiveTabSection('education')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTabSection === 'education' ? 'bg-fuchsia-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Education
            </button>
            <button
              onClick={() => setActiveTabSection('skills')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTabSection === 'skills' ? 'bg-fuchsia-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Skills
            </button>
            <button
              onClick={() => setActiveTabSection('design')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTabSection === 'design' ? 'bg-fuchsia-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Theme & Style
            </button>
          </div>

          {/* Tab 1: Personal Info & Photo */}
          {activeTabSection === 'info' && (
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-purple-500/20 space-y-4 animate-in fade-in">
              <div className="flex items-center gap-4">
                <div className="relative group">
                  {cv.photoUrl ? (
                    <img
                      src={cv.photoUrl}
                      alt={cv.fullName}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-fuchsia-400 shadow-md"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-dashed border-purple-400/50 flex flex-col items-center justify-center text-slate-500 text-[10px]">
                      <Camera className="w-5 h-5 mb-0.5 text-fuchsia-400" />
                      <span>No Photo</span>
                    </div>
                  )}
                  
                  <input
                    type="file"
                    ref={photoInputRef}
                    onChange={handlePhotoUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    onClick={() => photoInputRef.current?.click()}
                    className="mt-1.5 w-full text-[10px] font-bold text-fuchsia-400 hover:text-fuchsia-300 block text-center"
                  >
                    {cv.photoUrl ? 'Change Picture' : 'Upload Picture'}
                  </button>
                </div>

                <div className="flex-1 space-y-2">
                  <span className="text-xs font-bold text-slate-200">
                    Profile Photo Settings
                  </span>
                  <p className="text-[11px] text-slate-400 leading-tight">
                    You can upload your photo or skip it. If you perform AI checking, it will gently remind you if a picture is missing.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={cv.fullName}
                    onChange={(e) => updateCv({ ...cv, fullName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-fuchsia-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Job Title / Profession
                  </label>
                  <input
                    type="text"
                    value={cv.jobTitle}
                    onChange={(e) => updateCv({ ...cv, jobTitle: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-fuchsia-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={cv.email}
                    onChange={(e) => updateCv({ ...cv, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-fuchsia-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={cv.phone}
                    onChange={(e) => updateCv({ ...cv, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-fuchsia-400"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Address / Location
                  </label>
                  <input
                    type="text"
                    value={cv.address}
                    onChange={(e) => updateCv({ ...cv, address: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-fuchsia-400"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-semibold text-slate-300">
                    Professional Summary
                  </label>
                  <button
                    onClick={handleAiEnhanceSummary}
                    disabled={aiLoading}
                    className="text-[10px] font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>AI Polish Summary</span>
                  </button>
                </div>
                <textarea
                  rows={4}
                  value={cv.summary}
                  onChange={(e) => updateCv({ ...cv, summary: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-fuchsia-400 leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* Tab 2: Work Experience */}
          {activeTabSection === 'experience' && (
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-purple-500/20 space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Work History ({cv.experiences.length})
                </span>
                <button
                  onClick={handleAddExperience}
                  className="px-2.5 py-1.5 rounded-xl bg-purple-600/30 hover:bg-purple-600 text-purple-300 hover:text-white text-xs font-bold flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Experience</span>
                </button>
              </div>

              <div className="space-y-3">
                {cv.experiences.map((exp, idx) => (
                  <div
                    key={exp.id}
                    className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 relative group"
                  >
                    <button
                      onClick={() =>
                        updateCv({
                          ...cv,
                          experiences: cv.experiences.filter((e) => e.id !== exp.id),
                          updatedAt: new Date().toISOString(),
                        })
                      }
                      className="absolute top-3 right-3 text-slate-500 hover:text-rose-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="grid grid-cols-2 gap-2 pr-6">
                      <input
                        type="text"
                        value={exp.position}
                        onChange={(e) => {
                          const updated = [...cv.experiences];
                          updated[idx].position = e.target.value;
                          updateCv({ ...cv, experiences: updated });
                        }}
                        placeholder="Job Title"
                        className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-bold"
                      />
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => {
                          const updated = [...cv.experiences];
                          updated[idx].company = e.target.value;
                          updateCv({ ...cv, experiences: updated });
                        }}
                        placeholder="Company Name"
                        className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={exp.startDate}
                        onChange={(e) => {
                          const updated = [...cv.experiences];
                          updated[idx].startDate = e.target.value;
                          updateCv({ ...cv, experiences: updated });
                        }}
                        placeholder="Start Date (e.g. 2022)"
                        className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-[11px] text-slate-300"
                      />
                      <input
                        type="text"
                        value={exp.endDate}
                        onChange={(e) => {
                          const updated = [...cv.experiences];
                          updated[idx].endDate = e.target.value;
                          updateCv({ ...cv, experiences: updated });
                        }}
                        placeholder="End Date (e.g. Present)"
                        className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-[11px] text-slate-300"
                      />
                    </div>

                    <textarea
                      rows={2}
                      value={exp.description}
                      onChange={(e) => {
                        const updated = [...cv.experiences];
                        updated[idx].description = e.target.value;
                        updateCv({ ...cv, experiences: updated });
                      }}
                      placeholder="Bullet achievements and tasks..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-slate-300 focus:outline-none focus:border-fuchsia-400 resize-none"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Education */}
          {activeTabSection === 'education' && (
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-purple-500/20 space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Education & Degrees ({cv.education.length})
                </span>
                <button
                  onClick={handleAddEducation}
                  className="px-2.5 py-1.5 rounded-xl bg-purple-600/30 hover:bg-purple-600 text-purple-300 hover:text-white text-xs font-bold flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add School</span>
                </button>
              </div>

              <div className="space-y-3">
                {cv.education.map((edu, idx) => (
                  <div
                    key={edu.id}
                    className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 relative group"
                  >
                    <button
                      onClick={() =>
                        updateCv({
                          ...cv,
                          education: cv.education.filter((e) => e.id !== edu.id),
                          updatedAt: new Date().toISOString(),
                        })
                      }
                      className="absolute top-3 right-3 text-slate-500 hover:text-rose-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => {
                        const updated = [...cv.education];
                        updated[idx].institution = e.target.value;
                        updateCv({ ...cv, education: updated });
                      }}
                      placeholder="University or College"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-bold"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => {
                          const updated = [...cv.education];
                          updated[idx].degree = e.target.value;
                          updateCv({ ...cv, education: updated });
                        }}
                        placeholder="Degree / Qualification"
                        className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                      />
                      <input
                        type="text"
                        value={edu.fieldOfStudy}
                        onChange={(e) => {
                          const updated = [...cv.education];
                          updated[idx].fieldOfStudy = e.target.value;
                          updateCv({ ...cv, education: updated });
                        }}
                        placeholder="Field of Study"
                        className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Skills */}
          {activeTabSection === 'skills' && (
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-purple-500/20 space-y-4 animate-in fade-in">
              <span className="text-xs font-bold text-white uppercase tracking-wider block">
                Skills & Technologies ({cv.skills.length})
              </span>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newSkillInput}
                  onChange={(e) => setNewSkillInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
                  placeholder="e.g. JavaScript, Design, Leadership..."
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-fuchsia-400"
                />
                <button
                  onClick={handleAddSkill}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 text-xs font-bold text-white"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {cv.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/30 text-xs text-purple-200 font-medium"
                  >
                    <span>{skill}</span>
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-purple-400 hover:text-rose-400"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tab 5: Color Schemes & Templates */}
          {activeTabSection === 'design' && (
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-purple-500/20 space-y-4 animate-in fade-in">
              <span className="text-xs font-bold text-white uppercase tracking-wider block">
                CV Colorway & Layout Theme
              </span>

              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { id: 'modern-vibrant', label: 'Vibrant Neon', p: '#8b5cf6', a: '#ec4899' },
                  { id: 'executive-clean', label: 'Executive Blue', p: '#0284c7', a: '#06b6d4' },
                  { id: 'creative-glow', label: 'Emerald Mint', p: '#10b981', a: '#3b82f6' },
                  { id: 'minimalist-dark', label: 'Sunset Amber', p: '#f59e0b', a: '#ef4444' },
                ].map((th) => (
                  <button
                    key={th.id}
                    onClick={() =>
                      updateCv({
                        ...cv,
                        templateId: th.id as any,
                        primaryColor: th.p,
                        accentColor: th.a,
                        updatedAt: new Date().toISOString(),
                      })
                    }
                    className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                      cv.templateId === th.id
                        ? 'bg-purple-950/80 border-fuchsia-400 ring-2 ring-fuchsia-400'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-xs font-bold text-white">{th.label}</span>
                    <div className="flex items-center gap-1">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: th.p }} />
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: th.a }} />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* AI Checking Feedback Box */}
          {aiAudit && (
            <div className="p-4 rounded-2xl bg-slate-900 border border-emerald-500/40 space-y-3 animate-in slide-in-from-top-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>AI CV Quality & Mistake Audit</span>
                </span>
                <span className="text-xs font-black text-emerald-300">
                  Rating: {aiAudit.score}/100
                </span>
              </div>

              {/* Missing items reminder (Requested requirement) */}
              {aiAudit.missingItems?.length > 0 && (
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-300 space-y-1">
                  <span className="font-bold flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Missing Items Reminder:</span>
                  </span>
                  {aiAudit.missingItems.map((m: string, idx: number) => (
                    <div key={idx} className="pl-2">
                      • {m}
                    </div>
                  ))}
                </div>
              )}

              {/* Punctuation and commas */}
              {aiAudit.punctuationMistakes?.length > 0 && (
                <div className="text-[11px] text-slate-300 space-y-1">
                  <span className="font-semibold text-purple-300">Punctuation & Grammar:</span>
                  {aiAudit.punctuationMistakes.map((p: string, idx: number) => (
                    <div key={idx} className="pl-2 border-l border-purple-500/40 text-slate-300">
                      • {p}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Side: Live Printable Resume Preview (7 cols) */}
        <div className="lg:col-span-7">
          <div className="sticky top-24">
            <div className="text-xs font-semibold text-slate-400 mb-2 flex items-center justify-between">
              <span>Printable Resume Sheet Preview (A4)</span>
              <span className="text-[10px] text-fuchsia-400 font-bold">Auto-syncing changes</span>
            </div>

            <div
              ref={cvPreviewRef}
              className="w-full min-h-[680px] bg-slate-950 border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden"
              style={{
                boxShadow: '0 20px 50px -10px rgba(139, 92, 246, 0.25)',
              }}
            >
              {/* Header section with photo, name, title, contacts */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
                <div className="flex items-center gap-4">
                  {cv.photoUrl ? (
                    <img
                      src={cv.photoUrl}
                      alt={cv.fullName}
                      className="w-20 h-20 rounded-2xl object-cover border-2 shadow-lg"
                      style={{ borderColor: cv.primaryColor }}
                    />
                  ) : (
                    <div
                      className="w-20 h-20 rounded-2xl flex items-center justify-center text-xl font-bold text-white shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, ${cv.primaryColor}, ${cv.accentColor})`,
                      }}
                    >
                      {cv.fullName.charAt(0)}
                    </div>
                  )}

                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-white">
                      {cv.fullName}
                    </h2>
                    <div
                      className="text-xs font-bold tracking-wide mt-0.5"
                      style={{ color: cv.accentColor }}
                    >
                      {cv.jobTitle}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-[11px] text-slate-400">
                      {cv.email && (
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          <span>{cv.email}</span>
                        </span>
                      )}
                      {cv.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          <span>{cv.phone}</span>
                        </span>
                      )}
                      {cv.address && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{cv.address}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Summary */}
              {cv.summary && (
                <div className="space-y-1.5">
                  <h3
                    className="text-xs font-black uppercase tracking-wider"
                    style={{ color: cv.primaryColor }}
                  >
                    Professional Profile
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {cv.summary}
                  </p>
                </div>
              )}

              {/* Work Experience */}
              {cv.experiences.length > 0 && (
                <div className="space-y-3">
                  <h3
                    className="text-xs font-black uppercase tracking-wider"
                    style={{ color: cv.primaryColor }}
                  >
                    Experience History
                  </h3>
                  <div className="space-y-3">
                    {cv.experiences.map((exp) => (
                      <div key={exp.id} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-white">{exp.position}</span>
                          <span className="text-[11px] text-slate-400">
                            {exp.startDate} - {exp.endDate}
                          </span>
                        </div>
                        <div className="text-[11px] font-semibold text-cyan-400">
                          {exp.company} • {exp.location}
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {exp.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {cv.education.length > 0 && (
                <div className="space-y-2.5">
                  <h3
                    className="text-xs font-black uppercase tracking-wider"
                    style={{ color: cv.primaryColor }}
                  >
                    Education & Credentials
                  </h3>
                  <div className="space-y-2">
                    {cv.education.map((edu) => (
                      <div key={edu.id} className="flex items-center justify-between text-xs">
                        <div>
                          <div className="font-bold text-white">{edu.institution}</div>
                          <div className="text-[11px] text-slate-400">
                            {edu.degree} in {edu.fieldOfStudy}
                          </div>
                        </div>
                        <span className="text-[11px] text-slate-400">
                          {edu.startDate} - {edu.endDate}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills tags */}
              {cv.skills.length > 0 && (
                <div className="space-y-2">
                  <h3
                    className="text-xs font-black uppercase tracking-wider"
                    style={{ color: cv.primaryColor }}
                  >
                    Key Competencies
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {cv.skills.map((s, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-semibold text-white bg-slate-900 border border-slate-800"
                        style={{ borderLeft: `3px solid ${cv.accentColor}` }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom tag */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500">
                <span>Created via Smart Templates • ATS Verified</span>
                <span>smarttemplate.com/cv</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
