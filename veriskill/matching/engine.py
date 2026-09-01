"""
Explainable Matching Engine (Pipeline 3).
"""
from typing import Optional, List, Dict, Any
from veriskill.models.student import StudentProfile
from veriskill.models.opportunity import OpportunityRequirement, MatchWeights
from veriskill.models.match import MatchResult, EvidenceHighlight, SkillMatchDetail
from veriskill.models.enums import EvidenceType
from veriskill.taxonomy.schema import TaxonomyGraph
from veriskill.taxonomy.default_taxonomy import build_default_taxonomy
from veriskill.matching.vectorizer import TextVectorizer
from veriskill.matching.coverage import SkillCoverageCalculator
from veriskill.matching.evidence_scorer import EvidenceStrengthScorer
from veriskill.matching.relevance import RelevanceScorer


class ExplainableMatchingEngine:
    """
    Pipeline 3 — Explainable Matching.

    Compare:
      verified student skills + evidence strength + opportunity requirements
    Calculate:
      skill coverage, semantic similarity, evidence strength, experience relevance, project relevance
    Return a transparent, explainable score breakdown.
    """

    def __init__(self, taxonomy: Optional[TaxonomyGraph] = None):
        self.taxonomy = taxonomy or build_default_taxonomy()
        self.coverage_calc = SkillCoverageCalculator(self.taxonomy)

    def match(
        self,
        student: StudentProfile,
        opportunity: OpportunityRequirement,
        weights: Optional[MatchWeights] = None,
    ) -> MatchResult:
        """
        Executes explainable matching between a verified StudentProfile and an OpportunityRequirement.
        """
        w = weights or opportunity.weights or MatchWeights()
        verified_skills = student.get_verified_skills()

        # 1. Skill Coverage
        coverage_score, matched_details, missing_skills = self.coverage_calc.calculate_coverage(
            verified_skills=verified_skills,
            required_skills=opportunity.required_skills,
            preferred_skills=opportunity.preferred_skills,
        )

        # 2. Semantic Similarity
        # Build composite profile text from verified skills & evidence
        profile_parts = [s.normalized_skill for s in verified_skills]
        profile_parts.extend(f"{e.title} {e.description}" for e in student.evidence_items)
        student_text = " ".join(profile_parts)

        opp_parts = [r.name for r in opportunity.all_skills]
        opp_parts.append(opportunity.title)
        opp_parts.append(opportunity.description)
        opp_parts.extend(opportunity.domain_tags)
        opp_text = " ".join(opp_parts)

        semantic_score = TextVectorizer.compute_cosine_similarity(student_text, opp_text)

        # 3. Evidence Strength
        evidence_strength_score = EvidenceStrengthScorer.calculate_evidence_strength(student)

        # 4. Experience Relevance
        experience_score = RelevanceScorer.calculate_experience_relevance(student, opportunity)

        # 5. Project Relevance
        project_score = RelevanceScorer.calculate_project_relevance(student, opportunity)

        # Composite Overall Score (Weighted Sum)
        weighted_cov = w.skill_coverage * coverage_score
        weighted_sem = w.semantic_similarity * semantic_score
        weighted_evi = w.evidence_strength * evidence_strength_score
        weighted_exp = w.experience_relevance * experience_score
        weighted_proj = w.project_relevance * project_score

        overall_score = weighted_cov + weighted_sem + weighted_evi + weighted_exp + weighted_proj
        overall_score = max(0.0, min(1.0, overall_score))

        # 6. Extract Strong Evidence Highlights
        evidence_highlights: List[EvidenceHighlight] = []
        for match_detail in matched_details:
            if match_detail.is_matched and match_detail.supporting_evidence_ids:
                for ev_id in match_detail.supporting_evidence_ids:
                    ev_item = next((e for e in student.evidence_items if e.id == ev_id), None)
                    if ev_item:
                        evidence_highlights.append(
                            EvidenceHighlight(
                                skill_name=match_detail.matched_skill or match_detail.required_skill,
                                evidence_type=ev_item.evidence_type.value if isinstance(ev_item.evidence_type, EvidenceType) else str(ev_item.evidence_type),
                                title=ev_item.title,
                                snippet=f"{ev_item.title}: {ev_item.description[:120]}",
                                verification_status="VERIFIED",
                                artifact_uri_or_id=ev_item.artifact_uri_or_id,
                            )
                        )

        # Deduplicate highlights by title
        seen_titles = set()
        deduped_highlights: List[EvidenceHighlight] = []
        for h in evidence_highlights:
            if h.title not in seen_titles:
                seen_titles.add(h.title)
                deduped_highlights.append(h)

        # 7. Construct Deterministic Mathematical Breakdown
        breakdown_math: Dict[str, Any] = {
            "formula": (
                "overall_score = (w_coverage * skill_coverage) + (w_semantic * semantic_similarity) "
                "+ (w_evidence * evidence_strength) + (w_experience * experience_relevance) "
                "+ (w_project * project_relevance)"
            ),
            "weights": {
                "w_coverage": round(w.skill_coverage, 4),
                "w_semantic": round(w.semantic_similarity, 4),
                "w_evidence": round(w.evidence_strength, 4),
                "w_experience": round(w.experience_relevance, 4),
                "w_project": round(w.project_relevance, 4),
            },
            "subscores": {
                "skill_coverage": round(coverage_score, 4),
                "semantic_similarity": round(semantic_score, 4),
                "evidence_strength": round(evidence_strength_score, 4),
                "experience_relevance": round(experience_score, 4),
                "project_relevance": round(project_score, 4),
            },
            "weighted_contributions": {
                "skill_coverage_contrib": round(weighted_cov, 4),
                "semantic_similarity_contrib": round(weighted_sem, 4),
                "evidence_strength_contrib": round(weighted_evi, 4),
                "experience_relevance_contrib": round(weighted_exp, 4),
                "project_relevance_contrib": round(weighted_proj, 4),
            },
            "total_unrounded": overall_score,
            "total_percentage": int(round(overall_score * 100)),
        }

        return MatchResult(
            student_id=student.id,
            opportunity_id=opportunity.id,
            overall_score=overall_score,
            skill_coverage_score=coverage_score,
            semantic_similarity_score=semantic_score,
            evidence_strength_score=evidence_strength_score,
            experience_relevance_score=experience_score,
            project_relevance_score=project_score,
            matched_skills=matched_details,
            missing_skills=missing_skills,
            evidence_highlights=deduped_highlights,
            explanation="",  # Populated by Pipeline 4
            breakdown_math=breakdown_math,
        )
