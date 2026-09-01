# VeriSkill AI/ML Engine

**VeriSkill** is a modular, transparent, and reproducible Python engine designed to convert multi-source student evidence (coursework, projects, credentials, competitions, experience) into verified structured skills, compute explainable match scores against opportunity requirements, generate structured narratives, solve optimal team compositions with skill complementarity, and conduct independent post-ranking fairness and bias audits.

---

## Key Principles & Guarantees

1. **Zero False-Verification Invariant**: The engine strictly forbids assuming an inferred/extracted skill is verified. All skills start in `EXTRACTED` or `PENDING_VERIFICATION` states and require explicit verification criteria/artifacts before transitioning to `VERIFIED`.
2. **Deterministic & Explainable Matching**: Every match score is calculated with explicit mathematical traces across 5 components: *Skill Coverage*, *Semantic Similarity*, *Evidence Strength*, *Experience Relevance*, and *Project Relevance*.
3. **Evidence Traceability (Provenance)**: Every matched requirement is linked directly to supporting evidence IDs, repository links, transcript records, and verification rules.
4. **Strict Fairness Isolation**: Protected demographic attributes (gender, race/ethnicity, age, disability, socioeconomic status) are quarantined from the extraction, matching, and team solver pipelines. They are passed only to the isolated post-hoc `FairnessAuditor`.
5. **Zero External Dependency Ready**: Standard library first design (pure Python TF-IDF vectorizer, cosine similarity, combinatorial team solver, and fairness metrics), ensuring 100% reproducible and frictionless execution anywhere.

---

## Architecture Overview

```
veriskill/
├── veriskill/
│   ├── models/             # Domain data models & enums
│   ├── taxonomy/           # Hierarchical skill graph & canonical normalization
│   ├── extraction/         # PIPELINE 1: Text cleaning & skill extraction
│   ├── verification/       # PIPELINE 2: Multi-tier verification & state machine
│   ├── matching/           # PIPELINE 3: Explainable multi-factor matching
│   ├── explanation/        # PIPELINE 4: Structured explanation & provenance graph
│   ├── team_solver/        # PIPELINE 5: Combinatorial coverage & complementarity solver
│   ├── fairness/           # PIPELINE 6: Four-fifths rule & demographic parity audit
│   ├── engine.py           # Unified VeriSkillEngine facade API
│   └── cli.py              # CLI runner & interactive demo
├── tests/                  # 25+ comprehensive test cases across all pipelines
└── examples/               # Complete usage walkthroughs
```

---

## The 6 Core Pipelines

### Pipeline 1 — Skill Extraction
- **Input**: Coursework syllabi, project descriptions, credential certificates, competition records, experience logs.
- **Process**:
  $$\text{Text Cleaning} \longrightarrow \text{Phrase Mining} \longrightarrow \text{Canonical Normalization} \longrightarrow \text{Taxonomy Mapping} \longrightarrow \text{Confidence Scoring}$$
- **Output**: `SkillCandidate` with:
  - `skill`: Raw text mention
  - `normalized_skill`: Canonical taxonomy name
  - `category`: Taxonomy domain category
  - `confidence`: Calibrated score in $[0.10, 0.99]$ (Never $1.0$ until verified!)
  - `source_evidence`: Contextual snippet
  - `extraction_method`: `exact_dictionary`, `synonym_mapping`, `contextual_regex`, or `phrase_chunk`

### Pipeline 2 — Skill Verification
- **Explicit 4-State Machine**:
  $$\text{EXTRACTED} \longrightarrow \text{PENDING\_VERIFICATION} \longrightarrow \begin{cases} \text{VERIFIED} & \text{(artifact checks pass)} \\ \text{REJECTED} & \text{(insufficient / invalid)} \end{cases}$$
- **Rule Evaluators**:
  - `CredentialRule`: Certificate verification URI/ID and accredited issuer.
  - `CourseworkRule`: Official transcript match with passing grade threshold ($\ge \text{B} / 3.0$).
  - `ProjectArtifactRule`: Public repository URL (GitHub/GitLab), runnable demo, or commit history.
  - `CompetitionRule`: Leaderboard URL or organizer verification.
  - `ExperienceRule`: Employment record and employer verification.
  - `MultiSourceTriangulation`: Corroborates multiple independent sources to boost proficiency.

