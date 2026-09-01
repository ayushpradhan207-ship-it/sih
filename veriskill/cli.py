"""
VeriSkill Command-Line Interface.
"""
import argparse
import json
import sys
from veriskill.engine import VeriSkillEngine
from veriskill.models import (
    StudentProfile,
    OpportunityRequirement,
    Evidence,
    EvidenceType,
    EvidenceArtifactType,
    RequiredSkill,
    ProtectedAttributes,
)


def run_demo():
    print("=" * 65)
    print("  VERISKILL AI/ML ENGINE DEMO: END-TO-END PIPELINE RUN")
    print("=" * 65)

    engine = VeriSkillEngine()

    # 1. Create Student Evidence
    student = StudentProfile(
        id="stu_001",
        name="Alex Rivera",
        email="alex.rivera@stanford.edu",
    )

    # Coursework
    student.add_evidence(
        Evidence(
            id="ev_01",
            evidence_type=EvidenceType.COURSEWORK,
            title="CS 229: Machine Learning",
            description="Completed advanced coursework covering supervised learning, deep learning, PyTorch, and optimization algorithms. Implemented gradient descent and neural networks in Python.",
            issuer_or_institution="Stanford University",
            date="2024-05",
            artifact_type=EvidenceArtifactType.TRANSCRIPT_RECORD,
            artifact_uri_or_id="transcript_cs229_verified",
            grade_or_score="A",
            is_externally_validated=True,
        )
    )

    # Project
    student.add_evidence(
        Evidence(
            id="ev_02",
            evidence_type=EvidenceType.PROJECT,
            title="Autonomous Vision Navigation System",
            description="Built an end-to-end computer vision and object detection pipeline using PyTorch, Scikit-Learn, and OpenCV. Managed structured query datasets with SQL and PostgreSQL.",
            issuer_or_institution="AI Robotics Club",
            date="2024-08",
            artifact_type=EvidenceArtifactType.REPOSITORY_URL,
            artifact_uri_or_id="https://github.com/alexrivera/vision-nav",
            is_externally_validated=True,
        )
    )

    # Credential
    student.add_evidence(
        Evidence(
            id="ev_03",
            evidence_type=EvidenceType.CREDENTIAL,
            title="AWS Certified Machine Learning - Specialty",
            description="Certified expertise in designing, implementing, and deploying machine learning solutions on AWS cloud infrastructure.",
            issuer_or_institution="Amazon Web Services",
            date="2024-06",
            artifact_type=EvidenceArtifactType.CERTIFICATE_ID,
            artifact_uri_or_id="AWS-MLS-98745612",
            is_externally_validated=True,
        )
    )

    # Experience
    student.add_evidence(
        Evidence(
            id="ev_04",
            evidence_type=EvidenceType.EXPERIENCE,
            title="Data Science Intern",
            description="Built automated ETL data pipelines in Python and SQL. Conducted statistical modeling and model evaluation on PostgreSQL databases.",
            issuer_or_institution="DeepScale Labs",
            date="2023-09",
            artifact_type=EvidenceArtifactType.EMPLOYMENT_RECORD,
            artifact_uri_or_id="emp_ref_deepscale_2023",
            is_externally_validated=True,
        )
    )

    print("\n[+] Ingesting and Extracting Skills from Student Evidence (Pipeline 1)...")
    candidates = engine.extract_skills_from_student(student)
    for c in candidates[:6]:
        print(f"  - Extracted: {c.normalized_skill:<25} | Cat: {c.category:<25} | Conf: {c.confidence:.2f} | Method: {c.extraction_method}")

    print("\n[+] Verifying Skills Against Evidence Artifacts (Pipeline 2)...")
    verified_skills = engine.verify_student_skills(student)
    for s in verified_skills[:6]:
        status_icon = "✓" if s.is_verified else "✗"
        print(f"  [{status_icon}] {s.normalized_skill:<25} | Status: {s.status.value:<18} | Prof: {s.proficiency_level:.2f}")

    # 2. Define Opportunity Requirement
    opportunity = OpportunityRequirement(
        id="opp_ml_engineer",
        title="Machine Learning Engineer Intern",
        description="Looking for an ML engineer to build deep learning models and data pipelines in Python, PyTorch, and SQL. Docker containerization experience preferred.",
        required_skills=[
            RequiredSkill(name="Python", normalized_name="Python", is_mandatory=True, importance_weight=1.2),
            RequiredSkill(name="Machine Learning", normalized_name="Machine Learning", is_mandatory=True, importance_weight=1.2),
            RequiredSkill(name="PyTorch", normalized_name="PyTorch", is_mandatory=True, importance_weight=1.0),
            RequiredSkill(name="SQL", normalized_name="SQL", is_mandatory=True, importance_weight=0.9),
            RequiredSkill(name="Docker", normalized_name="Docker", is_mandatory=True, importance_weight=0.8),
        ],
        preferred_skills=[
            RequiredSkill(name="AWS", normalized_name="AWS", is_mandatory=False, importance_weight=0.6),
            RequiredSkill(name="Computer Vision", normalized_name="Computer Vision", is_mandatory=False, importance_weight=0.6),
        ],
        domain_tags=["machine learning", "computer vision", "python", "pytorch"],
    )

    print("\n[+] Calculating Explainable Match (Pipeline 3) & Generating Structured Explanation (Pipeline 4)...")
    match_result = engine.match(student, opportunity)

    print("\n" + "-" * 50)
    print(engine.explain_match(match_result))
    print("-" * 50)

    # 3. Team Solver Demo (Pipeline 5)
    print("\n[+] Solving Optimal Team Composition (Pipeline 5)...")
    student2 = StudentProfile(id="stu_002", name="Jordan Lee")
    student2.add_evidence(
        Evidence(
            id="ev_j1",
            evidence_type=EvidenceType.PROJECT,
            title="Kubernetes Microservice Architecture",
            description="Deployed Docker containers orchestrated by Kubernetes on AWS with automated CI/CD pipelines.",
            artifact_uri_or_id="https://github.com/jordanlee/k8s-infra",
            is_externally_validated=True,
        )
    )
    engine.process_student(student2)

    student3 = StudentProfile(id="stu_003", name="Taylor Chen")
    student3.add_evidence(
        Evidence(
            id="ev_t1",
            evidence_type=EvidenceType.COURSEWORK,
            title="Distributed Systems & Databases",
            description="Built distributed consensus protocols in Go and designed PostgreSQL relational schemas.",
            artifact_uri_or_id="transcript_cs244",
            grade_or_score="A",
            is_externally_validated=True,
        )
    )
    engine.process_student(student3)

    target_team_skills = [
        RequiredSkill(name="Machine Learning", normalized_name="Machine Learning"),
        RequiredSkill(name="Python", normalized_name="Python"),
        RequiredSkill(name="Docker", normalized_name="Docker"),
        RequiredSkill(name="Kubernetes", normalized_name="Kubernetes"),
        RequiredSkill(name="PostgreSQL", normalized_name="PostgreSQL"),
    ]

    team_result = engine.solve_team(
        students=[student, student2, student3],
        required_skills=target_team_skills,
        team_size=2,
    )

    print(f"  Team Size: {team_result.team_size}")
    print(f"  Skill Coverage: {team_result.skill_coverage_percentage}%")
    print(f"  Covered Skills: {', '.join(team_result.covered_skills)}")
    print(f"  Uncovered Skills: {', '.join(team_result.uncovered_skills) or 'None'}")
    print(f"  Rationale: {team_result.selection_rationale}")

    # 4. Fairness Audit Demo (Pipeline 6)
    print("\n[+] Conducting Isolated Post-Ranking Fairness & Bias Audit (Pipeline 6)...")
    # Simulate a candidate cohort
    cohort_scores = {
        "s_01": 0.88, "s_02": 0.82, "s_03": 0.79, "s_04": 0.65,
        "s_05": 0.74, "s_06": 0.71, "s_07": 0.60, "s_08": 0.85,
        "s_09": 0.77, "s_10": 0.58, "s_11": 0.83, "s_12": 0.68,
    }
    protected_data = [
        ProtectedAttributes(student_id="s_01", gender="Female", race_ethnicity="Asian"),
        ProtectedAttributes(student_id="s_02", gender="Male", race_ethnicity="White"),
        ProtectedAttributes(student_id="s_03", gender="Female", race_ethnicity="Black"),
        ProtectedAttributes(student_id="s_04", gender="Male", race_ethnicity="Hispanic"),
        ProtectedAttributes(student_id="s_05", gender="Non-Binary", race_ethnicity="Asian"),
        ProtectedAttributes(student_id="s_06", gender="Female", race_ethnicity="White"),
        ProtectedAttributes(student_id="s_07", gender="Male", race_ethnicity="Black"),
        ProtectedAttributes(student_id="s_08", gender="Female", race_ethnicity="Hispanic"),
        ProtectedAttributes(student_id="s_09", gender="Male", race_ethnicity="Asian"),
        ProtectedAttributes(student_id="s_10", gender="Female", race_ethnicity="White"),
        ProtectedAttributes(student_id="s_11", gender="Male", race_ethnicity="White"),
        ProtectedAttributes(student_id="s_12", gender="Female", race_ethnicity="Asian"),
    ]

    audit_report = engine.audit_fairness(
        match_results=cohort_scores,
        protected_data=protected_data,
        selection_threshold=0.70,
    )
    print("\n" + engine.format_fairness_report(audit_report))
    print("\n[✓] Demo completed successfully.")


def main():
    parser = argparse.ArgumentParser(description="VeriSkill AI/ML Engine CLI")
    subparsers = parser.add_subparsers(dest="command")

    demo_parser = subparsers.add_parser("demo", help="Run end-to-end VeriSkill pipeline demo")

    args = parser.parse_args()

    if args.command == "demo" or len(sys.argv) == 1:
        run_demo()
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
