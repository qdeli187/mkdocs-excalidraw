# Mkdocs Excalidraw

✨ A simple mkdocs plugin to easily embed your excalidraw drawings into your docs

**See it in action [here](https://qdeli187.github.io/mkdocs-excalidraw/)**

## Features
- Embed your drawings as you would an image by converting your excalidraw drawings to svg on the fly
- Dark mode compatibility for **mkdocs** and **mkdocs-material** themes

## Installation
```bash
pip install mkdocs-excalidraw
```

## Usage
You can use this project's [docs](https://qdeli187.github.io/mkdocs-excalidraw/) as an example , lets break down how we do it.

1. Create an excalidraw drawing and save the file (I recommend using the vscode extension)
2. Add a reference to it in your markdown file as you would for an image
```markdown
![fig_name](drawings/test.excalidraw)
```
3. Thats it , the extension renders it as an svg in your browser

## Issues

As you can see [here](https://qdeli187.github.io/mkdocs-excalidraw/) are two issues with the current implementations:

- The font is not correct
- Text is not properly aligned

Both these issues have been noticed by excalidraw creators and should be fixed in the next release. I will
update this plugin with the new version when it will come out.