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

// Clean security imports
import AdminLogin from './components/AdminLogin';
import { supabase } from './supabaseClient';
import { User } from '@supabase/supabase-js';

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
  const [adminUser, setAdminUser] = useState<User | null>(null);

  const { portfolioData } = usePortfolio();
  const { personalInfo } = portfolioData;

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    
    // Check auth status immediately on launch
    supabase.auth.getUser().then(({ data: { user } }) => {
      setAdminUser(user);
    });

    // Listen for logins or logouts
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setAdminUser(session?.user ?? null);
    });
    
    const toggleVisibility = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', toggleVisibility);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('scroll', toggleVisibility);
      subscription.unsubscribe();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDownloadResume = () => {
    window.location.hash = 'resume';
  };

  if (currentHash === '#resume' || currentHash === '#/resume') {
    return <ResumeView />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">

      <Header onDownloadResume={handleDownloadResume} />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      <footer className="border-t border-white/5 py-16 bg-slate-950 text-slate-500 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left space-y-1">
              <h3 className="font-sans font-bold text-white text-base">{personalInfo.name}</h3>
              <p className="text-xs text-slate-400">{personalInfo.title}</p>
            </div>
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
            <p className="text-xs text-slate-600">&copy; {new Date().getFullYear()} {personalInfo.name}.</p>
          </div>
        </div>
      </footer>

      {/* Secret Route: Triggers login modal panel */}
      {(currentHash === '#admin' || currentHash === '#/admin') && (
        <AdminLogin onClose={() => setCurrentHash(window.location.hash)} />
      )}

      {/* Customizer Button: ONLY displays if you successfully log in! */}
      {adminUser && <DynamicSettings />}

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          id="scroll-to-top"
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-indigo-600 text-white hover:bg-indigo-500 flex items-center justify-center shadow-2xl scale-100 hover:scale-105 active:scale-95 transition-all text-xs cursor-pointer border border-white/10"
        >
          <ArrowUp size={18} />
        </button>
      )}
    </div>
  );
}
