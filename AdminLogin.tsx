import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { X, ShieldAlert } from 'lucide-react';

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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: password.trim(),
    });

    setLoading(false);

    if (error) {
      alert(`Login failed: ${error.message}`);
      return;
    }

    alert('Welcome back, Admin!');
    onLoginSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md text-slate-100">
      <div className="bg-slate-900 border border-white/10 p-8 rounded-2xl shadow-2xl max-w-md w-full relative">
        <button
          type="button"
          onClick={() => {
            window.location.hash = '';
            onClose();
          }}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
          aria-label="Close admin login"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center mb-6">
          <ShieldAlert className="text-indigo-500 mb-2" size={32} />
          <h2 className="text-2xl font-bold font-mono tracking-wide">
            ADMIN GATEWAY
          </h2>
          <p className="text-xs text-slate-400 text-center mt-1">
            Enter admin email and password to continue
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-slate-400 text-xs font-mono mb-2 uppercase">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="w-full bg-slate-950 border border-white/10 text-white rounded-lg p-3 text-sm focus:outline-none focus:border-indigo-500 font-sans"
              required
            />
          </div>

          <div>
            <label className="block text-slate-400 text-xs font-mono mb-2 uppercase">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="w-full bg-slate-950 border border-white/10 text-white rounded-lg p-3 text-sm focus:outline-none focus:border-indigo-500 font-sans"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 text-white font-semibold font-mono p-3 rounded-lg text-sm transition tracking-wider"
          >
            {loading ? 'AUTHENTICATING...' : 'INITIATE LOGIN'}
          </button>
        </form>
      </div>
    </div>
  );
}