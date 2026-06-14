import { usePortfolio } from '../context/PortfolioContext';
import avatarImg from '../assets/images/developer_avatar_1781419595596.jpg';

export default function Hero() {
  const { portfolioData } = usePortfolio();
  const { personalInfo } = portfolioData;

  return (
    <section
      id="hero"
      className="min-h-[85vh] pt-36 pb-20 flex items-center justify-center bg-radial from-slate-900 via-slate-950 to-black relative overflow-hidden"
    >
      {/* Decorative Grid Backdrop */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Floating Ambient Glowing Lights */}
      <div className="absolute -top-40 left-1/3 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 text-center flex flex-col items-center justify-center">
        <div className="max-w-2xl space-y-6 flex flex-col items-center text-center">
          {/* Profile Picture Holder in the Up-Left Corner */}
          <div className="relative w-40 h-40 rounded-full overflow-hidden border border-white/20 hover:border-indigo-500/50 transition-all duration-300 shadow-2xl bg-slate-900 group">
            <img
              src={avatarImg}
              alt={personalInfo.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-none">
              Hi, I&apos;m{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-indigo-500">
                {personalInfo.name}
              </span>
            </h1>
            
            {/* The developer role line */}
            <p className="text-lg sm:text-xl md:text-2xl font-mono text-indigo-400 font-semibold tracking-wide">
              {personalInfo.title}
            </p>
          </div>

          <p className="text-base sm:text-lg text-slate-400 leading-relaxed sm:leading-loose md:leading-[2.5rem] max-w-xl">
            {personalInfo.tagline}
          </p>
        </div>
      </div>
    </section>
  );
}
