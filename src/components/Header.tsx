import { useState, useEffect } from 'react';
import { Menu, X, Download, Github } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

interface HeaderProps {
  onDownloadResume: () => void;
}

export default function Header({ onDownloadResume }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
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
    { id: 'contact', label: 'Contact' }
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
            {PERSONAL_INFO.nameShort}
            <span className="text-white">.dev /&gt;</span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-sm font-semibold text-slate-100 hover:text-indigo-400 transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Styled Resume CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#resume"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 text-sm font-semibold text-indigo-400 bg-indigo-500/10 border border-indigo-500/30 hover:bg-indigo-500/20 hover:border-indigo-400 rounded-lg transition-all flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Download size={14} />
              Resume
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center md:hidden gap-3">
            <a
              href="#resume"
              target="_blank"
              rel="noreferrer"
              className="p-2 text-indigo-400 bg-indigo-500/10 rounded-lg border border-indigo-500/20 hover:bg-indigo-500/20 transition-all"
              title="View Resume"
            >
              <Download size={15} />
            </a>
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
        <div className="md:hidden bg-slate-900 border-b border-white/10 px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-fade-in">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="block w-full text-left px-3 py-2.5 rounded-lg text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
