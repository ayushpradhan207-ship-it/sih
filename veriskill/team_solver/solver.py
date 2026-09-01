"""
Combinatorial and Heuristic Team Optimization Solvers.
"""
import itertools
from typing import List, Tuple, Dict, Set
from veriskill.models.student import StudentProfile
from veriskill.models.skill import RequiredSkill
from veriskill.team_solver.objective import TeamObjectiveEvaluator


class TeamSolver:
    """
    Finds the optimal team subset of size K from a pool of students.
    """

    def __init__(self, evaluator: TeamObjectiveEvaluator):
        self.evaluator = evaluator

    def solve(
        self,
        student_pool: List[StudentProfile],
        required_skills: List[RequiredSkill],
        team_size: int,
    ) -> Tuple[List[StudentProfile], float, float, float, Dict[str, Set[str]]]:
        """
        Finds best team subset.
        Returns:
            (best_team, best_fitness, coverage_rate, complementarity, member_skill_map)
        """
        if not student_pool:
            return [], 0.0, 0.0, 0.0, {}

        k = min(team_size, len(student_pool))
        if k <= 0:
            return [], 0.0, 0.0, 0.0, {}

        # Exact combinatorial search for moderate pool sizes
        if len(student_pool) <= 22 or self._combination_count(len(student_pool), k) <= 30000:
            return self._exact_solve(student_pool, required_skills, k)
        else:
            return self._heuristic_solve(student_pool, required_skills, k)

    @staticmethod
    def _combination_count(n: int, k: int) -> int:
        import math
        try:
            return math.comb(n, k)
        except AttributeError:
            return math.factorial(n) // (math.factorial(k) * math.factorial(n - k))

    def _exact_solve(
        self,
        pool: List[StudentProfile],
        required_skills: List[RequiredSkill],
        k: int,
    ) -> Tuple[List[StudentProfile], float, float, float, Dict[str, Set[str]]]:
        best_team = None
        best_fitness = -1.0
        best_cov = 0.0
        best_comp = 0.0
        best_map = {}

        for team_candidate in itertools.combinations(pool, k):
            team_list = list(team_candidate)
            fitness, cov, comp, prof, m_map = self.evaluator.evaluate_team(team_list, required_skills)
            if fitness > best_fitness:
                best_fitness = fitness
                best_team = team_list
                best_cov = cov
                best_comp = comp
                best_map = m_map

        return (best_team or pool[:k]), best_fitness, best_cov, best_comp, best_map

    def _heuristic_solve(
        self,
        pool: List[StudentProfile],
        required_skills: List[RequiredSkill],
        k: int,
    ) -> Tuple[List[StudentProfile], float, float, float, Dict[str, Set[str]]]:
        """
        Greedy marginal coverage selection + 2-opt local search swap optimization.
        """
        selected: List[StudentProfile] = []
        remaining = list(pool)

        # 1. Greedy construction
        while len(selected) < k and remaining:
            best_addition = None
            best_marginal_fitness = -1.0

            for candidate in remaining:
                trial = selected + [candidate]
                fit, _, _, _, _ = self.evaluator.evaluate_team(trial, required_skills)
                if fit > best_marginal_fitness:
                    best_marginal_fitness = fit
                    best_addition = candidate

            if best_addition:
                selected.append(best_addition)
                remaining.remove(best_addition)
            else:
                selected.append(remaining.pop(0))

        # 2. Local search swap (2-opt)
        improved = True
        iterations = 0
        max_iter = 20

        while improved and iterations < max_iter:
            improved = False
            iterations += 1
            current_fitness, _, _, _, _ = self.evaluator.evaluate_team(selected, required_skills)

            for i in range(len(selected)):
                for candidate in remaining:
                    trial = list(selected)
                    trial[i] = candidate
                    fit, _, _, _, _ = self.evaluator.evaluate_team(trial, required_skills)
                    if fit > current_fitness + 1e-4:
                        remaining.append(selected[i])
                        remaining.remove(candidate)
                        selected[i] = candidate
                        improved = True
                        break
                if improved:
                    break

        fit, cov, comp, prof, m_map = self.evaluator.evaluate_team(selected, required_skills)
        return selected, fit, cov, comp, m_map
