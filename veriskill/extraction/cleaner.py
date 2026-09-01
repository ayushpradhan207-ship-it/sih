"""
Text cleaner and preprocessor for skill extraction.
"""
import re
from typing import List, Tuple


class TextCleaner:
    """
    Cleans raw student evidence text (coursework, projects, credentials, experiences, competitions)
    into normalized text chunks and sentences.
    """

    # HTML tags regex
    HTML_PATTERN = re.compile(r"<[^>]+>")
    # Markdown links [text](url) -> text
    MD_LINK_PATTERN = re.compile(r"\[([^\]]+)\]\([^\)]+\)")
    # Markdown formatting (bold, italics, code backticks)
    MD_FORMAT_PATTERN = re.compile(r"[*_`#~]+")
    # URLs
    URL_PATTERN = re.compile(r"https?://\S+|www\.\S+")
    # Whitespace normalization
    MULTI_WS_PATTERN = re.compile(r"[ \t]+")
    MULTI_NL_PATTERN = re.compile(r"\n{2,}")

    @classmethod
    def clean_text(cls, text: str) -> str:
        if not text:
            return ""

        # Remove HTML
        cleaned = cls.HTML_PATTERN.sub(" ", text)
        # Simplify Markdown links to text
        cleaned = cls.MD_LINK_PATTERN.sub(r"\1", cleaned)
        # Remove Markdown syntax
        cleaned = cls.MD_FORMAT_PATTERN.sub("", cleaned)
        # Normalize unicode quotes and dashes
        cleaned = (
            cleaned.replace("“", '"')
            .replace("”", '"')
            .replace("‘", "'")
            .replace("’", "'")
            .replace("–", "-")
            .replace("—", "-")
        )
        # Replace bullet symbols with standard delimiter
        cleaned = re.sub(r"^[ \t]*[•\-\*\+]\s+", "", cleaned, flags=re.MULTILINE)
        # Normalize whitespace
        cleaned = cls.MULTI_WS_PATTERN.sub(" ", cleaned)
        cleaned = cls.MULTI_NL_PATTERN.sub("\n", cleaned)
        return cleaned.strip()

    @classmethod
    def split_into_sentences(cls, text: str) -> List[str]:
        cleaned = cls.clean_text(text)
        if not cleaned:
            return []
        # Split on sentence boundaries, newlines, semicolons, and bullet items
        raw_sentences = re.split(r"(?<=[.!?])\s+|\n+|;\s*", cleaned)
        sentences = [s.strip() for s in raw_sentences if s.strip() and len(s.strip()) > 2]
        return sentences

    @classmethod
    def extract_phrases(cls, sentence: str) -> List[str]:
        """Splits a sentence into candidate phrases on commas, colons, parentheses, slashes."""
        phrases = re.split(r"[,:;/\(\)\|]+", sentence)
        return [p.strip() for p in phrases if p.strip()]
