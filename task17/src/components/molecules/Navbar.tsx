import { type NavbarProp } from "../../types/prop";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Clover, Menu } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

function Navbar({ carts }: NavbarProp) {
  const [nav, SetNav] = useState(false);

  return (
    <header className="text-cyan-700 bg-white font-semibold w-full py-5 flex items-center justify-center shadow-lg text-2xl sticky top-0 z-20">
      <div className="w-full px-10 md:p-0 md:w-3/4 flex flex-row items-center justify-between gap-2">
        <Link
          to="/" className="font-bold font-saira text-shadow-2xl flex flex-row items-center justify-center gap-3">
          <Clover />
          <span>Rent Waifu</span>
        </p>
        <Menu
          className="block md:hidden size-7 cursor-pointer"
          onClick={() => SetNav((nav) => !nav)}
        />
        <NavigationMenu
          className={`${
            nav ? "hidden" : ""
          } absolute md:block md:static shadow-xl md:shadow-none rounded-2xl md:rounded-none md:bg-none bg-white p-10 md:p-0 top-20 right-10 md:top-0 md:right-0`}
        >
          <NavigationMenuList className="flex flex-col md:flex-row items-center gap-5">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/">HOME</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/about">ABOUT</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/product">PRODUCT</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/cart">
                  <div className="flex flex-row items-center justify-center gap-2">
                    <ShoppingCart className="text-cyan-700 " />
                    <p>{carts.length}</p>
                  </div>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}

export default Navbar;
