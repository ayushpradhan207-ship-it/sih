"""
Opportunity requirement and matching weights models.
"""
from dataclasses import dataclass, field
from typing import Dict, Any, List
from veriskill.models.skill import RequiredSkill


@dataclass
class MatchWeights:
    """
    Configurable weights for matching components.
    All weights are normalized such that sum = 1.0.
    """
    skill_coverage: float = 0.40
    semantic_similarity: float = 0.20
    evidence_strength: float = 0.15
    experience_relevance: float = 0.15
    project_relevance: float = 0.10

    def __post_init__(self):
        total = (
            self.skill_coverage
            + self.semantic_similarity
            + self.evidence_strength
            + self.experience_relevance
            + self.project_relevance
        )
        if total > 0 and abs(total - 1.0) > 1e-6:
            # Normalize to 1.0
            self.skill_coverage /= total
            self.semantic_similarity /= total
            self.evidence_strength /= total
            self.experience_relevance /= total
            self.project_relevance /= total

    def to_dict(self) -> Dict[str, float]:
        return {
            "skill_coverage": round(self.skill_coverage, 4),
            "semantic_similarity": round(self.semantic_similarity, 4),
            "evidence_strength": round(self.evidence_strength, 4),
            "experience_relevance": round(self.experience_relevance, 4),
            "project_relevance": round(self.project_relevance, 4),
        }


@dataclass
class OpportunityRequirement:
    """
    Specification for a job, internship, research role, or project opportunity.
    """
    id: str
    title: str
    description: str
    required_skills: List[RequiredSkill] = field(default_factory=list)
    preferred_skills: List[RequiredSkill] = field(default_factory=list)
    min_experience_months: int = 0
    domain_tags: List[str] = field(default_factory=list)
    weights: MatchWeights = field(default_factory=MatchWeights)
    metadata: Dict[str, Any] = field(default_factory=dict)

    @property
    def all_skills(self) -> List[RequiredSkill]:
        return self.required_skills + self.preferred_skills

    def get_mandatory_skills(self) -> List[RequiredSkill]:
        return [s for s in self.required_skills if s.is_mandatory]

    def to_dict(self) -> Dict[str, Any]:
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "required_skills": [s.to_dict() for s in self.required_skills],
            "preferred_skills": [s.to_dict() for s in self.preferred_skills],
            "min_experience_months": self.min_experience_months,
            "domain_tags": self.domain_tags,
            "weights": self.weights.to_dict(),
            "metadata": self.metadata,
        }
