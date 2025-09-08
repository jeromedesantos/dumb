import { ShoppingCart, Clover, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import ThemeToggle from "@/components/molecules/ThemeToggle";

function Navbar({ carts }: { carts: number }) {
  const { token, logout } = useAuth();
  const [nav, SetNav] = useState(false);
  return (
    <header className=" dark:bg-zinc-950 bg-white text-cyan-700 font-semibold w-full py-5 flex items-center justify-center shadow-lg text-2xl sticky top-0 z-20 dark:text-cyan-500">
      <div className="w-full px-10 md:p-0 md:w-4/5 flex flex-row items-center justify-between gap-2">
        <Link
          to="/"
          className="font-bold font-saira text-shadow-2xl flex flex-row items-center justify-center gap-3"
        >
          <Clover />
          <span>My Store</span>
        </Link>
        <Menu
          className="block md:hidden size-7 cursor-pointer"
          onClick={() => SetNav((nav) => !nav)}
        />
        <NavigationMenu
          className={`${
            !nav ? "hidden" : ""
          } absolute md:block md:static shadow-xl md:shadow-none rounded-2xl md:rounded-none md:bg-none bg-white dark:text-zinc-300 dark:bg-cyan-950 md:dark:bg-transparent md:bg-transparent p-10 md:p-0 top-20 right-10 md:top-0 md:right-0 font-bold`}
        >
          <NavigationMenuList className="flex flex-col md:flex-row items-center gap-5">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/" className="">
                  HOME
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/about" className="">
                  ABOUT
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            {token && (
              <>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link to="/product" className="">
                      PRODUCT
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link to="/cart">
                      <div className="flex flex-row items-center justify-center gap-2">
                        <ShoppingCart className="text-cyan-700 dark:text-zinc-300 size-5" />
                        {carts}
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </>
            )}
            {token ? (
              <Button
                variant="destructive"
                className="font-bold cursor-pointer rounded-full"
                onClick={logout}
              >
                Logout
              </Button>
            ) : (
              <Link to="/login">
                <Button
                  variant="default"
                  className=" dark:bg-cyan-700 dark:hover:bg-cyan-500 dark:text-zinc-300 font-bold bg-cyan-500 hover:bg-cyan-700 cursor-pointer rounded-full"
                >
                  Login
                </Button>
              </Link>
            )}
            <ThemeToggle />
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}

export default Navbar;
