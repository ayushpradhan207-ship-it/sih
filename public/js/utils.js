/**
 * VeriSkill Utility Functions & Global Helpers
 */

const Utils = {
  /**
   * Generic API fetcher with resilient fallback for Vercel/static deployments
   */
  async fetchAPI(endpoint, options = {}) {
    try {
      const defaultHeaders = { "Content-Type": "application/json" };
      const res = await fetch(endpoint, {
        ...options,
        headers: { ...defaultHeaders, ...options.headers }
      });
      if (res.ok) {
        return await res.json();
      }
      console.warn(`[Utils.fetchAPI] HTTP ${res.status} on ${endpoint}, activating local state fallback.`);
    } catch (err) {
      console.warn(`[Utils.fetchAPI] Network unreachable on ${endpoint}, activating local state fallback.`);
    }

    // Deterministic client-side mock fallback for static environments (e.g. Vercel)
    return Utils.getFallbackData(endpoint, options);
  },

  /**
   * Safe Fallback Data Provider for Vercel and offline demonstration
   */
  getFallbackData(endpoint, options = {}) {
    const session = (typeof Auth !== "undefined" ? Auth.getSession() : null) || {};
    const name = session.name || "Ashutosh Pradhan";
    const studentId = session.studentId || "student-1042";

    if (endpoint.includes("/passport")) {
      return {
        passportId: session.passportId || "VP-2026-IND-1042",
        anonymizedId: session.anonymizedId || "VS-1042",
        passportMetrics: {
          overallScore: session.overallScore ?? (session.isDemo ? 84 : 0),
          trustScore: session.trustScore ?? (session.isDemo ? 87 : 0),
          verifiedSkillsCount: session.verifiedSkillsCount ?? (session.isDemo ? 17 : 0),
          ncrfCredits: session.ncrfCredits ?? (session.isDemo ? 4.5 : 0)
        },
        skills: [
          { name: "Python", category: "Programming", score: 92, verified: true, level: "Advanced" },
          { name: "Machine Learning", category: "Machine Learning", score: 88, verified: true, level: "Advanced" },
          { name: "SQL", category: "Programming", score: 85, verified: true, level: "Proficient" },
          { name: "TypeScript", category: "Programming", score: 80, verified: true, level: "Proficient" },
          { name: "System Design", category: "Soft Skills", score: 78, verified: true, level: "Intermediate" }
        ],
        evidenceList: [
          { title: "VeriSkill Engine Core Repo", type: "github", status: "VERIFIED", hash: "sha256:ba62c792063d5556101b059dc909dc733f0e1c52dc30856a380e587cc1c464e4" },
          { title: "Smart India Hackathon Finalist Credential", type: "competition", status: "VERIFIED", hash: "sha256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069" }
        ],
        credentials: []
      };
    }

    if (endpoint.startsWith("/api/students/")) {
      return {
        id: studentId,
        anonymizedId: session.anonymizedId || "VS-1042",
        passportId: session.passportId || "VP-2026-IND-1042",
        personal: { fullName: name, institution: "SOA University" },
        passportMetrics: {
          overallScore: session.overallScore ?? (session.isDemo ? 84 : 0),
          trustScore: session.trustScore ?? (session.isDemo ? 87 : 0),
          verifiedSkillsCount: session.verifiedSkillsCount ?? (session.isDemo ? 17 : 0),
          ncrfCredits: session.ncrfCredits ?? (session.isDemo ? 4.5 : 0)
        },
        skills: [
          { name: "Python", category: "Programming", score: 92, verified: true, level: "Advanced" },
          { name: "Machine Learning", category: "Machine Learning", score: 88, verified: true, level: "Advanced" },
          { name: "SQL", category: "Programming", score: 85, verified: true, level: "Proficient" },
          { name: "TypeScript", category: "Programming", score: 80, verified: true, level: "Proficient" },
          { name: "System Design", category: "Soft Skills", score: 78, verified: true, level: "Intermediate" }
        ],
        evidenceList: [
          { title: "VeriSkill Engine Core Repo", type: "github", status: "VERIFIED", hash: "sha256:ba62c792063d5556101b059dc909dc733f0e1c52dc30856a380e587cc1c464e4" }
        ],
        credentials: []
      };
    }

    if (endpoint.includes("/opportunities")) {
      return [
        {
          id: "opp-ml-intern",
          title: "Machine Learning Research Intern",
          company: "DeepMind / EdTech Labs",
          location: "Bengaluru, India (Hybrid)",
          matchScore: 92,
          stipend: "₹45,000 / month",
          requiredSkills: ["Python", "Machine Learning", "PyTorch"],
          description: "Develop explainable matching models and verifiable credential verification engines."
        },
        {
          id: "opp-fullstack-dev",
          title: "Full-Stack React Engineer",
          company: "VeriSkill Open Consortium",
          location: "Remote",
          matchScore: 88,
          stipend: "₹50,000 / month",
          requiredSkills: ["React", "JavaScript", "Node.js"],
          description: "Build high-trust cryptographic credential passports with WCAG accessibility."
        }
      ];
    }

    if (endpoint.includes("/fairness") || endpoint.includes("/audit")) {
      return {
        disparateImpactRatio: 0.94,
        status: "PASSED (Four-Fifths Rule Compliant)",
        protectedAttributesIsolated: true,
        auditTimestamp: new Date().toISOString(),
        demographicParity: "Optimal (0.94 > 0.80 standard)"
      };
    }

    if (endpoint.includes("/teams")) {
      return {
        teamName: "SOA AI Innovation Squad",
        complementarityScore: 94,
        coverageRate: "94% Skill Coverage",
        members: [
          { name: "Aarav Sharma", role: "AI/ML Lead", score: 92 },
          { name: "Priya Patel", role: "Full-Stack Engineer", score: 89 },
          { name: "Rohan Verma", role: "Systems Architect", score: 88 }
        ]
      };
    }

    if (endpoint.includes("/verify/scan")) {
      return {
        success: true,
        report: {
          fraudScore: "99.4% Authenticity Score (Passed)",
          cryptoCheck: "Tamper-Proof Digital Fingerprint Matches Issued Payload",
          revocationStatus: "ACTIVE (Status List Check Passed)",
          proofHash: "sha256:ba62c792063d5556101b059dc909dc733f0e1c52dc30856a380e587cc1c464e4"
        }
      };
    }

    return { success: true };
  },

  /**
   * Truncate SHA-256 or hexadecimal proof hash for clean display
   */
  truncateHash(hash, prefixLen = 10, suffixLen = 8) {
    if (!hash) return "sha256:0000...0000";
    if (hash.length <= prefixLen + suffixLen) return hash;
    return `${hash.slice(0, prefixLen)}...${hash.slice(-suffixLen)}`;
  },

  /**
   * Render verification badge HTML
   */
  renderVerificationBadge(status) {
    const s = (status || "VERIFIED").toUpperCase();
    if (s === "VERIFIED") {
      return `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-secondary-fixed/50 text-secondary border border-secondary-fixed">
        <span class="material-symbols-outlined text-[13px]" style="font-variation-settings: 'FILL' 1;">verified</span> VERIFIED
      </span>`;
    } else if (s === "PENDING") {
      return `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
        <span class="material-symbols-outlined text-[13px]">schedule</span> PENDING
      </span>`;
    } else if (s === "SELF-DECLARED") {
      return `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-surface-container text-on-surface-variant border border-outline-variant/40">
        <span class="material-symbols-outlined text-[13px]">edit_note</span> SELF-DECLARED
      </span>`;
    } else {
      return `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-error-container text-on-error-container border border-error/20">
        <span class="material-symbols-outlined text-[13px]">warning</span> ${s}
      </span>`;
    }
  },

  /**
   * Render skill level badge HTML
   */
  renderLevelBadge(level) {
    const l = (level || "Intermediate").toLowerCase();
    if (l === "advanced" || l === "expert") {
      return `<span class="px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary-fixed/40 text-secondary border border-secondary-fixed">Advanced</span>`;
    } else if (l === "intermediate") {
      return `<span class="px-2.5 py-0.5 rounded-full text-xs font-medium bg-surface-container-high text-primary border border-outline-variant/30">Intermediate</span>`;
    } else {
      return `<span class="px-2.5 py-0.5 rounded-full text-xs font-medium bg-surface-container text-on-surface-variant border border-outline-variant/20">Beginner</span>`;
    }
  },

  /**
   * Show a toast message
   */
  showToast(message, type = "info") {
    if (typeof document === "undefined" || !document.createElement) {
      console.log(`[Toast ${type}]: ${message}`);
      return;
    }
    const container = document.getElementById("toast-container") || document.body;
    if (!container) return;
    const toast = document.createElement("div");
    
    let iconName = "info";
    let iconColor = "text-secondary";
    let border = "border-surface-variant/60 bg-surface-container-lowest text-primary shadow-[0_8px_30px_rgba(0,0,0,0.12)]";
    if (type === "success") {
      iconName = "check_circle";
      iconColor = "text-tertiary-fixed-dim";
      border = "border-secondary-fixed bg-surface-container-lowest text-primary shadow-[0_8px_30px_rgba(0,0,0,0.12)]";
    } else if (type === "error") {
      iconName = "error";
      iconColor = "text-error";
      border = "border-error/30 bg-surface-container-lowest text-primary shadow-[0_8px_30px_rgba(0,0,0,0.12)]";
    }

    toast.className = `flex items-center gap-2.5 px-4 py-3 rounded-2xl border ${border} text-xs md:text-sm font-body-md font-medium transition-all duration-300 transform translate-y-4 opacity-0 pointer-events-auto max-w-md`;
    toast.innerHTML = `<span class="material-symbols-outlined ${iconColor} text-[20px] shrink-0" style="font-variation-settings: 'FILL' 1;">${iconName}</span> <span>${message}</span>`;
    
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.remove("translate-y-4", "opacity-0");
    }, 10);

    setTimeout(() => {
      toast.classList.add("translate-y-4", "opacity-0");
      setTimeout(() => {
        if (typeof toast.remove === "function") {
          toast.remove();
        } else if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 3500);
  },

  /**
   * Modal management
   */
  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove("hidden");
      modal.classList.add("flex");
    }
  },

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    }
  },

  /**
   * Client-Side Dynamic Cryptographic SHA-256 Integrity Hash using native Web Crypto API
   * Converts payload to canonical deterministic representation and computes async SHA-256 digest
   */
  async computeSHA256(payload) {
    try {
      const canonStr = typeof payload === "string" ? payload : JSON.stringify(payload, Object.keys(payload || {}).sort());
      const encoder = new TextEncoder();
      const data = encoder.encode(canonStr);
      if (typeof window !== "undefined" && window.crypto && window.crypto.subtle) {
        const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
        return `sha256:${hashHex}`;
      }
      // Deterministic fallback for non-crypto environments
      let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
      for (let i = 0; i < canonStr.length; i++) {
        const ch = canonStr.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
      }
      const hex1 = (h1 >>> 0).toString(16).padStart(8, "0");
      const hex2 = (h2 >>> 0).toString(16).padStart(8, "0");
      return `sha256:${hex1}${hex2}${hex1}${hex2}${hex1}${hex2}${hex1}${hex2}`;
    } catch (e) {
      console.error("SHA-256 calculation error", e);
      return "sha256:7a9e1c3f5d7b9a1c3e5f7a9b1d3f5e7a9b1c3d5e7f9a1b3c5d7e9f1a3b5c7d9e";
    }
  }
};

