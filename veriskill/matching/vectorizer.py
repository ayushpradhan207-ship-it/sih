"""
Pure-Python TF-IDF Vectorizer and Cosine Similarity engine.
Zero external dependencies, completely reproducible and deterministic.
"""
import math
import re
from typing import List, Dict, Tuple


class TextVectorizer:
    """
    Computes TF-IDF vector representations and Cosine Similarities
    for semantic relevance matching.
    """

    STOPWORDS = {
        "a", "about", "above", "after", "again", "against", "all", "am", "an", "and",
        "any", "are", "aren't", "as", "at", "be", "because", "been", "before", "being",
        "below", "between", "both", "but", "by", "can", "can't", "cannot", "could",
        "did", "do", "does", "doing", "don't", "down", "during", "each", "few", "for",
        "from", "further", "had", "has", "have", "having", "he", "her", "here", "hers",
        "herself", "him", "himself", "his", "how", "i", "if", "in", "into", "is", "isn't",
        "it", "its", "itself", "let's", "me", "more", "most", "my", "myself", "no", "nor",
        "not", "of", "off", "on", "once", "only", "or", "other", "ought", "our", "ours",
        "ourselves", "out", "over", "own", "same", "she", "should", "so", "some", "such",
        "than", "that", "the", "their", "theirs", "them", "themselves", "then", "there",
        "these", "they", "this", "those", "through", "to", "too", "under", "until", "up",
        "very", "was", "wasn't", "we", "were", "what", "when", "where", "which", "while",
        "who", "whom", "why", "with", "won't", "would", "you", "your", "yours", "yourself",
    }

    TOKEN_REGEX = re.compile(r"[A-Za-z0-9+#.\-_]{2,}")

    @classmethod
    def tokenize(cls, text: str) -> List[str]:
        if not text:
            return []
        raw_tokens = cls.TOKEN_REGEX.findall(text.lower())
        tokens = [t.strip(".-_") for t in raw_tokens if t.strip(".-_")]
        return [t for t in tokens if t not in cls.STOPWORDS and len(t) > 1]

    @classmethod
    def get_term_frequencies(cls, tokens: List[str]) -> Dict[str, float]:
        if not tokens:
            return {}
        counts: Dict[str, int] = {}
        for t in tokens:
            counts[t] = counts.get(t, 0) + 1
        total = float(len(tokens))
        return {t: count / total for t, count in counts.items()}

    @classmethod
    def compute_cosine_similarity(cls, text_a: str, text_b: str) -> float:
        """
        Computes cosine similarity between two text passages.
        Returns float in [0.0, 1.0].
        """
        tokens_a = cls.tokenize(text_a)
        tokens_b = cls.tokenize(text_b)
        if not tokens_a or not tokens_b:
            return 0.0

        tf_a = cls.get_term_frequencies(tokens_a)
        tf_b = cls.get_term_frequencies(tokens_b)

        # Build vocabulary
        all_terms = set(tf_a.keys()) | set(tf_b.keys())
        doc_count = 2.0
        # Compute IDF for 2-document space
        idf: Dict[str, float] = {}
        for t in all_terms:
            df = (1 if t in tf_a else 0) + (1 if t in tf_b else 0)
            idf[t] = math.log((1.0 + doc_count) / (1.0 + df)) + 1.0

        # Compute TF-IDF vectors
        vec_a: Dict[str, float] = {t: tf_a.get(t, 0.0) * idf[t] for t in all_terms}
        vec_b: Dict[str, float] = {t: tf_b.get(t, 0.0) * idf[t] for t in all_terms}

        dot_product = sum(vec_a[t] * vec_b[t] for t in all_terms)
        norm_a = math.sqrt(sum(v * v for v in vec_a.values()))
        norm_b = math.sqrt(sum(v * v for v in vec_b.values()))

        if norm_a == 0.0 or norm_b == 0.0:
            return 0.0

        similarity = dot_product / (norm_a * norm_b)
        return max(0.0, min(1.0, similarity))
