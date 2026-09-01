/**
 * VeriSkill — Stitch Student Privacy & Data Ownership View
 */

const PrivacyView = {
  async render(studentId = "student-1042") {
    const student = await Utils.fetchAPI(`/api/students/${studentId}`);

    return `
      <div class="max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop pt-24 md:pt-28 pb-section-gap flex flex-col gap-stack-lg min-h-screen">
        
        <!-- Header -->
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="px-3 py-0.5 rounded-full text-xs font-label-md font-semibold bg-secondary-fixed/50 text-secondary border border-secondary-fixed">
              Privacy by Design & Self-Sovereignty
            </span>
          </div>
          <h1 class="font-headline-lg-mobile md:font-headline-lg text-primary font-bold">Your Data. Your Skill Passport.</h1>
          <p class="font-body-lg text-on-surface-variant text-sm mt-1">You own your verified credentials. Control who views your passport and manage your anonymization tokens.</p>
        </div>

        <div class="space-y-6 text-xs font-body-md">
          <!-- CARD 1: EXPORT CREDENTIALS -->
          <section class="bg-surface-container-lowest rounded-2xl p-6 md:p-8 border border-surface-variant/40 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="material-symbols-outlined text-secondary text-[20px]">download_for_offline</span>
                <h2 class="font-headline-md text-base font-bold text-primary">Self-Sovereign Credential Export</h2>
              </div>
              <p class="font-body-md text-xs text-on-surface-variant max-w-lg">
                Download your entire Skill Passport in open W3C Verifiable Credentials (JSON-LD) format with cryptographic Ed25519 signatures.
              </p>
            </div>
            <button type="button" onclick="App.exportPassportVC('${student.id}')" class="px-5 py-2.5 rounded-full bg-primary-container hover:bg-primary text-on-primary font-label-md text-xs font-bold transition-all shrink-0 flex items-center gap-2 shadow-sm cursor-pointer">
              <span class="material-symbols-outlined text-[16px]">code</span>
              <span>Export JSON-LD VC</span>
            </button>
          </section>

          <!-- CARD 2: RECRUITER ACCESS CONTROL -->
          <section class="bg-surface-container-lowest rounded-2xl p-6 md:p-8 border border-surface-variant/40 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
            <div class="flex items-center justify-between pb-4 border-b border-surface-variant/40 mb-4">
              <div>
                <div class="flex items-center gap-2 mb-0.5">
                  <span class="material-symbols-outlined text-secondary text-[20px]">lock_person</span>
                  <h2 class="font-headline-md text-base font-bold text-primary">Recruiter Matching Access Control</h2>
                </div>
                <p class="font-body-md text-xs text-on-surface-variant">Manage which employers can view your anonymized skill match profile.</p>
              </div>
              <span class="px-3 py-1 rounded-full text-xs font-label-md font-bold bg-secondary-fixed/50 text-secondary border border-secondary-fixed">Matching Enabled</span>
            </div>

            <div class="space-y-3">
              <div class="p-4 rounded-xl bg-surface-container-low border border-surface-variant/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div class="font-label-md font-bold text-primary text-sm">Apex Neural Labs (Machine Learning Intern)</div>
                  <div class="font-body-md text-[11px] text-on-surface-variant mt-0.5">Access Granted • Anonymized Token: <span class="font-mono text-secondary font-semibold">#${student.anonymizedId}</span></div>
                </div>
                <button type="button" onclick="Utils.showToast('Recruiter access revoked for Apex Neural Labs', 'info')" class="px-3.5 py-1.5 rounded-full bg-surface-container hover:bg-error-container text-on-error-container font-label-md font-semibold text-xs border border-outline-variant/30 transition-colors cursor-pointer">
                  Revoke Access
                </button>
              </div>

              <div class="p-4 rounded-xl bg-surface-container-low border border-surface-variant/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div class="font-label-md font-bold text-primary text-sm">NeuroTech Solutions (Full Stack AI Intern)</div>
                  <div class="font-body-md text-[11px] text-on-surface-variant mt-0.5">Access Granted • Anonymized Token: <span class="font-mono text-secondary font-semibold">#${student.anonymizedId}</span></div>
                </div>
                <button type="button" onclick="Utils.showToast('Recruiter access revoked for NeuroTech Solutions', 'info')" class="px-3.5 py-1.5 rounded-full bg-surface-container hover:bg-error-container text-on-error-container font-label-md font-semibold text-xs border border-outline-variant/30 transition-colors cursor-pointer">
                  Revoke Access
                </button>
              </div>
            </div>
          </section>

          <!-- CARD 3: ANONYMIZATION LEVEL -->
          <section class="bg-surface-container-lowest rounded-2xl p-6 md:p-8 border border-surface-variant/40 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
            <div class="flex items-center gap-2 mb-1">
              <span class="material-symbols-outlined text-secondary text-[20px]">shield</span>
              <h2 class="font-headline-md text-base font-bold text-primary">Attribute-Blind Anonymization Level</h2>
            </div>
            <p class="font-body-md text-xs text-on-surface-variant mb-4">Choose what recruiters see prior to formal shortlisting.</p>

            <div class="space-y-3">
              <label class="p-4 rounded-xl border border-secondary-fixed bg-secondary-fixed/20 flex items-start gap-3 cursor-pointer">
                <input type="radio" name="anon-level" checked class="mt-1 text-secondary focus:ring-secondary">
                <div>
                  <div class="font-label-md font-bold text-primary">Strict Attribute-Blind (Recommended)</div>
                  <div class="font-body-md text-on-surface-variant text-xs mt-0.5">Masks name, photo, gender, age, university, and location. Only verified skills, evidence metrics, and proof hashes are visible.</div>
                </div>
              </label>

              <label class="p-4 rounded-xl border border-surface-variant/40 bg-surface-container-low flex items-start gap-3 cursor-pointer">
                <input type="radio" name="anon-level" class="mt-1 text-secondary focus:ring-secondary">
                <div>
                  <div class="font-label-md font-bold text-primary">Public Profile with University</div>
                  <div class="font-body-md text-on-surface-variant text-xs mt-0.5">Exposes degree and graduation year while keeping personal contact info and demographic attributes private.</div>
                </div>
              </label>
            </div>
          </section>
        </div>
      </div>
    `;
  }
};
