import type { MovieType } from "@/types/movie";
import { Outlet, useNavigate } from "react-router-dom";
import { Loader, Search, Star, Terminal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect } from "react";

export const Movies = ({
  search,
  debouncedSearch,
  setSearch,
  data,
  isLoading,
  isError,
}: {
  search: string;
  debouncedSearch: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  data: MovieType[];
  isLoading: boolean;
  isError: boolean;
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!search) navigate("/");
  }, [search, navigate]);

  return (
    <div className="min-h-screen md:w-3/4 flex gap-20 flex-col items-center mt-18">
      <div className="max-w-3/4 md:w-1/2 flex flex-col gap-5 ">
        <h1 className="text-3xl font-bold text-center dark:text-zinc-300 text-zinc-950">
          Feel the movies beyond
        </h1>
        <div className="flex gap-2 items-center">
          <Search className="text-amber-700" />
          <Input
            className="rounded-full"
            type="text"
            id="search"
            placeholder="Search movies.."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-row gap-5 flex-wrap justify-center">
        {isLoading ? (
          <p className="text-lg font-bold dark:text-zinc-300 text-amber-700 text-center mt-10 flex justify-center items-center gap-2">
            <Loader /> loading...
          </p>
        ) : isError ? (
          <Alert variant="destructive">
            <Terminal />
            <AlertTitle>Error!</AlertTitle>
            <AlertDescription>Cannot load movies.</AlertDescription>
          </Alert>
        ) : data.length <= 0 && debouncedSearch ? (
          <p className="text-lg font-bold dark:text-zinc-300 text-amber-700 text-center mt-10">
            Movie Not Found!
          </p>
        ) : (
          <Carousel>
            <CarouselContent className="w-65 md:w-195 lg:w-320">
              {data.map((movie: MovieType) => (
                <CarouselItem key={movie.imdb_id} className=":basis-1/4">
                  <Card
                    className="w-60 hover:bg-accent transition duration-300 pt-0 cursor-pointer"
                    onClick={() => navigate(`/${movie.imdb_id}`)}
                  >
                    <img
                      src={movie.img_poster}
                      alt={movie.img_poster}
                      className="object-cover object-center h-80 rounded-t-2xl"
                    />
                    <CardHeader>
                      <CardTitle className=" dark:text-zinc-300 text-zinc-800 font-bold">
                        {movie.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2 md:line-clamp-2">
                        {movie.actors}
                      </CardDescription>
                      <CardDescription className="flex items-center gap-2 text-amber-700 mt-2">
                        <Star /> {movie.rank}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            {data.length > 0 && (
              <>
                <CarouselPrevious />
                <CarouselNext />
              </>
            )}
          </Carousel>
        )}
      </div>
      <Outlet />
    </div>
  );
};
