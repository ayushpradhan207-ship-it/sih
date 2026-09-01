"""
Explainable Matching Package (Pipeline 3).
"""
from veriskill.matching.vectorizer import TextVectorizer
from veriskill.matching.coverage import SkillCoverageCalculator
from veriskill.matching.evidence_scorer import EvidenceStrengthScorer
from veriskill.matching.relevance import RelevanceScorer
from veriskill.matching.engine import ExplainableMatchingEngine

__all__ = [
    "TextVectorizer",
    "SkillCoverageCalculator",
    "EvidenceStrengthScorer",
    "RelevanceScorer",
    "ExplainableMatchingEngine",
]
