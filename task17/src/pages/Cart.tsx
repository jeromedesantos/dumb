import type { ProductType } from "@/types/product";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

function Cart({
  carts,
  handleAdd,
}: {
  carts: ProductType[];
  handleAdd: (id: number) => void;
}) {
  return (
    <div className="w-3/4 min-h-screen md:max-w-200 bg-white mt-10">
      {carts.length === 0 ? (
        <p className="text-lg font-bold text-cyan-700 text-center mt-10">
          Carts is Empty!
        </p>
      ) : (
        <div>
          {carts.map((cart: ProductType) => (
            <div
              className="flex flex-wrap md:flex-nowrap gap-5 items-center justify-center hover:bg-accent transition duration-300 py-5  rounded-2xl border-2 px-5 text-center md:text-left"
              key={cart.id}
            >
              <img
                src={`./img/product/${cart.image}`}
                alt={cart.image}
                className="object-cover object-center h-20 rounded-full"
              />
              <div className="flex flex-col gap-2">
                <h1 className="text-cyan-700">{cart.name}</h1>
                <p className="line-clamp-2 text-muted-foreground">
                  {cart.description}
                </p>
              </div>
              <p className="text-xl font-bold text-cyan-700 inline-flex items-center gap-1">
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
          ))}
        </div>
      )}
    </div>
  );
}

export default Cart;
