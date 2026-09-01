"""
Experience and Project Relevance Scorers.
"""
from typing import List
from veriskill.models.student import StudentProfile
from veriskill.models.opportunity import OpportunityRequirement
from veriskill.models.enums import EvidenceType
from veriskill.matching.vectorizer import TextVectorizer


class RelevanceScorer:
    """
    Computes domain-specific relevance of experience and project items.
    """

    @classmethod
    def calculate_experience_relevance(
        cls, student: StudentProfile, opportunity: OpportunityRequirement
    ) -> float:
        """
        Computes relevance of student's verified professional experience and coursework
        to the target opportunity description and domain tags.
        """
        exp_items = [
            e for e in student.evidence_items
            if e.evidence_type in (EvidenceType.EXPERIENCE, EvidenceType.COURSEWORK)
        ]
        if not exp_items:
            return 0.2  # baseline default for students without formal prior employment

        combined_exp_text = " ".join(f"{e.title} {e.description} {e.issuer_or_institution}" for e in exp_items)
        opportunity_target_text = f"{opportunity.title} {opportunity.description} {' '.join(opportunity.domain_tags)}"

        # Semantic similarity between student experience and opportunity
        sim = TextVectorizer.compute_cosine_similarity(combined_exp_text, opportunity_target_text)

        # Keyword match bonus with domain tags
        tag_hits = 0
        for tag in opportunity.domain_tags:
            if tag.lower() in combined_exp_text.lower():
                tag_hits += 1
        tag_bonus = (tag_hits / len(opportunity.domain_tags)) * 0.3 if opportunity.domain_tags else 0.1

        score = 0.7 * sim + 0.3 * tag_bonus
        return min(1.0, max(0.1, score))

    @classmethod
    def calculate_project_relevance(
        cls, student: StudentProfile, opportunity: OpportunityRequirement
    ) -> float:
        """
        Computes relevance of student's hands-on project artifacts and competition work
        to the opportunity's required technical domain.
        """
        proj_items = [
            e for e in student.evidence_items
            if e.evidence_type in (EvidenceType.PROJECT, EvidenceType.COMPETITION)
        ]
        if not proj_items:
            return 0.1  # baseline

        combined_proj_text = " ".join(f"{e.title} {e.description}" for e in proj_items)
        req_skills_text = " ".join(r.name for r in opportunity.all_skills)
        opportunity_target_text = f"{opportunity.title} {opportunity.description} {req_skills_text}"

        sim = TextVectorizer.compute_cosine_similarity(combined_proj_text, opportunity_target_text)

        # Check for verified repository or competition evidence
        repo_boost = 0.1 if any(e.artifact_uri_or_id for e in proj_items) else 0.0

        score = sim * 0.85 + repo_boost + 0.05
        return min(1.0, max(0.1, score))
