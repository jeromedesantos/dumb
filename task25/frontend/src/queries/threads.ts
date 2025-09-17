import { api } from "../services/api";

export const threadsKeys = {
  all: ["threads"],
};

export async function getThreads() {
  const response = await api.get("/thread");
  return response.data;
}

export async function postThreads(input: FormData) {
  const response = await api.post("/thread", input, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}
