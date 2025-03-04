import {
  archiveNote,
  deleteNote,
  getArchivedNotes,
  getNotes,
  unarchiveNote,
} from "../data/notes-data-api.js";

const view = async () => {
  const notesContainer = document.querySelector("#notesContainer");
  const addButton = document.querySelector("#add-note-button");
  const showArchivedButton = document.querySelector("#show-archived-button"); // Tombol baru
  const showUnarchivedButton = document.querySelector(
    "#show-unarchived-button"
  );
  const deleteButton = document.querySelector("#deleteButton");
  const editButton = document.querySelector("#editButton");
  const archiveButton = document.querySelector("#archiveButton");
  const seeMoreButton = document.querySelector("#seeMoreButton");

  const displayNotes = async (archived = false) => {
    notesContainer.innerHTML = "";
    const loadingIndicator = document.createElement("loading-indicator");
    notesContainer.appendChild(loadingIndicator);

    try {
      const notesData = archived ? await getArchivedNotes() : await getNotes();

      if (!Array.isArray(notesData)) {
        throw new Error("Data format is incorrect");
      }

      notesContainer.innerHTML = "";

      const notesList = document.createElement("notes-list");
      notesList.notes = notesData;

      notesList.addEventListener("delete", async (event) => {
        try {
          const note_id = event.detail;

          const loadingIndicator = document.createElement("loading-indicator");
          notesContainer.appendChild(loadingIndicator);

          await deleteNote(note_id);
          await displayNotes();

          notesContainer.innerHTML = "";
        } catch (error) {
          console.error("Failed delete data:", error);
          notesContainer.innerHTML = "";
          notesContainer.textContent =
            "Failed to delete note. Please try again.";
        }
      });

      notesList.addEventListener("archive", async (event) => {
        try {
          const note_id = event.detail;

          await archiveNote(note_id);
          await displayNotes();
        } catch (error) {
          console.error("Failed archive data:", error);
          notesContainer.textContent =
            "Failed to delete note. Please try again.";
        }
      });

      notesList.addEventListener("unarchive", async (event) => {
        try {
          const note_id = event.detail;

          await unarchiveNote(note_id);
          await displayNotes();
        } catch (error) {
          console.error("Failed archive data:", error);
          notesContainer.textContent =
            "Failed to delete note. Please try again.";
        }
      });

      notesContainer.appendChild(notesList);
    } catch (error) {
      console.error("Failed to load data:", error);
      notesContainer.innerHTML = "";
      notesContainer.textContent = "Failed to load notes. Please try again.";
    }
  };
  await displayNotes();

  showArchivedButton.addEventListener("click", async () => {
    await displayNotes(true);
  });

  showUnarchivedButton.addEventListener("click", async () => {
    await displayNotes(false);
  });

  addButton.addEventListener("click", () => {
    const formNotes = document.createElement("form-notes");
    document.body.appendChild(formNotes);

    formNotes.addEventListener("note-added", async () => {
      const loadingIndicator = document.createElement("loading-indicator");
      notesContainer.appendChild(loadingIndicator);

      await displayNotes();

      notesContainer.innerHTML = "";
    });
  });
};

export default view;
