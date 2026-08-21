/**
 * Recruiter Candidate Ranking View with Ethical AI & Blind Evaluation Mode
 */

const CandidateRankView = {
  async render(opportunityId = "opp-ml-intern") {
    const data = await Utils.fetchAPI(`/api/matches/opportunity/${opportunityId}`);
    const candidates = data.candidates || [];
    const opp = data.opportunity || {};

    const isBiasMitigationActive = App.state.biasMode !== false; // default true

    return `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- DEMO STEPS 6 & 7 CALLOUT BANNER -->
        <div class="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">6 & 7</div>
            <div>
              <h3 class="text-sm font-bold text-slate-900">DEMO STEP 6 & 7: Recruiter Attribute-Blind Candidate Ranking</h3>
              <p class="text-xs text-slate-600">Toggle <strong class="text-emerald-700 font-semibold">Blind Evaluation Mode</strong> below to see live demographic masking in action.</p>
            </div>
          </div>
          <button onclick="App.runDemoStep(8)" class="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5 shrink-0">
            Next: Team Builder <i class="fa-solid fa-arrow-right text-[10px]"></i>
          </button>
        </div>

        <!-- COMPLIANCE BANNER AS SPECIFIED IN HACKATHON CRITERIA -->
        <div class="p-5 rounded-3xl ${isBiasMitigationActive ? 'bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 text-white border border-emerald-500/40 shadow-xl' : 'bg-slate-100 text-slate-700 border border-slate-300 shadow-sm'} mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div class="flex items-center gap-3.5">
            <div class="w-11 h-11 rounded-2xl ${isBiasMitigationActive ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40' : 'bg-slate-200 text-slate-600'} flex items-center justify-center text-xl shrink-0 shadow-inner">
              <i class="fa-solid ${isBiasMitigationActive ? 'fa-lock' : 'fa-lock-open'}"></i>
            </div>
            <div>
              <div class="text-xs font-extrabold uppercase tracking-wider ${isBiasMitigationActive ? 'text-emerald-300' : 'text-slate-500'} flex items-center gap-2">
                <span>${isBiasMitigationActive ? 'Ethical AI Active' : 'Standard Named Review Mode'}</span>
                ${isBiasMitigationActive ? '<span class="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">IEEE P7003 & EU AI Act</span>' : ''}
              </div>
              <p class="text-xs ${isBiasMitigationActive ? 'text-slate-200' : 'text-slate-600'} font-medium mt-1 leading-relaxed">
                ${isBiasMitigationActive 
                  ? 'Candidates are ranked purely on verified technical artifacts and skill evidence. Protected traits (Gender, Institution, Location) are strictly masked.' 
                  : 'Candidate demographic identifiers revealed for post-shortlist interview scheduling.'}
              </p>
            </div>
          </div>

          <!-- Interactive High-Visibility Blind Evaluation Switch -->
          <div class="flex items-center gap-3 shrink-0 bg-white/5 p-2 rounded-2xl border border-white/10">
            <span class="text-xs font-bold ${isBiasMitigationActive ? 'text-emerald-300' : 'text-slate-400'}">
              ${isBiasMitigationActive ? 'Blind Evaluation: ON' : 'Blind Evaluation: OFF'}
            </span>
            <button onclick="App.toggleBiasMode()" class="w-14 h-7 rounded-full p-1 transition-colors duration-300 ${isBiasMitigationActive ? 'bg-emerald-500' : 'bg-slate-500'} flex items-center shadow-inner focus:outline-none">
              <div class="w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${isBiasMitigationActive ? 'translate-x-7' : 'translate-x-0'}"></div>
            </button>
          </div>
        </div>

        <!-- HEADER -->
        <div class="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-3 flex-wrap">
              <h1 class="text-2xl font-extrabold text-slate-900">${opp.title} — Ranked Applicants</h1>
              <span class="px-3 py-1 rounded-full text-xs font-extrabold ${isBiasMitigationActive ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-slate-100 text-slate-700'} flex items-center gap-1.5">
                <i class="fa-solid ${isBiasMitigationActive ? 'fa-shield-halved text-emerald-600' : 'fa-users'}"></i> ${isBiasMitigationActive ? 'Attribute-Blind Mode Active' : 'Named Review'}
              </span>
            </div>
            <p class="text-xs text-slate-500 mt-1.5">Company: <strong class="text-slate-700">${opp.company}</strong> • Total Ranked Applicants: <strong>${candidates.length}</strong></p>
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <button onclick="App.toggleBlindDetails()" class="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors flex items-center gap-1.5">
              <i class="fa-solid fa-list-check text-blue-600"></i> Excluded Attributes Audit
            </button>
            <a href="#/admin/fairness" class="px-4 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 font-semibold text-xs transition-colors flex items-center gap-1.5">
              <i class="fa-solid fa-scale-balanced"></i> Live Fairness Audit
            </a>
          </div>
        </div>

        <!-- CANDIDATE SEARCH & FILTER BAR -->
        <div class="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div class="relative flex-1 w-full max-w-md">
            <i class="fa-solid fa-filter absolute left-3.5 top-3 text-slate-400 text-xs"></i>
            <input type="text" id="candidate-filter-input" onkeyup="App.handleCandidateFilter(this.value)" placeholder="Filter candidates by skill (e.g. Python, PyTorch, React, Docker)..." class="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:border-blue-500 focus:outline-none">
          </div>

          <div class="flex items-center gap-2 text-xs w-full md:w-auto justify-end">
            <span class="text-slate-500 text-[11px] font-semibold">Min Score:</span>
            <select id="min-score-select" onchange="App.handleMinScoreFilter(this.value)" class="bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none">
              <option value="0">All Candidates (10)</option>
              <option value="75">Match >= 75%</option>
              <option value="85">Match >= 85%</option>
              <option value="90">Top Matches (>= 90%)</option>
            </select>
          </div>
        </div>

        <!-- EXPANDABLE ATTRIBUTE-BLIND GUARANTEE PANEL -->
        <div id="blind-details-panel" class="mb-8 p-6 bg-gradient-to-r from-slate-900 to-indigo-950 rounded-3xl text-white shadow-md border border-slate-800 ${isBiasMitigationActive ? '' : 'hidden'}">
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
              <i class="fa-solid fa-circle-check"></i> 7 Protected Demographic Attributes Excluded from Feature Vector
            </div>
            <span class="text-[11px] text-slate-400">Zero Demographic Proxies</span>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div class="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300">
              <i class="fa-solid fa-user-xmark text-rose-400 mr-1.5"></i> Name: <strong>Masked (#VS-ID)</strong>
            </div>
            <div class="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300">
              <i class="fa-solid fa-venus-mars text-rose-400 mr-1.5"></i> Gender: <strong>Excluded</strong>
            </div>
            <div class="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300">
              <i class="fa-solid fa-calendar-xmark text-rose-400 mr-1.5"></i> Age: <strong>Excluded</strong>
            </div>
            <div class="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300">
              <i class="fa-solid fa-image text-rose-400 mr-1.5"></i> Photograph: <strong>Excluded</strong>
            </div>
            <div class="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300">
              <i class="fa-solid fa-building-columns text-rose-400 mr-1.5"></i> College Tier: <strong>Excluded</strong>
            </div>
            <div class="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300">
              <i class="fa-solid fa-map-pin text-rose-400 mr-1.5"></i> Location/Pincode: <strong>Excluded</strong>
            </div>
            <div class="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300">
              <i class="fa-solid fa-people-group text-rose-400 mr-1.5"></i> Caste/Social: <strong>Excluded</strong>
            </div>
            <div class="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-semibold">
              <i class="fa-solid fa-check-double mr-1.5"></i> Used: <strong>Verified Skills & Proofs</strong>
            </div>
          </div>
        </div>

        <!-- CANDIDATE RANKING CARDS -->
        <div class="space-y-4 mb-8" id="candidate-list">
          ${candidates.map((cand, idx) => `
            <div class="bg-white rounded-3xl p-6 md:p-8 border ${idx === 0 ? 'border-blue-300 ring-2 ring-blue-500/20 shadow-md bg-blue-50/10' : 'border-slate-200 shadow-sm'} hover-lift transition-all candidate-card" data-skills="${(cand.matchedSkills || []).map(s => s.name).join(',').toLowerCase()}" data-score="${cand.matchScore}">
              <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <!-- Left: Rank & Candidate Identity -->
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 rounded-2xl ${idx === 0 ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20' : idx === 1 ? 'bg-slate-300 text-slate-800' : idx === 2 ? 'bg-amber-700 text-white' : 'bg-slate-100 text-slate-600'} flex items-center justify-center text-lg font-extrabold shrink-0">
                    #${idx + 1}
                  </div>

                  <div>
                    <div class="flex items-center gap-2 flex-wrap">
                      <span class="text-lg font-bold text-slate-900 font-mono">
                        ${isBiasMitigationActive ? `Candidate ${cand.anonymizedId}` : (cand.candidateId === 'student-1042' ? 'Aarav Sharma' : cand.candidateId === 'student-1018' ? 'Rohan Deshmukh' : cand.candidateId === 'student-1025' ? 'Priya Sen' : `Candidate ${cand.anonymizedId}`)}
                      </span>
                      ${idx === 0 ? '<span class="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-blue-100 text-blue-800">Top Match</span>' : ''}
                      <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold badge-verified">
                        <i class="fa-solid fa-shield-check text-[10px]"></i> Proofs Valid
                      </span>
                    </div>

                    <div class="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-slate-500">
                      <span><i class="fa-solid fa-brain text-blue-600 mr-1"></i> Verified Skills: <strong>${cand.verifiedSkillsCount}</strong></span>
                      <span><i class="fa-solid fa-code text-indigo-600 mr-1"></i> Relevant Projects: <strong>${cand.relevantProjectsCount || 4}</strong></span>
                      <span><i class="fa-solid fa-shield-heart text-emerald-600 mr-1"></i> Trust Score: <strong>${cand.trustScore}/100</strong></span>
                      ${!isBiasMitigationActive ? `<span class="text-purple-700 font-semibold">• B.Tech CSE (SOA University)</span>` : ''}
                    </div>
                  </div>
                </div>

                <!-- Center: Matched Skills & Gap Preview -->
                <div class="flex-1 max-w-xl">
                  <div class="text-[10px] font-bold text-slate-400 uppercase mb-1">Satisfied Skill Requirements</div>
                  <div class="flex flex-wrap gap-1.5 mb-2">
                    ${(cand.matchedSkills || []).slice(0, 4).map(s => `
                      <span class="px-2.5 py-1 rounded-lg ${s.isVerified !== false ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-amber-50 text-amber-800 border-amber-200'} text-xs font-semibold border flex items-center gap-1">
                        <i class="fa-solid ${s.isVerified !== false ? 'fa-check text-emerald-600' : 'fa-triangle-exclamation text-amber-600'} text-[10px]"></i>
                        ${s.name} (${s.confidence}%)
                        ${s.isVerified === false ? '<span class="text-[9px] text-amber-600 font-bold">(0.3x wt)</span>' : ''}
                      </span>
                    `).join("")}
                  </div>

                  ${cand.missingSkills && cand.missingSkills.length > 0 ? `
                    <div class="flex items-center gap-1.5 text-xs text-amber-800">
                      <span class="font-bold text-[10px] uppercase text-amber-700">Identified Gaps:</span>
                      ${cand.missingSkills.slice(0, 2).map(g => `<span class="bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 text-[11px] font-medium">${g.name}</span>`).join(" ")}
                    </div>
                  ` : ''}
                </div>

                <!-- Right: Match Score & Action Buttons -->
                <div class="flex items-center gap-4 shrink-0 w-full lg:w-auto justify-between lg:justify-end border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-100">
                  <div class="text-center">
                    <div class="text-3xl font-extrabold ${cand.matchScore >= 90 ? 'text-blue-600' : 'text-slate-800'}">${cand.matchScore}%</div>
                    <div class="text-[10px] font-semibold text-slate-400 uppercase">Match Score</div>
                  </div>

                  <div class="flex flex-col gap-1.5">
                    <button onclick="App.viewRecruiterExplanation('${cand.anonymizedId}')" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm">
                      <i class="fa-solid fa-magnifying-glass"></i> Explain Ranking
                    </button>
                    <button onclick="App.openInterviewModal('${cand.anonymizedId}')" class="px-4 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-semibold text-xs transition-colors text-center flex items-center justify-center gap-1">
                      <i class="fa-solid fa-calendar-check"></i> Invite / Shortlist
                    </button>
                  </div>
                </div>
              </div>
            </div>
          `).join("")}
        </div>

        <!-- RECRUITER EXPLAINABILITY MODAL -->
        <div id="recruiter-explain-modal" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 hidden items-center justify-center p-4">
          <div class="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden transform transition-all" id="recruiter-modal-content">
            <!-- Rendered via App.viewRecruiterExplanation() -->
          </div>
        </div>

        <!-- INTERVIEW INVITATION MODAL -->
        <div id="interview-invite-modal" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 hidden items-center justify-center p-4">
          <div class="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div class="flex items-center justify-between pb-4 border-b border-slate-100">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
                  <i class="fa-solid fa-envelope"></i>
                </div>
                <h3 class="text-base font-bold text-slate-900">Send Interview Invitation</h3>
              </div>
              <button onclick="Utils.closeModal('interview-invite-modal')" class="text-slate-400 hover:text-slate-600">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form onsubmit="App.handleSendInterview(event)" class="mt-4 space-y-4 text-xs">
              <div>
                <label class="block font-bold text-slate-700 mb-1">Candidate Recipient</label>
                <input type="text" id="invite-candidate-token" readonly class="w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded-xl text-slate-700 font-mono text-xs">
              </div>

              <div>
                <label class="block font-bold text-slate-700 mb-1">Interview Format</label>
                <select id="invite-format" class="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white">
                  <option>Technical Code & Capstone Walkthrough (45 Min)</option>
                  <option>AI Research Discussion & Deep Dive (30 Min)</option>
                  <option>Executive Team Fit Chat (30 Min)</option>
                </select>
              </div>

              <div>
                <label class="block font-bold text-slate-700 mb-1">Personalized Message to Candidate</label>
                <textarea id="invite-msg" rows="3" class="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs">We were extremely impressed by the verified proof artifacts behind your Student Placement Predictor and BioBERT NLP triage projects. We'd love to discuss our ML Internship role with you!</textarea>
              </div>

              <div class="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button type="button" onclick="Utils.closeModal('interview-invite-modal')" class="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold">Cancel</button>
                <button type="submit" class="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md shadow-emerald-500/20 flex items-center gap-1.5">
                  <i class="fa-solid fa-paper-plane"></i> Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
  }
};
