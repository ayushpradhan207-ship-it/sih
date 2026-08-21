/**
 * Student Privacy & Data Ownership View
 */

const PrivacyView = {
  async render(studentId = "student-1042") {
    const student = await Utils.fetchAPI(`/api/students/${studentId}`);

    return `
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="mb-8">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
              Privacy by Design
            </span>
          </div>
          <h1 class="text-2xl font-extrabold text-slate-900 mt-1">Your Data. Your Passport.</h1>
          <p class="text-xs text-slate-500 mt-1">You own your verified credentials. Control who views your passport and manage your anonymization tokens.</p>
        </div>

        <div class="space-y-6 text-xs">
          <!-- CARD 1: EXPORT CREDENTIALS -->
          <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 class="text-base font-bold text-slate-900">Self-Sovereign Credential Export</h3>
              <p class="text-xs text-slate-500 mt-1">Download your entire Skill Passport in open W3C Verifiable Credentials (JSON-LD) format with cryptographic signatures.</p>
            </div>
            <button onclick="App.exportPassportVC('${student.id}')" class="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors shrink-0 flex items-center gap-2 shadow-sm">
              <i class="fa-solid fa-download"></i> Export JSON-LD VC
            </button>
          </div>

          <!-- CARD 2: RECRUITER ACCESS CONTROL -->
          <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <div class="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <h3 class="text-base font-bold text-slate-900">Recruiter Matching Access Control</h3>
                <p class="text-xs text-slate-500 mt-0.5">Manage which employers can view your anonymized skill match profile.</p>
              </div>
              <span class="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">Matching Enabled</span>
            </div>

            <div class="space-y-3">
              <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <div class="font-bold text-slate-900">Apex Neural Labs (Machine Learning Intern)</div>
                  <div class="text-[11px] text-slate-500">Access Granted • Anonymized Token: #${student.anonymizedId}</div>
                </div>
                <button onclick="Utils.showToast('Recruiter access revoked for Apex Neural Labs', 'info')" class="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs border border-rose-200 transition-colors">
                  Revoke Access
                </button>
              </div>

              <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <div class="font-bold text-slate-900">NeuroTech Solutions (Full Stack AI Intern)</div>
                  <div class="text-[11px] text-slate-500">Access Granted • Anonymized Token: #${student.anonymizedId}</div>
                </div>
                <button onclick="Utils.showToast('Recruiter access revoked for NeuroTech Solutions', 'info')" class="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs border border-rose-200 transition-colors">
                  Revoke Access
                </button>
              </div>
            </div>
          </div>

          <!-- CARD 3: ANONYMIZATION LEVEL -->
          <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <h3 class="text-base font-bold text-slate-900 mb-2">Attribute-Blind Anonymization Level</h3>
            <p class="text-xs text-slate-500 mb-4">Choose what recruiters see prior to formal shortlisting.</p>

            <div class="space-y-3">
              <label class="p-4 rounded-xl border border-blue-300 bg-blue-50/50 flex items-center gap-3 cursor-pointer">
                <input type="radio" name="anon-level" checked class="text-blue-600 focus:ring-blue-500">
                <div>
                  <div class="font-bold text-slate-900">Strict Attribute-Blind (Recommended)</div>
                  <div class="text-slate-600 text-xs mt-0.5">Masks name, photo, gender, age, university, and location. Only verified skills, evidence metrics, and proof hashes are visible.</div>
                </div>
              </label>

              <label class="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center gap-3 cursor-pointer">
                <input type="radio" name="anon-level" class="text-blue-600 focus:ring-blue-500">
                <div>
                  <div class="font-bold text-slate-900">Public Profile with University</div>
                  <div class="text-slate-600 text-xs mt-0.5">Exposes degree and graduation year while keeping personal contact info and demographic attributes private.</div>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    `;
  }
};
