export interface Product {
  id: number;
  name: string;
  description?: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
  sales: number;
  image: string;
  sku: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFilters {
  category?: string;
  status?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}

export interface ProductStats {
  totalProducts: number;
  totalValue: number;
  lowStockItems: number;
  outOfStockItems: number;
}