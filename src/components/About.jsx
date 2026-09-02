import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const About = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 pt-24 pb-16 space-y-8">
      <div className="bg-surface-container-lowest rounded-3xl p-8 border border-surface-variant/40 shadow-sm text-center">
        <h1 className="text-3xl font-bold text-primary mb-2">How VeriSkill Works</h1>
        <p className="text-sm text-on-surface-variant max-w-xl mx-auto">
          VeriSkill transitions recruitment from self-declared claims into cryptographically verifiable, multi-source skill passports.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface-container-lowest rounded-2xl p-6 border border-surface-variant/40">
          <h3 className="text-base font-bold text-primary mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">verified</span>
            Cryptographic Proofs
          </h3>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Every competency is triangulated against GitHub AST analysis, coursework grade ledgers, and tamper-evident hashes.
          </p>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl p-6 border border-surface-variant/40">
          <h3 className="text-base font-bold text-primary mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-tertiary-fixed-dim">shield</span>
            Privacy & Fairness
          </h3>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Zero-knowledge proofs and demographic-blind matching prevent bias while verifying true candidate capabilities.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
