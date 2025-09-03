import { type NavbarProp } from "../../types/prop";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { Clover } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

function Navbar({ carts }: NavbarProp) {
  return (
    <header className="text-cyan-700 bg-white font-semibold w-full py-5 flex items-center justify-center shadow-lg text-2xl sticky top-0 z-20">
      <div className="w-2/3 flex flex-row items-center justify-between gap-2">
        <p className="font-bold font-saira text-shadow-2xl flex flex-row items-center justify-center gap-3">
          <Clover />
          <span>Rent Waifu</span>
        </p>
        <NavigationMenu>
          <NavigationMenuList className="flex flex-row items-center justify-center gap-5">
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
