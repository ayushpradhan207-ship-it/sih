/**
 * VeriSkill — Stitch About, Innovation & Architecture View
 */

const AboutView = {
  render() {
    return `
      <div class="max-w-5xl mx-auto px-margin-mobile md:px-margin-desktop pt-24 md:pt-28 pb-section-gap flex flex-col gap-stack-lg min-h-screen">
        
        <!-- Header -->
        <div class="text-center max-w-3xl mx-auto">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-fixed/50 text-secondary border border-secondary-fixed text-xs font-label-md font-semibold mb-3">
            SOA IDEATHON 2026 Production Architecture
          </div>
          <h1 class="font-display-lg text-3xl sm:text-4xl font-bold text-primary tracking-tight">
            VeriSkill Architectural Overview & Methodology
          </h1>
          <p class="font-body-lg text-on-surface-variant text-sm mt-3 leading-relaxed">
            A comprehensive verifiable skill and explainable matching infrastructure engineered to bridge the gap between academic education, proof of competency, and bias-aware talent matching.
          </p>
        </div>

        <div class="space-y-8 font-body-md text-on-surface-variant leading-relaxed">
          <!-- CORE PROBLEM & INNOVATION -->
          <section class="bg-surface-container-lowest rounded-3xl p-6 md:p-8 border border-surface-variant/40 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
            <div class="flex items-center gap-2.5 mb-4">
              <div class="w-10 h-10 rounded-xl bg-secondary-fixed text-secondary flex items-center justify-center font-bold text-lg">
                <span class="material-symbols-outlined text-[22px]">lightbulb</span>
              </div>
              <h2 class="font-headline-md text-xl font-bold text-primary">
                The Core Problem & Innovation
              </h2>
            </div>
            <p class="text-sm mb-4">
              Traditional student resumes suffer from systemic flaws: students self-inflate unverified claims, recruiters cannot easily audit whether a claimed skill was genuinely demonstrated in code, and conventional Applicant Tracking Systems (ATS) operate as unexplainable black-boxes that often reproduce demographic biases.
            </p>
            <div class="p-4 rounded-2xl bg-secondary-fixed/20 border border-secondary-fixed text-xs text-primary flex items-start gap-3">
              <span class="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5" style="font-variation-settings: 'FILL' 1;">stars</span>
              <div>
                <strong class="font-label-md">The Paradigm Shift:</strong> VeriSkill transitions the hiring and opportunity matching paradigm from <em class="font-serif">"What does the student claim?"</em> to <em class="font-serif">"What can the student prove?"</em> via cryptographic proof chains and explainable AI.
              </div>
            </div>
          </section>

          <!-- END-TO-END DATAFLOW PIPELINE -->
          <section class="bg-surface-container-lowest rounded-3xl p-6 md:p-8 border border-surface-variant/40 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
            <div class="flex items-center gap-2.5 mb-4">
              <div class="w-10 h-10 rounded-xl bg-secondary-fixed text-secondary flex items-center justify-center font-bold text-lg">
                <span class="material-symbols-outlined text-[22px]">account_tree</span>
              </div>
              <h2 class="font-headline-md text-xl font-bold text-primary">
                Technical Architecture Pipeline
              </h2>
            </div>

            <div class="bg-primary-container rounded-2xl p-6 text-slate-200 font-mono text-xs overflow-x-auto leading-relaxed shadow-inner border border-primary/30">
              <pre class="font-mono text-xs text-slate-300">
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
          </section>

          <!-- HONEST DISCLOSURE & PROTOTYPE ROADMAP -->
          <section class="bg-surface-container-lowest rounded-3xl p-6 md:p-8 border border-surface-variant/40 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
            <div class="flex items-center gap-2.5 mb-4">
              <div class="w-10 h-10 rounded-xl bg-secondary-fixed text-secondary flex items-center justify-center font-bold text-lg">
                <span class="material-symbols-outlined text-[22px]">timeline</span>
              </div>
              <h2 class="font-headline-md text-xl font-bold text-primary">
                Smart India Hackathon 2026 Production Roadmap
              </h2>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div class="p-5 rounded-2xl bg-surface-container-low border border-surface-variant/40">
                <div class="font-label-md font-bold text-primary text-sm mb-2 flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-secondary text-[18px]">verified</span>
                  <span>Current MVP Implementation</span>
                </div>
                <ul class="space-y-1.5 text-on-surface-variant">
                  <li class="flex items-start gap-1.5">
                    <span class="material-symbols-outlined text-secondary text-[14px] mt-0.5 shrink-0" style="font-variation-settings: 'FILL' 1;">check_circle</span>
                    <span>Deterministic SHA-256 cryptographic proof hashing</span>
                  </li>
                  <li class="flex items-start gap-1.5">
                    <span class="material-symbols-outlined text-secondary text-[14px] mt-0.5 shrink-0" style="font-variation-settings: 'FILL' 1;">check_circle</span>
                    <span>Simulated NLP AST & repository ingestion parser</span>
                  </li>
                  <li class="flex items-start gap-1.5">
                    <span class="material-symbols-outlined text-secondary text-[14px] mt-0.5 shrink-0" style="font-variation-settings: 'FILL' 1;">check_circle</span>
                    <span>Transparent 5-factor explainable recommendation model</span>
                  </li>
                  <li class="flex items-start gap-1.5">
                    <span class="material-symbols-outlined text-secondary text-[14px] mt-0.5 shrink-0" style="font-variation-settings: 'FILL' 1;">check_circle</span>
                    <span>Real-time Disparate Impact Ratio (0.94) fairness auditor</span>
                  </li>
                  <li class="flex items-start gap-1.5">
                    <span class="material-symbols-outlined text-secondary text-[14px] mt-0.5 shrink-0" style="font-variation-settings: 'FILL' 1;">check_circle</span>
                    <span>Combinatorial team complementarity solver (94% coverage)</span>
                  </li>
                </ul>
              </div>

              <div class="p-5 rounded-2xl bg-surface-container-low border border-surface-variant/40">
                <div class="font-label-md font-bold text-primary text-sm mb-2 flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-secondary text-[18px]">rocket_launch</span>
                  <span>SIH 2026 Production Integration Target</span>
                </div>
                <ul class="space-y-1.5 text-on-surface-variant">
                  <li class="flex items-start gap-1.5">
                    <span class="material-symbols-outlined text-secondary text-[14px] mt-0.5 shrink-0">arrow_right</span>
                    <span>National Academic Depository (NAD / DigiLocker) API links</span>
                  </li>
                  <li class="flex items-start gap-1.5">
                    <span class="material-symbols-outlined text-secondary text-[14px] mt-0.5 shrink-0">arrow_right</span>
                    <span>Production W3C DID & Polygon ID blockchain anchoring</span>
                  </li>
                  <li class="flex items-start gap-1.5">
                    <span class="material-symbols-outlined text-secondary text-[14px] mt-0.5 shrink-0">arrow_right</span>
                    <span>Fine-tuned CodeLlama / BERT embedding vector stores (pgvector)</span>
                  </li>
                  <li class="flex items-start gap-1.5">
                    <span class="material-symbols-outlined text-secondary text-[14px] mt-0.5 shrink-0">arrow_right</span>
                    <span>Direct integration with Enterprise ATS (Workday, Greenhouse)</span>
                  </li>
                  <li class="flex items-start gap-1.5">
                    <span class="material-symbols-outlined text-secondary text-[14px] mt-0.5 shrink-0">arrow_right</span>
                    <span>Cross-university federated credential validation</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    `;
  }
};
