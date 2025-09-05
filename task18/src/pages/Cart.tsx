import type { ProductType } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Loader, X } from "lucide-react";

function Cart({
  carts,
  loading,
  handleAdd,
}: {
  carts: ProductType[];
  loading: boolean;
  handleAdd: (id: number) => void;
}) {
  return (
    <div className="w-3/4 min-h-screen md:max-w-200 mt-10 flex flex-col gap-5">
      {loading ? (
        <p className="text-lg font-bold text-cyan-700 dark:text-zinc-300 text-center mt-10 flex justify-center items-center gap-2">
          <Loader /> loading...
        </p>
      ) : carts.length === 0 ? (
        <p className="text-lg font-bold text-cyan-700 dark:text-zinc-300 text-center mt-10">
          Carts is Empty!
        </p>
      ) : (
        carts.map((cart: ProductType) => (
          <div
            className="flex flex-wrap md:flex-nowrap gap-5 items-center justify-center hover:bg-accent dark:bg-zinc-900 dark:hover:bg-zinc-800 transition duration-300 py-5 rounded-2xl border-2 px-5 text-center md:text-left"
            key={cart.id}
          >
            <img
              src={cart.image}
              alt={cart.image}
              className="object-cover object-center h-20 rounded-2xl"
            />
            <div className="flex flex-col gap-2">
              <h1 className="text-cyan-700 dark:text-zinc-300 font-bold">
                {cart.title}
              </h1>
              <p className="line-clamp-2 text-muted-foreground">
                {cart.description}
              </p>
            </div>
            <p className="text-xl font-black text-cyan-700 dark:text-zinc-300 inline-flex items-center gap-1">
              {cart.price}
              <span>$</span>
            </p>
            <Button
              variant="destructive"
              className="cursor-pointer rounded-full"
              onClick={() => {
                handleAdd(cart.id);
              }}
            >
              <X className="text-xl" />
            </Button>
          </div>
        ))
      )}
    </div>
  );
}

export default Cart;
