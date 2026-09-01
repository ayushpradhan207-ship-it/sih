/**
 * VeriSkill — Stitch Recruiter Job Creation View with Interactive Preset Autofills
 */

const CreateJobView = {
  render() {
    return `
      <div class="max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop pt-24 md:pt-28 pb-section-gap flex flex-col gap-stack-lg min-h-screen">
        <div>
          <a href="#/recruiter/dashboard" class="inline-flex items-center gap-1.5 text-xs font-label-md font-semibold text-secondary hover:text-secondary/80 transition-colors mb-3">
            <span class="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Back to Recruiter Dashboard</span>
          </a>
          <h1 class="font-headline-lg-mobile md:font-headline-lg text-primary font-bold">Define Opportunity & Evidence Criteria</h1>
          <p class="font-body-lg text-on-surface-variant text-sm mt-1">Configure role requirements to generate explainable, attribute-blind candidate matches.</p>
        </div>

        <div class="bg-surface-container-lowest rounded-3xl p-6 md:p-8 border border-surface-variant/40 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
          <!-- Quick Preset Autofill Bar -->
          <div class="mb-6 p-4 bg-surface-container rounded-2xl border border-outline-variant/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div>
              <span class="font-label-md font-bold text-primary text-xs block">Quick Autofill Sample Role:</span>
              <span class="font-body-md text-[11px] text-on-surface-variant">Pre-populate realistic role specifications with 1 click.</span>
            </div>
            <div class="flex flex-wrap gap-2">
              <button type="button" onclick="App.fillJobPreset('ai')" class="px-3.5 py-1.5 bg-surface-container-lowest text-primary font-label-md font-semibold rounded-full border border-outline-variant/30 hover:bg-surface-container-high transition-all shadow-sm cursor-pointer text-xs flex items-center gap-1">
                <span>🧠</span> AI / ML Intern
              </button>
              <button type="button" onclick="App.fillJobPreset('fullstack')" class="px-3.5 py-1.5 bg-surface-container-lowest text-primary font-label-md font-semibold rounded-full border border-outline-variant/30 hover:bg-surface-container-high transition-all shadow-sm cursor-pointer text-xs flex items-center gap-1">
                <span>⚡</span> Full Stack AI
              </button>
              <button type="button" onclick="App.fillJobPreset('devops')" class="px-3.5 py-1.5 bg-surface-container-lowest text-primary font-label-md font-semibold rounded-full border border-outline-variant/30 hover:bg-surface-container-high transition-all shadow-sm cursor-pointer text-xs flex items-center gap-1">
                <span>☁️</span> Cloud DevOps
              </button>
            </div>
          </div>

          <form onsubmit="App.handleCreateJob(event)" class="space-y-6 text-xs font-body-md">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block font-label-md font-bold text-primary mb-1.5">Job / Internship Title</label>
                <input type="text" id="job-title" required class="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant/40 rounded-xl text-primary focus:border-secondary focus:outline-none text-xs transition-all" value="Autonomous AI & Robotics Research Intern">
              </div>
              <div>
                <label class="block font-label-md font-bold text-primary mb-1.5">Company / Organization</label>
                <input type="text" id="job-company" required class="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant/40 rounded-xl text-primary focus:border-secondary focus:outline-none text-xs transition-all" value="Apex Neural Labs">
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block font-label-md font-bold text-primary mb-1.5">Location & Mode</label>
                <input type="text" id="job-location" required class="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant/40 rounded-xl text-primary focus:border-secondary focus:outline-none text-xs transition-all" value="Bangalore / Remote">
              </div>
              <div>
                <label class="block font-label-md font-bold text-primary mb-1.5">Internship Type</label>
                <input type="text" id="job-type" required class="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant/40 rounded-xl text-primary focus:border-secondary focus:outline-none text-xs transition-all" value="Full-time (6 Months)">
              </div>
              <div>
                <label class="block font-label-md font-bold text-primary mb-1.5">Monthly Stipend</label>
                <input type="text" id="job-stipend" required class="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant/40 rounded-xl text-primary focus:border-secondary focus:outline-none text-xs transition-all" value="₹50,000 / month">
              </div>
            </div>

            <div>
              <label class="block font-label-md font-bold text-primary mb-1.5">Role Description</label>
              <textarea id="job-desc" rows="3" required class="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant/40 rounded-xl text-primary focus:border-secondary focus:outline-none text-xs transition-all">Develop perception and control algorithms for autonomous navigation systems, validate models on simulation benches, and benchmark real-time inference latency.</textarea>
            </div>

            <!-- REQUIRED SKILLS CONFIG -->
            <div class="p-5 bg-surface-container-low rounded-2xl border border-surface-variant/40">
              <h3 class="font-headline-md text-sm font-bold text-primary mb-1">Required Skills (Weighting & Minimum Level)</h3>
              <p class="font-body-md text-[11px] text-on-surface-variant mb-4">Candidates will be ranked on cryptographic proof of these exact competencies.</p>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3" id="job-skills-container">
                <div class="p-3.5 bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-sm">
                  <div class="font-label-md font-bold text-primary" id="skill-box-1-title">Python</div>
                  <div class="text-[11px] font-label-md text-secondary mt-0.5" id="skill-box-1-meta">Advanced • 35% Weight</div>
                </div>
                <div class="p-3.5 bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-sm">
                  <div class="font-label-md font-bold text-primary" id="skill-box-2-title">PyTorch</div>
                  <div class="text-[11px] font-label-md text-secondary mt-0.5" id="skill-box-2-meta">Intermediate • 30% Weight</div>
                </div>
                <div class="p-3.5 bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-sm">
                  <div class="font-label-md font-bold text-primary" id="skill-box-3-title">Computer Vision</div>
                  <div class="text-[11px] font-label-md text-secondary mt-0.5" id="skill-box-3-meta">Intermediate • 35% Weight</div>
                </div>
              </div>
            </div>

            <div class="p-4 bg-secondary-fixed/30 rounded-2xl border border-secondary-fixed text-primary text-xs flex items-center gap-3">
              <span class="material-symbols-outlined text-secondary text-xl shrink-0" style="font-variation-settings: 'FILL' 1;">shield</span>
              <div class="font-body-md">
                <strong class="font-label-md">Attribute-Blind Matching Active:</strong> Candidates will be ranked solely by verified skills and proof hashes. Candidate demographic attributes will be masked automatically.
              </div>
            </div>

            <div class="pt-4 flex justify-end gap-3">
              <a href="#/recruiter/dashboard" class="px-5 py-2.5 rounded-full bg-surface-container hover:bg-surface-container-high text-primary font-label-md font-semibold text-xs transition-colors">Cancel</a>
              <button type="submit" class="px-6 py-2.5 rounded-full bg-primary-container hover:bg-primary text-on-primary font-label-md font-bold text-xs shadow-sm flex items-center gap-2 cursor-pointer">
                <span class="material-symbols-outlined text-[16px]">bolt</span>
                <span>Publish Role & Generate Candidate Matches</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    `;
  }
};
