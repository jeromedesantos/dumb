import { type CartProp } from "../types/cartProp";

function Cart({ carts }: CartProp) {
  return (
    <div className="fixed top-20 right-50 flex flex-col gap-5 flex-wrap p-5 bg-[#428DB2] rounded-2xl shadow-lg max-h-1/2">
      {carts.map((cart) => (
        <section
          className="flex flex-row items-center gap-2 text-sm text-white text-center bg-[#43C5F5] hover:bg-[#56C6FD] py-1 px-1 pr-5  rounded-full font-bold"
          key={cart.id}
        >
          <img
            className="w-15 rounded-full border-2"
            src={`./src/assets/img/${cart.image}`}
            alt={cart.image}
          />
          <h3 className="text-lg text-white font-semibold text-center">
            {cart.name}
          </h3>
        </section>
      ))}
    </div>
  );
}

export default Cart;
