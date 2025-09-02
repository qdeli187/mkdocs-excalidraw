const { exportToSvg } = ExcalidrawUtils;
class ExcalidrawRenderer extends HTMLElement {
    connectedCallback() {
        const src = this.getAttribute("src")
        fetch(src)
            .then(res => res.json())
            .then(data => exportToSvg(data))
            .then(res => {
                this.innerHTML = `<div style="display:flex;flex-direction: column;align-items: center;"></div>`
                const div = this.querySelector('div');
                div.appendChild(res);
            })
    }
}
customElements.define('excalidraw-renderer', ExcalidrawRenderer)