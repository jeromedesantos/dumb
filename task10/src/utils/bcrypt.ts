import { hash, compare } from "bcrypt";

export async function hashPassword(password: any) {
  return await hash(password, 10);
}

export async function comparePassword(password: any, hash: any) {
  return await compare(password, hash);
}
