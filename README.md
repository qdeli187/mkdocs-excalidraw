# Mkdocs Excalidraw

✨ A simple mkdocs plugin to easily embed your excalidraw drawings into your docs

**See it in action [here](https://qdeli187.github.io/mkdocs-excalidraw/)**

## Features
- Embed your drawings as you would an image by converting your excalidraw drawings to svg on the fly
- Dark mode compatibility for **mkdocs** and **mkdocs-material** themes
- Lightbox support when used with **mkdocs-glightbox** (fullscreen on click)

## Installation
Install the package

```bash
pip install mkdocs-excalidraw
```

Add it to your ```mkdocs.yaml```

```yaml
site_name: MkDocs Excalidraw
plugins:
  - excalidraw
  - glightbox # if you want lightbox (see below)
```

## Usage
You can use this project's [docs](https://qdeli187.github.io/mkdocs-excalidraw/) as an example , lets break down how we do it.

1. Create an excalidraw drawing and save the file (I recommend using the vscode extension)
2. Add a reference to it in your markdown file as you would for an image
```markdown
![fig_name](drawings/test.excalidraw)
```
3. Thats it , the extension renders it as an svg in your browser

### Add Lightbox (Click to open fullscreen)

Simply install and setup **mkdocs-glightbox** as descibed [here](https://github.com/Blueswen/mkdocs-glightbox)