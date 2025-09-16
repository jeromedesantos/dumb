import { api } from "../services/api";

export const threadsKeys = {
  all: ["threads"],
};

export async function getThreads() {
  const response = await api.get("/thread");
  return response.data;
}
