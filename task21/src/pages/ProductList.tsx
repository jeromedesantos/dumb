import type { ProductType } from "@/types/product";
import { useNavigate, Outlet } from "react-router-dom";
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
import Loading from "@/components/molecules/Loading";

function ProductList({
  products,
  loading,
}: {
  products: ProductType[];
  loading: boolean;
}) {
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce<string>(search, 500);
  const navigate = useNavigate();

  const filteredProducts: ProductType[] = products.filter(
    (product: ProductType) =>
      product.title.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen w-5/6 md:max-w-300 flex gap-10 flex-col items-center mt-10">
      <div className=" flex gap-2 items-center w-1/2">
        <Search className="text-cyan-700" />
        <Input
          className="rounded-full"
          type="text"
          id="search"
          placeholder="Search products.."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="flex flex-row gap-5 flex-wrap justify-center">
        {loading ? (
          <Loading />
        ) : filteredProducts.length === 0 ? (
          <p className="text-lg font-bold dark:text-zinc-300 text-cyan-700 text-center mt-10">
            Product Not Found!
          </p>
        ) : (
          filteredProducts.map((product: ProductType) => (
            <Card
              className="w-60 hover:bg-accent transition duration-300"
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <CardContent>
                <img
                  src={product.image}
                  alt={product.image}
                  className="object-cover object-center h-50 rounded-2xl"
                />
              </CardContent>
              <CardHeader>
                <CardTitle className=" dark:text-zinc-300 text-cyan-700 font-bold">
                  {product.title}
                </CardTitle>
                <CardDescription className="line-clamp-2 md:line-clamp-2">
                  {product.category}
                </CardDescription>
                <CardDescription className="flex items-center gap-2 text-cyan-500 mt-2">
                  {[...Array(Math.round(product.rating.rate))].map((_, i) => (
                    <Star key={i} className="size-5" />
                  ))}
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between gap-5">
                <CardAction className="text-2xl font-black text-cyan-700 dark:text-zinc-300">
                  {product.price} $
                </CardAction>
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
