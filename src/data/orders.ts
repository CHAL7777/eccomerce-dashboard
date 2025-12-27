import { Order } from '../types';

export const orders: Order[] = [
  {
    id: '#ORD-001',
    customerId: 1,
    customerName: 'John Smith',
    customerEmail: 'john.smith@example.com',
    date: '2024-01-15T10:30:00Z',
    status: 'delivered',
    total: 299.99,
    items: [
      { productId: 1, productName: 'Premium Wireless Headphones', quantity: 1, price: 299.99, total: 299.99 }
    ],
    shippingAddress: '123 Main St, New York, NY 10001',
    paymentMethod: 'cbe',
    paymentStatus: 'paid'
  },
  {
    id: '#ORD-002',
    customerId: 2,
    customerName: 'Emma Johnson',
    customerEmail: 'emma.j@example.com',
    date: '2024-01-14T14:45:00Z',
    status: 'processing',
    total: 89.99,
    items: [
      { productId: 2, productName: 'Organic Cotton T-Shirt', quantity: 2, price: 39.99, total: 79.98 },
      { productId: 3, productName: 'Smart Fitness Watch', quantity: 1, price: 9.99, total: 9.99 }
    ],
    shippingAddress: '456 Oak Ave, Los Angeles, CA 90001',
    paymentMethod: 'paypal',
    paymentStatus: 'paid'
  },
  {
    id: '#ORD-003',
    customerId: 3,
    customerName: 'Michael Brown',
    customerEmail: 'michael.b@example.com',
    date: '2024-01-13T09:15:00Z',
    status: 'shipped',
    total: 459.98,
    items: [
      { productId: 4, productName: 'Ceramic Coffee Mug Set', quantity: 1, price: 34.99, total: 34.99 },
      { productId: 5, productName: 'Bluetooth Portable Speaker', quantity: 2, price: 199.99, total: 399.98 },
      { productId: 6, productName: 'Leather Laptop Bag', quantity: 1, price: 24.99, total: 24.99 }
    ],
    shippingAddress: '789 Pine Rd, Chicago, IL 60601',
    paymentMethod: 'awash',
    paymentStatus: 'paid'
  },
  {
    id: '#ORD-004',
    customerId: 4,
    customerName: 'Sarah Wilson',
    customerEmail: 'sarah.w@example.com',
    date: '2024-01-12T16:20:00Z',
    status: 'pending',
    total: 129.99,
    items: [
      { productId: 7, productName: 'Gaming Keyboard', quantity: 1, price: 129.99, total: 129.99 }
    ],
    shippingAddress: '321 Elm St, Houston, TX 77001',
    paymentMethod: 'credit_card',
    paymentStatus: 'pending'
  },
  {
    id: '#ORD-005',
    customerId: 5,
    customerName: 'David Lee',
    customerEmail: 'david.lee@example.com',
    date: '2024-01-11T11:00:00Z',
    status: 'delivered',
    total: 199.99,
    items: [
      { productId: 8, productName: 'Wireless Earbuds', quantity: 1, price: 199.99, total: 199.99 }
    ],
    shippingAddress: '654 Birch Blvd, Phoenix, AZ 85001',
    paymentMethod: 'paypal',
    paymentStatus: 'paid'
  }
];