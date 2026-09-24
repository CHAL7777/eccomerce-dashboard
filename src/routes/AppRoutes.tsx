import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';

// Lazy load pages for better performance
const Dashboard = React.lazy(() => import('../pages/Dashboard'));
const Products = React.lazy(() => import('../pages/Products'));
const Orders = React.lazy(() => import('../pages/Orders'));
const Customers = React.lazy(() => import('../pages/Customers'));
const Analytics = React.lazy(() => import('../pages/Analytics'));
const Settings = React.lazy(() => import('../pages/Settings'));
const Login = React.lazy(() => import('../pages/Login'));

const LoadingFallback = () => (
  <div className="flex flex-col items-center justify-center gap-3 h-screen bg-slate-50 dark:bg-slate-950">
    <div className="w-9 h-9 border-[3px] border-primary-200 dark:border-primary-500/20 border-t-primary-600 rounded-full animate-spin"></div>
    <p className="text-xs font-medium text-slate-400 tracking-wide">Loading…</p>
  </div>
);

const AppRoutes: React.FC = () => {
  return (
    <React.Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="customers" element={<Customers />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </React.Suspense>
  );
};

export default AppRoutes;
