import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

export const Onboarding = () => {
  const { t } = useLanguage();
  const { currentUser, isDemoMode, updateProfile } = useAuth();
  const [step, setStep] = useState(1);
  const [selectedInterests, setSelectedInterests] = useState(new Set(["Technology", "AI/Machine Learning"]));
  const [apaarSynced, setApaarSynced] = useState(false);

  const userName = currentUser?.name || (isDemoMode ? 'Aarav Sharma' : 'Ashutosh Pradhan');

  const interestsList = [
    "Technology", "Business", "Design", "Research", 
    "Marketing", "Data Science", "Engineering", "Finance", 
    "Healthcare", "Education", "Sustainability", "Arts",
    "AI/Machine Learning", "Product Management", "Sales"
  ];

  const toggleInterest = (interest) => {
    setSelectedInterests(prev => {
      const next = new Set(prev);
      if (next.has(interest)) next.delete(interest);
      else next.add(interest);
      return next;
    });
  };

  const syncDigiLocker = () => {
    setApaarSynced(true);
    updateProfile({
      hasSyncedDigiLocker: true,
      ncrfCredits: 4.5
    });
  };

  const completeOnboarding = () => {
    updateProfile({
      interests: Array.from(selectedInterests),
      hasCompletedOnboarding: true
    });
    window.location.hash = "#/student/dashboard";
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 md:px-8 py-16">
      {step === 1 ? (
        <div className="w-full max-w-2xl bg-surface-container-lowest rounded-3xl shadow-sm border border-surface-variant/40 p-8 md:p-12 text-center">
          <div className="w-16 h-16 bg-primary-container text-on-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-3xl">grid_view</span>
          </div>
          <h2 className="text-3xl font-bold text-primary mb-2">
            Welcome,<br /><span className="text-on-surface-variant">{userName}.</span>
          </h2>
          <p className="text-sm text-on-surface-variant max-w-md mx-auto mb-6">
            Let's turn your academic coursework, projects, and credentials into a verified Skill Passport. We'll guide you step-by-step.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <button onClick={() => setStep(2)} className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-primary-container text-on-primary text-xs font-bold hover:bg-primary transition-all">
              Get Started
            </button>
            <button onClick={syncDigiLocker} className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-secondary-fixed/50 text-secondary text-xs font-bold border border-secondary-fixed hover:bg-secondary-fixed/70 transition-all flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[18px]">account_balance</span>
              <span>Sync with APAAR ID / DigiLocker</span>
            </button>
          </div>

          {apaarSynced && (
            <div className="mt-4 p-3 rounded-2xl bg-tertiary-fixed/20 border border-tertiary-fixed text-xs font-semibold text-primary">
              APAAR ID Connected! 4.5 NCrF Academic Credits Earned.
            </div>
          )}
        </div>
      ) : (
        <div className="w-full max-w-2xl bg-surface-container-lowest rounded-3xl shadow-sm border border-surface-variant/40 p-6 md:p-10 text-center">
          <div className="flex justify-between items-center mb-4 text-xs font-medium text-on-surface-variant">
            <button onClick={() => setStep(1)} className="flex items-center gap-1 hover:text-primary">
              <span className="material-symbols-outlined text-sm">arrow_back</span> Back
            </button>
            <span>Step 4 of 8</span>
            <a href="#/student/dashboard" className="hover:text-primary">Skip</a>
          </div>

          <h2 className="text-2xl font-bold text-primary mb-1">What are you interested in?</h2>
          <p className="text-xs text-on-surface-variant mb-6">We use this to recommend innovation challenges, internships, and teammates.</p>

          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {interestsList.map(interest => {
              const selected = selectedInterests.has(interest);
              return (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className={`px-4 py-2 rounded-full text-xs font-medium border transition-all cursor-pointer ${selected ? 'bg-primary-container text-on-primary border-primary-container shadow-sm' : 'bg-surface-container text-on-surface border-outline-variant/30 hover:bg-surface-container-high'}`}
                >
                  {interest}
                </button>
              );
            })}
          </div>

          <button
            onClick={completeOnboarding}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-primary-container text-on-primary text-xs font-bold hover:bg-primary transition-all shadow-md"
          >
            Save & Build My VeriSkill Passport
          </button>
        </div>
      )}
    </div>
  );
};

export default Onboarding;
