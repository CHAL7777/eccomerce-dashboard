import React, { useState } from 'react';
import {
  Save,
  Upload,
  Bell,
  Shield,
  Globe,
  Palette,
  CreditCard,
  Users,
  Database,
  Key,
  Eye,
  EyeOff,
  Check
} from 'lucide-react';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { useDarkMode } from '../hooks/useDarkMode';

interface SettingSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
}

interface SettingsFormData {
  storeName: string;
  storeEmail: string;
  storeCurrency: string;
  storeTimezone: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    orders: boolean;
    inventory: boolean;
    marketing: boolean;
  };
  security: {
    twoFactor: boolean;
    sessionTimeout: number;
    passwordExpiry: number;
  };
  payment: {
    stripe: boolean;
    paypal: boolean;
    cbe: boolean;
    awash: boolean;
    manual: boolean;
    testMode: boolean;
  };
}

interface SaveStatus {
  tone: 'success' | 'error' | 'info';
  message: string;
}

const Settings: React.FC = () => {
  const { theme, setThemeMode } = useDarkMode();
  const [activeSection, setActiveSection] = useState('general');
  const [formData, setFormData] = useState<SettingsFormData>({
    storeName: 'StoreDash',
    storeEmail: 'support@storedash.com',
    storeCurrency: 'ETB',
    storeTimezone: 'America/New_York',
    notifications: {
      email: true,
      push: true,
      sms: false,
      orders: true,
      inventory: true,
      marketing: false
    },
    security: {
      twoFactor: false,
      sessionTimeout: 30,
      passwordExpiry: 90
    },
    payment: {
      stripe: true,
      paypal: true,
      cbe: false,
      awash: false,
      manual: false,
      testMode: false
    }
  });
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saveStatus, setSaveStatus] = useState<SaveStatus | null>(null);

  const sections: SettingSection[] = [
    {
      id: 'general',
      title: 'General',
      icon: <Globe size={20} />,
      description: 'Store information and preferences'
    },
    {
      id: 'appearance',
      title: 'Appearance',
      icon: <Palette size={20} />,
      description: 'Theme and display settings'
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: <Bell size={20} />,
      description: 'Email and alert preferences'
    },
    {
      id: 'security',
      title: 'Security',
      icon: <Shield size={20} />,
      description: 'Password and privacy settings'
    },
    {
      id: 'payments',
      title: 'Payments',
      icon: <CreditCard size={20} />,
      description: 'Payment gateway configuration'
    },
    {
      id: 'users',
      title: 'Users',
      icon: <Users size={20} />,
      description: 'Team member management'
    },
    {
      id: 'advanced',
      title: 'Advanced',
      icon: <Database size={20} />,
      description: 'API and integration settings'
    }
  ];

  const currencies = ['ETB', 'USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'];
  const timezones = [
    'America/New_York',
    'America/Chicago',
    'America/Denver',
    'America/Los_Angeles',
    'Europe/London',
    'Europe/Paris',
    'Asia/Tokyo',
    'Australia/Sydney'
  ];

  const updateRootField = <
    Key extends 'storeName' | 'storeEmail' | 'storeCurrency' | 'storeTimezone'
  >(
    key: Key,
    value: SettingsFormData[Key]
  ) => {
    setFormData((previous) => ({
      ...previous,
      [key]: value
    }));
  };

  const updateNestedField = <
    Section extends 'notifications' | 'security' | 'payment',
    Key extends keyof SettingsFormData[Section]
  >(
    section: Section,
    key: Key,
    value: SettingsFormData[Section][Key]
  ) => {
    setFormData((previous) => ({
      ...previous,
      [section]: {
        ...previous[section],
        [key]: value
      }
    }));
  };

  const handleSave = () => {
    setSaveStatus({
      tone: 'success',
      message: 'Settings saved successfully.'
    });
  };

  const handleExportData = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      settings: formData
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: 'application/json'
    });
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'storedash-settings.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(downloadUrl);

    setSaveStatus({
      tone: 'info',
      message: 'Settings exported as storedash-settings.json.'
    });
  };

  const handlePasswordChange = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setSaveStatus({
        tone: 'error',
        message: 'Please fill in all password fields.'
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      setSaveStatus({
        tone: 'error',
        message: 'New password and confirmation do not match.'
      });
      return;
    }

    if (newPassword.length < 8) {
      setSaveStatus({
        tone: 'error',
        message: 'Password must be at least 8 characters long.'
      });
      return;
    }

    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setSaveStatus({
      tone: 'success',
      message: 'Password changed successfully.'
    });
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Store Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Store Name
            </label>
            <input
              type="text"
              value={formData.storeName}
              onChange={(e) => updateRootField('storeName', e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Store Email
            </label>
            <input
              type="email"
              value={formData.storeEmail}
              onChange={(e) => updateRootField('storeEmail', e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Default Currency
            </label>
            <select
              value={formData.storeCurrency}
              onChange={(e) => updateRootField('storeCurrency', e.target.value)}
              className="input-field"
            >
              {currencies.map(currency => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Timezone
            </label>
            <select
              value={formData.storeTimezone}
              onChange={(e) => updateRootField('storeTimezone', e.target.value)}
              className="input-field"
            >
              {timezones.map(tz => (
                <option key={tz} value={tz}>{tz}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Store Logo
        </h3>
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
            <div className="text-2xl font-bold text-primary-600">SD</div>
          </div>
          <div className="space-y-2">
            <Button variant="outline" icon={Upload}>
              Upload New Logo
            </Button>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Recommended: 200x200px PNG or JPG
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Theme Settings
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setThemeMode('light')}
            className={`p-6 rounded-lg border-2 transition-all ${
              theme === 'light'
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <Palette className="text-gray-600 dark:text-gray-400" size={24} />
              {theme === 'light' && <Check className="text-green-500" size={20} />}
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white">Light Mode</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Clean, bright interface
            </p>
          </button>

          <button
            onClick={() => setThemeMode('dark')}
            className={`p-6 rounded-lg border-2 transition-all ${
              theme === 'dark'
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <Palette className="text-gray-600 dark:text-gray-400" size={24} />
              {theme === 'dark' && <Check className="text-green-500" size={20} />}
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white">Dark Mode</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Easy on the eyes
            </p>
          </button>

          <button
            onClick={() => setThemeMode('system')}
            className={`p-6 rounded-lg border-2 transition-all ${
              theme === 'system'
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <Palette className="text-gray-600 dark:text-gray-400" size={24} />
              {theme === 'system' && <Check className="text-green-500" size={20} />}
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white">System</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Follows device settings
            </p>
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Dashboard Preferences
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                Compact View
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Show more data in less space
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                Show Analytics Charts
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Display charts on dashboard
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Notification Channels
        </h3>
        <div className="space-y-4">
          {(Object.entries(formData.notifications) as Array<
            [keyof SettingsFormData['notifications'], boolean]
          >).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white capitalize">
                  {key.replace(/([A-Z])/g, ' $1')}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Receive {key} notifications
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => updateNestedField('notifications', key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Notification Frequency
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Real-time</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Immediate notifications for all activity
            </p>
          </div>
          <div className="p-4 border border-primary-500 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Daily Digest</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Summary email once per day
            </p>
          </div>
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Weekly Report</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Weekly summary every Monday
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Change Password
        </h3>
        <div className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="input-field pr-10"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="input-field"
              placeholder="Enter new password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input-field"
              placeholder="Confirm new password"
            />
          </div>
          <Button variant="primary" onClick={handlePasswordChange}>
            Change Password
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Security Features
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div>
              <div className="flex items-center gap-2">
                <Key size={20} className="text-gray-400" />
                <h4 className="font-medium text-gray-900 dark:text-white">
                  Two-Factor Authentication
                </h4>
                <Badge variant="primary">Recommended</Badge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Add an extra layer of security to your account
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.security.twoFactor}
                onChange={(e) => updateNestedField('security', 'twoFactor', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
            </label>
          </div>

          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              Session Timeout
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Automatically log out after inactivity
            </p>
            <select
              value={formData.security.sessionTimeout}
              onChange={(e) => updateNestedField('security', 'sessionTimeout', parseInt(e.target.value, 10))}
              className="input-field"
            >
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={60}>1 hour</option>
              <option value={120}>2 hours</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'general':
        return renderGeneralSettings();
      case 'appearance':
        return renderAppearanceSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'security':
        return renderSecuritySettings();
      case 'payments':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Payment Gateways
              </h3>
              <div className="space-y-4">
                {(Object.entries(formData.payment) as Array<
                  [keyof SettingsFormData['payment'], boolean]
                >).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white capitalize">
                        {key === 'testMode' ? 'Test Mode' : key}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {key === 'testMode' 
                          ? 'Use test payment processing' 
                          : `Enable ${key} payments`}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => updateNestedField('payment', key, e.target.checked)}
                        className="sr-only peer"
                        disabled={key === 'testMode' && !formData.payment.stripe && !formData.payment.paypal && !formData.payment.cbe && !formData.payment.awash}
                      />
                      <div className={`w-11 h-6 ${
                        key === 'testMode' && !formData.payment.stripe && !formData.payment.paypal
                          ? 'bg-gray-100 dark:bg-gray-800 cursor-not-allowed'
                          : 'bg-gray-200 dark:bg-gray-700'
                      } peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600`}></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              {sections.find(s => s.id === activeSection)?.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {sections.find(s => s.id === activeSection)?.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Configuration options for {sections.find(s => s.id === activeSection)?.title?.toLowerCase()} will appear here.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Sidebar */}
      <div className="lg:w-64 flex-shrink-0">
        <div className="card p-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Settings
          </h2>
          <div className="space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  activeSection === section.id
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
              >
                {section.icon}
                <div className="text-left">
                  <p className="font-medium">{section.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {section.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="card p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {sections.find(s => s.id === activeSection)?.title} Settings
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {sections.find(s => s.id === activeSection)?.description}
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleExportData}>
                Export Data
              </Button>
              <Button variant="primary" icon={Save} onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </div>

          {saveStatus && (
            <div
              className={`mb-6 rounded-lg border px-4 py-3 text-sm ${
                saveStatus.tone === 'success'
                  ? 'border-green-200 bg-green-50 text-green-800 dark:border-green-900/40 dark:bg-green-900/20 dark:text-green-300'
                  : saveStatus.tone === 'error'
                  ? 'border-red-200 bg-red-50 text-red-800 dark:border-red-900/40 dark:bg-red-900/20 dark:text-red-300'
                  : 'border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-900/40 dark:bg-blue-900/20 dark:text-blue-300'
              }`}
            >
              {saveStatus.message}
            </div>
          )}

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
