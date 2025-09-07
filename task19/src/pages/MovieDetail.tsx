import type { MovieType } from "@/types/movie";
import { Link, useParams } from "react-router-dom";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Star } from "lucide-react";

export const MovieDetail = ({ data }: { data: MovieType[] }) => {
  const { movieId } = useParams();
  const movie: MovieType | undefined = data.find(
    (movie) => movie.imdb_id === movieId
  );

  if (!movie) {
    return (
      <div className="text-center text-xl font-bold mt-20">
        Movie Not Found!
      </div>
    );
  }
  return (
    <Card className="w-full pt-0 text-justify flex flex-col gap-10 bg-white dark:bg-zinc-900 border-2 shadow-lg rounded-2xl">
      <img
        src={movie.img_poster}
        alt={movie.title}
        className="h-100 w-full rounded-t-2xl object-cover object-center"
      />
      <CardHeader className="px-20 flex flex-col gap-2">
        <CardTitle className="text-3xl font-bold cursor-pointer transition duration-500 hover:text-zinc-600 dark:hover:text-zinc-400">
          <Link to={movie.imdb_url} target="_blank">
            {movie.aka}
          </Link>
        </CardTitle>
        <CardDescription className="text-xl">{movie.actors}</CardDescription>
        <CardDescription className="flex items-center gap-2 text-amber-700 text-xl mt-2">
          <Star className="size-xl" /> {movie.rank}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-20 flex flex-col text-muted-foreground">
        Ini adalah halaman detail untuk film {movie.title}. Anda dapat
        menambahkan deskripsi atau sinopsis film di sini untuk memberikan
        informasi lebih lanjut kepada pengguna.
      </CardContent>
    </Card>
  );
};
