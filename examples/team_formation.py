"""
Example 2: Optimal Team Formation with Complementarity and Verified Skill Coverage.
"""
import os
import sys

# Ensure repository root is on sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from veriskill import (
    VeriSkillEngine,
    StudentProfile,
    Evidence,
    EvidenceType,
    RequiredSkill,
)


def create_candidate_pool(engine: VeriSkillEngine):
    students = []

    # Student 1: AI / Computer Vision Specialist
    s1 = StudentProfile(id="s1", name="Sarah Chen")
    s1.add_evidence(
        Evidence(
            id="e1",
            evidence_type=EvidenceType.PROJECT,
            title="Real-Time Computer Vision & PyTorch Object Tracking",
            description="Trained YOLO and CNN models in Python and PyTorch for edge devices.",
            artifact_uri_or_id="https://github.com/sarah/vision-track",
            is_externally_validated=True,
        )
    )
    students.append(s1)

    # Student 2: Cloud Infrastructure & DevOps Specialist
    s2 = StudentProfile(id="s2", name="Marcus Brody")
    s2.add_evidence(
        Evidence(
            id="e2",
            evidence_type=EvidenceType.PROJECT,
            title="Kubernetes Cluster & Terraform Automation",
            description="Automated multi-region Docker deployments on AWS with CI/CD GitHub Actions.",
            artifact_uri_or_id="https://github.com/marcus/k8s-terraform",
            is_externally_validated=True,
        )
    )
    students.append(s2)

    # Student 3: Full-Stack Web Specialist
    s3 = StudentProfile(id="s3", name="Elena Rostova")
    s3.add_evidence(
        Evidence(
            id="e3",
            evidence_type=EvidenceType.PROJECT,
            title="Interactive Web Dashboard in React & TypeScript",
            description="Built responsive UI using React, Next.js, TypeScript, and Tailwind CSS with REST APIs.",
            artifact_uri_or_id="https://github.com/elena/react-dash",
            is_externally_validated=True,
        )
    )
    students.append(s3)

    # Student 4: Data Engineering Specialist
    s4 = StudentProfile(id="s4", name="David Kim")
    s4.add_evidence(
        Evidence(
            id="e4",
            evidence_type=EvidenceType.PROJECT,
            title="Big Data ETL Pipeline with Spark and PostgreSQL",
            description="Architected Apache Spark and Kafka streaming pipelines writing to PostgreSQL and Snowflake.",
            artifact_uri_or_id="https://github.com/david/spark-etl",
            is_externally_validated=True,
        )
    )
    students.append(s4)

    # Process all candidates
    for s in students:
        engine.process_student(s)

    return students


def main():
    print("=== VeriSkill Pipeline 5: Team Formation Demo ===")
    engine = VeriSkillEngine()
    pool = create_candidate_pool(engine)

    # Required project skills for a cross-functional autonomous AI platform
    required_skills = [
        RequiredSkill(name="Python", normalized_name="Python"),
        RequiredSkill(name="PyTorch", normalized_name="PyTorch"),
        RequiredSkill(name="Computer Vision", normalized_name="Computer Vision"),
        RequiredSkill(name="Docker", normalized_name="Docker"),
        RequiredSkill(name="Kubernetes", normalized_name="Kubernetes"),
        RequiredSkill(name="React", normalized_name="React"),
        RequiredSkill(name="TypeScript", normalized_name="TypeScript"),
    ]

    print("\nProject Required Skills:")
    for r in required_skills:
        print(f"  - {r.name}")

    print(f"\nCandidate Pool: {len(pool)} students available.")
    print("Solving for optimal 3-member team...")

    team_result = engine.solve_team(students=pool, required_skills=required_skills, team_size=3)

    print("\n" + "=" * 50)
    print("OPTIMAL TEAM RESULT:")
    print("=" * 50)
    print(f"Team Size: {team_result.team_size}")
    print(f"Skill Coverage: {team_result.skill_coverage_percentage}%")
    print(f"Complementarity Score: {team_result.complementarity_score:.3f}")
    print("\nSelected Members & Roles:")
    for contrib in team_result.member_contributions:
        print(f"  👤 {contrib.student_name}:")
        print(f"     Covered: {', '.join(contrib.covered_skills) or 'None'}")
        print(f"     Evidence: {'; '.join(contrib.key_evidence_highlights)}")

    print(f"\nCovered Skills: {', '.join(team_result.covered_skills)}")
    print(f"Uncovered Gaps: {', '.join(team_result.uncovered_skills) or 'None (All Covered!)'}")
    print(f"\nSelection Rationale:\n{team_result.selection_rationale}")


if __name__ == "__main__":
    main()
