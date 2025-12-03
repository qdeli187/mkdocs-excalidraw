import { exportToBlob } from "@excalidraw/excalidraw";
import GlobalTheme from "./theme";
import { filterDrawing, renderDrawing, handleLightbox } from "./utils";

class ExcalidrawRenderer extends HTMLElement {
  constructor() {
    super();
    this.theme = new GlobalTheme();
    this.handleSrc();
    this.addEventListener("click", this.onclick);
    this.theme.handler.onModeChange((newMode) => this.connectedCallback());
  }

  handleSrc() {
    this.src = this.getAttribute("src");
    this.path = this.src;
    this.frame = null;
    if (this.src.includes("#")) {
      this.frame = this.src.split("#").at(-1);
      this.path = this.src.split("#").at(0);
    }
  }

  onclick() {
    if (typeof lightbox !== "undefined") {
      const src = this.getAttribute("src");
      const index = lightbox.elements.findIndex(
        (e) => e.instance.element.alt == src,
      );
      if (index > -1) {
        lightbox.openAt(index);
      }
    }
  }

  connectedCallback() {
    fetch(this.path)
      .then((res) => res.json())
      .then((data) => filterDrawing(data, this.frame))
      .then((data) => {
        data = exportToBlob(this.theme.applyTheme(data));
        let imageUrl = renderDrawing(data);
        var style = "display: flex; justify-content: center;";
        style = handleLightbox(this.src, imageUrl);
        this.innerHTML = `<div style="${style}"><img src="${imageUrl}" /></div>`;
      })
      .catch((e) => {
        this.innerHTML = `<div style="display:flex;flex-direction: column;align-items: center;"><p>could not load diagram : ${e}</p></div>`;
      });
  }
}

export default ExcalidrawRenderer;
