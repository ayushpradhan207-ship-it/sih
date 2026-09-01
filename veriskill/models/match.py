"""
Match results, sub-score breakdowns, and evidence highlights.
"""
from dataclasses import dataclass, field
from typing import Dict, Any, List, Optional
from veriskill.models.skill import RequiredSkill


@dataclass
class SkillMatchDetail:
    """
    Detailed match record for a specific required/preferred skill.
    """
    required_skill: str
    normalized_name: str
    category: str
    is_mandatory: bool
    is_matched: bool
    matched_skill: Optional[str] = None
    verification_status: str = "UNVERIFIED"
    similarity_score: float = 0.0
    evidence_strength: float = 0.0
    supporting_evidence_ids: List[str] = field(default_factory=list)
    supporting_snippets: List[str] = field(default_factory=list)

    def to_dict(self) -> Dict[str, Any]:
        return {
            "required_skill": self.required_skill,
            "normalized_name": self.normalized_name,
            "category": self.category,
            "is_mandatory": self.is_mandatory,
            "is_matched": self.is_matched,
            "matched_skill": self.matched_skill,
            "verification_status": self.verification_status,
            "similarity_score": round(self.similarity_score, 4),
            "evidence_strength": round(self.evidence_strength, 4),
            "supporting_evidence_ids": self.supporting_evidence_ids,
            "supporting_snippets": self.supporting_snippets,
        }


@dataclass
class EvidenceHighlight:
    """
    High-impact verified evidence supporting candidate capability.
    """
    skill_name: str
    evidence_type: str
    title: str
    snippet: str
    verification_status: str
    artifact_uri_or_id: str = ""

    def to_dict(self) -> Dict[str, Any]:
        return {
            "skill_name": self.skill_name,
            "evidence_type": self.evidence_type,
            "title": self.title,
            "snippet": self.snippet,
            "verification_status": self.verification_status,
            "artifact_uri_or_id": self.artifact_uri_or_id,
        }


@dataclass
class MatchResult:
    """
    Complete explainable match result.
    Every numerical score is broken down and traced to source evidence.
    """
    student_id: str
    opportunity_id: str
    overall_score: float  # 0.0 to 1.0 (or percentage)
    skill_coverage_score: float
    semantic_similarity_score: float
    evidence_strength_score: float
    experience_relevance_score: float
    project_relevance_score: float
    matched_skills: List[SkillMatchDetail] = field(default_factory=list)
    missing_skills: List[RequiredSkill] = field(default_factory=list)
    evidence_highlights: List[EvidenceHighlight] = field(default_factory=list)
    explanation: str = ""
    breakdown_math: Dict[str, Any] = field(default_factory=dict)

    @property
    def overall_percentage(self) -> int:
        return int(round(self.overall_score * 100))

    def to_dict(self) -> Dict[str, Any]:
        return {
            "student_id": self.student_id,
            "opportunity_id": self.opportunity_id,
            "overall_score": round(self.overall_score, 4),
            "overall_percentage": self.overall_percentage,
            "subscores": {
                "skill_coverage": round(self.skill_coverage_score, 4),
                "semantic_similarity": round(self.semantic_similarity_score, 4),
                "evidence_strength": round(self.evidence_strength_score, 4),
                "experience_relevance": round(self.experience_relevance_score, 4),
                "project_relevance": round(self.project_relevance_score, 4),
            },
            "matched_skills": [m.to_dict() for m in self.matched_skills],
            "missing_skills": [m.to_dict() for m in self.missing_skills],
            "evidence_highlights": [e.to_dict() for e in self.evidence_highlights],
            "explanation": self.explanation,
            "breakdown_math": self.breakdown_math,
        }
