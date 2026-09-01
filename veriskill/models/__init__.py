"""
VeriSkill Models Package.
"""
from veriskill.models.enums import (
    EvidenceType,
    VerificationStatus,
    SkillCategory,
    ExtractionMethod,
    EvidenceArtifactType,
)
from veriskill.models.evidence import (
    Evidence,
    EvidenceRef,
    VerificationRecord,
)
from veriskill.models.skill import (
    SkillCandidate,
    VerifiedSkill,
    RequiredSkill,
)
from veriskill.models.student import (
    StudentProfile,
    ProtectedAttributes,
)
from veriskill.models.opportunity import (
    MatchWeights,
    OpportunityRequirement,
)
from veriskill.models.match import (
    SkillMatchDetail,
    EvidenceHighlight,
    MatchResult,
)
from veriskill.models.team import (
    MemberContribution,
    TeamResult,
)
from veriskill.models.fairness import (
    GroupStats,
    AuditMetric,
    FairnessAuditReport,
)

__all__ = [
    "EvidenceType",
    "VerificationStatus",
    "SkillCategory",
    "ExtractionMethod",
    "EvidenceArtifactType",
    "Evidence",
    "EvidenceRef",
    "VerificationRecord",
    "SkillCandidate",
    "VerifiedSkill",
    "RequiredSkill",
    "StudentProfile",
    "ProtectedAttributes",
    "MatchWeights",
    "OpportunityRequirement",
    "SkillMatchDetail",
    "EvidenceHighlight",
    "MatchResult",
    "MemberContribution",
    "TeamResult",
    "GroupStats",
    "AuditMetric",
    "FairnessAuditReport",
]
