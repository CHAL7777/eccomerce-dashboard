import { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    description: 'Noise-cancelling wireless headphones with premium sound quality',
    category: 'Electronics',
    price: 38999, // 299.99 * 130
    cost: 19500, // 150.00 * 130
    stock: 45,
    status: 'in_stock',
    sales: 1245,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    sku: 'PROD-001',
    createdAt: '2023-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: 2,
    name: 'Organic Cotton T-Shirt',
    description: '100% organic cotton t-shirt, comfortable and eco-friendly',
    category: 'Fashion',
    price: 5199, // 39.99 * 130
    cost: 1950, // 15.00 * 130
    stock: 120,
    status: 'in_stock',
    sales: 892,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
    sku: 'PROD-002',
    createdAt: '2023-02-20',
    updatedAt: '2024-01-14'
  },
  {
    id: 3,
    name: 'Smart Fitness Watch',
    description: 'Track your health and fitness with this advanced smartwatch',
    category: 'Electronics',
    price: 25999, // 199.99 * 130
    cost: 15600, // 120.00 * 130
    stock: 0,
    status: 'out_of_stock',
    sales: 567,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
    sku: 'PROD-003',
    createdAt: '2023-03-10',
    updatedAt: '2024-01-13'
  },
  {
    id: 4,
    name: 'Ceramic Coffee Mug Set',
    description: 'Set of 4 premium ceramic coffee mugs with elegant design',
    category: 'Home & Kitchen',
    price: 4549, // 34.99 * 130
    cost: 2340, // 18.00 * 130
    stock: 78,
    status: 'in_stock',
    sales: 345,
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a',
    sku: 'PROD-004',
    createdAt: '2023-04-05',
    updatedAt: '2024-01-12'
  },
  {
    id: 5,
    name: 'Bluetooth Portable Speaker',
    description: 'Waterproof portable speaker with 360° sound and 12-hour battery',
    category: 'Electronics',
    price: 11699, // 89.99 * 130
    cost: 5850, // 45.00 * 130
    stock: 23,
    status: 'low_stock',
    sales: 678,
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b',
    sku: 'PROD-005',
    createdAt: '2023-05-15',
    updatedAt: '2024-01-11'
  },
  {
    id: 6,
    name: 'Leather Laptop Bag',
    description: 'Genuine leather laptop bag with multiple compartments',
    category: 'Fashion',
    price: 16899, // 129.99 * 130
    cost: 8450, // 65.00 * 130
    stock: 56,
    status: 'in_stock',
    sales: 234,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3',
    sku: 'PROD-006',
    createdAt: '2023-06-20',
    updatedAt: '2024-01-10'
  },
  {
    id: 7,
    name: 'Gaming Keyboard',
    description: 'Mechanical gaming keyboard with RGB lighting and macro keys',
    category: 'Electronics',
    price: 16899, // 129.99 * 130
    cost: 9100, // 70.00 * 130
    stock: 34,
    status: 'in_stock',
    sales: 189,
    image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a',
    sku: 'PROD-007',
    createdAt: '2023-07-25',
    updatedAt: '2024-01-09'
  },
  {
    id: 8,
    name: 'Wireless Earbuds',
    description: 'True wireless earbuds with charging case and touch controls',
    category: 'Electronics',
    price: 25999, // 199.99 * 130
    cost: 12350, // 95.00 * 130
    stock: 89,
    status: 'in_stock',
    sales: 456,
    image: 'https://images.unsplash.com/photo-1590650163859-2c9a8be5c2b1',
    sku: 'PROD-008',
    createdAt: '2023-08-30',
    updatedAt: '2024-01-08'
  },
  {
    id: 9,
    name: 'Phone Case',
    description: 'Shockproof phone case with screen protector included',
    category: 'Electronics',
    price: 6499, // 49.99 * 130
    cost: 1560, // 12.00 * 130
    stock: 156,
    status: 'in_stock',
    sales: 789,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12',
    sku: 'PROD-009',
    createdAt: '2023-09-15',
    updatedAt: '2024-01-07'
  },
  {
    id: 10,
    name: 'Yoga Mat',
    description: 'Eco-friendly yoga mat with non-slip surface',
    category: 'Sports',
    price: 3899, // 29.99 * 130
    cost: 1950, // 15.00 * 130
    stock: 67,
    status: 'in_stock',
    sales: 234,
    image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0',
    sku: 'PROD-010',
    createdAt: '2023-10-20',
    updatedAt: '2024-01-06'
  }
];
