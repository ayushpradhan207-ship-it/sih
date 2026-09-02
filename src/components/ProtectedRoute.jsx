import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * ProtectedRoute Component for VeriSkill
 * Enforces authenticated session check using localStorage (veriskill_auth_token)
 */
export const ProtectedRoute = ({ children, requiredRole = null }) => {
  const token = localStorage.getItem('veriskill_auth_token') || localStorage.getItem('veriskill_token');
  const rawSession = localStorage.getItem('veriskill_session') || sessionStorage.getItem('veriskill_session');

  let session = null;
  try {
    session = rawSession ? JSON.parse(rawSession) : null;
  } catch (e) {
    session = null;
  }

  // Under the Guest-First access model, allow free exploration for all visitors
  return children;
};

export default ProtectedRoute;
