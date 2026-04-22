import React from 'react';
import { User, Shield, Info, Database, Bell, Palette, Users, Settings as SettingsIcon, LogOut } from 'lucide-react';
import { UserRole, User as UserType } from '../types';
import { cn } from '../lib/utils';

interface SettingsProps {
  user: UserType | null;
  onLogout: () => void;
}

export default function SettingsScreen({ user, onLogout }: SettingsProps) {
  const isAdmin = user?.role === 'SUPER_ADMIN';

  const sections = [
    {
      title: 'Profile Settings',
      icon: User,
      items: [
        { label: 'Edit Profile', desc: 'Change your personal information and avatar.' },
        { label: 'Security', desc: 'Update your password and emergency codes.' }
      ]
    },
    {
      title: 'Preferences',
      icon: Palette,
      items: [
        { label: 'Appearance', desc: 'Manage theme, colors, and layout density.' },
        { label: 'Notifications', desc: 'Configure system and sales alerts.' }
      ]
    }
  ];

  if (isAdmin) {
    sections.unshift({
      title: 'Administration',
      icon: Shield,
      items: [
        { label: 'User Management', desc: 'Create, edit, or remove staff accounts and roles.' },
        { label: 'System Audit', desc: 'View comprehensive logs of all staff activities.' },
        { label: 'Global Configurations', desc: 'Set currency, tax rates, and store hours.' }
      ]
    });
  }

  return (
    <div className="p-4 sm:p-10 max-w-[1400px] mx-auto w-full space-y-10 text-left">
      <div className="flex justify-between items-end mb-8">
        <div>
          <p className="text-primary font-bold text-[10px] uppercase tracking-widest mb-2">Workspace Control</p>
          <h1 className="font-serif text-3xl text-on-surface">System Settings</h1>
        </div>
        <button 
          onClick={onLogout}
          className="flex items-center gap-2 bg-error text-on-error px-6 py-2.5 rounded-xl font-bold text-xs hover:bg-error/90 transition-all shadow-md"
        >
          <LogOut size={18} />
          Log Out System
        </button>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Sidebar Info */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl border border-stone-100 p-8 shadow-sm text-center">
            <div className="w-24 h-24 rounded-full bg-primary-container/20 mx-auto mb-4 flex items-center justify-center border-4 border-white shadow-inner">
              <User className="text-primary" size={40} />
            </div>
            <h3 className="font-serif text-xl text-on-surface">{user?.name}</h3>
            <p className="text-[10px] font-black text-primary bg-primary/10 inline-block px-3 py-1 rounded-full uppercase tracking-widest mt-2">
              {user?.role.replace('_', ' ')}
            </p>
            <p className="text-xs text-on-surface-variant/40 mt-4 italic font-medium">{user?.email}</p>
          </div>

          <div className="bg-on-surface p-6 rounded-2xl text-on-primary">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white/10 rounded-lg">
                <Info size={18} />
              </div>
              <h4 className="font-serif text-lg">System Info</h4>
            </div>
            <div className="space-y-3 text-[10px] font-bold uppercase tracking-widest opacity-60">
              <div className="flex justify-between">
                <span>Version</span>
                <span>2.4.0-premium</span>
              </div>
              <div className="flex justify-between">
                <span>Database</span>
                <span>Cloud-Sync-Live</span>
              </div>
              <div className="flex justify-between">
                <span>Last Sync</span>
                <span>2 mins ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Grid */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          {sections.map((section, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-stone-100 overflow-hidden shadow-sm">
              <div className="px-8 py-5 border-b border-stone-50 bg-stone-50/10 flex items-center gap-3">
                <section.icon className="text-primary" size={20} />
                <h4 className="font-serif text-lg text-on-surface">{section.title}</h4>
              </div>
              <div className="divide-y divide-stone-50">
                {section.items.map((item, i) => (
                  <button 
                    key={i} 
                    className="w-full px-8 py-5 text-left hover:bg-stone-50 transition-colors group flex items-center justify-between"
                  >
                    <div>
                      <p className="font-bold text-sm text-on-surface group-hover:text-primary transition-colors">{item.label}</p>
                      <p className="text-xs text-on-surface-variant/60 mt-0.5">{item.desc}</p>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <SettingsIcon size={14} className="text-on-surface-variant" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Dangerous Zone */}
          <div className="bg-error/5 border border-error/10 rounded-2xl p-8 flex items-center justify-between">
            <div>
              <h4 className="font-serif text-lg text-error">System Recovery</h4>
              <p className="text-xs text-error/60 mt-1">Revert system state to last verified backup. Use with caution.</p>
            </div>
            <button className="bg-error text-on-error px-6 py-2 rounded-xl font-bold text-xs hover:brightness-110 shadow-lg shadow-error/20 transition-all uppercase tracking-widest">
              Reset Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
