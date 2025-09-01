import { type Product } from "../types/product";
import { type ProductProp } from "../types/productProp";

function ProductList({ products, handleAdd }: ProductProp) {
  return (
    <div className="flex flex-row gap-5 flex-wrap py-5 px-50 mt-5">
      {products.map((product: Product) => (
        <section
          className="bg-[#428DB2] pb-3 p-1 flex flex-col gap-2 shadow-lg rounded-2xl  w-50"
          key={product.id}
        >
          <img
            className="w-full"
            src={`./src/assets/img/${product.image}`}
            alt={product.image}
          />
          <div className="flex flex-col gap-2 justify-center px-5">
            <h3 className="text-lg text-white font-semibold text-center">
              {product.name}
            </h3>
            <p className="text-sm text-white text-center">
              {product.description}
            </p>
            <p className="text-2xl text-white font-bold text-center">
              {product.price} $
            </p>
            <button
              className={`mt-2 text-sm text-white text-center p-2 rounded-2xl font-bold cursor-pointer ${
                product.available ? "bg-[#43C5F5]" : "bg-gray-400"
              }`}
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
