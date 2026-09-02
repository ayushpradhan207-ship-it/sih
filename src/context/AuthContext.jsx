import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const DEMO_USER = {
  isDemo: true,
  role: "student",
  studentId: "student-1042",
  anonymizedId: "VS-1042",
  name: "Aarav Sharma",
  email: "student@veriskill.demo",
  passportId: "VP-2026-IND-1042",
  ncrfCredits: 4.5,
  overallScore: 84,
  trustScore: 87,
  verifiedSkillsCount: 17
};

const GUEST_USER = {
  isDemo: false,
  isGuest: true,
  role: "student",
  studentId: "guest-user",
  anonymizedId: "VS-GUEST",
  name: "Guest Student",
  email: "",
  passportId: "VP-2026-IND-GUEST",
  ncrfCredits: 0,
  overallScore: 0,
  trustScore: 0,
  verifiedSkillsCount: 0,
  hasSyncedDigiLocker: false,
  skills: [],
  evidenceList: []
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('veriskill_session') || sessionStorage.getItem('veriskill_session');
      return saved ? JSON.parse(saved) : GUEST_USER;
    } catch {
      return GUEST_USER;
    }
  });

  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem('veriskill_auth_token') || sessionStorage.getItem('veriskill_auth_token') || '';
    } catch {
      return '';
    }
  });

  // MODE A: Start Demo Tour (Aarav Sharma)
  const startDemoTour = () => {
    const demoUser = { ...DEMO_USER };
    const demoToken = 'demo-jwt-student-tour-2026';
    setCurrentUser(demoUser);
    setToken(demoToken);
    localStorage.setItem('veriskill_session', JSON.stringify(demoUser));
    localStorage.setItem('veriskill_auth_token', demoToken);
    return demoUser;
  };

  // MODE B: Real User Login (e.g. Ashutosh Pradhan)
  const login = (userData, authToken, remember = true) => {
    const realUser = {
      isDemo: false,
      isGuest: false,
      role: userData.role || 'student',
      studentId: userData.studentId || `user-${Date.now()}`,
      anonymizedId: userData.anonymizedId || `VS-${Math.floor(1000 + Math.random() * 9000)}`,
      name: userData.name || userData.fullName || 'Ashutosh Pradhan',
      email: userData.email,
      passportId: userData.passportId || `VP-2026-IND-${Math.floor(1000 + Math.random() * 9000)}`,
      ncrfCredits: userData.ncrfCredits || 0,
      overallScore: userData.overallScore || 0,
      trustScore: userData.trustScore || 0,
      verifiedSkillsCount: userData.verifiedSkillsCount || 0,
      hasSyncedDigiLocker: userData.hasSyncedDigiLocker || false
    };

    const activeToken = authToken || `jwt-user-${Date.now()}`;
    setCurrentUser(realUser);
    setToken(activeToken);

    const storage = remember ? localStorage : sessionStorage;
    storage.setItem('veriskill_session', JSON.stringify(realUser));
    storage.setItem('veriskill_auth_token', activeToken);
    sessionStorage.setItem('veriskill_session', JSON.stringify(realUser));
    sessionStorage.setItem('veriskill_auth_token', activeToken);
    return realUser;
  };

  const logout = () => {
    setCurrentUser(GUEST_USER);
    setToken('');
    localStorage.removeItem('veriskill_session');
    localStorage.removeItem('veriskill_auth_token');
    sessionStorage.removeItem('veriskill_session');
    sessionStorage.removeItem('veriskill_auth_token');
  };

  const updateProfile = (updates) => {
    setCurrentUser(prev => {
      const base = prev || GUEST_USER;
      const updated = { ...base, ...updates };
      localStorage.setItem('veriskill_session', JSON.stringify(updated));
      sessionStorage.setItem('veriskill_session', JSON.stringify(updated));
      return updated;
    });
  };

  const isLoggedIn = !!(currentUser && token && !currentUser.isGuest);
  const isDemoMode = !!(currentUser && currentUser.isDemo);
  const isGuestMode = !currentUser || !!currentUser.isGuest;

  return (
    <AuthContext.Provider value={{
      currentUser,
      token,
      isLoggedIn,
      isDemoMode,
      isGuestMode,
      startDemoTour,
      login,
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
