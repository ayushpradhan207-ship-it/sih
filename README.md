# VeriSkill — Verifiable Skill Passport & Explainable Matching Platform

> **"A resume tells employers what you say you can do. A Skill Passport shows what you have actually demonstrated."**
> 
> *Developed for **SOA IDEATHON 2026** (Selection for Smart India Hackathon 2026)*

---

## 1. Executive Summary & Vision

**VeriSkill** is an AI-powered EdTech and talent mobility platform that transforms verified coursework, capstone projects, competitions, certifications, and GitHub activity into a **portable, tamper-evident Verifiable Skill Passport**. 

It powers an **explainable, bias-aware recommendation engine** that connects students with internships and forms multidisciplinary project teams based on complementary competence rather than unverifiable resume claims.

---

## 2. Core Pillars

| Pillar | Focus | Key Mechanism |
| :--- | :--- | :--- |
| **Pillar A: Verifiable Skill Passport** | Evidence-Backed Skills | Multi-source proof hashes (SHA-256 / W3C VC v1.1 simulation) mapping skills directly to code repositories, academic transcripts, and hackathon awards. |
| **Pillar B: Explainable AI Matching** | "No Score Without Evidence" | Transparent 5-factor mathematical scoring model: `Match = 0.45×Skill + 0.25×Evidence + 0.15×Project + 0.10×Credential + 0.05×Experience`. Identifies exact skill gaps and provides actionable remediation pathways. |
| **Pillar C: Attribute-Blind Ranking** | Bias Mitigation | Explicitly masks candidate demographic attributes (name, photo, gender, age, university prestige tier, geographic location) during candidate ranking. Quantitative Disparate Impact audits (DIR = 0.94 - PASS). |
| **Pillar D: Multidisciplinary Team Builder** | Complementarity Optimizer | Combinatorial algorithm that maximizes multi-role skill coverage (94%) and minimizes redundant overlap for hackathon and project squads. |

---

## 3. Technology Stack

- **Backend / Runtime**: Node.js (REST API, microservice architecture, native crypto)
- **Frontend / Client**: Modern Single Page Application (SPA), Tailwind CSS, FontAwesome 6, Chart.js
- **Data Layer**: Structured JSON ledger with 10 candidate profiles, 5 industry internships, 3 team challenges, and 25+ verified skills.
- **Standards Supported**: W3C Verifiable Credentials v1.1 (JSON-LD export), Open Badges 3.0, IEEE P7003 Algorithmic Bias Considerations.

---

## 4. 3-Minute Hackathon Demo Script (SOA IDEATHON 2026)

Follow the top **Demo Tour Guide** in the UI to walk through the 8 essential steps:

1. **Step 1 — Student Dashboard**: Open Student `#VS-1042` (Aarav Sharma). Show overall **Passport Score (84/100)**, **Evidence Trust Score (87/100)**, 17 verified skills, 26 evidence items.
2. **Step 2 — Verifiable Skill Passport**: Click **Python (94%)** to open the evidence drawer showing 5 independent verified proof artifacts (Placement ML project, BioBERT triage, GitHub commits, CS-402 transcript, Hackathon award).
3. **Step 3 — Internship Matches**: Browse opportunities; observe top match: **Machine Learning Intern (91% Match)**.
4. **Step 4 — Explain Match**: Click **Why 91%?** to view the transparent 5-factor mathematical score breakdown and evidence traces.
5. **Step 5 — Skill Gap Analysis**: Inspect identified gaps (**Docker: Medium**, **AWS: High**) and click **"Improve My Match (Live Simulation)"** to see score jump from 91% to 97%.
6. **Step 6 — Recruiter Attribute-Blind Ranking**: Switch to Recruiter view. Observe `🔒 Attribute-Blind Ranking: ACTIVE` with candidate names masked as `#VS-1042`.
7. **Step 7 — Explain Ranking**: Click **Explain Ranking** to see why Candidate `#VS-1042` ranked #1 purely on verified skill evidence.
8. **Step 8 — Team Builder**: Run the Multidisciplinary Team Builder for the **Smart Healthcare Platform** to see a 6-member squad selected with **94% domain skill coverage**.

---

## 5. Running the Application

### Prerequisites
- Node.js v18+ (tested on Node.js v24)

### Quick Start
```bash
# Navigate to project directory
cd /Users/ayushpradhan/.gemini/antigravity/scratch/veriskill

# Start the server
node server.js
```

Open your browser to: **`http://localhost:3000`**

---

## 6. Prototype vs. Production Disclosure

| Component | Hackathon MVP (Current) | Production Target (SIH 2026) |
| :--- | :--- | :--- |
| **Cryptographic Proofs** | Deterministic SHA-256 hashes & JSON-LD VCs | Polygon ID / Hyperledger Aries DID anchoring |
| **Skill Extraction** | Rule-based AST & NLP entity parser | Fine-tuned CodeLlama / BERT vector embeddings (pgvector) |
| **Academic Records** | Seeded transcript registry | DigiLocker & National Academic Depository (NAD) API |
| **Recruiter Integration** | Built-in Attribute-Blind portal | Greenhouse / Workday ATS webhooks |
| **Fairness Audits** | Simulated EEOC 4/5ths parity calculator | Continuous ML model monitoring & audit pipelines |

---

## 7. License

MIT License — Developed for **SOA IDEATHON 2026 / Smart India Hackathon 2026**.
