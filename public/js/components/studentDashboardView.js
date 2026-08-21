/**
 * Student Dashboard View (Demo Step 1)
 */

const StudentDashboardView = {
  async render(studentId = "student-1042") {
    const student = await Utils.fetchAPI(`/api/students/${studentId}`);
    const metrics = student.passportMetrics || {};

    return `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- DEMO STEP 1 CALLOUT BANNER -->
        <div class="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-4 flex items-center justify-between shadow-sm">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">1</div>
            <div>
              <h3 class="text-sm font-bold text-slate-900">DEMO STEP 1: Student Skill Passport Health</h3>
              <p class="text-xs text-slate-600">Showing verified candidate <strong class="text-blue-700">${student.personal?.fullName || "Aarav Sharma"}</strong> (${student.anonymizedId}) with portable credential ledger.</p>
            </div>
          </div>
          <button onclick="App.runDemoStep(2)" class="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5">
            Next: Skill Passport <i class="fa-solid fa-arrow-right text-[10px]"></i>
          </button>
        </div>

        <!-- PROFILE HEADER -->
        <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-2xl font-bold shadow-md shadow-blue-500/20">
              ${(student.personal?.fullName || "AS").split(" ").map(n => n[0]).join("")}
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h1 class="text-2xl font-extrabold text-slate-900">${student.personal?.fullName}</h1>
                <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 font-mono">
                  ${student.anonymizedId}
                </span>
                <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold badge-verified">
                  <i class="fa-solid fa-shield-check mr-1"></i> Passport Active
                </span>
              </div>
              <p class="text-xs text-slate-500 mt-1">
                ${student.personal?.degree} • ${student.personal?.institution} • Class of ${student.personal?.graduationYear}
              </p>
              <div class="flex items-center gap-3 mt-2 text-xs text-slate-500">
                <span><i class="fa-solid fa-passport text-blue-600 mr-1"></i> <strong>Passport ID:</strong> ${student.passportId}</span>
                <span><i class="fa-solid fa-fingerprint text-emerald-600 mr-1"></i> W3C Cryptographic Root Verified</span>
              </div>
            </div>
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <a href="#/student/evidence" class="px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-xs transition-colors border border-blue-200 flex items-center gap-1.5">
              <i class="fa-solid fa-plus-circle"></i> Ingest New Evidence
            </a>
            <a href="#/verify/${student.passportId}" class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-sm flex items-center gap-1.5">
              <i class="fa-solid fa-qrcode"></i> Public QR Verify
            </a>
          </div>
        </div>

        <!-- 5 KEY PASSPORT METRIC CARDS -->
        <div class="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <!-- Card 1: Passport Score -->
          <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover-lift">
            <div class="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span class="font-semibold uppercase tracking-wider">Passport Score</span>
              <i class="fa-solid fa-chart-line text-blue-600"></i>
            </div>
            <div class="text-3xl font-extrabold text-blue-600">${metrics.overallScore || 84}<span class="text-lg text-slate-400 font-normal">/100</span></div>
            <div class="mt-2 text-[11px] text-slate-500">Comprehensive readiness index</div>
          </div>

          <!-- Card 2: Trust Score -->
          <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover-lift">
            <div class="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span class="font-semibold uppercase tracking-wider">Evidence Trust</span>
              <i class="fa-solid fa-shield-heart text-emerald-600"></i>
            </div>
            <div class="text-3xl font-extrabold text-emerald-600">${metrics.trustScore || 87}<span class="text-lg text-slate-400 font-normal">/100</span></div>
            <div class="mt-2 text-[11px] text-emerald-700 font-medium">96% Cryptographically Verified</div>
          </div>

          <!-- Card 3: Verified Skills -->
          <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover-lift">
            <div class="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span class="font-semibold uppercase tracking-wider">Verified Skills</span>
              <i class="fa-solid fa-brain text-purple-600"></i>
            </div>
            <div class="text-3xl font-extrabold text-slate-900">${metrics.verifiedSkillsCount || 17}</div>
            <div class="mt-2 text-[11px] text-slate-500">Across 6 tech categories</div>
          </div>

          <!-- Card 4: Evidence Items -->
          <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover-lift">
            <div class="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span class="font-semibold uppercase tracking-wider">Evidence Items</span>
              <i class="fa-solid fa-layer-group text-amber-600"></i>
            </div>
            <div class="text-3xl font-extrabold text-slate-900">${metrics.totalEvidenceCount || 26}</div>
            <div class="mt-2 text-[11px] text-slate-500">Projects, commits, syllabi</div>
          </div>

          <!-- Card 5: Credentials & Hackathons -->
          <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover-lift col-span-2 lg:col-span-1">
            <div class="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span class="font-semibold uppercase tracking-wider">Credentials / VC</span>
              <i class="fa-solid fa-certificate text-indigo-600"></i>
            </div>
            <div class="text-3xl font-extrabold text-slate-900">${metrics.credentialsCount || 4}</div>
            <div class="mt-2 text-[11px] text-slate-500">W3C & Open Badges 3.0</div>
          </div>
        </div>

        <!-- MAIN DASHBOARD CONTENT GRID -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- LEFT 2 COLUMNS: Top Skills & Evidence Preview -->
          <div class="lg:col-span-2 space-y-8">
            <!-- Top Verified Skills Card -->
            <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div class="flex items-center justify-between mb-4">
                <div>
                  <h3 class="text-lg font-bold text-slate-900">Core Verified Skills</h3>
                  <p class="text-xs text-slate-500">Skills backed by multi-point verified proof artifacts</p>
                </div>
                <a href="#/student/passport" class="text-xs font-semibold text-blue-600 hover:text-blue-800">
                  Full Skill Passport (${student.skills?.length || 17}) &rarr;
                </a>
              </div>

              <div class="space-y-4">
                ${(student.skills || []).slice(0, 5).map(skill => `
                  <div class="p-4 rounded-xl border border-slate-100 hover:border-blue-200 bg-slate-50/50 hover:bg-blue-50/30 transition-all cursor-pointer" onclick="App.viewSkillDetail('${skill.id}')">
                    <div class="flex items-center justify-between mb-1.5">
                      <div class="flex items-center gap-2">
                        <span class="font-bold text-slate-900 text-sm">${skill.name}</span>
                        ${Utils.renderLevelBadge(skill.level)}
                        ${Utils.renderVerificationBadge(skill.verificationStatus)}
                      </div>
                      <div class="text-right">
                        <span class="text-sm font-extrabold text-blue-700">${skill.confidence}%</span>
                        <span class="text-[11px] text-slate-500 ml-1">confidence</span>
                      </div>
                    </div>
                    <div class="w-full bg-slate-200 rounded-full h-2 overflow-hidden mb-2">
                      <div class="bg-blue-600 h-2 rounded-full" style="width: ${skill.confidence}%"></div>
                    </div>
                    <div class="flex items-center justify-between text-[11px] text-slate-500">
                      <span><i class="fa-solid fa-file-shield text-emerald-600 mr-1"></i> ${skill.verifiedEvidenceCount || 3} verified evidence proofs</span>
                      <span>Last demonstrated: ${skill.lastDemonstrated}</span>
                    </div>
                  </div>
                `).join("")}
              </div>
            </div>

            <!-- Recent Projects & Evidence -->
            <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div class="flex items-center justify-between mb-4">
                <div>
                  <h3 class="text-lg font-bold text-slate-900">Recent Verified Projects</h3>
                  <p class="text-xs text-slate-500">Cryptographically signed codebases and outcomes</p>
                </div>
                <a href="#/student/evidence" class="text-xs font-semibold text-blue-600 hover:text-blue-800">
                  View All Evidence &rarr;
                </a>
              </div>

              <div class="space-y-3">
                ${(student.evidenceList || []).slice(0, 3).map(ev => `
                  <div class="p-4 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 transition-colors">
                    <div class="flex items-start justify-between gap-4">
                      <div>
                        <div class="flex items-center gap-2">
                          <span class="text-xs font-semibold text-blue-600 uppercase tracking-wide">${ev.type}</span>
                          <span class="text-slate-300">•</span>
                          <h4 class="text-sm font-bold text-slate-900">${ev.title}</h4>
                        </div>
                        <p class="text-xs text-slate-600 mt-1 line-clamp-2">${ev.description}</p>
                        <div class="flex flex-wrap gap-1.5 mt-2">
                          ${(ev.skills || []).map(s => `<span class="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-medium">${s}</span>`).join("")}
                        </div>
                      </div>
                      <div class="text-right shrink-0">
                        ${Utils.renderVerificationBadge(ev.verificationStatus)}
                        <div class="mt-2 text-[10px] font-mono text-slate-400">
                          ${Utils.truncateHash(ev.proofHash, 6, 4)}
                        </div>
                      </div>
                    </div>
                  </div>
                `).join("")}
              </div>
            </div>
          </div>

          <!-- RIGHT COLUMN: Recommended Matches & Trust Breakdown -->
          <div class="space-y-8">
            <!-- HIGHLIGHTED INTERNSHIP MATCH (AI/ML INTERN 91%) -->
            <div class="bg-gradient-to-b from-blue-900 to-indigo-950 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
              <div class="absolute -right-8 -top-8 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl"></div>
              
              <div class="flex items-center justify-between text-xs text-blue-300 font-semibold mb-3 uppercase tracking-wider">
                <span>Top Explainable Match</span>
                <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">91% Match</span>
              </div>

              <div class="text-xl font-extrabold text-white">Machine Learning Intern</div>
              <div class="text-sm text-blue-200 mt-1">Apex Neural Labs • Bangalore / Remote</div>

              <div class="my-4 p-3.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-xs space-y-2">
                <div class="flex justify-between">
                  <span class="text-blue-200">Skill Alignment:</span>
                  <span class="font-bold text-emerald-300">45% / 45%</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-blue-200">Evidence Strength:</span>
                  <span class="font-bold text-emerald-300">25% / 25%</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-blue-200">Gap Skills:</span>
                  <span class="font-bold text-amber-300">Docker, AWS</span>
                </div>
              </div>

              <a href="#/student/matches/opp-ml-intern" class="w-full py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-bold text-xs text-center block transition-colors shadow-md">
                Why 91%? Explain My Score &rarr;
              </a>
            </div>

            <!-- Evidence Trust Score Breakdown -->
            <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h3 class="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Trust Score Breakdown</h3>
              <div class="space-y-4 text-xs">
                <div>
                  <div class="flex justify-between font-medium mb-1">
                    <span class="text-slate-600">Verification Quality (50% wt)</span>
                    <span class="font-bold text-emerald-600">48 / 50</span>
                  </div>
                  <div class="w-full bg-slate-100 rounded-full h-1.5">
                    <div class="bg-emerald-500 h-1.5 rounded-full" style="width: 96%"></div>
                  </div>
                </div>
                <div>
                  <div class="flex justify-between font-medium mb-1">
                    <span class="text-slate-600">Evidence Diversity (20% wt)</span>
                    <span class="font-bold text-blue-600">19 / 20</span>
                  </div>
                  <div class="w-full bg-slate-100 rounded-full h-1.5">
                    <div class="bg-blue-500 h-1.5 rounded-full" style="width: 95%"></div>
                  </div>
                </div>
                <div>
                  <div class="flex justify-between font-medium mb-1">
                    <span class="text-slate-600">Recency & Activity (30% wt)</span>
                    <span class="font-bold text-indigo-600">27 / 30</span>
                  </div>
                  <div class="w-full bg-slate-100 rounded-full h-1.5">
                    <div class="bg-indigo-500 h-1.5 rounded-full" style="width: 90%"></div>
                  </div>
                </div>
              </div>

              <div class="mt-5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600">
                <i class="fa-solid fa-circle-info text-blue-600 mr-1"></i>
                Represents evidence validity only. Does not measure personal human worth.
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
};
