import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const Evidence = () => {
  const { t } = useLanguage();

  const evidenceItems = [
    {
      title: 'VeriSkill Engine Core Repository',
      issuer: 'GitHub Verified Commits',
      type: 'Code Repository',
      hash: 'sha256:ba62c792063d5556101b059dc909dc733f0e1c52dc30856a380e587cc1c464e4',
      status: 'VERIFIED'
    },
    {
      title: 'Smart India Hackathon Finalist Certificate',
      issuer: 'Ministry of Education / AICTE',
      type: 'Competition Credential',
      hash: 'sha256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
      status: 'VERIFIED'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pt-24 pb-16 min-h-screen flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed/50 text-secondary text-xs font-bold uppercase tracking-wider mb-2">
            <span className="material-symbols-outlined text-[15px]">fact_check</span>
            <span>Cryptographic Evidence Ledger</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary">{t('navbar.evidence')}</h1>
          <p className="text-sm text-on-surface-variant mt-1">
            Every claimed skill links directly to an immutable proof artifact.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {evidenceItems.map((item, idx) => (
          <div key={idx} className="bg-surface-container-lowest rounded-3xl p-6 border border-surface-variant/40 shadow-sm flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-secondary">{item.type}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-tertiary-fixed/30 text-on-tertiary-fixed-variant font-bold text-[10px]">
                  {item.status}
                </span>
              </div>
              <h3 className="text-base font-bold text-primary">{item.title}</h3>
              <p className="text-xs text-on-surface-variant mt-1">{item.issuer}</p>

              <div className="mt-4 p-3 rounded-xl bg-surface-container font-mono text-[11px] text-on-surface-variant break-all">
                {item.hash}
              </div>
            </div>

            <div className="pt-3 border-t border-surface-variant/40 flex items-center justify-between text-xs text-on-surface-variant">
              <span>W3C Standard Compliance</span>
              <span className="material-symbols-outlined text-secondary text-sm">verified_user</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Evidence;
