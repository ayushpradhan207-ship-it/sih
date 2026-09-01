"""
Evidence Strength Scorer.
Evaluates the depth, recency, multi-source triangulation, and artifact validity of student evidence.
"""
from typing import List
from veriskill.models.student import StudentProfile
from veriskill.models.enums import EvidenceType, VerificationStatus


class EvidenceStrengthScorer:
    """
    Quantifies the strength and depth of verified evidence supporting a candidate.
    """

    @classmethod
    def calculate_evidence_strength(cls, student: StudentProfile) -> float:
        verified_skills = student.get_verified_skills()
        if not verified_skills:
            return 0.0

        scores: List[float] = []

        for skill in verified_skills:
            # Base proficiency
            base = skill.proficiency_level

            # Multi-source corroboration bonus
            evidence_count = len(skill.evidence_refs)
            triangulation_bonus = 0.10 * min(evidence_count - 1, 3) if evidence_count > 1 else 0.0

            # Artifact strength bonus
            artifact_bonus = 0.0
            if skill.verification_record and skill.verification_record.artifact_checked:
                artifact_bonus = 0.10

            skill_strength = min(1.0, base + triangulation_bonus + artifact_bonus)
            scores.append(skill_strength)

        # Average strength of verified skills
        avg_strength = sum(scores) / len(scores) if scores else 0.0

        # Evidence breadth bonus (having >= 3 distinct verified evidence items)
        distinct_evidence = len({e.id for e in student.evidence_items if e.is_externally_validated or e.artifact_uri_or_id})
        breadth_factor = min(1.0, distinct_evidence / 4.0)

        composite = 0.7 * avg_strength + 0.3 * breadth_factor
        return min(1.0, max(0.0, composite))
