import { getCookie } from "@/lib/cookie";
import { atom } from "recoil";

export const authAtom = atom<string | null>({
  key: "authAtom",
  default: getCookie(),
});
