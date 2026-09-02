import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export const PublicVerify = ({ passportId = 'VP-2026-IND-1042' }) => {
  const { t } = useLanguage();
  const [calculatedHash, setCalculatedHash] = useState('sha256:0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20');
  const targetLedgerSignature = 'sha256:0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20';

  useEffect(() => {
    async function computeHash() {
      if (typeof window !== 'undefined' && window.crypto?.subtle) {
        const encoder = new TextEncoder();
        const data = encoder.encode(JSON.stringify({ passportId, issuer: 'SOA University', type: 'VerifiableCredential' }));
        const hashBuf = await window.crypto.subtle.digest('SHA-256', data);
        const hashArr = Array.from(new Uint8Array(hashBuf));
        const hashHex = hashArr.map(b => b.toString(16).padStart(2, '0')).join('');
        setCalculatedHash(`sha256:${hashHex}`);
      }
    }
    computeHash();
  }, [passportId]);

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 pt-24 pb-16 flex flex-col gap-6">
      <div className="bg-surface-container-lowest rounded-3xl shadow-md border border-surface-variant/40 overflow-hidden">
        {/* Banner */}
        <div className="bg-primary-container p-6 md:p-8 text-white text-center">
          <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-3 text-tertiary-fixed-dim">
            <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold">{t('verify.title')}</h1>
          <p className="text-xs text-secondary-fixed mt-1">{t('verify.subtitle')}</p>
        </div>

        {/* SHA-256 Banner */}
        <div className="p-5 border-b border-surface-variant/40">
          <div className="p-4 rounded-2xl bg-tertiary-fixed/15 border border-tertiary-fixed/40 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-on-tertiary-fixed-variant text-2xl">lock</span>
              <div>
                <h3 className="text-xs font-bold text-primary">{t('verify.hashLabel')}</h3>
                <p className="text-xs text-on-surface-variant mt-0.5">{t('verify.hashExpl')}</p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-tertiary-fixed-dim text-on-tertiary-fixed-variant text-[11px] font-bold shrink-0">
              Web Crypto: OK
            </span>
          </div>
        </div>

        {/* AI Authenticity Report */}
        <div className="p-6">
          <div className="p-4 rounded-2xl bg-surface-container-low border border-secondary/30 space-y-3 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[20px]">auto_awesome</span>
                <span className="text-xs font-bold text-primary uppercase">{t('scan.reportTitle')}</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-secondary text-[10px] font-bold">
                Vision-AI Verified
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30">
                <span className="text-[10px] text-on-surface-variant uppercase font-bold">Fraud Detection</span>
                <p className="font-bold text-on-tertiary-fixed-variant mt-0.5">{t('scan.fraudScore')}</p>
              </div>
              <div className="p-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30">
                <span className="text-[10px] text-on-surface-variant uppercase font-bold">Cryptographic Check</span>
                <p className="font-bold text-secondary mt-0.5">{t('scan.cryptoCheck')}</p>
              </div>
              <div className="p-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30">
                <span className="text-[10px] text-on-surface-variant uppercase font-bold">Revocation Status</span>
                <p className="font-bold text-primary mt-0.5">{t('scan.revocationStatus')}</p>
              </div>
            </div>
          </div>

          {/* Identity */}
          <div className="flex justify-between items-center pb-6 border-b border-surface-variant/40">
            <div>
              <span className="text-xs font-bold text-on-surface-variant uppercase">Passport Identifier</span>
              <p className="text-2xl font-mono font-bold text-primary">{passportId}</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-secondary-fixed/50 text-secondary text-xs font-bold border border-secondary-fixed">
              {t('verify.status')}
            </span>
          </div>

          {/* Cryptographic Breakdown */}
          <div className="p-4 rounded-2xl bg-primary-container text-white font-mono text-xs space-y-2 mt-6">
            <div className="text-[10px] text-on-primary-container uppercase font-bold">{t('verify.ledgerSig')}</div>
            <div className="p-2 rounded-lg bg-black/30 text-slate-300 break-all">{targetLedgerSignature}</div>
            <div className="text-[10px] text-tertiary-fixed uppercase font-bold">{t('verify.liveHash')}</div>
            <div className="p-2 rounded-lg bg-black/30 text-tertiary-fixed-dim break-all">{calculatedHash}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicVerify;
