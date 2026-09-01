"""
Taxonomy package for skill hierarchy and canonical normalization.
"""
from veriskill.taxonomy.schema import TaxonomyNode, TaxonomyGraph
from veriskill.taxonomy.default_taxonomy import build_default_taxonomy

__all__ = ["TaxonomyNode", "TaxonomyGraph", "build_default_taxonomy"]
