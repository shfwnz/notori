import { deleteNote, getNotes } from "../data/notes-data-api.js";

const view = async () => {
  const notesContainer = document.querySelector("#notesContainer");
  const addButton = document.querySelector("#add-note-button");
  const deleteButton = document.querySelector("#deleteButton");
  const editButton = document.querySelector("#editButton");
  const archiveButton = document.querySelector("#archiveButton");
  const seeMoreButton = document.querySelector("#seeMoreButton");

  const displayNotes = async () => {
    notesContainer.innerHTML = "";

    try {
      const notesData = await getNotes();

      if (!Array.isArray(notesData)) {
        throw new Error("Data format is incorrect");
      }

      const notesList = document.createElement("notes-list");
      notesList.notes = notesData;

      notesList.addEventListener("delete", async (event) => {
        try {
          const note_id = event.detail;

          await deleteNote(note_id);
          await displayNotes();
        } catch (error) {
          console.error("Failed delete data:", error);
        }
      });

      notesContainer.appendChild(notesList);
    } catch (error) {
      console.error("Failed to load data:", error);
    }
  };
  await displayNotes();

  addButton.addEventListener("click", () => {
    const formNotes = document.createElement("form-notes");
    document.body.appendChild(formNotes);

    formNotes.addEventListener("note-added", async () => {
      await displayNotes();
    });
  });
};

export default view;
