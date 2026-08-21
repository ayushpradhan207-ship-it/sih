/**
 * Explainable Match Dashboard View with Evidence Traceability Matrix, Penalty Transparency Note & 1-Click Bridge Gap Labs
 */

const MatchExplainView = {
  async render(opportunityId = "opp-ml-intern", studentId = "student-1042") {
    const match = await Utils.fetchAPI("/api/match", {
      method: "POST",
      body: JSON.stringify({ studentId, opportunityId })
    });
    const opp = await Utils.fetchAPI(`/api/opportunities/${opportunityId}`);
    const breakdown = match.scoreBreakdown || {};
    const penaltyInfo = breakdown.verificationMultiplierPolicy || {};

    return `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- DEMO STEPS 4 & 5 CALLOUT BANNER -->
        <div class="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">4 & 5</div>
            <div>
              <h3 class="text-sm font-bold text-slate-900">DEMO STEP 4 & 5: Explainable AI Match & 1-Click Gap Bridge</h3>
              <p class="text-xs text-slate-600">Inspect cryptographic hashes behind every skill requirement or click <strong class="text-blue-700 font-semibold">[Bridge Gap]</strong> on missing skills to launch targeted starter repos.</p>
            </div>
          </div>
          <button onclick="App.runDemoStep(6)" class="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5 shrink-0">
            Next: Recruiter Blind Mode <i class="fa-solid fa-arrow-right text-[10px]"></i>
          </button>
        </div>

        <!-- HERO MATCH HEADER -->
        <div class="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-8 text-white shadow-xl mb-8 relative overflow-hidden">
          <div class="absolute -right-10 -bottom-10 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl"></div>

          <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div>
              <div class="flex items-center gap-2 mb-2">
                <span class="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider">
                  <i class="fa-solid fa-eye mr-1"></i> Explainable AI Recommendation
                </span>
                <span class="text-xs text-blue-200">Candidate: <strong class="text-white font-mono">${match.anonymizedId}</strong></span>
              </div>
              <h1 class="text-3xl font-extrabold text-white tracking-tight">${opp.title}</h1>
              <p class="text-sm text-blue-200 mt-1">${opp.company} • ${opp.location} • Stipend: ${opp.stipend}</p>
            </div>

            <div class="flex items-center gap-4 bg-white/10 backdrop-blur-md p-5 rounded-3xl border border-white/10 shrink-0">
              <div class="text-center">
                <div class="text-5xl font-extrabold text-emerald-400" id="live-match-score">${match.matchScore}%</div>
                <div class="text-[11px] text-blue-200 uppercase font-semibold tracking-wider mt-0.5">Verified Match</div>
              </div>
            </div>
          </div>
        </div>

        <!-- TRANSPARENCY PENALTY NOTE BANNER -->
        <div class="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 mb-8 flex items-center justify-between gap-3 shadow-sm">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-xl bg-amber-200/80 text-amber-800 flex items-center justify-center font-bold text-sm shrink-0">
              <i class="fa-solid fa-scale-unbalanced"></i>
            </div>
            <div>
              <div class="text-xs font-bold uppercase tracking-wider text-amber-800">Scoring Weight Verification Policy</div>
              <p class="text-xs font-semibold text-amber-900 mt-0.5">
                ${penaltyInfo.transparencyPenaltyNote || 'Match score adjusted by -12% due to unverified self-reported skills.'}
              </p>
            </div>
          </div>
          <span class="px-3 py-1 rounded-full bg-amber-200 text-amber-900 text-[11px] font-mono font-bold shrink-0">
            0.3x Weight Applied
          </span>
        </div>

        <!-- INTERACTIVE FACTOR WEIGHT ADJUSTER SLIDERS -->
        <div class="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm mb-8">
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6">
            <div>
              <h2 class="text-base font-bold text-slate-900">Interactive 5-Factor Scoring Model (Verified 1.0x vs Unverified 0.3x)</h2>
              <p class="text-xs text-slate-500">Drag sliders to test custom evaluation weights in real-time.</p>
            </div>
            <button onclick="App.resetMatchWeights('${opportunityId}')" class="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors">
              Reset Default Weights
            </button>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <!-- Slider 1: Skill Alignment -->
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div class="flex justify-between items-center text-xs font-semibold mb-1">
                <span class="text-slate-600">Skill Alignment</span>
                <span id="label-w-skill" class="font-extrabold text-blue-600">45%</span>
              </div>
              <input type="range" id="slider-w-skill" min="10" max="70" value="45" oninput="App.recalculateWeightsLive('${opportunityId}')" class="w-full mt-2 accent-blue-600">
              <div class="mt-2 text-xl font-extrabold text-slate-900" id="val-skill">${breakdown.skillAlignment || 45}%</div>
              <p class="text-[10px] text-slate-400 mt-1">Direct skill match</p>
            </div>

            <!-- Slider 2: Evidence Strength -->
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div class="flex justify-between items-center text-xs font-semibold mb-1">
                <span class="text-slate-600">Evidence Strength</span>
                <span id="label-w-evidence" class="font-extrabold text-emerald-600">25%</span>
              </div>
              <input type="range" id="slider-w-evidence" min="10" max="60" value="25" oninput="App.recalculateWeightsLive('${opportunityId}')" class="w-full mt-2 accent-emerald-600">
              <div class="mt-2 text-xl font-extrabold text-slate-900" id="val-evidence">${breakdown.evidenceStrength || 25}%</div>
              <p class="text-[10px] text-slate-400 mt-1">Verified proofs & AST</p>
            </div>

            <!-- Slider 3: Project Relevance -->
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div class="flex justify-between items-center text-xs font-semibold mb-1">
                <span class="text-slate-600">Project Relevance</span>
                <span id="label-w-project" class="font-extrabold text-indigo-600">15%</span>
              </div>
              <input type="range" id="slider-w-project" min="5" max="50" value="15" oninput="App.recalculateWeightsLive('${opportunityId}')" class="w-full mt-2 accent-indigo-600">
              <div class="mt-2 text-xl font-extrabold text-slate-900" id="val-project">${breakdown.projectRelevance || 15}%</div>
              <p class="text-[10px] text-slate-400 mt-1">Domain repositories</p>
            </div>

            <!-- Slider 4: Credential Proofs -->
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div class="flex justify-between items-center text-xs font-semibold mb-1">
                <span class="text-slate-600">Credential Proofs</span>
                <span id="label-w-cred" class="font-extrabold text-purple-600">10%</span>
              </div>
              <input type="range" id="slider-w-cred" min="5" max="40" value="10" oninput="App.recalculateWeightsLive('${opportunityId}')" class="w-full mt-2 accent-purple-600">
              <div class="mt-2 text-xl font-extrabold text-slate-900" id="val-cred">${breakdown.credentialVerification || 10}%</div>
              <p class="text-[10px] text-slate-400 mt-1">W3C VC & certs</p>
            </div>

            <!-- Slider 5: Hackathon Track -->
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div class="flex justify-between items-center text-xs font-semibold mb-1">
                <span class="text-slate-600">Hackathon Track</span>
                <span id="label-w-exp" class="font-extrabold text-amber-600">5%</span>
              </div>
              <input type="range" id="slider-w-exp" min="0" max="30" value="5" oninput="App.recalculateWeightsLive('${opportunityId}')" class="w-full mt-2 accent-amber-600">
              <div class="mt-2 text-xl font-extrabold text-slate-900" id="val-exp">${breakdown.experienceRelevance || 5}%</div>
              <p class="text-[10px] text-slate-400 mt-1">Hackathon verdicts</p>
            </div>
          </div>
        </div>

        <!-- EVIDENCE TRACEABILITY MATRIX (GRANULAR PROOF TABLE) -->
        <div class="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-8">
          <div class="p-6 border-b border-slate-200 bg-slate-50 flex items-center justify-between flex-wrap gap-2">
            <div>
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-blue-600"></span>
                <h2 class="text-base font-bold text-slate-900">Evidence Traceability Matrix</h2>
              </div>
              <p class="text-xs text-slate-500 mt-0.5">Direct cryptographic proof mapping showing exact repositories, academic grades, and hash anchors.</p>
            </div>
            <span class="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
              W3C VC Anchored
            </span>
          </div>

          <div class="divide-y divide-slate-100">
            ${(match.matchedSkills || []).map(skill => `
              <div class="p-6 hover:bg-slate-50/50 transition-colors">
                <div class="flex flex-col lg:flex-row items-start justify-between gap-4">
                  <div class="flex-1">
                    <div class="flex items-center gap-2.5 mb-2 flex-wrap">
                      <span class="text-base font-bold text-slate-900">${skill.name}</span>
                      ${Utils.renderLevelBadge(skill.candidateLevel)}
                      <span class="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-lg">
                        Required: ${skill.requiredLevel} ✓
                      </span>
                      <span class="text-xs font-bold ${skill.isVerified !== false ? 'text-emerald-600 bg-emerald-50 border border-emerald-200' : 'text-amber-600 bg-amber-50 border border-amber-200'} px-2 py-0.5 rounded flex items-center gap-1">
                        <i class="fa-solid ${skill.isVerified !== false ? 'fa-shield-halved text-emerald-600' : 'fa-triangle-exclamation text-amber-600'} text-[10px]"></i>
                        ${skill.isVerified !== false ? '1.0x Weight (Verified)' : '0.3x Weight (Self-Claimed)'}
                      </span>
                    </div>

                    <!-- Granular Supporting Evidence Grid -->
                    <div class="mt-4 space-y-2">
                      <div class="text-xs font-bold text-slate-500 uppercase tracking-wider">Exact Cryptographic Sources (${(skill.evidenceTraces || []).length || skill.evidenceCount}):</div>
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                        ${(skill.evidenceTraces || []).map(trace => `
                          <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs hover:bg-blue-50/30 transition-colors">
                            <div class="flex items-center justify-between">
                              <span class="font-bold text-blue-700">${trace.type}</span>
                              <span class="text-[10px] text-emerald-600 font-semibold font-mono bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Proof Valid ✓</span>
                            </div>
                            <div class="font-semibold text-slate-900 mt-1">${trace.title}</div>
                            <div class="text-[11px] text-slate-500 mt-0.5">Source: <strong class="text-slate-700">${trace.source}</strong></div>
                            
                            <div class="mt-2 pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] font-mono text-slate-500">
                              <span>Hash: ${Utils.truncateHash(trace.proofHash, 8, 6)}</span>
                              <a href="#/verify/${trace.proofHash || 'VP-2026-IND-1042'}" class="text-blue-600 hover:underline font-sans font-semibold">Verify &rarr;</a>
                            </div>
                          </div>
                        `).join("")}
                      </div>
                    </div>
                  </div>

                  <div class="text-right shrink-0">
                    <div class="text-3xl font-extrabold text-blue-700">${skill.confidence}%</div>
                    <div class="text-[11px] text-slate-500">Demonstrated Confidence</div>
                  </div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- SKILL GAP & ACTIONABLE 1-CLICK BRIDGE LABS -->
        <div class="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-8" id="skill-gap-section">
          <div class="p-6 border-b border-slate-200 bg-amber-50/50 flex items-center justify-between flex-wrap gap-2">
            <div>
              <h2 class="text-base font-bold text-amber-950">Actionable Skill Gap Analysis & 1-Click Bridge Labs</h2>
              <p class="text-xs text-amber-800">Launch targeted starter repositories or containerization labs to bridge missing requirements.</p>
            </div>
            <span class="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">1-Click Bridge Ready</span>
          </div>

          <div class="p-6 md:p-8">
            <div class="space-y-4 mb-6">
              ${(match.missingSkills || []).map(gap => `
                <div class="p-5 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div class="flex-1">
                    <div class="flex items-center gap-2 flex-wrap">
                      <span class="text-base font-bold text-slate-900">${gap.name}</span>
                      <span class="px-2 py-0.5 rounded text-xs font-bold ${gap.gapSeverity === 'High' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}">
                        ${gap.gapSeverity} Gap
                      </span>
                      <span class="text-xs text-slate-500">Required: <strong>${gap.requiredLevel}</strong> • Candidate: <strong>${gap.candidateLevel}</strong></span>
                    </div>

                    <p class="text-xs text-slate-700 mt-2"><i class="fa-solid fa-arrow-right text-blue-600 mr-1.5"></i> ${gap.remediationAction}</p>
                    
                    ${gap.bridgeAction ? `
                      <div class="mt-2 text-xs text-blue-700 font-semibold flex items-center gap-2">
                        <i class="fa-solid fa-flask-vial text-purple-600"></i> ${gap.bridgeAction.title} (~${gap.bridgeAction.estimatedHours} hrs)
                        <span class="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded text-[10px]">${gap.bridgeAction.rewardConfidence}</span>
                      </div>
                    ` : ''}
                  </div>

                  <div class="shrink-0">
                    <button onclick="App.openBridgeGapModal('${gap.name}', '${gap.bridgeAction?.title || gap.remediationAction}', '${gap.bridgeAction?.estimatedHours || 6}', '${gap.bridgeAction?.rewardConfidence || "+35%"}')" class="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 hover:scale-105 active:scale-95">
                      <i class="fa-solid fa-rocket text-amber-300"></i> Bridge Gap
                    </button>
                  </div>
                </div>
              `).join("")}
            </div>

            <!-- IMPROVE MY MATCH INTERACTIVE SIMULATION -->
            <div class="p-6 rounded-3xl bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 class="text-sm font-bold text-slate-900">Simulate Completing Docker & AWS Gap Labs</h3>
                <p class="text-xs text-slate-600 mt-1">See how ingesting a containerized Docker + AWS deployment project boosts match score from <strong>91% to 97%</strong>.</p>
              </div>

              <button onclick="App.simulateImproveMatch()" id="btn-improve-match" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md shadow-blue-500/25 transition-all flex items-center gap-2 shrink-0">
                <i class="fa-solid fa-rocket"></i> Improve My Match (Live Simulation)
              </button>
            </div>
          </div>
        </div>

        <!-- BRIDGE GAP MODAL -->
        <div id="bridge-gap-modal" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 hidden items-center justify-center p-4">
          <div class="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200" id="bridge-gap-modal-content">
            <!-- Rendered via App.openBridgeGapModal() -->
          </div>
        </div>
      </div>
    `;
  }
};
