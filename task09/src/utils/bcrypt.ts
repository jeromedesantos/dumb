import bcrypt from "bcrypt";

export async function hashPassword(password: any) {
  return await bcrypt.hash(password, 10);
}

export async function comparePassword(password: any, hash: any) {
  return await bcrypt.compare(password, hash);
}
