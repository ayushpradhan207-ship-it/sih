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
              ${typeof I18n !== 'undefined' ? I18n.t('navbar.dashboard') : 'Dashboard'}
            </a>
            <a href="#/student/passport" class="px-3.5 py-1.5 rounded-full font-label-md text-label-md transition-all duration-200 ${isPassport ? 'text-secondary font-bold bg-secondary-fixed/40' : 'text-on-surface-variant hover:bg-surface-container hover:text-primary'}">
              ${typeof I18n !== 'undefined' ? I18n.t('navbar.passport') : 'Passport'}
            </a>
            <a href="#/student/opportunities" class="px-3.5 py-1.5 rounded-full font-label-md text-label-md transition-all duration-200 ${isMatch ? 'text-secondary font-bold bg-secondary-fixed/40' : 'text-on-surface-variant hover:bg-surface-container hover:text-primary'}">
              ${typeof I18n !== 'undefined' ? I18n.t('navbar.match') : 'Match'}
            </a>
            <a href="#/student/evidence" class="px-3.5 py-1.5 rounded-full font-label-md text-label-md transition-all duration-200 ${isGaps ? 'text-secondary font-bold bg-secondary-fixed/40' : 'text-on-surface-variant hover:bg-surface-container hover:text-primary'}">
              ${typeof I18n !== 'undefined' ? I18n.t('navbar.evidence') : 'Evidence & Gaps'}
            </a>
            <a href="#/teams" class="px-3.5 py-1.5 rounded-full font-label-md text-label-md transition-all duration-200 ${currentRoute.startsWith('/teams') ? 'text-secondary font-bold bg-secondary-fixed/40' : 'text-on-surface-variant hover:bg-surface-container hover:text-primary'}">
              ${typeof I18n !== 'undefined' ? I18n.t('navbar.teams') : 'Teams'}
            </a>
            <a href="#/admin/fairness" class="px-3.5 py-1.5 rounded-full font-label-md text-label-md transition-all duration-200 ${currentRoute.startsWith('/admin') ? 'text-secondary font-bold bg-secondary-fixed/40' : 'text-on-surface-variant hover:bg-surface-container hover:text-primary'}">
              ${typeof I18n !== 'undefined' ? I18n.t('navbar.audit') : 'Audit'}
            </a>
          </nav>

          <!-- Right Controls Cluster -->
          <div class="flex items-center gap-2.5">
            <!-- Bhashini Vernacular Language Selector (Feature C & Step 2) -->
            <div class="relative flex items-center">
              <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-low border border-outline-variant/40 hover:border-secondary transition-all">
                <span class="material-symbols-outlined text-secondary text-[15px]">translate</span>
                <select onchange="I18n.setLanguage(this.value)" class="bg-transparent text-primary text-xs font-label-md focus:outline-none cursor-pointer pr-1">
                  <option value="en" ${(typeof I18n !== 'undefined' && I18n.currentLanguage === 'en') ? 'selected' : ''}>English</option>
                  <option value="hi" ${(typeof I18n !== 'undefined' && I18n.currentLanguage === 'hi') ? 'selected' : ''}>हिंदी (Hindi)</option>
                  <option value="or" ${(typeof I18n !== 'undefined' && I18n.currentLanguage === 'or') ? 'selected' : ''}>ଓଡ଼ିଆ (Odia)</option>
                  <option value="ta" ${(typeof I18n !== 'undefined' && I18n.currentLanguage === 'ta') ? 'selected' : ''}>தமிழ் (Tamil)</option>
                </select>
                <span class="hidden md:inline-flex items-center text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200 uppercase tracking-tighter" title="Powered by Bhashini AI Engine">
                  Bhashini AI
                </span>
              </div>
            </div>

            <!-- Public Verification Badge Link -->
            <a href="#/verify/VP-2026-IND-1042" class="hidden lg:inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-tertiary-fixed/20 text-on-tertiary-fixed-variant border border-tertiary-fixed text-xs font-label-sm hover:bg-tertiary-fixed/30 transition-colors">
              <span class="material-symbols-outlined text-[14px]" style="font-variation-settings: 'FILL' 1;">verified</span>
              <span>${typeof I18n !== 'undefined' ? I18n.t('navbar.verify') : 'Verify #VS-1042'}</span>
            </a>

            <!-- User Auth Menu & Avatar -->
            ${typeof Auth !== 'undefined' && Auth.isLoggedIn() ? `
              <div class="relative group flex items-center">
                <button type="button" class="flex items-center gap-2 px-3 py-1.5 rounded-full border border-outline-variant/50 bg-surface-container hover:bg-surface-container-high transition-all cursor-pointer">
                  <div class="w-6 h-6 rounded-full bg-primary-container text-on-primary flex items-center justify-center text-[11px] font-bold overflow-hidden">
                    ${Auth.getSession()?.avatar ? `
                      <img src="${Auth.getSession().avatar}" class="w-full h-full object-cover" alt="Avatar" />
                    ` : `
                      ${(Auth.getSession()?.name || 'User').split(' ').map(n=>n[0]).slice(0,2).join('').toUpperCase()}
                    `}
                  </div>
                  <span class="hidden sm:inline font-label-md text-xs text-primary font-medium max-w-[90px] truncate">
                    ${(Auth.getSession()?.name || 'User').split(' ')[0]}
                  </span>
                  <span class="material-symbols-outlined text-[16px] text-on-surface-variant">expand_more</span>
                </button>
                
                <!-- Dropdown Menu -->
                <div class="absolute right-0 top-full mt-1.5 w-52 bg-surface-container-lowest rounded-2xl shadow-xl border border-surface-variant/40 p-2 hidden group-hover:block z-50">
                  <div class="px-3 py-2 border-b border-surface-variant/40 mb-1">
                    <p class="font-label-md text-xs font-bold text-primary truncate">${Auth.getSession()?.name || 'User'}</p>
                    <p class="font-body-md text-[11px] text-on-surface-variant truncate">${Auth.getSession()?.email || ''}</p>
                    <span class="inline-block mt-1 px-2 py-0.5 rounded-full bg-secondary-fixed/50 text-secondary text-[10px] font-label-md capitalize">
                      ${Auth.getSession()?.role || 'student'}
                    </span>
                  </div>
                  <a href="#/student/dashboard" class="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-label-md text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors">
                    <span class="material-symbols-outlined text-[16px]">dashboard</span> ${typeof I18n !== 'undefined' ? I18n.t('navbar.dashboard') : 'Dashboard'}
                  </a>
                  <a href="#/student/passport" class="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-label-md text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors">
                    <span class="material-symbols-outlined text-[16px]">contact_page</span> ${typeof I18n !== 'undefined' ? I18n.t('navbar.passport') : 'Passport'}
                  </a>
                  <button type="button" onclick="App.logout()" class="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-label-md text-error hover:bg-error-container/30 transition-colors cursor-pointer text-left">
                    <span class="material-symbols-outlined text-[16px]">logout</span> ${typeof I18n !== 'undefined' ? I18n.t('navbar.logout') : 'Log Out'}
                  </button>
                </div>
              </div>
            ` : `
              <div class="flex items-center gap-1.5">
                <button type="button" onclick="App.goToAuth('login')" class="px-3 py-1.5 rounded-full font-label-md text-xs text-on-surface-variant hover:bg-surface-container hover:text-primary transition-all cursor-pointer">
                  ${typeof I18n !== 'undefined' ? I18n.t('navbar.login') : 'Log In'}
                </button>
                <button type="button" onclick="App.goToAuth('signup')" class="px-3.5 py-1.5 rounded-full font-label-md text-xs bg-primary-container text-on-primary hover:bg-primary transition-all cursor-pointer shadow-sm">
                  ${typeof I18n !== 'undefined' ? I18n.t('navbar.signup') : 'Sign Up'}
                </button>
              </div>
            `}
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

