from mkdocs_excalidraw.plugin import ExcalidrawPlugin

def test_on_page_content_repl():
    plugin = ExcalidrawPlugin()
    html = '<div><img src="/test/test.excalidraw"/></div>'
    expected= '<excalidraw-renderer src="/test/test.excalidraw"/>'
    res = plugin.on_page_content(html,page=None,config=None)
    assert expected in res # type: ignore

def test_on_page_content_non_repl():
    plugin = ExcalidrawPlugin()
    html = '<div><img src="/test/test.png"/></div>'
    res = plugin.on_page_content(html,page=None,config=None)
    assert res == html

def test_e2e():
    from mkdocs.commands import serve
    from mkdocs.config import load_config
    import os

    # Load MkDocs configuration
    config_file = '../mkdocs.yml'  # or path to your config file
    
    if not os.path.exists(config_file):
        print(f"Config file {config_file} not found")
        return
        
    config = load_config(config_file=config_file)
    
    # Start the development server
    serve.serve(config, host='127.0.0.1', port=8000, livereload=True)