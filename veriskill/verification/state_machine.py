"""
Verification State Machine and Transition Guard.
"""
from typing import Dict, List, Optional
from datetime import datetime
from veriskill.models.enums import VerificationStatus
from veriskill.models.evidence import VerificationRecord


class VerificationStateMachine:
    """
    Enforces strict state transitions:
      EXTRACTED -> PENDING_VERIFICATION -> VERIFIED | REJECTED
      REJECTED -> PENDING_VERIFICATION (re-evaluation)
      VERIFIED -> REJECTED (revocation)

    Guarantees: An EXTRACTED skill can NEVER jump directly to VERIFIED without
    an explicit verification rule evaluation and artifact inspection.
    """

    ALLOWED_TRANSITIONS = {
        VerificationStatus.EXTRACTED: {
            VerificationStatus.PENDING_VERIFICATION,
            VerificationStatus.REJECTED,
        },
        VerificationStatus.PENDING_VERIFICATION: {
            VerificationStatus.VERIFIED,
            VerificationStatus.REJECTED,
        },
        VerificationStatus.VERIFIED: {
            VerificationStatus.REJECTED,
            VerificationStatus.PENDING_VERIFICATION,
        },
        VerificationStatus.REJECTED: {
            VerificationStatus.PENDING_VERIFICATION,
        },
    }

    @classmethod
    def can_transition(cls, from_status: VerificationStatus, to_status: VerificationStatus) -> bool:
        if from_status == to_status:
            return True
        allowed = cls.ALLOWED_TRANSITIONS.get(from_status, set())
        return to_status in allowed

    @classmethod
    def transition(
        cls,
        current_status: VerificationStatus,
        target_status: VerificationStatus,
        rule_name: str,
        verifier_id: str,
        reason: str,
        artifact_checked: str = "",
        existing_record: Optional[VerificationRecord] = None,
    ) -> VerificationRecord:
        """
        Executes a validated state transition and appends to the immutable audit trail.
        Raises ValueError if transition is illegal.
        """
        if not cls.can_transition(current_status, target_status):
            raise ValueError(
                f"Illegal verification transition: Cannot transition from {current_status.value} "
                f"to {target_status.value}. An EXTRACTED skill cannot bypass PENDING_VERIFICATION."
            )

        timestamp = datetime.utcnow().isoformat() + "Z"
        history = list(existing_record.history) if existing_record else []

        history.append({
            "from_status": current_status.value,
            "to_status": target_status.value,
            "timestamp": timestamp,
            "rule_name": rule_name,
            "verifier_id": verifier_id,
            "reason": reason,
            "artifact_checked": artifact_checked,
        })

        return VerificationRecord(
            status=target_status,
            timestamp=timestamp,
            rule_name=rule_name,
            verifier_id=verifier_id,
            reason=reason,
            artifact_checked=artifact_checked,
            history=history,
        )
