class LoadingIndicator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: inline-flex;
            align-items: center;
            gap: 10px; /* Memberikan jarak antara spinner dan teks */
          }
          .loader {
            border: 4px solid #f3f3f3;
            border-top: 4px solid #3498db;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            animation: spin 1s linear infinite;
          }
          .loading-text {
            font-size: 16px;
            color: #555; /* Warna abu-abu */
            font-weight: bold;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        </style>
        <div class="loader"></div>
        <span class="loading-text">Loading...</span>
      `;
  }
}

customElements.define("loading-indicator", LoadingIndicator);
