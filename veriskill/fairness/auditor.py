"""
Fairness and Bias Auditor (Pipeline 6).
"""
from typing import List, Dict, Optional, Union
from veriskill.models.student import ProtectedAttributes
from veriskill.models.match import MatchResult
from veriskill.models.fairness import FairnessAuditReport, AuditMetric
from veriskill.fairness.metrics import FairnessMetricsCalculator


class FairnessAuditor:
    """
    Pipeline 6 — Fairness & Bias Audit Engine.

    Rule: Protected attributes MUST remain completely isolated from the ranking/matching pipeline.
    This auditor inspects outcome distributions post-hoc without altering ranking scores.
    """

    def __init__(self, default_selection_threshold: float = 0.70):
        self.default_selection_threshold = default_selection_threshold

    def audit_outcomes(
        self,
        match_results: Union[List[MatchResult], Dict[str, float]],
        protected_data: List[ProtectedAttributes],
        selection_threshold: Optional[float] = None,
        privileged_baselines: Optional[Dict[str, str]] = None,
    ) -> FairnessAuditReport:
        """
        Conducts comprehensive fairness audit across all provided protected demographic attributes.
        """
        threshold = selection_threshold if selection_threshold is not None else self.default_selection_threshold
        baselines = privileged_baselines or {}

        # Extract scores dict
        scores: Dict[str, float] = {}
        if isinstance(match_results, list):
            for res in match_results:
                scores[res.student_id] = res.overall_score
        else:
            scores = dict(match_results)

        total_evaluated = len(scores)

        # Map protected attributes by student ID
        attr_maps: Dict[str, Dict[str, str]] = {
            "gender": {},
            "race_ethnicity": {},
            "age_group": {},
            "disability_status": {},
            "socioeconomic_status": {},
            "veteran_status": {},
        }

        # Also capture any custom attributes
        for p in protected_data:
            s_id = p.student_id
            if p.gender:
                attr_maps["gender"][s_id] = p.gender
            if p.race_ethnicity:
                attr_maps["race_ethnicity"][s_id] = p.race_ethnicity
            if p.age_group:
                attr_maps["age_group"][s_id] = p.age_group
            if p.disability_status:
                attr_maps["disability_status"][s_id] = p.disability_status
            if p.socioeconomic_status:
                attr_maps["socioeconomic_status"][s_id] = p.socioeconomic_status
            if p.veteran_status:
                attr_maps["veteran_status"][s_id] = p.veteran_status
            for k, v in p.additional_attributes.items():
                if k not in attr_maps:
                    attr_maps[k] = {}
                if v:
                    attr_maps[k][s_id] = str(v)

        metrics: List[AuditMetric] = []
        sample_sizes: Dict[str, Dict[str, int]] = {}
        potential_disparities: List[str] = []
        warnings: List[str] = []
        is_overall_passed = True

        for attr_name, s_map in attr_maps.items():
            if not s_map:
                continue

            metric = FairnessMetricsCalculator.compute_attribute_metrics(
                attribute_name=attr_name,
                group_values=s_map,
                scores=scores,
                selection_threshold=threshold,
                privileged_group=baselines.get(attr_name),
            )
            metrics.append(metric)

            # Record sample sizes
            sample_sizes[attr_name] = {k: v.sample_size for k, v in metric.group_statistics.items()}

            # Check 4/5ths rule compliance
            if not metric.four_fifths_compliant:
                is_overall_passed = False
                disparity_msg = (
                    f"Disparity detected in '{attr_name}': Disparate Impact Ratio is {metric.disparate_impact_ratio:.2f} "
                    f"(below 0.80 benchmark) comparing '{metric.unprivileged_group}' against '{metric.privileged_group}'."
                )
                potential_disparities.append(disparity_msg)

            # Check statistical validity
            if not metric.is_statistically_valid:
                warning_msg = (
                    f"Low sample size warning for '{attr_name}': At least one subgroup has fewer than "
                    f"{FairnessMetricsCalculator.MIN_SAMPLE_SIZE_THRESHOLD} candidates."
                )
                warnings.append(warning_msg)

        # Systemic Limitations
        limitations = [
            "Audit reflects historical evidence distributions and does not capture unrepresented extracurriculars.",
            "Fairness metrics assume candidate pool represents a non-adversarial population.",
            "Selection threshold is fixed for audit purposes; varying cutoff points may alter disparate impact ratios.",
            "Small sample sizes (< 30) reduce statistical power and increase confidence interval width.",
        ]

        return FairnessAuditReport(
            total_candidates=total_evaluated,
            selection_threshold=threshold,
            metrics=metrics,
            sample_size_by_group=sample_sizes,
            potential_disparities=potential_disparities,
            warnings=warnings,
            limitations=limitations,
            is_audit_passed=is_overall_passed,
        )
