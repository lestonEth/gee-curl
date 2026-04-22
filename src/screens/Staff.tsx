import React from 'react';
import { staff } from '../mockData';
import { Calendar, UserPlus, Trophy, Star, Filter, MoreVertical, Edit } from 'lucide-react';
import { cn } from '../lib/utils';

export default function StaffScreen() {
  return (
    <div className="p-4 sm:p-10 max-w-[1400px] mx-auto w-full space-y-6 sm:space-y-10 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-8">
        <div>
          <p className="text-primary font-bold text-[10px] uppercase tracking-widest mb-1 sm:mb-2 text-left">Human Resources</p>
          <h1 className="font-serif text-2xl sm:text-3xl text-on-surface text-left">Staff & Performance</h1>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 border border-outline px-6 py-2.5 rounded-xl font-bold text-xs hover:bg-surface-container-low transition-colors text-on-surface-variant">
            <Calendar size={18} />
            Shift Schedule
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-on-surface text-on-primary px-6 py-2.5 rounded-xl font-bold text-xs hover:bg-on-surface/90 transition-all shadow-md">
            <UserPlus size={18} />
            New Employee
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Weekly Leader */}
        <div className="col-span-12 lg:col-span-4 bg-primary-container/20 border border-primary-container/20 rounded-xl p-8 flex flex-col justify-between soft-elevation relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-40 h-40 bg-primary-container/5 rounded-full blur-2xl"></div>
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Trophy className="text-primary fill-primary/20" size={20} />
              <h3 className="text-[10px] font-bold text-primary uppercase tracking-widest">Weekly Leader</h3>
            </div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-20 h-20 rounded-full border-4 border-white overflow-hidden shadow-sm">
                <img src={staff[0].image} alt="" className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-serif text-2xl text-on-surface">{staff[0].name}</h4>
                <p className="text-on-surface-variant/60 text-xs font-semibold">{staff[0].role}</p>
              </div>
            </div>
          </div>
          <div className="bg-white/40 backdrop-blur-sm rounded-xl p-5 border border-white/40">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-on-surface-variant">Client Retention</span>
              <span className="text-sm font-black text-primary">98%</span>
            </div>
            <div className="w-full bg-primary/10 h-2 rounded-full overflow-hidden">
              <div className="bg-primary h-full" style={{ width: '98%' }}></div>
            </div>
          </div>
        </div>

        {/* Global Metrics */}
        <div className="col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
           {[
             { label: 'Average Satisfaction', value: '4.9', sub: '+0.2 from last month', icon: Star, color: 'text-primary' },
             { label: 'Total Sales', value: '$42,850', sub: 'Target: $45,000', icon: null, color: 'text-primary' },
             { label: 'Staff Utilization', value: '82%', sub: null, progress: 82, icon: null, color: 'text-tertiary' }
           ].map((metric, i) => (
             <div key={i} className="bg-white border border-stone-100 rounded-xl p-8 soft-elevation flex flex-col justify-center">
               <p className="text-on-surface-variant/40 text-[10px] font-bold uppercase tracking-widest mb-1">{metric.label}</p>
               <div className="flex items-baseline gap-2">
                 <span className="text-3xl font-serif text-on-surface">{metric.value}</span>
                 {metric.icon && <metric.icon size={16} className={cn(metric.color, "fill-current")} />}
               </div>
               {metric.sub && <p className={cn("text-[10px] mt-2 font-bold", metric.color)}>{metric.sub}</p>}
               {metric.progress && (
                 <div className="w-full bg-surface-container h-1.5 rounded-full mt-4 overflow-hidden">
                   <div className={cn("h-full rounded-full transition-all duration-1000", metric.color === 'text-tertiary' ? 'bg-tertiary' : 'bg-primary')} style={{ width: `${metric.progress}%` }}></div>
                 </div>
               )}
             </div>
           ))}
        </div>

        {/* Staff Table */}
        <div className="col-span-12 bg-white border border-stone-100 rounded-xl soft-elevation overflow-hidden">
          <div className="p-6 border-b border-stone-50 flex justify-between items-center bg-stone-50/10">
            <h3 className="font-serif text-xl text-on-surface">Current Team</h3>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-surface-container rounded-lg text-on-surface-variant transition-colors"><Filter size={20} /></button>
              <button className="p-2 hover:bg-surface-container rounded-lg text-on-surface-variant transition-colors"><MoreVertical size={20} /></button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest border-b border-stone-50">
                  <th className="px-8 py-5">Employee</th>
                  <th className="px-8 py-4">Role</th>
                  <th className="px-8 py-4 text-center">Monthly Sales</th>
                  <th className="px-8 py-4 text-center">Satisfaction</th>
                  <th className="px-8 py-4 text-center">Status</th>
                  <th className="px-8 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50 text-sm">
                {staff.map(member => (
                  <tr key={member.id} className="hover:bg-stone-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container shrink-0">
                          <img src={member.image} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-bold text-on-surface">{member.name}</p>
                          <p className="text-xs text-on-surface-variant/60">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="bg-surface-container text-on-surface-variant font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">{member.role}</span>
                    </td>
                    <td className="px-8 py-6 text-center font-sans font-semibold">${member.monthlySales.toLocaleString()}</td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-center gap-1">
                        <span className="font-bold">{member.satisfaction}</span>
                        <Star size={12} className="text-primary fill-primary" />
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-center gap-2">
                        <div className={cn("w-1.5 h-1.5 rounded-full", member.status === 'active' ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" : "bg-stone-300")}></div>
                        <span className={cn("text-[10px] font-bold uppercase", member.status === 'active' ? "text-emerald-600" : "text-stone-400")}>{member.status}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="text-primary hover:underline font-bold text-xs uppercase tracking-wider transition-all">Edit Profile</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Floating Info */}
      <div className="fixed bottom-8 right-8 flex items-center gap-3 bg-white px-6 py-4 rounded-full soft-elevation border border-stone-100 z-50">
        <div className="w-3 h-3 bg-primary rounded-full shadow-[0_0_12px_rgba(125,86,45,0.6)] animate-pulse"></div>
        <p className="text-[10px] font-bold text-on-surface uppercase tracking-widest">Low Inventory Alert: Rose Essence</p>
      </div>
    </div>
  );
}
