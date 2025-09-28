window.EXCALIDRAW_ASSET_PATH =
  "https://esm.sh/@excalidraw/excalidraw@0.18.0/dist/prod/";

import { exportToSvg } from "@excalidraw/excalidraw";
import { v4 as uuidv4 } from 'uuid';

// Wrap everything in an IIFE to ensure execution
(function() {
 console.log(customElements.get('excalidraw-renderer'));
  class ExcalidrawRenderer extends HTMLElement {
    constructor() {
      super();
      const body = document.body;
      this.defaultColorTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";
      this.theme = body.getAttribute("data-md-color-media")
        ? "material"
        : "mkdocs";
      console.log(`Excalidraw theme: ${this.theme}`);
      this.initTheme();
    }

    initTheme() {
      if (this.theme == "material") {
        const body = document.body;
        const isLightTheme =
          body.getAttribute("data-md-color-media") ===
          "(prefers-color-scheme: light)";
        this.mode = isLightTheme ? "light" : "dark";
        this.observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.attributeName === "data-md-color-media") {
              if (body.getAttribute("data-md-color-media") === "(prefers-color-scheme: dark)" ) {
                  this.mode = "dark";
              }
              else if (body.getAttribute("data-md-color-media") === "(prefers-color-scheme: light)" ) {
                  this.mode = "light";
              }
              else {
                  this.mode = this.defaultColorTheme;
              }
              this.connectedCallback();
            }
          });
        });
        this.observer.observe(body, { attributes: true , attributeFilter: ['data-md-color-media']});
      }
      if (this.theme == "mkdocs") {
        const doc = document.documentElement;
        const isLightTheme = doc.getAttribute("data-bs-theme") === "light";
        this.mode = isLightTheme ? "light" : "dark";
        this.observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.attributeName === "data-bs-theme") {
              if (doc.getAttribute("data-bs-theme") === "dark" ) {
                  this.mode = "dark";
              }
              else if (doc.getAttribute("data-bs-theme") === "light" ) {
                  this.mode = "light";
              }
              this.connectedCallback();
            }
          });
        });
        this.observer.observe(document.documentElement, { attributes: true});
      }
    }

    handleTheme(data) {
      data.appState.exportWithDarkMode = this.mode == "dark";
      data.exportPadding = 20;
      data.appState.exportEmbedScene = true;
      return data;
    }

    connectedCallback() {
      const src = this.getAttribute("src");
      const fname = src.split('/').pop().split('.').slice(0, -1).join('-');
      fetch(src)
        .then((res) => res.json())
        .then((data) => exportToSvg(this.handleTheme(data)))
        .then((res) => {
          const uid = uuidv4();
          this.innerHTML = `<a class="glightbox" data-type="inline" href="#${fname}" data-width="500" data-height="400"><div style="display:flex;flex-direction: column;align-items: center"></div></a>`;
          const div = this.querySelector("div");
          div.appendChild(res);
          this.innerHTML = this.innerHTML + `<div id="${fname}" class="lb-clone" style="display:none"></div>`
          const popup = this.querySelector(".lb-clone")
          lightbox.insertSlide({
              content: document.getElementById('inline-example'),
              width: '90vw'
          }, 2);
          popup.appendChild(res);
        })
        .catch((e) => {
          this.innerHTML = `<div style="display:flex;flex-direction: column;align-items: center;"><p>could not load diagram : ${e}</p></div>`;
        });
    }
  }
  customElements.define("excalidraw-renderer", ExcalidrawRenderer);
})();