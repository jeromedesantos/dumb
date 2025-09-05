import type { ProductType } from "@/types/product";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { CircleX, Loader, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProductDetail({
  products,
  loading,
  handleAdd,
}: {
  products: ProductType[];
  loading: boolean;
  handleAdd: (id: number) => void;
}) {
  const { productId } = useParams();
  const navigate = useNavigate();
  const product: ProductType | undefined = products.find(
    (product) => product.id == parseInt(productId || "")
  );

  return (
    <div className="w-full min-h-screen fixed top-0 z-20 bg-black/70">
      {loading ? (
        <p className="text-lg font-bold dark:text-zinc-300 text-center mt-50 flex justify-center items-center gap-2">
          <Loader /> loading...
        </p>
      ) : product ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <CircleX
            className="relative top--10 left-100 z-30 size-10 text-zinc-300 cursor-pointer"
            onClick={() => navigate(`/product`)}
          />
          <div className="w-1/2 text-justify flex flex-col gap-2 bg-white dark:bg-zinc-900 shadow-lg p-10 rounded-2xl">
            <div className="flex justify-between items-end">
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-black text-cyan-700 dark:text-zinc-300">
                  {product.title}
                </h1>
                <p className="flex items-center gap-2 text-cyan-700 dark:text-cyan-500">
                  {[...Array(Math.round(product.rating.rate))].map((_, i) => (
                    <Star key={i} className="size-" />
                  ))}
                </p>
              </div>
              <Button
                variant={product.available ? "default" : "destructive"}
                className={`cursor-pointer font-bold ${
                  product.available
                    ? "bg-cyan-500 hover:bg-cyan-700 dark:bg-cyan-700 dark:hover:bg-cyan-500 text-white"
                    : ""
                }`}
                onClick={() => handleAdd(product.id)}
              >
                {product.available ? "+ ADD" : "REMOVE"}
              </Button>
            </div>
            <div className="mt-5">
              <img
                src={product.image}
                alt={product.image}
                className="float-left max-w-50 mr-4 rounded-2xl"
              />
              <p className="text-cyan-700 dark:text-zinc-300 font-bold mb-2">
                {product.category}
              </p>
              <p className="text-muted-foreground">{product.description}</p>
            </div>
          </div>
        </div>
      ) : (
        <Navigate to="/product" replace />
      )}
    </div>
  );
}
