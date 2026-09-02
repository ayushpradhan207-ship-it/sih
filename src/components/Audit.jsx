import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const Audit = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pt-24 pb-16 min-h-screen flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed/50 text-secondary text-xs font-bold uppercase tracking-wider mb-2">
            <span className="material-symbols-outlined text-[15px]">shield</span>
            <span>Ethical Blind Layer & Bias Mitigation</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary">{t('navbar.audit')}</h1>
          <p className="text-sm text-on-surface-variant mt-1">
            Demographic Parity Auditing & Live Four-Fifths Disparate Impact Verification.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-full bg-tertiary-fixed-dim text-on-tertiary-fixed-variant font-bold text-xs">
            0.94 Disparate Impact (Optimal)
          </span>
        </div>
      </div>

      {/* Audit Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface-container-lowest rounded-3xl p-6 border border-surface-variant/40 shadow-sm">
          <span className="text-xs uppercase tracking-wider font-bold text-on-surface-variant">Attribute Blind Pipeline</span>
          <h3 className="text-xl font-bold text-primary mt-2">Protected Attribute Isolation</h3>
          <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
            Names, photos, gender, age, and institutions are cryptographically stripped before candidate evaluation.
          </p>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-secondary font-semibold">
            <span className="material-symbols-outlined text-sm">check_circle</span>
            <span>100% Blind Scoring Verified</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-3xl p-6 border border-surface-variant/40 shadow-sm">
          <span className="text-xs uppercase tracking-wider font-bold text-on-surface-variant">Four-Fifths Rule</span>
          <h3 className="text-xl font-bold text-primary mt-2">0.94 Parity Ratio</h3>
          <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
            Exceeds the EEOC 0.80 minimum threshold across all evaluated demographic cohorts.
          </p>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-tertiary-fixed-dim font-semibold">
            <span className="material-symbols-outlined text-sm">verified</span>
            <span>Legal Compliance: Passed</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-3xl p-6 border border-surface-variant/40 shadow-sm">
          <span className="text-xs uppercase tracking-wider font-bold text-on-surface-variant">Audit Trail</span>
          <h3 className="text-xl font-bold text-primary mt-2">Immutable Audit Ledger</h3>
          <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
            All AI decisions maintain cryptographic proof chains with mathematical 5-factor scoring traces.
          </p>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-primary font-semibold">
            <span className="material-symbols-outlined text-sm">lock</span>
            <span>Zero Unverifiable Claims</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Audit;
