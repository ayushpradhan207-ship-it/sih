/**
 * VeriSkill — Stitch Evidence Portfolio & Verification Center Component (Source of Truth)
 */

const EvidenceView = {
  activeTab: "portfolio", // 'portfolio' | 'verification'

  async render(studentId = "student-1042") {
    const student = await Utils.fetchAPI(`/api/students/${studentId}`);
    const evidenceList = student.evidenceList || [];

    return `
      <div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-24 md:pt-28 pb-section-gap flex flex-col gap-stack-lg min-h-screen">
        
        <!-- Header & Action -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 class="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-bold">
              Evidence Portfolio
            </h1>
            <p class="font-body-md text-body-md text-on-surface-variant mt-1">
              Your verified project assets, certifications, and real-time cryptographic audit ledger.
            </p>
          </div>

          <div class="flex items-center gap-2">
            <button onclick="Utils.openModal('add-evidence-modal')" class="px-5 py-2.5 bg-primary-container text-on-primary font-label-md text-label-md rounded-full hover:bg-primary transition-all flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer">
              <span class="material-symbols-outlined text-[18px]">add_circle</span>
              Ingest GitHub Repo
            </button>
          </div>
        </div>

        <!-- Stitch Navigation Tabs -->
        <div class="flex items-center gap-2 border-b border-surface-variant/40 pb-2">
          <button onclick="EvidenceView.switchTab('portfolio')" class="px-4 py-2 rounded-full font-label-md text-label-md transition-all cursor-pointer ${this.activeTab === 'portfolio' ? 'bg-secondary-fixed/50 text-secondary font-bold' : 'text-on-surface-variant hover:bg-surface-container'}">
            Verified Assets (${evidenceList.length})
          </button>
          <button onclick="EvidenceView.switchTab('verification')" class="px-4 py-2 rounded-full font-label-md text-label-md transition-all cursor-pointer ${this.activeTab === 'verification' ? 'bg-secondary-fixed/50 text-secondary font-bold' : 'text-on-surface-variant hover:bg-surface-container'}">
            Verification Center & Timeline
          </button>
        </div>

        <!-- TAB 1: EVIDENCE PORTFOLIO -->
        <div class="${this.activeTab === 'portfolio' ? 'grid' : 'hidden'} grid-cols-1 md:grid-cols-12 gap-gutter">
          
          <!-- Left Column: Verified Assets List (md:col-span-8) -->
          <div class="md:col-span-8 flex flex-col gap-4">
            <div class="flex justify-between items-center mb-1">
              <h2 class="font-headline-md text-headline-md text-primary font-bold text-lg">Verified Assets</h2>
              <span class="text-xs font-label-sm text-on-surface-variant">Multi-Source Triangulation Active</span>
            </div>

            ${evidenceList.map(ev => `
              <div class="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-surface-variant/40 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all">
                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
                  <div class="flex items-center gap-2.5">
                    <span class="material-symbols-outlined text-secondary">
                      ${ev.type === 'Coursework' ? 'school' : ev.type === 'Certification' ? 'card_membership' : 'code'}
                    </span>
                    <h3 class="font-headline-md text-headline-md text-primary font-bold text-base">${ev.title}</h3>
                  </div>
                  <span class="px-3 py-1 bg-secondary-fixed/40 text-secondary font-label-sm text-label-sm rounded-full font-semibold flex items-center gap-1">
                    <span class="material-symbols-outlined text-[14px]" style="font-variation-settings: 'FILL' 1;">verified</span>
                    ${ev.verificationStatus || 'Verified'}
                  </span>
                </div>

                <p class="font-body-md text-body-md text-on-surface-variant text-xs leading-relaxed mb-3">
                  ${ev.description}
                </p>

                <!-- Skill Chips -->
                <div class="flex flex-wrap gap-1.5 mb-3">
                  ${(ev.skills || []).map(s => `
                    <span class="px-3 py-1 bg-surface-container text-on-surface text-label-sm font-label-sm rounded-full border border-outline-variant/30">
                      ${s}
                    </span>
                  `).join("")}
                </div>

                <!-- Footer Provenance Link -->
                <div class="pt-3 border-t border-surface-variant/30 flex items-center justify-between text-xs font-label-sm text-on-surface-variant">
                  <span class="truncate max-w-xs font-mono text-[11px]">${ev.proofHash ? Utils.truncateHash(ev.proofHash, 10, 8) : 'AST Ingested'}</span>
                  <a href="${ev.url || '#/verify/' + (ev.proofHash || student.passportId)}" target="${ev.url ? '_blank' : '_self'}" class="text-secondary font-semibold hover:underline flex items-center gap-1">
                    View Provenance <span class="material-symbols-outlined text-[14px]">open_in_new</span>
                  </a>
                </div>
              </div>
            `).join("")}
          </div>

          <!-- Right Column: AI Recommendations & Missing Evidence (md:col-span-4) -->
          <div class="md:col-span-4 flex flex-col gap-4">
            <!-- Missing Evidence AI Card -->
            <div class="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-surface-variant/40 flex flex-col gap-4 magic-bg">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-secondary">psychology</span>
                <span class="font-label-md text-label-md text-secondary font-bold uppercase tracking-wider">AI Recommendation</span>
              </div>
              <h3 class="font-headline-md text-headline-md text-primary font-bold text-lg leading-snug">
                Missing Evidence for REST APIs
              </h3>
              <p class="font-body-md text-body-md text-on-surface-variant text-xs leading-relaxed">
                You have marked intermediate Python knowledge, but lack repository evidence for REST API Development. Ingesting a code repository will unlock 1.0x matching weight for backend internships.
              </p>
              <button onclick="Utils.openModal('add-evidence-modal')" class="w-full bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md py-2.5 rounded-full transition-all text-center cursor-pointer shadow-sm">
                + Ingest GitHub Repo
              </button>
            </div>

            <!-- Ingestion Playground Sandbox Trigger -->
            <div class="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-surface-variant/40 flex flex-col gap-3">
              <div class="flex items-center gap-2 text-primary font-bold">
                <span class="material-symbols-outlined text-secondary">terminal</span>
                <h3 class="font-headline-md text-base">NLP Extraction Sandbox</h3>
              </div>
              <p class="text-xs text-on-surface-variant leading-relaxed">
                Test automated phrase mining and canonical taxonomy mapping on any project description or syllabus snippet.
              </p>
              <button onclick="EvidenceView.switchTab('verification')" class="text-xs text-secondary font-semibold hover:underline text-left">
                Open Verification Center &rarr;
              </button>
            </div>
          </div>

        </div>

        <!-- TAB 2: VERIFICATION CENTER & TIMELINE -->
        <div class="${this.activeTab === 'verification' ? 'grid' : 'hidden'} grid-cols-1 md:grid-cols-12 gap-gutter">
          
          <!-- Active Repo Analysis Card (md:col-span-7) -->
          <div class="md:col-span-7 flex flex-col gap-4">
            <div class="bg-surface-container-lowest p-6 md:p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-surface-variant/40 flex flex-col gap-stack-md">
              <div class="flex justify-between items-start">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary">
                    <span class="material-symbols-outlined">folder_code</span>
                  </div>
                  <div>
                    <h2 class="font-headline-md text-headline-md text-primary font-bold text-lg">Active Codebase Analysis</h2>
                    <p class="font-body-md text-body-md text-on-surface-variant text-xs font-mono">https://github.com/ashutosh-pradhan/healthcare-triage-ai</p>
                  </div>
                </div>
                <span class="px-3 py-1 bg-tertiary-fixed/30 text-on-tertiary-fixed-variant font-label-sm text-xs rounded-full font-bold">
                  AST Verified ✓
                </span>
              </div>

              <!-- Real-time Extracted Competencies -->
              <div class="space-y-3 pt-2">
                <span class="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">Identified Competencies</span>
                <div class="space-y-2">
                  <div class="p-3 bg-surface-container-low rounded-xl flex items-center justify-between text-xs">
                    <div class="flex items-center gap-2">
                      <span class="material-symbols-outlined text-tertiary-fixed-dim text-sm" style="font-variation-settings: 'FILL' 1;">check_circle</span>
                      <span class="font-label-md text-primary font-bold">Python (AST Analyzed)</span>
                    </div>
                    <span class="font-mono text-secondary font-bold">94% Confidence</span>
                  </div>
                  <div class="p-3 bg-surface-container-low rounded-xl flex items-center justify-between text-xs">
                    <div class="flex items-center gap-2">
                      <span class="material-symbols-outlined text-tertiary-fixed-dim text-sm" style="font-variation-settings: 'FILL' 1;">check_circle</span>
                      <span class="font-label-md text-primary font-bold">PyTorch & Transformers</span>
                    </div>
                    <span class="font-mono text-secondary font-bold">90% Confidence</span>
                  </div>
                  <div class="p-3 bg-surface-container-low rounded-xl flex items-center justify-between text-xs">
                    <div class="flex items-center gap-2">
                      <span class="material-symbols-outlined text-tertiary-fixed-dim text-sm" style="font-variation-settings: 'FILL' 1;">check_circle</span>
                      <span class="font-label-md text-primary font-bold">FastAPI REST Endpoints</span>
                    </div>
                    <span class="font-mono text-secondary font-bold">88% Confidence</span>
                  </div>
                </div>
              </div>

              <!-- Cryptographic Hash Anchor -->
              <div class="p-4 bg-surface-container rounded-xl text-xs space-y-1">
                <span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">SHA-256 Cryptographic Root Hash</span>
                <div class="font-mono text-[11px] text-primary truncate">
                  sha256:7a9e1c3f5d7b9a1c3e5f7a9b1d3f5e7a9b1c3d5e7f9a1b3c5d7e9f1a3b5c7d9e
                </div>
              </div>
            </div>
          </div>

          <!-- Sticky 4-Step Verification Timeline (md:col-span-5) -->
          <div class="md:col-span-5 flex flex-col gap-4">
            <div class="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-surface-variant/40 flex flex-col gap-4">
              <h2 class="font-headline-md text-headline-md text-primary font-bold text-base">Verification History</h2>
              
              <div class="space-y-4 relative pl-6 border-l-2 border-surface-container">
                <!-- Step 1 -->
                <div class="relative">
                  <div class="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-secondary border-2 border-white shadow-sm"></div>
                  <h3 class="font-label-md text-label-md text-primary font-bold text-xs">Evidence submitted</h3>
                  <p class="text-[11px] text-on-surface-variant mt-0.5">Payload received via GitHub API with repository metadata.</p>
                </div>

                <!-- Step 2 -->
                <div class="relative">
                  <div class="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-secondary border-2 border-white shadow-sm"></div>
                  <h3 class="font-label-md text-label-md text-primary font-bold text-xs">Evidence analyzed</h3>
                  <p class="text-[11px] text-on-surface-variant mt-0.5">Static AST parser traversed code structure & dependency trees.</p>
                </div>

                <!-- Step 3 -->
                <div class="relative">
                  <div class="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-secondary border-2 border-white shadow-sm"></div>
                  <h3 class="font-label-md text-label-md text-primary font-bold text-xs">Skills identified</h3>
                  <p class="text-[11px] text-on-surface-variant mt-0.5">Multi-source triangulation matched 3 canonical taxonomy skills.</p>
                </div>

                <!-- Step 4 -->
                <div class="relative">
                  <div class="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-tertiary-fixed-dim border-2 border-white shadow-sm"></div>
                  <h3 class="font-label-md text-label-md text-on-tertiary-fixed-variant font-bold text-xs">Verification completed</h3>
                  <p class="text-[11px] text-on-surface-variant mt-0.5">Proof signature anchored to immutable Passport ledger.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- MODAL: ADD EVIDENCE / GITHUB INGESTION -->
        <div id="add-evidence-modal" class="fixed inset-0 bg-primary/40 backdrop-blur-sm z-50 hidden items-center justify-center p-4">
          <div class="bg-surface-container-lowest rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl border border-surface-variant/50">
            <div class="flex items-center justify-between pb-4 border-b border-surface-variant/40">
              <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-xl bg-secondary-fixed text-secondary flex items-center justify-center font-bold text-sm">
                  <span class="material-symbols-outlined text-[20px]">cloud_upload</span>
                </div>
                <h3 class="font-headline-md text-base font-bold text-primary">Ingest New Project / GitHub Evidence</h3>
              </div>
              <button type="button" onclick="Utils.closeModal('add-evidence-modal')" class="text-on-surface-variant hover:text-primary cursor-pointer">
                <span class="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onsubmit="App.handleIngestEvidence(event)" class="mt-4 space-y-4 text-xs font-body-md">
              <div>
                <label class="block font-label-md font-bold text-primary mb-1">Evidence Title</label>
                <input type="text" id="ingest-title" required placeholder="e.g. MLOps Automated Deployment Pipeline" class="w-full px-3.5 py-2.5 bg-surface-container-low border border-outline-variant/40 rounded-xl text-primary focus:border-secondary focus:outline-none text-xs transition-all" value="MLOps Automated CI/CD Container Pipeline">
              </div>

              <div>
                <label class="block font-label-md font-bold text-primary mb-1">Repository URL or Proof Link</label>
                <input type="url" id="ingest-url" required placeholder="https://github.com/username/repo" class="w-full px-3.5 py-2.5 bg-surface-container-low border border-outline-variant/40 rounded-xl text-primary focus:border-secondary focus:outline-none text-xs transition-all" value="https://github.com/aarav-sharma/mlops-cicd-pipeline">
              </div>

              <div>
                <label class="block font-label-md font-bold text-primary mb-1">Project Description & Architecture</label>
                <textarea id="ingest-desc" rows="3" required class="w-full px-3.5 py-2.5 bg-surface-container-low border border-outline-variant/40 rounded-xl text-primary focus:border-secondary focus:outline-none text-xs transition-all">Engineered automated GitHub Actions workflow building and containerizing PyTorch model servers with Docker, push to Amazon ECR, and deploy via AWS ECS with automated unit testing.</textarea>
              </div>

              <div>
                <label class="block font-label-md font-bold text-primary mb-1">Primary Technologies (Comma separated)</label>
                <input type="text" id="ingest-tech" class="w-full px-3.5 py-2.5 bg-surface-container-low border border-outline-variant/40 rounded-xl text-primary focus:border-secondary focus:outline-none text-xs transition-all" value="Docker, AWS, CI/CD (GitHub Actions), Python, MLOps">
              </div>

              <div class="pt-3 flex justify-end gap-2 border-t border-surface-variant/40">
                <button type="button" onclick="Utils.closeModal('add-evidence-modal')" class="px-4 py-2 rounded-full bg-surface-container hover:bg-surface-container-high text-primary font-label-md font-semibold text-xs cursor-pointer">Cancel</button>
                <button type="submit" class="px-5 py-2 rounded-full bg-primary-container hover:bg-primary text-on-primary font-label-md font-bold text-xs shadow-sm flex items-center gap-1.5 cursor-pointer">
                  <span class="material-symbols-outlined text-[16px]">auto_awesome</span>
                  <span>Run AI Extraction & Ingest</span>
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    `;
  },

  switchTab(tab) {
    this.activeTab = tab;
    const appRoot = document.getElementById("app-root");
    if (appRoot) {
      this.render().then(html => {
        appRoot.innerHTML = html;
      });
    }
  }
};
