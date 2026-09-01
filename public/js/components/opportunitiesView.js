/**
 * VeriSkill — Stitch Opportunities Discovery & Custom Job Matcher View
 */

const OpportunitiesView = {
  async render(studentId = "student-1042") {
    const matches = await Utils.fetchAPI(`/api/matches/candidate/${studentId}`);

    return `
      <div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-24 md:pt-28 pb-section-gap flex flex-col gap-stack-lg min-h-screen">
        
        <!-- DEMO STEP 3 CALLOUT BANNER -->
        <div class="bg-secondary-fixed/30 border border-secondary-fixed rounded-2xl p-4 md:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div class="flex items-center gap-3.5">
            <div class="w-9 h-9 rounded-xl bg-secondary text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
              3
            </div>
            <div>
              <h3 class="font-headline-md text-base text-primary font-bold">DEMO STEP 3: Verified Internship Matches & Dynamic AI Matcher</h3>
              <p class="font-body-md text-xs text-on-surface-variant mt-0.5">
                Explore algorithmic recommendations computed strictly against your verified Skill Passport evidence.
              </p>
            </div>
          </div>
          <a href="#/student/matches/opp-ml-intern" class="px-4 py-2 rounded-full bg-primary-container text-on-primary hover:bg-primary font-label-md text-xs transition-all shadow-sm flex items-center gap-1.5 shrink-0">
            <span>Explain 91% Match</span>
            <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
          </a>
        </div>

        <!-- INTERACTIVE CUSTOM JOB MATCHER ACCORDION / BOX -->
        <section class="bg-primary-container rounded-3xl p-6 md:p-8 text-on-primary shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-primary/20 relative overflow-hidden">
          <!-- Background Glow Effect -->
          <div class="absolute -right-20 -top-20 w-80 h-80 bg-secondary/20 rounded-full blur-3xl pointer-events-none"></div>
          <div class="absolute -left-20 -bottom-20 w-80 h-80 bg-tertiary-fixed-dim/10 rounded-full blur-3xl pointer-events-none"></div>

          <div class="relative z-10">
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-surface-container-lowest/10 border border-white/20 flex items-center justify-center text-white shrink-0">
                  <span class="material-symbols-outlined text-[22px]">auto_awesome</span>
                </div>
                <div>
                  <h2 class="font-headline-md text-xl md:text-2xl text-white font-bold">Custom Job Matcher: Test Any Internship Requirement</h2>
                  <p class="font-body-md text-xs text-on-primary-container mt-0.5">Paste any job specification to evaluate candidate #VS-1042 with explainable mathematical decomposition.</p>
                </div>
              </div>
              <span class="px-3 py-1 rounded-full bg-secondary-container/20 text-secondary-fixed border border-secondary-container/40 text-xs font-label-md font-semibold shrink-0">
                Live NLP Engine
              </span>
            </div>

            <!-- Quick Autofill Presets -->
            <div class="mb-5 flex flex-wrap items-center gap-2 text-xs">
              <span class="text-on-primary-container font-label-md text-xs font-semibold">Try Role Templates:</span>
              <button type="button" onclick="App.fillCustomJobSample('cv_robotics')" class="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/15 text-xs font-label-md transition-all flex items-center gap-1.5 cursor-pointer">
                <span>🤖</span> Autonomous Drone & CV Intern
              </button>
              <button type="button" onclick="App.fillCustomJobSample('web3_sec')" class="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/15 text-xs font-label-md transition-all flex items-center gap-1.5 cursor-pointer">
                <span>🔐</span> Web3 Credential Security Engineer
              </button>
              <button type="button" onclick="App.fillCustomJobSample('fintech_da')" class="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/15 text-xs font-label-md transition-all flex items-center gap-1.5 cursor-pointer">
                <span>📈</span> FinTech Time-Series Data Analyst
              </button>
            </div>

            <!-- Custom Job Input Form -->
            <div class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input type="text" id="custom-job-title" placeholder="Job Title (e.g. Computer Vision Research Intern)" class="w-full px-4 py-3 bg-surface-container-lowest/10 border border-white/20 rounded-xl text-white placeholder-on-primary-container text-xs focus:border-secondary focus:outline-none transition-colors">
                <input type="text" id="custom-job-company" placeholder="Company Name (e.g. Robotics AI Corp)" class="w-full px-4 py-3 bg-surface-container-lowest/10 border border-white/20 rounded-xl text-white placeholder-on-primary-container text-xs focus:border-secondary focus:outline-none transition-colors">
                <input type="text" id="custom-job-domain" placeholder="Domain (e.g. Artificial Intelligence)" class="w-full px-4 py-3 bg-surface-container-lowest/10 border border-white/20 rounded-xl text-white placeholder-on-primary-container text-xs focus:border-secondary focus:outline-none transition-colors">
              </div>

              <textarea id="custom-job-text" rows="3" placeholder="Paste full job description or enter required skills (e.g. Must have Python, PyTorch, Computer Vision, Docker, SQL)..." class="w-full px-4 py-3 bg-surface-container-lowest/10 border border-white/20 rounded-xl text-white placeholder-on-primary-container text-xs focus:border-secondary focus:outline-none transition-colors"></textarea>

              <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
                <div class="flex items-center gap-1.5 text-xs text-on-primary-container font-label-md">
                  <span class="material-symbols-outlined text-[16px] text-tertiary-fixed-dim" style="font-variation-settings: 'FILL' 1;">shield</span>
                  <span>Attribute-blind evaluation enforced. Demographic variables quarantined.</span>
                </div>
                <button type="button" onclick="App.runCustomJobMatch()" id="btn-custom-match" class="px-6 py-3 rounded-full bg-secondary hover:bg-secondary/90 text-white font-label-md text-xs shadow-lg transition-all flex items-center gap-2 cursor-pointer shrink-0">
                  <span class="material-symbols-outlined text-[18px]">calculate</span>
                  <span>Calculate Match & Explain</span>
                </button>
              </div>
            </div>

            <!-- Custom Match Results Modal Container -->
            <div id="custom-match-results" class="mt-6 pt-6 border-t border-white/15 hidden">
              <!-- Rendered dynamically -->
            </div>
          </div>
        </section>

        <!-- OPPORTUNITIES FEED HEADER & SEARCH -->
        <section class="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-2">
          <div>
            <h1 class="font-headline-lg-mobile md:font-headline-lg text-primary font-bold">
              Verified Industry Opportunities
            </h1>
            <p class="font-body-lg text-on-surface-variant text-sm mt-1">
              Top opportunity recommendations ranked purely by your cryptographically verified skill proofs.
            </p>
          </div>

          <div class="flex items-center gap-2">
            <div class="relative w-full sm:w-72">
              <span class="material-symbols-outlined absolute left-3.5 top-2.5 text-on-surface-variant text-[20px]">search</span>
              <input type="text" id="opp-search-input" onkeyup="App.handleOppSearch(this.value)" placeholder="Search roles or skills..." class="w-full pl-10 pr-4 py-2.5 bg-surface-container-lowest border border-outline-variant/40 rounded-full text-xs text-primary focus:border-secondary focus:outline-none shadow-sm transition-all">
            </div>
          </div>
        </section>

        <!-- OPPORTUNITIES GRID -->
        <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter" id="opp-grid">
          ${matches.map(m => `
            <div class="bg-surface-container-lowest rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between border ${m.matchScore >= 90 ? 'border-secondary/40 ring-1 ring-secondary/20' : 'border-surface-variant/40'} opp-card group" data-title="${m.opportunityTitle.toLowerCase()}" data-company="${m.company.toLowerCase()}">
              <div>
                <!-- Top Badge & Score -->
                <div class="flex items-start justify-between gap-2 mb-4">
                  <div class="flex items-center gap-3">
                    <div class="w-11 h-11 rounded-2xl bg-surface-container flex items-center justify-center text-xl shadow-inner border border-surface-variant/30 shrink-0">
                      ${m.opportunityId === 'opp-ml-intern' ? '🧠' : m.opportunityId === 'opp-fullstack-ai' ? '⚡' : m.opportunityId === 'opp-data-analyst' ? '📊' : m.opportunityId === 'opp-cloud-devops' ? '☁️' : '🎨'}
                    </div>
                    <div>
                      <h3 class="font-headline-md text-base text-primary font-bold leading-snug group-hover:text-secondary transition-colors">${m.opportunityTitle}</h3>
                      <p class="font-body-md text-xs text-on-surface-variant">${m.company}</p>
                    </div>
                  </div>

                  <!-- Score Radial Pill -->
                  <div class="px-3 py-1 rounded-full text-xs font-label-md font-bold ${m.matchScore >= 85 ? 'bg-secondary-fixed/50 text-secondary border border-secondary-fixed' : m.matchScore >= 70 ? 'bg-surface-container-high text-primary border border-outline-variant/30' : 'bg-surface-container text-on-surface-variant'} shrink-0">
                    ${m.matchScore}% Match
                  </div>
                </div>

                <!-- Match Sub-Score Breakdown Preview -->
                <div class="grid grid-cols-2 gap-2 my-4 p-3 bg-surface-container-low rounded-xl text-xs font-body-md border border-surface-variant/30">
                  <div class="flex items-center justify-between">
                    <span class="text-on-surface-variant text-[11px]">Skill Alignment:</span>
                    <strong class="text-primary font-label-md">${m.scoreBreakdown?.skillAlignment || 45}%</strong>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-on-surface-variant text-[11px]">Evidence Trust:</span>
                    <strong class="text-primary font-label-md">${m.scoreBreakdown?.evidenceStrength || 25}%</strong>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-on-surface-variant text-[11px]">Matched:</span>
                    <strong class="text-secondary font-label-md">${m.matchedSkills?.length || 4} skills</strong>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-on-surface-variant text-[11px]">Gaps:</span>
                    <strong class="text-amber-700 font-label-md">${m.missingSkills?.length || 0} items</strong>
                  </div>
                </div>

                <!-- Matched Skills Preview Chips -->
                <div class="mb-3">
                  <div class="text-[10px] font-label-md font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">Verified Matched Skills</div>
                  <div class="flex flex-wrap gap-1.5">
                    ${(m.matchedSkills || []).slice(0, 4).map(s => `
                      <span class="px-2.5 py-0.5 rounded-full bg-secondary-fixed/30 text-secondary text-[11px] font-label-md font-medium border border-secondary-fixed/50 flex items-center gap-1">
                        <span class="material-symbols-outlined text-[12px]" style="font-variation-settings: 'FILL' 1;">check_circle</span>
                        <span>${s.name}</span>
                      </span>
                    `).join("")}
                  </div>
                </div>

                <!-- Missing Skills Preview -->
                ${m.missingSkills && m.missingSkills.length > 0 ? `
                  <div class="mb-4">
                    <div class="text-[10px] font-label-md font-bold text-amber-800 uppercase tracking-wider mb-1.5">Identified Gap Skills</div>
                    <div class="flex flex-wrap gap-1.5">
                      ${m.missingSkills.slice(0, 3).map(s => `
                        <span class="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[11px] font-label-md font-medium border border-amber-200">
                          ${s.name} (${s.gapSeverity})
                        </span>
                      `).join("")}
                    </div>
                  </div>
                ` : ''}
              </div>

              <!-- Action Button -->
              <div class="mt-4 pt-4 border-t border-surface-variant/30 flex items-center justify-between gap-2">
                <a href="#/student/matches/${m.opportunityId}" class="w-full py-2.5 rounded-full ${m.matchScore >= 90 ? 'bg-primary-container text-on-primary hover:bg-primary' : 'bg-surface-container hover:bg-surface-container-high text-primary'} font-label-md text-xs text-center transition-all flex items-center justify-center gap-1.5 shadow-sm">
                  <span class="material-symbols-outlined text-[16px]">visibility</span>
                  <span>View Match Explanation</span>
                </a>
              </div>
            </div>
          `).join("")}
        </section>
      </div>
    `;
  }
};
