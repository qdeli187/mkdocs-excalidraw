from mkdocs.structure.files import File , Files, InclusionLevel
from mkdocs_excalidraw.plugin import ExcalidrawPlugin
from mkdocs.config import Config

def test_download_uri():
    plugin = ExcalidrawPlugin()
    res = plugin._download_uri('https://google.com')
    assert len(res) > 0 , "Content Empty"

def test_load_file():
    plugin = ExcalidrawPlugin()
    res = plugin._load_file("component.js")
    assert len(res) > 0 , "Content Empty"

def test_on_files():
    plugin = ExcalidrawPlugin()
    files = Files(files=[])
    plugin.on_files(files,config=Config())

def test_on_page_content_repl():
    plugin = ExcalidrawPlugin()
    html = '<div><img src="/test/test.excalidraw"/></div>'
    expected= '<div><excalidraw-renderer src="/test/test.excalidraw"/></div>'
    res = plugin.on_page_content(html,page=None,config=None,files=None)
    assert res == expected

def test_on_page_content_non_repl():
    plugin = ExcalidrawPlugin()
    html = '<div><img src="/test/test.png"/></div>'
    res = plugin.on_page_content(html,page=None,config=None,files=None)
    assert res == html
