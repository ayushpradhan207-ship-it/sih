/**
 * VeriSkill — Onboarding Component (Stitch UI Source of Truth)
 * Step 1: Welcome Splash
 * Step 2: Interests Selection with interactive pill buttons
 */

const OnboardingView = {
  currentStep: 1,
  selectedInterests: new Set(["Technology", "AI/Machine Learning"]),

  interestsList: [
    "Technology", "Business", "Design", "Research", 
    "Marketing", "Data Science", "Engineering", "Finance", 
    "Healthcare", "Education", "Sustainability", "Arts",
    "AI/Machine Learning", "Product Management", "Sales"
  ],

  render(step = 1) {
    this.currentStep = step;
    if (this.currentStep === 1) {
      return this.renderWelcomeStep();
    } else {
      return this.renderInterestsStep();
    }
  },

  renderWelcomeStep() {
    const session = (typeof Auth !== "undefined" && Auth.getSession()) || null;
    const userName = session?.name || (session?.isDemo ? "Aarav Sharma" : "Ashutosh Pradhan");

    return `
      <div class="min-h-[85vh] flex flex-col items-center justify-center antigravity-bg relative overflow-hidden px-margin-mobile md:px-margin-desktop py-section-gap">
        <!-- Ambient Decorative Elements -->
        <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        <div class="absolute bottom-0 left-0 w-[500px] h-[500px] bg-tertiary-fixed-dim/10 rounded-full blur-3xl -z-10 -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

        <div class="w-full max-w-2xl mx-auto flex flex-col items-center text-center z-10">
          <!-- Brand Logo / Identity -->
          <div class="mb-stack-lg float-animation">
            <div class="w-16 h-16 bg-surface-container-lowest rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex items-center justify-center mx-auto border border-surface-variant/50">
              <span class="material-symbols-outlined text-[32px] text-primary" style="font-variation-settings: 'FILL' 1;">grid_view</span>
            </div>
            <h1 class="mt-stack-sm font-headline-md text-headline-md font-bold tracking-tight text-primary">VeriSkill</h1>
          </div>

          <!-- Progress Indicator -->
          <div class="w-full max-w-xs mx-auto mb-stack-lg flex flex-col items-center">
            <span class="font-label-sm text-label-sm text-on-surface-variant mb-stack-sm uppercase tracking-widest font-semibold">Step 1 of 8</span>
            <div class="w-full h-1 bg-surface-variant rounded-full overflow-hidden">
              <div class="h-full bg-primary rounded-full transition-all duration-1000 ease-out" style="width: 12.5%;"></div>
            </div>
          </div>

          <!-- Main Content Card -->
          <div class="bg-surface-container-lowest rounded-[32px] shadow-[0_4px_20px_rgba(0,0,0,0.04)] p-8 md:p-12 w-full border border-surface-variant/30 backdrop-blur-xl relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-b from-white/50 to-transparent pointer-events-none"></div>
            <div class="relative z-10">
              <h2 class="font-display-lg text-3xl md:text-display-lg text-primary mb-stack-md leading-tight">
                Welcome,<br/><span class="text-on-surface-variant">${userName}.</span>
              </h2>
              <p class="font-body-lg text-body-lg text-on-surface-variant mb-stack-lg max-w-md mx-auto">
                Let's turn your academic coursework, projects, and credentials into a verified Skill Passport. We'll guide you step-by-step.
              </p>

              <!-- Feature Highlights (Subtle) -->
              <div class="flex flex-col sm:flex-row justify-center gap-3 mb-stack-lg">
                <div class="flex items-center justify-center gap-2 text-on-surface-variant bg-surface-bright py-2 px-4 rounded-full shadow-sm border border-surface-variant/40">
                  <span class="material-symbols-outlined text-[16px] text-secondary">auto_awesome</span>
                  <span class="font-label-sm text-label-sm">AI-Powered Extraction</span>
                </div>
                <div class="flex items-center justify-center gap-2 text-on-surface-variant bg-surface-bright py-2 px-4 rounded-full shadow-sm border border-surface-variant/40">
                  <span class="material-symbols-outlined text-[16px] text-tertiary-fixed-dim" style="font-variation-settings: 'FILL' 1;">verified</span>
                  <span class="font-label-sm text-label-sm">Cryptographic Proof</span>
                </div>
              </div>

              <!-- Action Buttons & APAAR / DigiLocker Integration -->
              <div class="flex flex-col gap-3 justify-center items-center">
                <div class="flex flex-col sm:flex-row gap-3 justify-center items-center w-full">
                  <button onclick="OnboardingView.goToStep(4)" class="bg-primary-container text-on-primary w-full sm:w-auto px-8 py-4 rounded-full font-label-md text-label-md hover:bg-primary transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-center gap-2 group cursor-pointer">
                    <span>Get Started</span>
                    <span class="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </button>
                  <button type="button" onclick="OnboardingView.syncDigiLocker()" class="w-full sm:w-auto px-6 py-4 rounded-full bg-secondary-fixed/50 border border-secondary-fixed font-label-md text-label-md text-secondary hover:bg-secondary-fixed/70 transition-colors text-center flex items-center justify-center gap-2 cursor-pointer shadow-sm">
                    <span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">account_balance</span>
                    <span>Sync with APAAR ID / DigiLocker</span>
                  </button>
                </div>
                
                <div id="onboarding-apaar-status" class="hidden p-3 rounded-2xl bg-tertiary-fixed/20 border border-tertiary-fixed text-xs font-body-md text-primary flex items-center gap-2 mt-2">
                  <span class="material-symbols-outlined text-on-tertiary-fixed-variant text-[18px]" style="font-variation-settings: 'FILL' 1;">check_circle</span>
                  <span><strong>APAAR ID Connected!</strong> Verified with Academic Bank of Credits: <span class="font-bold text-secondary">4.5 NCrF Academic Credits Earned</span>.</span>
                </div>
              </div>
              <p class="mt-stack-md font-label-sm text-label-sm text-outline">Takes about 3 minutes to complete.</p>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  syncDigiLocker() {
    Utils.showToast("Fetching APAAR ID & DigiLocker Academic Records...", "info");
    if (typeof Auth !== "undefined") {
      Auth.updateSession({
        hasSyncedDigiLocker: true,
        ncrfCredits: 4.5
      });
    }
    setTimeout(() => {
      const statusEl = document.getElementById("onboarding-apaar-status");
      if (statusEl) {
        statusEl.classList.remove("hidden");
      }
      Utils.showToast("APAAR ID Verified: 4.5 NCrF Academic Credits Synced!", "success");
    }, 600);
  },

  renderInterestsStep() {
    return `
      <div class="min-h-[85vh] flex flex-col items-center justify-center relative overflow-hidden px-margin-mobile md:px-margin-desktop py-section-gap">
        <!-- Ambient Background -->
        <div class="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-surface-variant/30 rounded-full blur-[80px] pointer-events-none"></div>
        <div class="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-secondary-fixed/20 rounded-full blur-[100px] pointer-events-none"></div>

        <div class="w-full max-w-2xl bg-surface-container-lowest/90 backdrop-blur-xl rounded-3xl shadow-[0_4px_40px_rgba(0,0,0,0.04)] border border-surface-variant/50 p-6 md:p-10 relative z-10 my-4">
          <!-- Header & Progress -->
          <header class="mb-stack-lg flex flex-col items-center text-center">
            <div class="w-full flex justify-between items-center mb-stack-md text-outline font-label-md">
              <button onclick="OnboardingView.goToStep(1)" class="flex items-center hover:text-on-surface transition-colors cursor-pointer">
                <span class="material-symbols-outlined mr-1" style="font-size: 20px;">arrow_back</span>
                Back
              </button>
              <span class="font-semibold text-primary">Step 4 of 8</span>
              <a href="#/student/dashboard" class="flex items-center hover:text-on-surface transition-colors text-outline">
                Skip
              </a>
            </div>

            <!-- Progress Bar -->
            <div class="w-full h-1 bg-surface-container-high rounded-full mb-stack-lg overflow-hidden">
              <div class="h-full bg-primary-container rounded-full progress-bar-fill w-1/2"></div>
            </div>

            <h1 class="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-stack-sm text-primary">
              What are you interested in?
            </h1>
            <p class="font-body-lg text-body-lg text-on-surface-variant max-w-md mx-auto">
              We use this to recommend innovation challenges, internships, and teammates that fit your unique profile.
            </p>
          </header>

          <!-- Selection Grid -->
          <section class="mb-stack-lg">
            <div class="flex flex-wrap gap-2.5 justify-center" id="interest-pill-grid">
              ${this.interestsList.map(interest => {
                const isSelected = this.selectedInterests.has(interest);
                return `
                  <button 
                    onclick="OnboardingView.toggleInterest('${interest}')"
                    class="interest-pill ${isSelected ? 'selected' : 'bg-surface-bright border-outline-variant text-on-surface hover:bg-surface-container'} border font-label-md text-label-md py-2.5 px-5 rounded-full cursor-pointer select-none transition-all duration-150">
                    ${interest}
                  </button>
                `;
              }).join("")}
            </div>
          </section>

          <!-- Actions -->
          <footer class="flex flex-col sm:flex-row justify-center items-center gap-3 pt-stack-md border-t border-surface-variant/40">
            <button 
              id="continue-interests-btn"
              onclick="OnboardingView.completeOnboarding()" 
              class="bg-primary-container text-on-primary font-label-md text-label-md py-3.5 px-10 rounded-full hover:shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:bg-primary transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto">
              <span>Save & Build My VeriSkill Passport</span>
              <span class="material-symbols-outlined" style="font-size: 18px;">arrow_forward</span>
            </button>
          </footer>
        </div>
      </div>
    `;
  },

  goToStep(step) {
    this.currentStep = step;
    const appRoot = document.getElementById("app-root");
    if (appRoot) {
      appRoot.innerHTML = this.render(step);
      window.scrollTo(0, 0);
    }
  },

  toggleInterest(interest) {
    if (this.selectedInterests.has(interest)) {
      this.selectedInterests.delete(interest);
    } else {
      this.selectedInterests.add(interest);
    }
    const appRoot = document.getElementById("app-root");
    if (appRoot) {
      appRoot.innerHTML = this.render(4);
    }
  },

  completeOnboarding() {
    const interests = Array.from(this.selectedInterests);
    if (typeof Auth !== "undefined") {
      Auth.updateSession({
        interests: interests,
        hasCompletedOnboarding: true
      });
    }
    Utils.showToast("🎉 Interests saved! Welcome to your VeriSkill Passport Dashboard.", "success");
    window.location.hash = "#/student/dashboard";
  }
};
