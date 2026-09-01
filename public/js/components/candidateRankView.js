/**
 * VeriSkill — Stitch Recruiter Candidate Ranking View with Ethical AI & Blind Evaluation Mode
 */

const CandidateRankView = {
  async render(opportunityId = "opp-ml-intern") {
    const data = await Utils.fetchAPI(`/api/matches/opportunity/${opportunityId}`);
    const candidates = data.candidates || [];
    const opp = data.opportunity || {};

    const isBiasMitigationActive = App.state.biasMode !== false; // default true

    return `
      <div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-24 md:pt-28 pb-section-gap flex flex-col gap-stack-lg min-h-screen">
        
        <!-- DEMO STEPS 6 & 7 CALLOUT BANNER -->
        <div class="bg-secondary-fixed/30 border border-secondary-fixed rounded-2xl p-4 md:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div class="flex items-center gap-3.5">
            <div class="w-9 h-9 rounded-xl bg-secondary text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
              6 & 7
            </div>
            <div>
              <h3 class="font-headline-md text-base text-primary font-bold">DEMO STEP 6 & 7: Attribute-Blind Candidate Ranking & Deep Explainability</h3>
              <p class="font-body-md text-xs text-on-surface-variant mt-0.5">
                Toggle <strong class="text-secondary font-semibold">Blind Evaluation Mode</strong> to observe live demographic masking and explainable multi-factor scoring.
              </p>
            </div>
          </div>
          <button type="button" onclick="App.runDemoStep(8)" class="px-4 py-2 rounded-full bg-primary-container text-on-primary hover:bg-primary font-label-md text-xs transition-all shadow-sm flex items-center gap-1.5 shrink-0 cursor-pointer">
            <span>Next: Team Builder</span>
            <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>

        <!-- COMPLIANCE BANNER AS SPECIFIED IN HACKATHON CRITERIA -->
        <section class="p-6 rounded-3xl ${isBiasMitigationActive ? 'bg-primary-container text-on-primary border border-primary/20 shadow-[0_8px_30px_rgba(0,0,0,0.12)]' : 'bg-surface-container-low text-primary border border-surface-variant/40 shadow-sm'} flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative overflow-hidden transition-all duration-300">
          <div class="flex items-center gap-4 relative z-10">
            <div class="w-12 h-12 rounded-2xl ${isBiasMitigationActive ? 'bg-white/10 text-white border border-white/20' : 'bg-surface-container text-on-surface-variant'} flex items-center justify-center text-2xl shrink-0 shadow-inner">
              <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">
                ${isBiasMitigationActive ? 'shield' : 'lock_open'}
              </span>
            </div>
            <div>
              <div class="font-label-md text-xs font-bold uppercase tracking-wider ${isBiasMitigationActive ? 'text-secondary-fixed' : 'text-on-surface-variant'} flex items-center gap-2">
                <span>${isBiasMitigationActive ? 'Ethical AI & Blind Evaluation Active' : 'Standard Named Review Mode'}</span>
                ${isBiasMitigationActive ? '<span class="px-2.5 py-0.5 rounded-full bg-secondary-container/20 text-secondary-fixed text-[10px] font-bold border border-secondary-container/40">IEEE P7003 & EU AI Act</span>' : ''}
              </div>
              <p class="font-body-md text-xs ${isBiasMitigationActive ? 'text-on-primary-container' : 'text-on-surface-variant'} mt-1 leading-relaxed">
                ${isBiasMitigationActive 
                  ? 'Candidates are ranked purely on verified technical artifacts and skill evidence. Protected traits (Gender, Institution, Location) are strictly quarantined.' 
                  : 'Candidate demographic identifiers revealed for post-shortlist interview scheduling.'}
              </p>
            </div>
          </div>

          <!-- Interactive High-Visibility Blind Evaluation Switch -->
          <div class="flex items-center gap-3 shrink-0 bg-white/10 p-2.5 rounded-2xl border border-white/15 relative z-10">
            <span class="font-label-md text-xs font-bold ${isBiasMitigationActive ? 'text-white' : 'text-on-surface-variant'}">
              ${isBiasMitigationActive ? 'Blind Mode: ON' : 'Blind Mode: OFF'}
            </span>
            <button type="button" onclick="App.toggleBiasMode()" class="w-14 h-7 rounded-full p-1 transition-colors duration-300 ${isBiasMitigationActive ? 'bg-secondary' : 'bg-outline-variant'} flex items-center shadow-inner focus:outline-none cursor-pointer">
              <div class="w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${isBiasMitigationActive ? 'translate-x-7' : 'translate-x-0'}"></div>
            </button>
          </div>
        </section>

        <!-- HEADER -->
        <section class="bg-surface-container-lowest rounded-2xl p-6 md:p-8 border border-surface-variant/40 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-3 flex-wrap">
              <h1 class="font-headline-lg-mobile md:font-headline-lg text-primary font-bold">${opp.title} — Ranked Applicants</h1>
              <span class="px-3 py-1 rounded-full text-xs font-label-md font-bold ${isBiasMitigationActive ? 'bg-secondary-fixed/50 text-secondary border border-secondary-fixed' : 'bg-surface-container text-on-surface-variant'} flex items-center gap-1.5">
                <span class="material-symbols-outlined text-[16px]" style="font-variation-settings: 'FILL' 1;">
                  ${isBiasMitigationActive ? 'verified' : 'groups'}
                </span>
                <span>${isBiasMitigationActive ? 'Attribute-Blind Mode Active' : 'Named Review'}</span>
              </span>
            </div>
            <p class="font-body-md text-xs text-on-surface-variant mt-1.5">Company: <strong class="text-primary">${opp.company}</strong> • Total Ranked Applicants: <strong>${candidates.length}</strong></p>
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <button type="button" onclick="App.toggleBlindDetails()" class="px-4 py-2 rounded-full bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-xs transition-colors flex items-center gap-1.5 cursor-pointer">
              <span class="material-symbols-outlined text-[16px] text-secondary">checklist</span>
              <span>Excluded Attributes Audit</span>
            </button>
            <a href="#/admin/fairness" class="px-4 py-2 rounded-full bg-secondary-fixed/40 hover:bg-secondary-fixed text-secondary border border-secondary-fixed font-label-md text-xs transition-colors flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[16px]">balance</span>
              <span>Live Fairness Audit</span>
            </a>
          </div>
        </section>

        <!-- CANDIDATE SEARCH & FILTER BAR -->
        <section class="bg-surface-container-lowest rounded-2xl p-4 border border-surface-variant/40 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div class="relative flex-1 w-full max-w-md">
            <span class="material-symbols-outlined absolute left-3.5 top-2.5 text-on-surface-variant text-[20px]">filter_list</span>
            <input type="text" id="candidate-filter-input" onkeyup="App.handleCandidateFilter(this.value)" placeholder="Filter candidates by skill (e.g. Python, PyTorch, React, Docker)..." class="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant/30 rounded-full text-xs text-primary focus:border-secondary focus:outline-none transition-all">
          </div>

          <div class="flex items-center gap-2 text-xs w-full md:w-auto justify-end">
            <span class="font-label-md text-on-surface-variant text-[11px] font-semibold">Min Score:</span>
            <select id="min-score-select" onchange="App.handleMinScoreFilter(this.value)" class="bg-surface-container-low border border-outline-variant/30 rounded-full px-3.5 py-1.5 text-xs font-label-md font-semibold text-primary focus:outline-none">
              <option value="0">All Candidates (10)</option>
              <option value="75">Match &gt;= 75%</option>
              <option value="85">Match &gt;= 85%</option>
              <option value="90">Top Matches (&gt;= 90%)</option>
            </select>
          </div>
        </section>

        <!-- EXPANDABLE ATTRIBUTE-BLIND GUARANTEE PANEL -->
        <section id="blind-details-panel" class="p-6 bg-surface-container-high rounded-2xl border border-outline-variant/30 ${isBiasMitigationActive ? '' : 'hidden'} transition-all">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-2 text-secondary font-label-md font-bold text-xs uppercase tracking-wider">
              <span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">check_circle</span>
              <span>7 Protected Demographic Attributes Quarantined from Feature Vector</span>
            </div>
            <span class="text-[11px] font-label-md text-on-surface-variant">Zero Demographic Proxies</span>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div class="p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/20 text-on-surface-variant flex items-center gap-2">
              <span class="material-symbols-outlined text-rose-500 text-[18px]">person_off</span>
              <div>Name: <strong class="text-primary block">Masked (#VS-ID)</strong></div>
            </div>
            <div class="p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/20 text-on-surface-variant flex items-center gap-2">
              <span class="material-symbols-outlined text-rose-500 text-[18px]">wc</span>
              <div>Gender: <strong class="text-primary block">Excluded</strong></div>
            </div>
            <div class="p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/20 text-on-surface-variant flex items-center gap-2">
              <span class="material-symbols-outlined text-rose-500 text-[18px]">cake</span>
              <div>Age: <strong class="text-primary block">Excluded</strong></div>
            </div>
            <div class="p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/20 text-on-surface-variant flex items-center gap-2">
              <span class="material-symbols-outlined text-rose-500 text-[18px]">image_not_supported</span>
              <div>Photograph: <strong class="text-primary block">Excluded</strong></div>
            </div>
            <div class="p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/20 text-on-surface-variant flex items-center gap-2">
              <span class="material-symbols-outlined text-rose-500 text-[18px]">domain</span>
              <div>College Tier: <strong class="text-primary block">Excluded</strong></div>
            </div>
            <div class="p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/20 text-on-surface-variant flex items-center gap-2">
              <span class="material-symbols-outlined text-rose-500 text-[18px]">location_off</span>
              <div>Location/Pincode: <strong class="text-primary block">Excluded</strong></div>
            </div>
            <div class="p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/20 text-on-surface-variant flex items-center gap-2">
              <span class="material-symbols-outlined text-rose-500 text-[18px]">group_off</span>
              <div>Caste/Social: <strong class="text-primary block">Excluded</strong></div>
            </div>
            <div class="p-3 rounded-xl bg-secondary-fixed/40 border border-secondary-fixed text-secondary font-semibold flex items-center gap-2">
              <span class="material-symbols-outlined text-secondary text-[18px]" style="font-variation-settings: 'FILL' 1;">verified</span>
              <div>Used: <strong class="block">Verified Code & AST</strong></div>
            </div>
          </div>
        </section>

        <!-- CANDIDATE RANKING CARDS -->
        <section class="space-y-4 mb-8" id="candidate-list">
          ${candidates.map((cand, idx) => `
            <div class="bg-surface-container-lowest rounded-2xl p-6 md:p-8 border ${idx === 0 ? 'border-secondary/40 ring-1 ring-secondary/20 shadow-[0_4px_24px_rgba(0,0,0,0.06)]' : 'border-surface-variant/40 shadow-[0_4px_20px_rgba(0,0,0,0.04)]'} hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 candidate-card" data-skills="${(cand.matchedSkills || []).map(s => s.name).join(',').toLowerCase()}" data-score="${cand.matchScore}">
              <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <!-- Left: Rank & Candidate Identity -->
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 rounded-2xl ${idx === 0 ? 'bg-primary text-white shadow-md' : idx === 1 ? 'bg-surface-container-high text-primary' : idx === 2 ? 'bg-surface-container text-on-surface-variant' : 'bg-surface-container-low text-outline'} flex items-center justify-center text-lg font-headline-md font-bold shrink-0">
                    #${idx + 1}
                  </div>

                  <div>
                    <div class="flex items-center gap-2 flex-wrap">
                      <span class="text-lg font-headline-md font-bold text-primary font-mono">
                        ${isBiasMitigationActive ? `Candidate ${cand.anonymizedId}` : (cand.candidateId === 'student-1042' ? 'Aarav Sharma' : cand.candidateId === 'student-1018' ? 'Rohan Deshmukh' : cand.candidateId === 'student-1025' ? 'Priya Sen' : `Candidate ${cand.anonymizedId}`)}
                      </span>
                      ${idx === 0 ? '<span class="px-2.5 py-0.5 rounded-full text-xs font-label-md font-bold bg-secondary-fixed/50 text-secondary border border-secondary-fixed">Top Match</span>' : ''}
                      <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-label-md font-semibold bg-secondary-fixed/40 text-secondary border border-secondary-fixed/50">
                        <span class="material-symbols-outlined text-[12px]" style="font-variation-settings: 'FILL' 1;">verified</span> Proofs Valid
                      </span>
                    </div>

                    <div class="flex flex-wrap items-center gap-3 mt-1.5 text-xs font-body-md text-on-surface-variant">
                      <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[14px] text-secondary">psychology</span> Skills: <strong class="text-primary">${cand.verifiedSkillsCount}</strong></span>
                      <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[14px] text-secondary">code</span> Projects: <strong class="text-primary">${cand.relevantProjectsCount || 4}</strong></span>
                      <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[14px] text-tertiary-fixed-dim" style="font-variation-settings: 'FILL' 1;">shield</span> Trust: <strong class="text-primary">${cand.trustScore}/100</strong></span>
                      ${!isBiasMitigationActive ? `<span class="text-secondary font-semibold">• B.Tech CSE (SOA University)</span>` : ''}
                    </div>
                  </div>
                </div>

                <!-- Center: Matched Skills & Gap Preview -->
                <div class="flex-1 max-w-xl">
                  <div class="text-[10px] font-label-md font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">Satisfied Skill Requirements</div>
                  <div class="flex flex-wrap gap-1.5 mb-2">
                    ${(cand.matchedSkills || []).slice(0, 4).map(s => `
                      <span class="px-2.5 py-0.5 rounded-full ${s.isVerified !== false ? 'bg-secondary-fixed/30 text-secondary border-secondary-fixed/50' : 'bg-amber-50 text-amber-800 border-amber-200'} text-xs font-label-md font-semibold border flex items-center gap-1">
                        <span class="material-symbols-outlined text-[12px]" style="font-variation-settings: 'FILL' 1;">${s.isVerified !== false ? 'check_circle' : 'warning'}</span>
                        <span>${s.name} (${s.confidence}%)</span>
                        ${s.isVerified === false ? '<span class="text-[9px] text-amber-700 font-bold">(0.3x wt)</span>' : ''}
                      </span>
                    `).join("")}
                  </div>

                  ${cand.missingSkills && cand.missingSkills.length > 0 ? `
                    <div class="flex items-center gap-1.5 text-xs text-amber-800 font-body-md">
                      <span class="font-bold text-[10px] uppercase font-label-md">Identified Gaps:</span>
                      ${cand.missingSkills.slice(0, 2).map(g => `<span class="bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 text-[11px] font-medium">${g.name}</span>`).join(" ")}
                    </div>
                  ` : ''}
                </div>

                <!-- Right: Match Score & Action Buttons -->
                <div class="flex items-center gap-4 shrink-0 w-full lg:w-auto justify-between lg:justify-end border-t lg:border-t-0 pt-4 lg:pt-0 border-surface-variant/30">
                  <div class="text-center">
                    <div class="font-display-lg text-3xl font-bold ${cand.matchScore >= 90 ? 'text-secondary' : 'text-primary'}">${cand.matchScore}%</div>
                    <div class="text-[10px] font-label-md font-semibold text-on-surface-variant uppercase">Match Score</div>
                  </div>

                  <div class="flex flex-col gap-1.5">
                    <button type="button" onclick="App.viewRecruiterExplanation('${cand.anonymizedId}')" class="px-4 py-2 rounded-full bg-primary-container hover:bg-primary text-on-primary font-label-md text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer">
                      <span class="material-symbols-outlined text-[16px]">visibility</span>
                      <span>Explain Ranking</span>
                    </button>
                    <button type="button" onclick="App.openInterviewModal('${cand.anonymizedId}')" class="px-4 py-1.5 rounded-full bg-secondary-fixed/40 hover:bg-secondary-fixed text-secondary border border-secondary-fixed font-label-md text-xs transition-all text-center flex items-center justify-center gap-1 cursor-pointer">
                      <span class="material-symbols-outlined text-[16px]">mail</span>
                      <span>Invite Candidate</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          `).join("")}
        </section>

        <!-- RECRUITER EXPLAINABILITY MODAL -->
        <div id="recruiter-explain-modal" class="fixed inset-0 bg-primary/40 backdrop-blur-sm z-50 hidden items-center justify-center p-4">
          <div class="bg-surface-container-lowest rounded-3xl max-w-2xl w-full shadow-2xl border border-surface-variant/50 overflow-hidden transform transition-all" id="recruiter-modal-content">
            <!-- Rendered via App.viewRecruiterExplanation() -->
          </div>
        </div>

        <!-- INTERVIEW INVITATION MODAL -->
        <div id="interview-invite-modal" class="fixed inset-0 bg-primary/40 backdrop-blur-sm z-50 hidden items-center justify-center p-4">
          <div class="bg-surface-container-lowest rounded-3xl max-w-md w-full p-6 md:p-8 shadow-2xl border border-surface-variant/50">
            <div class="flex items-center justify-between pb-4 border-b border-surface-variant/40">
              <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-xl bg-secondary-fixed text-secondary flex items-center justify-center font-bold text-sm">
                  <span class="material-symbols-outlined text-[20px]">mail</span>
                </div>
                <h3 class="font-headline-md text-base font-bold text-primary">Send Interview Invitation</h3>
              </div>
              <button type="button" onclick="Utils.closeModal('interview-invite-modal')" class="text-on-surface-variant hover:text-primary cursor-pointer">
                <span class="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onsubmit="App.handleSendInterview(event)" class="mt-4 space-y-4 text-xs">
              <div>
                <label class="block font-label-md font-bold text-primary mb-1">Candidate Token</label>
                <input type="text" id="invite-candidate-token" readonly class="w-full px-3.5 py-2.5 bg-surface-container border border-outline-variant/30 rounded-xl text-primary font-mono text-xs focus:outline-none">
              </div>

              <div>
                <label class="block font-label-md font-bold text-primary mb-1">Interview Format</label>
                <select id="invite-format" class="w-full px-3.5 py-2.5 border border-outline-variant/40 rounded-xl text-xs bg-surface-container-lowest text-primary focus:border-secondary focus:outline-none">
                  <option>Technical Code & Capstone Walkthrough (45 Min)</option>
                  <option>AI Research Discussion & Deep Dive (30 Min)</option>
                  <option>Executive Team Fit Chat (30 Min)</option>
                </select>
              </div>

              <div>
                <label class="block font-label-md font-bold text-primary mb-1">Personalized Message</label>
                <textarea id="invite-msg" rows="3" class="w-full px-3.5 py-2.5 border border-outline-variant/40 rounded-xl text-xs bg-surface-container-lowest text-primary focus:border-secondary focus:outline-none">We were extremely impressed by the verified proof artifacts behind your Student Placement Predictor and BioBERT NLP triage projects. We'd love to discuss our ML Internship role with you!</textarea>
              </div>

              <div class="pt-3 flex justify-end gap-2 border-t border-surface-variant/40">
                <button type="button" onclick="Utils.closeModal('interview-invite-modal')" class="px-4 py-2 rounded-full bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-xs cursor-pointer">Cancel</button>
                <button type="submit" class="px-5 py-2 rounded-full bg-primary-container hover:bg-primary text-on-primary font-label-md font-bold text-xs shadow-sm flex items-center gap-1.5 cursor-pointer">
                  <span class="material-symbols-outlined text-[16px]">send</span>
                  <span>Send Invitation</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
  }
};
