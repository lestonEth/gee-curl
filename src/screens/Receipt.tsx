import React from 'react';
import { 
  Printer, 
  FileDown, 
  Mail, 
  ArrowLeft, 
  CreditCard, 
  Search, 
  Bell, 
  HelpCircle,
  QrCode
} from 'lucide-react';

export default function ReceiptScreen() {
  return (
    <div className="flex flex-col h-full bg-surface">
      <div className="max-w-4xl mx-auto w-full flex flex-col lg:flex-row gap-8 lg:gap-12 p-4 lg:py-12">
        {/* Left Side: Actions */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6 order-2 lg:order-1">
          <div className="bg-white p-6 rounded-xl border border-surface-container shadow-sm">
            <h3 className="font-serif text-lg font-bold text-on-surface mb-4">Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              <button className="flex items-center justify-center gap-2 bg-primary text-on-primary py-3 px-4 rounded-lg font-bold text-sm hover:opacity-90 transition-all shadow-md">
                <Printer size={18} />
                Print Receipt
              </button>
              <button className="flex items-center justify-center gap-2 border border-outline-variant text-primary py-3 px-4 rounded-lg font-bold text-sm hover:bg-surface-container transition-all">
                <FileDown size={18} />
                Download PDF
              </button>
              <button className="flex items-center justify-center gap-2 text-on-surface-variant hover:text-on-surface py-3 px-4 rounded-lg font-bold text-sm transition-all sm:col-span-2 lg:col-span-1">
                <Mail size={18} />
                Email to Customer
              </button>
            </div>
          </div>

          <div className="bg-surface-container-low p-6 rounded-xl border border-surface-container border-dashed">
            <h3 className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-widest mb-4">Transaction Details</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-on-surface-variant/60">STATUS</span>
                <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-[10px] font-black">COMPLETED</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-on-surface-variant/60">GATEWAY</span>
                <span className="text-xs font-bold text-on-surface">Stripe Terminal</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-on-surface-variant/60">TERMINAL ID</span>
                <span className="text-xs font-bold text-on-surface">#TRM-8821</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: The Digital Receipt */}
        <div className="w-full lg:w-2/3 order-1 lg:order-2">
          <div className="receipt-paper p-6 sm:p-12 border border-surface-container rounded-sm">
            {/* Receipt Header */}
            <div className="text-center mb-12 border-b border-surface-container-low pb-8">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tighter text-on-surface mb-2 font-serif">GEE CURLY</h2>
              <p className="font-sans text-on-surface-variant/60 italic text-xs sm:text-sm mb-4">Beauty & Wellness Collective</p>
              <div className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest leading-relaxed">
                <p>124 Boutique Blvd, Ste 400</p>
                <p>San Francisco, CA 94105</p>
                <p>+1 (555) 892-0034</p>
              </div>
            </div>

            {/* Meta Info */}
            <div className="grid grid-cols-2 gap-8 mb-10">
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] text-on-surface-variant/40 font-black uppercase tracking-widest mb-1">Receipt ID</p>
                  <p className="font-sans font-bold text-on-surface text-sm">#LUM-2023-08942</p>
                </div>
                <div>
                  <p className="text-[10px] text-on-surface-variant/40 font-black uppercase tracking-widest mb-1">Date & Time</p>
                  <p className="font-sans font-bold text-on-surface text-sm">Oct 24, 2023 | 02:45 PM</p>
                </div>
              </div>
              <div className="space-y-6 text-right">
                <div>
                  <p className="text-[10px] text-on-surface-variant/40 font-black uppercase tracking-widest mb-1">Sales Associate</p>
                  <p className="font-sans font-black text-on-surface text-sm">Elena Vance</p>
                </div>
                <div>
                  <p className="text-[10px] text-on-surface-variant/40 font-black uppercase tracking-widest mb-1">Customer</p>
                  <p className="font-sans font-black text-on-surface text-sm underline decoration-primary-container decoration-2 underline-offset-4">Sarah Montgomery</p>
                </div>
              </div>
            </div>

            {/* Line Items */}
            <div className="mb-10">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-on-surface">
                    <th className="text-left py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">Item Description</th>
                    <th className="text-center py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">Qty</th>
                    <th className="text-right py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">Price</th>
                    <th className="text-right py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">Amount</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-medium">
                  {[
                    { id: '1', name: 'Radiance Face Serum (30ml)', sku: 'SKIN-RF-001', qty: 1, price: 85, total: 85 },
                    { id: '2', name: 'Lavender & Sage Infused Candle', sku: 'HOME-LS-012', qty: 2, price: 32, total: 64 },
                    { id: '3', name: 'Silk Sleep Mask - Pearl', sku: 'ACC-SSM-09', qty: 1, price: 45, total: 45 },
                  ].map(item => (
                    <tr key={item.id} className="border-b border-surface-container-low">
                      <td className="py-5">
                        <p className="font-black text-on-surface leading-tight">{item.name}</p>
                        <p className="text-[10px] text-on-surface-variant/40 italic font-bold tracking-tight">SKU: {item.sku}</p>
                      </td>
                      <td className="py-5 text-center text-on-surface-variant">{item.qty}</td>
                      <td className="py-5 text-right text-on-surface-variant font-sans">${item.price.toFixed(2)}</td>
                      <td className="py-5 text-right font-black text-on-surface font-sans">${item.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-8 lg:gap-12 mb-12">
              <div className="w-full sm:w-1/2">
                <div className="p-5 bg-surface-container-low rounded-xl border border-surface-container-high/40">
                  <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 mb-3">Payment Method</p>
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-white rounded-lg shadow-sm text-on-surface-variant">
                      <CreditCard size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-black text-on-surface uppercase tracking-tight">Visa ending in •••• 4492</p>
                      <p className="text-[10px] font-bold text-on-surface-variant/60 uppercase">Auth Code: 881294</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full sm:w-1/3 space-y-4">
                <div className="flex justify-between text-sm font-bold text-on-surface-variant">
                  <span>Subtotal</span>
                  <span className="text-on-surface font-sans">$194.00</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-on-surface-variant">
                  <span>Tax (8.5%)</span>
                  <span className="text-on-surface font-sans">$16.49</span>
                </div>
                <div className="pt-4 border-t-2 border-on-surface flex justify-between items-center">
                  <span className="font-serif font-black text-xl text-on-surface">Total</span>
                  <span className="font-sans font-black text-2xl text-on-surface">$210.49</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center pt-8 border-t border-surface-container-low">
              <p className="font-serif italic text-on-surface-variant mb-6 text-sm">Thank you for choosing Gee Curly. We hope to see you again soon.</p>
              <div className="inline-block p-6 border border-surface-container rounded-2xl bg-surface-container-low/30">
                <QrCode className="w-24 h-24 mx-auto mb-3 text-on-surface opacity-80" strokeWidth={1} />
                <p className="text-[10px] text-on-surface-variant/40 font-black uppercase tracking-widest">Scan for digital copy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
