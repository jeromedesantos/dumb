import { nanoid } from "nanoid";

export function generateKey(schema: string) {
  const key = {
    schema: schema.toLowerCase(),
    year: new Date().getFullYear().toString().slice(2),
    unique: nanoid(5) + "-" + nanoid(2),
  };
  return key.schema + key.year + "_" + key.unique;
}
