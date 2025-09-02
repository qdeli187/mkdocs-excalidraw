from mkdocs.commands import serve
from mkdocs.config import load_config
import os

# Load MkDocs configuration
config_file = 'mkdocs.yml'  # or path to your config file

if not os.path.exists(config_file):
    raise RuntimeError(f"Config file {config_file} not found")

# Start the development server
serve.serve(config_file)