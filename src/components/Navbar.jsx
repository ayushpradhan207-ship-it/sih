import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

export const Navbar = ({ currentRoute = '/student/dashboard' }) => {
  const { currentLanguage, setLanguage, t } = useLanguage();
  const { currentUser, isLoggedIn, logout } = useAuth();

  const userAvatar = currentUser?.avatar || null;
  const userInitials = currentUser?.name
    ? currentUser.name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
    : 'AP';

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/85 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border-b border-surface-variant/30">
      <div className="flex justify-between items-center px-4 md:px-8 h-16 max-w-7xl mx-auto">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <a href="#/" className="flex items-center gap-2 cursor-pointer active:scale-95 duration-200 transition-transform">
            <div className="w-8 h-8 rounded-lg bg-primary-container text-on-primary flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>grid_view</span>
            </div>
            <span className="font-headline-md text-lg font-bold text-primary tracking-tight">VeriSkill</span>
          </a>
        </div>

        {/* Navigation Cluster */}
        <nav className="hidden md:flex items-center gap-1">
          <a href="#/student/dashboard" className={`px-3.5 py-1.5 rounded-full font-label-md text-xs font-medium transition-all ${currentRoute.includes('dashboard') ? 'text-secondary font-bold bg-secondary-fixed/40' : 'text-on-surface-variant hover:bg-surface-container hover:text-primary'}`}>
            {t('navbar.dashboard')}
          </a>
          <a href="#/student/passport" className={`px-3.5 py-1.5 rounded-full font-label-md text-xs font-medium transition-all ${currentRoute.includes('passport') ? 'text-secondary font-bold bg-secondary-fixed/40' : 'text-on-surface-variant hover:bg-surface-container hover:text-primary'}`}>
            {t('navbar.passport')}
          </a>
          <a href="#/student/opportunities" className={`px-3.5 py-1.5 rounded-full font-label-md text-xs font-medium transition-all ${currentRoute.includes('opportunities') ? 'text-secondary font-bold bg-secondary-fixed/40' : 'text-on-surface-variant hover:bg-surface-container hover:text-primary'}`}>
            {t('navbar.match')}
          </a>
          <a href="#/student/evidence" className={`px-3.5 py-1.5 rounded-full font-label-md text-xs font-medium transition-all ${currentRoute.includes('evidence') ? 'text-secondary font-bold bg-secondary-fixed/40' : 'text-on-surface-variant hover:bg-surface-container hover:text-primary'}`}>
            {t('navbar.evidence')}
          </a>
          <a href="#/teams" className={`px-3.5 py-1.5 rounded-full font-label-md text-xs font-medium transition-all ${currentRoute.includes('teams') ? 'text-secondary font-bold bg-secondary-fixed/40' : 'text-on-surface-variant hover:bg-surface-container hover:text-primary'}`}>
            {t('navbar.teams')}
          </a>
          <a href="#/admin/fairness" className={`px-3.5 py-1.5 rounded-full font-label-md text-xs font-medium transition-all ${currentRoute.includes('admin') ? 'text-secondary font-bold bg-secondary-fixed/40' : 'text-on-surface-variant hover:bg-surface-container hover:text-primary'}`}>
            {t('navbar.audit')}
          </a>
        </nav>

        {/* Right Cluster */}
        <div className="flex items-center gap-2.5">
          {/* Bhashini AI Language Selector */}
          <div className="relative flex items-center">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-low border border-outline-variant/40 hover:border-secondary transition-all">
              <span className="material-symbols-outlined text-secondary text-[15px]">translate</span>
              <select
                value={currentLanguage}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent text-primary text-xs font-label-md focus:outline-none cursor-pointer pr-1"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी (Hindi)</option>
                <option value="or">ଓଡ଼ିଆ (Odia)</option>
                <option value="ta">தமிழ் (Tamil)</option>
              </select>
              <span className="hidden md:inline-flex items-center text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200 uppercase tracking-tighter" title="Powered by Bhashini AI Engine">
                Bhashini AI
              </span>
            </div>
          </div>

          {/* Public Verification Link */}
          <a href="#/verify/VP-2026-IND-1042" className="hidden lg:inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-tertiary-fixed/20 text-on-tertiary-fixed-variant border border-tertiary-fixed text-xs font-label-sm hover:bg-tertiary-fixed/30 transition-colors">
            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            <span>{t('navbar.verify')}</span>
          </a>

          {/* User Auth Avatar / Actions */}
          {isLoggedIn ? (
            <div className="relative group flex items-center">
              <button type="button" className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-outline-variant/50 bg-surface-container hover:bg-surface-container-high transition-all cursor-pointer">
                <div className="w-6 h-6 rounded-full bg-primary-container text-on-primary flex items-center justify-center text-[11px] font-bold overflow-hidden">
                  {userAvatar ? (
                    <img src={userAvatar} className="w-full h-full object-cover" alt="Avatar" />
                  ) : (
                    userInitials
                  )}
                </div>
                <span className="hidden sm:inline font-label-md text-xs text-primary font-medium max-w-[90px] truncate">
                  {(currentUser?.name || 'User').split(' ')[0]}
                </span>
                <span className="material-symbols-outlined text-[16px] text-on-surface-variant">expand_more</span>
              </button>

              {/* Dropdown */}
              <div className="absolute right-0 top-full mt-1.5 w-52 bg-surface-container-lowest rounded-2xl shadow-xl border border-surface-variant/40 p-2 hidden group-hover:block z-50">
                <div className="px-3 py-2 border-b border-surface-variant/40 mb-1">
                  <p className="font-label-md text-xs font-bold text-primary truncate">{currentUser?.name || 'User'}</p>
                  <p className="font-body-md text-[11px] text-on-surface-variant truncate">{currentUser?.email || ''}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-secondary-fixed/50 text-secondary text-[10px] font-label-md capitalize">
                    {currentUser?.role || 'student'}
                  </span>
                </div>
                <a href="#/student/dashboard" className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-label-md text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[16px]">dashboard</span> {t('navbar.dashboard')}
                </a>
                <a href="#/student/passport" className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-label-md text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[16px]">contact_page</span> {t('navbar.passport')}
                </a>
                <button type="button" onClick={logout} className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-label-md text-error hover:bg-error-container/30 transition-colors cursor-pointer text-left">
                  <span className="material-symbols-outlined text-[16px]">logout</span> {t('navbar.logout')}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <a href="#/auth" className="px-3 py-1.5 rounded-full font-label-md text-xs text-on-surface-variant hover:bg-surface-container hover:text-primary transition-all">
                {t('navbar.login')}
              </a>
              <a href="#/auth" className="px-3.5 py-1.5 rounded-full font-label-md text-xs bg-primary-container text-on-primary hover:bg-primary transition-all shadow-sm">
                {t('navbar.signup')}
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
