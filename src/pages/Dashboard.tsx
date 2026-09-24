import React from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  TrendingDown,
  Package,
  Users,
  DollarSign,
  ShoppingCart,
  ArrowUpRight,
  Calendar,
  Download,
  Star,
  UserPlus,
  XCircle,
  ChevronRight,
  Target
} from 'lucide-react';
import clsx from 'clsx';
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
  iconBg: string;
  spark: number[];
  sparkColor: string;
}

interface Activity {
  id: number;
  user: string;
  action: string;
  time: string;
  type: 'order' | 'review' | 'user' | 'cancel';
}

const Sparkline: React.FC<{ data: number[]; color: string }> = ({ data, color }) => {
  const width = 96;
  const height = 32;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * (height - 4) - 2;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible" aria-hidden>
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const Dashboard: React.FC = () => {
  const stats: StatCard[] = [
    {
      title: 'Total Revenue',
      value: formatCompactCurrencyFromUSD(54239),
      change: '+12.5%',
      trend: 'up',
      icon: <DollarSign size={20} />,
      iconBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
      spark: [12, 18, 14, 22, 20, 28, 26, 34],
      sparkColor: '#10B981',
    },
    {
      title: 'Total Orders',
      value: '1,245',
      change: '+8.2%',
      trend: 'up',
      icon: <ShoppingCart size={20} />,
      iconBg: 'bg-primary-500/10 text-primary-600 dark:text-primary-400',
      spark: [20, 22, 19, 25, 27, 24, 30, 33],
      sparkColor: '#6366F1',
    },
    {
      title: 'Total Products',
      value: '845',
      change: '-1.4%',
      trend: 'down',
      icon: <Package size={20} />,
      iconBg: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
      spark: [30, 28, 31, 27, 26, 28, 25, 24],
      sparkColor: '#8B5CF6',
    },
    {
      title: 'Total Customers',
      value: '12,458',
      change: '+5.7%',
      trend: 'up',
      icon: <Users size={20} />,
      iconBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
      spark: [10, 14, 13, 18, 21, 20, 26, 29],
      sparkColor: '#F59E0B',
    },
  ];

  const recentActivities: Activity[] = [
    { id: 1, user: 'chaldev', action: 'placed a new order', time: '2 min ago', type: 'order' },
    { id: 2, user: 'Sarah Smith', action: 'added a product review', time: '15 min ago', type: 'review' },
    { id: 3, user: 'Mike Johnson', action: 'registered as new customer', time: '1 hour ago', type: 'user' },
    { id: 4, user: 'Emma Wilson', action: 'cancelled an order', time: '2 hours ago', type: 'cancel' },
  ];

  const activityMeta: Record<Activity['type'], { icon: React.ReactNode; className: string }> = {
    order: { icon: <ShoppingCart size={16} />, className: 'bg-primary-500/10 text-primary-600 dark:text-primary-400' },
    review: { icon: <Star size={16} />, className: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' },
    user: { icon: <UserPlus size={16} />, className: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
    cancel: { icon: <XCircle size={16} />, className: 'bg-rose-500/10 text-rose-600 dark:text-rose-400' },
  };

  const statusVariant = (status: string) =>
    status === 'delivered' ? 'success' :
    status === 'processing' ? 'warning' :
    status === 'shipped' ? 'primary' :
    status === 'cancelled' ? 'danger' : 'default';

  const monthlyTarget = 72;

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-600 dark:text-primary-400 mb-1.5">
            Overview
          </p>
          <h1 className="page-title">Good afternoon, chaldev</h1>
          <p className="page-subtitle">Here's what's happening with your store today.</p>
        </div>
        <div className="flex items-center gap-2.5">
          <Button variant="outline" icon={Calendar}>This month</Button>
          <Button variant="primary" icon={Download}>Export</Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
        {stats.map((stat, index) => (
          <div
            key={stat.title}
            className="card card-hover p-5 animate-fade-up"
            style={{ animationDelay: `${index * 60}ms` }}
          >
            <div className="flex items-start justify-between">
              <div className={clsx('inline-flex h-10 w-10 items-center justify-center rounded-xl', stat.iconBg)}>
                {stat.icon}
              </div>
              <span
                className={clsx(
                  'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold tabular-nums',
                  stat.trend === 'up'
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
                    : 'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400'
                )}
              >
                {stat.trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {stat.change}
              </span>
            </div>
            <div className="mt-4 flex items-end justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm text-slate-500 dark:text-slate-400">{stat.title}</p>
                <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white tabular-nums truncate">
                  {stat.value}
                </p>
              </div>
              <div className="shrink-0 opacity-90">
                <Sparkline data={stat.spark} color={stat.sparkColor} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
        {/* Sales Chart */}
        <div className="card p-5 sm:p-6 lg:col-span-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="card-title">Sales overview</h2>
              <p className="card-subtitle">Revenue and sales volume over the last 12 months</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-primary-500" />Revenue</span>
              <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-emerald-500" />Sales</span>
            </div>
          </div>
          <div className="h-64 sm:h-80 -ml-2">
            <SalesChart />
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-5 sm:gap-6">
          {/* Monthly target */}
          <div className="card p-5 sm:p-6 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary-500/10 blur-2xl" />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary-500/10 text-primary-600 dark:text-primary-400">
                    <Target size={18} />
                  </span>
                  <div>
                    <h2 className="card-title">Monthly target</h2>
                    <p className="card-subtitle">Revenue goal progress</p>
                  </div>
                </div>
              </div>
              <div className="flex items-end justify-between mb-2">
                <p className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white tabular-nums">{monthlyTarget}%</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                  {formatCompactCurrencyFromUSD(54239)} of {formatCompactCurrencyFromUSD(75000)}
                </p>
              </div>
              <div className="h-2.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary-500 to-violet-500 transition-[width] duration-1000"
                  style={{ width: `${monthlyTarget}%` }}
                />
              </div>
              <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                You're <span className="font-semibold text-emerald-600 dark:text-emerald-400">8% ahead</span> of last month's pace.
              </p>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="card p-5 sm:p-6 flex-1">
            <div className="card-header mb-4">
              <div>
                <h2 className="card-title">Recent orders</h2>
                <p className="card-subtitle">Latest transactions</p>
              </div>
              <Link
                to="/orders"
                className="inline-flex items-center gap-1 text-xs font-semibold text-primary-600 dark:text-primary-400 hover:underline"
              >
                View all <ChevronRight size={14} />
              </Link>
            </div>
            <ul className="divide-y divide-slate-100 dark:divide-slate-800 -mx-2">
              {orders.slice(0, 4).map((order) => (
                <li key={order.id}>
                  <Link
                    to="/orders"
                    className="flex items-center justify-between gap-3 px-2 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-9 w-9 shrink-0 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center text-xs font-bold">
                        {order.customerName.split(' ').map((part) => part[0]).join('').slice(0, 2)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{order.customerName}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                          {order.id} · {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white tabular-nums">
                        {formatCompactCurrencyFromUSD(order.total)}
                      </p>
                      <Badge variant={statusVariant(order.status)} className="mt-1">
                        {order.status}
                      </Badge>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="card p-5 sm:p-6">
        <div className="card-header mb-5">
          <div>
            <h2 className="card-title">Recent activity</h2>
            <p className="card-subtitle">What your customers have been up to</p>
          </div>
          <Button variant="ghost" size="sm" icon={ArrowUpRight} iconPosition="right">
            Activity log
          </Button>
        </div>
        <ol className="relative space-y-1">
          <span aria-hidden className="absolute left-[19px] top-4 bottom-4 w-px bg-slate-200 dark:bg-slate-800" />
          {recentActivities.map((activity) => {
            const meta = activityMeta[activity.type];
            return (
              <li
                key={activity.id}
                className="relative flex items-center gap-4 rounded-xl px-2 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
              >
                <span className={clsx('relative z-10 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full ring-4 ring-white dark:ring-slate-900', meta.className)}>
                  {meta.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-700 dark:text-slate-200">
                    <span className="font-semibold text-slate-900 dark:text-white">{activity.user}</span> {activity.action}
                  </p>
                </div>
                <time className="shrink-0 text-xs text-slate-400 dark:text-slate-500 tabular-nums">{activity.time}</time>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default Dashboard;