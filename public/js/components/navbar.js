/**
 * VeriSkill — Stitch TopAppBar & BottomNavBar Component
 * Combines Stitch MD3 design with Persona Switcher & ⚡ Judge Demo Presets
 */

const NavbarComponent = {
  render(currentRoute, currentRole, activeDemoStep = 1) {
    const isStudent = currentRole === 'student';
    const isRecruiter = currentRole === 'recruiter';
    const isTeamLead = currentRole === 'teamlead';
    const isAdmin = currentRole === 'admin';

    // Desktop Nav Items
    const isDashboard = currentRoute.includes('dashboard');
    const isPassport = currentRoute.includes('passport');
    const isMatch = currentRoute.includes('opportunities') || currentRoute.includes('matches') || currentRoute.includes('candidates');
    const isGaps = currentRoute.includes('evidence');

    return `
      <!-- TOP APP BAR -->
      <header class="fixed top-0 w-full z-50 bg-surface/85 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border-b border-surface-variant/30">
        <div class="flex justify-between items-center px-margin-mobile md:px-margin-desktop h-16 max-w-container-max mx-auto">
          
          <!-- Logo & Brand -->
          <div class="flex items-center gap-3">
            <a href="#/" class="flex items-center gap-2 cursor-pointer active:scale-95 duration-200 transition-transform">
              <div class="w-8 h-8 rounded-lg bg-primary-container text-on-primary flex items-center justify-center shadow-sm">
                <span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">grid_view</span>
              </div>
              <span class="font-headline-md text-headline-md font-bold text-primary tracking-tight">VeriSkill</span>
            </a>
          </div>

          <!-- Desktop Navigation Cluster -->
          <nav class="hidden md:flex items-center gap-1">
            <a href="#/student/dashboard" class="px-3.5 py-1.5 rounded-full font-label-md text-label-md transition-all duration-200 ${isDashboard ? 'text-secondary font-bold bg-secondary-fixed/40' : 'text-on-surface-variant hover:bg-surface-container hover:text-primary'}">
              Dashboard
            </a>
            <a href="#/student/passport" class="px-3.5 py-1.5 rounded-full font-label-md text-label-md transition-all duration-200 ${isPassport ? 'text-secondary font-bold bg-secondary-fixed/40' : 'text-on-surface-variant hover:bg-surface-container hover:text-primary'}">
              Passport
            </a>
            <a href="#/student/opportunities" class="px-3.5 py-1.5 rounded-full font-label-md text-label-md transition-all duration-200 ${isMatch ? 'text-secondary font-bold bg-secondary-fixed/40' : 'text-on-surface-variant hover:bg-surface-container hover:text-primary'}">
              Match
            </a>
            <a href="#/student/evidence" class="px-3.5 py-1.5 rounded-full font-label-md text-label-md transition-all duration-200 ${isGaps ? 'text-secondary font-bold bg-secondary-fixed/40' : 'text-on-surface-variant hover:bg-surface-container hover:text-primary'}">
              Evidence & Gaps
            </a>
            <a href="#/teams" class="px-3.5 py-1.5 rounded-full font-label-md text-label-md transition-all duration-200 ${currentRoute.startsWith('/teams') ? 'text-secondary font-bold bg-secondary-fixed/40' : 'text-on-surface-variant hover:bg-surface-container hover:text-primary'}">
              Teams
            </a>
            <a href="#/admin/fairness" class="px-3.5 py-1.5 rounded-full font-label-md text-label-md transition-all duration-200 ${currentRoute.startsWith('/admin') ? 'text-secondary font-bold bg-secondary-fixed/40' : 'text-on-surface-variant hover:bg-surface-container hover:text-primary'}">
              Audit
            </a>
          </nav>

          <!-- Right Controls Cluster -->
          <div class="flex items-center gap-3">
            <!-- Persona Switcher -->
            <div class="hidden sm:flex items-center">
              <select onchange="App.setRole(this.value)" class="bg-surface-bright text-on-surface text-xs border border-outline-variant/50 rounded-full px-3 py-1.5 font-label-md focus:outline-none focus:border-secondary cursor-pointer shadow-sm">
                <option value="student" ${currentRole === 'student' ? 'selected' : ''}>🎓 Student (Ashutosh)</option>
                <option value="recruiter" ${currentRole === 'recruiter' ? 'selected' : ''}>💼 Recruiter (Apex Labs)</option>
                <option value="teamlead" ${currentRole === 'teamlead' ? 'selected' : ''}>👥 Team Organizer</option>
                <option value="admin" ${currentRole === 'admin' ? 'selected' : ''}>⚖️ Ethics & Bias Auditor</option>
                <option value="public" ${currentRole === 'public' ? 'selected' : ''}>🔍 Public Verifier</option>
              </select>
            </div>

            <!-- Public Verification Badge Link -->
            <a href="#/verify/VP-2026-IND-1042" class="hidden lg:inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-tertiary-fixed/20 text-on-tertiary-fixed-variant border border-tertiary-fixed text-xs font-label-sm hover:bg-tertiary-fixed/30 transition-colors">
              <span class="material-symbols-outlined text-[14px]" style="font-variation-settings: 'FILL' 1;">verified</span>
              Verify #VS-1042
            </a>

            <!-- User Avatar & Profile Quick View -->
            <div class="w-8 h-8 rounded-full overflow-hidden border border-outline-variant bg-surface-container-highest cursor-pointer hover:ring-2 hover:ring-secondary transition-all" onclick="App.setRole('student')">
              <img alt="User profile photo" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSWx0e2-SEWuIEGrXnsvm4ah9oeU6y1aOzAG4Hf9K4yxBpcSVeqnczMjJTZnq0xzbMBMgC8xTk-fai4OeLnjMB_zOat6msJCXv6S2jCT7eD2NGWg388APSwrIDqdYI3tmEU9LXwtWGPjApaWaw-tzeysQUFiiSrvMrkP9P8QAMV7y16_bdAgeXsAE9gCf_mEus3MjgRa-ZbPX38HW7vV6wdz-RuHIOPuawrFMKu4xyLIMr9L2jFZIwIQ"/>
            </div>
          </div>
        </div>

        <!-- ⚡ JUDGE DEMO PRESETS SUB-BAR -->
        <div class="bg-surface-container-low/90 border-t border-surface-variant/40 py-1.5 px-margin-mobile md:px-margin-desktop text-xs">
          <div class="max-w-container-max mx-auto flex items-center justify-between gap-2 overflow-x-auto">
            <div class="flex items-center gap-2 shrink-0">
              <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary-container text-on-primary font-bold text-[10px] uppercase tracking-wider">
                <span class="material-symbols-outlined text-[12px] text-tertiary-fixed">bolt</span>
                Judge Presets
              </span>
            </div>

            <div class="flex items-center gap-2 shrink-0 flex-nowrap">
              <button onclick="App.judgePresetAISpecialist()" class="px-3 py-1 rounded-full bg-surface-container-lowest border border-outline-variant/40 hover:border-secondary text-primary font-label-sm text-[11px] hover:bg-surface-bright transition-all shadow-sm flex items-center gap-1 cursor-pointer whitespace-nowrap">
                <span class="material-symbols-outlined text-[13px] text-secondary">psychology</span>
                Preset 1: AI Specialist
              </button>
              <button onclick="App.judgePresetSimulateBiasAudit()" class="px-3 py-1 rounded-full bg-surface-container-lowest border border-outline-variant/40 hover:border-secondary text-primary font-label-sm text-[11px] hover:bg-surface-bright transition-all shadow-sm flex items-center gap-1 cursor-pointer whitespace-nowrap">
                <span class="material-symbols-outlined text-[13px] text-secondary">shield</span>
                Preset 2: Bias Audit
              </button>
              <button onclick="App.judgePresetSquadSolver()" class="px-3 py-1 rounded-full bg-surface-container-lowest border border-outline-variant/40 hover:border-secondary text-primary font-label-sm text-[11px] hover:bg-surface-bright transition-all shadow-sm flex items-center gap-1 cursor-pointer whitespace-nowrap">
                <span class="material-symbols-outlined text-[13px] text-secondary">groups</span>
                Preset 3: Squad Solver
              </button>
              <button onclick="App.judgePresetValidatePassportHash()" class="px-3 py-1 rounded-full bg-surface-container-lowest border border-outline-variant/40 hover:border-secondary text-primary font-label-sm text-[11px] hover:bg-surface-bright transition-all shadow-sm flex items-center gap-1 cursor-pointer whitespace-nowrap">
                <span class="material-symbols-outlined text-[13px] text-secondary">fingerprint</span>
                Preset 4: Proof Hash
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- BOTTOM NAV BAR (Mobile & Tablet Docked) -->
      <nav class="fixed bottom-0 w-full flex justify-around items-center py-2 px-4 md:hidden bg-surface/85 backdrop-blur-xl shadow-[0_-4px_20px_rgba(0,0,0,0.04)] z-50 rounded-t-2xl border-t border-surface-variant/40">
        <a class="flex flex-col items-center justify-center text-on-surface-variant active:scale-90 duration-200 hover:bg-surface-container-low transition-all px-3 py-1 rounded-xl ${isDashboard ? 'text-secondary font-bold' : ''}" href="#/student/dashboard">
          <span class="material-symbols-outlined text-[24px]" ${isDashboard ? "style=\"font-variation-settings: 'FILL' 1;\"" : ""}>dashboard</span>
          <span class="font-label-sm text-[11px] mt-0.5">Dashboard</span>
        </a>
        <a class="flex flex-col items-center justify-center text-on-surface-variant active:scale-90 duration-200 hover:bg-surface-container-low transition-all px-3 py-1 rounded-xl ${isPassport ? 'text-secondary font-bold' : ''}" href="#/student/passport">
          <span class="material-symbols-outlined text-[24px]" ${isPassport ? "style=\"font-variation-settings: 'FILL' 1;\"" : ""}>contact_page</span>
          <span class="font-label-sm text-[11px] mt-0.5">Passport</span>
        </a>
        <a class="flex flex-col items-center justify-center text-on-surface-variant active:scale-90 duration-200 hover:bg-surface-container-low transition-all px-3 py-1 rounded-xl ${isMatch ? 'text-secondary font-bold' : ''}" href="#/student/opportunities">
          <span class="material-symbols-outlined text-[24px]" ${isMatch ? "style=\"font-variation-settings: 'FILL' 1;\"" : ""}>handshake</span>
          <span class="font-label-sm text-[11px] mt-0.5">Match</span>
        </a>
        <a class="flex flex-col items-center justify-center text-on-surface-variant active:scale-90 duration-200 hover:bg-surface-container-low transition-all px-3 py-1 rounded-xl ${isGaps ? 'text-secondary font-bold' : ''}" href="#/student/evidence">
          <span class="material-symbols-outlined text-[24px]" ${isGaps ? "style=\"font-variation-settings: 'FILL' 1;\"" : ""}>analytics</span>
          <span class="font-label-sm text-[11px] mt-0.5">Gaps</span>
        </a>
        <a class="flex flex-col items-center justify-center text-on-surface-variant active:scale-90 duration-200 hover:bg-surface-container-low transition-all px-3 py-1 rounded-xl" href="#/teams">
          <span class="material-symbols-outlined text-[24px]">groups</span>
          <span class="font-label-sm text-[11px] mt-0.5">Teams</span>
        </a>
      </nav>
    `;
  }
};

