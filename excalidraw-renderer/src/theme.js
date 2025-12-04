class ThemeHandler {
  _modeChangeCallbacks = [];
  _mode;

  constructor() {
    this.detectTheme();
    this.observer = new MutationObserver(this.handleMutations.bind(this));
    this.start();
  }
  detectTheme() {}
  handleMutations(mutations) {}
  start() {}

  get mode() {
    return this._mode;
  }

  set mode(value) {
    if (this._mode !== value) {
      this._mode = value;
      this.notifyModeChange();
    }
  }

  onModeChange(callback) {
    this._modeChangeCallbacks.push(callback);
  }

  notifyModeChange() {
    this._modeChangeCallbacks.forEach(cb => cb(this._mode));
  }

  applyTheme(data) {
    data.appState.exportWithDarkMode = this.mode == "dark";
    data.exportPadding = 20;
    data.appState.exportEmbedScene = true;
    return data;
  }
}

class MkdocsThemeHandler extends ThemeHandler {
  constructor() {
    super();
  }

  handleMutations(mutations) {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === "data-bs-theme") {
        this.detectTheme();
      }
    });
  }

  detectTheme() {
    let mode = document.documentElement.getAttribute("data-bs-theme");
    this.mode = mode == "light" ? "light" : "dark";
  }

  start() {
    this.observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-bs-theme"],
    });
  }
}

class MaterialThemeHandler extends ThemeHandler {
  constructor() {
    super();
  }

  handleMutations(mutations) {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === "data-md-color-media") {
        this.detectTheme();
      }
    });
  }

  detectTheme() {
    let info = document.body.getAttribute("data-md-color-media");
    let isLightTheme = info === "(prefers-color-scheme: light)";
    this.mode = isLightTheme ? "light" : "dark";
  }

  start() {
    this.observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-md-color-media"],
    });
  }
}

class GlobalTheme {
  constructor() {
    let attr = document.body.getAttribute("data-md-color-media");
    if (attr) {
      this.handler = new MaterialThemeHandler();
    } else {
      this.handler = new MkdocsThemeHandler();
    }
  }

  applyTheme(data){
    return this.handler.applyTheme(data)
  }
}

export default GlobalTheme;
