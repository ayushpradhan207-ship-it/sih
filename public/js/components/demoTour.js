/**
 * VeriSkill — 3-Minute Interactive Judge Demo Tour Component (Stitch UI)
 * Guides hackathon judges and evaluators through the complete end-to-end evidence & explainability pipeline.
 */

const DemoTour = {
  isActive: false,
  currentStep: 1,
  totalSteps: 7,

  steps: [
    {
      step: 1,
      title: "From Claims to Verifiable Skills",
      subtitle: "The Core Problem & Paradigm Shift",
      route: "#/",
      role: "student",
      explanation: "Students have certificates, projects, coursework, and competition experience, but recruiters need verifiable evidence rather than unsupported skill claims. VeriSkill transforms self-reported resumes into cryptographic, evidence-backed proof chains.",
      highlights: [
        "Traditional resumes = Self-inflated keywords & unverifiable claims",
        "VeriSkill Paradigm = Multi-source AST code analysis & W3C Verifiable Credentials",
        "Objective = Zero trust needed; every competency is backed by code, grades, and commits"
      ],
      badge: "Problem & Vision",
      icon: "psychology_alt"
    },
    {
      step: 2,
      title: "Student Dashboard & Unified Readiness",
      subtitle: "Real-Time Competency Ledger & Provenance Index",
      route: "#/student/dashboard",
      role: "student",
      explanation: "This dashboard gives a student a complete, transparent view of their verified skills, evidence trust index (96/100), active skill passport score (88/100), and real-time opportunity recommendations tailored to proof strengths.",
      highlights: [
        "Passport Score: 88/100 across 17 verified competencies",
        "Evidence Trust Index: 96% backed by GitHub AST parsing & university coursework",
        "Automated Gap Detection: Highlights exact missing skills before applying"
      ],
      badge: "Student Experience",
      icon: "dashboard"
    },
    {
      step: 3,
      title: "Verifiable Skill Passport",
      subtitle: "Portable W3C Verifiable Credential Schema",
      route: "#/student/passport",
      role: "student",
      explanation: "VeriSkill converts coursework, projects, hackathons, and micro-credentials into a portable, tamper-evident Skill Passport. Each skill is scored with a confidence percentage and anchored by a SHA-256 cryptographic proof hash.",
      highlights: [
        "Triangulated Confidence: Python (94%), Machine Learning (88%), PyTorch (76%)",
        "Interactive Evidence Drawer: Click any skill to inspect repository commits & AST trees",
        "W3C JSON-LD Compliant: Exportable for self-sovereign identity wallets"
      ],
      badge: "Cryptographic Passport",
      icon: "badge"
    },
    {
      step: 4,
      title: "Evidence Portfolio & Skill Gaps",
      subtitle: "Multi-Source AST Triangulation & Actionable Remediation",
      route: "#/student/evidence",
      role: "student",
      explanation: "Every important skill is connected to evidence, while missing skills are explicitly identified instead of hidden. VeriSkill surfaces actionable skill gaps and provides 1-click hands-on remediation labs to level up readiness.",
      highlights: [
        "AST Code Parser: Inspects Git repositories, dependency trees, and architectural complexity",
        "Explicit Skill Gaps: Identifies missing REST API & Cloud evidence rather than penalizing silently",
        "Hands-On Bridge Labs: Students can ingest new projects in real-time to close gaps"
      ],
      badge: "Evidence & Gaps",
      icon: "fact_check"
    },
    {
      step: 5,
      title: "Explainable 5-Factor Matching",
      subtitle: "Mathematical Transparency vs. ATS Black Boxes",
      route: "#/student/matches/opp-ml-intern",
      role: "student",
      explanation: "VeriSkill does not simply rank a student. It explains WHY the student matches an opportunity using a transparent 5-factor mathematical formula with interactive weight sensitivity analysis.",
      highlights: [
        "Formula: 0.45×Skill + 0.25×Evidence + 0.15×Project + 0.10×VC + 0.05×Exp = 91% Match",
        "Traceable Rationale: Shows exactly which requirements are met (Python, ML, SQL, PyTorch)",
        "Interactive What-If Simulator: Ingesting a Docker mini-project dynamically boosts score to 97%"
      ],
      badge: "Explainable AI",
      icon: "insights"
    },
    {
      step: 6,
      title: "Multidisciplinary Teams & Fairness Audit",
      subtitle: "Combinatorial Synergy & EEOC Disparate Impact Compliance",
      route: "#/teams",
      role: "teamlead",
      explanation: "The same evidence-based engine forms multidisciplinary teams with 94% domain coverage while the fairness auditor verifies that demographic or proxy attributes (names, photos, colleges) are quarantined from scoring.",
      highlights: [
        "Squad Solver: Optimizes skill complementarity across Frontend, ML, Security, Cloud, UI/UX",
        "Algorithmic Fairness: EEOC 4/5ths Disparate Impact Ratio = 0.94 (> 0.80 standard)",
        "Attribute-Blind Guarantee: Strict isolation of protected demographic vectors"
      ],
      badge: "Teams & Ethical AI",
      icon: "diversity_3"
    },
    {
      step: 7,
      title: "Public Verification & Immutable Proof",
      subtitle: "Independent Verification Without Trusting Claims",
      route: "#/verify/VP-2026-IND-1042",
      role: "public",
      explanation: "A recruiter or evaluator can independently verify the underlying cryptographic proof instead of simply trusting a self-reported resume claim. Every credential is authenticated via SHA-256 and Ed25519 signature proofs.",
      highlights: [
        "Instant Hash Validation: Verifies tamper-evident integrity in real-time",
        "W3C Credential Download: Produces verifiable JSON-LD format with cryptographic signature",
        "The VeriSkill Standard: Proof, Not Claims."
      ],
      badge: "Final Proof",
      icon: "verified"
    }
  ],

  /**
   * Start or Restart the Tour
   */
  startTour(startStep = 1) {
    this.isActive = true;
    this.currentStep = Math.max(1, Math.min(startStep, this.totalSteps));
    if (typeof Auth !== "undefined") {
      Auth.startDemoTour();
    }
    this.bindKeyboard();
    this.goToStep(this.currentStep);
    if (window.Utils) {
      Utils.showToast("🚀 3-Minute Judge Demo Tour started! (Aarav Sharma Demo Profile Loaded)", "info");
    }
  },

  /**
   * Navigate to a specific step
   */
  async goToStep(stepNumber) {
    if (!this.isActive) return;
    this.currentStep = Math.max(1, Math.min(stepNumber, this.totalSteps));
    const stepData = this.steps[this.currentStep - 1];

    // Set persona role if required
    if (stepData.role && window.App) {
      window.App.state.role = stepData.role;
    }

    // Navigate to target route if not already there
    if (window.location.hash !== stepData.route) {
      window.location.hash = stepData.route;
    }

    // Render / update floating Tour HUD overlay
    this.renderTourHUD();

    // Scroll smoothly to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  },

  /**
   * Next Step
   */
  next() {
    if (this.currentStep < this.totalSteps) {
      this.goToStep(this.currentStep + 1);
    } else {
      this.endTour();
      if (window.Utils) {
        Utils.showToast("✨ Judge Demo Tour completed! Explore VeriSkill freely.", "success");
      }
    }
  },

  /**
   * Previous Step
   */
  prev() {
    if (this.currentStep > 1) {
      this.goToStep(this.currentStep - 1);
    }
  },

  /**
   * End or Exit the Tour
   */
  endTour() {
    this.isActive = false;
    this.unbindKeyboard();
    const existing = document.getElementById("judge-demo-tour-hud");
    if (existing) existing.remove();
  },

  /**
   * Hook called by App.handleRoute to keep HUD in sync
   */
  onRouteRendered(route) {
    if (!this.isActive) return;
    setTimeout(() => {
      this.renderTourHUD();
    }, 120);
  },

  /**
   * Render the floating Stitch-themed Tour HUD
   */
  renderTourHUD() {
    if (!this.isActive) return;

    let hudEl = document.getElementById("judge-demo-tour-hud");
    if (!hudEl) {
      hudEl = document.createElement("div");
      hudEl.id = "judge-demo-tour-hud";
      hudEl.className = "fixed bottom-6 right-4 sm:right-6 max-w-xl w-[calc(100vw-32px)] sm:w-full z-[9999] transition-all duration-300 font-body-md";
      document.body.appendChild(hudEl);
    }

    const step = this.steps[this.currentStep - 1];
    const isFirst = this.currentStep === 1;
    const isLast = this.currentStep === this.totalSteps;

    hudEl.innerHTML = `
      <div class="bg-surface-container-lowest text-primary rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.22)] border-2 border-secondary/40 p-5 sm:p-7 backdrop-blur-2xl relative overflow-hidden">
        
        <!-- Header Strip -->
        <div class="flex items-center justify-between gap-3 mb-3">
          <div class="flex items-center gap-2">
            <span class="px-3 py-1 rounded-full bg-secondary-fixed/50 text-secondary border border-secondary font-label-md font-bold text-xs flex items-center gap-1">
              <span class="material-symbols-outlined text-[14px]" style="font-variation-settings: 'FILL' 1;">${step.icon}</span>
              Step ${this.currentStep} of ${this.totalSteps}
            </span>
            <span class="text-[11px] font-label-sm font-semibold uppercase tracking-wider text-on-surface-variant hidden sm:inline-block">
              ${step.badge}
            </span>
          </div>

          <div class="flex items-center gap-1">
            <button type="button" onclick="DemoTour.endTour()" class="p-1.5 rounded-full hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors cursor-pointer" title="Exit Tour (Esc)">
              <span class="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        <!-- Progress Segments -->
        <div class="grid grid-cols-7 gap-1.5 mb-4">
          ${this.steps.map((s) => `
            <div 
              onclick="DemoTour.goToStep(${s.step})" 
              class="h-1.5 rounded-full transition-all cursor-pointer ${s.step === this.currentStep ? 'bg-secondary ring-2 ring-secondary/30' : s.step < this.currentStep ? 'bg-secondary/40' : 'bg-surface-container-high'}"
              title="Go to Step ${s.step}: ${s.title}">
            </div>
          `).join("")}
        </div>

        <!-- Title & Subtitle -->
        <div class="mb-3">
          <h3 class="font-headline-md text-base sm:text-lg font-bold text-primary leading-snug">
            ${step.title}
          </h3>
          <p class="font-label-md text-xs text-secondary font-semibold mt-0.5">
            ${step.subtitle}
          </p>
        </div>

        <!-- Explanation Body -->
        <p class="font-body-md text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-3.5">
          ${step.explanation}
        </p>

        <!-- Key Takeaways Box -->
        <div class="p-3.5 rounded-2xl bg-surface-container-low border border-surface-variant/50 mb-4 space-y-1.5">
          <span class="text-[10px] font-label-md font-bold uppercase tracking-wider text-primary block">
            Judge Evaluation Takeaways:
          </span>
          ${step.highlights.map(h => `
            <div class="text-[11px] text-on-surface flex items-start gap-1.5 leading-tight">
              <span class="material-symbols-outlined text-[14px] text-secondary shrink-0 mt-0.5" style="font-variation-settings: 'FILL' 1;">check_circle</span>
              <span>${h}</span>
            </div>
          `).join("")}
        </div>

        ${isLast ? `
          <!-- Final Callout Banner -->
          <div class="p-3.5 rounded-2xl bg-primary-container text-on-primary border border-primary/20 mb-4 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-[20px] text-tertiary-fixed-dim" style="font-variation-settings: 'FILL' 1;">verified</span>
              <div>
                <div class="font-headline-md font-bold text-sm text-white">VeriSkill — Proof, Not Claims.</div>
                <div class="text-[10px] text-slate-300">Ready for SIH & SOA IDEATHON 2026 Production Deployment</div>
              </div>
            </div>
          </div>
        ` : ''}

        <!-- Actions Bar -->
        <div class="flex items-center justify-between pt-2 border-t border-surface-variant/40">
          <div>
            <button type="button" onclick="DemoTour.endTour()" class="text-xs font-label-md text-on-surface-variant hover:text-primary font-medium transition-colors cursor-pointer">
              Skip Tour
            </button>
          </div>

          <div class="flex items-center gap-2">
            ${!isFirst ? `
              <button type="button" onclick="DemoTour.prev()" class="px-4 py-2 rounded-full bg-surface-container hover:bg-surface-container-high text-primary font-label-md font-semibold text-xs transition-all flex items-center gap-1 cursor-pointer">
                <span class="material-symbols-outlined text-[14px]">arrow_back</span>
                Back
              </button>
            ` : ''}

            ${isLast ? `
              <button type="button" onclick="DemoTour.startTour(1)" class="px-4 py-2 rounded-full bg-surface-container hover:bg-surface-container-high text-primary font-label-md font-semibold text-xs transition-all flex items-center gap-1 cursor-pointer">
                <span class="material-symbols-outlined text-[14px]">replay</span>
                Restart Tour
              </button>
              <button type="button" onclick="DemoTour.endTour()" class="px-5 py-2.5 rounded-full bg-primary-container hover:bg-primary text-on-primary font-label-md font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer">
                <span class="material-symbols-outlined text-[16px]">celebration</span>
                Exit Demo
              </button>
            ` : `
              <button type="button" onclick="DemoTour.next()" class="px-5 py-2.5 rounded-full bg-primary-container hover:bg-primary text-on-primary font-label-md font-bold text-xs shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer">
                <span>Next: Step ${this.currentStep + 1}</span>
                <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            `}
          </div>
        </div>

      </div>
    `;
  },

  /**
   * Bind Keyboard Listeners (Arrow keys & Esc)
   */
  bindKeyboard() {
    this._keyHandler = (e) => {
      if (!this.isActive) return;
      if (e.key === "ArrowRight" || e.key === "n" || e.key === "N") {
        e.preventDefault();
        this.next();
      } else if (e.key === "ArrowLeft" || e.key === "p" || e.key === "P") {
        e.preventDefault();
        this.prev();
      } else if (e.key === "Escape") {
        e.preventDefault();
        this.endTour();
      }
    };
    window.addEventListener("keydown", this._keyHandler);
  },

  unbindKeyboard() {
    if (this._keyHandler) {
      window.removeEventListener("keydown", this._keyHandler);
      this._keyHandler = null;
    }
  }
};
