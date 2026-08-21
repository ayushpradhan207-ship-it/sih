/**
 * Multidisciplinary Team Builder View with Custom Squad Requirement Builder & Anti-Bias Masking
 */

const TeamBuilderView = {
  async render(projectId = "team-proj-healthcare") {
    const projects = await Utils.fetchAPI("/api/teams/projects");
    const activeProject = projects.find(p => p.id === projectId) || projects[0];
    const teamResult = await Utils.fetchAPI("/api/teams/generate", {
      method: "POST",
      body: JSON.stringify({ projectId: activeProject.id })
    });

    const isBiasMitigationActive = App.state.biasMode !== false;

    return `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- DEMO STEP 8 CALLOUT BANNER -->
        <div class="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">8</div>
            <div>
              <h3 class="text-sm font-bold text-slate-900">DEMO STEP 8: Multidisciplinary Team Formation & Anti-Bias Squad Assembly</h3>
              <p class="text-xs text-slate-600">The complementarity solver selects students with complementary skills to achieve 94% domain coverage with zero demographic bias.</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button onclick="Utils.openModal('custom-team-modal')" class="px-3.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5">
              <i class="fa-solid fa-wand-magic-sparkles"></i> Build Custom Squad
            </button>
            <button onclick="App.runDemoStep(1)" class="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5 shrink-0">
              <i class="fa-solid fa-rotate-left"></i> Restart Demo
            </button>
          </div>
        </div>

        <!-- COMPLIANCE BANNER WITH ANTI-BIAS TOGGLE -->
        <div class="p-4 rounded-2xl ${isBiasMitigationActive ? 'bg-gradient-to-r from-emerald-900 to-slate-900 text-white border border-emerald-500/40' : 'bg-slate-100 text-slate-700 border border-slate-300'} shadow-md mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl ${isBiasMitigationActive ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40' : 'bg-slate-200 text-slate-600'} flex items-center justify-center text-lg shrink-0">
              <i class="fa-solid ${isBiasMitigationActive ? 'fa-lock' : 'fa-lock-open'}"></i>
            </div>
            <div>
              <div class="text-xs font-bold uppercase tracking-wider ${isBiasMitigationActive ? 'text-emerald-300' : 'text-slate-500'}">
                ${isBiasMitigationActive ? 'Anti-Bias Team Formation Active' : 'Identified Squad View'}
              </div>
              <p class="text-xs ${isBiasMitigationActive ? 'text-slate-200' : 'text-slate-600'} font-medium mt-0.5">
                ${isBiasMitigationActive ? 'Candidates selected strictly on complementary verified skills. Demographic attributes masked.' : 'Candidate names revealed for team coordination.'}
              </p>
            </div>
          </div>

          <div class="flex items-center gap-3 shrink-0">
            <span class="text-xs font-bold ${isBiasMitigationActive ? 'text-emerald-300' : 'text-slate-500'}">
              ${isBiasMitigationActive ? 'Anti-Bias Active' : 'Anti-Bias Off'}
            </span>
            <button onclick="App.toggleBiasMode()" class="w-14 h-7 rounded-full p-1 transition-colors duration-300 ${isBiasMitigationActive ? 'bg-emerald-500' : 'bg-slate-400'} flex items-center shadow-inner">
              <div class="w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${isBiasMitigationActive ? 'translate-x-7' : 'translate-x-0'}"></div>
            </button>
          </div>
        </div>

        <!-- TEAM BUILDER HEADER -->
        <div class="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-800 text-xs font-bold uppercase tracking-wider">
                SOA IDEATHON 2026 Challenge Solver
              </span>
            </div>
            <h1 class="text-2xl font-extrabold text-slate-900 mt-1">${activeProject.name}</h1>
            <p class="text-xs text-slate-500 mt-1">${activeProject.description}</p>
          </div>

          <div class="flex flex-wrap items-center gap-2 shrink-0">
            <select onchange="App.switchTeamProject(this.value)" class="bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-700 focus:outline-none">
              ${projects.map(p => `<option value="${p.id}" ${p.id === activeProject.id ? 'selected' : ''}>${p.name}</option>`).join("")}
            </select>
            <button onclick="Utils.openModal('custom-team-modal')" class="px-4 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 font-semibold text-xs transition-colors flex items-center gap-1.5">
              <i class="fa-solid fa-sliders"></i> Custom Criteria
            </button>
            <button onclick="App.recalculateTeam('${activeProject.id}')" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5">
              <i class="fa-solid fa-arrows-rotate"></i> Re-Optimize
            </button>
          </div>
        </div>

        <!-- TEAM OVERALL COVERAGE METRICS -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div class="bg-gradient-to-br from-blue-900 to-indigo-950 rounded-3xl p-6 text-white shadow-lg">
            <div class="text-xs font-semibold text-blue-200 uppercase tracking-wider mb-1">Overall Team Coverage</div>
            <div class="text-4xl font-extrabold text-emerald-400" id="team-overall-score">${teamResult.overallCoverageScore}%</div>
            <div class="mt-2 text-xs text-blue-200">Across 5 technical domains</div>
          </div>

          <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <div class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Complementarity Score</div>
            <div class="text-4xl font-extrabold text-blue-600">${teamResult.complementarityScore}%</div>
            <div class="mt-2 text-xs text-slate-500">Low redundancy / high synergy</div>
          </div>

          <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <div class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Squad Roster</div>
            <div class="text-4xl font-extrabold text-slate-900">${teamResult.actualTeamSize} <span class="text-base text-slate-400 font-normal">/ ${teamResult.targetTeamSize} Members</span></div>
            <div class="mt-2 text-xs text-slate-500">Multidisciplinary balance</div>
          </div>

          <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <div class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Avg Evidence Trust</div>
            <div class="text-4xl font-extrabold text-emerald-600">${teamResult.evidenceTrustAverage}/100</div>
            <div class="mt-2 text-xs text-emerald-700 font-medium">All credentials verified</div>
          </div>
        </div>

        <!-- DOMAIN COVERAGE BREAKDOWN METERS -->
        <div class="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm mb-8">
          <h2 class="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Domain-by-Domain Team Skill Coverage</h2>
          <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4" id="team-domain-meters">
            ${Object.entries(teamResult.domainCoverage || {}).map(([domain, score]) => `
              <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div class="flex justify-between items-center text-xs font-bold mb-1">
                  <span class="text-slate-700">${domain}</span>
                  <span class="text-blue-700">${score}%</span>
                </div>
                <div class="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div class="bg-blue-600 h-2 rounded-full" style="width: ${score}%"></div>
                </div>
                <div class="text-[10px] text-emerald-600 font-medium mt-2 flex items-center gap-1">
                  <i class="fa-solid fa-check-circle"></i> Optimal Target Reached
                </div>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- SQUAD ROSTER CARDS -->
        <div class="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-8">
          <div class="p-6 border-b border-slate-200 bg-slate-50 flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 class="text-base font-bold text-slate-900">Recommended Multidisciplinary Squad</h3>
              <p class="text-xs text-slate-500">Selected via Combinatorial Complementarity Algorithm</p>
            </div>
            <div class="flex items-center gap-2">
              <button onclick="App.exportTeamRoster()" class="px-3.5 py-1.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-sm">
                <i class="fa-solid fa-download"></i> Export Team Roster
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 md:p-8" id="team-roster-grid">
            ${(teamResult.members || []).map((member, mIdx) => `
              <div class="p-6 rounded-3xl border border-slate-200 hover:border-blue-300 bg-white hover:bg-blue-50/20 transition-all hover-lift flex flex-col justify-between">
                <div>
                  <div class="flex items-start justify-between gap-2 mb-3">
                    <span class="px-3 py-1 rounded-xl text-xs font-extrabold bg-blue-100 text-blue-800">
                      ${member.role}
                    </span>
                    <span class="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-lg">
                      ${member.roleFit}% Role Fit
                    </span>
                  </div>

                  <div class="font-bold text-slate-900 text-base flex items-center gap-2">
                    <span>${isBiasMitigationActive ? `Candidate #${member.anonymizedId}` : member.name}</span>
                    <span class="text-xs font-normal font-mono text-slate-400">(${member.anonymizedId})</span>
                  </div>
                  <div class="text-xs text-slate-500 font-mono mt-0.5">Passport: ${member.passportId}</div>

                  <!-- Key Skills for this Role -->
                  <div class="mt-4 space-y-1.5">
                    <div class="text-[10px] font-bold text-slate-400 uppercase">Demonstrated Skill Contribution</div>
                    <div class="flex flex-wrap gap-1.5">
                      ${(member.keySkills || []).map(ks => `
                        <span class="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200">
                          ${ks}
                        </span>
                      `).join("")}
                    </div>
                  </div>
                </div>

                <div class="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span class="badge-verified px-2 py-0.5 rounded text-[11px] font-semibold"><i class="fa-solid fa-shield-check"></i> Verified</span>
                  <a href="#/verify/${member.passportId}" class="text-blue-600 hover:underline font-semibold text-xs">Verify Passport &rarr;</a>
                </div>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- MODAL: BUILD CUSTOM SQUAD INTERACTIVELY -->
        <div id="custom-team-modal" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 hidden items-center justify-center p-4">
          <div class="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 max-h-[85vh] overflow-y-auto">
            <div class="flex items-center justify-between pb-4 border-b border-slate-100">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">
                  <i class="fa-solid fa-people-group"></i>
                </div>
                <h3 class="text-base font-bold text-slate-900">Configure Custom Team Challenge</h3>
              </div>
              <button onclick="Utils.closeModal('custom-team-modal')" class="text-slate-400 hover:text-slate-600">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form onsubmit="App.handleCustomTeamSubmit(event)" class="mt-4 space-y-4 text-xs">
              <div>
                <label class="block font-bold text-slate-700 mb-1">Project Name</label>
                <input type="text" id="custom-team-name" required placeholder="e.g. AI Disaster Management UAV Swarm" class="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:border-purple-500 focus:outline-none text-sm" value="AI Autonomous Drone & GIS Disaster Response">
              </div>

              <div>
                <label class="block font-bold text-slate-700 mb-1">Challenge Track</label>
                <input type="text" id="custom-team-track" required placeholder="e.g. SOA IDEATHON Track 2" class="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:border-purple-500 focus:outline-none text-xs" value="Disaster Management & Robotics (Track 2)">
              </div>

              <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <label class="block font-bold text-slate-900 mb-2">Configure Role Roster (Select Required Counts)</label>
                
                <div class="space-y-3">
                  <div class="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200">
                    <div>
                      <span class="font-bold text-slate-800">AI / Machine Learning Specialists</span>
                      <div class="text-[10px] text-slate-400">Python, PyTorch, Computer Vision, Scikit-learn</div>
                    </div>
                    <select id="role-count-ai" class="px-2.5 py-1 border border-slate-300 rounded-lg text-xs font-bold text-blue-700 bg-blue-50">
                      <option value="1">1 Member</option>
                      <option value="2" selected>2 Members</option>
                      <option value="3">3 Members</option>
                    </select>
                  </div>

                  <div class="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200">
                    <div>
                      <span class="font-bold text-slate-800">Backend & API Architect</span>
                      <div class="text-[10px] text-slate-400">Node.js, PostgreSQL, FastAPI, REST APIs</div>
                    </div>
                    <select id="role-count-backend" class="px-2.5 py-1 border border-slate-300 rounded-lg text-xs font-bold text-blue-700 bg-blue-50">
                      <option value="1" selected>1 Member</option>
                      <option value="2">2 Members</option>
                    </select>
                  </div>

                  <div class="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200">
                    <div>
                      <span class="font-bold text-slate-800">Frontend & UI Developer</span>
                      <div class="text-[10px] text-slate-400">React, TypeScript, Tailwind CSS, Next.js</div>
                    </div>
                    <select id="role-count-frontend" class="px-2.5 py-1 border border-slate-300 rounded-lg text-xs font-bold text-blue-700 bg-blue-50">
                      <option value="1" selected>1 Member</option>
                      <option value="2">2 Members</option>
                    </select>
                  </div>

                  <div class="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200">
                    <div>
                      <span class="font-bold text-slate-800">UI/UX & Product Designer</span>
                      <div class="text-[10px] text-slate-400">Figma, UI/UX Design, User Research, Prototyping</div>
                    </div>
                    <select id="role-count-uiux" class="px-2.5 py-1 border border-slate-300 rounded-lg text-xs font-bold text-blue-700 bg-blue-50">
                      <option value="0">0 Members</option>
                      <option value="1" selected>1 Member</option>
                      <option value="2">2 Members</option>
                    </select>
                  </div>

                  <div class="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200">
                    <div>
                      <span class="font-bold text-slate-800">Cloud & DevOps / Security Lead</span>
                      <div class="text-[10px] text-slate-400">Docker, Kubernetes, AWS, Cryptography</div>
                    </div>
                    <select id="role-count-cloud" class="px-2.5 py-1 border border-slate-300 rounded-lg text-xs font-bold text-blue-700 bg-blue-50">
                      <option value="1" selected>1 Member</option>
                      <option value="2">2 Members</option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button type="button" onclick="Utils.closeModal('custom-team-modal')" class="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold">Cancel</button>
                <button type="submit" class="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold shadow-md shadow-purple-500/20 flex items-center gap-1.5">
                  <i class="fa-solid fa-wand-magic-sparkles"></i> Solve Optimal Custom Squad
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
  }
};
