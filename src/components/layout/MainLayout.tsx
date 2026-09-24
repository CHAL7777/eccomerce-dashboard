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
    <div className="h-screen bg-slate-50 dark:bg-slate-950">
      <div className="flex h-full overflow-hidden">
        {isMobileSidebarOpen && (
          <button
            type="button"
            aria-label="Close sidebar"
            className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden animate-fade-in"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
        )}

        <div
          className={clsx(
            'fixed inset-y-0 left-0 z-50 w-64 transform transition-all duration-300 ease-out lg:static lg:translate-x-0 shadow-2xl lg:shadow-none',
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

          <main className="relative flex-1 overflow-y-auto">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(99,102,241,0.10),transparent)] dark:bg-[radial-gradient(60%_50%_at_50%_0%,rgba(99,102,241,0.14),transparent)]"
            />
            <div className="relative mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
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
