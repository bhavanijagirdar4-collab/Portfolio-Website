import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { X, LogOut, ShieldAlert } from 'lucide-react';

interface AdminLoginProps {
  onClose: () => void;
}

export default function AdminLogin({ onClose }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isCurrentlyLoggedIn, setIsCurrentlyLoggedIn] = useState(false);

  // Check if an active session already exists in local browser memory cache
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) setIsCurrentlyLoggedIn(true);
    });
  }, []);

  // Handle standard Admin Login Authentication
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ 
      email: email.trim(), 
      password: password.trim() 
    });

    setLoading(false);

    if (error) {
      alert(`Login failed: ${error.message}`);
    } else {
      alert('Welcome back, Admin!');
      window.location.hash = ''; 
      onClose();
    }
  };

  // Handle Session Destruction (Log Out)
  const handleLogout = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    setLoading(false);

    if (error) {
      alert(`Logout failed: ${error.message}`);
    } else {
      alert('Logged out successfully! Memory cleared.');
      setIsCurrentlyLoggedIn(false);
      window.location.hash = '';
      onClose();
      window.location.reload(); // Hard refresh to clean memory state completely
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md text-slate-100">
      <div className="bg-slate-900 border border-white/10 p-8 rounded-2xl shadow-2xl max-w-md w-full relative">
        
        {/* Close Button */}
        <button 
          type="button"
          onClick={() => { window.location.hash = ''; onClose(); }}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center mb-6">
          <ShieldAlert className="text-indigo-500 mb-2" size={32} />
          <h2 className="text-2xl font-bold font-mono tracking-wide">ADMIN GATEWAY</h2>
          <p className="text-xs text-slate-400 text-center mt-1">
            {isCurrentlyLoggedIn ? "Active admin session detected" : "Unauthorized entry attempts are logged"}
          </p>
        </div>

        {/* CONDITION: If you are already logged in, show a simple Sign Out panel instead */}
        {isCurrentlyLoggedIn ? (
          <div className="space-y-4 text-center">
            <p className="text-sm text-slate-300">You are securely signed in. Would you like to destroy the session token and close the gate?</p>
            <button
              type="button"
              onClick={handleLogout}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 disabled:bg-red-800 text-white font-semibold font-mono p-3 rounded-lg text-sm transition tracking-wider"
            >
              <LogOut size={16} />
              {loading ? 'TERMINATING...' : 'TERMINATE SESSION'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-slate-400 text-xs font-mono mb-2 uppercase">Email Address</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off" // Prevents immediate chrome text fills
                className="w-full bg-slate-950 border border-white/10 text-white rounded-lg p-3 text-sm focus:outline-none focus:border-indigo-500 font-sans"
                required 
              />
            </div>

            <div>
              <label className="block text-slate-400 text-xs font-mono mb-2 uppercase">Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password" // Breaks chrome's automated bypass trigger
                className="w-full bg-slate-950 border border-white/10 text-white rounded-lg p-3 text-sm focus:outline-none focus:border-indigo-500 font-sans"
                required 
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 text-white font-semibold font-mono p-3 rounded-lg text-sm transition tracking-wider pt-4"
            >
              {loading ? 'AUTHENTICATING...' : 'INITIATE LOGIN'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
