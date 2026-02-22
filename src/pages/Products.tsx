import React, { useEffect, useMemo, useState } from 'react';
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  ChevronLeft,
  ChevronRight,
  Package,
  AlertCircle
} from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import { products } from '../data/products';
import { Product, ProductStatus } from '../types';
import { formatCurrency } from '../utils/formatCurrency';

const ITEMS_PER_PAGE = 10;

const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') ?? '';
  const [productList, setProductList] = useState<Product[]>(products);
  const [searchTerm, setSearchTerm] = useState(queryParam);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [sortBy, setSortBy] = useState<'name' | 'category' | 'price' | 'stock' | 'sales'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Extract unique categories
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(productList.map((product) => product.category)));
    return ['all', ...uniqueCategories];
  }, [productList]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    const filtered = productList.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.sku?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    });

    // Sort products
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
  }, [productList, searchTerm, selectedCategory, selectedStatus, sortBy, sortOrder]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const hasProducts = filteredProducts.length > 0;
  const firstResult = hasProducts ? startIndex + 1 : 0;
  const lastResult = hasProducts
    ? Math.min(startIndex + ITEMS_PER_PAGE, filteredProducts.length)
    : 0;

  // Stats
  const stats = useMemo(() => {
    const totalProducts = productList.length;
    const inStock = productList.filter((product) => product.status === 'in_stock').length;
    const lowStock = productList.filter((product) => product.status === 'low_stock').length;
    const outOfStock = productList.filter((product) => product.status === 'out_of_stock').length;
    const totalValue = productList.reduce((sum, product) => sum + (product.price * product.stock), 0);

    return { totalProducts, inStock, lowStock, outOfStock, totalValue };
  }, [productList]);

  useEffect(() => {
    setSearchTerm(queryParam);
  }, [queryParam]);

  useEffect(() => {
    setCurrentPage((previousPage) => Math.min(previousPage, totalPages));
  }, [totalPages]);

  const updateSearchParam = (value: string) => {
    const updatedParams = new URLSearchParams(searchParams);
    const trimmedValue = value.trim();

    if (trimmedValue) {
      updatedParams.set('q', trimmedValue);
    } else {
      updatedParams.delete('q');
    }

    setSearchParams(updatedParams, { replace: true });
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    updateSearchParam(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
    setCurrentPage(1);
  };

  const getStatusBadge = (status: ProductStatus) => {
    switch (status) {
      case 'in_stock':
        return <Badge variant="success">In Stock</Badge>;
      case 'low_stock':
        return <Badge variant="warning">Low Stock</Badge>;
      case 'out_of_stock':
        return <Badge variant="danger">Out of Stock</Badge>;
    }
  };

  const handleSort = (column: 'name' | 'category' | 'price' | 'stock' | 'sales') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
    setCurrentPage(1);
  };

  const handleDelete = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (!selectedProduct) return;

    setProductList((previousProducts) =>
      previousProducts.filter((product) => product.id !== selectedProduct.id)
    );
    setStatusMessage(`"${selectedProduct.name}" was deleted.`);
    setIsDeleteModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Products
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your inventory and product listings
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" icon={Download}>
            Export
          </Button>
          <Button
            variant="primary"
            icon={Plus}
            onClick={() => {
              setStatusMessage(null);
              setIsAddModalOpen(true);
            }}
          >
            Add Product
          </Button>
        </div>
      </div>

      {statusMessage && (
        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800 dark:border-green-900/40 dark:bg-green-900/20 dark:text-green-300">
          {statusMessage}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Package className="text-blue-600 dark:text-blue-400" size={20} />
            </div>
            <span className="text-sm text-green-600 dark:text-green-400 font-medium">
              +12.5%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-3">
            {stats.totalProducts}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Total Products
          </p>
        </div>

        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <Package className="text-green-600 dark:text-green-400" size={20} />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-3">
            {stats.inStock}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            In Stock
          </p>
        </div>

        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <AlertCircle className="text-yellow-600 dark:text-yellow-400" size={20} />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-3">
            {stats.lowStock}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Low Stock
          </p>
        </div>

        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <Package className="text-red-600 dark:text-red-400" size={20} />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-3">
            {stats.outOfStock}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Out of Stock
          </p>
        </div>

        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <Package className="text-purple-600 dark:text-purple-400" size={20} />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-3">
            {formatCurrency(stats.totalValue)}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Total Value
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="input-field"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="input-field"
            >
              <option value="all">All Status</option>
              <option value="in_stock">In Stock</option>
              <option value="low_stock">Low Stock</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>

            <Button variant="outline" icon={Filter}>
              More Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="table-header w-16">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th 
                  className="table-header cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center gap-2">
                    Product
                    {sortBy === 'name' && (
                      <ChevronRight className={`transform ${sortOrder === 'asc' ? 'rotate-90' : '-rotate-90'}`} size={16} />
                    )}
                  </div>
                </th>
                <th 
                  className="table-header cursor-pointer"
                  onClick={() => handleSort('category')}
                >
                  Category
                </th>
                <th 
                  className="table-header cursor-pointer"
                  onClick={() => handleSort('price')}
                >
                  <div className="flex items-center gap-2">
                    Price
                    {sortBy === 'price' && (
                      <ChevronRight className={`transform ${sortOrder === 'asc' ? 'rotate-90' : '-rotate-90'}`} size={16} />
                    )}
                  </div>
                </th>
                <th 
                  className="table-header cursor-pointer"
                  onClick={() => handleSort('stock')}
                >
                  <div className="flex items-center gap-2">
                    Stock
                    {sortBy === 'stock' && (
                      <ChevronRight className={`transform ${sortOrder === 'asc' ? 'rotate-90' : '-rotate-90'}`} size={16} />
                    )}
                  </div>
                </th>
                <th 
                  className="table-header cursor-pointer"
                  onClick={() => handleSort('sales')}
                >
                  <div className="flex items-center gap-2">
                    Sales
                    {sortBy === 'sales' && (
                      <ChevronRight className={`transform ${sortOrder === 'asc' ? 'rotate-90' : '-rotate-90'}`} size={16} />
                    )}
                  </div>
                </th>
                <th className="table-header">Status</th>
                <th className="table-header text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {hasProducts ? (
                paginatedProducts.map((product) => (
                  <tr 
                    key={product.id} 
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="table-cell">
                      <input type="checkbox" className="rounded border-gray-300" />
                    </td>
                    <td className="table-cell">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                          <Package size={20} className="text-gray-500" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {product.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            SKU: {product.sku || `PROD-${product.id.toString().padStart(4, '0')}`}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="table-cell">
                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm">
                        {product.category}
                      </span>
                    </td>
                    <td className="table-cell font-medium">
                      {formatCurrency(product.price)}
                    </td>
                    <td className="table-cell">
                      <div className="flex items-center gap-2">
                        <span className={product.stock <= 10 ? 'text-red-600' : 'text-gray-900 dark:text-white'}>
                          {product.stock}
                        </span>
                        {product.stock <= 10 && (
                          <AlertCircle size={14} className="text-red-500" />
                        )}
                      </div>
                    </td>
                    <td className="table-cell">
                      {product.sales.toLocaleString()}
                    </td>
                    <td className="table-cell">
                      {getStatusBadge(product.status)}
                    </td>
                    <td className="table-cell">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" icon={Eye} />
                        <Button variant="ghost" size="sm" icon={Edit} />
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={Trash2}
                          onClick={() => handleDelete(product)}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="px-6 py-12 text-center text-sm text-gray-500 dark:text-gray-400"
                  >
                    No products match your filters. Try a different keyword or status.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Showing <span className="font-medium">{firstResult}</span> to{' '}
            <span className="font-medium">
              {lastResult}
            </span>{' '}
            of <span className="font-medium">{filteredProducts.length}</span> results
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              icon={ChevronLeft}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1 || !hasProducts}
            >
              Previous
            </Button>
            <div className="flex items-center gap-1">
              {hasProducts ? (
                Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(page => {
                    if (totalPages <= 5) return true;
                    if (page === 1 || page === totalPages) return true;
                    if (page >= currentPage - 1 && page <= currentPage + 1) return true;
                    return false;
                  })
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
                  ))
              ) : (
                <span className="px-3 text-sm text-gray-500 dark:text-gray-400">No pages</span>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              icon={ChevronRight}
              iconPosition="right"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || !hasProducts}
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Add Product Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Product"
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Product Name
              </label>
              <input type="text" className="input-field" placeholder="Enter product name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category
              </label>
              <select className="input-field">
                <option value="">Select category</option>
                <option value="electronics">Electronics</option>
                <option value="fashion">Fashion</option>
                <option value="home">Home & Kitchen</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Price
              </label>
              <input type="number" className="input-field" placeholder="0.00" step="0.01" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Stock Quantity
              </label>
              <input type="number" className="input-field" placeholder="0" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea className="input-field min-h-[100px]" placeholder="Enter product description" />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setIsAddModalOpen(false);
                setStatusMessage('Product draft submitted. Connect your backend API to persist new products.');
              }}
            >
              Add Product
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Product"
        size="md"
      >
        <div className="space-y-4">
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div className="flex items-center gap-3">
              <AlertCircle className="text-red-500" size={24} />
              <div>
                <p className="font-medium text-red-800 dark:text-red-300">
                  Warning: This action cannot be undone
                </p>
                <p className="text-sm text-red-700 dark:text-red-400 mt-1">
                  Are you sure you want to delete "{selectedProduct?.name}"?
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Delete Product
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Products;
