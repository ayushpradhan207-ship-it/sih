"""
Unified VeriSkill AI/ML Engine Facade.
"""
from typing import List, Dict, Optional, Union
from veriskill.models import (
    StudentProfile,
    OpportunityRequirement,
    Evidence,
    SkillCandidate,
    VerifiedSkill,
    RequiredSkill,
    MatchResult,
    MatchWeights,
    TeamResult,
    ProtectedAttributes,
    FairnessAuditReport,
)
from veriskill.taxonomy import TaxonomyGraph, build_default_taxonomy
from veriskill.extraction import SkillExtractionPipeline
from veriskill.verification import SkillVerificationEngine, VerificationAuditTrail
from veriskill.matching import ExplainableMatchingEngine
from veriskill.explanation import StructuredExplanationGenerator
from veriskill.team_solver import TeamSolverEngine
from veriskill.fairness import FairnessAuditor, FairnessReporter


class VeriSkillEngine:
    """
    Unified VeriSkill AI/ML Engine.

    Provides a clean, modular API executing all 6 core pipelines:
      1. Skill Extraction
      2. Skill Verification
      3. Explainable Matching
      4. Structured Explanation
      5. Team Optimization Solver
      6. Fairness & Bias Audit
    """

    def __init__(
        self,
        taxonomy: Optional[TaxonomyGraph] = None,
        verifier_id: str = "veriskill_engine_v1",
    ):
        self.taxonomy = taxonomy or build_default_taxonomy()
        self.extraction_pipeline = SkillExtractionPipeline(self.taxonomy)
        self.verification_engine = SkillVerificationEngine(verifier_id=verifier_id)
        self.matching_engine = ExplainableMatchingEngine(self.taxonomy)
        self.explanation_generator = StructuredExplanationGenerator()
        self.team_solver = TeamSolverEngine(self.taxonomy)
        self.fairness_auditor = FairnessAuditor()

    # --- Pipeline 1: Extraction ---
    def extract_skills_from_text(self, text: str, title: str = "") -> List[SkillCandidate]:
        """Extracts skill candidates from raw text."""
        return self.extraction_pipeline.extract_from_text(text=text, evidence_title=title)

    def extract_skills_from_evidence(self, evidence: Evidence) -> List[SkillCandidate]:
        """Extracts skill candidates from an Evidence object."""
        return self.extraction_pipeline.extract_from_evidence(evidence)

    def extract_skills_from_student(self, student: StudentProfile) -> List[SkillCandidate]:
        """Extracts and aggregates candidates from all evidence in a StudentProfile."""
        return self.extraction_pipeline.extract_from_student(student)

    # --- Pipeline 2: Verification ---
    def verify_student_skills(self, student: StudentProfile) -> List[VerifiedSkill]:
        """
        Runs explicit verification state machine on student's extracted candidates
        against supporting evidence artifacts.
        """
        if not student.extracted_candidates and student.evidence_items:
            self.extract_skills_from_student(student)
        return self.verification_engine.verify_student_profile(student)

    def process_student(self, student: StudentProfile) -> StudentProfile:
        """
        Full ingestion workflow: extracts candidates, verifies evidence, and populates student profile.
        """
        self.extract_skills_from_student(student)
        self.verify_student_skills(student)
        return student

    # --- Pipeline 3 & 4: Matching & Explanation ---
    def match(
        self,
        student: StudentProfile,
        opportunity: OpportunityRequirement,
        weights: Optional[MatchWeights] = None,
        auto_generate_explanation: bool = True,
    ) -> MatchResult:
        """
        Calculates explainable match between verified student skills and opportunity requirements.
        """
        # Ensure student has verified skills evaluated
        if not student.skills and student.evidence_items:
            self.process_student(student)

        result = self.matching_engine.match(student, opportunity, weights)
        if auto_generate_explanation:
            self.explanation_generator.explain(result)
        return result

    def explain_match(self, match_result: MatchResult) -> str:
        """Generates structured explanation text from MatchResult."""
        return self.explanation_generator.explain(match_result)

    def explain_match_markdown(self, match_result: MatchResult) -> str:
        """Generates markdown explanation from MatchResult."""
        return self.explanation_generator.explain_markdown(match_result)

    # --- Pipeline 5: Team Solver ---
    def solve_team(
        self,
        students: List[StudentProfile],
        required_skills: List[RequiredSkill],
        team_size: int,
    ) -> TeamResult:
        """
        Generates optimal team maximizing skill coverage and complementarity.
        """
        # Ensure all students in pool are processed
        for s in students:
            if not s.skills and s.evidence_items:
                self.process_student(s)

        return self.team_solver.solve_team(
            students=students,
            required_skills=required_skills,
            team_size=team_size,
        )

    # --- Pipeline 6: Fairness Audit ---
    def audit_fairness(
        self,
        match_results: Union[List[MatchResult], Dict[str, float]],
        protected_data: List[ProtectedAttributes],
        selection_threshold: Optional[float] = None,
        privileged_baselines: Optional[Dict[str, str]] = None,
    ) -> FairnessAuditReport:
        """
        Conducts post-ranking fairness audit on isolated demographic data.
        """
        return self.fairness_auditor.audit_outcomes(
            match_results=match_results,
            protected_data=protected_data,
            selection_threshold=selection_threshold,
            privileged_baselines=privileged_baselines,
        )

    def format_fairness_report(self, report: FairnessAuditReport) -> str:
        """Formats audit report as text."""
        return FairnessReporter.format_text_report(report)

    def format_fairness_markdown(self, report: FairnessAuditReport) -> str:
        """Formats audit report as markdown."""
        return FairnessReporter.format_markdown_report(report)
