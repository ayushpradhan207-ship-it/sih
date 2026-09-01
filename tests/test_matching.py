"""
Unit tests for Pipeline 3: Explainable Matching.
"""
import unittest
from veriskill.matching import ExplainableMatchingEngine, TextVectorizer
from veriskill.models import (
    StudentProfile,
    OpportunityRequirement,
    RequiredSkill,
    VerifiedSkill,
    VerificationStatus,
    Evidence,
    EvidenceType,
    MatchWeights,
)
from veriskill.taxonomy import build_default_taxonomy


class TestExplainableMatchingPipeline(unittest.TestCase):

    def setUp(self):
        self.taxonomy = build_default_taxonomy()
        self.engine = ExplainableMatchingEngine(self.taxonomy)

    def test_text_vectorizer_cosine_similarity(self):
        text_a = "Machine learning and deep learning neural networks in Python."
        text_b = "Python deep learning models using neural networks."
        sim = TextVectorizer.compute_cosine_similarity(text_a, text_b)
        self.assertGreater(sim, 0.5)

        text_c = "Ancient roman history and classical architecture."
        sim_low = TextVectorizer.compute_cosine_similarity(text_a, text_c)
        self.assertLess(sim_low, 0.1)

    def test_matching_with_full_skill_coverage(self):
        student = StudentProfile(id="s1", name="Alice")
        student.add_skill(
            VerifiedSkill(
                skill_name="Python",
                normalized_skill="Python",
                category="Programming Languages",
                status=VerificationStatus.VERIFIED,
                confidence=1.0,
                proficiency_level=0.9,
            )
        )
        student.add_skill(
            VerifiedSkill(
                skill_name="SQL",
                normalized_skill="SQL",
                category="Programming Languages",
                status=VerificationStatus.VERIFIED,
                confidence=1.0,
                proficiency_level=0.85,
            )
        )
        student.add_evidence(
            Evidence(
                id="e1",
                evidence_type=EvidenceType.PROJECT,
                title="Data Pipeline in Python and SQL",
                description="Built high-throughput ETL data pipeline.",
                artifact_uri_or_id="https://github.com/alice/pipeline",
            )
        )

        opportunity = OpportunityRequirement(
            id="opp1",
            title="Junior Data Engineer",
            description="Seeking data engineer proficient in Python and SQL.",
            required_skills=[
                RequiredSkill(name="Python", normalized_name="Python", is_mandatory=True),
                RequiredSkill(name="SQL", normalized_name="SQL", is_mandatory=True),
            ],
            domain_tags=["data engineering", "python", "sql"],
        )

        result = self.engine.match(student, opportunity)

        self.assertGreater(result.overall_score, 0.65)
        self.assertEqual(result.skill_coverage_score, 1.0)
        self.assertEqual(len(result.missing_skills), 0)
        self.assertEqual(len(result.matched_skills), 2)

        # Check mathematical trace integrity
        b_math = result.breakdown_math
        self.assertIn("formula", b_math)
        sub = b_math["subscores"]
        w = b_math["weights"]
        c = b_math["weighted_contributions"]

        expected_total = (
            sub["skill_coverage"] * w["w_coverage"]
            + sub["semantic_similarity"] * w["w_semantic"]
            + sub["evidence_strength"] * w["w_evidence"]
            + sub["experience_relevance"] * w["w_experience"]
            + sub["project_relevance"] * w["w_project"]
        )
        self.assertAlmostEqual(result.overall_score, expected_total, places=3)

    def test_unverified_skills_do_not_yield_coverage(self):
        student = StudentProfile(id="s2", name="Bob")
        # Skill is only EXTRACTED or PENDING, NOT VERIFIED
        student.add_skill(
            VerifiedSkill(
                skill_name="Python",
                normalized_skill="Python",
                category="Programming Languages",
                status=VerificationStatus.PENDING_VERIFICATION,
                confidence=0.7,
                proficiency_level=0.7,
            )
        )

        opportunity = OpportunityRequirement(
            id="opp2",
            title="Python Developer",
            description="Python programming role",
            required_skills=[
                RequiredSkill(name="Python", normalized_name="Python", is_mandatory=True),
            ],
        )

        result = self.engine.match(student, opportunity)
        # Coverage must be 0.0 because Python is not in VERIFIED status
        self.assertEqual(result.skill_coverage_score, 0.0)
        self.assertEqual(len(result.missing_skills), 1)


if __name__ == "__main__":
    unittest.main()
