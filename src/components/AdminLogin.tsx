import { useState, FormEvent } from 'react';
import { supabase, isSupabaseConfigured } from '../supabaseClient';
import { X, ShieldAlert, AlertCircle, Info } from 'lucide-react';

interface AdminLoginProps {
  onClose: () => void;
  onLoginSuccess: () => void;
}

export default function AdminLogin({
  onClose,
  onLoginSuccess,
}: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    // If Supabase keys are not configured, log in automatically in local mode
    if (!isSupabaseConfigured) {
      setTimeout(() => {
        onLoginSuccess();
        setLoading(false);
      }, 500);
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      });

      if (error) {
        setErrorMessage(error.message);
        setLoading(false);
        return;
      }

      onLoginSuccess();
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected authentication error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md text-slate-100 animate-fade-in">
      <div className="bg-slate-900 border border-white/10 p-8 rounded-2xl shadow-2xl max-w-md w-full relative">
        <button
          type="button"
          onClick={() => {
            window.location.hash = '';
            onClose();
          }}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors p-1.5 hover:bg-white/5 rounded-lg"
          aria-label="Close admin login"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center mb-6">
          <ShieldAlert className="text-indigo-500 mb-2" size={32} />
          <h2 className="text-2xl font-bold font-mono tracking-wide">
            ADMIN GATEWAY
          </h2>
          <p className="text-xs text-slate-400 text-center mt-1 font-mono uppercase tracking-wide">
            Enter admin credentials to customize the workspace
          </p>
        </div>

        {!isSupabaseConfigured && (
          <div className="mb-4 p-3 bg-indigo-550/15 border border-indigo-505/20 rounded-xl text-xs text-indigo-300 flex items-start gap-2 text-left">
            <Info size={14} className="shrink-0 mt-0.5 text-indigo-400" />
            <div>
              <strong className="text-white block mb-0.5">Sandbox Mode Active</strong>
              Supabase keys are not configured. Click the button below with any credentials to log in, customize the page, and preview changes instantly!
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-xs text-rose-300 flex items-start gap-2 text-left">
            <AlertCircle size={14} className="shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="text-left">
            <label className="block text-slate-400 text-xs font-mono mb-2 uppercase tracking-wider">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              placeholder="admin@example.com"
              className="w-full bg-slate-950 border border-white/10 text-white rounded-xl p-3 text-sm focus:outline-none focus:border-indigo-500 font-sans transition-colors placeholder:text-slate-600"
              required
            />
          </div>

          <div className="text-left">
            <label className="block text-slate-400 text-xs font-mono mb-2 uppercase tracking-wider">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full bg-slate-950 border border-white/10 text-white rounded-xl p-3 text-sm focus:outline-none focus:border-indigo-500 font-sans transition-colors placeholder:text-slate-600"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 disabled:opacity-50 text-white font-semibold font-mono p-3 rounded-xl text-sm transition tracking-wider cursor-pointer"
          >
            {loading ? 'AUTHENTICATING...' : 'INITIATE LOGIN'}
          </button>
        </form>
      </div>
    </div>
  );
}
