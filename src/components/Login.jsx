import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
  const { t } = useLanguage();
  const { login, startDemoTour } = useAuth();

  const [isSignup, setIsSignup] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = isSignup ? '/api/auth/signup' : '/api/auth/login';
      const payload = isSignup ? { fullName, email, password, role } : { email, password };
      
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Authentication failed');

      login(data.user, data.token, true);
      window.location.hash = '#/student/dashboard';
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    startDemoTour();
    window.location.hash = '#/student/dashboard';
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-3xl shadow-xl border border-surface-variant/40 p-8">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-primary-container text-on-primary flex items-center justify-center mx-auto mb-2">
            <span className="material-symbols-outlined text-2xl">lock</span>
          </div>
          <h2 className="text-xl font-bold text-primary">{isSignup ? t('navbar.signup') : t('navbar.login')}</h2>
          <p className="text-xs text-on-surface-variant mt-1">Verifiable Skill Passport Engine</p>
        </div>

        {error && (
          <div className="p-3 mb-4 rounded-xl bg-error-container/40 text-error text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <div>
              <label className="block text-xs font-semibold text-on-surface-variant mb-1">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ashutosh Pradhan"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-outline-variant text-xs focus:outline-none focus:border-secondary"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-on-surface-variant mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ashutosh@soa.ac.in"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-outline-variant text-xs focus:outline-none focus:border-secondary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface-variant mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-outline-variant text-xs focus:outline-none focus:border-secondary"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-primary-container hover:bg-primary text-on-primary text-xs font-bold shadow-md cursor-pointer transition-all"
          >
            {loading ? 'Processing...' : (isSignup ? t('navbar.signup') : t('navbar.login'))}
          </button>
        </form>

        <div className="mt-4 pt-4 border-t border-surface-variant/40 space-y-2">
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full py-2.5 rounded-full bg-secondary-fixed/40 hover:bg-secondary-fixed/60 text-secondary text-xs font-bold border border-secondary-fixed transition-all cursor-pointer"
          >
            Launch Demo Tour Mode (Aarav Sharma)
          </button>

          <p className="text-center text-xs text-on-surface-variant">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              type="button"
              onClick={() => setIsSignup(!isSignup)}
              className="font-bold text-secondary hover:underline cursor-pointer"
            >
              {isSignup ? t('navbar.login') : t('navbar.signup')}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
