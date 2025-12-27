import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Truck,
  Package,
  MoreVertical,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import { orders } from '../data/orders';
import { Order, Status } from '../types';
import { formatCurrency } from '../utils/formatCurrency';
import { formatDate } from '../utils/formatDate';

const ITEMS_PER_PAGE = 8;

const Orders: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<Status | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewOrder, setViewOrder] = useState<Order | null>(null);

  // Mock data with more details
  const orderList: Order[] = useMemo(() => [
    {
      id: '#ORD-001',
      customerId: 1,
      customerName: 'John Smith',
      customerEmail: 'john@example.com',
      date: '2024-01-15',
      status: 'delivered',
      total: 299.99,
      items: [
        { productId: 1, productName: 'Premium Wireless Headphones', quantity: 1, price: 299.99, total: 299.99 }
      ],
      shippingAddress: '123 Main St, New York, NY 10001',
      paymentMethod: 'credit_card',
      paymentStatus: 'paid'
    },
    {
      id: '#ORD-002',
      customerId: 2,
      customerName: 'Emma Johnson',
      customerEmail: 'emma@example.com',
      date: '2024-01-14',
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
      customerEmail: 'michael@example.com',
      date: '2024-01-13',
      status: 'shipped',
      total: 459.98,
      items: [
        { productId: 4, productName: 'Ceramic Coffee Mug Set', quantity: 1, price: 34.99, total: 34.99 },
        { productId: 5, productName: 'Bluetooth Portable Speaker', quantity: 2, price: 199.99, total: 399.98 },
        { productId: 6, productName: 'Leather Laptop Bag', quantity: 1, price: 24.99, total: 24.99 }
      ],
      shippingAddress: '789 Pine Rd, Chicago, IL 60601',
      paymentMethod: 'stripe',
      paymentStatus: 'paid'
    },
    {
      id: '#ORD-004',
      customerId: 4,
      customerName: 'Sarah Wilson',
      customerEmail: 'sarah@example.com',
      date: '2024-01-12',
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
      customerEmail: 'david@example.com',
      date: '2024-01-11',
      status: 'delivered',
      total: 199.99,
      items: [
        { productId: 8, productName: 'Wireless Earbuds', quantity: 1, price: 199.99, total: 199.99 }
      ],
      shippingAddress: '654 Birch Blvd, Phoenix, AZ 85001',
      paymentMethod: 'paypal',
      paymentStatus: 'paid'
    },
    {
      id: '#ORD-006',
      customerId: 6,
      customerName: 'Lisa Taylor',
      customerEmail: 'lisa@example.com',
      date: '2024-01-10',
      status: 'cancelled',
      total: 49.99,
      items: [
        { productId: 9, productName: 'Phone Case', quantity: 1, price: 49.99, total: 49.99 }
      ],
      shippingAddress: '987 Cedar Ln, Philadelphia, PA 19101',
      paymentMethod: 'credit_card',
      paymentStatus: 'failed'
    }
  ], []);

  // Filter orders
  const filteredOrders = useMemo(() => {
    return orderList.filter(order => {
      const matchesSearch = 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, selectedStatus, orderList]);

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Stats
  const stats = useMemo(() => {
    const totalOrders = orderList.length;
    const totalRevenue = orderList.reduce((sum, order) => sum + order.total, 0);
    const pendingOrders = orderList.filter(o => o.status === 'pending').length;
    const avgOrderValue = totalRevenue / totalOrders;

    return { totalOrders, totalRevenue, pendingOrders, avgOrderValue };
  }, [orderList]);

  const getStatusIcon = (status: Status) => {
    switch (status) {
      case 'pending': return <Clock className="text-yellow-500" size={16} />;
      case 'processing': return <Package className="text-blue-500" size={16} />;
      case 'shipped': return <Truck className="text-purple-500" size={16} />;
      case 'delivered': return <CheckCircle className="text-green-500" size={16} />;
      case 'cancelled': return <XCircle className="text-red-500" size={16} />;
    }
  };

  const getStatusBadge = (status: Status) => {
    switch (status) {
      case 'pending': return <Badge variant="warning">Pending</Badge>;
      case 'processing': return <Badge variant="primary">Processing</Badge>;
      case 'shipped': return <Badge variant="info">Shipped</Badge>;
      case 'delivered': return <Badge variant="success">Delivered</Badge>;
      case 'cancelled': return <Badge variant="danger">Cancelled</Badge>;
    }
  };

  const getPaymentBadge = (status: 'paid' | 'pending' | 'failed') => {
    switch (status) {
      case 'paid': return <Badge variant="success">Paid</Badge>;
      case 'pending': return <Badge variant="warning">Pending</Badge>;
      case 'failed': return <Badge variant="danger">Failed</Badge>;
    }
  };

  const formatPaymentMethod = (method: string) => {
    switch (method) {
      case 'credit_card': return 'Credit Card';
      case 'paypal': return 'PayPal';
      case 'stripe': return 'Stripe';
      case 'cbe': return 'CBE';
      case 'awash': return 'Awash';
      default: return method.replace('_', ' ');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Orders
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage and track customer orders
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" icon={Download}>
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Package className="text-blue-600 dark:text-blue-400" size={20} />
            </div>
            <span className="text-sm text-green-600 dark:text-green-400 font-medium">
              +8.2%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-3">
            {stats.totalOrders}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Total Orders
          </p>
        </div>

        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <CheckCircle className="text-green-600 dark:text-green-400" size={20} />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-3">
            {formatCurrency(stats.totalRevenue)}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Total Revenue
          </p>
        </div>

        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <Clock className="text-yellow-600 dark:text-yellow-400" size={20} />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-3">
            {stats.pendingOrders}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Pending Orders
          </p>
        </div>

        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <Package className="text-purple-600 dark:text-purple-400" size={20} />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-3">
            {formatCurrency(stats.avgOrderValue)}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Avg. Order Value
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search orders by ID, customer, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as Status | 'all')}
              className="input-field"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <Button variant="outline" icon={Filter}>
              More Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="table-header">Order ID</th>
                <th className="table-header">Customer</th>
                <th className="table-header">Date</th>
                <th className="table-header">Total</th>
                <th className="table-header">Status</th>
                <th className="table-header">Payment</th>
                <th className="table-header text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedOrders.map((order) => (
                <tr 
                  key={order.id} 
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <td className="table-cell">
                    <span className="font-mono font-medium text-primary-600 dark:text-primary-400">
                      {order.id}
                    </span>
                  </td>
                  <td className="table-cell">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {order.customerName}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {order.customerEmail}
                      </p>
                    </div>
                  </td>
                  <td className="table-cell">
                    {formatDate(order.date, 'short')}
                  </td>
                  <td className="table-cell font-medium">
                    {formatCurrency(order.total)}
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      {getStatusBadge(order.status)}
                    </div>
                  </td>
                  <td className="table-cell">
                    {getPaymentBadge(order.paymentStatus)}
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        icon={Eye}
                        onClick={() => setViewOrder(order)}
                      />
                      <Button variant="ghost" size="sm" icon={MoreVertical} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
            <span className="font-medium">
              {Math.min(startIndex + ITEMS_PER_PAGE, filteredOrders.length)}
            </span>{' '}
            of <span className="font-medium">{filteredOrders.length}</span> results
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              icon={ChevronLeft}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(page => page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1))
                .map((page, index, array) => (
                  <React.Fragment key={page}>
                    {index > 0 && array[index - 1] !== page - 1 && (
                      <span className="px-2">...</span>
                    )}
                    <button
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium transition-colors
                        ${currentPage === page
                          ? 'bg-primary-600 text-white'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                    >
                      {page}
                    </button>
                  </React.Fragment>
                ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              icon={ChevronRight}
              iconPosition="right"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      <Modal
        isOpen={!!viewOrder}
        onClose={() => setViewOrder(null)}
        title={`Order Details - ${viewOrder?.id}`}
        size="lg"
      >
        {viewOrder && (
          <div className="space-y-6">
            {/* Order Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  CUSTOMER INFORMATION
                </h3>
                <div className="space-y-2">
                  <p className="font-medium">{viewOrder.customerName}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{viewOrder.customerEmail}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Customer ID: {viewOrder.customerId}
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  ORDER INFORMATION
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Order Date:</span>
                    <span className="font-medium">{formatDate(viewOrder.date)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Payment Method:</span>
                    <span className="font-medium">{formatPaymentMethod(viewOrder.paymentMethod)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Payment Status:</span>
                    {getPaymentBadge(viewOrder.paymentStatus)}
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                SHIPPING ADDRESS
              </h3>
              <p className="text-gray-900 dark:text-white">{viewOrder.shippingAddress}</p>
            </div>

            {/* Order Items */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                ORDER ITEMS
              </h3>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        Product
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        Quantity
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        Price
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {viewOrder.items.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                          {item.productName}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                          {item.quantity}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                          {formatCurrency(item.price)}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-white font-medium">
                          {formatCurrency(item.total)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <td colSpan={3} className="px-4 py-3 text-right text-sm font-medium text-gray-900 dark:text-white">
                        Total:
                      </td>
                      <td className="px-4 py-3 text-lg font-bold text-gray-900 dark:text-white">
                        {formatCurrency(viewOrder.total)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button variant="outline" onClick={() => setViewOrder(null)}>
                Close
              </Button>
              <Button variant="primary">
                Print Invoice
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Orders;