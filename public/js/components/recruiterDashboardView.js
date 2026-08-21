/**
 * Recruiter Portal Dashboard View
 */

const RecruiterDashboardView = {
  async render() {
    const opportunities = await Utils.fetchAPI("/api/opportunities");

    return `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                Recruiter Portal
              </span>
              <span class="text-xs text-slate-500 font-medium">Apex Neural Labs (Bangalore)</span>
            </div>
            <h1 class="text-2xl font-extrabold text-slate-900 mt-1">Recruiter Pipeline & Blind Talent Matching</h1>
            <p class="text-xs text-slate-500 mt-1">Hire verified interns based entirely on cryptographic skill evidence, not inflated resumes.</p>
          </div>

          <div class="flex items-center gap-2">
            <a href="#/recruiter/jobs/create" class="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center gap-2">
              <i class="fa-solid fa-plus-circle"></i> Create New Internship Role
            </a>
            <a href="#/recruiter/candidates" class="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-sm transition-all flex items-center gap-2">
              <i class="fa-solid fa-user-shield"></i> Blind Candidate Ranking
            </a>
          </div>
        </div>

        <!-- RECRUITER STATS OVERVIEW -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <div class="text-xs font-bold text-slate-500 uppercase mb-1">Active Roles</div>
            <div class="text-3xl font-extrabold text-slate-900">${opportunities.length}</div>
            <div class="mt-2 text-xs text-blue-600 font-medium">All with verified skill criteria</div>
          </div>
          <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <div class="text-xs font-bold text-slate-500 uppercase mb-1">Total Verified Applicants</div>
            <div class="text-3xl font-extrabold text-blue-600">10</div>
            <div class="mt-2 text-xs text-slate-500">100% Cryptographically signed</div>
          </div>
          <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <div class="text-xs font-bold text-slate-500 uppercase mb-1">Average Match Score</div>
            <div class="text-3xl font-extrabold text-emerald-600">83%</div>
            <div class="mt-2 text-xs text-emerald-700 font-medium">High technical alignment</div>
          </div>
          <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <div class="text-xs font-bold text-slate-500 uppercase mb-1">Attribute-Blind Mode</div>
            <div class="text-3xl font-extrabold text-purple-600">ACTIVE</div>
            <div class="mt-2 text-xs text-purple-700 font-medium">Demographic bias mitigated</div>
          </div>
        </div>

        <!-- ACTIVE ROLES TABLE -->
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
          <div class="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <h3 class="text-base font-bold text-slate-900">Your Active Job Postings</h3>
            <span class="text-xs text-slate-500">Click any role to view blind-ranked candidates</span>
          </div>

          <div class="divide-y divide-slate-100">
            ${opportunities.map(opp => `
              <div class="p-6 hover:bg-slate-50 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <div class="flex items-center gap-2">
                    <span class="text-xl">${opp.logo || '💼'}</span>
                    <h4 class="text-base font-bold text-slate-900">${opp.title}</h4>
                    <span class="px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">${opp.type}</span>
                  </div>
                  <p class="text-xs text-slate-500 mt-1">${opp.company} • ${opp.location} • Stipend: ${opp.stipend}</p>

                  <div class="flex flex-wrap gap-1.5 mt-3">
                    <span class="text-[10px] font-bold text-slate-400 uppercase mr-1 flex items-center">Required:</span>
                    ${(opp.requiredSkills || []).map(rs => `
                      <span class="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200">
                        ${rs.name} (${rs.minLevel})
                      </span>
                    `).join("")}
                  </div>
                </div>

                <div class="flex items-center gap-2 shrink-0">
                  <a href="#/recruiter/candidates" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition-colors flex items-center gap-1.5">
                    <i class="fa-solid fa-users"></i> View Blind Candidates (10)
                  </a>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    `;
  }
};
