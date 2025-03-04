class Footer extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");

    this._companyName = "Shafwan Ilham Dzaky";
    this._theme = "dark";

    this.render();
  }

  static get observedAttributes() {
    return ["company-name", "theme"];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === "company-name") {
        this._companyName = newValue;
      } else if (name === "theme") {
        this._theme = newValue;
      }
      this.render();
    }
  }

  render() {
    const backgroundColor = this._theme === "default" ? "transparent" : "black";
    const textColor = this._theme === "default" ? "black" : "#fff";

    this._style.textContent = `
        :host {
          display: block;
          background-color: ${backgroundColor};
          color: ${textColor};
          margin-top: 20px;
          padding: 20px;
          text-align: center;
        }
  
        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
        }
      `;

    this._shadowRoot.innerHTML = `
        <div class="footer-content">
          <div class="footer-copyright">
            &copy; ${new Date().getFullYear()} ${
      this._companyName
    }. All rights reserved.
          </div>
        </div>
      `;

    this._shadowRoot.appendChild(this._style);
  }
}

customElements.define("foot-er", Footer);
