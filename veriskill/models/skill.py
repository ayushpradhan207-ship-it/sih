"""
Skill candidate, verified skill, and required skill models.
"""
from dataclasses import dataclass, field
from typing import Dict, Any, List, Optional
from veriskill.models.enums import VerificationStatus, SkillCategory, ExtractionMethod, EvidenceType
from veriskill.models.evidence import EvidenceRef, VerificationRecord


@dataclass
class SkillCandidate:
    """
    Extracted skill candidate directly produced by Pipeline 1.
    Output fields:
    skill, normalized_skill, category, confidence, source_evidence, extraction_method
    """
    skill: str
    normalized_skill: str
    category: str
    confidence: float
    source_evidence: str  # text snippet / evidence ID
    extraction_method: str  # ExtractionMethod name
    source_evidence_id: str = ""
    evidence_type: Optional[EvidenceType] = None
    frequency: int = 1

    def to_dict(self) -> Dict[str, Any]:
        return {
            "skill": self.skill,
            "normalized_skill": self.normalized_skill,
            "category": self.category,
            "confidence": round(self.confidence, 4),
            "source_evidence": self.source_evidence,
            "extraction_method": self.extraction_method,
            "source_evidence_id": self.source_evidence_id,
            "evidence_type": self.evidence_type.value if self.evidence_type else None,
            "frequency": self.frequency,
        }


@dataclass
class VerifiedSkill:
    """
    Skill with explicit verification state tracking (Pipeline 2).
    States: EXTRACTED, PENDING_VERIFICATION, VERIFIED, REJECTED
    """
    skill_name: str
    normalized_skill: str
    category: str
    status: VerificationStatus = VerificationStatus.EXTRACTED
    confidence: float = 0.5
    proficiency_level: float = 0.5  # 0.0 to 1.0 (e.g. beginner=0.3, intermediate=0.6, advanced=0.9)
    evidence_refs: List[EvidenceRef] = field(default_factory=list)
    verification_record: Optional[VerificationRecord] = None
    last_updated: str = ""

    @property
    def is_verified(self) -> bool:
        return self.status == VerificationStatus.VERIFIED

    def to_dict(self) -> Dict[str, Any]:
        return {
            "skill_name": self.skill_name,
            "normalized_skill": self.normalized_skill,
            "category": self.category,
            "status": self.status.value if isinstance(self.status, VerificationStatus) else str(self.status),
            "confidence": round(self.confidence, 4),
            "proficiency_level": round(self.proficiency_level, 4),
            "evidence_refs": [ref.to_dict() for ref in self.evidence_refs],
            "verification_record": self.verification_record.to_dict() if self.verification_record else None,
            "last_updated": self.last_updated,
        }


@dataclass
class RequiredSkill:
    """
    Represents a skill requirement specified in an opportunity.
    """
    name: str
    normalized_name: str
    category: str = "Technical"
    min_proficiency: float = 0.5
    importance_weight: float = 1.0
    is_mandatory: bool = True

    def to_dict(self) -> Dict[str, Any]:
        return {
            "name": self.name,
            "normalized_name": self.normalized_name,
            "category": self.category,
            "min_proficiency": self.min_proficiency,
            "importance_weight": self.importance_weight,
            "is_mandatory": self.is_mandatory,
        }
