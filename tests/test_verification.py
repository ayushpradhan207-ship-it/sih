"""
Unit tests for Pipeline 2: Skill Verification.
"""
import unittest
from veriskill.verification import (
    VerificationStateMachine,
    SkillVerificationEngine,
    CredentialRule,
    CourseworkRule,
    ProjectArtifactRule,
)
from veriskill.models import (
    Evidence,
    EvidenceType,
    EvidenceArtifactType,
    SkillCandidate,
    VerificationStatus,
    StudentProfile,
)


class TestSkillVerificationPipeline(unittest.TestCase):

    def setUp(self):
        self.engine = SkillVerificationEngine()

    def test_state_machine_legal_transitions(self):
        # EXTRACTED -> PENDING_VERIFICATION
        rec = VerificationStateMachine.transition(
            current_status=VerificationStatus.EXTRACTED,
            target_status=VerificationStatus.PENDING_VERIFICATION,
            rule_name="Init",
            verifier_id="test",
            reason="testing",
        )
        self.assertEqual(rec.status, VerificationStatus.PENDING_VERIFICATION)
        self.assertEqual(len(rec.history), 1)

        # PENDING_VERIFICATION -> VERIFIED
        rec2 = VerificationStateMachine.transition(
            current_status=VerificationStatus.PENDING_VERIFICATION,
            target_status=VerificationStatus.VERIFIED,
            rule_name="RulePass",
            verifier_id="test",
            reason="verified artifact",
            existing_record=rec,
        )
        self.assertEqual(rec2.status, VerificationStatus.VERIFIED)
        self.assertEqual(len(rec2.history), 2)

    def test_state_machine_illegal_jump_raises_error(self):
        # Cannot jump directly from EXTRACTED to VERIFIED
        with self.assertRaises(ValueError):
            VerificationStateMachine.transition(
                current_status=VerificationStatus.EXTRACTED,
                target_status=VerificationStatus.VERIFIED,
                rule_name="IllegalBypass",
                verifier_id="test",
                reason="illegal",
            )

    def test_coursework_rule_passes_on_high_grade(self):
        rule = CourseworkRule()
        ev_pass = Evidence(
            id="c1",
            evidence_type=EvidenceType.COURSEWORK,
            title="CS 101",
            description="Intro to Python",
            grade_or_score="A",
            issuer_or_institution="MIT",
        )
        passed, prof, reason, artifact = rule.evaluate(ev_pass, "Python")
        self.assertTrue(passed)
        self.assertGreaterEqual(prof, 0.8)

    def test_coursework_rule_fails_on_failing_grade(self):
        rule = CourseworkRule()
        ev_fail = Evidence(
            id="c2",
            evidence_type=EvidenceType.COURSEWORK,
            title="CS 101",
            description="Intro to Python",
            grade_or_score="D",
            issuer_or_institution="MIT",
        )
        passed, prof, reason, artifact = rule.evaluate(ev_fail, "Python")
        self.assertFalse(passed)

    def test_credential_rule_requires_artifact(self):
        rule = CredentialRule()
        ev_valid = Evidence(
            id="cr1",
            evidence_type=EvidenceType.CREDENTIAL,
            title="AWS Certified ML",
            description="AWS Cert",
            artifact_uri_or_id="CERT-12345",
            issuer_or_institution="Amazon",
        )
        passed, _, _, _ = rule.evaluate(ev_valid, "AWS")
        self.assertTrue(passed)

        ev_invalid = Evidence(
            id="cr2",
            evidence_type=EvidenceType.CREDENTIAL,
            title="Self Claimed ML Certificate",
            description="No cert ID or authority",
            artifact_uri_or_id="",
            is_externally_validated=False,
        )
        passed, _, _, _ = rule.evaluate(ev_invalid, "AWS")
        self.assertFalse(passed)

    def test_project_artifact_rule(self):
        rule = ProjectArtifactRule()
        ev_repo = Evidence(
            id="p1",
            evidence_type=EvidenceType.PROJECT,
            title="Search Engine",
            description="Built in Python",
            artifact_uri_or_id="https://github.com/student/search",
        )
        passed, prof, _, _ = rule.evaluate(ev_repo, "Python")
        self.assertTrue(passed)

    def test_end_to_end_verification_workflow(self):
        candidate = SkillCandidate(
            skill="Python",
            normalized_skill="Python",
            category="Programming Languages",
            confidence=0.85,
            source_evidence="CS 101 Coursework",
            extraction_method="exact_dictionary",
            source_evidence_id="ev_01",
        )
        ev_pool = {
            "ev_01": Evidence(
                id="ev_01",
                evidence_type=EvidenceType.COURSEWORK,
                title="CS 101",
                description="Intro to Python",
                grade_or_score="A",
                artifact_uri_or_id="transcript_verified",
            )
        }
        verified_skill = self.engine.verify_candidate(candidate, ev_pool)
        self.assertEqual(verified_skill.status, VerificationStatus.VERIFIED)
        self.assertTrue(verified_skill.is_verified)
        self.assertEqual(verified_skill.confidence, 1.0)
        self.assertTrue(len(verified_skill.evidence_refs) > 0)


if __name__ == "__main__":
    unittest.main()
