"""
VeriSkill AI/ML Engine Package.
"""
from veriskill.engine import VeriSkillEngine
from veriskill.models import (
    EvidenceType,
    VerificationStatus,
    SkillCategory,
    ExtractionMethod,
    EvidenceArtifactType,
    Evidence,
    EvidenceRef,
    VerificationRecord,
    SkillCandidate,
    VerifiedSkill,
    RequiredSkill,
    StudentProfile,
    ProtectedAttributes,
    MatchWeights,
    OpportunityRequirement,
    SkillMatchDetail,
    EvidenceHighlight,
    MatchResult,
    MemberContribution,
    TeamResult,
    GroupStats,
    AuditMetric,
    FairnessAuditReport,
)

__version__ = "0.1.0"

__all__ = [
    "VeriSkillEngine",
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
