/**
 * Evidence Ingestion & AI Skill Extraction Sandbox View (Interactive User Input)
 */

const EvidenceView = {
  async render(studentId = "student-1042") {
    const student = await Utils.fetchAPI(`/api/students/${studentId}`);
    const evidenceList = student.evidenceList || [];

    return `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 class="text-2xl font-extrabold text-slate-900">Evidence Verification Ledger & Ingestion</h1>
            <p class="text-xs text-slate-500 mt-1">Multi-modal ingested artifacts backing candidate <strong class="text-slate-700">${student.anonymizedId}</strong></p>
          </div>

          <div class="flex items-center gap-2">
            <button onclick="Utils.openModal('add-evidence-modal')" class="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center gap-2">
              <i class="fa-solid fa-cloud-arrow-up"></i> Ingest New Codebase / Evidence
            </button>
          </div>
        </div>

        <!-- INTERACTIVE AI SKILL EXTRACTION PLAYGROUND -->
        <div class="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-xl mb-8 border border-slate-800 relative overflow-hidden">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300 text-sm">
                <i class="fa-solid fa-wand-magic-sparkles"></i>
              </div>
              <div>
                <h2 class="text-lg font-bold text-white">Interactive AI Skill Extraction Sandbox</h2>
                <p class="text-xs text-blue-200">Paste any project README, syllabus, or GitHub link to simulate automated skill extraction in real-time.</p>
              </div>
            </div>
            <span class="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[11px] font-bold">
              NLP Extraction Engine
            </span>
          </div>

          <!-- Quick Autofill Samples -->
          <div class="mb-4 flex flex-wrap items-center gap-2 text-xs">
            <span class="text-slate-400 text-[11px] font-semibold">Try Sample Inputs:</span>
            <button onclick="App.fillExtractionSample('ai')" class="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-blue-200 border border-white/10 text-xs transition-colors">
              🧠 BioBERT NLP Healthcare Pipeline
            </button>
            <button onclick="App.fillExtractionSample('web3')" class="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-purple-200 border border-white/10 text-xs transition-colors">
              ⚡ Web3 Verifiable Credential DApp
            </button>
            <button onclick="App.fillExtractionSample('cloud')" class="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-emerald-200 border border-white/10 text-xs transition-colors">
              ☁️ Terraform Multi-Cloud Infrastructure
            </button>
          </div>

          <!-- User Input Box -->
          <div class="space-y-3">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input type="text" id="sandbox-title" placeholder="Project / Course Title (e.g. Distributed Task Queue)" class="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-400 text-xs focus:border-blue-400 focus:outline-none">
              <input type="url" id="sandbox-url" placeholder="Repository URL (e.g. https://github.com/username/repo)" class="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-400 text-xs focus:border-blue-400 focus:outline-none">
            </div>

            <textarea id="sandbox-text" rows="3" placeholder="Paste project description, technical stack, or syllabus text here..." class="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-400 text-xs focus:border-blue-400 focus:outline-none"></textarea>

            <div class="flex items-center justify-between pt-1">
              <span class="text-[11px] text-slate-400"><i class="fa-solid fa-shield-halved text-emerald-400 mr-1"></i> Automated taxonomy normalization & SHA-256 anchoring</span>
              <button onclick="App.runSandboxExtraction()" id="btn-run-sandbox" class="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2">
                <i class="fa-solid fa-brain"></i> Run AI Skill Extraction &rarr;
              </button>
            </div>
          </div>

          <!-- Sandbox Results Display Area -->
          <div id="sandbox-results" class="mt-6 pt-6 border-t border-slate-800 hidden">
            <!-- Rendered dynamically -->
          </div>
        </div>

        <!-- EVIDENCE INGESTION PIPELINE STATUS -->
        <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm mb-8">
          <h2 class="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Evidence Verification Pipeline</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div class="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
              <div class="font-bold text-emerald-800 flex items-center gap-2 mb-1">
                <i class="fa-solid fa-link text-emerald-600"></i> 1. Source Connected
              </div>
              <p class="text-emerald-700 text-[11px]">GitHub GraphQL API & Institutional Registries active.</p>
            </div>
            <div class="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
              <div class="font-bold text-emerald-800 flex items-center gap-2 mb-1">
                <i class="fa-solid fa-microchip text-emerald-600"></i> 2. AST & Commit Audit
              </div>
              <p class="text-emerald-700 text-[11px]">Static analysis extracted programming language constructs.</p>
            </div>
            <div class="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
              <div class="font-bold text-emerald-800 flex items-center gap-2 mb-1">
                <i class="fa-solid fa-brain text-emerald-600"></i> 3. AI Skill Extraction
              </div>
              <p class="text-emerald-700 text-[11px]">NLP taxonomy mapping and confidence scoring computed.</p>
            </div>
            <div class="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
              <div class="font-bold text-emerald-800 flex items-center gap-2 mb-1">
                <i class="fa-solid fa-fingerprint text-emerald-600"></i> 4. SHA-256 Proof Anchor
              </div>
              <p class="text-emerald-700 text-[11px]">Immutable hash generated for tamper-evident verification.</p>
            </div>
          </div>
        </div>

        <!-- EVIDENCE LIST -->
        <div class="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-8">
          <div class="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <h3 class="text-base font-bold text-slate-900">All Ingested Artifacts (${evidenceList.length})</h3>
            <span class="text-xs text-slate-500">${evidenceList.filter(e => e.verificationStatus === 'VERIFIED').length} Verified • ${evidenceList.filter(e => e.verificationStatus !== 'VERIFIED').length} Self-Declared</span>
          </div>

          <div class="divide-y divide-slate-100">
            ${evidenceList.map(ev => `
              <div class="p-6 hover:bg-slate-50 transition-colors">
                <div class="flex flex-col md:flex-row items-start justify-between gap-4">
                  <div class="flex-1">
                    <div class="flex items-center gap-2.5 flex-wrap">
                      <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                        ${ev.type}
                      </span>
                      <h4 class="text-base font-bold text-slate-900">${ev.title}</h4>
                      ${Utils.renderVerificationBadge(ev.verificationStatus)}
                    </div>
                    <p class="text-xs text-slate-600 mt-2 leading-relaxed">${ev.description}</p>
                    
                    <div class="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                      <span><i class="fa-solid fa-arrow-up-right-from-square text-blue-600 mr-1"></i> Source: <strong>${ev.source}</strong></span>
                      <span><i class="fa-solid fa-calendar mr-1"></i> ${ev.timestamp ? ev.timestamp.split("T")[0] : "2026-08-18"}</span>
                      <span><i class="fa-solid fa-gauge-high text-emerald-600 mr-1"></i> Confidence: <strong>${Math.round((ev.confidence || 0.9) * 100)}%</strong></span>
                    </div>

                    <div class="mt-3 flex flex-wrap gap-1.5">
                      ${(ev.skills || []).map(s => `
                        <span class="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200">
                          ${s}
                        </span>
                      `).join("")}
                    </div>
                  </div>

                  <!-- Proof Hash Box -->
                  <div class="md:w-64 bg-slate-50 rounded-2xl p-3 border border-slate-200 shrink-0 text-xs font-mono text-slate-600">
                    <div class="flex items-center justify-between text-[10px] text-slate-400 uppercase font-sans font-bold mb-1">
                      <span>Cryptographic Proof</span>
                      <i class="fa-solid fa-lock text-emerald-600"></i>
                    </div>
                    <div class="break-all text-[11px] text-slate-700 font-mono">
                      ${Utils.truncateHash(ev.proofHash, 12, 8)}
                    </div>
                    <div class="mt-2 pt-2 border-t border-slate-200 flex justify-between items-center text-[10px] text-slate-500 font-sans">
                      <span>W3C Standard</span>
                      <span class="text-emerald-600 font-semibold">Valid ✓</span>
                    </div>
                  </div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- ADD EVIDENCE MODAL -->
        <div id="add-evidence-modal" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 hidden items-center justify-center p-4">
          <div class="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200">
            <div class="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 class="text-lg font-bold text-slate-900">Ingest New Project / GitHub Evidence</h3>
              <button onclick="Utils.closeModal('add-evidence-modal')" class="text-slate-400 hover:text-slate-600">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form onsubmit="App.handleIngestEvidence(event)" class="mt-4 space-y-4 text-xs">
              <div>
                <label class="block font-semibold text-slate-700 mb-1">Evidence Title</label>
                <input type="text" id="ingest-title" required placeholder="e.g. MLOps Automated Deployment Pipeline" class="w-full px-3 py-2 border border-slate-300 rounded-xl focus:border-blue-500 focus:outline-none text-sm" value="MLOps Automated CI/CD Container Pipeline">
              </div>

              <div>
                <label class="block font-semibold text-slate-700 mb-1">Repository URL or Proof Link</label>
                <input type="url" id="ingest-url" required placeholder="https://github.com/username/repo" class="w-full px-3 py-2 border border-slate-300 rounded-xl focus:border-blue-500 focus:outline-none text-sm" value="https://github.com/aarav-sharma/mlops-cicd-pipeline">
              </div>

              <div>
                <label class="block font-semibold text-slate-700 mb-1">Project Description & Architecture</label>
                <textarea id="ingest-desc" rows="3" required class="w-full px-3 py-2 border border-slate-300 rounded-xl focus:border-blue-500 focus:outline-none text-sm">Engineered automated GitHub Actions workflow building and containerizing PyTorch model servers with Docker, push to Amazon ECR, and deploy via AWS ECS with automated unit testing.</textarea>
              </div>

              <div>
                <label class="block font-semibold text-slate-700 mb-1">Primary Technologies (Comma separated)</label>
                <input type="text" id="ingest-tech" class="w-full px-3 py-2 border border-slate-300 rounded-xl focus:border-blue-500 focus:outline-none text-sm" value="Docker, AWS, CI/CD (GitHub Actions), Python, MLOps">
              </div>

              <div class="pt-4 flex justify-end gap-2">
                <button type="button" onclick="Utils.closeModal('add-evidence-modal')" class="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold">Cancel</button>
                <button type="submit" class="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-2 shadow-md">
                  <i class="fa-solid fa-wand-magic-sparkles"></i> Run AI Extraction & Ingest
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
  }
};
