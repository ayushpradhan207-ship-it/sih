"""
Team Optimization Objective Functions.
Evaluates team skill coverage, complementarity, and competence.
"""
from typing import List, Set, Dict, Tuple
from veriskill.models.student import StudentProfile
from veriskill.models.skill import RequiredSkill
from veriskill.taxonomy.schema import TaxonomyGraph


class TeamObjectiveEvaluator:
    """
    Computes fitness score for a candidate team of students.
    """

    def __init__(self, taxonomy: TaxonomyGraph):
        self.taxonomy = taxonomy

    def evaluate_team(
        self,
        team: List[StudentProfile],
        required_skills: List[RequiredSkill],
    ) -> Tuple[float, float, float, float, Dict[str, Set[str]]]:
        """
        Evaluates a candidate team against required skills.
        Returns:
            (composite_fitness, coverage_rate, complementarity_score, competence_score, member_skill_map)
        """
        if not team or not required_skills:
            return 0.0, 0.0, 0.0, 0.0, {}

        req_set = {
            (self.taxonomy.normalize_skill_name(r.name) or r.name).lower(): r
            for r in required_skills
        }
        total_req_count = len(req_set)

        # Map each member to their verified skills that match required skills
        member_skill_map: Dict[str, Set[str]] = {}
        all_covered_skills: Set[str] = set()
        skill_coverage_counts: Dict[str, int] = {k: 0 for k in req_set}
        total_proficiency = 0.0
        covered_instances = 0

        for member in team:
            member_covered = set()
            for v_skill in member.get_verified_skills():
                norm = v_skill.normalized_skill.lower()
                # Direct match
                if norm in req_set:
                    member_covered.add(req_set[norm].name)
                    all_covered_skills.add(norm)
                    skill_coverage_counts[norm] += 1
                    total_proficiency += v_skill.proficiency_level
                    covered_instances += 1
                else:
                    # Related match
                    for req_key, req_obj in req_set.items():
                        if self.taxonomy.are_related(norm, req_key):
                            member_covered.add(req_obj.name)
                            all_covered_skills.add(req_key)
                            skill_coverage_counts[req_key] += 1
                            total_proficiency += v_skill.proficiency_level * 0.85
                            covered_instances += 1
                            break

            member_skill_map[member.id] = member_covered

        # 1. Coverage Rate (0.0 to 1.0)
        coverage_rate = len(all_covered_skills) / float(total_req_count) if total_req_count > 0 else 0.0

        # 2. Skill Complementarity
        # Rewards members contributing unique or needed skills rather than purely redundant duplicates
        unique_contributors = sum(1 for m_id, skills in member_skill_map.items() if len(skills) > 0)
        distribution_balance = unique_contributors / float(len(team)) if team else 0.0

        # Measure lack of skill bottleneck (penalize extreme variance in coverage per skill)
        covered_req_counts = [cnt for cnt in skill_coverage_counts.values() if cnt > 0]
        if covered_req_counts:
            avg_overlap = sum(covered_req_counts) / float(len(covered_req_counts))
            # Ideal overlap is ~1-2 members per skill
            overlap_efficiency = 1.0 / (1.0 + max(0.0, avg_overlap - 1.5))
        else:
            overlap_efficiency = 0.0

        complementarity_score = 0.6 * distribution_balance + 0.4 * overlap_efficiency

        # 3. Competence Score
        avg_competence = (total_proficiency / float(covered_instances)) if covered_instances > 0 else 0.0

        # Composite Fitness
        composite_fitness = 0.55 * coverage_rate + 0.25 * complementarity_score + 0.20 * avg_competence
        return composite_fitness, coverage_rate, complementarity_score, avg_competence, member_skill_map
