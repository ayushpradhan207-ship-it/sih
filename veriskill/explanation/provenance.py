"""
Evidence Provenance and Lineage Graph.
"""
from typing import Dict, List, Any
from veriskill.models.student import StudentProfile
from veriskill.models.match import MatchResult


class ProvenanceBuilder:
    """
    Builds direct traceability graphs connecting matched requirements back to
    verified evidence artifacts, issuers, dates, and rule checks.
    """

    @classmethod
    def build_lineage_graph(cls, student: StudentProfile, match_result: MatchResult) -> Dict[str, Any]:
        evidence_dict = {e.id: e for e in student.evidence_items}
        lineage: Dict[str, Any] = {
            "student_id": student.id,
            "opportunity_id": match_result.opportunity_id,
            "skills_provenance": [],
        }

        for match_detail in match_result.matched_skills:
            skill_provenance = {
                "required_skill": match_detail.required_skill,
                "is_matched": match_detail.is_matched,
                "matched_canonical": match_detail.matched_skill,
                "verification_status": match_detail.verification_status,
                "evidence_sources": [],
            }

            for ev_id in match_detail.supporting_evidence_ids:
                if ev_id in evidence_dict:
                    ev = evidence_dict[ev_id]
                    skill_provenance["evidence_sources"].append({
                        "evidence_id": ev.id,
                        "title": ev.title,
                        "type": ev.evidence_type.value if hasattr(ev.evidence_type, "value") else str(ev.evidence_type),
                        "issuer_or_institution": ev.issuer_or_institution,
                        "grade_or_score": ev.grade_or_score,
                        "artifact_uri_or_id": ev.artifact_uri_or_id,
                    })

            lineage["skills_provenance"].append(skill_provenance)

        return lineage
