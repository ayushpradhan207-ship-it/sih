"""
Structured explanation formatting templates.
"""
from typing import List
from veriskill.models.match import MatchResult, SkillMatchDetail, EvidenceHighlight
from veriskill.models.skill import RequiredSkill


class ExplanationFormatter:
    """
    Formats match results into structured, human-readable representations.
    Matches the exact prompt specification:
      MATCH SCORE: XX%
      Matched: ...
      Strong evidence: ...
      Missing: ...
      Explanation: ...
    """

    @classmethod
    def format_structured_text(cls, match_result: MatchResult) -> str:
        lines = []

        # 1. Match Score Header
        lines.append(f"MATCH SCORE: {match_result.overall_percentage}%")
        lines.append("")

        # 2. Matched Skills
        lines.append("Matched:")
        matched_items = [m for m in match_result.matched_skills if m.is_matched]
        if matched_items:
            for m in matched_items:
                skill_label = m.matched_skill or m.required_skill
                lines.append(f"{skill_label}")
        else:
            lines.append("None")
        lines.append("")

        # 3. Strong Evidence Highlights
        lines.append("Strong evidence:")
        if match_result.evidence_highlights:
            for h in match_result.evidence_highlights:
                ev_type_label = h.evidence_type.replace("_", " ").title()
                lines.append(f"{h.title} ({ev_type_label})")
        else:
            lines.append("No verified evidence items recorded.")
        lines.append("")

        # 4. Missing Skills
        lines.append("Missing:")
        if match_result.missing_skills:
            for miss in match_result.missing_skills:
                lines.append(f"{miss.name}")
        else:
            lines.append("None (All required skills covered)")
        lines.append("")

        # 5. Narrative Explanation
        lines.append("Explanation:")
        lines.append("")
        lines.append(f'"{match_result.explanation}"')

        return "\n".join(lines)

    @classmethod
    def format_markdown(cls, match_result: MatchResult) -> str:
        lines = []
        lines.append(f"### Match Score: **{match_result.overall_percentage}%**")
        lines.append("")

        lines.append("#### Matched Skills")
        matched_items = [m for m in match_result.matched_skills if m.is_matched]
        if matched_items:
            for m in matched_items:
                skill_label = m.matched_skill or m.required_skill
                lines.append(f"- **{skill_label}** `[{m.category}]` (Similarity: {int(m.similarity_score*100)}%)")
        else:
            lines.append("- *No required skills matched.*")
        lines.append("")

        lines.append("#### Strong Evidence")
        if match_result.evidence_highlights:
            for h in match_result.evidence_highlights:
                ev_type = h.evidence_type.replace("_", " ").title()
                artifact_info = f" — Artifact: `{h.artifact_uri_or_id}`" if h.artifact_uri_or_id else ""
                lines.append(f"- **{h.title}** ({ev_type}){artifact_info}")
        else:
            lines.append("- *No verified evidence highlights.*")
        lines.append("")

        lines.append("#### Missing Skills")
        if match_result.missing_skills:
            for miss in match_result.missing_skills:
                req_tag = "**(Mandatory)**" if miss.is_mandatory else "(Preferred)"
                lines.append(f"- **{miss.name}** {req_tag}")
        else:
            lines.append("- *None (Full skill coverage)*")
        lines.append("")

        lines.append("#### Explanation")
        lines.append(f"> {match_result.explanation}")
        lines.append("")

        lines.append("#### Mathematical Breakdown")
        math_b = match_result.breakdown_math
        if math_b:
            sub = math_b.get("subscores", {})
            lines.append("| Component | Score | Weight | Contribution |")
            lines.append("| :--- | :---: | :---: | :---: |")
            lines.append(f"| Skill Coverage | {sub.get('skill_coverage', 0):.2f} | {math_b.get('weights', {}).get('w_coverage', 0):.2f} | {math_b.get('weighted_contributions', {}).get('skill_coverage_contrib', 0):.2f} |")
            lines.append(f"| Semantic Similarity | {sub.get('semantic_similarity', 0):.2f} | {math_b.get('weights', {}).get('w_semantic', 0):.2f} | {math_b.get('weighted_contributions', {}).get('semantic_similarity_contrib', 0):.2f} |")
            lines.append(f"| Evidence Strength | {sub.get('evidence_strength', 0):.2f} | {math_b.get('weights', {}).get('w_evidence', 0):.2f} | {math_b.get('weighted_contributions', {}).get('evidence_strength_contrib', 0):.2f} |")
            lines.append(f"| Experience Relevance | {sub.get('experience_relevance', 0):.2f} | {math_b.get('weights', {}).get('w_experience', 0):.2f} | {math_b.get('weighted_contributions', {}).get('experience_relevance_contrib', 0):.2f} |")
            lines.append(f"| Project Relevance | {sub.get('project_relevance', 0):.2f} | {math_b.get('weights', {}).get('w_project', 0):.2f} | {math_b.get('weighted_contributions', {}).get('project_relevance_contrib', 0):.2f} |")
            lines.append(f"| **Total** | | | **{math_b.get('total_unrounded', 0):.4f} ({match_result.overall_percentage}%)** |")

        return "\n".join(lines)
