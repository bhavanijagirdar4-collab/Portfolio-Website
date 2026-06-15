import { Code, ExternalLink, FolderGit2, Terminal, Github, Globe } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function Projects() {
  const { portfolioData } = usePortfolio();
  const { githubRepos = [], personalInfo } = portfolioData;

  return (
    <section id="projects" className="py-24 bg-slate-950 border-t border-white/5 relative">
      <div className="absolute inset-0 bg-radial from-transparent via-indigo-500/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-8 text-left">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight flex items-center gap-3">
            <FolderGit2 className="text-indigo-400" size={32} />
            Projects
          </h2>
        </div>

        {/* Projects Cards Layout */}
        {githubRepos.length === 0 ? (
          <div className="bg-slate-900/40 border border-dashed border-white/10 rounded-3xl p-12 text-center max-w-lg mx-auto space-y-4">
            <Code className="text-slate-500 mx-auto" size={36} />
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-300">No Project Cards Added</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Add projects dynamically using the <strong>Projects</strong> tab in the <strong>Portfolio Customizer</strong> workspace.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {githubRepos.map((project, idx) => {
              // Parse the tech stack into tags
              const tags = project.techStack
                ? project.techStack.split(',').map((t) => t.trim()).filter(Boolean)
                : [];
              
              const repoUrl = `https://github.com/${project.username}/${project.repo}`;

              return (
                <div
                  key={project.id || idx}
                  className="bg-slate-900/40 border border-white/10 hover:border-indigo-500/30 rounded-2xl p-5 relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5 group flex flex-col justify-between text-left"
                >
                  {/* Decorative background blur on hover */}
                  <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-full blur-3xl pointer-events-none opacity-50 group-hover:opacity-100 transition-all duration-500" />
                  
                  <div>
                    {/* Title */}
                    <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight mt-1 group-hover:text-indigo-300 transition-colors">
                      {project.title || project.repo}
                    </h4>

                    {/* Tech details */}
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {tags.map((tag, tagIdx) => (
                          <span
                            key={tagIdx}
                            className="px-2 py-0.5 bg-slate-950 border border-white/5 rounded text-[10px] font-semibold text-slate-400 group-hover:border-indigo-500/20 group-hover:text-indigo-300/90 transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Project Description */}
                    {project.description && (
                      <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                        {project.description}
                      </p>
                    )}
                  </div>

                  {/* Actions Area */}
                  <div className="mt-5 pt-3.5 border-t border-white/5 flex items-center justify-end gap-2">
                    <a
                      href={repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-indigo-600/90 text-white hover:bg-indigo-500 border border-indigo-500/30 rounded-xl text-[10px] font-mono font-bold tracking-wider transition-all shadow-sm hover:shadow-md cursor-pointer active:scale-95"
                    >
                      <Github size={12} />
                      <span>View Repository</span>
                      <ExternalLink size={10} className="opacity-80" />
                    </a>

                    {project.deployedLink && project.deployedLink.trim() && (
                      <a
                        href={project.deployedLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-indigo-600/90 text-white hover:bg-indigo-500 border border-indigo-500/30 rounded-xl text-[10px] font-mono font-bold tracking-wider transition-all shadow-sm hover:shadow-md cursor-pointer active:scale-95"
                      >
                        <Globe size={12} />
                        <span>Website</span>
                        <ExternalLink size={10} className="opacity-80" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}

