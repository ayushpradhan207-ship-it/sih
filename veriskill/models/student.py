"""
Student Profile model and Protected Demographic Attributes (Isolated).
"""
from dataclasses import dataclass, field
from typing import Dict, Any, List, Optional
from veriskill.models.evidence import Evidence
from veriskill.models.skill import VerifiedSkill, SkillCandidate
from veriskill.models.enums import VerificationStatus


@dataclass
class StudentProfile:
    """
    Candidate student profile containing evidence items and skill records.
    NOTE: Protected demographic attributes must NOT be stored in this profile for matching.
    """
    id: str
    name: str
    email: str = ""
    evidence_items: List[Evidence] = field(default_factory=list)
    skills: List[VerifiedSkill] = field(default_factory=list)
    extracted_candidates: List[SkillCandidate] = field(default_factory=list)
    metadata: Dict[str, Any] = field(default_factory=dict)

    def get_verified_skills(self) -> List[VerifiedSkill]:
        """Returns only skills that are strictly in VERIFIED status."""
        return [s for s in self.skills if s.status == VerificationStatus.VERIFIED]

    def get_skill_by_normalized_name(self, norm_name: str) -> Optional[VerifiedSkill]:
        for s in self.skills:
            if s.normalized_skill.lower() == norm_name.lower():
                return s
        return None

    def add_evidence(self, evidence: Evidence) -> None:
        self.evidence_items.append(evidence)

    def add_skill(self, skill: VerifiedSkill) -> None:
        # Check if already present; update if new status has higher precedence
        existing = self.get_skill_by_normalized_name(skill.normalized_skill)
        if existing:
            # Upgrade evidence refs
            existing.evidence_refs.extend(skill.evidence_refs)
            if skill.status == VerificationStatus.VERIFIED:
                existing.status = VerificationStatus.VERIFIED
                existing.verification_record = skill.verification_record
            existing.confidence = max(existing.confidence, skill.confidence)
            existing.proficiency_level = max(existing.proficiency_level, skill.proficiency_level)
        else:
            self.skills.append(skill)

    def to_dict(self) -> Dict[str, Any]:
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "evidence_count": len(self.evidence_items),
            "evidence_items": [e.to_dict() for e in self.evidence_items],
            "skills": [s.to_dict() for s in self.skills],
            "verified_skills_count": len(self.get_verified_skills()),
            "metadata": self.metadata,
        }


@dataclass
class ProtectedAttributes:
    """
    Isolated container for protected demographic attributes.
    Used ONLY in Pipeline 6 (Fairness & Bias Audit).
    Must never be attached to StudentProfile or passed into Matching / Ranking / Team Solver.
    """
    student_id: str
    gender: Optional[str] = None
    race_ethnicity: Optional[str] = None
    age_group: Optional[str] = None
    disability_status: Optional[str] = None
    veteran_status: Optional[str] = None
    socioeconomic_status: Optional[str] = None
    additional_attributes: Dict[str, Any] = field(default_factory=dict)

    def get_attribute(self, attr_name: str) -> Optional[str]:
        if hasattr(self, attr_name):
            val = getattr(self, attr_name)
            if val is not None:
                return str(val)
        return self.additional_attributes.get(attr_name)

    def to_dict(self) -> Dict[str, Any]:
        return {
            "student_id": self.student_id,
            "gender": self.gender,
            "race_ethnicity": self.race_ethnicity,
            "age_group": self.age_group,
            "disability_status": self.disability_status,
            "veteran_status": self.veteran_status,
            "socioeconomic_status": self.socioeconomic_status,
            "additional_attributes": self.additional_attributes,
        }
