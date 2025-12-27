import React, { useState } from "react";
import { motion } from "framer-motion";
import { Edit, Search, Trash2, ShoppingCart } from "lucide-react";
import type { Product } from "../../../types"; // Assuming you have a Product interface
import { useCart } from "../../../contexts/CartContext";
import { formatCurrency } from "../../../utils/formatCurrency";

const PRODUCT_DATA: Product[] = [
  { 
    id: 1, 
    name: "Wireless Earbuds", 
    category: "Electronics", 
    price: 59.99, 
    cost: 35.99,
    stock: 143, 
    status: "in_stock" as const,
    sales: 1200,
    image: "/images/earbuds.jpg",
    sku: "WE-001",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-12-10T14:20:00Z"
  },
  { 
    id: 2, 
    name: "Leather Wallet", 
    category: "Accessories", 
    price: 39.99, 
    cost: 24.99,
    stock: 89, 
    status: "in_stock" as const,
    sales: 800,
    image: "/images/wallet.jpg",
    sku: "LW-002",
    createdAt: "2024-02-20T09:15:00Z",
    updatedAt: "2024-12-08T11:45:00Z"
  },
  { 
    id: 3, 
    name: "Smart Watch", 
    category: "Electronics", 
    price: 199.99, 
    cost: 129.99,
    stock: 56, 
    status: "low_stock" as const,
    sales: 650,
    image: "/images/smartwatch.jpg",
    sku: "SW-003",
    createdAt: "2024-03-10T16:00:00Z",
    updatedAt: "2024-12-09T13:30:00Z"
  },
  { 
    id: 4, 
    name: "Yoga Mat", 
    category: "Fitness", 
    price: 29.99, 
    cost: 18.99,
    stock: 210, 
    status: "in_stock" as const,
    sales: 950,
    image: "/images/yogamat.jpg",
    sku: "YM-004",
    createdAt: "2024-01-25T12:45:00Z",
    updatedAt: "2024-12-07T16:15:00Z"
  },
  { 
    id: 5, 
    name: "Coffee Maker", 
    category: "Home", 
    price: 79.99, 
    cost: 45.99,
    stock: 78, 
    status: "in_stock" as const,
    sales: 720,
    image: "/images/coffeemaker.jpg",
    sku: "CM-005",
    createdAt: "2024-04-05T08:20:00Z",
    updatedAt: "2024-12-11T10:00:00Z"
  },
];

const ProductTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { addItem } = useCart();

  const handleAddToCart = (product: Product) => {
    addItem(product, product.price);
  };

  const filteredProducts = PRODUCT_DATA.filter(
    (product) => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-xl font-semibold text-gray-100'>Product List</h2>
        <div className='relative'>
          <input
            type='text'
            placeholder='Search products...'
            className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
        </div>
      </div>

      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-700'>
          <thead>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Name</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Category</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Price</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Stock</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Cart</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Actions</th>
            </tr>
          </thead>

          <tbody className='divide-y divide-gray-700'>
            {filteredProducts.map((product) => (
              <motion.tr key={product.id} layout>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100'>{product.name}</td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>{product.category}</td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>{formatCurrency(product.price)}</td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>{product.stock}</td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAddToCart(product)}
                    className='px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-1 text-xs'
                  >
                    <ShoppingCart size={14} />
                    Add to Cart
                  </motion.button>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <button className='text-indigo-400 hover:text-indigo-300 mr-2'><Edit size={18} /></button>
                  <button className='text-red-400 hover:text-red-300'><Trash2 size={18} /></button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ProductTable;