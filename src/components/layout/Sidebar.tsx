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
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import { MenuItem } from '../../types';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  onCloseMobile: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggleCollapse, onCloseMobile }) => {

  const menuItems: MenuItem[] = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/dashboard' },
    { icon: <Package size={20} />, label: 'Products', path: '/products' },
    { icon: <ShoppingCart size={20} />, label: 'Orders', path: '/orders' },
    { icon: <Users size={20} />, label: 'Customers', path: '/customers' },
    { icon: <BarChart3 size={20} />, label: 'Analytics', path: '/analytics' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
  ];

  return (
    <aside className={clsx(
      'h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 flex flex-col',
      collapsed ? 'w-20' : 'w-64'
    )}>
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <div className={clsx(
          'flex items-center gap-3',
          collapsed && 'justify-center'
        )}>
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <ShoppingCart className="text-white" size={20} />
          </div>
          {!collapsed && (
            <h1 className="text-xl font-bold text-gray-800 dark:text-white whitespace-nowrap">
              StoreDash
            </h1>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onCloseMobile}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
          <button
            type="button"
            onClick={onToggleCollapse}
            className="hidden lg:inline-flex p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === '/dashboard'}
                onClick={onCloseMobile}
                className={({ isActive }) => clsx(
                  'relative flex items-center gap-3 p-3 rounded-lg transition-colors group',
                  collapsed ? 'justify-center' : '',
                  isActive
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'
                )}
                title={collapsed ? item.label : undefined}
              >
                {item.icon}
                {!collapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
                {collapsed && (
                  <div className="pointer-events-none absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    {item.label}
                  </div>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className={clsx(
        'p-4 border-t border-gray-200 dark:border-gray-700',
        collapsed ? 'flex justify-center' : ''
      )}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
            C7
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-800 dark:text-white truncate">
                chaldev
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                Admin
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
