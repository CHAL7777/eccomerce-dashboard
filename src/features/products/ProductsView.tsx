import React from "react";
import { motion } from "framer-motion";
import { Package, TrendingUp, AlertTriangle, DollarSign } from "lucide-react";

import StatCard from "../../components/common/StatCard";
import ProductTable from "./components/ProductTable";

const ProductsView: React.FC = () => {
  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <header className='bg-gray-800 bg-opacity-50 backdrop-blur-md border-b border-gray-700 p-4'>
        <div className='max-w-7xl mx-auto'>
          <h1 className='text-2xl font-semibold text-gray-100'>Products Management</h1>
        </div>
      </header>

      <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
        {/* PRODUCT STATS */}
        <motion.div
          className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard name='Total Inventory' icon={Package} value='1,234' color='#6366F1' />
          <StatCard name='Top Sellers' icon={TrendingUp} value='89' color='#10B981' />
          <StatCard name='Low Stock' icon={AlertTriangle} value='23' color='#F59E0B' />
          <StatCard name='Total Sales' icon={DollarSign} value='$543,210' color='#EF4444' />
        </motion.div>

        {/* DATA TABLE */}
        <ProductTable />
      </main>
    </div>
  );
};

export default ProductsView;