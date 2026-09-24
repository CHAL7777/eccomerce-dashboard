import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import {
  Search,
  Bell,
  Moon,
  Sun,
  ChevronDown,
  Menu,
  ArrowRight,
  LogOut,
  Settings as SettingsIcon,
  UserCircle,
  X
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDarkMode } from '../../hooks/useDarkMode';

interface NavbarProps {
  onToggleMobileSidebar: () => void;
}

const PAGE_TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/products': 'Products',
  '/orders': 'Orders',
  '/customers': 'Customers',
  '/analytics': 'Analytics',
  '/settings': 'Settings',
};

interface NotificationItem {
  id: number;
  text: string;
  time: string;
  read: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleMobileSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useDarkMode();
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const notificationMenuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(() => {
    return new URLSearchParams(location.search).get('q') ?? '';
  });

  const notifications: NotificationItem[] = [
    { id: 1, text: 'New order received from Emma Johnson', time: '5 min ago', read: false },
    { id: 2, text: 'Product low in stock: Gaming Keyboard', time: '1 hour ago', read: false },
    { id: 3, text: 'Payment confirmed for #ORD-005', time: '2 hours ago', read: true }
  ];

  const unreadCount = notifications.filter((notification) => !notification.read).length;
  const pageTitle =
    Object.entries(PAGE_TITLES).find(([path]) => location.pathname.startsWith(path))?.[1] ?? 'Dashboard';

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, []);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;

      if (profileMenuRef.current && !profileMenuRef.current.contains(target)) {
        setIsProfileOpen(false);
      }

      if (notificationMenuRef.current && !notificationMenuRef.current.contains(target)) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, []);

  const getSearchRoute = (): string => {
    if (location.pathname.startsWith('/orders')) return '/orders';
    if (location.pathname.startsWith('/customers')) return '/customers';
    return '/products';
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedQuery = searchQuery.trim();
    const targetRoute = getSearchRoute();
    setIsProfileOpen(false);
    setIsNotificationsOpen(false);
    setIsMobileSearchOpen(false);

    if (!normalizedQuery) {
      navigate(targetRoute);
      return;
    }

    const searchParams = new URLSearchParams();
    searchParams.set('q', normalizedQuery);
    navigate(`${targetRoute}?${searchParams.toString()}`);
  };

  return (
    <header className="sticky top-0 z-40 h-16 bg-white/75 dark:bg-slate-950/70 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800">
      <div className="h-full px-4 sm:px-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={onToggleMobileSidebar}
            className="icon-btn lg:hidden"
            aria-label="Toggle sidebar"
          >
            <Menu size={20} />
          </button>

          <nav aria-label="Breadcrumb" className="hidden sm:flex items-center gap-2 text-sm min-w-0">
            <span className="text-slate-400 dark:text-slate-500">StoreDash</span>
            <span className="text-slate-300 dark:text-slate-700">/</span>
            <span className="font-semibold text-slate-900 dark:text-white truncate">{pageTitle}</span>
          </nav>
        </div>

        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:flex flex-1 max-w-md items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/70 pl-3 pr-1.5 h-10 shadow-soft transition-all focus-within:border-primary-400 focus-within:ring-2 focus-within:ring-primary-500/30 focus-within:bg-white dark:focus-within:bg-slate-900"
        >
          <Search size={16} className="text-slate-400 flex-shrink-0" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search products, orders, customers…"
            className="bg-transparent border-none outline-none focus:ring-0 w-full text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
          <span className="kbd hidden lg:inline-flex h-5">⌘K</span>
          <button
            type="submit"
            className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-white hover:text-slate-700 hover:shadow-soft dark:hover:bg-slate-800 dark:hover:text-slate-100 transition-colors"
            aria-label="Run search"
          >
            <ArrowRight size={14} />
          </button>
        </form>

        <div className="flex items-center gap-1 sm:gap-1.5">
          <button
            type="button"
            onClick={() => setIsMobileSearchOpen((previous) => !previous)}
            className="icon-btn md:hidden"
            aria-label={isMobileSearchOpen ? 'Close search' : 'Open search'}
          >
            {isMobileSearchOpen ? <X size={20} /> : <Search size={20} />}
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            className="icon-btn"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? <Sun size={19} className="text-amber-400" /> : <Moon size={19} />}
          </button>

          <div className="relative" ref={notificationMenuRef}>
            <button
              type="button"
              onClick={() => setIsNotificationsOpen((previous) => !previous)}
              className={clsx('icon-btn relative', isNotificationsOpen && 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white')}
              aria-label="Notifications"
              aria-expanded={isNotificationsOpen}
            >
              <Bell size={19} />
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-950" />
                </span>
              )}
            </button>

            {isNotificationsOpen && (
              <div className="menu-surface absolute right-0 mt-2 w-[22rem] overflow-hidden z-50 animate-scale-in origin-top-right">
                <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="rounded-full bg-primary-50 dark:bg-primary-500/10 px-2 py-0.5 text-[11px] font-semibold text-primary-700 dark:text-primary-300">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                <ul className="max-h-80 overflow-y-auto p-1.5">
                  {notifications.map((notification) => (
                    <li key={notification.id}>
                      <button
                        type="button"
                        className="w-full text-left rounded-xl px-3 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/70 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className={clsx(
                              'mt-1.5 h-2 w-2 rounded-full flex-shrink-0',
                              notification.read ? 'bg-slate-300 dark:bg-slate-600' : 'bg-primary-500'
                            )}
                          />
                          <div className="min-w-0">
                            <p className={clsx('text-sm leading-snug', notification.read ? 'text-slate-600 dark:text-slate-400' : 'text-slate-900 dark:text-slate-100 font-medium')}>
                              {notification.text}
                            </p>
                            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-slate-100 dark:border-slate-800 p-2">
                  <button type="button" className="w-full rounded-lg py-1.5 text-xs font-semibold text-primary-600 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-500/10 transition-colors">
                    Mark all as read
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="hidden sm:block mx-1 h-6 w-px bg-slate-200 dark:bg-slate-800" />

          <div className="relative" ref={profileMenuRef}>
            <button
              type="button"
              onClick={() => setIsProfileOpen((previous) => !previous)}
              className={clsx(
                'flex items-center gap-2.5 rounded-xl p-1.5 pr-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors',
                isProfileOpen && 'bg-slate-100 dark:bg-slate-800'
              )}
              aria-label="Profile menu"
              aria-expanded={isProfileOpen}
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary-500 to-violet-500 flex items-center justify-center text-white text-xs font-bold ring-2 ring-white dark:ring-slate-900">
                C7
              </div>
              <div className="hidden md:block text-left leading-tight">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">chaldev</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Administrator</p>
              </div>
              <ChevronDown size={14} className={clsx('text-slate-400 hidden md:block transition-transform', isProfileOpen && 'rotate-180')} />
            </button>

            {isProfileOpen && (
              <div className="menu-surface absolute right-0 mt-2 w-60 p-1.5 z-50 animate-scale-in origin-top-right">
                <div className="px-3 py-2.5 mb-1 border-b border-slate-100 dark:border-slate-800">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">chaldev</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">admin@storedash.com</p>
                </div>
                <Link to="/settings" onClick={() => setIsProfileOpen(false)} className="menu-item">
                  <UserCircle size={16} className="text-slate-400" />
                  Your profile
                </Link>
                <Link to="/settings" onClick={() => setIsProfileOpen(false)} className="menu-item">
                  <SettingsIcon size={16} className="text-slate-400" />
                  Settings
                </Link>
                <div className="my-1 h-px bg-slate-100 dark:bg-slate-800" />
                <button
                  type="button"
                  onClick={() => {
                    setIsProfileOpen(false);
                    navigate('/login');
                  }}
                  className="menu-item w-full text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10"
                >
                  <LogOut size={16} />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {isMobileSearchOpen && (
        <form onSubmit={handleSearchSubmit} className="md:hidden px-4 pb-3 pt-1 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800 animate-fade-in">
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-3 h-10">
            <Search size={16} className="text-slate-400 flex-shrink-0" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search…"
              className="w-full bg-transparent outline-none text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
            />
            <button type="submit" className="text-sm font-semibold text-primary-600 dark:text-primary-400">
              Go
            </button>
          </div>
        </form>
      )}
    </header>
  );
};

export default Navbar;
