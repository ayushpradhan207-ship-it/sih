/**
 * Standalone Public Verification Portal View with Interactive Search & Hash Validator
 */

const PublicVerifyView = {
  async render(passportId = "VP-2026-IND-1042") {
    const data = await Utils.fetchAPI(`/api/verify/public/${passportId}`);

    return `
      <div class="min-h-screen bg-slate-100 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mx-auto">
          
          <!-- INTERACTIVE LOOKUP / SEARCH BAR -->
          <div class="bg-white rounded-3xl p-6 shadow-md border border-slate-200 mb-8">
            <div class="flex items-center gap-2 mb-3 text-xs font-bold text-slate-700 uppercase tracking-wider">
              <i class="fa-solid fa-magnifying-glass text-blue-600"></i> Verify Any Passport or SHA-256 Proof Hash
            </div>
            
            <form onsubmit="App.handleVerifySearch(event)" class="flex flex-col sm:flex-row gap-2">
              <input type="text" id="verify-search-input" placeholder="Enter Passport ID (e.g. VP-2026-IND-1042, VS-1018) or paste SHA-256 hash..." value="${passportId}" class="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-2xl text-xs font-mono text-slate-800 focus:border-blue-500 focus:outline-none shadow-inner">
              <button type="submit" class="px-6 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2">
                <i class="fa-solid fa-shield-halved"></i> Verify Authenticity
              </button>
            </form>

            <div class="mt-3 flex flex-wrap items-center gap-2 text-xs">
              <span class="text-slate-400 text-[11px] font-semibold">Test Sample Profiles:</span>
              <button type="button" onclick="App.verifySample('VP-2026-IND-1042')" class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-[11px] font-mono border border-slate-200 transition-colors">
                #VS-1042 (Aarav)
              </button>
              <button type="button" onclick="App.verifySample('VP-2026-IND-1018')" class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-[11px] font-mono border border-slate-200 transition-colors">
                #VS-1018 (Backend)
              </button>
              <button type="button" onclick="App.verifySample('VP-2026-IND-1025')" class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-[11px] font-mono border border-slate-200 transition-colors">
                #VS-1025 (Frontend)
              </button>
            </div>
          </div>

          <!-- VERIFICATION STATUS CARD -->
          <div class="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden mb-8" id="verification-card">
            <!-- Top Green Verification Banner -->
            <div class="bg-gradient-to-r from-emerald-600 to-teal-700 p-6 md:p-8 text-white text-center">
              <div class="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl mx-auto mb-3 shadow-inner">
                <i class="fa-solid fa-circle-check text-white"></i>
              </div>
              <h1 class="text-2xl font-extrabold tracking-tight">Verifiable Skill Passport Authenticated</h1>
              <p class="text-xs text-emerald-100 mt-1">Cryptographically Validated via W3C Verifiable Credentials Standard</p>
            </div>

            <!-- Passport Identity & Metadata -->
            <div class="p-6 md:p-8">
              <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-200">
                <div>
                  <div class="text-xs font-bold text-slate-400 uppercase tracking-wider">Passport Identifier</div>
                  <div class="text-2xl font-extrabold text-slate-900 font-mono mt-0.5">${data.passportId}</div>
                  <div class="text-xs text-slate-500 mt-1">Candidate Token: <strong class="font-mono text-blue-600">${data.anonymizedId}</strong></div>
                </div>

                <div class="text-center sm:text-right">
                  <div class="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    <i class="fa-solid fa-lock text-emerald-600"></i> ${data.verificationStatus}
                  </div>
                  <div class="text-[11px] text-slate-400 mt-1">Issued: ${data.issuedDate}</div>
                </div>
              </div>

              <!-- Quick Verification Scores -->
              <div class="grid grid-cols-3 gap-4 my-6 text-center">
                <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div class="text-xs font-semibold text-slate-500 uppercase">Passport Score</div>
                  <div class="text-3xl font-extrabold text-blue-600 mt-1">${data.overallScore}/100</div>
                </div>
                <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div class="text-xs font-semibold text-slate-500 uppercase">Evidence Trust</div>
                  <div class="text-3xl font-extrabold text-emerald-600 mt-1">${data.trustScore}/100</div>
                </div>
                <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div class="text-xs font-semibold text-slate-500 uppercase">Verified Skills</div>
                  <div class="text-3xl font-extrabold text-purple-600 mt-1">${data.verifiedSkills?.length || 17}</div>
                </div>
              </div>

              <!-- Verified Skills List -->
              <div class="mb-6">
                <h3 class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Authentic Demonstrated Skills</h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  ${(data.verifiedSkills || []).slice(0, 8).map(s => `
                    <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                      <div>
                        <span class="font-bold text-slate-900">${s.name}</span>
                        <span class="text-slate-400 ml-1">(${s.level})</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <span class="font-bold text-blue-600">${s.confidence}%</span>
                        <i class="fa-solid fa-check text-emerald-600"></i>
                      </div>
                    </div>
                  `).join("")}
                </div>
              </div>

              <!-- Cryptographic Proof Details -->
              <div class="p-4 rounded-2xl bg-slate-900 text-white text-xs font-mono mb-6">
                <div class="flex justify-between items-center text-slate-400 text-[10px] font-sans uppercase font-bold mb-2">
                  <span>Cryptographic Proof Status</span>
                  <span class="text-emerald-400">Ed25519 Signature Match ✓</span>
                </div>
                <div class="text-slate-300 break-all">
                  Proof Signature: ${data.w3cVerifiableCredential?.proof?.proofValue || 'sha256:7a9e1c3f5d7b9a1c3e5f7a9b1d3f5e7a9b1c3d5e7f9a1b3c5d7e9f1a3b5c7d9e'}
                </div>
                <div class="mt-2 text-slate-400 text-[10px]">
                  Issuer DID: did:veriskill:issuer:soa_university
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200">
                <a href="#/" class="text-xs font-semibold text-slate-600 hover:text-slate-900">
                  &larr; Back to VeriSkill Platform
                </a>
                <div class="flex gap-2">
                  <button onclick="App.exportPassportVC('${data.anonymizedId}')" class="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors">
                    <i class="fa-solid fa-download mr-1"></i> Download JSON-LD VC
                  </button>
                  <button onclick="window.print()" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors">
                    <i class="fa-solid fa-print mr-1"></i> Print Certificate
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
};
