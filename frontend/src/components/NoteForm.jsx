import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNote } from "../store/notesSlice.js";

function NoteForm() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) return;

    dispatch(addNote({ title, content }));

    // Clear the form after adding
    setTitle("");
    setContent("");
  };

  return (
    <form className="note-form">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Write your note here..."
        rows="4"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">Add Note</button>
    </form>
  );
}

export default NoteForm;
