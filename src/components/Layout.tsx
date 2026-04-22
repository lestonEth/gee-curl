import React from 'react';
import { Screen } from '../types';
import { cn } from '../lib/utils';

// Mapping Lucide icons to look similar to common POS layouts
import { 
  LayoutDashboard as DashboardIcon, 
  Package as InventoryIcon, 
  ShoppingCart as POSIcon, 
  FileText as LedgerIcon, 
  Users as StaffIcon, 
  Settings as SettingsIcon, 
  HelpCircle as SupportIcon,
  Search as SearchIcon,
  Bell as BellIcon,
  Calendar as CalendarIcon,
  Plus as PlusIcon,
  Receipt as ReceiptIcon,
  Menu as MenuIcon,
  X as CloseIcon
} from 'lucide-react';
import { useState } from 'react';

interface LayoutProps {
  children: React.ReactNode;
  activeScreen: Screen;
  onScreenChange: (screen: Screen) => void;
}

export default function Layout({ children, activeScreen, onScreenChange }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navItems = [
    { id: 'dashboard' as Screen, label: 'Dashboard', icon: DashboardIcon },
    { id: 'inventory' as Screen, label: 'Inventory', icon: InventoryIcon },
    { id: 'pos' as Screen, label: 'POS', icon: POSIcon },
    { id: 'ledger' as Screen, label: 'Ledger', icon: LedgerIcon },
    { id: 'staff' as Screen, label: 'Staff', icon: StaffIcon },
    { id: 'receipt' as Screen, label: 'Receipt', icon: ReceiptIcon },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-background relative">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[50] lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-[60] w-64 flex flex-col border-r border-surface-container-high bg-surface h-full py-8 shrink-0 transition-transform duration-300 lg:relative lg:translate-x-0 lg:z-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="px-8 mb-10 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-serif italic text-on-surface">Gee Curly</h1>
            <p className="font-serif text-on-surface-variant opacity-60 text-xs tracking-widest uppercase mt-1">Management System</p>
          </div>
          <button 
            className="lg:hidden p-2 text-on-surface-variant hover:text-on-surface"
            onClick={() => setIsSidebarOpen(false)}
          >
            <CloseIcon size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onScreenChange(item.id);
                  setIsSidebarOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-4 py-3 pl-8 transition-all duration-200 text-left",
                  isActive 
                    ? "text-primary-container font-semibold border-r-2 border-primary-container bg-surface-container-low" 
                    : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                )}
              >
                <Icon size={20} className={isActive ? "fill-primary-container/20" : ""} />
                <span className="font-sans text-sm tracking-wide">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-auto px-6 space-y-2">
          <button className="w-full bg-primary text-on-primary py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-sans font-semibold text-sm shadow-sm hover:opacity-90 transition-all mb-6">
            <PlusIcon size={18} />
            Service Drawer
          </button>
          
          <button className="w-full flex items-center gap-4 py-2 px-2 text-on-surface-variant hover:text-on-surface transition-colors text-sm text-left">
            <SettingsIcon size={18} />
            Settings
          </button>
          <button className="w-full flex items-center gap-4 py-2 px-2 text-on-surface-variant hover:text-on-surface transition-colors text-sm text-left">
            <SupportIcon size={18} />
            Support
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-4 lg:px-10 sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-surface-container-high shrink-0">
          <div className="flex items-center gap-4 lg:gap-6">
            <button 
              className="lg:hidden p-2 -ml-2 text-on-surface-variant hover:text-on-surface"
              onClick={() => setIsSidebarOpen(true)}
            >
              <MenuIcon size={22} />
            </button>
            <h2 className="text-lg lg:text-xl font-bold font-serif tracking-tight text-on-surface capitalize truncate max-w-[120px] lg:max-w-none">
              Gee Curly {activeScreen}
            </h2>
            <div className="relative w-40 lg:w-72 hidden sm:block">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/40" size={16} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full pl-10 pr-4 py-1.5 bg-surface-container-low border-none rounded-full text-sm focus:ring-1 focus:ring-primary-container outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 lg:gap-6">
            <div className="hidden md:flex items-center gap-4 text-on-surface-variant/60">
              <button className="hover:text-primary transition-colors p-1 relative">
                <BellIcon size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
              </button>
              <button className="hover:text-primary transition-colors p-1">
                <CalendarIcon size={20} />
              </button>
            </div>
            
            <button className="hidden sm:block bg-primary/10 text-primary px-3 lg:px-5 py-2 rounded-lg font-sans font-semibold text-xs lg:text-sm hover:bg-primary hover:text-on-primary transition-all whitespace-nowrap">
              Quick Appointment
            </button>
            
            <div className="w-10 h-10 rounded-full border-2 border-primary-container/20 overflow-hidden shrink-0 cursor-pointer hover:border-primary-container transition-all">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSS1qZef0q6m15FzAlWV1xAhoM-Usqkd1NWZdt6Pp7_sNe44JiF-nCOKHnczzqO_N3vtXIgJGJucZcm3vSSQJV5Dy0-LWBU-uMt54DOzfdqaNbaDo6Z_3KFTQHSQUX3Ae2ATl6MAVulzIKuMd7tdaOpSWkLX3PiBtEZKiV4Rh1ljRsvPB5vMy_24OqcCfyu6MtNlI3v_Q8KJmHX2TSZ5Vn79c3von8OQtjGoV3TMOJw60M_87DCH2Vh10VTnduc-8ZvS-ksICiZv06" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </header>

        {/* Content Container */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          {children}
        </div>
      </main>
    </div>
  );
}
