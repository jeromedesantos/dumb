import { useState, type ChangeEvent, type FormEvent } from "react";
import { type Note } from "./types/type-note";
import List from "./components/List";
import "./assets/style.css";

// 🧠 ChangeEvent<HTMLInputElement>
// - Dipakai untuk elemen seperti <input type="text">, <input type="number">, <input type="email">, dll.
// - e.currentTarget bertipe HTMLInputElement, jadi kamu bisa akses properti seperti:
// - .value
// - .checked (untuk checkbox)
// - .files (untuk file input

// 🧠 ChangeEvent<HTMLTextAreaElement>
// - Dipakai untuk <textarea> saja.
// - e.currentTarget bertipe HTMLTextAreaElement, properti yang tersedia:
// - .value
// - .rows, .cols, dll

// 🧠 Kenapa pakai React.FormEvent<HTMLFormElement>?
// - FormEvent adalah tipe event yang dikirim saat form disubmit.
// - HTMLFormElement memastikan bahwa e.currentTarget punya properti seperti .action, .method, dll.
// - Tanpa ini, TypeScript bakal bingung dan kamu bisa dapat error saat akses properti.

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [inputNote, setInputNote] = useState<string>("");

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setInputNote(e.currentTarget.value);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inputNote.trim() !== "") {
      setNotes([
        ...notes,
        {
          id: notes.length + 1,
          text: inputNote,
          done: false,
        },
      ]);
      setInputNote("");
    }
  }

  return (
    <div className="App">
      <h1>Notes</h1>
      <form className="note-input" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add a note"
          value={inputNote}
          onChange={handleInputChange}
        />
        <button>Add</button>
      </form>
      <List notes={notes} setNotes={setNotes} />
    </div>
  );
}

export default App;
