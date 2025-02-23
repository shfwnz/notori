class NotesList extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  _column = 2;
  _gutter = 16;

  static get observedAttributes() {
    return ["column", "gutter"];
  }

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
    this._notes = [];
    this._style.textContent = `
        :host {
            display: block;
            margin: 10px 20px;
        }
        
        .list {
            display: grid;
            grid-template-columns: ${"1fr ".repeat(this._column)};
        
            gap: ${this.gutter}px;
        }

        @media only screen and (max-width: 700px) {
            .list { 
                grid-template-columns: 1fr;
            }
        }
    `;

    this.render();
  }

  set notes(value) {
    this._notes = value;
    this.render();
  }

  set column(value) {
    const newValue = Number(value);

    this._column = value;
  }

  get column() {
    return this._column;
  }

  get gutter() {
    return this._gutter;
  }

  render() {
    this._shadowRoot.innerHTML = "";
    this._shadowRoot.appendChild(this._style);

    const listContainer = document.createElement("div");
    listContainer.classList.add("list");

    this._notes.forEach((note) => {
      const noteElement = document.createElement("notes-item");
      noteElement.notes = note;
      listContainer.appendChild(noteElement);
    });

    this._shadowRoot.appendChild(listContainer);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "column":
        this.column = newValue;
        break;
      case "gutter":
        this.gutter = newValue;
        break;
    }

    this.render();
  }
}

customElements.define("notes-list", NotesList);
