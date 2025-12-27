import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Bell, Shield } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const SettingsView: React.FC = () => {
  const [notifications, setNotifications] = useState(true);

  return (
    <div className='flex-1 overflow-auto relative z-10 bg-transparent'>
      <header className='bg-gray-800 bg-opacity-50 backdrop-blur-md border-b border-gray-700 p-4'>
        <h1 className='text-2xl font-semibold text-gray-100'>Settings</h1>
      </header>

      <main className='max-w-4xl mx-auto py-6 px-4 lg:px-8 space-y-6'>
        {/* Profile Section */}
        <SettingSection icon={User} title="Profile">
          <div className="flex items-center mb-4">
            <img src="https://ui-avatars.com/api/?name=Admin+User" alt="Profile" className="h-16 w-16 rounded-full mr-4" />
            <div>
              <h3 className="text-lg font-medium">Admin User</h3>
              <p className="text-gray-400">admin@dashboard.com</p>
            </div>
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition">
            Edit Profile
          </button>
        </SettingSection>

        {/* Notifications Toggle */}
        <SettingSection icon={Bell} title="Notifications">
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Push Notifications</span>
            <button 
              onClick={() => setNotifications(!notifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications ? 'bg-indigo-600' : 'bg-gray-600'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
        </SettingSection>

        {/* Security Section */}
        <SettingSection icon={Shield} title="Security">
          <p className="text-gray-400 mb-4">Two-factor authentication is currently disabled.</p>
          <button className="text-indigo-400 font-medium hover:underline">Enable 2FA</button>
        </SettingSection>
      </main>
    </div>
  );
};

// Reusable Section Wrapper for Settings
const SettingSection = ({ icon: Icon, title, children }: { icon: LucideIcon, title: string, children: React.ReactNode }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }} 
    animate={{ opacity: 1, x: 0 }}
    className="bg-gray-800 bg-opacity-50 backdrop-blur-lg border border-gray-700 p-6 rounded-xl"
  >
    <div className="flex items-center mb-4 text-indigo-400">
      <Icon size={24} className="mr-2" />
      <h2 className="text-xl font-semibold text-gray-100">{title}</h2>
    </div>
    {children}
  </motion.div>
);

export default SettingsView;