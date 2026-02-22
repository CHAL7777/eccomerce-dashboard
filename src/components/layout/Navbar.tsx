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
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleMobileSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors lg:hidden"
            aria-label="Toggle sidebar"
          >
            <Menu size={20} />
          </button>

          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg pl-4 pr-2 py-2 w-[22rem] lg:w-[28rem]"
          >
            <Search size={18} className="text-gray-400 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search products, orders, customers..."
              className="bg-transparent border-none outline-none px-3 w-full text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400"
            />
            <button
              type="submit"
              className="p-1.5 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
              aria-label="Run search"
            >
              <ArrowRight size={16} />
            </button>
          </form>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setIsMobileSearchOpen((previous) => !previous)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label={isMobileSearchOpen ? 'Close search' : 'Open search'}
          >
            {isMobileSearchOpen ? <X size={20} /> : <Search size={20} />}
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? (
              <Sun size={20} className="text-yellow-500" />
            ) : (
              <Moon size={20} className="text-gray-600 dark:text-gray-400" />
            )}
          </button>

          <div className="relative" ref={notificationMenuRef}>
            <button
              type="button"
              onClick={() => setIsNotificationsOpen((previous) => !previous)}
              className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Notifications"
              aria-expanded={isNotificationsOpen}
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Notifications</h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{unreadCount} unread</span>
                </div>
                <ul className="max-h-72 overflow-y-auto">
                  {notifications.map((notification) => (
                    <li key={notification.id}>
                      <button
                        type="button"
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/60 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className={clsx(
                              'mt-1.5 h-2 w-2 rounded-full flex-shrink-0',
                              notification.read ? 'bg-gray-300 dark:bg-gray-600' : 'bg-primary-500'
                            )}
                          />
                          <div className="min-w-0">
                            <p className="text-sm text-gray-800 dark:text-gray-200">{notification.text}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="relative" ref={profileMenuRef}>
            <button
              type="button"
              onClick={() => setIsProfileOpen((previous) => !previous)}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Profile menu"
              aria-expanded={isProfileOpen}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                C7
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-800 dark:text-white">chaldev</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Admin</p>
              </div>
              <ChevronDown size={16} className="text-gray-500 hidden md:block" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                <Link
                  to="/settings"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <UserCircle size={16} />
                  Your Profile
                </Link>
                <Link
                  to="/settings"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <SettingsIcon size={16} />
                  Settings
                </Link>
                <hr className="my-2 border-gray-200 dark:border-gray-700" />
                <button
                  type="button"
                  onClick={() => {
                    setIsProfileOpen(false);
                    navigate('/login');
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
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
        <form onSubmit={handleSearchSubmit} className="md:hidden px-4 pb-4">
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2">
            <Search size={18} className="text-gray-400 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search..."
              className="w-full bg-transparent outline-none text-gray-700 dark:text-gray-300 placeholder:text-gray-500 dark:placeholder:text-gray-400"
            />
            <button
              type="submit"
              className="text-sm font-medium text-primary-600 dark:text-primary-400"
            >
              Go
            </button>
          </div>
        </form>
      )}
    </header>
  );
};

export default Navbar;
