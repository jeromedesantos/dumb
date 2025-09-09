import type { CartType } from "@/types/cart";
import { Button } from "@/components/ui/button";
import { LoaderCircle, Save, SquarePen, Trash2 } from "lucide-react";
import { useState, type Dispatch, type SetStateAction } from "react";
import type { ProductType } from "@/types/product";

function Cart({
  products,
  carts,
  loading,
  setProducts,
  setCarts,
}: {
  products: ProductType[];
  carts: CartType[];
  loading: boolean;
  setProducts: Dispatch<SetStateAction<ProductType[]>>;
  setCarts: Dispatch<SetStateAction<CartType[]>>;
}) {
  const [editingCartId, setEditingCartId] = useState<number | null>(null);
  const [editingQty, setEditingQty] = useState(0);

  // stok : 5
  // 6 - 5 = 1 --> 5-1 = 6
  // 3 - 5 = -2 --> 5--2 (jadi +) = 7

  function handleEdit(id: number, newQty: number) {
    const findCart = carts.find((cart) => cart.id === id);
    const findProduct = products.find(
      (product) => product.id === findCart?.productId
    );
    if (!findCart || !findProduct) {
      console.error("Item keranjang atau produk tidak ditemukan");
      return;
    }
    const diff = newQty - findCart.qty;
    if (diff > 0 && findProduct.stock < diff) {
      alert(`Stok tidak mencukupi! Sisa stok: ${findProduct.stock}`);
      return;
    }
    setProducts((prev) =>
      prev.map((product) =>
        product.id === findCart.productId
          ? { ...product, stock: product.stock - diff }
          : product
      )
    );
    setCarts((prevCarts) =>
      prevCarts.map((cart) =>
        cart.id === id
          ? {
              ...cart,
              qty: newQty,
              total: findProduct.price * newQty,
            }
          : cart
      )
    );
  }

  function handleDelete(id: number) {
    const findCart = carts.find((cart) => cart.id === id);
    if (!findCart) return;
    setProducts((prev) =>
      prev.map((product) =>
        product.id === findCart.productId
          ? { ...product, stock: product.stock + findCart.qty }
          : product
      )
    );
    setCarts((prev) => prev.filter((cart) => cart.id !== id));
  }

  return (
    <div className="w-full max-w-3xl min-h-screen mt-10 flex flex-col gap-5">
      {loading ? (
        <p className="text-lg font-bold text-cyan-700 dark:text-zinc-300 text-center mt-10 flex justify-center items-center gap-2">
          <LoaderCircle className="animate-spin" /> Loading...
        </p>
      ) : carts.length === 0 ? (
        <p className="text-lg font-bold text-cyan-700 dark:text-zinc-300 text-center mt-10">
          Carts is Empty!
        </p>
      ) : (
        carts.map((cart: CartType) => {
          const product = products.find(
            (product) => product.id === cart.productId
          );
          const availableStock = (product?.stock || 0) + cart.qty;
          return (
            <div
              className="flex flex-wrap md:flex-nowrap gap-5 items-center hover:bg-accent dark:bg-zinc-900 dark:hover:bg-zinc-800 transition duration-300 py-5 rounded-2xl border-2 px-5 justify-between"
              key={cart.id}
            >
              <img
                src={cart.image}
                alt={cart.title}
                className="object-cover object-center h-20 w-20 rounded-2xl"
              />
              <div className="flex flex-col gap-2 flex-grow">
                <h1 className="text-cyan-700 dark:text-zinc-300 font-bold">
                  {cart.title}
                </h1>
                {editingCartId === cart.id ? (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 border rounded-lg">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          setEditingQty((prev) => Math.max(1, prev - 1))
                        }
                      >
                        -
                      </Button>
                      <p className="text-center font-bold w-8">{editingQty}</p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          setEditingQty((prev) =>
                            Math.min(prev + 1, availableStock)
                          )
                        }
                      >
                        +
                      </Button>
                    </div>

                    <Button
                      variant="ghost"
                      className="font-bold cursor-pointer"
                      onClick={() => {
                        setEditingCartId(null);
                        setEditingQty(0);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <p className="text-muted-foreground">Qty. {cart.qty}</p>
                )}
              </div>
              <div className="flex flex-col gap-2 items-end">
                <p className="text-xl font-black text-cyan-700 dark:text-zinc-300">
                  ${(product?.price || 0) * cart.qty}
                </p>
                <div className="flex gap-2">
                  {editingCartId === cart.id ? (
                    <Button
                      size="icon"
                      className="cursor-pointer bg-green-500 hover:bg-green-600 text-white font-bold h-9 w-9"
                      onClick={() => {
                        handleEdit(cart.id, editingQty);
                        setEditingCartId(null);
                      }}
                    >
                      <Save />
                    </Button>
                  ) : (
                    <Button
                      size="icon"
                      className="cursor-pointer bg-cyan-500 hover:bg-cyan-700 dark:bg-cyan-700 dark:hover:bg-cyan-500 text-white h-9 w-9"
                      onClick={() => {
                        setEditingCartId(cart.id);
                        setEditingQty(cart.qty);
                      }}
                    >
                      <SquarePen size={20} />
                    </Button>
                  )}
                  <Button
                    variant="destructive"
                    size="icon"
                    className="cursor-pointer h-9 w-9"
                    onClick={() => handleDelete(cart.id)}
                  >
                    <Trash2 size={20} />
                  </Button>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Cart;
