import type { ProductData } from "@/types/data";
import type { CartProp } from "@/types/prop";
import CartEmpty from "@/components/molecules/CartEmpty";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

function Cart({ carts, handleAdd }: CartProp) {
  return (
    <>
      {carts.length === 0 ? (
        <CartEmpty />
      ) : (
        <div className="bg-white flex flex-col gap-5 max-w-200  mt-10">
          {carts.map((cart: ProductData) => (
            <div
              className="w-full flex gap-10 items-center justify-center hover:bg-accent transition duration-300 px-10 py-5 rounded-full border-2"
              key={cart.id}
            >
              <img
                src={`./img/product/${cart.image}`}
                alt={cart.image}
                className="max-w-20 rounded-full"
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
    </>
  );
}

export default Cart;
