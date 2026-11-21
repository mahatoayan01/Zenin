import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, User, AlertCircle, ArrowRight, KeyRound } from 'lucide-react';
import { restaurantData } from '../data/restaurant';
import { useOwner } from '../context/OwnerContext';

export function OwnerLoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useOwner();

  const [username, setUsername] = useState('owner');
  const [password, setPassword] = useState('demo123');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/owner');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    const res = login(username, password);
    if (res.success) {
      navigate('/owner');
    } else {
      setErrorMsg(res.message);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl bg-brand-card border border-brand-border shadow-2xl space-y-6">
        {/* Header Icon & Title */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-brand-surface border border-brand-accent/40 text-brand-accent flex items-center justify-center mx-auto shadow-lg">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-cream">
            Owner Portal Login
          </h1>
          <p className="text-xs text-brand-muted">
            Access live order management, revenue analytics & customer history.
          </p>
        </div>

        {/* Prominent Demo Credentials Card */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-2">
          <div className="flex items-center gap-1.5 text-amber-400 font-bold">
            <KeyRound className="w-4 h-4" />
            <span>Demo Login (Pre-filled for you)</span>
          </div>
          <p className="text-amber-200/90 text-[11px] leading-relaxed">
            {restaurantData.credentials.disclaimer}
          </p>
          <div className="bg-brand-dark/80 p-2.5 rounded-xl border border-brand-border/60 text-[11px] font-mono flex items-center justify-between text-brand-cream">
            <span>user: <strong className="text-brand-accent">{restaurantData.credentials.username}</strong></span>
            <span>pass: <strong className="text-brand-accent">{restaurantData.credentials.password}</strong></span>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-brand-cream mb-1.5">
              Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-brand-dark/80 border border-brand-border text-brand-cream text-sm focus:outline-none focus:border-brand-accent placeholder-brand-muted/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-brand-cream mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-brand-dark/80 border border-brand-border text-brand-cream text-sm focus:outline-none focus:border-brand-accent placeholder-brand-muted/50"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-brand-accent hover:bg-brand-accentHover text-brand-dark font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition-all mt-2"
          >
            <span>Log In to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
