/**
 * Opportunities Discovery & Custom Job Matcher View (Interactive User Input)
 */

const OpportunitiesView = {
  async render(studentId = "student-1042") {
    const matches = await Utils.fetchAPI(`/api/matches/candidate/${studentId}`);

    return `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- DEMO STEP 3 CALLOUT BANNER -->
        <div class="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">3</div>
            <div>
              <h3 class="text-sm font-bold text-slate-900">DEMO STEP 3: Verified Internship Matches & Custom Matcher</h3>
              <p class="text-xs text-slate-600">Inspect verified industry matches or paste your own custom job requirements to test the explainable AI engine.</p>
            </div>
          </div>
          <a href="#/student/matches/opp-ml-intern" class="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5 shrink-0">
            Next: Explain 91% Score <i class="fa-solid fa-arrow-right text-[10px]"></i>
          </a>
        </div>

        <!-- INTERACTIVE CUSTOM JOB MATCHER ACCORDION / BOX -->
        <div class="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-xl mb-8 border border-slate-800">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300 text-sm">
                <i class="fa-solid fa-file-invoice"></i>
              </div>
              <div>
                <h2 class="text-lg font-bold text-white">Custom Job Matcher: Test Any Internship Requirement</h2>
                <p class="text-xs text-slate-300">Paste any job description or custom skill criteria to evaluate candidate #VS-1042 with explainability.</p>
              </div>
            </div>
            <span class="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[11px] font-bold">
              Dynamic AI Matcher
            </span>
          </div>

          <!-- Quick Autofill Presets -->
          <div class="mb-4 flex flex-wrap items-center gap-2 text-xs">
            <span class="text-slate-400 text-[11px] font-semibold">Try Preset Job Requirements:</span>
            <button onclick="App.fillCustomJobSample('cv_robotics')" class="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-blue-200 border border-white/10 text-xs transition-colors">
              🤖 Autonomous Drone & CV Intern
            </button>
            <button onclick="App.fillCustomJobSample('web3_sec')" class="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-purple-200 border border-white/10 text-xs transition-colors">
              🔐 Web3 Credential Security Engineer
            </button>
            <button onclick="App.fillCustomJobSample('fintech_da')" class="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-emerald-200 border border-white/10 text-xs transition-colors">
              📈 FinTech Time-Series Data Analyst
            </button>
          </div>

          <!-- Custom Job Input Form -->
          <div class="space-y-3">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input type="text" id="custom-job-title" placeholder="Job Title (e.g. Computer Vision Research Intern)" class="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-400 text-xs focus:border-purple-400 focus:outline-none">
              <input type="text" id="custom-job-company" placeholder="Company Name (e.g. Robotics AI Corp)" class="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-400 text-xs focus:border-purple-400 focus:outline-none">
              <input type="text" id="custom-job-domain" placeholder="Domain (e.g. Artificial Intelligence)" class="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-400 text-xs focus:border-purple-400 focus:outline-none">
            </div>

            <textarea id="custom-job-text" rows="3" placeholder="Paste full job description or enter required skills (e.g. Must have Python, PyTorch, Computer Vision, Docker, SQL)..." class="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-400 text-xs focus:border-purple-400 focus:outline-none"></textarea>

            <div class="flex items-center justify-between pt-1">
              <span class="text-[11px] text-slate-400"><i class="fa-solid fa-lock text-emerald-400 mr-1"></i> Attribute-blind evaluation enforced</span>
              <button onclick="App.runCustomJobMatch()" id="btn-custom-match" class="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-all flex items-center gap-2">
                <i class="fa-solid fa-calculator"></i> Calculate Match & Explain &rarr;
              </button>
            </div>
          </div>

          <!-- Custom Match Results Modal Container -->
          <div id="custom-match-results" class="mt-6 pt-6 border-t border-slate-800 hidden">
            <!-- Rendered dynamically -->
          </div>
        </div>

        <!-- OPPORTUNITIES FEED HEADER & SEARCH -->
        <div class="mb-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div>
            <h1 class="text-2xl font-extrabold text-slate-900">Verified Industry Opportunities</h1>
            <p class="text-xs text-slate-500 mt-1">Recommendations generated purely from your verified Skill Passport evidence.</p>
          </div>

          <div class="flex items-center gap-2">
            <div class="relative flex-1 sm:w-64">
              <i class="fa-solid fa-magnifying-glass absolute left-3.5 top-3 text-slate-400 text-xs"></i>
              <input type="text" id="opp-search-input" onkeyup="App.handleOppSearch(this.value)" placeholder="Search roles or skills..." class="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-xs focus:border-blue-500 focus:outline-none shadow-sm">
            </div>
          </div>
        </div>

        <!-- OPPORTUNITIES GRID -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8" id="opp-grid">
          ${matches.map(m => `
            <div class="bg-white rounded-3xl p-6 border ${m.matchScore >= 90 ? 'border-blue-300 ring-2 ring-blue-500/20 shadow-md' : 'border-slate-200 shadow-sm'} flex flex-col justify-between hover-lift opp-card" data-title="${m.opportunityTitle.toLowerCase()}" data-company="${m.company.toLowerCase()}">
              <div>
                <!-- Top Badge & Score -->
                <div class="flex items-start justify-between gap-2 mb-4">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-lg shadow-inner">
                      ${m.opportunityId === 'opp-ml-intern' ? '🧠' : m.opportunityId === 'opp-fullstack-ai' ? '⚡' : m.opportunityId === 'opp-data-analyst' ? '📊' : m.opportunityId === 'opp-cloud-devops' ? '☁️' : '🎨'}
                    </div>
                    <div>
                      <h3 class="font-bold text-slate-900 text-base leading-snug">${m.opportunityTitle}</h3>
                      <p class="text-xs text-slate-500">${m.company}</p>
                    </div>
                  </div>

                  <!-- Score Radial Pill -->
                  <div class="px-3 py-1 rounded-full text-xs font-extrabold ${m.matchScore >= 85 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : m.matchScore >= 70 ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-slate-100 text-slate-600 border border-slate-200'}">
                    ${m.matchScore}% Match
                  </div>
                </div>

                <!-- Match Sub-Score Breakdown Preview -->
                <div class="grid grid-cols-2 gap-2 my-4 p-3 bg-slate-50 rounded-2xl text-[11px]">
                  <div>
                    <span class="text-slate-500">Skill Alignment:</span>
                    <strong class="text-slate-800 ml-1">${m.scoreBreakdown?.skillAlignment || 45}%</strong>
                  </div>
                  <div>
                    <span class="text-slate-500">Evidence Strength:</span>
                    <strong class="text-slate-800 ml-1">${m.scoreBreakdown?.evidenceStrength || 25}%</strong>
                  </div>
                  <div>
                    <span class="text-slate-500">Verified Skills:</span>
                    <strong class="text-emerald-700 ml-1">${m.matchedSkills?.length || 4} matched</strong>
                  </div>
                  <div>
                    <span class="text-slate-500">Skill Gaps:</span>
                    <strong class="text-amber-700 ml-1">${m.missingSkills?.length || 0} identified</strong>
                  </div>
                </div>

                <!-- Matched Skills Preview Chips -->
                <div class="mb-3">
                  <div class="text-[10px] font-bold text-slate-400 uppercase mb-1.5">Verified Matched Skills</div>
                  <div class="flex flex-wrap gap-1.5">
                    ${(m.matchedSkills || []).slice(0, 4).map(s => `
                      <span class="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[10px] font-semibold border border-emerald-200 flex items-center gap-1">
                        <i class="fa-solid fa-check text-[8px]"></i> ${s.name}
                      </span>
                    `).join("")}
                  </div>
                </div>

                <!-- Missing Skills Preview -->
                ${m.missingSkills && m.missingSkills.length > 0 ? `
                  <div class="mb-4">
                    <div class="text-[10px] font-bold text-amber-700 uppercase mb-1.5">Identified Gap Skills</div>
                    <div class="flex flex-wrap gap-1.5">
                      ${m.missingSkills.slice(0, 3).map(s => `
                        <span class="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 text-[10px] font-medium border border-amber-200">
                          ${s.name} (${s.gapSeverity} Gap)
                        </span>
                      `).join("")}
                    </div>
                  </div>
                ` : ''}
              </div>

              <!-- Action Button -->
              <div class="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <a href="#/student/matches/${m.opportunityId}" class="w-full py-2.5 rounded-xl ${m.matchScore >= 90 ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-800'} font-semibold text-xs text-center transition-colors flex items-center justify-center gap-2 shadow-sm">
                  <i class="fa-solid fa-wand-magic-sparkles"></i> View Match Explanation &rarr;
                </a>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }
};
