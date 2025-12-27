import React from 'react';
import { 
  TrendingUp, 
  Package, 
  Users, 
  DollarSign,
  ShoppingCart,
  MoreVertical,
  ArrowUpRight,
  Calendar
} from 'lucide-react';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import SalesChart from '../components/charts/SalesChart';
import { formatCompactCurrencyFromUSD } from '../utils/formatCurrency';
import { orders } from '../data/orders';

interface StatCard {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
  color: string;
}

interface Activity {
  id: number;
  user: string;
  action: string;
  time: string;
  type: 'order' | 'review' | 'user' | 'cancel';
}

const Dashboard: React.FC = () => {
  const stats: StatCard[] = [
    {
      title: 'Total Revenue',
      value: formatCompactCurrencyFromUSD(54239), // Convert $54,239 USD to ETB
      change: '+12.5%',
      trend: 'up',
      icon: <DollarSign className="text-green-500" size={24} />,
      color: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      title: 'Total Orders',
      value: '1,245',
      change: '+8.2%',
      trend: 'up',
      icon: <ShoppingCart className="text-blue-500" size={24} />,
      color: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      title: 'Total Products',
      value: '845',
      change: '+3.1%',
      trend: 'up',
      icon: <Package className="text-purple-500" size={24} />,
      color: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      title: 'Total Customers',
      value: '12,458',
      change: '+5.7%',
      trend: 'up',
      icon: <Users className="text-orange-500" size={24} />,
      color: 'bg-orange-50 dark:bg-orange-900/20'
    }
  ];

  const recentActivities: Activity[] = [
    { id: 1, user: 'chaldev', action: 'placed a new order', time: '2 min ago', type: 'order' },
    { id: 2, user: 'Sarah Smith', action: 'added a product review', time: '15 min ago', type: 'review' },
    { id: 3, user: 'Mike Johnson', action: 'registered as new customer', time: '1 hour ago', type: 'user' },
    { id: 4, user: 'Emma Wilson', action: 'cancelled an order', time: '2 hours ago', type: 'cancel' },
  ];

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'order': return <ShoppingCart className="text-blue-600 dark:text-blue-400" size={20} />;
      case 'review': return <Package className="text-green-600 dark:text-green-400" size={20} />;
      case 'user': return <Users className="text-purple-600 dark:text-purple-400" size={20} />;
      case 'cancel': return <MoreVertical className="text-red-600 dark:text-red-400" size={20} />;
    }
  };

  const getActivityColor = (type: Activity['type']) => {
    switch (type) {
      case 'order': return 'bg-blue-100 dark:bg-blue-900/30';
      case 'review': return 'bg-green-100 dark:bg-green-900/30';
      case 'user': return 'bg-purple-100 dark:bg-purple-900/30';
      case 'cancel': return 'bg-red-100 dark:bg-red-900/30';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Welcome back! Here's what's happening with your store today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" icon={Calendar}>
            This Month
          </Button>
          <Button variant="primary" icon={ArrowUpRight}>
            Export Report
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="card p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center justify-between">
              <div className={`p-2 sm:p-3 rounded-lg ${stat.color}`}>
                {stat.icon}
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${
                stat.trend === 'up' 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                <TrendingUp size={14} />
                <span>{stat.change}</span>
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mt-3 sm:mt-4">
              {stat.value}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mt-1">
              {stat.title}
            </p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <div className="card p-4 sm:p-6 lg:col-span-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Sales Overview
            </h2>
            <div className="flex items-center gap-2">
              <Badge variant="primary">Revenue</Badge>
              <Badge variant="success">Sales</Badge>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <MoreVertical size={20} />
              </button>
            </div>
          </div>
          <div className="h-64 sm:h-72">
            <SalesChart />
          </div>
        </div>

        {/* Recent Orders */}
        <div className="card p-4 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Recent Orders
            </h2>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {orders.slice(0, 4).map((order) => (
              <div 
                key={order.id} 
                className="flex items-center justify-between p-3 sm:p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors group"
              >
                <div className="min-w-0">
                  <h4 className="font-medium text-gray-900 dark:text-white truncate">
                    {order.id}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                    {order.customerName} • {order.items.length} items
                  </p>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {formatCompactCurrencyFromUSD(order.total)}
                  </p>
                  <Badge 
                    variant={
                      order.status === 'delivered' ? 'success' :
                      order.status === 'processing' ? 'warning' :
                      order.status === 'shipped' ? 'primary' : 'default'
                    }
                    className="mt-1"
                  >
                    {order.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="card p-4 sm:p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Recent Activities
        </h2>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div 
              key={activity.id} 
              className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getActivityColor(activity.type)}`}>
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-gray-900 dark:text-white">
                  <span className="font-medium">{activity.user}</span> {activity.action}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;