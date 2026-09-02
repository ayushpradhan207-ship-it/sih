import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

export const Home = () => {
  const { t } = useLanguage();
  const { startDemoTour } = useAuth();

  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Hero Section */}
      <section className="relative px-4 md:px-8 py-16 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-fixed/50 text-secondary text-xs font-bold uppercase tracking-wider mb-6">
          <span className="material-symbols-outlined text-[16px]">stars</span>
          <span>Smart India Hackathon 2026 Edition</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary max-w-4xl leading-tight">
          Show what you can do.<br />
          <span className="text-outline">Not just what you studied.</span>
        </h1>

        <p className="mt-4 text-base md:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
          VeriSkill turns coursework, projects, competitions, and credentials into verified skills — then connects you with internships and student teams that fit.
        </p>

        <div className="flex flex-col sm:flex-row gap-3.5 mt-8">
          <a
            href="#/onboarding"
            className="px-8 py-4 rounded-full bg-primary-container text-on-primary text-xs md:text-sm font-bold shadow-md hover:bg-primary transition-all text-center"
          >
            Build My Skill Passport
          </a>
          <button
            type="button"
            onClick={startDemoTour}
            className="px-8 py-4 rounded-full bg-secondary-fixed/40 hover:bg-secondary-fixed/60 text-secondary border border-secondary-fixed text-xs md:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
          >
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
            <span>Launch 3-Minute Demo Tour</span>
          </button>
        </div>
      </section>

      {/* The 3 Pillars of VeriSkill */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-secondary">Zero False-Verification Invariant</span>
          <h2 className="text-2xl md:text-3xl font-bold text-primary mt-2">The Three Pillars of VeriSkill</h2>
          <p className="text-on-surface-variant text-sm mt-2">Moving recruitment and hackathons from self-declared claims to cryptographic proof.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1: Verify */}
          <div className="bg-surface-container-lowest rounded-2xl p-8 border border-surface-variant shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-tertiary-fixed/30 text-on-tertiary-fixed-variant flex items-center justify-center font-bold text-xl mb-6">
                01
              </div>
              <h3 className="text-xl font-bold text-primary">VERIFY</h3>
              <p className="text-xs font-semibold text-secondary mt-1">Verifiable Skill Passport</p>
              <p className="text-on-surface-variant text-sm mt-3 leading-relaxed">
                Connect GitHub commits, official coursework, competition rankings, and certificates. Extract & verify credentials with tamper-proof cryptographic proofs.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-surface-variant/40 flex items-center text-xs text-on-surface-variant gap-2">
              <span className="material-symbols-outlined text-tertiary-fixed-dim text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              <span>Zero self-inflated ratings</span>
            </div>
          </div>

          {/* Pillar 2: Match & Explain */}
          <div className="bg-surface-container-lowest rounded-2xl p-8 border border-surface-variant shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-secondary-fixed/50 text-secondary flex items-center justify-center font-bold text-xl mb-6">
                02
              </div>
              <h3 className="text-xl font-bold text-primary">MATCH & EXPLAIN</h3>
              <p className="text-xs font-semibold text-secondary mt-1">Explainable AI Scoring</p>
              <p className="text-on-surface-variant text-sm mt-3 leading-relaxed">
                Transparent 5-factor scoring model that mathematically decomposes scores across Coverage, Semantics, Evidence, Experience, and Projects, with 1-click gap remediation.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-surface-variant/40 flex items-center text-xs text-on-surface-variant gap-2">
              <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>visibility</span>
              <span>No score without evidence trace</span>
            </div>
          </div>

          {/* Pillar 3: Ethical & Blind */}
          <div className="bg-surface-container-lowest rounded-2xl p-8 border border-surface-variant shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-surface-container-high text-primary flex items-center justify-center font-bold text-xl mb-6">
                03
              </div>
              <h3 className="text-xl font-bold text-primary">ETHICAL & BLIND</h3>
              <p className="text-xs font-semibold text-secondary mt-1">Demographic Parity Auditing</p>
              <p className="text-on-surface-variant text-sm mt-3 leading-relaxed">
                Attribute-Blind Layer isolates names, photos, gender, age, and institutions from scoring pipelines, backed by live four-fifths rule Disparate Impact verification.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-surface-variant/40 flex items-center text-xs text-on-surface-variant gap-2">
              <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
              <span>Demographic isolation guaranteed</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
