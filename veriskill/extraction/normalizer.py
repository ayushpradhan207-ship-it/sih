"""
Skill normalization and taxonomy mapper.
"""
from typing import Tuple, Optional
from veriskill.models.enums import SkillCategory
from veriskill.taxonomy.schema import TaxonomyGraph


class SkillNormalizer:
    """
    Normalizes candidate skills against the canonical taxonomy graph,
    resolves synonyms, and maps to the appropriate hierarchical category.
    """

    def __init__(self, taxonomy: TaxonomyGraph):
        self.taxonomy = taxonomy

    def normalize(self, skill_name: str) -> Tuple[str, str]:
        """
        Normalizes a raw skill name into (canonical_name, category).
        If unknown in taxonomy, returns (cleaned_title_case_name, "Other").
        """
        clean = skill_name.strip()
        canonical = self.taxonomy.normalize_skill_name(clean)
        if canonical:
            category = self.taxonomy.get_category(canonical)
            return canonical, category

        # Fallback: clean capitalization
        canonical = clean.title() if len(clean) > 3 else clean.upper()
        return canonical, SkillCategory.OTHER.value

    def get_category(self, normalized_name: str) -> str:
        return self.taxonomy.get_category(normalized_name)
