import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import DynamicSettings from './components/DynamicSettings';
import AdminLogin from './components/AdminLogin';
import ResumeModal from './components/ResumeModal';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { supabase, isSupabaseConfigured } from './supabaseClient';
import type { User } from '@supabase/supabase-js';

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioAppInner />
    </PortfolioProvider>
  );
}

function PortfolioAppInner() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  const [adminUser, setAdminUser] = useState<User | null>(null);
  const [isAdminVerified, setIsAdminVerified] = useState(false);

  const { portfolioData, isResumeOpen, setIsResumeOpen } = usePortfolio();
  const { personalInfo } = portfolioData;

  const isAdminRoute = currentHash === '#admin' || currentHash === '#/admin';

  useEffect(() => {
    // Intercept and swallow network fetch errors globally (e.g., if Supabase is paused or down)
    const handleRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      if (reason && (
        reason.message === 'Failed to fetch' || 
        String(reason).includes('Failed to fetch') ||
        (reason.status === 0 && reason.name === 'TypeError')
      )) {
        console.warn('Caught and suppressed unhandled Supabase/network fetch failure:', reason);
        event.preventDefault();
      }
    };

    const handleError = (event: ErrorEvent) => {
      if (event.message && (
        event.message.includes('Failed to fetch') ||
        event.message.includes('Load failed')
      )) {
        console.warn('Caught and suppressed network fetch error:', event.message);
        event.preventDefault();
      }
    };

    window.addEventListener('unhandledrejection', handleRejection);
    window.addEventListener('error', handleError);

    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('scroll', handleScroll);

    let subscription: any = null;

    if (isSupabaseConfigured) {
      try {
        supabase.auth.getUser()
          .then((res) => {
            const user = res?.data?.user;
            setAdminUser(user ?? null);
          })
          .catch((err) => {
            console.warn('Supabase authentication state check failed:', err);
          });

        const { data: { subscription: sub } } = supabase.auth.onAuthStateChange((_event, session) => {
          setAdminUser(session?.user ?? null);

          if (!session?.user) {
            setIsAdminVerified(false);
          }
        });
        
        subscription = sub;
      } catch (err) {
        console.warn('Failed to initialize Supabase auth state listeners:', err);
      }
    } else {
      console.info('Supabase is unconfigured. Running in client-only preview mode.');
      const localVerified = localStorage.getItem('local_admin_verified') === 'true';
      if (localVerified) {
        setAdminUser({ id: 'local-admin', email: 'admin@local' } as any);
        setIsAdminVerified(true);
      }
    }

    return () => {
      window.removeEventListener('unhandledrejection', handleRejection);
      window.removeEventListener('error', handleError);
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('scroll', handleScroll);
      if (subscription && typeof subscription.unsubscribe === 'function') {
        subscription.unsubscribe();
      }
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminVerified(true);
    if (!isSupabaseConfigured) {
      setAdminUser({ id: 'local-admin', email: 'admin@local' } as any);
      localStorage.setItem('local_admin_verified', 'true');
    }
  };

  const handleAdminClose = () => {
    window.location.hash = '';
    setCurrentHash('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      <Header />

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
              <h3 className="font-sans font-bold text-white text-base">
                {personalInfo.name}
              </h3>
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
            <p className="text-xs text-slate-600">
              &copy; {new Date().getFullYear()} {personalInfo.name}.
            </p>
          </div>
        </div>
      </footer>

      {isAdminRoute && !isAdminVerified && (
        <AdminLogin
          onClose={handleAdminClose}
          onLoginSuccess={handleAdminLoginSuccess}
        />
      )}

      {isAdminRoute && isAdminVerified && adminUser && <DynamicSettings />}

      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          id="scroll-to-top"
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-indigo-600 text-white hover:bg-indigo-500 flex items-center justify-center shadow-2xl scale-100 hover:scale-105 active:scale-95 transition-all text-xs cursor-pointer border border-white/10"
          aria-label="Scroll to top"
        >
          <ArrowUp size={18} />
        </button>
      )}
    </div>
  );
}
