/**
 * VeriSkill — Stitch Multidisciplinary Team Builder View with Custom Squad Solver & Anti-Bias Masking
 */

const TeamBuilderView = {
  async render(projectId = "team-proj-healthcare") {
    const rawProjects = await Utils.fetchAPI("/api/teams/projects");
    const projects = Array.isArray(rawProjects)
      ? rawProjects
      : (Array.isArray(rawProjects?.projects) ? rawProjects.projects : (Array.isArray(rawProjects?.data) ? rawProjects.data : []));
    const activeProject = projects.find(p => p.id === projectId) || projects[0] || { id: "team-proj-healthcare", title: "AI Healthcare Diagnostics & Clinical Triage Platform" };
    const rawTeamResult = await Utils.fetchAPI("/api/teams/generate", {
      method: "POST",
      body: JSON.stringify({ projectId: activeProject.id })
    });
    const teamResult = (rawTeamResult && typeof rawTeamResult === "object") ? (rawTeamResult.data || rawTeamResult) : {};

    const isBiasMitigationActive = App.state.biasMode !== false;

    return `
      <div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-24 md:pt-28 pb-section-gap flex flex-col gap-stack-lg min-h-screen">
        
        <!-- DEMO STEP 8 CALLOUT BANNER -->
        <div class="bg-secondary-fixed/30 border border-secondary-fixed rounded-2xl p-4 md:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div class="flex items-center gap-3.5">
            <div class="w-9 h-9 rounded-xl bg-secondary text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
              8
            </div>
            <div>
              <h3 class="font-headline-md text-base text-primary font-bold">DEMO STEP 8: Multidisciplinary Team Formation & Anti-Bias Squad Assembly</h3>
              <p class="font-body-md text-xs text-on-surface-variant mt-0.5">
                The complementarity solver selects students with complementary skills to achieve 94% domain coverage with zero demographic bias.
              </p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button type="button" onclick="Utils.openModal('custom-team-modal')" class="px-4 py-2 rounded-full bg-primary-container hover:bg-primary text-on-primary font-label-md text-xs transition-all shadow-sm flex items-center gap-1.5 cursor-pointer">
              <span class="material-symbols-outlined text-[16px]">auto_awesome</span>
              <span>Build Custom Squad</span>
            </button>
            <button type="button" onclick="App.runDemoStep(1)" class="px-4 py-2 rounded-full bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-xs transition-all border border-outline-variant/30 flex items-center gap-1.5 shrink-0 cursor-pointer">
              <span class="material-symbols-outlined text-[16px]">restart_alt</span>
              <span>Restart Demo</span>
            </button>
          </div>
        </div>

        <!-- COMPLIANCE BANNER WITH ANTI-BIAS TOGGLE -->
        <section class="p-6 rounded-3xl ${isBiasMitigationActive ? 'bg-primary-container text-on-primary border border-primary/20 shadow-[0_8px_30px_rgba(0,0,0,0.12)]' : 'bg-surface-container-low text-primary border border-surface-variant/40 shadow-sm'} flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative overflow-hidden transition-all duration-300">
          <div class="flex items-center gap-4 relative z-10">
            <div class="w-12 h-12 rounded-2xl ${isBiasMitigationActive ? 'bg-white/10 text-white border border-white/20' : 'bg-surface-container text-on-surface-variant'} flex items-center justify-center text-2xl shrink-0 shadow-inner">
              <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">
                ${isBiasMitigationActive ? 'shield' : 'lock_open'}
              </span>
            </div>
            <div>
              <div class="font-label-md text-xs font-bold uppercase tracking-wider ${isBiasMitigationActive ? 'text-secondary-fixed' : 'text-on-surface-variant'}">
                ${isBiasMitigationActive ? 'Anti-Bias Team Formation Active' : 'Identified Squad View'}
              </div>
              <p class="font-body-md text-xs ${isBiasMitigationActive ? 'text-on-primary-container' : 'text-on-surface-variant'} mt-1">
                ${isBiasMitigationActive ? 'Candidates selected strictly on complementary verified skills. Demographic attributes masked.' : 'Candidate names revealed for team coordination.'}
              </p>
            </div>
          </div>

          <div class="flex items-center gap-3 shrink-0 bg-white/10 p-2.5 rounded-2xl border border-white/15 relative z-10">
            <span class="font-label-md text-xs font-bold ${isBiasMitigationActive ? 'text-white' : 'text-on-surface-variant'}">
              ${isBiasMitigationActive ? 'Anti-Bias: ON' : 'Anti-Bias: OFF'}
            </span>
            <button type="button" onclick="App.toggleBiasMode()" class="w-14 h-7 rounded-full p-1 transition-colors duration-300 ${isBiasMitigationActive ? 'bg-secondary' : 'bg-outline-variant'} flex items-center shadow-inner focus:outline-none cursor-pointer">
              <div class="w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${isBiasMitigationActive ? 'translate-x-7' : 'translate-x-0'}"></div>
            </button>
          </div>
        </section>

        <!-- TEAM BUILDER HEADER -->
        <section class="bg-surface-container-lowest rounded-2xl p-6 md:p-8 border border-surface-variant/40 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="px-3 py-0.5 rounded-full bg-secondary-fixed/50 text-secondary border border-secondary-fixed text-xs font-label-md font-semibold uppercase tracking-wider">
                SOA IDEATHON 2026 Challenge Solver
              </span>
            </div>
            <h1 class="font-headline-lg-mobile md:font-headline-lg text-primary font-bold">${activeProject.name}</h1>
            <p class="font-body-lg text-on-surface-variant text-xs mt-1">${activeProject.description}</p>
          </div>

          <div class="flex flex-wrap items-center gap-2.5 shrink-0">
            <select onchange="App.switchTeamProject(this.value)" class="bg-surface-container-low border border-outline-variant/40 rounded-full px-4 py-2.5 text-xs font-label-md font-semibold text-primary focus:outline-none">
              ${projects.map(p => `<option value="${p.id}" ${p.id === activeProject.id ? 'selected' : ''}>${p.name}</option>`).join("")}
            </select>
            <button type="button" onclick="Utils.openModal('custom-team-modal')" class="px-4 py-2.5 rounded-full bg-surface-container hover:bg-surface-container-high text-primary border border-outline-variant/30 font-label-md text-xs transition-colors flex items-center gap-1.5 cursor-pointer">
              <span class="material-symbols-outlined text-[16px] text-secondary">tune</span>
              <span>Custom Criteria</span>
            </button>
            <button type="button" onclick="App.recalculateTeam('${activeProject.id}')" class="px-5 py-2.5 rounded-full bg-primary-container hover:bg-primary text-on-primary font-label-md text-xs shadow-sm transition-all flex items-center gap-1.5 cursor-pointer">
              <span class="material-symbols-outlined text-[16px]">sync</span>
              <span>Re-Optimize</span>
            </button>
          </div>
        </section>

        <!-- TEAM OVERALL COVERAGE METRICS BENTO -->
        <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          <div class="bg-primary-container rounded-2xl p-6 text-on-primary shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-primary/20 flex flex-col justify-between">
            <div class="flex items-center justify-between text-secondary-fixed mb-2">
              <span class="font-label-md text-xs uppercase tracking-widest font-semibold">Team Coverage</span>
              <span class="material-symbols-outlined text-secondary-fixed">radar</span>
            </div>
            <div class="font-display-lg text-4xl text-tertiary-fixed-dim font-bold" id="team-overall-score">${teamResult.overallCoverageScore}%</div>
            <div class="mt-2 text-xs font-label-md text-on-primary-container">Across 5 technical domains</div>
          </div>

          <div class="bg-surface-container-lowest rounded-2xl p-6 border border-surface-variant/40 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col justify-between hover:-translate-y-1 transition-all duration-300">
            <div class="flex items-center justify-between text-on-surface-variant mb-2">
              <span class="font-label-md text-xs uppercase tracking-widest font-semibold">Complementarity</span>
              <span class="material-symbols-outlined text-secondary">hub</span>
            </div>
            <div class="font-display-lg text-4xl text-secondary font-bold">${teamResult.complementarityScore}%</div>
            <div class="mt-2 text-xs font-label-md text-on-surface-variant">Low redundancy / high synergy</div>
          </div>

          <div class="bg-surface-container-lowest rounded-2xl p-6 border border-surface-variant/40 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col justify-between hover:-translate-y-1 transition-all duration-300">
            <div class="flex items-center justify-between text-on-surface-variant mb-2">
              <span class="font-label-md text-xs uppercase tracking-widest font-semibold">Squad Roster</span>
              <span class="material-symbols-outlined text-secondary">groups</span>
            </div>
            <div class="font-display-lg text-4xl text-primary font-bold">${teamResult.actualTeamSize} <span class="text-base text-on-surface-variant font-normal">/ ${teamResult.targetTeamSize}</span></div>
            <div class="mt-2 text-xs font-label-md text-on-surface-variant">Multidisciplinary balance</div>
          </div>

          <div class="bg-surface-container-lowest rounded-2xl p-6 border border-surface-variant/40 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col justify-between hover:-translate-y-1 transition-all duration-300">
            <div class="flex items-center justify-between text-on-surface-variant mb-2">
              <span class="font-label-md text-xs uppercase tracking-widest font-semibold">Evidence Trust</span>
              <span class="material-symbols-outlined text-tertiary-fixed-dim" style="font-variation-settings: 'FILL' 1;">verified</span>
            </div>
            <div class="font-display-lg text-4xl text-secondary font-bold">${teamResult.evidenceTrustAverage}/100</div>
            <div class="mt-2 text-xs font-label-md text-secondary font-medium">All credentials verified</div>
          </div>
        </section>

        <!-- DOMAIN COVERAGE BREAKDOWN METERS -->
        <section class="bg-surface-container-lowest rounded-2xl p-6 md:p-8 border border-surface-variant/40 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
          <h2 class="font-headline-md text-sm font-bold text-primary uppercase tracking-wider mb-4">Domain-by-Domain Team Skill Coverage</h2>
          <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4" id="team-domain-meters">
            ${Object.entries(teamResult.domainCoverage || {}).map(([domain, score]) => `
              <div class="p-4 rounded-xl bg-surface-container-low border border-surface-variant/40">
                <div class="flex justify-between items-center text-xs font-label-md font-bold mb-1.5">
                  <span class="text-primary">${domain}</span>
                  <span class="text-secondary">${score}%</span>
                </div>
                <div class="w-full bg-surface-container rounded-full h-2 overflow-hidden">
                  <div class="bg-gradient-to-r from-secondary to-tertiary-fixed-dim h-2 rounded-full transition-all duration-500" style="width: ${score}%"></div>
                </div>
                <div class="text-[10px] font-label-md text-secondary font-medium mt-2 flex items-center gap-1">
                  <span class="material-symbols-outlined text-[12px]" style="font-variation-settings: 'FILL' 1;">check_circle</span>
                  <span>Optimal Target Reached</span>
                </div>
              </div>
            `).join("")}
          </div>
        </section>

        <!-- SQUAD ROSTER SECTION -->
        <section class="bg-surface-container-lowest rounded-2xl border border-surface-variant/40 shadow-[0_4px_20px_rgba(0,0,0,0.04)] overflow-hidden">
          <div class="p-6 border-b border-surface-variant/40 bg-surface-container-low flex items-center justify-between flex-wrap gap-2">
            <div>
              <h2 class="font-headline-md text-base md:text-lg font-bold text-primary">Recommended Multidisciplinary Squad</h2>
              <p class="font-body-md text-xs text-on-surface-variant">Selected via Combinatorial Complementarity Optimization Engine</p>
            </div>
            <div class="flex items-center gap-2">
              <button type="button" onclick="App.exportTeamRoster()" class="px-4 py-2 rounded-full bg-surface-container-lowest border border-outline-variant/40 hover:bg-surface-container text-primary font-label-md text-xs transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer">
                <span class="material-symbols-outlined text-[16px]">download</span>
                <span>Export Team Roster</span>
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter p-6 md:p-8" id="team-roster-grid">
            ${(teamResult.members || []).map((member, mIdx) => `
              <div class="p-6 rounded-2xl border border-surface-variant/40 hover:border-secondary/40 bg-surface-container-lowest hover:bg-surface-bright transition-all duration-300 shadow-sm hover:-translate-y-1 flex flex-col justify-between group">
                <div>
                  <div class="flex items-start justify-between gap-2 mb-3">
                    <span class="px-3 py-1 rounded-full text-xs font-label-md font-bold bg-secondary-fixed/50 text-secondary border border-secondary-fixed">
                      ${member.role}
                    </span>
                    <span class="text-xs font-label-md font-bold text-secondary bg-surface-container-high px-2.5 py-0.5 rounded-full">
                      ${member.roleFit}% Role Fit
                    </span>
                  </div>

                  <div class="font-headline-md font-bold text-primary text-base flex items-center gap-2">
                    <span>${isBiasMitigationActive ? `Candidate #${member.anonymizedId}` : member.name}</span>
                    <span class="text-xs font-normal font-mono text-on-surface-variant">(${member.anonymizedId})</span>
                  </div>
                  <div class="text-xs font-mono text-on-surface-variant mt-0.5">Passport: ${member.passportId}</div>

                  <!-- Key Skills for this Role -->
                  <div class="mt-4 space-y-1.5">
                    <div class="text-[10px] font-label-md font-bold text-on-surface-variant uppercase tracking-wider">Demonstrated Skill Contribution</div>
                    <div class="flex flex-wrap gap-1.5">
                      ${(member.keySkills || []).map(ks => `
                        <span class="px-2.5 py-0.5 rounded-full bg-surface-container text-primary text-xs font-label-md border border-outline-variant/30">
                          ${ks}
                        </span>
                      `).join("")}
                    </div>
                  </div>
                </div>

                <div class="mt-5 pt-3.5 border-t border-surface-variant/30 flex items-center justify-between text-xs text-on-surface-variant">
                  <span class="inline-flex items-center gap-1 font-label-md font-semibold text-secondary text-xs">
                    <span class="material-symbols-outlined text-[14px]" style="font-variation-settings: 'FILL' 1;">verified</span> Verified
                  </span>
                  <a href="#/verify/${member.passportId}" class="text-secondary hover:underline font-label-md font-semibold text-xs flex items-center gap-0.5">
                    <span>Verify Passport</span>
                    <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </a>
                </div>
              </div>
            `).join("")}
          </div>
        </section>

        <!-- MODAL: BUILD CUSTOM SQUAD INTERACTIVELY -->
        <div id="custom-team-modal" class="fixed inset-0 bg-primary/40 backdrop-blur-sm z-50 hidden items-center justify-center p-4">
          <div class="bg-surface-container-lowest rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl border border-surface-variant/50 max-h-[85vh] overflow-y-auto">
            <div class="flex items-center justify-between pb-4 border-b border-surface-variant/40">
              <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-xl bg-secondary-fixed text-secondary flex items-center justify-center font-bold text-sm">
                  <span class="material-symbols-outlined text-[20px]">group_add</span>
                </div>
                <h3 class="font-headline-md text-base font-bold text-primary">Configure Custom Team Challenge</h3>
              </div>
              <button type="button" onclick="Utils.closeModal('custom-team-modal')" class="text-on-surface-variant hover:text-primary cursor-pointer">
                <span class="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onsubmit="App.handleCustomTeamSubmit(event)" class="mt-4 space-y-4 text-xs font-body-md">
              <div>
                <label class="block font-label-md font-bold text-primary mb-1">Project Name</label>
                <input type="text" id="custom-team-name" required placeholder="e.g. AI Disaster Management UAV Swarm" class="w-full px-3.5 py-2.5 bg-surface-container-low border border-outline-variant/40 rounded-xl text-primary focus:border-secondary focus:outline-none text-xs transition-all" value="AI Autonomous Drone & GIS Disaster Response">
              </div>

              <div>
                <label class="block font-label-md font-bold text-primary mb-1">Challenge Track</label>
                <input type="text" id="custom-team-track" required placeholder="e.g. SOA IDEATHON Track 2" class="w-full px-3.5 py-2.5 bg-surface-container-low border border-outline-variant/40 rounded-xl text-primary focus:border-secondary focus:outline-none text-xs transition-all" value="Disaster Management & Robotics (Track 2)">
              </div>

              <div class="p-4 bg-surface-container-low rounded-2xl border border-surface-variant/40">
                <label class="block font-label-md font-bold text-primary mb-2">Configure Role Roster (Select Required Counts)</label>
                
                <div class="space-y-3">
                  <div class="flex items-center justify-between p-3 bg-surface-container-lowest rounded-xl border border-outline-variant/30">
                    <div>
                      <span class="font-label-md font-bold text-primary">AI / Machine Learning Specialists</span>
                      <div class="text-[10px] text-on-surface-variant">Python, PyTorch, Computer Vision, Scikit-learn</div>
                    </div>
                    <select id="role-count-ai" class="px-3 py-1 border border-outline-variant/40 rounded-full text-xs font-label-md font-bold text-secondary bg-surface-container">
                      <option value="1">1 Member</option>
                      <option value="2" selected>2 Members</option>
                      <option value="3">3 Members</option>
                    </select>
                  </div>

                  <div class="flex items-center justify-between p-3 bg-surface-container-lowest rounded-xl border border-outline-variant/30">
                    <div>
                      <span class="font-label-md font-bold text-primary">Backend & API Architect</span>
                      <div class="text-[10px] text-on-surface-variant">Node.js, PostgreSQL, FastAPI, REST APIs</div>
                    </div>
                    <select id="role-count-backend" class="px-3 py-1 border border-outline-variant/40 rounded-full text-xs font-label-md font-bold text-secondary bg-surface-container">
                      <option value="1" selected>1 Member</option>
                      <option value="2">2 Members</option>
                    </select>
                  </div>

                  <div class="flex items-center justify-between p-3 bg-surface-container-lowest rounded-xl border border-outline-variant/30">
                    <div>
                      <span class="font-label-md font-bold text-primary">Frontend & UI Developer</span>
                      <div class="text-[10px] text-on-surface-variant">React, TypeScript, Tailwind CSS, Next.js</div>
                    </div>
                    <select id="role-count-frontend" class="px-3 py-1 border border-outline-variant/40 rounded-full text-xs font-label-md font-bold text-secondary bg-surface-container">
                      <option value="1" selected>1 Member</option>
                      <option value="2">2 Members</option>
                    </select>
                  </div>

                  <div class="flex items-center justify-between p-3 bg-surface-container-lowest rounded-xl border border-outline-variant/30">
                    <div>
                      <span class="font-label-md font-bold text-primary">UI/UX & Product Designer</span>
                      <div class="text-[10px] text-on-surface-variant">Figma, UI/UX Design, User Research, Prototyping</div>
                    </div>
                    <select id="role-count-uiux" class="px-3 py-1 border border-outline-variant/40 rounded-full text-xs font-label-md font-bold text-secondary bg-surface-container">
                      <option value="0">0 Members</option>
                      <option value="1" selected>1 Member</option>
                      <option value="2">2 Members</option>
                    </select>
                  </div>

                  <div class="flex items-center justify-between p-3 bg-surface-container-lowest rounded-xl border border-outline-variant/30">
                    <div>
                      <span class="font-label-md font-bold text-primary">Cloud & DevOps / Security Lead</span>
                      <div class="text-[10px] text-on-surface-variant">Docker, Kubernetes, AWS, Cryptography</div>
                    </div>
                    <select id="role-count-cloud" class="px-3 py-1 border border-outline-variant/40 rounded-full text-xs font-label-md font-bold text-secondary bg-surface-container">
                      <option value="1" selected>1 Member</option>
                      <option value="2">2 Members</option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="pt-3 flex justify-end gap-2 border-t border-surface-variant/40">
                <button type="button" onclick="Utils.closeModal('custom-team-modal')" class="px-4 py-2 rounded-full bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-xs cursor-pointer">Cancel</button>
                <button type="submit" class="px-5 py-2 rounded-full bg-primary-container hover:bg-primary text-on-primary font-label-md font-bold text-xs shadow-sm flex items-center gap-1.5 cursor-pointer">
                  <span class="material-symbols-outlined text-[16px]">auto_awesome</span>
                  <span>Solve Optimal Custom Squad</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
  }
};
