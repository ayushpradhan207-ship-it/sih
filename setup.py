from setuptools import setup, find_packages

setup(
    name="veriskill",
    version="0.1.0",
    packages=find_packages(),
    python_requires=">=3.9",
    entry_points={
        "console_scripts": [
            "veriskill=veriskill.cli:main",
        ],
    },
)
