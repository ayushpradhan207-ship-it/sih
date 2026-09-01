"""
Verification Audit Trail Inspector and Logger.
"""
from typing import List, Dict, Any
from veriskill.models.student import StudentProfile
from veriskill.models.skill import VerifiedSkill
from veriskill.models.enums import VerificationStatus


class VerificationAuditTrail:
    """
    Provides query and export utilities for verification history and provenance.
    """

    @classmethod
    def get_skill_audit_history(cls, skill: VerifiedSkill) -> List[Dict[str, Any]]:
        if not skill.verification_record:
            return []
        return skill.verification_record.history

    @classmethod
    def generate_student_verification_summary(cls, student: StudentProfile) -> Dict[str, Any]:
        verified = student.get_verified_skills()
        pending = [s for s in student.skills if s.status == VerificationStatus.PENDING_VERIFICATION]
        rejected = [s for s in student.skills if s.status == VerificationStatus.REJECTED]
        extracted = [s for s in student.skills if s.status == VerificationStatus.EXTRACTED]

        return {
            "student_id": student.id,
            "student_name": student.name,
            "counts": {
                "total_skills": len(student.skills),
                "verified": len(verified),
                "pending": len(pending),
                "rejected": len(rejected),
                "extracted": len(extracted),
            },
            "verified_skills": [
                {
                    "skill": s.normalized_skill,
                    "category": s.category,
                    "proficiency": s.proficiency_level,
                    "rule": s.verification_record.rule_name if s.verification_record else None,
                    "artifact": s.verification_record.artifact_checked if s.verification_record else None,
                    "evidence_count": len(s.evidence_refs),
                }
                for s in verified
            ],
            "rejected_or_unverified": [
                {
                    "skill": s.normalized_skill,
                    "status": s.status.value,
                    "reason": s.verification_record.reason if s.verification_record else "No record",
                }
                for s in (rejected + pending + extracted)
            ],
        }
