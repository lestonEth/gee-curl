/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Layout from './components/Layout';
import { Screen } from './types';
import Dashboard from './screens/Dashboard';
import InventoryScreen from './screens/Inventory';
import POS from './screens/POS';
import LedgerScreen from './screens/Ledger';
import StaffScreen from './screens/Staff';
import ReceiptScreen from './screens/Receipt';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<Screen>('dashboard');

  const renderScreen = () => {
    switch (activeScreen) {
      case 'dashboard':
        return <Dashboard />;
      case 'inventory':
        return <InventoryScreen />;
      case 'pos':
        return <POS />;
      case 'ledger':
        return <LedgerScreen />;
      case 'staff':
        return <StaffScreen />;
      case 'receipt':
        return <ReceiptScreen />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeScreen={activeScreen} onScreenChange={setActiveScreen}>
      {renderScreen()}
    </Layout>
  );
}
