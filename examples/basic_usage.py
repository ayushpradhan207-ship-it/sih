"""
Example 1: Basic Usage — Extraction, Verification, Matching & Structured Explanation.
"""
import os
import sys

# Ensure repository root is on sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from veriskill import (
    VeriSkillEngine,
    StudentProfile,
    OpportunityRequirement,
    Evidence,
    EvidenceType,
    EvidenceArtifactType,
    RequiredSkill,
)


def main():
    print("=== VeriSkill Basic Usage Walkthrough ===")
    engine = VeriSkillEngine()

    # Step 1: Create Student Profile with Evidence
    student = StudentProfile(id="stu_01", name="Maya Lin", email="maya.lin@example.edu")

    # Add Coursework Evidence
    student.add_evidence(
        Evidence(
            id="ev_course_01",
            evidence_type=EvidenceType.COURSEWORK,
            title="CS 224N: Natural Language Processing with Deep Learning",
            description="Implemented transformers, attention mechanisms, BERT fine-tuning, and tokenizers in Python and PyTorch.",
            issuer_or_institution="Stanford University",
            date="2024-03",
            artifact_type=EvidenceArtifactType.TRANSCRIPT_RECORD,
            artifact_uri_or_id="transcript_cs224n_verified",
            grade_or_score="A+",
            is_externally_validated=True,
        )
    )

    # Add Project Evidence
    student.add_evidence(
        Evidence(
            id="ev_proj_01",
            evidence_type=EvidenceType.PROJECT,
            title="Multimodal RAG Knowledge Assistant",
            description="Built a Retrieval-Augmented Generation (RAG) assistant using Large Language Models, LangChain, and FastAPI with PostgreSQL pgvector.",
            artifact_type=EvidenceArtifactType.REPOSITORY_URL,
            artifact_uri_or_id="https://github.com/mayalin/multimodal-rag",
            is_externally_validated=True,
        )
    )

    # Add Credential Evidence
    student.add_evidence(
        Evidence(
            id="ev_cred_01",
            evidence_type=EvidenceType.CREDENTIAL,
            title="AWS Certified Developer – Associate",
            description="Validation of technical expertise in developing and maintaining AWS-based applications, Docker containers, and CI/CD.",
            issuer_or_institution="Amazon Web Services",
            date="2024-01",
            artifact_type=EvidenceArtifactType.CERTIFICATE_ID,
            artifact_uri_or_id="AWS-DEV-4458921",
            is_externally_validated=True,
        )
    )

    # Step 2: Extract & Verify Skills
    print("\n1. Ingesting Evidence & Verifying Skills...")
    engine.process_student(student)

    print(f"Extracted {len(student.extracted_candidates)} candidate skills.")
    print(f"Verified {len(student.get_verified_skills())} skills:")
    for skill in student.get_verified_skills():
        print(f"  ✓ {skill.normalized_skill:<30} [{skill.category}] (Proficiency: {skill.proficiency_level:.2f})")

    # Step 3: Define Target Opportunity
    opportunity = OpportunityRequirement(
        id="opp_nlp_engineer",
        title="GenAI / NLP Engineer",
        description="Looking for an AI engineer to develop generative AI solutions using Python, PyTorch, Large Language Models, and FastAPI. Experience with Docker and SQL is a plus.",
        required_skills=[
            RequiredSkill(name="Python", normalized_name="Python", is_mandatory=True),
            RequiredSkill(name="Natural Language Processing", normalized_name="Natural Language Processing", is_mandatory=True),
            RequiredSkill(name="Large Language Models", normalized_name="Large Language Models", is_mandatory=True),
            RequiredSkill(name="PyTorch", normalized_name="PyTorch", is_mandatory=True),
            RequiredSkill(name="FastAPI", normalized_name="FastAPI", is_mandatory=False),
        ],
        preferred_skills=[
            RequiredSkill(name="Docker", normalized_name="Docker", is_mandatory=False),
            RequiredSkill(name="SQL", normalized_name="SQL", is_mandatory=False),
        ],
        domain_tags=["nlp", "large language models", "deep learning", "python", "generative ai"],
    )

    # Step 4: Run Explainable Match
    print("\n2. Calculating Match & Generating Structured Explanation...")
    match_result = engine.match(student, opportunity)

    print("\n" + engine.explain_match(match_result))

    print("\n3. Mathematical Breakdown:")
    components = [
        ("Skill Coverage", "skill_coverage", "w_coverage", "skill_coverage_contrib"),
        ("Semantic Similarity", "semantic_similarity", "w_semantic", "semantic_similarity_contrib"),
        ("Evidence Strength", "evidence_strength", "w_evidence", "evidence_strength_contrib"),
        ("Experience Relevance", "experience_relevance", "w_experience", "experience_relevance_contrib"),
        ("Project Relevance", "project_relevance", "w_project", "project_relevance_contrib"),
    ]
    math_b = match_result.breakdown_math
    for label, sub_k, w_k, c_k in components:
        sub_val = math_b["subscores"][sub_k]
        w_val = math_b["weights"][w_k]
        c_val = math_b["weighted_contributions"][c_k]
        print(f"  - {label:<22}: Score = {sub_val:.3f} | Weight = {w_val:.2f} | Contribution = {c_val:.3f}")
    print(f"  => Total Unrounded Score: {match_result.overall_score:.4f} ({match_result.overall_percentage}%)")


if __name__ == "__main__":
    main()
