/**
 * Recruiter Job Creation View with Interactive Preset Autofills
 */

const CreateJobView = {
  render() {
    return `
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="mb-8">
          <a href="#/recruiter/dashboard" class="text-xs font-semibold text-blue-600 hover:text-blue-800">
            &larr; Back to Recruiter Dashboard
          </a>
          <h1 class="text-2xl font-extrabold text-slate-900 mt-2">Define Opportunity & Evidence Requirements</h1>
          <p class="text-xs text-slate-500 mt-1">Configure role requirements to generate explainable, attribute-blind candidate matches.</p>
        </div>

        <div class="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm">
          <!-- Quick Preset Autofill Bar -->
          <div class="mb-6 p-4 bg-blue-50/75 rounded-2xl border border-blue-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div>
              <span class="font-bold text-blue-900 text-xs block">Quick Autofill Sample Role:</span>
              <span class="text-[11px] text-blue-700">Pre-populate realistic role specifications with 1 click.</span>
            </div>
            <div class="flex flex-wrap gap-2">
              <button type="button" onclick="App.fillJobPreset('ai')" class="px-3 py-1.5 bg-white text-blue-700 font-semibold rounded-xl border border-blue-200 hover:bg-blue-100 transition-colors shadow-sm">
                🧠 AI / ML Intern
              </button>
              <button type="button" onclick="App.fillJobPreset('fullstack')" class="px-3 py-1.5 bg-white text-blue-700 font-semibold rounded-xl border border-blue-200 hover:bg-blue-100 transition-colors shadow-sm">
                ⚡ Full Stack AI
              </button>
              <button type="button" onclick="App.fillJobPreset('devops')" class="px-3 py-1.5 bg-white text-blue-700 font-semibold rounded-xl border border-blue-200 hover:bg-blue-100 transition-colors shadow-sm">
                ☁️ Cloud DevOps
              </button>
            </div>
          </div>

          <form onsubmit="App.handleCreateJob(event)" class="space-y-6 text-xs">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block font-bold text-slate-700 mb-1">Job / Internship Title</label>
                <input type="text" id="job-title" required class="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:border-blue-500 focus:outline-none text-sm" value="Autonomous AI & Robotics Research Intern">
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">Company / Organization</label>
                <input type="text" id="job-company" required class="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:border-blue-500 focus:outline-none text-sm" value="Apex Neural Labs">
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block font-bold text-slate-700 mb-1">Location & Mode</label>
                <input type="text" id="job-location" required class="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:border-blue-500 focus:outline-none text-sm" value="Bangalore / Remote">
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">Internship Type</label>
                <input type="text" id="job-type" required class="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:border-blue-500 focus:outline-none text-sm" value="Full-time (6 Months)">
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">Monthly Stipend</label>
                <input type="text" id="job-stipend" required class="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:border-blue-500 focus:outline-none text-sm" value="₹50,000 / month">
              </div>
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1">Role Description</label>
              <textarea id="job-desc" rows="3" required class="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:border-blue-500 focus:outline-none text-sm">Develop perception and control algorithms for autonomous navigation systems, validate models on simulation benches, and benchmark real-time inference latency.</textarea>
            </div>

            <!-- REQUIRED SKILLS CONFIG -->
            <div class="p-5 bg-slate-50 rounded-2xl border border-slate-200">
              <h3 class="text-sm font-bold text-slate-900 mb-2">Required Skills (Weighting & Minimum Level)</h3>
              <p class="text-[11px] text-slate-500 mb-4">Candidates will be ranked on cryptographic proof of these exact competencies.</p>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3" id="job-skills-container">
                <div class="p-3 bg-white rounded-xl border border-slate-200">
                  <div class="font-bold text-slate-800" id="skill-box-1-title">Python</div>
                  <div class="text-[11px] text-blue-600 mt-0.5" id="skill-box-1-meta">Advanced • 35% Weight</div>
                </div>
                <div class="p-3 bg-white rounded-xl border border-slate-200">
                  <div class="font-bold text-slate-800" id="skill-box-2-title">PyTorch</div>
                  <div class="text-[11px] text-blue-600 mt-0.5" id="skill-box-2-meta">Intermediate • 30% Weight</div>
                </div>
                <div class="p-3 bg-white rounded-xl border border-slate-200">
                  <div class="font-bold text-slate-800" id="skill-box-3-title">Computer Vision</div>
                  <div class="text-[11px] text-blue-600 mt-0.5" id="skill-box-3-meta">Intermediate • 35% Weight</div>
                </div>
              </div>
            </div>

            <div class="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-800 text-xs flex items-center gap-3">
              <i class="fa-solid fa-lock text-emerald-600 text-base shrink-0"></i>
              <div>
                <strong>Attribute-Blind Matching Active:</strong> Candidates will be ranked solely by verified skills and proof hashes. Candidate demographic attributes will be masked automatically.
              </div>
            </div>

            <div class="pt-4 flex justify-end gap-3">
              <a href="#/recruiter/dashboard" class="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold">Cancel</a>
              <button type="submit" class="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md shadow-blue-500/20 flex items-center gap-2">
                <i class="fa-solid fa-bolt"></i> Publish Role & Generate Candidate Matches
              </button>
            </div>
          </form>
        </div>
      </div>
    `;
  }
};
