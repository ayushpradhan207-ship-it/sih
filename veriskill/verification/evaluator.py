"""
Skill Verification Evaluator and Engine (Pipeline 2).
"""
from typing import List, Dict, Optional, Tuple
from datetime import datetime
from veriskill.models.enums import VerificationStatus, EvidenceType
from veriskill.models.evidence import Evidence, EvidenceRef, VerificationRecord
from veriskill.models.skill import SkillCandidate, VerifiedSkill
from veriskill.models.student import StudentProfile
from veriskill.verification.state_machine import VerificationStateMachine
from veriskill.verification.rules import (
    VerificationRule,
    CredentialRule,
    CourseworkRule,
    ProjectArtifactRule,
    CompetitionRule,
    ExperienceRule,
)


class SkillVerificationEngine:
    """
    Pipeline 2 — Skill Verification.

    Rule: Do not automatically call extracted skills verified.
    Explicit states: EXTRACTED -> PENDING_VERIFICATION -> VERIFIED | REJECTED.
    """

    def __init__(self, custom_rules: Optional[List[VerificationRule]] = None, verifier_id: str = "veriskill_engine_v1"):
        self.verifier_id = verifier_id
        self.rules: List[VerificationRule] = custom_rules or [
            CredentialRule(),
            CourseworkRule(),
            ProjectArtifactRule(),
            CompetitionRule(),
            ExperienceRule(),
        ]

    def verify_candidate(
        self,
        candidate: SkillCandidate,
        evidence_pool: Dict[str, Evidence],
    ) -> VerifiedSkill:
        """
        Evaluates a single SkillCandidate against supporting evidence in the pool.
        Executes strict state transitions:
        1. Initialize as EXTRACTED
        2. Move to PENDING_VERIFICATION
        3. Evaluate verification rules against supporting evidence
        4. If verified, transition to VERIFIED; else transition to REJECTED or leave in PENDING.
        """
        # Step 1: Create in EXTRACTED state
        verified_skill = VerifiedSkill(
            skill_name=candidate.skill,
            normalized_skill=candidate.normalized_skill,
            category=candidate.category,
            status=VerificationStatus.EXTRACTED,
            confidence=candidate.confidence,
            proficiency_level=0.5,
            last_updated=datetime.utcnow().isoformat() + "Z",
        )

        # Step 2: Transition to PENDING_VERIFICATION
        pending_record = VerificationStateMachine.transition(
            current_status=VerificationStatus.EXTRACTED,
            target_status=VerificationStatus.PENDING_VERIFICATION,
            rule_name="InitiateVerification",
            verifier_id=self.verifier_id,
            reason=f"Candidate extracted via {candidate.extraction_method}; pending artifact evaluation.",
            artifact_checked="",
            existing_record=None,
        )
        verified_skill.status = VerificationStatus.PENDING_VERIFICATION
        verified_skill.verification_record = pending_record

        # Step 3: Match supporting evidence
        matching_evidence_items: List[Evidence] = []
        if candidate.source_evidence_id and candidate.source_evidence_id in evidence_pool:
            matching_evidence_items.append(evidence_pool[candidate.source_evidence_id])
        else:
            # Search pool for evidence mentioning this skill
            for ev in evidence_pool.values():
                text = f"{ev.title} {ev.description}".lower()
                if candidate.normalized_skill.lower() in text or candidate.skill.lower() in text:
                    matching_evidence_items.append(ev)

        # Evaluate rules across all matched evidence
        verification_passed = False
        best_rule_name = "NoPassingRule"
        best_reason = "No verifiable artifact found for candidate skill."
        best_artifact = ""
        proficiency_scores: List[float] = []
        collected_refs: List[EvidenceRef] = []

        for ev in matching_evidence_items:
            for rule in self.rules:
                passed, prof, reason, artifact = rule.evaluate(ev, candidate.normalized_skill)
                if passed:
                    verification_passed = True
                    best_rule_name = rule.name
                    best_reason = reason
                    best_artifact = artifact
                    proficiency_scores.append(prof)

                    # Build EvidenceRef
                    weight = 1.2 if ev.evidence_type in (EvidenceType.CREDENTIAL, EvidenceType.COURSEWORK) else 1.0
                    snippet = candidate.source_evidence or f"{ev.title}: {ev.description[:100]}"
                    collected_refs.append(
                        EvidenceRef(
                            evidence_id=ev.id,
                            snippet=snippet,
                            evidence_type=ev.evidence_type,
                            strength_weight=weight,
                        )
                    )
                    break

        verified_skill.evidence_refs = collected_refs

        # Step 4: Final State Transition
        if verification_passed:
            # Calculate aggregate proficiency
            avg_prof = sum(proficiency_scores) / len(proficiency_scores)
            # Multi-source boost
            if len(collected_refs) > 1:
                avg_prof = min(1.0, avg_prof + 0.05 * (len(collected_refs) - 1))

            final_record = VerificationStateMachine.transition(
                current_status=VerificationStatus.PENDING_VERIFICATION,
                target_status=VerificationStatus.VERIFIED,
                rule_name=best_rule_name,
                verifier_id=self.verifier_id,
                reason=best_reason,
                artifact_checked=best_artifact,
                existing_record=pending_record,
            )
            verified_skill.status = VerificationStatus.VERIFIED
            verified_skill.confidence = 1.0  # Formally verified
            verified_skill.proficiency_level = avg_prof
            verified_skill.verification_record = final_record
            verified_skill.last_updated = datetime.utcnow().isoformat() + "Z"
        else:
            final_record = VerificationStateMachine.transition(
                current_status=VerificationStatus.PENDING_VERIFICATION,
                target_status=VerificationStatus.REJECTED,
                rule_name="UnverifiedEvidence",
                verifier_id=self.verifier_id,
                reason=best_reason,
                artifact_checked=best_artifact,
                existing_record=pending_record,
            )
            verified_skill.status = VerificationStatus.REJECTED
            verified_skill.verification_record = final_record
            verified_skill.last_updated = datetime.utcnow().isoformat() + "Z"

        return verified_skill

    def verify_student_profile(self, student: StudentProfile) -> List[VerifiedSkill]:
        """
        Takes extracted candidates and evidence from a StudentProfile,
        evaluates all candidates, and populates student.skills.
        """
        evidence_pool = {e.id: e for e in student.evidence_items}
        verified_skills: List[VerifiedSkill] = []

        for candidate in student.extracted_candidates:
            v_skill = self.verify_candidate(candidate, evidence_pool)
            student.add_skill(v_skill)
            verified_skills.append(v_skill)

        return verified_skills
