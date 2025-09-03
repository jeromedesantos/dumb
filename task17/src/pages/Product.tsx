import { type ProductData } from "../types/data";
import { type ProductProp } from "../types/prop";
import { useNavigate, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function ProductList({ products, handleAdd }: ProductProp) {
  const navigate = useNavigate();

  return (
    <div className="w-3/4 flex flex-col items-center mt-10 ">
      <div className="flex flex-row gap-5 flex-wrap justify-center">
        {products.map((product: ProductData) => (
          <Card
            className="w-60 hover:bg-accent transition duration-300"
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <CardContent>
              <img src={`./img/product/${product.image}`} alt={product.image} />
            </CardContent>
            <CardHeader>
              <CardTitle className="text-cyan-700">{product.name}</CardTitle>
              <CardDescription className="line-clamp-2 md:line-clamp-2">
                {product.description}
              </CardDescription>
            </CardHeader>

            <CardFooter className="flex justify-between gap-5">
              <CardAction className="text-xl font-bold text-cyan-700">
                {product.price} $
              </CardAction>
              <Button
                variant={product.available ? "default" : "destructive"}
                className={`cursor-pointer ${
                  product.available ? "bg-cyan-500 hover:bg-cyan-700" : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAdd(product.id);
                }}
              >
                {product.available ? "+ ADD" : "REMOVE"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Outlet />
    </div>
  );
}

export default ProductList;
