import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

export const Teams = () => {
  const { t } = useLanguage();
  const { isDemoMode } = useAuth();
  const [selectedTrack, setSelectedTrack] = useState('SIH AI Track');

  const teamMembers = [
    { name: 'Aarav Sharma', role: 'AI/ML Lead', skills: ['Python', 'PyTorch', 'FastAPI'], coverage: '38%' },
    { name: 'Priya Patel', role: 'Full-Stack UI Engineer', skills: ['React', 'TypeScript', 'Tailwind'], coverage: '32%' },
    { name: 'Rohan Verma', role: 'Systems & Cryptography', skills: ['W3C VCs', 'SHA-256', 'Node.js'], coverage: '24%' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pt-24 pb-16 min-h-screen flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed/50 text-secondary text-xs font-bold uppercase tracking-wider mb-2">
            <span className="material-symbols-outlined text-[15px]">groups</span>
            <span>Multidisciplinary Team Complementarity Optimizer</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary">{t('navbar.teams')}</h1>
          <p className="text-sm text-on-surface-variant mt-1">
            Form complementary hackathon teams with guaranteed cross-functional skill coverage.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-full bg-tertiary-fixed/30 text-on-tertiary-fixed-variant border border-tertiary-fixed font-bold text-xs">
            94% Overall Skill Coverage
          </span>
        </div>
      </div>

      {/* Team Composition Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {teamMembers.map((member, idx) => (
          <div key={idx} className="bg-surface-container-lowest rounded-3xl p-6 border border-surface-variant/40 shadow-sm flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-primary-container text-on-primary flex items-center justify-center font-bold text-base">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <span className="px-2.5 py-1 rounded-full bg-secondary-fixed/40 text-secondary font-bold text-xs">
                  {member.coverage} Contribution
                </span>
              </div>
              <h3 className="text-lg font-bold text-primary">{member.name}</h3>
              <p className="text-xs font-semibold text-secondary mt-0.5">{member.role}</p>

              <div className="flex flex-wrap gap-1.5 mt-4">
                {member.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="px-2.5 py-1 rounded-lg bg-surface-container text-primary font-medium text-xs border border-outline-variant/30">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-surface-variant/40 flex items-center justify-between text-xs text-on-surface-variant">
              <span>Verified Credentials</span>
              <span className="material-symbols-outlined text-tertiary-fixed-dim text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teams;
