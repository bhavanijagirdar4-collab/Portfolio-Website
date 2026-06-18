import React, { useState } from 'react';
import { usePortfolio, EducationItem, ResumeProject } from '../context/PortfolioContext';
import { 
  Settings, X, RotateCcw, Save, Trash2, Plus, 
  User, Github, Award, GraduationCap, CheckCircle, 
  MapPin, Mail, Phone, Code, BookOpen, Layers, Edit2, Check, Image, Upload
} from 'lucide-react';

export default function DynamicSettings() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'skills' | 'education'>('profile');
  const { portfolioData, updatePortfolioData, resetPortfolioData } = usePortfolio();

  // Local working state initialized from context when drawer opens
  const [localData, setLocalData] = useState(portfolioData);
  const [newSkill, setNewSkill] = useState('');
  const [newCertTitle, setNewCertTitle] = useState('');
  const [newCertYear, setNewCertYear] = useState('');
  const [newLang, setNewLang] = useState('');

  // Proj/Repo state inputs
  const [newProjUser, setNewProjUser] = useState('');
  const [newProjRepo, setNewProjRepo] = useState('');
  const [newProjTitle, setNewProjTitle] = useState('');
  const [newProjPeriod, setNewProjPeriod] = useState('');
  const [newProjTech, setNewProjTech] = useState('');
  const [newProjDesc, setNewProjDesc] = useState('');
  const [newProjDeployed, setNewProjDeployed] = useState('');

  // Suffix/prefix helpers
  const handleOpen = () => {
    setLocalData(portfolioData);
    setIsOpen(true);
  };

  const handleSave = () => {
    updatePortfolioData(localData);
    setIsOpen(false);
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all portfolio customization back to Bhavani's defaults?")) {
      resetPortfolioData();
      setLocalData(portfolioData);
      setIsOpen(false);
    }
  };

  const updatePersonalInfo = (key: string, value: any) => {
    setLocalData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [key]: value
      }
    }));
  };

  const handleLocalImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        alert("For best performance and storage efficiency, please select an image under 3MB.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result;
        if (typeof dataUrl === 'string') {
          updatePersonalInfo('avatarUrl', dataUrl);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const updateSocials = (key: string, value: string) => {
    setLocalData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        socials: {
          ...prev.personalInfo.socials,
          [key]: value
        }
      }
    }));
  };

  const addProjectCard = () => {
    if (newProjUser.trim() && newProjRepo.trim()) {
      setLocalData(prev => ({
        ...prev,
        githubRepos: [
          ...(prev.githubRepos || []),
          {
            id: `repo-${Date.now()}`,
            username: newProjUser.trim(),
            repo: newProjRepo.trim(),
            title: newProjTitle.trim() || newProjRepo.trim(),
            period: newProjPeriod.trim() || 'Ongoing',
            techStack: newProjTech.trim() || 'Java, React, SQL',
            description: newProjDesc.trim() || 'A personal development repository.',
            deployedLink: newProjDeployed.trim()
          }
        ]
      }));
      setNewProjUser('');
      setNewProjRepo('');
      setNewProjTitle('');
      setNewProjPeriod('');
      setNewProjTech('');
      setNewProjDesc('');
      setNewProjDeployed('');
    }
  };

  const removeProjectCard = (id: string) => {
    setLocalData(prev => ({
      ...prev,
      githubRepos: (prev.githubRepos || []).filter(item => item.id !== id)
    }));
  };

  const updateProjectCard = (id: string, field: string, value: string) => {
    setLocalData(prev => ({
      ...prev,
      githubRepos: (prev.githubRepos || []).map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  // Skills
  const addSkill = () => {
    if (newSkill.trim() && !localData.skillsList.includes(newSkill.trim())) {
      setLocalData(prev => ({
        ...prev,
        skillsList: [...prev.skillsList, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setLocalData(prev => ({
      ...prev,
      skillsList: prev.skillsList.filter(s => s !== skill)
    }));
  };

  // Education Item update
  const updateEducationItem = (id: string, field: keyof EducationItem, value: string) => {
    setLocalData(prev => ({
      ...prev,
      education: prev.education.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  // Resume projects update
  const updateResumeProject = (id: string, field: keyof ResumeProject, value: any) => {
    setLocalData(prev => ({
      ...prev,
      resumeProjects: prev.resumeProjects.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const updateResumeProjectBullet = (projId: string, index: number, value: string) => {
    const project = localData.resumeProjects.find(p => p.id === projId);
    if (project) {
      const updatedBullets = [...project.bulletPoints];
      updatedBullets[index] = value;
      updateResumeProject(projId, 'bulletPoints', updatedBullets);
    }
  };

  const addResumeProjectBullet = (projId: string) => {
    const project = localData.resumeProjects.find(p => p.id === projId);
    if (project) {
      const updatedBullets = [...project.bulletPoints, "New bullet point description."];
      updateResumeProject(projId, 'bulletPoints', updatedBullets);
    }
  };

  const removeResumeProjectBullet = (projId: string, index: number) => {
    const project = localData.resumeProjects.find(p => p.id === projId);
    if (project) {
      const updatedBullets = project.bulletPoints.filter((_, idx) => idx !== index);
      updateResumeProject(projId, 'bulletPoints', updatedBullets);
    }
  };

  // Certifications
  const addCert = () => {
    if (newCertTitle.trim() && newCertYear.trim()) {
      setLocalData(prev => ({
        ...prev,
        certifications: [...prev.certifications, { title: newCertTitle.trim(), year: newCertYear.trim() }]
      }));
      setNewCertTitle('');
      setNewCertYear('');
    }
  };

  const removeCert = (index: number) => {
    setLocalData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, idx) => idx !== index)
    }));
  };

  // Languages
  const addLanguage = () => {
    if (newLang.trim() && !localData.languages.includes(newLang.trim())) {
      setLocalData(prev => ({
        ...prev,
        languages: [...prev.languages, newLang.trim()]
      }));
      setNewLang('');
    }
  };

  const removeLanguage = (lang: string) => {
    setLocalData(prev => ({
      ...prev,
      languages: prev.languages.filter(l => l !== lang)
    }));
  };

  return (
    <>
      {/* Floating Gear Button in corner */}
      <button
        onClick={handleOpen}
        id="open-customizer"
        className="fixed bottom-6 left-6 z-40 px-4 py-3 bg-indigo-600/90 text-white rounded-full flex items-center gap-2 hover:bg-indigo-500 hover:shadow-2xl active:scale-95 transition-all text-xs font-mono font-bold tracking-wide cursor-pointer border border-white/15 backdrop-blur-sm"
        title="Customize Portfolio Content dynamically"
      >
        <Settings size={16} className="animate-spin-slow" />
        <span>Portfolio Customizer</span>
      </button>

      {/* Slide-out Customizer Drawer Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex" id="customizer-panel">
          {/* Backdrop blur overlay */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer container body */}
          <div className="relative w-full max-w-xl bg-slate-900 border-l border-white/10 shadow-2xl h-full flex flex-col z-10 ml-auto text-slate-200">
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-slate-950">
              <div className="flex items-center gap-2">
                <Settings className="text-indigo-400" size={20} />
                <h2 className="text-lg font-bold font-sans text-white">Live Customizer Workspace</h2>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content Tabs Navigation */}
            <div className="flex border-b border-white/5 bg-slate-950 text-xs font-mono font-bold tracking-wide">
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex-1 py-3 text-center border-b-2 hover:text-white transition-colors ${activeTab === 'profile' ? 'border-indigo-500 text-indigo-400 bg-white/5' : 'border-transparent text-slate-400'}`}
              >
                Profile
              </button>
              <button
                onClick={() => setActiveTab('projects')}
                className={`flex-1 py-3 text-center border-b-2 hover:text-white transition-colors ${activeTab === 'projects' ? 'border-indigo-500 text-indigo-400 bg-white/5' : 'border-transparent text-slate-400'}`}
              >
                Projects
              </button>
              <button
                onClick={() => setActiveTab('skills')}
                className={`flex-1 py-3 text-center border-b-2 hover:text-white transition-colors ${activeTab === 'skills' ? 'border-indigo-500 text-indigo-400 bg-white/5' : 'border-transparent text-slate-400'}`}
              >
                Skills
              </button>
              <button
                onClick={() => setActiveTab('education')}
                className={`flex-1 py-3 text-center border-b-2 hover:text-white transition-colors ${activeTab === 'education' ? 'border-indigo-500 text-indigo-400 bg-white/5' : 'border-transparent text-slate-400'}`}
              >
                Academic
              </button>

            </div>

            {/* Drawer working forms - scrollable area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 focus:outline-none">
              
              {/* Profile Config tab */}
              {activeTab === 'profile' && (
                <div className="space-y-4 animate-fade-in text-left">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest border-b border-white/5 pb-2 mb-3">
                    <User size={13} />
                    <span>Personal Metadata</span>
                  </div>

                  {/* Profile Photo / Avatar editor */}
                  <div className="p-4 bg-slate-950 border border-white/5 rounded-2xl space-y-4">
                    <div className="flex items-center gap-2">
                      <Image size={15} className="text-indigo-400" />
                      <span className="text-xs font-bold font-mono tracking-wider text-indigo-400 uppercase">
                        Profile Image / Artwork Settings
                      </span>
                    </div>

                    <div className="flex gap-4 items-center">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden border border-white/25 bg-slate-900 shrink-0">
                        <img
                          src={localData.personalInfo.avatarUrl && localData.personalInfo.avatarUrl.trim() ? localData.personalInfo.avatarUrl : "/src/assets/images/developer_avatar_1781419595596.jpg"}
                          alt="Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80";
                          }}
                        />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-550 font-mono uppercase mb-1">
                            Choose Photo File
                          </label>
                          <div className="flex gap-2">
                            <label className="flex items-center gap-2 cursor-pointer bg-indigo-600 hover:bg-indigo-500 text-white font-mono font-bold text-[10px] uppercase px-3 py-1.5 rounded-xl transition-all shadow-sm active:scale-95">
                              <Upload size={12} />
                              <span>From Computer</span>
                              <input
                                id="local-avatar-file-input"
                                type="file"
                                accept="image/*"
                                onChange={handleLocalImageUpload}
                                className="hidden"
                              />
                            </label>
                            
                            {localData.personalInfo.avatarUrl && (
                              <button
                                type="button"
                                onClick={() => updatePersonalInfo('avatarUrl', '')}
                                className="bg-slate-900 hover:bg-slate-850 text-rose-450 border border-white/5 hover:border-rose-500/20 font-mono font-bold text-[10px] uppercase px-3 py-1.5 rounded-xl transition-all cursor-pointer"
                              >
                                Reset Photo
                              </button>
                            )}
                          </div>
                        </div>

                        <div>
                          <label className="block text-[9px] font-bold text-slate-600 font-mono uppercase">
                            Or paste custom image URL
                          </label>
                          <input
                            type="text"
                            placeholder="https://images.unsplash.com/..."
                            value={localData.personalInfo.avatarUrl || ''}
                            onChange={(e) => updatePersonalInfo('avatarUrl', e.target.value)}
                            className="w-full bg-slate-900 border border-white/10 rounded-xl px-2.5 py-1 text-[11px] text-white font-mono focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-650"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Preselected Creative Presets */}
                    <div>
                      <span className="block text-[9px] font-bold text-slate-500 mb-2 font-mono uppercase">
                        Or select a designer preset artwork
                      </span>
                      <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                        {/* Option 1: Original upload */}
                        <button
                          type="button"
                          onClick={() => updatePersonalInfo('avatarUrl', '')}
                          className={`relative aspect-square rounded-xl overflow-hidden border transition-all cursor-pointer ${
                            !localData.personalInfo.avatarUrl || localData.personalInfo.avatarUrl.trim() === ''
                              ? 'border-indigo-500 ring-2 ring-indigo-500/20'
                              : 'border-white/10 hover:border-white/20'
                          }`}
                          title="Original Portrait"
                        >
                          <div className="w-full h-full bg-indigo-950 flex flex-col items-center justify-center text-[8px] font-mono font-bold text-indigo-300">
                            <span>Original</span>
                            <span className="text-[7px] text-slate-400">Photo</span>
                          </div>
                        </button>

                        {[
                          {
                            name: "Neon Code",
                            url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=250&q=80",
                          },
                          {
                            name: "Minimal Abstract",
                            url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=250&q=80",
                          },
                          {
                            name: "Vibrant Waves",
                            url: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=250&q=80",
                          },
                          {
                            name: "Geometry",
                            url: "https://images.unsplash.com/photo-1618005198143-e5283b519a7f?auto=format&fit=crop&w=250&q=80",
                          },
                          {
                            name: "Cyberpunk Tech",
                            url: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=250&q=80",
                          },
                          {
                            name: "Minimalist Pastel",
                            url: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=250&q=80",
                          }
                        ].map((preset, index) => (
                          <button
                            type="button"
                            key={index}
                            onClick={() => updatePersonalInfo('avatarUrl', preset.url)}
                            className={`relative aspect-square rounded-xl overflow-hidden border transition-all cursor-pointer ${
                              localData.personalInfo.avatarUrl === preset.url
                                ? 'border-indigo-500 ring-2 ring-indigo-500/20'
                                : 'border-white/10 hover:border-white/20'
                            }`}
                            title={preset.name}
                          >
                            <img
                              src={preset.url}
                              alt={preset.name}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1 font-mono">Full Name</label>
                      <input 
                        type="text" 
                        value={localData.personalInfo.name} 
                        onChange={(e) => updatePersonalInfo('name', e.target.value)}
                        className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1 font-mono">Short Name</label>
                      <input 
                        type="text" 
                        value={localData.personalInfo.nameShort} 
                        onChange={(e) => updatePersonalInfo('nameShort', e.target.value)}
                        className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1 font-mono">Professional Title (Hero Role)</label>
                    <input 
                      type="text" 
                      value={localData.personalInfo.title} 
                      onChange={(e) => updatePersonalInfo('title', e.target.value)}
                      className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1 font-mono">Specialization</label>
                    <input 
                      type="text" 
                      value={localData.personalInfo.specialization} 
                      onChange={(e) => updatePersonalInfo('specialization', e.target.value)}
                      className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1 font-mono">Aero Tagline</label>
                    <textarea 
                      rows={2}
                      value={localData.personalInfo.tagline} 
                      onChange={(e) => updatePersonalInfo('tagline', e.target.value)}
                      className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1 font-mono">Email Address</label>
                      <input 
                        type="email" 
                        value={localData.personalInfo.email} 
                        onChange={(e) => updatePersonalInfo('email', e.target.value)}
                        className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1 font-mono">Phone Number</label>
                      <input 
                        type="text" 
                        value={localData.personalInfo.phone} 
                        onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                        className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1 font-mono">Location Context</label>
                    <input 
                      type="text" 
                      value={localData.personalInfo.location} 
                      onChange={(e) => updatePersonalInfo('location', e.target.value)}
                      className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1 font-mono">Career Objective / Bio</label>
                    <textarea 
                      rows={3}
                      value={localData.personalInfo.bio} 
                      onChange={(e) => updatePersonalInfo('bio', e.target.value)}
                      className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest border-b border-white/5 pb-2 mt-6 mb-3">
                    <CheckCircle size={13} />
                    <span>Social Media Handles</span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1 font-mono">GitHub Profile Link</label>
                    <input 
                      type="text" 
                      value={localData.personalInfo.socials.github} 
                      onChange={(e) => updateSocials('github', e.target.value)}
                      className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1 font-mono">LinkedIn Profile Link</label>
                      <input 
                        type="text" 
                        value={localData.personalInfo.socials.linkedin} 
                        onChange={(e) => updateSocials('linkedin', e.target.value)}
                        className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1 font-mono">LeetCode Link</label>
                      <input 
                        type="text" 
                        value={localData.personalInfo.socials.leetcode} 
                        onChange={(e) => updateSocials('leetcode', e.target.value)}
                        className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Projects Tab */}
              {activeTab === 'projects' && (
                <div className="space-y-5 animate-fade-in text-left">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest border-b border-white/5 pb-2 mb-3">
                    <Github size={13} />
                    <span>Project Card Customizer</span>
                  </div>

                  <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-xs text-indigo-300 leading-relaxed">
                    <strong className="text-white">Active Customizing Console:</strong> Add your GitHub repositories below. Each repository will be instantly presented on the home screen as a handsome project card featuring a direct link to the source repository.
                  </div>

                  {/* Add New Project Card Form */}
                  <div className="p-4 bg-slate-950 border border-white/5 rounded-2xl space-y-4">
                    <span className="block text-xs font-bold font-mono tracking-wider text-slate-400 uppercase">
                      Add New Project Card
                    </span>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 mb-1 font-mono uppercase">
                          GitHub Username *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. bhavanijagirdar4-collab"
                          value={newProjUser}
                          onChange={(e) => setNewProjUser(e.target.value)}
                          className="w-full bg-slate-900 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors font-mono"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 mb-1 font-mono uppercase">
                          Repository Name *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. DocSpot"
                          value={newProjRepo}
                          onChange={(e) => setNewProjRepo(e.target.value)}
                          className="w-full bg-slate-900 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors font-mono"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 mb-1 font-mono uppercase">
                          Card Title
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. DocSpot Portal"
                          value={newProjTitle}
                          onChange={(e) => setNewProjTitle(e.target.value)}
                          className="w-full bg-slate-900 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 mb-1 font-mono uppercase">
                          Period
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Jan - Mar 2025"
                          value={newProjPeriod}
                          onChange={(e) => setNewProjPeriod(e.target.value)}
                          className="w-full bg-slate-900 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1 font-mono uppercase">
                        Technologies Used
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. React, Node.js, Express, MongoDB"
                        value={newProjTech}
                        onChange={(e) => setNewProjTech(e.target.value)}
                        className="w-full bg-slate-900 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1 font-mono uppercase">
                        Deployed Website URL (Link)
                      </label>
                      <input
                        type="url"
                        placeholder="e.g. https://docspot-portal.vercel.app"
                        value={newProjDeployed}
                        onChange={(e) => setNewProjDeployed(e.target.value)}
                        className="w-full bg-slate-900 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1 font-mono uppercase">
                        Project Description
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Detail the core features and accomplishments of this project."
                        value={newProjDesc}
                        onChange={(e) => setNewProjDesc(e.target.value)}
                        className="w-full bg-slate-900 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                      />
                    </div>

                    <button
                      onClick={addProjectCard}
                      className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 font-bold rounded-xl text-xs uppercase flex items-center justify-center gap-1.5 transition-all text-white outline-none cursor-pointer"
                    >
                      <Plus size={14} /> Add Project Card
                    </button>
                  </div>

                  {/* Display list of active projects with deletes */}
                  <div className="space-y-3 pt-2">
                    <span className="block text-xs font-bold font-mono tracking-wider text-slate-400 uppercase">
                      Current Project Cards
                    </span>

                    {(localData.githubRepos || []).length === 0 ? (
                      <div className="text-center py-6 text-slate-500 font-mono text-xs border border-dashed border-white/10 rounded-xl">
                        No active project cards. Add your GitHub repository above!
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {(localData.githubRepos || []).map((repoItem) => (
                          <div
                            key={repoItem.id}
                            className="p-4 bg-slate-950 border border-white/5 rounded-2xl relative space-y-3 animate-fade-in"
                          >
                            <div className="flex items-center justify-between border-b border-white/5 pb-2">
                              <span className="text-xs font-bold font-mono tracking-wider text-indigo-400 uppercase">
                                Edit Project Card
                              </span>
                              <button
                                onClick={() => removeProjectCard(repoItem.id)}
                                className="p-1 px-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 hover:border-rose-500/30 text-rose-450 hover:text-rose-400 text-[10px] font-mono font-bold uppercase transition-colors cursor-pointer shrink-0"
                                title="Delete Project Card"
                              >
                                Delete
                              </button>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="block text-[9px] font-bold text-slate-500 mb-1 font-mono uppercase">
                                  Card Title
                                </label>
                                <input
                                  type="text"
                                  placeholder="e.g. DocSpot Portal"
                                  value={repoItem.title || ''}
                                  onChange={(e) => updateProjectCard(repoItem.id, 'title', e.target.value)}
                                  className="w-full bg-slate-900 border border-white/5 hover:border-white/10 focus:border-indigo-500/60 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none transition-all placeholder:text-slate-650"
                                />
                              </div>
                              <div>
                                <label className="block text-[9px] font-bold text-slate-500 mb-1 font-mono uppercase">
                                  Period
                                </label>
                                <input
                                  type="text"
                                  placeholder="e.g. Ongoing"
                                  value={repoItem.period || ''}
                                  onChange={(e) => updateProjectCard(repoItem.id, 'period', e.target.value)}
                                  className="w-full bg-slate-900 border border-white/5 hover:border-white/10 focus:border-indigo-500/60 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none transition-all placeholder:text-slate-650"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="block text-[9px] font-bold text-slate-500 mb-1 font-mono uppercase">
                                  GitHub Username *
                                </label>
                                <input
                                  type="text"
                                  placeholder="e.g. bhvn"
                                  value={repoItem.username || ''}
                                  onChange={(e) => updateProjectCard(repoItem.id, 'username', e.target.value)}
                                  className="w-full bg-slate-900 border border-white/5 hover:border-white/10 focus:border-indigo-500/60 rounded-xl px-2.5 py-1.5 text-xs text-white font-mono focus:outline-none transition-all placeholder:text-slate-650"
                                  required
                                />
                              </div>
                              <div>
                                <label className="block text-[9px] font-bold text-slate-500 mb-1 font-mono uppercase">
                                  Repo Name *
                                </label>
                                <input
                                  type="text"
                                  placeholder="e.g. DocSpot"
                                  value={repoItem.repo || ''}
                                  onChange={(e) => updateProjectCard(repoItem.id, 'repo', e.target.value)}
                                  className="w-full bg-slate-900 border border-white/5 hover:border-white/10 focus:border-indigo-500/60 rounded-xl px-2.5 py-1.5 text-xs text-white font-mono focus:outline-none transition-all placeholder:text-slate-650"
                                  required
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-[9px] font-bold text-slate-550 mb-1 font-mono uppercase">
                                Deployed Website URL
                              </label>
                              <input
                                type="text"
                                placeholder="Paste live website URL (e.g. https://...)"
                                value={repoItem.deployedLink || ''}
                                onChange={(e) => updateProjectCard(repoItem.id, 'deployedLink', e.target.value)}
                                className="w-full bg-slate-900 border border-white/5 hover:border-white/10 focus:border-indigo-500/60 rounded-xl px-2.5 py-1.5 text-xs text-indigo-300 font-mono focus:outline-none transition-all placeholder:text-slate-650"
                              />
                            </div>

                            <div>
                              <label className="block text-[9px] font-bold text-slate-500 mb-1 font-mono uppercase">
                                Technologies Used
                              </label>
                              <input
                                type="text"
                                placeholder="React, Node.js, Express..."
                                value={repoItem.techStack || ''}
                                onChange={(e) => updateProjectCard(repoItem.id, 'techStack', e.target.value)}
                                className="w-full bg-slate-900 border border-white/5 hover:border-white/10 focus:border-indigo-500/60 rounded-xl px-2.5 py-1.5 text-xs text-white font-mono focus:outline-none transition-all placeholder:text-slate-650"
                              />
                            </div>

                            <div>
                              <label className="block text-[9px] font-bold text-slate-500 mb-1 font-mono uppercase">
                                Project Description
                              </label>
                              <textarea
                                rows={2}
                                placeholder="Short description of achievements..."
                                value={repoItem.description || ''}
                                onChange={(e) => updateProjectCard(repoItem.id, 'description', e.target.value)}
                                className="w-full bg-slate-900 border border-white/5 hover:border-white/10 focus:border-indigo-500/60 rounded-xl px-2.5 py-1.5 text-xs text-slate-350 focus:outline-none transition-all resize-none placeholder:text-slate-650"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Skills Tab */}
              {activeTab === 'skills' && (
                <div className="space-y-6 animate-fade-in text-left">
                  
                  {/* Core skills editor */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest border-b border-white/5 pb-2">
                      <Code size={13} />
                      <span>Configure Skills Badges</span>
                    </div>

                    <div className="flex gap-2">
                      <input 
                        type="text"
                        placeholder="Add professional skill (e.g. TypeScript, Express)..."
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                        className="flex-1 bg-slate-950/60 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                      <button
                        onClick={addSkill}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs uppercase flex items-center gap-1 transition-all"
                      >
                        <Plus size={14} /> Add
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {localData.skillsList.map(skill => (
                        <div 
                          key={skill}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-950 border border-white/10 text-xs font-semibold text-slate-300 rounded-lg"
                        >
                          <span>{skill}</span>
                          <button 
                            onClick={() => removeSkill(skill)}
                            className="text-rose-400 hover:text-rose-300 select-none cursor-pointer hover:bg-white/5 p-0.5 rounded"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Languages configure */}
                  <div className="space-y-3 border-t border-white/5 pt-5">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest border-b border-white/5 pb-2">
                      <BookOpen size={13} />
                      <span>Languages Known</span>
                    </div>

                    <div className="flex gap-2">
                      <input 
                        type="text"
                        placeholder="Add spoken language (e.g. Hindi)..."
                        value={newLang}
                        onChange={(e) => setNewLang(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && addLanguage()}
                        className="flex-1 bg-slate-950/60 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                      <button
                        onClick={addLanguage}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs uppercase flex items-center gap-1 transition-all"
                      >
                        <Plus size={14} /> Add
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1 font-medium text-xs">
                      {localData.languages.map(lang => (
                        <div 
                          key={lang}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-950 border border-white/10 text-slate-300 rounded-lg"
                        >
                          <span>{lang}</span>
                          <button 
                            onClick={() => removeLanguage(lang)}
                            className="text-rose-400 hover:text-rose-300 p-0.5 rounded cursor-pointer"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Education Tab */}
              {activeTab === 'education' && (
                <div className="space-y-6 animate-fade-in text-left">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest border-b border-white/5 pb-2 mb-2">
                    <GraduationCap size={13} />
                    <span>Academic Chronology</span>
                  </div>

                  {localData.education.map((item, idx) => (
                    <div 
                      key={item.id}
                      className="p-4 bg-slate-950 border border-white/5 rounded-2xl space-y-4 relative"
                    >
                      <div className="absolute top-4 right-4 text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider">
                        Milestone {idx + 1}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1 font-mono">Degree Title</label>
                        <input 
                          type="text" 
                          value={item.degree} 
                          onChange={(e) => updateEducationItem(item.id, 'degree', e.target.value)}
                          className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-1.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                      </div>

                      {item.field !== undefined && (
                        <div>
                          <label className="block text-xs font-semibold text-slate-400 mb-1 font-mono">Major / Field of Study</label>
                          <input 
                            type="text" 
                            value={item.field} 
                            onChange={(e) => updateEducationItem(item.id, 'field', e.target.value)}
                            className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-1.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                          />
                        </div>
                      )}

                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1 font-mono">College / School Name</label>
                        <input 
                          type="text" 
                          value={item.school} 
                          onChange={(e) => updateEducationItem(item.id, 'school', e.target.value)}
                          className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-1.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div className="col-span-1">
                          <label className="block text-xs font-semibold text-slate-400 mb-1 font-mono">Period</label>
                          <input 
                            type="text" 
                            value={item.period} 
                            onChange={(e) => updateEducationItem(item.id, 'period', e.target.value)}
                            className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors font-mono"
                          />
                        </div>
                        <div className="col-span-1">
                          <label className="block text-xs font-semibold text-slate-400 mb-1 font-mono">Grade Label</label>
                          <input 
                            type="text" 
                            value={item.gradeLabel} 
                            onChange={(e) => updateEducationItem(item.id, 'gradeLabel', e.target.value)}
                            className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors font-mono"
                          />
                        </div>
                        <div className="col-span-1">
                          <label className="block text-xs font-semibold text-slate-400 mb-1 font-mono">Grade Value</label>
                          <input 
                            type="text" 
                            value={item.gradeValue} 
                            onChange={(e) => updateEducationItem(item.id, 'gradeValue', e.target.value)}
                            className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors font-mono font-bold"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}



            </div>

            {/* Sticky workspace footer layout */}
            <div className="p-6 border-t border-white/10 bg-slate-950 flex items-center justify-between gap-4 mt-auto">
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-rose-550/15 border border-rose-500/20 hover:bg-rose-500/25 text-rose-300 hover:text-rose-200 font-mono text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw size={14} />
                <span>Reset Defaults</span>
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white font-mono text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/20 text-white font-mono text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Save size={14} />
                  <span>Apply Changes</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
