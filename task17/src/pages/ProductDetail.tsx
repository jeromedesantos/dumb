import { type ProductDetailProp } from "../types/prop";
import { useNavigate, useParams } from "react-router-dom";
import { CircleX } from "lucide-react";

export default function ProductDetail({ products }: ProductDetailProp) {
  const { productId } = useParams();
  const navigate = useNavigate();
  const product = products.find(
    (product) => product.id == parseInt(productId || "")
  );

  return (
    <div className="fixed top-0 z-20 w-full min-h-screen bg-black/70">
      <div className="flex flex-col items-center justify-center mt-20">
        <CircleX
          className="relative top--10 left-100 z-30 size-10 text-white cursor-pointer"
          onClick={() => navigate(`/product`)}
        />
        <div className="w-1/2 text-justify flex flex-col gap-5 bg-white shadow-lg p-10 rounded-2xl">
          <h1 className="text-2xl font-bold text-cyan-700">{product?.name}</h1>
          <div>
            <img
              src={`/img/${product?.image}`}
              alt={product?.image}
              className="float-left max-w-50 mr-4 rounded-2xl"
            />
            <p className="text-muted-foreground">{product?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
