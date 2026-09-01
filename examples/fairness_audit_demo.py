"""
Example 3: Post-Ranking Fairness Audit and Four-Fifths Rule Compliance.
"""
import os
import sys

# Ensure repository root is on sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from veriskill import VeriSkillEngine, ProtectedAttributes


def main():
    print("=== VeriSkill Pipeline 6: Fairness & Bias Audit Demo ===")
    engine = VeriSkillEngine()

    # Simulated candidate matching scores for 20 students
    # Demonstrating isolated demographic evaluation
    scores = {}
    protected_data = []

    # Cohort with balanced scoring across groups
    demographics = [
        ("Female", "Hispanic", 0.88),
        ("Female", "Asian", 0.85),
        ("Female", "White", 0.78),
        ("Female", "Black", 0.82),
        ("Male", "Black", 0.79),
        ("Male", "Asian", 0.91),
        ("Male", "White", 0.84),
        ("Male", "Hispanic", 0.76),
        ("Non-Binary", "White", 0.86),
        ("Non-Binary", "Asian", 0.80),
        ("Female", "Black", 0.72),
        ("Male", "White", 0.69),
        ("Female", "Asian", 0.94),
        ("Male", "Hispanic", 0.83),
        ("Female", "White", 0.77),
        ("Male", "Black", 0.85),
        ("Female", "Hispanic", 0.81),
        ("Male", "Asian", 0.74),
        ("Female", "White", 0.89),
        ("Male", "White", 0.62),
    ]

    for idx, (gender, race, score) in enumerate(demographics):
        s_id = f"cand_{idx:03d}"
        scores[s_id] = score
        protected_data.append(
            ProtectedAttributes(
                student_id=s_id,
                gender=gender,
                race_ethnicity=race,
                socioeconomic_status="First-Gen" if idx % 2 == 0 else "Continuing-Gen",
            )
        )

    print(f"Auditing {len(scores)} candidate outcomes with selection threshold = 0.75...")

    report = engine.audit_fairness(
        match_results=scores,
        protected_data=protected_data,
        selection_threshold=0.75,
    )

    print("\n" + engine.format_fairness_report(report))


if __name__ == "__main__":
    main()
