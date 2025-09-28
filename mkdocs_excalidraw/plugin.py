from mkdocs.config.defaults import MkDocsConfig
from mkdocs.plugins import BasePlugin
from mkdocs.structure.files import File , Files, InclusionLevel
from bs4 import BeautifulSoup
import os
import shutil
from mkdocs.structure.pages import Page
from mkdocs import utils

class ExcalidrawPlugin(BasePlugin):

    def __init__(self) -> None:
        super().__init__()

    def _load_file(self, path : str):
        """load local text content from this pkg"""
        fp = os.path.join(
            os.path.dirname(__file__),
            path
        )
        with open(fp,'r') as f:
            res = f.read()
        return res
    
    def on_post_page(self, output: str, /, *, page: Page, config: MkDocsConfig) -> str | None:
        # Only inject scripts on pages that contain excalidraw elements
        if ".excalidraw" not in output:
            return output
            
        soup = BeautifulSoup(output, 'html.parser')
        
        # Create script tag that loads the bundled JavaScript
        bundle_script = soup.new_tag('script')
        bundle_script['type'] = 'text/javascript'
        bundle_script['src'] = utils.get_relative_url(utils.normalize_url('/assets/excalidraw-renderer.bundle.js'), page.url)
        
        # Insert script into head
        if soup.head is not None:
            soup.head.append(bundle_script)
        else:
            soup.append(bundle_script)
        
        return str(soup)
    
    def on_page_content(self, html : str, page : Page, config : MkDocsConfig, **kwargs):
        if ".excalidraw" not in html:
            return html
        soup = BeautifulSoup(html, 'html.parser')
        for t in soup.find_all("img"):
            if t["src"].endswith(".excalidraw"):
                t.name = "excalidraw-renderer"
        return str(soup)
    
    def on_post_build(self, config: MkDocsConfig):
        """Copy bundled assets to the site directory"""
        try:
            src_js = os.path.join(os.path.dirname(__file__), 'assets', 'excalidraw-renderer.bundle.js')
            dest_js = os.path.join(config['site_dir'], 'assets', 'excalidraw-renderer.bundle.js')
            
            os.makedirs(os.path.dirname(dest_js), exist_ok=True)
            shutil.copy2(src_js, dest_js)
            
            # Also copy source map if it exists
            src_map = os.path.join(os.path.dirname(__file__), 'assets', 'excalidraw-renderer.bundle.js.map')
            if os.path.exists(src_map):
                dest_map = os.path.join(config['site_dir'], 'assets', 'excalidraw-renderer.bundle.js.map')
                shutil.copy2(src_map, dest_map)
                
        except FileNotFoundError as e:
            raise RuntimeError(f"Bundle file not found: {e}.")