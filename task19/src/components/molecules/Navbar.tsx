import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/molecules";
import { useAuth } from "@/hooks/useAuth";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export const Navbar = () => {
  const [nav, SetNav] = useState(false);
  const { token, logout } = useAuth();

  return (
    <header className=" dark:bg-zinc-950 bg-white text-zinc-950 font-semibold w-full py-5 flex items-center justify-center text-2xl sticky top-0 z-20 dark:text-amber-500">
      <div className="w-full px-10 md:p-0 md:w-3/4 flex flex-row items-center justify-between gap-2">
        <Link
          to="/"
          className="bg-amber-500 py-2 px-4 text-white dark:text-zinc-800 rounded-lg tracking-widest font-bold font-anton text-2xl text-shadow-2xl flex flex-row items-center justify-center gap-3"
        >
          <span>MOVIE</span>
        </Link>
        <Menu
          className="block md:hidden size-7 cursor-pointer"
          onClick={() => SetNav((nav) => !nav)}
        />
        <NavigationMenu
          className={`${
            !nav ? "hidden" : ""
          } absolute md:block md:static shadow-xl md:shadow-none rounded-2xl md:rounded-none md:bg-none bg-white dark:text-zinc-300 dark:bg-zinc-800 md:dark:bg-transparent md:bg-transparent p-10 md:p-0 top-20 right-10 md:top-0 md:right-0 font-bold`}
        >
          <NavigationMenuList className="flex flex-col md:flex-row items-center gap-5">
            {token && (
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/" className="">
                    HOME
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
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
                  className=" bg-amber-700 hover:bg-amber-500 dark:text-zinc-300 font-bold cursor-pointer rounded-full"
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
};
