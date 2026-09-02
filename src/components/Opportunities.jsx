import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const Opportunities = () => {
  const { t } = useLanguage();

  const opps = [
    {
      id: 'opp-ml-intern',
      title: 'Machine Learning Research Intern',
      company: 'DeepMind / EdTech Labs',
      location: 'Bengaluru, India (Hybrid)',
      matchScore: 92,
      stipend: '₹45,000 / month',
      skills: ['Python', 'PyTorch', 'Machine Learning']
    },
    {
      id: 'opp-fullstack-dev',
      title: 'Full-Stack React Engineer',
      company: 'VeriSkill Open Consortium',
      location: 'Remote',
      matchScore: 88,
      stipend: '₹50,000 / month',
      skills: ['React', 'JavaScript', 'Node.js']
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pt-24 pb-16 min-h-screen flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed/50 text-secondary text-xs font-bold uppercase tracking-wider mb-2">
            <span className="material-symbols-outlined text-[15px]">work</span>
            <span>Explainable AI Opportunity Matcher</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary">{t('navbar.match')}</h1>
          <p className="text-sm text-on-surface-variant mt-1">
            Matched against verified skills and NCrF academic credit weights.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {opps.map(opp => (
          <div key={opp.id} className="bg-surface-container-lowest rounded-3xl p-6 border border-surface-variant/40 shadow-sm flex flex-col justify-between gap-4">
            <div>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-bold text-primary">{opp.title}</h3>
                  <p className="text-xs text-secondary font-semibold">{opp.company} • {opp.location}</p>
                </div>
                <span className="px-3 py-1.5 rounded-full bg-tertiary-fixed/30 text-on-tertiary-fixed-variant font-bold text-xs">
                  {opp.matchScore}% Match
                </span>
              </div>
              <p className="text-xs text-on-surface-variant font-semibold mt-2">{opp.stipend}</p>

              <div className="flex flex-wrap gap-1.5 mt-4">
                {opp.skills.map((skill, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-surface-container text-primary font-medium text-xs border border-outline-variant/30">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-surface-variant/40 flex items-center justify-between">
              <span className="text-xs text-on-surface-variant">5-Factor Trace Available</span>
              <button type="button" className="px-4 py-2 rounded-full bg-primary-container text-on-primary font-bold text-xs hover:bg-primary transition-all cursor-pointer">
                Apply with Passport
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Opportunities;
