"""
Skill Coverage Calculator.
Compares verified student skills against opportunity required and preferred skills.
"""
from typing import List, Tuple, Dict
from veriskill.models.skill import RequiredSkill, VerifiedSkill
from veriskill.models.match import SkillMatchDetail
from veriskill.taxonomy.schema import TaxonomyGraph


class SkillCoverageCalculator:
    """
    Computes weighted coverage of required and preferred skills.
    Guarantees: Only skills in VERIFIED status are credited.
    """

    def __init__(self, taxonomy: TaxonomyGraph):
        self.taxonomy = taxonomy

    def calculate_coverage(
        self,
        verified_skills: List[VerifiedSkill],
        required_skills: List[RequiredSkill],
        preferred_skills: List[RequiredSkill],
    ) -> Tuple[float, List[SkillMatchDetail], List[RequiredSkill]]:
        """
        Returns:
            (coverage_score [0.0, 1.0], matched_details, missing_skills)
        """
        all_reqs = required_skills + preferred_skills
        if not all_reqs:
            return 1.0, [], []

        # Index verified skills by normalized name
        verified_map: Dict[str, VerifiedSkill] = {
            s.normalized_skill.lower(): s for s in verified_skills if s.is_verified
        }

        total_weight = 0.0
        earned_weight = 0.0
        matched_details: List[SkillMatchDetail] = []
        missing_skills: List[RequiredSkill] = []

        for req in all_reqs:
            req_norm = (self.taxonomy.normalize_skill_name(req.name) or req.name).lower()
            weight = req.importance_weight * (1.5 if req.is_mandatory else 1.0)
            total_weight += weight

            # Check direct match
            matched_skill = verified_map.get(req_norm)

            # Check taxonomy alias / related match if direct match not found
            if not matched_skill:
                for v_norm, v_skill in verified_map.items():
                    if self.taxonomy.are_related(req_norm, v_norm):
                        matched_skill = v_skill
                        break

            if matched_skill:
                # Proficiency factor
                prof_ratio = min(1.0, matched_skill.proficiency_level / max(0.1, req.min_proficiency))
                similarity = 1.0 if matched_skill.normalized_skill.lower() == req_norm else 0.85
                skill_score = similarity * prof_ratio
                earned_weight += weight * skill_score

                ev_ids = [ref.evidence_id for ref in matched_skill.evidence_refs]
                ev_snippets = [ref.snippet for ref in matched_skill.evidence_refs]

                matched_details.append(
                    SkillMatchDetail(
                        required_skill=req.name,
                        normalized_name=req.normalized_name or req.name,
                        category=req.category,
                        is_mandatory=req.is_mandatory,
                        is_matched=True,
                        matched_skill=matched_skill.normalized_skill,
                        verification_status=matched_skill.status.value,
                        similarity_score=similarity,
                        evidence_strength=matched_skill.proficiency_level,
                        supporting_evidence_ids=ev_ids,
                        supporting_snippets=ev_snippets,
                    )
                )
            else:
                missing_skills.append(req)
                matched_details.append(
                    SkillMatchDetail(
                        required_skill=req.name,
                        normalized_name=req.normalized_name or req.name,
                        category=req.category,
                        is_mandatory=req.is_mandatory,
                        is_matched=False,
                        matched_skill=None,
                        verification_status="UNVERIFIED_OR_MISSING",
                        similarity_score=0.0,
                        evidence_strength=0.0,
                        supporting_evidence_ids=[],
                        supporting_snippets=[],
                    )
                )

        coverage_score = (earned_weight / total_weight) if total_weight > 0 else 0.0

        # Mandatory skill penalty: if missing mandatory skills, apply soft dampening
        mandatory_missing = sum(1 for m in missing_skills if m.is_mandatory)
        total_mandatory = sum(1 for r in required_skills if r.is_mandatory)
        if total_mandatory > 0 and mandatory_missing > 0:
            mandatory_pass_rate = (total_mandatory - mandatory_missing) / total_mandatory
            coverage_score *= (0.7 + 0.3 * mandatory_pass_rate)

        return min(1.0, max(0.0, coverage_score)), matched_details, missing_skills
