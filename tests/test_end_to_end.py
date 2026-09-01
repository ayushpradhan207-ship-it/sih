"""
Comprehensive End-to-End Integration Tests for VeriSkill Engine.
"""
import unittest
from veriskill import (
    VeriSkillEngine,
    StudentProfile,
    OpportunityRequirement,
    Evidence,
    EvidenceType,
    EvidenceArtifactType,
    RequiredSkill,
    VerificationStatus,
    ProtectedAttributes,
)


class TestEndToEndEngine(unittest.TestCase):

    def setUp(self):
        self.engine = VeriSkillEngine()

    def test_complete_end_to_end_pipeline(self):
        # 1. Student Evidence Setup
        student = StudentProfile(id="stu_100", name="Devin Patel")

        # Coursework
        student.add_evidence(
            Evidence(
                id="ev_c1",
                evidence_type=EvidenceType.COURSEWORK,
                title="CS 189: Introduction to Machine Learning",
                description="Comprehensive machine learning course in Python, covering gradient descent, regression, SVMs, and neural networks in PyTorch.",
                grade_or_score="A",
                issuer_or_institution="UC Berkeley",
                artifact_uri_or_id="transcript_cs189",
                is_externally_validated=True,
            )
        )

        # Project
        student.add_evidence(
            Evidence(
                id="ev_p1",
                evidence_type=EvidenceType.PROJECT,
                title="Distributed Event Pipeline",
                description="Designed distributed event streaming pipeline using Python, SQL, and PostgreSQL with Docker.",
                artifact_uri_or_id="https://github.com/devin/event-pipe",
                is_externally_validated=True,
            )
        )

        # Ingestion & Extraction (Pipeline 1)
        candidates = self.engine.extract_skills_from_student(student)
        self.assertTrue(len(candidates) >= 3)
        candidate_skills = {c.normalized_skill for c in candidates}
        self.assertIn("Python", candidate_skills)
        self.assertIn("Machine Learning", candidate_skills)

        # Verification (Pipeline 2)
        verified_skills = self.engine.verify_student_skills(student)
        self.assertTrue(all(isinstance(s.status, VerificationStatus) for s in verified_skills))
        verified_set = {s.normalized_skill for s in student.get_verified_skills()}
        self.assertIn("Python", verified_set)
        self.assertIn("Machine Learning", verified_set)

        # Matching (Pipeline 3)
        opportunity = OpportunityRequirement(
            id="opp_ds",
            title="Data Scientist Intern",
            description="Seeking data scientist proficient in Python, Machine Learning, and SQL.",
            required_skills=[
                RequiredSkill(name="Python", normalized_name="Python", is_mandatory=True),
                RequiredSkill(name="Machine Learning", normalized_name="Machine Learning", is_mandatory=True),
                RequiredSkill(name="SQL", normalized_name="SQL", is_mandatory=True),
            ],
            preferred_skills=[
                RequiredSkill(name="PyTorch", normalized_name="PyTorch", is_mandatory=False),
            ],
            domain_tags=["machine learning", "python", "data science"],
        )

        match_result = self.engine.match(student, opportunity)
        self.assertGreater(match_result.overall_score, 0.60)
        self.assertEqual(match_result.skill_coverage_score, 1.0)
        self.assertEqual(len(match_result.missing_skills), 0)

        # Explanation (Pipeline 4)
        explanation_text = self.engine.explain_match(match_result)
        self.assertIn("MATCH SCORE:", explanation_text)
        self.assertIn("Matched:", explanation_text)
        self.assertIn("Strong evidence:", explanation_text)
        self.assertIn("Explanation:", explanation_text)

        # Team Solver (Pipeline 5)
        student2 = StudentProfile(id="stu_101", name="Sarah Connor")
        student2.add_evidence(
            Evidence(
                id="ev_s2",
                evidence_type=EvidenceType.PROJECT,
                title="Kubernetes Infra",
                description="Deployed Kubernetes clusters and Docker containers on AWS.",
                artifact_uri_or_id="https://github.com/sarah/k8s",
                is_externally_validated=True,
            )
        )
        self.engine.process_student(student2)

        team_result = self.engine.solve_team(
            students=[student, student2],
            required_skills=[
                RequiredSkill(name="Machine Learning", normalized_name="Machine Learning"),
                RequiredSkill(name="Kubernetes", normalized_name="Kubernetes"),
            ],
            team_size=2,
        )
        self.assertEqual(team_result.team_size, 2)
        self.assertEqual(team_result.skill_coverage, 1.0)

        # Fairness Audit (Pipeline 6)
        scores = {student.id: match_result.overall_score, student2.id: 0.75}
        protected_list = [
            ProtectedAttributes(student_id=student.id, gender="Male", race_ethnicity="Asian"),
            ProtectedAttributes(student_id=student2.id, gender="Female", race_ethnicity="White"),
        ]
        audit_report = self.engine.audit_fairness(scores, protected_list, selection_threshold=0.60)
        self.assertTrue(len(audit_report.metrics) >= 2)
        self.assertTrue(audit_report.is_audit_passed)


if __name__ == "__main__":
    unittest.main()
