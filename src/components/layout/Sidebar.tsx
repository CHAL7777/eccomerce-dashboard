import React from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  X,
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import { MenuItem } from '../../types';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  onCloseMobile: () => void;
}

interface MenuGroup {
  label: string;
  items: (MenuItem & { badge?: string })[];
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggleCollapse, onCloseMobile }) => {
  const menuGroups: MenuGroup[] = [
    {
      label: 'Overview',
      items: [
        { icon: <LayoutDashboard size={18} />, label: 'Dashboard', path: '/dashboard' },
        { icon: <BarChart3 size={18} />, label: 'Analytics', path: '/analytics' },
      ],
    },
    {
      label: 'Store',
      items: [
        { icon: <Package size={18} />, label: 'Products', path: '/products' },
        { icon: <ShoppingCart size={18} />, label: 'Orders', path: '/orders', badge: '12' },
        { icon: <Users size={18} />, label: 'Customers', path: '/customers' },
      ],
    },
    {
      label: 'System',
      items: [
        { icon: <Settings size={18} />, label: 'Settings', path: '/settings' },
      ],
    },
  ];

  return (
    <aside
      className={clsx(
        'h-full flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 transition-all duration-300',
        collapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Brand */}
      <div className={clsx('h-16 flex items-center border-b border-slate-200/80 dark:border-slate-800', collapsed ? 'justify-center px-2' : 'justify-between px-5')}>
        <NavLink to="/dashboard" className="flex items-center gap-3 min-w-0" onClick={onCloseMobile}>
          <div className="relative h-9 w-9 shrink-0 rounded-xl bg-gradient-to-br from-primary-500 via-primary-600 to-violet-600 shadow-glow flex items-center justify-center">
            <ShoppingBag className="text-white" size={18} strokeWidth={2.25} />
          </div>
          {!collapsed && (
            <div className="min-w-0 leading-tight">
              <p className="text-[15px] font-bold tracking-tight text-slate-900 dark:text-white truncate">StoreDash</p>
              <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500">Commerce</p>
            </div>
          )}
        </NavLink>
        {!collapsed && (
          <button
            type="button"
            onClick={onCloseMobile}
            className="icon-btn h-8 w-8 lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {menuGroups.map((group) => (
          <div key={group.label}>
            {!collapsed ? (
              <p className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500">
                {group.label}
              </p>
            ) : (
              <div className="mx-3 mb-2 h-px bg-slate-200 dark:bg-slate-800" />
            )}
            <ul className="space-y-1">
              {group.items.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end={item.path === '/dashboard'}
                    onClick={onCloseMobile}
                    title={collapsed ? item.label : undefined}
                    className={({ isActive }) =>
                      clsx(
                        'group relative flex items-center gap-3 rounded-xl text-sm font-medium transition-all duration-200',
                        collapsed ? 'justify-center h-11 w-full' : 'px-3 py-2.5',
                        isActive
                          ? 'bg-primary-50 text-primary-700 dark:bg-primary-500/10 dark:text-primary-300'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/70 dark:hover:text-white'
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r-full bg-primary-600 dark:bg-primary-400" />
                        )}
                        <span
                          className={clsx(
                            'shrink-0 transition-colors',
                            isActive ? 'text-primary-600 dark:text-primary-300' : 'text-slate-400 group-hover:text-slate-700 dark:text-slate-500 dark:group-hover:text-slate-200'
                          )}
                        >
                          {item.icon}
                        </span>
                        {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
                        {!collapsed && item.badge && (
                          <span
                            className={clsx(
                              'ml-auto rounded-full px-2 py-0.5 text-[11px] font-semibold tabular-nums',
                              isActive
                                ? 'bg-primary-600 text-white dark:bg-primary-400 dark:text-slate-900'
                                : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                            )}
                          >
                            {item.badge}
                          </span>
                        )}
                        {collapsed && (
                          <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-lg bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 dark:bg-slate-700 z-20">
                            {item.label}
                          </span>
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Upgrade card */}
      {!collapsed && (
        <div className="px-3 pb-3">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-600 to-violet-600 p-4 text-white shadow-glow">
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10" />
            <div className="absolute -bottom-8 -left-4 h-24 w-24 rounded-full bg-white/10" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-white/20">
                  <Sparkles size={14} />
                </span>
                <p className="text-sm font-semibold">Upgrade to Pro</p>
              </div>
              <p className="text-xs text-white/80 leading-relaxed mb-3">
                Unlock advanced analytics, exports and unlimited team seats.
              </p>
              <button
                type="button"
                className="w-full rounded-lg bg-white/95 py-1.5 text-xs font-semibold text-primary-700 hover:bg-white transition-colors"
              >
                View plans
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer: user + collapse */}
      <div className={clsx('border-t border-slate-200/80 dark:border-slate-800 p-3', collapsed ? 'flex flex-col items-center gap-2' : 'flex items-center gap-3')}>
        <div className="relative shrink-0">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary-500 to-violet-500 flex items-center justify-center text-white text-xs font-bold ring-2 ring-white dark:ring-slate-900">
            C7
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
        </div>
        {!collapsed && (
          <div className="flex-1 min-w-0 leading-tight">
            <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">chaldev</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">Administrator</p>
          </div>
        )}
        <button
          type="button"
          onClick={onToggleCollapse}
          className="icon-btn hidden lg:inline-flex h-8 w-8"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
