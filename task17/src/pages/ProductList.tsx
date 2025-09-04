import type { ProductData } from "@/types/data";
import type { ProductProp } from "@/types/prop";
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
import { Search, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { useState } from "react";

function ProductList({ products, handleAdd }: ProductProp) {
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce<string>(search, 500);
  const navigate = useNavigate();

  const filteredProducts = products.filter((product: ProductData) =>
    product.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen md:w-3/4 flex gap-10 flex-col items-center mt-10 ">
      <div className="w-3/4 md:w-1/2 flex gap-2 items-center">
        <Search className="text-cyan-700" />
        <Input
          className="rounded-full"
          type="text"
          id="search"
          placeholder="Search our waifu.."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="flex flex-row gap-5 flex-wrap justify-center">
        {filteredProducts.length === 0 ? (
          <h1 className="text-lg font-semibold text-cyan-700 text-center mt-10">
            Product Not Found!
          </h1>
        ) : (
          filteredProducts.map((product: ProductData) => (
            <Card
              className="w-60 hover:bg-accent transition duration-300"
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <CardContent>
                <img
                  src={`./img/product/${product.image}`}
                  alt={product.image}
                />
              </CardContent>
              <CardHeader>
                <CardTitle className="text-cyan-700">{product.name}</CardTitle>
                <CardDescription className="line-clamp-2 md:line-clamp-2">
                  {product.description}
                </CardDescription>
                <CardDescription className="flex items-center gap-2 text-cyan-700 mt-2">
                  {[...Array(product.rating)].map((_, i) => (
                    <Star key={i} className="size-5" />
                  ))}
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
          ))
        )}
      </div>
      <Outlet />
    </div>
  );
}

export default ProductList;
