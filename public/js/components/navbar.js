/**
 * Navbar & ⚡ Judge Demo Presets Floating Toolbar Component
 */

const NavbarComponent = {
  render(currentRoute, currentRole, activeDemoStep = 1) {
    return `
      <!-- FLOATING STICKY ⚡ JUDGE DEMO PRESETS TOOLBAR -->
      <div id="judge-demo-bar" class="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 border-b border-indigo-500/30 text-xs text-white sticky top-0 z-50 shadow-xl backdrop-blur-md">
        <div class="max-w-7xl mx-auto px-4 py-2 flex flex-col md:flex-row items-center justify-between gap-2.5">
          
          <!-- Left: Title & Hackathon Context -->
          <div class="flex items-center gap-2 shrink-0">
            <span class="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-400 text-slate-950 font-extrabold text-[10px] uppercase tracking-wider shadow-sm">
              <i class="fa-solid fa-bolt text-amber-900"></i> ⚡ Judge Demo Presets
            </span>
            <span class="text-indigo-200 text-xs hidden lg:inline font-semibold">1-Click Evaluation Actions:</span>
          </div>

          <!-- Center: 4 Required Judge Preset Buttons -->
          <div class="flex items-center gap-2 flex-wrap justify-center">
            <!-- Preset 1: AI Specialist Profile -->
            <button onclick="App.judgePresetAISpecialist()" class="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 border border-blue-400/40 hover:scale-105 active:scale-95">
              <i class="fa-solid fa-brain text-[11px] text-blue-200"></i> [Preset 1: AI Specialist Profile]
            </button>

            <!-- Preset 2: Simulate Bias Audit -->
            <button onclick="App.judgePresetSimulateBiasAudit()" class="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md shadow-purple-500/20 transition-all flex items-center gap-1.5 border border-purple-400/40 hover:scale-105 active:scale-95">
              <i class="fa-solid fa-scale-balanced text-[11px] text-purple-200"></i> [Preset 2: Simulate Bias Audit]
            </button>

            <!-- Preset 3: Squad Solver -->
            <button onclick="App.judgePresetSquadSolver()" class="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-500/20 transition-all flex items-center gap-1.5 border border-indigo-400/40 hover:scale-105 active:scale-95">
              <i class="fa-solid fa-people-group text-[11px] text-indigo-200"></i> [Preset 3: Squad Solver]
            </button>

            <!-- Preset 4: Validate Passport Hash -->
            <button onclick="App.judgePresetValidatePassportHash()" class="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-500/20 transition-all flex items-center gap-1.5 border border-emerald-400/40 hover:scale-105 active:scale-95">
              <i class="fa-solid fa-fingerprint text-[11px] text-emerald-200"></i> [Preset 4: Validate Passport Hash]
            </button>
          </div>

          <!-- Right: Persona Dropdown -->
          <div class="flex items-center gap-2 shrink-0">
            <select onchange="App.setRole(this.value)" class="bg-slate-900 text-indigo-200 text-xs border border-indigo-500/40 rounded-xl px-2.5 py-1 font-semibold focus:outline-none focus:border-blue-400">
              <option value="student" ${currentRole === 'student' ? 'selected' : ''}>Student (#VS-1042)</option>
              <option value="recruiter" ${currentRole === 'recruiter' ? 'selected' : ''}>Recruiter (Apex Labs)</option>
              <option value="teamlead" ${currentRole === 'teamlead' ? 'selected' : ''}>Team Lead (Organizer)</option>
              <option value="admin" ${currentRole === 'admin' ? 'selected' : ''}>Ethics & Bias Auditor</option>
              <option value="public" ${currentRole === 'public' ? 'selected' : ''}>Public Verifier</option>
            </select>
          </div>
        </div>
      </div>

      <!-- MAIN NAVIGATION BAR -->
      <nav class="bg-white border-b border-slate-200 sticky top-10 z-40 shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <!-- Brand Logo -->
            <div class="flex items-center gap-6">
              <a href="#/" class="flex items-center gap-2.5 text-slate-900 font-bold text-xl tracking-tight hover:opacity-90">
                <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                  <i class="fa-solid fa-shield-halved text-lg"></i>
                </div>
                <span>Veri<span class="text-blue-600">Skill</span></span>
              </a>

              <!-- Nav Links -->
              <div class="hidden md:flex items-center gap-1">
                ${currentRole === 'student' ? `
                  <a href="#/student/dashboard" class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${currentRoute.startsWith('/student/dashboard') ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}">
                    <i class="fa-solid fa-chart-pie mr-1 text-xs"></i> Health
                  </a>
                  <a href="#/student/passport" class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${currentRoute.startsWith('/student/passport') ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}">
                    <i class="fa-solid fa-id-card mr-1 text-xs"></i> Skill Passport
                  </a>
                  <a href="#/student/evidence" class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${currentRoute.startsWith('/student/evidence') ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}">
                    <i class="fa-solid fa-code-commit mr-1 text-xs"></i> Evidence Sandbox
                  </a>
                  <a href="#/student/opportunities" class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${currentRoute.startsWith('/student/opportunities') || currentRoute.startsWith('/student/matches') ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}">
                    <i class="fa-solid fa-briefcase mr-1 text-xs"></i> Matches (91%)
                  </a>
                  <a href="#/student/privacy" class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${currentRoute.startsWith('/student/privacy') ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}">
                    <i class="fa-solid fa-lock mr-1 text-xs"></i> Privacy
                  </a>
                ` : currentRole === 'recruiter' ? `
                  <a href="#/recruiter/dashboard" class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${currentRoute.startsWith('/recruiter/dashboard') ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}">
                    <i class="fa-solid fa-gauge mr-1 text-xs"></i> Dashboard
                  </a>
                  <a href="#/recruiter/candidates" class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${currentRoute.startsWith('/recruiter/candidates') ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}">
                    <i class="fa-solid fa-user-shield mr-1 text-xs text-emerald-600"></i> Blind Ranking
                  </a>
                  <a href="#/recruiter/jobs/create" class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${currentRoute.startsWith('/recruiter/jobs/create') ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}">
                    <i class="fa-solid fa-plus-circle mr-1 text-xs"></i> Post Role
                  </a>
                ` : currentRole === 'teamlead' ? `
                  <a href="#/teams" class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors bg-blue-50 text-blue-700 font-semibold">
                    <i class="fa-solid fa-people-group mr-1 text-xs"></i> Multidisciplinary Team Builder
                  </a>
                ` : currentRole === 'admin' ? `
                  <a href="#/admin/fairness" class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors bg-blue-50 text-blue-700 font-semibold">
                    <i class="fa-solid fa-scale-balanced mr-1 text-xs"></i> Bias & Fairness Audit
                  </a>
                ` : `
                  <a href="#/" class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${currentRoute === '/' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}">Home</a>
                  <a href="#/verify/VP-2026-IND-1042" class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${currentRoute.startsWith('/verify') ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}">Public Verification</a>
                  <a href="#/about" class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${currentRoute === '/about' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}">Architecture</a>
                `}

                <!-- Common Links -->
                <a href="#/teams" class="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50">Teams</a>
                <a href="#/admin/fairness" class="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50">Audit</a>
                <a href="#/about" class="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50">About</a>
              </div>
            </div>

            <!-- Right Controls -->
            <div class="flex items-center gap-3">
              <a href="#/verify/VP-2026-IND-1042" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors">
                <i class="fa-solid fa-qrcode"></i> Verify #VS-1042
              </a>

              <button onclick="App.showDemoInfoModal()" class="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center text-sm font-semibold transition-colors" title="Hackathon Context & Overview">
                <i class="fa-solid fa-circle-info"></i>
              </button>
            </div>
          </div>
        </div>
      </nav>
    `;
  }
};
