# Mkdocs Excalidraw

✨ A simple mkdocs plugin to easily embed your excalidraw drawings into your docs

## Features
- Embed your drawings as you would an image by converting your excalidraw drawings to svg on the fly
- Dark mode compatibility for **mkdocs** and **mkdocs-material** themes

## Usage
You can use this documentation as an example , lets break down how we do it.

1. Create an excalidraw drawing and save the file (i recommend using the vscode extension)
2. Add a reference to it in your markdown file as an image
```markdown
![fig_name](drawings/test.excalidraw)
```

## Example

![fig_name](drawings/test.excalidraw)

## Issues

As you can see above there are two issues with the current implementations:

- The font is not correct
- Text is not properly aligned

Both these issues have been noticed by excalidraw creators and should be fixed in the next release. I will
update this plugin with the new version when it will come out.