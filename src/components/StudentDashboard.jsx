import React, { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

export const StudentDashboard = () => {
  const { t } = useLanguage();
  const { currentUser, isDemoMode, updateProfile } = useAuth();
  const fileInputRef = useRef(null);

  const [scanModalOpen, setScanModalOpen] = useState(false);
  const [scanStep, setScanStep] = useState(0); // 0: Idle, 1..4: Scanning, 5: Report
  const [selectedCert, setSelectedCert] = useState({
    title: 'Deep Learning Specialization',
    issuer: 'Stanford Online / DeepLearning.AI',
    skills: 'Python, PyTorch, Neural Networks',
    credits: 3.0
  });

  const userName = currentUser?.name || (isDemoMode ? 'Aarav Sharma' : 'Ashutosh Pradhan');
  const userAvatar = currentUser?.avatar || null;
  const userInitials = (userName || 'User').split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  const hasSynced = currentUser?.hasSyncedDigiLocker ?? (isDemoMode ? true : false);

  const overallScore = isDemoMode ? 84 : (currentUser?.overallScore || (hasSynced ? 84 : 0));
  const ncrfCredits = isDemoMode ? 4.5 : (currentUser?.ncrfCredits ?? (hasSynced ? 4.5 : 0));
  const isFreshUser = !isDemoMode && !hasSynced && overallScore === 0;

  // Handle avatar photo upload via FileReader
  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target.result;
      updateProfile({ avatar: base64 });
    };
    reader.readAsDataURL(file);
  };

  // Sync DigiLocker
  const syncDigiLocker = () => {
    updateProfile({
      hasSyncedDigiLocker: true,
      ncrfCredits: 4.5,
      overallScore: 84,
      trustScore: 87,
      verifiedSkillsCount: 6
    });
  };

  // Vision-AI Scan sequence
  const startVisionAIScan = () => {
    setScanStep(1);
    setTimeout(() => setScanStep(2), 500);
    setTimeout(() => setScanStep(3), 1000);
    setTimeout(() => setScanStep(4), 1500);
    setTimeout(() => setScanStep(5), 2000);
  };

  const applyVerifiedCert = () => {
    const currentCredits = currentUser?.ncrfCredits || 0;
    updateProfile({
      hasSyncedDigiLocker: true,
      ncrfCredits: Math.min(currentCredits + selectedCert.credits, 9.0),
      overallScore: Math.min((currentUser?.overallScore || 0) + 35, 92),
      trustScore: 94
    });
    setScanModalOpen(false);
    setScanStep(0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pt-24 pb-16 flex flex-col gap-8 min-h-screen">
      {/* Header & Avatar Upload Container */}
      <section className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="flex items-center gap-4">
          <div
            className="relative group cursor-pointer shrink-0"
            onClick={() => fileInputRef.current?.click()}
            title="Click to upload profile photo"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-tr from-primary to-secondary text-white flex items-center justify-center text-xl md:text-2xl font-bold shadow-md overflow-hidden border-2 border-surface-variant/40 group-hover:border-secondary transition-all">
              {userAvatar ? (
                <img src={userAvatar} className="w-full h-full object-cover" alt={userName} />
              ) : (
                <span className="tracking-wider">{userInitials}</span>
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-secondary text-white flex items-center justify-center shadow-lg border-2 border-surface-container-lowest group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[15px]">photo_camera</span>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleAvatarUpload}
            />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed/50 text-secondary text-[11px] font-label-md font-bold uppercase tracking-wider">
                {t('dashboard.sihBadge')}
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-label-md font-bold ${isDemoMode ? 'bg-amber-100 text-amber-800' : 'bg-primary-container text-on-primary'}`}>
                {isDemoMode ? 'Demo Tour Mode' : 'Authenticated User'}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl text-primary font-bold">
              {t('dashboard.greeting')}, {userName}.
            </h1>
            <p className="text-sm text-on-surface-variant">
              {t('dashboard.subtitle')}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={syncDigiLocker}
            className={`px-4 py-2.5 rounded-full text-xs font-bold border transition-all flex items-center gap-1.5 shadow-sm cursor-pointer ${hasSynced ? 'bg-tertiary-fixed/30 text-on-tertiary-fixed-variant border-tertiary-fixed' : 'bg-secondary-fixed/40 text-secondary border-secondary-fixed hover:bg-secondary-fixed/60'}`}
          >
            <span className="material-symbols-outlined text-[18px]">{hasSynced ? 'verified' : 'account_balance'}</span>
            <span>{hasSynced ? 'APAAR ID Synced' : t('dashboard.syncApaar')}</span>
          </button>

          <button
            type="button"
            onClick={() => { setScanModalOpen(true); setScanStep(0); }}
            className="px-4 py-2.5 bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-xs font-bold rounded-full transition-all border border-outline-variant/30 flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">document_scanner</span>
            <span>{t('dashboard.uploadCert')}</span>
          </button>

          <a href="#/verify/VP-2026-IND-1042" className="px-4 py-2.5 bg-primary-container hover:bg-primary text-on-primary font-label-md text-xs font-bold rounded-full transition-all shadow-sm flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            <span>{t('dashboard.publicVerification')}</span>
          </a>
        </div>
      </section>

      {/* Empty State Card (MODE B) */}
      {isFreshUser && (
        <div className="p-8 bg-surface-container-lowest rounded-3xl border border-secondary/30 shadow-md text-center flex flex-col items-center justify-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-secondary-fixed/40 text-secondary flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-[36px]">folder_open</span>
          </div>
          <div className="max-w-lg space-y-1.5">
            <h2 className="text-xl font-bold text-primary">{t('dashboard.emptyStateTitle')}</h2>
            <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
              {t('dashboard.emptyStateSub')}
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
            <button
              type="button"
              onClick={syncDigiLocker}
              className="px-5 py-3 rounded-full bg-secondary-fixed hover:bg-secondary-fixed/80 text-secondary font-label-md text-xs font-bold border border-secondary transition-all cursor-pointer flex items-center gap-2 shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">account_balance</span>
              <span>{t('dashboard.importDigiLocker')}</span>
            </button>
            <button
              type="button"
              onClick={() => { setScanModalOpen(true); setScanStep(0); }}
              className="px-5 py-3 rounded-full bg-primary-container hover:bg-primary text-on-primary font-label-md text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">document_scanner</span>
              <span>{t('dashboard.uploadCert')}</span>
            </button>
          </div>
        </div>
      )}

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Passport Highlight */}
        <div className="md:col-span-8 bg-surface-container-lowest p-6 md:p-8 rounded-2xl shadow-sm border border-surface-variant/40 flex flex-col justify-between gap-6">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-on-surface-variant">{t('dashboard.passportTitle')}</span>
              <h2 className="text-xl font-bold text-primary">{t('dashboard.mySecurePassport')}</h2>
            </div>
            <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-4xl md:text-5xl font-bold text-primary">{overallScore}%</span>
              <span className="text-xs text-on-surface-variant">• {t('dashboard.tier')}</span>
            </div>
            <div className="w-full h-2.5 bg-surface-container rounded-full overflow-hidden mb-2">
              <div className="h-full bg-gradient-to-r from-secondary to-tertiary-fixed-dim rounded-full transition-all duration-700" style={{ width: `${overallScore}%` }}></div>
            </div>
            <p className="text-xs text-on-surface-variant">{t('dashboard.passportInstruction')}</p>
          </div>
        </div>

        {/* NCrF Academic Credits */}
        <div className="md:col-span-4 bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-surface-variant/40 flex flex-col justify-between">
          <div className="flex justify-between items-center text-on-surface-variant">
            <span className="text-xs uppercase tracking-widest font-semibold">{t('dashboard.ncrfTitle')}</span>
            <span className="material-symbols-outlined text-secondary">account_balance</span>
          </div>
          <div className="my-4">
            <div className="text-3xl md:text-4xl font-bold text-secondary">{ncrfCredits}</div>
            <p className="text-xs text-primary font-semibold mt-1">{t('dashboard.ncrfCredits')}</p>
          </div>
          <div className="p-2.5 rounded-xl bg-surface-container-low text-[11px] text-on-surface-variant flex items-center gap-1.5">
            <span className="material-symbols-outlined text-tertiary-fixed-dim text-[16px]">verified</span>
            <span>Level 5.5 (National Credit Framework)</span>
          </div>
        </div>
      </div>

      {/* Vision-AI Scan Modal */}
      {scanModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-3xl shadow-2xl border border-secondary/30 w-full max-w-xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 bg-primary-container text-white flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[24px]">document_scanner</span>
                <div>
                  <h3 className="text-base font-bold text-white">Vision-AI Certificate Verification</h3>
                  <p className="text-xs text-secondary-fixed">W3C VC Cryptographic Fraud & Integrity Scanner</p>
                </div>
              </div>
              <button onClick={() => setScanModalOpen(false)} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="p-6 space-y-4">
              {scanStep === 0 && (
                <>
                  <div className="p-6 border-2 border-dashed border-outline-variant/60 rounded-2xl bg-surface-container-low text-center space-y-2">
                    <span className="material-symbols-outlined text-3xl text-secondary">cloud_upload</span>
                    <p className="text-xs font-bold text-primary">Selected: {selectedCert.title}</p>
                    <p className="text-[11px] text-on-surface-variant">{selectedCert.issuer} • {selectedCert.credits} NCrF Credits</p>
                  </div>
                  <button
                    onClick={startVisionAIScan}
                    className="w-full py-3.5 rounded-full bg-primary-container hover:bg-primary text-on-primary text-xs font-bold shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                    <span>Execute 4-Step Vision-AI Scan</span>
                  </button>
                </>
              )}

              {scanStep >= 1 && scanStep <= 4 && (
                <div className="py-6 flex flex-col items-center justify-center gap-4 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary-container text-white flex items-center justify-center animate-pulse">
                    <span className="material-symbols-outlined text-3xl text-tertiary-fixed-dim">document_scanner</span>
                  </div>
                  <h4 className="font-bold text-sm text-primary">{t('scan.overlayTitle')}</h4>
                  <div className="w-full space-y-2 text-xs font-mono text-left">
                    <div className={`p-2.5 rounded-xl flex items-center justify-between ${scanStep >= 1 ? 'bg-tertiary-fixed/20 text-on-tertiary-fixed-variant' : 'bg-surface-container-low'}`}>
                      <span>{t('scan.step1')}</span>
                      <span className="material-symbols-outlined text-[16px]">{scanStep >= 2 ? 'check_circle' : 'progress_activity'}</span>
                    </div>
                    <div className={`p-2.5 rounded-xl flex items-center justify-between ${scanStep >= 2 ? 'bg-tertiary-fixed/20 text-on-tertiary-fixed-variant' : 'bg-surface-container-low'}`}>
                      <span>{t('scan.step2')}</span>
                      <span className="material-symbols-outlined text-[16px]">{scanStep >= 3 ? 'check_circle' : 'schedule'}</span>
                    </div>
                    <div className={`p-2.5 rounded-xl flex items-center justify-between ${scanStep >= 3 ? 'bg-tertiary-fixed/20 text-on-tertiary-fixed-variant' : 'bg-surface-container-low'}`}>
                      <span>{t('scan.step3')}</span>
                      <span className="material-symbols-outlined text-[16px]">{scanStep >= 4 ? 'check_circle' : 'schedule'}</span>
                    </div>
                    <div className={`p-2.5 rounded-xl flex items-center justify-between ${scanStep >= 4 ? 'bg-tertiary-fixed/20 text-on-tertiary-fixed-variant' : 'bg-surface-container-low'}`}>
                      <span>{t('scan.step4')}</span>
                      <span className="material-symbols-outlined text-[16px]">schedule</span>
                    </div>
                  </div>
                </div>
              )}

              {scanStep === 5 && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="p-4 rounded-2xl bg-tertiary-fixed/20 border border-tertiary-fixed/60 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-primary">{t('scan.reportTitle')}</h4>
                      <p className="text-xs text-on-tertiary-fixed-variant font-semibold">{selectedCert.title}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-tertiary-fixed-dim text-on-tertiary-fixed-variant text-xs font-bold">VERIFIED</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2.5 rounded-xl bg-surface-container-low border border-surface-variant/40">
                      <span className="text-[10px] text-on-surface-variant uppercase font-bold">Fraud Score</span>
                      <p className="font-bold text-on-tertiary-fixed-variant mt-1">99.4% Passed</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-surface-container-low border border-surface-variant/40">
                      <span className="text-[10px] text-on-surface-variant uppercase font-bold">SHA-256 Check</span>
                      <p className="font-bold text-secondary mt-1">Matched</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-surface-container-low border border-surface-variant/40">
                      <span className="text-[10px] text-on-surface-variant uppercase font-bold">Revocation</span>
                      <p className="font-bold text-primary mt-1">ACTIVE</p>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button onClick={() => setScanModalOpen(false)} className="px-4 py-2 rounded-full text-xs font-semibold bg-surface-container">Cancel</button>
                    <button onClick={applyVerifiedCert} className="px-5 py-2 rounded-full bg-primary-container text-on-primary text-xs font-bold shadow-md">Add to Skill Passport</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
