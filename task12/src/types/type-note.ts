export type Note = {
  id: number;
  text: string;
  done: boolean;
};

// Tipe Notes → Biasakan pakai bentuk jamak untuk array, tunggal untuk item
// Kamu pakai type Notes = { id: number; text: string }, tapi nama Notes biasanya dipakai untuk array. Lebih baik:
