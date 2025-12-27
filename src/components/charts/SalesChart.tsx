import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { formatCurrency } from '../../utils/formatCurrency';

interface ChartData {
  month: string;
  revenue: number;
  sales: number;
}

const salesData: ChartData[] = [
  { month: 'Jan', revenue: 4000, sales: 2400 },
  { month: 'Feb', revenue: 3000, sales: 1398 },
  { month: 'Mar', revenue: 2000, sales: 9800 },
  { month: 'Apr', revenue: 2780, sales: 3908 },
  { month: 'May', revenue: 1890, sales: 4800 },
  { month: 'Jun', revenue: 2390, sales: 3800 },
  { month: 'Jul', revenue: 3490, sales: 4300 },
  { month: 'Aug', revenue: 4000, sales: 2400 },
  { month: 'Sep', revenue: 3000, sales: 1398 },
  { month: 'Oct', revenue: 2000, sales: 9800 },
  { month: 'Nov', revenue: 2780, sales: 3908 },
  { month: 'Dec', revenue: 1890, sales: 4800 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <p className="font-medium text-gray-900 dark:text-white mb-2">{label}</p>
        <div className="space-y-1">
          <p className="text-sm">
            <span className="text-blue-600 dark:text-blue-400">Revenue: </span>
            <span className="font-medium">{formatCurrency(payload[0].value || 0)}</span>
          </p>
          <p className="text-sm">
            <span className="text-green-600 dark:text-green-400">Sales: </span>
            <span className="font-medium">{payload[1].value?.toLocaleString()}</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const SalesChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={salesData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid 
          strokeDasharray="3 3" 
          stroke="#374151" 
          vertical={false} 
          horizontal={true}
        />
        <XAxis 
          dataKey="month" 
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#6B7280', fontSize: 12 }}
        />
        <YAxis 
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#6B7280', fontSize: 12 }}
          tickFormatter={(value) => `$${value / 1000}k`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#3B82F6"
          fill="url(#colorRevenue)"
          strokeWidth={2}
          name="Revenue"
        />
        <Area
          type="monotone"
          dataKey="sales"
          stroke="#10B981"
          fill="url(#colorSales)"
          strokeWidth={2}
          name="Sales"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default SalesChart;