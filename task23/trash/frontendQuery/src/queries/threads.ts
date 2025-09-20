import { api } from "../services/api";

export const threadsKeys = {
  all: ["threads"] as const,
  detail: (id: string) => ["thread", id] as const,
};

export async function getThreads() {
  const response = await api.get("/thread");
  return response.data.data;
}

export async function getThreadById(id: string) {
  const response = await api.get(`/thread/${id}`);
  return response.data.data;
}

export async function postThread(input: FormData) {
  const response = await api.post("/thread", input, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data.data;
}
