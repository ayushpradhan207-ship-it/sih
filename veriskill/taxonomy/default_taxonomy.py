"""
Comprehensive default skill taxonomy for VeriSkill engine.
"""
from veriskill.models.enums import SkillCategory
from veriskill.taxonomy.schema import TaxonomyNode, TaxonomyGraph


def build_default_taxonomy() -> TaxonomyGraph:
    graph = TaxonomyGraph()

    nodes = [
        # Programming Languages
        TaxonomyNode(
            canonical_name="Python",
            category=SkillCategory.PROGRAMMING_LANGUAGES,
            aliases=["python3", "py", "python 3", "python programming"],
            children=["PyTorch", "TensorFlow", "Pandas", "NumPy", "Django", "FastAPI", "Flask", "Scikit-Learn"],
            related=["R", "Julia"],
            description="High-level general-purpose programming language."
        ),
        TaxonomyNode(
            canonical_name="Java",
            category=SkillCategory.PROGRAMMING_LANGUAGES,
            aliases=["java8", "java 11", "java 17", "core java", "java programming"],
            children=["Spring Boot", "Kotlin", "Scala", "Android"],
            related=["C#", "C++"],
            description="Object-oriented programming language."
        ),
        TaxonomyNode(
            canonical_name="C++",
            category=SkillCategory.PROGRAMMING_LANGUAGES,
            aliases=["cpp", "cplusplus", "c/c++", "modern c++"],
            children=["CUDA"],
            related=["C", "Rust"],
            description="High-performance compiled systems language."
        ),
        TaxonomyNode(
            canonical_name="C",
            category=SkillCategory.PROGRAMMING_LANGUAGES,
            aliases=["ansi c", "c programming"],
            children=["C++", "Embedded C"],
            related=["Operating Systems", "Linux Kernel"],
            description="Low-level procedural language."
        ),
        TaxonomyNode(
            canonical_name="Rust",
            category=SkillCategory.PROGRAMMING_LANGUAGES,
            aliases=["rustlang", "rust programming"],
            related=["C++", "Systems Programming"],
            description="Memory-safe systems programming language."
        ),
        TaxonomyNode(
            canonical_name="Go",
            category=SkillCategory.PROGRAMMING_LANGUAGES,
            aliases=["golang", "go programming"],
            related=["Microservices", "Docker", "Kubernetes"],
            description="Concurrent open source programming language."
        ),
        TaxonomyNode(
            canonical_name="JavaScript",
            category=SkillCategory.PROGRAMMING_LANGUAGES,
            aliases=["js", "ecmascript", "es6", "vanilla js"],
            children=["TypeScript", "React", "Node.js", "Express.js", "Vue.js", "Angular"],
            related=["HTML/CSS"],
            description="Dynamic web scripting language."
        ),
        TaxonomyNode(
            canonical_name="TypeScript",
            category=SkillCategory.PROGRAMMING_LANGUAGES,
            aliases=["ts", "typescript programming"],
            parents=["JavaScript"],
            children=["React", "Next.js", "Angular"],
            description="Typed superset of JavaScript."
        ),
        TaxonomyNode(
            canonical_name="SQL",
            category=SkillCategory.PROGRAMMING_LANGUAGES,
            aliases=["structured query language", "ansi sql", "sql querying"],
            children=["PostgreSQL", "MySQL", "SQLite", "Snowflake", "BigQuery"],
            related=["Database Design", "Data Engineering"],
            description="Domain-specific language for managing data in RDBMS."
        ),
        TaxonomyNode(
            canonical_name="R",
            category=SkillCategory.PROGRAMMING_LANGUAGES,
            aliases=["r programming", "r-lang", "rlang"],
            related=["Python", "Probability & Statistics"],
            description="Statistical computing language."
        ),
        TaxonomyNode(
            canonical_name="Scala",
            category=SkillCategory.PROGRAMMING_LANGUAGES,
            aliases=["scala programming"],
            parents=["Java"],
            children=["Apache Spark"],
            description="Object-functional programming language."
        ),
        TaxonomyNode(
            canonical_name="Shell/Bash",
            category=SkillCategory.PROGRAMMING_LANGUAGES,
            aliases=["bash", "shell scripting", "zsh", "sh", "bash script"],
            related=["Linux", "DevOps"],
            description="Unix shell scripting and automation."
        ),

        # Machine Learning & AI
        TaxonomyNode(
            canonical_name="Machine Learning",
            category=SkillCategory.MACHINE_LEARNING_AI,
            aliases=["ml", "machine learning algorithms", "applied machine learning", "statistical learning"],
            children=["Deep Learning", "Natural Language Processing", "Computer Vision", "Reinforcement Learning", "Scikit-Learn"],
            parents=["Artificial Intelligence"],
            description="Field of study that gives computers the ability to learn without being explicitly programmed."
        ),
        TaxonomyNode(
            canonical_name="Deep Learning",
            category=SkillCategory.MACHINE_LEARNING_AI,
            aliases=["dl", "deep neural networks", "neural networks", "dnn"],
            parents=["Machine Learning"],
            children=["PyTorch", "TensorFlow", "Keras", "Transformers", "Large Language Models"],
            description="Subfield of machine learning based on artificial neural networks."
        ),
        TaxonomyNode(
            canonical_name="Natural Language Processing",
            category=SkillCategory.MACHINE_LEARNING_AI,
            aliases=["nlp", "natural language understanding", "nlu", "computational linguistics"],
            parents=["Machine Learning"],
            children=["Transformers", "Large Language Models", "HuggingFace", "BERT", "Spacy"],
            description="Interaction between computers and human natural language."
        ),
        TaxonomyNode(
            canonical_name="Computer Vision",
            category=SkillCategory.MACHINE_LEARNING_AI,
            aliases=["cv", "image processing", "computer vision algorithms", "object detection", "image segmentation"],
            parents=["Machine Learning"],
            children=["OpenCV", "YOLO", "CNN"],
            description="Enabling computers to derive high-level understanding from digital images or videos."
        ),
        TaxonomyNode(
            canonical_name="Large Language Models",
            category=SkillCategory.MACHINE_LEARNING_AI,
            aliases=["llm", "llms", "generative ai", "genai", "prompt engineering", "langchain", "rag", "retrieval augmented generation"],
            parents=["Deep Learning", "Natural Language Processing"],
            related=["Transformers", "HuggingFace"],
            description="Massive neural models trained on extensive text datasets for generation and reasoning."
        ),
        TaxonomyNode(
            canonical_name="PyTorch",
            category=SkillCategory.MACHINE_LEARNING_AI,
            aliases=["pytorch framework", "torch"],
            parents=["Deep Learning", "Python"],
            description="Deep learning framework developed by Meta AI."
        ),
        TaxonomyNode(
            canonical_name="TensorFlow",
            category=SkillCategory.MACHINE_LEARNING_AI,
            aliases=["tf", "tensorflow 2", "tf2"],
            parents=["Deep Learning", "Python"],
            children=["Keras"],
            description="Open source machine learning library developed by Google."
        ),
        TaxonomyNode(
            canonical_name="Scikit-Learn",
            category=SkillCategory.MACHINE_LEARNING_AI,
            aliases=["sklearn", "scikit learn"],
            parents=["Machine Learning", "Python"],
            description="Machine learning library for classical ML algorithms in Python."
        ),
        TaxonomyNode(
            canonical_name="Transformers",
            category=SkillCategory.MACHINE_LEARNING_AI,
            aliases=["huggingface transformers", "transformer architecture", "attention mechanism"],
            parents=["Deep Learning"],
            description="Deep learning architecture based on self-attention."
        ),
        TaxonomyNode(
            canonical_name="Pandas",
            category=SkillCategory.MACHINE_LEARNING_AI,
            aliases=["pandas library", "pd"],
            parents=["Python"],
            related=["Data Analysis", "NumPy"],
            description="Data manipulation and analysis library for Python."
        ),
        TaxonomyNode(
            canonical_name="NumPy",
            category=SkillCategory.MACHINE_LEARNING_AI,
            aliases=["numpy library", "np"],
            parents=["Python"],
            related=["Linear Algebra", "SciPy"],
            description="Fundamental library for numerical computing in Python."
        ),
        TaxonomyNode(
            canonical_name="Reinforcement Learning",
            category=SkillCategory.MACHINE_LEARNING_AI,
            aliases=["rl", "q-learning", "policy gradient", "deep rl"],
            parents=["Machine Learning"],
            description="Training algorithms to make a sequence of decisions via rewards and penalties."
        ),

        # Data Engineering & Analytics
        TaxonomyNode(
            canonical_name="Data Engineering",
            category=SkillCategory.DATA_ENGINEERING,
            aliases=["data pipeline", "etl", "elt", "data pipelines", "data warehousing"],
            children=["Apache Spark", "Apache Airflow", "Kafka", "Snowflake", "dbt"],
            description="Practices of building systems for collecting, storing, and analyzing data."
        ),
        TaxonomyNode(
            canonical_name="Apache Spark",
            category=SkillCategory.DATA_ENGINEERING,
            aliases=["spark", "pyspark", "spark sql", "spark streaming"],
            parents=["Data Engineering"],
            related=["Scala", "Python", "Hadoop"],
            description="Unified analytics engine for large-scale data processing."
        ),
        TaxonomyNode(
            canonical_name="Apache Airflow",
            category=SkillCategory.DATA_ENGINEERING,
            aliases=["airflow", "airflow dags", "workflow orchestration"],
            parents=["Data Engineering", "Python"],
            description="Platform to programmatically author, schedule and monitor workflows."
        ),
        TaxonomyNode(
            canonical_name="Apache Kafka",
            category=SkillCategory.DATA_ENGINEERING,
            aliases=["kafka", "event streaming", "kafka streams"],
            parents=["Data Engineering"],
            description="Distributed event streaming platform."
        ),
        TaxonomyNode(
            canonical_name="PostgreSQL",
            category=SkillCategory.DATA_ENGINEERING,
            aliases=["postgres", "psql", "postgresql database"],
            parents=["SQL"],
            related=["Database Design", "Relational Databases"],
            description="Powerful open source object-relational database system."
        ),
        TaxonomyNode(
            canonical_name="MongoDB",
            category=SkillCategory.DATA_ENGINEERING,
            aliases=["mongo", "mongodb database", "nosql mongodb"],
            related=["NoSQL", "Document Databases"],
            description="Document-oriented NoSQL database."
        ),
        TaxonomyNode(
            canonical_name="Snowflake",
            category=SkillCategory.DATA_ENGINEERING,
            aliases=["snowflake data warehouse", "snowflake dwh"],
            parents=["Data Engineering", "SQL"],
            description="Cloud data warehousing platform."
        ),
        TaxonomyNode(
            canonical_name="Redis",
            category=SkillCategory.DATA_ENGINEERING,
            aliases=["redis cache", "redis key-value store"],
            related=["In-memory Database", "Caching"],
            description="In-memory data structure store used as database, cache, and message broker."
        ),

        # Cloud & DevOps
        TaxonomyNode(
            canonical_name="Docker",
            category=SkillCategory.CLOUD_DEVOPS,
            aliases=["docker containers", "dockerfile", "containerization", "docker-compose", "docker compose"],
            children=["Kubernetes"],
            related=["DevOps", "CI/CD"],
            description="Platform for developing, shipping, and running applications in containers."
        ),
        TaxonomyNode(
            canonical_name="Kubernetes",
            category=SkillCategory.CLOUD_DEVOPS,
            aliases=["k8s", "k8s orchestration", "helm", "kubernetes clusters"],
            parents=["Docker", "Cloud & DevOps"],
            description="Open-source system for automating deployment, scaling, and management of containerized apps."
        ),
        TaxonomyNode(
            canonical_name="AWS",
            category=SkillCategory.CLOUD_DEVOPS,
            aliases=["amazon web services", "aws cloud", "ec2", "s3", "lambda", "aws lambda", "cloud computing (aws)"],
            related=["Cloud Computing", "GCP", "Azure"],
            description="Amazon Web Services cloud computing platform."
        ),
        TaxonomyNode(
            canonical_name="Google Cloud Platform",
            category=SkillCategory.CLOUD_DEVOPS,
            aliases=["gcp", "google cloud", "bigquery", "gcs", "vertex ai"],
            related=["Cloud Computing", "AWS", "Azure"],
            description="Google Cloud Platform computing suite."
        ),
        TaxonomyNode(
            canonical_name="Azure",
            category=SkillCategory.CLOUD_DEVOPS,
            aliases=["microsoft azure", "azure cloud", "azure devops"],
            related=["Cloud Computing", "AWS", "GCP"],
            description="Microsoft Azure cloud platform."
        ),
        TaxonomyNode(
            canonical_name="CI/CD",
            category=SkillCategory.CLOUD_DEVOPS,
            aliases=["continuous integration", "continuous deployment", "ci cd", "cicd", "github actions", "gitlab ci", "jenkins"],
            related=["DevOps", "Git"],
            description="Automated software delivery practices."
        ),
        TaxonomyNode(
            canonical_name="Git",
            category=SkillCategory.CLOUD_DEVOPS,
            aliases=["git version control", "github", "gitlab", "version control"],
            related=["CI/CD", "Software Engineering"],
            description="Distributed version control system."
        ),
        TaxonomyNode(
            canonical_name="Linux",
            category=SkillCategory.CLOUD_DEVOPS,
            aliases=["linux/unix", "unix", "ubuntu", "debian", "redhat", "centos", "linux administration"],
            related=["Shell/Bash", "Operating Systems"],
            description="Open-source operating system family."
        ),
        TaxonomyNode(
            canonical_name="Terraform",
            category=SkillCategory.CLOUD_DEVOPS,
            aliases=["infrastructure as code", "iac", "terraform iac"],
            parents=["Cloud & DevOps"],
            description="Infrastructure as code software tool."
        ),

        # Web & Mobile Development
        TaxonomyNode(
            canonical_name="React",
            category=SkillCategory.WEB_DEVELOPMENT,
            aliases=["reactjs", "react.js", "react native", "react frontend"],
            parents=["JavaScript", "TypeScript"],
            children=["Next.js"],
            description="JavaScript frontend library for building user interfaces."
        ),
        TaxonomyNode(
            canonical_name="Next.js",
            category=SkillCategory.WEB_DEVELOPMENT,
            aliases=["nextjs", "next.js framework"],
            parents=["React", "TypeScript"],
            description="React framework for production-grade web applications."
        ),
        TaxonomyNode(
            canonical_name="Node.js",
            category=SkillCategory.WEB_DEVELOPMENT,
            aliases=["nodejs", "node", "node js"],
            parents=["JavaScript"],
            children=["Express.js", "NestJS"],
            description="JavaScript runtime built on Chrome's V8 JavaScript engine."
        ),
        TaxonomyNode(
            canonical_name="FastAPI",
            category=SkillCategory.WEB_DEVELOPMENT,
            aliases=["fastapi framework", "fast api"],
            parents=["Python"],
            related=["REST APIs", "Flask"],
            description="Modern, high-performance web framework for building APIs with Python."
        ),
        TaxonomyNode(
            canonical_name="Django",
            category=SkillCategory.WEB_DEVELOPMENT,
            aliases=["django framework", "django rest framework", "drf"],
            parents=["Python"],
            related=["REST APIs"],
            description="High-level Python web framework."
        ),
        TaxonomyNode(
            canonical_name="REST APIs",
            category=SkillCategory.WEB_DEVELOPMENT,
            aliases=["restful api", "rest api", "rest api development", "api design", "json api"],
            related=["Web Development", "Microservices"],
            description="Architectural style for web services communication."
        ),
        TaxonomyNode(
            canonical_name="GraphQL",
            category=SkillCategory.WEB_DEVELOPMENT,
            aliases=["graphql api", "apollo graphql"],
            related=["REST APIs"],
            description="Query language for APIs and runtime for executing queries."
        ),

        # Systems & Databases
        TaxonomyNode(
            canonical_name="Distributed Systems",
            category=SkillCategory.SYSTEMS_DATABASES,
            aliases=["distributed computing", "consensus protocols", "raft", "paxos", "microservices"],
            related=["Operating Systems", "Cloud & DevOps"],
            description="Computing systems whose components are located on networked computers."
        ),
        TaxonomyNode(
            canonical_name="Database Design",
            category=SkillCategory.SYSTEMS_DATABASES,
            aliases=["relational database design", "schema design", "database normalization", "indexing"],
            related=["SQL", "PostgreSQL"],
            description="Design and structure of data models in databases."
        ),
        TaxonomyNode(
            canonical_name="Operating Systems",
            category=SkillCategory.SYSTEMS_DATABASES,
            aliases=["os fundamentals", "os internals", "memory management", "virtual memory", "concurrency"],
            related=["Linux", "C", "C++"],
            description="Core system software managing computer hardware and software resources."
        ),
        TaxonomyNode(
            canonical_name="Computer Networks",
            category=SkillCategory.SYSTEMS_DATABASES,
            aliases=["networking", "tcp/ip", "http/https", "dns", "socket programming", "network protocols"],
            related=["Cybersecurity", "Distributed Systems"],
            description="Communication networks connecting digital devices."
        ),

        # Cybersecurity & Networking
        TaxonomyNode(
            canonical_name="Cybersecurity",
            category=SkillCategory.CYBERSECURITY,
            aliases=["information security", "infosec", "appsec", "security engineering", "penetration testing"],
            children=["Cryptography", "Network Security"],
            description="Protection of computer systems and networks from attack."
        ),
        TaxonomyNode(
            canonical_name="Cryptography",
            category=SkillCategory.CYBERSECURITY,
            aliases=["crypto", "applied cryptography", "public key cryptography", "encryption", "aes", "rsa"],
            parents=["Cybersecurity", "Mathematics & Statistics"],
            description="Techniques for secure communication in the presence of adversarial third parties."
        ),

        # Mathematics & Statistics
        TaxonomyNode(
            canonical_name="Linear Algebra",
            category=SkillCategory.MATHEMATICS_STATS,
            aliases=["matrix algebra", "vector spaces", "eigenvalues", "matrix factorization", "svd"],
            related=["Machine Learning", "Optimization"],
            description="Branch of mathematics concerning linear equations, vector spaces, and matrices."
        ),
        TaxonomyNode(
            canonical_name="Probability & Statistics",
            category=SkillCategory.MATHEMATICS_STATS,
            aliases=["probability", "statistics", "statistical inference", "hypothesis testing", "bayesian statistics"],
            related=["Machine Learning", "Data Analysis"],
            description="Branch of mathematics dealing with data collection, analysis, and probability theory."
        ),
        TaxonomyNode(
            canonical_name="Optimization",
            category=SkillCategory.MATHEMATICS_STATS,
            aliases=["convex optimization", "numerical optimization", "gradient descent", "linear programming"],
            related=["Machine Learning", "Algorithms"],
            description="Selection of a best element from some set of available alternatives."
        ),

        # Soft Skills & Leadership
        TaxonomyNode(
            canonical_name="Team Collaboration",
            category=SkillCategory.SOFT_SKILLS,
            aliases=["collaboration", "teamwork", "cross-functional collaboration", "peer code review"],
            description="Ability to work effectively with diverse teams and stakeholders."
        ),
        TaxonomyNode(
            canonical_name="Technical Writing",
            category=SkillCategory.SOFT_SKILLS,
            aliases=["documentation", "technical documentation", "api documentation", "research writing"],
            description="Authoring clear technical documents, reports, and API specifications."
        ),
        TaxonomyNode(
            canonical_name="Agile / Scrum",
            category=SkillCategory.SOFT_SKILLS,
            aliases=["agile", "scrum", "kanban", "sprint planning", "jira"],
            description="Iterative software development and project management methodologies."
        ),
        TaxonomyNode(
            canonical_name="Problem Solving",
            category=SkillCategory.SOFT_SKILLS,
            aliases=["analytical thinking", "critical thinking", "algorithmic problem solving", "debugging"],
            description="Systematic approach to diagnosing and resolving complex technical challenges."
        ),
    ]

    for n in nodes:
        graph.add_node(n)

    return graph
