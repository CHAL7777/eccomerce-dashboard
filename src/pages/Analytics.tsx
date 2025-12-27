import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Filter,
  DollarSign,
  Users,
  PieChart as PieChartIcon,
  Activity
} from 'lucide-react';
import Button from '../components/common/Button';
import { formatCompactCurrencyFromUSD, formatCurrencyFromUSD } from '../utils/formatCurrency';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

// CustomTooltip component moved outside the main component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <p className="font-medium text-gray-900 dark:text-white mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.name.includes('revenue') ? formatCurrencyFromUSD(entry.value) : entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter' | 'year'>('month');

  // Revenue Data
  const revenueData = [
    { month: 'Jan', revenue: 42000, orders: 125 },
    { month: 'Feb', revenue: 38000, orders: 110 },
    { month: 'Mar', revenue: 51000, orders: 145 },
    { month: 'Apr', revenue: 48000, orders: 135 },
    { month: 'May', revenue: 52000, orders: 150 },
    { month: 'Jun', revenue: 55000, orders: 160 },
    { month: 'Jul', revenue: 58000, orders: 165 },
    { month: 'Aug', revenue: 54000, orders: 155 },
    { month: 'Sep', revenue: 62000, orders: 175 },
    { month: 'Oct', revenue: 65000, orders: 180 },
    { month: 'Nov', revenue: 68000, orders: 190 },
    { month: 'Dec', revenue: 72000, orders: 200 }
  ];

  // Category Sales Data
  const categoryData = [
    { name: 'Electronics', value: 35, color: '#3B82F6' },
    { name: 'Fashion', value: 25, color: '#10B981' },
    { name: 'Home & Kitchen', value: 20, color: '#8B5CF6' },
    { name: 'Books', value: 10, color: '#F59E0B' },
    { name: 'Sports', value: 10, color: '#EF4444' }
  ];

  // Top Products Data
  const topProducts = [
    { name: 'Wireless Headphones', sales: 1245, revenue: 373350 },
    { name: 'Smart Watch', sales: 980, revenue: 196000 },
    { name: 'Laptop Bag', sales: 845, revenue: 109850 },
    { name: 'Coffee Mug Set', sales: 720, revenue: 25120 },
    { name: 'Fitness Tracker', sales: 650, revenue: 97500 }
  ];

  // Performance Metrics
  const metrics = [
    {
      title: 'Conversion Rate',
      value: '3.2%',
      change: '+0.5%',
      trend: 'up',
      icon: <TrendingUp className="text-green-500" size={24} />
    },
    {
      title: 'Avg. Order Value',
      value: formatCompactCurrencyFromUSD(89.50),
      change: '+$5.20',
      trend: 'up',
      icon: <DollarSign className="text-blue-500" size={24} />
    },
    {
      title: 'Customer Retention',
      value: '72%',
      change: '+4%',
      trend: 'up',
      icon: <Users className="text-purple-500" size={24} />
    },
    {
      title: 'Bounce Rate',
      value: '28%',
      change: '-2%',
      trend: 'down',
      icon: <TrendingDown className="text-red-500" size={24} />
    }
  ];

  // Traffic Sources
  const trafficData = [
    { source: 'Direct', visitors: 45000, percent: 40 },
    { source: 'Organic Search', visitors: 33750, percent: 30 },
    { source: 'Social Media', visitors: 22500, percent: 20 },
    { source: 'Email', visitors: 11250, percent: 10 }
  ];



  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Deep insights and performance metrics for your store
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" icon={Calendar}>
            {timeRange === 'week' ? 'This Week' : 
             timeRange === 'month' ? 'This Month' :
             timeRange === 'quarter' ? 'This Quarter' : 'This Year'}
          </Button>
          <Button variant="outline" icon={Download}>
            Export Report
          </Button>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="flex gap-2">
        {(['week', 'month', 'quarter', 'year'] as const).map(range => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              timeRange === range
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {range.charAt(0).toUpperCase() + range.slice(1)}
          </button>
        ))}
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="card p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                {metric.icon}
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${
                metric.trend === 'up' 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {metric.trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                <span>{metric.change}</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-4">
              {metric.value}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {metric.title}
            </p>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue & Orders Chart */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Revenue & Orders
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Monthly performance overview
              </p>
            </div>
            <Button variant="ghost" size="sm" icon={Filter}>
              Filter
            </Button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                />
                <YAxis 
                  yAxisId="left"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                  tickFormatter={(value) => `$${value / 1000}k`}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="revenue"
                  name="Revenue"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="orders"
                  name="Orders"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sales by Category */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Sales by Category
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Product category distribution
              </p>
            </div>
            <PieChartIcon className="text-gray-400" size={20} />
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Performing Products */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Top Products
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Best selling products by revenue
              </p>
            </div>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    #{index + 1}
                  </span>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {product.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {product.sales.toLocaleString()} units sold
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900 dark:text-white">
                    {formatCompactCurrencyFromUSD(product.revenue)}
                  </p>
                  <p className="text-sm text-green-600 dark:text-green-400">
                    +15% this month
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Traffic Sources
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Where your visitors come from
              </p>
            </div>
            <Activity className="text-gray-400" size={20} />
          </div>
          <div className="space-y-4">
            {trafficData.map((source, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {source.source}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {source.visitors.toLocaleString()} ({source.percent}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full"
                    style={{ width: `${source.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Acquisition */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Customer Acquisition
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">New Customers</span>
              <span className="font-medium">1,245</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Returning Customers</span>
              <span className="font-medium">3,456</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Acquisition Cost</span>
              <span className="font-medium">{formatCompactCurrencyFromUSD(28.50)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Customer Lifetime Value</span>
              <span className="font-medium">{formatCompactCurrencyFromUSD(450.25)}</span>
            </div>
          </div>
        </div>

        {/* Inventory Health */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Inventory Health
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Low Stock Items</span>
              <span className="font-medium">23</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Out of Stock</span>
              <span className="font-medium">8</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Inventory Turnover</span>
              <span className="font-medium">4.2x</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Stock Value</span>
              <span className="font-medium">{formatCompactCurrencyFromUSD(125450)}</span>
            </div>
          </div>
        </div>

        {/* Sales Channels */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Sales Channels
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Online Store</span>
              <span className="font-medium">{formatCompactCurrencyFromUSD(45230)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Marketplace</span>
              <span className="font-medium">{formatCompactCurrencyFromUSD(23450)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Social Commerce</span>
              <span className="font-medium">{formatCompactCurrencyFromUSD(12890)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Total Revenue</span>
              <span className="font-medium">{formatCompactCurrencyFromUSD(81570)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
