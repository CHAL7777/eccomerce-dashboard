import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShoppingCart,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import Button from '../components/common/Button';
import { useDarkMode } from '../hooks/useDarkMode';

interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface ValidationError {
  field: string;
  message: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();
  const [formData, setFormData] = useState<LoginForm>({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: ValidationError[] = [];

    // Email validation
    if (!formData.email) {
      newErrors.push({ field: 'email', message: 'Email is required' });
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.push({ field: 'email', message: 'Email is invalid' });
    }

    // Password validation
    if (!formData.password) {
      newErrors.push({ field: 'password', message: 'Password is required' });
    } else if (formData.password.length < 6) {
      newErrors.push({ field: 'password', message: 'Password must be at least 6 characters' });
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors([]);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Mock successful login
      if (formData.email === 'admin@storedash.com' && formData.password === 'password123') {
        setShowSuccess(true);
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        setErrors([{ field: 'general', message: 'Invalid email or password' }]);
      }
    }, 1500);
  };

  const handleInputChange = (field: keyof LoginForm, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear field-specific errors when user starts typing
    if (typeof value === 'string') {
      setErrors(errors.filter(error => error.field !== field));
    }
  };

  const getFieldError = (field: string): string | undefined => {
    return errors.find(error => error.field === field)?.message;
  };

  const demoCredentials = [
    { email: 'admin@storedash.com', password: 'password123', role: 'Admin' },
    { email: 'manager@storedash.com', password: 'password123', role: 'Manager' },
    { email: 'staff@storedash.com', password: 'password123', role: 'Staff' }
  ];

  const handleDemoLogin = (email: string, password: string) => {
    setFormData({ email, password, rememberMe: false });
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-50 dark:bg-slate-950">
      {/* Brand panel */}
      <aside className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-slate-950 p-12 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_20%_10%,rgba(99,102,241,0.45),transparent),radial-gradient(60%_50%_at_90%_90%,rgba(139,92,246,0.35),transparent)]" />
        <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:48px_48px]" />

        <div className="relative flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary-500 to-violet-500 shadow-glow flex items-center justify-center">
            <ShoppingCart size={20} strokeWidth={2.25} />
          </div>
          <div className="leading-tight">
            <p className="text-lg font-bold tracking-tight">StoreDash</p>
            <p className="text-[11px] uppercase tracking-[0.14em] text-white/60">Commerce OS</p>
          </div>
        </div>

        <div className="relative max-w-md">
          <h2 className="text-4xl font-bold tracking-tight leading-[1.1]">
            Run your entire store from one beautiful dashboard.
          </h2>
          <p className="mt-4 text-white/70 leading-relaxed">
            Real-time revenue, inventory, orders and customers — designed for teams who move fast.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-4">
            {[
              { label: 'Revenue tracked', value: '$4.2M' },
              { label: 'Orders / month', value: '18k+' },
              { label: 'Uptime', value: '99.9%' },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-4">
                <p className="text-xl font-bold tabular-nums">{item.value}</p>
                <p className="text-xs text-white/60 mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-xs text-white/50">© {new Date().getFullYear()} StoreDash · v2.0.0</p>
      </aside>

      {/* Form panel */}
      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md animate-fade-up">
          {/* Mobile brand */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary-500 to-violet-500 shadow-glow flex items-center justify-center">
              <ShoppingCart className="text-white" size={20} strokeWidth={2.25} />
            </div>
            <p className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">StoreDash</p>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Welcome back</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1.5">Sign in to continue to your dashboard.</p>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="mb-6 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-500/20 dark:bg-emerald-500/10 animate-fade-in">
              <CheckCircle className="text-emerald-500 shrink-0 mt-0.5" size={18} />
              <div>
                <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">Login successful</p>
                <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-0.5">Redirecting to dashboard…</p>
              </div>
            </div>
          )}

          {/* Error Messages */}
          {errors.some(error => error.field === 'general') && (
            <div className="mb-6 flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 dark:border-rose-500/20 dark:bg-rose-500/10 animate-fade-in">
              <XCircle className="text-rose-500 shrink-0 mt-0.5" size={18} />
              <div>
                <p className="text-sm font-semibold text-rose-800 dark:text-rose-300">
                  {errors.find(error => error.field === 'general')?.message}
                </p>
                <p className="text-xs text-rose-700 dark:text-rose-400 mt-0.5">Please check your credentials and try again.</p>
              </div>
            </div>
          )}

          {/* Demo Credentials */}
          <div className="mb-6">
            <div className="flex items-center gap-1.5 mb-2.5">
              <AlertCircle size={14} className="text-slate-400" />
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Demo accounts</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {demoCredentials.map((cred) => (
                <button
                  key={cred.email}
                  type="button"
                  onClick={() => handleDemoLogin(cred.email, cred.password)}
                  className={`rounded-xl border px-3 py-2.5 text-left text-sm transition-all ${
                    formData.email === cred.email
                      ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-500/10 dark:text-primary-300 shadow-glow'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <p className="font-semibold">{cred.role}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{cred.email.split('@')[0]}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-slate-50 dark:bg-slate-950 text-slate-400">or sign in with email</span>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`input-field pl-10 h-11 ${
                    getFieldError('email') ? 'border-rose-300 dark:border-rose-500/50 focus:ring-rose-500/30 focus:border-rose-500' : ''
                  }`}
                  placeholder="you@example.com"
                  disabled={isLoading}
                  autoComplete="email"
                />
              </div>
              {getFieldError('email') && (
                <p className="mt-1.5 text-xs text-rose-600 dark:text-rose-400">{getFieldError('email')}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                <a
                  href="mailto:support@storedash.com?subject=Password%20Reset%20Request"
                  className="text-xs font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`input-field pl-10 pr-11 h-11 ${
                    getFieldError('password') ? 'border-rose-300 dark:border-rose-500/50 focus:ring-rose-500/30 focus:border-rose-500' : ''
                  }`}
                  placeholder="••••••••"
                  disabled={isLoading}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:text-slate-200 dark:hover:bg-slate-800 transition-colors"
                  disabled={isLoading}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {getFieldError('password') && (
                <p className="mt-1.5 text-xs text-rose-600 dark:text-rose-400">{getFieldError('password')}</p>
              )}
            </div>

            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={formData.rememberMe}
                onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 dark:border-slate-700 dark:bg-slate-900 text-primary-600 focus:ring-primary-500"
                disabled={isLoading}
              />
              <span className="text-sm text-slate-600 dark:text-slate-300">Keep me signed in for 30 days</span>
            </label>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? 'Signing in…' : 'Sign in'}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Don't have an account?{' '}
              <a
                href="mailto:support@storedash.com?subject=StoreDash%20Access%20Request"
                className="font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400"
              >
                Request access
              </a>
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-4 leading-relaxed">
              By signing in, you agree to our{' '}
              <Link to="/settings" className="underline underline-offset-2 hover:text-slate-600 dark:hover:text-slate-300">Terms of Service</Link>{' '}
              and{' '}
              <Link to="/settings" className="underline underline-offset-2 hover:text-slate-600 dark:hover:text-slate-300">Privacy Policy</Link>.
            </p>
            <p className="text-[11px] text-slate-400 dark:text-slate-600 mt-4 lg:hidden">
              StoreDash v2.0.0 · {isDarkMode ? 'Dark' : 'Light'} mode
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
