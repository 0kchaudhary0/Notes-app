import { useSelector } from "react-redux";
import NoteForm from "../components/NoteForm.jsx";
import NoteItem from "../components/NoteItem.jsx";

function Dashboard() {
  const { items, loading, error } = useSelector((state) => state.notes);

  return (
    <div>
      <h1>Your Notes</h1>

      <NoteForm />

      {error && <p className="error">{error}</p>}
      {loading && <p>Loading notes...</p>}

      {!loading && items.length === 0 && <p>No notes yet. Add your first one!</p>}

      <div className="notes-list">
        {items.map((note) => (
          <NoteItem key={note._id} note={note} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
