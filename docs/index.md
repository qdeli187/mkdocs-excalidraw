# Mkdocs Excalidraw

✨ A simple mkdocs plugin to easily embed your excalidraw drawings into your docs


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
You can use this documentation as an example , lets break down how we do it.

1. Create an excalidraw drawing and save the file (i recommend using the vscode extension)
2. Add a reference to it in your markdown file as an image
```markdown
![fig_name](drawings/test.excalidraw)
```
### Add Lightbox (Click to open fullscreen)

Simply install and setup **mkdocs-glightbox** as descibed [here](https://github.com/Blueswen/mkdocs-glightbox)

## Example

![fig_name](drawings/test.excalidraw)

Bigger Drawing (better use mkdocs-glightbox to get a closer view)

![biggie](drawings/big.excalidraw)