import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Lock, Mail, Eye, EyeOff, ShieldCheck } from 'lucide-react';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // If user is already logged in, redirect to dashboard
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/admin/dashboard', { replace: true });
      }
    };
    checkUser();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMsg('Invalid credentials. Please verify and try again.');
      } else if (data.session) {
        navigate('/admin/dashboard', { replace: true });
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden font-sans select-none">
      {/* Visual Ambient Background */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none animate-[pulse_8s_infinite]" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none animate-[pulse_6s_infinite]" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff04_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/50 to-[#020617] pointer-events-none" />

      {/* Login Card */}
      <div className="w-full max-w-[440px] bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-[2rem] p-8 sm:p-10 relative z-10 shadow-[0_30px_70px_rgba(0,0,0,0.8)] shadow-purple-500/5 hover:border-purple-500/20 transition-all duration-500">
        
        {/* Glowing top accent line */}
        <div className="absolute top-0 left-10 right-10 h-[2px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent pointer-events-none" />

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/30 text-purple-400 mb-5 shadow-[0_8px_30px_rgba(124,58,237,0.15)] relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            <Lock size={26} className="relative z-10 animate-[pulse_2s_infinite]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-header text-white mb-2 tracking-tight">
            Security Access
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm font-mono tracking-wide uppercase">// Core Admin Panel Gate</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {errorMsg && (
            <div className="p-4 bg-red-950/20 border border-red-500/20 text-red-400 rounded-2xl text-xs sm:text-sm font-mono text-center flex items-center justify-center gap-2 animate-[shake_0.4s_ease-in-out]">
              <ShieldCheck size={16} className="shrink-0 text-red-500" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">// Email Identity</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 group-focus-within:text-purple-400 transition-colors duration-300" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@testimony.com"
                className="w-full pl-12 pr-4 py-3.5 bg-slate-950/50 border border-slate-800/80 rounded-xl text-sm text-white placeholder:text-slate-700 focus:outline-none focus:border-purple-500/80 focus:ring-4 focus:ring-purple-500/5 focus:bg-slate-950/80 transition-all duration-300 shadow-inner"
                disabled={loading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">// Cryptographic Key</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 group-focus-within:text-purple-400 transition-colors duration-300" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-3.5 bg-slate-950/50 border border-slate-800/80 rounded-xl text-sm text-white placeholder:text-slate-700 focus:outline-none focus:border-purple-500/80 focus:ring-4 focus:ring-purple-500/5 focus:bg-slate-950/80 transition-all duration-300 shadow-inner"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                disabled={loading}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:from-purple-600/50 disabled:to-indigo-600/50 text-white rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-purple-600/20 hover:shadow-purple-600/40 cursor-pointer text-sm font-mono uppercase tracking-wider relative overflow-hidden group"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Unlock Console</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
