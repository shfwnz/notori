import { addNotes } from "../data/notes-data-api.js";
class FormNotes extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");

    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleClose = this._handleClose.bind(this);
    this._handleInputValidation = this._handleInputValidation.bind(this);
  }

  connectedCallback() {
    this.render();
    this._attachEventListeners();
  }

  disconnectedCallback() {
    this._removeEventListeners();
  }

  _attachEventListeners() {
    const form = this._shadowRoot.querySelector("form");
    const closeButton = this._shadowRoot.querySelector(".close-button");
    const titleInput = this._shadowRoot.querySelector("#title");
    const bodyInput = this._shadowRoot.querySelector("#body");

    form.addEventListener("submit", this._handleSubmit);
    closeButton.addEventListener("click", this._handleClose);

    titleInput.addEventListener("input", this._handleInputValidation);
    bodyInput.addEventListener("input", this._handleInputValidation);
  }

  _removeEventListeners() {
    const form = this._shadowRoot.querySelector("form");
    const closeButton = this._shadowRoot.querySelector(".close-button");
    const titleInput = this._shadowRoot.querySelector("#title");
    const bodyInput = this._shadowRoot.querySelector("#body");

    form.removeEventListener("submit", this._handleSubmit);
    closeButton.removeEventListener("click", this._handleClose);

    titleInput.removeEventListener("input", this._handleInputValidation);
    bodyInput.removeEventListener("input", this._handleInputValidation);
  }

  _handleSubmit(event) {
    event.preventDefault();

    const title = this._shadowRoot.querySelector("#title").value;
    const body = this._shadowRoot.querySelector("#body").value;

    if (!title || !body) {
      alert("Title and body cannot be empty!");
      return;
    }

    const newNote = {
      title,
      body,
    };

    addNotes(newNote)
      .then(() => {
        this.dispatchEvent(new CustomEvent("note-added"));
        this._handleClose();
      })
      .catch((error) => {
        console.error("Failed to add data:", error);
        alert("error");
      });
  }

  _handleClose() {
    this.remove();
  }

  _handleInputValidation(event) {
    const input = event.target;
    const errorMessage = this._shadowRoot.querySelector(`#${input.id}-error`);

    if (input.validity.valid) {
      if (errorMessage) {
        errorMessage.textContent = "";
        errorMessage.style.display = "none";
      }
    } else {
      this._showValidationError(input, errorMessage);
    }
  }

  _showValidationError(input, errorMessage) {
    if (!errorMessage) {
      errorMessage = document.createElement("div");
      errorMessage.id = `${input.id}-error`;
      errorMessage.className = "error-message";
      input.parentNode.appendChild(errorMessage);
    }

    if (input.validity.valueMissing) {
      errorMessage.textContent = "This field is required.";
    } else if (input.validity.tooShort) {
      errorMessage.textContent = `Minimum length is ${input.minLength} characters.`;
    } else if (input.validity.patternMismatch) {
      errorMessage.textContent = "Invalid input format.";
    }

    errorMessage.style.display = "block";
  }

  render() {
    this._style.textContent = `
        :host {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
  
        .form-container {
          background: var(--secondary);
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          width: 300px;
        }
  
        .form-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
  
        .form-header h2 {
          margin: 0;
        }
  
        .close-button {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
        }
  
        .form-group {
          margin-bottom: 15px;
        }
  
        .form-group label {
          display: block;
          margin-bottom: 5px;
        }
  
        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 8px;
          background: var(--primary);
          color: var(--font);
          box-sizing: border-box;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
  
        .form-group textarea {
          resize: vertical;
          height: 100px;
        }
  
        .submit-button {
          width: 100%;
          padding: 10px;
          background: var(--primary);
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
  
        .submit-button:hover {
          background: var(--background);
        }
  
        .error-message {
          color: white;
          font-size: 0.8rem;
          margin-top: 5px;
          display: none;
        }
      `;

    this._shadowRoot.innerHTML = `
        <div class="form-container">
          <div class="form-header">
            <h2>Add Note</h2>
            <button class="close-button">&times;</button>
          </div>
          <form>
            <div class="form-group">
              <label for="title">Title</label>
              <input type="text" id="title" required minlength="3" />
              <div id="title-error" class="error-message"></div>
            </div>
            <div class="form-group">
              <label for="body">Body</label>
              <textarea id="body" required minlength="10"></textarea>
              <div id="body-error" class="error-message"></div>
            </div>
            <button type="submit" class="submit-button">Save</button>
          </form>
        </div>
      `;

    this._shadowRoot.appendChild(this._style);
  }
}

customElements.define("form-notes", FormNotes);
