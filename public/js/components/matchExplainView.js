/**
 * VeriSkill — Stitch Match Details & Gap Analysis Component (Source of Truth)
 */

const MatchExplainView = {
  async render(opportunityId = "opp-ml-intern", studentId = "student-1042") {
    const match = await Utils.fetchAPI("/api/match", {
      method: "POST",
      body: JSON.stringify({ studentId, opportunityId })
    });
    const opp = await Utils.fetchAPI(`/api/opportunities/${opportunityId}`);
    const breakdown = match.scoreBreakdown || {};

    return `
      <div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-24 md:pt-28 pb-section-gap flex flex-col gap-stack-lg min-h-screen">
        
        <!-- Header & Breadcrumbs -->
        <div class="flex flex-col gap-2">
          <a href="#/student/opportunities" class="inline-flex items-center gap-1 font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors cursor-pointer w-fit">
            <span class="material-symbols-outlined text-sm">arrow_back</span>
            Back to Opportunities
          </a>
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 class="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-bold">
                ${opp.title || "Software Engineering Intern"}
              </h1>
              <p class="font-body-md text-body-md text-on-surface-variant mt-1">
                ${opp.company || "Apex Neural Labs"} • ${opp.location || "Remote / Bengaluru"} • ${opp.stipend || "₹35,000 / mo"}
              </p>
            </div>
            <div class="flex items-center gap-3">
              <button onclick="App.openBridgeGapModal('Docker', 'Containerization & Microservices Bridge Lab', 4, '+8% Match Boost')" class="px-5 py-2.5 bg-primary-container text-on-primary font-label-md text-label-md rounded-full hover:bg-primary transition-all flex items-center gap-1.5 shadow-sm active:scale-95">
                <span class="material-symbols-outlined text-[18px]">rocket_launch</span>
                Bridge Top Gap
              </button>
            </div>
          </div>
        </div>

        <!-- Stitch Match Bento Grid -->
        <div class="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          
          <!-- Match Score Overview Card (md:col-span-4) -->
          <div class="md:col-span-4 bg-surface-container-lowest p-6 md:p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-surface-variant/40 flex flex-col justify-between gap-stack-md ai-match-bg relative overflow-hidden">
            <div class="flex justify-between items-center text-secondary">
              <span class="font-label-md text-label-md uppercase tracking-widest font-bold">MATCH SCORE</span>
              <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">magic_button</span>
            </div>

            <div class="flex flex-col gap-2 my-auto">
              <div class="font-display-lg text-5xl md:text-6xl text-primary font-bold leading-none tracking-tight">
                ${match.matchScore || 87}<span class="text-3xl text-secondary font-normal">%</span>
              </div>
              <p class="font-body-md text-body-md text-on-surface-variant text-sm mt-1">
                Calculated based on verified skills, cryptographic evidence, and repository traces.
              </p>
            </div>

            <div class="pt-4 border-t border-surface-variant/40 flex items-center justify-between text-xs font-label-sm text-on-surface-variant">
              <span>Candidate: <strong class="font-mono text-primary">${match.anonymizedId}</strong></span>
              <span class="text-secondary font-semibold">1.0x Verified Wt</span>
            </div>
          </div>

          <!-- Alignment Breakdown Bars (md:col-span-8) -->
          <div class="md:col-span-8 bg-surface-container-lowest p-6 md:p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-surface-variant/40 flex flex-col justify-between gap-stack-md">
            <div class="flex justify-between items-center">
              <h2 class="font-headline-md text-headline-md text-primary font-bold text-lg">Alignment Breakdown</h2>
              <span class="font-label-sm text-label-sm text-on-surface-variant">5-Factor Trace</span>
            </div>

            <div class="flex flex-col gap-4">
              <!-- Skill Alignment -->
              <div class="space-y-1.5">
                <div class="flex justify-between text-sm font-label-md">
                  <span class="text-primary font-semibold">Skill alignment</span>
                  <span class="text-secondary font-bold">${breakdown.skillAlignment || 92}%</span>
                </div>
                <div class="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                  <div class="h-full bg-secondary rounded-full" style="width: ${breakdown.skillAlignment || 92}%;"></div>
                </div>
              </div>

              <!-- Role Requirements -->
              <div class="space-y-1.5">
                <div class="flex justify-between text-sm font-label-md">
                  <span class="text-primary font-semibold">Role requirements</span>
                  <span class="text-secondary font-bold">${breakdown.projectRelevance ? Math.round(breakdown.projectRelevance * 5.5) : 89}%</span>
                </div>
                <div class="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                  <div class="h-full bg-secondary rounded-full" style="width: ${breakdown.projectRelevance ? Math.round(breakdown.projectRelevance * 5.5) : 89}%;"></div>
                </div>
              </div>

              <!-- Evidence Strength -->
              <div class="space-y-1.5">
                <div class="flex justify-between text-sm font-label-md">
                  <span class="text-primary font-semibold">Evidence strength</span>
                  <span class="text-tertiary-fixed-dim font-bold">${breakdown.evidenceStrength ? Math.round(breakdown.evidenceStrength * 3.3) : 84}%</span>
                </div>
                <div class="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                  <div class="h-full bg-tertiary-fixed-dim rounded-full" style="width: ${breakdown.evidenceStrength ? Math.round(breakdown.evidenceStrength * 3.3) : 84}%;"></div>
                </div>
              </div>
            </div>

            <p class="text-xs text-on-surface-variant mt-2 font-label-sm">
              All 4 core skill criteria cross-referenced against your verified Passport ledger.
            </p>
          </div>

          <!-- Verified Evidence Card (md:col-span-6) -->
          <div class="md:col-span-6 bg-surface-container-lowest p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-surface-variant/40 flex flex-col gap-4">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-secondary" style="font-variation-settings: 'FILL' 1;">verified</span>
              <h3 class="font-headline-md text-headline-md text-primary font-bold text-lg">Verified Evidence</h3>
            </div>

            <div class="flex flex-col gap-2.5">
              ${(match.matchedSkills || []).slice(0, 3).map(s => `
                <div class="flex items-center justify-between p-3.5 bg-surface-container-low rounded-xl border border-surface-variant/30 text-xs">
                  <div class="flex items-center gap-2.5">
                    <span class="material-symbols-outlined text-tertiary-fixed-dim text-[16px]" style="font-variation-settings: 'FILL' 1;">check_circle</span>
                    <span class="font-label-md text-primary font-bold text-sm">${s.name}</span>
                  </div>
                  <span class="font-label-sm text-on-surface-variant bg-surface-container px-2.5 py-1 rounded-full">
                    ${s.evidenceCount || 3} projects
                  </span>
                </div>
              `).join("")}
            </div>
          </div>

          <!-- Gap Analysis & Remediation (md:col-span-6) -->
          <div class="md:col-span-6 bg-surface-container-lowest p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-surface-variant/40 flex flex-col justify-between gap-4 magic-bg">
            <div>
              <div class="flex items-center gap-2 mb-2">
                <span class="material-symbols-outlined text-secondary text-base">psychology</span>
                <span class="font-label-md text-label-md text-secondary font-bold uppercase tracking-wider">Gap Analysis</span>
              </div>
              <h3 class="font-headline-md text-headline-md text-primary font-bold text-lg mb-1">
                Missing Skills: ${(match.missingSkills || [{ name: "REST API Development" }])[0].name}
              </h3>
              <p class="font-body-md text-body-md text-on-surface-variant text-sm leading-relaxed">
                Suggested next step: Complete the ${((match.missingSkills || [{}])[0].bridgeAction || {}).title || "REST API Project"} to increase your match score to <strong class="text-primary font-semibold">95%</strong>.
              </p>
            </div>

            <div class="flex items-center gap-3 mt-2">
              <button onclick="App.openBridgeGapModal('REST API Development', 'FastAPI & REST Microservices Bridge Lab', 3.5, '+8% Match Boost')" class="w-full bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md py-3 px-6 rounded-full transition-all text-center cursor-pointer shadow-sm">
                Bridge Gap (+8% Match)
              </button>
            </div>
          </div>

        </div>

        <!-- Interactive 5-Factor Scoring Sliders -->
        <section class="bg-surface-container-lowest p-6 md:p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-surface-variant/40">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6">
            <div>
              <h2 class="font-headline-md text-headline-md text-primary font-bold text-lg">Interactive 5-Factor Mathematical Model</h2>
              <p class="text-xs text-on-surface-variant mt-0.5">Adjust custom evaluation weights in real-time to observe deterministic score calculation.</p>
            </div>
            <button onclick="App.resetMatchWeights('${opportunityId}')" class="px-3.5 py-1.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-label-md cursor-pointer transition-colors">
              Reset Default Weights
            </button>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            <div class="p-3.5 rounded-xl bg-surface-bright border border-outline-variant/30">
              <div class="flex justify-between text-xs font-semibold mb-1">
                <span class="text-on-surface-variant">Skill Alignment</span>
                <span id="label-w-skill" class="text-secondary font-bold">45%</span>
              </div>
              <input type="range" id="slider-w-skill" min="10" max="70" value="45" oninput="App.recalculateWeightsLive('${opportunityId}')" class="w-full mt-1 accent-secondary">
              <div class="mt-2 text-lg font-bold text-primary" id="val-skill">${breakdown.skillAlignment || 45}%</div>
            </div>

            <div class="p-3.5 rounded-xl bg-surface-bright border border-outline-variant/30">
              <div class="flex justify-between text-xs font-semibold mb-1">
                <span class="text-on-surface-variant">Evidence Strength</span>
                <span id="label-w-evidence" class="text-tertiary-fixed-dim font-bold">25%</span>
              </div>
              <input type="range" id="slider-w-evidence" min="10" max="60" value="25" oninput="App.recalculateWeightsLive('${opportunityId}')" class="w-full mt-1 accent-secondary">
              <div class="mt-2 text-lg font-bold text-primary" id="val-evidence">${breakdown.evidenceStrength || 25}%</div>
            </div>

            <div class="p-3.5 rounded-xl bg-surface-bright border border-outline-variant/30">
              <div class="flex justify-between text-xs font-semibold mb-1">
                <span class="text-on-surface-variant">Project Relevance</span>
                <span id="label-w-project" class="text-primary font-bold">15%</span>
              </div>
              <input type="range" id="slider-w-project" min="5" max="50" value="15" oninput="App.recalculateWeightsLive('${opportunityId}')" class="w-full mt-1 accent-secondary">
              <div class="mt-2 text-lg font-bold text-primary" id="val-project">${breakdown.projectRelevance || 15}%</div>
            </div>

            <div class="p-3.5 rounded-xl bg-surface-bright border border-outline-variant/30">
              <div class="flex justify-between text-xs font-semibold mb-1">
                <span class="text-on-surface-variant">Credential Proofs</span>
                <span id="label-w-cred" class="text-primary font-bold">10%</span>
              </div>
              <input type="range" id="slider-w-cred" min="5" max="40" value="10" oninput="App.recalculateWeightsLive('${opportunityId}')" class="w-full mt-1 accent-secondary">
              <div class="mt-2 text-lg font-bold text-primary" id="val-cred">${breakdown.credentialVerification || 10}%</div>
            </div>

            <div class="p-3.5 rounded-xl bg-surface-bright border border-outline-variant/30">
              <div class="flex justify-between text-xs font-semibold mb-1">
                <span class="text-on-surface-variant">Hackathon Track</span>
                <span id="label-w-exp" class="text-primary font-bold">5%</span>
              </div>
              <input type="range" id="slider-w-exp" min="0" max="30" value="5" oninput="App.recalculateWeightsLive('${opportunityId}')" class="w-full mt-1 accent-secondary">
              <div class="mt-2 text-lg font-bold text-primary" id="val-exp">${breakdown.experienceRelevance || 5}%</div>
            </div>
          </div>
        </section>

        <!-- BRIDGE GAP MODAL -->
        <div id="bridge-gap-modal" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 hidden items-center justify-center p-4">
          <div class="bg-surface-container-lowest rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-surface-variant/40" id="bridge-gap-modal-content">
            <!-- Rendered via App.openBridgeGapModal() -->
          </div>
        </div>

      </div>
    `;
  }
};

