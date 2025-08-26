import { nanoid } from "nanoid";

export function generateKey(schema: string) {
  return `${schema}_${Date.now().toString(36)}_${nanoid(6)}`;
}
