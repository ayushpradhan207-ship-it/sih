"""
Enumerations for the VeriSkill AI/ML Engine.
"""
from enum import Enum


class EvidenceType(str, Enum):
    COURSEWORK = "coursework"
    PROJECT = "project"
    CREDENTIAL = "credential"
    COMPETITION = "competition"
    EXPERIENCE = "experience"
    OTHER = "other"


class VerificationStatus(str, Enum):
    EXTRACTED = "EXTRACTED"
    PENDING_VERIFICATION = "PENDING_VERIFICATION"
    VERIFIED = "VERIFIED"
    REJECTED = "REJECTED"


class SkillCategory(str, Enum):
    PROGRAMMING_LANGUAGES = "Programming Languages"
    MACHINE_LEARNING_AI = "Machine Learning & AI"
    DATA_ENGINEERING = "Data Engineering & Analytics"
    CLOUD_DEVOPS = "Cloud & DevOps"
    WEB_DEVELOPMENT = "Web & Mobile Development"
    SYSTEMS_DATABASES = "Systems & Databases"
    CYBERSECURITY = "Cybersecurity & Networking"
    MATHEMATICS_STATS = "Mathematics & Statistics"
    SOFT_SKILLS = "Soft Skills & Leadership"
    DOMAIN_SPECIFIC = "Domain Specific"
    OTHER = "Other"


class ExtractionMethod(str, Enum):
    EXACT_DICTIONARY = "exact_dictionary"
    SYNONYM_MAPPING = "synonym_mapping"
    CONTEXTUAL_REGEX = "contextual_regex"
    PHRASE_CHUNK = "phrase_chunk"
    TAXONOMY_INFERENCE = "taxonomy_inference"


class EvidenceArtifactType(str, Enum):
    REPOSITORY_URL = "repository_url"
    TRANSCRIPT_RECORD = "transcript_record"
    CERTIFICATE_ID = "certificate_id"
    COMPETITION_LEADERBOARD = "competition_leaderboard"
    EMPLOYMENT_RECORD = "employment_record"
    PORTFOLIO_LINK = "portfolio_link"
    DOCUMENT_HASH = "document_hash"
    PEER_ATTESTATION = "peer_attestation"
