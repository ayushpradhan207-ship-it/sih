"""
Unit tests for Pipeline 5: Team Solver.
"""
import unittest
from veriskill.team_solver import TeamSolverEngine
from veriskill.models import (
    StudentProfile,
    RequiredSkill,
    VerifiedSkill,
    VerificationStatus,
)
from veriskill.taxonomy import build_default_taxonomy


class TestTeamSolverPipeline(unittest.TestCase):

    def setUp(self):
        self.taxonomy = build_default_taxonomy()
        self.engine = TeamSolverEngine(self.taxonomy)

        # Student A: ML + Python
        self.stu_a = StudentProfile(id="sa", name="Alice")
        self.stu_a.add_skill(
            VerifiedSkill(skill_name="Machine Learning", normalized_skill="Machine Learning", category="ML", status=VerificationStatus.VERIFIED, proficiency_level=0.9)
        )
        self.stu_a.add_skill(
            VerifiedSkill(skill_name="Python", normalized_skill="Python", category="Prog", status=VerificationStatus.VERIFIED, proficiency_level=0.9)
        )

        # Student B: Docker + Kubernetes
        self.stu_b = StudentProfile(id="sb", name="Bob")
        self.stu_b.add_skill(
            VerifiedSkill(skill_name="Docker", normalized_skill="Docker", category="DevOps", status=VerificationStatus.VERIFIED, proficiency_level=0.85)
        )
        self.stu_b.add_skill(
            VerifiedSkill(skill_name="Kubernetes", normalized_skill="Kubernetes", category="DevOps", status=VerificationStatus.VERIFIED, proficiency_level=0.85)
        )

        # Student C: Duplicate ML + Python (lower proficiency)
        self.stu_c = StudentProfile(id="sc", name="Charlie")
        self.stu_c.add_skill(
            VerifiedSkill(skill_name="Machine Learning", normalized_skill="Machine Learning", category="ML", status=VerificationStatus.VERIFIED, proficiency_level=0.6)
        )
        self.stu_c.add_skill(
            VerifiedSkill(skill_name="Python", normalized_skill="Python", category="Prog", status=VerificationStatus.VERIFIED, proficiency_level=0.6)
        )

    def test_complementary_team_selection(self):
        required = [
            RequiredSkill(name="Machine Learning", normalized_name="Machine Learning"),
            RequiredSkill(name="Python", normalized_name="Python"),
            RequiredSkill(name="Docker", normalized_name="Docker"),
            RequiredSkill(name="Kubernetes", normalized_name="Kubernetes"),
        ]

        # Best team of size 2 must be Alice + Bob (giving 100% coverage), NOT Alice + Charlie (redundant 50% coverage)
        result = self.engine.solve_team(
            students=[self.stu_a, self.stu_b, self.stu_c],
            required_skills=required,
            team_size=2,
        )

        self.assertEqual(result.team_size, 2)
        selected_ids = {m.id for m in result.team_members}
        self.assertEqual(selected_ids, {"sa", "sb"})
        self.assertEqual(result.skill_coverage, 1.0)
        self.assertEqual(len(result.uncovered_skills), 0)
        self.assertTrue(len(result.selection_rationale) > 0)

    def test_uncovered_skills_identification(self):
        required = [
            RequiredSkill(name="Machine Learning", normalized_name="Machine Learning"),
            RequiredSkill(name="Rust", normalized_name="Rust"),  # No one has Rust
        ]
        result = self.engine.solve_team(
            students=[self.stu_a, self.stu_b],
            required_skills=required,
            team_size=1,
        )
        self.assertIn("Rust", result.uncovered_skills)


if __name__ == "__main__":
    unittest.main()
