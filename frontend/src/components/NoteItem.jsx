import { useDispatch } from "react-redux";
import { deleteNote } from "../store/notesSlice.js";

function NoteItem({ note }) {
  const dispatch = useDispatch();

  return (
    <div className="note-card">
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <button className="delete-btn" onClick={() => dispatch(deleteNote(note._id))}>
        Delete
      </button>
    </div>
  );
}

export default NoteItem;
