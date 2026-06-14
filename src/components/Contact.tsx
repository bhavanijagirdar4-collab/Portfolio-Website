import { Mail, Github, Phone, ArrowUpRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function Contact() {
  const { portfolioData } = usePortfolio();
  const { personalInfo } = portfolioData;

  // Helper to extract username from full github URL
  const getGitHubUsername = (url: string) => {
    try {
      const parts = url.replace(/\/$/, '').split('/');
      return parts[parts.length - 1] || 'GitHub';
    } catch {
      return 'GitHub';
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-950 border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(99,102,241,0.03),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-left mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight flex items-center gap-3">
            <Mail className="text-indigo-400" size={32} />
            Contact
          </h2>
        </div>

        {/* Minimal symbols / row layout instead of cards */}
        <div className="flex flex-wrap gap-4 items-center">
          {/* GitHub action pill */}
          <a
            href={personalInfo.socials.github}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-4 bg-slate-900 border border-white/10 hover:border-indigo-500/50 rounded-xl text-sm sm:text-base font-bold text-slate-200 hover:text-white transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1.5 cursor-pointer flex items-center gap-3 select-none active:scale-95 shadow-md"
          >
            <Github className="text-indigo-400" size={20} />
            <span>{getGitHubUsername(personalInfo.socials.github)}</span>
            <ArrowUpRight size={14} className="text-slate-500 group-hover:text-white transition-colors" />
          </a>

          {/* Interactive Mail compose action pill */}
          <a
            href={`mailto:${personalInfo.email}`}
            className="px-6 py-4 bg-slate-900 border border-white/10 hover:border-indigo-500/50 rounded-xl text-sm sm:text-base font-bold text-slate-200 hover:text-white transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1.5 cursor-pointer flex items-center gap-3 select-none active:scale-95 shadow-md"
          >
            <Mail className="text-indigo-400" size={20} />
            <span>{personalInfo.email}</span>
            <ArrowUpRight size={14} className="text-slate-500 group-hover:text-white transition-colors" />
          </a>

          {/* Phone action pill */}
          <a
            href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`}
            className="px-6 py-4 bg-slate-900 border border-white/10 hover:border-indigo-500/50 rounded-xl text-sm sm:text-base font-bold text-slate-200 hover:text-white transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1.5 cursor-pointer flex items-center gap-3 select-none active:scale-95 shadow-md"
          >
            <Phone className="text-indigo-400" size={20} />
            <span>{personalInfo.phone}</span>
            <ArrowUpRight size={14} className="text-slate-500 group-hover:text-white transition-colors" />
          </a>
        </div>

      </div>
    </section>
  );
}

