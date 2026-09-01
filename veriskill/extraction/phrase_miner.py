"""
Phrase miner and candidate skill pattern extractor.
"""
import re
from typing import List, Tuple, Dict, Any, Optional
from veriskill.models.enums import ExtractionMethod
from veriskill.taxonomy.schema import TaxonomyGraph


class PhraseMiner:
    """
    Mines potential skill mentions from cleaned text using:
    1. Contextual regex patterns ("proficient in X", "built using Y", "coursework in Z", etc.)
    2. Taxonomy dictionary and alias scanning
    3. N-gram phrase scanning
    """

    CONTEXTUAL_PATTERNS = [
        # Action/Tool patterns: "built/implemented/developed ... using/in X"
        (
            re.compile(
                r"(?:built|implemented|developed|designed|architected|trained|deployed|engineered|coded|programmed)\s+(?:a|an|the|various)?\s*(?:[\w\s]{0,40}?)\s+(?:using|in|with|via)\s+([A-Za-z0-9+#.\s\-_/]+?)(?=[,.;\n]|$)",
                re.IGNORECASE,
            ),
            ExtractionMethod.CONTEXTUAL_REGEX,
            0.90,
        ),
        # Tech stack declarations: "Tech stack: X, Y, Z" or "Technologies: X, Y"
        (
            re.compile(
                r"(?:tech(?:nology)?\s+stack|technologies|tools|skills|languages|frameworks)\s*:\s*([A-Za-z0-9+#.\s\-_/,|]+?)(?=[.;\n]|$)",
                re.IGNORECASE,
            ),
            ExtractionMethod.CONTEXTUAL_REGEX,
            0.92,
        ),
        # Proficiency statements: "Proficient in / skilled in / experience with X"
        (
            re.compile(
                r"(?:proficient\s+in|skilled\s+in|experience\s+with|working\s+knowledge\s+of|hands-on\s+with|expertise\s+in)\s+([A-Za-z0-9+#.\s\-_/,]+?)(?=[.;\n]|$)",
                re.IGNORECASE,
            ),
            ExtractionMethod.CONTEXTUAL_REGEX,
            0.88,
        ),
        # Coursework patterns: "Coursework in / Coursework includes: X, Y"
        (
            re.compile(
                r"(?:coursework(?:\s+in|\s+includes|\s+covered)?|classes\s+in|courses\s+in|studied)\s*[:\s]+([A-Za-z0-9+#.\s\-_/,|]+?)(?=[.;\n]|$)",
                re.IGNORECASE,
            ),
            ExtractionMethod.CONTEXTUAL_REGEX,
            0.88,
        ),
        # Certification patterns: "Certified in X" / "Certification in X"
        (
            re.compile(
                r"(?:certified(?:\s+in|\s+as)?|certification\s+in|certificate\s+in)\s+([A-Za-z0-9+#.\s\-_/]+?)(?=[,.;\n]|$)",
                re.IGNORECASE,
            ),
            ExtractionMethod.CONTEXTUAL_REGEX,
            0.95,
        ),
    ]

    def __init__(self, taxonomy: TaxonomyGraph):
        self.taxonomy = taxonomy
        self._build_keyword_matchers()

    def _build_keyword_matchers(self):
        """Build regex lookups for all canonical names and aliases in the taxonomy."""
        alias_map = self.taxonomy.get_alias_map()
        # Sort terms by length descending to match longest phrases first (e.g. "Natural Language Processing" before "Processing")
        sorted_terms = sorted(alias_map.keys(), key=lambda t: len(t), reverse=True)

        self._term_patterns: List[Tuple[str, str, re.Pattern]] = []
        for term in sorted_terms:
            canonical = alias_map[term]
            # Escape regex special chars in term (e.g., C++, .NET)
            escaped = re.escape(term)
            # Match with word boundaries unless term has special ending like ++ or #
            if term.endswith("++") or term.endswith("#"):
                pattern = re.compile(rf"(?:\b|^){escaped}(?:\b|$|\s|[,\.;])", re.IGNORECASE)
            elif term.startswith("."):
                pattern = re.compile(rf"(?:\b|\s|^){escaped}(?:\b|$|\s|[,\.;])", re.IGNORECASE)
            else:
                pattern = re.compile(rf"\b{escaped}\b", re.IGNORECASE)
            self._term_patterns.append((term, canonical, pattern))

    def mine_candidates(
        self, text: str, source_evidence_text: str = ""
    ) -> List[Tuple[str, str, ExtractionMethod, float, str]]:
        """
        Extracts raw candidates from text.
        Returns tuples: (raw_mention, canonical_name, method, base_confidence, snippet)
        """
        results: List[Tuple[str, str, ExtractionMethod, float, str]] = []
        seen_canonical: set = set()

        # 1. Contextual Pattern Mining
        for pattern, method, base_conf in self.CONTEXTUAL_PATTERNS:
            for match in pattern.finditer(text):
                extracted_group = match.group(1).strip()
                snippet = match.group(0).strip()
                # Split comma-separated items inside captured group
                items = [item.strip() for item in re.split(r"[,/|&]+", extracted_group) if item.strip()]
                for item in items:
                    # Clean punctuation
                    clean_item = item.strip(" .()[]\"'")
                    if not clean_item or len(clean_item) < 2:
                        continue
                    canonical = self.taxonomy.normalize_skill_name(clean_item)
                    if canonical:
                        results.append((clean_item, canonical, method, base_conf, snippet or source_evidence_text))
                        seen_canonical.add(canonical.lower())

        # 2. Taxonomy Dictionary & Alias Scanning
        for term, canonical, pattern in self._term_patterns:
            for match in pattern.finditer(text):
                start, end = match.span()
                # Create a local sentence snippet
                snippet_start = max(0, start - 30)
                snippet_end = min(len(text), end + 30)
                local_snippet = text[snippet_start:snippet_end].strip()

                raw_mention = match.group(0).strip(" ,.;:")
                method = ExtractionMethod.EXACT_DICTIONARY if term.lower() == canonical.lower() else ExtractionMethod.SYNONYM_MAPPING
                base_conf = 0.85 if method == ExtractionMethod.EXACT_DICTIONARY else 0.80

                results.append((raw_mention, canonical, method, base_conf, local_snippet or source_evidence_text))
                seen_canonical.add(canonical.lower())

        return results
