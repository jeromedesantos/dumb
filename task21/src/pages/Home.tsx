import type { ProductType } from "@/types/product";
import {
  Github,
  Instagram,
  Linkedin,
  LoaderCircle,
  Twitter,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function Home({
  products,
  loading,
}: {
  products: ProductType[];
  loading: boolean;
}) {
  return (
    <div className="min-h-screen max-w-250 mt-10 flex flex-col md:flex-row md:justify-center gap-10">
      <Carousel className="bg-transparent dark:bg-zinc-900 h-120 md:max-w-100 rounded-2xl border-2 grid place-items-center">
        <CarouselContent>
          {loading ? (
            <CarouselItem className="w-500 grid place-items-center">
              <p className="text-lg font-bold text-cyan-700 dark:text-zinc-300 text-center mt-10 flex justify-center items-center gap-2">
                <LoaderCircle className="animate-spin" /> loading...
              </p>
            </CarouselItem>
          ) : (
            products.map((product: ProductType) => (
              <CarouselItem
                key={product.id}
                className="grid place-items-center"
              >
                <img
                  src={product.image}
                  className="object-cover object-center h-100"
                  alt="Profile picture"
                />
              </CarouselItem>
            ))
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <section id="about" className="py-10">
        <div className="flex flex-col gap-10 mx-auto">
          <div className="flex flex-col gap-5 flex-2 px-10">
            <h2 className="text-2xl font-black text-cyan-700 dark:text-zinc-300">
              Welcome!
            </h2>
            <div className="flex flex-wrap gap-2">
              <a
                href="#"
                className="grid place-items-center w-10 h-10 text-white dark:bg-cyan-700 dark:hover-bg-cyan-500  bg-cyan-500 rounded-full transition-all duration-300 hover:bg-cyan-700 dark:hover:bg-cyan-500"
              >
                <Github />
              </a>

              <a
                href="#"
                className="grid place-items-center w-10 h-10 text-white dark:bg-cyan-700  bg-cyan-500 dark:hover-bg-cyan-500 border-box rounded-full transition-all duration-300 hover:bg-cyan-700 dark:hover:bg-cyan-500"
              >
                <Linkedin />
              </a>
              <a
                href="#"
                className="grid place-items-center w-10 h-10 text-white dark:bg-cyan-700  bg-cyan-500 dark:hover-bg-cyan-500 border-box rounded-full transition-all duration-300 hover:bg-cyan-700 dark:hover:bg-cyan-500"
              >
                <Instagram />
              </a>

              <a
                href="#"
                className="grid place-items-center w-10 h-10 text-white dark:bg-cyan-700  bg-cyan-500 dark:hover-bg-cyan-500 border-box rounded-full transition-all duration-300 hover:bg-cyan-700 dark:hover:bg-cyan-500"
              >
                <Twitter />
              </a>
            </div>
            <p className="text-muted-foreground text-justify mt-2">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint
              officiis pariatur iusto reiciendis amet maxime totam? Doloribus
              rerum pariatur earum nostrum illo amet harum, mollitia magni
              voluptate vero inventore eos. Commodi qui dolorum, earum tempora
              ea quod doloremque consectetur sit modi fugiat itaque quis neque
              fugit. Sint aliquam vero ipsam placeat. Sapiente, nesciunt dolore
              porro necessitatibus quis doloribus quam tempora.
            </p>
          </div>
          <div className="flex flex-col gap-2 px-10"></div>
        </div>
      </section>
    </div>
  );
}

export default Home;
