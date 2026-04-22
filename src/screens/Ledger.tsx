import React from 'react';
import { Download, TrendingUp, Wallet, ArrowUpRight, Search, Calendar, Filter, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { transactions } from '../mockData';
import { cn } from '../lib/utils';

export default function LedgerScreen() {
  return (
    <div className="p-4 sm:p-10 space-y-6 sm:space-y-10 max-w-[1400px] mx-auto w-full text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h3 className="font-serif text-2xl sm:text-3xl text-on-surface">Financial Ledger</h3>
          <p className="font-sans text-on-surface-variant text-xs sm:text-sm mt-1">Performance for Oct 1 — Oct 31, 2023</p>
        </div>
        <button className="w-full sm:w-auto border border-outline px-6 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-stone-50 transition-colors text-on-surface-variant">
          <Download size={18} />
          Monthly Report
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-surface-container-high flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">DEBITS / SALES</span>
              <TrendingUp className="text-on-surface-variant/20" size={20} />
            </div>
            <h4 className="text-3xl font-serif text-on-surface">$24,850.00</h4>
          </div>
          <p className="text-[10px] text-on-surface-variant mt-4 font-bold uppercase tracking-widest">
            <span className="text-emerald-600">+12%</span> vs last month
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-surface-container-high flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded">CREDITS / EXPENSES</span>
              <ArrowUpRight className="text-on-surface-variant/20" size={20} />
            </div>
            <h4 className="text-3xl font-serif text-on-surface">$8,210.45</h4>
          </div>
          <p className="text-[10px] text-on-surface-variant mt-4 font-bold uppercase tracking-widest">
            <span className="text-secondary font-bold">+4%</span> inventory increase
          </p>
        </div>

        <div className="bg-on-surface p-8 rounded-xl shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest">Net Balance</span>
              <Wallet className="text-on-surface-variant/60" size={20} />
            </div>
            <h4 className="text-3xl font-serif text-white">$16,639.55</h4>
          </div>
          <div className="h-1.5 w-full bg-on-surface-variant/20 rounded-full mt-4 overflow-hidden">
            <div className="h-full bg-primary-container w-2/3"></div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-surface-container-low p-4 sm:p-6 rounded-2xl flex flex-col sm:flex-row flex-wrap gap-4 lg:gap-8 items-stretch sm:items-end border border-surface-container-high/40 overflow-x-auto scrollbar-hide">
        <div className="flex flex-col gap-2 min-w-[200px]">
          <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest px-1">Date Range</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/40" size={16} />
            <select className="bg-white border-none rounded-lg pl-10 pr-8 py-2.5 text-sm font-bold text-on-surface focus:ring-1 focus:ring-primary appearance-none w-full shadow-sm">
              <option>Oct 01 - Oct 31, 2023</option>
              <option>Sep 01 - Sep 30, 2023</option>
              <option>Custom Range...</option>
            </select>
          </div>
        </div>
        <div className="flex-1 flex gap-4">
          <div className="flex flex-col gap-2 flex-1">
            <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest px-1">Type</label>
            <select className="bg-white border-none rounded-lg px-4 py-2.5 text-sm font-bold text-on-surface focus:ring-1 focus:ring-primary w-full shadow-sm">
              <option>All Types</option>
              <option>Sales (Debit)</option>
              <option>Purchase (Credit)</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest px-1">Category</label>
            <select className="bg-white border-none rounded-lg px-4 py-2.5 text-sm font-bold text-on-surface focus:ring-1 focus:ring-primary w-full shadow-sm">
              <option>All Categories</option>
              <option>Skincare Products</option>
              <option>Service Fees</option>
            </select>
          </div>
        </div>
        <button className="sm:mb-1 text-primary font-bold text-xs uppercase tracking-widest hover:underline px-2 transition-all">Clear All</button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-surface-container-high overflow-hidden">
        <div className="px-4 sm:px-8 py-5 border-b border-surface-container-low flex justify-between items-center">
          <h5 className="font-serif text-lg sm:text-xl text-on-surface">Transaction History</h5>
          <div className="hidden sm:flex gap-4">
            <span className="flex items-center gap-2 text-[10px] font-black text-on-surface-variant/60 uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Credit
            </span>
            <span className="flex items-center gap-2 text-[10px] font-black text-on-surface-variant/60 uppercase">
              <span className="w-2 h-2 rounded-full bg-error"></span> Debit
            </span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[700px]">
            <thead className="bg-surface-container-low/30 border-b border-surface-container-low">
              <tr className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                <th className="px-8 py-5">Date</th>
                <th className="px-6 py-5">Description</th>
                <th className="px-6 py-5">Employee</th>
                <th className="px-6 py-5">Method</th>
                <th className="px-8 py-5 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-low text-sm">
              {transactions.map(t => (
                <tr key={t.id} className="hover:bg-surface-container-low/20 transition-colors">
                  <td className="px-8 py-5 font-sans font-medium text-on-surface-variant">{t.date}</td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="font-bold text-on-surface">{t.description}</span>
                      <span className="text-[10px] text-on-surface-variant/60 uppercase">Order Details • {t.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                       <div className="w-6 h-6 rounded-full bg-primary-container/20 flex items-center justify-center text-[8px] font-black text-primary">
                         {t.employee.split(' ').map(n => n[0]).join('')}
                       </div>
                       <span className="font-semibold text-on-surface-variant">{t.employee}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-[10px] font-black bg-surface-container px-3 py-1 rounded-full uppercase text-on-surface-variant">{t.method}</span>
                  </td>
                  <td className={cn(
                    "px-8 py-5 text-right font-sans font-black text-base",
                    t.type === 'restock' || t.type === 'expense' ? "text-emerald-600" : "text-error"
                  )}>
                    ${t.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-8 py-4 bg-surface-container-low/30 border-t border-surface-container-low flex items-center justify-between">
          <span className="text-xs text-on-surface-variant/60 font-medium">Showing 1 to 5 of 124 entries</span>
          <div className="flex gap-1">
            <button className="w-8 h-8 rounded-lg border border-surface-container flex items-center justify-center text-on-surface-variant/40 hover:bg-white transition-colors">
              <ChevronLeft size={16} />
            </button>
            <button className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center text-xs font-bold">1</button>
            <button className="w-8 h-8 rounded-lg border border-surface-container flex items-center justify-center text-xs text-on-surface-variant/60 hover:bg-white transition-colors">2</button>
            <button className="w-8 h-8 rounded-lg border border-surface-container flex items-center justify-center text-xs text-on-surface-variant/60 hover:bg-white transition-colors">3</button>
            <button className="w-8 h-8 rounded-lg border border-surface-container flex items-center justify-center text-on-surface-variant/40 hover:bg-white transition-colors">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Detailed Footer Banner */}
      <div className="relative h-64 rounded-3xl overflow-hidden group">
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMrxknIQftQJ1CYIftKWM7JY0DAzQN2txWZrL71jHpwyRtK3vstO3yEtTL7CWJAWOIgI9t_QUR2AD1GG90v9xmNSgTV_f0CYoAXgB2bfUr57BJWWMrBaglTwvrIQ1gjk58tK7Wv0GXPPNjeOskVFQ6tmJkG4K64diJF0Z9WgHjd1oHlleS5nFU9_bEKm-x1M7PQLfW5F-2rZ7MILYwpxcPEHr4-lpbh2Udtk2hq70Rq1WeFmuBJ2s1GWgEvUrSIxVlwWTyafH87FVY" 
          alt="Banner" 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-on-surface/50 backdrop-blur-sm flex flex-col items-center justify-center text-on-primary text-center p-12">
          <h5 className="font-serif text-3xl mb-4 text-primary-container">Detailed Analytics & Forecasting</h5>
          <p className="text-sm text-white/70 max-w-xl leading-relaxed">
            Upgrade your ledger view with predictive revenue modeling and seasonal stock forecasting based on historical shop data. 
            Identify peak hours and optimize staffing effortlessly.
          </p>
          <button className="mt-8 bg-white text-on-surface px-8 py-3 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-primary-container hover:text-on-primary transition-all shadow-xl">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}
