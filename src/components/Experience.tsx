import { Briefcase } from 'lucide-react';

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-slate-900 border-t border-white/5 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(99,102,241,0.05),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-left mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight flex items-center gap-3">
            <Briefcase className="text-indigo-400" size={32} />
            Experience
          </h2>
        </div>

        {/* Empty space as requested */}
        <div className="min-h-[100px]" />
      </div>
    </section>
  );
}
