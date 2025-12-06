<!--intro-start-->
# Mkdocs Excalidraw

✨ A simple mkdocs plugin to easily embed your excalidraw drawings into your docs

**See it in action [here](https://qdeli187.github.io/mkdocs-excalidraw/)**

## 🎯 Features
- Embed your drawings as you would an image by converting your excalidraw drawings to svg on the fly
- Dark mode compatibility for **mkdocs** and **mkdocs-material** themes
- Lightbox support when used with **mkdocs-glightbox** (fullscreen on click)
- Select which frame of the drawing to display

## 📦 Installation
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

## 🚀 Usage
You can use this project's [docs](https://qdeli187.github.io/mkdocs-excalidraw/) as an example , lets break down how we do it.

1. Create an excalidraw drawing and save the file (I recommend using the vscode extension)
2. Add a reference to it in your markdown file as you would for an image
```markdown
![fig_name](drawings/test.excalidraw)
```
3. Thats it , the extension renders it as an svg in your browser

## 🧩 Integrations

### 🌓 Dynamic Theme
This extensions supports dynamic light/dark theme with the following mkdocs themes:

- material-mkdocs
- mkdocs (base)

This means that , when you switch the the between light and dark , the excalidraw drawings will change their theme accordingly

### 🖥 GLightbox - fullscreen and slideshow

Simply install and setup **mkdocs-glightbox** as descibed [here](https://github.com/Blueswen/mkdocs-glightbox). once done your mkdocs drawing will be clickable , and available in the slideshow of the page.

### 🪟 Frame based rendering 

Excalidraw introduced the notion of frame. You can select a part of your drawing to be part of a frame ,a drawing can hold several frames. But an object can only belong to one frame.

to render not the whole drawing but a specific frame , you can do the following :

```markdown
![alt](drawings/test.excalidraw#frame-name)
```

This feature pairs nicely with glightbox (just above) and enables you to turn an mkdocs page into a slideshow !

## 🫶 Contributing

This projects welcomes contribution ! But contribution does not have to be code. Here are great ways to help this project : 

- Fill in a detailed bug report (with console logs , screenshots and execution context)
- Make a feature requests
- Make a PR for the documentaion to impprove it or translating it
- Make a code PR but please link it to an issue

And if you have a few seconds to star this repo it would really help us reach more people ! We hope you like this plugin at least as much as we loved making it 
<!--intro-end-->