# Mkdocs Excalidraw

✨ A simple mkdocs plugin to easily embed your excalidraw drawings into your docs

![excalidraw](assets/excalidraw.jpg)

## Features
- Embed your drawings as you would an image by converting your excalidraw drawings to svg on the fly
- Dark mode compatibility for **mkdocs** and **mkdocs-material** themes
- Compatible with **mkdocs-glightbox** (zoom on click)

## Usage
You can use this documentation as an example , lets break down how we do it.

1. Create an excalidraw drawing and save the file (i recommend using the vscode extension)
2. Add a reference to it in your markdown file as an image
```markdown
![fig_name](drawings/test.excalidraw)
```
## Add Lightbox

Simply install and setup **mkdocs-glightbox** as descibed [here]()

## Example

![fig_name](drawings/test.excalidraw)