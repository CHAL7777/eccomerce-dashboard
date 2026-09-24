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

interface TooltipEntry {
  value?: number | string;
}

interface SalesTooltipProps {
  active?: boolean;
  payload?: TooltipEntry[];
  label?: string;
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

const CustomTooltip: React.FC<SalesTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const revenueValue = typeof payload[0]?.value === 'number'
      ? payload[0].value
      : Number(payload[0]?.value ?? 0);
    const salesValue = typeof payload[1]?.value === 'number'
      ? payload[1].value
      : Number(payload[1]?.value ?? 0);

    return (
      <div className="menu-surface p-3 min-w-[10rem]">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">{label}</p>
        <div className="space-y-1.5">
          <p className="flex items-center justify-between gap-4 text-sm">
            <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400"><span className="h-2 w-2 rounded-full bg-primary-500" />Revenue</span>
            <span className="font-semibold text-slate-900 dark:text-white tabular-nums">{formatCurrency(revenueValue)}</span>
          </p>
          <p className="flex items-center justify-between gap-4 text-sm">
            <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400"><span className="h-2 w-2 rounded-full bg-emerald-500" />Sales</span>
            <span className="font-semibold text-slate-900 dark:text-white tabular-nums">{salesValue.toLocaleString()}</span>
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
            <stop offset="5%" stopColor="#6366F1" stopOpacity={0.35}/>
            <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid 
          strokeDasharray="4 4" 
          stroke="currentColor"
          className="text-slate-200 dark:text-slate-800"
          vertical={false} 
          horizontal={true}
        />
        <XAxis 
          dataKey="month" 
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#94A3B8', fontSize: 12 }}
          dy={8}
        />
        <YAxis 
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#94A3B8', fontSize: 12 }}
          tickFormatter={(value) => `$${value / 1000}k`}
          width={44}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#6366F1', strokeWidth: 1, strokeDasharray: '4 4' }} />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#6366F1"
          fill="url(#colorRevenue)"
          strokeWidth={2.5}
          name="Revenue"
          activeDot={{ r: 5, strokeWidth: 2, stroke: '#fff' }}
        />
        <Area
          type="monotone"
          dataKey="sales"
          stroke="#10B981"
          fill="url(#colorSales)"
          strokeWidth={2.5}
          name="Sales"
          activeDot={{ r: 5, strokeWidth: 2, stroke: '#fff' }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default SalesChart;
