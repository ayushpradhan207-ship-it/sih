"""
Confidence scoring engine for extracted skill candidates.
"""
import re
from typing import Optional
from veriskill.models.enums import ExtractionMethod, EvidenceType


class ConfidenceScorer:
    """
    Computes a transparent confidence score in [0.0, 0.99] for an extracted skill.
    Guarantees that an extracted/inferred skill never receives 1.0 (which is reserved for verified status).
    """

    METHOD_BASE_WEIGHTS = {
        ExtractionMethod.EXACT_DICTIONARY: 0.85,
        ExtractionMethod.SYNONYM_MAPPING: 0.80,
        ExtractionMethod.CONTEXTUAL_REGEX: 0.90,
        ExtractionMethod.PHRASE_CHUNK: 0.70,
        ExtractionMethod.TAXONOMY_INFERENCE: 0.65,
    }

    EVIDENCE_TYPE_WEIGHTS = {
        EvidenceType.CREDENTIAL: 1.15,
        EvidenceType.COURSEWORK: 1.10,
        EvidenceType.EXPERIENCE: 1.08,
        EvidenceType.PROJECT: 1.05,
        EvidenceType.COMPETITION: 1.02,
        EvidenceType.OTHER: 1.00,
    }

    STRONG_CONTEXT_REGEX = re.compile(
        r"\b(architected|built|developed|implemented|led|designed|trained|optimized|certified|honors|advanced|proficient)\b",
        re.IGNORECASE,
    )

    WEAK_CONTEXT_REGEX = re.compile(
        r"\b(familiar|introductory|basic|overview|beginner|assisted|exposed\s+to)\b",
        re.IGNORECASE,
    )

    @classmethod
    def calculate_confidence(
        cls,
        extraction_method: ExtractionMethod,
        frequency: int = 1,
        evidence_type: Optional[EvidenceType] = None,
        context_snippet: str = "",
    ) -> float:
        # Base confidence from extraction method
        base = cls.METHOD_BASE_WEIGHTS.get(extraction_method, 0.75)

        # Source type multiplier
        if evidence_type and evidence_type in cls.EVIDENCE_TYPE_WEIGHTS:
            source_mult = cls.EVIDENCE_TYPE_WEIGHTS[evidence_type]
        else:
            source_mult = 1.0

        # Frequency bonus (diminishing returns)
        freq_bonus = 0.04 * min(frequency - 1, 4) if frequency > 1 else 0.0

        # Contextual polarity
        context_mod = 0.0
        if context_snippet:
            if cls.STRONG_CONTEXT_REGEX.search(context_snippet):
                context_mod += 0.05
            if cls.WEAK_CONTEXT_REGEX.search(context_snippet):
                context_mod -= 0.10

        raw_score = (base * source_mult) + freq_bonus + context_mod

        # Bounds: strictly [0.10, 0.99] — extracted skills are NEVER 1.0
        return max(0.10, min(0.99, raw_score))
