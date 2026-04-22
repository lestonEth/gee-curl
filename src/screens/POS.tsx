import React, { useState } from 'react';
import { products } from '../mockData';
import { Product, CartItem } from '../types';
import { ShoppingCart, Trash2, Plus, Minus, CreditCard, Banknote, Smartphone } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function POS({ onCompleteSale }: { onCompleteSale: () => void }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [filter, setFilter] = useState('All Products');
  const [paymentMethod, setPaymentMethod] = useState<'Cash' | 'Card' | 'Mobile'>('Card');
  const [isProcessing, setIsProcessing] = useState(false);

  const addToCart = (product: Product) => {
    if (product.stock === 0) return;
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const clearCart = () => setCart([]);

  const handleCompleteSale = () => {
    if (cart.length === 0) return;
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      onCompleteSale();
    }, 1500);
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.085;
  const total = subtotal + tax;

  const categories = ['All Products', 'Skincare', 'Fragrance', 'Gifts'];

  return (
    <div className="flex flex-col lg:flex-row h-full gap-6 p-4 lg:p-6 overflow-hidden">
      {/* Product Selection */}
      <div className="flex-1 flex flex-col gap-6 overflow-hidden">
        <div className="flex gap-3 lg:gap-4 overflow-x-auto pb-2 shrink-0 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "px-4 lg:px-6 py-2 rounded-full font-sans font-semibold text-xs lg:text-sm transition-all shrink-0",
                filter === cat 
                  ? "bg-primary text-on-primary shadow-md" 
                  : "bg-white text-on-surface-variant hover:bg-surface-container"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 overflow-y-auto pb-6 pr-1 custom-scrollbar">
          {products
            .filter(p => filter === 'All Products' || p.category === filter)
            .map(product => (
              <motion.div
                layout
                key={product.id}
                onClick={() => addToCart(product)}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "bg-white rounded-2xl overflow-hidden border border-stone-100 flex flex-col transition-all duration-300",
                  "hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-primary/20 cursor-pointer group relative",
                  product.stock === 0 && "opacity-60 cursor-not-allowed"
                )}
              >
                <div className="aspect-[4/5] overflow-hidden relative bg-surface-container-low">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className={cn(
                      "w-full h-full object-cover transition-transform duration-700 ease-out",
                      product.stock > 0 && "group-hover:scale-110"
                    )}
                  />
                  
                  {/* Category Badge */}
                  <div className="absolute top-2 lg:top-3 left-2 lg:left-3">
                    <span className="bg-white/90 backdrop-blur-sm px-2 py-0.5 lg:py-1 rounded-lg text-[9px] lg:text-[10px] font-bold text-on-surface-variant/70 uppercase tracking-tighter">
                      {product.category}
                    </span>
                  </div>

                  {/* Add Button Overlay */}
                  <div className="absolute inset-0 bg-black/5 opacity-0 lg:group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-white p-2 lg:p-3 rounded-full shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
                      <Plus className="text-primary w-4 h-4 lg:w-6 lg:h-6" />
                    </div>
                  </div>

                  {product.stock === 0 && (
                    <div className="absolute inset-0 bg-on-surface/5 backdrop-blur-[2px] flex items-center justify-center">
                      <span className="bg-error text-on-error px-3 lg:px-4 py-1 lg:py-1.5 rounded-full text-[9px] lg:text-[10px] font-black uppercase tracking-widest shadow-lg">
                        Out of Stock
                      </span>
                    </div>
                  )}
                  
                  {/* Stock Level Small Indicator */}
                  {product.stock > 0 && product.stock <= 5 && (
                    <div className="absolute bottom-2 lg:bottom-3 left-2 lg:left-3">
                      <span className="bg-error/10 backdrop-blur-sm text-error px-1.5 lg:px-2 py-0.5 rounded text-[8px] lg:text-[9px] font-black uppercase tracking-tight">
                        Low Stock: {product.stock}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-3 lg:p-4 flex-1 flex flex-col gap-1 lg:gap-2">
                  <div className="flex-1">
                    <h4 className="font-serif text-sm lg:text-[15px] leading-tight text-on-surface font-semibold group-hover:text-primary transition-colors line-clamp-1">
                      {product.name}
                    </h4>
                    <p className="text-[10px] text-on-surface-variant/50 font-sans">SKU: {product.sku}</p>
                  </div>
                  
                  <div className="flex justify-between items-end mt-auto pt-2 border-t border-stone-50">
                    <div className="flex flex-col">
                      <span className="text-[9px] text-on-surface-variant/40 font-bold uppercase tracking-widest">Price</span>
                      <span className="font-sans text-base lg:text-lg text-primary font-black tracking-tight">${product.price.toFixed(2)}</span>
                    </div>
                    {product.stock > 0 && (
                      <div className="bg-primary/5 p-1 lg:p-1.5 rounded-lg text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        <Plus size={16} strokeWidth={3} className="lg:hidden" />
                        <Plus size={18} strokeWidth={3} className="hidden lg:block" />
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </div>

      {/* Checkout Sidebar */}
      <section className={cn(
        "bg-white lg:rounded-2xl shadow-xl flex flex-col border-t lg:border border-stone-100 transition-all duration-300 shrink-0",
        "fixed lg:relative inset-x-0 bottom-0 h-2/3 lg:h-auto lg:inset-auto lg:w-[380px] xl:w-[420px] z-50 lg:z-0",
        cart.length > 0 ? "translate-y-0" : "translate-y-full lg:translate-y-0"
      )}>
        {/* Cart Toggle Handle for Mobile */}
        <div className="lg:hidden h-1.5 w-12 bg-stone-200 rounded-full mx-auto my-3 shrink-0" />

        <div className="p-4 lg:p-6 border-b border-stone-50 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h3 className="font-serif text-xl font-bold text-on-surface">Current Order</h3>
            <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-[10px] font-bold">{cart.length}</span>
          </div>
          <button 
            onClick={clearCart}
            className="text-error text-xs font-bold hover:underline"
          >
            Clear All
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <AnimatePresence mode='popLayout'>
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-on-surface-variant/40 gap-4">
                <ShoppingCart size={48} strokeWidth={1} />
                <p className="text-sm">Your cart is empty</p>
              </div>
            ) : (
              cart.map(item => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  key={item.id} 
                  className="flex items-center gap-4 py-2"
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-surface-container shrink-0">
                    <img src={item.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-sans text-sm text-on-surface font-semibold truncate">{item.name}</h5>
                    <p className="text-on-surface-variant/60 text-xs">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-3 bg-surface-container-low rounded-lg px-2 py-1">
                    <button 
                      onClick={(e) => { e.stopPropagation(); updateQuantity(item.id, -1); }}
                      className="text-on-surface-variant hover:text-primary p-0.5"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="font-sans text-sm font-bold min-w-[1rem] text-center">{item.quantity}</span>
                    <button 
                      onClick={(e) => { e.stopPropagation(); updateQuantity(item.id, 1); }}
                      className="text-on-surface-variant hover:text-primary p-0.5"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <button 
                    onClick={() => setCart(prev => prev.filter(i => i.id !== item.id))}
                    className="p-2 text-on-surface-variant/20 hover:text-error transition-colors"
                    title="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                  <div className="text-right min-w-[70px]">
                    <span className="font-sans font-bold text-on-surface">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        <div className="p-6 bg-surface-container-low border-t border-stone-200 space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-on-surface-variant text-sm">
              <span>Subtotal</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-on-surface-variant text-sm">
              <span>Tax (8.5%)</span>
              <span className="font-semibold">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-on-surface pt-2">
              <span className="text-lg font-serif font-bold">Total</span>
              <span className="text-2xl font-sans font-black text-primary">${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="pt-4">
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold mb-3">Payment Method</p>
            <div className="grid grid-cols-3 gap-3">
              <button 
                onClick={() => setPaymentMethod('Cash')}
                className={cn(
                  "flex flex-col items-center justify-center p-3 rounded-xl border transition-all text-on-surface-variant",
                  paymentMethod === 'Cash' ? "border-2 border-primary-container bg-primary-container/10 text-primary shadow-sm" : "border-stone-200 bg-white hover:border-primary-container hover:text-primary"
                )}
              >
                <Banknote size={20} className="mb-1" />
                <span className="text-[10px] font-bold uppercase">Cash</span>
              </button>
              <button 
                onClick={() => setPaymentMethod('Card')}
                className={cn(
                  "flex flex-col items-center justify-center p-3 rounded-xl border transition-all text-on-surface-variant",
                  paymentMethod === 'Card' ? "border-2 border-primary-container bg-primary-container/10 text-primary shadow-sm" : "border-stone-200 bg-white hover:border-primary-container hover:text-primary"
                )}
              >
                <CreditCard size={20} className="mb-1" />
                <span className="text-[10px] font-bold uppercase">Card</span>
              </button>
              <button 
                onClick={() => setPaymentMethod('Mobile')}
                className={cn(
                  "flex flex-col items-center justify-center p-3 rounded-xl border transition-all text-on-surface-variant",
                  paymentMethod === 'Mobile' ? "border-2 border-primary-container bg-primary-container/10 text-primary shadow-sm" : "border-stone-200 bg-white hover:border-primary-container hover:text-primary"
                )}
              >
                <Smartphone size={20} className="mb-1" />
                <span className="text-[10px] font-bold uppercase">Mobile</span>
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button 
              onClick={handleCompleteSale}
              disabled={isProcessing || cart.length === 0}
              className={cn(
                "w-full py-4 rounded-xl font-serif text-lg font-bold transition-all shadow-lg",
                isProcessing || cart.length === 0 
                  ? "bg-stone-300 text-stone-500 cursor-not-allowed shadow-none" 
                  : "bg-primary text-on-primary hover:brightness-110 shadow-primary/20"
              )}
            >
              {isProcessing ? (
                <div className="flex items-center justify-center gap-2">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-on-primary border-t-transparent rounded-full"
                  />
                  <span>Processing...</span>
                </div>
              ) : 'Complete Sale'}
            </button>
            <button 
              onClick={clearCart}
              className="w-full text-on-surface-variant/40 font-semibold text-xs py-3 hover:text-on-surface transition-colors"
            >
              Cancel Order
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
