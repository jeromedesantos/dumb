import { api } from "../services/api";

export const repliesKeys = {
  all: ["replies"] as const,
  detail: (threadId: string) => ["reply", threadId] as const,
};

export async function getReplyById(threadId: string) {
  const response = await api.get(`/thread/${threadId}/reply`);
  return response.data.data;
}

export async function postReplyById(input: FormData, threadId: string) {
  const response = await api.post(`/thread/${threadId}/reply`, input, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data.data;
}
