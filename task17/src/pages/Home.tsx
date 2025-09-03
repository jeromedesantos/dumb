import data from "../data/covers.json";
import { useState } from "react";
import { type CoverData } from "../types/data";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Home() {
  const [covers] = useState<CoverData[]>(data);
  return (
    <Carousel className="bg-white max-w-250 rounded-2xl border-2 mt-10">
      <CarouselContent className="flex">
        {covers.map((cover: CoverData) => (
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
  );
}
