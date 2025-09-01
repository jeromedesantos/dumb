import { type Prop } from "../types/type-prop";

// function List({ notes }: { notes: Note[] }, setNotes: (notes: Note[]) => void): JSX.Element
// ❌ Ini bukan bentuk komponen React yang valid. React komponen harus menerima satu parameter yaitu props, bukan dua argumen terpisah.
// ✅ Solusi: Gabungkan props jadi satu object

function List({ notes, setNotes }: Prop) {
  function handleDelete(id: number) {
    setNotes(notes.filter((note) => note.id !== id));
  }

  function handleToggle(id: number) {
    setNotes(
      notes.map((note) => {
        if (note.id === id) {
          return { ...note, done: !note.done };
        }
        return note;
      })
    );
  }

  return (
    <ul className="note-list">
      {notes.map((note) => (
        <li key={note.id} onClick={() => handleToggle(note.id)}>
          <span style={{ textDecoration: note.done ? "line-through" : "none" }}>
            {note.text}
          </span>
          <button
            className="delete-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(note.id);
            }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default List;
