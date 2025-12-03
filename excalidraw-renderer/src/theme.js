

class ThemeHandler {
    constructor() {

    }

    applyTheme(data) {
      data.appState.exportWithDarkMode = this.mode == "dark";
      data.exportPadding = 20;
      data.appState.exportEmbedScene = true;
      return data;
    }

    detectTheme() {
    }
}

class MkdocsThemeHandler extends ThemeHandler {
    constructor() {
        super();
        this.observer = new MutationObserver((mutations) => {
    }

    detectTheme() {
        let mode = document.documentElement.getAttribute("data-bs-theme");
        this.mode = mode == "light" ? "light" : "dark";
    }
}

class MaterialThemeHandler extends ThemeHandler {
    constructor() {
        super();
    }
}

class GlobalTheme {
    constructor() {
        let attr = document.body.getAttribute("data-md-color-media");
        if (attr) {
            this.handler = new MaterialThemeHandler();
        }
        else {
            this.handler = new MkdocsThemeHandler();
        }
    }

    detectTheme() {
    }
}