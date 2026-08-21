/**
 * About, Innovation & Architecture View
 */

const AboutView = {
  render() {
    return `
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="text-center max-w-3xl mx-auto mb-12">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-3 border border-blue-200">
            SOA IDEATHON 2026 Internal Selection Build
          </div>
          <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            VeriSkill Architectural Overview & Methodology
          </h1>
          <p class="text-slate-600 text-sm mt-3 leading-relaxed">
            A comprehensive verifiable skill and explainable matching infrastructure engineered to bridge the gap between academic education, proof of competency, and bias-aware talent matching.
          </p>
        </div>

        <div class="space-y-8 text-sm text-slate-700 leading-relaxed">
          <!-- CORE PROBLEM & INNOVATION -->
          <div class="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <h2 class="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <i class="fa-solid fa-lightbulb text-amber-500"></i> The Core Problem & Innovation
            </h2>
            <p class="mb-4">
              Traditional student resumes suffer from systemic flaws: students self-inflate unverified claims, recruiters cannot easily audit whether a claimed skill was genuinely demonstrated in code, and conventional Applicant Tracking Systems (ATS) operate as unexplainable black-boxes that often reproduce demographic biases.
            </p>
            <div class="p-4 rounded-2xl bg-blue-50/75 border border-blue-200 text-xs text-blue-900">
              <strong>The Paradigm Shift:</strong> VeriSkill transitions the hiring and opportunity matching paradigm from <em>"What does the student claim?"</em> to <em>"What can the student prove?"</em> via cryptographic proof chains and explainable AI.
            </div>
          </div>

          <!-- END-TO-END DATAFLOW PIPELINE -->
          <div class="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <h2 class="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <i class="fa-solid fa-diagram-project text-blue-600"></i> Technical Architecture Pipeline
            </h2>

            <div class="bg-slate-900 rounded-2xl p-6 text-slate-200 font-mono text-xs overflow-x-auto leading-relaxed shadow-inner">
              <pre>
Multi-source Inputs (GitHub, Course Transcripts, Hackathons, Certifications)
                               ↓
                 [Evidence Verification Service]
          (AST Analysis, Commit Signature, SHA-256 Anchor)
                               ↓
                  [AI Skill Extraction & Taxonomy]
            (NLP Semantic Entity Mapper + Confidence Engine)
                               ↓
                 [Verifiable Skill Passport Ledger]
            (W3C VC v1.1 / Open Badges 3.0 Standard Schema)
                               ↓
              [Attribute-Blind Privacy Protection Layer]
     (Demographic Masking: Name, Photo, Gender, Age, Institution)
                               ↓
              [Transparent 5-Factor Matching Engine]
   Match = 0.45×Skill + 0.25×Evidence + 0.15×Project + 0.10×VC + 0.05×Exp
                               ↓
         ┌─────────────────────┴─────────────────────┐
         ↓                                           ↓
[Explainability & Gap UI]               [Multidisciplinary Team Optimizer]
(Evidence Traces & Pathways)             (Combinatorial Complementarity)
              </pre>
            </div>
          </div>

          <!-- HONEST DISCLOSURE & PROTOTYPE ROADMAP -->
          <div class="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <h2 class="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <i class="fa-solid fa-scale-balanced text-purple-600"></i> Smart India Hackathon 2026 Production Roadmap
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div class="font-bold text-slate-900 mb-1">Current MVP Implementation</div>
                <ul class="space-y-1 text-slate-600 list-disc list-inside">
                  <li>Deterministic SHA-256 cryptographic proof hashing</li>
                  <li>Simulated NLP AST & repository ingestion parser</li>
                  <li>Transparent 5-factor explainable recommendation model</li>
                  <li>Real-time Disparate Impact Ratio (0.94) fairness auditor</li>
                  <li>Combinatorial team complementarity solver (94% coverage)</li>
                </ul>
              </div>

              <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div class="font-bold text-slate-900 mb-1">SIH 2026 Production Integration Target</div>
                <ul class="space-y-1 text-slate-600 list-disc list-inside">
                  <li>National Academic Depository (NAD / DigiLocker) API links</li>
                  <li>Production W3C DID & Polygon ID blockchain anchoring</li>
                  <li>Fine-tuned CodeLlama / BERT embedding vector stores (pgvector)</li>
                  <li>Direct integration with Enterprise ATS (Workday, Greenhouse)</li>
                  <li>Cross-university federated credential validation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
};
