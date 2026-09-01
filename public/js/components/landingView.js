/**
 * VeriSkill — Stitch Landing Page Component (Source of Truth)
 */

const LandingView = {
  render() {
    return `
      <div class="min-h-screen bg-background text-on-background">
        
        <!-- HERO SECTION -->
        <div class="pt-24 md:pt-32 pb-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div class="flex flex-col items-center text-center max-w-3xl mx-auto gap-stack-lg mb-section-gap relative">
            
            <!-- Category Badge -->
            <div class="inline-flex items-center gap-2 bg-surface-container-low px-4 py-1.5 rounded-full border border-surface-variant shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
              <span class="material-symbols-outlined text-secondary text-sm" style="font-variation-settings: 'FILL' 1;">verified</span>
              <span class="font-label-md text-label-md text-on-surface-variant tracking-wider uppercase">Verifiable Skill Passport</span>
            </div>

            <!-- Main Headline -->
            <h1 class="font-display-lg text-4xl sm:text-5xl md:text-[56px] text-primary leading-tight md:leading-[64px] font-bold tracking-tight">
              Show what you can do.<br/>
              <span class="text-outline">Not just what you studied.</span>
            </h1>

            <!-- Subtitle -->
            <p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              VeriSkill turns coursework, projects, competitions and credentials into verified skills — then connects you with internships and student teams that fit.
            </p>

            <!-- Call to Actions -->
            <div class="flex flex-col sm:flex-row gap-4 mt-stack-md w-full sm:w-auto">
              <a href="#/onboarding" class="bg-primary-container text-on-primary font-label-md text-label-md rounded-full px-8 py-4 hover:shadow-lg active:scale-95 duration-200 transition-all text-center">
                Build My Skill Passport
              </a>
              <a href="#/student/opportunities" class="bg-surface-container-lowest text-primary font-label-md text-label-md border border-outline-variant rounded-full px-8 py-4 hover:bg-surface-bright active:scale-95 duration-200 transition-all flex justify-center items-center gap-2 text-center">
                <span>Explore Opportunities</span>
                <span class="material-symbols-outlined">arrow_forward</span>
              </a>
            </div>

            <!-- 3-Minute Judge Demo CTA -->
            <div class="mt-4 flex flex-col items-center gap-2 w-full">
              <button
                type="button"
                onclick="DemoTour.startTour(1)"
                class="group inline-flex items-center gap-3 bg-primary-container hover:bg-primary text-on-primary border-2 border-secondary/30 hover:border-secondary font-label-md text-label-md font-bold rounded-full px-8 py-4 shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.18)] active:scale-95 duration-200 transition-all cursor-pointer"
              >
                <span class="w-9 h-9 rounded-full bg-tertiary-fixed/20 border border-tertiary-fixed/50 flex items-center justify-center group-hover:bg-tertiary-fixed/30 transition-colors">
                  <span class="material-symbols-outlined text-[20px] text-tertiary-fixed-dim" style="font-variation-settings: 'FILL' 1;">play_circle</span>
                </span>
                <span>Launch 3-Minute Demo Tour</span>
                <span class="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">chevron_right</span>
              </button>
              <p class="font-body-md text-xs text-on-surface-variant">
                See how VeriSkill turns verified evidence into explainable skill matches.
              </p>
            </div>
          </div>

          <!-- UI PREVIEW BENTO GRID -->
          <div class="grid grid-cols-1 md:grid-cols-12 gap-gutter relative z-10">
            <!-- Decorative background blur -->
            <div class="absolute -inset-10 bg-gradient-to-br from-secondary/10 to-tertiary-fixed-dim/10 blur-[100px] -z-10 rounded-full opacity-50 pointer-events-none"></div>

            <!-- Main Passport Preview Card -->
            <div class="md:col-span-8 bg-surface-container-lowest rounded-xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-surface-variant flex flex-col gap-stack-lg">
              <div class="flex justify-between items-start">
                <div class="flex items-center gap-4">
                  <div class="w-16 h-16 rounded-full bg-surface-container-high overflow-hidden shadow-inner flex items-center justify-center border border-outline-variant/30">
                    <img class="w-full h-full object-cover" alt="Ashutosh Pradhan" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSWx0e2-SEWuIEGrXnsvm4ah9oeU6y1aOzAG4Hf9K4yxBpcSVeqnczMjJTZnq0xzbMBMgC8xTk-fai4OeLnjMB_zOat6msJCXv6S2jCT7eD2NGWg388APSwrIDqdYI3tmEU9LXwtWGPjApaWaw-tzeysQUFiiSrvMrkP9P8QAMV7y16_bdAgeXsAE9gCf_mEus3MjgRa-ZbPX38HW7vV6wdz-RuHIOPuawrFMKu4xyLIMr9L2jFZIwIQ"/>
                  </div>
                  <div>
                    <h2 class="font-headline-md text-headline-md text-primary font-bold">Ashutosh Pradhan</h2>
                    <p class="font-body-md text-body-md text-on-surface-variant">Computer Science, Class of '26</p>
                  </div>
                </div>
                <div class="bg-surface-container px-3 py-1 rounded-full flex items-center gap-1">
                  <span class="material-symbols-outlined text-tertiary-container text-sm" style="font-variation-settings: 'FILL' 1;">shield</span>
                  <span class="font-label-sm text-label-sm text-on-surface font-semibold">Verified Identity</span>
                </div>
              </div>

              <!-- Verified Skills Evidence -->
              <div>
                <h3 class="font-label-md text-label-md text-on-surface-variant mb-stack-sm uppercase tracking-wider font-semibold">VERIFIED SKILLS EVIDENCE</h3>
                <div class="flex flex-wrap gap-2">
                  <div class="skill-chip-verified px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                    <span class="material-symbols-outlined text-secondary text-xs" style="font-variation-settings: 'FILL' 1;">auto_awesome</span>
                    <span class="font-label-md text-label-md text-primary font-medium">Python</span>
                    <span class="w-1 h-1 rounded-full bg-outline-variant mx-1"></span>
                    <span class="font-label-sm text-label-sm text-on-surface-variant">4 Projects</span>
                  </div>
                  <div class="skill-chip-verified px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                    <span class="material-symbols-outlined text-secondary text-xs" style="font-variation-settings: 'FILL' 1;">auto_awesome</span>
                    <span class="font-label-md text-label-md text-primary font-medium">Machine Learning</span>
                    <span class="w-1 h-1 rounded-full bg-outline-variant mx-1"></span>
                    <span class="font-label-sm text-label-sm text-on-surface-variant">High Confidence</span>
                  </div>
                  <div class="bg-surface-container px-3.5 py-1.5 rounded-full flex items-center gap-1.5 border border-outline-variant/30">
                    <span class="font-label-md text-label-md text-on-surface font-medium">Data Analysis</span>
                  </div>
                </div>
              </div>

              <!-- Verification Strength Progress -->
              <div class="space-y-3">
                <h3 class="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">VERIFICATION STRENGTH</h3>
                <div class="relative w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                  <div class="absolute top-0 left-0 h-full w-[85%] bg-gradient-to-r from-secondary to-tertiary-fixed-dim rounded-full"></div>
                </div>
                <div class="flex justify-between text-label-sm font-label-sm text-on-surface-variant">
                  <span>Beginner</span>
                  <span>Intermediate</span>
                  <span class="text-primary font-semibold">Advanced (85% Strength)</span>
                </div>
              </div>
            </div>

            <!-- Match Card Preview -->
            <div class="md:col-span-4 bg-surface-container-lowest rounded-xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-surface-variant flex flex-col justify-between gap-stack-md ai-match-bg relative overflow-hidden">
              <div class="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <span class="material-symbols-outlined text-6xl">target</span>
              </div>
              <h3 class="font-label-md text-label-md text-secondary flex items-center gap-2 font-bold uppercase tracking-wider">
                <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">magic_button</span>
                AI INSIGHT MATCH
              </h3>
              
              <div class="bg-surface-container-lowest/90 backdrop-blur-md rounded-xl p-4 border border-white/60 shadow-sm mt-1">
                <div class="flex justify-between items-start mb-2">
                  <div>
                    <h4 class="font-headline-md text-headline-md text-primary text-base font-bold">AI / ML Engineering Intern</h4>
                    <p class="font-body-md text-body-md text-on-surface-variant text-xs">Apex Neural Labs</p>
                  </div>
                  <div class="bg-tertiary-fixed-dim/20 text-on-tertiary-fixed-variant font-label-md text-label-md px-2.5 py-1 rounded-full font-bold text-xs">
                    91% Match
                  </div>
                </div>
                <div class="text-xs font-body-md text-on-surface mt-3 space-y-1.5">
                  <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-tertiary-fixed-dim text-sm" style="font-variation-settings: 'FILL' 1;">check_circle</span>
                    <span>Python & ML requirement met</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-tertiary-fixed-dim text-sm" style="font-variation-settings: 'FILL' 1;">check_circle</span>
                    <span>GitHub project evidence verified</span>
                  </div>
                </div>
              </div>

              <a href="#/student/matches/opp-ml-intern" class="mt-auto w-full bg-surface-container text-primary font-label-md text-label-md rounded-full py-2.5 hover:bg-surface-variant transition-colors border border-outline-variant/30 flex items-center justify-center gap-2 text-center">
                <span>View 5-Factor Match Details</span>
                <span class="material-symbols-outlined text-sm">arrow_outward</span>
              </a>
            </div>
          </div>
        </div>

        <!-- 3 CORE PILLARS -->
        <div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16">
          <div class="text-center max-w-2xl mx-auto mb-12">
            <span class="text-xs font-bold uppercase tracking-wider text-secondary">Zero False-Verification Invariant</span>
            <h2 class="font-headline-lg text-headline-lg font-bold text-primary mt-2">The Three Pillars of VeriSkill</h2>
            <p class="text-on-surface-variant text-body-md mt-2">Moving recruitment and hackathons from self-declared claims to cryptographic proof.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            <!-- Pillar 1 -->
            <div class="bg-surface-container-lowest rounded-2xl p-8 border border-surface-variant shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover-lift flex flex-col justify-between">
              <div>
                <div class="w-12 h-12 rounded-xl bg-tertiary-fixed/30 text-on-tertiary-fixed-variant flex items-center justify-center font-bold text-xl mb-6">
                  01
                </div>
                <h3 class="font-headline-md text-headline-md font-bold text-primary">VERIFY</h3>
                <p class="font-label-md text-label-md text-secondary font-semibold mt-1">Verifiable Skill Passport</p>
                <p class="text-on-surface-variant font-body-md text-sm mt-3 leading-relaxed">
                  Connect GitHub commits, official coursework, competition rankings, and certificates. Automated rule evaluators transition skills from Extracted to Verified with SHA-256 proofs.
                </p>
              </div>
              <div class="mt-6 pt-4 border-t border-surface-variant/40 flex items-center text-xs text-on-surface-variant gap-2">
                <span class="material-symbols-outlined text-tertiary-fixed-dim text-sm" style="font-variation-settings: 'FILL' 1;">check_circle</span>
                <span>Zero self-inflated ratings</span>
              </div>
            </div>

            <!-- Pillar 2 -->
            <div class="bg-surface-container-lowest rounded-2xl p-8 border border-surface-variant shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover-lift flex flex-col justify-between">
              <div>
                <div class="w-12 h-12 rounded-xl bg-secondary-fixed/50 text-secondary flex items-center justify-center font-bold text-xl mb-6">
                  02
                </div>
                <h3 class="font-headline-md text-headline-md font-bold text-primary">MATCH & EXPLAIN</h3>
                <p class="font-label-md text-label-md text-secondary font-semibold mt-1">Explainable AI Scoring</p>
                <p class="text-on-surface-variant font-body-md text-sm mt-3 leading-relaxed">
                  Transparent 5-factor scoring model that mathematically decomposes scores across Coverage, Semantics, Evidence, Experience, and Projects, with 1-click gap remediation.
                </p>
              </div>
              <div class="mt-6 pt-4 border-t border-surface-variant/40 flex items-center text-xs text-on-surface-variant gap-2">
                <span class="material-symbols-outlined text-secondary text-sm" style="font-variation-settings: 'FILL' 1;">visibility</span>
                <span>No score without evidence trace</span>
              </div>
            </div>

            <!-- Pillar 3 -->
            <div class="bg-surface-container-lowest rounded-2xl p-8 border border-surface-variant shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover-lift flex flex-col justify-between">
              <div>
                <div class="w-12 h-12 rounded-xl bg-surface-container-high text-primary flex items-center justify-center font-bold text-xl mb-6">
                  03
                </div>
                <h3 class="font-headline-md text-headline-md font-bold text-primary">ETHICAL & BLIND</h3>
                <p class="font-label-md text-label-md text-secondary font-semibold mt-1">Demographic Parity Auditing</p>
                <p class="text-on-surface-variant font-body-md text-sm mt-3 leading-relaxed">
                  Attribute-Blind Layer isolates names, photos, gender, age, and institutions from scoring pipelines, backed by live four-fifths rule Disparate Impact verification.
                </p>
              </div>
              <div class="mt-6 pt-4 border-t border-surface-variant/40 flex items-center text-xs text-on-surface-variant gap-2">
                <span class="material-symbols-outlined text-primary text-sm" style="font-variation-settings: 'FILL' 1;">shield</span>
                <span>Demographic isolation guaranteed</span>
              </div>
            </div>
          </div>
        </div>

        <!-- QUICK DEMO CALLOUT BANNER -->
        <div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-24">
          <div class="bg-primary-container text-on-primary rounded-3xl p-8 md:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span class="font-label-sm text-label-sm text-tertiary-fixed uppercase tracking-wider font-bold">Interactive Evaluation Mode</span>
              <h3 class="font-headline-lg text-2xl md:text-headline-lg font-bold mt-1">Ready to explore VeriSkill live?</h3>
              <p class="font-body-md text-body-md text-surface-variant mt-2 max-w-xl">
                Experience the verified student passport, explainable AI matches, and combinatorial team solver.
              </p>
            </div>
            <div class="flex flex-wrap gap-3 shrink-0">
              <button
                type="button"
                onclick="DemoTour.startTour(1)"
                class="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-md text-label-md font-bold hover:bg-tertiary-fixed-dim transition-all shadow-md cursor-pointer"
              >
                <span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">play_circle</span>
                Launch 3-Min Demo Tour
              </button>
              <a href="#/student/dashboard" class="px-6 py-3.5 rounded-full bg-surface-container-lowest text-primary font-label-md text-label-md font-bold hover:bg-surface-bright transition-all shadow-md">
                Student Dashboard
              </a>
              <a href="#/teams" class="px-6 py-3.5 rounded-full bg-secondary text-white font-label-md text-label-md font-bold hover:opacity-90 transition-all">
                Try Team Solver
              </a>
            </div>
          </div>
        </div>

      </div>
    `;
  }
};
