"""
Fairness Report Generator and Formatter.
"""
from veriskill.models.fairness import FairnessAuditReport


class FairnessReporter:
    """
    Renders structured audit summaries, tabular breakdowns, warnings, and limitations.
    """

    @classmethod
    def format_text_report(cls, report: FairnessAuditReport) -> str:
        lines = []
        lines.append("=" * 60)
        lines.append("VERISKILL FAIRNESS & BIAS AUDIT REPORT")
        lines.append("=" * 60)
        lines.append(f"Total Candidates Evaluated: {report.total_candidates}")
        lines.append(f"Selection Cutoff Threshold: {report.selection_threshold:.2f}")
        status_label = "PASSED (4/5ths Compliant)" if report.is_audit_passed else "DISPARITY WARNING (Action Recommended)"
        lines.append(f"Overall Audit Status:       {status_label}")
        lines.append("")

        lines.append("--- PROTECTED ATTRIBUTE METRICS ---")
        for metric in report.metrics:
            lines.append(f"Attribute: {metric.protected_attribute}")
            lines.append(f"  Privileged Group:   {metric.privileged_group}")
            lines.append(f"  Unprivileged Group: {metric.unprivileged_group}")
            dir_str = f"{metric.disparate_impact_ratio:.2f}" if metric.disparate_impact_ratio is not None else "N/A"
            lines.append(f"  Disparate Impact:   {dir_str} (Benchmark: >= 0.80)")
            lines.append(f"  4/5ths Compliant:   {'YES' if metric.four_fifths_compliant else 'NO (VIOLATION)'}")
            lines.append(f"  Demographic Parity Diff: {metric.demographic_parity_diff:.4f}")
            lines.append("  Subgroup Breakdown:")
            for g_val, stats in metric.group_statistics.items():
                lines.append(
                    f"    - {g_val:<15}: N={stats.sample_size:<4} | Selected={stats.selected_count:<3} | "
                    f"Rate={stats.selection_rate:.1%} | Mean Score={stats.mean_score:.3f}"
                )
            lines.append("")

        lines.append("--- POTENTIAL DISPARITIES ---")
        if report.potential_disparities:
            for d in report.potential_disparities:
                lines.append(f"[!] {d}")
        else:
            lines.append("[✓] No adverse impact disparities detected across audited demographic groups.")
        lines.append("")

        lines.append("--- WARNINGS ---")
        if report.warnings:
            for w in report.warnings:
                lines.append(f"[WARN] {w}")
        else:
            lines.append("[✓] Sample sizes meet minimum statistical thresholds.")
        lines.append("")

        lines.append("--- METHODOLOGICAL LIMITATIONS ---")
        for lim in report.limitations:
            lines.append(f"• {lim}")

        return "\n".join(lines)

    @classmethod
    def format_markdown_report(cls, report: FairnessAuditReport) -> str:
        lines = []
        lines.append("## VeriSkill Fairness & Bias Audit Report")
        lines.append(f"- **Total Candidates Evaluated**: {report.total_candidates}")
        lines.append(f"- **Selection Threshold**: `{report.selection_threshold:.2f}`")
        status_badge = "🟢 **PASSED**" if report.is_audit_passed else "🔴 **DISPARITY DETECTED**"
        lines.append(f"- **Audit Status**: {status_badge}")
        lines.append("")

        for metric in report.metrics:
            dir_str = f"{metric.disparate_impact_ratio:.2f}" if metric.disparate_impact_ratio is not None else "N/A"
            lines.append(f"### Attribute: `{metric.protected_attribute}`")
            lines.append(f"- **Disparate Impact Ratio**: `{dir_str}` (Threshold: $\ge 0.80$)")
            lines.append(f"- **4/5ths Rule**: `{'COMPLIANT' if metric.four_fifths_compliant else 'VIOLATED'}`")
            lines.append(f"- **Demographic Parity Diff**: `{metric.demographic_parity_diff:.4f}`")
            lines.append("")
            lines.append("| Subgroup | Sample Size ($N$) | Selected | Selection Rate | Mean Match Score |")
            lines.append("| :--- | :---: | :---: | :---: | :---: |")
            for g_val, stats in metric.group_statistics.items():
                lines.append(f"| {g_val} | {stats.sample_size} | {stats.selected_count} | {stats.selection_rate:.1%} | {stats.mean_score:.3f} |")
            lines.append("")

        if report.potential_disparities:
            lines.append("### ⚠️ Potential Disparities")
            for d in report.potential_disparities:
                lines.append(f"> [!WARNING]\n> {d}")
            lines.append("")

        if report.warnings:
            lines.append("### ℹ️ Statistical Warnings")
            for w in report.warnings:
                lines.append(f"- {w}")
            lines.append("")

        lines.append("### 📋 Limitations")
        for lim in report.limitations:
            lines.append(f"- {lim}")

        return "\n".join(lines)
