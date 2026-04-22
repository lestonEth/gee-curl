import React from 'react';
import { products } from '../mockData';
import { FileDown, Plus, Filter, MoreVertical, Edit2, Trash2, TrendingUp, Calendar, Star, AlertTriangle } from 'lucide-react';
import { cn } from '../lib/utils';

export default function InventoryScreen() {
  return (
    <div className="p-10 space-y-8 max-w-[1400px] mx-auto w-full">
      {/* Page Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="font-serif text-3xl text-primary tracking-tight">Product Inventory</h2>
          <p className="text-on-surface-variant text-sm mt-1">Manage your boutique essentials and stock levels.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-outline-variant rounded-lg font-semibold text-sm text-on-surface-variant hover:bg-surface-container transition-colors shadow-sm">
            <FileDown size={18} />
            Export CSV
          </button>
          <button className="flex items-center gap-2 px-5 py-2 bg-primary text-on-primary rounded-lg font-semibold text-sm shadow-sm hover:opacity-90 transition-all">
            <Plus size={18} />
            Add New Product
          </button>
        </div>
      </div>

      {/* Stock Alert Banner */}
      <div className="bg-secondary-container/30 border border-secondary-container rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-secondary">
            <AlertTriangle className="animate-pulse" size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-on-secondary-container">Stock Alert: Critical Levels</h4>
            <p className="text-xs text-on-secondary-container opacity-80">4 items are currently out of stock and 8 items require immediate reordering.</p>
          </div>
        </div>
        <button className="text-secondary font-bold text-sm hover:underline decoration-2 underline-offset-4">
          Review Alerts
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-2">
        <div className="flex gap-2 p-1 bg-surface-container-low rounded-xl border border-outline-variant/30">
          <button className="px-6 py-2 bg-white rounded-lg shadow-sm font-bold text-xs text-primary">All Products</button>
          <button className="px-6 py-2 rounded-lg font-bold text-xs text-on-surface-variant hover:bg-white/50 transition-colors">Skincare</button>
          <button className="px-6 py-2 rounded-lg font-bold text-xs text-on-surface-variant hover:bg-white/50 transition-colors">Haircare</button>
          <button className="px-6 py-2 rounded-lg font-bold text-xs text-on-surface-variant hover:bg-white/50 transition-colors">Makeup</button>
          <button className="px-6 py-2 rounded-lg font-bold text-xs text-on-surface-variant hover:bg-white/50 transition-colors">Fragrance</button>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-on-surface-variant font-bold text-xs">
            <Filter size={16} />
            Sort by: <span className="text-primary">Latest Added</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-stone-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/50">
                <th className="px-8 py-4 font-bold text-[10px] text-on-surface-variant uppercase tracking-widest">Product</th>
                <th className="px-6 py-4 font-bold text-[10px] text-on-surface-variant uppercase tracking-widest">Category</th>
                <th className="px-6 py-4 font-bold text-[10px] text-on-surface-variant uppercase tracking-widest">Price</th>
                <th className="px-6 py-4 font-bold text-[10px] text-on-surface-variant uppercase tracking-widest text-center">Stock Level</th>
                <th className="px-6 py-4 font-bold text-[10px] text-on-surface-variant uppercase tracking-widest">Supplier</th>
                <th className="px-8 py-4 font-bold text-[10px] text-on-surface-variant uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-background transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-surface-container overflow-hidden flex-shrink-0">
                        <img src={p.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-on-surface">{p.name}</p>
                        <p className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-tight">SKU: {p.sku}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="px-3 py-1 bg-tertiary-container/20 text-tertiary rounded-full font-bold text-[10px]">{p.category}</span>
                  </td>
                  <td className="px-6 py-5 font-sans font-medium text-sm text-on-surface">${p.price.toFixed(2)}</td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col items-center gap-1">
                      <span className={cn(
                        "px-3 py-1 rounded-full font-bold text-[10px]",
                        p.stock === 0 ? "bg-red-50 text-red-600 border border-red-100" :
                        p.stock < 5 ? "bg-yellow-50 text-yellow-600 border border-yellow-100" :
                        "bg-green-50 text-green-700 border border-green-100"
                      )}>
                        {p.stock === 0 ? 'Out of Stock' : p.stock < 5 ? 'Low Stock' : 'In Stock'}
                      </span>
                      <span className={cn(
                        "text-[10px] font-bold",
                        p.stock === 0 ? "text-red-600" : p.stock < 5 ? "text-yellow-600" : "text-green-600"
                      )}>{p.stock} Units</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm text-on-surface-variant">{p.supplier}</td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-2 text-on-surface-variant hover:text-error transition-colors">
                        <Trash2 size={16} />
                      </button>
                      <button className="p-2 text-on-surface-variant hover:text-on-surface transition-colors">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-8 py-6 bg-surface-container-low/30 border-t border-stone-100 flex items-center justify-between">
          <p className="text-xs text-on-surface-variant font-medium">
            Showing <span className="font-bold text-primary">1-6</span> of 148 products
          </p>
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-lg bg-primary text-on-primary font-bold text-xs">1</button>
            <button className="w-10 h-10 rounded-lg text-on-surface-variant font-bold text-xs hover:bg-surface-container transition-colors">2</button>
            <button className="w-10 h-10 rounded-lg text-on-surface-variant font-bold text-xs hover:bg-surface-container transition-colors">3</button>
            <span className="px-2 text-on-surface-variant">...</span>
            <button className="w-10 h-10 rounded-lg text-on-surface-variant font-bold text-xs hover:bg-surface-container transition-colors">15</button>
          </div>
        </div>
      </div>

      {/* Metrics Bento */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12">
        <div className="p-6 bg-white rounded-xl border border-stone-100 shadow-sm flex flex-col gap-2">
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest opacity-60">Total Inventory Value</span>
          <h3 className="text-2xl font-serif text-primary">$242,105.50</h3>
          <div className="mt-4 flex items-center gap-2 text-green-600 font-bold text-xs">
            <TrendingUp size={14} />
            <span>+12.5% from last month</span>
          </div>
        </div>
        <div className="p-6 bg-white rounded-xl border border-stone-100 shadow-sm flex flex-col gap-2">
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest opacity-60">Restock Frequency</span>
          <h3 className="text-2xl font-serif text-primary">Every 14 Days</h3>
          <div className="mt-4 flex items-center gap-2 text-on-surface-variant font-bold text-xs">
            <Calendar size={14} />
            <span>Next scheduled: Oct 24th</span>
          </div>
        </div>
        <div className="p-6 bg-white rounded-xl border border-stone-100 shadow-sm flex flex-col gap-2">
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest opacity-60">Top Category</span>
          <h3 className="text-2xl font-serif text-primary">Organic Skincare</h3>
          <div className="mt-4 flex items-center gap-2 text-on-surface-variant font-bold text-xs">
            <Star size={14} />
            <span>42% of total revenue</span>
          </div>
        </div>
      </div>
    </div>
  );
}
