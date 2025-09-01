import { type Product } from "../types/product";
import { type ProductProp } from "../types/productProp";

function ProductList({ products, handleAdd }: ProductProp) {
  return (
    <div className="flex flex-row gap-5 flex-wrap py-5 px-50 mt-5">
      {products.map((product: Product) => (
        <section
          className="bg-[#428DB2] pb-3 p-1 flex flex-col gap-2 shadow-lg rounded-2xl "
          key={product.id}
        >
          <img
            className="w-50"
            src={`./src/assets/img/${product.image}`}
            alt={product.image}
          />
          <div className="flex flex-col gap-2 justify-center px-5">
            <h3 className="text-lg text-white font-semibold text-center">
              {product.name}
            </h3>
            <button
              className="text-sm text-white text-center bg-[#43C5F5] hover:bg-[#56C6FD] p-2 rounded-2xl font-bold cursor-pointer"
              onClick={() => handleAdd(product.id)}
            >
              {product.available ? "ADD TO CART" : "REMOVE"}
            </button>
          </div>
        </section>
      ))}
    </div>
  );
}

export default ProductList;
