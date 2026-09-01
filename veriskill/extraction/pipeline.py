"""
Unified Skill Extraction Pipeline (Pipeline 1).
"""
from typing import List, Dict, Optional, Union
from veriskill.models.enums import EvidenceType, ExtractionMethod
from veriskill.models.evidence import Evidence
from veriskill.models.skill import SkillCandidate
from veriskill.models.student import StudentProfile
from veriskill.taxonomy.schema import TaxonomyGraph
from veriskill.taxonomy.default_taxonomy import build_default_taxonomy
from veriskill.extraction.cleaner import TextCleaner
from veriskill.extraction.phrase_miner import PhraseMiner
from veriskill.extraction.normalizer import SkillNormalizer
from veriskill.extraction.confidence import ConfidenceScorer


class SkillExtractionPipeline:
    """
    Pipeline 1 — Skill Extraction.

    Input: coursework, project descriptions, credentials, competition descriptions, experience descriptions
    Process: text cleaning -> skill candidate extraction -> skill normalization -> taxonomy mapping -> confidence scoring
    Output: skill, normalized_skill, category, confidence, source_evidence, extraction_method
    """

    def __init__(self, taxonomy: Optional[TaxonomyGraph] = None):
        self.taxonomy = taxonomy or build_default_taxonomy()
        self.cleaner = TextCleaner()
        self.miner = PhraseMiner(self.taxonomy)
        self.normalizer = SkillNormalizer(self.taxonomy)
        self.confidence_scorer = ConfidenceScorer()

    def extract_from_text(
        self,
        text: str,
        evidence_type: EvidenceType = EvidenceType.OTHER,
        evidence_id: str = "",
        evidence_title: str = "",
    ) -> List[SkillCandidate]:
        """
        Executes complete extraction workflow on a text string.
        """
        cleaned_text = self.cleaner.clean_text(text)
        if not cleaned_text:
            return []

        # 1. Candidate Mining
        mined_raw = self.miner.mine_candidates(
            text=cleaned_text,
            source_evidence_text=f"{evidence_title}: {cleaned_text[:100]}" if evidence_title else cleaned_text[:100],
        )

        # 2. Aggregation by canonical skill name
        canonical_map: Dict[str, Dict] = {}

        for raw_mention, canonical, method, base_conf, snippet in mined_raw:
            key = canonical.lower()
            if key not in canonical_map:
                canonical_map[key] = {
                    "raw_mention": raw_mention,
                    "canonical": canonical,
                    "methods": [method],
                    "snippets": [snippet],
                    "frequency": 1,
                }
            else:
                canonical_map[key]["frequency"] += 1
                canonical_map[key]["methods"].append(method)
                if snippet not in canonical_map[key]["snippets"]:
                    canonical_map[key]["snippets"].append(snippet)

        # 3. Normalization, Taxonomy Mapping, and Confidence Scoring
        candidates: List[SkillCandidate] = []
        for key, data in canonical_map.items():
            canonical_name, category = self.normalizer.normalize(data["canonical"])
            best_method = data["methods"][0]
            for m in data["methods"]:
                if m == ExtractionMethod.CONTEXTUAL_REGEX:
                    best_method = m
                    break
                elif m == ExtractionMethod.EXACT_DICTIONARY and best_method != ExtractionMethod.CONTEXTUAL_REGEX:
                    best_method = m

            primary_snippet = data["snippets"][0] if data["snippets"] else cleaned_text[:120]
            confidence = self.confidence_scorer.calculate_confidence(
                extraction_method=best_method,
                frequency=data["frequency"],
                evidence_type=evidence_type,
                context_snippet=primary_snippet,
            )

            candidate = SkillCandidate(
                skill=data["raw_mention"],
                normalized_skill=canonical_name,
                category=category,
                confidence=confidence,
                source_evidence=primary_snippet,
                extraction_method=best_method.value if isinstance(best_method, ExtractionMethod) else str(best_method),
                source_evidence_id=evidence_id,
                evidence_type=evidence_type,
                frequency=data["frequency"],
            )
            candidates.append(candidate)

        # Sort by confidence descending
        candidates.sort(key=lambda c: c.confidence, reverse=True)
        return candidates

    def extract_from_evidence(self, evidence: Evidence) -> List[SkillCandidate]:
        """
        Extracts candidates from a structured Evidence object.
        """
        full_text = f"{evidence.title}\n{evidence.description}"
        return self.extract_from_text(
            text=full_text,
            evidence_type=evidence.evidence_type,
            evidence_id=evidence.id,
            evidence_title=evidence.title,
        )

    def extract_from_student(self, student: StudentProfile) -> List[SkillCandidate]:
        """
        Extracts candidates from all evidence items in a StudentProfile,
        deduplicating and aggregating evidence links across items.
        """
        all_candidates: List[SkillCandidate] = []
        for evidence in student.evidence_items:
            candidates = self.extract_from_evidence(evidence)
            all_candidates.extend(candidates)

        # Merge duplicates across different evidence sources
        merged: Dict[str, SkillCandidate] = {}
        for c in all_candidates:
            key = c.normalized_skill.lower()
            if key not in merged:
                merged[key] = c
            else:
                existing = merged[key]
                existing.frequency += c.frequency
                # Upgraded snippet if higher confidence
                if c.confidence > existing.confidence:
                    existing.confidence = c.confidence
                    existing.source_evidence = c.source_evidence
                    existing.source_evidence_id = c.source_evidence_id
                    existing.extraction_method = c.extraction_method
                    existing.evidence_type = c.evidence_type
                else:
                    # Give multi-source boost
                    existing.confidence = min(0.99, existing.confidence + 0.03)

        result = list(merged.values())
        result.sort(key=lambda c: c.confidence, reverse=True)
        student.extracted_candidates = result
        return result
