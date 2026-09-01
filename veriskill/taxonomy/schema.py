"""
Hierarchical Skill Taxonomy Schema and Graph.
"""
from dataclasses import dataclass, field
from typing import Dict, List, Optional, Set
from veriskill.models.enums import SkillCategory


@dataclass
class TaxonomyNode:
    """
    Node in the skill taxonomy graph.
    """
    canonical_name: str
    category: SkillCategory
    aliases: List[str] = field(default_factory=list)
    parents: List[str] = field(default_factory=list)
    children: List[str] = field(default_factory=list)
    related: List[str] = field(default_factory=list)
    description: str = ""

    def get_all_forms(self) -> Set[str]:
        forms = {self.canonical_name.lower()}
        for a in self.aliases:
            forms.add(a.lower())
        return forms


class TaxonomyGraph:
    """
    Graph representing the hierarchical skill taxonomy.
    Supports canonical resolution, alias normalization, and category lookup.
    """
    def __init__(self):
        self._nodes: Dict[str, TaxonomyNode] = {}
        self._alias_map: Dict[str, str] = {}  # lowercase alias -> canonical_name

    def add_node(self, node: TaxonomyNode) -> None:
        key = node.canonical_name.lower()
        self._nodes[key] = node
        self._alias_map[key] = node.canonical_name
        for alias in node.aliases:
            self._alias_map[alias.lower()] = node.canonical_name

    def get_node(self, name: str) -> Optional[TaxonomyNode]:
        canonical = self.normalize_skill_name(name)
        if canonical:
            return self._nodes.get(canonical.lower())
        return self._nodes.get(name.lower())

    def normalize_skill_name(self, name: str) -> Optional[str]:
        """Returns canonical name for an alias or exact name, or None if unknown."""
        clean = name.strip().lower()
        return self._alias_map.get(clean)

    def get_category(self, name: str) -> str:
        """Returns category for a skill name or alias."""
        node = self.get_node(name)
        if node:
            return node.category.value if isinstance(node.category, SkillCategory) else str(node.category)
        return SkillCategory.OTHER.value

    def are_related(self, skill_a: str, skill_b: str) -> bool:
        """Check if two skills are direct ancestors/descendants or related in taxonomy."""
        norm_a = self.normalize_skill_name(skill_a) or skill_a
        norm_b = self.normalize_skill_name(skill_b) or skill_b
        if norm_a.lower() == norm_b.lower():
            return True

        node_a = self.get_node(norm_a)
        node_b = self.get_node(norm_b)
        if not node_a or not node_b:
            return False

        # Check parents, children, related
        norm_b_lower = norm_b.lower()
        norm_a_lower = norm_a.lower()

        if any(p.lower() == norm_b_lower for p in node_a.parents):
            return True
        if any(c.lower() == norm_b_lower for c in node_a.children):
            return True
        if any(r.lower() == norm_b_lower for r in node_a.related):
            return True

        if any(p.lower() == norm_a_lower for p in node_b.parents):
            return True
        if any(c.lower() == norm_a_lower for c in node_b.children):
            return True

        # Check if they share the same immediate parent
        parents_a = {p.lower() for p in node_a.parents}
        parents_b = {p.lower() for p in node_b.parents}
        if parents_a and parents_b and (parents_a & parents_b):
            return True

        return False

    def get_all_canonical_names(self) -> List[str]:
        return [node.canonical_name for node in self._nodes.values()]

    def get_alias_map(self) -> Dict[str, str]:
        return dict(self._alias_map)
