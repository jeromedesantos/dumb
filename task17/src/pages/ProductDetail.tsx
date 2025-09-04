import type { ProductDetailProp } from "@/types/prop";
import { useNavigate, useParams } from "react-router-dom";
import { CircleX, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProductDetail({
  products,
  handleAdd,
}: ProductDetailProp) {
  const { productId } = useParams();
  const navigate = useNavigate();
  const product = products.find(
    (product) => product.id == parseInt(productId || "")
  );

  return (
    <div className="fixed top-0 z-20 w-full min-h-screen bg-black/70">
      {product && (
        <div className="flex flex-col items-center justify-center mt-20">
          <CircleX
            className="relative top--10 left-100 z-30 size-10 text-white cursor-pointer"
            onClick={() => navigate(`/product`)}
          />
          <div className="w-1/2 text-justify flex flex-col gap-2 bg-white shadow-lg p-10 rounded-2xl">
            <div className="flex justify-between items-end">
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-cyan-700">
                  {product.name}
                </h1>
                <p className="flex items-center gap-2 text-cyan-700">
                  {[...Array(product.rating)].map((_, i) => (
                    <Star key={i} className="size-5" />
                  ))}
                </p>
              </div>
              <Button
                variant={product.available ? "default" : "destructive"}
                className={`cursor-pointer ${
                  product.available ? "bg-cyan-500 hover:bg-cyan-700" : ""
                }`}
                onClick={() => handleAdd(product.id)}
              >
                {product.available ? "+ ADD" : "REMOVE"}
              </Button>
            </div>
            <div className="mt-5">
              <img
                src={`/img/product/${product.image}`}
                alt={product.image}
                className="float-left max-w-50 mr-4 rounded-2xl"
              />
              <p className="text-muted-foreground">{product.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
