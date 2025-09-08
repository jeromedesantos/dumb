import type { CartType } from "@/types/cart";
import { Button } from "@/components/ui/button";
import { LoaderCircle, SquarePen, Trash2 } from "lucide-react";
import { useState } from "react";
import type { ProductType } from "@/types/product";

function Cart({
  products,
  carts,
  loading,
  handleEdit,
  handleDelete,
}: {
  products: ProductType[];
  carts: CartType[];
  loading: boolean;
  handleEdit: (id: number, newQty: number) => void;
  handleDelete: (id: number) => void;
}) {
  // Menyimpan ID dari cart item yang sedang diedit, atau null jika tidak ada
  const [editingCartId, setEditingCartId] = useState<number | null>(null);
  // Menyimpan nilai kuantitas sementara saat dalam mode edit
  const [editingQty, setEditingQty] = useState(0);

  const handleStartEdit = (cart: CartType) => {
    setEditingCartId(cart.id);
    setEditingQty(cart.qty);
  };

  const handleCancelEdit = () => {
    setEditingCartId(null);
    setEditingQty(0);
  };

  const handleSaveEdit = (cartId: number) => {
    handleEdit(cartId, editingQty);
    setEditingCartId(null);
  };

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
          // Cari produk yang sesuai untuk setiap item keranjang
          const product = products.find((p) => p.id === cart.productId);
          // Stok yang tersedia adalah stok gudang + yang sudah ada di keranjang saat ini
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
                {
                  // Tampilkan mode edit HANYA untuk item yang ID-nya cocok
                  editingCartId === cart.id ? (
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
                        <p className="text-center font-bold w-8">
                          {editingQty}
                        </p>
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
                        className="bg-green-500 hover:bg-green-600 text-white font-bold"
                        onClick={() => handleSaveEdit(cart.id)}
                      >
                        Save
                      </Button>
                      <Button variant="ghost" onClick={handleCancelEdit}>
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">Qty. {cart.qty}</p>
                  )
                }
              </div>
              <div className="flex flex-col gap-2 items-end">
                <p className="text-xl font-black text-cyan-700 dark:text-zinc-300">
                  ${(product?.price || 0) * cart.qty}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="default"
                    size="icon"
                    className="cursor-pointer bg-cyan-500 hover:bg-cyan-700 dark:bg-cyan-700 dark:hover:bg-cyan-500 text-white h-9 w-9"
                    onClick={() => handleStartEdit(cart)}
                  >
                    <SquarePen size={20} />
                  </Button>
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
