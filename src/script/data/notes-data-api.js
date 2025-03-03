const baseUrl = "https://notes-api.dicoding.dev/v2";

const getNotes = async () => {
  try {
    const response = await fetch(`${baseUrl}/notes`);
    const responseJson = await response.json();

    if (!response.ok) {
      throw new Error(responseJson.message || "Something went wrong!");
    }

    return responseJson.data || [];
  } catch (error) {
    console.log("error");
    return [];
  }
};

const addNotes = async (note) => {
  try {
    const response = await fetch(`${baseUrl}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
    });

    const responseJson = await response.json();

    if (!response.ok) {
      throw new Error(responseJson.message || "Something went wrong!");
    }

    return responseJson.data;
  } catch (error) {
    console.error("Failed to add data:", error);
  }
};

const updateNote = async (note_id, updatedNote) => {
  try {
    const response = await fetch(`${baseUrl}/notes/${note_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedNote),
    });

    const responseJson = await response.json();

    if (!response.ok) {
      throw new Error(responseJson.message || "Something went wrong!");
    }

    return responseJson.data;
  } catch (error) {
    console.error("Failed to update data:", error);
  }
};

const deleteNote = async (note_id) => {
  try {
    const response = await fetch(`${baseUrl}/notes/${note_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });

    const responseJson = await response.json();

    if (!response.ok) {
      throw new Error(responseJson.message || "Something went wrong!");
    }

    return responseJson;
  } catch (error) {
    console.error("Failed to delete data:", error);
  }
};

export { getNotes, addNotes, updateNote, deleteNote };
