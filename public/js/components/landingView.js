/**
 * Landing Page View Component
 */

const LandingView = {
  render() {
    return `
      <div class="min-h-screen bg-slate-50">
        <!-- HERO SECTION -->
        <div class="relative overflow-hidden bg-white border-b border-slate-200 py-16 md:py-24">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="text-center max-w-3xl mx-auto">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-6">
                <span class="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
                SOA IDEATHON 2026 Innovation Showcase
              </div>
              <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Don't Just Claim Your Skills. <span class="gradient-text">Prove Them.</span>
              </h1>
              <p class="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed">
                VeriSkill transforms verified coursework, projects, competitions, and credentials into a portable 
                <strong class="text-slate-900 font-semibold">Verifiable Skill Passport</strong> — then uses an explainable, 
                bias-aware AI matching engine to connect students with internships and multidisciplinary teams.
              </p>

              <!-- CTA BUTTONS -->
              <div class="mt-8 flex flex-wrap items-center justify-center gap-4">
                <button onclick="App.runDemoStep(1)" class="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-500/25 transition-all transform hover:-translate-y-0.5 flex items-center gap-2">
                  <i class="fa-solid fa-play text-sm"></i> Launch 3-Minute Demo Tour
                </button>
                <a href="#/student/passport" class="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold border border-slate-300 shadow-sm transition-all flex items-center gap-2">
                  <i class="fa-solid fa-id-card text-blue-600"></i> View Skill Passport
                </a>
                <a href="#/recruiter/candidates" class="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold shadow-sm transition-all flex items-center gap-2">
                  <i class="fa-solid fa-user-shield text-emerald-400"></i> Recruiter Blind Match
                </a>
              </div>

              <!-- Quick Meta Highlights -->
              <div class="mt-10 pt-8 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div class="text-2xl font-bold text-slate-900">17</div>
                  <div class="text-xs font-medium text-slate-500 uppercase tracking-wide">Verified Skills</div>
                </div>
                <div>
                  <div class="text-2xl font-bold text-blue-600">91%</div>
                  <div class="text-xs font-medium text-slate-500 uppercase tracking-wide">Explainable Match</div>
                </div>
                <div>
                  <div class="text-2xl font-bold text-emerald-600">100%</div>
                  <div class="text-xs font-medium text-slate-500 uppercase tracking-wide">Attribute-Blind</div>
                </div>
                <div>
                  <div class="text-2xl font-bold text-indigo-600">94%</div>
                  <div class="text-xs font-medium text-slate-500 uppercase tracking-wide">Team Coverage</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 3 CORE PILLARS -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div class="text-center max-w-2xl mx-auto mb-12">
            <h2 class="text-xs font-bold uppercase tracking-wider text-blue-600">Core Architecture</h2>
            <h3 class="text-3xl font-extrabold text-slate-900 mt-2">The Three Pillars of VeriSkill</h3>
            <p class="text-slate-600 mt-2">Moving hiring from "What does the candidate claim?" to "What can the candidate prove?"</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Pillar 1 -->
            <div class="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover-lift relative overflow-hidden">
              <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xl mb-6 border border-emerald-100">
                01
              </div>
              <h4 class="text-xl font-bold text-slate-900">VERIFY</h4>
              <p class="text-sm font-semibold text-emerald-700 mt-1">Verifiable Skill Passport</p>
              <p class="text-slate-600 text-sm mt-3 leading-relaxed">
                Connect GitHub commits, university courses, hackathon verdicts, and credentials. Simulated W3C proof hashes validate every demonstrated skill with confidence metrics.
              </p>
              <div class="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs text-slate-500 gap-2">
                <i class="fa-solid fa-circle-check text-emerald-500"></i> No self-inflated ratings
              </div>
            </div>

            <!-- Pillar 2 -->
            <div class="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover-lift relative overflow-hidden">
              <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xl mb-6 border border-blue-100">
                02
              </div>
              <h4 class="text-xl font-bold text-slate-900">MATCH & EXPLAIN</h4>
              <p class="text-sm font-semibold text-blue-700 mt-1">Explainable AI Scoring</p>
              <p class="text-slate-600 text-sm mt-3 leading-relaxed">
                A transparent 5-factor scoring model that explains exactly WHY a candidate matches, maps specific project evidence to requirements, and flags skill gaps with learning pathways.
              </p>
              <div class="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs text-slate-500 gap-2">
                <i class="fa-solid fa-eye text-blue-500"></i> No score without evidence
              </div>
            </div>

            <!-- Pillar 3 -->
            <div class="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover-lift relative overflow-hidden">
              <div class="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-xl mb-6 border border-purple-100">
                03
              </div>
              <h4 class="text-xl font-bold text-slate-900">ETHICAL & BLIND</h4>
              <p class="text-sm font-semibold text-purple-700 mt-1">Bias-Aware Candidate Ranking</p>
              <p class="text-slate-600 text-sm mt-3 leading-relaxed">
                Attribute-Blind Ranking masks names, photos, gender, age, college tier, and locations during initial candidate ranking. Verified via quantitative Disparate Impact audits.
              </p>
              <div class="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs text-slate-500 gap-2">
                <i class="fa-solid fa-lock text-purple-500"></i> Demographic blind evaluation
              </div>
            </div>
          </div>
        </div>

        <!-- TRADITIONAL RESUME VS VERISKILL -->
        <div class="bg-white border-y border-slate-200 py-16">
          <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-10">
              <h3 class="text-2xl sm:text-3xl font-extrabold text-slate-900">Traditional Resume vs. VeriSkill</h3>
              <p class="text-slate-600 text-sm mt-2">Why the conventional hiring model fails students and recruiters alike</p>
            </div>

            <div class="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
              <table class="min-w-full divide-y divide-slate-200 text-left text-sm">
                <thead class="bg-slate-100 text-slate-700 font-bold">
                  <tr>
                    <th class="py-3.5 px-6">Evaluation Dimension</th>
                    <th class="py-3.5 px-6 text-rose-700 bg-rose-50/50">Traditional ATS & Resume</th>
                    <th class="py-3.5 px-6 text-emerald-800 bg-emerald-50/50">VeriSkill Platform</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200 bg-white">
                  <tr>
                    <td class="py-4 px-6 font-semibold text-slate-900">Skill Claims</td>
                    <td class="py-4 px-6 text-rose-700 bg-rose-50/20"><i class="fa-solid fa-xmark mr-1.5 text-rose-500"></i> Self-reported, inflated percentages</td>
                    <td class="py-4 px-6 text-emerald-800 bg-emerald-50/20 font-medium"><i class="fa-solid fa-check mr-1.5 text-emerald-600"></i> Evidence-backed with cryptographic proof hashes</td>
                  </tr>
                  <tr>
                    <td class="py-4 px-6 font-semibold text-slate-900">Recommendation Logic</td>
                    <td class="py-4 px-6 text-rose-700 bg-rose-50/20"><i class="fa-solid fa-xmark mr-1.5 text-rose-500"></i> Black-box keyword scoring</td>
                    <td class="py-4 px-6 text-emerald-800 bg-emerald-50/20 font-medium"><i class="fa-solid fa-check mr-1.5 text-emerald-600"></i> Transparent 5-factor explainable formula</td>
                  </tr>
                  <tr>
                    <td class="py-4 px-6 font-semibold text-slate-900">Rejection Feedback</td>
                    <td class="py-4 px-6 text-rose-700 bg-rose-50/20"><i class="fa-solid fa-xmark mr-1.5 text-rose-500"></i> Generic automated rejection email</td>
                    <td class="py-4 px-6 text-emerald-800 bg-emerald-50/20 font-medium"><i class="fa-solid fa-check mr-1.5 text-emerald-600"></i> Actionable Skill Gap analysis & learning pathways</td>
                  </tr>
                  <tr>
                    <td class="py-4 px-6 font-semibold text-slate-900">Demographic Bias</td>
                    <td class="py-4 px-6 text-rose-700 bg-rose-50/20"><i class="fa-solid fa-xmark mr-1.5 text-rose-500"></i> High risk from names, photos, college tiers</td>
                    <td class="py-4 px-6 text-emerald-800 bg-emerald-50/20 font-medium"><i class="fa-solid fa-check mr-1.5 text-emerald-600"></i> Attribute-Blind Layer + Live Fairness Auditing</td>
                  </tr>
                  <tr>
                    <td class="py-4 px-6 font-semibold text-slate-900">Team Formation</td>
                    <td class="py-4 px-6 text-rose-700 bg-rose-50/20"><i class="fa-solid fa-xmark mr-1.5 text-rose-500"></i> Manual, unstructured guesswork</td>
                    <td class="py-4 px-6 text-emerald-800 bg-emerald-50/20 font-medium"><i class="fa-solid fa-check mr-1.5 text-emerald-600"></i> Combinatorial complementarity solver</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- QUICK DEMO ACTION BAR -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <div class="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-3xl p-8 md:p-12 text-white shadow-xl">
            <h3 class="text-2xl sm:text-3xl font-extrabold">Ready to evaluate the live prototype?</h3>
            <p class="mt-2 text-blue-100 max-w-xl mx-auto text-sm">
              Follow the guided 8-step demo tour or navigate independently through student, recruiter, and team-lead workflows.
            </p>
            <div class="mt-6 flex flex-wrap justify-center gap-3">
              <button onclick="App.runDemoStep(1)" class="px-6 py-3 rounded-xl bg-white text-blue-900 font-bold hover:bg-blue-50 transition-colors shadow-md">
                Start 3-Minute Demo (Step 1)
              </button>
              <a href="#/verify/VP-2026-IND-1042" class="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-500 border border-blue-400 transition-colors">
                Verify Public Passport #VS-1042
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }
};
