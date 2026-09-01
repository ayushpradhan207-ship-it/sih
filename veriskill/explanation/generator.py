"""
Structured Explanation Generator (Pipeline 4).
"""
from typing import Optional, List
from veriskill.models.match import MatchResult, SkillMatchDetail, EvidenceHighlight
from veriskill.explanation.template import ExplanationFormatter
from veriskill.explanation.provenance import ProvenanceBuilder


class StructuredExplanationGenerator:
    """
    Pipeline 4 — Structured Explanation Generator.

    Generates structured, human-readable explanations linking matched/missing skills
    and verified evidence items directly into a coherent narrative.
    """

    @classmethod
    def generate_narrative(cls, match_result: MatchResult) -> str:
        matched = [m for m in match_result.matched_skills if m.is_matched]
        missing = match_result.missing_skills
        highlights = match_result.evidence_highlights

        # Coverage summary
        total_reqs = len(match_result.matched_skills)
        matched_count = len(matched)

        if total_reqs == 0:
            return "No specific requirements were designated for this opportunity."

        # Narrative building blocks
        if matched_count == total_reqs:
            coverage_clause = "The candidate satisfies all required and preferred technical skills"
        elif matched_count >= total_reqs * 0.75:
            coverage_clause = "The candidate matches most required technical skills"
        elif matched_count >= total_reqs * 0.50:
            coverage_clause = "The candidate demonstrates moderate skill alignment"
        else:
            coverage_clause = "The candidate shows partial skill alignment"

        # Evidence clause
        ev_types = set()
        for h in highlights:
            if "project" in h.evidence_type.lower():
                ev_types.add("project evidence")
            elif "coursework" in h.evidence_type.lower():
                ev_types.add("coursework")
            elif "credential" in h.evidence_type.lower():
                ev_types.add("certifications")
            elif "experience" in h.evidence_type.lower():
                ev_types.add("work experience")

        if ev_types:
            evidence_clause = f"and has verified {', '.join(sorted(ev_types))} demonstrating practical competence"
        else:
            evidence_clause = "with preliminary verified background"

        # Missing clause
        if missing:
            mandatory_miss = [m.name for m in missing if m.is_mandatory]
            preferred_miss = [m.name for m in missing if not m.is_mandatory]
            if mandatory_miss:
                missing_clause = f", but is currently missing required verified evidence for {', '.join(mandatory_miss)}."
            elif preferred_miss:
                missing_clause = f", though preferred skills such as {', '.join(preferred_miss)} remain unverified."
            else:
                missing_clause = "."
        else:
            missing_clause = " with no missing prerequisite skills."

        narrative = f"{coverage_clause} {evidence_clause}{missing_clause}"
        return narrative

    @classmethod
    def explain(cls, match_result: MatchResult) -> str:
        """
        Populates narrative explanation into match_result and returns structured text.
        """
        match_result.explanation = cls.generate_narrative(match_result)
        return ExplanationFormatter.format_structured_text(match_result)

    @classmethod
    def explain_markdown(cls, match_result: MatchResult) -> str:
        if not match_result.explanation:
            match_result.explanation = cls.generate_narrative(match_result)
        return ExplanationFormatter.format_markdown(match_result)
