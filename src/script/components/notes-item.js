import anime from "animejs/lib/anime.es.js";
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
      }

      .card {
        background: var(--primary);
        color: var(--font);
        padding: 24px;
        width: auto;
        height: auto;
        border-style: solid;
        border-color: black;
        box-shadow: 5px 7px black;
        position: relative;
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
        margin-bottom: 8px;
      }

      .notes-archive {
        font-size: 0.8rem;
        opacity: 0.8;
        margin-bottom: 16px;
      }

      .actions {
        display: flex;
        gap: 8px;
        margin-top: 16px;
      }

      .actions button {
        font-weight: bold;
        color: var(--font);
        background-color: var(--secondary);

        padding: 8px 16px;

        border-style: solid;
        border-color: black;
        
        cursor: pointer;
        font-size: 0.9rem;
      }

      @media only screen and (max-width: 700px) {
        .card { 
            min-height: 250px;
        }
      }
    `;

    this._shadowRoot.appendChild(this._style);
    this.render();

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animateCard();
            this.observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    this.observer.observe(this);
  }

  set notes(value) {
    console.log("Received notes:", value);
    this._notes = value;
    this.render();
  }

  animateCard() {
    anime({
      targets: this,
      opacity: [0, 1],
      translateY: [100, 0],
      translateX: [-100, 0],
      duration: 1000,
      easing: "easeOutExpo",
    });
  }

  render() {
    const formattedDate = new Date(this._notes.createdAt).toLocaleDateString(
      "id-ID",
      { day: "numeric", month: "long", year: "numeric" }
    );

    this._shadowRoot.innerHTML = `
      <div class="card">
        <div class="notes-info">
            <div class="notes-info__title">
                <h2>${this._notes.title}</h2>
            </div>
            <div class="notes-info__body">
                <p>${this._notes.body}</p>
            </div>
            <div class="notes-info__create">
                <p class="notes-date">${formattedDate}</p>
            </div>
            <div class="notes-info__archive">
                <p class="notes-archive">${
                  this._notes.archived ? "Archived" : "Active"
                }</p>
            </div>
            <div class="actions">
                <button id="deleteButton" class="delete">Delete</button>
                <button id="archiveButton" class="archive">${
                  this._notes.archived ? "Unarchive" : "Archive"
                }</button>
                <button id="seeMoreButton" class="see-more">See More</button>
            </div>
        </div>
      </div>
    `;

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot
      .querySelector(".delete")
      .addEventListener("click", () => this._handleDelete());
    this._shadowRoot
      .querySelector(".archive")
      .addEventListener("click", () => this._handleArchive());
    this._shadowRoot
      .querySelector(".see-more")
      .addEventListener("click", () => this._handleSeeMore());
  }

  _handleDelete() {
    this.dispatchEvent(new CustomEvent("delete", { detail: this._notes.id }));
  }

  _handleArchive() {
    if (this._notes.archived) {
      this.dispatchEvent(
        new CustomEvent("unarchive", { detail: this._notes.id })
      );
    } else {
      this.dispatchEvent(
        new CustomEvent("archive", { detail: this._notes.id })
      );
    }
  }

  _handleSeeMore() {
    this.dispatchEvent(new CustomEvent("see-more", { detail: this._notes.id }));
  }
}

customElements.define("notes-item", NotesItem);
