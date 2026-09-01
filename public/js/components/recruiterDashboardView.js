/**
 * VeriSkill — Stitch Recruiter Portal Dashboard View
 */

const RecruiterDashboardView = {
  async render() {
    const opportunities = await Utils.fetchAPI("/api/opportunities");

    return `
      <div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-24 md:pt-28 pb-section-gap flex flex-col gap-stack-lg min-h-screen">
        
        <!-- Header Section -->
        <section class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="px-3 py-0.5 rounded-full text-xs font-label-md font-semibold bg-secondary-fixed/50 text-secondary border border-secondary-fixed">
                Recruiter Portal
              </span>
              <span class="text-xs font-label-md text-on-surface-variant">Apex Neural Labs (Bangalore)</span>
            </div>
            <h1 class="font-headline-lg-mobile md:font-headline-lg text-primary font-bold">
              Recruiter Pipeline & Attribute-Blind Matching
            </h1>
            <p class="font-body-lg text-on-surface-variant text-sm mt-1">
              Shortlist verified interns based strictly on cryptographic skill evidence and objective feature vectors.
            </p>
          </div>

          <div class="flex flex-wrap items-center gap-3">
            <a href="#/recruiter/jobs/create" class="px-5 py-2.5 rounded-full bg-primary-container hover:bg-primary text-on-primary font-label-md text-xs shadow-sm transition-all flex items-center gap-2">
              <span class="material-symbols-outlined text-[18px]">add_circle</span>
              <span>Create Internship Role</span>
            </a>
            <a href="#/recruiter/candidates" class="px-5 py-2.5 rounded-full bg-secondary-fixed/50 hover:bg-secondary-fixed text-secondary font-label-md text-xs border border-secondary-fixed transition-all flex items-center gap-2">
              <span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">shield_person</span>
              <span>Blind Candidate Ranking</span>
            </a>
          </div>
        </section>

        <!-- RECRUITER STATS OVERVIEW BENTO -->
        <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          <div class="bg-surface-container-lowest rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-surface-variant/40 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300">
            <div class="flex items-center justify-between text-on-surface-variant mb-2">
              <span class="font-label-md text-xs uppercase tracking-widest font-semibold">Active Roles</span>
              <span class="material-symbols-outlined text-secondary">work</span>
            </div>
            <div class="font-display-lg text-3xl md:text-4xl text-primary font-bold">${opportunities.length}</div>
            <div class="mt-2 text-xs font-label-md text-secondary font-medium flex items-center gap-1">
              <span class="material-symbols-outlined text-[14px]">check_circle</span>
              <span>All with verified criteria</span>
            </div>
          </div>

          <div class="bg-surface-container-lowest rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-surface-variant/40 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300">
            <div class="flex items-center justify-between text-on-surface-variant mb-2">
              <span class="font-label-md text-xs uppercase tracking-widest font-semibold">Verified Applicants</span>
              <span class="material-symbols-outlined text-secondary" style="font-variation-settings: 'FILL' 1;">verified</span>
            </div>
            <div class="font-display-lg text-3xl md:text-4xl text-primary font-bold">10</div>
            <div class="mt-2 text-xs font-label-md text-on-surface-variant font-medium">
              100% Cryptographically signed
            </div>
          </div>

          <div class="bg-surface-container-lowest rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-surface-variant/40 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300">
            <div class="flex items-center justify-between text-on-surface-variant mb-2">
              <span class="font-label-md text-xs uppercase tracking-widest font-semibold">Avg Match Score</span>
              <span class="material-symbols-outlined text-tertiary-fixed-dim" style="font-variation-settings: 'FILL' 1;">auto_awesome</span>
            </div>
            <div class="font-display-lg text-3xl md:text-4xl text-primary font-bold">83%</div>
            <div class="mt-2 text-xs font-label-md text-secondary font-medium">
              High technical alignment
            </div>
          </div>

          <div class="bg-surface-container-lowest rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-surface-variant/40 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300">
            <div class="flex items-center justify-between text-on-surface-variant mb-2">
              <span class="font-label-md text-xs uppercase tracking-widest font-semibold">Ethical AI Mode</span>
              <span class="material-symbols-outlined text-secondary" style="font-variation-settings: 'FILL' 1;">lock</span>
            </div>
            <div class="font-display-lg text-2xl md:text-3xl text-secondary font-bold">ACTIVE</div>
            <div class="mt-2 text-xs font-label-md text-on-surface-variant font-medium">
              Demographic bias mitigated
            </div>
          </div>
        </section>

        <!-- ACTIVE ROLES SECTION -->
        <section class="bg-surface-container-lowest rounded-2xl border border-surface-variant/40 shadow-[0_4px_20px_rgba(0,0,0,0.04)] overflow-hidden">
          <div class="p-5 md:p-6 border-b border-surface-variant/40 bg-surface-container-low flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <h2 class="font-headline-md text-base md:text-lg text-primary font-bold">Active Role Postings</h2>
              <p class="font-body-md text-xs text-on-surface-variant">Click any posting to view candidate ranking under blind evaluation.</p>
            </div>
            <span class="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant text-xs font-label-md font-semibold">
              ${opportunities.length} Published
            </span>
          </div>

          <div class="divide-y divide-surface-variant/30">
            ${opportunities.map(opp => `
              <div class="p-6 hover:bg-surface-bright transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
                <div class="flex-1">
                  <div class="flex items-center gap-3 flex-wrap">
                    <span class="text-2xl">${opp.logo || '💼'}</span>
                    <h3 class="font-headline-md text-base md:text-lg font-bold text-primary">${opp.title}</h3>
                    <span class="px-2.5 py-0.5 rounded-full text-xs font-label-md font-semibold bg-secondary-fixed/40 text-secondary border border-secondary-fixed/50">${opp.type}</span>
                  </div>
                  <p class="font-body-md text-xs text-on-surface-variant mt-1.5">${opp.company} • ${opp.location} • Stipend: ${opp.stipend}</p>

                  <div class="flex flex-wrap items-center gap-1.5 mt-3">
                    <span class="text-[10px] font-label-md font-bold text-on-surface-variant uppercase tracking-wider mr-1">Required:</span>
                    ${(opp.requiredSkills || []).map(rs => `
                      <span class="px-2.5 py-0.5 rounded-full bg-surface-container text-primary text-xs font-label-md border border-outline-variant/30">
                        ${rs.name} (${rs.minLevel})
                      </span>
                    `).join("")}
                  </div>
                </div>

                <div class="flex items-center gap-3 shrink-0 w-full md:w-auto">
                  <a href="#/recruiter/candidates" class="w-full md:w-auto px-5 py-2.5 rounded-full bg-primary-container hover:bg-primary text-on-primary font-label-md text-xs shadow-sm transition-all flex items-center justify-center gap-2">
                    <span class="material-symbols-outlined text-[16px]">groups</span>
                    <span>View Blind Candidates (10)</span>
                  </a>
                </div>
              </div>
            `).join("")}
          </div>
        </section>
      </div>
    `;
  }
};
