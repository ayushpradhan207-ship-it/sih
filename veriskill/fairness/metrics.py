"""
Fairness and Disparity Statistical Metrics.
"""
from typing import Dict, List, Tuple, Optional
from veriskill.models.fairness import GroupStats, AuditMetric


class FairnessMetricsCalculator:
    """
    Computes statistical parity, disparate impact (4/5ths rule), and distribution metrics.
    """

    MIN_SAMPLE_SIZE_THRESHOLD = 30  # Standard statistical threshold for power

    @classmethod
    def compute_attribute_metrics(
        cls,
        attribute_name: str,
        group_values: Dict[str, str],  # student_id -> group_value
        scores: Dict[str, float],      # student_id -> match_score
        selection_threshold: float,
        privileged_group: Optional[str] = None,
    ) -> AuditMetric:
        # Group candidates
        groups: Dict[str, List[float]] = {}
        for s_id, group in group_values.items():
            if s_id in scores:
                group_clean = str(group).strip()
                if group_clean:
                    groups.setdefault(group_clean, []).append(scores[s_id])

        group_statistics: Dict[str, GroupStats] = {}
        selection_rates: Dict[str, float] = {}

        for group_name, group_scores in groups.items():
            n = len(group_scores)
            selected = sum(1 for s in group_scores if s >= selection_threshold)
            rate = (selected / float(n)) if n > 0 else 0.0
            mean_s = (sum(group_scores) / float(n)) if n > 0 else 0.0

            group_statistics[group_name] = GroupStats(
                group_value=group_name,
                sample_size=n,
                selected_count=selected,
                selection_rate=rate,
                mean_score=mean_s,
            )
            selection_rates[group_name] = rate

        if not group_statistics:
            return AuditMetric(
                protected_attribute=attribute_name,
                privileged_group="N/A",
                unprivileged_group="N/A",
                disparate_impact_ratio=None,
                demographic_parity_diff=0.0,
                four_fifths_compliant=True,
                is_statistically_valid=False,
                notes=["No candidate data available for this attribute."],
            )

        # Identify privileged and unprivileged groups
        if privileged_group and privileged_group in selection_rates:
            priv_group = privileged_group
            # Find group with lowest selection rate other than privileged
            other_groups = [g for g in selection_rates.keys() if g != priv_group]
            unpriv_group = min(other_groups, key=lambda g: selection_rates[g]) if other_groups else priv_group
        else:
            # Highest selection rate group is baseline
            priv_group = max(selection_rates.keys(), key=lambda g: selection_rates[g])
            unpriv_group = min(selection_rates.keys(), key=lambda g: selection_rates[g])

        priv_rate = selection_rates.get(priv_group, 0.0)
        unpriv_rate = selection_rates.get(unpriv_group, 0.0)

        # Disparate Impact Ratio (DIR) = unprivileged_rate / privileged_rate
        if priv_rate > 0:
            dir_ratio = unpriv_rate / priv_rate
        else:
            dir_ratio = 1.0 if unpriv_rate == 0 else None

        # Demographic Parity Difference = |priv_rate - unpriv_rate|
        dpd = abs(priv_rate - unpriv_rate)

        # Four-Fifths (80%) Rule check: DIR >= 0.80
        four_fifths_compliant = (dir_ratio is not None and dir_ratio >= 0.80) or (priv_rate == 0 and unpriv_rate == 0)

        # Statistical validity: check sample sizes
        all_samples_large = all(stats.sample_size >= cls.MIN_SAMPLE_SIZE_THRESHOLD for stats in group_statistics.values())

        notes: List[str] = []
        if not all_samples_large:
            notes.append(
                f"Small sample size warning: One or more subgroups have N < {cls.MIN_SAMPLE_SIZE_THRESHOLD}. "
                "Disparate impact conclusions carry high statistical variance."
            )
        if not four_fifths_compliant and dir_ratio is not None:
            notes.append(
                f"Four-Fifths Rule Violation: Subgroup '{unpriv_group}' selection rate ({unpriv_rate:.1%}) "
                f"is {dir_ratio:.1%} of baseline '{priv_group}' ({priv_rate:.1%}), below the 80% threshold."
            )

        return AuditMetric(
            protected_attribute=attribute_name,
            privileged_group=priv_group,
            unprivileged_group=unpriv_group,
            disparate_impact_ratio=dir_ratio,
            demographic_parity_diff=dpd,
            four_fifths_compliant=four_fifths_compliant,
            is_statistically_valid=all_samples_large,
            group_statistics=group_statistics,
            notes=notes,
        )
