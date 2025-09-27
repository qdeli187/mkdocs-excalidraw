from mkdocs.config.defaults import MkDocsConfig
from mkdocs.plugins import BasePlugin
from mkdocs.structure.files import File , Files, InclusionLevel
from bs4 import BeautifulSoup
import os
from mkdocs.structure.pages import Page
import requests as r

EXCALIDRAW_CSS = "https://esm.sh/@excalidraw/excalidraw@0.18.0/dist/dev/index.css"
EXCALIDRAW_JS = "https://esm.sh/@excalidraw/excalidraw@0.18.0/dist/dev/index.js"

class ExcalidrawPlugin(BasePlugin):

    def __init__(self) -> None:
        self.comp = self._load_file('component.js')
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
        soup = BeautifulSoup(output, 'html.parser')
        js_tag = soup.new_tag('script')
        js_tag['src'] = EXCALIDRAW_JS
        css_tag = soup.new_tag('link')
        css_tag["rel"] = "stylesheet"
        css_tag["href"] = EXCALIDRAW_CSS
        comp_js = soup.new_tag('script')
        comp_js['type'] = "module"
        comp_js.string = self.comp
        if soup.head is not None:
            soup.head.extend([js_tag,css_tag,comp_js])
        else:
            soup.extend([js_tag,css_tag,comp_js])

        return str(soup)
    
    def on_page_content(self, html : str, page : Page, config : MkDocsConfig, **kwargs):
        if ".excalidraw" not in html:
            return html
        soup = BeautifulSoup(html, 'html.parser')
        for t in soup.find_all("img"):
            if t["src"].endswith(".excalidraw"):
                t.name = "excalidraw-renderer"
        return str(soup)