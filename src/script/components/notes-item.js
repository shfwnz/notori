class NotesItem extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  _notes = {
    id: null,
    title: null,
    body: null,
    createdAt: null,
    archived: null,
  };

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
    this._style.textContent = `
      :host {
        display: block;
        border-radius: 24px;
        overflow: hidden;
      }

      .card {
        background: var(--primary);
        color: var(--font);
        padding: 24px;
        width: auto;
        height: 200px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      }

      .notes-title {
        font-size: 1.2rem;
        margin-bottom: 8px;
      }

      .notes-body {
        font-size: 1rem;
        margin-bottom: 8px;
      }

      .notes-date {
        font-size: 0.8rem;
        opacity: 0.8;
      }
      @media only screen and (max-width: 700px) {
        .card { 
            min-height: 250px;
        }
      }
    `;

    this._shadowRoot.appendChild(this._style);
    this.render();
  }

  set notes(value) {
    console.log("Received notes:", value);
    this._notes = value;
    this.render();
  }

  render() {
    const formattedDate = new Date(this._notes.createdAt).toLocaleDateString(
      "id-ID",
      { day: "numeric", month: "long", year: "numeric" }
    );

    this._shadowRoot.innerHTML = `<div class="card">
        <div class="notes-info">
            <div class="notes-info__title">
                <h2>${this._notes.title}</h2>
            </div>
            <div class="notes-info__body">
                <p>${this._notes.body}</p>
            </div>
            <div class="notes-info__create">
                <p>${formattedDate}</p>
            </div>
            <div class="notes-info__archive">
                <p>${this._notes.archived ? "Archived" : "Active"}</p>
            </div>
        </div>
    </div>`;

    this._shadowRoot.appendChild(this._style);
  }
}

customElements.define("notes-item", NotesItem);
