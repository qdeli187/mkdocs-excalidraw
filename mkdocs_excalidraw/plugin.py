from mkdocs.config.defaults import MkDocsConfig
from mkdocs.plugins import BasePlugin
from mkdocs.structure.files import File , Files, InclusionLevel
from bs4 import BeautifulSoup
import os
from mkdocs.structure.pages import Page
import requests as r

EXCALIDRAW_CSS = "https://esm.sh/@excalidraw/excalidraw@0.18.0/dist/dev/index.css"
EXCALIDRAW_JS = "https://unpkg.com/@excalidraw/utils@0.1.2/dist/excalidraw-utils.min.js"

class ExcalidrawPlugin(BasePlugin):

    def __init__(self) -> None:
        self.comp = self._load_file('component.js')
        super().__init__()

    def _download_uri(self, uri : str) -> str:
        """Downloads remote text content"""
        res = r.get(uri)
        res.raise_for_status()
        return res.text

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
        if "excalidraw" not in output:
            return output
        soup = BeautifulSoup(output, 'html.parser')
        altered = False
        for t in soup.find_all("img"):
            if t["src"].endswith(".excalidraw"):
                altered = True
                t.name = "excalidraw-renderer"
        if altered:
            # load js , css
            js_tag = soup.new_tag('script')
            js_tag['src'] = EXCALIDRAW_JS
            css_tag = soup.new_tag('link')
            css_tag["rel"] = "stylesheet"
            css_tag["href"] = EXCALIDRAW_CSS
            comp_js = soup.new_tag('script')
            comp_js.string = self.comp
            if soup.head is not None:
                soup.head.extend([js_tag,css_tag,comp_js])
            else:
                soup.extend([js_tag,css_tag,comp_js])

        return str(soup)