import ExcalidrawRenderer from "./renderer";

// Wrap everything in an IIFE to ensure execution
(function () {
  // window.EXCALIDRAW_ASSET_PATH =
  // "https://esm.sh/@excalidraw/excalidraw@0.18.0/dist/prod/";

  customElements.define("excalidraw-renderer", ExcalidrawRenderer);
})();
