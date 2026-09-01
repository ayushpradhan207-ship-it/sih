"""
Unit tests for Pipeline 4: Structured Explanation.
"""
import unittest
from veriskill.explanation import StructuredExplanationGenerator, ExplanationFormatter, ProvenanceBuilder
from veriskill.models import (
    MatchResult,
    SkillMatchDetail,
    EvidenceHighlight,
    RequiredSkill,
    StudentProfile,
    Evidence,
    EvidenceType,
)


class TestStructuredExplanationPipeline(unittest.TestCase):

    def test_structured_text_format(self):
        match_result = MatchResult(
            student_id="s1",
            opportunity_id="opp1",
            overall_score=0.87,
            skill_coverage_score=0.85,
            semantic_similarity_score=0.80,
            evidence_strength_score=0.90,
            experience_relevance_score=0.75,
            project_relevance_score=0.80,
            matched_skills=[
                SkillMatchDetail(
                    required_skill="Python",
                    normalized_name="Python",
                    category="Programming Languages",
                    is_mandatory=True,
                    is_matched=True,
                    matched_skill="Python",
                    similarity_score=1.0,
                    evidence_strength=0.9,
                    supporting_evidence_ids=["e1"],
                ),
                SkillMatchDetail(
                    required_skill="Machine Learning",
                    normalized_name="Machine Learning",
                    category="Machine Learning & AI",
                    is_mandatory=True,
                    is_matched=True,
                    matched_skill="Machine Learning",
                    similarity_score=1.0,
                    evidence_strength=0.9,
                    supporting_evidence_ids=["e2"],
                ),
            ],
            missing_skills=[
                RequiredSkill(name="Docker", normalized_name="Docker", is_mandatory=True),
            ],
            evidence_highlights=[
                EvidenceHighlight(
                    skill_name="Machine Learning",
                    evidence_type="project",
                    title="Machine Learning Project",
                    snippet="Autonomous Vision System",
                    verification_status="VERIFIED",
                ),
                EvidenceHighlight(
                    skill_name="Python",
                    evidence_type="coursework",
                    title="Python Coursework",
                    snippet="CS 101 Intro to Programming",
                    verification_status="VERIFIED",
                ),
            ],
        )

        explanation_text = StructuredExplanationGenerator.explain(match_result)

        self.assertIn("MATCH SCORE: 87%", explanation_text)
        self.assertIn("Matched:", explanation_text)
        self.assertIn("Python", explanation_text)
        self.assertIn("Machine Learning", explanation_text)
        self.assertIn("Strong evidence:", explanation_text)
        self.assertIn("Machine Learning Project", explanation_text)
        self.assertIn("Missing:", explanation_text)
        self.assertIn("Docker", explanation_text)
        self.assertIn("Explanation:", explanation_text)

    def test_provenance_builder(self):
        student = StudentProfile(id="s1", name="Alice")
        student.add_evidence(
            Evidence(
                id="e1",
                evidence_type=EvidenceType.COURSEWORK,
                title="CS 101",
                description="Python course",
                grade_or_score="A",
            )
        )
        match_result = MatchResult(
            student_id="s1",
            opportunity_id="opp1",
            overall_score=0.90,
            skill_coverage_score=1.0,
            semantic_similarity_score=0.8,
            evidence_strength_score=0.8,
            experience_relevance_score=0.8,
            project_relevance_score=0.8,
            matched_skills=[
                SkillMatchDetail(
                    required_skill="Python",
                    normalized_name="Python",
                    category="Programming",
                    is_mandatory=True,
                    is_matched=True,
                    matched_skill="Python",
                    supporting_evidence_ids=["e1"],
                )
            ],
        )

        lineage = ProvenanceBuilder.build_lineage_graph(student, match_result)
        self.assertEqual(lineage["student_id"], "s1")
        self.assertEqual(len(lineage["skills_provenance"]), 1)
        self.assertEqual(lineage["skills_provenance"][0]["evidence_sources"][0]["evidence_id"], "e1")


if __name__ == "__main__":
    unittest.main()
