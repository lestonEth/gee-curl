/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import { Screen, User, UserRole } from './types';
import Dashboard from './screens/Dashboard';
import InventoryScreen from './screens/Inventory';
import POS from './screens/POS';
import LedgerScreen from './screens/Ledger';
import StaffScreen from './screens/Staff';
import ReceiptScreen from './screens/Receipt';
import Login from './screens/Login';
import SettingsScreen from './screens/Settings';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [activeScreen, setActiveScreen] = useState<Screen>('dashboard');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('geecurly_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (email: string, role: UserRole) => {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
      email,
      role
    };
    setUser(newUser);
    localStorage.setItem('geecurly_user', JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('geecurly_user');
    setActiveScreen('dashboard');
  };

  if (isLoading) {
    return <div className="h-screen w-screen bg-background flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>;
  }

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  const renderScreen = () => {
    switch (activeScreen) {
      case 'dashboard':
        return <Dashboard />;
      case 'inventory':
        return <InventoryScreen user={user} />;
      case 'pos':
        return <POS onCompleteSale={() => setActiveScreen('receipt')} />;
      case 'ledger':
        return <LedgerScreen />;
      case 'staff':
        return <StaffScreen user={user} />;
      case 'receipt':
        return <ReceiptScreen onBackToPOS={() => setActiveScreen('pos')} />;
      case 'settings':
        return <SettingsScreen user={user} onLogout={handleLogout} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout 
      activeScreen={activeScreen} 
      onScreenChange={setActiveScreen}
      user={user}
    >
      {renderScreen()}
    </Layout>
  );
}
