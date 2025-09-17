import { api } from "../services/api";

export const repliesKeys = {
  all: ["replies"] as const,
  detail: (id: string) => ["reply", id] as const,
};

export async function getReplyById(id: string) {
  const response = await api.get(`/reply/${id}`);
  return response.data.data;
}
