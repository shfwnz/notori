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
              align-items: center;
              background: var(--primary) !important;
              color: var(--font) !important;
              padding: 0px 20px;
              font-size: 1.5rem;
              text-align: center;
              border-radius: 32px;
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
          <img src="../src/public/img/notes.png" alt="Notoria Logo">
          <h1>Notoria</h1>
        </div>
      `;
    this._shadowRoot.appendChild(this._style);
  }
}

customElements.define("nav-bar", Navbar);
