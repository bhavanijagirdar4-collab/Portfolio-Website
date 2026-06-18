import { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { portfolioData, setIsResumeOpen } = usePortfolio();
  const { personalInfo } = portfolioData;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (sectionId === 'resume') {
      setIsResumeOpen(true);
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'resume', label: 'Resume' }
  ];

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-900/80 backdrop-blur-md border-b border-white/10 py-3 shadow-lg'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <div
            onClick={() => handleNavClick('hero')}
            className="text-xl font-bold font-mono tracking-tight cursor-pointer text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1"
          >
            <span className="text-white">&lt;</span>
            {personalInfo.nameShort}
            <span className="text-white">.dev /&gt;</span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={
                  item.id === 'resume'
                    ? "text-xs font-bold font-mono tracking-wider uppercase text-white bg-indigo-600/95 hover:bg-indigo-500 px-4 py-2 rounded-xl border border-indigo-500/30 transition-all cursor-pointer shadow-indigo-500/10 shadow-sm hover:shadow-md active:scale-95 shrink-0"
                    : "text-sm font-semibold text-slate-100 hover:text-indigo-400 transition-colors cursor-pointer shrink-0"
                }
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center md:hidden gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-300 hover:text-white p-2 focus:outline-none transition-colors"
              aria-label="Toggle mobile navigation menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-white/10 px-4 pt-3 pb-6 space-y-2 shadow-2xl animate-fade-in">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={
                item.id === 'resume'
                  ? "block w-full text-center px-4 py-3 rounded-xl text-sm font-mono font-bold uppercase tracking-wider bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md active:scale-95"
                  : "block w-full text-left px-3 py-2.5 rounded-lg text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              }
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
