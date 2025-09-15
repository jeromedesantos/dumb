import { api } from "../services/api";

export const usersKeys = {
  all: ["users"],
};

export async function getVerify() {
  const response = await api.get("/verify");
  return response.data;
}

export async function getUsers() {
  const response = await api.get("/user");
  return response.data;
}

export async function loginUser(input: {
  emailOrUsername: string;
  password: string;
}) {
  const response = await api.post("/login", input);
  return response.data;
}

export async function registerUser(input: {
  full_name: string;
  email: string;
  password: string;
}) {
  const response = await api.post("/register", input);
  return response.data;
}

export async function forgotUser(input: { email: string }) {
  const response = await api.post("/forgot", input);
  return response.data;
}

export async function resetUser(id: string, input: { password: string }) {
  const response = await api.put(`/reset/${id}`, input);
  return response.data;
}