### Pipeline 3 — Explainable Matching
- Compares verified student skills against opportunity requirements.
- **Composite Score Formula**:
  $$\text{MatchScore} = w_{\text{cov}} S_{\text{cov}} + w_{\text{sem}} S_{\text{sem}} + w_{\text{evi}} S_{\text{evi}} + w_{\text{exp}} S_{\text{exp}} + w_{\text{proj}} S_{\text{proj}}$$
  *(Default weights: $0.40, 0.20, 0.15, 0.15, 0.10$)*
- **Component Breakdown**:
  - **Skill Coverage ($S_{\text{cov}}$)**: Weighted fraction of mandatory and preferred skills verified.
  - **Semantic Similarity ($S_{\text{sem}}$)**: TF-IDF vector space cosine similarity between candidate profile and opportunity description.
  - **Evidence Strength ($S_{\text{evi}}$)**: Depth, recency, and triangulation of verified evidence.
  - **Experience Relevance ($S_{\text{exp}}$)**: Professional and academic experience alignment.
  - **Project Relevance ($S_{\text{proj}}$)**: Hands-on project portfolio alignment.

### Pipeline 4 — Structured Explanation
Generates standardized, structured explanations:
```
MATCH SCORE: 87%

Matched:
Python
Machine Learning
SQL

Strong evidence:
Machine Learning project (Project)
Python coursework (Coursework)

Missing:
Docker

Explanation:

"The candidate matches most required technical skills and has verified project evidence demonstrating practical experience."
```

### Pipeline 5 — Team Optimization Solver
Given a pool of candidates $\mathcal{P}$, required skills $\mathcal{R}$, and target team size $K$:
$$\max_{T \subseteq \mathcal{P}, |T|=K} \Big( 0.55 \cdot \text{Coverage}(T) + 0.25 \cdot \text{Complementarity}(T) + 0.20 \cdot \text{Competence}(T) \Big)$$
- Evaluates exact combinations for $N \le 22$ and greedy local search with 2-opt swaps for large candidate pools.
- Returns: Selected team members, aggregate skill coverage %, covered skills, uncovered skills, and detailed selection rationale.

### Pipeline 6 — Fairness & Bias Audit
- Analyzes candidate outcomes post-hoc on protected demographic groups (Gender, Race/Ethnicity, Age, Disability, Socioeconomic status).
- **Metrics**:
  - **Selection Rate**: $\text{SR}_g = \frac{\text{Selected}_g}{N_g}$
  - **Disparate Impact Ratio (DIR)**: $\text{DIR} = \frac{\text{SR}_{\text{unprivileged}}}{\text{SR}_{\text{privileged}}}$
  - **Four-Fifths Rule (80% Rule)**: Flags violation if $\text{DIR} < 0.80$.
  - **Demographic Parity Difference**: $|\text{SR}_A - \text{SR}_B|$.
  - **Sample Size Warning**: Flags when subgroup $N < 30$.
  - **Actionable Warnings & Methodological Limitations**.

---

## Quickstart

### 1. Installation
```bash
git clone <repo-url>
cd veriskill
pip install -e .
```

### 2. Run Interactive Demo
```bash
python3 -m veriskill.cli demo
```

### 3. Run Test Suite
```bash
python3 -m unittest discover -s tests -p "test_*.py" -v
```

### 4. Basic Python Example
```python
from veriskill import (
    VeriSkillEngine,
    StudentProfile,
    OpportunityRequirement,
    Evidence,
    EvidenceType,
    RequiredSkill,
)

engine = VeriSkillEngine()

# Ingest student profile
student = StudentProfile(id="stu_01", name="Maya Lin")
student.add_evidence(
    Evidence(
        id="ev_01",
        evidence_type=EvidenceType.COURSEWORK,
        title="CS 229: Machine Learning",
        description="Completed coursework in Python, PyTorch, and optimization.",
        grade_or_score="A",
        artifact_uri_or_id="transcript_verified",
        is_externally_validated=True,
    )
)

# Process student (Extraction + Verification)
engine.process_student(student)

# Define opportunity
opportunity = OpportunityRequirement(
    id="opp_ml",
    title="ML Intern",
    description="Machine learning role in Python and PyTorch.",
    required_skills=[
        RequiredSkill(name="Python", normalized_name="Python", is_mandatory=True),
        RequiredSkill(name="Machine Learning", normalized_name="Machine Learning", is_mandatory=True),
        RequiredSkill(name="Docker", normalized_name="Docker", is_mandatory=True),
    ],
)

# Match & Explain
match_result = engine.match(student, opportunity)
print(engine.explain_match(match_result))
```

---

## License
Apache-2.0
