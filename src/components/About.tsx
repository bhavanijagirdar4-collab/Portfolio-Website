import { GraduationCap, Award, MapPin, CheckCircle2 } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-24 bg-slate-950 relative border-t border-white/5">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Background & Bio (5 Columns) */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                About Me
              </h2>
            </div>
            
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
              Highly motivated Computer Science graduate with strong programming skills in Java, SQL. Eager to leverage my technical expertise and problem-solving abilities as a Software Engineer.
            </p>
          </div>

          {/* Right Column: Education Journey Timeline (7 Columns) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2">
                <GraduationCap className="text-indigo-400" size={26} />
                Academic Background
              </h3>
            </div>

            {/* Timeline component */}
            <div className="relative border-l border-slate-800 ml-4 pl-6 sm:pl-8 space-y-8 py-2">
              
              {/* Item 1 */}
              <div className="relative">
                {/* Bullet node */}
                <span className="absolute -left-[31px] sm:-left-[39px] top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-950 border border-indigo-500 shadow shadow-indigo-500/50">
                  <span className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
                </span>
                
                <div className="bg-slate-900 border border-white/10 p-5 sm:p-6 rounded-2xl shadow-xl hover:border-indigo-500/30 transition-all duration-300 group">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h4 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                      Bachelor of Technology (B.Tech)
                    </h4>
                    <span className="text-xs font-mono px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full border border-indigo-500/20">
                      2023 - 2027
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-slate-200">
                    Computer Science &amp; Engineering
                  </p>
                  <p className="text-xs text-slate-400 mt-1 flex items-start gap-1">
                    <MapPin size={12} className="text-slate-500 mt-0.5 shrink-0" />
                    Srinivasa Ramanujan Institute of Technology, Ananthapur, Andhra Pradesh
                  </p>
                  
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2 text-xs">
                    <Award className="text-amber-400 shrink-0" size={16} />
                    <span className="text-slate-300 font-medium">
                      Current CGPA: <span className="font-mono text-white text-sm font-bold">9.11/10</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Item 2 */}
              <div className="relative">
                {/* Bullet node */}
                <span className="absolute -left-[31px] sm:-left-[39px] top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-slate-950 border border-slate-800">
                  <CheckCircle2 className="h-4 w-4 text-indigo-400 shrink-0" />
                </span>
                
                <div className="bg-slate-900 border border-white/10 p-5 sm:p-6 rounded-2xl shadow-xl hover:border-indigo-500/30 transition-all duration-300 group">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h4 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                      Intermediate (Class XII)
                    </h4>
                    <span className="text-xs font-mono px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full border border-indigo-500/20">
                      2021 - 2023
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 flex items-start gap-1">
                    <MapPin size={12} className="text-slate-500 mt-0.5 shrink-0" />
                    J.C.N.R.M Junior College, Tadipatri, Ananthapur, Andhra Pradesh
                  </p>
                  
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2 text-xs">
                    <Award className="text-amber-400 shrink-0" size={16} />
                    <span className="text-slate-300 font-medium">
                      Percentage: <span className="font-mono text-white text-sm font-bold">9.85</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Item 3 */}
              <div className="relative">
                {/* Bullet node */}
                <span className="absolute -left-[31px] sm:-left-[39px] top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-slate-950 border border-slate-800">
                  <CheckCircle2 className="h-4 w-4 text-indigo-400 shrink-0" />
                </span>
                
                <div className="bg-slate-900 border border-white/10 p-5 sm:p-6 rounded-2xl shadow-xl hover:border-indigo-500/30 transition-all duration-300 group">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h4 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                      Secondary School Certificate (Class X)
                    </h4>
                    <span className="text-xs font-mono px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full border border-indigo-500/20">
                      2020 - 2021
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 flex items-start gap-1">
                    <MapPin size={12} className="text-slate-500 mt-0.5 shrink-0" />
                    St. Francis Grammar High School, Madannapet, Hyderabad, Telangana
                  </p>
                  
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2 text-xs">
                    <Award className="text-amber-400 shrink-0" size={16} />
                    <span className="text-slate-300 font-medium">
                      CGPA: <span className="font-mono text-white text-sm font-bold">10</span>
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
