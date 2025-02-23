class Footer extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");

    this._companyName = "My Awesome App";
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
    const backgroundColor = this._theme === "primary" ? "#393e46" : "black";
    const textColor = this._theme === "primary" ? "#eeeeee" : "#fff";

    this._style.textContent = `
        :host {
          display: block;
          background-color: ${backgroundColor};
          color: ${textColor};
          padding: 20px;
          text-align: center;
        }
  
        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
        }
  
        .footer-links {
          margin: 10px 0;
        }
  
        .footer-links a {
          color: ${textColor};
          text-decoration: none;
          margin: 0 10px;
        }
  
        .footer-links a:hover {
          text-decoration: underline;
        }
  
        .social-media {
          margin: 10px 0;
        }
  
        .social-media a {
          color: ${textColor};
          text-decoration: none;
          margin: 0 10px;
          font-size: 1.2rem;
        }
  
        .social-media a:hover {
          opacity: 0.8;
        }
  
        .footer-copyright {
          margin-top: 20px;
          font-size: 0.9rem;
          opacity: 0.8;
        }
      `;

    this._shadowRoot.innerHTML = `
        <div class="footer-content">
          <div class="footer-links">
            <a href="https://www.dicoding.com/">About Us</a>
            <a href="https://www.dicoding.com/">Contact</a>
            <a href="https://www.dicoding.com/">Privacy Policy</a>
            <a href="https://www.dicoding.com/">Terms of Service</a>
          </div>
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
