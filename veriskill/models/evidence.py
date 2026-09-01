"""
Evidence and Verification data structures.
"""
from dataclasses import dataclass, field
from typing import Dict, Any, List, Optional
from veriskill.models.enums import EvidenceType, EvidenceArtifactType, VerificationStatus


@dataclass
class Evidence:
    """
    Represents an evidence source submitted by or collected for a student.
    Can be coursework, a project, a credential, competition record, or work experience.
    """
    id: str
    evidence_type: EvidenceType
    title: str
    description: str
    issuer_or_institution: str = ""
    date: str = ""
    artifact_type: Optional[EvidenceArtifactType] = None
    artifact_uri_or_id: str = ""  # URL, cert hash, course code, repo URL
    grade_or_score: Optional[str] = None  # e.g., "A", "95%", "1st Place"
    verified_by: Optional[str] = None  # e.g., "registrar_sync", "github_checker", "cert_authority"
    is_externally_validated: bool = False
    metadata: Dict[str, Any] = field(default_factory=dict)

    def to_dict(self) -> Dict[str, Any]:
        return {
            "id": self.id,
            "evidence_type": self.evidence_type.value if isinstance(self.evidence_type, EvidenceType) else str(self.evidence_type),
            "title": self.title,
            "description": self.description,
            "issuer_or_institution": self.issuer_or_institution,
            "date": self.date,
            "artifact_type": self.artifact_type.value if self.artifact_type else None,
            "artifact_uri_or_id": self.artifact_uri_or_id,
            "grade_or_score": self.grade_or_score,
            "verified_by": self.verified_by,
            "is_externally_validated": self.is_externally_validated,
            "metadata": self.metadata,
        }


@dataclass
class EvidenceRef:
    """
    Reference from a skill candidate or verified skill back to its source evidence.
    """
    evidence_id: str
    snippet: str
    evidence_type: EvidenceType
    strength_weight: float = 1.0

    def to_dict(self) -> Dict[str, Any]:
        return {
            "evidence_id": self.evidence_id,
            "snippet": self.snippet,
            "evidence_type": self.evidence_type.value if isinstance(self.evidence_type, EvidenceType) else str(self.evidence_type),
            "strength_weight": self.strength_weight,
        }


@dataclass
class VerificationRecord:
    """
    Audit log record detailing verification decisions and transitions.
    """
    status: VerificationStatus
    timestamp: str
    rule_name: str
    verifier_id: str
    reason: str
    artifact_checked: str = ""
    history: List[Dict[str, Any]] = field(default_factory=list)

    def to_dict(self) -> Dict[str, Any]:
        return {
            "status": self.status.value if isinstance(self.status, VerificationStatus) else str(self.status),
            "timestamp": self.timestamp,
            "rule_name": self.rule_name,
            "verifier_id": self.verifier_id,
            "reason": self.reason,
            "artifact_checked": self.artifact_checked,
            "history": self.history,
        }
