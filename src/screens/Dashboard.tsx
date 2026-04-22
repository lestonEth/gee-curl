import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { 
  TrendingUp, ShoppingBag, Package, Wallet, 
  ChevronRight, ArrowRight, Lightbulb, Download, Trash2, Edit2
} from 'lucide-react';
import { salesTrends, categoryDistribution, transactions } from '../mockData';
import { cn } from '../lib/utils';

// Helper for Dashboard cards
const KPICard = ({ title, value, icon: Icon, trend, color, alert }: any) => (
  <div className="bg-white p-6 rounded-xl soft-elevation border border-stone-100 flex flex-col justify-between h-32 relative group overflow-hidden">
    <div className="flex justify-between items-start">
      <span className="text-on-surface-variant font-bold text-[10px] uppercase tracking-wider">{title}</span>
      <Icon className={cn("transition-transform group-hover:scale-110", trend ? "text-primary" : "text-on-surface-variant/40")} size={20} />
    </div>
    <div className="flex items-baseline gap-2">
      <span className="font-serif text-2xl text-on-surface">{value}</span>
      {trend && <span className="text-[10px] bg-secondary-container text-on-secondary-container px-1.5 py-0.5 rounded font-bold">{trend}</span>}
      {alert && <span className="text-[10px] bg-primary text-on-primary px-1.5 py-0.5 rounded font-bold">Alert</span>}
    </div>
  </div>
);

export default function Dashboard() {
  return (
    <div className="p-4 sm:p-10 max-w-7xl mx-auto space-y-6 sm:space-y-10">
      {/* Header */}
      <section className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h3 className="font-serif text-2xl sm:text-3xl text-on-surface mb-1">Good Morning, Elena</h3>
          <p className="font-sans text-on-surface-variant italic text-xs sm:text-sm">Today is Monday, October 24th — Shop is currently bustling.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none px-5 py-2.5 border border-outline-variant text-on-surface-variant rounded-lg font-bold text-xs flex items-center justify-center gap-2 hover:bg-surface-container-low transition-all">
            <Download size={16} />
            Export Page
          </button>
        </div>
      </section>

      {/* KPI Grid */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <KPICard title="Total Sales" value="$4,280.50" icon={TrendingUp} trend="+12%" />
        <KPICard title="New Orders" value="24" icon={ShoppingBag} trend="from 18 yesterday" />
        <KPICard title="Low Stock" value="03" icon={ShoppingBag} alert={true} />
        <KPICard title="Net Profit" value="$1,840.00" icon={Wallet} trend="43% Margin" />
      </section>

      {/* Main Charts Bento */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-8 rounded-xl soft-elevation border border-stone-100 space-y-6">
          <div className="flex justify-between items-center">
            <h4 className="font-serif text-xl text-on-surface">Sales Trends</h4>
            <select className="bg-transparent border-none text-xs text-on-surface-variant font-bold focus:ring-0 cursor-pointer">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesTrends}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0efea" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#82756a' }} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '8px', 
                    border: 'none', 
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    fontSize: '12px',
                    fontFamily: 'Manrope'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#7d562d" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#7d562d', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6, fill: '#7d562d', stroke: '#fff', strokeWidth: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl soft-elevation border border-stone-100 flex flex-col">
          <h4 className="font-serif text-xl text-on-surface mb-8">Category Distribution</h4>
          <div className="flex-1 flex flex-col justify-center items-center">
            <div className="relative w-48 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryDistribution}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-serif text-on-surface font-bold">124</span>
                <span className="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest">Items Sold</span>
              </div>
            </div>
            <div className="mt-8 space-y-3 w-full">
              {categoryDistribution.map(item => (
                <div key={item.name} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                    <span className="text-sm text-on-surface-variant font-medium">{item.name}</span>
                  </div>
                  <span className="font-sans text-sm text-on-surface font-bold">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-10">
        <div className="lg:col-span-2 space-y-6 overflow-hidden">
          <div className="flex justify-between items-center px-1 sm:px-0">
            <h4 className="font-serif text-xl text-on-surface">Recent Activity</h4>
            <button className="text-primary font-bold text-xs hover:underline">View All</button>
          </div>
          <div className="bg-white rounded-xl soft-elevation border border-stone-100 overflow-x-auto">
            <table className="w-full text-left min-w-[500px]">
              <thead>
                <tr className="bg-surface-container-low border-b border-stone-100">
                  <th className="px-6 py-4 text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">Product</th>
                  <th className="px-6 py-4 text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">Price</th>
                  <th className="px-6 py-4 text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-[10px] text-on-surface-variant font-bold uppercase tracking-widest text-right">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {transactions.slice(0, 5).map(t => (
                  <tr key={t.id} className="hover:bg-stone-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-sans font-semibold text-sm text-on-surface">{t.description.split(': ')[1]}</span>
                    </td>
                    <td className="px-6 py-4 font-sans text-sm text-on-surface-variant">${t.amount.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-2 py-0.5 text-[10px] rounded-full font-bold uppercase",
                        t.status === 'completed' ? "bg-emerald-50 text-emerald-700" : "bg-primary/10 text-primary"
                      )}>{t.status}</span>
                    </td>
                    <td className="px-6 py-4 text-right text-[10px] font-bold text-on-surface-variant/40">{t.date.split(', ')[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="font-serif text-xl text-on-surface">Quick Actions</h4>
          <div className="flex flex-col gap-4">
            {[
              { label: 'Record New Sale', desc: 'Process a walk-in transaction', icon: TrendingUp, color: 'bg-on-surface text-on-primary' },
              { label: 'Add Product', desc: 'Update inventory catalog', icon: ShoppingBag, color: 'bg-white text-on-surface' },
              { label: 'View Report', desc: 'Detailed monthly analytics', icon: TrendingUp, color: 'bg-white text-on-surface' },
            ].map((action, idx) => (
              <button key={idx} className={cn(
                "w-full py-5 px-6 rounded-xl soft-elevation flex items-center justify-between group transition-all",
                action.color,
                action.label !== 'Record New Sale' && "border border-stone-100 hover:border-primary-container"
              )}>
                <div className="flex items-center gap-4">
                  <div className={cn("p-2 rounded-lg", idx === 0 ? "bg-primary-container/20 text-primary-container" : "text-primary")}>
                    <action.icon size={20} />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold">{action.label}</p>
                    <p className="text-[10px] opacity-40 font-medium">{action.desc}</p>
                  </div>
                </div>
                <ChevronRight size={18} className="opacity-20 group-hover:translate-x-1 transition-transform" />
              </button>
            ))}
            
            <div className="bg-primary-container/10 p-6 rounded-xl border border-primary-container/20 mt-4">
              <div className="flex items-start gap-3 mb-4">
                <Lightbulb className="text-primary mt-1" size={20} />
                <p className="text-xs text-on-primary-container leading-relaxed">
                  Elena, your <strong>Hydra Mask Set</strong> is trending 20% higher than last week. Consider a front-of-shop display.
                </p>
              </div>
              <button className="text-primary font-bold text-xs flex items-center gap-1 hover:gap-2 transition-all">
                Take Action <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
