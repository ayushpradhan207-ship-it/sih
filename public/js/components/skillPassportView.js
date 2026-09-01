/**
 * VeriSkill — Stitch Skill Passport Component (Source of Truth)
 */

const SkillPassportView = {
  async render(studentId = "student-1042") {
    const student = await Utils.fetchAPI(`/api/students/${studentId}`);
    const allSkills = student.skills || [];
    const metrics = student.passportMetrics || {};
    const completionRate = metrics.overallScore || 78;

    // Group skills by category
    const programmingSkills = allSkills.filter(s => s.category === "Programming" || ["Python", "Java", "SQL", "TypeScript", "C++", "JavaScript", "Go"].includes(s.name));
    const dataAISkills = allSkills.filter(s => s.category === "Machine Learning" || s.category === "Data Science" || s.category === "Data & AI" || ["Machine Learning", "Data Analysis", "Deep Learning", "NLP", "Computer Vision", "Scikit-Learn"].includes(s.name));
    const professionalSkills = allSkills.filter(s => s.category === "Soft Skills" || s.category === "Professional" || ["Problem Solving", "Team Collaboration", "Communication", "System Design", "Agile"].includes(s.name) || (!programmingSkills.includes(s) && !dataAISkills.includes(s)));

    return `
      <div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-24 md:pt-28 pb-section-gap flex flex-col gap-stack-lg min-h-screen">
        
        <!-- Action Toolbar -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div class="flex items-center gap-2 text-xs font-label-md text-on-surface-variant">
            <span class="material-symbols-outlined text-secondary text-sm" style="font-variation-settings: 'FILL' 1;">shield</span>
            <span>W3C Standard Verifiable Credential Passport v1.1</span>
          </div>

          <div class="flex items-center gap-2">
            <button onclick="Utils.openModal('add-skill-modal')" class="px-4 py-2 bg-primary-container text-on-primary font-label-md text-label-md rounded-full hover:bg-primary transition-all shadow-sm flex items-center gap-1.5 cursor-pointer text-xs">
              <span class="material-symbols-outlined text-[16px]">add</span> Add Skill
            </button>
            <button onclick="Utils.openModal('add-cred-modal')" class="px-4 py-2 bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-label-md rounded-full transition-all border border-outline-variant/30 flex items-center gap-1.5 cursor-pointer text-xs">
              <span class="material-symbols-outlined text-[16px]">card_membership</span> Add Certificate
            </button>
            <button onclick="App.exportPassportVC('${student.id}')" class="px-4 py-2 bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-label-md rounded-full transition-all border border-outline-variant/30 flex items-center gap-1.5 cursor-pointer text-xs">
              <span class="material-symbols-outlined text-[16px]">code</span> Export JSON-LD
            </button>
          </div>
        </div>

        <!-- Profile Header Section -->
        <section class="relative bg-surface-container-lowest rounded-2xl p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center ai-glow border border-surface-variant/40">
          
          <!-- Avatar with Floating Verification Badge -->
          <div class="relative shrink-0">
            <div class="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-surface-container p-1 bg-white shadow-sm z-10 relative">
              <img alt="${student.personal?.fullName || "Ashutosh Pradhan"}" class="w-full h-full rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSWx0e2-SEWuIEGrXnsvm4ah9oeU6y1aOzAG4Hf9K4yxBpcSVeqnczMjJTZnq0xzbMBMgC8xTk-fai4OeLnjMB_zOat6msJCXv6S2jCT7eD2NGWg388APSwrIDqdYI3tmEU9LXwtWGPjApaWaw-tzeysQUFiiSrvMrkP9P8QAMV7y16_bdAgeXsAE9gCf_mEus3MjgRa-ZbPX38HW7vV6wdz-RuHIOPuawrFMKu4xyLIMr9L2jFZIwIQ"/>
            </div>
            <!-- Verification Badge Floating -->
            <div class="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md z-20 flex items-center justify-center">
              <span class="material-symbols-outlined text-secondary" style="font-variation-settings: 'FILL' 1;">verified</span>
            </div>
          </div>

          <!-- Identity & Summary -->
          <div class="flex-grow flex flex-col gap-2">
            <div class="flex items-center gap-3 flex-wrap">
              <h1 class="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-bold">
                ${student.personal?.fullName || "Ashutosh Pradhan"}
              </h1>
              <span class="px-3 py-1 bg-secondary-fixed/50 text-secondary font-label-sm text-label-sm rounded-full flex items-center gap-1 font-semibold">
                <span class="material-symbols-outlined text-[14px]">shield</span> Identity Verified
              </span>
              <span class="px-2.5 py-0.5 bg-surface-container text-on-surface-variant font-mono text-xs rounded-full font-medium">
                ${student.passportId}
              </span>
            </div>
            <p class="font-body-md text-body-md text-on-surface-variant max-w-2xl leading-relaxed text-sm">
              Data-driven software engineer specializing in Python and machine learning. Proven track record in analytical problem-solving and cross-functional team collaboration.
            </p>
          </div>

          <!-- Completion Widget -->
          <div class="w-full md:w-64 bg-surface-bright rounded-xl p-4 border border-outline-variant/30 flex flex-col gap-3 shrink-0">
            <div class="flex justify-between items-end">
              <span class="font-label-md text-label-md text-on-surface font-semibold">Passport Completion</span>
              <span class="font-headline-md text-headline-md text-primary font-bold tracking-tight">${completionRate}%</span>
            </div>
            <!-- Sleek Progress Bar -->
            <div class="h-2 w-full bg-surface-variant rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-secondary to-tertiary-fixed-dim rounded-full" style="width: ${completionRate}%;"></div>
            </div>
            <p class="font-label-sm text-label-sm text-on-surface-variant text-right font-medium">Strong Verification Tier</p>
          </div>
        </section>

        <!-- 3-Column Categorized Passport Grid -->
        <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          
          <!-- Category: Programming -->
          <div class="bg-surface-container-lowest rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col gap-stack-md border border-surface-variant/40">
            <div class="flex items-center gap-2 mb-1">
              <span class="material-symbols-outlined text-secondary">code</span>
              <h2 class="font-headline-md text-headline-md text-primary font-bold text-xl">Programming</h2>
            </div>
            
            <div class="flex flex-col gap-4">
              <!-- Python -->
              <div class="flex flex-col gap-1.5 pb-3 border-b border-surface-variant/40 cursor-pointer" onclick="App.viewSkillDetail('sk-python')">
                <div class="flex justify-between items-start">
                  <div class="flex items-center gap-2">
                    <span class="font-label-md text-label-md text-primary font-semibold">Python</span>
                    <span class="material-symbols-outlined text-[14px] text-tertiary-fixed-dim" style="font-variation-settings: 'FILL' 1;">stars</span>
                  </div>
                  <span class="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full font-medium">Advanced</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="flex-grow h-1.5 bg-surface-variant rounded-full overflow-hidden">
                    <div class="h-full bg-tertiary-fixed-dim rounded-full" style="width: 95%;"></div>
                  </div>
                  <span class="font-label-sm text-label-sm text-on-surface-variant whitespace-nowrap text-xs">4 verified items</span>
                </div>
              </div>

              <!-- SQL -->
              <div class="flex flex-col gap-1.5 pb-3 border-b border-surface-variant/40 cursor-pointer" onclick="App.viewSkillDetail('sk-sql')">
                <div class="flex justify-between items-start">
                  <div class="flex items-center gap-2">
                    <span class="font-label-md text-label-md text-primary font-semibold">SQL</span>
                    <span class="material-symbols-outlined text-[14px] text-tertiary-fixed-dim" style="font-variation-settings: 'FILL' 1;">check_circle</span>
                  </div>
                  <span class="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full font-medium">Proficient</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="flex-grow h-1.5 bg-surface-variant rounded-full overflow-hidden">
                    <div class="h-full bg-tertiary-fixed-dim rounded-full" style="width: 75%;"></div>
                  </div>
                  <span class="font-label-sm text-label-sm text-on-surface-variant whitespace-nowrap text-xs">1 verified item</span>
                </div>
              </div>

              <!-- Java -->
              <div class="flex flex-col gap-1.5">
                <div class="flex justify-between items-start">
                  <span class="font-label-md text-label-md text-primary font-semibold">Java</span>
                  <span class="font-label-sm text-label-sm text-on-surface-variant">Intermediate</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="flex-grow h-1.5 bg-surface-variant rounded-full overflow-hidden">
                    <div class="h-full bg-outline rounded-full" style="width: 60%;"></div>
                  </div>
                  <span class="font-label-sm text-label-sm text-on-surface-variant whitespace-nowrap opacity-60 text-xs">Unverified (0.3x)</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Category: Data & AI -->
          <div class="bg-surface-container-lowest rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col gap-stack-md border border-surface-variant/40 relative overflow-hidden">
            <div class="absolute -right-10 -top-10 w-32 h-32 bg-secondary-fixed/20 blur-2xl rounded-full pointer-events-none"></div>
            
            <div class="flex items-center gap-2 mb-1 relative z-10">
              <span class="material-symbols-outlined text-secondary">psychology</span>
              <h2 class="font-headline-md text-headline-md text-primary font-bold text-xl">Data & AI</h2>
            </div>
            
            <div class="flex flex-col gap-4 relative z-10">
              <!-- Machine Learning -->
              <div class="flex flex-col gap-1.5 pb-3 border-b border-surface-variant/40 cursor-pointer" onclick="App.viewSkillDetail('sk-ml')">
                <div class="flex justify-between items-start">
                  <div class="flex items-center gap-2">
                    <span class="font-label-md text-label-md text-primary font-semibold">Machine Learning</span>
                    <div class="verified-gradient-border rounded-full px-2 py-[1px] flex items-center gap-1">
                      <span class="material-symbols-outlined text-[12px] text-secondary" style="font-variation-settings: 'FILL' 1;">verified</span>
                      <span class="text-[9px] font-bold tracking-wider text-secondary uppercase">Verified</span>
                    </div>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <div class="flex-grow h-1.5 bg-surface-variant rounded-full overflow-hidden progress-track" style="--progress: 85%;"></div>
                  <span class="font-label-sm text-label-sm text-on-surface-variant whitespace-nowrap text-xs">High Confidence</span>
                </div>
              </div>

              <!-- Data Analysis -->
              <div class="flex flex-col gap-1.5 pb-3 border-b border-surface-variant/40 cursor-pointer" onclick="App.viewSkillDetail('sk-data')">
                <div class="flex justify-between items-start">
                  <div class="flex items-center gap-2">
                    <span class="font-label-md text-label-md text-primary font-semibold">Data Analysis</span>
                  </div>
                  <span class="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full font-medium">Verified</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="flex-grow h-1.5 bg-surface-variant rounded-full overflow-hidden progress-track" style="--progress: 75%;"></div>
                  <span class="font-label-sm text-label-sm text-on-surface-variant whitespace-nowrap text-xs">Med-High Confidence</span>
                </div>
              </div>

              <!-- NLP / Deep Learning -->
              <div class="flex flex-col gap-1.5 cursor-pointer" onclick="App.viewSkillDetail('sk-nlp')">
                <div class="flex justify-between items-start">
                  <span class="font-label-md text-label-md text-primary font-semibold">NLP & Transformers</span>
                  <span class="font-label-sm text-label-sm text-on-surface-variant">Coursework</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="flex-grow h-1.5 bg-surface-variant rounded-full overflow-hidden progress-track" style="--progress: 80%;"></div>
                  <span class="font-label-sm text-label-sm text-on-surface-variant whitespace-nowrap text-xs">Verified A- Grade</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Category: Professional -->
          <div class="bg-surface-container-lowest rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col gap-stack-md border border-surface-variant/40">
            <div class="flex items-center gap-2 mb-1">
              <span class="material-symbols-outlined text-secondary">groups</span>
              <h2 class="font-headline-md text-headline-md text-primary font-bold text-xl">Professional</h2>
            </div>
            
            <div class="flex flex-col gap-4">
              <!-- Problem Solving -->
              <div class="flex flex-col gap-1.5 pb-3 border-b border-surface-variant/40">
                <div class="flex justify-between items-start">
                  <span class="font-label-md text-label-md text-primary font-semibold">Problem Solving</span>
                  <span class="material-symbols-outlined text-[16px] text-tertiary-fixed-dim" title="Verified by Hackathon Record">group_add</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="flex-grow h-1.5 bg-surface-variant rounded-full overflow-hidden">
                    <div class="h-full bg-outline rounded-full" style="width: 80%;"></div>
                  </div>
                  <span class="font-label-sm text-label-sm text-on-surface-variant whitespace-nowrap text-xs">Hackathon Rank</span>
                </div>
              </div>

              <!-- Team Collaboration -->
              <div class="flex flex-col gap-1.5 pb-3 border-b border-surface-variant/40">
                <div class="flex justify-between items-start">
                  <span class="font-label-md text-label-md text-primary font-semibold">Team Collaboration</span>
                  <span class="font-label-sm text-label-sm text-on-surface-variant">Peer Review</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="flex-grow h-1.5 bg-surface-variant rounded-full overflow-hidden">
                    <div class="h-full bg-outline rounded-full" style="width: 75%;"></div>
                  </div>
                  <span class="font-label-sm text-label-sm text-on-surface-variant whitespace-nowrap text-xs">Peer Attested</span>
                </div>
              </div>

              <!-- Git & Version Control -->
              <div class="flex flex-col gap-1.5">
                <div class="flex justify-between items-start">
                  <span class="font-label-md text-label-md text-primary font-semibold">Git & Version Control</span>
                  <span class="material-symbols-outlined text-[14px] text-tertiary-fixed-dim" style="font-variation-settings: 'FILL' 1;">check_circle</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="flex-grow h-1.5 bg-surface-variant rounded-full overflow-hidden">
                    <div class="h-full bg-tertiary-fixed-dim rounded-full" style="width: 90%;"></div>
                  </div>
                  <span class="font-label-sm text-label-sm text-on-surface-variant whitespace-nowrap text-xs">Active Repo Verified</span>
                </div>
              </div>
            </div>
          </div>

        </section>

        <!-- MODAL: ADD SKILL INTERACTIVELY -->
        <div id="add-skill-modal" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 hidden items-center justify-center p-4">
          <div class="bg-surface-container-lowest rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-surface-variant/40">
            <div class="flex items-center justify-between pb-4 border-b border-surface-variant/40">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-xl bg-secondary-fixed/40 text-secondary flex items-center justify-center font-bold text-sm">
                  <span class="material-symbols-outlined text-[18px]">add</span>
                </div>
                <h3 class="font-headline-md text-headline-md text-primary font-bold text-lg">Add Skill to Passport</h3>
              </div>
              <button onclick="Utils.closeModal('add-skill-modal')" class="text-on-surface-variant hover:text-primary cursor-pointer">
                <span class="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onsubmit="App.handleAddSkillSubmit(event)" class="mt-4 space-y-4 text-xs">
              <div class="p-3 bg-surface-container-low rounded-xl border border-outline-variant/30">
                <span class="text-[10px] font-bold uppercase tracking-wider text-secondary block mb-1.5">Quick Autofill Sample:</span>
                <div class="flex flex-wrap gap-1.5">
                  <button type="button" onclick="App.fillSkillPreset('FastAPI', 'Intermediate', 85, 'REST API Backend Capstone')" class="px-2.5 py-1 bg-surface-container-lowest text-primary rounded-full border border-outline-variant/40 font-semibold text-[11px] hover:bg-surface-bright">FastAPI (85%)</button>
                  <button type="button" onclick="App.fillSkillPreset('Kubernetes', 'Intermediate', 78, 'K8s Multi-cluster Deployment')" class="px-2.5 py-1 bg-surface-container-lowest text-primary rounded-full border border-outline-variant/40 font-semibold text-[11px] hover:bg-surface-bright">Kubernetes (78%)</button>
                  <button type="button" onclick="App.fillSkillPreset('Transformers', 'Advanced', 92, 'BioBERT Medical Sentiment Pipeline')" class="px-2.5 py-1 bg-surface-container-lowest text-primary rounded-full border border-outline-variant/40 font-semibold text-[11px] hover:bg-surface-bright">Transformers (92%)</button>
                </div>
              </div>

              <div>
                <label class="block font-bold text-on-surface mb-1">Skill Name</label>
                <input type="text" id="manual-skill-name" required placeholder="e.g. FastAPI, Docker, Next.js, Rust" class="w-full px-3.5 py-2.5 bg-surface-bright border border-outline-variant rounded-xl focus:border-secondary focus:outline-none text-sm">
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block font-bold text-on-surface mb-1">Proficiency Level</label>
                  <select id="manual-skill-level" class="w-full px-3 py-2 bg-surface-bright border border-outline-variant rounded-xl focus:border-secondary focus:outline-none text-xs">
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate" selected>Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>

                <div>
                  <label class="block font-bold text-on-surface mb-1">Confidence Score: <span id="manual-conf-label" class="text-secondary font-bold">85%</span></label>
                  <input type="range" id="manual-skill-conf" min="50" max="99" value="85" oninput="document.getElementById('manual-conf-label').innerText = this.value + '%'" class="w-full mt-2 accent-secondary">
                </div>
              </div>

              <div>
                <label class="block font-bold text-on-surface mb-1">Supporting Project / Evidence Title</label>
                <input type="text" id="manual-skill-evidence" placeholder="e.g. Production Microservice Gateway Project" class="w-full px-3.5 py-2.5 bg-surface-bright border border-outline-variant rounded-xl focus:border-secondary focus:outline-none text-xs">
              </div>

              <div class="pt-3 flex justify-end gap-2 border-t border-surface-variant/40">
                <button type="button" onclick="Utils.closeModal('add-skill-modal')" class="px-4 py-2 rounded-full bg-surface-container hover:bg-surface-container-high text-primary font-semibold cursor-pointer">Cancel</button>
                <button type="submit" class="px-5 py-2 rounded-full bg-primary-container hover:bg-primary text-on-primary font-bold shadow-sm flex items-center gap-1.5 cursor-pointer">
                  Save to Passport
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- MODAL: ADD CREDENTIAL INTERACTIVELY -->
        <div id="add-cred-modal" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 hidden items-center justify-center p-4">
          <div class="bg-surface-container-lowest rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-surface-variant/40">
            <div class="flex items-center justify-between pb-4 border-b border-surface-variant/40">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-xl bg-secondary-fixed/40 text-secondary flex items-center justify-center font-bold text-sm">
                  <span class="material-symbols-outlined text-[18px]">card_membership</span>
                </div>
                <h3 class="font-headline-md text-headline-md text-primary font-bold text-lg">Add Verified Credential</h3>
              </div>
              <button onclick="Utils.closeModal('add-cred-modal')" class="text-on-surface-variant hover:text-primary cursor-pointer">
                <span class="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onsubmit="App.handleAddCredentialSubmit(event)" class="mt-4 space-y-4 text-xs">
              <div>
                <label class="block font-bold text-on-surface mb-1">Credential Title</label>
                <input type="text" id="manual-cred-title" required placeholder="e.g. AWS Certified Solutions Architect" class="w-full px-3.5 py-2.5 bg-surface-bright border border-outline-variant rounded-xl focus:border-secondary focus:outline-none text-sm">
              </div>

              <div>
                <label class="block font-bold text-on-surface mb-1">Issuing Organization</label>
                <input type="text" id="manual-cred-issuer" required placeholder="e.g. Stanford Online, AWS, Meta, DeepLearning.AI" class="w-full px-3.5 py-2.5 bg-surface-bright border border-outline-variant rounded-xl focus:border-secondary focus:outline-none text-sm">
              </div>

              <div>
                <label class="block font-bold text-on-surface mb-1">Skills Demonstrated (Comma Separated)</label>
                <input type="text" id="manual-cred-skills" required placeholder="e.g. AWS, Docker, Kubernetes, Cloud" class="w-full px-3.5 py-2.5 bg-surface-bright border border-outline-variant rounded-xl focus:border-secondary focus:outline-none text-xs">
              </div>

              <div class="pt-3 flex justify-end gap-2 border-t border-surface-variant/40">
                <button type="button" onclick="Utils.closeModal('add-cred-modal')" class="px-4 py-2 rounded-full bg-surface-container hover:bg-surface-container-high text-primary font-semibold cursor-pointer">Cancel</button>
                <button type="submit" class="px-5 py-2 rounded-full bg-primary-container hover:bg-primary text-on-primary font-bold shadow-sm flex items-center gap-1.5 cursor-pointer">
                  Anchor Proof
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- EVIDENCE TRACE MODAL CONTAINER (Dynamic) -->
        <div id="skill-evidence-modal" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 hidden items-center justify-center p-4">
          <div class="bg-surface-container-lowest rounded-3xl max-w-2xl w-full shadow-2xl border border-surface-variant/40 overflow-hidden" id="skill-modal-content">
            <!-- Rendered via App.viewSkillDetail() -->
          </div>
        </div>

      </div>
    `;
  }
};

