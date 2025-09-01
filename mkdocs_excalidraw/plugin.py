from mkdocs.plugins import BasePlugin
from mkdocs.structure.files import File , Files, InclusionLevel
from bs4 import BeautifulSoup
import os
import requests as r

EXCALIDRAW_CSS = "https://esm.sh/@excalidraw/excalidraw@0.18.0/dist/dev/index.css"
EXCALIDRAW_JS = "https://unpkg.com/@excalidraw/utils@0.1.2/dist/excalidraw-utils.min.js"

class ExcalidrawPlugin(BasePlugin):

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

    def on_files(self, files : Files, /, *, config) -> Files:
        """Inject required JS/CSS into the file list"""
        css = self._download_uri(EXCALIDRAW_CSS)
        js = self._download_uri(EXCALIDRAW_JS)
        comp = self._load_file('component.js')
        css_file = File.generated(
            config=config,
            src_uri="/assets/css/excalidraw.css", 
            content=css,
            inclusion=InclusionLevel.INCLUDED
        )
        js_file = File.generated(
            config=config,
            src_uri="/assets/js/excalidraw.js", 
            content=js,
            inclusion=InclusionLevel.INCLUDED
        )
        comp_file = File.generated(
            config=config,
            src_uri="/assets/js/excalidraw-renderer.js", 
            content=js,
            inclusion=InclusionLevel.INCLUDED
        )
        files.append(css_file)
        files.append(js_file)
        files.append(comp_file)
        return files

    def on_page_content(self, html, /, *, page, config, files):
        """Replace <img> tags that references excalidraw files"""
        soup = BeautifulSoup(html, 'html.parser')
        for t in soup.find_all("img"):
            if t["src"].endswith(".excalidraw"):
                t.name = "excalidraw-renderer"
        return str(soup)