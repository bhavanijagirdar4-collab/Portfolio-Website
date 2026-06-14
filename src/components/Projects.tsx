import { useState, useEffect } from 'react';
import { Github, ExternalLink, FolderGit2, Folder, FileCode, RefreshCw, AlertCircle } from 'lucide-react';

interface RepoItem {
  name: string;
  type: string;
  path: string;
  html_url: string;
  size: number;
}

export default function Projects() {
  const [repoFiles, setRepoFiles] = useState<RepoItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [err, setErr] = useState<string | null>(null);

  const fetchRepoContents = async () => {
    setLoading(true);
    setErr(null);
    try {
      const response = await fetch('https://api.github.com/repos/bhavanijagirdar4-collab/Leetcode-Solutions/contents');
      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('API Rate limit reached. You can view the list of files directly on the GitHub repository.');
        }
        throw new Error(`Failed to load repository files (Status: ${response.status})`);
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        // Sort directories first, then files
        const sorted = data.sort((a, b) => {
          if (a.type === b.type) return a.name.localeCompare(b.name);
          return a.type === 'dir' ? -1 : 1;
        });
        setRepoFiles(sorted);
      }
    } catch (e: any) {
      setErr(e.message || 'An error occurred while fetching files.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepoContents();
  }, []);

  return (
    <section id="projects" className="py-24 bg-slate-950 border-t border-white/5 relative">
      <div className="absolute inset-0 bg-radial from-transparent via-indigo-500/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-left mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight flex items-center gap-3">
            <FolderGit2 className="text-indigo-400" size={32} />
            Projects
          </h2>
        </div>

        {/* Live Explorer Block */}
        <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/5">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <h4 className="text-xs font-mono text-indigo-400 uppercase tracking-widest font-bold">
                  Live Repository Integration
                </h4>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                Leetcode-Solutions Explorer
              </h3>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={fetchRepoContents}
                disabled={loading}
                className="p-2 bg-slate-950 hover:bg-slate-800 disabled:opacity-50 text-indigo-400 hover:text-indigo-300 border border-white/10 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 text-xs font-mono"
                title="Sync Repository State"
              >
                <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                Sync List
              </button>
              
              <a
                href="https://github.com/bhavanijagirdar4-collab/Leetcode-Solutions"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-indigo-600/10 active:scale-95"
              >
                <Github size={14} />
                Open Repository
              </a>
            </div>
          </div>

          {/* Directory Tree Listing Container */}
          <div className="bg-slate-950 rounded-2xl border border-white/5 p-4 min-h-[220px] transition-all relative">
            {loading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/80 gap-3 rounded-2xl">
                <RefreshCw size={24} className="text-indigo-500 animate-spin" />
                <span className="text-xs font-mono text-slate-400">Loading catalog files...</span>
              </div>
            )}

            {!loading && err && (
              <div className="flex flex-col items-center justify-center py-10 px-4 text-center space-y-3">
                <AlertCircle className="text-rose-500" size={32} />
                <div className="space-y-1 max-w-md">
                  <p className="text-sm font-semibold text-slate-300">Could Not Load Files Automatically</p>
                  <p className="text-xs text-slate-500 leading-normal">{err}</p>
                </div>
                <div className="pt-2">
                  <a
                    href="https://github.com/bhavanijagirdar4-collab/Leetcode-Solutions"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs font-semibold rounded-lg transition-all"
                  >
                    View Files on GitHub <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            )}

            {!loading && !err && repoFiles.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-slate-500 text-xs text-center font-mono">
                No items fetched from the directory.
              </div>
            )}

            {!loading && !err && repoFiles.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {repoFiles.map((file) => (
                  <a
                    key={file.path}
                    href={file.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-3 bg-slate-900/40 hover:bg-slate-900 border border-white/5 hover:border-white/10 rounded-xl transition-all group"
                  >
                    <div className="flex items-center gap-3 min-w-0 pr-2">
                      <div className="shrink-0">
                        {file.type === 'dir' ? (
                          <Folder className="text-amber-400 fill-amber-400/10" size={18} />
                        ) : (
                          <FileCode className="text-indigo-400" size={18} />
                        )}
                      </div>
                      <span className="text-slate-200 text-xs sm:text-sm font-bold truncate group-hover:text-indigo-400 transition-colors">
                        {file.name}
                      </span>
                    </div>
                    <ExternalLink size={12} className="text-slate-600 group-hover:text-slate-400 transition-colors shrink-0" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
