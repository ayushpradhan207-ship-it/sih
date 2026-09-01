"""
Team Solver Engine (Pipeline 5).
"""
from typing import List, Optional, Dict, Set
from veriskill.models.student import StudentProfile
from veriskill.models.skill import RequiredSkill
from veriskill.models.team import TeamResult, MemberContribution
from veriskill.taxonomy.schema import TaxonomyGraph
from veriskill.taxonomy.default_taxonomy import build_default_taxonomy
from veriskill.team_solver.objective import TeamObjectiveEvaluator
from veriskill.team_solver.solver import TeamSolver


class TeamSolverEngine:
    """
    Pipeline 5 — Team Solver.

    Given:
      students + required skills + team size
    Generate:
      the best team based on skill coverage and complementarity.
    Return:
      team members, skill coverage, uncovered skills, reason for selection.
    """

    def __init__(self, taxonomy: Optional[TaxonomyGraph] = None):
        self.taxonomy = taxonomy or build_default_taxonomy()
        self.evaluator = TeamObjectiveEvaluator(self.taxonomy)
        self.solver = TeamSolver(self.evaluator)

    def solve_team(
        self,
        students: List[StudentProfile],
        required_skills: List[RequiredSkill],
        team_size: int,
    ) -> TeamResult:
        """
        Solves for the optimal team maximizing skill coverage and complementarity.
        """
        best_members, fitness, coverage_rate, comp_score, member_map = self.solver.solve(
            student_pool=students,
            required_skills=required_skills,
            team_size=team_size,
        )

        all_covered_skills: Set[str] = set()
        member_contributions: List[MemberContribution] = []

        for member in best_members:
            covered = sorted(list(member_map.get(member.id, set())))
            all_covered_skills.update(c.lower() for c in covered)

            # High-impact evidence highlights
            ev_highlights = [
                f"{e.title} ({e.evidence_type.value if hasattr(e.evidence_type, 'value') else str(e.evidence_type)})"
                for e in member.evidence_items[:2]
            ]

            member_contributions.append(
                MemberContribution(
                    student_id=member.id,
                    student_name=member.name,
                    covered_skills=covered,
                    key_evidence_highlights=ev_highlights,
                )
            )

        # Determine covered and uncovered skills
        covered_names = []
        uncovered_names = []

        for req in required_skills:
            req_norm = (self.taxonomy.normalize_skill_name(req.name) or req.name).lower()
            if req_norm in all_covered_skills or any(self.taxonomy.are_related(req_norm, c) for c in all_covered_skills):
                covered_names.append(req.name)
            else:
                uncovered_names.append(req.name)

        # Generate Selection Rationale
        rationale_parts = []
        cov_pct = int(round(coverage_rate * 100))
        rationale_parts.append(
            f"Selected optimal {len(best_members)}-member team achieving {cov_pct}% overall requirement coverage."
        )

        # Detail individual contributions
        contrib_summaries = []
        for contrib in member_contributions:
            if contrib.covered_skills:
                skills_str = ", ".join(contrib.covered_skills)
                contrib_summaries.append(f"{contrib.student_name} brings verified expertise in {skills_str}")
            else:
                contrib_summaries.append(f"{contrib.student_name} provides supplementary support")

        if contrib_summaries:
            rationale_parts.append("; ".join(contrib_summaries) + ".")

        if uncovered_names:
            rationale_parts.append(f"Note: Uncovered skill gaps remaining: {', '.join(uncovered_names)}.")
        else:
            rationale_parts.append("All requested skills are completely covered with verified evidence.")

        selection_rationale = " ".join(rationale_parts)

        return TeamResult(
            team_members=best_members,
            skill_coverage=coverage_rate,
            covered_skills=covered_names,
            uncovered_skills=uncovered_names,
            member_contributions=member_contributions,
            complementarity_score=comp_score,
            selection_rationale=selection_rationale,
        )
