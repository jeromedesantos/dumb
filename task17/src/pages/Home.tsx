import type { CoverType } from "@/types/cover";
import data from "@/data/covers.json";
import Profile from "@/components/molecules/Profile";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function Home() {
  const [covers] = useState<CoverType[]>(data);

  return (
    <div className="min-h-screen mt-10 flex flex-col justify-center">
      <Carousel className="bg-white md:max-w-250 rounded-2xl border-2">
        <CarouselContent>
          {covers.map((cover: CoverType) => (
            <CarouselItem key={cover.id}>
              <img
                src={`./img/cover/${cover.image}`}
                className="object-cover object-center h-150"
                alt="Profile picture"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <Profile />
    </div>
  );
}

export default Home;
