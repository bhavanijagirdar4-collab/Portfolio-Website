import { Mail, Github, Phone, ArrowUpRight } from 'lucide-react';

export default function Contact() {
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
            href="https://github.com/bhavanijagirdar4-collab"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-4 bg-slate-900 border border-white/10 hover:border-indigo-500/50 rounded-xl text-sm sm:text-base font-bold text-slate-200 hover:text-white transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1.5 cursor-pointer flex items-center gap-3 select-none active:scale-95 shadow-md"
          >
            <Github className="text-indigo-400" size={20} />
            <span>bhavanijagirdar4-collab</span>
            <ArrowUpRight size={14} className="text-slate-500 group-hover:text-white transition-colors" />
          </a>

          {/* Interactive Mail compose action pill */}
          <a
            href="mailto:bhavanijagirdar4@gmail.com"
            className="px-6 py-4 bg-slate-900 border border-white/10 hover:border-indigo-500/50 rounded-xl text-sm sm:text-base font-bold text-slate-200 hover:text-white transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1.5 cursor-pointer flex items-center gap-3 select-none active:scale-95 shadow-md"
          >
            <Mail className="text-indigo-400" size={20} />
            <span>bhavanijagirdar4@gmail.com</span>
            <ArrowUpRight size={14} className="text-slate-500 group-hover:text-white transition-colors" />
          </a>

          {/* Phone action pill */}
          <a
            href="tel:+919391081937"
            className="px-6 py-4 bg-slate-900 border border-white/10 hover:border-indigo-500/50 rounded-xl text-sm sm:text-base font-bold text-slate-200 hover:text-white transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1.5 cursor-pointer flex items-center gap-3 select-none active:scale-95 shadow-md"
          >
            <Phone className="text-indigo-400" size={20} />
            <span>+91 93910 81937</span>
            <ArrowUpRight size={14} className="text-slate-500 group-hover:text-white transition-colors" />
          </a>
        </div>

      </div>
    </section>
  );
}

