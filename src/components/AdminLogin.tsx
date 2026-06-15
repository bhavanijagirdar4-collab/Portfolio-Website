import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { X } from 'lucide-react';

interface AdminLoginProps {
  onClose: () => void;
}

export default function AdminLogin({ onClose }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      alert(`Login failed: ${error.message}`);
    } else {
      alert('Welcome back, Admin!');
      window.location.hash = ''; 
      onClose();
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <form onSubmit={handleLogin} className="bg-slate-900 border border-white/10 p-8 rounded-2xl shadow-2xl max-w-md w-full relative">
        <button 
          type="button"
          onClick={() => { window.location.hash = ''; onClose(); }}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold text-white mb-2 text-center font-mono">ADMIN GATEWAY</h2>
        <p className="text-xs text-slate-400 text-center mb-6">Unauthorized public entry is tracked and blocked</p>
        
        <div className="mb-4">
          <label className="block text-slate-400 text-xs font-mono mb-2 uppercase">Email Address</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-slate-950 border border-white/10 text-white rounded-lg p-3 text-sm focus:outline-none focus:border-indigo-500"
            required 
          />
        </div>

        <div className="mb-6">
          <label className="block text-slate-400 text-xs font-mono mb-2 uppercase">Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-slate-950 border border-white/10 text-white rounded-lg p-3 text-sm focus:outline-none focus:border-indigo-500"
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
  );
}
