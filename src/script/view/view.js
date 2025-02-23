import NotesData from "../data/notes-data.js";

const view = () => {
  const notesContainer = document.querySelector("#notesContainer");
  const addButton = document.querySelector("#add-note-button");

  const displayNotes = () => {
    notesContainer.innerHTML = "";

    console.log("Data Notes:", NotesData);

    const notesList = document.createElement("notes-list");
    notesList.notes = NotesData;
    notesContainer.appendChild(notesList);
  };
  displayNotes();

  addButton.addEventListener("click", () => {
    const formNotes = document.createElement("form-notes");
    document.body.appendChild(formNotes);

    formNotes.addEventListener("add-note", (event) => {
      const newNote = event.detail;
      console.log("New Note:", newNote);
    });
  });
};

export default view;
