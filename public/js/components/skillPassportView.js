/**
 * Verifiable Skill Passport View (Two-Tier Verified vs. Self-Reported Skill Distinction)
 */

const SkillPassportView = {
  async render(studentId = "student-1042") {
    const student = await Utils.fetchAPI(`/api/students/${studentId}`);
    const allSkills = student.skills || [];

    const verifiedSkills = allSkills.filter(s => s.verificationStatus === "VERIFIED");
    const unverifiedSkills = allSkills.filter(s => s.verificationStatus !== "VERIFIED");

    return `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- DEMO STEP 2 CALLOUT BANNER -->
        <div class="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">2</div>
            <div>
              <h3 class="text-sm font-bold text-slate-900">DEMO STEP 2: Verifiable Skill Passport & Verification Multipliers</h3>
              <p class="text-xs text-slate-600">Notice the strict distinction between <strong class="text-emerald-700 font-semibold">Cryptographically Verified Skills (1.0x Weight)</strong> vs <strong class="text-amber-800 font-semibold">Self-Reported Skills (0.3x Weight Discount)</strong>.</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button onclick="Utils.openModal('add-skill-modal')" class="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5">
              <i class="fa-solid fa-plus"></i> Add Skill
            </button>
            <button onclick="App.runDemoStep(3)" class="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5">
              Next: Match 91% <i class="fa-solid fa-arrow-right text-[10px]"></i>
            </button>
          </div>
        </div>

        <!-- PASSPORT HEADER -->
        <div class="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-3 flex-wrap">
              <h1 class="text-2xl font-extrabold text-slate-900">Verifiable Skill Passport</h1>
              <span class="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 font-mono">
                ${student.passportId}
              </span>
              <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold badge-verified">
                <i class="fa-solid fa-shield-check mr-1"></i> Root Verified
              </span>
            </div>
            <p class="text-xs text-slate-500 mt-1.5">
              Holder: <strong class="text-slate-800">${student.personal?.fullName}</strong> • Anonymized Recruiter Token: <strong class="font-mono text-blue-600">${student.anonymizedId}</strong>
            </p>
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <button onclick="Utils.openModal('add-skill-modal')" class="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center gap-2">
              <i class="fa-solid fa-plus-circle"></i> + Add Custom Skill
            </button>
            <button onclick="Utils.openModal('add-cred-modal')" class="px-4 py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 font-bold text-xs transition-colors flex items-center gap-2">
              <i class="fa-solid fa-certificate"></i> + Add Certificate
            </button>
            <button onclick="App.exportPassportVC('${student.id}')" class="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs border border-slate-300 shadow-sm transition-colors flex items-center gap-2">
              <i class="fa-solid fa-file-code text-blue-600"></i> Export JSON-LD
            </button>
          </div>
        </div>

        <!-- 2-TIER VERIFICATION METRICS SUMMARY -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <!-- Tier 1: Verified -->
          <div class="bg-gradient-to-br from-emerald-950 to-slate-900 rounded-3xl p-6 text-white border border-emerald-500/30 shadow-lg">
            <div class="flex items-center justify-between mb-2">
              <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                <i class="fa-solid fa-shield-halved text-emerald-400"></i> Cryptographically Verified Skills
              </span>
              <span class="text-xs font-bold text-emerald-400 font-mono">1.0x Weight Factor</span>
            </div>
            <div class="flex items-baseline gap-3 mt-3">
              <div class="text-4xl font-extrabold text-white">${verifiedSkills.length}</div>
              <div class="text-xs text-emerald-200">Backed by repository commits, AST analysis, & course records.</div>
            </div>
          </div>

          <!-- Tier 2: Self-Reported -->
          <div class="bg-gradient-to-br from-slate-900 to-amber-950 rounded-3xl p-6 text-white border border-amber-500/30 shadow-lg">
            <div class="flex items-center justify-between mb-2">
              <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                <i class="fa-solid fa-user-pen text-amber-400"></i> Self-Reported / Unverified Claims
              </span>
              <span class="text-xs font-bold text-amber-400 font-mono">0.3x Weight (70% Discount)</span>
            </div>
            <div class="flex items-baseline gap-3 mt-3">
              <div class="text-4xl font-extrabold text-white">${unverifiedSkills.length}</div>
              <div class="text-xs text-amber-200">Awaiting repository audit or institutional signature.</div>
            </div>
          </div>
        </div>

        <!-- VERIFIED SKILLS SECTION -->
        <div class="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-8">
          <div class="p-6 border-b border-slate-200 bg-emerald-50/50 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div>
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-emerald-500"></span>
                <h2 class="text-base font-bold text-emerald-950">Cryptographically Verified Skills (${verifiedSkills.length})</h2>
              </div>
              <p class="text-xs text-emerald-800 mt-0.5">Anchored with immutable SHA-256 signatures. Ingested into matching engine at full 1.0x weight.</p>
            </div>

            <div class="relative flex-1 max-w-xs">
              <i class="fa-solid fa-magnifying-glass absolute left-3.5 top-3 text-slate-400 text-xs"></i>
              <input type="text" onkeyup="App.handleSkillSearch(this.value)" placeholder="Search verified skills..." class="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-xs focus:border-emerald-500 focus:outline-none">
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead class="bg-slate-100/75 text-slate-600 text-xs uppercase tracking-wider font-semibold">
                <tr>
                  <th class="py-3.5 px-6">Skill Name</th>
                  <th class="py-3.5 px-4">Proficiency</th>
                  <th class="py-3.5 px-6">Confidence Meter</th>
                  <th class="py-3.5 px-4 text-center">Verified Proofs</th>
                  <th class="py-3.5 px-4">Cryptographic Hash Preview</th>
                  <th class="py-3.5 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 bg-white" id="passport-skills-tbody">
                ${verifiedSkills.map(skill => `
                  <tr class="hover:bg-emerald-50/30 transition-colors cursor-pointer skill-row" data-name="${skill.name.toLowerCase()}" data-category="${skill.category || ''}" onclick="App.viewSkillDetail('${skill.id || skill.name}')">
                    <td class="py-4 px-6 font-bold text-slate-900 flex items-center gap-2.5">
                      <div class="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></div>
                      <span class="text-sm">${skill.name}</span>
                    </td>
                    <td class="py-4 px-4">
                      ${Utils.renderLevelBadge(skill.level)}
                    </td>
                    <td class="py-4 px-6">
                      <div class="flex items-center gap-3">
                        <div class="w-24 bg-slate-200 rounded-full h-2 overflow-hidden">
                          <div class="bg-emerald-600 h-2 rounded-full" style="width: ${skill.confidence}%"></div>
                        </div>
                        <span class="font-extrabold text-emerald-700 text-xs">${skill.confidence}%</span>
                      </div>
                    </td>
                    <td class="py-4 px-4 text-center">
                      <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <i class="fa-solid fa-file-shield text-[10px]"></i> ${skill.verifiedEvidenceCount || 1} proofs
                      </span>
                    </td>
                    <td class="py-4 px-4 font-mono text-[11px] text-slate-500">
                      <span class="bg-slate-100 px-2 py-0.5 rounded border border-slate-200 text-slate-700 font-mono" title="${skill.proofHash}">
                        ${Utils.truncateHash(skill.proofHash, 8, 6)}
                      </span>
                    </td>
                    <td class="py-4 px-6 text-right">
                      <button class="px-3 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold transition-colors">
                        Inspect &rarr;
                      </button>
                    </td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>

        <!-- UNVERIFIED / SELF-REPORTED SKILLS SECTION -->
        <div class="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-8">
          <div class="p-6 border-b border-slate-200 bg-amber-50/50 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div>
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-amber-500"></span>
                <h2 class="text-base font-bold text-amber-950">Self-Reported / Unverified Claims (${unverifiedSkills.length})</h2>
              </div>
              <p class="text-xs text-amber-800 mt-0.5">Calculated with a 70% weight discount (0.3x) during candidate ranking until evidence is attached.</p>
            </div>
            <a href="#/student/evidence" class="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-sm transition-colors flex items-center justify-center gap-1.5">
              <i class="fa-solid fa-cloud-arrow-up"></i> Ingest Evidence to Verify
            </a>
          </div>

          <div class="divide-y divide-slate-100">
            ${unverifiedSkills.map(skill => `
              <div class="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-amber-50/20 transition-colors">
                <div>
                  <div class="flex items-center gap-2">
                    <span class="text-base font-bold text-slate-900">${skill.name}</span>
                    ${Utils.renderLevelBadge(skill.level)}
                    <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold badge-self">
                      <i class="fa-solid fa-triangle-exclamation text-amber-600 mr-1"></i> Self-Claimed (0.3x wt)
                    </span>
                  </div>
                  <p class="text-xs text-slate-500 mt-1">Claimed confidence: <strong>${skill.confidence}%</strong> • Requires repository code commit or course certificate to unlock full 1.0x matching weight.</p>
                </div>

                <div class="flex items-center gap-2 shrink-0">
                  <a href="#/student/evidence" class="px-3.5 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold border border-blue-200 transition-colors flex items-center gap-1.5">
                    <i class="fa-solid fa-link"></i> Attach Proof
                  </a>
                </div>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- MODAL: ADD SKILL INTERACTIVELY -->
        <div id="add-skill-modal" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 hidden items-center justify-center p-4">
          <div class="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div class="flex items-center justify-between pb-4 border-b border-slate-100">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                  <i class="fa-solid fa-plus"></i>
                </div>
                <h3 class="text-base font-bold text-slate-900">Add Skill to Passport</h3>
              </div>
              <button onclick="Utils.closeModal('add-skill-modal')" class="text-slate-400 hover:text-slate-600">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form onsubmit="App.handleAddSkillSubmit(event)" class="mt-4 space-y-4 text-xs">
              <div class="p-3 bg-blue-50/75 rounded-xl border border-blue-200">
                <span class="text-[10px] font-bold uppercase tracking-wider text-blue-800 block mb-1.5">Quick Autofill Preset:</span>
                <div class="flex flex-wrap gap-1.5">
                  <button type="button" onclick="App.fillSkillPreset('FastAPI', 'Intermediate', 85, 'REST API Backend Capstone')" class="px-2 py-1 bg-white text-blue-700 rounded-md border border-blue-200 font-semibold text-[11px] hover:bg-blue-50">FastAPI (85%)</button>
                  <button type="button" onclick="App.fillSkillPreset('Kubernetes', 'Intermediate', 78, 'K8s Multi-cluster Deployment')" class="px-2 py-1 bg-white text-blue-700 rounded-md border border-blue-200 font-semibold text-[11px] hover:bg-blue-50">Kubernetes (78%)</button>
                  <button type="button" onclick="App.fillSkillPreset('Transformers', 'Advanced', 92, 'BioBERT Medical Sentiment Pipeline')" class="px-2 py-1 bg-white text-blue-700 rounded-md border border-blue-200 font-semibold text-[11px] hover:bg-blue-50">Transformers (92%)</button>
                  <button type="button" onclick="App.fillSkillPreset('Flutter', 'Intermediate', 80, 'Cross-Platform Mobile App')" class="px-2 py-1 bg-white text-blue-700 rounded-md border border-blue-200 font-semibold text-[11px] hover:bg-blue-50">Flutter (80%)</button>
                </div>
              </div>

              <div>
                <label class="block font-bold text-slate-700 mb-1">Skill Name</label>
                <input type="text" id="manual-skill-name" required placeholder="e.g. FastAPI, Docker, Next.js, Rust" class="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:border-blue-500 focus:outline-none text-sm">
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Proficiency Level</label>
                  <select id="manual-skill-level" class="w-full px-3 py-2 border border-slate-300 rounded-xl focus:border-blue-500 focus:outline-none text-xs bg-white">
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate" selected>Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>

                <div>
                  <label class="block font-bold text-slate-700 mb-1">Confidence Score: <span id="manual-conf-label" class="text-blue-600 font-bold">85%</span></label>
                  <input type="range" id="manual-skill-conf" min="50" max="99" value="85" oninput="document.getElementById('manual-conf-label').innerText = this.value + '%'" class="w-full mt-2 accent-blue-600">
                </div>
              </div>

              <div>
                <label class="block font-bold text-slate-700 mb-1">Supporting Project / Evidence Title</label>
                <input type="text" id="manual-skill-evidence" placeholder="e.g. Production Microservice Gateway Project" class="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:border-blue-500 focus:outline-none text-xs">
              </div>

              <div class="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button type="button" onclick="Utils.closeModal('add-skill-modal')" class="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold">Cancel</button>
                <button type="submit" class="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md shadow-blue-500/20 flex items-center gap-1.5">
                  <i class="fa-solid fa-plus"></i> Save to Passport
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- MODAL: ADD CREDENTIAL INTERACTIVELY -->
        <div id="add-cred-modal" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 hidden items-center justify-center p-4">
          <div class="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div class="flex items-center justify-between pb-4 border-b border-slate-100">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">
                  <i class="fa-solid fa-certificate"></i>
                </div>
                <h3 class="text-base font-bold text-slate-900">Add Verified Credential</h3>
              </div>
              <button onclick="Utils.closeModal('add-cred-modal')" class="text-slate-400 hover:text-slate-600">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form onsubmit="App.handleAddCredentialSubmit(event)" class="mt-4 space-y-4 text-xs">
              <div class="p-3 bg-purple-50/75 rounded-xl border border-purple-200">
                <span class="text-[10px] font-bold uppercase tracking-wider text-purple-800 block mb-1.5">Quick Autofill Sample:</span>
                <div class="flex flex-wrap gap-1.5">
                  <button type="button" onclick="App.fillCredPreset('AWS Certified Solutions Architect', 'Amazon Web Services (AWS)', 'AWS, Cloud Infrastructure, Docker')" class="px-2 py-1 bg-white text-purple-700 rounded-md border border-purple-200 font-semibold text-[11px] hover:bg-purple-50">AWS Architect</button>
                  <button type="button" onclick="App.fillCredPreset('Deep Learning Nanodegree', 'Udacity & NVIDIA', 'Deep Learning, PyTorch, Computer Vision')" class="px-2 py-1 bg-white text-purple-700 rounded-md border border-purple-200 font-semibold text-[11px] hover:bg-purple-50">Deep Learning (Udacity)</button>
                </div>
              </div>

              <div>
                <label class="block font-bold text-slate-700 mb-1">Credential Title</label>
                <input type="text" id="manual-cred-title" required placeholder="e.g. AWS Certified Developer Associate" class="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:border-purple-500 focus:outline-none text-sm">
              </div>

              <div>
                <label class="block font-bold text-slate-700 mb-1">Issuing Organization</label>
                <input type="text" id="manual-cred-issuer" required placeholder="e.g. Stanford Online, AWS, Meta, DeepLearning.AI" class="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:border-purple-500 focus:outline-none text-sm">
              </div>

              <div>
                <label class="block font-bold text-slate-700 mb-1">Skills Demonstrated (Comma Separated)</label>
                <input type="text" id="manual-cred-skills" required placeholder="e.g. AWS, Docker, Kubernetes, Cloud" class="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:border-purple-500 focus:outline-none text-xs">
              </div>

              <div class="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button type="button" onclick="Utils.closeModal('add-cred-modal')" class="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold">Cancel</button>
                <button type="submit" class="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold shadow-md shadow-purple-500/20 flex items-center gap-1.5">
                  <i class="fa-solid fa-shield-check"></i> Generate Proof & Anchor
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- EVIDENCE TRACE MODAL CONTAINER (Dynamic) -->
        <div id="skill-evidence-modal" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 hidden items-center justify-center p-4">
          <div class="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden transform transition-all" id="skill-modal-content">
            <!-- Rendered via App.viewSkillDetail() -->
          </div>
        </div>
      </div>
    `;
  }
};
