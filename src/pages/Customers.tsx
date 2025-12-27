import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  UserPlus,
  Mail,
  Phone,
  MapPin,
  Calendar,
  TrendingUp,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import { Customer } from '../types';
import { formatCurrency } from '../utils/formatCurrency';
import { formatDate } from '../utils/formatDate';

const ITEMS_PER_PAGE = 10;

const Customers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewCustomer, setViewCustomer] = useState<Customer | null>(null);
  const [sortBy, setSortBy] = useState<'name' | 'orders' | 'totalSpent' | 'joinDate'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Mock customer data
  const customers: Customer[] = useMemo(() => [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, New York, NY 10001',
      orders: 12,
      totalSpent: 3429.85,
      joinDate: '2023-01-15',
      status: 'active',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
    },
    {
      id: 2,
      name: 'Emma Johnson',
      email: 'emma.j@example.com',
      phone: '+1 (555) 234-5678',
      address: '456 Oak Ave, Los Angeles, CA 90001',
      orders: 8,
      totalSpent: 1899.99,
      joinDate: '2023-02-20',
      status: 'active',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma'
    },
    {
      id: 3,
      name: 'Michael Brown',
      email: 'michael.b@example.com',
      phone: '+1 (555) 345-6789',
      address: '789 Pine Rd, Chicago, IL 60601',
      orders: 5,
      totalSpent: 1299.50,
      joinDate: '2023-03-10',
      status: 'active',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael'
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      email: 'sarah.w@example.com',
      phone: '+1 (555) 456-7890',
      address: '321 Elm St, Houston, TX 77001',
      orders: 3,
      totalSpent: 649.99,
      joinDate: '2023-04-05',
      status: 'inactive',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
    },
    {
      id: 5,
      name: 'David Lee',
      email: 'david.lee@example.com',
      phone: '+1 (555) 567-8901',
      address: '654 Birch Blvd, Phoenix, AZ 85001',
      orders: 15,
      totalSpent: 5249.75,
      joinDate: '2022-12-01',
      status: 'active',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David'
    },
    {
      id: 6,
      name: 'Lisa Taylor',
      email: 'lisa.t@example.com',
      phone: '+1 (555) 678-9012',
      address: '987 Cedar Ln, Philadelphia, PA 19101',
      orders: 7,
      totalSpent: 1799.25,
      joinDate: '2023-05-15',
      status: 'active',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa'
    },
    {
      id: 7,
      name: 'Robert Garcia',
      email: 'robert.g@example.com',
      phone: '+1 (555) 789-0123',
      address: '147 Maple Dr, San Antonio, TX 78201',
      orders: 2,
      totalSpent: 399.98,
      joinDate: '2023-06-20',
      status: 'inactive',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert'
    },
    {
      id: 8,
      name: 'Jessica Martinez',
      email: 'jessica.m@example.com',
      phone: '+1 (555) 890-1234',
      address: '258 Walnut St, San Diego, CA 92101',
      orders: 10,
      totalSpent: 2899.00,
      joinDate: '2023-01-30',
      status: 'active',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica'
    }
  ], []);

  // Filter and sort customers
  const filteredCustomers = useMemo(() => {
    let filtered = customers.filter(customer => {
      const matchesSearch = 
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone?.includes(searchTerm);
      const matchesStatus = selectedStatus === 'all' || customer.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });

    // Sort customers
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (sortBy === 'name') {
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [searchTerm, selectedStatus, sortBy, sortOrder, customers]);

  // Pagination
  const totalPages = Math.ceil(filteredCustomers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCustomers = filteredCustomers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Stats
  const stats = useMemo(() => {
    const totalCustomers = customers.length;
    const activeCustomers = customers.filter(c => c.status === 'active').length;
    const newThisMonth = customers.filter(c => {
      const joinDate = new Date(c.joinDate);
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      return joinDate >= monthAgo;
    }).length;
    const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);
    const avgCustomerValue = totalRevenue / totalCustomers;

    return { totalCustomers, activeCustomers, newThisMonth, totalRevenue, avgCustomerValue };
  }, [customers]);

  const handleSort = (column: 'name' | 'orders' | 'totalSpent' | 'joinDate') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Customers
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your customer relationships and insights
          </p>
        </div>
        <Button variant="primary" icon={UserPlus}>
          Add Customer
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <UserPlus className="text-blue-600 dark:text-blue-400" size={20} />
            </div>
            <span className="text-sm text-green-600 dark:text-green-400 font-medium">
              +5.7%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-3">
            {stats.totalCustomers}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Total Customers
          </p>
        </div>

        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <TrendingUp className="text-green-600 dark:text-green-400" size={20} />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-3">
            {stats.activeCustomers}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Active Customers
          </p>
        </div>

        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <Calendar className="text-purple-600 dark:text-purple-400" size={20} />
            </div>
            <span className="text-sm text-green-600 dark:text-green-400 font-medium">
              +3
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-3">
            {stats.newThisMonth}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            New This Month
          </p>
        </div>

        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <UserPlus className="text-orange-600 dark:text-orange-400" size={20} />
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
            <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <UserPlus className="text-red-600 dark:text-red-400" size={20} />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-3">
            {formatCurrency(stats.avgCustomerValue)}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Avg. Customer Value
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
                placeholder="Search customers by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as 'all' | 'active' | 'inactive')}
              className="input-field"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <Button variant="outline" icon={Filter}>
              More Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th 
                  className="table-header cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center gap-2">
                    Customer
                    {sortBy === 'name' && (
                      <ChevronRight className={`transform ${sortOrder === 'asc' ? 'rotate-90' : '-rotate-90'}`} size={16} />
                    )}
                  </div>
                </th>
                <th className="table-header">Contact</th>
                <th 
                  className="table-header cursor-pointer"
                  onClick={() => handleSort('joinDate')}
                >
                  <div className="flex items-center gap-2">
                    Joined
                    {sortBy === 'joinDate' && (
                      <ChevronRight className={`transform ${sortOrder === 'asc' ? 'rotate-90' : '-rotate-90'}`} size={16} />
                    )}
                  </div>
                </th>
                <th 
                  className="table-header cursor-pointer"
                  onClick={() => handleSort('orders')}
                >
                  <div className="flex items-center gap-2">
                    Orders
                    {sortBy === 'orders' && (
                      <ChevronRight className={`transform ${sortOrder === 'asc' ? 'rotate-90' : '-rotate-90'}`} size={16} />
                    )}
                  </div>
                </th>
                <th 
                  className="table-header cursor-pointer"
                  onClick={() => handleSort('totalSpent')}
                >
                  <div className="flex items-center gap-2">
                    Total Spent
                    {sortBy === 'totalSpent' && (
                      <ChevronRight className={`transform ${sortOrder === 'asc' ? 'rotate-90' : '-rotate-90'}`} size={16} />
                    )}
                  </div>
                </th>
                <th className="table-header">Status</th>
                <th className="table-header text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedCustomers.map((customer) => (
                <tr 
                  key={customer.id} 
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <td className="table-cell">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                        <img 
                          src={customer.avatar} 
                          alt={customer.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {customer.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          ID: CUST-{customer.id.toString().padStart(4, '0')}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Mail size={14} className="text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {customer.email}
                        </span>
                      </div>
                      {customer.phone && (
                        <div className="flex items-center gap-2">
                          <Phone size={14} className="text-gray-400" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {customer.phone}
                          </span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="table-cell">
                    {formatDate(customer.joinDate, 'medium')}
                  </td>
                  <td className="table-cell">
                    <span className="font-medium">{customer.orders}</span>
                  </td>
                  <td className="table-cell font-medium">
                    {formatCurrency(customer.totalSpent)}
                  </td>
                  <td className="table-cell">
                    {customer.status === 'active' ? (
                      <Badge variant="success">Active</Badge>
                    ) : (
                      <Badge variant="danger">Inactive</Badge>
                    )}
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        icon={Eye}
                        onClick={() => setViewCustomer(customer)}
                      />
                      <Button variant="ghost" size="sm" icon={Edit} />
                      <Button variant="ghost" size="sm" icon={Trash2} />
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
              {Math.min(startIndex + ITEMS_PER_PAGE, filteredCustomers.length)}
            </span>{' '}
            of <span className="font-medium">{filteredCustomers.length}</span> results
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

      {/* Customer Details Modal */}
      <Modal
        isOpen={!!viewCustomer}
        onClose={() => setViewCustomer(null)}
        title="Customer Details"
        size="lg"
      >
        {viewCustomer && (
          <div className="space-y-6">
            {/* Customer Header */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                <img 
                  src={viewCustomer.avatar} 
                  alt={viewCustomer.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {viewCustomer.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Customer ID: CUST-{viewCustomer.id.toString().padStart(4, '0')}
                </p>
              </div>
            </div>

            {/* Customer Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                  CONTACT INFORMATION
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail size={18} className="text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Email</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {viewCustomer.email}
                      </p>
                    </div>
                  </div>
                  {viewCustomer.phone && (
                    <div className="flex items-center gap-3">
                      <Phone size={18} className="text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Phone</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {viewCustomer.phone}
                        </p>
                      </div>
                    </div>
                  )}
                  {viewCustomer.address && (
                    <div className="flex items-start gap-3">
                      <MapPin size={18} className="text-gray-400 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Address</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {viewCustomer.address}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                  CUSTOMER STATISTICS
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Status</span>
                    {viewCustomer.status === 'active' ? (
                      <Badge variant="success">Active</Badge>
                    ) : (
                      <Badge variant="danger">Inactive</Badge>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Member Since</span>
                    <span className="font-medium">{formatDate(viewCustomer.joinDate)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Total Orders</span>
                    <span className="font-medium">{viewCustomer.orders}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Total Spent</span>
                    <span className="font-medium text-lg">{formatCurrency(viewCustomer.totalSpent)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button variant="outline" onClick={() => setViewCustomer(null)}>
                Close
              </Button>
              <Button variant="primary">
                Send Email
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Customers;