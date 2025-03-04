import notes from "../../assets/img/logo.png";

class Navbar extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");

    this._style.textContent = `
          :host {
            display: flex;
            padding: 0px 20px;
            background: var(--primary) !important;
            color: var(--font) !important;
            align-items: center;
            font-size: 1rem;
            text-align: center;
            border-style: solid;
            border-color: black;
          }
    
          .brand-name {
            display: flex;
            align-items: center;
            gap: 10px; 
          }
    
          .brand-name img {
            width: 40px; 
            height: auto;
          }
        `;

    this.render();
  }

  render() {
    this._shadowRoot.innerHTML = `
        <div class="brand-name">
          <img src="${notes}" alt="Notoria Logo">
          <h1>Notori</h1>
        </div>
      `;
    this._shadowRoot.appendChild(this._style);
  }
}

customElements.define("nav-bar", Navbar);
