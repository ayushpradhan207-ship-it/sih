"""
Unit tests for Pipeline 6: Fairness Audit.
"""
import unittest
from veriskill.fairness import FairnessAuditor, FairnessMetricsCalculator, FairnessReporter
from veriskill.models import ProtectedAttributes


class TestFairnessAuditPipeline(unittest.TestCase):

    def setUp(self):
        self.auditor = FairnessAuditor(default_selection_threshold=0.70)

    def test_four_fifths_rule_compliant(self):
        scores = {f"stu_{i}": 0.85 for i in range(20)}
        protected = [
            ProtectedAttributes(student_id=f"stu_{i}", gender="Female" if i < 10 else "Male")
            for i in range(20)
        ]

        report = self.auditor.audit_outcomes(scores, protected, selection_threshold=0.70)
        self.assertTrue(report.is_audit_passed)
        self.assertEqual(len(report.potential_disparities), 0)

    def test_four_fifths_rule_violation_detection(self):
        # Group A (10 students): 9 pass (90% selection rate)
        # Group B (10 students): 3 pass (30% selection rate)
        # Disparate Impact Ratio: 0.30 / 0.90 = 0.33 (< 0.80 -> VIOLATION)
        scores = {}
        protected = []

        for i in range(10):
            s_id = f"group_a_{i}"
            scores[s_id] = 0.90 if i < 9 else 0.50
            protected.append(ProtectedAttributes(student_id=s_id, race_ethnicity="Group_A"))

        for i in range(10):
            s_id = f"group_b_{i}"
            scores[s_id] = 0.90 if i < 3 else 0.50
            protected.append(ProtectedAttributes(student_id=s_id, race_ethnicity="Group_B"))

        report = self.auditor.audit_outcomes(scores, protected, selection_threshold=0.70)

        self.assertFalse(report.is_audit_passed)
        self.assertTrue(len(report.potential_disparities) > 0)
        self.assertIn("Group_B", report.potential_disparities[0])

    def test_small_sample_warning_generated(self):
        # Sample size N = 10 < 30
        scores = {f"s_{i}": 0.80 for i in range(10)}
        protected = [ProtectedAttributes(student_id=f"s_{i}", gender="Female") for i in range(10)]

        report = self.auditor.audit_outcomes(scores, protected, selection_threshold=0.70)
        self.assertTrue(any("sample size" in w.lower() for w in report.warnings))

    def test_format_text_and_markdown_reports(self):
        scores = {"s1": 0.85, "s2": 0.65}
        protected = [
            ProtectedAttributes(student_id="s1", gender="Female"),
            ProtectedAttributes(student_id="s2", gender="Male"),
        ]
        report = self.auditor.audit_outcomes(scores, protected, selection_threshold=0.70)
        text_rep = FairnessReporter.format_text_report(report)
        md_rep = FairnessReporter.format_markdown_report(report)

        self.assertIn("VERISKILL FAIRNESS & BIAS AUDIT REPORT", text_rep)
        self.assertIn("## VeriSkill Fairness & Bias Audit Report", md_rep)


if __name__ == "__main__":
    unittest.main()
