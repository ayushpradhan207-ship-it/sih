import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

export const SkillPassport = () => {
  const { t } = useLanguage();
  const { currentUser, isDemoMode } = useAuth();

  const userName = currentUser?.name || (isDemoMode ? 'Aarav Sharma' : 'Ashutosh Pradhan');
  const userInitials = (userName || 'User').split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  const overallScore = isDemoMode ? 84 : (currentUser?.overallScore || 0);

  const skills = [
    { name: 'Python', category: 'Programming', score: 92, verified: true },
    { name: 'Machine Learning', category: 'Machine Learning', score: 88, verified: true },
    { name: 'SQL', category: 'Programming', score: 85, verified: true },
    { name: 'TypeScript', category: 'Programming', score: 80, verified: true },
    { name: 'System Design', category: 'Professional', score: 78, verified: true }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pt-24 pb-16 min-h-screen flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-primary-container text-on-primary flex items-center justify-center font-bold text-xl shadow-md">
            {currentUser?.avatar ? (
              <img src={currentUser.avatar} alt={userName} className="w-full h-full object-cover rounded-2xl" />
            ) : (
              userInitials
            )}
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-primary">{userName}</h1>
            <p className="text-xs text-secondary font-semibold">W3C Verifiable Credential Skill Passport • SOA University</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-full bg-secondary-fixed/50 text-secondary font-bold text-xs">
            {overallScore}% Passport Completion
          </span>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill, idx) => (
          <div key={idx} className="bg-surface-container-lowest rounded-3xl p-6 border border-surface-variant/40 shadow-sm flex flex-col justify-between gap-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold text-secondary">{skill.category}</span>
                <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed/30 text-on-tertiary-fixed-variant font-bold text-[10px]">
                  VERIFIED
                </span>
              </div>
              <h3 className="text-lg font-bold text-primary">{skill.name}</h3>
              
              <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden mt-3">
                <div className="h-full bg-gradient-to-r from-secondary to-tertiary-fixed-dim rounded-full" style={{ width: `${skill.score}%` }}></div>
              </div>
            </div>

            <div className="pt-3 border-t border-surface-variant/40 flex justify-between text-xs text-on-surface-variant font-semibold">
              <span>Proficiency Score</span>
              <span className="text-primary font-bold">{skill.score}/100</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillPassport;
