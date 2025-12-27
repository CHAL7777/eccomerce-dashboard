export interface Customer {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  orders: number;
  totalSpent: number;
  joinDate: string;
  status: 'active' | 'inactive';
  avatar?: string;
}

export interface CustomerStats {
  totalCustomers: number;
  activeCustomers: number;
  newCustomersThisMonth: number;
  avgCustomerValue: number;
}