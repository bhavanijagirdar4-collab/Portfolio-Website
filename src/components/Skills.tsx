import { Code2 } from 'lucide-react';

export default function Skills() {
  const skillsList = ["Java", "HTML", "CSS", "Node.js", "SQL", "Postman"];

  return (
    <section id="skills" className="py-24 bg-slate-950 border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.03),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-left mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight flex items-center gap-3">
            <Code2 className="text-indigo-400" size={32} />
            Skills
          </h2>
        </div>

        {/* Floating buttons representing list of skills */}
        <div className="flex flex-wrap gap-4 items-center">
          {skillsList.map((skill) => (
            <div
              key={skill}
              className="px-6 py-3.5 bg-slate-900 border border-white/10 hover:border-indigo-500/50 rounded-xl text-sm sm:text-base font-bold text-slate-200 hover:text-white transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1.5 cursor-pointer flex items-center gap-2.5 select-none active:scale-95 shadow-md"
            >
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
