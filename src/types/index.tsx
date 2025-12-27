// Common types
export type Status = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type ProductStatus = 'in_stock' | 'low_stock' | 'out_of_stock';
export type ThemeMode = 'light' | 'dark' | 'system';

// Menu item type
export interface MenuItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

// Re-export types from other files
export type { Product, ProductFilters, ProductStats } from './product';
export type { Order, OrderItem, OrderStats } from './order';
export type { Customer, CustomerStats } from './customer';

// Import Product type for use in Cart interfaces
import type { Product } from './product';

// Cart Types
export interface CartItem {
  id: string;
  productId: number;
  product: Product;
  quantity: number;
  price: number;
  totalPrice: number;
}

export interface Cart {
  id: string;
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}

export interface CartContextType {
  cart: Cart | null;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (productId: number) => number;
  totalItems: number;
  totalPrice: number;
}

