import React, { useState, useMemo } from 'react';
import { StaffMember, Transaction, CartItem } from '../types';
import { 
  Calendar, 
  ChevronLeft, 
  Filter, 
  TrendingUp, 
  ShoppingBag, 
  Clock,
  ArrowRight,
  Search
} from 'lucide-react';
import { cn } from '../lib/utils';
import { format, isWithinInterval, startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear, parseISO, isSameDay } from 'date-fns';

interface StaffSalesProfileProps {
  staffMember: StaffMember;
  transactions: Transaction[];
  onBack: () => void;
}

type FilterType = 'day' | 'week' | 'month' | 'year' | 'all' | 'custom';

export default function StaffSalesProfile({ staffMember, transactions, onBack }: StaffSalesProfileProps) {
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [customRange, setCustomRange] = useState({ start: '', end: '' });
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTransactions = useMemo(() => {
    const now = new Date();
    const staffSales = transactions.filter(t => t.employee === staffMember.name && t.type === 'sale');

    return staffSales.filter(t => {
      const tDate = parseISO(t.date);
      
      let inRange = true;
      switch (filterType) {
        case 'day':
          inRange = isSameDay(tDate, now);
          break;
        case 'week':
          inRange = isWithinInterval(tDate, { start: startOfWeek(now), end: endOfWeek(now) });
          break;
        case 'month':
          inRange = isWithinInterval(tDate, { start: startOfMonth(now), end: endOfMonth(now) });
          break;
        case 'year':
          inRange = isWithinInterval(tDate, { start: startOfYear(now), end: endOfYear(now) });
          break;
        case 'custom':
          if (customRange.start && customRange.end) {
            inRange = isWithinInterval(tDate, { 
              start: startOfDay(parseISO(customRange.start)), 
              end: endOfDay(parseISO(customRange.end)) 
            });
          }
          break;
        case 'all':
        default:
          inRange = true;
      }

      const matchesSearch = t.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.id.toLowerCase().includes(searchQuery.toLowerCase());

      return inRange && matchesSearch;
    }).sort((a, b) => parseISO(b.date).getTime() - parseISO(a.date).getTime());
  }, [staffMember.name, transactions, filterType, customRange, searchQuery]);

  const totalSalesAmount = filteredTransactions.reduce((acc, t) => acc + t.amount, 0);
  const totalItemsSold = filteredTransactions.reduce((acc, t) => acc + (t.items?.reduce((cur, item) => cur + item.quantity, 0) || 0), 0);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="flex items-center gap-5">
          <button 
            onClick={onBack}
            className="p-3 bg-white border border-stone-200 rounded-2xl hover:bg-stone-50 transition-colors shadow-sm"
          >
            <ChevronLeft size={20} className="text-on-surface-variant" />
          </button>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20 shadow-inner">
              <img src={staffMember.image} alt={staffMember.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="font-serif text-2xl text-on-surface">{staffMember.name}</h2>
              <p className="text-xs font-bold text-primary uppercase tracking-widest">{staffMember.role}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 p-1 bg-surface-container-low rounded-2xl border border-stone-100 shadow-sm w-full sm:w-auto">
          {(['day', 'week', 'month', 'year', 'all', 'custom'] as FilterType[]).map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={cn(
                "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                filterType === type 
                  ? "bg-primary text-on-primary shadow-md" 
                  : "text-on-surface-variant hover:bg-white hover:text-primary"
              )}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {filterType === 'custom' && (
        <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm flex flex-col sm:flex-row items-end gap-4 animate-in fade-in slide-in-from-top-2">
          <div className="space-y-2 flex-1 w-full">
            <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest px-1">Start Date</label>
            <input 
              type="date" 
              value={customRange.start}
              onChange={(e) => setCustomRange(prev => ({ ...prev, start: e.target.value }))}
              className="w-full bg-stone-50 border-none rounded-xl px-4 py-3 text-sm font-bold text-on-surface focus:ring-2 focus:ring-primary/20 transition-all shadow-inner"
            />
          </div>
          <ArrowRight className="hidden sm:block mb-4 text-stone-300" />
          <div className="space-y-2 flex-1 w-full">
            <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest px-1">End Date</label>
            <input 
              type="date" 
              value={customRange.end}
              onChange={(e) => setCustomRange(prev => ({ ...prev, end: e.target.value }))}
              className="w-full bg-stone-50 border-none rounded-xl px-4 py-3 text-sm font-bold text-on-surface focus:ring-2 focus:ring-primary/20 transition-all shadow-inner"
            />
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-3xl border border-stone-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex flex-col gap-2">
          <div className="flex items-center gap-2 text-on-surface-variant opacity-60">
            <TrendingUp size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Revenue Generated</span>
          </div>
          <h3 className="text-3xl font-serif text-primary tracking-tight">${totalSalesAmount.toFixed(2)}</h3>
          <p className="text-[10px] font-bold text-on-surface-variant/40 mt-1 uppercase tracking-tight">Total Volume</p>
        </div>
        
        <div className="p-6 bg-white rounded-3xl border border-stone-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex flex-col gap-2">
          <div className="flex items-center gap-2 text-on-surface-variant opacity-60">
            <ShoppingBag size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Items Dispatched</span>
          </div>
          <h3 className="text-3xl font-serif text-on-surface tracking-tight">{totalItemsSold} Units</h3>
          <p className="text-[10px] font-bold text-on-surface-variant/40 mt-1 uppercase tracking-tight">Inventory Outflow</p>
        </div>

        <div className="p-6 bg-white rounded-3xl border border-stone-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex flex-col gap-2">
          <div className="flex items-center gap-2 text-on-surface-variant opacity-60">
            <Clock size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Active Transactions</span>
          </div>
          <h3 className="text-3xl font-serif text-on-surface tracking-tight">{filteredTransactions.length} Sales</h3>
          <p className="text-[10px] font-bold text-on-surface-variant/40 mt-1 uppercase tracking-tight">Successful Closures</p>
        </div>
      </div>

      {/* Search and Transactions */}
      <div className="bg-white rounded-3xl border border-stone-100 shadow-[0_10px_40px_-5px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className="px-8 py-6 border-b border-stone-50 bg-stone-50/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h4 className="font-serif text-xl text-on-surface">Detailed Sale History</h4>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40" size={16} />
            <input 
              type="text" 
              placeholder="Search by ID or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border-stone-200 rounded-xl pl-12 pr-4 py-2 text-sm font-bold text-on-surface focus:ring-2 focus:ring-primary/20 transition-all outline-none"
            />
          </div>
        </div>

        <div className="divide-y divide-stone-100">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((t) => (
              <div key={t.id} className="p-8 hover:bg-stone-50/50 transition-colors group">
                <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-[10px] font-black uppercase tracking-widest">{t.id}</span>
                      <span className="text-on-surface-variant/40 font-bold text-[10px] uppercase tracking-widest">{format(parseISO(t.date), 'MMM d, yyyy')}</span>
                    </div>
                    <div>
                      <h5 className="font-serif text-lg text-on-surface mb-2">{t.description}</h5>
                      <div className="flex flex-wrap gap-4">
                        {t.items?.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3 bg-white border border-stone-100 rounded-xl p-2 pr-4 shadow-sm">
                            <div className="w-10 h-10 rounded-lg overflow-hidden bg-stone-50">
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-on-surface leading-tight">{item.name}</p>
                              <p className="text-[10px] text-on-surface-variant font-medium">Qty: {item.quantity} × ${item.price}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-left md:text-right w-full md:w-auto">
                    <p className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-widest mb-1">Total Transaction</p>
                    <p className="text-2xl font-sans font-black text-primary">${t.amount.toLocaleString()}</p>
                    <div className="mt-3 flex items-center md:justify-end gap-2">
                       <span className="px-2 py-0.5 bg-green-50 text-green-700 text-[9px] font-black uppercase tracking-tighter rounded border border-green-100">{t.method}</span>
                       <span className="px-2 py-0.5 bg-secondary-container/30 text-secondary text-[9px] font-black uppercase tracking-tighter rounded border border-secondary-container">{t.status}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 flex flex-col items-center justify-center text-on-surface-variant/30 gap-4">
              <ShoppingBag size={48} strokeWidth={1} />
              <p className="font-bold text-sm tracking-widest uppercase">No sales matching filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