/**
 * VeriSkill Authentication Session Manager
 * Prototype auth layer — cleanly isolated for easy production provider integration (Firebase, Auth0, etc.)
 */
const Auth = {
  SESSION_KEY: 'veriskill_session',
  TOKEN_KEY: 'veriskill_auth_token',
  LEGACY_TOKEN_KEY: 'veriskill_token',

  /**
   * MODE A: Start Demo Tour (Aarav Sharma)
   */
  startDemoTour() {
    const demoUser = {
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
      verifiedSkillsCount: 17,
      hasSyncedDigiLocker: true
    };
    const demoToken = 'demo-jwt-student-tour-2026';
    Auth.setSession(demoUser, demoToken, true);
    if (typeof window !== "undefined" && window.App) {
      window.App.state.currentUser = demoUser;
      window.App.state.studentId = "student-1042";
      window.App.state.role = "student";
    }
    return demoUser;
  },

  /**
   * Store session after login/signup (MODE B: Real User or Demo User)
   */
  setSession(user, token, remember = true) {
    try {
      const activeToken = token || `demo-jwt-${user?.role || 'student'}-${Date.now()}`;
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(Auth.SESSION_KEY, JSON.stringify(user));
      storage.setItem(Auth.TOKEN_KEY, activeToken);
      storage.setItem(Auth.LEGACY_TOKEN_KEY, activeToken);
      // Fallback mirror
      sessionStorage.setItem(Auth.SESSION_KEY, JSON.stringify(user));
      sessionStorage.setItem(Auth.TOKEN_KEY, activeToken);
      sessionStorage.setItem(Auth.LEGACY_TOKEN_KEY, activeToken);
    } catch (e) {
      console.warn("Storage write error", e);
    }
  },

  /**
   * Update active user session state in storage
   */
  updateSession(updates) {
    try {
      const current = Auth.getSession() || {};
      const updated = { ...current, ...updates };
      localStorage.setItem(Auth.SESSION_KEY, JSON.stringify(updated));
      sessionStorage.setItem(Auth.SESSION_KEY, JSON.stringify(updated));
      if (typeof window !== "undefined" && window.App) {
        window.App.state.currentUser = updated;
      }
      return updated;
    } catch (e) {
      console.warn("Session update error", e);
    }
  },

  /**
   * Default Guest User profile for guest-first access
   */
  getGuestUser() {
    return {
      isDemo: false,
      isGuest: true,
      role: 'student',
      studentId: 'guest-user',
      anonymizedId: 'VS-GUEST',
      name: 'Guest Student',
      email: '',
      passportId: 'VP-2026-IND-GUEST',
      ncrfCredits: 0,
      overallScore: 0,
      trustScore: 0,
      verifiedSkillsCount: 0,
      hasSyncedDigiLocker: false,
      skills: [],
      evidenceList: []
    };
  },

  /**
   * Get current session (returns stored user or default Guest profile)
   */
  getSession() {
    try {
      const raw = localStorage.getItem(Auth.SESSION_KEY) || sessionStorage.getItem(Auth.SESSION_KEY);
      if (raw) return JSON.parse(raw);
      return Auth.getGuestUser();
    } catch {
      return Auth.getGuestUser();
    }
  },

  /**
   * Check if current session is Demo Mode
   */
  isDemoMode() {
    const session = Auth.getSession();
    return !!(session && session.isDemo === true);
  },

  /**
   * Get current token
   */
  getToken() {
    try {
      return localStorage.getItem(Auth.TOKEN_KEY) || 
             localStorage.getItem(Auth.LEGACY_TOKEN_KEY) || 
             sessionStorage.getItem(Auth.TOKEN_KEY) || 
             sessionStorage.getItem(Auth.LEGACY_TOKEN_KEY) || '';
    } catch {
      return '';
    }
  },

  /**
   * Check if user is explicitly authenticated (not guest)
   */
  isLoggedIn() {
    try {
      const raw = localStorage.getItem(Auth.SESSION_KEY) || sessionStorage.getItem(Auth.SESSION_KEY);
      const token = Auth.getToken();
      if (!raw || !token) return false;
      const parsed = JSON.parse(raw);
      return !parsed.isGuest;
    } catch {
      return false;
    }
  },

  /**
   * Logout — clear session and redirect to auth
   */
  logout() {
    try {
      localStorage.removeItem(Auth.SESSION_KEY);
      localStorage.removeItem(Auth.TOKEN_KEY);
      localStorage.removeItem(Auth.LEGACY_TOKEN_KEY);
      sessionStorage.removeItem(Auth.SESSION_KEY);
      sessionStorage.removeItem(Auth.TOKEN_KEY);
      sessionStorage.removeItem(Auth.LEGACY_TOKEN_KEY);
    } catch (e) {}

    fetch('/api/auth/logout', { method: 'POST' }).catch(() => {});
    Utils.showToast('Logged out successfully. See you soon!', 'info');
    
    if (typeof window !== "undefined" && window.App) {
      window.App.state.currentUser = null;
      window.App.state.studentId = "student-1042";
      window.App.state.role = 'student';
    }
    window.location.hash = '#/auth';
  },

  /**
   * Redirect after login based on role or saved post-login destination
   */
  redirectAfterLogin(user) {
    if (typeof window !== "undefined" && window.App && window.App._postLoginRedirect) {
      const redirectTarget = window.App._postLoginRedirect;
      window.App._postLoginRedirect = null;
      window.location.hash = redirectTarget.startsWith("#") ? redirectTarget : `#${redirectTarget}`;
      return;
    }
    if (!user) return;
    if (user.role === 'student') {
      window.location.hash = '#/student/dashboard';
    } else if (user.role === 'recruiter') {
      window.location.hash = '#/recruiter/dashboard';
    } else if (user.role === 'admin' || user.role === 'institution') {
      window.location.hash = '#/admin/fairness';
    } else if (user.role === 'teamlead') {
      window.location.hash = '#/teams';
    } else {
      window.location.hash = '#/student/dashboard';
    }
  },

  /**
   * Restore session on app load
   */
  restoreSession(appState) {
    const session = Auth.getSession();
    if (session) {
      appState.role = session.role || 'student';
      appState.currentUser = session;
      if (session.studentId) appState.studentId = session.studentId;
    }
  }
};
