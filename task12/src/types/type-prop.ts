import { type Dispatch, type SetStateAction } from "react";
import { type Note } from "./type-note";

export type Prop = {
  notes: Note[];
  setNotes: Dispatch<SetStateAction<Note[]>>;
};

// 🔍 Apa itu Dispatch<T>?
// Bayangkan Dispatch<T> sebagai fungsi yang menerima nilai baru atau updater function:
// type Dispatch<T> = (value: T) => void;

// Jadi setNotes bisa dipanggil dengan:
// - Nilai langsung: setNotes([{ id: 1, text: "Hello" }])
// - Atau fungsi updater:
// setNotes((prevNotes) => [...prevNotes, newNote]);

// 🔍 Apa itu SetStateAction<T>?
// Ini adalah union type:
// type SetStateAction<T> = T | ((prevState: T) => T);

// Artinya kamu bisa:
// - Kirim nilai langsung (Note[])
// - Atau kirim fungsi yang menerima prevState dan mengembalikan Note[]

// 🔧 Jadi Kesimpulannya:
// setNotes: React.Dispatch<React.SetStateAction<Note[]>>

// ...berarti:
// “Ini adalah fungsi yang bisa menerima array baru Note[] atau fungsi yang menghasilkan array baru berdasarkan array sebelumnya.”
