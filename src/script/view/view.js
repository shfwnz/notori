import {
  archiveNote,
  deleteNote,
  getArchivedNotes,
  getNotes,
  unarchiveNote,
} from "../data/notes-data-api.js";

import Swal from "sweetalert2";

const view = async () => {
  const notesContainer = document.querySelector("#notesContainer");
  const addButton = document.querySelector("#add-note-button");
  const showArchivedButton = document.querySelector("#show-archived-button");
  const showUnarchivedButton = document.querySelector(
    "#show-unarchived-button",
  );
  const loadingIndicator = document.createElement("loading-indicator");

  const displayNotes = async (archived = false) => {
    notesContainer.innerHTML = "";
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

          notesContainer.innerHTML = "";
          notesContainer.appendChild(loadingIndicator);

          await deleteNote(note_id);
          await displayNotes(archived);

          Swal.fire({
            title: "Deleted!",
            text: "Deleting successfully",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
        } catch (error) {
          console.error("Failed delete note:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed delete note",
            icon: "error",
            showConfirmButton: "ok",
          });
        }
      });

      notesList.addEventListener("archive", async (event) => {
        try {
          const note_id = event.detail;

          notesContainer.innerHTML = "";
          notesContainer.appendChild(loadingIndicator);

          await archiveNote(note_id);
          await displayNotes(archived);

          Swal.fire({
            title: "Archived!",
            text: "Note Archived",
            icon: "info",
            timer: 1500,
            showConfirmButton: false,
          });
        } catch (error) {
          console.error("Failed archive note:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed archive note",
            icon: "error",
            showConfirmButton: "ok",
          });
        }
      });

      notesList.addEventListener("unarchive", async (event) => {
        try {
          const note_id = event.detail;

          notesContainer.innerHTML = "";
          notesContainer.appendChild(loadingIndicator);

          await unarchiveNote(note_id);
          await displayNotes(archived);

          Swal.fire({
            title: "Unarchived!",
            text: "Note unarchived",
            icon: "info",
            timer: 1500,
            showConfirmButton: false,
          });
        } catch (error) {
          console.error("Failed unarchive note:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed unarchive note",
            icon: "error",
            showConfirmButton: "ok",
          });
        }
      });

      notesContainer.appendChild(notesList);
    } catch (error) {
      console.error("Failed to load notes:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to load notes",
        icon: "error",
        showConfirmButton: "ok",
      });
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
      try {
        notesContainer.innerHTML = "";
        notesContainer.appendChild(loadingIndicator);

        await displayNotes();

        Swal.fire({
          title: "Added!",
          text: "Note added",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Failed insert note:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed insert note",
          icon: "error",
          showConfirmButton: "ok",
        });
      }
    });
  });
};

export default view;
