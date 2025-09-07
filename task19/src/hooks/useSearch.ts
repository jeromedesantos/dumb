import type { MovieType } from "@/types/movie";
import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

export const useSearch = (query: string) =>
  useQuery({
    queryKey: ["search", query],
    queryFn: async () => {
      if (!query) return [];
      const {
        data: { description },
      } = await api.get("/search", {
        params: {
          q: query,
        },
      });

      const cleaned = description.map((obj: MovieType) =>
        Object.fromEntries(
          Object.entries(obj).map(([key, value]) => [
            key.replace(/^#/, "").toLowerCase(),
            value,
          ])
        )
      );

      return cleaned;
    },
  });
