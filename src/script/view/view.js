import { getNotes } from "../data/notes-data-api.js";

const view = async () => {
  const notesContainer = document.querySelector("#notesContainer");
  const addButton = document.querySelector("#add-note-button");

  const displayNotes = async () => {
    notesContainer.innerHTML = "";

    try {
      const notesData = await getNotes();

      if (!Array.isArray(notesData)) {
        throw new Error("Data format is incorrect");
      }

      console.log("Data Notes:", notesData);

      const notesList = document.createElement("notes-list");
      notesList.notes = notesData;
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
