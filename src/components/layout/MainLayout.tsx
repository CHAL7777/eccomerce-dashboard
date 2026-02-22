import React, { useState } from 'react';
import clsx from 'clsx';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer';

const MainLayout: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed((previous) => !previous);
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen((previous) => !previous);
  };

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex h-full overflow-hidden">
        {isMobileSidebarOpen && (
          <button
            type="button"
            aria-label="Close sidebar"
            className="fixed inset-0 z-40 bg-gray-900/50 lg:hidden"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
        )}

        <div
          className={clsx(
            'fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 lg:static lg:translate-x-0',
            isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
            isSidebarCollapsed ? 'lg:w-20' : 'lg:w-64'
          )}
        >
          <Sidebar
            collapsed={isSidebarCollapsed}
            onToggleCollapse={toggleSidebarCollapse}
            onCloseMobile={() => setIsMobileSidebarOpen(false)}
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <Navbar onToggleMobileSidebar={toggleMobileSidebar} />

          <main className="flex-1 overflow-y-auto p-4 sm:p-6">
            <div className="mx-auto max-w-7xl">
              <Outlet />
            </div>
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
