"""
Unit tests for Pipeline 1: Skill Extraction.
"""
import unittest
from veriskill.extraction import SkillExtractionPipeline, TextCleaner
from veriskill.models import Evidence, EvidenceType, ExtractionMethod
from veriskill.taxonomy import build_default_taxonomy


class TestSkillExtractionPipeline(unittest.TestCase):

    def setUp(self):
        self.taxonomy = build_default_taxonomy()
        self.pipeline = SkillExtractionPipeline(self.taxonomy)

    def test_text_cleaner_strips_html_and_markdown(self):
        dirty = "<h3>Project Overview</h3>\n- Implemented **[FastAPI](https://fastapi.tiangolo.com)** backend with `PostgreSQL` & Redis."
        cleaned = TextCleaner.clean_text(dirty)
        self.assertNotIn("<h3>", cleaned)
        self.assertNotIn("**", cleaned)
        self.assertNotIn("`", cleaned)
        self.assertIn("FastAPI", cleaned)
        self.assertIn("PostgreSQL", cleaned)

    def test_extract_from_coursework(self):
        text = "CS 106B: Programming Abstractions. Coursework in C++, Data Structures, and Algorithmic Problem Solving."
        candidates = self.pipeline.extract_from_text(text, evidence_type=EvidenceType.COURSEWORK)
        extracted_skills = {c.normalized_skill for c in candidates}

        self.assertIn("C++", extracted_skills)
        self.assertIn("Problem Solving", extracted_skills)
        for c in candidates:
            self.assertGreater(c.confidence, 0.0)
            self.assertLess(c.confidence, 1.0)  # Invariant: Never 1.0 until verified!
            self.assertTrue(c.category)

    def test_extract_from_project_description(self):
        text = "Engineered real-time chat application using React, Node.js, and Docker containers with MongoDB."
        candidates = self.pipeline.extract_from_text(text, evidence_type=EvidenceType.PROJECT)
        extracted_skills = {c.normalized_skill for c in candidates}

        self.assertIn("React", extracted_skills)
        self.assertIn("Node.js", extracted_skills)
        self.assertIn("Docker", extracted_skills)
        self.assertIn("MongoDB", extracted_skills)

    def test_extract_from_credential(self):
        text = "AWS Certified Solutions Architect – Associate. Proficient in AWS, Cloud Computing, and Terraform."
        candidates = self.pipeline.extract_from_text(text, evidence_type=EvidenceType.CREDENTIAL)
        extracted_skills = {c.normalized_skill for c in candidates}

        self.assertIn("AWS", extracted_skills)
        self.assertIn("Terraform", extracted_skills)

    def test_synonym_normalization(self):
        text = "Built statistical models using sklearn and k8s cluster deployments."
        candidates = self.pipeline.extract_from_text(text)
        extracted_skills = {c.normalized_skill for c in candidates}

        self.assertIn("Scikit-Learn", extracted_skills)
        self.assertIn("Kubernetes", extracted_skills)

    def test_output_contract_fields(self):
        text = "Trained deep convolutional neural networks using PyTorch."
        candidates = self.pipeline.extract_from_text(text)
        self.assertTrue(len(candidates) > 0)
        c = candidates[0]
        # Validate all 6 specified fields
        self.assertTrue(hasattr(c, "skill"))
        self.assertTrue(hasattr(c, "normalized_skill"))
        self.assertTrue(hasattr(c, "category"))
        self.assertTrue(hasattr(c, "confidence"))
        self.assertTrue(hasattr(c, "source_evidence"))
        self.assertTrue(hasattr(c, "extraction_method"))


if __name__ == "__main__":
    unittest.main()
