"""Build metadata for the existing GitHub Pages workflow."""
from pathlib import Path
import subprocess
subprocess.run(["node", str(Path(__file__).with_name("seo.mjs"))], check=True)
