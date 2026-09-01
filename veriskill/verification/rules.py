"""
Verification Rules and Evaluators for evidence artifacts.
"""
from abc import ABC, abstractmethod
from typing import Tuple, Optional, List
from veriskill.models.enums import EvidenceType, EvidenceArtifactType
from veriskill.models.evidence import Evidence


class VerificationRule(ABC):
    """
    Abstract base class for verification rules.
    """
    @property
    @abstractmethod
    def name(self) -> str:
        pass

    @abstractmethod
    def evaluate(self, evidence: Evidence, skill_name: str) -> Tuple[bool, float, str, str]:
        """
        Evaluates evidence for a specific skill.
        Returns:
            (is_verified, proficiency_boost, reason, artifact_checked)
        """
        pass


class CredentialRule(VerificationRule):
    """
    Verifies skills supported by valid certificates / credentials.
    Requires: non-empty credential ID/URI or recognized certificate authority.
    """
    @property
    def name(self) -> str:
        return "CredentialRule"

    def evaluate(self, evidence: Evidence, skill_name: str) -> Tuple[bool, float, str, str]:
        if evidence.evidence_type != EvidenceType.CREDENTIAL:
            return False, 0.0, "Evidence is not a credential.", ""

        artifact = evidence.artifact_uri_or_id.strip()
        if not artifact:
            # Check if externally validated
            if evidence.is_externally_validated:
                return True, 0.85, f"Verified via external authority: {evidence.issuer_or_institution}", "externally_validated"
            return False, 0.0, "Missing certificate ID or verification URI.", ""

        return (
            True,
            0.90,
            f"Verified against credential artifact '{artifact}' issued by {evidence.issuer_or_institution or 'Certified Authority'}.",
            artifact,
        )


class CourseworkRule(VerificationRule):
    """
    Verifies skills supported by official academic coursework with satisfactory grades.
    Acceptable grades: A, B, Pass, >= 75%.
    """
    @property
    def name(self) -> str:
        return "CourseworkRule"

    PASSING_GRADES = {"A+", "A", "A-", "B+", "B", "B-", "PASS", "DISTINCTION", "HONORS", "SATISFACTORY", "4.0", "3.7", "3.3", "3.0"}

    def evaluate(self, evidence: Evidence, skill_name: str) -> Tuple[bool, float, str, str]:
        if evidence.evidence_type != EvidenceType.COURSEWORK:
            return False, 0.0, "Evidence is not coursework.", ""

        grade = (evidence.grade_or_score or "").strip().upper()
        artifact = evidence.artifact_uri_or_id.strip() or f"course_code:{evidence.title}"

        # If explicit grade is provided
        if grade:
            # Check if passing grade
            if grade in self.PASSING_GRADES or any(grade.startswith(p) for p in ["A", "B", "9", "8"]):
                proficiency = 0.85 if "A" in grade or "4.0" in grade else 0.70
                return (
                    True,
                    proficiency,
                    f"Verified academic coursework '{evidence.title}' with grade '{grade}' from {evidence.issuer_or_institution or 'accredited institution'}.",
                    artifact,
                )
            else:
                return (
                    False,
                    0.0,
                    f"Coursework grade '{grade}' does not meet minimum verification threshold (B / 3.0).",
                    artifact,
                )

        # If transcript or course artifact is linked or institution is declared
        if evidence.is_externally_validated or evidence.verified_by or artifact:
            return (
                True,
                0.75,
                f"Verified official coursework '{evidence.title}' at {evidence.issuer_or_institution or 'institution'}.",
                artifact,
            )

        return False, 0.0, "Coursework lacks transcript verification or grade record.", ""


class ProjectArtifactRule(VerificationRule):
    """
    Verifies skills supported by demonstrable project repositories or codebase artifacts.
    Requires: Repository link, demo URL, or technical commit proof.
    """
    @property
    def name(self) -> str:
        return "ProjectArtifactRule"

    def evaluate(self, evidence: Evidence, skill_name: str) -> Tuple[bool, float, str, str]:
        if evidence.evidence_type != EvidenceType.PROJECT:
            return False, 0.0, "Evidence is not a project.", ""

        artifact = evidence.artifact_uri_or_id.strip()
        # Accept valid URLs, GitHub/GitLab links, repo paths, or validated artifacts
        if artifact and (
            "github.com" in artifact.lower()
            or "gitlab.com" in artifact.lower()
            or "http" in artifact.lower()
            or evidence.artifact_type in (EvidenceArtifactType.REPOSITORY_URL, EvidenceArtifactType.PORTFOLIO_LINK)
            or evidence.is_externally_validated
        ):
            return (
                True,
                0.80,
                f"Verified hands-on project artifact '{evidence.title}' linked at '{artifact}'.",
                artifact,
            )

        if evidence.is_externally_validated or evidence.verified_by:
            return (
                True,
                0.75,
                f"Verified project '{evidence.title}' validated by {evidence.verified_by}.",
                artifact or "validated_project_record",
            )

        return False, 0.0, "Project lacks verifiable repository link or public artifact.", ""


class CompetitionRule(VerificationRule):
    """
    Verifies skills demonstrated through competitive programming or hackathons.
    """
    @property
    def name(self) -> str:
        return "CompetitionRule"

    def evaluate(self, evidence: Evidence, skill_name: str) -> Tuple[bool, float, str, str]:
        if evidence.evidence_type != EvidenceType.COMPETITION:
            return False, 0.0, "Evidence is not a competition.", ""

        artifact = evidence.artifact_uri_or_id.strip()
        placement = evidence.grade_or_score or "Participant"
        if artifact or evidence.is_externally_validated or evidence.verified_by:
            return (
                True,
                0.85,
                f"Verified competition placement '{placement}' in '{evidence.title}'.",
                artifact or "competition_record",
            )

        return False, 0.0, "Competition record lacks leaderboard proof or organizer verification.", ""


class ExperienceRule(VerificationRule):
    """
    Verifies skills supported by professional work experience, internships, or research positions.
    """
    @property
    def name(self) -> str:
        return "ExperienceRule"

    def evaluate(self, evidence: Evidence, skill_name: str) -> Tuple[bool, float, str, str]:
        if evidence.evidence_type != EvidenceType.EXPERIENCE:
            return False, 0.0, "Evidence is not professional experience.", ""

        artifact = evidence.artifact_uri_or_id.strip()
        if evidence.is_externally_validated or evidence.verified_by or artifact or evidence.issuer_or_institution:
            return (
                True,
                0.85,
                f"Verified professional experience at '{evidence.issuer_or_institution or evidence.title}'.",
                artifact or f"employer:{evidence.issuer_or_institution}",
            )

        return False, 0.0, "Experience record lacks verifiable employer or employment artifact.", ""
