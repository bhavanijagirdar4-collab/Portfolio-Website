import { useState, useEffect } from 'react';
import { ArrowUp, X, Check, Award, FileText, Download, Mail } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import ResumeView from './components/ResumeView';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import DynamicSettings from './components/DynamicSettings';

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioAppInner />
    </PortfolioProvider>
  );
}

function PortfolioAppInner() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  const { portfolioData } = usePortfolio();
  const { personalInfo } = portfolioData;

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    
    // Toggle scroll top visibility
    const toggleVisibility = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', toggleVisibility);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleDownloadResume = () => {
    window.location.hash = 'resume';
  };


  const triggerPDFDownloadSim = () => {
    // Generate synthetic placement resume file
    const resumeContent = `
========================================
RESUME SUMMARY: ${personalInfo.name.toUpperCase()}
========================================
Academic Year: B.Tech IV Year (Computer Science Engineering)
Target Graduation: ${personalInfo.graduationYear}
Cumulative CGPA: ${personalInfo.cgpa}
Email: ${personalInfo.email}
Specialization: ${personalInfo.specialization}

Core Technical Skills:
- Languages: Java, C++, Python, SQL, JavaScript ES6+
- Frameworks: ReactJS, NodeJS, Express, Tailwind CSS
- Fundamentals: Data Structures & Algorithms, DBMS, OOPs, OS

Featured Projects:
1. LeetCode Solutions: 250+ highly optimized algorithmic solutions on algorithms & structures.
2. Algo-Visualizer: Collaborative interactive graph visual sandbox with state memory.
3. DevLink: Practice coding terminal with automated student test analytics.

Thank you for reviewing my placements resume!
Contact me directly at: ${personalInfo.email}
========================================
`;
    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${personalInfo.name.replace(/\s+/g, '_')}_Resume_Summary.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  if (currentHash === '#resume' || currentHash === '#/resume') {
    return <ResumeView />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">

      {/* Sticky Top Header Navigation */}
      <Header onDownloadResume={handleDownloadResume} />

      {/* Main Core Elements */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      {/* High-Fidelity Professional Compact Footer */}
      <footer className="border-t border-white/5 py-16 bg-slate-950 text-slate-500 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left space-y-1">
              <h3 className="font-sans font-bold text-white text-base">
                {personalInfo.name}
              </h3>
              <p className="text-xs text-slate-400">
                {personalInfo.title}
              </p>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono">
              <a href="#about" className="hover:text-white transition-colors">About</a>
              <span className="text-white/10 select-none">&bull;</span>
              <a href="#skills" className="hover:text-white transition-colors">Skills</a>
              <span className="text-white/10 select-none">&bull;</span>
              <a href="#projects" className="hover:text-white transition-colors">Projects</a>
              <span className="text-white/10 select-none">&bull;</span>
              <a href="#experience" className="hover:text-white transition-colors">Experience</a>
              <span className="text-white/10 select-none">&bull;</span>
              <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between border-t border-white/5 pt-8 gap-4">
            <p className="text-xs text-slate-600">
              &copy; {new Date().getFullYear()} {personalInfo.name}.
            </p>
            <div className="flex items-center gap-2">
            </div>
          </div>

        </div>
      </footer>

      {/* Embedded Live Customization Panel */}
      <DynamicSettings />

      {/* Back-to-Top Float Toggle button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          id="scroll-to-top"
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-indigo-600 text-white hover:bg-indigo-500 flex items-center justify-center shadow-2xl scale-100 hover:scale-105 active:scale-95 transition-all text-xs cursor-pointer border border-white/10"
          title="Scroll back to structural top"
        >
          <ArrowUp size={18} />
        </button>
      )}

      {/* High-Fidelity Resume Overview Modal Dialog */}
      {showResumeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-white/10 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative">
            
            {/* Header */}
            <div className="bg-slate-850 px-6 py-4 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2 text-indigo-400">
                <FileText size={18} />
                <span className="text-sm font-bold font-mono tracking-wider uppercase text-white">Placements Resume Summary</span>
              </div>
              <button
                onClick={() => setShowResumeModal(false)}
                className="text-slate-400 hover:text-white p-1 hover:bg-white/5 rounded-lg transition-colors"
                title="Dismiss Overview Dialog"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 text-left">
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  {personalInfo.name} <Award size={16} className="text-amber-400" />
                </h3>
                <p className="text-xs text-slate-400">
                  Candidate Education: <strong>{personalInfo.university}</strong>
                </p>
                <p className="text-xs text-slate-400">
                  B.Tech cumulative performance score: <strong className="text-white font-mono">{personalInfo.cgpa}</strong> ({personalInfo.graduationYear} batch)
                </p>
              </div>

              {/* Skill set matrix shortcuts */}
              <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-white/5">
                <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest font-bold">Primary Placements Focus</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Excellent focus in DSA fundamentals (Data Structures &amp; Algorithms), Object-Oriented Principles (OOPs), Standard SQL queries, and interactive ReactJS architectures.
                </p>
              </div>

              {/* Simulated download option */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  onClick={triggerPDFDownloadSim}
                  className="w-full sm:w-auto px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-indigo-600/20 shadow-md"
                >
                  <Download size={14} />
                  Download Resume Data (.txt)
                </button>
                <button
                  onClick={copyEmailToClipboard}
                  className="w-full sm:w-auto px-5 py-3 bg-slate-800 hover:bg-slate-755 text-slate-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer border border-white/5"
                >
                  {copiedEmail ? <Check size={14} className="text-emerald-400" /> : <Mail size={14} />}
                  {copiedEmail ? "Email Copied!" : "Copy Private Email"}
                </button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-950 px-6 py-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500">
              <span>Candidate Match System v1.2</span>
              <span>PLACEMENT PREFERRED</span>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
