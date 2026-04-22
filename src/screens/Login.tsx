import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, Eye, EyeOff, Loader2 } from 'lucide-react';
import { UserRole } from '../types';

interface LoginProps {
  onLogin: (email: string, role: UserRole) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate login logic
    setTimeout(() => {
      // Demo credentials
      if (email === 'admin@geecurly.com' && password === 'admin') {
        onLogin(email, 'SUPER_ADMIN');
      } else if (email === 'manager@geecurly.com' && password === 'manager') {
        onLogin(email, 'FLOOR_MANAGER');
      } else if (email === 'sales@geecurly.com' && password === 'sales') {
        onLogin(email, 'SALES_PERSON');
      } else {
        setError('Invalid credentials. Try: admin@geecurly.com / admin');
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 lg:p-12 border border-outline-variant/30"
      >
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl text-primary tracking-tighter mb-2">GEE CURLY</h1>
          <p className="text-on-surface-variant/60 font-sans text-sm italic">Management System Access</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest px-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40" size={18} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="email@geecurly.com"
                className="w-full bg-surface-container-low border-none rounded-xl pl-12 pr-4 py-4 text-sm font-semibold text-on-surface focus:ring-2 focus:ring-primary/20 transition-all shadow-inner"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest px-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40" size={18} />
              <input 
                type={showPassword ? 'text' : 'password'} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full bg-surface-container-low border-none rounded-xl pl-12 pr-12 py-4 text-sm font-semibold text-on-surface focus:ring-2 focus:ring-primary/20 transition-all shadow-inner"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40 hover:text-primary transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-error text-xs font-bold text-center"
            >
              {error}
            </motion.p>
          )}

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-on-surface text-on-primary py-4 rounded-xl font-serif text-lg font-bold hover:bg-primary transition-all shadow-xl shadow-on-surface/10 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <span>Verifying...</span>
              </>
            ) : (
              'Enter Workspace'
            )}
          </button>
        </form>

        <div className="mt-12 pt-8 border-t border-stone-50 text-center">
          <p className="text-[10px] text-on-surface-variant/40 font-black uppercase tracking-widest mb-4 italic">Security Information</p>
          <div className="grid grid-cols-1 gap-2 text-[10px] font-bold text-on-surface-variant/60 leading-relaxed">
            <p>Admin: admin@geecurly.com / admin</p>
            <p>Manager: manager@geecurly.com / manager</p>
            <p>Sales: sales@geecurly.com / sales</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
