const taxonomy = require("../data/taxonomy.json");

class SkillExtractionService {
  /**
   * Normalizes a raw skill string to the canonical taxonomy name
   */
  static normalizeSkill(rawName) {
    if (!rawName) return null;
    const clean = rawName.trim();
    const lower = clean.toLowerCase();

    // Check direct taxonomy synonym mapping
    if (taxonomy.synonyms && taxonomy.synonyms[lower]) {
      return taxonomy.synonyms[lower];
    }

    // Check exact matches across all categories
    for (const cat of taxonomy.categories) {
      for (const skill of cat.skills) {
        if (skill.toLowerCase() === lower) {
          return skill;
        }
      }
    }

    return clean;
  }

  /**
   * Identifies the category for a given normalized skill
   */
  static getCategoryForSkill(skillName) {
    for (const cat of taxonomy.categories) {
      if (cat.skills.some(s => s.toLowerCase() === skillName.toLowerCase())) {
        return cat.id;
      }
    }
    return "programming";
  }

  /**
   * Simulates AI Skill Extraction from project/repository text, URL, and metadata
   */
  static extractSkillsFromProject({ title, description, url, technologies = [] }) {
    const combinedText = `${title || ""} ${description || ""} ${url || ""} ${technologies.join(" ")}`.toLowerCase();
    const extracted = [];
    const seen = new Set();

    // Scan taxonomy for matched skills in text
    for (const cat of taxonomy.categories) {
      for (const skill of cat.skills) {
        const sLower = skill.toLowerCase();
        let matched = false;

        if (combinedText.includes(sLower)) {
          matched = true;
        } else {
          // Check synonyms
          for (const [syn, canonical] of Object.entries(taxonomy.synonyms)) {
            if (canonical === skill && combinedText.includes(syn)) {
              matched = true;
              break;
            }
          }
        }

        if (matched && !seen.has(skill)) {
          seen.add(skill);
          // Calculate realistic confidence score
          let confidence = 0.85;
          if (title && title.toLowerCase().includes(sLower)) confidence += 0.08;
          if (combinedText.includes("production") || combinedText.includes("deployed")) confidence += 0.05;
          if (url && url.includes("github.com")) confidence += 0.04;

          confidence = Math.min(Math.round(confidence * 100) / 100, 0.98);

          extracted.push({
            name: skill,
            category: cat.id,
            categoryName: cat.name,
            confidence: Math.round(confidence * 100),
            level: confidence > 0.90 ? "Advanced" : confidence > 0.75 ? "Intermediate" : "Beginner",
            evidenceCount: 1,
            verificationStatus: url && url.includes("github.com") ? "VERIFIED" : "PENDING"
          });
        }
      }
    }

    // Default fallback if text was very brief
    if (extracted.length === 0 && technologies.length > 0) {
      technologies.forEach(tech => {
        const norm = this.normalizeSkill(tech);
        extracted.push({
          name: norm,
          category: this.getCategoryForSkill(norm),
          confidence: 82,
          level: "Intermediate",
          evidenceCount: 1,
          verificationStatus: "VERIFIED"
        });
      });
    }

    return extracted;
  }
}

module.exports = SkillExtractionService;
