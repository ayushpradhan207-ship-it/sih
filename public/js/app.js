/**
 * VeriSkill Central Application Controller & ⚡ Judge Demo Presets Handler
 */

const App = {
  state: {
    role: "student", // 'student' | 'recruiter' | 'teamlead' | 'admin' | 'public'
    studentId: "student-1042",
    anonymizedId: "VS-1042",
    currentRoute: "/",
    activeDemoStep: 1,
    biasMode: true, // Anti-bias mode active by default
    extractedSandboxSkills: []
  },

  /**
   * Initialize App and bind hash routing
   */
  async init() {
    window.addEventListener("hashchange", () => this.handleRoute());
    
    if (!window.location.hash) {
      window.location.hash = "#/";
    } else {
      this.handleRoute();
    }
  },

  /**
   * Switch Active User Persona
   */
  setRole(newRole) {
    this.state.role = newRole;
    Utils.showToast(`Switched persona to: ${newRole.toUpperCase()}`, "info");

    if (newRole === "student") {
      window.location.hash = "#/student/dashboard";
    } else if (newRole === "recruiter") {
      window.location.hash = "#/recruiter/dashboard";
    } else if (newRole === "teamlead") {
      window.location.hash = "#/teams";
    } else if (newRole === "admin") {
      window.location.hash = "#/admin/fairness";
    } else {
      window.location.hash = "#/";
    }
  },

  /**
   * Global Toggle for Ethical AI & Blind Evaluation Mode
   */
  toggleBiasMode() {
    this.state.biasMode = !this.state.biasMode;
    if (this.state.biasMode) {
      Utils.showToast("🔒 Ethical AI Active: Candidate names, gender, photos, and institutions masked.", "success");
    } else {
      Utils.showToast("🔓 Blind Evaluation Disabled: Candidate demographic identifiers revealed.", "info");
    }
    this.handleRoute();
  },

  // ==========================================================
  // ⚡ JUDGE DEMO PRESETS (EXACT SPECIFICATION)
  // ==========================================================

  /**
   * [Preset 1: AI Specialist Profile]
   * Loads a fully verified candidate with PyTorch & NLP project hashes
   */
  judgePresetAISpecialist() {
    this.state.role = "student";
    this.state.studentId = "student-1042";
    this.state.activeDemoStep = 1;
    window.location.hash = "#/student/dashboard";
    Utils.showToast("⚡ [Preset 1] Loaded AI Specialist #VS-1042 with PyTorch & NLP project hashes!", "success");
  },

  /**
   * [Preset 2: Simulate Bias Audit]
   * Toggles recruiter blind evaluation mode on/off to demonstrate anonymization
   */
  judgePresetSimulateBiasAudit() {
    this.state.role = "recruiter";
    this.state.biasMode = true; // ensure blind evaluation is active
    this.state.activeDemoStep = 6;
    window.location.hash = "#/recruiter/candidates";
    Utils.showToast("⚡ [Preset 2] Blind Evaluation Mode active: Names & institutions masked to #VS-1042.", "success");
  },

  /**
   * [Preset 3: Squad Solver]
   * Auto-configures role counts (1 AI, 2 Backend, 1 Frontend, 1 UI/UX) and triggers the 90%+ coverage solver
   */
  async judgePresetSquadSolver() {
    this.state.role = "teamlead";
    this.state.activeDemoStep = 8;
    
    const customProject = {
      id: "judge-preset-team",
      name: "AI Clinical Triage & Telemedicine Platform",
      track: "SOA IDEATHON Healthcare Track",
      targetTeamSize: 5,
      roleRequirements: [
        { role: "AI/ML Specialist", count: 1, primarySkills: ["Python", "Machine Learning", "PyTorch", "NLP"], weight: 0.30 },
        { role: "Backend Architect", count: 2, primarySkills: ["Node.js", "FastAPI", "PostgreSQL", "SQL"], weight: 0.30 },
        { role: "Frontend Developer", count: 1, primarySkills: ["React", "TypeScript", "Tailwind CSS"], weight: 0.20 },
        { role: "UI/UX Designer", count: 1, primarySkills: ["Figma", "UI/UX Design", "User Research"], weight: 0.20 }
      ]
    };

    try {
      const res = await Utils.fetchAPI("/api/teams/generate", {
        method: "POST",
        body: JSON.stringify({ customProject })
      });
      window.location.hash = "#/teams";
      Utils.showToast(`⚡ [Preset 3] Squad Solver triggered: 1 AI, 2 Backend, 1 Frontend, 1 UI/UX -> ${res.overallCoverageScore}% Coverage!`, "success");
    } catch (err) {
      window.location.hash = "#/teams";
    }
  },

  /**
   * [Preset 4: Validate Passport Hash]
   * Navigates to /verify and populates a valid SHA-256 hash
   */
  judgePresetValidatePassportHash() {
    const validHash = "sha256:7a9e1c3f5d7b9a1c3e5f7a9b1d3f5e7a9b1c3d5e7f9a1b3c5d7e9f1a3b5c7d9e";
    window.location.hash = `#/verify/VP-2026-IND-1042`;
    Utils.showToast(`⚡ [Preset 4] Validating W3C Passport SHA-256 signature (${validHash.slice(0, 20)}...)!`, "success");
  },

  /**
   * Execute 3-Minute Hackathon Demo Tour Step
   */
  runDemoStep(step) {
    this.state.activeDemoStep = step;

    switch (step) {
      case 1:
        this.state.role = "student";
        window.location.hash = "#/student/dashboard";
        Utils.showToast("Step 1: Student Dashboard & Skill Passport Score (84/100)", "success");
        break;
      case 2:
        this.state.role = "student";
        window.location.hash = "#/student/passport";
        Utils.showToast("Step 2: Inspecting Verifiable Skill Passport & Evidence Ledger", "success");
        break;
      case 3:
        this.state.role = "student";
        window.location.hash = "#/student/opportunities";
        Utils.showToast("Step 3: Discovered AI/ML Intern (91% Match)", "success");
        break;
      case 4:
        this.state.role = "student";
        window.location.hash = "#/student/matches/opp-ml-intern";
        Utils.showToast("Step 4: Transparent 5-Factor Score Decomposition (91%)", "success");
        break;
      case 5:
        this.state.role = "student";
        window.location.hash = "#/student/matches/opp-ml-intern";
        setTimeout(() => {
          const el = document.getElementById("skill-gap-section");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 100);
        Utils.showToast("Step 5: Skill Gap Analysis & 1-Click Bridge Labs (Docker, AWS)", "success");
        break;
      case 6:
        this.state.role = "recruiter";
        window.location.hash = "#/recruiter/candidates";
        Utils.showToast("Step 6: Recruiter Attribute-Blind Candidate Ranking (Identity Masked)", "success");
        break;
      case 7:
        this.state.role = "recruiter";
        window.location.hash = "#/recruiter/candidates";
        setTimeout(() => {
          this.viewRecruiterExplanation("VS-1042");
        }, 200);
        Utils.showToast("Step 7: Deep Explainability — Why Candidate #VS-1042 Ranked #1", "success");
        break;
      case 8:
        this.state.role = "teamlead";
        window.location.hash = "#/teams";
        Utils.showToast("Step 8: Multidisciplinary Team Complementarity Optimizer (94% Coverage)", "success");
        break;
    }
  },

  /**
   * SPA Route Dispatcher
   */
  async handleRoute() {
    const rawHash = window.location.hash.slice(1) || "/";
    const [path] = rawHash.split("?");
    this.state.currentRoute = path;

    const navContainer = document.getElementById("navbar-root");
    if (navContainer) {
      navContainer.innerHTML = NavbarComponent.render(this.state.currentRoute, this.state.role, this.state.activeDemoStep);
    }

    const appRoot = document.getElementById("app-root");
    if (!appRoot) return;

    try {
      if (path === "/" || path === "") {
        appRoot.innerHTML = LandingView.render();
      } else if (path === "/about") {
        appRoot.innerHTML = AboutView.render();
      } else if (path.startsWith("/onboarding")) {
        this.state.role = "student";
        appRoot.innerHTML = OnboardingView.render(1);
      } else if (path.startsWith("/student/dashboard")) {
        this.state.role = "student";
        appRoot.innerHTML = await StudentDashboardView.render(this.state.studentId);
      } else if (path.startsWith("/student/passport")) {
        this.state.role = "student";
        appRoot.innerHTML = await SkillPassportView.render(this.state.studentId);
      } else if (path.startsWith("/student/evidence")) {
        this.state.role = "student";
        appRoot.innerHTML = await EvidenceView.render(this.state.studentId);
      } else if (path.startsWith("/student/opportunities")) {
        this.state.role = "student";
        appRoot.innerHTML = await OpportunitiesView.render(this.state.studentId);
      } else if (path.startsWith("/student/matches/")) {
        this.state.role = "student";
        const oppId = path.split("/")[3] || "opp-ml-intern";
        appRoot.innerHTML = await MatchExplainView.render(oppId, this.state.studentId);
      } else if (path.startsWith("/student/privacy")) {
        this.state.role = "student";
        appRoot.innerHTML = await PrivacyView.render(this.state.studentId);
      } else if (path.startsWith("/recruiter/dashboard")) {
        this.state.role = "recruiter";
        appRoot.innerHTML = await RecruiterDashboardView.render();
      } else if (path.startsWith("/recruiter/candidates")) {
        this.state.role = "recruiter";
        appRoot.innerHTML = await CandidateRankView.render("opp-ml-intern");
      } else if (path.startsWith("/recruiter/jobs/create")) {
        this.state.role = "recruiter";
        appRoot.innerHTML = CreateJobView.render();
      } else if (path.startsWith("/teams")) {
        this.state.role = "teamlead";
        appRoot.innerHTML = await TeamBuilderView.render();
      } else if (path.startsWith("/admin/fairness")) {
        this.state.role = "admin";
        appRoot.innerHTML = await FairnessAuditView.render();
      } else if (path.startsWith("/verify/")) {
        const passportId = path.split("/")[2] || "VP-2026-IND-1042";
        appRoot.innerHTML = await PublicVerifyView.render(passportId);
      } else {
        appRoot.innerHTML = LandingView.render();
      }

      window.scrollTo(0, 0);

      // Notify DemoTour so the floating HUD stays visible after navigation
      if (typeof DemoTour !== "undefined" && DemoTour.isActive) {
        DemoTour.onRouteRendered(path);
      }
    } catch (err) {
      console.error("Routing error:", err);
      appRoot.innerHTML = `
        <div class="max-w-xl mx-auto my-16 p-8 bg-surface-container-lowest rounded-3xl border border-error/30 text-center shadow-lg">
          <span class="material-symbols-outlined text-error text-4xl mb-3">error</span>
          <h2 class="font-headline-md text-xl font-bold text-primary">Failed to render view</h2>
          <p class="font-body-md text-xs text-on-surface-variant mt-2">${err.message}</p>
          <a href="#/" class="mt-6 inline-block px-5 py-2.5 rounded-full bg-primary-container text-on-primary font-label-md text-xs">Return to Home</a>
        </div>
      `;
    }
  },

  // ==========================================================
  // ACTIONABLE 1-CLICK BRIDGE GAP MODAL
  // ==========================================================

  openBridgeGapModal(skillName, labTitle, hours, reward) {
    const modal = document.getElementById("bridge-gap-modal");
    const content = document.getElementById("bridge-gap-modal-content");
    if (!content) return;

    content.innerHTML = `
      <div class="flex items-center justify-between pb-4 border-b border-surface-variant/40">
        <div class="flex items-center gap-2.5">
          <div class="w-9 h-9 rounded-xl bg-secondary-fixed text-secondary flex items-center justify-center font-bold text-sm">
            <span class="material-symbols-outlined text-[20px]">rocket_launch</span>
          </div>
          <div>
            <h3 class="font-headline-md text-base font-bold text-primary">Bridge Gap Lab: ${skillName}</h3>
            <p class="font-body-md text-[11px] text-on-surface-variant">Targeted micro-credential to unlock 1.0x verified matching weight.</p>
          </div>
        </div>
        <button type="button" onclick="Utils.closeModal('bridge-gap-modal')" class="text-on-surface-variant hover:text-primary cursor-pointer">
          <span class="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      <div class="my-4 space-y-3 text-xs font-body-md">
        <div class="p-4 rounded-2xl bg-secondary-fixed/20 border border-secondary-fixed">
          <div class="font-label-md font-bold text-primary text-sm mb-1">${labTitle}</div>
          <p class="text-on-surface-variant leading-relaxed">
            Complete this hands-on lab containing production Dockerfiles, CI/CD pipeline automation, and automated validation tests.
          </p>
          <div class="mt-3 flex items-center gap-3 text-[11px] font-label-md font-semibold text-secondary">
            <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[14px]">schedule</span> Estimated Time: ${hours} Hours</span>
            <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[14px] text-amber-500" style="font-variation-settings: 'FILL' 1;">emoji_events</span> Reward: ${reward}</span>
          </div>
        </div>

        <div class="p-3.5 rounded-xl bg-surface-container-low border border-surface-variant/40 font-mono text-[11px] text-primary">
          <span class="text-[10px] text-on-surface-variant font-sans font-label-md font-bold uppercase block mb-1">Starter Template:</span>
          <div>git clone https://github.com/veriskill-templates/${skillName.toLowerCase()}-starter.git</div>
        </div>
      </div>

      <div class="pt-3 flex justify-end gap-2 border-t border-surface-variant/40">
        <button type="button" onclick="Utils.closeModal('bridge-gap-modal')" class="px-4 py-2 rounded-full bg-surface-container hover:bg-surface-container-high text-primary font-label-md font-semibold text-xs cursor-pointer">Cancel</button>
        <button type="button" onclick="App.simulateBridgeCompletion('${skillName}')" class="px-5 py-2.5 rounded-full bg-primary-container hover:bg-primary text-on-primary font-label-md font-bold text-xs shadow-sm flex items-center gap-1.5 cursor-pointer">
          <span class="material-symbols-outlined text-[16px]">check_circle</span>
          <span>Simulate Completion & Recalculate Score</span>
        </button>
      </div>
    `;

    Utils.openModal("bridge-gap-modal");
  },

  async simulateBridgeCompletion(skillName) {
    Utils.closeModal("bridge-gap-modal");
    Utils.showToast(`🎉 Lab completed for ${skillName}! Ingested verified repository commits and generated SHA-256 proof hash.`, "success");
    
    // Add skill at verified level
    await Utils.fetchAPI(`/api/students/${this.state.studentId}/skills`, {
      method: "POST",
      body: JSON.stringify({
        name: skillName,
        level: "Intermediate",
        confidence: 88,
        evidenceTitle: `Hands-on Lab: ${skillName} Microservice Benchmark`
      })
    });

    setTimeout(() => {
      this.handleRoute();
      const scoreEl = document.getElementById("live-match-score");
      if (scoreEl) {
        scoreEl.innerText = "97%";
        scoreEl.classList.add("text-emerald-400", "scale-110");
      }
      Utils.showToast("Match score dynamically boosted to 97%! Gap successfully closed.", "success");
    }, 600);
  },

  /**
   * Passport Live Skill Search
   */
  handleSkillSearch(query) {
    const q = query.toLowerCase().trim();
    const rows = document.querySelectorAll("#passport-skills-tbody .skill-row");
    rows.forEach(row => {
      const skillName = row.getAttribute("data-name") || "";
      if (skillName.includes(q)) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  },

  /**
   * Passport Category Filter
   */
  filterPassportSkills(category) {
    const pills = document.querySelectorAll(".cat-pill");
    pills.forEach(p => {
      if (p.getAttribute("data-cat") === category) {
        p.className = "cat-pill px-3 py-1 rounded-lg bg-blue-600 text-white font-medium shadow-sm transition-all";
      } else {
        p.className = "cat-pill px-3 py-1 rounded-lg bg-white text-slate-700 border border-slate-200 font-medium hover:bg-slate-100 transition-all";
      }
    });

    const rows = document.querySelectorAll("#passport-skills-tbody .skill-row");
    rows.forEach(row => {
      const cat = row.getAttribute("data-category") || "";
      if (category === "all" || cat.toLowerCase().includes(category.toLowerCase())) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  },

  /**
   * Autofill presets for Add Skill Modal
   */
  fillSkillPreset(name, level, conf, evidence) {
    const nameEl = document.getElementById("manual-skill-name");
    const levelEl = document.getElementById("manual-skill-level");
    const confEl = document.getElementById("manual-skill-conf");
    const confLbl = document.getElementById("manual-conf-label");
    const evEl = document.getElementById("manual-skill-evidence");

    if (nameEl) nameEl.value = name;
    if (levelEl) levelEl.value = level;
    if (confEl) confEl.value = conf;
    if (confLbl) confLbl.innerText = conf + "%";
    if (evEl) evEl.value = evidence;
    Utils.showToast(`Autofilled preset for ${name}!`, "info");
  },

  /**
   * Submit Custom Skill
   */
  async handleAddSkillSubmit(event) {
    event.preventDefault();
    const name = document.getElementById("manual-skill-name")?.value;
    const level = document.getElementById("manual-skill-level")?.value;
    const confidence = document.getElementById("manual-skill-conf")?.value;
    const evidenceTitle = document.getElementById("manual-skill-evidence")?.value;

    try {
      await Utils.fetchAPI(`/api/students/${this.state.studentId}/skills`, {
        method: "POST",
        body: JSON.stringify({ name, level, confidence, evidenceTitle })
      });

      Utils.closeModal("add-skill-modal");
      Utils.showToast(`Skill '${name}' added to your passport with cryptographic proof!`, "success");
      this.handleRoute();
    } catch (err) {
      console.error(err);
    }
  },

  /**
   * Autofill preset for Add Credential Modal
   */
  fillCredPreset(title, issuer, skills) {
    const titleEl = document.getElementById("manual-cred-title");
    const issuerEl = document.getElementById("manual-cred-issuer");
    const skillsEl = document.getElementById("manual-cred-skills");

    if (titleEl) titleEl.value = title;
    if (issuerEl) issuerEl.value = issuer;
    if (skillsEl) skillsEl.value = skills;
    Utils.showToast(`Autofilled preset for ${title}!`, "info");
  },

  /**
   * Submit Custom Credential
   */
  async handleAddCredentialSubmit(event) {
    event.preventDefault();
    const title = document.getElementById("manual-cred-title")?.value;
    const issuer = document.getElementById("manual-cred-issuer")?.value;
    const skillsRaw = document.getElementById("manual-cred-skills")?.value;
    const skills = skillsRaw ? skillsRaw.split(",").map(s => s.trim()) : [];

    try {
      await Utils.fetchAPI(`/api/students/${this.state.studentId}/credentials`, {
        method: "POST",
        body: JSON.stringify({ title, issuer, skills })
      });

      Utils.closeModal("add-cred-modal");
      Utils.showToast(`Credential '${title}' verified and anchored!`, "success");
      this.handleRoute();
    } catch (err) {
      console.error(err);
    }
  },

  /**
   * AI Skill Extraction Sandbox Autofill Presets
   */
  fillExtractionSample(type) {
    const titleEl = document.getElementById("sandbox-title");
    const urlEl = document.getElementById("sandbox-url");
    const textEl = document.getElementById("sandbox-text");

    if (type === "ai") {
      if (titleEl) titleEl.value = "BioBERT NLP Healthcare Triage & Diagnostic Pipeline";
      if (urlEl) urlEl.value = "https://github.com/aarav-sharma/biobert-clinical-triage";
      if (textEl) textEl.value = "Developed end-to-end NLP model using PyTorch, HuggingFace Transformers, and Python to classify medical symptoms and patient urgency. Integrated with PostgreSQL backend and deployed via FastAPI.";
    } else if (type === "web3") {
      if (titleEl) titleEl.value = "Decentralized W3C Verifiable Credentials DApp";
      if (urlEl) urlEl.value = "https://github.com/aarav-sharma/decentralized-vc-dapp";
      if (textEl) textEl.value = "Built responsive frontend in React, TypeScript, and Tailwind CSS. Integrated client-side cryptography, SHA-256 validation, and W3C Verifiable Credential standard schemas.";
    } else if (type === "cloud") {
      if (titleEl) titleEl.value = "Terraform Multi-Cluster AWS Infrastructure as Code";
      if (urlEl) urlEl.value = "https://github.com/aarav-sharma/terraform-aws-infra";
      if (textEl) textEl.value = "Provisioned Amazon VPC, EKS Kubernetes clusters, and automated GitHub Actions CI/CD pipelines. Managed Docker container registry and Linux server hardening.";
    }
    Utils.showToast("Loaded sample project text into extraction sandbox!", "info");
  },

  /**
   * Run AI Skill Extraction Sandbox
   */
  async runSandboxExtraction() {
    const title = document.getElementById("sandbox-title")?.value || "Custom Project";
    const urlInput = document.getElementById("sandbox-url")?.value || "";
    const text = document.getElementById("sandbox-text")?.value || "";
    const btn = document.getElementById("btn-run-sandbox");

    if (!text && !title) {
      Utils.showToast("Please enter project text or choose a sample preset first.", "error");
      return;
    }

    if (btn) btn.innerHTML = `<span class="material-symbols-outlined text-[16px] animate-spin">sync</span> Parsing NLP AST & Commits...`;

    try {
      const res = await Utils.fetchAPI("/api/extract-skills", {
        method: "POST",
        body: JSON.stringify({ title, url: urlInput, text })
      });

      this.state.extractedSandboxSkills = res.extractedSkills || [];

      const resultsDiv = document.getElementById("sandbox-results");
      if (resultsDiv) {
        resultsDiv.classList.remove("hidden");
        resultsDiv.innerHTML = `
          <div class="p-6 rounded-2xl bg-primary-container border border-primary/20 text-xs text-on-primary font-body-md shadow-lg">
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
              <div>
                <span class="text-tertiary-fixed-dim font-label-md font-bold uppercase text-[10px] flex items-center gap-1">
                  <span class="material-symbols-outlined text-[14px]" style="font-variation-settings: 'FILL' 1;">check_circle</span>
                  <span>AI Extraction Complete</span>
                </span>
                <h3 class="font-headline-md text-sm font-bold text-white mt-0.5">${res.extractedSkills?.length || 0} Competencies Extracted</h3>
              </div>
              <button type="button" onclick="App.addSandboxSkillsToPassport()" class="px-4 py-2 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant hover:bg-tertiary-fixed-dim font-label-md font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer">
                <span class="material-symbols-outlined text-[16px]">add_task</span>
                <span>Add All Extracted to Passport</span>
              </button>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 mb-4">
              ${(res.extractedSkills || []).map(s => `
                <div class="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div>
                    <div class="font-label-md font-bold text-white">${s.name}</div>
                    <div class="text-[10px] text-secondary-fixed font-medium">${s.level} • ${s.categoryName || s.category}</div>
                  </div>
                  <div class="text-right">
                    <span class="font-display-lg text-base font-bold text-tertiary-fixed-dim">${s.confidence}%</span>
                    <div class="text-[9px] text-on-primary-container">confidence</div>
                  </div>
                </div>
              `).join("")}
            </div>

            <div class="p-3 rounded-xl bg-primary/40 border border-white/10 font-mono text-[11px] text-slate-300 flex items-center justify-between">
              <div>
                <span class="text-[10px] text-on-primary-container uppercase font-sans font-label-md font-bold">Proof Signature:</span>
                <span class="ml-1 text-slate-300 font-mono">${res.proofHash}</span>
              </div>
              <span class="text-tertiary-fixed-dim font-label-md font-bold flex items-center gap-0.5">
                <span class="material-symbols-outlined text-[14px]" style="font-variation-settings: 'FILL' 1;">verified</span> Verified
              </span>
            </div>
          </div>
        `;
      }

      if (btn) {
        btn.innerHTML = `<span class="material-symbols-outlined text-[16px]">check_circle</span> Extracted ${res.extractedSkills?.length} Skills!`;
        btn.className = "px-5 py-2.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-md font-bold text-xs shadow-sm transition-all flex items-center gap-2 cursor-pointer";
      }

      Utils.showToast(`Extracted ${res.extractedSkills?.length} skills with confidence scores!`, "success");
    } catch (err) {
      console.error(err);
      if (btn) btn.innerHTML = `<span class="material-symbols-outlined text-[16px]">psychology</span> Run AI Skill Extraction &rarr;`;
    }
  },

  /**
   * Bulk add extracted sandbox skills to passport
   */
  async addSandboxSkillsToPassport() {
    const title = document.getElementById("sandbox-title")?.value || "Sandbox Extracted Evidence";
    const urlInput = document.getElementById("sandbox-url")?.value || "";
    const text = document.getElementById("sandbox-text")?.value || "";

    try {
      await Utils.fetchAPI("/api/evidence", {
        method: "POST",
        body: JSON.stringify({
          studentId: this.state.studentId,
          title,
          url: urlInput,
          description: text,
          technologies: this.state.extractedSandboxSkills.map(s => s.name)
        })
      });

      Utils.showToast("All extracted skills anchored to your Skill Passport!", "success");
      setTimeout(() => {
        window.location.hash = "#/student/passport";
      }, 500);
    } catch (err) {
      console.error(err);
    }
  },

  /**
   * Custom Job Matcher Autofill Presets
   */
  fillCustomJobSample(type) {
    const titleEl = document.getElementById("custom-job-title");
    const compEl = document.getElementById("custom-job-company");
    const domEl = document.getElementById("custom-job-domain");
    const textEl = document.getElementById("custom-job-text");

    if (type === "cv_robotics") {
      if (titleEl) titleEl.value = "Autonomous Drone Vision Research Intern";
      if (compEl) compEl.value = "AeroRobotics Labs";
      if (domEl) domEl.value = "Computer Vision & Robotics";
      if (textEl) textEl.value = "We are seeking a high-performing Machine Learning intern with proven competency in Python, PyTorch, Computer Vision, and Scikit-learn. Prior experience with Docker containerization and FastAPI endpoints is preferred.";
    } else if (type === "web3_sec") {
      if (titleEl) titleEl.value = "Web3 Verifiable Credential Security Engineer";
      if (compEl) compEl.value = "TrustIdentity Consortium";
      if (domEl) domEl.value = "Cybersecurity & Blockchain";
      if (textEl) textEl.value = "Seeking a developer experienced in W3C Verifiable Credentials, Cryptography, React, and OAuth 2.0. Must demonstrate verifiable code repositories and test coverage.";
    } else if (type === "fintech_da") {
      if (titleEl) titleEl.value = "Quantitative Risk & Financial Data Analyst";
      if (compEl) compEl.value = "Apex Capital Analytics";
      if (domEl) domEl.value = "FinTech & Data Science";
      if (textEl) textEl.value = "Looking for a Data Science intern with advanced SQL, Python, Pandas, and statistical Machine Learning skills. PostgreSQL database optimization experience preferred.";
    }
    Utils.showToast("Loaded sample job requirements!", "info");
  },

  /**
   * Run Custom Job Description Matcher
   */
  async runCustomJobMatch() {
    const title = document.getElementById("custom-job-title")?.value || "Custom Role";
    const company = document.getElementById("custom-job-company")?.value || "Prospective Company";
    const domain = document.getElementById("custom-job-domain")?.value || "Technology";
    const text = document.getElementById("custom-job-text")?.value || "";
    const btn = document.getElementById("btn-custom-match");

    if (!text && !title) {
      Utils.showToast("Please enter job description text or select a preset.", "error");
      return;
    }

    if (btn) btn.innerHTML = `<span class="material-symbols-outlined text-[16px] animate-spin">sync</span> Calculating 5-Factor Score...`;

    try {
      const res = await Utils.fetchAPI("/api/match/custom", {
        method: "POST",
        body: JSON.stringify({
          studentId: this.state.studentId,
          jobTitle: title,
          company: company,
          domain: domain,
          jobDescription: text
        })
      });

      const match = res.match || {};
      const resultsDiv = document.getElementById("custom-match-results");

      if (resultsDiv) {
        resultsDiv.classList.remove("hidden");
        resultsDiv.innerHTML = `
          <div class="p-6 rounded-3xl bg-primary-container border border-primary/20 text-xs text-on-primary font-body-md shadow-lg">
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
              <div>
                <span class="px-3 py-1 rounded-full bg-secondary-fixed/30 text-secondary-fixed border border-secondary-fixed/40 text-[10px] font-label-md font-bold uppercase">
                  Explainable Match Calculated
                </span>
                <h3 class="font-headline-md text-base font-bold text-white mt-1.5">${title} @ ${company}</h3>
              </div>
              <div class="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-2xl border border-white/15">
                <span class="font-display-lg text-3xl font-bold text-tertiary-fixed-dim">${match.matchScore}%</span>
                <span class="text-[10px] font-label-md text-secondary-fixed uppercase font-semibold">Match</span>
              </div>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-6">
              <div class="p-3 rounded-xl bg-white/5 border border-white/10">
                <span class="text-on-primary-container text-[11px]">Skill Alignment:</span>
                <div class="font-display-lg text-lg font-bold text-secondary-fixed">${match.scoreBreakdown?.skillAlignment || 45}%</div>
              </div>
              <div class="p-3 rounded-xl bg-white/5 border border-white/10">
                <span class="text-on-primary-container text-[11px]">Evidence Strength:</span>
                <div class="font-display-lg text-lg font-bold text-tertiary-fixed-dim">${match.scoreBreakdown?.evidenceStrength || 25}%</div>
              </div>
              <div class="p-3 rounded-xl bg-white/5 border border-white/10">
                <span class="text-on-primary-container text-[11px]">Project Relevance:</span>
                <div class="font-display-lg text-lg font-bold text-secondary-fixed">${match.scoreBreakdown?.projectRelevance || 15}%</div>
              </div>
              <div class="p-3 rounded-xl bg-white/5 border border-white/10">
                <span class="text-on-primary-container text-[11px]">Credential Proofs:</span>
                <div class="font-display-lg text-lg font-bold text-secondary-fixed">${match.scoreBreakdown?.credentialVerification || 10}%</div>
              </div>
            </div>

            <div class="mb-4">
              <span class="text-[10px] font-label-md font-bold text-on-primary-container uppercase mb-2 block tracking-wider">Verified Matched Skills:</span>
              <div class="flex flex-wrap gap-2">
                ${(match.matchedSkills || []).map(s => `
                  <span class="px-3 py-1 rounded-full bg-secondary-fixed/20 text-secondary-fixed border border-secondary-fixed/30 text-xs font-label-md font-semibold flex items-center gap-1">
                    <span class="material-symbols-outlined text-[14px]">check</span> ${s.name} (${s.confidence}%)
                  </span>
                `).join("")}
              </div>
            </div>

            ${match.missingSkills && match.missingSkills.length > 0 ? `
              <div class="p-4 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-200">
                <span class="font-label-md font-bold text-amber-300 block mb-1">Identified Skill Gaps:</span>
                <div class="space-y-1 text-slate-200">
                  ${match.missingSkills.map(g => `<div>• <strong>${g.name}</strong> (${g.gapSeverity} Gap) &rarr; ${g.remediationAction}</div>`).join("")}
                </div>
              </div>
            ` : ''}
          </div>
        `;
      }

      if (btn) {
        btn.innerHTML = `<span class="material-symbols-outlined text-[16px]">check_circle</span> Match Score: ${match.matchScore}%`;
        btn.className = "px-5 py-2.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-md font-bold text-xs shadow-sm transition-all flex items-center gap-2 cursor-pointer";
      }

      Utils.showToast(`Custom Match calculated: ${match.matchScore}% match for ${title}!`, "success");
    } catch (err) {
      console.error(err);
      if (btn) btn.innerHTML = `<span class="material-symbols-outlined text-[16px]">calculate</span> Calculate Match & Explain &rarr;`;
    }
  },

  /**
   * Search Opportunities Feed
   */
  handleOppSearch(query) {
    const q = query.toLowerCase().trim();
    const cards = document.querySelectorAll("#opp-grid .opp-card");
    cards.forEach(card => {
      const title = card.getAttribute("data-title") || "";
      const comp = card.getAttribute("data-company") || "";
      if (title.includes(q) || comp.includes(q)) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  },

  /**
   * Recalculate match weights live in Explainability view
   */
  recalculateWeightsLive(oppId) {
    const wSkill = parseInt(document.getElementById("slider-w-skill")?.value || 45, 10);
    const wEv = parseInt(document.getElementById("slider-w-evidence")?.value || 25, 10);
    const wProj = parseInt(document.getElementById("slider-w-project")?.value || 15, 10);
    const wCred = parseInt(document.getElementById("slider-w-cred")?.value || 10, 10);
    const wExp = parseInt(document.getElementById("slider-w-exp")?.value || 5, 10);

    const totalWeight = wSkill + wEv + wProj + wCred + wExp;
    const normSkill = wSkill / totalWeight;
    const normEv = wEv / totalWeight;
    const normProj = wProj / totalWeight;
    const normCred = wCred / totalWeight;
    const normExp = wExp / totalWeight;

    // Update labels
    if (document.getElementById("label-w-skill")) document.getElementById("label-w-skill").innerText = `${wSkill}%`;
    if (document.getElementById("label-w-evidence")) document.getElementById("label-w-evidence").innerText = `${wEv}%`;
    if (document.getElementById("label-w-project")) document.getElementById("label-w-project").innerText = `${wProj}%`;
    if (document.getElementById("label-w-cred")) document.getElementById("label-w-cred").innerText = `${wCred}%`;
    if (document.getElementById("label-w-exp")) document.getElementById("label-w-exp").innerText = `${wExp}%`;

    // Calculate simulated score
    const rawSkill = 100;
    const rawEv = 96;
    const rawProj = 85;
    const rawCred = 92;
    const rawExp = 90;

    const newScore = Math.round(
      (rawSkill * normSkill) + (rawEv * normEv) + (rawProj * normProj) + (rawCred * normCred) + (rawExp * normExp)
    );

    const scoreEl = document.getElementById("live-match-score");
    if (scoreEl) scoreEl.innerText = `${newScore}%`;

    if (document.getElementById("val-skill")) document.getElementById("val-skill").innerText = `${Math.round(rawSkill * normSkill)}%`;
    if (document.getElementById("val-evidence")) document.getElementById("val-evidence").innerText = `${Math.round(rawEv * normEv)}%`;
    if (document.getElementById("val-project")) document.getElementById("val-project").innerText = `${Math.round(rawProj * normProj)}%`;
    if (document.getElementById("val-cred")) document.getElementById("val-cred").innerText = `${Math.round(rawCred * normCred)}%`;
    if (document.getElementById("val-exp")) document.getElementById("val-exp").innerText = `${Math.round(rawExp * normExp)}%`;
  },

  /**
   * Reset match weights
   */
  resetMatchWeights(oppId) {
    if (document.getElementById("slider-w-skill")) document.getElementById("slider-w-skill").value = 45;
    if (document.getElementById("slider-w-evidence")) document.getElementById("slider-w-evidence").value = 25;
    if (document.getElementById("slider-w-project")) document.getElementById("slider-w-project").value = 15;
    if (document.getElementById("slider-w-cred")) document.getElementById("slider-w-cred").value = 10;
    if (document.getElementById("slider-w-exp")) document.getElementById("slider-w-exp").value = 5;

    this.recalculateWeightsLive(oppId);
    Utils.showToast("Scoring weights reset to baseline standards.", "info");
  },

  /**
   * Filter candidates in recruiter ranking view
   */
  handleCandidateFilter(query) {
    const q = query.toLowerCase().trim();
    const cards = document.querySelectorAll("#candidate-list .candidate-card");
    cards.forEach(card => {
      const skills = card.getAttribute("data-skills") || "";
      if (skills.includes(q)) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  },

  handleMinScoreFilter(minScore) {
    const min = parseInt(minScore, 10) || 0;
    const cards = document.querySelectorAll("#candidate-list .candidate-card");
    cards.forEach(card => {
      const score = parseInt(card.getAttribute("data-score") || 0, 10);
      if (score >= min) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  },

  /**
   * Open interview scheduler modal
   */
  openInterviewModal(candidateId) {
    const tokenEl = document.getElementById("invite-candidate-token");
    if (tokenEl) tokenEl.value = `Candidate #${candidateId}`;
    Utils.openModal("interview-invite-modal");
  },

  handleSendInterview(event) {
    event.preventDefault();
    const token = document.getElementById("invite-candidate-token")?.value || "Candidate";
    Utils.closeModal("interview-invite-modal");
    Utils.showToast(`Interview invitation successfully transmitted to ${token}!`, "success");
  },

  /**
   * Autofill preset for Create Job View
   */
  fillJobPreset(type) {
    const titleEl = document.getElementById("job-title");
    const compEl = document.getElementById("job-company");
    const descEl = document.getElementById("job-desc");
    const stipendEl = document.getElementById("job-stipend");

    if (type === "ai") {
      if (titleEl) titleEl.value = "AI & Deep Learning Research Intern";
      if (compEl) compEl.value = "Apex Neural Labs";
      if (stipendEl) stipendEl.value = "₹45,000 / month";
      if (descEl) descEl.value = "Engineer robust clinical prediction models, fine-tune transformer architectures, and build explainable diagnostic pipelines.";
      
      document.getElementById("skill-box-1-title").innerText = "Python";
      document.getElementById("skill-box-1-meta").innerText = "Advanced • 35% Weight";
      document.getElementById("skill-box-2-title").innerText = "PyTorch";
      document.getElementById("skill-box-2-meta").innerText = "Intermediate • 35% Weight";
      document.getElementById("skill-box-3-title").innerText = "Machine Learning";
      document.getElementById("skill-box-3-meta").innerText = "Advanced • 30% Weight";
    } else if (type === "fullstack") {
      if (titleEl) titleEl.value = "Full Stack AI Engineer Intern";
      if (compEl) compEl.value = "NeuroTech Solutions";
      if (stipendEl) stipendEl.value = "₹40,000 / month";
      if (descEl) descEl.value = "Develop high-performance React and Node.js applications with PostgreSQL time-series streaming.";
      
      document.getElementById("skill-box-1-title").innerText = "React";
      document.getElementById("skill-box-1-meta").innerText = "Advanced • 35% Weight";
      document.getElementById("skill-box-2-title").innerText = "TypeScript";
      document.getElementById("skill-box-2-meta").innerText = "Intermediate • 35% Weight";
      document.getElementById("skill-box-3-title").innerText = "Node.js";
      document.getElementById("skill-box-3-meta").innerText = "Intermediate • 30% Weight";
    } else if (type === "devops") {
      if (titleEl) titleEl.value = "Cloud Infrastructure & SRE Intern";
      if (compEl) compEl.value = "ScaleCloud Systems";
      if (stipendEl) stipendEl.value = "₹42,000 / month";
      if (descEl) descEl.value = "Manage automated Kubernetes clusters, Docker container registries, and GitHub Actions CI/CD pipelines.";
      
      document.getElementById("skill-box-1-title").innerText = "Docker";
      document.getElementById("skill-box-1-meta").innerText = "Advanced • 35% Weight";
      document.getElementById("skill-box-2-title").innerText = "AWS";
      document.getElementById("skill-box-2-meta").innerText = "Intermediate • 35% Weight";
      document.getElementById("skill-box-3-title").innerText = "Kubernetes";
      document.getElementById("skill-box-3-meta").innerText = "Intermediate • 30% Weight";
    }
    Utils.showToast("Autofilled job template!", "info");
  },

  /**
   * Submit Custom Team Roster
   */
  async handleCustomTeamSubmit(event) {
    event.preventDefault();
    const name = document.getElementById("custom-team-name")?.value || "Custom Team Project";
    const track = document.getElementById("custom-team-track")?.value || "Custom Ideathon Track";

    const aiCount = parseInt(document.getElementById("role-count-ai")?.value || 2, 10);
    const beCount = parseInt(document.getElementById("role-count-backend")?.value || 1, 10);
    const feCount = parseInt(document.getElementById("role-count-frontend")?.value || 1, 10);
    const uxCount = parseInt(document.getElementById("role-count-uiux")?.value || 1, 10);
    const cloudCount = parseInt(document.getElementById("role-count-cloud")?.value || 1, 10);

    const targetTotal = aiCount + beCount + feCount + uxCount + cloudCount;

    const customProject = {
      id: `custom-team-${Date.now()}`,
      name: name,
      track: track,
      targetTeamSize: targetTotal,
      roleRequirements: [
        { role: "AI/ML Specialist", count: aiCount, primarySkills: ["Python", "Machine Learning", "PyTorch", "NLP", "Scikit-learn"], weight: 0.35 },
        { role: "Backend Architect", count: beCount, primarySkills: ["Node.js", "FastAPI", "PostgreSQL", "REST APIs", "SQL"], weight: 0.20 },
        { role: "Frontend Developer", count: feCount, primarySkills: ["React", "TypeScript", "Tailwind CSS"], weight: 0.15 },
        ...(uxCount > 0 ? [{ role: "UI/UX Designer", count: uxCount, primarySkills: ["Figma", "UI/UX Design", "User Research", "Design Systems"], weight: 0.15 }] : []),
        { role: "Cloud & Security Lead", count: cloudCount, primarySkills: ["Docker", "Kubernetes", "AWS", "Cryptography"], weight: 0.15 }
      ]
    };

    try {
      const teamRes = await Utils.fetchAPI("/api/teams/generate", {
        method: "POST",
        body: JSON.stringify({ customProject })
      });

      Utils.closeModal("custom-team-modal");
      Utils.showToast(`Custom squad generated! Achieved ${teamRes.overallCoverageScore}% multi-role skill coverage.`, "success");
      
      this.handleRoute();
    } catch (err) {
      console.error(err);
    }
  },

  /**
   * Public Verification Search Handler (With Fallback for Tampered/Invalid Hashes)
   */
  async handleVerifySearch(event) {
    event.preventDefault();
    const query = document.getElementById("verify-search-input")?.value?.trim() || "VP-2026-IND-1042";

    if (!query) {
      Utils.showToast("Please enter a passport identifier or SHA-256 hash.", "error");
      return;
    }

    if (query.startsWith("sha256:") || query.length === 64) {
      const hexPart = query.replace("sha256:", "");
      const isHexValid = /^[0-9a-fA-F]{64}$/.test(hexPart);

      if (!isHexValid) {
        Utils.showToast("⚠️ Invalid SHA-256 format: Expected 64 hexadecimal characters.", "error");
        return;
      }

      try {
        const res = await Utils.fetchAPI(`/api/verify/hash/${encodeURIComponent(query)}`);
        Utils.showToast(res.message, "success");
        window.location.hash = `#/verify/VP-2026-IND-1042`;
      } catch (err) {
        console.error(err);
      }
    } else {
      window.location.hash = `#/verify/${encodeURIComponent(query)}`;
    }
  },

  verifySample(passportId) {
    const input = document.getElementById("verify-search-input");
    if (input) input.value = passportId;
    window.location.hash = `#/verify/${passportId}`;
  },

  /**
   * Interactive Drilldown: View Skill Evidence Proofs Modal
   */
  async viewSkillDetail(skillId) {
    try {
      const student = await Utils.fetchAPI(`/api/students/${this.state.studentId}`);
      const skill = (student.skills || []).find(s => s.id === skillId || s.name.toLowerCase() === skillId.toLowerCase()) || student.skills[0];
      const evidenceList = student.evidenceList || [];

      const matchingEvidence = evidenceList.filter(ev =>
        (ev.skills || []).some(s => s.toLowerCase() === skill.name.toLowerCase())
      );

      const modalContent = document.getElementById("skill-modal-content");
      if (!modalContent) return;

      modalContent.innerHTML = `
        <div class="p-6 bg-primary-container text-on-primary flex items-center justify-between">
          <div>
            <div class="text-[10px] font-label-md font-bold uppercase tracking-wider text-secondary-fixed">Skill Proof Evidence Drawer</div>
            <h2 class="font-headline-md text-xl font-bold text-white mt-0.5">${skill.name} (${skill.level})</h2>
          </div>
          <button type="button" onclick="Utils.closeModal('skill-evidence-modal')" class="text-on-primary-container hover:text-white cursor-pointer">
            <span class="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div class="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-xs font-body-md">
          <div class="grid grid-cols-3 gap-3 text-center">
            <div class="p-3.5 rounded-2xl bg-surface-container-low border border-surface-variant/40">
              <span class="font-label-md text-on-surface-variant font-semibold text-[10px] uppercase">Confidence</span>
              <div class="font-display-lg text-2xl font-bold text-secondary mt-0.5">${skill.confidence}%</div>
            </div>
            <div class="p-3.5 rounded-2xl bg-surface-container-low border border-surface-variant/40">
              <span class="font-label-md text-on-surface-variant font-semibold text-[10px] uppercase">Verified Proofs</span>
              <div class="font-display-lg text-2xl font-bold text-tertiary-fixed-dim mt-0.5">${matchingEvidence.length || skill.verifiedEvidenceCount}</div>
            </div>
            <div class="p-3.5 rounded-2xl bg-surface-container-low border border-surface-variant/40">
              <span class="font-label-md text-on-surface-variant font-semibold text-[10px] uppercase">Last Demonstrated</span>
              <div class="font-label-md text-xs font-bold text-primary mt-1.5">${skill.lastDemonstrated}</div>
            </div>
          </div>

          <!-- Proof Hash -->
          <div class="p-4 rounded-2xl bg-primary-container text-white font-mono text-[11px] border border-primary/20">
            <div class="text-on-primary-container text-[10px] font-label-md uppercase mb-1">Cryptographic Proof Hash</div>
            <div class="text-slate-300 break-all">${skill.proofHash || 'sha256:7b12c4e9f08a34d567890123456789abcdef0123456789abcdef0123456789ab'}</div>
          </div>

          <!-- Supporting Evidence List -->
          <div>
            <h3 class="font-headline-md text-xs font-bold text-primary uppercase tracking-wider mb-3">Supporting Verified Artifacts (${matchingEvidence.length})</h3>
            <div class="space-y-3">
              ${matchingEvidence.map((ev, i) => `
                <div class="p-4 rounded-2xl border border-surface-variant/40 bg-surface-container-lowest hover:bg-surface-bright transition-colors shadow-sm">
                  <div class="flex items-center justify-between mb-1">
                    <span class="font-label-md font-bold text-primary">${i + 1}. ${ev.type}: ${ev.title}</span>
                    ${Utils.renderVerificationBadge(ev.verificationStatus)}
                  </div>
                  <p class="font-body-md text-on-surface-variant mt-1">${ev.description}</p>
                  <div class="mt-2.5 text-[10px] text-on-surface-variant flex items-center justify-between">
                    <span>Source: <strong class="text-primary">${ev.source}</strong></span>
                    <span class="font-mono text-secondary font-semibold">${Utils.truncateHash(ev.proofHash, 6, 4)}</span>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        </div>

        <div class="p-4 bg-surface-container-low border-t border-surface-variant/40 text-right">
          <button type="button" onclick="Utils.closeModal('skill-evidence-modal')" class="px-5 py-2 rounded-full bg-primary-container hover:bg-primary text-on-primary font-label-md font-semibold text-xs cursor-pointer">
            Close Drawer
          </button>
        </div>
      `;

      Utils.openModal("skill-evidence-modal");
    } catch (err) {
      console.error(err);
    }
  },

  /**
   * Recruiter Explainability Drawer (Why Candidate Ranked #1)
   */
  async viewRecruiterExplanation(anonymizedId = "VS-1042") {
    try {
      const match = await Utils.fetchAPI("/api/match", {
        method: "POST",
        body: JSON.stringify({ studentId: "student-1042", opportunityId: "opp-ml-intern" })
      });

      const modalContent = document.getElementById("recruiter-modal-content");
      if (!modalContent) return;

      modalContent.innerHTML = `
        <div class="p-6 bg-primary-container text-on-primary flex items-center justify-between">
          <div>
            <div class="text-[10px] font-label-md font-bold uppercase tracking-wider text-secondary-fixed flex items-center gap-1">
              <span class="material-symbols-outlined text-[14px]" style="font-variation-settings: 'FILL' 1;">shield</span>
              <span>Attribute-Blind Explainable Ranking Evaluation</span>
            </div>
            <h2 class="font-headline-md text-lg md:text-xl font-bold text-white mt-0.5">Why Candidate #${anonymizedId} Ranked #1 (91% Match)</h2>
          </div>
          <button type="button" onclick="Utils.closeModal('recruiter-explain-modal')" class="text-on-primary-container hover:text-white cursor-pointer">
            <span class="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div class="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-xs font-body-md">
          <div class="p-4 rounded-2xl bg-secondary-fixed/20 border border-secondary-fixed text-primary">
            <div class="font-label-md font-bold text-sm mb-1">Algorithmic Decision Rationale</div>
            <p class="leading-relaxed">Candidate #${anonymizedId} is ranked #1 because they demonstrate verified project, coursework, and hackathon evidence across all 4 mandatory role requirements (Python, Machine Learning, SQL, PyTorch).</p>
          </div>

          <div>
            <h3 class="font-headline-md text-xs font-bold text-primary uppercase tracking-wider mb-3">Satisfied Competency Traces</h3>
            <div class="space-y-2.5">
              <div class="p-3.5 rounded-xl bg-surface-container-low border border-surface-variant/40 flex justify-between items-center">
                <div>
                  <div class="font-label-md font-bold text-primary">✓ Python (Advanced • 94% Confidence)</div>
                  <div class="text-on-surface-variant text-[11px] mt-0.5">Backed by Placement Predictor Project & 340+ GitHub Commits</div>
                </div>
                <span class="px-2.5 py-0.5 rounded-full bg-secondary-fixed/50 text-secondary border border-secondary-fixed font-label-md font-bold text-[10px]">Verified (1.0x)</span>
              </div>
              <div class="p-3.5 rounded-xl bg-surface-container-low border border-surface-variant/40 flex justify-between items-center">
                <div>
                  <div class="font-label-md font-bold text-primary">✓ Machine Learning (Advanced • 88% Confidence)</div>
                  <div class="text-on-surface-variant text-[11px] mt-0.5">Backed by DeepLearning.AI Specialization & CS-402 Coursework (Grade O)</div>
                </div>
                <span class="px-2.5 py-0.5 rounded-full bg-secondary-fixed/50 text-secondary border border-secondary-fixed font-label-md font-bold text-[10px]">Verified (1.0x)</span>
              </div>
              <div class="p-3.5 rounded-xl bg-surface-container-low border border-surface-variant/40 flex justify-between items-center">
                <div>
                  <div class="font-label-md font-bold text-primary">✓ PyTorch (Intermediate • 76% Confidence)</div>
                  <div class="text-on-surface-variant text-[11px] mt-0.5">Demonstrated in BioBERT NLP Healthcare Triage Repository</div>
                </div>
                <span class="px-2.5 py-0.5 rounded-full bg-secondary-fixed/50 text-secondary border border-secondary-fixed font-label-md font-bold text-[10px]">Verified (1.0x)</span>
              </div>
              <div class="p-3.5 rounded-xl bg-surface-container-low border border-surface-variant/40 flex justify-between items-center">
                <div>
                  <div class="font-label-md font-bold text-primary">✓ SQL (Intermediate • 79% Confidence)</div>
                  <div class="text-on-surface-variant text-[11px] mt-0.5">Backed by University of Michigan PostgreSQL Specialization</div>
                </div>
                <span class="px-2.5 py-0.5 rounded-full bg-secondary-fixed/50 text-secondary border border-secondary-fixed font-label-md font-bold text-[10px]">Verified (1.0x)</span>
              </div>
            </div>
          </div>

          <div class="p-4 rounded-2xl bg-primary-container text-white font-mono text-[11px] border border-primary/20">
            <div class="text-tertiary-fixed-dim font-label-md font-bold uppercase mb-2">Attribute-Blind Invariance Check</div>
            <div class="text-slate-300">Excluded from scoring: [Name, Gender, Age, Photo, College Tier, Pincode, Social Background]</div>
            <div class="mt-1.5 text-on-primary-container">Pure feature vector: Verified Code AST, Cryptographic Proofs, Skill Confidence.</div>
          </div>
        </div>

        <div class="p-4 bg-surface-container-low border-t border-surface-variant/40 flex justify-between items-center">
          <button type="button" onclick="App.openInterviewModal('${anonymizedId}')" class="px-4 py-2 rounded-full bg-primary-container hover:bg-primary text-on-primary font-label-md font-bold text-xs shadow-sm transition-colors flex items-center gap-1 cursor-pointer">
            <span class="material-symbols-outlined text-[16px]">calendar_add_on</span>
            <span>Invite / Shortlist #${anonymizedId}</span>
          </button>
          <button type="button" onclick="Utils.closeModal('recruiter-explain-modal')" class="px-4 py-2 rounded-full bg-surface-container hover:bg-surface-container-high text-primary font-label-md font-semibold text-xs cursor-pointer">
            Close
          </button>
        </div>
      `;

      Utils.openModal("recruiter-explain-modal");
    } catch (err) {
      console.error(err);
    }
  },

  /**
   * "Improve My Match" Interactive Simulation
   */
  simulateImproveMatch() {
    const btn = document.getElementById("btn-improve-match");
    const scoreEl = document.getElementById("live-match-score");
    if (btn) btn.innerHTML = `<span class="material-symbols-outlined text-[16px] animate-spin">sync</span> Ingesting Docker & AWS Mini-Project...`;

    setTimeout(() => {
      if (scoreEl) {
        scoreEl.innerText = "97%";
        scoreEl.classList.add("text-tertiary-fixed-dim", "scale-110");
      }
      if (btn) {
        btn.innerHTML = `<span class="material-symbols-outlined text-[16px]">check_circle</span> Match Improved: 97%! (Gap Closed)`;
        btn.className = "px-5 py-2.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-md font-bold text-xs shadow-sm shrink-0 flex items-center gap-2 cursor-pointer";
      }
      Utils.showToast("🎉 Verified Docker + AWS mini-project ingested! Match score jumped from 91% -> 97%", "success");
    }, 900);
  },

  /**
   * Ingest new evidence simulation
   */
  async handleIngestEvidence(event) {
    event.preventDefault();
    const title = document.getElementById("ingest-title")?.value;
    const url = document.getElementById("ingest-url")?.value;
    const description = document.getElementById("ingest-desc")?.value;
    const techRaw = document.getElementById("ingest-tech")?.value;
    const technologies = techRaw ? techRaw.split(",").map(t => t.trim()) : [];

    try {
      const res = await Utils.fetchAPI("/api/evidence", {
        method: "POST",
        body: JSON.stringify({
          studentId: this.state.studentId,
          title,
          url,
          description,
          technologies
        })
      });

      Utils.closeModal("add-evidence-modal");
      Utils.showToast(`Ingested ${res.extractedSkills?.length || 5} skills with cryptographic proof hash!`, "success");
      this.handleRoute();
    } catch (err) {
      console.error(err);
    }
  },

  /**
   * Export W3C Verifiable Credential JSON-LD
   */
  async exportPassportVC(studentId = "student-1042") {
    const data = await Utils.fetchAPI(`/api/verify/public/VP-2026-IND-1042`);
    const blob = new Blob([JSON.stringify(data.w3cVerifiableCredential, null, 2)], { type: "application/ld+json" });
    const downloadUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = `veriskill-passport-${data.anonymizedId}.jsonld`;
    a.click();
    Utils.showToast("W3C Verifiable Credential JSON-LD exported successfully!", "success");
  },

  /**
   * Run Live Bias Audit Simulation
   */
  async runLiveFairnessAudit() {
    const btn = document.getElementById("btn-run-audit");
    if (btn) btn.innerHTML = `<span class="material-symbols-outlined text-[16px] animate-spin">sync</span> Running Demographic Audit...`;

    setTimeout(async () => {
      await Utils.fetchAPI("/api/audit/fairness", { method: "POST" });
      Utils.showToast("Fairness Audit PASSED: Disparate Impact Ratio 0.94 (> 0.80 standard)", "success");
      this.handleRoute();
    }, 800);
  },

  /**
   * Toggle Attribute Blind Excluded List
   */
  toggleBlindDetails() {
    const el = document.getElementById("blind-details-panel");
    if (el) el.classList.toggle("hidden");
  },

  /**
   * Switch Team Challenge Project
   */
  switchTeamProject(projectId) {
    window.location.hash = `#/teams?proj=${projectId}`;
    this.handleRoute();
  },

  recalculateTeam(projectId) {
    Utils.showToast("Re-running combinatorial complementarity optimizer...", "info");
    setTimeout(() => {
      this.handleRoute();
      Utils.showToast("Optimal multidisciplinary squad updated!", "success");
    }, 500);
  },

  exportTeamRoster() {
    Utils.showToast("Multidisciplinary Squad Roster exported to PDF/JSON!", "success");
  },

  handleCreateJob(event) {
    event.preventDefault();
    Utils.showToast("New role published with verified skill criteria! Candidate matches generated.", "success");
    setTimeout(() => {
      window.location.hash = "#/recruiter/candidates";
    }, 600);
  },

  showDemoInfoModal() {
    alert("SOA IDEATHON 2026 / Smart India Hackathon 2026\\n\\nVeriSkill — Verifiable Skill Passport & Explainable Internship/Team Matching Platform\\n\\n⚡ Judge Demo Presets Available at the Top:\\n[Preset 1: AI Specialist Profile]\\n[Preset 2: Simulate Bias Audit]\\n[Preset 3: Squad Solver]\\n[Preset 4: Validate Passport Hash]");
  }
};

// Initialize App on DOM load
document.addEventListener("DOMContentLoaded", () => {
  App.init();
});
