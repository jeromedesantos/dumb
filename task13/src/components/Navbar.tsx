import { type NavbarProp } from "../types/navbarProp";

function Navbar({ handleIcon }: NavbarProp) {
  return (
    <header className="backdrop-blur-sm bg-[#428DB2] w-full py-5 px-50 flex items-center justify-between shadow-lg text-2xl sticky top-0 z-20">
      <h1 className="font-semibold text-white text-shadow-2xl">
        Sell Waifu 👍
      </h1>
      <i
        onClick={handleIcon}
        className="bi bi-bag-fill text-white text-shadow-2xl cursor-pointer"
      ></i>
    </header>
  );
}

export default Navbar;
