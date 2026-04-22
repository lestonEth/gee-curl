export type UserRole = 'SUPER_ADMIN' | 'FLOOR_MANAGER' | 'SALES_PERSON';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export type Screen = 'dashboard' | 'inventory' | 'pos' | 'ledger' | 'staff' | 'receipt' | 'settings';

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  supplier: string;
  image: string;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  employee: string;
  method: string;
  amount: number;
  type: 'sale' | 'expense' | 'restock';
  status: 'paid' | 'pending' | 'completed';
  items?: CartItem[];
}

export interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: string;
  monthlySales: number;
  satisfaction: number;
  status: 'active' | 'off-duty';
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}
