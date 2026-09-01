/**
 * VeriSkill — Stitch Student Dashboard Component (Source of Truth)
 */

const StudentDashboardView = {
  async render(studentId = "student-1042") {
    const student = await Utils.fetchAPI(`/api/students/${studentId}`);
    const metrics = student.passportMetrics || {};
    const skills = student.skills || [];
    const evidenceList = student.evidenceList || [];
    const verifiedSkills = skills.filter(s => s.verificationStatus === 'VERIFIED');
    const completionRate = metrics.overallScore || 78;

    return `
      <div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-24 md:pt-28 pb-section-gap flex flex-col gap-stack-lg min-h-screen">
        
        <!-- Greeting Section -->
        <section class="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div class="flex flex-col gap-1">
            <h1 class="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-primary font-bold">
              Good evening, ${student.personal?.fullName || "Ashutosh"}.
            </h1>
            <p class="font-body-lg text-body-lg text-on-surface-variant">
              Here’s what’s happening with your verified skills and internship opportunities.
            </p>
          </div>
          
          <div class="flex items-center gap-3">
            <a href="#/student/evidence" class="px-5 py-2.5 bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-label-md rounded-full transition-all border border-outline-variant/30 flex items-center gap-1.5 shadow-sm">
              <span class="material-symbols-outlined text-[18px]">add_circle</span>
              Add Evidence
            </a>
            <a href="#/verify/${student.passportId}" class="px-5 py-2.5 bg-secondary-fixed/40 text-secondary font-label-md text-label-md rounded-full hover:bg-secondary-fixed/60 transition-all border border-secondary-fixed flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">verified</span>
              Public QR
            </a>
          </div>
        </section>

        <!-- Bento Grid Layout -->
        <div class="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          
          <!-- Skill Passport Completion (Large Highlight Card) -->
          <div class="md:col-span-8 bg-surface-container-lowest p-6 md:p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden group border border-surface-variant/40">
            <!-- AI Magic Glow Background -->
            <div class="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-60 pointer-events-none"></div>
            
            <div class="flex flex-col h-full justify-between relative z-10 gap-stack-md">
              <div class="flex justify-between items-start">
                <div class="flex flex-col gap-1">
                  <span class="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest font-semibold">Skill Passport</span>
                  <h2 class="font-headline-md text-headline-md text-primary font-bold">Almost there.</h2>
                </div>
                <div class="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                  <span class="material-symbols-outlined text-secondary" style="font-variation-settings: 'FILL' 1;">stars</span>
                </div>
              </div>

              <div class="flex flex-col gap-4">
                <div class="flex items-baseline gap-2">
                  <span class="font-display-lg text-4xl md:text-display-lg text-primary font-bold leading-none">${completionRate}<span class="text-2xl text-on-surface-variant font-normal">%</span></span>
                  <span class="text-xs font-label-md text-on-surface-variant ml-1 font-medium">• Strong Verification Tier</span>
                </div>

                <!-- Progress Bar -->
                <div class="w-full h-2.5 bg-surface-container rounded-full overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-secondary to-tertiary-fixed-dim rounded-full transition-all duration-700" style="width: ${completionRate}%;"></div>
                </div>
                <p class="font-body-md text-body-md text-on-surface-variant text-sm">
                  Complete your pending Evidence items to reach 100% verification confidence.
                </p>
              </div>
            </div>
          </div>

          <!-- Verified Skills Counter Card -->
          <div class="md:col-span-4 bg-surface-container-lowest p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between gap-stack-md border border-surface-variant/40">
            <div class="flex justify-between items-center text-on-surface-variant">
              <span class="font-label-md text-label-md uppercase tracking-widest font-semibold">Verified Skills</span>
              <span class="material-symbols-outlined text-secondary" style="font-variation-settings: 'FILL' 1;">verified</span>
            </div>
            
            <div class="font-display-lg text-3xl md:text-display-lg text-primary font-bold">${verifiedSkills.length || 24}</div>
            
            <!-- Skill Chips Preview -->
            <div class="flex flex-wrap gap-1.5 mt-auto">
              ${skills.slice(0, 2).map(s => `
                <span class="px-3 py-1 bg-surface-container text-on-surface text-label-sm font-label-sm rounded-full border border-outline-variant/30 flex items-center gap-1">
                  ${s.name} <span class="material-symbols-outlined text-[14px] text-tertiary-fixed-dim" style="font-variation-settings: 'FILL' 1;">check_circle</span>
                </span>
              `).join("")}
              <span class="px-2.5 py-1 bg-surface-container text-on-surface-variant text-label-sm font-label-sm rounded-full border border-outline-variant/30">
                +${Math.max(skills.length - 2, 22)}
              </span>
            </div>
          </div>

          <!-- Evidence Items Counter Card -->
          <div class="md:col-span-4 bg-surface-container-lowest p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between gap-stack-md border border-surface-variant/40">
            <div class="flex justify-between items-center text-on-surface-variant">
              <span class="font-label-md text-label-md uppercase tracking-widest font-semibold">Evidence Items</span>
              <span class="material-symbols-outlined text-outline">description</span>
            </div>
            <div class="font-display-lg text-3xl md:text-display-lg text-primary font-bold">${evidenceList.length || 17}</div>
            <p class="font-body-md text-body-md text-on-surface-variant text-sm">2 awaiting review</p>
          </div>

          <!-- Opportunity Matches Counter Card -->
          <div class="md:col-span-4 bg-surface-container-lowest p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between gap-stack-md relative overflow-hidden border border-surface-variant/40">
            <div class="absolute -right-4 -top-4 w-24 h-24 bg-secondary/10 rounded-full blur-2xl pointer-events-none"></div>
            <div class="flex justify-between items-center text-on-surface-variant relative z-10">
              <span class="font-label-md text-label-md uppercase tracking-widest font-semibold">Opportunity Matches</span>
              <span class="material-symbols-outlined text-secondary">work</span>
            </div>
            <div class="font-display-lg text-3xl md:text-display-lg text-primary font-bold relative z-10">12</div>
            <p class="font-body-md text-body-md text-secondary relative z-10 font-semibold text-sm">3 new high-confidence matches</p>
          </div>

          <!-- Team Matches Counter Card -->
          <div class="md:col-span-4 bg-surface-container-lowest p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between gap-stack-md border border-surface-variant/40">
            <div class="flex justify-between items-center text-on-surface-variant">
              <span class="font-label-md text-label-md uppercase tracking-widest font-semibold">Team Matches</span>
              <span class="material-symbols-outlined text-outline">groups</span>
            </div>
            <div class="font-display-lg text-3xl md:text-display-lg text-primary font-bold">6</div>
            <p class="font-body-md text-body-md text-on-surface-variant text-sm">Based on complementary skills</p>
          </div>

          <!-- AI Recommended Next Skill (Full Width Banner) -->
          <div class="md:col-span-12 bg-surface-container-lowest p-6 md:p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col md:flex-row gap-stack-lg items-start md:items-center justify-between border-l-4 border-secondary border-y border-r border-surface-variant/40">
            <div class="flex flex-col gap-2">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-secondary text-sm" style="font-variation-settings: 'FILL' 1;">auto_awesome</span>
                <span class="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-bold">AI Recommended Next Skill</span>
              </div>
              <h3 class="font-headline-md text-headline-md text-primary font-bold">REST API Development</h3>
              <p class="font-body-md text-body-md text-on-surface-variant max-w-2xl text-sm leading-relaxed">
                Acquiring this skill will increase your match rate for Backend Engineering and Cloud roles by <strong class="text-primary font-semibold">42%</strong>. We found 3 verified learning labs tailored to your current Python knowledge graph.
              </p>
            </div>
            <button onclick="App.openBridgeGapModal('REST API Development', 'FastAPI & REST Microservices Bridge Lab', 3.5, '+42% Match Rate Boost')" class="bg-primary-container text-on-primary font-label-md text-label-md px-6 py-3 rounded-full hover:bg-primary transition-all whitespace-nowrap cursor-pointer shadow-sm active:scale-95">
              View Learning Path
            </button>
          </div>

        </div>

      </div>
    `;
  }
};

